from collections import deque

from participants.models import Acrobatic
from tournaments.models import (
    Competition,
    InnerCompetition,
    Judge,
    Run,
    Score,
    Tour,
)

class ApiImpl:
    @staticmethod
    def judge_get(judge_id):
        pass


class IdTransformer:
    TRANSFORMATIONS = {
        "score_id": {
            "judge_id": lambda score_id: Score.get(Score.id == score_id).judge_id,
            "run_id": lambda score_id: Score.get(Score.id == score_id).run_id,
        },
        "judge_id": {
            "competition_id": lambda judge_id: Judge.get(Judge.id == judge_id).competition_id,
        },
        "run_id": {
            "tour_id": lambda run_id: Run.get(Run.id == run_id).tour_id,
            "participant_id": lambda run_id: Run.get(Run.id == run_id).participant_id,
        },
        "tour_id": {
            "inner_competition_id": lambda tour_id: Tour.get(Tour.id == tour_id).inner_competition_id,
        },
        "inner_competition_id": {
            "competition_id": lambda inner_competition_id: \
                InnerCompetition.get(InnerCompetition.id == inner_competition_id).competition_id,
        },
        "acrobatic_id": {
            "participant_id": lambda acrobatic_id: Acrobatic.get(Acrobatic.id == acrobatic_id).participant_id,
        },
        "participant_id": {},
        "competition_id": {},
    }

    @classmethod
    def path(cls, src, dest):
        visited = {src}
        prev = {}
        q = deque([src])
        result = []
        while len(q) > 0:
            node = q.popleft()
            if node == dest:
                while node != src:
                    result.append(node)
                    node = prev[node]
                return reversed(result)
            for next_node in cls.TRANSFORMATIONS[node]:
                if next_node not in visited:
                    visited.add(next_node)
                    prev[next_node] = node
                    q.append(next_node)
        return None

    @classmethod
    def execute(cls, request, wanted_id_type):
        for current_id_type in [k for k in request.keys() if k.endswith("_id")]:
            id_value = request[current_id_type]
            path = cls.path(current_id_type, wanted_id_type)
            if path is None:
                continue
            for id_type in path:
                id_value = cls.TRANSFORMATIONS[current_id_type][id_type](id_value)
                current_id_type = id_type
            return id_value
        raise RuntimeError("Unable to get {} from request".format(wanted_id_type))


class Api:
    @staticmethod
    def get_model(model_type, id_name, request):
        model_id = IdTransformer.execute(request, id_name)
        model = model_type.get(model_type.id == model_id)
        return model

    @staticmethod
    def setialize_all(result):
        return [
            model.serialize()
            for model in result
        ]

    # Single models getters

    @classmethod
    def judge_get(cls, request):
        return cls.get_model(Judge, "judge_id", request).serialize(recursive=request["recursive"])

    @classmethod
    def score_get(cls, request):
        return cls.get_model(Score, "score_id", request).serialize(recursive=request["recursive"])

    @classmethod
    def run_get(cls, request):
        return cls.get_model(Run, "run_id", request).serialize(recursive=request["recursive"])

    @classmethod
    def tour_get(cls, request):
        return cls.get_model(Tour, "tour_id", request).serialize(recursive=request["recursive"])

    @classmethod
    def competition_get(cls, request):
        return cls.get_model(Competition, "competition_id", request).serialize(recursive=request["recursive"])

    # Children getters

    @classmethod
    def competition_all_inners(cls, request):
        model = cls.get_model(Competition, "competition_id", request)
        return cls.serialize_all(model.inners)

    @classmethod
    def inner_all_tours(cls, request):
        model = cls.get_model(InnerCompetition, "inner_competition_id", request)
        return cls.serialize_all(model.tours)

    @classmethod
    def tour_all_runs(cls, request):
        model = cls.get_model(Tour, "tour_id", request)
        return cls.serialize_all(model.runs)

    @classmethod
    def competition_all_judges(cls, request):
        model = cls.get_model(Competition, "competition_id", request)
        return cls.serialize_all(model.runs)

    # Setters

    @classmethod
    def judge_set(cls, request):
        cls.get_model(Judge, "judge_id", request).update_data(request["data"])
        return {}

    @classmethod
    def score_set(cls, request):
        cls.get_model(Score, "score_id", request).update_data(request["data"])
        return {}

    @classmethod
    def run_set(cls, request):
        cls.get_model(Run, "run_id", request).update_data(request["data"])
        return {}

    @classmethod
    def tour_set(cls, request):
        cls.get_model(Tour, "tour_id", request).update_data(request["data"])
        return {}

    @classmethod
    def competition_set(cls, request):
        cls.get_model(Competition, "competition_id", request).update_data(request["data"])
        return {}

    # Custom actions

    @classmethod
    def acrobatic_override_set(cls, request):
        run = cls.get_model(Run, "run_id", request)
        acrobatic = cls.get_model(Acrobatic, "acrobatic_id", request)
        run.set_acrobatic_override(acrobatic, request["score"])
        return {}

    @classmethod
    def tour_find_active(cls, request):
        tour = Tour.get_active()
        return {
            "tour_id": None if tour is None else tour.id,
        }

    @classmethod
    def tour_start(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.start()
        return {}

    @classmethod
    def tour_stop(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.stop()
        return {}

    @classmethod
    def tour_init(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.init()
        return {}

    @classmethod
    def tour_finalize(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.finalize()
        return {}

    @classmethod
    def tour_shuffle_heats(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.shuffle_heats()
        return {}

    @classmethod
    def tour_get_results(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        return tour.get_serialized_results()

    # Service

    @classmethod
    def call(cls, method, request):
        parts = method.split(".")
        if len(parts) != 2:
            return {
                "success": False,
                "message": "Invalid method name: {}".format(method),
            }
        internal_name = "_".join(parts)
#        try:
        return {
            "success": True,
            "response": getattr(cls, internal_name)(request)
        }
        # except AttributeError:
        #     return {
        #         "success": False,
        #         "message": "Unknown method name: {}".format(method),
        #     }
