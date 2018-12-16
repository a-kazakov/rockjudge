import asyncio
import time
from enum import Enum
from traceback import print_exc
from typing import Any, Dict, NamedTuple, Optional, Tuple, Type, TypeVar, List

from sqlalchemy.orm import Session

from db import db
from enums import AccessLevel
from exceptions import ApiError, InternalError, ImmediateResponse
from models.base_model import BaseModel
from models.client import Client
from models.competition import Competition
from models.competition_plan_item import CompetitionPlanItem
from models.discipline import Discipline
from models.discipline_judge import DisciplineJudge
from models.program import Program
from models.run import Run
from models.score import Score
from models.tour import Tour
from mutations import FinalizedMutations, MutationsKeeper
from prefetching import ModelTreeNode, RecursiveDict
from subscriptions import (
    SubscriptionAllCompetitions,
    SubscriptionBase,
    SubscriptionClient,
    SubscriptionCompetition,
    SubscriptionTour,
)
from utils import raise_if_none, DbQueriesLogger

TBaseModel = TypeVar("TBaseModel", bound=BaseModel)


class ApiMethod(Enum):
    # Model methods
    MODEL_GET = "model/get"  # For debugging only
    MODEL_SUBSCRIBE = "model/subscribe"
    MODEL_UNSUBSCRIBE = "model/unsubscribe"
    MODEL_SUBSCRIBE_ALL_COMPETITIONS = "model/subscribe_all_competitions"
    MODEL_CREATE = "model/create"
    MODEL_UPDATE = "model/update"
    MODEL_BATCH_UPDATE = "model/batch_update"
    MODEL_DELETE = "model/delete"
    # Competition methods
    COMPETITION_LOAD = "competition/load"
    COMPETITION_EXPORT = "competition/export"
    # Discipline methods
    DISCIPLINE_CREATE_WITH_JUDGES = "discipline/create_with_judges"
    DISCIPLINE_UPDATE_WITH_JUDGES = "discipline/update_with_judges"
    # Tour methods
    TOUR_INIT = "tour/init"
    TOUR_FINALIZE = "tour/finalize"
    TOUR_UNFINALIZE = "tour/unfinalize"
    TOUR_START = "tour/start"
    TOUR_START_NEXT = "tour/start_next"
    TOUR_STOP = "tour/stop"
    TOUR_SHUFFLE_HEATS = "tour/shuffle_heats"
    TOUR_CONFIRM_HEAT = "tour/confirm_heat"
    TOUR_CONFIRM_JUDGE = "tour/confirm_judge"
    TOUR_UNCONFIRM_JUDGE = "tour/unconfirm_judge"
    TOUR_RESET_JUDGE = "tour/reset_judge"
    TOUR_PERMUTE_HEAT = "tour/permute_heat"
    # Run methods
    RUN_LOAD_PROGRAM = "run/load_program"
    RUN_RESET = "run/reset"
    # Service methods
    SERIVCE_GET_DB_SCHEMA = "service/get_db_schema"
    SERVICE_REFRESH_CLIENTS = "service/refresh_clients"
    SERVICE_REPORT_JS_ERROR = "service/report_js_error"
    SERVICE_DUMMY = "service/dummy"
    # Auth methods
    AUTH_START_REGISTRATION = "auth/start_registration"
    AUTH_COMPLETE_REGISTRATION = "auth/complete_registration"


class ApiRequest(NamedTuple):
    opt_client: Optional[Client]
    remote_ip: str
    host: str
    method: ApiMethod
    params: Dict[str, Any]
    response_key: Optional[str]

    @property
    def client(self) -> Client:
        return raise_if_none(self.opt_client)

    def is_superuser(self) -> bool:
        return self.remote_ip == self.host == "127.0.0.1"

    def with_client(self, client: Client) -> "ApiRequest":
        params = {**self._asdict(), "opt_client": client}
        return ApiRequest(**params)


