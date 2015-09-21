import peewee

from db import Database


class Participant(peewee.Model):
    class Meta:
        database = Database.instance().db

    name = peewee.CharField()


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
        for participant in self.estimate_participants():
            run = ParticipantRun.create(
                participant=participant,
                round=self,
            )
            run.create_judge_scores()

    def get_participants(self):
        return [run.participant for run in self.runs.select()]

    def get_participant_run(self, participant):
        return self.runs.where(ParticipantRun.participant == participant).get()

    def init(self):
        self.create_participant_runs()

    def finalize(self):
        self.finalized = True
        self.save()


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

    name = peewee.CharField()

# Manages automatically

class ParticipantRun(peewee.Model):
    class Meta:
        database = Database.instance().db
        indexes = (
            (("participant", "round"), True),
        )

    participant = peewee.ForeignKeyField(Participant)
    round = peewee.ForeignKeyField(Round, related_name="runs")

    def create_judge_scores(self):
        for judge in Judge.select():
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

    participant_run = peewee.ForeignKeyField(ParticipantRun, related_name="scores")
    judge = peewee.ForeignKeyField(Judge)
    score = peewee.IntegerField(default=0)
