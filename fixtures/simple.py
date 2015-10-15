from tournaments.models import (
    Competition,
    Judge,
    Tour,
)
from fixtures import RockFixture


class Fixture(RockFixture):
    def execute(self):
        # Competition
        self.comp = Competition.create(
            name="Чемпионат и первенство Томской области по акробатическому рок-н-роллу",
            date="11.11.2011",
            info='[["Город проведения", "Томск"]]'
        )
        self.jA = Judge.create(name="Миров Степан Богданович",          category="1K",  competition=self.comp, number="1", role="dance_judge")
        self.jB = Judge.create(name="Устимович Леонид Артемович",       category="ВK",  competition=self.comp, number="2", role="acro_judge")
        self.jC = Judge.create(name="Чебыкина Владлена Святославовна",  category="2K",  competition=self.comp, number="3", role="dance_judge")
        self.jD = Judge.create(name="Малышева Ксения Николаевна",       category="1K",  competition=self.comp, number="4", role="acro_judge")
        self.jE = Judge.create(name="Топоров Прокофий Евграфович",      category="3K",  competition=self.comp, number="5", role="dance_judge")
        self.jH = Judge.create(name="Мосина Диана Евгениевна",          role_description="Главный судья",               category="МK",  competition=self.comp, number="Гл.", role="head_judge")
        self.jX = Judge.create(name="Халски Кондрат Андроникович",      role_description="Технический судья",           category="3K",  competition=self.comp, role="tech_judge")
        self.jY = Judge.create(name="Толбоева Юнона Давидовна",         role_description="Технический судья",           category="2K",  competition=self.comp, role="tech_judge")
        self.jQ = Judge.create(name="Зиновьева Алиса Николаевна",       role_description="Главный секретарь",           category="3K",  competition=self.comp)
        self.jQ = Judge.create(name="Маркелов Парфен Владимирович",     role_description="Зам. главного секретаря",     category="3K",  competition=self.comp)
        self.jQ = Judge.create(name="Кулешов Денис Андроникович",       role_description="Зам. главного секретаря",     category="3K",  competition=self.comp)
        self.jW = Judge.create(name="Шестакова Екатерина Марковна",     role_description="Секретарь",                   category="2K",  competition=self.comp)
        self.jW = Judge.create(name="Гребенников Самуил Модестович",    role_description="Секретарь",                   category="2K",  competition=self.comp)
        self.jW = Judge.create(name="Беляева Кристина Феликсовна",      role_description="Зам. главного судьи",         category="2K",  competition=self.comp)
        self.jW = Judge.create(name="Тукай Владлен Иосифович",          role_description="Зам. главного судьи",         category="2K",  competition=self.comp)
        self.jW = Judge.create(name="Логвинов Матвей Иннокентиевич",    role_description="Протокол",                    category="2K",  competition=self.comp)
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
