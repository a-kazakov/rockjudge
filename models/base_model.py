import peewee

from db import Database
from webserver.websocket import WsMessage


class BaseModel(peewee.Model):
    class Meta:
        database = Database.instance().db

    RW_PROPS = []
    RO_PROPS = []

    def prefetch_child(self, name):
        child = getattr(self, name)
        if type(child) == list:
            return
        setattr(self, name, list(child))

    @classmethod
    def create_prefetching_schema(cls, model_type, schema):
        result = []
        for child_name, nested_schema in schema.items():
            rel_manager = getattr(model_type, child_name)
            rel_model = rel_manager.rel_model
            if isinstance(rel_manager, peewee.ForeignKeyField):
                result.append({
                    "model": rel_model,
                    "ref": child_name,
                    "ref_dir": "down",
                    "children": cls.create_prefetching_schema(rel_model, nested_schema)
                })
            else:
                result.append({
                    "model": rel_model,
                    "ref": rel_manager.field.name,
                    "ref_dir": "up",
                    "children": cls.create_prefetching_schema(rel_model, nested_schema)
                })
        return result

    def prefetch(self, schema):
        new_schema = self.create_prefetching_schema(self.__class__, schema)
        for child_schema in new_schema:
            self._prefetch_impl([self], child_schema)
        return self

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

    def get_sorting_key(self):  # Default
        return 0

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
    def load_models_base(cls, objects, **kwargs):
        prepared = [
            cls.gen_model_kwargs(obj, **kwargs)
            for obj in objects
        ]
        external_ids = [
            data["external_id"]
            for data in prepared
            if "external_id" in data
        ]
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
                yield models_to_update[external_id].update_model(data, WsMessage()), False, obj
            else:
                yield cls.create(**data), True, obj

    @classmethod
    def gen_model_kwargs(cls, data, **kwargs):
        result = {
            key: data[key]
            for key in cls.RW_PROPS
            if key in data
        }
        result.update(kwargs)
        return result

    def update_model(self, data, **kwargs):
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
