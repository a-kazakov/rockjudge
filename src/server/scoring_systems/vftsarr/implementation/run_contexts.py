import itertools
import math
from abc import ABCMeta, abstractmethod
from collections import defaultdict
from fractions import Fraction as frac
from typing import Any, DefaultDict, Dict, List, Optional, Tuple, Type, Union

from enums import RunStatus
from scoring_systems.base import RunInfo, RunResult, TourComputationRequest
from .common import CachedClass, get_scaled_median, safe_max
from .score_contexts import ScoreContextBase


def round_score(score: frac, precision: frac | int) -> frac:
    # Can't use system round since ties should be rounded up
    base_value = math.floor(score / precision)
    lower_option = base_value * precision
    upper_option = lower_option + precision
    lower_diff = score - lower_option
    upper_diff = upper_option - score
    return lower_option if lower_diff < upper_diff else upper_option


class RunContextBase(CachedClass, metaclass=ABCMeta):
    def __init__(
        self,
        run_info: RunInfo,
        tour_request: TourComputationRequest,
        scoring_system_name: str,
    ) -> None:
        self.run_info = run_info
        self.tour_request = tour_request
        self.scoring_system_name = scoring_system_name

    @staticmethod
    def get_class(scoring_system_name) -> Type["RunContextBase"]:
        if scoring_system_name in ("formation", "formation_simplified"):
            return RunContextFormation
        if scoring_system_name == "formation_acro":
            return RunContextFormationAcro
        if scoring_system_name == "am_final_fw":
            return RunContextAmFinalFw
        if scoring_system_name == "am_final_acro":
            return RunContextAmFinalAcro
        if scoring_system_name == "am_qual":
            return RunContextAmQual
        if scoring_system_name in ("acro", "acro_extended"):
            return RunContextAcro
        if scoring_system_name == "simplified":
            return RunContextSimplified
        if scoring_system_name in ("solo", "solo_rough"):
            return RunContextSolo
        if scoring_system_name == "solo_final_spb":
            return RunContextSoloFinalSpb
        return RunContextDance

    @classmethod
    def make(
        cls,
        run_info: RunInfo,
        tour_request: TourComputationRequest,
        scoring_system_name: str,
    ) -> "RunContextBase":
        return cls.get_class(scoring_system_name)(
            run_info, tour_request, scoring_system_name
        )

    @property
    @abstractmethod
    def scoring_criterias(self) -> Tuple[str, ...]:
        pass

    @property
    def inherited_data(self) -> Dict[str, Any]:
        inherited_dict = self.tour_request.inherited_data or {}
        return inherited_dict.get("by_participant", {}).get(
            self.run_info.participant_id, {}
        )

    @property
    def scores(self) -> List[ScoreContextBase]:
        return [
            ScoreContextBase.make_from_request(
                score_info, self.run_info, self.tour_request, self.scoring_system_name
            )
            for score_info in self.run_info.scores
        ]

    @property
    def scores_by_role(self) -> Dict[str, List[ScoreContextBase]]:
        return {
            role: [score for score in self.scores if score.judge_role == role]
            for role in ("dance_judge", "acro_judge", "tech_judge", "head_judge")
        }

    @property
    def card(self) -> str:
        has_prev_cards = len(self.inherited_data.get("cards", [])) > 0
        all_current_cards = [
            score.counting_score["card"]
            for score in itertools.chain(
                self.scores_by_role["tech_judge"], self.scores_by_role["head_judge"]
            )
        ]
        current_card = (
            "RC"
            if "RC" in all_current_cards
            else "YC"
            if "YC" in all_current_cards
            else "OK"
        )
        return (
            "RC"
            if current_card == "RC" or (current_card == "YC" and has_prev_cards)
            else "YC"
            if current_card == "YC"
            else "OK"
        )

    @property
    def card_reasons(self) -> Dict[str, bool]:
        result: Dict[str, bool] = {}
        for score in itertools.chain(
            self.scores_by_role["tech_judge"], self.scores_by_role["head_judge"]
        ):
            result.update(
                {
                    reason: value or result.get(reason, False)
                    for reason, value in score.counting_score["card_reasons"].items()
                }
            )
        return result

    @property
    def card_penalty(self) -> frac:
        return frac(0) if self.card != "RC" else frac(-30)

    @property
    def restarts(self) -> int:
        scores = self.scores_by_role["tech_judge"]
        if not scores:
            return 0
        return max(s.counting_score.get("restarts", 0) for s in scores)

    @property
    def restarts_penalty(self) -> frac:
        return frac(-30) * self.restarts

    @property
    def penalty(self) -> frac:
        return self.card_penalty + self.restarts_penalty

    @property
    def bonus(self) -> int:
        result = 0
        for score in self.scores_by_role["head_judge"]:
            result += score.counting_score["bonus"]
        return result

    @property
    def data_to_inherit(self) -> Dict[str, Any]:
        current_cards = self.inherited_data.get("cards", [])
        if self.card != "OK" and self.run_info.status == RunStatus.OK:
            current_cards = current_cards + [
                {"tour_id": self.tour_request.tour_id, "card": self.card}
            ]
        return {"cards": current_cards}

    @property
    def criterias_scores(self) -> Dict[str, frac]:
        criterias = set(self.scoring_criterias)
        scores_by_criteria: DefaultDict[str, List[str]] = defaultdict(list)
        for score in self.scores:
            for criteria_name, criteria_value in score.criterias.items():
                if criteria_name in criterias:
                    scores_by_criteria[criteria_name].append(criteria_value)
        result = {
            key: get_scaled_median(values)
            for key, values in scores_by_criteria.items()
        }
        if "mistakes" in result:
            result["mistakes"] = round_score(result["mistakes"], precision=2)
        return result

    @property
    def total_score(self) -> frac:
        return self.std_total_score

    @property
    def std_total_score(self) -> frac:
        result = frac(0)
        for criteria, score_value in self.criterias_scores.items():
            result += score_value
        result += self.penalty
        return result

    @property
    def display_score(self) -> str:
        return "{:.3f}".format(float(self.total_score))

    @property
    def sorting_score(self) -> Tuple[Union[int, frac], ...]:
        status = self.run_info.status
        if status != RunStatus.OK:
            return (1, int(status == RunStatus.DQ), int(status == RunStatus.NP))
        return (0, -self.total_score, -int(self.bonus))

    @property
    def extra_data(self) -> Dict[str, Any]:
        if self.run_info.status == RunStatus.OK:
            criterias_scores: Optional[Dict[str, float]] = {
                k: float(v) for k, v in self.criterias_scores.items()
            }
        else:
            criterias_scores = None
        fall_down = getattr(self, "fall_down", None)
        undercount = getattr(self, "undercount", None)
        if fall_down is not None:
            fall_down = int(fall_down)
        if undercount is not None:
            undercount = int(undercount)
        return {
            "card": self.card,
            "card_reasons": self.card_reasons,
            "criterias_scores": criterias_scores,
            "prev_cards": self.inherited_data.get("cards", []),
            "status": self.run_info.status.value,
            "fall_down": fall_down,
            "undercount": undercount,
            "restarts": self.restarts,
        }

    def make_result(self, place: int, advanced: bool) -> RunResult:
        if self.run_info.status == RunStatus.OK:
            display_score: str = self.display_score
        else:
            display_score = "—"
        return RunResult(
            total_score_str=display_score,
            extra_data=self.extra_data,
            place=(None if self.run_info.status == RunStatus.DQ else place),
            advanced=advanced,
        )


