import json
import random

import peewee
import peewee_async
import tornado.gen

from db import (
    BaseModel,
    Database,
)

from participants.models import (
    Acrobatic,
    Club,
    Participant,
    ParticipantSportsman,
    Sportsman,
)
from scoring_systems import get_scoring_system
from webserver.websocket import WebSocketClients


tour_proxy = peewee.Proxy()


class Competition(BaseModel):
    name = peewee.CharField()

    @tornado.gen.coroutine
    def full_prefetch(self):
        yield self.prefetch([{
            "model": InnerCompetition,
            "ref": "competition",
            "ref_dir": "up",
            "children": [{
                "model": Tour,
                "ref": "inner_competition",
                "ref_dir": "up",
                "children": [],
            }],
        }])

    @tornado.gen.coroutine
    def serialize(self, recursive=False):
        result = {
            "id": self.id,
            "name": self.name,
        }
        if recursive:
            result["inner_competitions"] = []
            for ic in self.inners:
                result["inner_competitions"].append((yield ic.serialize(recursive=True)))
        return result


class InnerCompetition(BaseModel):
    name = peewee.CharField()
    competition = peewee.ForeignKeyField(Competition, related_name="inners")
    first_tour = peewee.ForeignKeyField(tour_proxy, null=True)

    @property
    def tours(self):
        tour = self.first_tour
        while tour is not None:
            yield tour
            tour = tour.next_tour

    def get_current_tour(self):
        for tour in self.tours:
            if not tour.finalized:
                return tour
        return None

    @tornado.gen.coroutine
    def serialize(self, recursive=False):
        result = {
            "id": self.id,
            "name": self.name,
        }
        if recursive:
            result["tours"] = []
            for tour in self.tours:
                result["tours"].append((yield tour.serialize(recursive=False)))
        return result


