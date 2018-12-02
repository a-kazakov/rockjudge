class ApiError(Exception):
    def __init__(self, code, *args):
        super().__init__(code, *args)
        self.args = args
        self.code = code


class InternalError(ApiError):
    def __init__(self, description: str) -> None:
        super().__init__("errors.global.internal_server_error", description)
