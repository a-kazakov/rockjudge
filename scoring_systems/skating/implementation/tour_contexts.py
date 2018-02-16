from typing import Any, Dict, List

from scoring_systems.skating.implementation.common import CachedClass
from scoring_systems.skating.implementation.run_contexts import RunContextBase
from scoring_systems.skating.types import JudgeRole, RunInfo, ScoringSystemName, TourName


class TourContextBase(CachedClass):
    def __init__(
        self,
        run_infos: List[Dict[str, RunInfo]],
        judges_roles: List[JudgeRole],
        num_advances: int,
        tour_name: TourName,
        scoring_system_name: ScoringSystemName,
    ) -> None:
        self.run_infos = run_infos
        self.judges_roles = judges_roles
        self.num_advances = num_advances
        self.tour_name = tour_name
        self.scoring_system_name = scoring_system_name

    def _runs(self):
        return [
            RunContextBase.make(
                run_id=run["run_id"],
                scores_ids=run["scores_ids"],
                raw_scores=run["scores"],
                judges_roles=self.judges_roles,
                acro_scores=run["acro_scores"],
                inherited_data=run["inherited_data"],
                status=run["status"],
                tour_name=self.tour_name,
                scoring_system_name=self.scoring_system_name)
            for run in self.run_infos
        ]

    @staticmethod
    def make_places(totals):
        result = [None] * len(totals)
        latest_place = 0
        for idx, total_score in enumerate(totals):
            if idx == 0 or total_score != totals[idx - 1]:
                latest_place = idx + 1
            result[idx] = latest_place
        return result

    def make_advances(self, runs, places):
        return [
            place <= self.num_advances and run.status == "OK"
            for run, place in zip(runs, places)
        ]


class TourContextQualification(TourContextBase):
    results: List[Dict[str, Any]]

    def _results(self) -> List[Dict[str, Any]]:
        sorted_runs = sorted(self.runs, key=lambda r: r.sorting_score)
        places = self.make_places([r.sorting_score for r in sorted_runs])
        advances = self.make_advances(sorted_runs, places)
        return [
            {
                "run_id": run.run_id,
                "place": place if not run.status == "DQ" else None,
                "advances": adv_mark,
                "additional_data": {},
            }
            for run, place, adv_mark in zip(sorted_runs, places, advances)
        ]
