from typing import Any, Dict, Iterable, TYPE_CHECKING, Tuple, Union

from sqlalchemy import Boolean, Column, ForeignKey, Integer
from sqlalchemy.orm import relationship, backref

from db import ModelBase
from enums import AccessLevel
from exceptions import ApiError
from models.base_model import BaseModel
from models.discipline_judge import DisciplineJudge
from models.run import Run
from scoring_systems.base import JudgeId, ScoreId, ScoreInfo


if TYPE_CHECKING:
    from api import ApiRequest
    from models.score_part import ScorePart
    from mutations import MutationsKeeper


class Score(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "scores"

    id = Column(Integer, primary_key=True)
    run_id = Column(Integer, ForeignKey("runs.id", ondelete="CASCADE"))
    discipline_judge_id = Column(Integer, ForeignKey("discipline_judges.id", ondelete="CASCADE"))
    confirmed = Column(Boolean, default=False, nullable=False)

    run = relationship(Run, backref=backref("scores", cascade="delete"))
    discipline_judge = relationship(DisciplineJudge, backref=backref("scores", cascade="delete"))

    parts: Iterable["ScorePart"]

    VIRTUAL_FIELDS = {"data"}

    # Virtual fields

    @property
    def competition_id(self) -> int:
        return self.run.competition_id

    @property
    def tour_id(self) -> int:
        return self.run.tour_id

    @property
    def data(self) -> Dict[str, Any]:
        db_data = {
            part.key: part.value
            for part in self.parts
        }
        return self.run.tour.scoring_system.get_full_score_data(
            self.discipline_judge.role,
            db_data,
        )

    @data.setter
    def data(self, data_update: Dict[str, Any]) -> None:
        from models.score_part import ScorePart
        ScorePart.create_and_validate(self.session, self, data_update)

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return self.discipline_judge.sorting_key

    def validate(self) -> None:
        pass  # Skipping validation since user can only update this model directly

    # Permissions

    def check_read_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level != AccessLevel.NONE

    def check_update_permission(self, request: "ApiRequest", data: Dict[str, Any]) -> bool:
        auth = self.get_auth(request.client)
        access_level = auth.access_level
        if access_level == AccessLevel.ADMIN:
            return True
        if access_level not in (AccessLevel.ANY_JUDGE, AccessLevel.JUDGE):
            return False
        if access_level == AccessLevel.JUDGE:
            if auth.judge_id != self.discipline_judge.judge_id:
                return False
        if data.get("confirmed") == False:
            return False
        return True

    # Update logic

    def before_update(self, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        if self.run.tour.finalized:
            raise ApiError("errors.score.update_on_finalized_tour")
        data.pop("run_id", None)
        data.pop("discipline_judge_id", None)
        return data

    def submit_update_mutations(self, mk: "MutationsKeeper", data: Dict[str, Any]) -> None:
        mk.submit_model_updated(self)
        if "data" in data:
            mk.submit_tour_results_update(self.run.tour)

    # Custom model logic

    def make_scoring_system_request(self) -> ScoreInfo:
        return ScoreInfo(
            score_id=ScoreId(self.id),
            judge_id=JudgeId(self.discipline_judge_id),
            data=self.data,
        )
