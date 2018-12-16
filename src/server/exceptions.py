from typing import Any, Tuple, Optional, TYPE_CHECKING


if TYPE_CHECKING:
    from api import ApiMethod


class ApiError(Exception):
    def __init__(self, code, *args):
        super().__init__(code, *args)
        self.args = args
        self.code = code


class InternalError(ApiError):
    def __init__(self, description: str) -> None:
        super().__init__("errors.global.internal_server_error", description)


class ImmediateResponse(Exception):
    def __init__(
        self,
        value: Any,
        *,
        allowed_methods: Optional[Tuple["ApiMethod", ...]] = None,
        exception_code: str = "errors.global.internal_server_error",
    ) -> None:
        self.value = value
        self.allowed_methods = allowed_methods
        self.exception_code = exception_code

    def get_response(self, method: "ApiMethod") -> None:
        if self.allowed_methods is not None and method not in self.allowed_methods:
            raise ApiError(self.exception_code)
        return self.value
