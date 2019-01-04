from typing import Any, Dict, List, Optional, TYPE_CHECKING, Tuple, Type, cast

from enums import RunStatus
from scoring_systems.base import (
    RunInfo,
    RunResult,
    ScoringSystemName,
    TourComputationRequest,
)
from .common import CachedClass
from .score_contexts import ScoreContextBase

if TYPE_CHECKING:
    from scoring_systems.skating import TourContextBase


class RunContextBase(CachedClass):
    def __init__(
        self,
        run_info: RunInfo,
        tour_context: "TourContextBase",
        scoring_system_name: ScoringSystemName,
    ) -> None:
        self.run_info = run_info
        self.tour_context = tour_context
        self.scoring_system_name = scoring_system_name

    @staticmethod
    def get_class(scoring_system_name: ScoringSystemName,) -> Type["RunContextBase"]:
        if scoring_system_name == "qualification_simple":
            return RunContextQualification
        if scoring_system_name in ("final_simple", "final_3d"):
            return RunContextFinal
        if scoring_system_name == "final_summary":
            return RunContextFinalSummary

    @classmethod
    def make(
        cls,
        run_info: RunInfo,
        tour_context: "TourContextBase",
        scoring_system_name: ScoringSystemName,
    ) -> "RunContextBase":
        return cls.get_class(scoring_system_name)(
            run_info, tour_context, scoring_system_name
        )

    @property
    def tour_request(self) -> TourComputationRequest:
        return self.tour_context.tour_request

    @property
    def inherited_data(self) -> Dict[str, Any]:
        inherited_dict = self.tour_request.inherited_data or {}
        return inherited_dict.get("by_participant", {}).get(
            self.run_info.participant_id, {}
        )

    @property
    def scores(self) -> List[ScoreContextBase]:
        return [
            ScoreContextBase.make_from_request(
                score_info, self.tour_context, self.scoring_system_name
            )
            for score_info in self.run_info.scores
        ]

    @property
    def scores_by_role(self) -> Dict[str, List[ScoreContextBase]]:
        return {
            role: [score for score in self.scores if score.judge_role == role]
            for role in ("dance_judge", "head_judge")
        }

    @property
    def bonus(self) -> int:
        return sum(
            (
                score.counting_score["bonus"]
                for score in self.scores_by_role["head_judge"]
            ),
            0,
        )

    @property
    def data_to_inherit(self) -> Any:
        return {}

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {}

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


class RunContextQualification(RunContextBase):
    @property
    def dance_crosses(self) -> List[Optional[bool]]:
        return [s.counting_score["cross"] for s in self.scores_by_role["dance_judge"]]

    @property
    def crosses_count(self) -> int:
        return sum(map(bool, self.dance_crosses))

    @property
    def sorting_score(self) -> Tuple[int, ...]:
        if self.run_info.status != RunStatus.OK:
            return (
                1,
                int(self.run_info.status == RunStatus.DQ),
                int(self.run_info.status == RunStatus.NP),
            )
        return (0, -self.crosses_count, -int(self.bonus))

    @property
    def display_score(self) -> str:
        result = str(self.crosses_count)
        if self.bonus > 0:
            result = f"{result} [+{self.bonus}]"
        elif self.bonus < 0:
            result = f"{result} [{self.bonus}]"
        return result

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {
            "user_score": str(self.crosses_count)
            if self.run_info.status == RunStatus.OK
            else "—"
        }


class RunContextFinal(RunContextBase):
    @staticmethod
    def transform_place(place: int, max_place: int) -> int:
        if not 1 <= place <= max_place:
            return max_place
        return place

    @property
    def raw_places(self) -> List[int]:
        return [s.counting_score["place"] for s in self.scores_by_role["dance_judge"]]

    def get_places(self, max_place: int, np_place: int, dq_place: int) -> List[int]:
        if self.run_info.status == RunStatus.NP:
            return [np_place] * len(self.raw_places)
        if self.run_info.status == RunStatus.DQ:
            return [dq_place] * len(self.raw_places)
        return [self.transform_place(place, max_place) for place in self.raw_places]

    @property
    def display_score(self) -> str:
        return "SK"

    @property
    def data_to_inherit(self) -> Dict[str, Any]:
        from scoring_systems.skating.implementation.tour_contexts import (
            TourContextFinal,
        )

        tour_ctx = cast(TourContextFinal, self.tour_context)
        return {
            "places": self.inherited_data.get("places", [])
            + [tour_ctx.runs_places[self.run_info.run_id]]
        }


class RunContextFinalSummary(RunContextBase):
    @property
    def display_score(self) -> str:
        return "SK"
