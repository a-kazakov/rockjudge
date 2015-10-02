import json
import random

import peewee

from db import Database

from participants.models import (
    Acrobatic,
    Participant,
)
from scoring_systems import get_scoring_system
from webserver.websocket import WebSocketClients


class Competition(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField()

    def serialize(self, recursive=False):
        result = {
            "id": self.id,
            "name": self.name,
        }
        if recursive:
            result["inner_competitions"] = [ic.serialize(recursive=True) for ic in self.inners]
        return result


class Tour(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField()
    next_tour = peewee.ForeignKeyField("self", null=True, related_name="prev_tour")
    num_advances = peewee.IntegerField()
    participants_per_heat = peewee.IntegerField()
    finalized = peewee.BooleanField(default=False)
    active = peewee.BooleanField(default=False)
    hope_tour = peewee.BooleanField(default=False)
    total_advanced = peewee.IntegerField(default=0)
    inner_competition_id = peewee.IntegerField()
    scoring_system_name = peewee.CharField()

    @property
    def runs_pf(self):
        try:
            return self.runs_prefetch
        except AttributeError:
            return self.runs

    def estimate_participants(self):
        try:
            prev_tour = self.prev_tour.get()
            if self.hope_tour:
                return [
                    row["participant"]
                    for row in self.scoring_system.get_tour_results(prev_tour)
                    if not row["advances"]
                ]
            result = []
            while True:
                result += [
                    row["participant"]
                    for row in self.scoring_system.get_tour_results(prev_tour)
                    if row["advances"]
                ]
                if prev_tour.hope_tour:
                    prev_tour = prev_tour.prev_tour.get()
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

    def create_participant_runs(self):
        estimated_participants = self.estimate_participants()
        for participant in estimated_participants:
            run = Run.create(
                participant=participant,
                heat=1,
                tour=self,
            )
            run.create_scores()
        self.shuffle_heats(broadcast=False)

    def shuffle_heats(self, broadcast=True):
        runs = list(self.runs_pf)
        random.shuffle(runs)
        last_heat = len(runs) % self.participants_per_heat
        if last_heat == 1:
            last_heat = self.participants_per_heat // 2
        for idx, run in enumerate(runs):
            run.heat = idx // self.participants_per_heat + 1
            if len(runs) - idx <= last_heat:
                run.heat = (len(runs) - 1) // self.participants_per_heat + 1
            run.save()
        if broadcast:
            WebSocketClients.broadcast("tour_full_update", {
                "tour_id": self.id
            })

    def start(self):
        for tour in self.select().where(Tour.active == True):
            tour.stop(broadcast=False)
        self.active = True
        self.save()
        WebSocketClients.broadcast("active_tour_update", {})

    def stop(self, broadcast=True):
        self.active = False
        self.save()
        if broadcast:
            WebSocketClients.broadcast("active_tour_update", {})

    @classmethod
    def get_active(cls):
        try:
            return cls.select().where(cls.active == True).get()
        except cls.DoesNotExist:
            return None

    @property
    def inner_competition(self):
        return InnerCompetition.select().where(InnerCompetition.id == self.inner_competition_id).get()

    @property
    def judges(self):
        return list(self.inner_competition.competition.judges)

    def init(self):
        try:
            prev_tour = self.prev_tour.get()
            if not prev_tour.finalized:
                raise RuntimeError("Previous tour should be finalized")
        except self.DoesNotExist:
            pass
        self.create_participant_runs()
        WebSocketClients.broadcast("tour_full_update", {
            "tour_id": self.id,
        })

    def finalize(self):
        if self.active:
            self.stop()
        self.finalized = True
        try:
            self.total_advanced = len([
                None
                for row in self.scoring_system.get_tour_results(self)
                if row["advances"]
            ])
        except self.DoesNotExist:
            pass
        self.save()
        if self.next_tour:
            self.next_tour.init()
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

    def get_serialized_results(self):
        tour_results = self.scoring_system.get_tour_results(self)
        for row in tour_results:
            row["participant"] = row["participant"].serialize()
        result = self.serialize_base()
        result.update({
            "inner_competition_name": self.inner_competition.name,
            "judges": [judge.serialize() for judge in self.judges],
            "results": tour_results,
        })
        return result

    def serialize(self, recursive=False):
        result = self.serialize_base()
        result.update({
            "inner_competition_name": self.inner_competition.name,
        })
        if recursive:
            judges = list(self.judges)
            result.update({
                "judges": [judge.serialize(recursive=True) for judge in judges],
                "runs": [run.serialize(recursive=True, judges=judges) for run in self.runs_pf],
            })
        return result


class InnerCompetition(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField()
    competition = peewee.ForeignKeyField(Competition, related_name="inners")
    first_tour = peewee.ForeignKeyField(Tour, null=True)

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

    def serialize(self, recursive=False):
        result = {
            "id": self.id,
            "name": self.name,
        }
        if recursive:
            result["tours"] = [tour.serialize(recursive=False) for tour in self.tours]
        return result


class Judge(peewee.Model):
    class Meta:
        database = Database.instance().db
        order_by = ["number"]
        indexes = (
            (("competition", "judge"), True),
        )

    competition = peewee.ForeignKeyField(Competition, related_name="judges")
    name = peewee.CharField()
    role = peewee.CharField()
    number = peewee.CharField()

    def serialize(self, recursive=False):
        return {
            "id": self.id,
            "name": self.name,
            "role": self.role,
            "number": self.number,
        }

# Managed automatically

class Run(peewee.Model):
    class Meta:
        database = Database.instance().db
        indexes = (
            (("participant", "tour"), True),
        )
        order_by = ["heat", "participant"]

    participant = peewee.ForeignKeyField(Participant)
    tour = peewee.ForeignKeyField(Tour, related_name="runs")
    heat = peewee.IntegerField()

    @property
    def scores_pf(self):
        try:
            return self.scores_prefetch
        except AttributeError:
            return self.scores

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

    def update_data(self, new_data):
        if "heat" in new_data:
            self.heat = new_data["heat"]
        self.save()
        WebSocketClients.broadcast("run_update", {
            "run_id": self.id,
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
        WebSocketClients.broadcast("run_update", {
            "run_id": self.id,
        })

    def serialize(self, recursive=False, judges=None):
        result = {
            "id": self.id,
            "participant": self.participant.serialize(),
            "heat": self.heat,
            "tour_id": self.tour_id,
        }
        acro_list = []
        for acro in self.participant.acrobatics:
            serialized = acro.serialize()
            override = self.get_acrobatic_override(acro)
            serialized["original_score"] = serialized["score"]
            if override is not None:
                serialized["score"] = override.score
            acro_list.append(serialized)
        if recursive:
            result.update({
                "scores": self.tour.scoring_system.get_run_scores(self, judges=judges),
                "acrobatics": acro_list,
            })
        return result


class AcrobaticOverride(peewee.Model):
    class Meta:
        database = Database.instance().db
        indexes = (
            (("run", "acrobatic"), True),
        )
        order_by = ["run", "acrobatic"]

    run = peewee.ForeignKeyField(Run, related_name="acrobatic_overrides")
    acrobatic = peewee.ForeignKeyField(Acrobatic)
    score = peewee.IntegerField()


class Score(peewee.Model):
    class Meta:
        database = Database.instance().db
        order_by = ["judge"]

    run = peewee.ForeignKeyField(Run, related_name="scores")
    judge = peewee.ForeignKeyField(Judge)
    score_data = peewee.TextField(default="{}")

    def get_data(self):
        return json.loads(self.score_data)

    def set_data(self, score_data):
        self.score_data = json.dumps(score_data)
        self.save()
        WebSocketClients.broadcast("score_update", {
            "score_id": self.id,
        })

    def update_data(self, new_data):
        self.run.tour.scoring_system.update_score(self, new_data)

    def serialize(self, recursive=False, judge=None):
        result = self.run.tour.scoring_system.serialize_score(self, judge=judge)
        result["id"] = self.id
        return result
