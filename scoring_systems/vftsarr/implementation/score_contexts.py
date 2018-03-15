import itertools
from abc import ABCMeta, abstractmethod
from fractions import Fraction as frac
from typing import Any, Callable, Dict, Set, Union

from .common import CachedClass, float_to_frac


POSSIBLE_REDUCTIONS = (0, 5, 10, 15, 25, 35, 50, 75, 100, )

ARR_CARD_REASONS = {
    "base": {
        "DURATION": 10,
        "BASIC_STEPS_COUNT": 20,
        "COSTUME": 30,
        "MUSIC": 40,
        "OTHER": 1000,
    },
    "acro": {
        "ACRO_COUNT": 100,
        "NO_REQUIRED_ACRO": 110,
        "FORBIDDEN_ACRO": 120,
    },
    "formation": {
        "INCOMPLETE_COUPLE": 200,
    },
}


def ret_false(_):
    return False


def get_all_card_reasons(*card_groups: str) -> Set[str]:
    result = set(
        itertools.chain.from_iterable(
            ARR_CARD_REASONS[group].keys() for group in card_groups
        )
    )
    return result

def make_apply_reduction(criteria: str, max_value: Union[int, frac] = 10) -> Callable[[Dict[str, Any]], frac]:
    def apply_reduction(score: Dict[str, Any]) -> frac:
        return (100 - float_to_frac(score[criteria])) * frac(max_value) * frac(1, 100)
    return apply_reduction


def make_multiply(criteria: str, multiplier: frac) -> Callable[[Dict[str, Any]], frac]:
    def multiply(score: Dict[str, Any]) -> frac:
        return float_to_frac(score[criteria]) * multiplier
    return multiply


def make_combine_mistakes(**values: Union[int, frac]) -> Callable[[Dict[str, Any]], frac]:
    def combine_mistakes(score: Dict[str, Any]) -> frac:
        return sum(float_to_frac(score[key]) * frac(value) for key, value in values.items())
    return combine_mistakes


def make_validate_card_reasons(*card_groups: str) -> Callable[[Any], bool]:
    all_reasons = get_all_card_reasons(*card_groups)
    def validate_card_reasons(reasons: Any) -> bool:
        return (
            isinstance(reasons, dict) and
            all(k in all_reasons and type(v) is bool for k, v in reasons.items()) and
            len(reasons) == len(all_reasons)
        )
    return validate_card_reasons



