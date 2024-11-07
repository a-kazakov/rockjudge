COOKIE_SECRET = "cs"

DEBUG = True

LISTEN_PORT = 80

DB_CONFIG = {
    "dbname": "rock",
    "user": "rock",
    "password": "asd123",
    "host": "127.0.0.1",
}

VERSION = "v2_4"

SERVER_ID = "1234567890"

try:
    from settings_prod import *  # NOQA

    print("Loaded production settings")
except ImportError:
    print("Loaded development settings")
