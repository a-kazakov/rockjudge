import base64
import logging
import os
import time
import traceback

from db import Database
from exceptions import ApiError
from log import log_api
from models import (
    Club,
    Competition,
    Discipline,
    DisciplineJudge,
    Judge,
    Participant,
    Program,
    Run,
    Score,
    Tour,
)


class IdTransformer:
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
        raise ApiError("errors.api.unable_to_get", wanted_id_type)


class SqlLoggingHandler(logging.StreamHandler):
    def __init__(self):
        super().__init__()
        self.cnt = 0

    def emit(self, record):
        import re
        record = record.msg[0]
        record = re.sub(r'SELECT.+?FROM', 'SELECT * FROM', record)
        record = re.sub(r'(%s, )+%s', '...', record)
        # print(record)
        self.cnt += 1


class Api:
    @staticmethod
    def get_model(model_type, id_name, request, pf_children=None):
        model_id = request[id_name]
        model = model_type.get(model_type.id == model_id)
        if pf_children is None:
            if "children" in request:
                model.smart_prefetch(request["children"])
        else:
            model.smart_prefetch(pf_children)
        return model

    # Single models getters

    @classmethod
    def judge_get(cls, request, ws_message):
        judge = cls.get_model(Judge, "judge_id", request)
        return judge.serialize(children=request["children"])

    @classmethod
    def competition_get(cls, request, ws_message):
        competition = cls.get_model(Competition, "competition_id", request)
        return competition.serialize(children=request["children"])

    @classmethod
    def competition_get_all(cls, request, ws_message):
        competitions = Competition.select()
        return [{
            "id": c.id,
            "data": c.serialize(children=request["children"])
        } for c in competitions]

    @classmethod
    def discipline_get(cls, request, ws_message):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        return discipline.serialize(children=request["children"])

    @classmethod
    def tour_get(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        return tour.serialize(children=request["children"])

    @classmethod
    def program_get(cls, request, ws_message):
        program = cls.get_model(Program, "program_id", request)
        return program.serialize(children=request["children"])

    # Setters

    @classmethod
    def club_set(cls, request, ws_message):
        model = cls.get_model(Club, "club_id", request)
        model.update_model(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def judge_set(cls, request, ws_message):
        model = cls.get_model(Judge, "judge_id", request)
        model.update_model(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def discipline_judge_set(cls, request, ws_message):
        model = cls.get_model(DisciplineJudge, "discipline_judge_id", request)
        model.update_model(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def score_set(cls, request, ws_message):
        model = cls.get_model(Score, "score_id", request)
        model.update_model(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def run_set(cls, request, ws_message):
        model = cls.get_model(Run, "run_id", request)
        model.update_model(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def program_set(cls, request, ws_message):
        model = cls.get_model(Program, "program_id", request)
        model.update_model(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def tour_set(cls, request, ws_message):
        model = cls.get_model(Tour, "tour_id", request)
        model.update_model(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def discipline_set(cls, request, ws_message):
        model = cls.get_model(Discipline, "discipline_id", request)
        model.update_model(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def competition_set(cls, request, ws_message):
        model = cls.get_model(Competition, "competition_id", request)
        model.update_model(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def participant_set(cls, request, ws_message):
        model = cls.get_model(Participant, "participant_id", request)
        model.update_model(request["data"], ws_message=ws_message)
        return {}

    # Creaters

    @classmethod
    def competition_create(cls, request, ws_message):
        Competition.create_model(data=request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def discipline_create(cls, request, ws_message):
        competition = cls.get_model(Competition, "competition_id", request)
        Discipline.create_model(competition=competition, data=request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def tour_create(cls, request, ws_message):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        Tour.create_model(
            discipline=discipline,
            add_after=request["add_after"],
            data=request["data"],
            ws_message=ws_message)
        return {}

    @classmethod
    def program_create(cls, request, ws_message):
        participant = cls.get_model(Participant, "participant_id", request)
        Program.create_model(
            participant=participant,
            data=request["data"],
            ws_message=ws_message)
        return {}

    @classmethod
    def club_create(cls, request, ws_message):
        competition = cls.get_model(Competition, "competition_id", request)
        Club.create_model(
            competition=competition,
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

    def discipline_judge_create(cls, request, ws_message):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        judge = cls.get_model(Judge, "judge_id", request)
        DisciplineJudge.create_model(
            discipline=discipline,
            judge=judge,
            data=request["data"],
            ws_message=ws_message)
        return {}

    @classmethod
    def participant_create(cls, request, ws_message):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        Participant.create_model(
            discipline=discipline,
            data=request["data"],
            ws_message=ws_message)
        return {}

    # Deleters

    @classmethod
    def competition_delete(cls, request, ws_message):
        competition = cls.get_model(Discipline, "competition_id", request)
        competition.delete_model(ws_message=ws_message)
        return {}

    @classmethod
    def tour_delete(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.delete_model(ws_message=ws_message)
        return {}

    @classmethod
    def program_delete(cls, request, ws_message):
        program = cls.get_model(Program, "program_id", request)
        program.delete_model(ws_message=ws_message)
        return {}

    @classmethod
    def discipline_delete(cls, request, ws_message):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        discipline.delete_model(ws_message=ws_message)
        return {}

    @classmethod
    def club_delete(cls, request, ws_message):
        club = cls.get_model(Club, "club_id", request)
        club.delete_model(ws_message=ws_message)
        return {}

    @classmethod
    def judge_delete(cls, request, ws_message):
        judge = cls.get_model(Judge, "judge_id", request)
        judge.delete_model(ws_message=ws_message)
        return {}

    @classmethod
    def discipline_judge_delete(cls, request, ws_message):
        judge = cls.get_model(DisciplineJudge, "discipline_judge_id", request)
        judge.delete_model(ws_message=ws_message)
        return {}

    @classmethod
    def participant_delete(cls, request, ws_message):
        participant = cls.get_model(Participant, "participant_id", request)
        participant.delete_model(ws_message=ws_message)
        return {}

    # Custom actions

    @classmethod
    def score_confirm(cls, request, ws_message):
        score = cls.get_model(Score, "score_id", request)
        score.confirm(ws_message=ws_message)
        return {}

    @classmethod
    def score_unconfirm(cls, request, ws_message):
        score = cls.get_model(Score, "score_id", request)
        score.unconfirm(ws_message=ws_message)
        return {}

    @classmethod
    def acrobatic_override_set(cls, request, ws_message):
        run = cls.get_model(Run, "run_id", request)
        run.set_acrobatic_override(request["acrobatic_idx"], request["score"], ws_message=ws_message)
        return {}

    @classmethod
    def run_load_program(cls, request, ws_message):
        run = cls.get_model(Run, "run_id", request)
        if request["program_id"] is None:
            run.load_acrobatics(None, ws_message)
        else:
            program = cls.get_model(Program, "program_id", request)
            run.load_acrobatics(program, ws_message)
        return {}

    @classmethod
    def run_mark_performed(cls, request, ws_message):
        run = cls.get_model(Run, "run_id", request)
        run.set_performed_flag(True, ws_message)

    @classmethod
    def run_mark_not_performed(cls, request, ws_message):
        run = cls.get_model(Run, "run_id", request)
        run.set_performed_flag(False, ws_message)

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
    def tour_unfinalize(cls, request, ws_message):
        tour = cls.get_model(Tour, "tour_id", request)
        tour.unfinalize(ws_message=ws_message)
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
    def discipline_get_results(cls, request, ws_message):
        discipline = cls.get_model(Discipline, "discipline_id", request, pf_children={
            "competition": {
                "judges": {},
            },
            "tours": {
                "runs": {
                    "scores": {},
                    "acrobatics": {},
                    "participant": {
                        "club": {},
                    },
                },
            }
        })
        return discipline.get_serialized_results()

    @classmethod
    def competition_load(cls, request, ws_message):
        competition = cls.get_model(Competition, "competition_id", request)
        competition.load(request["data"], ws_message=ws_message)
        return {}

    @classmethod
    def service_reload_clients(cls, request, ws_message):
        ws_message.add_message("reload_data")
        return {}

    @classmethod
    def service_refresh_clients(cls, request, ws_message):
        ws_message.add_message("force_refresh")
        return {}

    @classmethod
    def service_ping(cls, request, ws_message):
        payload = base64.b64encode(os.urandom(request["payload_size"] * 10000000 // 13333333)).decode()
        ws_message.add_message("ping_reply", {"ping_id": request["ping_id"], "payload": payload})
        return {}

    # Service

    @classmethod
    def call(cls, method, request, ws_message):
        ex_str = None
        hdlr = SqlLoggingHandler()
        logger = logging.getLogger('peewee')
        logger.setLevel(logging.DEBUG)
        logger.addHandler(hdlr)
        try:
            begin = time.time()
            response = None

            parts = method.split(".")
            if len(parts) != 2:
                response = {
                    "success": False,
                    "message": "Invalid method name: {}".format(method),
                }
            else:
                internal_name = "_".join(parts)
                with Database.instance().db.transaction():
                    result = getattr(cls, internal_name)(request, ws_message=ws_message)
                response = {
                    "success": True,
                    "response": result
                }
        except ApiError as ex:
            ex_str = traceback.format_exc()
            response = {
                "success": False,
                "code": ex.code,
                "args": ex.args,
            }
        except Exception as ex:
            ex_str = traceback.format_exc()
            response = {
                "success": False,
                "code": "errors.global.internal_server_error",
                "args": [],
            }
            print(ex_str)
        finally:
            total_time = time.time() - begin
            if method not in {"service.ping"}:
                log_api(
                    time=begin,
                    latency=total_time,
                    queries=hdlr.cnt + 1,
                    method=method,
                    request=request,
                    exception=ex_str,
                    response=response)
            logger.removeHandler(hdlr)
            print("Api call: {:<25s} {:4d}ms {:4d} queries".format(method, int(1000 * total_time), hdlr.cnt))
            return response
