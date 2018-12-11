from typing import Any, Dict, TYPE_CHECKING, Tuple, Union

from sqlalchemy import Column, Float, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import relationship, backref

from db import ModelBase
from enums import AccessLevel
from exceptions import ApiError
from models.base_model import BaseModel
from models.discipline_judge import DisciplineJudge
from models.run import Run


if TYPE_CHECKING:
    from api import ApiRequest
    from mutations import MutationsKeeper


class RunAcrobatic(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "run_acrobatics"

    __table_args__ = (UniqueConstraint("run_id", "idx", name="run_acro_idx"),)

    id = Column(Integer, primary_key=True)
    run_id = Column(Integer, ForeignKey("runs.id", ondelete="CASCADE"), nullable=False)
    idx = Column(Integer, nullable=False)
    description = Column(String(2000), nullable=False)
    initial_score = Column(Float(precision=2, asdecimal=False), nullable=False)
    score = Column(Float(precision=2, asdecimal=False), nullable=False)
    reviewed_by_id = Column(
        Integer, ForeignKey("discipline_judges.id", ondelete="SET NULL"), nullable=True
    )

    run = relationship(Run, backref=backref("acrobatics", cascade="delete"))
    reviewed_by = relationship(DisciplineJudge, backref="acobatics_reviewed")

    # Virtual fields

    @property
    def competition_id(self) -> int:
        return self.run.competition_id

    @property
    def tour_id(self) -> int:
        return self.run.tour_id

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.idx,)

    def validate(self) -> None:
        if self.score < -1e-5:
            raise ValueError("Score can't be negative")

    # Permissions

    def check_read_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level != AccessLevel.NONE

    def check_update_permission(
        self, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        return self.get_auth(request.client).access_level == AccessLevel.ADMIN

    # Create logic

    def submit_create_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_created(self)
        mk.submit_tour_results_update(self.run.tour)

    # Update logic

    def before_update(self, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        if self.run.tour.finalized:
            raise ApiError("errors.run.update_finalized")
        data.pop("idx", None)
        data.pop("description", None)
        data.pop("initial_score", None)
        # TODO: support revieved_by
        return {}

    def submit_update_mutations(
        self, mk: "MutationsKeeper", data: Dict[str, Any]
    ) -> None:
        mk.submit_model_updated(self)
        if "score" in data:
            mk.submit_tour_results_update(self.run.tour)

    # Deletion logic

    def submit_delete_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_deleted(self)
        mk.submit_tour_results_update(self.run.tour)

    # Serialization logic

    # Custom model logic
