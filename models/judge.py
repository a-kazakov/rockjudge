from typing import Any, Dict, Iterable, TYPE_CHECKING, Tuple, Union, List

from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import Session, relationship

from db import ModelBase
from enums import AccessLevel
from exceptions import ApiError
from models.base_model import BaseModel
from models.client_auth import ClientAuth
from models.competition import Competition


if TYPE_CHECKING:
    from api import ApiRequest
    from models.discipline_judge import DisciplineJudge
    from mutations import MutationsKeeper


class Judge(ModelBase, BaseModel):
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

    discipline_judges: Iterable["DisciplineJudge"]

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

    # RW_PROPS = ["name", "category", "role_description", "number", "sp", "external_id"]
    #
    # PF_CHILDREN = {
    #     "competition": None,
    #     "discipline_judges": None,
    # }
    #
    # @classmethod
    # def load_models(cls, competition, objects):
    #     list(cls.load_models_base(objects, competition=competition))
    #
    # @classmethod
    # def create_model(cls, competition, data, ws_message):
    #     kwargs = cls.gen_model_kwargs(data, competition=competition)
    #     cls.create(**kwargs)
    #     ws_message.add_message("reload_data")
    #
    # def update_model(self, new_data, ws_message):
    #     self.update_model_base(new_data)
    #     ws_message.add_message("reload_data")
    #
    # def delete_model(self, ws_message):
    #     from models import DisciplineJudge
    #     discipline_judges_count = DisciplineJudge.select().where(
    #         (DisciplineJudge.judge == self) &
    #         (~(DisciplineJudge.discipline >> None))
    #     ).count()
    #     if discipline_judges_count > 0:
    #         raise ApiError("errors.judge.delete_with_disciplines")
    #     self.delete_instance()
    #     ws_message.add_message("reload_data")
    #
    # def get_sorting_key(self):  # TODO: move this logic to scoring system
    #     return

    # def serialize(self, children={}):
    #     result = self.serialize_props()
    #     result = self.serialize_upper_child(result, "competition", children)
    #     result = self.serialize_lower_child(result, "discipline_judges", children)
    #     return result
    #
    # def export(self):
    #     result = self.serialize_props()
    #     result.update({
    #         "id": self.id,
    #     })
    #     return result