class ScoreContextBase(CachedClass, metaclass=ABCMeta):
    CRITERIAS_MODIFIERS: Dict[str, Callable[[Dict[str, Any]], frac]] = {}

    def __init__(self, score_id, raw_data, judge_role, acro_scores, scoring_system_name):
        self.score_id = score_id
        self.db_data = raw_data
        self.judge_role = judge_role
        self.acro_scores = acro_scores
        self.scoring_system_name = scoring_system_name

    @staticmethod
    def get_class(judge_role, scoring_system_name):
        if judge_role == "dance_judge":
            if scoring_system_name in ("formation", "formation_acro", ):
                return ScoreContextFormation
            if scoring_system_name == "simplified":
                return ScoreContextSimplified
            if scoring_system_name == "solo":
                return ScoreContextSolo
            if scoring_system_name == "solo_rough":
                return ScoreContextSoloRough
            if scoring_system_name == "dance_rough":
                return ScoreContextDanceRough
            if scoring_system_name in ("am_final_fw", "am_final_acro", ):
                return ScoreContextAmFinalDance
            return ScoreContextDance
        if judge_role == "acro_judge":
            if scoring_system_name == "am_final_fw":
                return ScoreContextAmFinalDance
            if scoring_system_name in (
                "am_final_acro",
                "am_qual",
                "acro",
                "formation_acro",
            ):
                return ScoreContextAcro
            return ScoreContextNull
        if judge_role == "tech_judge":
            if scoring_system_name in (
                "am_final_acro",
                "am_qual",
                "acro",
            ):
                return ScoreContextTechAcro
            if scoring_system_name == "formation":
                return ScoreContextTechFormation
            if scoring_system_name == "formation_acro":
                return ScoreContextTechFormationAcro
            return ScoreContextTechDance
        if judge_role == "head_judge":
            return ScoreContextHead
        return ScoreContextNull

    @classmethod
    def make(cls, **kwargs):
        return cls.get_class(kwargs["judge_role"], kwargs["scoring_system_name"])(**kwargs)

    total_score: Union[str, float, int, frac]
    @abstractmethod
    def _total_score(self) -> Union[str, float, int, frac]:
        pass

    user_data: Dict[str, Any]
    def _user_data(self) -> Dict[str, Any]:
        return {
            **self.INITIAL_SCORES,
            **{
                key: self.db_data[key]
                for key in self.INITIAL_SCORES
                if key in self.db_data and self.SCORES_VALIDATORS[key](self.db_data[key])
            },
        }

    counting_score: Dict[str, Any]
    def _counting_score(self) -> Dict[str, Any]:
        return {
            key: (value if value is not None else self.DEFAULT_SCORES[key])
            for key, value in self.user_data.items()
        }

    criterias: Dict[str, frac]
    def _criterias(self) -> Dict[str, frac]:
        return {
            key: modifier(self.counting_score)
            for key, modifier in self.CRITERIAS_MODIFIERS.items()
        }

    def update(self, client_data: Dict[str, Any]) -> None:
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
    CRITERIAS_MODIFIERS = {
        "points": lambda x: frac(x["points"]),
    }

    def _total_score(self) -> Union[str, float, int, frac]:
        return str(int(self.counting_score["points"]))


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
    CRITERIAS_MODIFIERS = {
        "fw_woman": make_apply_reduction("fw_woman"),
        "fw_man": make_apply_reduction("fw_man"),
        "dance_figs": make_multiply("dance_figs", frac(5, 2)),
        "composition": make_multiply("composition", frac(2)),
        "mistakes": make_combine_mistakes(small_mistakes=-5, big_mistakes=-30),
    }

    def _total_score(self):
        num_set = sum(self.user_data[key] is not None for key in self.INITIAL_SCORES.keys())
        if num_set <= sum(value is not None for value in self.INITIAL_SCORES.values()):
            return "–"
        if num_set == len(self.DEFAULT_SCORES):
            return "🗸"
        return "..."


