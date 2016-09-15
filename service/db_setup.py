#!/usr/bin/env python3

import sys
import random
import psycopg2
import string

from settings import VERSION


def random_string():
    return "".join(random.choice(string.ascii_lowercase) for _ in range(32))


def save_config(db_name, passwd):
    prod_settings = """COOKIE_SECRET = '{cookie_secret}'

DEBUG = False

LISTEN_PORT = 80

DB_CONFIG = {{
    'dbname': '{db_name}',
    'user': '{username}',
    'password': '{db_passwd}',
    'host': '127.0.0.1',
}}

SERVER_ID = {server_id}
""".format(
        cookie_secret=random_string(),
        db_name=db_name,
        username=db_name,
        db_passwd=passwd,
        server_id=random_string(),
    )

    with open("settings_prod.py", "wt") as f:
        f.write(prod_settings)


def restore_config(conn, db_name, new_passwd, db_admin_passwd):
    conn.cursor().execute("ALTER ROLE {} PASSWORD '{}'".format(db_name, new_passwd))
    save_config(db_name, new_passwd)


def setup():
    while True:
        try:
            db_admin_passwd = input("Enter PostgreSQL admin password: ")
            conn = psycopg2.connect(user="postgres", password=db_admin_passwd)
            conn.autocommit = True
            cursor = conn.cursor()
            break
        except Exception as ex:
            print(ex)

    db_name = "rockjudge_{}".format(VERSION)
    passwd = random_string()

    try:
        print("   Creating database user ...")
        cursor.execute("""CREATE ROLE {username} LOGIN PASSWORD '{passwd}'
          NOINHERIT
           VALID UNTIL 'infinity'
        """.format(username=db_name, passwd=passwd))

        print("   Creating database table ...")
        cursor.execute("""CREATE DATABASE {db_name}
          WITH ENCODING='UTF8'
               OWNER={owner}
               CONNECTION LIMIT=-1
        """.format(db_name=db_name, owner=db_name))
        print("   Adding hstore extension ...")
        local_conn = psycopg2.connect(user="postgres", password=db_admin_passwd, database=db_name)
        local_conn.autocommit = True
        local_cursor = local_conn.cursor()
        local_cursor.execute("CREATE EXTENSION hstore")
    except Exception as ex:
        print("   Looks like you've already installed this version of RockJudge.")
        print("   Recreating configuration ... ", end="")
        restore_config(conn, db_name, passwd, db_admin_passwd)
        print("   done.")
        print("   Other copies of this version of RockJudge won't work since now.")
        sys.exit(1)

    save_config(db_name, passwd)


if __name__ == "__main__":
    setup()
