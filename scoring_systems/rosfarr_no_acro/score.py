import json
import math


class JudgeScore:
    def __init__(self, judge_score):
        raw_data = judge_score.get()
        self.data = {
            "fw_man": raw_data.pop("fw_man", 100),
            "fw_woman": raw_data.pop("fw_woman", 100),
            "dance_figs": raw_data.pop("dance_figs", 0),
            "composition": raw_data.pop("composition", 0),
            "small_mistakes": raw_data.pop("small_mistakes", 0),
            "big_mistakes": raw_data.pop("big_mistakes", 0),
        }
        self.judge = judge_score.judge

    @staticmethod
    def apply_deduction(base_score, deduction):
        return base_score * (100 - deduction) // 100;

    @property
    def total_score(self):
        return max(0, sum([
            self.apply_deduction(10 * 100, self.data["fw_man"]),
            self.apply_deduction(10 * 100, self.data["fw_woman"]),
            100 * self.data["dance_figs"],
            100 * self.data["composition"],
            -500 * self.data["small_mistakes"],
            -3000 * self.data["big_mistakes"],
        ]))

    def serialize(self):
        return {
            "total_score": self.total_score / 100,
            "raw_data": self.data
        }

    def save(self):
        self.judge_score.set(self.data)

    def update_score(self, new_score):
        self.data = new_score
        self.save()


class RunScore:
    def __init__(self, run):
        self.run = run
        self.raw_scores = [JudgeScore(run.get_judge_score_obj(judge)) for judge in run.tour.judges]
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
            "total_score": math.floor(0.5 + self.primary_score / self.factor) / 100,
            "scores": {
                str(js.judge.id): js.serialize()
                for js in self.raw_scores
            }
        }


class TourScores:
    def __init__(self, tour):
        self.tour = tour
        self.judges = list(tour.judges)
        self.data = [RunScore(run) for run in tour.runs]
        self.create_table()

    def create_table(self):
        self.table = sorted([
            {
                "rs": rs,
                "score": math.floor(0.5 + rs.primary_score / rs.factor) / 100,
                "sorting_score": (-rs.primary_score, -rs.secondary_score, ),
            } for rs in self.data],
            key=lambda s: s["sorting_score"]
        )
        next_tour = self.tour.next_tour
        place = 1
        lastest_sorting_score = None
        num_advances = self.tour.get_actual_num_advances()
        for idx, row in enumerate(self.table, start=1):
            if lastest_sorting_score != row["sorting_score"]:
                place = idx
            lastest_sorting_score = row["sorting_score"]
            row.update({
                "place": place,
                "advances": next_tour is not None and num_advances >= place,
            })

    def get_tour_table(self):
        return [{
            "run": row["rs"].run,
            "place": row["place"],
            "advances": row["advances"],
        } for row in self.table]

    def serialize_for_admin(self):
        return [{
            "scores": rs.serialize(),
            "total_score": math.floor(0.5 + rs.primary_score / rs.factor) / 100,
        } for rs in self.data]

    def seriailze_for_tour_results(self):
        return [{
            "score": row["score"],
            "place": row["place"],
            "advances": row["advances"],
        } for row in self.table]
