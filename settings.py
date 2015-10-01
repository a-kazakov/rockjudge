COOKIE_SECRET = "cs"

DEBUG = True

LISTEN_PORT = 5000

DB_CONFIG = {
    "dbname": "rock",
    "user": "rock",
    "password": "asd123",
    "host": "127.0.0.1",
}

APPS = [
    "participants",
    "tournaments",
]


try:
    from settings_prod import *
except ImportError:
    pass
