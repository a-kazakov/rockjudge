import peewee

from models.base_model import BaseModel
from models.competition import Competition
from models.tour import Tour


class CompetitionPlanItem(BaseModel):
    class Meta:
        order_by = ["sp"]
        indexes = (
            (("sp",), True),
        )

    competition = peewee.ForeignKeyField(Competition, related_name="plan")
    tour = peewee.ForeignKeyField(Tour, default=None, null=True, related_name="competition_plan_entries")
    verbose_name = peewee.CharField(default="")
    estimated_beginning = peewee.CharField(default="")
    estimated_duration = peewee.CharField(default="")
    sp = peewee.IntegerField()

    RW_PROPS = ["sp", "verbose_name", "estimated_beginning", "estimated_duration"]
    RO_PROPS = ["tour_id"]

    @classmethod
    def create_model(cls, competition, data, ws_message):
        create_kwargs = cls.gen_model_kwargs(
            data,
            competition=competition,
            tour=None if data["tour_id"] is None else Tour.get(id=data["tour_id"])
        )
        cls.create(**create_kwargs)
        ws_message.add_model_update(
            model_type=Competition,
            model_id=competition.id,
            schema={
                "plan": {},
            }
        )

    def update_model(self, new_data, ws_message):
        sp_updated = "sp" in new_data and new_data["sp"] != self.sp
        additional_kwargs = {}
        if "tour_id" in new_data:
            additional_kwargs["tour"] = None if new_data["tour_id"] is None else Tour.get(id=new_data["tour_id"])
        self.update_model_base(new_data, **additional_kwargs)
        if sp_updated:
            ws_message.add_model_update(
                model_type=Competition,
                model_id=self.competition_id,
                schema={
                    "plan": {},
                }
            )
        else:
            ws_message.add_model_update(
                model_type=self.__class__,
                model_id=self.id,
                schema={}
            )

    def delete_model(self, ws_message):
        competition_id = self.competition_id
        self.delete_instance()
        ws_message.add_model_update(
            model_type=Competition,
            model_id=competition_id,
            schema={
                "plan": {},
            }
        )

    def serialize(self, children={}):
        result = self.serialize_props()
        result = self.serialize_upper_child(result, "competition", children)
        return result
