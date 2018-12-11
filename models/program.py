from typing import Any, Dict, List, NamedTuple, TYPE_CHECKING, Tuple, Union

from sqlalchemy import Column, ForeignKey, Integer, JSON, String, UniqueConstraint
from sqlalchemy.orm import Session, relationship, backref

from db import ModelBase
from enums import AccessLevel
from models.base_model import BaseModel
from models.client_auth import ClientAuth
from models.participant import Participant


if TYPE_CHECKING:
    from api import ApiRequest
    from mutations import MutationsKeeper


class Element(NamedTuple):
    description: str
    score: float

    @classmethod
    def create(cls, **kwargs: Any) -> "Element":
        result = cls(**kwargs)
        result.validate()
        return result

    @classmethod
    def from_dict(cls, src: Dict[str, Any]) -> "Element":
        return cls.create(**src)

    def validate(self) -> None:
        for key, type_ in self._field_types.items():
            if type_ is float:
                type_ = (int, float)
            if not isinstance(getattr(self, key), type_):
                src_type = type(getattr(self, key))
                raise TypeError(
                    f"Element.{key} has invalid type {src_type}. Expected {type_}."
                )
        if self.score < 0:
            raise ValueError("Score can't be negative")

    def to_dict(self) -> Dict[str, Any]:
        return self._asdict()


class Program(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "programs"

    __table_args__ = (
        UniqueConstraint(
            "participant_id", "external_id", name="participant_external_id_idx"
        ),
    )

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    participant_id = Column(
        Integer, ForeignKey("participants.id", ondelete="CASCADE"), nullable=False
    )
    default_for = Column(String, nullable=True)
    external_id = Column(String, nullable=True)
    elements_json = Column(JSON, default=[], nullable=False)

    participant = relationship(
        Participant, backref=backref("programs", cascade="delete")
    )

    HIDDEN_FIELDS = {"elements_json"}
    VIRTUAL_FIELDS = {"elements"}

    # Virtual fields

    @property
    def competition_id(self) -> int:
        return self.participant.competition_id

    @property
    def elements(self) -> List[Element]:
        try:
            return self.__elements
        except AttributeError:
            raw_data = self.elements_json
            if not isinstance(raw_data, list):
                raw_data = []
            result = [Element.from_dict(raw_element) for raw_element in raw_data]
            self.__elements = result
            return result

    @elements.setter
    def elements(self, value: List[Element]) -> None:
        self.elements_json = [s.to_dict() for s in value]
        try:
            del self.__elements
        except AttributeError:
            pass

    # Custom model consts/vars

    # Base properties

    @property
    def sorting_key(self) -> Tuple[Union[int, str], ...]:
        return (self.name, self.id)

    # Permissions

    @classmethod
    def check_create_permission(
        cls, session: Session, request: "ApiRequest", data: Dict[str, Any]
    ) -> bool:
        competition_id = (
            session.query(Participant).get(data["participant_id"]).competition_id
        )
        auth = ClientAuth.get_for_competition(session, request.client, competition_id)
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
        return {
            "participant": session.query(Participant).get(data["participant_id"]),
            "elements": [Element.from_dict(sp) for sp in data.pop("elements")],
        }

    # Update logic

    def before_update(self, data: Dict[str, Any], *, unsafe: bool) -> Dict[str, Any]:
        extra = {}
        if "elements" in data:
            extra["elements"] = [Element.from_dict(sp) for sp in data.pop("elements")]
        return extra

    # Delete logic
    # (default)

    # Serialization logic

    def serialize_extra(self) -> Dict[str, Any]:
        return {"elements": [s.to_dict() for s in self.elements]}

    # Custom model logic

    @classmethod
    def load_models(
        cls,
        participant: Participant,
        objects: List[Dict[str, Any]],
        mk: "MutationsKeeper",
    ):
        fixed_objects = [
            {"elements": obj["acrobatics"], **obj} for obj in objects
        ]  # TODO: fix reg system names
        for _ in cls.load_models_base(
            fixed_objects, participant.session, mk, participant_id=participant.id
        ):
            pass

    # @classmethod
    # def create_model(cls, participant, data, ws_message):
    #     kwargs = cls.gen_model_kwargs(
    #         data,
    #         participant=participant,
    #     )
    #     model = cls.create(**kwargs)
    #     ws_message.add_model_update(
    #         model_type=participant.__class__,
    #         model_id=participant.id,
    #         schema={
    #             "programs": {}
    #         }
    #     )
    #     ws_message.add_model_update(
    #         model_type=model.__class__,
    #         model_id=model.id,
    #         schema={}
    #     )
    #
    # def update_model(self, new_data, ws_message):
    #     from models import Participant
    #     self.update_model_base(new_data)
    #     ws_message.add_model_update(
    #         model_type=Participant,
    #         model_id=self.participant_id,
    #         schema={
    #             "programs": {}
    #         }
    #     )
    #     ws_message.add_model_update(
    #         model_type=self.__class__,
    #         model_id=self.id,
    #         schema={}
    #     )
    #
    # def delete_model(self, ws_message):
    #     from models import Participant
    #     participant_id = self.participant_id
    #     self.delete_instance()
    #     ws_message.add_model_update(
    #         model_type=Participant,
    #         model_id=participant_id,
    #         schema={
    #             "programs": {}
    #         }
    #     )
    #
    # def serialize(self, children={}):
    #     result = self.serialize_props()
    #     result = self.serialize_upper_child(result, "participant", children)
    #     return result
    #
    # def export(self):
    #     return self.serialize_props()
