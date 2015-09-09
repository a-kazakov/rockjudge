from Global.models import *
from Tournament.models import *
from fixtures import RockFixture

class Fixture(RockFixture):
    def execute(self):
        # Categories
        self.cat_A = Category.create(title="A-class")
        self.cat_B = Category.create(title="B-class")
        # Sportsmen
        self.sp_Belyaev   = Sportsman.create(first_name="Dmitry",  last_name="Belyaev",   year_of_birth=1996)
        self.sp_Khasanova = Sportsman.create(first_name="Olga",    last_name="Khasanova", year_of_birth=1997)
        self.sp_Karmanov  = Sportsman.create(first_name="Artem",   last_name="Karmanov",  year_of_birth=1994)
        self.sp_Rubtsova  = Sportsman.create(first_name="Natasha", last_name="Rubtsova",  year_of_birth=1995)
        self.sp_Loktev    = Sportsman.create(first_name="Maxim",   last_name="Loktev",    year_of_birth=1992)
        self.sp_Racheva   = Sportsman.create(first_name="Natasha", last_name="Racheva",   year_of_birth=1991)
        self.sp_Pupkin    = Sportsman.create(first_name="Vasya",   last_name="Pupkin",    year_of_birth=1996)
        self.sp_Pupkina   = Sportsman.create(first_name="Anna",    last_name="Pupkina",   year_of_birth=1997)
        # Clubs
        self.club_Tomsk = Club.create(name="Rock-Street", city="Tomsk")
        self.club_Kazan = Club.create(name="Fox",         city="Kazan")
        # Participants
        self.part_Belyaev  = Participant.create(category=self.cat_A, club=self.club_Tomsk)
        self.part_Karmanov = Participant.create(category=self.cat_B, club=self.club_Tomsk)
        self.part_Loktev   = Participant.create(category=self.cat_B, club=self.club_Kazan)
        self.part_Pupkin   = Participant.create(category=self.cat_B, club=self.club_Kazan)
        # ParticipantSportsmen
        ParticipantSportsman.create(participant=self.part_Belyaev,  sportsman=self.sp_Belyaev)
        ParticipantSportsman.create(participant=self.part_Belyaev,  sportsman=self.sp_Khasanova)
        ParticipantSportsman.create(participant=self.part_Karmanov, sportsman=self.sp_Karmanov)
        ParticipantSportsman.create(participant=self.part_Karmanov, sportsman=self.sp_Rubtsova)
        ParticipantSportsman.create(participant=self.part_Loktev,   sportsman=self.sp_Loktev)
        ParticipantSportsman.create(participant=self.part_Loktev,   sportsman=self.sp_Racheva)
        ParticipantSportsman.create(participant=self.part_Pupkin,   sportsman=self.sp_Pupkin)
        ParticipantSportsman.create(participant=self.part_Pupkin,   sportsman=self.sp_Pupkina)
        # Judges
        self.judge_Anton = Judge.create(first_name="Anton", last_name="Amelin",  category="VK")
        self.judge_Sasha = Judge.create(first_name="Sasha", last_name="Remnev",  category="1K")
        self.judge_Artem = Judge.create(first_name="Artem", last_name="Kazakov", category="2K")
        # RoundInfo
        self.rnd_A_final = RoundInfo.create(name="Final",         rules="OneToNine", prev_round=None,            category=self.cat_A, sportsmen_advances=0, hope_round=False)
        self.rnd_B_qual  = RoundInfo.create(name="Qualification", rules="OneToNine", prev_round=None,            category=self.cat_B, sportsmen_advances=1, hope_round=False)
        self.rnd_B_hope  = RoundInfo.create(name="Hope round",    rules="OneToNine", prev_round=self.rnd_B_qual, category=self.cat_B, sportsmen_advances=1, hope_round=True)
        self.rnd_B_final = RoundInfo.create(name="Final",         rules="OneToNine", prev_round=self.rnd_B_hope, category=self.cat_B, sportsmen_advances=0, hope_round=False)
