import copy

from fractions import Fraction as frac

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
                                   old_value if old_value is not None else self.DEFAULT_SCORES[key])
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
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "dance_tech": lambda x: type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "dance_figs": lambda x: type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "impression": lambda x: type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "small_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
        "big_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }

    @staticmethod
    def get_total_score(raw_scores):
        return sum([
            m100(raw_scores["dance_tech"]),
            m100(raw_scores["dance_figs"]),
            m100(raw_scores["impression"]),
             -5 * m100(raw_scores["small_mistakes"]),  # NOQA
            -30 * m100(raw_scores["big_mistakes"]),
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
            "penalty": raw_data.pop("penalty", 0),
            "nexttour": raw_data.pop("nexttour", False),
        }

    @property
    def total_score(self):
        return m100(self.data["penalty"])

    def update(self, new_data):
        self.data = {
            "penalty": int(new_data.pop("penalty", self.data["penalty"])),
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
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "timing_violation": None,
    }
    SCORES_VALIDATORS = {
        "jump_steps": lambda x: type(x) is int and 0 <= x <= 100,
        "timing_violation": lambda x: x in [None, True, False],
    }

    @staticmethod
    def get_total_score(raw_scores):
        return 0


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
        if self.head_judge_score is not None:
            discipline_judge, score = self.head_judge_score
            score_wrapper = ScoreWrapper(score, scoring_system, discipline_judge=discipline_judge)
            self.head_judge_total_score = score_wrapper.total_score
            self.has_next_tour = score_wrapper.data["nexttour"]
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
        penalty = self.head_judge_total_score
        return frac(penalty)

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
            }
        return {
            "primary_score": float(-sorting_score[0] / 100.0),
            "secondary_score": float(-sorting_score[1] / 100.0),
            "nexttour": bool(sorting_score[2] == -1),
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
            score_wrapper = ScoreWrapper(score, scoring_system, discipline_judge=discipline_judge)
            self.head_judge_total_score = score_wrapper.total_score
            self.has_next_tour = score_wrapper.data["nexttour"]
        self.dance_judges_total_scores = [
            ScoreWrapper(l_score, scoring_system, discipline_judge=l_discipline_judge).total_score + self.penalties
            for l_discipline_judge, l_score
            in self.dance_judge_scores
        ]

    @property
    def head_judge_score(self):
        for discipline_judge, score in self.judge_scores:
            if discipline_judge.role == "head_judge":
                return discipline_judge, score
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

    def populate_with_places(self, places, places_counts):
        self.places = places
        self.places_counts = list(places_counts)

    @property
    def penalties(self):
        if self.head_judge_score is None:
            return 0
        penalty = self.head_judge_total_score
        return penalty

    @property
    def nexttour_score(self):
        if self.head_judge_score is None:
            return 0
        return -1 if self.has_next_tour else 1

    def set_sorting_score(self, place):
        if not self.run.scores:
            return (10000000000000000, )
        self.sorting_score = (
            place,
            -self.places_counts[place],
            sum([p for p in self.places if p <= place]),
            self.nexttour_score,
        )

    @property
    def verbose_display_score(self):
        if not self.run.performed:
            return {}
        sorting_score = self.sorting_score
        if sorting_score is None:
            return {}
        return {
            "quorum": sorting_score[0],
            "places_with_quorum": -sorting_score[1],
            "sum_places_with_quorum": sorting_score[2],
            "nexttour": bool(sorting_score[3] == -1),
        }

    @property
    def display_score(self):
        if not self.run.performed:
            return "—"
        if self.sorting_score is None:
            return "SK"
        ss = self.sorting_score
        return "{} / {} / {}".format(ss[0], -ss[1], ss[2])


class FormationTourScores:
    def __init__(self, tour, scoring_system):
        self.tour = tour
        self.discipline_judges = list(tour.discipline_judges)
        self.dance_discipline_judges = [judge for judge in self.discipline_judges if judge.role == "dance_judge"]
        self._table = None
        self.run_scores = [
            FormationRunScore(run, scoring_system, discipline_judges=self.discipline_judges)
            for run in self.tour.runs
        ]

    @staticmethod
    def sort_table(table, kv_judges):
        rows_left = {row["run_score"].run.id: row for row in table}
        yielded = 0
        for place in range(1, len(table) + 1):
            rows_with_kv = []
            for row_id, row in rows_left.items():
                if row["run_score"].places_counts[place] >= kv_judges:
                    rows_with_kv.append(row)
            for row in rows_with_kv:
                row["run_score"].set_sorting_score(place)
            rows_with_kv = sorted(rows_with_kv, key=lambda x: x["run_score"].sorting_score)
            to_yield = rows_with_kv[:max(0, place - yielded)]
            if len(to_yield) > 0:
                for idx in range(len(to_yield), len(rows_with_kv)):
                    if rows_with_kv[idx]["run_score"].sorting_score == rows_with_kv[idx - 1]["run_score"].sorting_score:
                        to_yield.append(rows_with_kv[idx])
                    else:
                        break
            yield from to_yield
            yielded += len(to_yield)
            for row in to_yield:
                del rows_left[row["run_score"].run.id]

    @staticmethod
    def scores_to_places(scores):
        tmp = zip(scores, range(len(scores)))
        tmp = sorted(tmp, key=lambda y: y[0])
        place = 1
        latest_score = None
        for idx in range(len(tmp)):
            if idx > 0 and latest_score != tmp[idx][0]:
                place = idx + 1
            latest_score = tmp[idx][0]
            tmp[idx] = (place, tmp[idx][1])
        result = [x[0] for x in sorted(tmp, key=lambda y: y[1])]
        return result

    def places_to_counts(self, places, n_forms):
        res = [0] * (n_forms + 1)
        for place in places:
            res[place] += 1
        for idx in range(1, len(res)):
            res[idx] += res[idx - 1]
        return res

    def create_table(self):
        table = []
        scores_by_runs = [
            [
                (0, -judge_score) if run_score.run.performed else (1, )
                for judge_score in run_score.dance_judges_total_scores
            ] for run_score in self.run_scores
        ]
        scores_by_judges = zip(*scores_by_runs)
        places_by_judges = [self.scores_to_places(scores) for scores in scores_by_judges]
        places_by_runs = list(zip(*places_by_judges))
        places_counts = [self.places_to_counts(places, len(scores_by_runs)) for places in places_by_runs]
        for run_score, run_places, run_places_counts in zip(self.run_scores, places_by_runs, places_counts):
            run_score.populate_with_places(run_places, run_places_counts)
        for run_score in self.run_scores:
            table.append({
                "run_score": run_score,
            })
        table = list(self.sort_table(table, len(self.dance_discipline_judges) // 2 + 1))
        place = 1
        lastest_sorting_score = None
        num_advances = self.tour.get_actual_num_advances()
        for idx, row in enumerate(table, start=1):
            if lastest_sorting_score != row["run_score"].sorting_score:
                place = idx
            lastest_sorting_score = row["run_score"].sorting_score
            row.update({
                "place": place,
                "advances": num_advances >= place,
                "scores": row["run_score"].serialize(),
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
            "additional_data": {
                "places": row["run_score"].get_places(),
            }
        } for row in self.table()]
