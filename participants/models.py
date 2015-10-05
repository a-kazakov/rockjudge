import peewee
import peewee_async
import tornado.gen

from db import BaseModel


inner_competition_proxy = peewee.Proxy()

class Club(BaseModel):
    name = peewee.CharField()
    city = peewee.CharField()

    @tornado.gen.coroutine
    def serialize(self):
        return {
            "name": self.name,
            "city": self.city,
        }


class Sportsman(BaseModel):
    first_name = peewee.CharField()
    last_name = peewee.CharField()
    gender = peewee.CharField(max_length=1, choices=(("F", "Female"), ("M", "Male"),))

    @property
    def full_name(self):
        return "{} {}".format(self.last_name, self.first_name)


class Participant(BaseModel):
    class Meta:
        indexes = (
            (("number", "competition"), True),
        )
        order_by = ["number"]

    formation_name = peewee.CharField(default="")
    number = peewee.IntegerField()
    club = peewee.ForeignKeyField(Club)

    @tornado.gen.coroutine
    def get_name(self):
        if (yield self.is_couple()):
            sportsmen = sorted(
                (yield self.sportsmen()),
                key=lambda s: (s.gender, s.last_name))
            return ", ".join([s.full_name for s in sportsmen])
        if (yield self.is_solo()):
            return self.sportsmen[0].full_name
        return self.formation_name

    @tornado.gen.coroutine
    def num_sportsmen(self):
        if type(self.sportsmen_edges) == list:
            return len(self.sportsmen_edges)
        result = peewee_async.count(self.sportsmen_edges)
        return result

    @tornado.gen.coroutine
    def is_couple(self):
        return (yield self.num_sportsmen()) == 2

    @tornado.gen.coroutine
    def is_solo(self):
        return (yield self.num_sportsmen()) == 1

    @tornado.gen.coroutine
    def sportsmen(self):
        if type(self.sportsmen_edges) == list:
            edges = self.sportsmen_edges
        else:
            yield from peewee_async.execute(self.sportsmen_edges)
        return [
            edge.sportsman
            for edge in edges
        ]

    @tornado.gen.coroutine
    def serialize(self, recursive=False):
        result = {
            "id": self.id,
            "name": (yield self.get_name()),
            "club": (yield self.club.serialize()),
            "number": self.number,
        }
        if recursive:
            result["sportsmen"] = [
                sp.full_name
                for sp in (yield self.sportsmen())
            ]
        return result


class ParticipantSportsman(BaseModel):
    class Meta:
        indexes = (
            (("paritipant", "sportsman"), True),
        )

    sportsman = peewee.ForeignKeyField(Sportsman, related_name="participants_edges")
    participant = peewee.ForeignKeyField(Participant, related_name="sportsmen_edges")


class Acrobatic(BaseModel):
    class Meta:
        order_by = ["number"]

    participant = peewee.ForeignKeyField(Participant, related_name="acrobatics")
    number = peewee.IntegerField()
    description = peewee.CharField()
    score = peewee.IntegerField()

    @tornado.gen.coroutine
    def serialize(self):
        return {
            "id": self.id,
            "number": self.number,
            "description": self.description,
            "score": self.score,
        }


class ParticipantApplication(BaseModel):
    participant = peewee.ForeignKeyField(Participant, related_name="inner_competitions_edges")
    inner_competition = peewee.ForeignKeyField(inner_competition_proxy, related_name="participants_edges")
