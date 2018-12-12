import copy
from typing import (
    Any,
    Dict,
    Mapping,
    Set,
    TYPE_CHECKING,
    Tuple,
    Type,
    TypeVar,
    Union,
    List,
    Generator,
    Optional,
    Iterable,
)

from sqlalchemy import Column, ForeignKey, inspect
from sqlalchemy.orm import Mapper, RelationshipProperty, Session

from db import db
from exceptions import ApiError, InternalError
from prefetching import RecursiveDict, ModelTreeNode


if TYPE_CHECKING:
    from api import ApiRequest
    from mutations import MutationsKeeper
    from models.client import Client
    from models.client_auth import ClientAuth


class AccessViolationError(Exception):
    pass


class ForbiddenForEveryoneError(Exception):
    pass  # Should be raised if permission is not allowed even for superuser


T = TypeVar("T")
TBaseModel = TypeVar("TBaseModel", bound="BaseModel")


class BaseModel:
    id: int
    competition_id: int

    # Helper inspections

    VIRTUAL_FIELDS: Set[str] = set()
    HIDDEN_FIELDS: Set[str] = set()

    @classmethod
    def get_child(cls, name: str) -> Type["BaseModel"]:
        try:
            return next(
                model_type
                for model_type in db.import_all_models()
                if model_type.__name__ == name
            )
        except StopIteration:
            raise InternalError(f"Unknown model: {name}")

    @property
    def inspect(self) -> Mapper:
        try:
            return self.__inspect
        except AttributeError:
            self.__inspect = inspect(self)
            return self.__inspect

    @property
    def session(self) -> Session:
        try:
            return self._session
        except AttributeError:
            self._session = self.inspect.session
            return self._session

    @classmethod
    def inspect_cls(cls) -> Mapper:
        try:
            return cls.__inspect_cls
        except AttributeError:
            cls.__inspect_cls = inspect(cls)
            return cls.__inspect_cls

    @classmethod
    def get_relationships(cls) -> Mapping[str, RelationshipProperty]:
        return cls.inspect_cls().relationships

    @classmethod
    def get_columns(cls) -> Mapping[str, Column]:
        return cls.inspect_cls().columns

    # Helper methods

    @classmethod
    def get_col_to_relation_mapping(cls) -> Dict[str, "BaseModel"]:
        result: Dict[str, "BaseModel"] = {}
        for rel in cls.get_relationships().values():
            cols = rel.local_columns
            if len(cols) != 1:
                raise NotImplementedError(
                    "Only relationships with one column are supported"
                )
            col = next(iter(cols))
            result[col.name] = rel
        return result

    @classmethod
    def get_managable_fields(cls) -> Set[str]:
        columns = {
            key for key, value in cls.get_columns().items() if not value.foreign_keys
        }
        relationships = {
            key for key, value in cls.get_relationships().items() if value.backref
        }
        return (
            (columns | relationships | cls.VIRTUAL_FIELDS) - cls.HIDDEN_FIELDS - {"id"}
        )

    @classmethod
    def filter_non_managable_fields(
        cls, data: Dict[str, Any], extra_fields: Optional[Set[str]] = None
    ) -> Dict[str, Any]:
        allowed_fields = cls.get_managable_fields() | (extra_fields or set())
        return {key: value for key, value in data.items() if key in allowed_fields}

    @classmethod
    def get_multiple(
        cls: Type[TBaseModel],
        session: Session,
        model_ids: Iterable[int],
        prefetch_schema: Optional[RecursiveDict] = None,
    ) -> List[TBaseModel]:
        query = session.query(cls)
        tree_node = None
        if prefetch_schema is not None:
            tree_node = ModelTreeNode.from_dict(cls, prefetch_schema)
            query = query.options(*tree_node.build_prefetcher())
        result = query.filter(cls.id.in_(list(model_ids))).all()
        if tree_node is not None:
            for model in result:
                tree_node.save_to_session(session, model)
        return result

    @classmethod
    def get(
        cls: Type[TBaseModel],
        session: Session,
        model_id: int,
        prefetch_schema: Optional[RecursiveDict] = None,
    ) -> TBaseModel:
        if prefetch_schema is None:
            return session.query(cls).get(model_id)
        return cls.get_multiple(session, [model_id], prefetch_schema)[0]

    def get_auth(self, client: "Client") -> "ClientAuth":
        from models.client_auth import ClientAuth

        return ClientAuth.get_for_competition(self.session, client, self.competition_id)

    # User methods

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return ()

    def validate(self) -> None:
        pass

    @classmethod
    def check_create_permission(
        cls, session: Session, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        raise ForbiddenForEveryoneError

    def check_read_permission(self, request: "ApiRequest") -> bool:
        raise ForbiddenForEveryoneError

    def check_update_permission(
        self, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        raise ForbiddenForEveryoneError

    def check_delete_permission(self, request: "ApiRequest") -> bool:
        raise ForbiddenForEveryoneError

    # Creating logic

    @classmethod
    def before_create(
        cls, session: Session, data: Dict[str, Any], *, unsafe: bool
    ) -> Dict[str, Any]:
        # This method can modify data object.
        # It should also return another dict which will be added to original one after filtering
        return {}

    @classmethod
    def create(
        cls: Type[TBaseModel],
        session: Session,
        data: Dict[str, Any],
        mk: "MutationsKeeper",
        *,
        unsafe: bool = False,
    ) -> TBaseModel:
        data = copy.copy(data)
        extra_data = cls.before_create(session, data, unsafe=unsafe)
        if not unsafe:
            data = cls.filter_non_managable_fields(data)
        data.update(extra_data)
        result: TBaseModel = cls(**data)
        session.add(result)
        result.after_create(mk)
        session.flush()
        result.validate()
        result.submit_create_mutations(mk)
        return result

    def after_create(self, mk: "MutationsKeeper") -> None:
        pass

    def submit_create_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_created(self)

    # Updating logic

    def before_update(self, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        return {}

    def update(
        self, data: Dict[str, Any], mk: "MutationsKeeper", *, unsafe: bool = False
    ) -> None:
        data = copy.copy(data)
        extra_data = self.before_update(data, unsafe=unsafe)
        if not unsafe:
            data = self.filter_non_managable_fields(data)
        data.update(extra_data)
        for key, value in data.items():
            setattr(self, key, value)
        self.after_update()
        self.validate()
        self.submit_update_mutations(mk, data)

    def after_update(self) -> None:
        pass

    def submit_update_mutations(
        self, mk: "MutationsKeeper", data: Dict[str, Any]
    ) -> None:
        mk.submit_model_updated(self)

    # Deleting logic

    def before_delete(self) -> None:
        pass

    def delete(self, mk: "MutationsKeeper") -> None:
        self.before_delete()
        session = self.session
        self.submit_delete_mutations(mk)
        self.do_delete()
        self.after_delete(session)

    def do_delete(self) -> None:
        self.session.delete(self)

    def after_delete(self, session: Session) -> None:
        pass

    def submit_delete_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_deleted(self)

    # Inspection logic

    @classmethod
    def __get_column_descriptor(
        cls, name: str, col: Column, fk_mapping: Dict[str, RelationshipProperty]
    ) -> Dict[str, Any]:
        fks: Set[ForeignKey] = col.foreign_keys
        if len(fks) >= 2:
            raise NotImplementedError(
                "Base model doesn't support columns with 2 or more foreign keys"
            )
        if fks:
            ref = fk_mapping[col.name]
            return {
                "name": name,
                "foreign_key_model": ref.mapper.class_.__name__,
                "key": ref.key,
                "backref": ref.back_populates,
            }
        return {"name": name, "foreign_key_model": None}

    @classmethod
    def get_model_descriptor(cls) -> Dict[str, Any]:
        fk_mapping = cls.get_col_to_relation_mapping()
        columns = [
            cls.__get_column_descriptor(name, col, fk_mapping)
            for name, col in cls.get_columns().items()
            if name not in cls.HIDDEN_FIELDS
        ]
        columns += [
            {"name": name, "foreign_key_model": None} for name in cls.VIRTUAL_FIELDS
        ]
        return {"name": cls.__name__, "fields": columns}

    # Serializing logic

    def serialize_extra(self) -> Dict[str, Any]:
        return {}

    def serialize(self) -> Dict[str, Any]:
        result = {
            key: getattr(self, key)
            for key in set(self.get_columns().keys()) | self.VIRTUAL_FIELDS
            if key not in self.HIDDEN_FIELDS
        }
        result.update(self.serialize_extra())
        result.update({"_sorting_key": self.sorting_key})
        result = self.after_serialize(result)
        return result

    def after_serialize(self, data: Dict[str, Any]) -> Dict[str, Any]:
        return data

    @classmethod
    def get_import_params(cls, data: Dict[str, Any], **kwargs: Any) -> Dict[str, Any]:
        result = copy.copy(data)
        if result.get("external_id") == "":
            result["external_id"] = None
        result.update(kwargs)
        return result

    @classmethod
    def load_models_base(
        cls: Type[TBaseModel],
        objects: List[Dict[str, Any]],
        session: Session,
        mk: "MutationsKeeper",
        *,
        prepared: List[Dict[str, Any]] = None,
        **kwargs: Any,
    ) -> Generator[Tuple[TBaseModel, bool, Dict[str, Any]], None, None]:
        if prepared is None:
            prepared = [cls.get_import_params(obj, **kwargs) for obj in objects]
        external_ids = [
            data["external_id"] for data in prepared if "external_id" in data
        ]
        if len(set(external_ids)) != len(external_ids):
            raise ApiError("errors.api.duplicated_external_id")
        if len(external_ids) == 0:
            models_to_update = []
        else:
            models_to_update_condition = cls.external_id.in_(external_ids)
            for key, value in kwargs.items():
                models_to_update_condition = models_to_update_condition & (
                    getattr(cls, key) == value
                )
            models_to_update_query = session.query(cls).filter(
                models_to_update_condition
            )
            models_to_update: Dict[str, BaseModel] = {
                model.external_id: model for model in models_to_update_query.all()
            }
        for obj, data in zip(objects, prepared):
            external_id = data.get("external_id")
            if external_id in models_to_update:
                models_to_update[external_id].update(data, mk)
                yield models_to_update[external_id], False, obj
            else:
                yield cls.create(session, data, mk), True, obj


# class PrefetchedModel:
#     PF_SCHEMA = {}
#     PF_CHILDREN = {}
#
#     def get_sorting_key(self):  # Default
#         return 0
#
#     @classmethod
#     def _isUpperChild(cls, child_name):
#         rel_manager = getattr(cls, child_name)
#         return isinstance(rel_manager, peewee.ForeignKeyField)
#
#     @classmethod
#     def _toUpperRef(cls, child_name):
#         rel_manager = getattr(cls, child_name)
#         return rel_manager.field.name
#
#     @classmethod
#     def _relModel(cls, child_name):
#         rel_manager = getattr(cls, child_name)
#         return rel_manager.rel_model
#
#     @classmethod
#     def _expand_prefetch_schema(cls, schema):
#         result = []
#         for child_name, nested_schema in schema.items():
#             rel_model = cls._relModel(child_name)
#             if cls._isUpperChild(child_name):
#                 result.append({
#                     "model": rel_model,
#                     "ref": child_name,
#                     "ref_dir": "down",
#                     "children": rel_model._expand_prefetch_schema(nested_schema)
#                 })
#             else:
#                 result.append({
#                     "model": rel_model,
#                     "ref": cls._toUpperRef(child_name),
#                     "ref_dir": "up",
#                     "children": rel_model._expand_prefetch_schema(nested_schema)
#                 })
#         return result
#
#     @classmethod
#     def _prefetch_impl(cls, models, schema):
#         if models == []:
#             return []
#         if schema["ref_dir"] == "up":
#             back_ref = getattr(schema["model"], schema["ref"]).related_name
#             ids = [model.id for model in models]
#             db_response = schema["model"].select().where(getattr(schema["model"], schema["ref"]) << ids).execute()
#             children = list(db_response)
#             rev_index = {}
#             for model in models:
#                 setattr(model, back_ref, [])
#                 rev_index[model.id] = model
#             for child_schema in schema["children"]:
#                 children = cls._prefetch_impl(children, child_schema)
#             for child in children:
#                 model = rev_index[getattr(child, schema["ref"] + "_id")]
#                 setattr(child, schema["ref"], model)
#                 getattr(model, back_ref).append(child)
#         else:
#             ids = [getattr(model, schema["ref"] + "_id") for model in models]
#             db_response = schema["model"].select().where(getattr(schema["model"], "id") << ids).execute()
#             children = list(db_response)
#             rev_index = {}
#             for child in children:
#                 rev_index[child.id] = child
#             for child_schema in schema["children"]:
#                 children = cls._prefetch_impl(children, child_schema)
#             for model in models:
#                 setattr(model, schema["ref"], rev_index[getattr(model, schema["ref"] + "_id")])
#         return models
#
#     @classmethod
#     def _merge_schemas(cls, base, delta):
#         for key in delta:
#             if key not in base:
#                 base[key] = delta[key]
#             else:
#                 base[key] = cls._merge_schemas(base[key], delta[key])
#         return base
#
#     @classmethod
#     def _gen_prefetch_schema(cls, s_schema):
#         def replace_none(base, model, next_s_schema):
#             for key in base:
#                 child_model = getattr(model, key).rel_model
#                 if base[key] is None:
#                     base[key] = child_model._gen_prefetch_schema(next_s_schema)
#                 else:
#                     base[key] = replace_none(base[key], child_model, next_s_schema)
#             return base
#
#         pf_schema = copy.deepcopy(cls.PF_SCHEMA)
#         pf_children = copy.deepcopy(cls.PF_CHILDREN)
#         for key in pf_children:
#             if pf_children[key] is None:
#                 pf_children[key] = {
#                     key: None
#                 }
#             if key in s_schema:
#                 buf = pf_children[key]
#                 buf = replace_none(buf, cls, s_schema[key])
#                 pf_schema = cls._merge_schemas(pf_schema, buf)
#         return pf_schema
#
#     @classmethod
#     def _optimize_prefetch_schema_impl(cls, schema, last_model=None):
#         keys = deque(schema.keys())
#         to_visit = set(schema.keys())
#         while len(keys) > 0:
#             key = keys.popleft()
#             to_visit.discard(key)
#             next_model = cls._relModel(key)
#             if cls._isUpperChild(key) and next_model == last_model:
#                 yield schema.pop(key)
#             else:
#                 for subschema in next_model._optimize_prefetch_schema_impl(schema[key], cls):
#                     for next_key in subschema:
#                         if next_key not in to_visit:
#                             keys.append(next_key)
#                             to_visit.add(next_key)
#                     schema = cls._merge_schemas(schema, subschema)
#         if last_model is None:
#             yield schema
#
#     @classmethod
#     def _optimize_prefetch_schema(cls, schema):
#         return next(cls._optimize_prefetch_schema_impl(schema))
#
#     def prefetch(self, schema):
#         new_schema = self._expand_prefetch_schema(schema)
#         for child_schema in new_schema:
#             self._prefetch_impl([self], child_schema)
#         return self
#
#     def smart_prefetch(self, s_schema):
#         pf_schema = self._gen_prefetch_schema(s_schema)
#         pf_schema = self._optimize_prefetch_schema(pf_schema)
#         self.prefetch(pf_schema)
#
#     @classmethod
#     def smart_prefetch_multiple(cls, models, s_schema):
#         pf_schema = cls._gen_prefetch_schema(s_schema)
#         pf_schema = cls._optimize_prefetch_schema(pf_schema)
#         new_schema = cls._expand_prefetch_schema(pf_schema)
#         for child_schema in new_schema:
#             cls._prefetch_impl(models, child_schema)


# class BaseModel(peewee.Model, PrefetchedModel):
#     class Meta:
#         database = Database.instance().db
#
#     RW_PROPS = []
#     RO_PROPS = []
#
#     def get_back_ref(self, field):
#         return None
#
#     def serialize_as_child(self, children, serializer=None):
#         if serializer is None:
#             serializer = lambda x, c: x.serialize(children=c)
#         return {
#             "model": self.__class__.__name__,
#             "id": self.id,
#             "data": serializer(self, children)
#         }
#
#     def serialize_upper_child(self, current_result, child_name, all_children, serializer=None):
#         if child_name in all_children:
#             current_result["^" + child_name] = \
#                 getattr(self, child_name).serialize_as_child(all_children[child_name], serializer)
#         return current_result
#
#     def serialize_lower_child(self, current_result, child_name, all_children, serializer=None):
#         if child_name in all_children:
#             sorted_children = sorted(getattr(self, child_name), key=lambda x: x.get_sorting_key())
#             back_ref = self.get_back_ref(child_name)
#             if back_ref is None:
#                 back_ref = getattr(self.__class__, child_name).field.name
#             current_result["*" + child_name] = {
#                 "back_ref": back_ref,
#                 "children": [
#                     child.serialize_as_child(all_children[child_name], serializer)
#                     for child in sorted_children
#                 ]
#             }
#         return current_result
#
#     def get_attr_count(self, attr):
#         value = getattr(self, attr)
#         if type(value) == list:
#             return len(value)
#         return value.count()
#
#
#     def update_model_base(self, data, **kwargs):
#         for key, value in self.gen_model_kwargs(data, **kwargs).items():
#             if key == "external_id" and value == "":
#                 value = None
#             setattr(self, key, value)
#         self.save()
#
#     def serialize_props(self):
#         return {
#             key: getattr(self, key)
#             for key in self.RW_PROPS + self.RO_PROPS
#         }
#
#     def serialize(self, children={}):
#         return self.serialize_props()
