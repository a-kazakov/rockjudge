from typing import List, Tuple, Type

from scoring_systems.base import BaseScoringSystem
from scoring_systems.skating import SkatingScoringSystem
from scoring_systems.vftsarr import VftsarrScoringSystem


def get_all_rules_sets() -> List[Type[BaseScoringSystem]]:
    return [
        VftsarrScoringSystem,
        SkatingScoringSystem,
    ]


RULES_SETS = {
    rs.get_rules_set_metadata().code: rs
    for rs in get_all_rules_sets()
}


def get_scoring_system(full_scoring_system_name):
    rules_set, scoring_system_name = full_scoring_system_name.split(".")
    result = RULES_SETS[rules_set]()
    result.init(scoring_system_name)
    return result


def get_rules_sets_names() -> List[Tuple[str, str]]:
    return [
        (name, rs.get_rules_set_metadata().name)
        for name, rs
        in RULES_SETS.items()
    ]
