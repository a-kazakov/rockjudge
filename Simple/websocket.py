import json

import tornado.websocket


class WebSocketClients:
    clients = set()

    @classmethod
    def add(cls, cl):
        cls.clients.add(cl)

    @classmethod
    def remove(cls, cl):
        cls.clients.discard(cl)

    @classmethod
    def broadcast(cls, message):
        json_message = json.dumps(message)
        for cl in cls.clients:
            cl.write_message(json_message)


class WebSocketHandler(tornado.websocket.WebSocketHandler):
    def open(self):
        WebSocketClients.add(self)

    def on_close(self):
        WebSocketClients.remove(self)