class Tour(BaseModel):
    name = peewee.CharField()
    next_tour = peewee.ForeignKeyField("self", null=True, related_name="prev_tour")
    num_advances = peewee.IntegerField()
    participants_per_heat = peewee.IntegerField()
    finalized = peewee.BooleanField(default=False)
    active = peewee.BooleanField(default=False)
    hope_tour = peewee.BooleanField(default=False)
    total_advanced = peewee.IntegerField(default=0)
    inner_competition = peewee.ForeignKeyField(InnerCompetition)
    scoring_system_name = peewee.CharField()

    @tornado.gen.coroutine
    def full_prefetch(self):
        yield self.prefetch([{
            "model": Run,
            "ref": "tour",
            "ref_dir": "up",
            "children": [{
                "model": Score,
                "ref": "run",
                "ref_dir": "up",
                "children": [],
            }, {
                "model": AcrobaticOverride,
                "ref": "run",
                "ref_dir": "up",
                "children": [],
            }, {
                "model": Participant,
                "ref": "participant",
                "ref_dir": "down",
                "children": [{
                    "model": Acrobatic,
                    "ref": "participant",
                    "ref_dir": "up",
                    "children": [],
                }, {
                    "model": Club,
                    "ref": "club",
                    "ref_dir": "down",
                    "children": [],
                }, {
                    "model": ParticipantSportsman,
                    "ref": "participant",
                    "ref_dir": "up",
                    "children": [{
                        "model": Sportsman,
                        "ref": "sportsman",
                        "ref_dir": "down",
                        "children": [],
                    }],
                }],
            }],
        }, {
            "model": InnerCompetition,
            "ref": "inner_competition",
            "ref_dir": "down",
            "children": [{
                "model": Competition,
                "ref": "competition",
                "ref_dir": "down",
                "children": [{
                    "model": Judge,
                    "ref": "competition",
                    "ref_dir": "up",
                    "children": [],
                }],
            }]
        }])

    @tornado.gen.coroutine
    def estimate_participants(self):
        try:
            prev_tour = yield self.get_prev_tour(throw=True)
            yield prev_tour.full_prefetch()
            if self.hope_tour:
                return [
                    row["participant"]
                    for row in (yield prev_tour.scoring_system.get_tour_results(prev_tour))
                    if not row["advances"]
                ]
            result = []
            while True:
                result += [
                    row["participant"]
                    for row in (yield prev_tour.scoring_system.get_tour_results(prev_tour))
                    if row["advances"]
                ]
                if prev_tour.hope_tour:
                    prev_tour = yield prev_tour.get_prev_tour(throw=True)
                    yield prev_tour.full_prefetch()
                else:
                    break
            return result
        except self.DoesNotExist:
            return list(Participant.select())

    def get_actual_num_advances(self):
        base_value = self.num_advances
        if not self.hope_tour:
            return base_value
        advanced_over_quote = 0
        try:
            tour = self
            while True:
                tour = tour.prev_tour.get()
                advanced_over_quote += tour.total_advanced - tour.num_advances
                if not tour.hope_tour:
                    break
        except self.DoesNotExist:
            pass
        return max(0, base_value - advanced_over_quote)

    @tornado.gen.coroutine
    def create_participant_runs(self):
        estimated_participants = yield self.estimate_participants()
        for participant in estimated_participants:
            run = Run.create(
                participant=participant,
                heat=1,
                tour=self,
            )
            run.create_scores()
        yield self.shuffle_heats(broadcast=False)

    @tornado.gen.coroutine
    def shuffle_heats(self, broadcast=True):
        with Database.instance().db.atomic():
            if type(self.runs) != list:
                runs = yield from peewee_async.execute(self.runs)
                runs = list(runs)
            else:
                runs = list(self.runs)
            random.shuffle(runs)
            last_heat = len(runs) % self.participants_per_heat
            if last_heat == 1:
                last_heat = self.participants_per_heat // 2
            for idx, run in enumerate(runs):
                run.heat = idx // self.participants_per_heat + 1
                if len(runs) - idx <= last_heat:
                    run.heat = (len(runs) - 1) // self.participants_per_heat + 1
                yield from peewee_async.update_object(run)
        if broadcast:
            WebSocketClients.broadcast("tour_full_update", {
                "tour_id": self.id
            })

    @classmethod
    @tornado.gen.coroutine
    def get_active(cls):
        try:
            active_tour = yield from peewee_async.get_object(cls, cls.active == True)
            return active_tour
        except cls.DoesNotExist:
            return None

    @tornado.gen.coroutine
    def start(self):
        active_tours = yield from peewee_async.execute(self.select().where(Tour.active == True))
        for tour in active_tours:
            tour.stop(broadcast=False)
        self.active = True
        yield from peewee_async.update_object(self)
        WebSocketClients.broadcast("active_tour_update", {})

    @tornado.gen.coroutine
    def stop(self, broadcast=True):
        self.active = False
        yield from peewee_async.update_object(self)
        if broadcast:
            WebSocketClients.broadcast("active_tour_update", {})

    @property
    def judges(self):
        return list(self.inner_competition.competition.judges)

    @tornado.gen.coroutine
    def get_prev_tour(self, throw=False):
        prev_tours_iter = yield from peewee_async.execute(self.prev_tour)
        prev_tours_list = list(prev_tours_iter)
        if prev_tours_list == []:
            if throw:
                raise self.DoesNotExist
            return None
        return prev_tours_list[0]

    @tornado.gen.coroutine
    def check_prev_tour_finalized(self):
        prev_tour = yield self.get_prev_tour()
        if prev_tour is None:
            return
        if not prev_tour.finalized:
            raise RuntimeError("Previous tour should be finalized")

    @tornado.gen.coroutine
    def init(self):
        yield self.check_prev_tour_finalized()
        yield self.create_participant_runs()
        WebSocketClients.broadcast("tour_full_update", {
            "tour_id": self.id,
        })

    @tornado.gen.coroutine
    def finalize(self):
        yield self.full_prefetch()
        yield self.check_prev_tour_finalized()
        if self.active:
            self.stop()
        self.finalized = True
        self.total_advanced = len([
            None
            for row in (yield self.scoring_system.get_tour_results(self))
            if row["advances"]
        ])
        yield from peewee_async.update_object(self)
        if self.next_tour:
            yield self.next_tour.init()
        WebSocketClients.broadcast("tour_update", {
            "tour_id": self.id,
        })

    @property
    def scoring_system(self):
        return get_scoring_system(self)

    def serialize_base(self):
        return {
            "id": self.id,
            "active": self.active,
            "scoring_system": self.scoring_system_name,
            "finalized": self.finalized,
            "name": self.name,
            "next_tour_id": self.next_tour_id,
            "participants_per_heat": self.participants_per_heat,
        }

    @tornado.gen.coroutine
    def get_serialized_results(self):
        tour_results = yield self.scoring_system.get_tour_results(self)
        for row in tour_results:
            row["participant"] = yield row["participant"].serialize(recursive=True)
        result = self.serialize_base()
        judges = []
        for judge in self.judges:
            judges.append((yield judge.serialize()))
        result.update({
            "inner_competition_name": self.inner_competition.name,
            "judges": judges,
            "results": tour_results,
        })
        return result

    @tornado.gen.coroutine
    def serialize(self, recursive=False):
        result = self.serialize_base()
        result.update({
            "inner_competition_name": self.inner_competition.name,
        })
        if recursive:
            judges = []
            for judge in self.judges:
                judges.append((yield judge.serialize()))
            runs = []
            for run in self.runs:
                runs.append((yield run.serialize(recursive=True, judges=list(self.judges))))
            result.update({
                "judges": judges,
                "runs": runs,
            })
        return result


