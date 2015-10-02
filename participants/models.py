import peewee

from db import Database


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


class Acrobatic(peewee.Model):
    class Meta:
        database = Database.instance().db
        order_by = ["number"]

    participant = peewee.ForeignKeyField(Participant, related_name="acrobatics")
    number = peewee.IntegerField()
    description = peewee.CharField()
    score = peewee.IntegerField()

    def serialize(self):
        return {
            "id": self.id,
            "number": self.number,
            "description": self.description,
            "score": self.score,
        }
