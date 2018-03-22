from typing import Any, Dict, List, Type, cast, Iterable

from .common import CachedClass, SkatingSystemTour, SkatingSystemDiscipline
from .run_contexts import RunContextBase, RunContextFinal
from ..types import JudgeRole, RunInfo, ScoringSystemName, TourName


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

    @staticmethod
    def get_class(
        scoring_system_name: ScoringSystemName,
    ) -> Type["TourContextBase"]:
        if scoring_system_name == "qualification_simple":
            return TourContextQualification
        if scoring_system_name == "final_simple":
            return TourContextFinal
        if scoring_system_name == "final_summary":
            return TourContextFinalSummary

    @classmethod
    def make(
        cls,
        run_infos: List[Dict[str, RunInfo]],
        judges_roles: List[JudgeRole],
        num_advances: int,
        tour_name: TourName,
        scoring_system_name: ScoringSystemName,
    ) -> "TourContextBase":
        return cls.get_class(scoring_system_name)(
            run_infos,
            judges_roles,
            num_advances,
            tour_name,
            scoring_system_name,
        )

    @property
    def runs(self) -> List[RunContextBase]:
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
    @property
    def results(self) -> List[Dict[str, Any]]:
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


class TourContextFinal(TourContextBase):
    @property
    def results(self) -> List[Dict[str, Any]]:
        sst = SkatingSystemTour([
            cast(RunContextFinal, run).get_places(len(self.runs))
            for run in self.runs
        ])
        result = [
            {
                "run_id": run.run_id,
                "place": float(place) if not run.status == "DQ" else None,
                "advances": run.status != "DQ",
                "additional_data": {
                    "skating_row": sk_row,
                    "skating_quorum": sst.n_judges // 2 + 1,
                },
            }
            for run, sk_row, place in zip(self.runs, sst.skating_rows, sst.places)
        ]
        return sorted(result, key=lambda x: (x["place"], x["run_id"]))


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
    def results(self) -> List[Dict[str, Any]]:
        all_inherited_data = [run.inherited_data.get("raw_places", []) for run in self.runs]
        sk_tours = [
            SkatingSystemTour(self.transform_places(places))
            for places in zip(*all_inherited_data)
        ]
        ssd = SkatingSystemDiscipline(sk_tours)
        all_tours_places = zip(*(st.places for st in sk_tours))
        result = [
            {
                "run_id": run.run_id,
                "place": int(place) if not run.status == "DQ" else None,
                "advances": True,
                "additional_data": {
                    "tours_places": list(map(float, tour_places)),
                    "tours_places_sum": float(tours_places_sum),
                    "skating_row": big_sk_row,
                    "skating_quorum": ssd.n_judges * ssd.n_tours // 2 + 1,
                    "ec_skating_row": [(float(a), float(b)) for a, b in ec_sk_row],
                },
            }
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
        ]
        return sorted(result, key=lambda x: (x["place"], x["run_id"]))