class ApiResponse(NamedTuple):
    request: ApiRequest
    response: Any = None
    mutations: Optional[FinalizedMutations] = None
    error_code: Optional[str] = None
    error_args: Optional[Tuple[str, ...]] = None
    new_subscription: Optional[SubscriptionBase] = None
    remove_subscription: Optional[str] = None
    broadcast_message: Optional[str] = None
    is_immediate_response: bool = False

    @property
    def success(self) -> bool:
        return self.error_code is None

    @property
    def needs_postprocessor(self) -> bool:
        return self.error_code is None and not self.is_immediate_response

    def serialize(self) -> Dict[str, Any]:
        if self.success:
            return {"success": True, "response": self.response}
        else:
            return {
                "success": False,
                "error_code": self.error_code,
                "error_args": self.error_args,
            }


class Api:
    def __init__(self, request: ApiRequest, session: Session) -> None:
        self.session = session
        self.request = request
        self.next_session: Optional[Session] = None
        self._db_logger = DbQueriesLogger(
            self.session.connection(), f"Api call ({request.method.value})"
        )

    async def execute(self) -> ApiResponse:
        start_time = time.monotonic()
        session_closed: bool = False
        try:
            try:
                result = await asyncio.get_event_loop().run_in_executor(
                    None, self._execute
                )
                self.session.commit()
                self.next_session = db.make_session()
                self.next_session.connection()  # Start transaction
                return result
            except ImmediateResponse as ex:
                self.session.rollback()
                session_closed = True
                return ApiResponse(
                    request=self.request,
                    response=ex.get_response(self.request.method),
                    is_immediate_response=True,
                )
        except ApiError as ex:
            self.session.rollback()
            session_closed = True
            return ApiResponse(
                request=self.request, error_code=ex.code, error_args=ex.args
            )
        except Exception as ex:
            print_exc()
            self.session.rollback()
            session_closed = True
            return ApiResponse(
                request=self.request,
                error_code="errors.global.internal_server_error",
                error_args=(),
            )
        finally:
            client_id = (
                self.request.opt_client.id
                if self.request.opt_client is not None
                else "NEW"
            )
            total_time = time.monotonic() - start_time
            self._db_logger.finalize()
            print(
                f"Api call:      {self.request.method.value:<35s} "
                f"Client ID: {client_id:<3} "
                f"Time: {total_time:<.3f}s "
                f"DB queries: {self._db_logger.queries_count:<4}"
            )
            if not session_closed:
                db.close_session(self.session)

    def _execute(self) -> ApiResponse:
        func_name = "api_" + self.request.method.value.replace("/", "_")
        func = getattr(self, func_name, None)
        if func is None:
            raise NotImplementedError(
                f"Method {self.request.method.value} is not implemented yet"
            )
        # Call API
        self.mk = MutationsKeeper()
        self.new_subscription: Optional[SubscriptionBase] = None
        self.remove_subscription: Optional[str] = None
        self.broadcast_message: Optional[str] = None
        response = func(**self.request.params)
        return ApiResponse(
            request=self.request,
            response=response,
            mutations=self.mk.finalize(),
            new_subscription=self.new_subscription,
            remove_subscription=self.remove_subscription,
            broadcast_message=self.broadcast_message,
        )

    # Helpers

    def __get_model_for_update(
        self,
        model_type: Type[TBaseModel],
        model_id: int,
        prefetch_schema: Optional[RecursiveDict] = None,
    ) -> TBaseModel:
        model = model_type.get(self.session, model_id, prefetch_schema)
        if not self.request.is_superuser():
            can_update = model.check_update_permission(self.request, {})
            if not can_update:
                raise ApiError("errors.auth.not_authenticated")
        return model

    # Model methods

    def api_model_get(self, model_name: str, model_id: int) -> Dict[str, Any]:
        model_type = BaseModel.get_child(model_name)
        model = model_type.get(self.session, model_id)
        if not self.request.is_superuser():
            can_read = model.check_read_permission(self.request)
            if not can_read:
                raise ApiError("errors.auth.not_authenticated")
        return model.serialize()

    def api_model_subscribe(
        self, model_name: str, model_id: int, subscription_id: str
    ) -> None:
        model_type = BaseModel.get_child(model_name)
        if model_type not in {Competition, Tour, Client}:
            raise InternalError(f"Subscription for model {model_name} is not supported")
        model: BaseModel = self.session.query(model_type).get(model_id)
        if not self.request.is_superuser():
            can_read = model.check_read_permission(self.request)
            if not can_read:
                raise ApiError("errors.auth.not_authenticated")
        if model_type is Competition:
            subscription = SubscriptionCompetition(model_id, subscription_id)
        elif model_type is Tour:
            subscription = SubscriptionTour(model_id, subscription_id)
        elif model_type is Client:
            subscription = SubscriptionClient(model_id, subscription_id)
        else:
            raise AssertionError
        self.new_subscription = subscription

    def api_model_subscribe_all_competitions(self, subscription_id: str) -> None:
        subscription = SubscriptionAllCompetitions(subscription_id)
        self.new_subscription = subscription

    def api_model_unsubscribe(self, subscription_id: str) -> None:
        self.remove_subscription = subscription_id

    def api_model_create(self, model_name: str, data: Dict[str, Any]) -> None:
        model_type = BaseModel.get_child(model_name)
        if not self.request.is_superuser():
            can_create = model_type.check_create_permission(
                self.session, self.request, data
            )
            if not can_create:
                raise ApiError("errors.auth.not_authenticated")
        model_type.create(self.session, data, self.mk)

    def api_model_update(
        self, model_name: str, model_id: int, data: Dict[str, Any]
    ) -> None:
        model_type = BaseModel.get_child(model_name)
        if model_type == Score:
            pf_schema = {
                "parts": {},
                "run": {"tour": {"discipline": {"competition": {}}}},
            }
        elif model_type == Tour and "scoring_system_name" in data:
            pf_schema = {"runs": {"scores": {}}}
        else:
            pf_schema = None
        model: BaseModel = model_type.get(self.session, model_id, pf_schema)
        if not self.request.is_superuser():
            can_update = model.check_update_permission(self.request, data)
            if not can_update:
                raise ApiError("errors.auth.not_authenticated")
        model.update(data, self.mk)

    def api_model_batch_update(
        self, model_name: str, data: Dict[str, Dict[str, Any]]
    ) -> None:
        model_type = BaseModel.get_child(model_name)
        if model_type == Score:
            pf_schema = {
                "parts": {},
                "run": {"tour": {"discipline": {"competition": {}}}},
            }
        elif model_type == Tour and "scoring_system_name" in data:
            pf_schema = {"runs": {"scores": {}}}
        else:
            pf_schema = None
        models: List[BaseModel] = model_type.get_multiple(
            self.session, map(int, data.keys()), pf_schema
        )
        if not self.request.is_superuser():
            can_update = all(
                model.check_update_permission(self.request, data[str(model.id)])
                for model in models
            )
            if not can_update:
                raise ApiError("errors.auth.not_authenticated")
        for model in models:
            model.update(data[str(model.id)], self.mk)

    def api_model_delete(self, model_name: str, model_id: int) -> None:
        model_type = BaseModel.get_child(model_name)
        model: BaseModel = self.session.query(model_type).get(model_id)
        if not self.request.is_superuser():
            can_delete = model.check_delete_permission(self.request)
            if not can_delete:
                raise ApiError("errors.auth.not_authenticated")
        model.delete(self.mk)

    def api_competition_load(
        self, competition_id: int, items: Dict[str, Any], data: str
    ) -> None:
        competition = Competition.get(self.session, competition_id)
        if not self.request.is_superuser():
            can_load = (
                competition.get_auth(self.request.client).access_level
                == AccessLevel.ADMIN
            )
            if not can_load:
                raise ApiError("errors.auth.not_authenticated")
        competition.load(data, items, self.mk)

    def api_discipline_create_with_judges(self, data: Dict[str, Any]) -> None:
        if not self.request.is_superuser():
            can_create = Discipline.check_create_permission(
                self.session, self.request, data
            )
            if not can_create:
                raise ApiError("errors.auth.not_authenticated")
        discipline = Discipline.create(self.session, data, self.mk)
        discipline.set_judges(data["discipline_judges"], self.mk)

    def api_discipline_update_with_judges(
        self, discipline_id: int, data: Dict[str, Any]
    ) -> None:
        model_tree = ModelTreeNode.from_dict(
            Discipline, {"discipline_judges": {}, "competition": {"judges": {}}}
        )
        discipline: Discipline = (
            self.session.query(Discipline)
            .options(*model_tree.build_prefetcher())
            .get(discipline_id)
        )
        model_tree.save_to_session(self.session, discipline)
        if not self.request.is_superuser():
            can_update = discipline.check_update_permission(self.request, data)
            if not can_update:
                raise ApiError("errors.auth.not_authenticated")
        discipline.update(data, self.mk)
        added = discipline.set_judges(data["discipline_judges"], self.mk)
        if added:
            for tour in discipline.tours:
                if tour.active:
                    tour.stop(self.mk)

    def api_tour_init(self, tour_id: int) -> Any:
        tour = self.__get_model_for_update(
            Tour,
            tour_id,
            {
                "discipline": {
                    "discipline_judges": {"judge": {}},
                    "participants": {"programs": {}},
                    "tours": {"runs": {"acrobatics": {}, "scores": {"parts": {}}}},
                }
            },
        )
        tour.init(self.mk)

    def api_tour_finalize(self, tour_id: int) -> Any:
        # TODO: set semaphore on this method before enabling async processing
        tour = self.__get_model_for_update(
            Tour,
            tour_id,
            {
                "discipline": {
                    "discipline_judges": {"judge": {}},
                    "tours": {"runs": {"acrobatics": {}, "scores": {"parts": {}}}},
                }
            },
        )
        tour.finalize(self.mk)

    def api_tour_unfinalize(self, tour_id: int) -> Any:
        tour = Tour.get(self.session, tour_id)
        if not self.request.is_superuser():
            can_unfinalize = (
                tour.get_auth(self.request.client).access_level == AccessLevel.ADMIN
            )
            if not can_unfinalize:
                raise ApiError("errors.auth.not_authenticated")
        tour.unfinalize(self.mk)

    def api_tour_start(self, tour_id: int) -> Any:
        self.__get_model_for_update(Tour, tour_id).start(self.mk)

    def api_tour_start_next(self, tour_id: int) -> Any:
        tour = self.__get_model_for_update(Tour, tour_id, {"plan_items": {}})
        if not tour.plan_items:
            raise ApiError("errors.tour.not_in_competition_plan")
        plan_item = tour.plan_items[0]
        next_plan_item = (
            self.session.query(CompetitionPlanItem)
            .filter(
                (CompetitionPlanItem.sp > plan_item.sp)
                & (CompetitionPlanItem.competition_id == tour.discipline.competition_id)
                & (CompetitionPlanItem.tour_id != None)
            )
            .order_by(CompetitionPlanItem.sp.asc())
            .first()
        )
        if next_plan_item is None:
            raise ApiError("errors.tour.no_next_tour")
        next_plan_item.tour.start(self.mk)

    def api_tour_permute_heat(self, tour_id: int, run_ids: List[int]) -> Any:
        tour = self.__get_model_for_update(Tour, tour_id)
        tour.permute_within_heat(run_ids, self.mk)

    def api_tour_stop(self, tour_id: int) -> Any:
        self.__get_model_for_update(Tour, tour_id).stop(self.mk)

    def api_tour_shuffle_heats(self, tour_id: int) -> Any:
        tour = self.__get_model_for_update(Tour, tour_id, {"runs": {"participant": {}}})
        tour.shuffle_heats(self.mk, preserve_existing=False)

    def api_tour_confirm_heat(
        self, discipline_judge_id: int, tour_id: int, heat: int
    ) -> Any:
        tour = Tour.get(self.session, tour_id)
        discipline_judge = DisciplineJudge.get(self.session, discipline_judge_id)
        if tour.competition_id != discipline_judge.competition_id:
            raise ApiError("errors.auth.not_authenticated")
        if not self.request.is_superuser():
            auth = discipline_judge.get_auth(self.request.client)
            if auth.access_level in (AccessLevel.NONE, AccessLevel.PRESENTER):
                raise ApiError("errors.auth.not_authenticated")
            if (
                auth.access_level == AccessLevel.JUDGE
                and auth.judge_id != discipline_judge.judge_id
            ):
                raise ApiError("errors.auth.not_authenticated")
        tour.confirm_heat(discipline_judge, heat, self.mk)

    def api_tour_confirm_judge(self, discipline_judge_id: int, tour_id: int) -> Any:
        tour = Tour.get(self.session, tour_id)
        discipline_judge = DisciplineJudge.get(self.session, discipline_judge_id)
        if tour.competition_id != discipline_judge.competition_id:
            raise ApiError("errors.auth.not_authenticated")
        if not self.request.is_superuser():
            auth = discipline_judge.get_auth(self.request.client)
            if auth.access_level in (AccessLevel.NONE, AccessLevel.PRESENTER):
                raise ApiError("errors.auth.not_authenticated")
            if (
                auth.access_level == AccessLevel.JUDGE
                and auth.judge_id != discipline_judge.judge_id
            ):
                raise ApiError("errors.auth.not_authenticated")
        tour.set_judge_scores_confirmation(discipline_judge, True, self.mk)

    def api_tour_unconfirm_judge(self, discipline_judge_id: int, tour_id: int) -> Any:
        tour = Tour.get(self.session, tour_id)
        discipline_judge = DisciplineJudge.get(self.session, discipline_judge_id)
        if tour.competition_id != discipline_judge.competition_id:
            raise ApiError("errors.auth.not_authenticated")
        if not self.request.is_superuser():
            auth = discipline_judge.get_auth(self.request.client)
            if auth.access_level != AccessLevel.ADMIN:
                raise ApiError("errors.auth.not_authenticated")
        tour.set_judge_scores_confirmation(discipline_judge, False, self.mk)

    def api_tour_reset_judge(self, discipline_judge_id: int, tour_id: int) -> Any:
        tour = Tour.get(self.session, tour_id)
        discipline_judge = DisciplineJudge.get(self.session, discipline_judge_id)
        if tour.competition_id != discipline_judge.competition_id:
            raise ApiError("errors.auth.not_authenticated")
        if not self.request.is_superuser():
            auth = discipline_judge.get_auth(self.request.client)
            if auth.access_level != AccessLevel.ADMIN:
                raise ApiError("errors.auth.not_authenticated")
        tour.reset_judge_scores(discipline_judge, self.mk)

    def api_run_load_program(self, run_id: int, program_id: Optional[int]) -> Any:
        run = self.__get_model_for_update(Run, run_id)
        if program_id is not None:
            program: Optional[Program] = Program.get(self.session, program_id)
            if run.participant_id != program.participant_id:
                raise ApiError("errors.program.wrong_participant")
        else:
            program = None
        run.load_acrobatics(program, self.mk)

    def api_run_reset(self, run_id: int) -> Any:
        self.__get_model_for_update(Run, run_id).reset(self.mk)

    def api_service_get_db_schema(self) -> Any:
        return [
            model_type.get_model_descriptor() for model_type in db.import_all_models()
        ]

    def api_service_refresh_clients(self) -> Any:
        self.broadcast_message = "refresh"

    def api_auth_start_registration(self) -> Any:
        client = Client.create(self.session, {}, self.mk)
        return client.dh_bundle.serialize()

    def api_auth_complete_registration(
        self, client_id: int, data: Dict[str, str]
    ) -> Any:
        client = Client.get(self.session, client_id)
        client.finalize_model(data)
        return {"verification_string": client.verification_string}

    def api_service_report_js_error(self, *args: Any, **kwargs: Any) -> Any:
        pass  # TODO
