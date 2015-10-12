import json
import random

import peewee

from db import BaseModel

from participants.models import (
    Acrobatic,
    Club,
    Participant,
    competition_proxy,
    inner_competition_proxy,
)
from scoring_systems import get_scoring_system


tour_proxy = peewee.Proxy()


class Competition(BaseModel):
    name = peewee.CharField()

    def full_prefetch(self):
        self.prefetch({
            "inner_competitions": {
                "tour_set": {}
            },
            "judges": {},
        })

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

    def load(self, data, ws_message):
        if "clubs" in data:
            Club.load(self, data["clubs"])
        if "categories" in data:
            InnerCompetition.load(self, data["categories"])
        ws_message.add_message("reload_data")

    def serialize(self, children={}):
        result = {
            "name": self.name,
        }
        result = self.serialize_lower_child(result, "inner_competitions", children)
        result = self.serialize_lower_child(result, "judges", children)
        result = self.serialize_lower_child(result, "clubs", children)
        result = self.serialize_lower_child(result, "participants", children)
        return result


class InnerCompetition(BaseModel):
    class Meta:
        indexes = (
            (("competition", "external_id"), False),
        )
        order_by = ["name"]

    name = peewee.CharField()
    competition = peewee.ForeignKeyField(Competition, related_name="inner_competitions")
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

    def full_prefetch(self):
        self.prefetch({
            "tour_set": {},
            "participants": {
                "acrobatics": {},
                "club": {},
            }
        })

    @classmethod
    def _load_one(cls, competition, obj):
        if obj["external_id"] is not None:
            try:
                model = cls.get(cls.competition == competition and cls.external_id == obj["external_id"])
                for key in ["name"]:
                    setattr(model, key, obj[key])
                model.save()
                Participant.load(model, obj["participants"])
                return
            except cls.DoesNotExist:
                pass
        model = cls.create(competition=competition, **obj)
        Participant.load(model, obj["participants"])

    @classmethod
    def load(cls, competition, objects):
        for obj in objects:
            cls._load_one(competition, obj)

    @classmethod
    def create_model(cls, competition, name, ws_message):
        new_model = cls.create(
            name=name,
            competition=competition
        )
        ws_message.add_model_update(
            model_type=Competition,
            model_id=competition.id,
            schema={
                "inner_competitions": {}
            }
        )
        ws_message.add_model_update(
            model_type=InnerCompetition,
            model_id=new_model.id,
            schema={
                "tours": {}
            }
        )

    def update_data(self, new_data, ws_message):
        for key in ["name", "external_id"]:
            if key in new_data:
                setattr(self, key, new_data[key])
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )

    def serialize(self, children={}):
        result = {
            "name": self.name,
            "external_id": self.external_id,
        }
        result = self.serialize_upper_child(result, "competition", children)
        result = self.serialize_lower_child(result, "tours", children)
        result = self.serialize_lower_child(result, "participants", children)
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

    def full_prefetch(self):
        self.prefetch({
            "runs": {
                "scores": {},
                "acrobatic_overrides": {},
                "participant": {
                    "acrobatics": {},
                    "club": {},
                    "sportsmen": {},
                },
            },
            "inner_competition": {
                "competition": {
                    "judges": {},
                },
            }
        })

    def estimate_participants(self):
        try:
            prev_tour = self.get_prev_tour(throw=True)
            prev_tour.full_prefetch()
            if self.hope_tour:
                return [
                    row["participant"]
                    for row in  prev_tour.scoring_system.get_tour_results(prev_tour)
                    if not row["advances"]
                ]
            result = []
            while True:
                result += [
                    row["participant"]
                    for row in prev_tour.scoring_system.get_tour_results(prev_tour)
                    if row["advances"]
                ]
                if prev_tour.hope_tour:
                    prev_tour = prev_tour.get_prev_tour(throw=True)
                    prev_tour.full_prefetch()
                else:
                    break
            return result
        except self.DoesNotExist:
            self.inner_competition.prefetch_child("participants")
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

    def create_participant_runs(self):
        self.prefetch_child("runs")
        estimated_participants = self.estimate_participants()
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
            self.runs.append(run)
        for run in self.runs:
            run.create_scores()
        self.shuffle_heats(ws_message=None, broadcast=False, shuffle=(len(existing_participant_ids) == 0))

    def shuffle_heats(self, ws_message, shuffle=True, broadcast=True):
        self.prefetch_child("runs")
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
            ws_message.add_model_update(
                model_type=self.__class__,
                model_id=self.id,
                schema={
                    "runs": {},
                },
            )

    @classmethod
    def get_active(cls):
        try:
            active_tour = cls.get(cls.active == True)
            return active_tour
        except cls.DoesNotExist:
            return None

    def start(self, ws_message):
        active_tours = list(self.select().where(Tour.active == True))
        for tour in active_tours:
            tour.stop(ws_message=ws_message, broadcast=False)
        self.active = True
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )
        ws_message.add_message("active_tour_update", {"tour_id": self.id})


    def stop(self, ws_message, broadcast=True):
        self.active = False
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )
        if broadcast:
            ws_message.add_message("active_tour_update", {"tour_id": None})

    @property
    def judges(self):
        return list(self.inner_competition.competition.judges)

    def get_prev_tour(self, throw=False):
        prev_tours_list = list(self.prev_tour)
        if prev_tours_list == []:
            if throw:
                raise self.DoesNotExist
            return None
        return prev_tours_list[0]

    def check_prev_tour_finalized(self):
        prev_tour = self.get_prev_tour()
        if prev_tour is None:
            return
        if not prev_tour.finalized:
            raise RuntimeError("Previous tour should be finalized")

    def init(self, ws_message):
        self.check_prev_tour_finalized()
        self.create_participant_runs()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "runs": {
                    "participant": {
                        "club": {}
                    },
                    "acrobatics": {},
                    "scores": {},
                }
            }
        )

    def finalize(self, ws_message):
        self.check_prev_tour_finalized()
        if self.active:
            self.stop(ws_message)
        self.finalized = True
        self.total_advanced = len([
            None
            for row in self.scoring_system.get_tour_results(self)
            if row["advances"]
        ])
        self.save()
        if self.next_tour:
            self.next_tour.init(ws_message)
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id
        )

    @property
    def scoring_system(self):
        return get_scoring_system(self)

    @classmethod
    def create_model(cls, inner_competition, add_after, data, ws_message):
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
        ws_message.add_model_update(
            model_type=InnerCompetition,
            model_id=inner_competition.id,
            schema={
                "tours": {},
            }
        )

    def delete_model(self, ws_message):
        if self.finalized:
            raise RuntimeError("Unable to delete finalized tour")
        # We don't actually delete the tour. Just removing it from linked list.
        inner_competition = self.inner_competition
        prev_tour = self.get_prev_tour()
        if prev_tour is None: # This is the first_tour
            inner_competition.first_tour = self.next_tour
            inner_competition.save()
        else:
            prev_tour.next_tour = self.next_tour
            prev_tour.save()
        self.next_tour = None
        self.save()
        ws_message.add_model_update(
            model_type=InnerCompetition,
            model_id=inner_competition.id,
            schema={
                "tours": {},
            }
        )
        ws_message.add_message("active_tour_update")

    def update_data(self, new_data, ws_message):
        for key in ["name", "num_advances", "participants_per_heat", "active", "hope_tour"]:
            if key in new_data:
                setattr(self, key, new_data[key])
        if "scoring_system" in new_data:
            self.scoring_system_name = new_data["scoring_system"]
        self.save()
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )

    def serialize_base(self):
        return {
            "active": self.active,
            "scoring_system": self.scoring_system_name,
            "finalized": self.finalized,
            "name": self.name,
            "next_tour_id": self.next_tour_id,
            "participants_per_heat": self.participants_per_heat,
            "num_advances": self.num_advances,
            "hope_tour": self.hope_tour,
        }

    def get_serialized_results(self):
        tour_results = self.scoring_system.get_tour_results(self)
        for row in tour_results:
            participant = row["participant"].serialize()
            participant["club"] = row["participant"].club.serialize()
            participant["sportsmen"] = [sp.serialize() for sp in row["participant"].sportsmen]
            row["participant"] = participant
        result = self.serialize_base()
        judges = []
        for judge in self.judges:
            judge_s = judge.serialize()
            judge_s["id"] = judge.id
            judges.append(judge_s)
        result.update({
            "inner_competition_name": self.inner_competition.name,
            "judges": judges,
            "results": tour_results,
        })
        return result

    def serialize(self, children={}):
        result = self.serialize_base()
        result = self.serialize_upper_child(result, "inner_competition", children)
        result = self.serialize_lower_child(result, "judges", children)
        result = self.serialize_lower_child(result, "runs", children,
            lambda x, c: x.serialize(judges=list(self.judges), children=c))
        return result


