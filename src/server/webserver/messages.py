from abc import ABCMeta
from typing import Any, Optional, Dict

from api import ApiResponse
from mutations import FetchedMutations


class BaseOutgoingMessage(metaclass=ABCMeta):
    def serialize(self) -> Any:
        pass


class ApiResponseOutgoingMessage(BaseOutgoingMessage):
    def __init__(self, response: ApiResponse) -> None:
        self.response = response

    def serialize(self) -> Any:
        return {
            "message_type": "api_response",
            "response_key": self.response.request.response_key,
            "body": self.response.serialize(),
        }


class MutationsPushOutgoingMessage(BaseOutgoingMessage):
    def __init__(
        self,
        mutations: FetchedMutations,
        *,
        is_initial: bool,
        subscription_id: Optional[str] = None,
    ) -> None:
        self.mutations = mutations
        self.is_initial = is_initial
        self.subscription_id = subscription_id

    def serialize(self) -> Any:
        if not self.is_initial and not self.mutations:
            return None
        return {
            "message_type": "mutations_push",
            "is_initial": self.is_initial,
            "body": self.mutations.serialize(),
            **self.__serialize_subscription_id(),
        }

    def __serialize_subscription_id(self) -> Dict[str, Any]:
        if self.subscription_id is None:
            return {}
        return {"subscription_id": self.subscription_id}


class BroadcastOutgoingMessage(BaseOutgoingMessage):
    def __init__(self, message: str) -> None:
        self.message = message

    def serialize(self) -> Any:
        return {"message_type": "broadcast", "body": self.message}
