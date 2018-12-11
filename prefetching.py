import itertools
from typing import (
    Any,
    Callable,
    Dict,
    Generator,
    NamedTuple,
    Optional,
    Type,
    TypeVar,
    TYPE_CHECKING,
)

from sqlalchemy.orm import joinedload, relationship, subqueryload, selectinload, Session
from sqlalchemy.orm.strategy_options import loader_option, Load

from db import db


if TYPE_CHECKING:
    from models.base_model import BaseModel

# Ideally this should be like this but it breaks PyCharm completely
# RecursiveDict = Dict[str, "RecursiveDict"]
RecursiveDict = Dict[str, Dict[str, Dict[str, Dict[str, Dict[str, Any]]]]]

T = TypeVar("T", bound=Callable)


class ModelTreeNode(NamedTuple):
    model: Type["BaseModel"]
    upper_children: Dict[str, "ModelTreeNode"]
    lower_children: Dict[str, "ModelTreeNode"]

    @classmethod
    def from_dict(
        cls, model_type: Type["BaseModel"], data: RecursiveDict
    ) -> "ModelTreeNode":
        upper_children: Dict[str, "ModelTreeNode"] = {}
        lower_children: Dict[str, "ModelTreeNode"] = {}
        relationships = model_type.get_relationships()
        for key, value in data.items():
            rel = relationships[key]
            next_node = ModelTreeNode.from_dict(rel.mapper.class_, value)
            if rel.uselist:
                lower_children[key] = next_node
            else:
                upper_children[key] = next_node
        return cls(model_type, upper_children, lower_children)

    @staticmethod
    def uprgade_prefetcher(
        base: Optional[loader_option], rel: relationship, *, use_joined: bool
    ) -> loader_option:
        if base is None:
            if use_joined:
                return joinedload(rel)
            else:
                return selectinload(rel)
        else:
            if use_joined:
                return base.joinedload(rel)
            else:
                return base.selectinload(rel)

    def build_prefetcher(
        self, parent: Optional[loader_option] = None
    ) -> Generator[loader_option, None, None]:
        for rel_name, child in self.lower_children.items():
            next_pf = self.uprgade_prefetcher(
                parent, getattr(self.model, rel_name), use_joined=False
            )
            yield next_pf
            yield from child.build_prefetcher(next_pf)
        for rel_name, child in self.upper_children.items():
            next_pf = self.uprgade_prefetcher(
                parent, getattr(self.model, rel_name), use_joined=True
            )
            yield next_pf
            yield from child.build_prefetcher(next_pf)

    def save_to_session(self, session: Session, model: "BaseModel") -> None:
        db.add_to_session_context(session, model)
        for rel_name, child in self.lower_children.items():
            for next_model in getattr(model, rel_name):
                child.save_to_session(session, next_model)
        for rel_name, child in self.upper_children.items():
            next_model = getattr(model, rel_name)
            child.save_to_session(session, next_model)


def merge_prefetch_schema(*args: RecursiveDict) -> RecursiveDict:
    all_keys = set(itertools.chain.from_iterable(a.keys() for a in args))
    return {
        key: merge_prefetch_schema(*(a[key] for a in args if key in a))
        for key in all_keys
    }
