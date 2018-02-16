from scoring_systems.skating import qualification_simple


META = {
    "name": "Скейтинг система",
    "scoring_systems": [
        "qualification_simple",
    ],
    "supported_languages": [
        "ru",
    ],
    "judges_roles": [
        "head_judge",
        "dance_judge",
    ],
}

SCORING_SYSTEMS = {
    "qualification_simple": qualification_simple,
}
