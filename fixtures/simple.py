from tournaments.models import (
    Competition,
    Judge,
    Tour,
)
from fixtures import RockFixture


class Fixture(RockFixture):
    def execute(self):
        # Competition
        self.comp = Competition.create(name="Test competition")
        self.jA = Judge.create(name="Ясюлевича Мария Святославовна",    category="1K",  competition=self.comp, number="A", role="dance_judge")
        self.jB = Judge.create(name="Мащенко Оксана Тихоновна",         category="ВK",  competition=self.comp, number="B", role="acro_judge")
        self.jC = Judge.create(name="Смолина Ксения Германовна",        category="2K",  competition=self.comp, number="C", role="dance_judge")
        self.jD = Judge.create(name="Менде Николай Макарович",          category="1K",  competition=self.comp, number="D", role="acro_judge")
        self.jE = Judge.create(name="Ёжов Анатолий Гаврилевич",         category="3K",  competition=self.comp, number="E", role="dance_judge")
        self.jH = Judge.create(name="Цейдлерина Нина Степановна",       category="МK",  competition=self.comp, number="Head", role="head_judge")
        self.jX = Judge.create(name="Амелин Давид Андреевич",           category="3K",  competition=self.comp, number="T1", role="tech_judge", hide_from_results=True)
        self.jY = Judge.create(name="Тычкина Вероника Владиленовна",    category="2K",  competition=self.comp, number="T2", role="tech_judge", hide_from_results=True)
        return

        # Tours
        self.fw_rf = Tour.create(scoring_system_name="rosfarr.no_acro", name="Финал",           next_tour=None,       num_advances=0, inner_competition=self.ic_fw, participants_per_heat=1)
        self.fw_rs = Tour.create(scoring_system_name="rosfarr.no_acro", name="1/2 финала",      next_tour=self.fw_rf, num_advances=2, inner_competition=self.ic_fw, participants_per_heat=2)
        self.fw_rh = Tour.create(scoring_system_name="rosfarr.no_acro", name="Тур надежды",     next_tour=self.fw_rs, num_advances=3, inner_competition=self.ic_fw, participants_per_heat=2, hope_tour=True)
        self.fw_rq = Tour.create(scoring_system_name="rosfarr.no_acro", name="Отборочный тур",  next_tour=self.fw_rh, num_advances=3, inner_competition=self.ic_fw, participants_per_heat=2)
        self.ac_rf = Tour.create(scoring_system_name="rosfarr.acro",    name="Финал",           next_tour=None,       num_advances=0, inner_competition=self.ic_ac, participants_per_heat=1)
        self.ac_rs = Tour.create(scoring_system_name="rosfarr.acro",    name="1/2 финала",      next_tour=self.ac_rf, num_advances=2, inner_competition=self.ic_ac, participants_per_heat=2)
        self.ac_rh = Tour.create(scoring_system_name="rosfarr.acro",    name="Тур надежды",     next_tour=self.ac_rs, num_advances=3, inner_competition=self.ic_ac, participants_per_heat=2, hope_tour=True)
        self.ac_rq = Tour.create(scoring_system_name="rosfarr.acro",    name="Отборочный тур",  next_tour=self.ac_rh, num_advances=3, inner_competition=self.ic_ac, participants_per_heat=2)
