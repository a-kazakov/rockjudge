COOKIE_SECRET = "cs"

DEBUG = True

LISTEN_PORT = 80

DB_CONFIG = {
    "dbname": "rock",
    "user": "rock",
    "password": "asd123",
    "host": "127.0.0.1",
}

VERSION = "v1_6"

SERVER_ID = "1234567890"

try:
    from settings_prod import *  # NOQA
    print("Loaded production settings")
except ImportError:
    print("Loaded develoment settings")
