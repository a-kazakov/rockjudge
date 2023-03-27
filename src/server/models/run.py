from __future__ import annotations

import random
from typing import Any, Dict, Iterable, List, Optional, Set, TYPE_CHECKING, Tuple, Union

from sqlalchemy import (
    Column,
    Enum as EnumColumn,
    ForeignKey,
    Integer,
    String,
    UniqueConstraint,
)
from sqlalchemy.orm import Session, relationship, backref

from db import SqlAlchemyModel
from enums import AccessLevel, RunStatus
from exceptions import ApiError
from models.base_model import BaseModel
from models.participant import Participant
from models.program import Program
from models.tour import Tour
from scoring_systems.base import AcroScore, ParticipantId, RunId, RunInfo


if TYPE_CHECKING:
    from api import ApiRequest
    from models.run_acrobatic import RunAcrobatic
    from models.score import Score
    from mutations import MutationsKeeper


class Run(SqlAlchemyModel, BaseModel):
    # DB schema

    __tablename__ = "runs"

    __table_args__ = (
        UniqueConstraint("participant_id", "tour_id", name="participant_tour_idx"),
    )

    id = Column(Integer, primary_key=True)
    participant_id = Column(
        Integer, ForeignKey("participants.id", ondelete="CASCADE"), nullable=False
    )
    tour_id = Column(
        Integer, ForeignKey("tours.id", ondelete="CASCADE"), nullable=False
    )
    heat = Column(Integer, default=0, nullable=False)
    heat_secondary = Column(Integer, nullable=False)
    status = Column(EnumColumn(RunStatus), default=RunStatus.OK, nullable=False)
    program_name = Column(String, nullable=True)
    # inherited_data = Column(JSON, default={}, nullable=False)

    participant = relationship(Participant, backref=backref("runs", cascade="delete"))
    tour = relationship(Tour, backref=backref("runs", cascade="delete"))

    acrobatics: Iterable[RunAcrobatic]
    scores: Iterable[Score]

    # Virtual fields

    @property
    def competition_id(self) -> int:
        return self.tour.competition_id

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.heat, self.heat_secondary, self.id)

    def validate(self) -> None:
        if self.participant.competition_id != self.tour.competition_id:
            raise ValueError("Tour and participant must belong to the same competition")

    # Permissions

    def check_read_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level != AccessLevel.NONE

    def check_update_permission(
        self, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        from models.discipline_judge import DisciplineJudge

        auth = self.get_auth(request.client)
        if auth.access_level == AccessLevel.ADMIN:
            return True
        if auth.access_level == AccessLevel.ANY_JUDGE:
            return self.tour.scoring_system.get_judge_role_permissions(
                None
            ).can_update_run_status
        if auth.access_level == AccessLevel.JUDGE:
            if set(data.keys()) == {"status"}:
                dj = (
                    self.session.query(DisciplineJudge)
                    .filter_by(
                        judge_id=auth.judge_id, discipline_id=self.tour.discipline_id
                    )
                    .first()
                )
                return self.tour.scoring_system.get_judge_role_permissions(
                    dj.role
                ).can_update_run_status
            return False
        return False

    # Create logic

    @classmethod
    def before_create(
        cls, session: Session, data: Dict[str, Any], *, unsafe: bool
    ) -> Dict[str, Any]:
        return {"heat_secondary": random.randint(0, 10 ** 9)}

    def after_create(self, mk: "MutationsKeeper") -> None:
        self.create_scores(mk, check_existing=False)

    def submit_create_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_created(self)
        mk.submit_tour_results_update(self.tour)

    # Update logic

    def before_update(self, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        if self.tour.finalized:
            raise ApiError("errors.run.update_finalized")
        data.pop("program_name", None)
        if "status" in data:
            data["status"] = RunStatus(data["status"])
        return {}

    def submit_update_mutations(
        self, mk: "MutationsKeeper", data: Dict[str, Any]
    ) -> None:
        mk.submit_model_updated(self)
        if "status" in data:
            mk.submit_tour_results_update(self.tour)

    # Delete logic

    def submit_delete_mutations(self, mk: "MutationsKeeper") -> None:
        mk.submit_model_deleted(self)
        mk.submit_tour_results_update(self.tour)

    # Serialization logic

    def serialize_extra(self) -> Dict[str, Any]:
        return {"status": self.status.value}

    # Custom model logic

    @property
    def acrobatics_sorted(self) -> List["RunAcrobatic"]:
        return sorted(self.acrobatics, key=lambda a: a.sorting_key)

    @property
    def scores_sorted(self) -> List["Score"]:
        return sorted(self.scores, key=lambda s: s.sorting_key)

    def make_scoring_system_request(self) -> RunInfo:
        return RunInfo(
            run_id=RunId(self.id),
            participant_id=ParticipantId(self.participant_id),
            status=self.status,
            acro_scores=[AcroScore(acro.score) for acro in self.acrobatics_sorted],
            scores=[
                score.make_scoring_system_request() for score in self.scores_sorted
            ],
        )

    def create_scores(
        self, mk: "MutationsKeeper", *, check_existing: bool = True
    ) -> None:
        from models.score import Score

        if check_existing:
            existing_ids: Set[int] = {
                score.discipline_judge.id for score in self.scores
            }
        else:
            existing_ids = set()
        for discipline_judge in self.tour.discipline.discipline_judges:
            if discipline_judge.id not in existing_ids:
                Score.create(
                    self.session,
                    {"run": self, "discipline_judge": discipline_judge},
                    mk,
                    unsafe=True,
                )

    def load_acrobatics(
        self, program: Optional[Program], mk: "MutationsKeeper"
    ) -> None:
        from models.run_acrobatic import RunAcrobatic

        deleted = False
        for acro in self.acrobatics:
            acro.delete(mk)
            deleted = True
        if deleted:
            self.session.flush()
        if program is None:
            self.program_name = None
            mk.submit_model_updated(self)
            return
        self.program_name = program.name
        mk.submit_model_updated(self)
        for idx, acro in enumerate(program.elements, start=1):
            RunAcrobatic.create(
                self.session,
                {
                    "run": self,
                    "idx": idx,
                    "description": acro.description,
                    "initial_score": acro.score,
                    "score": acro.score,
                },
                mk,
                unsafe=True,
            )
        mk.submit_tour_results_update(self.tour)

    def load_default_acrobatics(self, mk: "MutationsKeeper") -> None:
        if self.program_name is not None:
            return
        if not self.tour.default_program:
            return
        program = self.participant.get_default_program(self.tour.default_program)
        if program is None:
            return
        self.load_acrobatics(program, mk)

    @property
    def disqualified(self):
        return self.status == RunStatus.DQ

    def reset(
        self, mk: "MutationsKeeper", synchronize_session: Union[bool, str] = False
    ) -> None:
        from models.run_acrobatic import RunAcrobatic
        from models.score import Score
        from models.score_part import ScorePart

        if self.tour.finalized:
            raise ApiError("errors.run.modify_finalized")

        score_ids: List[int] = []
        for score in self.session.query(Score).filter_by(run=self).all():
            score.update({"confirmed": False}, mk)
            score_ids.append(score.id)
        (
            self.session.query(ScorePart)
            .filter(ScorePart.score_id.in_(score_ids))
            .delete(synchronize_session=synchronize_session)
        )
        for acro in self.session.query(RunAcrobatic).filter_by(run=self).all():
            mk.submit_model_updated(acro)
            self.session.query(RunAcrobatic).filter_by(run=self).update(
                {"score": RunAcrobatic.initial_score},
                synchronize_session=synchronize_session,
            )
        mk.submit_tour_results_update(self.tour)
        self.update({"status": RunStatus.OK}, mk)
