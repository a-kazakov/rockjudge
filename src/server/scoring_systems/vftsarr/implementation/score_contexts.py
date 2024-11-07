import itertools
from abc import ABCMeta, abstractmethod
from fractions import Fraction as frac
from typing import Any, Callable, Dict, Set, Union, List, Type, Optional

from scoring_systems.base import ScoreInfo, RunInfo, TourComputationRequest, ScoreResult
from .common import CachedClass, float_to_frac


POSSIBLE_REDUCTIONS = (0, 5, 10, 15, 25, 35, 50, 75, 100)

ARR_CARD_REASONS = {
    "base": {
        "DURATION": 10,
        "BASIC_STEPS_COUNT": 20,
        "COSTUME": 30,
        "MUSIC": 40,
        "OTHER": 1000,
    },
    "acro": {"ACRO_COUNT": 100, "NO_REQUIRED_ACRO": 110, "FORBIDDEN_ACRO": 120},
    "formation": {"INCOMPLETE_COUPLE": 200},
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


def make_apply_reduction(
    criteria: str, max_value: Union[int, frac] = 10
) -> Callable[[Dict[str, Any]], frac]:
    def apply_reduction(score: Dict[str, Any]) -> frac:
        return (100 - float_to_frac(score[criteria])) * frac(max_value) * frac(1, 100)

    return apply_reduction


def make_multiply(criteria: str, multiplier: frac) -> Callable[[Dict[str, Any]], frac]:
    def multiply(score: Dict[str, Any]) -> frac:
        return float_to_frac(score[criteria]) * multiplier

    return multiply


def make_combine_fields(**values: Union[int, frac]) -> Callable[[Dict[str, Any]], frac]:
    def combine_fields(score: Dict[str, Any]) -> frac:
        return sum(
            float_to_frac(score[key]) * frac(value) for key, value in values.items()
        )

    return combine_fields


def make_validate_card_reasons(*card_groups: str) -> Callable[[Any], bool]:
    all_reasons = get_all_card_reasons(*card_groups)

    def validate_card_reasons(reasons: Any) -> bool:
        return (
            isinstance(reasons, dict)
            and all(k in all_reasons and type(v) is bool for k, v in reasons.items())
            and len(reasons) == len(all_reasons)
        )

    return validate_card_reasons


def make_validate_number(
    min_value: int = 0,
    max_value: int = 10,
    allow_halves: bool = False,
    allow_none: bool = False,
) -> Callable[[Any], bool]:
    def validate_number(value: Any) -> bool:
        if value is None:
            return allow_none
        if not isinstance(value, (int, float)):
            return False
        denominator = 50 if allow_halves else 100
        if round(value * 100) % denominator != 0:
            return False
        if not (min_value - 1e-5 < value < max_value + 1e-5):
            return False
        return True

    return validate_number


def validate_reduction(value: Any) -> bool:
    if value is None:
        return True
    if not isinstance(value, int):
        return False
    return value in POSSIBLE_REDUCTIONS


def validate_card(value: Any) -> bool:
    return value in ("OK", "YC", "RC")


class ScoreContextBase(CachedClass, metaclass=ABCMeta):
    CRITERIAS_MODIFIERS: Dict[str, Callable[[Dict[str, Any]], frac]] = {}

    def __init__(
        self,
        db_data: Dict[str, Any],
        judge_role: str,
        scoring_system_name: str,
        acro_scores: List[float],
    ) -> None:
        self.db_data = db_data
        self.judge_role = judge_role
        self.scoring_system_name = scoring_system_name
        self.acro_scores = acro_scores
        self.score_info: Optional[ScoreInfo] = None

    @staticmethod
    def get_class(
        judge_role: str, scoring_system_name: str
    ) -> Type["ScoreContextBase"]:
        if judge_role == "dance_judge":
            if scoring_system_name in ("formation", "formation_acro"):
                return ScoreContextFormation
            if scoring_system_name == "formation_simplified":
                return ScoreContextFormationSimplified
            if scoring_system_name == "simplified":
                return ScoreContextSimplified
            if scoring_system_name == "solo":
                return ScoreContextSolo
            if scoring_system_name == "solo_rough":
                return ScoreContextSoloRough
            if scoring_system_name == "solo_final":
                return ScoreContextSoloFinal
            if scoring_system_name in ("dance_extended", "acro_extended"):
                return ScoreContextDanceExtended
            if scoring_system_name == "dance_rough":
                return ScoreContextDanceRough
            if scoring_system_name in ("am_final_fw", "am_final_acro"):
                return ScoreContextAmFinalDance
            return ScoreContextDance
        if judge_role == "acro_judge":
            if scoring_system_name == "am_final_fw":
                return ScoreContextAmFinalDance
            if scoring_system_name in (
                "am_final_acro",
                "am_qual",
                "acro",
                "acro_extended",
                "formation_acro",
            ):
                return ScoreContextAcro
            return ScoreContextNull
        if judge_role == "tech_judge":
            if scoring_system_name in (
                "am_final_acro",
                "am_qual",
                "acro",
                "acro_extended",
            ):
                return ScoreContextTechAcro
            if scoring_system_name in ("formation", "formation_simplified"):
                return ScoreContextTechFormation
            if scoring_system_name == "formation_acro":
                return ScoreContextTechFormationAcro
            return ScoreContextTechDance
        if judge_role == "head_judge":
            return ScoreContextHead
        return ScoreContextNull

    @classmethod
    def make_from_data(
        cls,
        db_data: Dict[str, Any],
        judge_role: str,
        scoring_system_name: str,
        acro_scores: List[float],
    ) -> "ScoreContextBase":
        final_cls = cls.get_class(judge_role, scoring_system_name)
        return final_cls(db_data, judge_role, scoring_system_name, acro_scores)

    @classmethod
    def make_from_request(
        cls,
        score_info: ScoreInfo,
        run_info: RunInfo,
        tour_request: TourComputationRequest,
        scoring_system_name: str,
    ) -> "ScoreContextBase":
        db_data = score_info.data
        judge_role = tour_request.judge_roles[score_info.judge_id]
        acro_scores = run_info.acro_scores
        result = cls.make_from_data(
            db_data, judge_role, scoring_system_name, acro_scores
        )
        result.score_info = score_info
        return result

    @property
    @abstractmethod
    def total_score(self) -> str:
        pass

    @property
    def user_data(self) -> Dict[str, Any]:
        return {
            **self.INITIAL_SCORES,
            **{
                key: self.db_data[key]
                for key in self.INITIAL_SCORES
                if key in self.db_data
                and self.SCORES_VALIDATORS[key](self.db_data[key])
            },
        }

    @property
    def counting_score(self) -> Dict[str, Any]:
        return {
            key: (value if value is not None else self.DEFAULT_SCORES[key])
            for key, value in self.user_data.items()
        }

    @property
    def criterias(self) -> Dict[str, frac]:
        return {
            key: modifier(self.counting_score)
            for key, modifier in self.CRITERIAS_MODIFIERS.items()
        }

    @property
    def result(self) -> ScoreResult:
        return ScoreResult(
            is_valid=True,
            total_score_str=self.total_score,
            extra_data={
                "parts": self.user_data,
                "criterias": {k: float(v) for k, v, in self.criterias.items()},
            },
        )


class ScoreContextSimplified(ScoreContextBase):
    DEFAULT_SCORES = {"points": 0}
    INITIAL_SCORES = {"points": None}
    SCORES_VALIDATORS = {
        "points": make_validate_number(min_value=1, max_value=40, allow_none=True)
    }
    CRITERIAS_MODIFIERS = {"points": lambda x: frac(x["points"])}

    @property
    def total_score(self) -> Union[str, float, int, frac]:
        return str(int(self.counting_score["points"]))


class ScoreContextDanceExtended(ScoreContextBase):
    DEFAULT_SCORES = {
        "fw_man": 100,
        "fw_woman": 100,
        "df_accuracy": 0,
        "df_complexity": 0,
        "df_art": 0,
        "c_idea": 0,
        "c_performance": 0,
        "c_bonus": 0,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "fw_woman": None,
        "fw_man": None,
        "df_accuracy": None,
        "df_complexity": None,
        "df_art": None,
        "c_idea": None,
        "c_performance": None,
        "c_bonus": None,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "fw_man": validate_reduction,
        "fw_woman": validate_reduction,
        "df_accuracy": make_validate_number(
            max_value=5, allow_halves=True, allow_none=True
        ),
        "df_complexity": make_validate_number(
            max_value=4, allow_halves=True, allow_none=True
        ),
        "df_art": make_validate_number(max_value=1, allow_halves=True, allow_none=True),
        "c_idea": make_validate_number(max_value=5, allow_halves=True, allow_none=True),
        "c_performance": make_validate_number(
            max_value=4, allow_halves=True, allow_none=True
        ),
        "c_bonus": make_validate_number(
            max_value=1, allow_halves=True, allow_none=True
        ),
        "small_mistakes": make_validate_number(max_value=100),
        "big_mistakes": make_validate_number(max_value=100),
    }
    CRITERIAS_MODIFIERS = {
        "fw_woman": make_apply_reduction("fw_woman"),
        "fw_man": make_apply_reduction("fw_man"),
        "dance_figs": make_combine_fields(
            df_accuracy=frac(5, 2), df_complexity=frac(5, 2), df_art=frac(5, 2)
        ),
        "composition": make_combine_fields(c_idea=2, c_performance=2, c_bonus=2),
        "mistakes": make_combine_fields(small_mistakes=-2, big_mistakes=-10),
    }

    @property
    def total_score(self) -> str:
        num_set = sum(
            self.user_data[key] is not None for key in self.INITIAL_SCORES.keys()
        )
        if num_set <= sum(value is not None for value in self.INITIAL_SCORES.values()):
            return "–"
        if num_set == len(self.DEFAULT_SCORES):
            return "✓"
        return "..."


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
        "fw_man": validate_reduction,
        "fw_woman": validate_reduction,
        "dance_figs": make_validate_number(allow_halves=True, allow_none=True),
        "composition": make_validate_number(allow_halves=True, allow_none=True),
        "small_mistakes": make_validate_number(max_value=100),
        "big_mistakes": make_validate_number(max_value=100),
    }
    CRITERIAS_MODIFIERS = {
        "fw_woman": make_apply_reduction("fw_woman"),
        "fw_man": make_apply_reduction("fw_man"),
        "dance_figs": make_multiply("dance_figs", frac(5, 2)),
        "composition": make_multiply("composition", frac(2)),
        "mistakes": make_combine_fields(small_mistakes=-2, big_mistakes=-10),
    }

    @property
    def total_score(self) -> str:
        num_set = sum(
            self.user_data[key] is not None for key in self.INITIAL_SCORES.keys()
        )
        if num_set <= sum(value is not None for value in self.INITIAL_SCORES.values()):
            return "–"
        if num_set == len(self.DEFAULT_SCORES):
            return "✓"
        return "..."


