import json
import math


class JudgeScore:
    def __init__(self, run, judge):
        raw_data = run.get_judge_score(judge)
        self.data = {
            "fw_man": raw_data.pop("fw_man", 100),
            "fw_woman": raw_data.pop("fw_woman", 100),
            "dance_figs": raw_data.pop("dance_figs", 0),
            "composition": raw_data.pop("composition", 0),
        }
        self.run = run
        self.judge = judge

    @staticmethod
    def apply_deduction(base_score, deduction):
        return base_score * (100 - deduction) // 100;

    @property
    def total_score(self):
        return sum([
            self.apply_deduction(10 * 100, self.data["fw_man"]),
            self.apply_deduction(10 * 100, self.data["fw_woman"]),
            100 * self.data["dance_figs"],
            100 * self.data["composition"],
        ])

    def serialize(self):
        return {
            "total_score": self.total_score / 100,
            "raw_data": self.data
        }

    def save(self):
        self.run.set_judge_score(self.judge, self.data)

    def update_score(self, new_score):
        self.data = new_score
        self.save()


class RunScore:
    def __init__(self, run):
        self.run = run
        self.raw_scores = [JudgeScore(run, judge) for judge in run.tour.judges]
        self.scores = [rs.total_score for rs in self.raw_scores]

    @property
    def primary_divisor(self):
        if len(self.scores) < 5:
            return 2 * len(self.scores) - 2
        return len(self.scores) - 2

    @property
    def secondary_divisor(self):
        return len(self.scores)

    @property
    def primary_score(self):
        if len(self.scores) < 5:
            return (2 * sum(self.scores) - min(self.scores) - max(self.scores)) * self.secondary_divisor
        return (sum(self.scores) - min(self.scores) - max(self.scores)) * self.secondary_divisor

    @property
    def secondary_score(self):
        return sum(self.scores) * self.primary_divisor

    @property
    def factor(self):
        return self.primary_divisor * self.secondary_divisor

    def serialize(self):
        return {
            str(rs.judge.id): rs.serialize()
            for rs in self.raw_scores
        }


class TourScores:
    def __init__(self, tour):
        self.tour = tour
        self.judges = list(tour.judges)
        self.data = [RunScore(run) for run in tour.runs]
        if tour.finalized:
            self.create_table()

    def create_table(self):
        self.table = sorted([
            {
                "participant": rs.run.participant,
                "heat": rs.run.heat,
                "score": math.floor(0.5 + rs.primary_score / rs.factor) / 100,
                "sorting_score": (-rs.primary_score, -rs.secondary_score, ),
                "detailed_scores": rs.serialize(),
            } for rs in self.data],
            key=lambda s: s["sorting_score"]
        )
        next_tour = self.tour.next_tour
        place = 1
        lastest_sorting_score = None
        for idx, row in enumerate(self.table, start=1):
            if lastest_sorting_score != row["sorting_score"]:
                place = idx
            lastest_sorting_score = row["sorting_score"]
            row.update({
                "place": place,
                "advances": next_tour is not None and next_tour.num_participants >= place,
            })

    def get_advanced_to_next_tour(self):
        return (
            row["participant"]
            for row in self.table
            if row["advances"]
        )

    def serialize_for_admin(self):
        return {
            "judges": [{
                "id": str(judge.id),
                "name": judge.name,
            } for judge in self.judges],
            "runs": [{
                "participant": rs.run.participant.name,
                "run_id": rs.run.id,
                "scores": rs.serialize(),
                "heat": rs.run.heat,
                "total_score": math.floor(0.5 + rs.primary_score / rs.factor) / 100,
            } for rs in self.data]
        }

    def seriailze_for_tour_results(self):
        return [
            {
                "participant": row["participant"].name,
                "score": row["score"],
                "detailed_scores": row["detailed_scores"],
                "place": row["place"],
                "advances": row["advances"],
            } for row in self.table
        ]
