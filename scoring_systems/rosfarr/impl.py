from fractions import Fraction as frac

from exceptions import ApiError


def apply_deduction(base_score, deduction):
    return base_score * (100 - deduction) // 100


def m100(score):
    return round(100 * score)


class FormationScore:
    def __init__(self, score):
        self.score = score
        raw_data = score.get_data()
        self.data = {
            "dance_tech":       raw_data.pop("dance_tech",      0),
            "dance_figs":       raw_data.pop("dance_figs",      0),
            "impression":       raw_data.pop("impression",      0),
            "small_mistakes":   raw_data.pop("small_mistakes",  0),
            "big_mistakes":     raw_data.pop("big_mistakes",    0),
        }

    @property
    def total_score(self):
        return sum([
            m100(self.data["dance_tech"]),
            m100(self.data["dance_figs"]),
            m100(self.data["impression"]),
             -5 * m100(self.data["small_mistakes"]),  # NOQA
            -30 * m100(self.data["big_mistakes"]),
        ])

    def update(self, new_data):
        self.data = {
            "dance_tech":       float(new_data.pop("dance_tech",      self.data["dance_tech"])),
            "dance_figs":       float(new_data.pop("dance_figs",      self.data["dance_figs"])),
            "impression":       float(new_data.pop("impression",      self.data["impression"])),
            "small_mistakes":     int(new_data.pop("small_mistakes",  self.data["small_mistakes"])),
            "big_mistakes":       int(new_data.pop("big_mistakes",    self.data["big_mistakes"])),
        }
        self.score.set_data(self.data)

    def serialize(self):
        return {
            "total_score": self.total_score / 100,
            "raw_data": self.data,
        }


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
        return sum([
            apply_deduction(m100(10), self.data["fw_man"]),
            apply_deduction(m100(10), self.data["fw_woman"]),
            m100(self.data["dance_figs"]),
            m100(self.data["composition"]),
             -5 * m100(self.data["small_mistakes"]),  # NOQA
            -30 * m100(self.data["big_mistakes"]),
        ])

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
        num_acros = len(score.run.participant.acrobatics)
        self.data = {
            "deductions": raw_data.pop("deductions", [100] * num_acros),
            "mistakes": raw_data.pop("mistakes", 0),
        }

    @property
    def total_score(self):
        result = 0
        acro_data = enumerate(zip(self.score.run.acrobatics, self.data["deductions"]))
        for acro_idx, (acro, deduction) in acro_data:
            override = self.score.run.get_acrobatic_override(acro_idx)
            base_score = override.score if override is not None else acro["score"]
            result += apply_deduction(m100(base_score), deduction)
        result -= 30 * m100(self.data["mistakes"])
        return result

    def update(self, new_data):
        self.data.update({
            "mistakes": int(new_data.pop("mistakes", self.data["mistakes"])),
        })
        if "deductions" in new_data:
            for idx, deduction in enumerate(new_data["deductions"]):
                if deduction is not None and idx < len(self.data["deductions"]):
                    self.data["deductions"][idx] = int(deduction)
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


def ScoreWrapper(score, scoring_system, discipline_judge=None):
    if discipline_judge is None:
        discipline_judge = score.discipline_judge
    role = discipline_judge.role
    if role == "head_judge":
        return HeadScore(score)
    if role == "tech_judge":
        return TechScore(score)
    if role in ["acro_judge", "dance_judge"]:
        if scoring_system == "rosfarr.no_acro":
            return DanceScore(score)
        if scoring_system == "rosfarr.acro":
            return DanceScore(score) if role == "dance_judge" else AcroScore(score)
        if scoring_system == "rosfarr.formation":
            return FormationScore(score)
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
        if scoring_system == "rosfarr.acro":
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
            elif discipline_judge.role == "acro_judge" and self.scoring_system != "rosfarr.acro":
                yield discipline_judge, score

    @property
    def acro_judge_scores(self):
        for discipline_judge, score in self.judge_scores:
            if discipline_judge.role == "acro_judge" and self.scoring_system == "rosfarr.acro":
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

    @property
    def sorting_score(self):
        if self.scoring_system == "rosfarr.acro":
            return (
                -(self.dance_scores.primary_score + self.acro_scores.primary_score + self.penalties),
                -(self.dance_scores.secondary_score + self.acro_scores.secondary_score + self.penalties),
                self.nexttour_score,
            )
        else:
            return (
                -(self.dance_scores.primary_score + self.penalties),
                -(self.dance_scores.secondary_score + self.penalties),
                self.nexttour_score,
            )

    @property
    def display_score(self):
        return "{:.2f} / {:.2f}".format(-self.sorting_score[0] / 100.0, -self.sorting_score[1] / 100.0)

    def serialize(self):
        scores = {}
        for discipline_judge, score in self.judge_scores:
            scores[str(discipline_judge.id)] = score.serialize(discipline_judge=discipline_judge)
        return {
            "total_run_score": self.display_score,
            "scores": scores
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
                "scores": run_score.serialize(),
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
                "advances": num_advances >= place,
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
            "scores": row["scores"]
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

    def serialize(self):
        scores = {}
        p_idx = 0
        for discipline_judge, score in self.judge_scores:
            scores[str(discipline_judge.id)] = score.serialize(discipline_judge=discipline_judge)
            if discipline_judge.role == "dance_judge":
                scores[str(discipline_judge.id)]["data"]["place"] = \
                    self.places[p_idx] if self.places is not None else None
                p_idx += 1
        return {
            "scores": scores,
            "total_run_score": self.display_score,
        }

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
        self.sorting_score = (
            place,
            -self.places_counts[place],
            sum([p for p in self.places if p <= place]),
            self.nexttour_score,
        )

    @property
    def display_score(self):
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
            yield from to_yield
            yielded += len(to_yield)
            for row in to_yield:
                del rows_left[row["run_score"].run.id]

    @staticmethod
    def scores_to_places(scores):
        tmp = zip(scores, range(len(scores)))
        tmp = sorted(tmp, key=lambda y: -y[0])
        place = 1
        lates_score = None
        for idx in range(len(tmp)):
            if idx > 0 and lates_score != tmp[idx][0]:
                place = idx + 1
            lates_score = tmp[idx][0]
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
            run_score.dance_judges_total_scores
            for run_score in self.run_scores
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
            "scores": row["scores"]
        } for row in self.table()]
