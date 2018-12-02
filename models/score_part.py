import json
from typing import Any, Dict, List, Type

from sqlalchemy import Column, ForeignKey, Integer, JSON, String, UniqueConstraint
from sqlalchemy.orm import Session, relationship, backref

from db import ModelBase
from models.base_model import BaseModel
from models.score import Score


class ScorePart(ModelBase, BaseModel):
    # DB schema

    __tablename__ = "score_parts"

    __table_args__ = (
        UniqueConstraint("score_id", "key", name="score_key_idx"),
    )

    id = Column(Integer, primary_key=True)
    score_id = Column(Integer, ForeignKey("scores.id", ondelete="CASCADE"), nullable=False)
    key = Column(String, nullable=False)
    value_json = Column(JSON(none_as_null=True), nullable=True)

    score = relationship(Score, backref=backref("parts", cascade="delete"))

    # Virtual fields

    @property
    def value(self) -> Any:
        return self.value_json

    @value.setter
    def value(self, new_value: Any) -> None:
        self.value_json = self.score.run.tour.scoring_system.filter_score_component(
            self.score.discipline_judge.role,
            self.key,
            new_value,
        )

    @classmethod
    def create_and_validate(
        cls: Type["ScorePart"],
        session: Session,
        score: Score,
        data: Dict[str, Any],
    ) -> None:
        scoring_system = score.run.tour.scoring_system
        judge_role = score.discipline_judge.role
        filtered_data: Dict[str, Any] = {}
        prev_data = score.data
        for key, value in data.items():
            try:
                filtered_data[key] = scoring_system.filter_score_component(
                    judge_role,
                    key,
                    value,
                    prev_data.get(key, None)
                )
            except ValueError:
                pass
        values_strings: List[str] = []
        params: Dict[str, Any] = {"score_id": score.id}
        for idx, (key, value) in enumerate(filtered_data.items()):
            if value is None:
                values_strings.append(f"(:score_id, :k{idx}, NULL)")
                params.update({
                    f"k{idx}": key,
                })
            else:
                values_strings.append(f"(:score_id, :k{idx}, :v{idx})")
                params.update({
                    f"k{idx}": key,
                    f"v{idx}": json.dumps(value),
                })
        session.execute(
            (
                f"INSERT INTO {cls.__tablename__} (score_id, key, value_json) "
                f"VALUES {', '.join(values_strings)} "
                f"ON CONFLICT (score_id, key) DO UPDATE "
                f"SET value_json = excluded.value_json"
            ),
            params,
        )
