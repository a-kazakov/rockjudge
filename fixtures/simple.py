from tournaments.models import (
    Competition,
    InnerCompetition,
    Judge,
    Tour,
)
from participants.models import (
    Acrobatic,
    Club,
    Participant,
    ParticipantApplication,
    ParticipantSportsman,
    Sportsman,
)
from fixtures import RockFixture

from random import randint

class Fixture(RockFixture):
    def execute(self):
        # Competition
        self.comp = Competition.create(name="Test competition")
        # Sportsmen
        self.sm = [None] * 10
        self.sf = [None] * 10
        self.sm[0] = Sportsman.create(competition=self.comp, last_name="Степашин",    first_name="Артур",      gender="M")
        self.sm[1] = Sportsman.create(competition=self.comp, last_name="Митрушичев",  first_name="Семён",      gender="M")
        self.sm[2] = Sportsman.create(competition=self.comp, last_name="Моряков",     first_name="Виктор",     gender="M")
        self.sm[3] = Sportsman.create(competition=self.comp, last_name="Медведев",    first_name="Александр",  gender="M")
        self.sm[4] = Sportsman.create(competition=self.comp, last_name="Ханцев",      first_name="Анатолий",   gender="M")
        self.sm[5] = Sportsman.create(competition=self.comp, last_name="Николюк",     first_name="Никита",     gender="M")
        self.sm[6] = Sportsman.create(competition=self.comp, last_name="Ажикелямов",  first_name="Чеслав",     gender="M")
        self.sm[7] = Sportsman.create(competition=self.comp, last_name="Куняев",      first_name="Андрей",     gender="M")
        self.sm[8] = Sportsman.create(competition=self.comp, last_name="Козарис",     first_name="Юрий",       gender="M")
        self.sm[9] = Sportsman.create(competition=self.comp, last_name="Зинченко",    first_name="Вячеслав",   gender="M")
        self.sf[0] = Sportsman.create(competition=self.comp, last_name="Лепёхина",    first_name="Анисья",     gender="F")
        self.sf[1] = Sportsman.create(competition=self.comp, last_name="Щедрова",     first_name="Лидия",      gender="F")
        self.sf[2] = Sportsman.create(competition=self.comp, last_name="Райта",       first_name="Наталья",    gender="F")
        self.sf[3] = Sportsman.create(competition=self.comp, last_name="Быстрова",    first_name="Виктория",   gender="F")
        self.sf[4] = Sportsman.create(competition=self.comp, last_name="Блинова",     first_name="Ольга",      gender="F")
        self.sf[5] = Sportsman.create(competition=self.comp, last_name="Чиркова",     first_name="Анастасия",  gender="F")
        self.sf[6] = Sportsman.create(competition=self.comp, last_name="Сайбаталова", first_name="Лилия",      gender="F")
        self.sf[7] = Sportsman.create(competition=self.comp, last_name="Дёмшина",     first_name="Агафья",     gender="F")
        self.sf[8] = Sportsman.create(competition=self.comp, last_name="Косорукова",  first_name="Варвара",    gender="F")
        self.sf[9] = Sportsman.create(competition=self.comp, last_name="Шаронова",    first_name="Дарья",      gender="F")
        # Clubs
        self.c = [
            Club.create(competition=self.comp, name="Рок-Стрит", city="г. Томск"),
            Club.create(competition=self.comp, name="Сириус", city="г. Уфа"),
            Club.create(competition=self.comp, name="FOX", city="г. Казань"),
        ]
        # Participants
        self.p = [
            Participant.create(competition=self.comp, number=10-x, club=self.c[199997 % (x + 1) % 3])
            for x in range(10)
        ]
        # ParticipantSportsmen
        for x in range(10):
            ParticipantSportsman.create(participant=self.p[x], sportsman=self.sm[x])
            ParticipantSportsman.create(participant=self.p[x], sportsman=self.sf[x])
        # Acrobatics
        for participant in self.p[:7]:
            for n in range(5):
                Acrobatic.create(participant=participant, description="Трюк {}".format(randint(0, 100000000)), score=randint(1, 12), number=n)
        # Inner competitions
        self.ic_fw = InnerCompetition.create(name="B класс микст - юноши и девушки",  competition=self.comp)
        self.ic_ac = InnerCompetition.create(name="А класс микст - юниоры и юниорки", competition=self.comp)
        # Applications
        for participant in self.p[:7]:
            ParticipantApplication.create(participant=participant, inner_competition=self.ic_ac)
        for participant in self.p[3:]:
            ParticipantApplication.create(participant=participant, inner_competition=self.ic_fw)
        # Tours
        self.fw_rf = Tour.create(scoring_system_name="rosfarr.no_acro", name="Финал",           next_tour=None,       num_advances=0, inner_competition=self.ic_fw, participants_per_heat=1)
        self.fw_rs = Tour.create(scoring_system_name="rosfarr.no_acro", name="1/2 финала",      next_tour=self.fw_rf, num_advances=2, inner_competition=self.ic_fw, participants_per_heat=2)
        self.fw_rh = Tour.create(scoring_system_name="rosfarr.no_acro", name="Тур надежды",     next_tour=self.fw_rs, num_advances=3, inner_competition=self.ic_fw, participants_per_heat=2, hope_tour=True)
        self.fw_rq = Tour.create(scoring_system_name="rosfarr.no_acro", name="Отборочный тур",  next_tour=self.fw_rh, num_advances=3, inner_competition=self.ic_fw, participants_per_heat=2)
        self.ac_rf = Tour.create(scoring_system_name="rosfarr.acro",    name="Финал",           next_tour=None,       num_advances=0, inner_competition=self.ic_ac, participants_per_heat=1)
        self.ac_rs = Tour.create(scoring_system_name="rosfarr.acro",    name="1/2 финала",      next_tour=self.ac_rf, num_advances=2, inner_competition=self.ic_ac, participants_per_heat=2)
        self.ac_rh = Tour.create(scoring_system_name="rosfarr.acro",    name="Тур надежды",     next_tour=self.ac_rs, num_advances=3, inner_competition=self.ic_ac, participants_per_heat=2, hope_tour=True)
        self.ac_rq = Tour.create(scoring_system_name="rosfarr.acro",    name="Отборочный тур",  next_tour=self.ac_rh, num_advances=3, inner_competition=self.ic_ac, participants_per_heat=2)
        # Inner competition
        self.ic_fw.first_tour = self.fw_rq
        self.ic_ac.first_tour = self.ac_rq
        self.ic_fw.save()
        self.ic_ac.save()
        # Judges
        self.jA = Judge.create(name="Ясюлевича Мария Святославовна",    competition=self.comp, number="A", role="dance_judge")
        self.jB = Judge.create(name="Мащенко Оксана Тихоновна",         competition=self.comp, number="B", role="acro_judge")
        self.jC = Judge.create(name="Смолина Ксения Германовна",        competition=self.comp, number="C", role="dance_judge")
        self.jD = Judge.create(name="Менде Николай Макарович",          competition=self.comp, number="D", role="acro_judge")
        self.jE = Judge.create(name="Ёжов Анатолий Гаврилевич",         competition=self.comp, number="E", role="acro_judge")
        self.jH = Judge.create(name="Цейдлерина Нина Степановна",       competition=self.comp, number="Main", role="head_judge")
        self.jX = Judge.create(name="Амелин Давид Андреевич",           competition=self.comp, number="T1", role="tech_judge", hide_from_results=True)
        self.jY = Judge.create(name="Тычкина Вероника Владиленовна",    competition=self.comp, number="T2", role="tech_judge", hide_from_results=True)
