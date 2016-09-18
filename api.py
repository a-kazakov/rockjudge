import base64
import logging
import os
import time
import traceback

from db import Database
from exceptions import ApiError
from log import log_api
from auth import check_auth
from models import (
    Client,
    ClientAuth,
    Club,
    Competition,
    CompetitionPlanItem,
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
            id_value = request.body[current_id_type]
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
        # import traceback
        record = record.msg[0]
        record = re.sub(r'SELECT.+?FROM', 'SELECT * FROM', record)
        record = re.sub(r'(%s, )+%s', '...', record)
        # print(record)
        # print(traceback.print_stack())
        self.cnt += 1


class Api:
    @staticmethod
    def get_model(model_type, id_name, request, pf_children=None):
        model_id = request.body[id_name]
        model = model_type.get(model_type.id == model_id)
        if pf_children is None:
            if "children" in request.body:
                model.smart_prefetch(request.body["children"])
        else:
            model.smart_prefetch(pf_children)
        return model

    # Single models getters

    @classmethod
    def judge_get(cls, request):
        judge = cls.get_model(Judge, "judge_id", request)
        check_auth(
            competition_id=judge.competition_id,
            request=request,
            allowed_access_levels=("judge_{}".format(judge.id), "any_judge", "admin", ),
        )
        return judge.serialize(children=request.body["children"])

    @classmethod
    def competition_get(cls, request):
        competition = cls.get_model(Competition, "competition_id", request)
        check_auth(
            competition_id=competition.id,
            request=request,
            allowed_access_levels="*",
        )
        return competition.serialize(children=request.body["children"])

    @classmethod
    def competition_get_all(cls, request):
        if request.remote_ip != "127.0.0.1":
            raise ApiError("errors.auth.localhost_only")
        competitions = Competition.select().where(Competition.deleted == False)  # NOQA
        return [{
            "id": c.id,
            "data": c.serialize(children=request.body["children"]),
            "name": c.serialize(children=request.body["children"]),
        } for c in competitions]

    @classmethod
    def competition_get_active_names(cls, request):
        competitions = Competition.select().where(
            (Competition.active == True) &  # NOQA
            (Competition.deleted == False)  # NOQA
        )
        # No auth check
        return [{
            "id": c.id,
            "name": c.name
        } for c in competitions]

    @classmethod
    def discipline_get(cls, request):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        check_auth(
            competition_id=discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", "presenter", "any_judge", ),
        )
        return discipline.serialize(children=request.body["children"])

    @classmethod
    def tour_get(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", "presenter", "any_judge", "judge_*", ),
        )
        return tour.serialize(children=request.body["children"])

    @classmethod
    def program_get(cls, request):
        program = cls.get_model(Program, "program_id", request)
        check_auth(
            competition_id=program.participant.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        return program.serialize(children=request.body["children"])

    # Setters

    @classmethod
    def client_auth_set(cls, request):
        client_auth = cls.get_model(ClientAuth, "client_auth_id", request)
        check_auth(
            competition_id=client_auth.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        client_auth.update_model(request.body["data"], ws_message=request.ws_message)

    @classmethod
    def club_set(cls, request):
        club = cls.get_model(Club, "club_id", request)
        check_auth(
            competition_id=club.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        club.update_model(request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def judge_set(cls, request):
        judge = cls.get_model(Judge, "judge_id", request)
        check_auth(
            competition_id=judge.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        judge.update_model(request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def discipline_judge_set(cls, request):
        discipline_judge = cls.get_model(DisciplineJudge, "discipline_judge_id", request)
        check_auth(
            competition_id=discipline_judge.judge.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        discipline_judge.update_model(request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def score_set(cls, request):
        score = cls.get_model(Score, "score_id", request)
        judge = score.discipline_judge.judge
        access_levels = ("admin", )
        if not request.body.get("force", False):
            access_levels += ("any_judge", "judge_{}".format(judge.id), )
        check_auth(
            competition_id=judge.competition_id,
            request=request,
            allowed_access_levels=access_levels,
        )
        score.update_model(request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def run_set(cls, request):
        run = cls.get_model(Run, "run_id", request)
        check_auth(
            competition_id=run.tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        run.update_model(request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def program_set(cls, request):
        program = cls.get_model(Program, "program_id", request)
        check_auth(
            competition_id=program.participant.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        program.update_model(request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def tour_set(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        tour.update_model(request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def discipline_set(cls, request):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        check_auth(
            competition_id=discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        discipline.update_model(request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def competition_set(cls, request):
        competition = cls.get_model(Competition, "competition_id", request)
        check_auth(
            competition_id=competition.id,
            request=request,
            allowed_access_levels=("admin", "presenter", "any_judge", ),
        )
        competition.update_model(request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def competition_plan_item_set(cls, request):
        item = cls.get_model(CompetitionPlanItem, "competition_plan_item_id", request)
        item.update_model(request.body["data"], ws_message=request.ws_message)
        check_auth(
            competition_id=item.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        return {}

    @classmethod
    def participant_set(cls, request):
        participant = cls.get_model(Participant, "participant_id", request)
        check_auth(
            competition_id=participant.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        participant.update_model(request.body["data"], ws_message=request.ws_message)
        return {}

    # Creaters

    @classmethod
    def client_auth_create(cls, request):
        competition = Competition.get(id=request.body["competition_id"])
        ClientAuth.create_model(
            client=request.client,
            competition=competition,
            ws_message=request.ws_message,
        )

    @classmethod
    def competition_create(cls, request):
        if request.remote_ip != "127.0.0.1":
            raise ApiError("errors.auth.localhost_only")
        Competition.create_model(data=request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def discipline_create(cls, request):
        competition = cls.get_model(Competition, "competition_id", request)
        check_auth(
            competition_id=competition.id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        Discipline.create_model(competition=competition, data=request.body["data"], ws_message=request.ws_message)
        return {}

    @classmethod
    def tour_create(cls, request):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        check_auth(
            competition_id=discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        Tour.create_model(
            discipline=discipline,
            add_after=request.body["add_after"],
            data=request.body["data"],
            ws_message=request.ws_message,
        )
        return {}

    @classmethod
    def program_create(cls, request):
        participant = cls.get_model(Participant, "participant_id", request)
        check_auth(
            competition_id=participant.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        Program.create_model(
            participant=participant,
            data=request.body["data"],
            ws_message=request.ws_message,
        )
        return {}

    @classmethod
    def club_create(cls, request):
        competition = cls.get_model(Competition, "competition_id", request)
        check_auth(
            competition_id=competition.id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        Club.create_model(
            competition=competition,
            data=request.body["data"],
            ws_message=request.ws_message,
        )
        return {}

    @classmethod
    def judge_create(cls, request):
        competition = cls.get_model(Competition, "competition_id", request)
        check_auth(
            competition_id=competition.id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        Judge.create_model(
            competition=competition,
            data=request.body["data"],
            ws_message=request.ws_message,
        )
        return {}

    def discipline_judge_create(cls, request):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        judge = cls.get_model(Judge, "judge_id", request)
        check_auth(
            competition_id=judge.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        DisciplineJudge.create_model(
            discipline=discipline,
            judge=judge,
            data=request.body["data"],
            ws_message=request.ws_message,
        )
        return {}

    @classmethod
    def competition_plan_item_create(cls, request):
        competition = cls.get_model(Competition, "competition_id", request)
        check_auth(
            competition_id=competition.id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        CompetitionPlanItem.create_model(
            competition=competition,
            data=request.body["data"],
            ws_message=request.ws_message,
        )
        return {}

    @classmethod
    def participant_create(cls, request):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        check_auth(
            competition_id=discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        Participant.create_model(
            discipline=discipline,
            data=request.body["data"],
            ws_message=request.ws_message,
        )
        return {}

    # Deleters

    @classmethod
    def client_auth_delete(cls, request):
        client_auth = cls.get_model(ClientAuth, "client_auth_id", request)
        check_auth(
            competition_id=client_auth.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        client_auth.delete_model(ws_message=request.ws_message)

    @classmethod
    def competition_delete(cls, request):
        if request.remote_ip != "127.0.0.1":
            raise ApiError("errors.auth.localhost_only")
        competition = cls.get_model(Competition, "competition_id", request)
        competition.delete_model(ws_message=request.ws_message)
        return {}

    @classmethod
    def tour_delete(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        tour.delete_model(ws_message=request.ws_message)
        return {}

    @classmethod
    def program_delete(cls, request):
        program = cls.get_model(Program, "program_id", request)
        check_auth(
            competition_id=program.participant.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        program.delete_model(ws_message=request.ws_message)
        return {}

    @classmethod
    def discipline_delete(cls, request):
        discipline = cls.get_model(Discipline, "discipline_id", request)
        check_auth(
            competition_id=discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        discipline.delete_model(ws_message=request.ws_message)
        return {}

    @classmethod
    def club_delete(cls, request):
        club = cls.get_model(Club, "club_id", request)
        check_auth(
            competition_id=club.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        club.delete_model(ws_message=request.ws_message)
        return {}

    @classmethod
    def judge_delete(cls, request):
        judge = cls.get_model(Judge, "judge_id", request)
        check_auth(
            competition_id=judge.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        judge.delete_model(ws_message=request.ws_message)
        return {}

    @classmethod
    def discipline_judge_delete(cls, request):
        discipline_judge = cls.get_model(DisciplineJudge, "discipline_judge_id", request)
        check_auth(
            competition_id=discipline_judge.judge.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        discipline_judge.delete_model(ws_message=request.ws_message)
        return {}

    @classmethod
    def participant_delete(cls, request):
        participant = cls.get_model(Participant, "participant_id", request)
        check_auth(
            competition_id=participant.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        participant.delete_model(ws_message=request.ws_message)
        return {}

    @classmethod
    def competition_plan_item_delete(cls, request):
        item = cls.get_model(CompetitionPlanItem, "competition_plan_item_id", request)
        check_auth(
            competition_id=item.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        item.delete_model(ws_message=request.ws_message)
        return {}

    # Custom actions

    @classmethod
    def score_confirm(cls, request):
        score = cls.get_model(Score, "score_id", request)
        judge = score.discipline_judge.judge
        check_auth(
            competition_id=judge.competition_id,
            request=request,
            allowed_access_levels=("admin", "any_judge", "judge_{}".format(judge.id), ),
        )
        score.confirm(ws_message=request.ws_message)
        return {}

    @classmethod
    def score_unconfirm(cls, request):
        score = cls.get_model(Score, "score_id", request)
        judge = score.discipline_judge.judge
        check_auth(
            competition_id=judge.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        score.unconfirm(ws_message=request.ws_message)
        return {}

    @classmethod
    def acrobatic_override_set(cls, request):
        run = cls.get_model(Run, "run_id", request)
        check_auth(
            competition_id=run.tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", "judge_*", "any_judge", ),
        )
        run.set_acrobatic_override(request.body["acrobatic_idx"], request.body["score"], ws_message=request.ws_message)
        return {}

    @classmethod
    def run_load_program(cls, request):
        run = cls.get_model(Run, "run_id", request)
        check_auth(
            competition_id=run.tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        if request.body["program_id"] is None:
            run.load_acrobatics(None, request.ws_message)
        else:
            program = cls.get_model(Program, "program_id", request)
            run.load_acrobatics(program, request.ws_message)
        return {}

    @classmethod
    def run_mark_performed(cls, request):
        run = cls.get_model(Run, "run_id", request)
        check_auth(
            competition_id=run.tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", "judge_*", "any_judge", ),
        )
        run.set_performed_flag(True, request.ws_message)

    @classmethod
    def run_mark_not_performed(cls, request):
        run = cls.get_model(Run, "run_id", request)
        check_auth(
            competition_id=run.tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", "judge_*", "any_judge", ),
        )
        run.set_performed_flag(False, request.ws_message)

    @classmethod
    def tour_find_active(cls, request):
        tour = Tour.get_active()
        return {
            "tour_id": None if tour is None else tour.id,
        }

    @classmethod
    def tour_start(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", "judge_*", "any_judge", ),
        )
        tour.start(ws_message=request.ws_message)
        return {}

    @classmethod
    def tour_start_next_after(cls, request):
        tour_id = request.body["tour_id"]
        tour = Tour.get(id=tour_id)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", "judge_*", "any_judge", ),
        )
        try:
            current_competition_plan_item = \
                (CompetitionPlanItem.select()
                    .where(CompetitionPlanItem.tour == tour)
                    .get())
        except CompetitionPlanItem.DoesNotExist:
            raise ApiError("errors.tour.not_in_competition_plan")
        try:
            next_competition_plan_item = \
                (CompetitionPlanItem.select()
                    .where(
                        (CompetitionPlanItem.sp > current_competition_plan_item.sp) &
                        (CompetitionPlanItem.competition == tour.discipline.competition_id) &
                        (~(CompetitionPlanItem.tour >> None)))
                    .order_by(CompetitionPlanItem.sp.asc())
                    .get())
        except CompetitionPlanItem.DoesNotExist:
            raise ApiError("errors.tour.no_next_tour")
        next_competition_plan_item.tour.start(ws_message=request.ws_message)
        return {}

    @classmethod
    def tour_stop(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", "judge_*", "any_judge", ),
        )
        tour.stop(ws_message=request.ws_message)
        return {}

    @classmethod
    def tour_init(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        tour.init(ws_message=request.ws_message)
        return {}

    @classmethod
    def tour_finalize(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", "judge_*", "any_judge", ),
        )
        tour.full_prefetch()
        tour.finalize(ws_message=request.ws_message)
        return {}

    @classmethod
    def tour_unfinalize(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        tour.unfinalize(ws_message=request.ws_message)
        return {}

    @classmethod
    def tour_shuffle_heats(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        tour.shuffle_heats(ws_message=request.ws_message)
        return {}

    @classmethod
    def tour_get_results(cls, request):
        tour = cls.get_model(Tour, "tour_id", request)
        check_auth(
            competition_id=tour.discipline.competition_id,
            request=request,
            allowed_access_levels="*",
        )
        tour.full_prefetch()
        return tour.get_serialized_results()

    @classmethod
    def discipline_get_results(cls, request):
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
        check_auth(
            competition_id=discipline.competition_id,
            request=request,
            allowed_access_levels="*",
        )
        return discipline.get_serialized_results()

    @classmethod
    def competition_load(cls, request):
        competition = cls.get_model(Competition, "competition_id", request)
        check_auth(
            competition_id=competition.id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        competition.load(request.body["data"], request.body["items"], ws_message=request.ws_message)
        return {}

    @classmethod
    def competition_export(cls, request):
        competition = cls.get_model(Competition, "competition_id", request)
        check_auth(
            competition_id=competition.id,
            request=request,
            allowed_access_levels=("admin", ),
        )
        return competition.export()

    @classmethod
    def service_reload_clients(cls, request):
        if request.remote_ip != "127.0.0.1":
            raise ApiError("errors.auth.localhost_only")
        request.ws_message.add_message("reload_data")
        return {}

    @classmethod
    def service_refresh_clients(cls, request):
        if request.remote_ip != "127.0.0.1":
            raise ApiError("errors.auth.localhost_only")
        request.ws_message.add_message("force_refresh")
        return {}

    @classmethod
    def service_ping(cls, request):
        return None
        # payload = base64.b64encode(os.urandom(request.body["payload_size"] * 10000000 // 13333333)).decode()
        # request.ws_message.add_message("ping_reply", {"ping_id": request.body["ping_id"], "payload": payload})
        # return {}

    @classmethod
    def auth_register(cls, request):
        return Client.create_model()

    @classmethod
    def auth_exchange_keys(cls, request):
        client = Client.get(id=int(request.body["client_id"]))
        return client.finilaze_model(request.body["data"])

    @classmethod
    def auth_get_access_levels(cls, request):
        return {
            str(auth.competition_id): auth.access_level
            for auth in request.client.authentications
        }

    # Service

    @classmethod
    def call(cls, request):
        ex_str = None
        hdlr = SqlLoggingHandler()
        logger = logging.getLogger('peewee')
        logger.setLevel(logging.DEBUG)
        logger.addHandler(hdlr)
        try:
            begin = time.time()
            response = None

            parts = request.method.split(".")
            if len(parts) != 2:
                response = {
                    "success": False,
                    "message": "Invalid method name: {}".format(request.method),
                }
            else:
                internal_name = "_".join(parts)
                with Database.instance().db.transaction():
                    result = getattr(cls, internal_name)(request)
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
            if request.method not in ["service.ping"]:
                log_api(
                    time=begin,
                    latency=total_time,
                    queries=hdlr.cnt + 1,
                    request=request,
                    exception=ex_str,
                    response=response)
            logger.removeHandler(hdlr)
            print("Api call: {:<25s} {:4d}ms {:4d} queries".format(request.method, int(1000 * total_time), hdlr.cnt))
            return response
