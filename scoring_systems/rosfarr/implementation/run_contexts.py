import copy
import itertools
from fractions import Fraction as frac

from .common import CachedClass
from .score_contexts import ScoreContextBase

def small_avg(scores):
    if len(scores) == 0:
        return frac(0)
    scores_sum = sum(scores)
    if len(scores) <= 2:
        return frac(scores_sum, 2)
    sorted_scores = sorted(scores)
    min_max = sorted_scores[0] + sorted_scores[-1]
    divident = 2 * scores_sum - min_max
    divisor = 2 * len(scores) - 2
    return frac(divident, divisor)


def big_avg(scores):
    if len(scores) == 0:
        return frac(0)
    scores_sum = sum(scores)
    sorted_scores = sorted(scores)
    min_max = sorted_scores[0] + sorted_scores[-1]
    divident = scores_sum - min_max
    divisor = len(scores) - 2
    return frac(divident, divisor)


def true_avg(scores):
    if len(scores) == 0:
        return frac(0)
    scores_sum = sum(scores)
    sorted_scores = sorted(scores)
    return frac(scores_sum, len(scores))


class RunContextBase(CachedClass):
    def __init__(self, run_id, scores_ids, raw_scores, judges_roles, acro_scores, inherited_data, status, tour_name, scoring_system_name):
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
    def get_class(scoring_system_name):
        if scoring_system_name in ("formation", "formation_acro", ):
            return RunContextFormation
        if scoring_system_name == "am_final_fw":
            return RunContextNjsFirstProgram
        if scoring_system_name == "am_final_acro":
            return RunContextNjsSecondProgram
        if scoring_system_name in ("acro", "am_qual", ):
            return RunContextNjsAcro
        return RunContextNjs

    @classmethod
    def make(cls, **kwargs):
        return cls.get_class(kwargs["scoring_system_name"])(**kwargs)

    def _scores(self):
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

    def _scores_by_role(self):
        return {
            role: [
                score
                for score, jr in zip(self.scores, self.judges_roles)
                if jr == role
            ]
            for role in ("dance_judge", "acro_judge", "tech_judge", "head_judge", )
        }

    def _card(self):
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

    def _nexttour_mark(self):
        for score in self.scores_by_role["head_judge"]:
            if score.counting_score["nexttour"]:
                return True
        return False

    def _data_to_inherit(self):
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


class RunContextNjs(RunContextBase):
    def _penalty(self):
        if self.card == "RC":
            return frac(-30)
        return frac(0)

    def _dance_totals(self):
        return [s.total_score for s in self.scores_by_role["dance_judge"]]

    def _acro_totals(self):
        return [s.total_score for s in self.scores_by_role["acro_judge"]]

    def _first_score(self):
        if len(self.dance_totals) < 5:
            return (
                small_avg(self.dance_totals) +
                self.penalty
            )
        return (
            big_avg(self.dance_totals) +
            self.penalty
        )

    def _second_score(self):
        return (
            true_avg(self.dance_totals) +
            self.penalty
        )

    def _sorting_score(self):
        if self.status != "OK":
            return (
                1,
                self.status == "DQ",
                self.status == "NP",
            )
        return (
            0,
            -self.first_score,
            -self.second_score,
            -int(self.nexttour_mark),
        )

    def _display_score(self):
        return "{:.2f} / {:.2f}".format(float(self.first_score), float(self.second_score))


class RunContextNjsAcro(RunContextNjs):
    def _first_score(self):
        return (
            small_avg(self.dance_totals) +
            small_avg(self.acro_totals) +
            self.penalty
        )

    def _second_score(self):
        return (
            true_avg(self.dance_totals) +
            true_avg(self.acro_totals) +
            self.penalty
        )


class RunContextNjsFirstProgram(RunContextNjs):
    def _first_score(self):
        if len(self.dance_totals) + len(self.acro_totals) < 5:
            return (
                small_avg(self.dance_totals + self.acro_totals) +
                self.penalty
            )
        return (
            big_avg(self.dance_totals + self.acro_totals) +
            self.penalty
        )

    def _second_score(self):
        return (
            true_avg(self.dance_totals + self.acro_totals) +
            self.penalty
        )

    def _data_to_inherit(self):
        result = super()._data_to_inherit()
        result.update({
            "total_score": {
                "first_score": [self.first_score.numerator, self.first_score.denominator],
                "second_score": [self.second_score.numerator, self.second_score.denominator],
            },
        })
        return result


class RunContextNjsSecondProgram(RunContextNjsAcro):
    def _cur_first_score(self):
        return super()._first_score()

    def _cur_second_score(self):
        return super()._second_score()

    def _prev_first_score(self):
        return frac(*self.inherited_data.get("total_score", [0, 1])["first_score"])

    def _prev_second_score(self):
        return frac(*self.inherited_data.get("total_score", [0, 1])["second_score"])

    def _first_score(self):
        return self.cur_first_score + self.prev_first_score

    def _second_score(self):
        return self.cur_second_score + self.prev_second_score

    def _sorting_score(self):
        if self.status != "OK":
            return (
                1,
                self.status == "DQ",
                self.status == "NP",
            )
        return (
            0,
            -self.first_score,
            -self.second_score,
            -self.cur_first_score,
            -self.cur_second_score,
            -int(self.nexttour_mark),
        )


class RunContextFormation(RunContextBase):
    def _penalty(self):
        if self.card == "RC":
            return frac(-15)
        return frac(0)

    def _dance_totals(self):
        return [s.total_score for s in self.scores_by_role["dance_judge"]]
