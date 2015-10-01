import peewee

from db import Database

from webserver.websocket import WebSocketClients


class Participant(peewee.Model):
    class Meta:
        database = Database.instance().db
        indexes = (
            (("number", "competition"), True),
        )
        order_by = ["number"]

    name = peewee.CharField()
    number = peewee.IntegerField()

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "number": self.number,
        }
