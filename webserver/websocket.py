import copy
import json
import time

from collections import OrderedDict

from sockjs.tornado import SockJSConnection


class WebSocketClients(SockJSConnection):
    clients = {}
    pending_messages = {}
    next_to_send = 1
    counter = 0

    @classmethod
    def get_counter_val(cls):
        cls.counter += 1
        return cls.counter

    def on_message(self, msg):
        pass

    def on_open(self, request):
        ws_client_id = str(int(10**6 * time.time()))
        self.clients[ws_client_id] = self
        self.send(json.dumps({
            "ws_client_id": ws_client_id
        }))

    def on_close(self):
        for key, val in self.clients.items():
            if val is self:
                del self.clients[key]

    @classmethod
    def broadcast(cls, counter_val, msg, ws_client_id=None):
        if len(cls.clients) == 0:
            return
        cls.pending_messages[counter_val] = (msg, ws_client_id)
        while cls.next_to_send in cls.pending_messages:
            message, cl_id = cls.pending_messages[cls.next_to_send]
            if message is not None:
                clients = copy.copy(cls.clients)
                json_message = json.dumps(message, ensure_ascii=False)
                if cl_id in cls.clients:
                    cls.clients[cl_id].send(json_message)
                    del clients[cl_id]
                if len(clients) > 0:
                    super(cls, list(clients.values())[0]).broadcast(clients.values(), json_message)
            del cls.pending_messages[cls.next_to_send]
            cls.next_to_send += 1


class WsMessage:
    def __init__(self, ws_client_id=None):
        self.ws_client_id = ws_client_id
        self.model_updates = []
        self.tour_results_updates = set()
        self.messages = []

    def add_model_update(self, model_type, model_id, schema=None):
        if schema is None:
            schema = {}
        self.model_updates.append({
            "model_type": model_type,
            "model_id": model_id,
            "schema": schema,
        })

    def add_tour_results_update(self, tour_id):
        self.tour_results_updates.add(tour_id)

    def add_message(self, message, data=None):
        self.messages.append((message, data, ))

    @classmethod
    def merge_schemas(cls, base, new):
        for k, v in new.items():
            if k in base:
                cls.merge_schemas(base[k], v)
            else:
                base[k] = v

    def serialize(self):
        from models import Tour
        schemas = OrderedDict()
        for x in self.model_updates:
            key = (x["model_type"], x["model_id"])
            if key not in schemas:
                schemas[key] = {}
            self.merge_schemas(schemas[key], x["schema"])
        updates = []
        for (model_type, model_id), schema in schemas.items():
            model = model_type.get(model_type.id == model_id)
            model.smart_prefetch(schema)
            updates.append(model.serialize_as_child(schema))
        for tour_id in self.tour_results_updates:
            discipline = Tour.get(id=tour_id).discipline
            discipline.prefetch_for_results()
            tour = next(t for t in discipline.tours if t.id == tour_id)
            updates.append(tour.serialize_as_child({
                "discipline": {
                    "results": {},
                },
                "results": {},
            }))
        return {
            "model_updates": updates,
            "messages": self.messages,
        }

    def send(self):
        counter_val = WebSocketClients.get_counter_val()
        try:
            WebSocketClients.broadcast(counter_val, self.serialize(), self.ws_client_id)
        except Exception as ex:
            WebSocketClients.broadcast(counter_val, None)
            raise ex

    def empty(self):
        return self.model_updates == [] and self.messages == []
