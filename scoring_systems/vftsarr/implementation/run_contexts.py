import copy
import itertools
from abc import ABCMeta, abstractmethod
from collections import defaultdict
from fractions import Fraction as frac
from typing import Any, DefaultDict, Dict, List, Tuple, Type, Union

from scoring_systems.vftsarr.implementation.common import float_to_frac, get_scaled_median, safe_max
from .common import CachedClass
from .score_contexts import ScoreContextBase


class RunContextBase(CachedClass, metaclass=ABCMeta):
    def __init__(
        self,
        run_id,
        scores_ids,
        raw_scores,
        judges_roles,
        acro_scores,
        inherited_data,
        status,
        tour_name,
        scoring_system_name,
    ) -> None:
        self.run_id = run_id
        self.scores_ids = scores_ids
        self.raw_scores = raw_scores
        self.judges_roles = judges_roles
        self.acro_scores = acro_scores
        self.inherited_data = inherited_data
        self.status = status
        self.tour_name = tour_name
        self.scoring_system_name = scoring_system_name

    @staticmethod
    def get_class(scoring_system_name) -> Type["RunContextBase"]:
        if scoring_system_name == "formation":
            return RunContextFormation
        if scoring_system_name == "formation_acro":
            return RunContextFormationAcro
        if scoring_system_name == "am_final_fw":
            return RunContextAmFinalFw
        if scoring_system_name == "am_final_acro":
            return RunContextAmFinalAcro
        if scoring_system_name == "am_qual":
            return RunContextAmQual
        if scoring_system_name == "acro":
            return RunContextAcro
        if scoring_system_name == "simplified":
            return RunContextSimplified
        return RunContextDance

    @classmethod
    def make(cls, **kwargs) -> "RunContextBase":
        return cls.get_class(kwargs["scoring_system_name"])(**kwargs)

    scoring_criterias: Tuple[str, ...]
    @abstractmethod
    def _scoring_criterias(self) -> Tuple[str, ...]:
        pass

    scores: List[ScoreContextBase]
    def _scores(self) -> List[ScoreContextBase]:
        return [
            ScoreContextBase.make(
                score_id=score_id,
                raw_data=raw_score,
                judge_role=jr,
                acro_scores=self.acro_scores,
                scoring_system_name=self.scoring_system_name
            )
            for score_id, raw_score, jr in zip(self.scores_ids, self.raw_scores, self.judges_roles)
        ]

    scores_by_role: Dict[str, List[ScoreContextBase]]
    def _scores_by_role(self) -> Dict[str, List[ScoreContextBase]]:
        return {
            role: [
                score
                for score, jr in zip(self.scores, self.judges_roles)
                if jr == role
            ]
            for role in ("dance_judge", "acro_judge", "tech_judge", "head_judge", )
        }

    card: str
    def _card(self) -> str:
        has_prev_cards = len(self.inherited_data.get("cards", [])) > 0
        all_current_cards = [
            score.counting_score["card"]
            for score in itertools.chain(self.scores_by_role["tech_judge"], self.scores_by_role["head_judge"])
        ]
        current_card = ("RC" if "RC" in all_current_cards else
                        "YC" if "YC" in all_current_cards else
                        "OK")
        return ("RC" if current_card == "RC" or (current_card == "YC" and has_prev_cards) else
                "YC" if current_card == "YC" else
                "OK")

    card_reasons: Dict[str, bool]
    def _card_reasons(self) -> Dict[str, bool]:
        result: Dict[str, bool] = {}
        for score in itertools.chain(
            self.scores_by_role["tech_judge"],
            self.scores_by_role["head_judge"],
        ):
            result.update({
                reason: value or result.get(reason, False)
                for reason, value in score.counting_score["card_reasons"].items()
            })
        return result

    penalty: frac
    def _penalty(self) -> frac:
        if self.card == "RC":
            return frac(-30)
        return frac(0)

    bonus: int
    def _bonus(self) -> int:
        result = 0
        for score in self.scores_by_role["head_judge"]:
            result += score.counting_score["bonus"]
        return result

    data_to_inherit: Dict[str, Any]
    def _data_to_inherit(self) -> Dict[str, Any]:
        if "cards" in self.inherited_data:
            current_cards = copy.copy(self.inherited_data["cards"])
        else:
            current_cards = []
        if self.card != "OK" and self.status == "OK":
            current_cards.append({
                "tour": self.tour_name,
                "card": self.card,
            })
        return {
            "cards": current_cards,
        }

    criterias_scores: Dict[str, frac]
    def _criterias_scores(self) -> Dict[str, frac]:
        criterias = set(self.scoring_criterias)
        scores_by_criteria: DefaultDict[List[str]] = defaultdict(list)
        for score in self.scores:
            for criteria_name, criteria_value in score.criterias.items():
                if criteria_name in criterias:
                    scores_by_criteria[criteria_name].append(criteria_value)
        return {
            key: get_scaled_median(values)
            for key, values in scores_by_criteria.items()
        }

    total_score: frac
    def _total_score(self) -> frac:
        result = frac(0)
        for score_value in self.criterias_scores.values():
            result += score_value
        result += self.penalty
        return result

    display_score: str
    def _display_score(self) -> str:
        return "{:.2f}".format(float(self.total_score))

    sorting_score: Tuple[Union[int, frac], ...]
    def _sorting_score(self) -> Tuple[Union[int, frac], ...]:
        if self.status != "OK":
            return (
                1,
                int(self.status == "DQ"),
                int(self.status == "NP"),
            )
        return (
            0,
            -self.total_score,
            -int(self.bonus),
        )


