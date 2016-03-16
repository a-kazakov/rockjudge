import peewee

from exceptions import ApiError
from models.base_model import BaseModel
from models.competition import Competition
from models.proxies import (
    competition_proxy,
    discipline_proxy,
    tour_proxy,
)
from webserver.websocket import WsMessage


class Discipline(BaseModel):
    class Meta:
        indexes = (
            (("competition", "external_id"), True),
        )
        order_by = ["sp", "name"]

    name = peewee.CharField()
    sp = peewee.IntegerField(default=0)
    competition = peewee.ForeignKeyField(Competition, null=True, related_name="disciplines")
    first_tour = peewee.ForeignKeyField(tour_proxy, null=True)
    external_id = peewee.CharField(null=True, default=None)

    RW_PROPS = ["name", "sp", "external_id"]

    PF_CHILDREN = {
        "competition": None,
        "discipline_judges": None,
        "participants": None,
        "tours": {
            "raw_tours": None,
        },
    }

    pf_tours = None

    def get_back_ref(self, field):
        if field == "tours":
            return "discipline"
        return None

    @property
    def tours(self):
        if self.pf_tours is not None:
            return self.pf_tours
        tours = list(self.raw_tours)
        rev_tours = {
            tour.id: tour
            for tour in tours
        }
        current_tour_id = self.first_tour_id
        result = []
        while current_tour_id is not None:
            current_tour = rev_tours[current_tour_id]
            result.append(current_tour)
            current_tour_id = current_tour.next_tour_id
        self.pf_tours = result
        return result

    def get_current_tour(self):
        for tour in self.tours:
            if not tour.finalized:
                return tour
        return None

    def full_prefetch(self):
        self.prefetch({
            "participants": {
                "club": {},
            },
            "raw_tours": {
                "runs": {
                    "scores": {},
                    "acrobatic_overrides": {},
                    "participant": {
                        "club": {},
                    },
                },
            },
        })

    def set_judges(self, new_judges_data):
        from models import DisciplineJudge
        new_data = {(judge_data["judge_id"], judge_data["role"]) for judge_data in new_judges_data}
        old_data = {(discipline_judge.judge_id, discipline_judge.role) for discipline_judge in self.discipline_judges}
        if new_data == old_data:
            return
        if self.first_tour is not None and self.first_tour.finalized:
            raise ApiError("errors.discipline.change_judges_with_finalized_tour")
        new_ids = {judge_data["judge_id"] for judge_data in new_judges_data}
        old_ids = {discipline_judge.judge_id for discipline_judge in self.discipline_judges}
        rev_judges = {
            judge.id: judge
            for judge in self.competition.judges
        }
        rev_discipline_judges = {
            discipline_judge.judge_id: discipline_judge
            for discipline_judge in self.discipline_judges
        }
        rev_judges_data = {
            obj["judge_id"]: obj
            for obj in new_judges_data
        }
        judges_ids_to_add = new_ids - old_ids
        judges_ids_to_update = new_ids.intersection(old_ids)
        judges_ids_to_delete = old_ids - new_ids
        for judge_id in judges_ids_to_add:
            DisciplineJudge.create_model(
                discipline=self,
                judge=rev_judges[judge_id],
                data=rev_judges_data[judge_id],
                ws_message=WsMessage())
        for judge_id in judges_ids_to_update:
            rev_discipline_judges[judge_id].update_model(
                new_data=rev_judges_data[judge_id],
                ws_message=WsMessage())
        for judge_id in judges_ids_to_delete:
            rev_discipline_judges[judge_id].delete_model(WsMessage())

    @classmethod
    def load_models(cls, competition, objects, items):
        from models import (
            DisciplineJudge,
            Participant,
            Tour,
        )
        for model, created, raw_data in cls.load_models_base(objects, competition=competition):
            if "participants" in raw_data and items["participants"]:
                Participant.load_models(model, raw_data["participants"])
            if "discipline_judges" in raw_data and items["discipline_judges"]:
                DisciplineJudge.load_models(model, raw_data["discipline_judges"])
            if "tours" in raw_data and items["tours"]:
                Tour.load_models(model, raw_data["tours"])

    @classmethod
    def create_model(cls, competition, data, ws_message):
        create_kwargs = cls.gen_model_kwargs(data, competition=competition)
        new_model = cls.create(**create_kwargs)
        new_model.set_judges(data["discipline_judges"])
        ws_message.add_model_update(
            model_type=Competition,
            model_id=competition.id,
            schema={
                "disciplines": {}
            }
        )
        ws_message.add_model_update(
            model_type=cls,
            model_id=new_model.id,
            schema={
                "tours": {},
                "participants": {},
                "discipline_judges": {
                    "judge": {},
                }
            })

    def update_model(self, new_data, ws_message):
        self.update_model_base(new_data)
        if "discipline_judges" in new_data:
            self.set_judges(new_data["discipline_judges"])
        ws_message.add_model_update(
            model_type=Competition,
            model_id=self.competition_id,
            schema={
                "disciplines": {}
            }
        )
        ws_message.add_model_update(
            model_type=self.__class__,
            model_id=self.id,
            schema={
                "discipline_judges": {
                    "judge": {},
                }
            }
        )

    def delete_model(self, ws_message):
        if self.get_attr_count("participants") > 0:
            raise ApiError("errors.discipline.delete_with_participants")
        if self.first_tour is not None:
            raise ApiError("errors.discipline.delete_with_tours")
        competition_id = self.competition_id
        self.delete_instance(recursive=True)
        ws_message.add_model_update(
            model_type=competition_proxy,
            model_id=competition_id,
            schema={
                "disciplines": {},
            }
        )

    def get_serialized_results(self):
        result = []
        participants_added = set()
        tours = list(reversed(list(self.tours)))
        for idx, tour in enumerate(tours):
            skip_place = not tour.finalized or (idx > 0 and tours[idx - 1].hope_tour)
            tour_results = tour.scoring_system.get_tour_results(tour)
            place_offset = tours[idx + 1].total_advanced if idx < len(tours) - 1 and tour.hope_tour else 0
            for row in tour_results:
                p_id = row["run"].participant.id
                if p_id in participants_added:
                    continue
                row = {
                    "place": row["place"] + place_offset if not skip_place and not row["advances"] else None,
                    "run_id": row["run"].id,
                }
                participants_added.add(p_id)
                result.append(row)
        return result

    def serialize(self, children={}):
        result = self.serialize_props()
        result = self.serialize_upper_child(result, "competition", children)
        result = self.serialize_lower_child(result, "discipline_judges", children)
        result = self.serialize_lower_child(result, "tours", children)
        result = self.serialize_lower_child(result, "participants", children)
        return result

    def export(self):
        result = self.serialize_props()
        result.update({
            "id": self.id,
            "results": self.get_serialized_results(),
            "tours": [tour.export() for tour in self.tours],
            "discipline_judges": [dj.export() for dj in self.discipline_judges],
            "participants": [
                participant.export()
                for participant in self.participants
            ],
        })
        return result


discipline_proxy.initialize(Discipline)
