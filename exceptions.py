class ApiError(Exception):
    def __init__(self, code, *args):
        super().__init__(code, *args)
        self.args = args
        self.code = code