class Judge(BaseModel):
    class Meta:
        order_by = ["number"]
        indexes = (
            (("competition", "judge"), True),
        )

    competition = peewee.ForeignKeyField(Competition, related_name="judges")
    name = peewee.CharField()
    category = peewee.CharField()
    role = peewee.CharField()
    hide_from_results = peewee.BooleanField(default=False)
    number = peewee.CharField()

    @classmethod
    def create_model(cls, competition, data, ws_message):
        create_kwargs = {
            key: data[key]
            for key in ["name", "category", "role", "hide_from_results", "number"]
        }
        create_kwargs["competition"] = competition
        Judge.create(**create_kwargs)
        ws_message.add_message("reload_data")

    def delete_model(self, ws_message):
        # If this judge has any scores, than this judge can't be deleted
        if self.score_set.count() > 0:
            raise RuntimeError("Unable to judge that has scores")
        self.delete_instance()
        ws_message.add_message("reload_data")

    def update_data(self, new_data, ws_message):
        for key in ["name", "category", "role", "hide_from_results", "number"]:
            if key in new_data:
                setattr(self, key, new_data[key])
        self.save()
        ws_message.add_model_update(
            model_type=Competition,
            model_id=self.competition_id,
            schema={
                "judges": {}
            }
        )

    def serialize(self, children={}):
        return {
            "name": self.name,
            "category": self.category,
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

    def create_scores(self):
        scores_judge_ids = { score.judge_id for score in self.scores }
        for judge in self.tour.judges:
            if judge.id not in scores_judge_ids:
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

    def update_data(self, new_data, ws_message):
        if "heat" in new_data:
            self.heat = new_data["heat"]
        self.save()
        ws_message.add_model_update(
            model_type=Tour,
            model_id=self.tour_id,
            schema={
                "runs": {},
            }
        )

    def get_acrobatic_override(self, acrobatic):
        for override in self.acrobatic_overrides:
            if override.acrobatic_id == acrobatic.id:
                return override
        return None

    def set_acrobatic_override(self, acrobatic, score, ws_message):
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

        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "acrobatics": {},
                "scores": {},
            },
        )
        ws_message.add_message("tour_results_changed", { "tour_id": self.tour_id } )

    def serialize_acrobatics(self, children=None):
        acro_list = []
        for acro in self.participant.acrobatics:
            serialized = acro.serialize()
            serialized["id"] = acro.id
            override = self.get_acrobatic_override(acro)
            serialized["original_score"] = serialized["score"]
            if override is not None:
                serialized["score"] = override.score
            acro_list.append(serialized)
        return acro_list

    def serialize(self, children={}, judges=None):
        scores_obj = self.tour.scoring_system.get_run_scores(self, judges=judges)
        result = {
            "heat": self.heat,
            "total_score": scores_obj["total_run_score"]
        }
        result = self.serialize_upper_child(result, "participant", children)
        result = self.serialize_lower_child(result, "scores", children)
        if "acrobatics" in children:
            result["acrobatics"] = self.serialize_acrobatics(children=children["acrobatics"])
        return result


