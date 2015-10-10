#!/usr/bin/env python3

import json
import openpyxl as xl
import string
import time

from contextlib import contextmanager
from sys import argv, stdout

class Grid:
    def __init__(self, sheet, first_row=1, first_col=1):
        self.sheet = sheet
        self.first_row = first_row
        self.first_col = first_col

    @staticmethod
    def formatCol(col):
        res = ""
        col -= 1
        while col > 0 or res == "":
            res = string.ascii_uppercase[col % 26] + res
            col //= 26
        return res

    def getCellIdx(self, row, col):
        return "{}{}".format(self.formatCol(col + self.first_col), row + self.first_row)

    def getRow(self, row, num_elements):
        return [
            self.sheet[self.getCellIdx(row, col)].value
            for col in range(num_elements)
        ]

    def getCol(self, col, num_elements):
        return [
            self.sheet[self.getCellIdx(row, col)].value
            for row in range(num_elements)
        ]


class Club:
    storage = {}
    def __init__(self, grid, idx):
        row = grid.getRow(idx, 3)
        if row[0] is None:
            raise StopIteration
        self.name, self.city, self.external_id = row
        self.storage[self.name] = self

    def serialize(self):
        return { k: getattr(self, k) for k in ["name", "city", "external_id"] }


class Category:
    storage = {}
    def __init__(self, grid, idx):
        row = grid.getRow(idx, 2)
        if row[0] is None:
            raise StopIteration
        self.name, self.external_id = row
        self.storage[self.name] = self

    def serialize(self):
        result = { k: getattr(self, k) for k in ["name", "external_id"] }
        result["participants"] = [
            p.serialize()
            for p in Couple.storage + Formation.storage
            if p.category == self.name
        ]
        return result


class Couple:
    storage = []
    def __init__(self, grid, idx):
        row = grid.getRow(idx, 9 + 6 * 2)
        if row[0] is None and row[3] is None:
            raise StopIteration
        self.sportsmen = []
        if row[0] is not None:
            self.sportsmen.append({
                "last_name": row[0],
                "first_name": row[1],
                "year_of_birth": int(row[2]),
                "gender": "F",
            })
        if row[3] is not None:
            self.sportsmen.append({
                "last_name": row[3],
                "first_name": row[4],
                "year_of_birth": int(row[5]),
                "gender": "M",
            })
        self.acrobatics = []
        for idx in range(9, 9 + 6 * 2, 2):
            if row[idx] is not None:
                self.acrobatics.append({
                    "description": row[idx],
                    "score": float(row[idx + 1])
                })
        self.category = row[6]
        self.club = Club.storage[row[7]].external_id
        self.coach = row[8]
        self.external_id = None
        self.storage.append(self)

    def serialize(self):
        return { k: getattr(self, k) for k in ["sportsmen", "acrobatics", "club", "coach", "external_id"] }


class Formation:
    storage = []
    def __init__(self, grid, idx):
        cols = [grid.getCol(4 * idx + i, 100) for i in range(4)]
        form_data = cols[0][:4]
        if form_data[0] is None:
            raise StopIteration
        self.formation_name = form_data[0]
        self.category = form_data[1]
        self.club = Club.storage[form_data[2]].external_id
        self.coach = form_data[3]
        self.sportsmen = [
            {
                "last_name": cols[0][idx],
                "first_name": cols[1][idx],
                "year_of_birth": cols[2][idx],
                "gender": cols[3][idx],
            } for idx in range(5, 100)
            if cols[0][idx] is not None
        ]
        self.acrobatics = []
        self.external_id = None
        self.storage.append(self)

    def serialize(self):
        return { k: getattr(self, k) for k in ["formation_name", "sportsmen", "acrobatics", "club", "coach", "external_id"] }


@contextmanager
def step(s):
    print("{} ... ".format(s), end="")
    stdout.flush()
    t = time.time()
    yield
    print("\r{}: DONE ({:.3f}s)".format(s, time.time() - t))


with step("Opening document"):
    filename = argv[1]
    wb = xl.load_workbook(filename)


with step("Loading data"):
    grid_clubs = Grid(wb["Clubs"], first_row=2)
    grid_categoriess = Grid(wb["Categories"], first_row=2)
    grid_couples = Grid(wb["Couples, solo"], first_row=3)
    grid_forms = Grid(wb["Formations"], first_col=2)


with step("Parsing clubs"):
    for idx in range(1000):
        try:
            Club(grid_clubs, idx)
        except StopIteration:
            break


with step("Parsing category"):
    for idx in range(1000):
        try:
            Category(grid_categoriess, idx)
        except StopIteration:
            break


with step("Parsing couples"):
    for idx in range(1000):
        try:
            Couple(grid_couples, idx)
        except StopIteration:
            break


with step("Parsing formations"):
    for idx in range(1000):
        try:
            Formation(grid_forms, idx)
        except StopIteration:
            break


with step("Saving"):
    with open(argv[2], "wt", encoding="utf-8") as f:
        f.write(json.dumps({
            "clubs": [x.serialize() for x in Club.storage.values()],
            "categories": [x.serialize() for x in Category.storage.values()],
        }, sort_keys=True, indent=4, ensure_ascii=False))

