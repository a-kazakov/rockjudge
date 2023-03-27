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
    cast,
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

    __allow_unmapped__ = True

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
        return {
            **data,
            **({"external_id": None} if data.get("external_id") == "" else {}),
            **kwargs,
        }

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

    def export_self_only(self) -> Dict[str, Any]:
        return {"name": type(self).__name__, "data": self.serialize()}

    def get_export_items(
        self, mut_visited: Set[Tuple[str, int]]
    ) -> Generator[Dict[str, Any], None, None]:
        descriptor = (type(self).__name__, self.id)
        if descriptor in mut_visited:
            return
        mut_visited.add(descriptor)
        yield self.export_self_only()
        for name, rel in self.get_relationships().items():
            if not rel.uselist:
                continue
            for item in getattr(self, name):
                yield from cast(BaseModel, item).get_export_items(mut_visited)

    def export(self) -> List[Dict[str, Any]]:
        return list(self.get_export_items(set()))
