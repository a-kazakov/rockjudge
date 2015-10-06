import peewee
import peewee_async
import tornado.gen

from db import (
    BaseModel,
    Database,
)


competition_proxy = peewee.Proxy()
inner_competition_proxy = peewee.Proxy()

class Club(BaseModel):
    indexes = (
        (("competition", "external_id"), False),
    )
    competition = peewee.ForeignKeyField(competition_proxy)
    name = peewee.CharField()
    city = peewee.CharField()
    external_id = peewee.CharField(null=True, default=None)

    @tornado.gen.coroutine
    def serialize(self):
        return {
            "name": self.name,
            "city": self.city,
        }

    @classmethod
    @tornado.gen.coroutine
    def _load_one(cls, competition, obj):
        if obj["external_id"] is not None:
            try:
                model = yield from peewee_async.get_object(cls, cls.competition == competition and cls.external_id == obj["external_id"])
                for key in ["name", "city"]:
                    setattr(model, key, obj[key])
                yield from peewee_async.update_object(model)
                return
            except cls.DoesNotExist:
                pass
        yield from peewee_async.create_object(cls, competition=competition, **obj)

    @classmethod
    @tornado.gen.coroutine
    def load(cls, competition, objects):
        with Database.instance().db.atomic():
            for obj in objects:
                yield cls._load_one(competition, obj)


class Sportsman(BaseModel):
    indexes = (
        (("competition", "external_id"), False),
    )
    competition = peewee.ForeignKeyField(competition_proxy)
    first_name = peewee.CharField()
    last_name = peewee.CharField()
    gender = peewee.CharField(max_length=1, choices=(("F", "Female"), ("M", "Male"),))
    external_id = peewee.CharField(null=True, default=None)

    @property
    def full_name(self):
        return "{} {}".format(self.last_name, self.first_name)

    @classmethod
    @tornado.gen.coroutine
    def _load_one(cls, competition, obj):
        if obj["external_id"] is not None:
            try:
                model = yield from peewee_async.get_object(cls, cls.competition == competition and cls.external_id == obj["external_id"])
                for key in ["first_name", "last_name", "gender"]:
                    setattr(model, key, obj[key])
                yield from peewee_async.update_object(model)
                return
            except cls.DoesNotExist:
                pass
        yield from peewee_async.create_object(cls, competition=competition, **obj)

    @classmethod
    @tornado.gen.coroutine
    def load(cls, competition, objects):
        with Database.instance().db.atomic():
            for obj in objects:
                yield cls._load_one(competition, obj)


class Participant(BaseModel):
    class Meta:
        indexes = (
            (("number", "competition"), True),
            (("competition", "external_id"), False),
        )
        order_by = ["number"]

    competition = peewee.ForeignKeyField(competition_proxy)
    formation_name = peewee.CharField(default="")
    number = peewee.IntegerField()
    club = peewee.ForeignKeyField(Club)
    external_id = peewee.CharField(null=True, default=None)

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
        result = yield from peewee_async.count(self.sportsmen_edges)
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

    @classmethod
    @tornado.gen.coroutine
    def _load_one(cls, competition, club, number, obj):
        if obj["external_id"] is not None:
            try:
                model = yield from peewee_async.get_object(cls, cls.competition == competition and cls.external_id == obj["external_id"])
                for key in ["formation_name"]:
                    setattr(model, key, obj["key"])
                model.club = club
                yield from peewee_async.update_object(model)
                return model, False
            except cls.DoesNotExist:
                pass
        return (yield from peewee_async.create_object(
            cls,
            competition=competition,
            formation_name=(obj["formation_name"] if "formation_name" in obj else ""),
            number=number,
            club=club)), True

    @classmethod
    @tornado.gen.coroutine
    def load(cls, competition, objects):
        with Database.instance().db.atomic():
            next_number = cls.select().where(cls.competition == competition).aggregate(peewee.fn.Max(cls.number)) + 1
            for obj in objects:
                club = Club.get(Club.external_id == obj["club"])
                model, created = yield cls._load_one(competition, club, next_number, obj)
                if created:
                    next_number += 1
                yield from peewee_async.execute(ParticipantSportsman.delete().where(ParticipantSportsman.participant == model))
                yield from peewee_async.execute(Acrobatic.delete().where(Acrobatic.participant == model))
                for sportaman_ex_id in obj["sportsmen"]:
                    sportsman = Sportsman.get(Sportsman.external_id == sportaman_ex_id)
                    ParticipantSportsman.create(
                        participant=model,
                        sportsman=sportsman,
                    )
                yield Acrobatic.load(model, obj["acrobatics"])
                for cat in obj["categories"]:
                    print(cat)
                    ic = yield from peewee_async.get_object(
                        inner_competition_proxy,
                        inner_competition_proxy.competition == competition and
                            inner_competition_proxy.external_id == cat)
                    yield from peewee_async.create_object(ParticipantApplication,
                        participant=model,
                        inner_competition=ic,
                    )


class ParticipantSportsman(BaseModel):
    class Meta:
        indexes = (
            (("paritipant", "sportsman"), True),
        )

    participant = peewee.ForeignKeyField(Participant, related_name="sportsmen_edges")
    sportsman = peewee.ForeignKeyField(Sportsman, related_name="participants_edges")


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

    @classmethod
    @tornado.gen.coroutine
    def load(cls, participant, objects):
        for number, obj in enumerate(objects, start=1):
            yield from peewee_async.create_object(cls, participant=participant, number=number, **obj)


class ParticipantApplication(BaseModel):
    participant = peewee.ForeignKeyField(Participant, related_name="inner_competitions_edges")
    inner_competition = peewee.ForeignKeyField(inner_competition_proxy, related_name="participants_edges")
