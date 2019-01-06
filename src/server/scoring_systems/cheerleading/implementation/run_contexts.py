from collections import defaultdict
from fractions import Fraction
from typing import Any, Dict, List, Optional, TYPE_CHECKING, Tuple, cast

from enums import RunStatus
from scoring_systems.base import RunInfo, RunResult, TourComputationRequest
from scoring_systems.cheerleading.implementation.common import (
    CachedClass,
    safe_sum,
    trim_scores,
)
from scoring_systems.cheerleading.implementation.score_contexts import (
    ScoreContextHeadJudge,
    ScoreContextTechJudge,
    ScoreContextDanceJudge,
    ScoreContextBase,
)

if TYPE_CHECKING:
    from scoring_systems.cheerleading.implementation.tour_contexts import TourContext


class RunContext(CachedClass):
    def __init__(self, run_info: RunInfo, tour_context: "TourContext") -> None:
        self.run_info = run_info
        self.tour_context = tour_context

    @property
    def tour_request(self) -> TourComputationRequest:
        return self.tour_context.tour_request

    @property
    def scores(self) -> List[ScoreContextBase]:
        return [
            ScoreContextBase.make_from_request(score_info, self)
            for score_info in self.run_info.scores
        ]

    @property
    def scores_by_role(self) -> Dict[str, List[ScoreContextBase]]:
        return {
            role: [score for score in self.scores if score.judge_role == role]
            for role in ("dance_judge", "tech_judge", "head_judge")
        }

    def make_result(
        self, place: int, advanced: bool, extra_data: Optional[Dict[str, Any]] = None
    ) -> RunResult:
        if self.run_info.status == RunStatus.OK:
            display_score: str = self.display_score
        else:
            display_score = "—"
        return RunResult(
            total_score_str=display_score,
            extra_data={**self.extra_data, **(extra_data or {})},
            place=(None if self.run_info.status == RunStatus.DQ else place),
            advanced=advanced,
        )

    @property
    def sorting_score(self) -> Tuple[Any, ...]:
        if self.run_info.status != RunStatus.OK:
            return (
                1,
                int(self.run_info.status == RunStatus.DQ),
                int(self.run_info.status == RunStatus.NP),
            )
        return (
            0,
            -self.primary_score,
            -self.secondary_score,
            tuple(-c for c in self.places_counts),
            -self.bonus,
        )

    @property
    def dance_judges_total_scores(self) -> List[Fraction]:
        return [
            cast(ScoreContextDanceJudge, score).total_score + self.penalty
            for score in self.scores_by_role.get("dance_judge", [])
        ]

    @property
    def accumulated_penalties(self) -> Dict[str, int]:
        result: Dict[str, int] = {}
        for score in self.scores_by_role["tech_judge"]:
            score_data = cast(ScoreContextTechJudge, score).normalized_data
            for key, value in score_data.items():
                result[key] = min(result.get(key, 0), value)
        return result

    @property
    def penalty(self) -> int:
        return sum(self.accumulated_penalties.values(), 0)

    @property
    def bonus(self) -> int:
        return sum(
            cast(ScoreContextHeadJudge, score).total_score
            for score in self.scores_by_role["head_judge"]
        )

    @property
    def primary_score(self) -> Fraction:
        return safe_sum(trim_scores(self.dance_judges_total_scores))

    @property
    def secondary_score(self) -> Fraction:
        return safe_sum(self.dance_judges_total_scores)

    @property
    def places_counts(self) -> List[int]:
        counts_dict: Dict[int, int] = defaultdict(lambda: 0)
        for score in self.scores:
            if isinstance(score, ScoreContextDanceJudge):
                counts_dict[score.judge_place] += 1
        return [
            counts_dict[place] for place in range(1, len(self.tour_context.runs) + 1)
        ]

    @property
    def display_score(self) -> str:
        return "{:.1f} / {:.1f}".format(
            float(self.primary_score), float(self.secondary_score)
        )

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {
            "status": self.run_info.status.value,
            "primary_score": float(self.primary_score),
            "secondary_score": float(self.secondary_score),
            "places_counts": self.places_counts,
            "accumulated_penalties": self.accumulated_penalties,
            "penalty": self.penalty,
        }