class ScoreContextDanceRough(ScoreContextDance):
    SCORES_VALIDATORS = {
        "fw_man": validate_reduction,
        "fw_woman": validate_reduction,
        "dance_figs": make_validate_number(allow_none=True),
        "composition": make_validate_number(allow_none=True),
        "small_mistakes": make_validate_number(max_value=100),
        "big_mistakes": make_validate_number(max_value=100),
    }


class ScoreContextAmFinalDance(ScoreContextDanceExtended):
    CRITERIAS_MODIFIERS = {
        "fw_woman": make_apply_reduction("fw_woman", 5),
        "fw_man": make_apply_reduction("fw_man", 5),
        "dance_figs": make_combine_fields(
            df_accuracy=frac(5, 4), df_complexity=frac(5, 4), df_art=frac(5, 4)
        ),
        "composition": make_combine_fields(c_idea=1, c_performance=1, c_bonus=1),
        "mistakes": make_combine_fields(small_mistakes=-2, big_mistakes=-10),
    }


class ScoreContextSolo(ScoreContextBase):
    DEFAULT_SCORES = {
        "fw": 100,
        "dance_figs": 0,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "fw": None,
        "dance_figs": None,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "fw": validate_reduction,
        "dance_figs": make_validate_number(allow_halves=True, allow_none=True),
        "small_mistakes": make_validate_number(max_value=100),
        "big_mistakes": make_validate_number(max_value=100),
    }
    CRITERIAS_MODIFIERS = {
        "fw": make_apply_reduction("fw", max_value=20),
        "dance_figs": make_multiply("dance_figs", frac(5, 2)),
        "mistakes": make_combine_fields(small_mistakes=-2, big_mistakes=-10),
    }

    @property
    def total_score(self) -> str:
        num_set = sum(
            self.user_data[key] is not None for key in self.INITIAL_SCORES.keys()
        )
        if num_set <= sum(value is not None for value in self.INITIAL_SCORES.values()):
            return "–"
        if num_set == len(self.DEFAULT_SCORES):
            return "✓"
        return "..."


