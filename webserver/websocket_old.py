import copy
import json
import traceback

from collections import OrderedDict, defaultdict
from typing import List, Dict, Type, Tuple, Any, TYPE_CHECKING, NamedTuple

import tornado.ioloop
import tornado.websocket

from db import Database, StatsCounter
from models import Client


if TYPE_CHECKING:
    from models.base_model import BaseModel  # noqa


SchemaType = Dict[str, Dict[str, Dict[str, Dict[str, Dict[str, Any]]]]]


class ApiRequest(NamedTuple):
    client: Client
    remote_ip: str

    def is_superuser(self) -> bool:
        return self.remote_ip == "127.0.0.1"


class WebSocketConnectionsManager:
    _instance = None

    @classmethod
    def instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        self._latest_client_id = 0
        self._connections = {}
        self._latest_issued_token = 0
        self._next_token_to_send = 1
        self._pending_messages = {}

    def add_connection(self, conn):  # Returns client_id
        self._latest_client_id += 1
        client_id = self._latest_client_id
        self._connections[client_id] = conn
        return client_id

    def remove_connection(self, client_id):
        self._connections.pop(client_id, None)

    def request_message_token(self):
        self._latest_issued_token += 1
        return self._latest_issued_token

    def invalidate_message_token(self, token):
        if token not in self._pending_messages:
            self._pending_messages[token] = None
            self._flush_queue()

    @staticmethod
    def encode_message(message_object):
        json_message = json.dumps(message_object, ensure_ascii=False)
        return json_message

    def queue_message(self, token, message_object, client_id=None, broadcast=False):
        message_binary = self.encode_message(message_object)
        if token is None:  # Independent from db state message
            self._send_message((message_binary, client_id, broadcast))
            return
        self._pending_messages[token] = (message_binary, client_id, broadcast)
        self._flush_queue()

    def _flush_queue(self):
        while self._next_token_to_send in self._pending_messages:
            message = self._pending_messages.pop(self._next_token_to_send)
            if message is not None:
                self._send_message(message)
            self._next_token_to_send += 1

    def _send_message(self, msg_data):
        message_binary, client_id, broadcast = msg_data
        if client_id is not None:
            conn = self._connections.get(client_id)
            if conn is None:
                return
            conn.write_message(message_binary)
        if broadcast:
            for conn_client_id, conn in self._connections.items():
                if client_id == conn_client_id:  # Already sent
                    continue
                conn.write_message(message_binary)


class WebSocketHandler(tornado.websocket.WebSocketHandler):
    _client_id = None

    def on_message(self, msg):
        from api import ApiRequestOld, ApiError
        from models import Client

        with StatsCounter() as stats:
            public_ws_message = WsMessage(client_id=self._client_id, broadcast=True)
            private_ws_message = WsMessage(client_id=self._client_id, broadcast=False)
            method = ""
            try:
                signature, json_data = msg.split("|", 1)
                data = json.loads(json_data)
                method = data["method"]
                if method not in ("auth.register", "auth.exchange_keys"):
                    client = Client.get_and_validate(
                        client_id=data["client_id"],
                        method=data["method"],
                        str_data=json_data,
                        random=data["random"],
                        signature=signature,
                    )
                else:
                    client = None
                request = ApiRequestOld(
                    method=data["method"],
                    body=data["params"],
                    client=client,
                    remote_ip=self.request.remote_ip,
                    ws_message=public_ws_message,
                    private_ws_message=private_ws_message,
                    response_key=data["response_key"],
                )
                private_ws_message.add_api_call(request)
            except ApiError as ex:
                if data["response_key"] is not None:
                    private_ws_message.add_api_response(
                        data["response_key"],
                        {"success": False, "code": ex.code, "args": ex.args},
                    )
            except Exception:
                ex_str = traceback.format_exc()
                print(ex_str)
                if data["response_key"] is not None:
                    private_ws_message.add_api_response(
                        data["response_key"],
                        {
                            "success": False,
                            "code": "errors.global.internal_server_error",
                        },
                    )
            finally:
                private_ws_message.make_transaction_and_send()
                public_ws_message.make_transaction_and_send()
                print(
                    "Api call: {:<35s} {:4d}ms {:4d} queries".format(
                        method, stats.time, stats.queries
                    )
                )

    def open(self):
        manager = WebSocketConnectionsManager.instance()
        self._client_id = manager.add_connection(self)

    def on_close(self):
        WebSocketConnectionsManager.instance().remove_connection(self._client_id)

    def get_compression_options(self):
        return {"compression_level": 4, "mem_level": 9}


class TourResultsUpdateGetter:
    _instances = {}

    @classmethod
    def instance(cls, tour_id):
        if tour_id not in cls._instances:
            cls._instances[tour_id] = cls(tour_id)
        return cls._instances[tour_id]

    def __init__(self, tour_id):
        self._tour_id = tour_id
        self._latest_update = 0
        self._is_waiting = False

    def get_results(self, force=False):
        if force:
            # self._latest_update = 0
            self._is_waiting = False
            return self._fetch_results()
        if self._is_waiting:
            return None
        # t = time.time()
        # to_wait = self._latest_update - t + 0.75
        # self._latest_update = t
        # if to_wait > 0:
        self._is_waiting = True
        tornado.ioloop.IOLoop.instance().call_later(0.75, self._push_results)
        return None
        # return self._fetch_results()

    def _fetch_results(self):
        from models import Tour

        discipline = Tour.get(id=self._tour_id).discipline
        discipline.prefetch_for_results()
        tour = next(t for t in discipline.tours if t.id == self._tour_id)
        return tour.serialize_as_child({"discipline": {"results": {}}, "results": {}})

    def _push_results(self):
        if not self._is_waiting:
            return
        ws_message = WsMessage(broadcast=True)
        ws_message.add_tour_results_update(self._tour_id, immediate=True)
        ws_message.make_transaction_and_send()
        print("Pushed separate results update")


