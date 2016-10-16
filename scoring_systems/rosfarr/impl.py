import copy

from fractions import Fraction as frac
from itertools import count

from scoring_systems.common import SkatingSystem
from exceptions import ApiError


POSSIBLE_DEDUCTIONS = {0, 5, 10, 25, 50, 75, 100}


def apply_reduction(base_score, reduction):
    return base_score * (100 - reduction) // 100


def m100(score):
    return round(100 * score)


class BaseScore:
    DEFAULT_SCORES = {}
    INITIAL_SCORES = {}
    SCORES_VALIDATORS = {}

    def __init__(self, score):
        self.score = score
        raw_data = score.get_data()
        self.data = {
            key: raw_data.pop(key, self.INITIAL_SCORES[key] if key in self.INITIAL_SCORES else None)
            for key in self.DEFAULT_SCORES.keys()
        }

    @property
    def total_score(self):
        raw_scores = {
            key: value if value is not None else self.DEFAULT_SCORES[key]
            for key, value in self.data.items()
        }
        return self.get_total_score(raw_scores)

    @classmethod
    def clear_value(cls, key, value, original_value=None):
        if value is None:
            return None
        if not cls.SCORES_VALIDATORS[key](value):
            # Probably delta?
            if original_value is None:
                return original_value
            if type(value) is not dict:
                return original_value
            keys = list(value.keys())
            if keys != ["delta"]:
                return original_value
            new_value = original_value + value["delta"]
            return cls.clear_value(key, new_value, original_value)
        if type(value) is float:
            return round(100 * value) / 100
        return value

    def update(self, new_data):
        self.data = {
            key: (self.clear_value(key, new_data[key],
                                   old_value if old_value is not None else None)
                  if key in new_data else old_value)
            for key, old_value in self.data.items()
        }
        self.score.set_data(self.data)

    def serialize(self):
        return {
            "total_score": self.total_score / 100,
            "raw_data": self.data,
        }


