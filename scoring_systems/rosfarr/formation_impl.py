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


class RunScore:
    def __init__(self, run, discipline_judges=None):
        discipline_judges = run.tour.discipline_judges if discipline_judges is None else discipline_judges
        self.n_judges = len(None for j in discipline_judges if j.role == "dance_judge")
        self.scores = run.scores

    def serialize(self):
        scores = {}
        for discipline_judge, score in self.judge_scores:
            scores[str(discipline_judge.id)] = score.serialize(discipline_judge=discipline_judge)
        return {
            "scores": scores
        }

    def populate_with_skating(self, skating):
        self.skating = skating

    @property
    def penalties(self):
        if self.head_judge_score is None:
            return 0
        penalty = self.head_judge_total_score
        return penalty

    @property
    def sorting_score(self):
        kv = len(self.skating)
        for idx, n_judges in enumerate(self.skating, start=1):
            if n_judges > self.n_judges // 2:
                kv = idx
                break
        return (kv, sum(self.skating))

    @property
    def display_score(self):
        return "-"


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
