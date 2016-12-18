import peewee

from models.base_model import BaseModel
from models.run import Run


class AcrobaticOverride(BaseModel):
    class Meta:
        indexes = (
            (("run", "acrobatic_idx"), True),
        )
        order_by = ["run", "acrobatic_idx"]

    run = peewee.ForeignKeyField(Run, related_name="acrobatic_overrides", on_delete="CASCADE")
    acrobatic_idx = peewee.IntegerField()
    score = peewee.DoubleField()
