from __future__ import annotations

from typing import Any, Dict, Iterable, TYPE_CHECKING, Tuple, Union, List

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import Session, relationship

from db import SqlAlchemyModel
from enums import AccessLevel
from exceptions import ApiError
from models.base_model import BaseModel
from models.client_auth import ClientAuth
from models.competition import Competition

if TYPE_CHECKING:
    from api import ApiRequest
    from models.discipline_judge import DisciplineJudge
    from mutations import MutationsKeeper


class Judge(SqlAlchemyModel, BaseModel):
    # DB schema

    __tablename__ = "judges"

    id = Column(Integer, primary_key=True)
    competition_id = Column(
        Integer, ForeignKey("competitions.id", ondelete="RESTRICT"), nullable=False
    )
    number = Column(String, default="", nullable=False)
    name = Column(String, default="", nullable=False)
    category = Column(String, default="", nullable=False)
    role_description = Column(String, default="", nullable=False)
    sp = Column(Integer, default=0, nullable=False)
    external_id = Column(String, nullable=True)

    competition = relationship("Competition", backref="judges")

    discipline_judges: Iterable[DisciplineJudge]

    # Virtual fields

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.sp, self.number, self.role_description, self.name)

    # Permissions

    @classmethod
    def check_create_permission(
        cls, session: Session, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        auth = ClientAuth.get_for_competition(
            session, request.client, data["competition_id"]
        )
        return auth.access_level == AccessLevel.ADMIN

    def check_read_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level != AccessLevel.NONE

    def check_update_permission(
        self, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        return self.get_auth(request.client).access_level == AccessLevel.ADMIN

    def check_delete_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level == AccessLevel.ADMIN

    # Create logic

    @classmethod
    def before_create(
        cls, session: Session, data: Dict[str, Any], *, unsafe: bool
    ) -> Dict[str, Any]:
        return {"competition": session.query(Competition).get(data["competition_id"])}

    # Update logic

    def submit_update_mutations(
        self, mk: "MutationsKeeper", data: Dict[str, Any]
    ) -> None:
        mk.submit_model_updated(self)
        for dj in self.discipline_judges:
            mk.submit_model_updated(dj)

    # Delete logic

    def before_delete(self) -> None:
        from models.discipline_judge import DisciplineJudge

        if self.session.query(DisciplineJudge).filter_by(judge_id=self.id).count() > 0:
            raise ApiError("errors.judge.delete_with_disciplines")

    # Serialization logic

    # Custom model logic

    @classmethod
    def load_models(
        cls,
        competition: Competition,
        objects: List[Dict[str, Any]],
        mk: "MutationsKeeper",
    ) -> None:
        for _ in cls.load_models_base(
            objects, competition.session, mk, competition_id=competition.id
        ):
            pass
