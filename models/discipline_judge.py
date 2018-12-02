from typing import Any, Dict, Iterable, TYPE_CHECKING, Tuple, Union, List

from sqlalchemy import Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import backref, relationship

from db import ModelBase
from enums import AccessLevel
from models.base_model import BaseModel
from models.discipline import Discipline
from models.judge import Judge
from models.tour import Tour


if TYPE_CHECKING:
    from api import ApiRequest
    from models.run_acrobatic import RunAcrobatic
    from models.score import Score
    from mutations import MutationsKeeper


class DisciplineJudge(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "discipline_judges"

    __table_args__ = (
        UniqueConstraint("discipline_id", "judge_id", name="competition_judge_id"),
    )

    id = Column(Integer, primary_key=True)
    discipline_id = Column(Integer, ForeignKey("disciplines.id", ondelete="CASCADE"), nullable=False)
    judge_id = Column(Integer, ForeignKey("judges.id", ondelete="CASCADE"), nullable=False)
    role = Column(String)

    discipline = relationship(Discipline, backref=backref("discipline_judges", cascade="delete"))
    judge = relationship(Judge, backref=backref("discipline_judges", cascade="delete"))

    acrobatics_reviewed: Iterable["RunAcrobatic"]
    scores: Iterable["Score"]

    # Virtual fields

    @property
    def competition_id(self) -> int:
        return self.judge.competition_id

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return self.judge.sorting_key

    def validate(self) -> None:
        if self.judge.competition_id != self.discipline.competition_id:
            raise ValueError("Discipline and judge must belong to the same competition")

    # Permissions

    # @classmethod
    # def check_create_permission(cls, session: Session, request: "ApiRequest", data: Dict[str, Any]) -> bool:
    #     competition_id = session.query(Judge).get(data["judge_id"]).competition_id
    #     auth = ClientAuth.get(session, request.client, competition_id)
    #     return auth.access_level == AccessLevel.ADMIN

    def check_read_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level != AccessLevel.NONE
    #
    # def check_update_permission(self, request: "ApiRequest", data: Dict[str, Any]) -> bool:
    #     return self.get_auth(request.client).access_level == AccessLevel.ADMIN
    #
    # def check_delete_permission(self, request: "ApiRequest") -> bool:
    #     return self.get_auth(request.client).access_level == AccessLevel.ADMIN

    # Create logic

    def after_create(self, mk: "MutationsKeeper") -> None:
        from models.run import Run
        from models.score import Score
        all_runs_tups = self.session.query(Run.id).join(Tour).filter_by(discipline_id=self.discipline_id)
        all_runs_ids = [id_ for (id_,) in all_runs_tups]
        for run_id in all_runs_ids:
            Score.create(
                self.session,
                {
                    "run_id": run_id,
                    "discipline_judge": self,
                },
                mk,
                unsafe=True,
            )

    def submit_create_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_created(self)
        mk.submit_discipline_results_update(self.discipline)

    # Update logic

    def submit_update_mutations(self, mk: "MutationsKeeper", data: Dict[str, Any]) -> None:
        mk.submit_model_updated(self)
        mk.submit_discipline_results_update(self.discipline)

    # Delete logic

    def submit_delete_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_deleted(self)
        mk.submit_discipline_results_update(self.discipline)

    # Serialization logic

    # Custom model logic

    @classmethod
    def load_models(
        cls,
        discipline: Discipline,
        objects: List[Dict[str, Any]],
        mk: "MutationsKeeper",
    ) -> None:
        rev_judges: Dict[str, Judge] = {
            judge.external_id: judge
            for judge in discipline.competition.judges
        }
        new_judges_data = [
            dict(
                [("judge_id", rev_judges[obj["judge"]].id)] +
                list(obj.items())
            ) for obj in objects
        ]
        discipline.set_judges(new_judges_data, mk)

    # @classmethod
    # def create_model(cls, discipline, judge, data, ws_message):
    #     kwargs = cls.gen_model_kwargs(data, discipline=discipline, judge=judge)
    #     cls.create(**kwargs)
    #     ws_message.add_message("reload_data")
    #
    # def update_model(self, new_data, ws_message):
    #     self.update_model_base(new_data)
    #     ws_message.add_model_update(
    #         model_type=Discipline,
    #         model_id=self.discipline_id,
    #         schema={
    #             "judges": {},
    #         }
    #     )
    #
    # def delete_model(self, ws_message):
    #     from models import (
    #         Run,
    #         Tour,
    #     )
    #     num_finalized_tours = self.discipline.raw_tours.where(Tour.finalized == True).count()  # NOQA
    #     if num_finalized_tours > 0:
    #         raise ApiError("errors.discipline_judge.delete_with_finalized")
    #     if self.get_attr_count("score_set") > 0:
    #         raise ApiError("errors.discipline_judge.delete_with_scores")
    #     self.delete_instance()
    #     ws_message.add_message("reload_data")
    # def serialize(self, children={}):
    #     result = self.serialize_props()
    #     result = self.serialize_upper_child(result, "judge", children)
    #     result = self.serialize_upper_child(result, "discipline", children)
    #     return result
    #
    # def export(self):
    #     result = self.serialize_props()
    #     result.update({
    #         "id": self.id,
    #         "judge_id": self.judge_id,
    #     })
    #     return result
