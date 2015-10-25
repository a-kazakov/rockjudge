#!/usr/bin/env python3

import json
import openpyxl as xl
import string
import time

from contextlib import contextmanager
from hashlib import md5
from sys import argv, stdout


class Grid:
    def __init__(self, sheet, first_row=1, first_col=1):
        self.sheet = sheet
        self.first_row = first_row
        self.first_col = first_col

    @staticmethod
    def formatCol(col):
        res = ""
        if col <= 26:
            return string.ascii_uppercase[col - 1]
        col -= 27
        while col > 0 or len(res) < 2:
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
        self.name, self.city, self.external_id = map(str, row)
        self.storage[self.name] = self

    def serialize(self):
        return {k: getattr(self, k) for k in ["name", "city", "external_id"]}


class Discipline:
    storage = {}

    def __init__(self, grid, idx):
        row = grid.getRow(idx, 3)
        if row[0] is None:
            raise StopIteration
        self.name, self.external_id = map(str, row[:2])
        self.sp = int(row[2])
        self.storage[self.name] = self

    @property
    def has_participants(self):
        return len([
            None
            for p in Couple.storage + Formation.storage
            if p.discipline == self.name
        ]) > 0

    def serialize(self):
        result = {k: getattr(self, k) for k in ["name", "external_id", "sp"]}
        result["participants"] = [
            p.serialize()
            for p in Couple.storage + Formation.storage
            if p.discipline == self.name
        ]
        return result


class Judge:
    storage = {}

    def __init__(self, grid, idx):
        row = grid.getRow(idx, 6)
        if row[0] is None:
            raise StopIteration
        self.name, self.category, self.number, self.role_description, self.role = row[:5]
        self.sp = int(row[5])
        self.external_id = md5(self.name.lower().encode("utf-8")).hexdigest()
        self.storage[self.name] = self

    def serialize(self):
        return {
            k: getattr(self, k) if getattr(self, k) is not None else ""
            for k in ["name", "category", "number", "role_description", "role", "sp", "external_id"]
        }


class Couple:
    storage = []

    def __init__(self, grid, idx):
        row = grid.getRow(idx, 9 + 6 * 2)
        if row[1] is None and row[4] is None:
            raise StopIteration
        self.sportsmen = []
        if row[1] is not None:
            self.sportsmen.append({
                "last_name": str(row[1]),
                "first_name": str(row[2]),
                "year_of_birth": int(row[3]),
                "gender": "F",
            })
        if row[4] is not None:
            self.sportsmen.append({
                "last_name": str(row[4]),
                "first_name": str(row[5]),
                "year_of_birth": int(row[6]),
                "gender": "M",
            })
        self.acrobatics = []
        for idx in range(10, 9 + 6 * 2, 2):
            if row[idx] is not None:
                self.acrobatics.append({
                    "description": str(row[idx]),
                    "score": float(row[idx + 1])
                })
        self.number = row[0]
        self.discipline = str(row[7])
        self.club = Club.storage[row[8]].external_id
        self.coaches = str(row[9])
        self.external_id = md5((
            self.club + "|" +
            "|".join([s["first_name"] + "$" + s["last_name"] for s in self.sportsmen])
        ).encode("utf-8")).hexdigest()
        self.storage.append(self)

    def serialize(self):
        return {
            k: getattr(self, k)
            for k in ["sportsmen", "acrobatics", "club", "coaches", "number", "external_id"]
            if getattr(self, k) is not None
        }


class Formation:
    storage = []

    def __init__(self, grid, first_row, num_rows):
        rows = [grid.getRow(i, 9) for i in range(first_row, first_row + num_rows)]
        form_data = rows[0][:5]
        self.number = form_data[0]
        self.discipline = str(form_data[1])
        self.formation_name = str(form_data[2])
        self.club = Club.storage[form_data[3]].external_id
        self.coaches = str(form_data[4])
        self.sportsmen = [
            {
                "last_name": row[5],
                "first_name": row[6],
                "year_of_birth": row[7],
                "gender": row[8],
            } for row in rows
            if row[5] is not None
        ]
        self.acrobatics = []
        self.external_id = md5((
            self.club + "|" + self.formation_name
        ).encode("utf-8")).hexdigest()
        self.storage.append(self)

    def serialize(self):
        return {
            k: getattr(self, k)
            for k in ["formation_name", "sportsmen", "acrobatics", "club", "coaches", "number", "external_id"]
            if getattr(self, k) is not None
        }


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
    grid_disciplines = Grid(wb["Disciplines"], first_row=2)
    grid_judges = Grid(wb["Judges"], first_row=2)
    grid_couples = Grid(wb["Couples, solo"], first_row=3)
    grid_forms = Grid(wb["Formations"], first_row=3)


with step("Parsing clubs"):
    for idx in range(1000):
        try:
            Club(grid_clubs, idx)
        except StopIteration:
            break


with step("Parsing discipline"):
    for idx in range(1000):
        try:
            Discipline(grid_disciplines, idx)
        except StopIteration:
            break


with step("Parsing judges"):
    for idx in range(1000):
        try:
            Judge(grid_judges, idx)
        except StopIteration:
            break


with step("Parsing couples"):
    for idx in range(1000):
        try:
            Couple(grid_couples, idx)
        except StopIteration:
            break


with step("Parsing formations"):
    formation_names = grid_forms.getCol(2, 1000)
    latest_row = None
    for idx in range(1000):
        if formation_names[idx] is None:
            continue
        if latest_row is not None:
            Formation(grid_forms, latest_row, idx - latest_row)
        latest_row = idx
    if latest_row is not None:
        Formation(grid_forms, latest_row, 1000 - latest_row)


with step("Saving"):
    with open(argv[2], "wt", encoding="utf-8") as f:
        f.write(json.dumps({
            "judges": [x.serialize() for x in Judge.storage.values()],
            "clubs": [x.serialize() for x in Club.storage.values()],
            "disciplines": [x.serialize() for x in Discipline.storage.values() if x.has_participants],
        }, sort_keys=True, indent=4, ensure_ascii=False))
