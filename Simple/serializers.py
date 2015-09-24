def make_round_results(round):
    table = sorted([
        (run.total_score, run.participant)
        for run in round.runs
    ], key=lambda x: -x[0])
    result = [{
        "participant": x[1].serialize(),
        "total_score": x[0],
    } for x in table]
    advances = round.next_round.num_participants if round.next_round else 0
    for p in range(len(result)):
        result[p]["place"] = p + 1
        result[p]["advances"] = p < advances
    return result


def make_round_data(round):
    return {
        "judges": [
            {
                "name": judge.name,
                "id": judge.id,
            } for judge in round.judges
        ],
        "scores": [
            {
                "participant": run.participant.name,
                "scores": [js.score for js in run.scores],
                "run_id": run.id,
            } for run in round.runs
        ]
    }
