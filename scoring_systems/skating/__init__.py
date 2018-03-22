from scoring_systems.skating.endpoints import Endpoints


META = {
    "name": "Скейтинг система",
    "scoring_systems": [
        "qualification_simple",
        "final_simple",
        "final_summary",
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
    "qualification_simple": Endpoints("qualification_simple"),
    "final_simple": Endpoints("final_simple"),
    "final_summary": Endpoints("final_summary"),
}
