from Simple.models import *
from fixtures import RockFixture

class Fixture(RockFixture):
    def execute(self):
        # Participants
        self.p = [None] * 10
        self.p[0] = Participant.create(name="P:0")
        self.p[1] = Participant.create(name="P:1")
        self.p[2] = Participant.create(name="P:2")
        self.p[3] = Participant.create(name="P:3")
        self.p[4] = Participant.create(name="P:4")
        self.p[5] = Participant.create(name="P:5")
        self.p[6] = Participant.create(name="P:6")
        self.p[7] = Participant.create(name="P:7")
        self.p[8] = Participant.create(name="P:8")
        self.p[9] = Participant.create(name="P:9")
        # Competition
        self.comp = Competition.create(name="Test competition")
        # Tours
        self.rf = Tour.create(name="Final", next_tour=None, num_advances=0, inner_competition_id=1, participants_per_heat=1)
        self.rs = Tour.create(name="Semifinal", next_tour=self.rf, num_advances=3, inner_competition_id=1, participants_per_heat=2)
        self.rh = Tour.create(name="Hope round", next_tour=self.rs, hope_tour=True, num_advances=4, inner_competition_id=1, participants_per_heat=2)
        self.rq = Tour.create(name="Qualification", next_tour=self.rh, num_advances=3, inner_competition_id=1, participants_per_heat=2)
        # Inner competition
        self.ic = InnerCompetition.create(name="Test category", competition=self.comp)
        self.ic.first_tour = self.rq
        self.ic.save()
        # Judges
        self.j1 = Judge.create(name="J:1")
        self.j2 = Judge.create(name="J:2")
        self.j3 = Judge.create(name="J:3")
        self.j4 = Judge.create(name="J:3")
        self.j5 = Judge.create(name="J:3")
        # CompetitionJudges
        self.cjA = CompetitionJudge.create(competition=self.comp, judge=self.j1, number="A")
        self.cjB = CompetitionJudge.create(competition=self.comp, judge=self.j3, number="B")
        self.cjC = CompetitionJudge.create(competition=self.comp, judge=self.j4, number="C")
