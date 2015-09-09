import peewee

from db import Database


class Category(peewee.Model):
    class Meta:
        database = Database.instance().db

    title = peewee.CharField()

