import importlib


class RockFixture:
    @classmethod
    def apply(cls):
        fixture = cls()
        fixture.execute()
        return fixture


def apply_fixture(name):
    fixture_module = importlib.import_module("fixtures.{}".format(name))
    return fixture_module.Fixture.apply()