class ScoreContextSoloRough(ScoreContextSolo):
    SCORES_VALIDATORS = {
        "fw": validate_reduction,
        "dance_figs": make_validate_number(allow_none=True),
        "small_mistakes": make_validate_number(max_value=100),
        "big_mistakes": make_validate_number(max_value=100),
    }


class ScoreContextSoloFinal(ScoreContextSolo):
    DEFAULT_SCORES = {
        "variations": 0,
        **ScoreContextSolo.DEFAULT_SCORES,
    }
    INITIAL_SCORES = {
        "variations": None,
        **ScoreContextSolo.INITIAL_SCORES,
    }
    SCORES_VALIDATORS = {
        "variations": make_validate_number(allow_halves=True, allow_none=True),
        **ScoreContextSolo.SCORES_VALIDATORS,
    }
    CRITERIAS_MODIFIERS = {
        "variations": make_multiply("variations", frac(1, 1)),
        **ScoreContextSolo.CRITERIAS_MODIFIERS,
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
        "a1": validate_reduction,
        "a2": validate_reduction,
        "a3": validate_reduction,
        "a4": validate_reduction,
        "a5": validate_reduction,
        "a6": validate_reduction,
        "a7": validate_reduction,
        "a8": validate_reduction,
    }

    @property
    def criterias(self) -> Dict[str, frac]:
        return {
            f"a{idx}": (100 - float_to_frac(self.counting_score[f"a{idx}"]))
            * float_to_frac(base_score)
            * frac(1, 100)
            for idx, base_score in enumerate(self.acro_scores, start=1)
        }

    @property
    def total_score(self) -> str:
        num_acros = len(self.acro_scores)
        num_set = sum(
            self.user_data[f"a{x}"] is not None for x in range(1, num_acros + 1)
        )
        return str(f"{num_set} / {num_acros}")


