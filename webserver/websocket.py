import json

from collections import OrderedDict

from sockjs.tornado import SockJSConnection


class WebSocketClients(SockJSConnection):
    clients = set()
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
        self.clients.add(self)

    def on_close(self):
        self.clients.discard(self)

    @classmethod
    def broadcast(cls, counter_val, msg):
        if len(cls.clients) == 0:
            return
        cls.pending_messages[counter_val] = msg
        while cls.next_to_send in cls.pending_messages:
            message = cls.pending_messages[cls.next_to_send]
            if message is not None:
                json_message = json.dumps(message)
                super(WebSocketClients, next(iter(cls.clients))).broadcast(cls.clients, json_message)
            del cls.pending_messages[cls.next_to_send]
            cls.next_to_send += 1


class WsMessage:
    def __init__(self):
        self.model_updates = []
        self.messages = []

    def add_model_update(self, model_type, model_id, schema=None):
        if schema is None:
            schema = {}
        self.model_updates.append({
            "model_type": model_type,
            "model_id": model_id,
            "schema": schema,
        })

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
        schemas = OrderedDict()
        for x in self.model_updates:
            key = (x["model_type"], x["model_id"])
            if key not in schemas:
                schemas[key] = {}
            self.merge_schemas(schemas[key], x["schema"])
        updates = []
        for (model_type, model_id), schema in schemas.items():
            updates.append(model_type.get(model_type.id == model_id).serialize_as_child(schema))
        return {
            "model_updates": updates,
            "messages": self.messages,
        }

    def send(self):
        counter_val = WebSocketClients.get_counter_val()
        try:
            WebSocketClients.broadcast(counter_val, self.serialize())
        except Exception as ex:
            WebSocketClients.broadcast(counter_val, None)
            raise ex

    def empty(self):
        return self.model_updates == [] and self.messages == []
