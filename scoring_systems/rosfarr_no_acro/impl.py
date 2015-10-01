import json
import math


class LineScore:
    def __init__(self, score):
        self.score = score
        raw_data = score.get_data()
        self.data = {
            "fw_man":           raw_data.pop("fw_man",          100),
            "fw_woman":         raw_data.pop("fw_woman",        100),
            "dance_figs":       raw_data.pop("dance_figs",      0),
            "composition":      raw_data.pop("composition",     0),
            "small_mistakes":   raw_data.pop("small_mistakes",  0),
            "big_mistakes":     raw_data.pop("big_mistakes",    0),
        }

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

    def update(self, new_data):
        self.data = {
            "fw_man":           int(new_data.pop("fw_man",          self.data["fw_man"])),
            "fw_woman":         int(new_data.pop("fw_woman",        self.data["fw_woman"])),
            "dance_figs":       int(new_data.pop("dance_figs",      self.data["dance_figs"])),
            "composition":      int(new_data.pop("composition",     self.data["composition"])),
            "small_mistakes":   int(new_data.pop("small_mistakes",  self.data["small_mistakes"])),
            "big_mistakes":     int(new_data.pop("big_mistakes",    self.data["big_mistakes"])),
        }
        self.score.set_data(self.data)

    def serialize(self):
        return {
            "total_score": self.total_score / 100,
            "raw_data": self.data,
        }


class HeadScore:
    def __init__(self, score):
        self.score = score
        raw_data = score.get_data()
        self.data = {
            "penalty": raw_data.pop("penalty", 0),
        }

    @property
    def total_score(self):
        return 100 * self.data["penalty"]

    def update(self, new_data):
        self.data = {
            "new_data": int(new_data["penalty"])
        }
        self.score.set_data(self.data)

    def serialize(self):
        return {
            "total_score": self.total_score / 100,
            "raw_data": self.data,
        }


class TechScore:
    def __init__(self, score):
        self.score = score
        raw_data = score.get_data()
        self.data = {
            "jump_steps":       raw_data.pop("jump_steps", 0),
            "timing_violation": raw_data.pop("timing_violation", None),
        }
        self.judge = score.judge

    @property
    def total_score(self):
        return 0

    def update(self, new_data):
        self.data = {
            "jump_steps": int(new_data.pop("jump_steps", this.data["jump_steps"])),
            "timing_violation": new_data.pop("timing_violation", this.data["timing_violation"]),
        }
        self.score.set_data(self.data)

    def serialize(self):
        return {
            "total_score": self.total_score,
            "raw_data": self.data,
        }


def ScoreWrapper(score):
    CLASSES = {
        "line_judge": LineScore,
        "head_judge": HeadScore,
        "tech_judge": TechScore,
    }
    return CLASSES[score.judge.role](score)


class RunScore:
    def __init__(self, run):
        self.run = run
        self.judges = list(run.tour.judges)
        self.head_judge = self.get_head_judge()
        self.line_judges = list(self.get_line_judges())
        self.judges_scores = [run.get_score_obj(judge) for judge in self.judges]
        self.line_judges_total_scores = [ScoreWrapper(run.get_score_obj(judge)).total_score for judge in self.line_judges]
        if self.head_judge is not None:
            self.head_judge_total_score = ScoreWrapper(run.get_score_obj(self.head_judge)).total_score

    def get_head_judge(self):
        for judge in self.judges:
            if judge.role == "head_judge":
                return judge
        return None

    def get_line_judges(self):
        return [
            judge
            for judge in self.judges
            if judge.role == "line_judge"
        ]

    @property
    def penalies(self):
        if self.head_judge is None:
            return 0
        penalty = self.head_judge_total_score
        num_line_judges = len(self.line_judges)
        return penalty * num_line_judges * self.factor

    @property
    def primary_multiplier(self):
        if len(self.line_judges_total_scores) < 5:
            return 2 * len(self.line_judges_total_scores) - 2
        return len(self.line_judges_total_scores) - 2

    @property
    def secondary_multiplier(self):
        return len(self.line_judges_total_scores)

    @property
    def factor(self):
        return self.primary_multiplier * self.secondary_multiplier

    @property
    def primary_score(self):
        sum_scores = sum(self.line_judges_total_scores)
        min_score = min(self.line_judges_total_scores)
        max_score = max(self.line_judges_total_scores)
        if len(self.line_judges_total_scores) < 5:
            result = (2 * sum_scores - min_score - max_score) * self.secondary_multiplier
        else:
            result = (sum_scores - min_score - max_score) * self.secondary_multiplier
        result += self.penalies
        return max(0, result)

    @property
    def secondary_score(self):
        return max(0, sum(self.line_judges_total_scores) * self.primary_multiplier + self.penalies)

    @property
    def display_score(self):
        return "{:.2f}".format(math.floor(0.5 + self.primary_score / self.factor) / 100)

    def serialize(self):
        return {
            "total_run_score": self.display_score,
            "scores": {
                str(js.judge.id): js.serialize()
                for js in self.judges_scores
            }
        }


class TourScores:
    def __init__(self, tour):
        self.tour = tour
        self.judges = list(tour.judges)
        self._table = None
        self.run_scores = [
            RunScore(run) for run in self.tour.runs
        ]

    def create_table(self):
        table = sorted([
            {
                "run_score": run_score,
                "scores": run_score.serialize(),
                "sorting_score": (-run_score.primary_score, -run_score.secondary_score, ),
            } for run_score in self.run_scores],
            key=lambda s: s["sorting_score"]
        )
        next_tour = self.tour.next_tour
        place = 1
        lastest_sorting_score = None
        num_advances = self.tour.get_actual_num_advances()
        for idx, row in enumerate(table, start=1):
            if lastest_sorting_score != row["sorting_score"]:
                place = idx
            lastest_sorting_score = row["sorting_score"]
            row.update({
                "place": place,
                "advances": next_tour is not None and num_advances >= place,
            })
        return table

    @property
    def table(self):
        if not self._table:
            self._table = self.create_table()
        return self._table

    def get_results(self):
        return [{
            "participant": row["run_score"].run.participant,
            "place": row["place"],
            "advances": row["advances"],
            "scores": row["scores"]
        } for row in self.table]


class InnerCompetitionScores:
    def __init__(self, ic):
        self.ic = ic

    def get_results(self):
        result = {}
        for tour in self.ic.tours:
            tour_table = TourScores(tour).get_tour_table()
            for row in tour_table:
                result[row["participant"]["id"]] = row