class ScoreContextDanceRough(ScoreContextDance):
    SCORES_VALIDATORS = {
        "fw_man": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "fw_woman": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "dance_figs": lambda x: x is None or type(x) is int and 0 <= x <= 10,
        "composition": lambda x: x is None or type(x) is int and 0 <= x <= 10,
        "small_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
        "big_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }


class ScoreContextAmFinalDance(ScoreContextDance):
    CRITERIAS_MODIFIERS = {
        "fw_woman": make_apply_reduction("fw_woman", 5),
        "fw_man": make_apply_reduction("fw_man", 5),
        "dance_figs": make_multiply("dance_figs", frac(5, 4)),
        "composition": make_multiply("composition", frac(1)),
        "mistakes": make_combine_mistakes(small_mistakes=-5, big_mistakes=-30),
    }

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
    CRITERIAS_MODIFIERS = {
        "fw": make_apply_reduction("fw", max_value=20),
        "dance_figs": make_multiply("dance_figs", frac(5, 2)),
        "composition": make_multiply("composition", frac(2)),
        "mistakes": make_combine_mistakes(small_mistakes=-5, big_mistakes=-30),
    }

    def _total_score(self):
        num_set = sum(self.user_data[key] is not None for key in self.INITIAL_SCORES.keys())
        if num_set <= sum(value is not None for value in self.INITIAL_SCORES.values()):
            return "–"
        if num_set == len(self.DEFAULT_SCORES):
            return "🗸"
        return "..."


class ScoreContextSoloRough(ScoreContextSolo):
    SCORES_VALIDATORS = {
        "fw": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "dance_figs": lambda x: x is None or type(x) is int and 0 <= x <= 10,
        "composition": lambda x: x is None or type(x) is int and 0 <= x <= 10,
        "small_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
        "big_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }


class ScoreContextAcro(ScoreContextBase):
    DEFAULT_SCORES = {
        "a1": 100,
        "a2": 100,
        "a3": 100,
        "a4": 100,
        "a5": 100,
        "a6": 100,
        "a7": 100,
        "a8": 100,
    }
    INITIAL_SCORES = {
        "a1": None,
        "a2": None,
        "a3": None,
        "a4": None,
        "a5": None,
        "a6": None,
        "a7": None,
        "a8": None,
    }
    SCORES_VALIDATORS = {
        "a1": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a2": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a3": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a4": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a5": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a6": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a7": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "a8": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
    }

    criterias: Dict[str, frac]
    def _criterias(self) -> Dict[str, frac]:
        return {
            f"a{idx}": (100 - float_to_frac(self.counting_score[f"a{idx}"])) * float_to_frac(base_score) * frac(1, 100)
            for idx, base_score in enumerate(self.acro_scores, start=1)
        }

    def _total_score(self):
        num_acros = len(self.acro_scores)
        num_set = sum(self.user_data[f"a{x}"] is not None for x in range(1, num_acros + 1))
        return f"{num_set} / {num_acros}"


class ScoreContextFormation(ScoreContextBase):
    DEFAULT_SCORES = {
        "fw": 100,
        "df_accuracy": 0,
        "df_difficulty": 0,
        "df_art": 0,
        "c_ideas": 0,
        "c_structure": 0,
        "c_bonus": 0,
        "fig_execution": 0,
        "fig_patterns": 0,
        "fig_transitions": 0,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "fw": None,
        "df_accuracy": None,
        "df_difficulty": None,
        "df_art": None,
        "c_ideas": None,
        "c_structure": None,
        "c_bonus": None,
        "fig_execution": None,
        "fig_patterns": None,
        "fig_transitions": None,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "fw": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "df_accuracy": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 5 and round(x * 100) % 50 == 0,
        "df_difficulty": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 4 and round(x * 100) % 50 == 0,
        "df_art": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 1 and round(x * 100) % 50 == 0,
        "c_ideas": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 5 and round(x * 100) % 50 == 0,
        "c_structure": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 4 and round(x * 100) % 50 == 0,
        "c_bonus": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 1 and round(x * 100) % 50 == 0,
        "fig_execution": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 5 and round(x * 100) % 50 == 0,
        "fig_patterns": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 4 and round(x * 100) % 50 == 0,
        "fig_transitions": lambda x: x is None or type(x) in (float, int) and 0 <= x <= 1 and round(x * 100) % 50 == 0,
        "small_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
        "big_mistakes": lambda x: type(x) is int and 0 <= x <= 100,
    }
    CRITERIAS_MODIFIERS = {
        "fw": make_apply_reduction("fw"),
        "dance_figs": lambda x: float_to_frac(x["df_accuracy"] + x["df_difficulty"] + x["df_art"]) * frac(2),
        "composition": lambda x: float_to_frac(x["c_ideas"] + x["c_structure"] + x["c_bonus"]) * frac(3, 2),
        "figures": lambda x: float_to_frac(x["fig_execution"] + x["fig_patterns"] + x["fig_transitions"]) * frac(2),
        "mistakes": make_combine_mistakes(small_mistakes=-2, big_mistakes=-10),
    }

    def _total_score(self):
        num_set = sum(self.user_data[key] is not None for key in self.INITIAL_SCORES.keys())
        if num_set <= sum(value is not None for value in self.INITIAL_SCORES.values()):
            return "–"
        if num_set == len(self.DEFAULT_SCORES):
            return "🗸"
        return "..."


class ScoreContextTechDance(ScoreContextBase):
    DEFAULT_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base")},
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base")},
    }
    SCORES_VALIDATORS = {
        "jump_steps": lambda x: type(x) is int and 0 <= x <= 100,
        "time": lambda x: x is None or type(x) is int and 0 <= x <= 24 * 60 * 60,
        "card": lambda x: x in ("OK", "YC", "RC",),
        "card_reasons": make_validate_card_reasons("base"),
    }

    def _total_score(self):
        return self.user_data["card"] or "—"


class ScoreContextTechAcro(ScoreContextBase):
    DEFAULT_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base", "acro")},
        "fall_down": 0,
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base", "acro")},
        "fall_down": 0,
    }
    SCORES_VALIDATORS = {
        "jump_steps": lambda x: type(x) is int and 0 <= x <= 100,
        "time": lambda x: x is None or type(x) is int and 0 <= x <= 24 * 60 * 60,
        "card": lambda x: x in ("OK", "YC", "RC",),
        "card_reasons": make_validate_card_reasons("base", "acro"),
        "fall_down": lambda x: type(x) is int and 0 <= x <= 100,
    }

    def _total_score(self):
        card = self.user_data["card"] or "—"
        fall_down = self.user_data["fall_down"]
        return f"{card}, {fall_down}"


