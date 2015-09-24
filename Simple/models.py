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


class Round(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField()
    next_round = peewee.ForeignKeyField("self", null=True, related_name="prev_round")
    num_participants = peewee.IntegerField()
    participants_per_heat = peewee.IntegerField()
    finalized = peewee.BooleanField(default=False)

    def estimate_participants(self):
        try:
            prev_round = self.prev_round.get()
        except self.DoesNotExist:
            return Participant.select()
        table = sorted([
            (run.total_score, run.participant)
            for run in prev_round.runs
        ], key=lambda x: -x[0])
        participants_advances = [x[1] for x in table[:self.num_participants]]
        return participants_advances

    def create_participant_runs(self):
        idx = 0
        for participant in self.estimate_participants():
            run = ParticipantRun.create(
                participant=participant,
                heat=(idx // self.participants_per_heat + 1),
                round=self,
            )
            run.create_judge_scores()
            idx += 1

    def get_participants(self):
        return [run.participant for run in self.runs.select()]

    def get_participant_run(self, participant):
        return self.runs.where(ParticipantRun.participant == participant).get()

    @property
    def judges(self):
        return list(Judge.select())

    def init(self):
        try:
            prev_round = self.prev_round.get()
            if not prev_round.finalized:
                raise RuntimeError("Previous round should be finalized")
        except self.DoesNotExist:
            pass
        self.create_participant_runs()

    def finalize(self):
        self.finalized = True
        self.save()
        if self.next_round:
            self.next_round.init()


class InnerCompetition(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField()
    competition = peewee.ForeignKeyField(Competition, related_name="inners")
    first_round = peewee.ForeignKeyField(Round, null=True)

    @property
    def rounds(self):
        round = self.first_round
        while round is not None:
            yield round
            round = round.next_round

    def get_current_round(self):
        for round in self.rounds:
            if not round.finalized:
                return round
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
            (("participant", "round"), True),
        )
        order_by = ["heat", "participant"]

    participant = peewee.ForeignKeyField(Participant)
    heat = peewee.IntegerField()
    round = peewee.ForeignKeyField(Round, related_name="runs")

    def create_judge_scores(self):
        for judge in self.round.judges:
            JudgeScore.create(
                participant_run=self,
                judge=judge
            )

    def set_judge_score(self, judge, score):
        judge_score_obj = self.scores.select().where(JudgeScore.judge == judge).get()
        judge_score_obj.score = score
        judge_score_obj.save()

    @property
    def total_score(self):
        return sum([js.score for js in self.scores])


class JudgeScore(peewee.Model):
    class Meta:
        database = Database.instance().db
        order_by = ["judge"]

    participant_run = peewee.ForeignKeyField(ParticipantRun, related_name="scores")
    judge = peewee.ForeignKeyField(Judge)
    score = peewee.IntegerField(default=0)