class AcrobaticOverride(BaseModel):
    class Meta:
        indexes = (
            (("run", "acrobatic"), True),
        )
        order_by = ["run", "acrobatic"]

    run = peewee.ForeignKeyField(Run, related_name="acrobatic_overrides")
    acrobatic = peewee.ForeignKeyField(Acrobatic)
    score = peewee.DoubleField()


class Score(BaseModel):
    class Meta:
        order_by = ["judge"]

    run = peewee.ForeignKeyField(Run, related_name="scores")
    judge = peewee.ForeignKeyField(Judge)
    score_data = peewee.TextField(default="{}")

    def get_data(self):
        return json.loads(self.score_data)

    def set_data(self, score_data):
        self.score_data = json.dumps(score_data)
        self.save()

    def update_data(self, new_data, ws_message):
        self.run.tour.scoring_system.update_score(self, new_data)
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
        )
        ws_message.add_model_update(
            model_type=Run,
            model_id=self.run_id,
        )
        ws_message.add_message("tour_results_changed", { "tour_id": self.run.tour_id } )

    def serialize(self, children={}, judge=None):
        return {
            "judge_id": self.judge_id,
            "data": self.run.tour.scoring_system.serialize_score(self, judge=judge)
        }


competition_proxy.initialize(Competition)
inner_competition_proxy.initialize(InnerCompetition)
tour_proxy.initialize(Tour)
