import json
import peewee

from db import Database


class Participant(peewee.Model):
    class Meta:
        database = Database.instance().db
        order_by = ["name"]

    name = peewee.CharField()

    def serialize(self):
        return {
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
    is_active = peewee.BooleanField(default=False)
    current_heat = peewee.IntegerField(default=0)

    def estimate_participants(self):
        from scoring_systems.rosfarr_no_acro import computer
        try:
            prev_tour = self.prev_tour.get()
            return computer.get_advanced_to_next_tour(prev_tour)
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
        for tour in self.select().where(self.is_active == True):
            tour.stop()
        self.is_active = True
        self.save()

    def stop(self):
        self.is_active = False
        self.save()

    def next_heat(self):
        self.current_heat += 1
        self.save()

    @classmethod
    def get_active(cls):
        try:
            return cls.select().where(cls.is_active == True).get()
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

    def finalize(self):
        if self.is_active:
            self.stop()
        self.finalized = True
        self.save()
        if self.next_tour:
            self.next_tour.init()


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

# Managed automatically


class ParticipantRun(peewee.Model):
    class Meta:
        database = Database.instance().db
        indexes = (
            (("participant", "tour"), True),
        )
        order_by = ["heat", "participant"]

    participant = peewee.ForeignKeyField(Participant)
    heat = peewee.IntegerField()
    tour = peewee.ForeignKeyField(Tour, related_name="runs")

    def create_judge_scores(self):
        for judge in self.tour.judges:
            JudgeScore.create(
                participant_run=self,
                judge=judge
            )

    def set_judge_score(self, judge, score_data):
        judge_score_obj = self.scores.select().where(JudgeScore.judge == judge).get()
        judge_score_obj.score_data = json.dumps(score_data)
        judge_score_obj.save()

    def get_judge_score(self, judge):
        judge_score_obj = self.scores.select().where(JudgeScore.judge == judge).get()
        return json.loads(judge_score_obj.score_data)


class JudgeScore(peewee.Model):
    class Meta:
        database = Database.instance().db
        order_by = ["judge"]

    participant_run = peewee.ForeignKeyField(ParticipantRun, related_name="scores")
    judge = peewee.ForeignKeyField(Judge)
    score_data = peewee.TextField(default="{}")
