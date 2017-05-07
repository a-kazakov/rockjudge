from fractions import Fraction as frac

from .common import CachedClass


POSSIBLE_REDUCTIONS = (0, 5, 10, 25, 50, 75, 100, )


def float_to_frac(value):
    return frac(int(round(value * 10)), 10)


def ret_false(_):
    return False


class ScoreContextBase(CachedClass):
    def __init__(self, score_id, raw_data, judge_role, acro_scores, scoring_system_name):
        self.score_id = score_id
        self.db_data = raw_data
        self.judge_role = judge_role
        self.acro_scores = acro_scores
        self.scoring_system_name = scoring_system_name

    @staticmethod
    def get_class(judge_role, scoring_system_name):
        if judge_role == "dance_judge":
            if scoring_system_name == "formation":
                return ScoreContextFormation
            if scoring_system_name == "formation_acro":
                return ScoreContextFormationAcro
            if scoring_system_name == "simplified":
                return ScoreContextSimplified
            if scoring_system_name == "solo":
                return ScoreContextSolo
            if scoring_system_name == "am_qual":
                return ScoreContextDanceAmQual
            if scoring_system_name in ("am_final_fw", "am_final_acro"):
                return ScoreContextDanceAmFinal
            return ScoreContextDance
        if judge_role == "acro_judge":
            if scoring_system_name == "am_final_fw":
                return ScoreContextDanceAmFinal
            if scoring_system_name in (
                "am_final_acro",
                "am_qual",
                "acro"
            ):
                return ScoreContextAcro
            return ScoreContextNull
        if judge_role == "tech_judge":
            return ScoreContextTech
        if judge_role == "head_judge":
            return ScoreContextHead
        return ScoreContextNull

    @classmethod
    def make(cls, **kwargs):
        return cls.get_class(kwargs["judge_role"], kwargs["scoring_system_name"])(**kwargs)

    def _total_score(self):
        raise NotImplementedError

    def _user_data(self):
         return {
            **self.INITIAL_SCORES,
            **{
                key: self.db_data[key]
                for key in self.INITIAL_SCORES
                if key in self.db_data
            },
        }

    def _counting_score(self):
        return {
            key: (value if value is not None else self.DEFAULT_SCORES[key])
            for key, value in self.user_data.items()
        }

    def update(self, client_data):
        cleared_data = {
            key: (
                self.counting_score[key] + client_data[key]["delta"]
                if type(client_data[key]) is dict and "delta" in client_data[key]
                else value
            )
            for key, value in client_data.items()
        }
        upd = {
            key: value
            for key, value in cleared_data.items()
            if self.SCORES_VALIDATORS.get(key, ret_false)(value)
        }
        self.db_data = {
            **self.db_data,
            **upd,
        }
        for attr in ("total_score", "user_data", "counting_score", ):
            if attr in self.__dict__:
                delattr(self, attr)


class ScoreContextSimplified(ScoreContextBase):
    DEFAULT_SCORES = {
        "points": 0,
    }
    INITIAL_SCORES = {
        "points": None,
    }
    SCORES_VALIDATORS = {
        "points": lambda x: type(x) is int and 1 <= x <= 40,
    }

    def _total_score(self):
        return float_to_frac(self.counting_score["points"])


