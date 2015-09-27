import json
import peewee

from db import Database

from Simple.websocket import WebSocketClients


class Participant(peewee.Model):
    class Meta:
        database = Database.instance().db
        order_by = ["name"]

    name = peewee.CharField()

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

class Competition(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField()


class Tour(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField()
    next_tour = peewee.ForeignKeyField("self", null=True, related_name="prev_tour")
    num_participants = peewee.IntegerField()
    participants_per_heat = peewee.IntegerField()
    finalized = peewee.BooleanField(default=False)
    active = peewee.BooleanField(default=False)
    current_heat = peewee.IntegerField(default=0)

    def estimate_participants(self):
        from scoring_systems.rosfarr_no_acro import computer
        try:
            prev_tour = self.prev_tour.get()
            table = computer.get_tour_table(prev_tour)
            return [
                row["run"].participant
                for row in table
                if row["advances"]
            ]
        except self.DoesNotExist:
            return Participant.select()

    def create_participant_runs(self):
        for idx, participant in enumerate(self.estimate_participants()):
            run = ParticipantRun.create(
                participant=participant,
                heat=(idx // self.participants_per_heat + 1),
                tour=self,
            )
            run.create_judge_scores()
            idx += 1

    def get_participants(self):
        return [run.participant for run in self.runs.select()]

    def get_participant_run(self, participant):
        return self.runs.where(ParticipantRun.participant == participant).get()

    def get_current_heat_runs(self):
        return self.runs.where(ParticipantRun.heat == self.current_heat)

    def start(self):
        for tour in self.select().where(Tour.active == True):
            tour.stop(broadcast=False)
        self.active = True
        self.save()
        WebSocketClients.broadcast("current_heat_update", {})

    def stop(self, broadcast=True):
        self.active = False
        self.save()
        if broadcast:
            WebSocketClients.broadcast("current_heat_update", {})

    def next_heat(self):
        self.current_heat += 1
        self.save()
        WebSocketClients.broadcast("current_heat_update", {})

    @classmethod
    def get_active(cls):
        try:
            return cls.select().where(cls.active == True).get()
        except cls.DoesNotExist:
            return None

    @property
    def judges(self):
        return list(Judge.select())

    def init(self):
        try:
            prev_tour = self.prev_tour.get()
            if not prev_tour.finalized:
                raise RuntimeError("Previous tour should be finalized")
        except self.DoesNotExist:
            pass
        self.create_participant_runs()
        WebSocketClients.broadcast("tour_update", {
            "tour_id": self.id,
        })

    def finalize(self):
        if self.active:
            self.stop()
        self.finalized = True
        self.save()
        if self.next_tour:
            self.next_tour.init()
        WebSocketClients.broadcast("tour_update", {
            "tour_id": self.id,
        })

    def get_serialized_results(self):
        from scoring_systems.rosfarr_no_acro import computer
        results = computer.get_tour_table(self)
        for row in results:
            row["run"] = row["run"].serialize()
        return {
            "id": self.id,
            "name": self.name,
            "finalized": self.finalized,
            "next_tour": self.next_tour_id,
            "results": results,
            "judges": [judge.serialize() for judge in self.judges],
        }

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "active": self.active,
            "current_heat": self.current_heat,
            "finalized": self.finalized,
            "participants_per_heat": self.participants_per_heat,
            "next_tour_id": self.next_tour.id if self.next_tour else None,
            "runs": [run.serialize() for run in self.runs],
            "judges": [judge.serialize() for judge in self.judges],
        }


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


class Judge(peewee.Model):
    class Meta:
        database = Database.instance().db
        order_by = ["name"]

    name = peewee.CharField()

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
        }

# Managed automatically

class ParticipantRun(peewee.Model):
    class Meta:
        database = Database.instance().db
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

    def create_judge_scores(self):
        for judge in self.tour.judges:
            JudgeScore.create(
                run=self,
                judge=judge,
            )

    def get_judge_score_obj(self, judge):
        return self.scores.select().where(JudgeScore.judge == judge).get()

    def set_judge_score(self, judge, score_data):
        judge_score_obj = self.get_judge_score_obj(judge)
        judge_score_obj.set(score_data)

    def get_judge_score(self, judge):
        judge_score_obj = self.get_judge_score_obj(judge)
        return judge_score_obj.get()

    def serialize(self):
        from scoring_systems.rosfarr_no_acro import serializers
        return {
            "id": self.id,
            "participant": self.participant.serialize(),
            "heat": self.heat,
            "scores": {
                str(score.judge_id): score.serialize()
                for score in self.scores
            },
            "total_score": serializers.get_total_run_score(self),
            "tour_id": self.tour_id,
        }


class JudgeScore(peewee.Model):
    class Meta:
        database = Database.instance().db
        order_by = ["judge"]

    run = peewee.ForeignKeyField(ParticipantRun, related_name="scores")
    judge = peewee.ForeignKeyField(Judge)
    score_data = peewee.TextField(default="{}")

    def get(self):
        return json.loads(self.score_data)

    def set(self, score_data):
        self.score_data = json.dumps(score_data)
        self.save()
        WebSocketClients.broadcast("run_update", {
            "run_id": self.run_id,
        })

    def serialize(self):
        from scoring_systems.rosfarr_no_acro import serializers
        return serializers.serialize_judge_score(self)
