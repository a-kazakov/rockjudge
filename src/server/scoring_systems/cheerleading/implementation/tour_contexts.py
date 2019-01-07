from typing import List, Optional, Tuple, Dict

from enums import RunStatus
from scoring_systems.base import (
    TourComputationRequest,
    ScoringSystemName,
    TourComputationResult,
    JudgeResult,
)
from scoring_systems.cheerleading.implementation.common import (
    CachedClass,
    assign_places,
)
from scoring_systems.cheerleading.implementation.run_contexts import RunContext
from scoring_systems.cheerleading.implementation.score_contexts import (
    ScoreContextDanceJudge,
)


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
        return assign_places(run.sorting_score for run in self.ordered_runs)

    @property
    def advances(self) -> List[bool]:
        return [p <= self.tour_request.num_advances for p in self.places]

    @property
    def judges_places_by_score_id(self) -> Dict[int, int]:
        scores_by_run = [
            [score for score in run.scores if isinstance(score, ScoreContextDanceJudge)]
            for run in self.runs
            if run.run_info.status == RunStatus.OK
        ]
        scores_by_judge = zip(*scores_by_run)
        scores_by_judge_ordered = [
            sorted(js, key=lambda s: -s.total_score_with_penalty)
            for js in scores_by_judge
        ]
        result = {}
        for judge_scores in scores_by_judge_ordered:
            places = assign_places(js.total_score_with_penalty for js in judge_scores)
            result.update(
                {
                    score.score_info.score_id: place
                    for score, place in zip(judge_scores, places)
                }
            )
        return result

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
