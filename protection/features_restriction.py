from exceptions import ApiError

DEMO_VERSION = False

RUNS_COUNT_RESTRICTION = 15


def check_permissions(action, params):
    if not DEMO_VERSION:
        return
    if action == "tour.start":
        if params["tour"].get_attr_count("runs") > RUNS_COUNT_RESTRICTION:
            raise ApiError("errors.demo_version.runs", RUNS_COUNT_RESTRICTION)
