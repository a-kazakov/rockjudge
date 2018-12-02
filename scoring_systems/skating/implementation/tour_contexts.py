from abc import ABCMeta, abstractmethod
from typing import Any, Dict, List, Type, cast, Iterable

from enums import RunStatus
from scoring_systems.base import TourComputationRequest, ScoringSystemName, TourComputationResult, JudgeResult
from .common import CachedClass, SkatingSystemTour, SkatingSystemDiscipline
from .run_contexts import RunContextBase, RunContextFinal


class TourContextBase(CachedClass, metaclass=ABCMeta):
    def __init__(
        self,
        tour_request: TourComputationRequest,
        scoring_system_name: ScoringSystemName,
    ) -> None:
        self.tour_request = tour_request
        self.scoring_system_name = scoring_system_name

    @staticmethod
    def get_class(
        scoring_system_name: ScoringSystemName,
    ) -> Type["TourContextBase"]:
        if scoring_system_name == "qualification_simple":
            return TourContextQualification
        if scoring_system_name in ("final_simple", "final_3d"):
            return TourContextFinal
        if scoring_system_name == "final_summary":
            return TourContextFinalSummary

    @classmethod
    def make(
        cls,
        tour_request: TourComputationRequest,
        scoring_system_name: ScoringSystemName,
    ) -> "TourContextBase":
        return cls.get_class(scoring_system_name)(
            tour_request,
            scoring_system_name,
        )

    @property
    def runs(self) -> List[RunContextBase]:
        return [
            RunContextBase.make(
                run_info,
                self,
                self.scoring_system_name,
            )
            for run_info in self.tour_request.runs
        ]

    @staticmethod
    def make_places(totals) -> List[int]:
        result: List[int] = []
        latest_place = 0
        for idx, total_score in enumerate(totals):
            if idx == 0 or total_score != totals[idx - 1]:
                latest_place = idx + 1
            result.append(latest_place)
        return result

    def make_advances(self, runs, places) -> List[bool]:
        target_advances = self.tour_request.num_advances - self.extra_advanced
        return [
            place <= target_advances and run.run_info.status == RunStatus.OK
            for run, place in zip(runs, places)
        ]

    @property
    def extra_advanced(self) -> int:
        if not self.tour_request.hope_tour:
            return 0
        return (self.tour_request.inherited_data or {}).get("extra_advanced", 0)

    @property
    def data_to_inherit(self) -> Dict[str, Any]:
        return {
            "by_participant": {run.run_info.participant_id: run.data_to_inherit for run in self.runs},
        }

    @property
    @abstractmethod
    def result(self) -> TourComputationResult:
        pass


class TourContextQualification(TourContextBase):
    @property
    def result(self) -> TourComputationResult:
        sorted_runs = sorted(self.runs, key=lambda r: r.sorting_score)
        places = self.make_places([r.sorting_score for r in sorted_runs])
        advances = self.make_advances(sorted_runs, places)
        return TourComputationResult(
            extra_data = {},
            inherited_data = {
                "extra_advanced": self.extra_advanced + (len(advances) - self.tour_request.num_advances),
                **self.data_to_inherit
            },
            results_order=[run.run_info.run_id for run in sorted_runs],
            runs_results={
                run.run_info.run_id: run.make_result(place, adv)
                for run, place, adv in zip(sorted_runs, places, advances)
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

class TourContextFinal(TourContextBase):
    @property
    def result(self) -> TourComputationResult:
        sst = SkatingSystemTour([
            cast(RunContextFinal, run).get_places(len(self.runs))
            for run in self.runs
        ])
        sorted_rows = sorted(
            zip(self.runs, sst.places),
            key=lambda row: (row[1] or 10**10, row[0].run_info.run_id),
        )
        return TourComputationResult(
            extra_data = {
                "skating_quorum": sst.n_judges // 2 + 1,
            },
            inherited_data = self.data_to_inherit,
            results_order=[run.run_info.run_id for run, _ in sorted_rows],
            runs_results={
                run.run_info.run_id: run.make_result(
                    int_place if run.run_info.status != RunStatus.DQ else None,
                    run.run_info.status != RunStatus.DQ,
                    {
                        "skating_row": sk_row,
                        "tour_place": float(place),
                    },
                )
                for run, sk_row, place, int_place in zip(self.runs, sst.skating_rows, sst.places, sst.int_places)
            },
            scores_results={
                score.score_info.score_id: score.result
                for run in self.runs
                for score in run.scores
            },
            judges_results={
                judge_id: JudgeResult(has_valid_scores=True, extra_data={})  # FIXME
                for judge_id in self.tour_request.judge_roles.keys()
            },
        )


class TourContextFinalSummary(TourContextBase):
    def transform_place(self, place: int) -> int:
        if place <= 0:
            return len(self.runs)
        return place

    def transform_places(self, all_places: Iterable[List[int]]) -> List[List[int]]:
        return [
            [self.transform_place(place) for place in tour_places]
            for tour_places in all_places
        ]

    @property
    def result(self) -> TourComputationResult:
        all_inherited_data = [run.inherited_data.get("raw_places", []) for run in self.runs]
        sk_tours = [
            SkatingSystemTour(self.transform_places(places))
            for places in zip(*all_inherited_data)
        ]
        ssd = SkatingSystemDiscipline(sk_tours)
        all_tours_places = zip(*(st.places for st in sk_tours))
        sorted_rows = sorted(
            zip(self.runs, ssd.places),
            key=lambda row: (row[1] or 10**10, row[0].run_info.run_id),
        )
        return TourComputationResult(
            extra_data={
                "skating_quorum": ssd.n_judges * ssd.n_tours // 2 + 1,
            },
            inherited_data={},
            results_order=[run.run_info.run_id for run, _ in sorted_rows],
            runs_results={
                run.run_info.run_id: run.make_result(
                    int(float(place)) if run.run_info.status != RunStatus.DQ else None,  # FIXME
                    True,
                    {
                        "tours_places": list(map(float, tour_places)),
                        "tours_places_sum": float(tours_places_sum),
                        "skating_row": big_sk_row,
                        "ec_skating_row": [(float(a), float(b)) for a, b in ec_sk_row],
                    },
                )
                for (
                    run,
                    place,
                    tour_places,
                    tours_places_sum,
                    big_sk_row,
                    ec_sk_row,
                ) in zip(
                    self.runs,
                    ssd.places,
                    all_tours_places,
                    ssd.tours_places_sum,
                    ssd.big_skating_rows,
                    ssd.ec_skating_rows,
                )
            },
            scores_results={
                score.score_info.score_id: score.result
                for run in self.runs
                for score in run.scores
            },
            judges_results={
                judge_id: JudgeResult(has_valid_scores=True, extra_data={})  # FIXME
                for judge_id in self.tour_request.judge_roles.keys()
            },
        )