class Judge(BaseModel):
    class Meta:
        order_by = ["number"]
        indexes = (
            (("competition", "judge"), True),
        )

    competition = peewee.ForeignKeyField(Competition, related_name="judges")
    name = peewee.CharField()
    role = peewee.CharField()
    hide_from_results = peewee.BooleanField(default=False)
    number = peewee.CharField()

    @tornado.gen.coroutine
    def serialize(self, recursive=False):
        return {
            "id": self.id,
            "name": self.name,
            "role": self.role,
            "hide_from_results": self.hide_from_results,
            "number": self.number,
        }

# Managed automatically

class Run(BaseModel):
    class Meta:
        indexes = (
            (("participant", "tour"), True),
        )
        order_by = ["heat", "participant"]

    participant = peewee.ForeignKeyField(Participant)
    tour = peewee.ForeignKeyField(Tour, related_name="runs")
    heat = peewee.IntegerField()

    def set_heat(self, new_value):
        self.heat = new_value
        self.save()
        WebSocketClients.broadcast("run_update", {
            "run_id": self.id,
        })

    def create_scores(self):
        for judge in self.tour.judges:
            Score.create(
                run=self,
                judge=judge,
            )

    def get_score_obj(self, judge):
        return self.scores.select().where(Score.judge == judge).get()

    def set_score(self, judge, score_data):
        score_obj = self.get_score_obj(judge)
        score_obj.set(score_data)

    def get_score(self, judge):
        score_obj = self.get_score_obj(judge)
        return score_obj.get()

    @tornado.gen.coroutine
    def update_data(self, new_data):
        if "heat" in new_data:
            self.heat = new_data["heat"]
        yield from peewee_async.update_object(self)
        WebSocketClients.broadcast("tour_full_update", {
            "tour_id": self.tour.id,
        })

    def get_acrobatic_override(self, acrobatic):
        for override in self.acrobatic_overrides:
            if override.acrobatic_id == acrobatic.id:
                return override
        return None

    def set_acrobatic_override(self, acrobatic, score):
        override = self.get_acrobatic_override(acrobatic)
        if override is None:
            if score is not None:
                AcrobaticOverride.create(
                    run=self,
                    acrobatic=acrobatic,
                    score=score,
                )
        else:
            if score is not None:
                override.score = score
                override.save()
            else:
                override.delete_instance()
        WebSocketClients.broadcast("run_full_update", {
            "run_id": self.id,
        })

    @tornado.gen.coroutine
    def serialize(self, recursive=False, judges=None):
        result = {
            "id": self.id,
            "participant": (yield self.participant.serialize(recursive=False)),
            "heat": self.heat,
            "tour_id": self.tour_id,
        }
        acro_list = []
        for acro in self.participant.acrobatics:
            serialized = yield acro.serialize()
            override = self.get_acrobatic_override(acro)
            serialized["original_score"] = serialized["score"]
            if override is not None:
                serialized["score"] = override.score
            acro_list.append(serialized)
        if recursive:
            result.update({
                "scores": (yield self.tour.scoring_system.get_run_scores(self, judges=judges)),
                "acrobatics": acro_list,
            })
        return result


class AcrobaticOverride(BaseModel):
    class Meta:
        indexes = (
            (("run", "acrobatic"), True),
        )
        order_by = ["run", "acrobatic"]

    run = peewee.ForeignKeyField(Run, related_name="acrobatic_overrides")
    acrobatic = peewee.ForeignKeyField(Acrobatic)
    score = peewee.IntegerField()


class Score(BaseModel):
    class Meta:
        order_by = ["judge"]

    run = peewee.ForeignKeyField(Run, related_name="scores")
    judge = peewee.ForeignKeyField(Judge)
    score_data = peewee.TextField(default="{}")

    def get_data(self):
        return json.loads(self.score_data)

    @tornado.gen.coroutine
    def set_data(self, score_data):
        self.score_data = json.dumps(score_data)
        yield from peewee_async.update_object(self)
        WebSocketClients.broadcast("score_update", {
            "score_id": self.id,
        })

    @tornado.gen.coroutine
    def update_data(self, new_data):
        yield self.run.tour.scoring_system.update_score(self, new_data)

    @tornado.gen.coroutine
    def serialize(self, recursive=False, judge=None):
        result = yield self.run.tour.scoring_system.serialize_score(self, judge=judge)
        result["id"] = self.id
        return result


tour_proxy.initialize(Tour)
