from Simple.models import *
from fixtures import RockFixture

class Fixture(RockFixture):
    def execute(self):
        # Competition
        self.comp = Competition.create(name="Test competition")
        # Participants
        self.p = [None] * 10
        self.p[0] = Participant.create(name="P:0", competition=self.comp, number=1)
        self.p[1] = Participant.create(name="P:1", competition=self.comp, number=2)
        self.p[2] = Participant.create(name="P:2", competition=self.comp, number=3)
        self.p[3] = Participant.create(name="P:3", competition=self.comp, number=4)
        self.p[4] = Participant.create(name="P:4", competition=self.comp, number=5)
        self.p[5] = Participant.create(name="P:5", competition=self.comp, number=6)
        self.p[6] = Participant.create(name="P:6", competition=self.comp, number=7)
        self.p[7] = Participant.create(name="P:7", competition=self.comp, number=8)
        self.p[8] = Participant.create(name="P:8", competition=self.comp, number=9)
        self.p[9] = Participant.create(name="P:9", competition=self.comp, number=10)
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
        self.j1 = Judge.create(name="First Judge")
        self.j2 = Judge.create(name="Second Judge")
        self.j3 = Judge.create(name="Third Judge")
        self.j4 = Judge.create(name="Forth Judge")
        self.j5 = Judge.create(name="Fifth Judge")
        self.jm = Judge.create(name="Head Judge")
        self.jx = Judge.create(name="Tehnical Judge Number One")
        self.jy = Judge.create(name="Tehnical Judge Number Two")
        # CompetitionJudges
        self.cjA = CompetitionJudge.create(competition=self.comp, judge=self.j1, number="A", role="line_judge")
        self.cjB = CompetitionJudge.create(competition=self.comp, judge=self.j3, number="B", role="line_judge")
        self.cjC = CompetitionJudge.create(competition=self.comp, judge=self.j4, number="C", role="line_judge")
        self.cjH = CompetitionJudge.create(competition=self.comp, judge=self.jm, number="M", role="head_judge")
        self.cjX = CompetitionJudge.create(competition=self.comp, judge=self.jx, number="X", role="tech_judge")
        self.cjY = CompetitionJudge.create(competition=self.comp, judge=self.jy, number="Y", role="tech_judge")
