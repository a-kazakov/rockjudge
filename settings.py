COOKIE_SECRET = "cs"

DEBUG = True

LISTEN_PORT = 8080

DB_CONFIG = {
    "dbname": "rock",
    "user": "rock",
    "password": "asd123",
    "host": "127.0.0.1",
}

try:
    from settings_prod import *  # NOQA
except ImportError:
    pass
