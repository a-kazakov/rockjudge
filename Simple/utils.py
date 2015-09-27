from .models import (
    Judge,
    Tour
)
from .serializers import make_run_data_for_tablet

def get_tablet_state(judge):
    tour = Tour.get_active()
    if tour is None:
        return {
            "status": "HOLD",
            "judge": judge.serialize(),
        }
    else:
        runs = tour.get_current_heat_runs()
        return {
            "status": "ACTIVE",
            "judge": judge.serialize(),
            "runs": [run.serialize() for run in runs],
        }