class ScoreContextFormation(ScoreContextBase):
    DEFAULT_SCORES = {
        "fw": 100,
        "df_accuracy": 0,
        "df_difficulty": 0,
        "df_art": 0,
        "c_structure": 0,
        "c_ideas": 0,
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
        "c_structure": None,
        "c_ideas": None,
        "c_bonus": None,
        "fig_execution": None,
        "fig_patterns": None,
        "fig_transitions": None,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "fw": validate_reduction,
        "df_accuracy": make_validate_number(
            max_value=5, allow_halves=True, allow_none=True
        ),
        "df_difficulty": make_validate_number(
            max_value=4, allow_halves=True, allow_none=True
        ),
        "df_art": make_validate_number(max_value=1, allow_halves=True, allow_none=True),
        "c_structure": make_validate_number(
            max_value=5, allow_halves=True, allow_none=True
        ),
        "c_ideas": make_validate_number(
            max_value=4, allow_halves=True, allow_none=True
        ),
        "c_bonus": make_validate_number(
            max_value=1, allow_halves=True, allow_none=True
        ),
        "fig_execution": make_validate_number(
            max_value=5, allow_halves=True, allow_none=True
        ),
        "fig_patterns": make_validate_number(
            max_value=4, allow_halves=True, allow_none=True
        ),
        "fig_transitions": make_validate_number(
            max_value=1, allow_halves=True, allow_none=True
        ),
        "small_mistakes": make_validate_number(max_value=100),
        "big_mistakes": make_validate_number(max_value=100),
    }
    CRITERIAS_MODIFIERS = {
        "fw": make_apply_reduction("fw"),
        "dance_figs": make_combine_fields(df_accuracy=2, df_difficulty=2, df_art=2),
        "composition": make_combine_fields(
            c_ideas=frac(3, 2), c_structure=frac(3, 2), c_bonus=frac(3, 2)
        ),
        "figures": make_combine_fields(
            fig_execution=2, fig_patterns=2, fig_transitions=2
        ),
        "mistakes": make_combine_fields(small_mistakes=-2, big_mistakes=-10),
    }

    @property
    def total_score(self) -> str:
        num_set = sum(
            self.user_data[key] is not None for key in self.INITIAL_SCORES.keys()
        )
        if num_set <= sum(value is not None for value in self.INITIAL_SCORES.values()):
            return "–"
        if num_set == len(self.DEFAULT_SCORES):
            return "✓"
        return "..."