class RunContextSimplified(RunContextBase):
    @property
    def scoring_criterias(self) -> Tuple[str, ...]:
        return ("points",)


class RunContextDance(RunContextBase):
    @property
    def scoring_criterias(self) -> Tuple[str, ...]:
        return ("fw_man", "fw_woman", "dance_figs", "composition", "mistakes")


class RunContextSolo(RunContextBase):
    @property
    def scoring_criterias(self) -> Tuple[str, ...]:
        return ("fw", "dance_figs", "mistakes")


class RunContextSoloFinalSpb(RunContextBase):
    @property
    def scoring_criterias(self) -> Tuple[str, ...]:
        return ("fw", "variations", "dance_figs", "mistakes")


class RunContextAcroBase(RunContextBase):
    @property
    @abstractmethod
    def elements_count(self) -> int:
        pass

    @property
    def fall_down(self) -> frac:
        return safe_max(
            s.counting_score["fall_down"] for s in self.scores_by_role["tech_judge"]
        )

    @property
    def total_score(self) -> frac:
        return self.std_total_score - frac(30 * self.fall_down)

    @property
    def scoring_criterias(self) -> Tuple[str, ...]:
        return (
            "fw_man",
            "fw_woman",
            "dance_figs",
            "composition",
            "mistakes",
            *[f"a{x}" for x in range(1, self.elements_count + 1)],
        )


class RunContextAcro(RunContextAcroBase):
    @property
    def elements_count(self) -> int:
        return 5


class RunContextAmQual(RunContextAcro):
    @property
    def total_score(self) -> frac:
        result = frac(0)
        for criteria, score_value in self.criterias_scores.items():
            if criteria in ("fw_woman", "fw_man", "dance_figs", "composition"):
                score_value *= frac(10, 13)
            result += score_value
        result += self.penalty
        result -= 30 * self.fall_down
        return result


class RunContextAmFinalFw(RunContextDance):
    @property
    def data_to_inherit(self) -> Dict[str, Any]:
        return {"fw_score": self.total_score, **super().data_to_inherit}


class RunContextAmFinalAcro(RunContextAcroBase):
    @property
    def elements_count(self) -> int:
        return 6

    @property
    def total_score(self) -> frac:
        return self.fw_total_score + self.acro_total_score

    @property
    def fw_total_score(self) -> frac:
        return self.inherited_data.get("fw_score", frac(0))

    @property
    def acro_total_score(self) -> frac:
        result = frac(0)
        for score_value in self.criterias_scores.values():
            result += score_value
        result += self.penalty
        return result

    @property
    def sorting_score(self) -> Tuple[Union[int, frac], ...]:
        status = self.run_info.status
        if status != RunStatus.OK:
            return (1, int(status == RunStatus.DQ), int(status == RunStatus.NP))
        return (0, -self.total_score, -self.acro_total_score, -int(self.bonus))

    @property
    def extra_data(self) -> Dict[str, Any]:
        return {
            "fw_score": float(self.fw_total_score),
            "acro_score": float(self.acro_total_score),
            **super().extra_data,
        }


class RunContextFormation(RunContextBase):
    @property
    def undercount(self) -> frac:
        return safe_max(
            s.counting_score["undercount"] for s in self.scores_by_role["tech_judge"]
        )

    @property
    def total_score(self) -> frac:
        return self.std_total_score - self.undercount

    @property
    def scoring_criterias(self) -> Tuple[str, ...]:
        return ("fw", "dance_figs", "composition", "figures", "mistakes")


class RunContextFormationAcro(RunContextFormation, RunContextAcroBase):
    @property
    def elements_count(self) -> int:
        return 6

    @property
    def scoring_criterias(self) -> Tuple[str, ...]:
        return (
            "fw",
            "dance_figs",
            "composition",
            "figures",
            "mistakes",
            *[f"a{x}" for x in range(1, 9)],
        )

    @property
    def total_score(self) -> frac:
        return self.std_total_score - self.undercount - frac(30 * self.fall_down)