class ScoreContextDance(ScoreContextBase):
    DEFAULT_SCORES = {
        "fw_man": 100,
        "fw_woman": 100,
        "dance_figs": 0,
        "composition": 0,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "fw_woman": None,
        "fw_man": None,
        "dance_figs": None,
        "composition": None,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "fw_man": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "fw_woman": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "dance_figs": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "composition": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "small_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
        "big_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }

    def _total_score(self):
        return (
            20 +
            frac(-1, 10) * float_to_frac(self.counting_score["fw_woman"]) +
            frac(-1, 10) * float_to_frac(self.counting_score["fw_man"]) +
            frac(5, 2) * float_to_frac(self.counting_score["dance_figs"]) +
            frac(2) * float_to_frac(self.counting_score["composition"]) +
            frac(-5) * float_to_frac(self.counting_score["small_mistakes"]) +
            frac(-30) * float_to_frac(self.counting_score["big_mistakes"])
        )


class ScoreContextSolo(ScoreContextBase):
    DEFAULT_SCORES = {
        "fw": 100,
        "dance_figs": 0,
        "composition": 0,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "fw": None,
        "dance_figs": None,
        "composition": None,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "fw": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "dance_figs": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "composition": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "small_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
        "big_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }

    def _total_score(self):
        return (
            20 +
            frac(-1, 5) * float_to_frac(self.counting_score["fw"]) +
            frac(5, 2) * float_to_frac(self.counting_score["dance_figs"]) +
            frac(2) * float_to_frac(self.counting_score["composition"]) +
            frac(-5) * float_to_frac(self.counting_score["small_mistakes"]) +
            frac(-30) * float_to_frac(self.counting_score["big_mistakes"])
        )


class ScoreContextDanceAmQual(ScoreContextDance):
    def _total_score(self):
        return (
            20 +
            frac(-1, 10) * float_to_frac(self.counting_score["fw_woman"]) +
            frac(-1, 10) * float_to_frac(self.counting_score["fw_man"]) +
            frac(5, 2) * float_to_frac(self.counting_score["dance_figs"]) +
            frac(2) * float_to_frac(self.counting_score["composition"]) +
            frac(-5) * float_to_frac(self.counting_score["small_mistakes"]) +
            frac(-30) * float_to_frac(self.counting_score["big_mistakes"])
        ) * frac(10, 13)


class ScoreContextDanceAmFinal(ScoreContextDance):
    def _total_score(self):
        return (
            10 +
            frac(-1, 20) * float_to_frac(self.counting_score["fw_woman"]) +
            frac(-1, 20) * float_to_frac(self.counting_score["fw_man"]) +
            frac(5, 4) * float_to_frac(self.counting_score["dance_figs"]) +
            float_to_frac(self.counting_score["composition"]) +
            frac(-5) * float_to_frac(self.counting_score["small_mistakes"]) +
            frac(-30) * float_to_frac(self.counting_score["big_mistakes"])
        )


class ScoreContextAcro(ScoreContextBase):
    DEFAULT_SCORES = {
        "a1": 100,
        "a2": 100,
        "a3": 100,
        "a4": 100,
        "a5": 100,
        "a6": 100,
        "mistakes": 0,
    }
    INITIAL_SCORES = {
        "a1": None,
        "a2": None,
        "a3": None,
        "a4": None,
        "a5": None,
        "a6": None,
        "mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "a1": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a2": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a3": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a4": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a5": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a6": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }

    def _total_score(self):
        acro_scores_fracs = list(map(float_to_frac, self.acro_scores))
        total_acros_by_100 = sum(
            base * (frac(100) - reduction)
            for base, reduction
            in zip(acro_scores_fracs, (self.counting_score["a" + str(key)] for key in range(1, 7)))
        )
        total_score = min(
            frac(65),
            total_acros_by_100 * frac(1, 100) - frac(30) * self.counting_score["mistakes"]
        )
        return total_score


class ScoreContextFormation(ScoreContextBase):
    DEFAULT_SCORES = {
        "dance_tech": 0,
        "dance_figs": 0,
        "impression": 0,
        "mistakes": 0,
    }
    INITIAL_SCORES = {
        "dance_tech": None,
        "dance_figs": None,
        "impression": None,
        "mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "dance_tech": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "dance_figs": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "impression": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }

    def _total_score(self):
        return (
            float_to_frac(self.counting_score["dance_tech"]) +
            float_to_frac(self.counting_score["dance_figs"]) +
            float_to_frac(self.counting_score["impression"]) +
            frac(-2) * float_to_frac(self.counting_score["mistakes"])
        )


class ScoreContextFormationAcro(ScoreContextBase):
    DEFAULT_SCORES = {
        "acrobatics": 0,
        "dance_tech": 0,
        "dance_figs": 0,
        "impression": 0,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "acrobatics": None,
        "dance_tech": None,
        "dance_figs": None,
        "impression": None,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "acrobatics": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "dance_tech": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "dance_figs": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "impression": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 10 and round(x * 100) % 50 == 0,
        "small_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
        "big_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }

    def _total_score(self):
        return (
            float_to_frac(self.counting_score["acrobatics"]) +
            float_to_frac(self.counting_score["dance_tech"]) +
            float_to_frac(self.counting_score["dance_figs"]) +
            float_to_frac(self.counting_score["impression"]) +
            frac(-2) * float_to_frac(self.counting_score["small_mistakes"]) +
            frac(-3) * float_to_frac(self.counting_score["big_mistakes"])
        )


class ScoreContextTech(ScoreContextBase):
    DEFAULT_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": None,
    }
    SCORES_VALIDATORS = {
        "jump_steps": lambda x: type(x) is int and 0 <= x <= 100,
        "time": lambda x: x is None or type(x) is int and 0 <= x <= 24 * 60 * 60,
        "card": lambda x: x in (None, "OK", "YC", "RC",),
    }

    def _total_score(self):
        return self.user_data["card"] or "—"


class ScoreContextHead(ScoreContextBase):
    DEFAULT_SCORES = {
        "nexttour": False,
        "card": "OK",
    }
    INITIAL_SCORES = {
        "nexttour": False,
        "card": "OK",
    }
    SCORES_VALIDATORS = {
        "nexttour": lambda x: type(x) is bool,
        "card": lambda x: x in ("OK", "YC", "RC",)
    }

    def _total_score(self):
        return self.counting_score["card"]
