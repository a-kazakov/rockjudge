import importlib


def get_scoring_system(tour):
    return importlib.import_module("scoring_systems." + tour.scoring_system_name)
