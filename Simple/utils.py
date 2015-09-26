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
        }
    else:
        runs = tour.get_current_heat_runs()
        return {
            "status": "ACTIVE",
            "runs": [
                make_run_data_for_tablet(run, judge)
                for run in runs
            ],
        }
