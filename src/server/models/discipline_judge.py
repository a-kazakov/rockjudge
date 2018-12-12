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
    discipline_id = Column(
        Integer, ForeignKey("disciplines.id", ondelete="CASCADE"), nullable=False
    )
    judge_id = Column(
        Integer, ForeignKey("judges.id", ondelete="CASCADE"), nullable=False
    )
    role = Column(String)

    discipline = relationship(
        Discipline, backref=backref("discipline_judges", cascade="delete")
    )
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

    def check_read_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level != AccessLevel.NONE

    # Create logic

    def after_create(self, mk: "MutationsKeeper") -> None:
        from models.run import Run
        from models.score import Score

        all_runs_tups = (
            self.session.query(Run.id)
            .join(Tour)
            .filter_by(discipline_id=self.discipline_id)
        )
        all_runs_ids = [id_ for (id_,) in all_runs_tups]
        for run_id in all_runs_ids:
            Score.create(
                self.session,
                {"run_id": run_id, "discipline_judge": self},
                mk,
                unsafe=True,
            )

    def submit_create_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_created(self)
        mk.submit_discipline_results_update(self.discipline)

    # Update logic

    def submit_update_mutations(
        self, mk: "MutationsKeeper", data: Dict[str, Any]
    ) -> None:
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
            judge.external_id: judge for judge in discipline.competition.judges
        }
        new_judges_data = [
            dict([("judge_id", rev_judges[obj["judge"]].id)] + list(obj.items()))
            for obj in objects
        ]
        discipline.set_judges(new_judges_data, mk)
