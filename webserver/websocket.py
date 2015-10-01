import json

from sockjs.tornado import SockJSConnection


class WebSocketClients(SockJSConnection):
    clients = set()

    def on_message(self, msg):
        pass

    def on_open(self, request):
        self.clients.add(self)

    def on_close(self):
        self.clients.discard(self)

    @classmethod
    def broadcast(cls, msg_type, msg_data):
        if len(cls.clients) == 0:
            return
        json_message = json.dumps({
            "type": msg_type,
            "data": msg_data,
        })
        super(WebSocketClients, next(iter(cls.clients))).broadcast(cls.clients, json_message)
