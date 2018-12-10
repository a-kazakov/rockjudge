import asyncio
import time
from abc import ABCMeta, abstractmethod
from typing import Any, Dict, List, TYPE_CHECKING
from uuid import uuid4

from sqlalchemy.orm import Session

from api import ApiResponse
from exceptions import InternalError
from mutations import DisciplineResultsMutationRecord, FetchedMutations, FinalizedMutations, MutationsKeeper
from utils import DbQueriesLogger, raise_if_none
from webserver.messages import BaseOutgoingMessage, MutationsPushOutgoingMessage


if TYPE_CHECKING:
    from webserver.websocket import WsClientId


class BasePostProcessor(metaclass=ABCMeta):
    def __init__(self, api_response: ApiResponse, session: Session) -> None:
        self.api_response = api_response
        self.session = session
        self.uuid = uuid4().hex
        self._db_logger = DbQueriesLogger(
            self.session.connection(),
            f"Postprocessor ({api_response.request.method.value})"
        )
        self._start_time = time.monotonic()

    @property
    def postponed_discipline_updates(self) -> List[DisciplineResultsMutationRecord]:
        return []

    @abstractmethod
    async def prepare(self) -> None:
        pass

    @abstractmethod
    def get_clients_messages(self) -> Dict["WsClientId", BaseOutgoingMessage]:
        pass

    def _fetch_mutations(
        self,
        mutations: FinalizedMutations,
        *,
        fetch_results: bool = False,
        skip_prefetch: bool = False,
    ) -> FetchedMutations:
        return mutations.fetch(self.session, fetch_results=fetch_results, skip_prefetch=skip_prefetch)

    def _log_stats(self) -> None:
        if self._start_time is None:
            total_time = 0.0
        else:
            total_time = time.monotonic() - self._start_time
        request = self.api_response.request
        client_id = (
            request.opt_client.id
            if request.opt_client is not None
            else "NEW"
        )
        self._db_logger.finalize()
        print(
            f"Postprocessor: {request.method.value:<35s} "
            f"Client ID: {client_id:<3} "
            f"Time: {total_time:<.3f}s "
            f"DB queries: {self._db_logger.queries_count:<4}"
        )


class PublicPostProcessor(BasePostProcessor):
    # PostProcessor responsible for pushing mutated models to all clients

    def __init__(self, api_response: ApiResponse, session: Session) -> None:
        super().__init__(api_response, session)
        self.__clients_messages: Dict["WsClientId", MutationsPushOutgoingMessage] = {}
        if api_response.new_subscription is not None:
            raise InternalError("Public post processor can't process API response with new subscriptions")

    async def prepare(self) -> None:
        from webserver.websocket import WebSocketConnectionsManager
        all_mutations = await asyncio.get_event_loop().run_in_executor(
            None,
            self._fetch_mutations,
            self.api_response.mutations,
        )
        ws_manager = WebSocketConnectionsManager.instance()
        connections = ws_manager.get_all_connections()
        for conn in connections:
            conn_mutations = all_mutations.filter_for_subscriptions(conn.subscriptions)
            self.__clients_messages[conn.client_id] = MutationsPushOutgoingMessage(conn_mutations, is_initial=False)
        self._log_stats()

    @property
    def postponed_discipline_updates(self) -> List[DisciplineResultsMutationRecord]:
        return self.api_response.mutations.discipline_results_mutations

    def get_clients_messages(self) -> Dict["WsClientId", MutationsPushOutgoingMessage]:
        return raise_if_none(self.__clients_messages)


class PrivatePostProcessor(BasePostProcessor):
    # PostProcessor responsible for pushing initial models to one client
    def __init__(self, api_response: ApiResponse, session: Session, ws_client_id: "WsClientId") -> None:
        super().__init__(api_response, session)
        self.ws_client_id = ws_client_id
        self.__response: Any = None
        if api_response.mutations:
            raise InternalError("Private post processor can't process API response with DB mutations")
        if api_response.new_subscription is None:
            raise InternalError("Private post processor can't process API response without new subscriptions")

    async def prepare(self) -> None:
        mk = MutationsKeeper()
        self.api_response.new_subscription.add_initial_models_to_mk(self.session, mk)
        mutations = await asyncio.get_event_loop().run_in_executor(
            None,
            lambda: self._fetch_mutations(mk.finalize(), skip_prefetch=True, fetch_results=True)
        ) # prefetched by add_initial_models_to_mk
        self.__response = MutationsPushOutgoingMessage(
            mutations.filter_for_subscriptions([self.api_response.new_subscription]),
            is_initial=True,
            subscription_id=self.api_response.new_subscription.subscription_id,
        )
        self._log_stats()

    def get_clients_messages(self) -> Dict["WsClientId", MutationsPushOutgoingMessage]:
        return {
            self.ws_client_id: self.__response,
        }
