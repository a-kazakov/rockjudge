from typing import Any, Dict, Optional, Tuple, Union, TYPE_CHECKING, Generator, Set

from sqlalchemy import Column, Enum as EnumColumn, ForeignKey, Integer, UniqueConstraint
from sqlalchemy.orm import Session, relationship, backref

from db import ModelBase
from enums import AccessLevel
from exceptions import ApiError, InternalError
from models.base_model import BaseModel
from models.client import Client
from models.competition import Competition


if TYPE_CHECKING:
    from api import ApiRequest


class ClientAuth(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "client_authorizations"

    __table_args__ = (
        UniqueConstraint("client_id", "competition_id", name="client_competition_idx"),
    )

    id = Column(Integer, primary_key=True)
    client_id = Column(
        Integer, ForeignKey("clients.id", ondelete="CASCADE"), nullable=False
    )
    competition_id = Column(
        Integer, ForeignKey("competitions.id", ondelete="RESTRICT"), nullable=False
    )
    judge_id = Column(
        Integer, ForeignKey("judges.id", ondelete="CASCADE"), nullable=True
    )
    access_level = Column(
        EnumColumn(AccessLevel), nullable=False, default=AccessLevel.NONE
    )

    client = relationship(Client, backref=backref("authorizations", cascade="delete"))
    competition = relationship(Competition, backref="clients")
    judge = relationship("Judge", backref=backref("authorizations", cascade="delete"))

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.client_id,)

    def validate(self) -> None:
        is_judge_access_level = self.access_level == AccessLevel.JUDGE
        is_judge_id_set = self.judge_id is not None
        if is_judge_access_level != is_judge_id_set:
            raise InternalError("judge_id should only be set with access_level judge")
        if self.judge is not None and self.judge.competition_id != self.competition_id:
            raise InternalError("Judge is from another competition")

    # Permissions

    @classmethod
    def check_create_permission(
        cls, session: Session, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        return data["client_id"] == request.client.id

    def check_read_permission(self, request: "ApiRequest") -> bool:
        auth = self.get_auth(request.client)
        if auth.access_level == AccessLevel.ADMIN:
            return True
        if auth.client_id == request.client.id:
            return True
        return False

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
        client = session.query(Client).get(data["client_id"])
        competition = session.query(Competition).get(data["competition_id"])
        data.update({"client": client, "competition": competition})
        return {"access_level": AccessLevel.NONE}

    # Update logic

    def before_update(self, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        from models.judge import Judge

        extra: Dict[str, Any] = {}
        if "access_level" in data:
            data["access_level"] = AccessLevel(data["access_level"])
        if "judge_id" in data:
            if data["judge_id"] is None:
                extra["judge_id"] = None
            else:
                judge = (
                    self.session.query(Judge)
                    .filter_by(competition_id=self.competition_id, id=data["judge_id"])
                    .first()
                )
                extra["judge_id"] = None if judge is None else judge.id
        return extra

    # Delete logic
    # (default)

    # Serialization logic

    def serialize_extra(self) -> Dict[str, Any]:
        return {"access_level": self.access_level.value}

    def get_export_items(
        self, _mut_visited: Set[Tuple[str, int]]
    ) -> Generator[Dict[str, Any], None, None]:
        return
        yield

    # Custom model logic

    @classmethod
    def get_for_competition(
        cls, session: Session, client: "Client", competition_id: int
    ) -> "ClientAuth":
        auth = (
            session.query(ClientAuth)
            .filter_by(client_id=client.id, competition_id=competition_id)
            .first()
        )
        if auth is None:
            raise ApiError("errors.auth.not_authenticated")
        return auth
