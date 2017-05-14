import base64
import copy
import json
import lz4framed as lz4
import time

from collections import OrderedDict

import tornado.ioloop

from sockjs.tornado import SockJSConnection

from db import Database


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
        self._pending_messages[token] = None
        self._flush_queue()

    @staticmethod
    def encode_message(message_object):
        json_message = json.dumps(message_object, ensure_ascii=False)
        lz4_message = lz4.compress(json_message.encode("utf-8"), level=4)
        b64_message = base64.b64encode(lz4_message)
        return b64_message

    def queue_message(self, token, message_object, client_id=None, broadcast=False):
        message_binary = self.encode_message(message_object)
        if token is None:  # Independent from db state message
            self._send_message((message_binary, client_id, broadcast, ))
            return
        self._pending_messages[token] = (message_binary, client_id, broadcast, )
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
            conn.send(message_binary)
        if broadcast:
            for conn_client_id, conn in self._connections.items():
                if client_id == conn_client_id:  # Already sent
                    continue
                conn.send(message_binary)


class WebSocketClients(SockJSConnection):
    _client_id = None

    def on_message(self, msg):
        pass

    def on_open(self, request):
        manager = WebSocketConnectionsManager.instance()
        self._client_id = manager.add_connection(self)
        manager.queue_message(token=None, message_object={
            "ws_client_id": self._client_id
        })

    def on_close(self):
        WebSocketConnectionsManager.instance().remove_connection(self._client_id)


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
            self._latest_update = 0
            self._is_waiting = False
        if self._is_waiting:
            return None
        t = time.time()
        to_wait = self._latest_update - t + 0.75
        self._latest_update = t
        if to_wait > 0:
            self._is_waiting = True
            tornado.ioloop.IOLoop.instance().call_later(
                to_wait,
                self._push_results,
            )
            return None
        return self._fetch_results()

    def _fetch_results(self):
        from models import Tour
        discipline = Tour.get(id=self._tour_id).discipline
        discipline.prefetch_for_results()
        tour = next(t for t in discipline.tours if t.id == self._tour_id)
        return tour.serialize_as_child({
            "discipline": {
                "results": {},
            },
            "results": {},
        })

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
        self._empty = True

    def make_transaction_and_send(self):
        if self._empty:
            return
        manager = WebSocketConnectionsManager.instance()
        with Database.instance().db.transaction():
            token = manager.request_message_token()
            try:
                data = self.serialize()
            except Exception:
                manager.invalidate_message_token(token)
                raise
        manager.queue_message(
            token=token,
            message_object=data,
            client_id=self._client_id,
            broadcast=self._broadcast,
        )

    # Requests

    def add_model_update(self, model_type, model_id, schema=None):
        self._empty = False
        if schema is None:
            schema = {}
        self._model_updates.append({
            "model_type": model_type,
            "model_id": model_id,
            "schema": schema,
        })

    def add_tour_results_update(self, tour_id, immediate=False):
        self._empty = False
        self._tour_results_updates.append((
            tour_id,
            immediate,
        ))

    def add_active_tours_update(self, competition_id):
        self._empty = False
        self._active_tours_updates.add(competition_id)

    def add_message(self, message, data=None):
        self._empty = False
        self._messages.append((
            message,
            data,
        ))

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
        updates = []
        messages = copy.copy(self._messages)
        # Models
        schemas = OrderedDict()
        for x in self._model_updates:
            key = (x["model_type"], x["model_id"])
            if key not in schemas:
                schemas[key] = {}
            self.merge_schemas(schemas[key], x["schema"])
        for (model_type, model_id), schema in schemas.items():
            try:
                model = model_type.get(model_type.id == model_id)
                model.smart_prefetch(schema)
                updates.append(model.serialize_as_child(schema))
            except model_type.DoesNotExist:
                if self._recepient is not None:
                    messages.append(("error", "errors.model_does_not_exist.{}".format(model_type.__name__.lower()), ))
        # Active tours
        for competition_id in self._active_tours_updates:
            active_tours = Competition.get(id=competition_id).get_active_tours()
            for tour in active_tours:
                tour.smart_prefetch({
                    "discipline": {
                        "discipline_judges": {},
                    },
                })
            messages.append(("active_tours_update", {
                "competition_id": competition_id,
                "active_tours": [{
                    "tour_id": tour.id,
                    "judges": [dj.judge_id for dj in tour.discipline_judges],
                } for tour in active_tours],
            }))
        # Tour results
        for tour_id, immediate in self._tour_results_updates:
            upd = TourResultsUpdateGetter.instance(tour_id).get_results(force=immediate)
            if upd is not None:
                updates.append(upd)
        return {
            "model_updates": updates,
            "messages": messages,
        }