class ScoreContextTechFormation(ScoreContextBase):
    DEFAULT_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base", "formation")},
        "undercount": 0,
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base", "formation")},
        "undercount": 0,
    }
    SCORES_VALIDATORS = {
        "jump_steps": lambda x: type(x) is int and 0 <= x <= 100,
        "time": lambda x: x is None or type(x) is int and 0 <= x <= 24 * 60 * 60,
        "card": lambda x: x in ("OK", "YC", "RC",),
        "card_reasons": make_validate_card_reasons("base", "formation"),
        "undercount": lambda x: type(x) is int and 0 <= x <= 100,
    }

    def _total_score(self):
        card = self.user_data["card"] or "—"
        missing = self.user_data["undercount"]
        return f"{card}, {missing}"


class ScoreContextTechFormationAcro(ScoreContextBase):
    DEFAULT_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base", "acro", "formation")},
        "undercount": 0,
        "fall_down": 0,
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base", "acro", "formation")},
        "undercount": 0,
        "fall_down": 0,
    }
    SCORES_VALIDATORS = {
        "jump_steps": lambda x: type(x) is int and 0 <= x <= 100,
        "time": lambda x: x is None or type(x) is int and 0 <= x <= 24 * 60 * 60,
        "card": lambda x: x in ("OK", "YC", "RC",),
        "card_reasons": make_validate_card_reasons("base", "acro", "formation"),
        "undercount": lambda x: type(x) is int and 0 <= x <= 100,
        "fall_down": lambda x: type(x) is int and 0 <= x <= 100,
    }

    def _total_score(self):
        card = self.user_data["card"] or "—"
        missing = self.user_data["undercount"]
        fall_down = self.user_data["fall_down"]
        return f"{card}, {missing}/{fall_down}"


class ScoreContextHead(ScoreContextBase):
    DEFAULT_SCORES = {
        "bonus": 0,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base", "acro", "formation")},
    }
    INITIAL_SCORES = {
        "bonus": 0,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base", "acro", "formation")},
    }
    SCORES_VALIDATORS = {
        "bonus": lambda x: type(x) is int and -10 <= x <= 10,
        "card": lambda x: x in ("OK", "YC", "RC",),
        "card_reasons": make_validate_card_reasons("base", "acro", "formation"),
    }

    def _total_score(self):
        result = self.counting_score["card"]
        bonus = self.counting_score["bonus"]
        if bonus != 0:
            result += " / "
            if bonus > 0:
                result += "+"
            result += str(bonus)
        return result


class ScoreContextNull(ScoreContextBase):
    DEFAULT_SCORES = {}
    INITIAL_SCORES = {}
    SCORES_VALIDATORS = {}

    def _total_score(self):
        return "–"
