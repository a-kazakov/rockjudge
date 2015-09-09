import unittest

from tornado.ioloop import IOLoop
from tornado.testing import (
    AsyncHTTPClient,
    AsyncTestCase,
    gen_test,
)

from Tournament.models import RoundInfo
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


class RoundTests(RockTestCase):
    def setUp(self):
        super().setUp()
        self.fixture = apply_fixture("base")

    @gen_test
    def test_check_init(self):
        rnd_q = self.fixture.rnd_B_qual
        rnd_h = self.fixture.rnd_B_hope
        rnd_f = self.fixture.rnd_B_final
        self.assertFalse((yield rnd_q.has_model))
        self.assertFalse((yield rnd_h.has_model))
        self.assertFalse((yield rnd_f.has_model))
        yield rnd_q.create_model()
        self.assertTrue((yield rnd_q.has_model))
        self.assertFalse((yield rnd_h.has_model))
        self.assertFalse((yield rnd_f.has_model))
