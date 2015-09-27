def make_tour_results(tour):
    from scoring_systems.rosfarr_no_acro import serializers
    return serializers.serialize_finalized_tour(tour)

def make_tour_data(tour):
    from scoring_systems.rosfarr_no_acro import serializers
    return serializers.serialize_tour(tour)

def make_run_data_for_tablet(run, judge):
    from scoring_systems.rosfarr_no_acro import serializers
    result = run.serialize()
    result["score"] = result["scores"][str(judge.id)]
    del result["scores"]
    return result