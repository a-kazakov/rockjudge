from typing import Any, List, Tuple, Type, Optional

from scoring_systems.skating.implementation.common import CachedClass, JUDGE_ROLES
from scoring_systems.skating.implementation.score_contexts import ScoreContextBase
from scoring_systems.skating.types import (
    AcroScore,
    JudgeRole,
    RunId,
    RunStatus,
    ScoreId,
    ScoreRawData,
    ScoringSystemName,
    TourName,
)


class RunContextBase(CachedClass):
    scores: List[ScoreContextBase]

    def __init__(
        self,
        run_id: RunId,
        scores_ids: List[ScoreId],
        raw_scores: List[ScoreRawData],
        judges_roles: List[JudgeRole],
        acro_scores: List[AcroScore],
        inherited_data: Any,
        status: RunStatus,
        tour_name: TourName,
        scoring_system_name: ScoringSystemName,
    ) -> None:
        self.run_id = run_id
        self.scores_ids = scores_ids
        self.raw_scores = raw_scores
        self.judges_roles = judges_roles
        self.acro_scores = acro_scores
        self.inherited_data = inherited_data
        self.status = status
        self.tour_name = tour_name
        self.scoring_system_name = scoring_system_name

    @staticmethod
    def get_class(
        scoring_system_name: ScoringSystemName,
    ) -> Type["RunContextBase"]:
        # if scoring_system_name == "final":
        #     return FinalRun
        return RunContextQualification

    @classmethod
    def make(
        cls,
        run_id: RunId,
        scores_ids: List[ScoreId],
        raw_scores: List[ScoreRawData],
        judges_roles: List[JudgeRole],
        acro_scores: List[AcroScore],
        inherited_data: Any,
        status: RunStatus,
        tour_name: TourName,
        scoring_system_name: ScoringSystemName,
    ) -> "RunContextBase":
        return cls.get_class(scoring_system_name)(
            run_id,
            scores_ids,
            raw_scores,
            judges_roles,
            acro_scores,
            inherited_data,
            status,
            tour_name,
            scoring_system_name,
        )

    def _scores(self) -> List[ScoreContextBase]:
        return [
            ScoreContextBase.make(
                score_id=score_id,
                raw_data=raw_score,
                judge_role=jr,
                acro_scores=self.acro_scores,
                scoring_system_name=self.scoring_system_name
            )
            for score_id, raw_score, jr in zip(
                self.scores_ids,
                self.raw_scores,
                self.judges_roles,
            )
        ]

    def _scores_by_role(self):
        return {
            role: [
                score
                for score, jr in zip(self.scores, self.judges_roles)
                if jr == role
            ]
            for role in JUDGE_ROLES
        }

    bonus: bool

    def _bonus(self) -> int:
        return sum((
            score.counting_score["bonus"]
            for score in self.scores_by_role["head_judge"]
        ), 0)

    data_to_inherit: Any

    def _data_to_inherit(self) -> Any:
        return {}


class RunContextQualification(RunContextBase):
    dance_crosses: List[Optional[bool]]

    def _dance_crosses(self) -> List[Optional[bool]]:
        return [
            s.counting_score["cross"]
            for s in self.scores_by_role["dance_judge"]
        ]

    def _crosses_count(self) -> int:
        return sum(map(bool, self.dance_crosses))

    sorting_score: Tuple[int, ...]

    def _sorting_score(self) -> Tuple[int, ...]:
        if self.status != "OK":
            return (
                1,
                int(self.status == "DQ"),
                int(self.status == "NP"),
            )
        return (
            0,
            -self.crosses_count,
            -int(self.bonus),
        )

    display_score: str

    def _display_score(self) -> str:
        result = str(self.crosses_count)
        if self.bonus > 0:
            result = f"{result} [+{self.bonus}]"
        elif self.bonus < 0:
            result = f"{result} [{self.bonus}]"
        return result
