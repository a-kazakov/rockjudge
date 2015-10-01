from tournaments.models import *
from participants.models import *
from fixtures import RockFixture

class Fixture(RockFixture):
    def execute(self):
        # Competition
        self.comp = Competition.create(name="Test competition")
        # Participants
        self.p = [None] * 10
        self.p[0] = Participant.create(name="P:0", number=1)
        self.p[1] = Participant.create(name="P:1", number=2)
        self.p[2] = Participant.create(name="P:2", number=3)
        self.p[3] = Participant.create(name="P:3", number=4)
        self.p[4] = Participant.create(name="P:4", number=5)
        self.p[5] = Participant.create(name="P:5", number=6)
        self.p[6] = Participant.create(name="P:6", number=7)
        self.p[7] = Participant.create(name="P:7", number=8)
        self.p[8] = Participant.create(name="P:8", number=9)
        self.p[9] = Participant.create(name="P:9", number=10)
        # Tours
        self.rf = Tour.create(scoring_system_name="rosfarr_no_acro", name="Final", next_tour=None, num_advances=0, inner_competition_id=1, participants_per_heat=1)
        self.rs = Tour.create(scoring_system_name="rosfarr_no_acro", name="Semifinal", next_tour=self.rf, num_advances=3, inner_competition_id=1, participants_per_heat=2)
        self.rh = Tour.create(scoring_system_name="rosfarr_no_acro", name="Hope round", next_tour=self.rs, hope_tour=True, num_advances=4, inner_competition_id=1, participants_per_heat=2)
        self.rq = Tour.create(scoring_system_name="rosfarr_no_acro", name="Qualification", next_tour=self.rh, num_advances=3, inner_competition_id=1, participants_per_heat=2)
        # Inner competition
        self.ic = InnerCompetition.create(name="Test category", competition=self.comp)
        self.ic.first_tour = self.rq
        self.ic.save()
        # Judges
        self.jA = Judge.create(name="Alexander Alexandrov",         competition=self.comp, number="A", role="line_judge")
        self.jB = Judge.create(name="Boris Borisov",                competition=self.comp, number="B", role="line_judge")
        self.jC = Judge.create(name="Chippolino Chippolinovich",    competition=self.comp, number="C", role="line_judge")
        self.jH = Judge.create(name="Hariton Hatinvich",            competition=self.comp, number="H", role="head_judge")
        self.jX = Judge.create(name="Name of Judge number X",       competition=self.comp, number="X", role="tech_judge")
        self.jY = Judge.create(name="Name of Judge number Y",       competition=self.comp, number="Y", role="tech_judge")
