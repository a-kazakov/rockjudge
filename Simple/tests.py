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


class RockTestCase(AsyncTestCase):
    def get_new_ioloop(self):
        return IOLoop.instance()

    def setUp(self):
        super().setUp()
        ModelManager.instance().reset()


class SimplerTests(RockTestCase):
    def setUp(self):
        super().setUp()
        self.fixture = apply_fixture("simple")

    @gen_test
    def test_tournament(self):
        f = self.fixture
        f.rq.init()
        self.assertEqual(f.ic.get_current_round(), f.rq)
        f.ic.get_current_round().init()
        for pn in range(10):
            pr = f.ic.get_current_round().get_participant_run(f.p[pn])
            pr.set_judge_score(f.j1, (10 - pn) * 2)
            pr.set_judge_score(f.j2, (10 - pn) * 3)
            pr.set_judge_score(f.j3, (10 - pn) * 4)
        f.ic.get_current_round().finalize()
        self.assertEqual(f.ic.get_current_round(), f.rs)
        f.ic.get_current_round().init()
        self.assertEqual(
            set([p.name for p in f.ic.get_current_round().get_participants()]),
            set([p.name for p in f.p[:6]])
        )
        for pn in range(6):
            pr = f.ic.get_current_round().get_participant_run(f.p[pn])
            pr.set_judge_score(f.j1, (10 - pn) * 2)
            pr.set_judge_score(f.j2, (10 - pn) * 3)
            pr.set_judge_score(f.j3, (10 - pn) * 4)
        f.ic.get_current_round().finalize()
        self.assertEqual(f.ic.get_current_round(), f.rf)
        f.ic.get_current_round().init()
        self.assertEqual(
            set([p.name for p in f.ic.get_current_round().get_participants()]),
            set([p.name for p in f.p[:3]])
        )
        for pn in range(3):
            pr = f.ic.get_current_round().get_participant_run(f.p[pn])
            pr.set_judge_score(f.j1, (10 - pn) * 2)
            pr.set_judge_score(f.j2, (10 - pn) * 3)
            pr.set_judge_score(f.j3, (10 - pn) * 4)
        f.ic.get_current_round().finalize()
        self.assertEqual(f.ic.get_current_round(), None)
