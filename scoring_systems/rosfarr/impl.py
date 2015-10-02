from fractions import Fraction as frac


def apply_deduction(base_score, deduction):
    return base_score * (100 - deduction) // 100;


class DanceScore:
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

    @property
    def total_score(self):
        return max(0, sum([
            apply_deduction(10 * 100, self.data["fw_man"]),
            apply_deduction(10 * 100, self.data["fw_woman"]),
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


class AcroScore:
    def __init__(self, score):
        self.score = score
        raw_data = score.get_data()
        if isinstance(score.run.participant.acrobatics, list):
            num_acros = len(score.run.participant.acrobatics)
        else:
            num_acros = score.run.participant.acrobatics.count()
        self.data = {
            "deductions": raw_data.pop("deductions", [100] * num_acros),
            "mistakes": raw_data.pop("mistakes", 0),
        }

    @property
    def total_score(self):
        result = 0
        for acro, deduction in zip(self.score.run.participant.acrobatics, self.data["deductions"]):
            override = self.score.run.get_acrobatic_override(acro)
            base_score = override.score if override is not None else acro.score
            result += max(0, min(1200, apply_deduction(100 * base_score, deduction)))
        result -= 3000 * self.data["mistakes"]
        return max(0, result)

    def update(self, new_data):
        self.data = {
            "deductions": [int(d) for d in new_data["deductions"]],
            "mistakes": int(new_data.pop("mistakes", 0)),
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
            "penalty": int(new_data["penalty"])
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
            "jump_steps":           raw_data.pop("jump_steps", 0),
            "timing_violation":     raw_data.pop("timing_violation", None),
        }

    @property
    def total_score(self):
        return 0

    def update(self, new_data):
        self.data = {
            "jump_steps": int(new_data.pop("jump_steps", self.data["jump_steps"])),
            "timing_violation": new_data.pop("timing_violation", self.data["timing_violation"]),
        }
        self.score.set_data(self.data)

    def serialize(self):
        return {
            "total_score": self.total_score,
            "raw_data": self.data,
        }


def ScoreWrapper(score, acro, judge=None):
    CLASSES = {
        "dance_judge": DanceScore,
        "acro_judge": AcroScore,
        "head_judge": HeadScore,
        "tech_judge": TechScore,
    }
    if judge is None:
        judge = score.judge
    role = judge.role
    if not acro and role == "acro_judge":
        role = "dance_judge"
    return CLASSES[role](score)


class SmallScoresSet:
    def __init__(self, scores):
        self.scores = scores
        num_scores = len(scores)
        min_score = min(scores)
        max_score = max(scores)
        sum_scores = sum(scores)
        self.primary_score = frac(2 * sum_scores - min_score - max_score, 2 * num_scores - 2)
        self.secondary_score = frac(sum_scores, num_scores)


class LargeScoresSet:
    def __init__(self, scores):
        self.scores = scores
        num_scores = len(scores)
        min_score = min(scores)
        max_score = max(scores)
        sum_scores = sum(scores)
        self.primary_score = frac(sum_scores - min_score - max_score, num_scores - 2)
        self.secondary_score = frac(sum_scores, num_scores)


class RunScore:
    def __init__(self, run, acro=False, judges=None):
        self.run = run
        self.acro = acro
        judges = run.tour.judges if judges is None else judges
        scores = run.scores_pf
        self.judge_scores = list(zip(judges, scores))
        self.dance_judges_total_scores = [
            ScoreWrapper(score, acro, judge=judge).total_score
            for judge, score
            in self.dance_judge_scores
        ]
        self.acro_judges_total_scores = [
            ScoreWrapper(score, acro, judge=judge).total_score
            for judge, score
            in self.acro_judge_scores
        ]
        if self.head_judge_score is not None:
            judge, score = self.head_judge_score
            self.head_judge_total_score = ScoreWrapper(score, acro, judge=judge).total_score
        if acro:
            self.acro_scores = SmallScoresSet(self.acro_judges_total_scores)
            self.dance_scores = SmallScoresSet(self.dance_judges_total_scores)
        else:
            self.dance_scores = SmallScoresSet(self.dance_judges_total_scores) if len(self.dance_judges_total_scores) < 5 else LargeScoresSet(self.dance_judges_total_scores)


    @property
    def head_judge_score(self):
        for judge, score in self.judge_scores:
            if judge.role == "head_judge":
                return judge, score
        return None

    @property
    def dance_judge_scores(self):
        for judge, score in self.judge_scores:
            if judge.role == "dance_judge":
                yield judge, score
            elif judge.role == "acro_judge" and self.acro:
                yield judge, score

    @property
    def acro_judge_scores(self):
        for judge, score in self.judge_scores:
            if judge.role == "acro_judge" and self.acro:
                yield judge, score

    @property
    def penalties(self):
        if self.head_judge_score is None:
            return 0
        penalty = self.head_judge_total_score
        num_judges = len(self.dance_judges_total_scores) + len(self.acro_judges_total_scores)
        return frac(penalty * num_judges)

    @property
    def sorting_score(self):
        if self.acro:
            return (
                -max(0, self.dance_scores.primary_score + self.acro_scores.primary_score + self.penalties),
                -max(0, self.dance_scores.secondary_score + self.acro_scores.secondary_score + self.penalties),
            )
        else:
            return (
                -max(0, self.dance_scores.primary_score + self.penalties),
                -max(0, self.dance_scores.secondary_score + self.penalties),
            )

    @property
    def display_score(self):
        return "{:.2f}".format(-self.sorting_score[0] / 100.0)

    def serialize(self):
        return {
            "total_run_score": self.display_score,
            "scores": {
                str(judge.id): score.serialize(judge=judge)
                for judge, score in self.judge_scores
            }
        }


class TourScores:
    def __init__(self, tour, acro=False):
        self.tour = tour
        self.judges = list(tour.judges)
        self._table = None
        self.run_scores = [
            RunScore(run, acro) for run in self.tour.runs
        ]

    def create_table(self):
        table = sorted([
            {
                "run_score": run_score,
                "scores": run_score.serialize(),
                "sorting_score": run_score.sorting_score,
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
