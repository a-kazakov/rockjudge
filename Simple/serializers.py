def make_tour_results(tour):
    from scoring_systems.rosfarr_no_acro import serializers
    return serializers.serialize_finalized_tour(tour)

def make_tour_data(tour):
    from scoring_systems.rosfarr_no_acro import serializers
    return serializers.serialize_tour(tour)

def make_run_data_for_tablet(run, judge):
    from scoring_systems.rosfarr_no_acro import serializers
    return {
        "participant": run.participant.name,
        "score": serializers.serialize_judge_score(run, judge),
        "id": run.id,
    }
