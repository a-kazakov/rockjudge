import peewee

from db import BaseModel


class Participant(BaseModel):
    class Meta:
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


class Acrobatic(BaseModel):
    class Meta:
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
