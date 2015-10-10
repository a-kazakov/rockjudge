import json
import random

import peewee
import tornado.gen

from db import BaseModel

from participants.models import (
    Acrobatic,
    Club,
    Participant,
    Sportsman,
    competition_proxy,
    inner_competition_proxy,
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
    def get_max_number(self):
        result = (Participant.select(InnerCompetition, Participant)
            .join(InnerCompetition)
            .where(InnerCompetition.competition == self)
            .order_by(Participant.number.desc())
            .limit(1))
        result = list(result)
        if result == []:
            return 0
        return result[0].number

    @tornado.gen.coroutine
    def load(self, data):
        if "clubs" in data:
            yield Club.load(self, data["clubs"])
        if "categories" in data:
            yield InnerCompetition.load(self, data["categories"])
        WebSocketClients.broadcast("competition_full_update", {
            "competition_id": self.id
        })

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
    class Meta:
        indexes = (
            (("competition", "external_id"), False),
        )
        order_by = ["name"]

    name = peewee.CharField()
    competition = peewee.ForeignKeyField(Competition, related_name="inners")
    first_tour = peewee.ForeignKeyField(tour_proxy, null=True)
    external_id = peewee.CharField(null=True, default=None)

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
    def full_prefetch(self):
        yield self.prefetch([{
            "model": Tour,
            "ref": "inner_competition",
            "ref_dir": "up",
            "children": [],
        }])

    @classmethod
    @tornado.gen.coroutine
    def _load_one(cls, competition, obj):
        if obj["external_id"] is not None:
            try:
                model = cls.get(cls.competition == competition and cls.external_id == obj["external_id"])
                for key in ["name"]:
                    setattr(model, key, obj[key])
                model.save()
                yield Participant.load(model, obj["participants"])
                return
            except cls.DoesNotExist:
                pass
        model = cls.create(competition=competition, **obj)
        yield Participant.load(model, obj["participants"])

    @classmethod
    @tornado.gen.coroutine
    def load(cls, competition, objects):
        for obj in objects:
            yield cls._load_one(competition, obj)

    @classmethod
    @tornado.gen.coroutine
    def create_model(cls, competition, name):
        cls.create(
            name=name,
            competition=competition
        )
        WebSocketClients.broadcast("competition_full_update", {
            "competition_id": competition.id
        })

    @tornado.gen.coroutine
    def update_data(self, new_data):
        for key in ["name", "external_id"]:
            if key in new_data:
                setattr(self, key, new_data[key])
        self.save()
        WebSocketClients.broadcast("competition_full_update", {
            "competition_id": self.competition_id,
        })

    @tornado.gen.coroutine
    def serialize(self, recursive=False):
        result = {
            "id": self.id,
            "name": self.name,
            "external_id": self.external_id,
        }
        if recursive:
            result["tours"] = []
            for tour in self.tours:
                result["tours"].append((yield tour.serialize(recursive=False)))
        return result


class Tour(BaseModel):
    name = peewee.CharField()
    next_tour = peewee.ForeignKeyField("self", null=True, default=None, related_name="prev_tour")
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
                    "model": Sportsman,
                    "ref": "participant",
                    "ref_dir": "up",
                    "children": [],
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
            yield self.inner_competition.prefetch_child("participants")
            return self.inner_competition.participants

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
        yield self.prefetch_child("runs")
        estimated_participants = yield self.estimate_participants()
        existing_participant_ids = { run.participant_id for run in self.runs }
        new_participant_ids = { participant.id for participant in estimated_participants }
        participant_ids_to_create = new_participant_ids - existing_participant_ids
        participant_ids_to_delete = existing_participant_ids - new_participant_ids
        if len(participant_ids_to_delete) > 0:
            runs_to_delete = Run.select().where(Run.participant << list(participant_ids_to_delete))
            runs_to_delete = list(runs_to_delete)
            Score.delete().where(Score.run << runs_to_delete).execute()
            AcrobaticOverride.delete().where(AcrobaticOverride.run << runs_to_delete).execute()
            Run.delete().where(Run.id << runs_to_delete).execute()
        new_runs = [run for run in self.runs if run.participant_id not in participant_ids_to_delete]
        self.runs = new_runs
        for participant_id in participant_ids_to_create:
            run = Run.create(
                participant=participant_id,
                heat=1,
                tour=self,
            )
            yield run.create_scores()
            self.runs.append(run)
        yield self.shuffle_heats(broadcast=False, shuffle=(len(existing_participant_ids) == 0))

    @tornado.gen.coroutine
    def shuffle_heats(self, shuffle=True, broadcast=True):
        yield self.prefetch_child("runs")
        if shuffle:
            random.shuffle(self.runs)
        last_heat = len(self.runs) % self.participants_per_heat
        if last_heat == 1:
            last_heat = (self.participants_per_heat + 1) // 2
        for idx, run in enumerate(self.runs):
            run.heat = idx // self.participants_per_heat + 1
            if len(self.runs) - idx <= last_heat:
                run.heat = (len(self.runs) - 1) // self.participants_per_heat + 1
            run.save()
        if broadcast:
            WebSocketClients.broadcast("tour_full_update", {
                "tour_id": self.id
            })

    @classmethod
    @tornado.gen.coroutine
    def get_active(cls):
        try:
            active_tour = cls.get(cls.active == True)
            return active_tour
        except cls.DoesNotExist:
            return None

    @tornado.gen.coroutine
    def start(self):
        active_tours = list(self.select().where(Tour.active == True))
        for tour in active_tours:
            tour.stop(broadcast=False)
        self.active = True
        self.save()
        WebSocketClients.broadcast("active_tour_update", {})

    @tornado.gen.coroutine
    def stop(self, broadcast=True):
        self.active = False
        self.save()
        if broadcast:
            WebSocketClients.broadcast("active_tour_update", {})

    @property
    def judges(self):
        return list(self.inner_competition.competition.judges)

    @tornado.gen.coroutine
    def get_prev_tour(self, throw=False):
        prev_tours_list = list(self.prev_tour)
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
        self.save()
        if self.next_tour:
            yield self.next_tour.init()
        WebSocketClients.broadcast("tour_update", {
            "tour_id": self.id,
        })

    @property
    def scoring_system(self):
        return get_scoring_system(self)

    @classmethod
    @tornado.gen.coroutine
    def create_model(cls, inner_competition, add_after, data):
        create_kwargs = {
            key: data[key]
            for key in ["name", "num_advances", "participants_per_heat", "hope_tour"]
        }
        create_kwargs["scoring_system_name"] = data["scoring_system"]
        create_kwargs["inner_competition"] = inner_competition
        tour = Tour.create(**create_kwargs)
        if add_after is None:
            tour.next_tour = inner_competition.first_tour
            inner_competition.first_tour = tour
            inner_competition.save()
            tour.save()
        else:
            for prev_tour in inner_competition.tours:
                if prev_tour.id == add_after:
                    tour.next_tour = prev_tour.next_tour
                    prev_tour.next_tour = tour
                    prev_tour.save()
                    tour.save()
                    break
            else:
                raise RuntimeError("Invalid add_after ID passed")
        WebSocketClients.broadcast("competition_full_update", {
            "competition_id": inner_competition.competition_id,
        })

    @tornado.gen.coroutine
    def delete_model(self):
        if self.finalized:
            raise RuntimeError("Unable to delete finalized tour")
        # We don't actually delete the tour. Just removing it from linked list.
        inner_competition = self.inner_competition
        prev_tour = yield self.get_prev_tour()
        if prev_tour is None: # This is the first_tour
            inner_competition.first_tour = self.next_tour
            inner_competition.save()
        else:
            prev_tour.next_tour = self.next_tour
            prev_tour.save()
        self.next_tour = None
        self.save()
        WebSocketClients.broadcast("competition_full_update", {
            "competition_id": inner_competition.competition_id,
        })

    @tornado.gen.coroutine
    def update_data(self, new_data):
        for key in ["name", "num_advances", "participants_per_heat", "active", "hope_tour"]:
            if key in new_data:
                setattr(self, key, new_data[key])
        if "scoring_system" in new_data:
            self.scoring_system_name = new_data["scoring_system"]
        self.save()
        WebSocketClients.broadcast("competition_full_update", {
            "competition_id": self.inner_competition.competition_id,
        })

    def serialize_base(self):
        return {
            "id": self.id,
            "active": self.active,
            "scoring_system": self.scoring_system_name,
            "finalized": self.finalized,
            "name": self.name,
            "next_tour_id": self.next_tour_id,
            "participants_per_heat": self.participants_per_heat,
            "num_advances": self.num_advances,
            "hope_tour": self.hope_tour,
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

    @tornado.gen.coroutine
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
        self.save()
        WebSocketClients.broadcast("tour_full_update", {
            "tour_id": self.tour.id,
        })

    def get_acrobatic_override(self, acrobatic):
        for override in self.acrobatic_overrides:
            if override.acrobatic_id == acrobatic.id:
                return override
        return None

    @tornado.gen.coroutine
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
        self.save()
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


competition_proxy.initialize(Competition)
inner_competition_proxy.initialize(InnerCompetition)
tour_proxy.initialize(Tour)