class FormationScore(BaseScore):
    DEFAULT_SCORES = {
        "dance_tech": 0,
        "dance_figs": 0,
        "impression": 0,
        "mistakes": 0,
    }
    INITIAL_SCORES = {
        "mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "dance_tech": lambda x: type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "dance_figs": lambda x: type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "impression": lambda x: type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }

    @staticmethod
    def get_total_score(raw_scores):
        return sum([
            m100(raw_scores["dance_tech"]),
            m100(raw_scores["dance_figs"]),
            m100(raw_scores["impression"]),
            -2 * m100(raw_scores["mistakes"]),  # NOQA
        ])


class FormationAcroScore(BaseScore):
    DEFAULT_SCORES = {
        "acrobatics": 0,
        "dance_tech": 0,
        "dance_figs": 0,
        "impression": 0,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "acrobatics": lambda x: type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "dance_tech": lambda x: type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "dance_figs": lambda x: type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "impression": lambda x: type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "small_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
        "big_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }

    @staticmethod
    def get_total_score(raw_scores):
        return sum([
            m100(raw_scores["acrobatics"]),
            m100(raw_scores["dance_tech"]),
            m100(raw_scores["dance_figs"]),
            m100(raw_scores["impression"]),
            -2 * m100(raw_scores["small_mistakes"]),  # NOQA
            -3 * m100(raw_scores["big_mistakes"]),  # NOQA
        ])


class SimplifiedScore(BaseScore):
    DEFAULT_SCORES = {
        "points": 0,
    }
    SCORES_VALIDATORS = {
        "points": lambda x: type(x) is int and 1 <= x <= 40,
    }

    @staticmethod
    def get_total_score(raw_scores):
        return sum([
            m100(raw_scores["points"]),
        ])


class DanceScore(BaseScore):
    DEFAULT_SCORES = {
        "fw_man": 100,
        "fw_woman": 100,
        "dance_figs": 0,
        "composition": 0,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "fw_man": lambda x: type(x) is int and x in POSSIBLE_DEDUCTIONS,
        "fw_woman": lambda x: type(x) is int and x in POSSIBLE_DEDUCTIONS,
        "dance_figs": lambda x: type(x) is int and 0 <= x <= 25,
        "composition": lambda x: type(x) is int and 0 <= x <= 20,
        "small_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
        "big_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }

    @staticmethod
    def get_total_score(raw_scores):
        return sum([
            apply_reduction(m100(10), raw_scores["fw_man"]),
            apply_reduction(m100(10), raw_scores["fw_woman"]),
            m100(raw_scores["dance_figs"]),
            m100(raw_scores["composition"]),
             -5 * m100(raw_scores["small_mistakes"]),  # NOQA
            -30 * m100(raw_scores["big_mistakes"]),
        ])


class FinalDanceScore(BaseScore):
    DEFAULT_SCORES = {
        "fw_man": 100,
        "fw_woman": 100,
        "dance_figs": 0,
        "composition": 0,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "fw_man": lambda x: type(x) is int and x in POSSIBLE_DEDUCTIONS,
        "fw_woman": lambda x: type(x) is int and x in POSSIBLE_DEDUCTIONS,
        "dance_figs": lambda x: type(x) in (float, int) and 0 <= x <= 12.5 and round(x * 100) % 50 == 0,
        "composition": lambda x: type(x) in (float, int) and 0 <= x <= 12.5 and round(x * 100) % 50 == 0,
        "small_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
        "big_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }

    @staticmethod
    def get_total_score(raw_scores):
        return sum([
            apply_reduction(m100(5), raw_scores["fw_man"]),
            apply_reduction(m100(5), raw_scores["fw_woman"]),
            m100(raw_scores["dance_figs"]),
            m100(raw_scores["composition"]),
             -5 * m100(raw_scores["small_mistakes"]),  # NOQA
            -30 * m100(raw_scores["big_mistakes"]),
        ])


class AcroScore:
    def __init__(self, score):
        self.score = score
        raw_data = score.get_data()
        num_acros = len(score.run.acrobatics)
        self.data = {
            "reductions": raw_data.pop("reductions", [None] * num_acros),
            "mistakes": raw_data.pop("mistakes", 0),
        }

    @property
    def total_score(self):
        result = 0
        acro_data = enumerate(zip(self.score.run.acrobatics, self.data["reductions"]))
        for acro_idx, (acro, reduction) in acro_data:
            if reduction is not None:
                override = self.score.run.get_acrobatic_override(acro_idx)
                base_score = override.score if override is not None else acro["score"]
                result += apply_reduction(m100(base_score), reduction)
        result -= 30 * m100(self.data["mistakes"])
        result = min(6500, result)
        return result

    def update(self, new_data):
        if "mistakes" in new_data:
            mistakes = new_data["mistakes"]
            self.data["mistakes"] = mistakes if type(mistakes) is int and 0 <= mistakes <= 100 else 0
        if "reductions" in new_data:
            for idx, reduction in enumerate(new_data["reductions"]):
                if reduction is not None and idx < len(self.data["reductions"]):
                    cleared_reduction = reduction \
                        if type(reduction) is int and reduction in POSSIBLE_DEDUCTIONS \
                        else None
                    self.data["reductions"][idx] = cleared_reduction
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
            "penalty": raw_data.pop("penalty", None),
            "nexttour": raw_data.pop("nexttour", False),
        }

    @property
    def total_score(self):
        return (m100(self.data["penalty"])
                if self.data["penalty"] is not None
                else 0)

    def update(self, new_data):
        penalty = new_data.pop("penalty", self.data["penalty"])
        self.data = {
            "penalty": int(penalty) if penalty is not None else None,
            "nexttour": bool(new_data.pop("nexttour", self.data["nexttour"])),
        }
        self.score.set_data(self.data)

    def serialize(self):
        return {
            "total_score": self.total_score / 100,
            "raw_data": self.data,
        }


class TechScore(BaseScore):
    DEFAULT_SCORES = {
        "jump_steps": 0,
        "timing_violation": None,
        "penalty": 0,
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "timing_violation": None,
        "penalty": 0,
    }
    SCORES_VALIDATORS = {
        "jump_steps": lambda x: type(x) is int and 0 <= x <= 100,
        "timing_violation": lambda x: x in [None, True, False],
        "penalty": lambda x: type(x) is int and -100 <= x <= 0,
    }

    @staticmethod
    def get_total_score(raw_scores):
        return m100(raw_scores["penalty"])


def ScoreWrapper(score, scoring_system, discipline_judge=None):
    if discipline_judge is None:
        discipline_judge = score.discipline_judge
    role = discipline_judge.role
    if role == "head_judge":
        return HeadScore(score)
    if role == "tech_judge":
        return TechScore(score)
    if role in ["acro_judge", "dance_judge"]:
        if scoring_system == "rosfarr.am_final_fw":
            return FinalDanceScore(score)
        if scoring_system == "rosfarr.am_final_acro":
            return FinalDanceScore(score) if role == "dance_judge" else AcroScore(score)
        if scoring_system == "rosfarr.no_acro":
            return DanceScore(score)
        if scoring_system == "rosfarr.acro":
            return DanceScore(score) if role == "dance_judge" else AcroScore(score)
        if scoring_system == "rosfarr.formation":
            return FormationScore(score)
        if scoring_system == "rosfarr.formation_acro":
            return FormationAcroScore(score)
        if scoring_system == "rosfarr.simplified":
            return SimplifiedScore(score)
    raise ApiError("errors.score.score_not_exist")


class SmallScoresSet:
    def __init__(self, scores):
        self.scores = scores
        num_scores = len(scores)
        if num_scores == 0:
            self.primary_score, self.secondary_score = 0, 0
            return
        if num_scores == 1:
            self.primary_score, self.secondary_score = scores[0], scores[0]
            return
        min_score = min(scores)
        max_score = max(scores)
        sum_scores = sum(scores)
        self.primary_score = frac(2 * sum_scores - min_score - max_score, 2 * num_scores - 2)
        self.secondary_score = frac(sum_scores, num_scores)


class LargeScoresSet:
    def __init__(self, scores):
        self.scores = scores
        num_scores = len(scores)
        if num_scores == 0:
            self.primary_score, self.secondary_score = 0, 0
            return
        min_score = min(scores)
        max_score = max(scores)
        sum_scores = sum(scores)
        self.primary_score = frac(sum_scores - min_score - max_score, num_scores - 2)
        self.secondary_score = frac(sum_scores, num_scores)


class RunScore:
    def __init__(self, run, scoring_system, discipline_judges=None):
        self.run = run
        self.scoring_system = scoring_system
        discipline_judges = run.tour.discipline_judges if discipline_judges is None else discipline_judges
        scores = run.scores
        self.judge_scores = []
        for discipline_judge in discipline_judges:
            for score in scores:
                if discipline_judge.id == score.discipline_judge_id:
                    self.judge_scores.append((discipline_judge, score, ))
                    break
        self.dance_judges_total_scores = [
            ScoreWrapper(score, scoring_system, discipline_judge=discipline_judge).total_score
            for discipline_judge, score
            in self.dance_judge_scores
        ]
        self.acro_judges_total_scores = [
            ScoreWrapper(score, scoring_system, discipline_judge=discipline_judge).total_score
            for discipline_judge, score
            in self.acro_judge_scores
        ]
        head_judge_score = self.head_judge_score
        if head_judge_score is not None:
            discipline_judge, score = head_judge_score
            self.head_judge_score_wrapper = ScoreWrapper(score, scoring_system, discipline_judge=discipline_judge)
            self.head_judge_total_score = self.head_judge_score_wrapper.total_score
            self.has_next_tour = self.head_judge_score_wrapper.data["nexttour"]
        if scoring_system in ["rosfarr.acro", "rosfarr.am_final_acro"]:
            self.acro_scores = SmallScoresSet(self.acro_judges_total_scores)
            self.dance_scores = SmallScoresSet(self.dance_judges_total_scores)
        else:
            self.dance_scores = SmallScoresSet(self.dance_judges_total_scores) \
                if len(self.dance_judges_total_scores) < 5 \
                else LargeScoresSet(self.dance_judges_total_scores)

    @property
    def head_judge_score(self):
        for discipline_judge, score in self.judge_scores:
            if discipline_judge.role == "head_judge":
                return discipline_judge, score
        return None

    @property
    def tech_judge_scores(self):
        for discipline_judge, score in self.judge_scores:
            if discipline_judge.role == "tech_judge":
                yield discipline_judge, score
        return None

    @property
    def dance_judge_scores(self):
        for discipline_judge, score in self.judge_scores:
            if discipline_judge.role == "dance_judge":
                yield discipline_judge, score
            elif discipline_judge.role == "acro_judge" and \
                    self.scoring_system not in ["rosfarr.acro", "rosfarr.am_final_acro"]:
                yield discipline_judge, score

    @property
    def acro_judge_scores(self):
        for discipline_judge, score in self.judge_scores:
            if discipline_judge.role == "acro_judge" and \
                    self.scoring_system in ["rosfarr.acro", "rosfarr.am_final_acro"]:
                yield discipline_judge, score

    @property
    def penalties(self):
        if self.head_judge_score is None:
            return 0
        if self.head_judge_score_wrapper.data["penalty"] is not None:
            return self.head_judge_score_wrapper.total_score
        tj_scores = list(self.tech_judge_scores)
        if len(tj_scores) == 0:
            return 0
        return min(ScoreWrapper(score, self.scoring_system, dj).total_score for dj, score in self.tech_judge_scores)

    @property
    def nexttour_score(self):
        if self.head_judge_score is None:
            return 0
        return -1 if self.has_next_tour else 1

    def get_prev_score(self):
        prev_primary, prev_secondary = 0, 0
        if "total_score" in self.run.inherited_data:
            prev_total_score = self.run.inherited_data["total_score"]
            prev_primary, prev_secondary = \
                frac(*prev_total_score["primary_score"]), frac(*prev_total_score["secondary_score"])
        return prev_primary, prev_secondary

    @property
    def sorting_score(self):
        prev_primary, prev_secondary = self.get_prev_score()
        if not self.run.performed:
            if self.scoring_system == "rosfarr.am_final_acro":
                return (10000000000000000, -prev_primary, -prev_secondary)
            return (10000000000000000, )
        if self.scoring_system == "rosfarr.am_final_acro":
            return (
                -(self.dance_scores.primary_score + self.acro_scores.primary_score + self.penalties + prev_primary),
                -(self.dance_scores.secondary_score + self.acro_scores.secondary_score + self.penalties +
                  prev_secondary),
                -(self.dance_scores.primary_score + self.acro_scores.primary_score + self.penalties),
                -(self.dance_scores.secondary_score + self.acro_scores.secondary_score + self.penalties),
                self.nexttour_score,
            )
        if self.scoring_system == "rosfarr.acro":
            return (
                -(self.dance_scores.primary_score + self.acro_scores.primary_score + self.penalties),
                -(self.dance_scores.secondary_score + self.acro_scores.secondary_score + self.penalties),
                self.nexttour_score,
            )
        return (
            -(self.dance_scores.primary_score + self.penalties),
            -(self.dance_scores.secondary_score + self.penalties),
            self.nexttour_score,
        )

    @property
    def verbose_display_score(self):
        sorting_score = self.sorting_score
        prev_primary, prev_secondary = self.get_prev_score()
        if not self.run.performed:
            if self.scoring_system == "rosfarr.am_final_acro":
                return {
                    "previous_tour": {
                        "primary_score": float(prev_primary / 100.0),
                        "secondary_score": float(prev_secondary / 100.0),
                    }
                }
            return {}
        if self.scoring_system == "rosfarr.am_final_acro":
            return {
                "previous_tour": {
                    "primary_score": float(prev_primary / 100.0),
                    "secondary_score": float(prev_secondary / 100.0),
                },
                "current_tour": {
                    "primary_score": float(-sorting_score[2] / 100.0),
                    "secondary_score": float(-sorting_score[3] / 100.0),
                },
                "primary_score": float(-sorting_score[0] / 100.0),
                "secondary_score": float(-sorting_score[1] / 100.0),
                "nexttour": bool(sorting_score[4] == -1),
                "total_penalty": self.penalties / 100,
            }
        return {
            "primary_score": float(-sorting_score[0] / 100.0),
            "secondary_score": float(-sorting_score[1] / 100.0),
            "nexttour": bool(sorting_score[2] == -1),
            "total_penalty": float(self.penalties / 100.0),
        }

    @property
    def display_score(self):
        if not self.run.performed:
            return "—"
        sorting_score = self.sorting_score
        return "{:.2f} / {:.2f}".format(-sorting_score[0] / 100.0, -sorting_score[1] / 100.0)

    def serialize_data_to_inherit(self):
        if "penalties" in self.run.inherited_data:
            current_penalties = copy.deepcopy(self.run.inherited_data["penalties"])
        else:
            current_penalties = []
        if self.penalties != 0:
            current_penalties.append({
                "tour": self.run.tour.name,
                "penalty": int(self.penalties) // 100,
            })
        result = {
            "penalties": current_penalties,
        }
        if self.scoring_system == "rosfarr.am_final_fw":
            sorting_score = self.sorting_score
            result.update({
                "total_score": {
                    "primary_score": [-sorting_score[0].numerator, sorting_score[0].denominator],
                    "secondary_score": [-sorting_score[1].numerator, sorting_score[1].denominator],
                },
            })
        return result

    def serialize(self):
        scores = {}
        for discipline_judge, score in self.judge_scores:
            scores[str(discipline_judge.id)] = score.serialize(discipline_judge=discipline_judge)
        return {
            "total_run_score": self.display_score,
            "verbose_run_score": self.verbose_display_score,
            "scores": scores,
        }


class TourScores:
    def __init__(self, tour, scoring_system):
        self.tour = tour
        self.discipline_judges = list(tour.discipline_judges)
        self._table = None
        self.run_scores = [
            RunScore(run, scoring_system, discipline_judges=self.discipline_judges) for run in self.tour.runs
        ]

    def create_table(self):
        table = []
        for run_score in self.run_scores:
            table.append({
                "run_score": run_score,
                "sorting_score": run_score.sorting_score,
            })
        table = sorted(table, key=lambda s: s["sorting_score"])
        place = 1
        lastest_sorting_score = None
        num_advances = self.tour.get_actual_num_advances()
        for idx, row in enumerate(table, start=1):
            if lastest_sorting_score != row["sorting_score"]:
                place = idx
            lastest_sorting_score = row["sorting_score"]
            row.update({
                "place": place,
                "advances": num_advances >= place and row["run_score"].run.performed,
            })
        return table

    def table(self):
        if not self._table:
            self._table = self.create_table()
        return self._table

    def get_results(self):
        return [{
            "run": row["run_score"].run,
            "place": row["place"],
            "advances": row["advances"],
            "additional_data": {},
        } for row in self.table()]


class FormationRunScore:
    def __init__(self, run, scoring_system, discipline_judges=None):
        discipline_judges = run.tour.discipline_judges if discipline_judges is None else discipline_judges
        self.scoring_system = scoring_system
        self.n_judges = len([None for j in discipline_judges if j.role == "dance_judge"])
        self.run = run
        self.scores = run.scores
        self.places = None
        self.places_counts = None
        self.sorting_score = None

        self.judge_scores = []
        for discipline_judge in discipline_judges:
            for score in self.scores:
                if discipline_judge.id == score.discipline_judge_id:
                    self.judge_scores.append((discipline_judge, score, ))
                    break
        head_judge_score = self.head_judge_score
        if head_judge_score is not None:
            discipline_judge, score = head_judge_score
            self.head_judge_score_wrapper = ScoreWrapper(score, scoring_system, discipline_judge=discipline_judge)
            self.head_judge_total_score = self.head_judge_score_wrapper.total_score
            self.has_next_tour = self.head_judge_score_wrapper.data["nexttour"]
        if run.performed:
            self.dance_judges_total_scores = [
                ScoreWrapper(l_score, scoring_system, discipline_judge=l_discipline_judge).total_score + self.penalties
                for l_discipline_judge, l_score
                in self.dance_judge_scores
            ]
        else:
            self.dance_judges_total_scores = [-10**10 for _ in self.dance_judge_scores]

    @property
    def head_judge_score(self):
        for discipline_judge, score in self.judge_scores:
            if discipline_judge.role == "head_judge":
                return discipline_judge, score
        return None

    @property
    def tech_judge_scores(self):
        for discipline_judge, score in self.judge_scores:
            if discipline_judge.role == "tech_judge":
                yield discipline_judge, score
        return None

    @property
    def dance_judge_scores(self):
        for discipline_judge, score in self.judge_scores:
            if discipline_judge.role == "dance_judge":
                yield discipline_judge, score

    def serialize_data_to_inherit(self):
        if "penalties" in self.run.inherited_data:
            current_penalties = copy.deepcopy(self.run.inherited_data["penalties"])
        else:
            current_penalties = []
        if self.penalties != 0:
            current_penalties.append({
                "tour": self.run.tour.name,
                "penalty": int(self.penalties) // 100,
            })
        return {
            "penalties": current_penalties,
        }

    def serialize(self):
        scores = {}
        for discipline_judge, score in self.judge_scores:
            scores[str(discipline_judge.id)] = score.serialize(discipline_judge=discipline_judge)
        return {
            "scores": scores,
            "total_run_score": self.display_score,
            "verbose_run_score": self.verbose_display_score,
        }

    def get_places(self):
        places = {}
        p_idx = 0
        for discipline_judge, score in self.judge_scores:
            if discipline_judge.role == "dance_judge":
                places[str(score.id)] = self.places[p_idx] if self.places is not None else None
                p_idx += 1
        return places

    def populate_with_places(self, places):
        self.places = places

    @property
    def penalties(self):
        if self.head_judge_score is None:
            return 0
        if self.head_judge_score_wrapper.data["penalty"] is not None:
            return self.head_judge_score_wrapper.total_score
        return min(ScoreWrapper(score, self.scoring_system, dj).total_score for dj, score in self.tech_judge_scores)

    @property
    def nexttour_score(self):
        if self.head_judge_score is None:
            return 0
        return -1 if self.has_next_tour else 1

    @property
    def verbose_display_score(self):
        return {
            "total_penalty": self.penalties / 100,
        }

    @property
    def display_score(self):
        if not self.run.performed:
            return "—"
        return "SK"


class FormationTourScores:
    def __init__(self, tour, scoring_system):
        self.tour = tour
        self.discipline_judges = list(tour.discipline_judges)
        self.dance_discipline_judges = [judge for judge in self.discipline_judges if judge.role == "dance_judge"]
        self.run_scores = [
            FormationRunScore(run, scoring_system, discipline_judges=self.discipline_judges)
            for run in self.tour.runs
        ]
        self.skating = SkatingSystem([rs.dance_judges_total_scores for rs in self.run_scores])
        for run_score, places in zip(self.run_scores, self.skating.places_by_runs):
            run_score.populate_with_places(places)
        self.calc_places()

    def calc_places(self):
        tmp = zip(self.skating.places, [rs.nexttour_score for rs in self.run_scores], count())
        tmp = sorted(tmp, key=lambda x: (x[0], x[1],))
        current_place = 1
        latest_row = None
        self.places = [0] * len(tmp)
        for idx, (place, nt, row_idx) in enumerate(tmp):
            if (place, nt,) != latest_row:
                current_place = idx + 1
            latest_row = (place, nt,)
            self.places[row_idx] = current_place

    def get_results(self):
        return [{
            "run": run_score.run,
            "place": place,
            "advances": place <= self.tour.num_advances,
            "additional_data": {
                "places": run_score.get_places(),
            }
        } for place, run_score in sorted(zip(self.places, self.run_scores), key=lambda x: x[0])]
