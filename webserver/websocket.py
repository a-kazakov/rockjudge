import asyncio
import json
import time
from enum import Enum, auto
from traceback import print_exc
from typing import Any, Dict, Generator, List, NewType, Optional, Set, TYPE_CHECKING

import tornado.ioloop
import tornado.websocket
from sqlalchemy.orm import Session

from api import Api, ApiMethod, ApiRequest, ApiResponse
from db import db
from exceptions import ApiError
from models.client import Client
from mutations import DisciplineResultsMutationRecord, FetchedMutations, FinalizedMutations, MutationsKeeper
from postprocessor import BasePostProcessor, PrivatePostProcessor, PublicPostProcessor
from subscriptions import SubscriptionBase
from utils import DbQueriesLogger, catch_all_async
from webserver.messages import (
    ApiResponseOutgoingMessage,
    BaseOutgoingMessage,
    MutationsPushOutgoingMessage,
    BroadcastOutgoingMessage,
)


if TYPE_CHECKING:
    pass


WsClientId = NewType("WsClientId", int)


class PostProcessorQueue:
    def __init__(self) -> None:
        self.__pp_by_uuid: Dict[str, BasePostProcessor] = {}
        self.__uuid_by_number: Dict[str, int] = {}
        self.__latest_number_issued = 0
        self.__latest_number_flushed = 0
        self.__ready_post_processors: Set[str] = set()
        self.__broken_post_processors: Set[str] = set()

    def __get_next_number(self) -> int:
        self.__latest_number_issued += 1
        return self.__latest_number_issued

    def register(self, pp: BasePostProcessor) -> None:
        number = self.__get_next_number()
        self.__pp_by_uuid[pp.uuid] = pp
        self.__uuid_by_number[number] = pp.uuid

    def mark_ready(self, pp: BasePostProcessor) -> None:
        self.__ready_post_processors.add(pp.uuid)

    def finalize(self, pp: BasePostProcessor) -> None:
        if pp.uuid not in self.__ready_post_processors and pp.uuid in self.__pp_by_uuid:
            self.__ready_post_processors.add(pp.uuid)
            self.__broken_post_processors.add(pp.uuid)

    def _flush(self) -> Generator[BasePostProcessor, None, None]:
        while True:
            if self.__latest_number_flushed == self.__latest_number_issued:
                return
            number = self.__latest_number_flushed + 1
            uuid = self.__uuid_by_number[number]
            if uuid not in self.__ready_post_processors:
                return
            if uuid not in self.__broken_post_processors:
                yield self.__pp_by_uuid[uuid]
            del self.__pp_by_uuid[uuid]
            del self.__uuid_by_number[number]
            self.__ready_post_processors.discard(uuid)
            self.__broken_post_processors.discard(uuid)
            self.__latest_number_flushed = number

    def flush(self) -> List[BasePostProcessor]:
        return list(self._flush())


class DisciplineResultsPostponedUpdaterStatus(Enum):
    IDLE = auto()
    WORKING = auto()
    PENDING = auto()


class DisciplineResultsPostponedUpdater:
    _instance: Optional["DisciplineResultsPostponedUpdater"] = None

    @classmethod
    def instance(cls) -> "DisciplineResultsPostponedUpdater":
        if not cls._instance:
            cls._instance = cls()
        return cls._instance

    def __init__(self) -> None:
        self.__mutation_records: List[DisciplineResultsMutationRecord] = []
        self.__status = DisciplineResultsPostponedUpdaterStatus.IDLE
        self.__completed_at = 0.0

    @property
    def is_waiting(self) -> bool:
        return bool(self.__mutation_records)

    def add(self, records: List[DisciplineResultsMutationRecord]) -> None:
        self.__mutation_records += records
        self.maybe_schedule_flush()

    def maybe_schedule_flush(self) -> None:
        if not self.__mutation_records:
            return
        if self.__status != DisciplineResultsPostponedUpdaterStatus.IDLE:
            return
        delay = max(0.25, self.__completed_at + 0.75 - time.monotonic())
        tornado.ioloop.IOLoop.instance().call_later(delay, self.flush)
        self.__status = DisciplineResultsPostponedUpdaterStatus.PENDING

    async def flush(self) -> None:
        self.__status = DisciplineResultsPostponedUpdaterStatus.WORKING
        records = self.__mutation_records
        self.__mutation_records = []
        session = db.make_session()
        db_logger = DbQueriesLogger(session.connection(), f"Postponed results fetch")
        start_time = time.monotonic()
        try:
            mk = MutationsKeeper()
            mk.discipline_results_mutations = records
            all_mutations = await asyncio.get_event_loop().run_in_executor(
                None,
                self._fetch_mutations,
                session,
                mk.finalize(),
            )
            ws_manager = WebSocketConnectionsManager.instance()
            connections = ws_manager.get_all_connections()
            for conn in connections:
                conn_mutations = all_mutations.filter_for_subscriptions(conn.subscriptions)
                await conn.send_message(MutationsPushOutgoingMessage(conn_mutations, is_initial=False))
        finally:
            db.close_session(session)
            total_time = time.monotonic() - start_time
            print(
                f"Results push: "
                f"Time: {total_time:<.3f}s "
                f"DB queries: {db_logger.queries_count:<4}"
            )
            self.__status = DisciplineResultsPostponedUpdaterStatus.IDLE
            self.maybe_schedule_flush()

    def _fetch_mutations(self, session: Session, mutations: FinalizedMutations) -> FetchedMutations:
        return mutations.fetch(session, fetch_results=True)


