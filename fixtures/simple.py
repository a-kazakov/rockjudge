from tournaments.models import *
from participants.models import *
from fixtures import RockFixture

from random import randint

class Fixture(RockFixture):
    def execute(self):
        # Competition
        self.comp = Competition.create(name="Test competition")
        # Participants
        self.p = [None] * 10
        self.p[0] = Participant.create(name="Лепёхина Анисья - Степашин Артур",         number=1)
        self.p[1] = Participant.create(name="Щедрова Лидия - Митрушичев Семён",         number=2)
        self.p[2] = Participant.create(name="Райта Наталья - Моряков Виктор",           number=3)
        self.p[3] = Participant.create(name="Быстрова Виктория - Медведев Александр",   number=4)
        self.p[4] = Participant.create(name="Блинова Ольга - Ханцев Анатолий",          number=5)
        self.p[5] = Participant.create(name="Чиркова Анастасия - Николюк Никита",       number=6)
        self.p[6] = Participant.create(name="Сайбаталова Лилия - Ажикелямов Чеслав",    number=7)
        self.p[7] = Participant.create(name="Дёмшина Агафья - Куняев Андрей",           number=8)
        self.p[8] = Participant.create(name="Косорукова Варвара - Козарис Юрий",        number=9)
        self.p[9] = Participant.create(name="Шаронова Дарья - Зинченко Вячеслав ",      number=10)
        # Acro
        for participant in self.p:
            for n in range(5):
                Acrobatic.create(participant=participant, description="Трюк {}".format(randint(0, 100000000)), score=randint(1, 12), number=n)
        # Inner competitions
        self.ic_fw = InnerCompetition.create(name="B класс микст - юноши и девушки",  competition=self.comp)
        self.ic_ac = InnerCompetition.create(name="А класс микст - юниоры и юниорки", competition=self.comp)
        # Tours
        self.fw_rf = Tour.create(scoring_system_name="rosfarr.no_acro", name="Финал",           next_tour=None,       num_advances=0, inner_competition=self.ic_fw, participants_per_heat=1)
        self.fw_rs = Tour.create(scoring_system_name="rosfarr.no_acro", name="1/2 финала",      next_tour=self.fw_rf, num_advances=3, inner_competition=self.ic_fw, participants_per_heat=2)
        self.fw_rh = Tour.create(scoring_system_name="rosfarr.no_acro", name="Тур надежды",     next_tour=self.fw_rs, num_advances=4, inner_competition=self.ic_fw, participants_per_heat=2, hope_tour=True)
        self.fw_rq = Tour.create(scoring_system_name="rosfarr.no_acro", name="Отборочный тур",  next_tour=self.fw_rh, num_advances=3, inner_competition=self.ic_fw, participants_per_heat=2)
        self.ac_rf = Tour.create(scoring_system_name="rosfarr.acro",    name="Финал",           next_tour=None,       num_advances=0, inner_competition=self.ic_ac, participants_per_heat=1)
        self.ac_rs = Tour.create(scoring_system_name="rosfarr.acro",    name="1/2 финала",      next_tour=self.ac_rf, num_advances=3, inner_competition=self.ic_ac, participants_per_heat=2)
        self.ac_rh = Tour.create(scoring_system_name="rosfarr.acro",    name="Тур надежды",     next_tour=self.ac_rs, num_advances=4, inner_competition=self.ic_ac, participants_per_heat=2, hope_tour=True)
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
