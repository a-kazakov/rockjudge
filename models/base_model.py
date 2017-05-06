import copy
import peewee
from collections import deque

from db import Database
from exceptions import ApiError
from webserver.websocket import WsMessage


class PrefetchedModel:
    PF_SCHEMA = {}
    PF_CHILDREN = {}

    def get_sorting_key(self):  # Default
        return 0

    @classmethod
    def _isUpperChild(cls, child_name):
        rel_manager = getattr(cls, child_name)
        return isinstance(rel_manager, peewee.ForeignKeyField)

    @classmethod
    def _toUpperRef(cls, child_name):
        rel_manager = getattr(cls, child_name)
        return rel_manager.field.name

    @classmethod
    def _relModel(cls, child_name):
        rel_manager = getattr(cls, child_name)
        return rel_manager.rel_model

    @classmethod
    def _expand_prefetch_schema(cls, schema):
        result = []
        for child_name, nested_schema in schema.items():
            rel_model = cls._relModel(child_name)
            if cls._isUpperChild(child_name):
                result.append({
                    "model": rel_model,
                    "ref": child_name,
                    "ref_dir": "down",
                    "children": rel_model._expand_prefetch_schema(nested_schema)
                })
            else:
                result.append({
                    "model": rel_model,
                    "ref": cls._toUpperRef(child_name),
                    "ref_dir": "up",
                    "children": rel_model._expand_prefetch_schema(nested_schema)
                })
        return result

    @classmethod
    def _prefetch_impl(cls, models, schema):
        if models == []:
            return []
        if schema["ref_dir"] == "up":
            back_ref = getattr(schema["model"], schema["ref"]).related_name
            ids = [model.id for model in models]
            db_response = schema["model"].select().where(getattr(schema["model"], schema["ref"]) << ids).execute()
            children = list(db_response)
            rev_index = {}
            for model in models:
                setattr(model, back_ref, [])
                rev_index[model.id] = model
            for child_schema in schema["children"]:
                children = cls._prefetch_impl(children, child_schema)
            for child in children:
                model = rev_index[getattr(child, schema["ref"] + "_id")]
                setattr(child, schema["ref"], model)
                getattr(model, back_ref).append(child)
        else:
            ids = [getattr(model, schema["ref"] + "_id") for model in models]
            db_response = schema["model"].select().where(getattr(schema["model"], "id") << ids).execute()
            children = list(db_response)
            rev_index = {}
            for child in children:
                rev_index[child.id] = child
            for child_schema in schema["children"]:
                children = cls._prefetch_impl(children, child_schema)
            for model in models:
                setattr(model, schema["ref"], rev_index[getattr(model, schema["ref"] + "_id")])
        return models

    @classmethod
    def _merge_schemas(cls, base, delta):
        for key in delta:
            if key not in base:
                base[key] = delta[key]
            else:
                base[key] = cls._merge_schemas(base[key], delta[key])
        return base

    @classmethod
    def _gen_prefetch_schema(cls, s_schema):
        def replace_none(base, model, next_s_schema):
            for key in base:
                child_model = getattr(model, key).rel_model
                if base[key] is None:
                    base[key] = child_model._gen_prefetch_schema(next_s_schema)
                else:
                    base[key] = replace_none(base[key], child_model, next_s_schema)
            return base

        pf_schema = copy.deepcopy(cls.PF_SCHEMA)
        pf_children = copy.deepcopy(cls.PF_CHILDREN)
        for key in pf_children:
            if pf_children[key] is None:
                pf_children[key] = {
                    key: None
                }
            if key in s_schema:
                buf = pf_children[key]
                buf = replace_none(buf, cls, s_schema[key])
                pf_schema = cls._merge_schemas(pf_schema, buf)
        return pf_schema

    @classmethod
    def _optimize_prefetch_schema_impl(cls, schema, last_model=None):
        keys = deque(schema.keys())
        to_visit = set(schema.keys())
        while len(keys) > 0:
            key = keys.popleft()
            to_visit.discard(key)
            next_model = cls._relModel(key)
            if cls._isUpperChild(key) and next_model == last_model:
                yield schema.pop(key)
            else:
                for subschema in next_model._optimize_prefetch_schema_impl(schema[key], cls):
                    for next_key in subschema:
                        if next_key not in to_visit:
                            keys.append(next_key)
                            to_visit.add(next_key)
                    schema = cls._merge_schemas(schema, subschema)
        if last_model is None:
            yield schema

    @classmethod
    def _optimize_prefetch_schema(cls, schema):
        return next(cls._optimize_prefetch_schema_impl(schema))

    def prefetch(self, schema):
        new_schema = self._expand_prefetch_schema(schema)
        for child_schema in new_schema:
            self._prefetch_impl([self], child_schema)
        return self

    def smart_prefetch(self, s_schema):
        pf_schema = self._gen_prefetch_schema(s_schema)
        pf_schema = self._optimize_prefetch_schema(pf_schema)
        self.prefetch(pf_schema)

    @classmethod
    def smart_prefetch_multiple(cls, models, s_schema):
        pf_schema = cls._gen_prefetch_schema(s_schema)
        pf_schema = cls._optimize_prefetch_schema(pf_schema)
        new_schema = cls._expand_prefetch_schema(pf_schema)
        for child_schema in new_schema:
            cls._prefetch_impl(models, child_schema)


