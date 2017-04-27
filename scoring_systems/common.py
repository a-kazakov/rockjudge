class SkatingSystem:
    def __init__(self, scores):
        self.scores_by_runs = scores
        self.compute()

    @property
    def scores_by_judges(self):
        if not hasattr(self, "_scores_by_judges"):
            self._scores_by_judges = list(zip(*self.scores_by_runs))
        return self._scores_by_judges

    @property
    def places_by_judges(self):
        if not hasattr(self, "_places_by_judges"):
            self._places_by_judges = []
            for judge_scores in self.scores_by_judges:
                idx_score_sorted_pairs = sorted(enumerate(judge_scores), key=lambda x: -x[1])
                idx_place_pairs = []
                latest_score = None
                latest_place = 1
                for place, (idx, score) in enumerate(idx_score_sorted_pairs, start=1):
                    if score != latest_score:
                        latest_place = place
                    latest_score = score
                    idx_place_pairs.append((idx, latest_place, ))
                self._places_by_judges.append([p[1] for p in sorted(idx_place_pairs)])
        return self._places_by_judges

    @property
    def places_by_runs(self):
        if not hasattr(self, "_places_by_runs"):
            if len(self.places_by_judges) > 0:
                self._places_by_runs = list(zip(*self.places_by_judges))
            else:
                self._places_by_runs = self.scores_by_runs
        return self._places_by_runs

    def compute_skating_table_row(self, places):
        n_places = len(self.scores_by_runs)
        places_count = [0 for _ in range(n_places)]
        for place in places:
            places_count[place - 1] += 1
        result = []
        for idx in range(0, len(places_count)):
            latest = result[idx - 1] if idx > 0 else (0, 0)
            result.append((
                latest[0] + places_count[idx],
                latest[1] + (idx + 1) * places_count[idx],
            ))
        return result

    def sort_equal_scores(self, start_from, candidates, place_offset):
        if len(candidates) == 1:
            return [(place_offset, next(iter(candidates)))]
        runs_sorting_scores = sorted([
            (sum(map(lambda p: (-p[0], p[1]),
                self.skating_table[run_idx][start_from:]), ()), run_idx)
            for run_idx in candidates
        ])
        result = []
        latest_score = None
        current_place = 0
        for place, (sorting_score, run_idx) in enumerate(runs_sorting_scores, start=place_offset):
            if latest_score is None or sorting_score != latest_score:
                current_place = place
            latest_score = sorting_score
            result.append((current_place, run_idx, ))
        return result

    def compute(self):
        n_runs = len(self.scores_by_runs)
        n_judges = len(self.scores_by_judges)
        quorum = n_judges // 2 + 1
        self.skating_table = [self.compute_skating_table_row(row) for row in self.places_by_runs]
        runs_left = set(range(n_runs))
        self.places = [0 for _ in range(n_runs)]
        for place in range(n_runs):
            candidates = set()
            for run_idx in runs_left:
                skating_item = self.skating_table[run_idx][place]
                if skating_item[0] >= quorum:
                    candidates.add(run_idx)
            if len(candidates) == 0:
                continue
            for place, run_idx in self.sort_equal_scores(place, candidates, n_runs - len(runs_left) + 1):
                self.places[run_idx] = place
                runs_left.discard(run_idx)


def test(data, result):
    ss = SkatingSystem(data)
    if ss.places != result:
        print("FAIL", ss.places, result)
    else:
        print("OK")
    return ss
