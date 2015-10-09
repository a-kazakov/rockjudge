import tornado.gen
from collections import deque

import peewee_async

from participants.models import (
    Acrobatic,
    Club,
    Participant,
    ParticipantSportsman,
    Sportsman,
)
from tournaments.models import (
    AcrobaticOverride,
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
    @tornado.gen.coroutine
    def get_model(model_type, id_name, request):
        model_id = IdTransformer.execute(request, id_name)
        model = yield from peewee_async.get_object(model_type, model_type.id == model_id)
        return model

    # Single models getters

    @classmethod
    @tornado.gen.coroutine
    def judge_get(cls, request):
        model = yield cls.get_model(Judge, "judge_id", request)
        return (yield model.serialize(recursive=request["recursive"]))

    @classmethod
    @tornado.gen.coroutine
    def score_get(cls, request):
        model = yield cls.get_model(Score, "score_id", request)
        return (yield model.serialize(recursive=request["recursive"]))

    @classmethod
    @tornado.gen.coroutine
    def run_get(cls, request):
        run = yield cls.get_model(Run, "run_id", request)
        if request["recursive"]:
            yield run.prefetch([{
                "model": Score,
                "ref": "run",
                "ref_dir": "up",
                "children": [],
            }, {
                "model": AcrobaticOverride,
                "ref": "run",
                "ref_dir": "up",
                "children": [],
            }, {
                "model": Participant,
                "ref": "participant",
                "ref_dir": "down",
                "children": [{
                    "model": Acrobatic,
                    "ref": "participant",
                    "ref_dir": "up",
                    "children": [],
                }, {
                    "model": Club,
                    "ref": "club",
                    "ref_dir": "down",
                    "children": [],
                }, {
                    "model": ParticipantSportsman,
                    "ref": "participant",
                    "ref_dir": "up",
                    "children": [{
                        "model": Sportsman,
                        "ref": "sportsman",
                        "ref_dir": "down",
                        "children": [],
                    }],
                }],
            }])
        return (yield run.serialize(recursive=request["recursive"]))

    @classmethod
    @tornado.gen.coroutine
    def tour_get(cls, request):
        tour = yield cls.get_model(Tour, "tour_id", request)
        if request["recursive"]:
            yield tour.full_prefetch()
        return (yield tour.serialize(recursive=request["recursive"]))

    @classmethod
    @tornado.gen.coroutine
    def competition_get(cls, request):
        competition = yield cls.get_model(Competition, "competition_id", request)
        if request["recursive"]:
            yield competition.full_prefetch()
        return (yield competition.serialize(recursive=request["recursive"]))

    @classmethod
    @tornado.gen.coroutine
    def inner_competition_get(cls, request):
        inner_competition = yield cls.get_model(InnerCompetition, "inner_competition_id", request)
        if request["recursive"]:
            yield inner_competition.full_prefetch()
        return (yield inner_competition.serialize(recursive=request["recursive"]))

    # Setters

    @classmethod
    @tornado.gen.coroutine
    def judge_set(cls, request):
        model = yield cls.get_model(Judge, "judge_id", request)
        yield model.update_data(request["data"])
        return {}

    @classmethod
    @tornado.gen.coroutine
    def score_set(cls, request):
        model = yield cls.get_model(Score, "score_id", request)
        yield model.update_data(request["data"])
        return {}

    @classmethod
    @tornado.gen.coroutine
    def run_set(cls, request):
        model = yield cls.get_model(Run, "run_id", request)
        yield model.update_data(request["data"])
        return {}

    @classmethod
    @tornado.gen.coroutine
    def tour_set(cls, request):
        model = yield cls.get_model(Tour, "tour_id", request)
        yield model.update_data(request["data"])
        return {}

    @classmethod
    @tornado.gen.coroutine
    def inner_competition_set(cls, request):
        model = yield cls.get_model(InnerCompetition, "inner_competition_id", request)
        yield model.update_data(request["data"])
        return {}

    @classmethod
    @tornado.gen.coroutine
    def competition_set(cls, request):
        model = yield cls.get_model(Competition, "competition_id", request)
        yield model.update_data(request["data"])
        return {}

    # Creaters

    @classmethod
    @tornado.gen.coroutine
    def inner_competition_create(cls, request):
        competition = yield cls.get_model(Competition, "competition_id", request)
        yield InnerCompetition.create_model(competition=competition, name=request["name"])
        return {}

    @classmethod
    @tornado.gen.coroutine
    def tour_create(cls, request):
        inner_competition = yield cls.get_model(InnerCompetition, "inner_competition_id", request)
        yield Tour.create_model(
            inner_competition=inner_competition,
            add_after=request["add_after"],
            data=request["data"])
        return {}

    # Deleters

    @classmethod
    @tornado.gen.coroutine
    def tour_delete(cls, request):
        tour = yield cls.get_model(Tour, "tour_id", request)
        yield tour.delete_model()
        return {}

    # Custom actions

    @classmethod
    @tornado.gen.coroutine
    def acrobatic_override_set(cls, request):
        run = yield cls.get_model(Run, "run_id", request)
        acrobatic = yield cls.get_model(Acrobatic, "acrobatic_id", request)
        yield run.set_acrobatic_override(acrobatic, request["score"])
        return {}

    @classmethod
    @tornado.gen.coroutine
    def tour_find_active(cls, request):
        tour = yield Tour.get_active()
        return {
            "tour_id": None if tour is None else tour.id,
        }

    @classmethod
    @tornado.gen.coroutine
    def tour_start(cls, request):
        tour = yield cls.get_model(Tour, "tour_id", request)
        yield tour.start()
        return {}

    @classmethod
    @tornado.gen.coroutine
    def tour_stop(cls, request):
        tour = yield cls.get_model(Tour, "tour_id", request)
        yield tour.stop()
        return {}

    @classmethod
    @tornado.gen.coroutine
    def tour_init(cls, request):
        tour = yield cls.get_model(Tour, "tour_id", request)
        yield tour.init()
        return {}

    @classmethod
    @tornado.gen.coroutine
    def tour_finalize(cls, request):
        tour = yield cls.get_model(Tour, "tour_id", request)
        yield tour.finalize()
        return {}

    @classmethod
    @tornado.gen.coroutine
    def tour_shuffle_heats(cls, request):
        tour = yield cls.get_model(Tour, "tour_id", request)
        yield tour.shuffle_heats()
        return {}

    @classmethod
    @tornado.gen.coroutine
    def tour_get_results(cls, request):
        tour = yield cls.get_model(Tour, "tour_id", request)
        yield tour.full_prefetch()
        return (yield tour.get_serialized_results())

    @classmethod
    @tornado.gen.coroutine
    def competition_load(cls, request):
        competition = yield cls.get_model(Competition, "competition_id", request)
        yield competition.load(request["data"])
        return {}

    # Service

    @classmethod
    @tornado.gen.coroutine
    def call(cls, method, request):
        parts = method.split(".")
        if len(parts) != 2:
            return {
                "success": False,
                "message": "Invalid method name: {}".format(method),
            }
        internal_name = "_".join(parts)
#        try:
        result = yield getattr(cls, internal_name)(request)
        return {
            "success": True,
            "response": result
        }
        # except AttributeError:
        #     return {
        #         "success": False,
        #         "message": "Unknown method name: {}".format(method),
        #     }
