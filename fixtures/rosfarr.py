from Simple.models import *
from fixtures import RockFixture

class Fixture(RockFixture):
    def execute(self):
        def m(fwm, fww, df, c):
            return {
                "fw_man": fwm,
                "fw_woman": fww,
                "dance_figs": df,
                "composition": c,
            }
        self.judge_scores = [
            [m(25, 0, 12, 15), m(25, 75, 12, 15), m(25, 0, 12, 15)]
        ]
        # Participants
        self.p = [None] * 5
        self.p[0] = Participant.create(name="P:0")
        self.p[1] = Participant.create(name="P:1")
        self.p[2] = Participant.create(name="P:2")
        self.p[3] = Participant.create(name="P:3")
        self.p[4] = Participant.create(name="P:4")
        # Competition
        self.comp = Competition.create(name="Test competition")
        # Tours
        self.rf = Tour.create(name="Final", next_tour=None, num_participants=3, participants_per_heat=1)
        self.rs = Tour.create(name="Semifinal", next_tour=self.rf, num_participants=10, participants_per_heat=2)
        # Inner competition
        self.ic = InnerCompetition.create(name="Test category", first_tour=self.rq, competition=self.comp)
        # Judges
        self.j = [None] * 3
        self.j[1] = Judge.create(name="J:1")
        self.j[2] = Judge.create(name="J:2")
        self.j[3] = Judge.create(name="J:3")