class RunContextSimplified(RunContextBase):
    def _scoring_criterias(self) -> Tuple[str, ...]:
        return (
            "points",
        )


class RunContextDance(RunContextBase):
    def _scoring_criterias(self) -> Tuple[str, ...]:
        return (
            "fw_man",
            "fw_woman",
            "dance_figs",
            "composition",
            "mistakes",
        )


class RunContextAcroBase(RunContextBase):
    elements_count: int
    @abstractmethod
    def _elements_count(self) -> int:
        pass

    mistakes: frac
    def _mistakes(self) -> frac:
        return safe_max(
            s.counting_score["mistakes"]
            for s in self.scores_by_role["tech_judge"]
        )

    def _total_score(self) -> frac:
        return super()._total_score() - frac(30 * self.mistakes)

    def _scoring_criterias(self) -> Tuple[str, ...]:
        return (
            "fw_man",
            "fw_woman",
            "dance_figs",
            "composition",
            "mistakes",
            *[f"a{x}" for x in range(1, self.elements_count + 1)],
        )


class RunContextAcro(RunContextAcroBase):
    def _elements_count(self) -> int:
        return 5


class RunContextAmQual(RunContextAcro):
    total_score: frac
    def _total_score(self) -> frac:
        result = frac(0)
        for criteria, score_value in self.criterias_scores.items():
            if criteria in ("fw_woman", "fw_man", "dance_figs", "composition", ):
                score_value *= frac(10, 13)
            result += score_value
        result += self.penalty
        return result


class RunContextAmFinalFw(RunContextDance):
    def _data_to_inherit(self) -> Dict[str, Any]:
        result = super()._data_to_inherit()
        result.update({
            "fw_score": [self.total_score.numerator, self.total_score.denominator]
        })
        return result


class RunContextAmFinalAcro(RunContextAcroBase):
    def _elements_count(self) -> int:
        return 6

    def _total_score(self) -> frac:
        return self.fw_total_score + self.acro_total_score

    fw_total_score: frac
    def _fw_total_score(self) -> frac:
        return frac(*self.inherited_data.get("fw_score", [0, 1]))

    acro_total_score: frac
    def _acro_total_score(self) -> frac:
        result = frac(0)
        for score_value in self.criterias_scores.values():
            result += score_value
        result += self.penalty
        return result

    def _sorting_score(self) -> Tuple[Union[int, frac], ...]:
        if self.status != "OK":
            return (
                1,
                int(self.status == "DQ"),
                int(self.status == "NP"),
            )
        return (
            0,
            -self.total_score,
            -self.acro_total_score,
            -int(self.bonus),
        )


class RunContextFormation(RunContextBase):
    undercount: frac
    def _undercount(self) -> frac:
        return safe_max(
            s.counting_score["undercount"]
            for s in self.scores_by_role["tech_judge"]
        )

    def _total_score(self) -> frac:
        return super()._total_score() - self.undercount

    def _scoring_criterias(self) -> Tuple[str, ...]:
        return (
            "fw",
            "dance_figs",
            "composition",
            "figures",
            "mistakes",
        )


class RunContextFormationAcro(RunContextFormation):
    def _scoring_criterias(self) -> Tuple[str, ...]:
        return (
            "fw",
            "dance_figs",
            "composition",
            "figures",
            "mistakes",
            *[f"a{x}" for x in range(1, 9)],
        )
