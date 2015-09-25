from .models import (
    Judge,
    Round
)
from .serializers import make_run_data_for_tablet

def get_tablet_state(judge):
    round = Round.get_active()
    if round is None:
        return {
            "status": "HOLD",
        }
    else:
        runs = round.get_current_heat_runs()
        return {
            "status": "ACTIVE",
            "runs": [
                make_run_data_for_tablet(run, judge)
                for run in runs
            ],
        }
