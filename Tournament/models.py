import peewee
import peewee_async

from tornado.gen import (
    coroutine,
    Return,
)

from db import Database
from Global.models import Category

# Registry

class Sportsman(peewee.Model):
    class Meta:
        database = Database.instance().db

    first_name = peewee.CharField()
    last_name = peewee.CharField()
    year_of_birth = peewee.IntegerField()


class Club(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField()
    city = peewee.CharField()


class Participant(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField(default="")
    category = peewee.ForeignKeyField(Category)
    club = peewee.ForeignKeyField(Club)


class ParticipantSportsman(peewee.Model):
    class Meta:
        database = Database.instance().db

    participant = peewee.ForeignKeyField(Participant)
    sportsman = peewee.ForeignKeyField(Sportsman)

# Competition schema

class Judge(peewee.Model):
    class Meta:
        database = Database.instance().db

    first_name = peewee.CharField()
    last_name = peewee.CharField()
    category = peewee.CharField()


class RoundInfo(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField()
    rules = peewee.CharField()
    prev_round = peewee.ForeignKeyField("self", related_name="next_rounds", null=True)
    category = peewee.ForeignKeyField(Category)
    sportsmen_advances = peewee.IntegerField()
    hope_round = peewee.BooleanField()

    @property
    @coroutine
    def has_model(self):
        response = yield from peewee_async.count(self.round_models)
        return response > 0

    @property
    @coroutine
    def model(self):
        query = self.round_models.get()
        response = yield from peewee_async.execute(query)
        return response

    @coroutine
    def create_model(self):
        if (yield self.has_model):
            raise RuntimeError("Rounnd info already has a model")
        model = yield from peewee_async.create_object(RoundModel, info=self)


# Competition data

class RoundModel(peewee.Model):
    class Meta:
        database = Database.instance().db

    info = peewee.ForeignKeyField(RoundInfo, related_name="round_models")
    current_heat = peewee.IntegerField(default=0)
    finished = peewee.BooleanField(default=False)

    def update_participants_left(self):
        query = self.participants.select().where(RoundParticipant.heat > self.heat).count()

    def set_judge_score(self, score):
        pass

    def next_heat(self):
        self.current_heat += 1
        self.save()

    def finalize(self):
        pass


class RoundParticipant(peewee.Model):
    class Meta:
        database = Database.instance().db

    participant = peewee.ForeignKeyField(Participant)
    round = peewee.ForeignKeyField(RoundModel, related_name="participants")
    heat = peewee.IntegerField()


class JudgeScore(peewee.Model):
    class Meta:
        database = Database.instance().db

    judge = peewee.ForeignKeyField(Judge)
    participant = peewee.ForeignKeyField(RoundParticipant, related_name="scores")
    score_data = peewee.TextField()
