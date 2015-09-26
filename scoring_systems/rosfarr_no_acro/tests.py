import unittest

from tornado.ioloop import IOLoop
from tornado.testing import (
    AsyncHTTPClient,
    AsyncTestCase,
    gen_test,
)

from app import (
    Application,
    ModelManager,
)
from fixtures import apply_fixture

from scoring_systems.rosfarr_no_acro.score import (
    JudgeScore,
)


class RockTestCase(AsyncTestCase):
    def get_new_ioloop(self):
        return IOLoop.instance()

    def setUp(self):
        super().setUp()
        ModelManager.instance().reset()


class JudgeScoreTests(RockTestCase):
    def setUp(self):
        super().setUp()
        self.fixture = apply_fixture("simple")
        self.data = {
            "fw_man": 25,
            "fw_woman": 5,
            "dance_figs": 13,
            "composition": 10,
        }
        f = self.fixture
        f.rq.init()
        self.run = f.ic.get_current_tour().get_participant_run(f.p[0])
        self.judge = f.j1
        self.run.set_judge_score(self.judge, self.data)
        self.js = JudgeScore(self.run, f.j1)

    @gen_test
    def test_total_score(self):
        self.assertEqual(self.js.total_score, 750 + 950 + 1300 + 1000)

    @gen_test
    def test_serialize(self):
        expected = {
            "raw_data": self.data,
            "total_score": self.js.total_score / 100,
        }
        self.assertEqual(self.js.serialize(), expected)

    @gen_test
    def test_update_score(self):
        new_data = {
            "fw_man": 75,
            "fw_woman": 0,
            "dance_figs": 23,
            "composition": 17,
        }
        self.js.update_score(new_data)
        self.assertEqual(new_data, self.js.data)
        self.assertEqual(self.js.data, self.run.get_judge_score(self.judge))


class RunScoreTest(RockTestCase):
    def setUp(self):
        super().setUp()
        self.fixture = apply_fixture("simple")
        f = self.fixture
        f.rq.init()
        self.run = f.ic.get_current_tour().get_participant_run(f.p[0])
        run.set_judge_score(f.j1, {
            "fw_man": 50,
            "fw_woman": 10,
            "dance_figs": 12,
            "composition": 18,
        })
        run.set_judge_score(f.j2, {
            "fw_man": 75,
            "fw_woman": 0,
            "dance_figs": 23,
            "composition": 12,
        })
        run.set_judge_score(f.j3, {
            "fw_man": 12,
            "fw_woman": 0,
            "dance_figs": 23,
            "composition": 12,
        })
        self.run.set_judge_score(self.judge, self.data)
        self.js = JudgeScore(self.run, f.j1)
