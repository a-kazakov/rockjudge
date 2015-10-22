import peewee

from models.base_model import BaseModel
from models.participant import Participant


class Sportsman(BaseModel):
    class Meta:
        order_by = ["gender", "last_name", "first_name"]

    participant = peewee.ForeignKeyField(Participant, related_name="sportsmen")
    first_name = peewee.CharField()
    last_name = peewee.CharField()
    year_of_birth = peewee.IntegerField()
    gender = peewee.CharField(max_length=1, choices=(("F", "Female"), ("M", "Male"),))

    RW_PROPS = ["first_name", "last_name", "gender", "year_of_birth"]

    @property
    def full_name(self):
        return "{} {}".format(self.last_name, self.first_name)

    @classmethod
    def load_models(cls, participant, objects):
        for obj in objects:
            cls.create(participant=participant, **obj)
