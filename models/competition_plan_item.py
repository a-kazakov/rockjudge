from typing import Any, Dict, TYPE_CHECKING, Tuple, Union, List

from sqlalchemy import Column, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Session, relationship, backref

from db import ModelBase
from enums import AccessLevel
from exceptions import ApiError
from models.base_model import BaseModel
from models.client_auth import ClientAuth
from models.competition import Competition


if TYPE_CHECKING:
    from api import ApiRequest
    from mutations import MutationsKeeper


class CompetitionPlanItem(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "competition_plan_items"

    __table_args__ = (
        UniqueConstraint("competition_id", "sp", name="plan_competition_sp_idx"),
    )

    id = Column(Integer, primary_key=True)
    competition_id = Column(
        Integer, ForeignKey("competitions.id", ondelete="RESTRICT"), nullable=False
    )
    tour_id = Column(Integer, ForeignKey("tours.id", ondelete="CASCADE"), nullable=True)
    verbose_name = Column(String(10000), default="", nullable=False)
    estimated_beginning = Column(String, default="", nullable=False)
    estimated_duration = Column(String, default="", nullable=False)
    sp = Column(Integer, nullable=False)

    competition = relationship(Competition, backref="plan")
    tour = relationship("Tour", backref="plan_items")

    # Virtual fields

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.sp,)

    def validate(self) -> None:
        if self.tour is not None:
            if self.competition_id != self.tour.competition_id:
                raise ValueError("Tour should belong to the same competition as plan")

    # Permissions

    @classmethod
    def check_create_permission(
        cls, session: Session, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        auth = ClientAuth.get_for_competition(
            session, request.client, int(data["competition_id"])
        )
        return auth.access_level == AccessLevel.ADMIN

    def check_read_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level != AccessLevel.NONE

    def check_update_permission(
        self, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        return self.get_auth(request.client).access_level == AccessLevel.ADMIN

    def check_delete_permission(self, request: "ApiRequest") -> bool:
        return self.get_auth(request.client).access_level == AccessLevel.ADMIN

    # Create logic

    @classmethod
    def before_create(
        cls, session: Session, data: Dict[str, Any], *, unsafe: bool
    ) -> Dict[str, Any]:
        from models.tour import Tour

        tour_id = data.get("tour_id")
        return {
            "competition": session.query(Competition).get(data["competition_id"]),
            "tour": None if tour_id is None else session.query(Tour).get(tour_id),
        }

    # Update logic

    def before_update(self, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        from models.tour import Tour

        extra = {}
        if "tour_id" in data:
            tour_id = data["tour_id"]
            extra["tour"] = (
                None if tour_id is None else self.session.query(Tour).get(tour_id)
            )
        return extra

    # Delete logic

    # Serialization logic

    # Custom model logic

    @classmethod
    def load_models(
        cls,
        competition: Competition,
        objects: List[Dict[str, Any]],
        mk: "MutationsKeeper",
    ) -> None:
        if not objects:
            return
        for plan_item in competition.plan:
            plan_item.delete(mk)
        tours_iterators = {
            discipline.external_id: iter(discipline.tours_sorted)
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
                CompetitionPlanItem.create(
                    competition.session, {"competition_id": competition.id, **obj}, mk
                )
        except StopIteration:
            failed_discipline = None
            for discipline in competition.disciplines:
                if discipline.external_id == latest_discipline_external_id:
                    failed_discipline = discipline
                    break
            raise ApiError(
                "errors.competition_plan.too_many_tours", failed_discipline.name
            )
        except KeyError:
            raise  # ApiError("errors.competition_plan.invalid_discipline_found")

    # RW_PROPS = ["sp", "verbose_name", "estimated_beginning", "estimated_duration"]
    # RO_PROPS = ["tour_id"]

    #
    # @classmethod
    # def create_model(cls, competition, data, ws_message):
    #     create_kwargs = cls.gen_model_kwargs(
    #         data,
    #         competition=competition,
    #         tour=None if data["tour_id"] is None else Tour.get(id=data["tour_id"])
    #     )
    #     cls.create(**create_kwargs)
    #     ws_message.add_model_update(
    #         model_type=Competition,
    #         model_id=competition.id,
    #         schema={
    #             "plan": {},
    #         }
    #     )
    #
    # def update_model(self, new_data, ws_message):
    #     sp_updated = "sp" in new_data and new_data["sp"] != self.sp
    #     additional_kwargs = {}
    #     if "tour_id" in new_data:
    #         additional_kwargs["tour"] = None if new_data["tour_id"] is None else Tour.get(id=new_data["tour_id"])
    #     self.update_model_base(new_data, **additional_kwargs)
    #     if sp_updated:
    #         ws_message.add_model_update(
    #             model_type=Competition,
    #             model_id=self.competition_id,
    #             schema={
    #                 "plan": {},
    #             }
    #         )
    #     else:
    #         ws_message.add_model_update(
    #             model_type=self.__class__,
    #             model_id=self.id,
    #             schema={}
    #         )
    #
    # def delete_model(self, ws_message):
    #     competition_id = self.competition_id
    #     self.delete_instance()
    #     ws_message.add_model_update(
    #         model_type=Competition,
    #         model_id=competition_id,
    #         schema={
    #             "plan": {},
    #         }
    #     )
    #
    # def serialize(self, children={}):
    #     result = self.serialize_props()
    #     result = self.serialize_upper_child(result, "competition", children)
    #     return result
    #
    # def export(self):
    #     result = self.serialize_props()
    #     result.update({
    #         "id": self.id,
    #     })
    #     return result
