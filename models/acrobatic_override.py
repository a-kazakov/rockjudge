import peewee

from models.acrobatic import Acrobatic
from models.base_model import BaseModel
from models.run import Run


class AcrobaticOverride(BaseModel):
    class Meta:
        indexes = (
            (("run", "acrobatic"), True),
        )
        order_by = ["run", "acrobatic"]

    run = peewee.ForeignKeyField(Run, related_name="acrobatic_overrides")
    acrobatic = peewee.ForeignKeyField(Acrobatic)
    score = peewee.DoubleField()
