import json
from typing import (
    Any,
    Dict,
    Iterable,
    List,
    NamedTuple,
    TYPE_CHECKING,
    Tuple,
    Union,
    Optional,
)

from sqlalchemy import Column, ForeignKey, Integer, JSON, String, UniqueConstraint
from sqlalchemy.orm import Session, relationship

from db import ModelBase
from enums import AccessLevel
from exceptions import ApiError
from models.base_model import BaseModel
from models.client_auth import ClientAuth
from models.club import Club
from models.discipline import Discipline
from models.tour import Tour


if TYPE_CHECKING:
    from api import ApiRequest
    from models.run import Run
    from models.program import Program
    from mutations import MutationsKeeper


class Sportsman(NamedTuple):
    first_name: str
    last_name: str
    year_of_birth: int
    gender: str
    substitute: bool = False

    @classmethod
    def create(cls, **kwargs: Any) -> "Sportsman":
        result = cls(**kwargs)
        result.validate()
        return result

    @classmethod
    def from_dict(cls, src: Dict[str, Any]) -> "Sportsman":
        return cls.create(**src)

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (
            self.substitute,
            self.gender,
            self.last_name,
            self.first_name,
            self.year_of_birth,
        )

    def validate(self) -> None:
        for key, type_ in self._field_types.items():
            if not isinstance(getattr(self, key), type_):
                src_type = type(getattr(self, key))
                raise TypeError(
                    f"Sportsman.{key} has invalid type {src_type}. Expected {type_}."
                )
        if self.first_name == "":
            raise ValueError("First name can't be empty")
        if self.last_name == "":
            raise ValueError("Last name can't be empty")
        if self.year_of_birth < 0:
            raise ValueError("Year of birth can't be negative")
        if self.gender not in ("M", "F"):
            raise ValueError("Gender value should be either M or F")

    def to_dict(self) -> Dict[str, Any]:
        return self._asdict()


class Participant(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "participants"

    __table_args__ = (
        UniqueConstraint(
            "discipline_id", "external_id", name="discipline_external_id_idx"
        ),
    )

    id = Column(Integer, primary_key=True)
    discipline_id = Column(
        Integer, ForeignKey("disciplines.id", ondelete="RESTRICT"), nullable=False
    )
    formation_name = Column(String, default="", nullable=False)
    coaches = Column(String(5000))
    number = Column(Integer, default=0, nullable=False)
    club_id = Column(
        Integer, ForeignKey("clubs.id", ondelete="RESTRICT"), nullable=False
    )
    external_id = Column(String, nullable=True)
    sportsmen_json = Column(JSON, default=[], nullable=False)

    discipline = relationship(Discipline, backref="participants")
    club = relationship(Club, backref="participants")

    programs: Iterable["Program"]
    runs: Iterable["Run"]

    HIDDEN_FIELDS = {"sportsmen_json"}

    # Virtual fields

    @property
    def competition_id(self) -> int:
        return self.discipline.competition_id

    @property
    def sportsmen(self) -> List[Sportsman]:
        try:
            return self.__sportsmen
        except AttributeError:
            raw_data = self.sportsmen_json
            if not isinstance(raw_data, list):
                raw_data = []
            result = sorted(
                [Sportsman.from_dict(raw_sportsman) for raw_sportsman in raw_data],
                key=lambda s: s.sorting_key,
            )
            self.__sportsmen = result
            return result

    @sportsmen.setter
    def sportsmen(self, value: List[Sportsman]) -> None:
        self.sportsmen_json = [s.to_dict() for s in value]
        try:
            del self.__sportsmen
        except AttributeError:
            pass

    @property
    def name(self):
        if not self.formation_name:
            sportsmen = sorted(self.sportsmen, key=lambda s: (s.gender, s.last_name))
            return " – ".join([f"{s.last_name} {s.first_name}" for s in sportsmen])
        return self.formation_name

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.number, self.formation_name, self.external_id)

    def validate(self) -> None:
        if self.club.competition_id != self.discipline.competition_id:
            raise ValueError("Discipline and club must belong to the same competition")

    # Permissions

    @classmethod
    def check_create_permission(
        cls, session: Session, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        competition_id = (
            session.query(Discipline).get(data["discipline_id"]).competition_id
        )
        auth = ClientAuth.get_for_competition(session, request.client, competition_id)
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
        return {
            "discipline": session.query(Discipline).get(data["discipline_id"]),
            "club": session.query(Club).get(data["club_id"]),
            "sportsmen": [Sportsman.from_dict(sp) for sp in data.pop("sportsmen")],
        }

    # Update logic

    def before_update(self, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        extra = {}
        if "sportsmen" in data:
            extra["sportsmen"] = [
                Sportsman.from_dict(sp) for sp in data.pop("sportsmen")
            ]
        if "club_id" in data:
            extra["club_id"] = (self.session.query(Club).get(data["club_id"]).id,)
        return extra

    # Delete logic

    def before_delete(self) -> None:
        from models.run import Run

        finalized_count = (
            self.session.query(Run)
            .filter_by(participant=self)
            .join(Tour)
            .filter_by(finalized=True)
            .count()
        )
        if finalized_count > 0:
            raise ApiError("errors.participant.delete_with_finalized_tours")

    # Serialization logic

    def serialize_extra(self) -> Dict[str, Any]:
        return {"name": self.name, "sportsmen": [s.to_dict() for s in self.sportsmen]}

    # Custom model logic

    # DB operations

    # Fields custom logic

    def is_couple(self) -> bool:
        return len(self.sportsmen_json) == 2

    def is_solo(self) -> bool:
        return len(self.sportsmen_json) == 1

    def get_default_program(self, program_key: str) -> Optional["Program"]:
        for program in self.programs:
            if (
                program.default_for is not None
                and program_key in program.default_for.split(",")
            ):
                return program
        return None

    @classmethod
    def load_models(
        cls,
        discipline: Discipline,
        objects: List[Dict[str, Any]],
        mk: "MutationsKeeper",
    ) -> None:
        from models.program import Program

        clubs: Dict[str, Club] = {
            club.external_id: club
            for club in discipline.competition.clubs
            if club.external_id is not None
        }
        prepared = [
            cls.get_import_params(
                obj, discipline_id=discipline.id, club_id=clubs[obj["club"]].id
            )
            for obj in objects
        ]
        for model, created, raw_data in cls.load_models_base(
            objects,
            discipline.session,
            mk,
            prepared=prepared,
            discipline_id=discipline.id,
        ):
            Program.load_models(model, raw_data["programs"], mk)
