import peewee

from exceptions import ApiError
from models.base_model import BaseModel
from models.competition import Competition
from models.tour import Tour

from webserver.websocket import WsMessage


class CompetitionPlanItem(BaseModel):
    class Meta:
        order_by = ["sp"]
        indexes = (
            (("competition", "sp",), True),
        )

    competition = peewee.ForeignKeyField(Competition, related_name="plan", on_delete="RESTRICT")
    tour = peewee.ForeignKeyField(Tour, default=None, null=True, related_name="competition_plan_entries", on_delete="CASCADE")
    verbose_name = peewee.CharField(max_length=10000, default="")
    estimated_beginning = peewee.CharField(default="")
    estimated_duration = peewee.CharField(default="")
    sp = peewee.IntegerField()

    RW_PROPS = ["sp", "verbose_name", "estimated_beginning", "estimated_duration"]
    RO_PROPS = ["tour_id"]

    @classmethod
    def load_models(cls, competition, objects):
        if len(objects) == 0:
            return
        CompetitionPlanItem.delete().where(CompetitionPlanItem.competition == competition).execute()
        tours_iterators = {
            discipline.external_id: iter(discipline.tours)
            for discipline in competition.disciplines
        }
        latest_discipline_external_id = None
        try:
            for obj in objects:
                if obj["discipline_external_id"] is not None:
                    latest_discipline_external_id = obj["discipline_external_id"]
                    tour_id = next(tours_iterators[obj["discipline_external_id"]]).id
                    obj["tour_id"] = tour_id
                else:
                    obj["tour_id"] = None
                cls.create_model(competition, obj, WsMessage())
        except StopIteration:
            failed_discipline = None
            for discipline in competition.disciplines:
                if discipline.external_id == latest_discipline_external_id:
                    failed_discipline = discipline
                    break
            raise ApiError("errors.competition_plan.too_many_tours", failed_discipline.name)
        except KeyError:
            raise ApiError("errors.competition_plan.invalid_discipline_found")

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

    def export(self):
        result = self.serialize_props()
        result.update({
            "id": self.id,
        })
        return result