class ScoreContextFormationSimplified(ScoreContextBase):
    DEFAULT_SCORES = {
        "fw": 100,
        "dance_figs": 0,
        "composition": 0,
        "figures": 0,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    INITIAL_SCORES = {
        "fw": None,
        "dance_figs": None,
        "composition": None,
        "figures": None,
        "small_mistakes": 0,
        "big_mistakes": 0,
    }
    SCORES_VALIDATORS = {
        "fw": lambda x: x is None or type(x) is int and x in POSSIBLE_REDUCTIONS,
        "dance_figs": make_validate_number(allow_halves=True, allow_none=True),
        "composition": make_validate_number(allow_halves=True, allow_none=True),
        "figures": make_validate_number(allow_halves=True, allow_none=True),
        "small_mistakes": make_validate_number(max_value=100),
        "big_mistakes": make_validate_number(max_value=100),
    }
    CRITERIAS_MODIFIERS = {
        "fw": make_apply_reduction("fw"),
        "dance_figs": make_multiply("dance_figs", frac(2)),
        "composition": make_multiply("composition", frac(3, 2)),
        "figures": make_multiply("figures", frac(2)),
        "mistakes": make_combine_fields(small_mistakes=-2, big_mistakes=-10),
    }

    @property
    def total_score(self) -> str:
        num_set = sum(
            self.user_data[key] is not None for key in self.INITIAL_SCORES.keys()
        )
        if num_set <= sum(value is not None for value in self.INITIAL_SCORES.values()):
            return "–"
        if num_set == len(self.DEFAULT_SCORES):
            return "✓"
        return "..."


class ScoreContextTechDance(ScoreContextBase):
    DEFAULT_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base")},
        "restarts": 0,
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base")},
        "restarts": 0,
    }
    SCORES_VALIDATORS = {
        "jump_steps": make_validate_number(max_value=100),
        "time": make_validate_number(max_value=24 * 60 * 60, allow_none=True),
        "card": validate_card,
        "card_reasons": make_validate_card_reasons("base"),
        "restarts": make_validate_number(max_value=100),
    }

    @property
    def total_score(self) -> str:
        return self.user_data["card"] or "—"


