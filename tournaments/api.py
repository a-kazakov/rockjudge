from collections import deque

from participants.models import (
    Acrobatic,
    Participant,
)
from tournaments.models import (
    Competition,
    InnerCompetition,
    Judge,
    Run,
    Score,
    Tour,
)


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
        return model_type.get(model_type.id == model_id)

    # Single models getters

    @classmethod
    def judge_get(cls, request, ws_message):
        judge = cls.get_model(Judge, "judge_id", request)
        return judge.serialize(children=request["children"])

    @classmethod
    def tour_get(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.full_prefetch()
        return tour.serialize(children=request["children"])

    @classmethod
    def competition_get(cls, request, ws_message):
        competition = cls.get_model(Competition, "competition_id", request)
        competition.full_prefetch()
        return competition.serialize(children=request["children"])

    @classmethod
    def inner_competition_get(cls, request, ws_message):
        inner_competition = cls.get_model(InnerCompetition, "inner_competition_id", request)
        inner_competition.full_prefetch()
        return inner_competition.serialize(children=request["children"])

    # Setters

    @classmethod
    def judge_set(cls, request, ws_message):
        model = cls.get_model(Judge, "judge_id", request)
        model.update_data(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def score_set(cls, request, ws_message):
        model = cls.get_model(Score, "score_id", request)
        model.update_data(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def run_set(cls, request, ws_message):
        model = cls.get_model(Run, "run_id", request)
        model.update_data(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def tour_set(cls, request, ws_message):
        model = cls.get_model(Tour, "tour_id", request)
        model.update_data(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def inner_competition_set(cls, request, ws_message):
        model = cls.get_model(InnerCompetition, "inner_competition_id", request)
        model.update_data(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def competition_set(cls, request, ws_message):
        model = cls.get_model(Competition, "competition_id", request)
        model.update_data(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def participant_set(cls, request, ws_message):
        model = cls.get_model(Participant, "participant_id", request)
        model.update_data(request["data"], ws_message=ws_message)
        return {}

    # Creaters

    @classmethod
    def inner_competition_create(cls, request, ws_message):
        competition = cls.get_model(Competition, "competition_id", request)
        InnerCompetition.create_model(competition=competition, name=request["name"], ws_message=ws_message)
        return {}

    @classmethod
    def tour_create(cls, request, ws_message):
        inner_competition = cls.get_model(InnerCompetition, "inner_competition_id", request)
        Tour.create_model(
            inner_competition=inner_competition,
            add_after=request["add_after"],
            data=request["data"],
            ws_message=ws_message)
        return {}

    @classmethod
    def judge_create(cls, request, ws_message):
        competition = cls.get_model(Competition, "competition_id", request)
        Judge.create_model(
            competition=competition,
            data=request["data"],
            ws_message=ws_message)
        return {}

    @classmethod
    def participant_create(cls, request, ws_message):
        inner_competition = cls.get_model(InnerCompetition, "inner_competition_id", request)
        Participant.create_model(
            inner_competition=inner_competition,
            data=request["data"],
            ws_message=ws_message)
        return {}

    # Deleters

    @classmethod
    def tour_delete(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.delete_model(ws_message=ws_message)
        return {}

    @classmethod
    def judge_delete(cls, request, ws_message):
        judge = cls.get_model(Judge, "judge_id", request)
        judge.delete_model(ws_message=ws_message)
        return {}

    @classmethod
    def participant_delete(cls, request, ws_message):
        participant = cls.get_model(Participant, "participant_id", request)
        participant.delete_model(ws_message=ws_message)
        return {}

    # Custom actions

    @classmethod
    def acrobatic_override_set(cls, request, ws_message):
        run = cls.get_model(Run, "run_id", request)
        acrobatic = cls.get_model(Acrobatic, "acrobatic_id", request)
        run.set_acrobatic_override(acrobatic, request["score"], ws_message=ws_message)
        return {}

    @classmethod
    def tour_find_active(cls, request, ws_message):
        tour = Tour.get_active()
        return {
            "tour_id": None if tour is None else tour.id,
        }

    @classmethod
    def tour_start(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.start(ws_message=ws_message)
        return {}

    @classmethod
    def tour_stop(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.stop(ws_message=ws_message)
        return {}

    @classmethod
    def tour_init(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.init(ws_message=ws_message)
        return {}

    @classmethod
    def tour_finalize(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.full_prefetch()
        tour.finalize(ws_message=ws_message)
        return {}

    @classmethod
    def tour_shuffle_heats(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.shuffle_heats(ws_message=ws_message)
        return {}

    @classmethod
    def tour_get_results(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.full_prefetch()
        return tour.get_serialized_results()

    @classmethod
    def competition_load(cls, request, ws_message):
        competition = cls.get_model(Competition, "competition_id", request)
        competition.load(request["data"], ws_message=ws_message)
        return {}

    # Service

    @classmethod
    def call(cls, method, request, ws_message):
        parts = method.split(".")
        if len(parts) != 2:
            return {
                "success": False,
                "message": "Invalid method name: {}".format(method),
            }
        internal_name = "_".join(parts)
#        try:
        result = getattr(cls, internal_name)(request, ws_message=ws_message)
        return {
            "success": True,
            "response": result
        }
        # except AttributeError:
        #     return {
        #         "success": False,
        #         "message": "Unknown method name: {}".format(method),
        #     }
