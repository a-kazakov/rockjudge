from fractions import Fraction
from typing import Any, Dict, Union, NewType


AcroScore = NewType("AcroScore", float)
JudgeId = NewType("JudgeId", int)
JudgeRole = NewType("JudgeRole", str)
RunId = NewType("RunId", int)
RunInfo = NewType("RunInfo", Any)
RunStatus = NewType("RunStatus", str)
ScoreId = NewType("ScoreId", int)
ScoreRawData = NewType("ScoreRawData", Dict[str, Any])
ScoringSystemName = NewType("ScoringSystemName", str)
TotalScoreType = NewType("TotalScoreType", Union[float, str, int, Fraction])
TourName = NewType("TourName", str)