class ScoreContextTechAcro(ScoreContextBase):
    DEFAULT_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base", "acro")},
        "fall_down": 0,
        "restarts": 0,
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {key: False for key in get_all_card_reasons("base", "acro")},
        "fall_down": 0,
        "restarts": 0,
    }
    SCORES_VALIDATORS = {
        "jump_steps": make_validate_number(max_value=100),
        "time": make_validate_number(max_value=24 * 60 * 60, allow_none=True),
        "card": validate_card,
        "card_reasons": make_validate_card_reasons("base", "acro"),
        "fall_down": make_validate_number(max_value=100),
        "restarts": make_validate_number(max_value=100),
    }

    @property
    def total_score(self) -> str:
        card = self.user_data["card"] or "—"
        fall_down = self.user_data["fall_down"]
        return str(f"{card}, {fall_down}")


class ScoreContextTechFormation(ScoreContextBase):
    DEFAULT_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {
            key: False for key in get_all_card_reasons("base", "formation")
        },
        "undercount": 0,
        "restarts": 0,
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {
            key: False for key in get_all_card_reasons("base", "formation")
        },
        "undercount": 0,
        "restarts": 0,
    }
    SCORES_VALIDATORS = {
        "jump_steps": make_validate_number(max_value=100),
        "time": make_validate_number(max_value=24 * 60 * 60, allow_none=True),
        "card": validate_card,
        "card_reasons": make_validate_card_reasons("base", "formation"),
        "undercount": make_validate_number(max_value=100),
        "restarts": make_validate_number(max_value=100),
    }

    @property
    def total_score(self) -> str:
        card = self.user_data["card"] or "—"
        missing = self.user_data["undercount"]
        return str(f"{card}, {missing}")


class ScoreContextTechFormationAcro(ScoreContextBase):
    DEFAULT_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {
            key: False for key in get_all_card_reasons("base", "acro", "formation")
        },
        "undercount": 0,
        "fall_down": 0,
        "restarts": 0,
    }
    INITIAL_SCORES = {
        "jump_steps": 0,
        "time": None,
        "card": "OK",
        "card_reasons": {
            key: False for key in get_all_card_reasons("base", "acro", "formation")
        },
        "undercount": 0,
        "fall_down": 0,
        "restarts": 0,
    }
    SCORES_VALIDATORS = {
        "jump_steps": make_validate_number(max_value=100),
        "time": make_validate_number(max_value=24 * 60 * 60, allow_none=True),
        "card": validate_card,
        "card_reasons": make_validate_card_reasons("base", "acro", "formation"),
        "undercount": make_validate_number(max_value=100),
        "fall_down": make_validate_number(max_value=100),
        "restarts": make_validate_number(max_value=100),
    }

    @property
    def total_score(self) -> str:
        card = self.user_data["card"] or "—"
        missing = self.user_data["undercount"]
        fall_down = self.user_data["fall_down"]
        return str(f"{card}, {missing}/{fall_down}")


class ScoreContextHead(ScoreContextBase):
    DEFAULT_SCORES = {
        "bonus": 0,
        "card": "OK",
        "card_reasons": {
            key: False for key in get_all_card_reasons("base", "acro", "formation")
        },
    }
    INITIAL_SCORES = {
        "bonus": 0,
        "card": "OK",
        "card_reasons": {
            key: False for key in get_all_card_reasons("base", "acro", "formation")
        },
    }
    SCORES_VALIDATORS = {
        "bonus": lambda x: type(x) is int and -10 <= x <= 10,
        "card": lambda x: x in ("OK", "YC", "RC"),
        "card_reasons": make_validate_card_reasons("base", "acro", "formation"),
    }

    @property
    def total_score(self) -> str:
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

    @property
    def total_score(self) -> str:
        return "–"
