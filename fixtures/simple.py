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
        # Rounds
        self.rf = Round.create(name="Final", next_round=None, num_participants=3, participants_per_heat=1)
        self.rs = Round.create(name="Semifinal", next_round=self.rf, num_participants=6, participants_per_heat=2)
        self.rq = Round.create(name="Qualification", next_round=self.rs, num_participants=9, participants_per_heat=2)
        # Inner competition
        self.ic = InnerCompetition.create(name="Test category", first_round=self.rq, competition=self.comp)
        # Judges
        self.j1 = Judge.create(name="J:1")
        self.j2 = Judge.create(name="J:2")
        self.j3 = Judge.create(name="J:3")
