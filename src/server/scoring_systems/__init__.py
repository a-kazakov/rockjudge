from typing import List, Tuple, Type, Dict

from scoring_systems.base import BaseScoringSystem
from scoring_systems.skating import SkatingScoringSystem
from scoring_systems.vftsarr import VftsarrScoringSystem


def get_all_rules_sets() -> List[Type[BaseScoringSystem]]:
    return [VftsarrScoringSystem, SkatingScoringSystem]


RULES_SETS: Dict[str, Type[BaseScoringSystem]] = {
    rs.get_rules_set_metadata().code: rs for rs in get_all_rules_sets()
}


def check_scoring_system(
    full_scoring_system_name: str, expected_rules_set_name: str
) -> bool:
    provided_rules_set_name, short_scoring_system_name = full_scoring_system_name.split(
        "."
    )
    if expected_rules_set_name != provided_rules_set_name:
        return False
    rules_set_meta = RULES_SETS[expected_rules_set_name].get_rules_set_metadata()
    if short_scoring_system_name not in rules_set_meta.scoring_systems:
        return False
    return True


def get_scoring_system(full_scoring_system_name: str) -> BaseScoringSystem:
    rules_set, scoring_system_name = full_scoring_system_name.split(".")
    result = RULES_SETS[rules_set]()
    result.init(scoring_system_name)
    return result


def get_rules_sets_names() -> List[Tuple[str, str]]:
    return [(name, rs.get_rules_set_metadata().name) for name, rs in RULES_SETS.items()]
