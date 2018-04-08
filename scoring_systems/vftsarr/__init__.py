from scoring_systems.vftsarr.am_final_acro import AmFinalAcroEndpoints
from scoring_systems.vftsarr.endpoints import Endpoints


META = {
    "name": "ФТСАРР",
    "scoring_systems": [
        "am_final_acro",
        "am_final_fw",
        "am_qual",
        "formation",
        "formation_acro",
        "formation_simplified",
        "acro",
        "acro_extended",
        "dance_extended",
        "dance",
        "dance_rough",
        "simplified",
        "solo",
        "solo_rough",
    ],
    "supported_languages": [
        "ru",
    ],
    "judges_roles": [
        "head_judge",
        "dance_judge",
        "acro_judge",
        "tech_judge",
    ]
}

SCORING_SYSTEMS = {
    "am_final_acro": AmFinalAcroEndpoints("am_final_acro"),
    "am_final_fw": Endpoints("am_final_fw"),
    "am_qual": Endpoints("am_qual"),
    "formation": Endpoints("formation"),
    "formation_acro": Endpoints("formation_acro"),
    "formation_simplified": Endpoints("formation_simplified"),
    "acro": Endpoints("acro"),
    "acro_extended": Endpoints("acro_extended"),
    "dance_extended": Endpoints("dance_extended"),
    "dance": Endpoints("dance"),
    "dance_rough": Endpoints("dance_rough"),
    "simplified": Endpoints("simplified"),
    "solo": Endpoints("solo"),
    "solo_rough": Endpoints("solo_rough"),
}
