import peewee

from models.base_model import BaseModel
from models.participant import Participant


class Acrobatic(BaseModel):
    class Meta:
        order_by = ["number"]

    participant = peewee.ForeignKeyField(Participant, related_name="acrobatics")
    number = peewee.IntegerField()
    description = peewee.CharField()
    score = peewee.DoubleField()

    RW_PROPS = ["number", "description", "score"]

    @classmethod
    def load_models(cls, participant, objects):
        for number, obj in enumerate(objects, start=1):
            cls.create(participant=participant, number=number, **obj)
