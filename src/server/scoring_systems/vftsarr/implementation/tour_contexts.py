from typing import List, Optional, Any, Dict

from enums import RunStatus
from scoring_systems.base import (
    TourComputationRequest,
    JudgeResult,
    TourComputationResult,
)
from .common import CachedClass

from .run_contexts import RunContextBase


class TourContext(CachedClass):
    def __init__(
        self, tour_request: TourComputationRequest, scoring_system_name: str
    ) -> None:
        self.tour_request = tour_request
        self.scoring_system_name = scoring_system_name

    @staticmethod
    def make_places(totals: List[Any]) -> List[int]:
        result: List[int] = [0] * len(totals)
        latest_place = 0
        for idx, total_score in enumerate(totals):
            if idx == 0 or total_score != totals[idx - 1]:
                latest_place = idx + 1
            result[idx] = latest_place
        return result

    @property
    def runs(self) -> List[RunContextBase]:
        return [
            RunContextBase.make(run_info, self.tour_request, self.scoring_system_name)
            for run_info in self.tour_request.runs
        ]

    @property
    def data_to_inherit(self) -> Dict[str, Any]:
        return {
            "by_participant": {
                run.run_info.participant_id: run.data_to_inherit for run in self.runs
            },
            "extra_advanced": self.next_extra_advanced,
        }

    @property
    def extra_advanced(self) -> int:
        if not self.tour_request.hope_tour:
            return 0
        return (self.tour_request.inherited_data or {}).get("extra_advanced", 0)

    @property
    def next_extra_advanced(self) -> int:
        actual_num_advanced = sum(self.advances) if self.advances else 0
        return self.extra_advanced + (
            actual_num_advanced - self.tour_request.num_advances
        )

    def make_advances(self, runs: List[RunContextBase], places: List[Optional[int]]):
        target_advances = self.tour_request.num_advances - self.extra_advanced
        return [
            place <= target_advances and run.run_info.status == RunStatus.OK
            for run, place in zip(runs, places)
        ]

    @property
    def sorted_runs(self) -> List[RunContextBase]:
        return sorted(self.runs, key=lambda r: (r.sorting_score, r.run_info.run_id))

    @property
    def places(self) -> List[int]:
        return self.make_places([r.sorting_score for r in self.sorted_runs])

    @property
    def advances(self) -> List[bool]:
        return self.make_advances(self.sorted_runs, self.places)

    @property
    def result(self):
        return TourComputationResult(
            extra_data={},
            inherited_data=self.data_to_inherit,
            results_order=[run.run_info.run_id for run in self.sorted_runs],
            runs_results={
                run.run_info.run_id: run.make_result(place, adv)
                for run, place, adv in zip(self.sorted_runs, self.places, self.advances)
            },
            scores_results={
                score.score_info.score_id: score.result
                for run in self.runs
                for score in run.scores
            },
            judges_results={
                judge_id: JudgeResult(has_valid_scores=True, extra_data={})
                for judge_id in self.tour_request.judge_roles.keys()
            },
        )