class WebSocketConnectionsManager:
    _instance: "WebSocketConnectionsManager" = None

    @classmethod
    def instance(cls) -> "WebSocketConnectionsManager":
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        self._latest_client_id = 0
        self._connections: Dict[WsClientId, WebSocketHandler] = {}
        self._latest_issued_token = 0
        self._next_token_to_send = 1
        self._pending_messages = {}

    def add_connection(self, conn: "WebSocketHandler") -> WsClientId:
        self._latest_client_id += 1
        client_id = WsClientId(self._latest_client_id)
        self._connections[client_id] = conn
        conn.client_id = client_id
        return client_id

    def get_all_connections(self) -> List["WebSocketHandler"]:
        return list(self._connections[k] for k in sorted(self._connections.keys()))

    def remove_connection(self, client_id):
        self._connections.pop(client_id, None)

    def __get_connections_for_postprocessor(self, pp: BasePostProcessor) -> List["WebSocketHandler"]:
        if isinstance(pp, PrivatePostProcessor):
            conn = self._connections.get(pp.ws_client_id)
            if conn is None:
                return []
            return [conn]
        return self.get_all_connections()

    def register_postprocessor(self, pp: BasePostProcessor) -> None:
        for conn in self.__get_connections_for_postprocessor(pp):
            conn.pp_queue.register(pp)

    async def mark_postprocessor_ready(self, pp: BasePostProcessor) -> None:
        for conn in self.__get_connections_for_postprocessor(pp):
            conn.pp_queue.mark_ready(pp)
            await conn.send_pending_messages()

    async def finalize_postprocessor(self, pp: BasePostProcessor) -> None:
        for conn in self.__get_connections_for_postprocessor(pp):
            conn.pp_queue.finalize(pp)
            await conn.send_pending_messages()

    @staticmethod
    def encode_message(message_object):
        json_message = json.dumps(message_object, ensure_ascii=False)
        return json_message


class WebSocketHandler(tornado.websocket.WebSocketHandler):
    client_id: WsClientId

    def __init__(self, *args: Any, **kwargs: Any) -> None:
        super().__init__(*args, **kwargs)
        self.subscriptions: List[SubscriptionBase] = []
        self.pp_queue = PostProcessorQueue()

    @catch_all_async
    async def on_message(self, msg: str) -> None:
        await asyncio.sleep(1)
        signature, json_data = msg.split("|", 1)
        data = json.loads(json_data)
        method = ApiMethod(data["method"])
        request = ApiRequest(
            opt_client=None,
            remote_ip=self.request.remote_ip,
            host=self.request.host,
            method=method,
            params=data["params"],
            response_key=data.get("response_key"),
        )
        try:
            response = await self.process_request(request, data, json_data, signature)
        except ApiError as ex:
            response = ApiResponse(
                request=request,
                error_code=ex.code,
                error_args=ex.args,
            )
        except Exception as ex:
            print_exc()
            response = ApiResponse(
                request=request,
                error_code="errors.global.internal_server_error",
                error_args=(),
            )
        if response.request.response_key:
            message = ApiResponseOutgoingMessage(response)
            await self.send_message(message)

    async def process_request(
        self,
        request: ApiRequest,
        raw_data: Dict[str, Any],
        str_data: str,
        signature: str,
    ) -> ApiResponse:
        manager = WebSocketConnectionsManager.instance()
        session = db.make_session()
        if request.method not in (ApiMethod.AUTH_START_REGISTRATION, ApiMethod.AUTH_COMPLETE_REGISTRATION,):
            client = Client.get_and_validate(
                session=session,
                client_id=raw_data["client_id"],
                method=request.method,
                str_data=str_data,
                random=raw_data["random"],
                signature=signature,
            )
            request = request.with_client(client)
        api_executor = Api(request, session)
        response = await api_executor.execute()

        if response.success:
            try:
                if response.broadcast_message is not None:
                    msg = BroadcastOutgoingMessage(response.broadcast_message)
                    for conn in manager.get_all_connections():
                        await conn.send_message(msg)
                if response.remove_subscription is not None:
                    self.subscriptions = [
                        s
                        for s in self.subscriptions
                        if s.subscription_id != response.remove_subscription
                    ]
                if response.new_subscription is not None:
                    self.subscriptions.append(response.new_subscription)
                    if len(self.subscriptions) > 3:
                        print(
                            f"WARNING: Too many subscriptions for client {request.opt_client or 'NEW'}: "
                            f"{len(self.subscriptions)}"
                        )
                    postprocessor: BasePostProcessor = PrivatePostProcessor(
                        response,
                        api_executor.next_session,
                        self.client_id,
                    )
                else:
                    postprocessor = PublicPostProcessor(response, api_executor.next_session)

                try:
                    manager.register_postprocessor(postprocessor)
                    await postprocessor.prepare()
                    DisciplineResultsPostponedUpdater.instance().add(postprocessor.postponed_discipline_updates)
                    await manager.mark_postprocessor_ready(postprocessor)
                finally:
                    await manager.finalize_postprocessor(postprocessor)
            finally:
                if api_executor.next_session:
                    db.close_session(api_executor.next_session)
        return response

    async def send_pending_messages(self) -> None:
        postprocessors = self.pp_queue.flush()
        for pp in postprocessors:
            message = pp.get_clients_messages().get(self.client_id)
            if message is not None:
                await self.send_message(message)

    async def send_message(self, msg: BaseOutgoingMessage) -> None:
        serialized = msg.serialize()
        if serialized is None:
            return
        msg_str = json.dumps(serialized, ensure_ascii=False)
        await self.write_message(msg_str)

    def open(self):
        manager = WebSocketConnectionsManager.instance()
        self.client_id = manager.add_connection(self)

    def on_close(self):
        WebSocketConnectionsManager.instance().remove_connection(self.client_id)

    def get_compression_options(self):
        return {
            "compression_level": 4,
            "mem_level": 9,
        }