class WsMessage:
    def __init__(self, client_id=None, broadcast=False):
        self._client_id = client_id
        self._broadcast = broadcast
        self._model_updates = []
        self._tour_results_updates = []
        self._active_tours_updates = set()
        self._messages = []
        self._api_calls = []
        self._api_responses = {}
        self._need_transaction = False
        self._empty = True

    def make_transaction_and_send(self):
        if self._empty:
            return
        manager = WebSocketConnectionsManager.instance()
        with Database.instance().db.transaction():
            token = manager.request_message_token()
            try:
                data = self.serialize()
                if data is not None:
                    manager.queue_message(
                        token=token,
                        message_object=data,
                        client_id=self._client_id,
                        broadcast=self._broadcast,
                    )
            finally:
                manager.invalidate_message_token(token)

    def send_no_transaction(self):
        if self._empty:
            return
        data = self.serialize()
        manager = WebSocketConnectionsManager.instance()
        if data is not None:
            manager.queue_message(
                token=None,  # No transaction -- no token
                message_object=data,
                client_id=self._client_id,
                broadcast=self._broadcast,
            )

    # Requests

    def add_model_update(self, model_type, model_id, schema=None):
        self._empty = False
        self._need_transaction = True
        if schema is None:
            schema = {}
        self._model_updates.append(
            {"model_type": model_type, "model_id": model_id, "schema": schema}
        )

    def add_tour_results_update(self, tour_id, immediate=False):
        self._empty = False
        self._need_transaction = True
        self._tour_results_updates.append((tour_id, immediate))

    def add_active_tours_update(self, competition_id):
        self._empty = False
        self._need_transaction = True
        self._active_tours_updates.add(competition_id)

    def add_message(self, message, data=None):
        self._empty = False
        self._messages.append((message, data))

    def add_api_call(self, request):
        self._empty = False
        self._api_calls.append(request)

    def add_api_response(self, response_key, response):
        self._empty = False
        self._api_responses[response_key] = response

    # Resolving

    @classmethod
    def merge_schemas(cls, base, new):
        for k, v in new.items():
            if k in base:
                cls.merge_schemas(base[k], v)
            else:
                base[k] = v

    def serialize(self):
        from models import Competition
        from api import Api

        messages = copy.copy(self._messages)
        updates = []
        # Models
        schemas = OrderedDict()
        for x in self._model_updates:
            key = (x["model_type"], x["model_id"])
            if key not in schemas:
                schemas[key] = {}
            self.merge_schemas(schemas[key], x["schema"])
        models_to_prefetch: Dict[Tuple[Type[BaseModel], str], List[int]] = defaultdict(
            list
        )
        schemas_by_json: Dict[str, SchemaType] = {}
        for (model_type, model_id), schema in schemas.items():
            try:
                schema_json = json.dumps(schema, sort_keys=False, check_circular=False)
                key = (model_type, schema_json)
                schemas_by_json[schema_json] = schema
                models_to_prefetch[key].append(model_id)
            except model_type.DoesNotExist:
                if self._recepient is not None:
                    messages.append(
                        (
                            "error",
                            "errors.model_does_not_exist.{}".format(
                                model_type.__name__.lower()
                            ),
                        )
                    )
        for (model_type, schema_json), model_ids in models_to_prefetch.items():
            models: List[BaseModel] = list(
                model_type.filter(model_type.id << model_ids)
            )
            schema = schemas_by_json[schema_json]
            model_type.smart_prefetch_multiple(models, schema)
            for model in models:
                updates.append(model.serialize_as_child(schema))
        # Active tours
        for competition_id in self._active_tours_updates:
            active_tours = Competition.get(id=competition_id).get_active_tours()
            for tour in active_tours:
                tour.smart_prefetch({"discipline": {"discipline_judges": {}}})
            messages.append(
                (
                    "active_tours_update",
                    {
                        "competition_id": competition_id,
                        "active_tours": [
                            {
                                "tour_id": tour.id,
                                "judges": [
                                    dj.judge_id for dj in tour.discipline_judges
                                ],
                            }
                            for tour in active_tours
                        ],
                    },
                )
            )
        # Tour results
        for tour_id, immediate in self._tour_results_updates:
            upd = TourResultsUpdateGetter.instance(tour_id).get_results(force=immediate)
            if upd is not None:
                updates.append(upd)
        # Api call
        api_responses = copy.copy(self._api_responses)
        for request in self._api_calls:
            result = Api.call(request)
            if request.response_key is not None:
                api_responses[request.response_key] = result
        if len(updates) > 0 or len(messages) > 0 or len(api_responses) > 0:
            return {
                "model_updates": updates,
                "messages": messages,
                "api_responses": api_responses,
            }
        return None
