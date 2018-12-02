from typing import Any, Dict, Iterable, TYPE_CHECKING, Tuple, Union

from sqlalchemy import Boolean, Column, Integer, JSON, String
from sqlalchemy.orm import Session

from db import ModelBase
from enums import AccessLevel
from exceptions import ApiError
from models.base_model import BaseModel
from protection import import_file_protector


if TYPE_CHECKING:
    from api import ApiRequest
    from models.client_auth import ClientAuth
    from models.club import Club
    from models.competition_plan_item import CompetitionPlanItem
    from models.discipline import Discipline
    from models.judge import Judge
    from mutations import MutationsKeeper


# def serialize_competition_info(raw_data):
#     return json.dumps([
#         [str(row[0]), str(row[1])]
#         for row in raw_data
#     ], check_circular=False)


class Competition(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "competitions"

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    date = Column(String, nullable=False)
    info = Column(JSON, default=[], nullable=False)
    active = Column(Boolean, default=True, nullable=False)
    screen_data = Column(JSON, default={}, nullable=False)
    rules_set = Column(String, nullable=False)
    deleted = Column(Boolean, default=False, nullable=False)

    clients: Iterable["ClientAuth"]
    clubs: Iterable["Club"]
    plan: Iterable["CompetitionPlanItem"]
    disciplines: Iterable["Discipline"]
    judges: Iterable["Judge"]

    # Virtual fields

    @property
    def competition_id(self) -> int:
        return self.id

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.date, self.name)

    def validate(self) -> None:
        if not isinstance(self.screen_data, dict):
            raise ValueError("screen_data must be dict")
        # TODO: validate rules_set

    # Permissions

    @classmethod
    def check_create_permission(cls, session: Session, request: "ApiRequest", data: Dict[str, Any]) -> bool:
        return False

    def check_read_permission(self, request: "ApiRequest") -> bool:
        return True

    def check_update_permission(self, request: "ApiRequest", data: Dict[str, Any]) -> bool:
        auth = self.get_auth(request.client)
        if auth.access_level == AccessLevel.ADMIN:
            return True
        if set(data.keys()) == {"screen_data"} and auth.access_level == AccessLevel.PRESENTER:
            return True
        return False

    def check_delete_permission(self, request: "ApiRequest") -> bool:
        return False

    # Create logic

    @classmethod
    def before_create(cls, session: Session, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        data.pop("deleted", None)
        return {}

    # Update logic

    def before_update(self, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        data.pop("deleted", None)
        data.pop("rules_set", None)
        return {}

    # Delete logic

    def do_delete(self) -> None:
        self.deleted = True
        self.active = False

    # Serialization logic

    # Custom model logic

    def load(self, encoded_data: str, items: Dict[str, Any], mk: "MutationsKeeper") -> None:
        from models.club import Club
        from models.competition_plan_item import CompetitionPlanItem
        from models.discipline import Discipline
        from models.judge import Judge

        data = import_file_protector.decode(encoded_data)
        if data is None:
            raise ApiError("errors.admin.load_syntax_error")
        if "clubs" in data and items["clubs"]:
            Club.load_models(self, data["clubs"], mk)
        if "judges" in data and items["judges"]:
            Judge.load_models(self, data["judges"], mk)
        if "disciplines" in data and items["disciplines"]:
            Discipline.load_models(self, data["disciplines"], items, mk)
        if "plan" in data and items["plan"]:
            CompetitionPlanItem.load_models(self, data["plan"], mk)

    # def serialize(self, children={}):
    #     result = self.serialize_props()
    #     result = self.serialize_lower_child(result, "disciplines", children)
    #     result = self.serialize_lower_child(result, "judges", children)
    #     result = self.serialize_lower_child(result, "clubs", children)
    #     result = self.serialize_lower_child(result, "plan", children)
    #     result = self.serialize_lower_child(result, "clients", children)
    #     return result

    # def export(self):
    #     SCHEMA = {
    #         "disciplines": {
    #             "tours": {
    #                 "runs": {
    #                     "scores": {},
    #                 }
    #             },
    #             "discipline_judges": {},
    #             "participants": {
    #                 "programs": {},
    #             },
    #         },
    #         "judges": {},
    #         "clubs": {},
    #         "plan": {}
    #     }
    #     self.smart_prefetch(SCHEMA)
    #     result = self.serialize_props()
    #     result.update({
    #         "version": settings.VERSION,
    #         "disciplines": [
    #             discipline.export()
    #             for discipline in self.disciplines
    #         ],
    #         "judges": [
    #             judge.export()
    #             for judge in self.judges
    #         ],
    #         "clubs": [
    #             club.export()
    #             for club in self.clubs
    #         ],
    #         "plan": [
    #             item.export()
    #             for item in self.plan
    #         ]
    #     })
    #     return result

    # def get_active_tours(self, session: Session) -> List["Tour"]:
    #     from models import (
    #         Discipline,
    #         Tour,
    #     )
    #     return list(session.query(Tour).filter(
    #         (Tour.active == True) &
    #         (Discipline.competition == self)
    #     ))
    #


# competition_proxy.initialize(Competition)
