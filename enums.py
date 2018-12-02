from enum import Enum


class AccessLevel(Enum):
    NONE = "none"
    ADMIN = "admin"
    PRESENTER = "presenter"
    JUDGE = "judge"
    ANY_JUDGE = "any_judge"


class RunStatus(Enum):
    OK = "OK"
    NP = "NP"
    DQ = "DQ"