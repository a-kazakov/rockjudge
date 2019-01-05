from typing import List, Optional, Tuple

from scoring_systems.base import (
    TourComputationRequest,
    ScoringSystemName,
    TourComputationResult,
    JudgeResult,
)
from scoring_systems.cheerleading.implementation.common import CachedClass
from scoring_systems.cheerleading.implementation.run_contexts import RunContext


class TourContext(CachedClass):
    def __init__(
        self,
        tour_request: TourComputationRequest,
        scoring_system_name: ScoringSystemName,
    ) -> None:
        self.tour_request = tour_request
        self.scoring_system_name = scoring_system_name

    @property
    def runs(self) -> List[RunContext]:
        return [RunContext(run_info, self) for run_info in self.tour_request.runs]

    @property
    def ordered_runs(self) -> List[RunContext]:
        return sorted(self.runs, key=lambda run: run.sorting_score)

    @property
    def places(self) -> List[int]:
        current_place = 1
        prev_sorting_score: Optional[Tuple[int]] = None
        result = []
        for idx, run in enumerate(self.ordered_runs, start=1):
            if prev_sorting_score != run.sorting_score:
                current_place = idx
            result.append(current_place)
        return result

    @property
    def advances(self) -> List[bool]:
        return [p <= self.tour_request.num_advances for p in self.places]

    @property
    def result(self) -> TourComputationResult:
        return TourComputationResult(
            extra_data={},
            inherited_data={},
            results_order=[run.run_info.run_id for run in self.ordered_runs],
            runs_results={
                run.run_info.run_id: run.make_result(place, adv)
                for run, place, adv in zip(
                    self.ordered_runs, self.places, self.advances
                )
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
