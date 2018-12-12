from exceptions import ApiError


DEMO_VERSION = False

RUNS_COUNT_RESTRICTION = 15


def check_permissions(action, params):
    from models.run import Run

    if not DEMO_VERSION:
        return
    if action == "tour.start":
        tour = params["tour"]
        if (
            tour.session.query(Run).filter_by(tour=tour).count()
            > RUNS_COUNT_RESTRICTION
        ):
            raise ApiError("errors.demo_version.runs", RUNS_COUNT_RESTRICTION)
