import importlib
from typing import List, Tuple


RULES_SETS = [
    "vftsarr",
    "rosfarr",
    # "skating",
]

MODULES = {}

for rules_set in RULES_SETS:
    MODULES[rules_set] = importlib.import_module("scoring_systems." + rules_set)
    print("Imported module {}".format(rules_set))


def get_scoring_system(tour):
    rules_set, scoring_system = tour.scoring_system_name.split(".")
    return MODULES[rules_set].SCORING_SYSTEMS[scoring_system]


def get_rules_sets_names() -> List[Tuple[str, str]]:
    return [
        (rules_set, MODULES[rules_set].META["name"], )
        for rules_set
        in RULES_SETS
    ]
