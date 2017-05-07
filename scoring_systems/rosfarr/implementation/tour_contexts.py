from itertools import count

from scoring_systems.common import SkatingSystem
from .common import CachedClass

from .run_contexts import RunContextBase


class TourContextBase(CachedClass):
    def __init__(self, run_infos, judges_roles, num_advances, tour_name, scoring_system_name):
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


class TourContextNjs(TourContextBase):
    def _results(self):
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


class TourContextFormation(TourContextBase):
    def _runs_by_status(self):
        return {
            status: [
                run
                for run in self.runs
                if run.status == status
            ]
            for status in ("OK", "NP", "DQ", )
        }

    def _skating_object(self):
        return SkatingSystem([
            [score.total_score for score in run.scores_by_role["dance_judge"]]
            for run in self.runs_by_status["OK"]
        ])

    def _skating_places(self):
        return self.skating_object.places

    def _places_OK(self):
        rows = zip(self.skating_places, [run.nexttour_mark for run in self.runs], count())
        rows = sorted(rows, key=lambda x: (x[0], x[1],))
        rows_nocount = [x[:2] for x in rows]
        positions = [x[2] for x in rows]
        places = self.make_places(rows_nocount)
        result = [0] * len(self.skating_places)
        for pos, place in zip(positions, places):
            result[pos] = place
        return result

    def _judge_places_OK(self):
        return self.skating_object.places_by_runs

    def _results_OK(self):
        advances = self.make_advances(self.runs_by_status["OK"], self.places_OK)
        return sorted([
            {
                "run_id": run.run_id,
                "place": place,
                "advances": adv_mark,
                "additional_data": {
                    "places": {
                        score.score_id: judge_place
                        for score, judge_place in zip(run.scores_by_role["dance_judge"], judge_places)
                        if score.score_id is not None
                    },
                },
            }
            for run, place, adv_mark, judge_places in zip(self.runs_by_status["OK"], self.places_OK, advances, self.judge_places_OK)
        ], key=lambda row: (row["place"], row["run_id"],))

    def _results_NP(self):
        return sorted([
            {
                "run_id": run.run_id,
                "place": len(self.runs_by_status["OK"]) + 1,
                "advances": False,
                "additional_data": {},
            }
            for run in self.runs_by_status["NP"]
        ], key=lambda row: row["run_id"])

    def _results_DQ(self):
        return sorted([
            {
                "run_id": run.run_id,
                "place": None,
                "advances": False,
                "additional_data": {},
            }
            for run in self.runs_by_status["DQ"]
        ], key=lambda row: row["run_id"])

    def _results(self):
        return self.results_OK + self.results_NP + self.results_DQ
