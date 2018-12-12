from typing import Any, Dict, Iterable, TYPE_CHECKING, Tuple, Union, List

from sqlalchemy import Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Session, relationship

from db import ModelBase
from enums import AccessLevel
from exceptions import ApiError
from models.base_model import BaseModel
from models.client_auth import ClientAuth
from models.competition import Competition


if TYPE_CHECKING:
    from api import ApiRequest
    from models.participant import Participant
    from mutations import MutationsKeeper


class Club(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "clubs"

    __table_args__ = (
        UniqueConstraint(
            "competition_id", "external_id", name="competition_external_id_idx"
        ),
    )

    id = Column(Integer, primary_key=True)
    competition_id = Column(
        Integer, ForeignKey("competitions.id", ondelete="RESTRICT"), nullable=False
    )
    name = Column(String, nullable=False)
    city = Column(String, nullable=False)
    external_id = Column(String, nullable=True)

    competition = relationship(Competition, backref="clubs")

    participants: Iterable["Participant"]

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.name, self.city)

    def validate(self) -> None:
        if self.name == "":
            raise ValueError("Club name shouldn't be empty")

    # Permissions

    @classmethod
    def check_create_permission(
        cls, session: Session, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        auth = ClientAuth.get_for_competition(
            session, request.client, int(data["competition_id"])
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
    # (default)

    # Delete logic

    def before_delete(self) -> None:
        from models.participant import Participant

        if self.session.query(Participant).filter_by(club=self).count() > 0:
            raise ApiError("errors.club.delete_with_participants")

    # Serialization logic
    # (default)

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