class BaseModel(peewee.Model, PrefetchedModel):
    class Meta:
        database = Database.instance().db

    RW_PROPS = []
    RO_PROPS = []

    def get_back_ref(self, field):
        return None

    def serialize_as_child(self, children, serializer=None):
        if serializer is None:
            serializer = lambda x, c: x.serialize(children=c)
        return {
            "model": self.__class__.__name__,
            "id": self.id,
            "data": serializer(self, children)
        }

    def serialize_upper_child(self, current_result, child_name, all_children, serializer=None):
        if child_name in all_children:
            current_result["^" + child_name] = \
                getattr(self, child_name).serialize_as_child(all_children[child_name], serializer)
        return current_result

    def serialize_lower_child(self, current_result, child_name, all_children, serializer=None):
        if child_name in all_children:
            sorted_children = sorted(getattr(self, child_name), key=lambda x: x.get_sorting_key())
            back_ref = self.get_back_ref(child_name)
            if back_ref is None:
                back_ref = getattr(self.__class__, child_name).field.name
            current_result["*" + child_name] = {
                "back_ref": back_ref,
                "children": [
                    child.serialize_as_child(all_children[child_name], serializer)
                    for child in sorted_children
                ]
            }
        return current_result

    def get_attr_count(self, attr):
        value = getattr(self, attr)
        if type(value) == list:
            return len(value)
        return value.count()

    @classmethod
    def load_models_base(cls, objects, prepared=None, **kwargs):
        if prepared is None:
            prepared = [
                cls.gen_model_kwargs(obj, **kwargs)
                for obj in objects
            ]
        external_ids = [
            data["external_id"]
            for data in prepared
            if "external_id" in data
        ]
        if len(set(external_ids)) != len(external_ids):
            raise ApiError("errors.api.duplicated_external_id")
        if len(external_ids) == 0:
            models_to_update = []
        else:
            models_to_update_condition = (cls.external_id << external_ids)
            for key, value in kwargs.items():
                models_to_update_condition = models_to_update_condition & (getattr(cls, key) == value)
            models_to_update_query = cls.select().where(models_to_update_condition)
            models_to_update = {
                model.external_id: model
                for model in models_to_update_query
            }
        for obj, data in zip(objects, prepared):
            external_id = data["external_id"] if "external_id" in data else None
            if external_id in models_to_update:
                models_to_update[external_id].update_model(data, WsMessage())
                yield models_to_update[external_id], False, obj
            else:
                yield cls.create(**data), True, obj

    @classmethod
    def gen_model_kwargs(cls, data, **kwargs):
        result = {
            key: data[key]
            for key in cls.RW_PROPS
            if key in data
        }
        if "external_id" in result and result["external_id"] == "":
            result["external_id"] = None
        result.update(kwargs)
        return result

    def update_model_base(self, data, **kwargs):
        for key, value in self.gen_model_kwargs(data, **kwargs).items():
            if key == "external_id" and value == "":
                value = None
            setattr(self, key, value)
        self.save()

    def serialize_props(self):
        return {
            key: getattr(self, key)
            for key in self.RW_PROPS + self.RO_PROPS
        }

    def serialize(self, children={}):
        return self.serialize_props()
