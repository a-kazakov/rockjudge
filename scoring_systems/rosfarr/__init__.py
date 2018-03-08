from scoring_systems.rosfarr import am_final_acro
from scoring_systems.rosfarr import am_final_fw
from scoring_systems.rosfarr import am_qual
from scoring_systems.rosfarr import formation
from scoring_systems.rosfarr import formation_acro
from scoring_systems.rosfarr import acro
from scoring_systems.rosfarr import no_acro
from scoring_systems.rosfarr import simplified
from scoring_systems.rosfarr import solo


META = {
    "name": "РосФАРР (до 2017, устаревшая)",
    "scoring_systems": [
        "am_final_acro",
        "am_final_fw",
        "am_qual",
        "formation",
        "formation_acro",
        "acro",
        "no_acro",
        "simplified",
        "solo",
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
    "am_final_acro": am_final_acro,
    "am_final_fw": am_final_fw,
    "am_qual": am_qual,
    "formation": formation,
    "formation_acro": formation_acro,
    "acro": acro,
    "no_acro": no_acro,
    "simplified": simplified,
    "solo": solo,
}
