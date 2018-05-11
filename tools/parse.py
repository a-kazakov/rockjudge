#!/usr/bin/env python3

import argparse
import json
import openpyxl as xl
import string
import time

from contextlib import contextmanager
from hashlib import md5
from sys import stdout


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
        self.name, self.external_id = map(str, row[1:3])
        self.sp = int(row[0])
        self.storage[self.name] = self

    @property
    def has_participants(self):
        return len([
            None
            for p in list(Couple.storage.values()) + Formation.storage
            if p.discipline == self.name
        ]) > 0

    @property
    def has_judges(self):
        return len([
            None
            for p in DisciplineJudge.storage
            if p.discipline == self.name
        ]) > 0

    @property
    def has_tours(self):
        return len([
            None
            for p in Tour.storage
            if p.discipline == self.name
        ]) > 0

    def serialize(self, add_tours=True):
        result = {k: getattr(self, k) for k in ["name", "external_id", "sp"]}
        result["participants"] = [
            p.serialize()
            for p in list(Couple.storage.values()) + Formation.storage
            if p.discipline == self.name
        ]
        result["discipline_judges"] = [
            dj.serialize()
            for dj in DisciplineJudge.storage
            if dj.discipline == self.name
        ]
        if add_tours:
            result["tours"] = [
                t.serialize()
                for t in Tour.storage
                if t.discipline == self.name
            ]
        return result


class Judge:
    storage = {}

    def __init__(self, grid, idx):
        row = grid.getRow(idx, 5)
        if row[0] is None:
            raise StopIteration
        self.role_description, self.number, self.name, self.category = row[1:5]
        self.sp = int(row[0])
        self.external_id = md5(self.name.lower().encode("utf-8")).hexdigest()
        self.storage[self.name] = self

    def serialize(self):
        return {
            k: getattr(self, k) if getattr(self, k) is not None else ""
            for k in ["name", "category", "number", "role_description", "sp", "external_id"]
        }


class DisciplineJudge:
    storage = []

    def __init__(self, grid, idx):
        row = grid.getRow(idx, 3)
        if row[0] is None:
            return
        self.discipline = row[0]
        self.judge = Judge.storage[row[1]].external_id
        self.role = row[2]
        self.storage.append(self)

    def serialize(self):
        return {
            k: getattr(self, k) if getattr(self, k) is not None else ""
            for k in ["judge", "role"]
        }


class Couple:
    storage = {}

    def __init__(self, grid, idx):
        row = grid.getRow(idx, 13 + 6 * 2)
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
        acrobatics = []
        for idx in range(12, 12 + 6 * 2, 2):
            if row[idx] is not None:
                acrobatics.append({
                    "description": str(row[idx]),
                    "score": float(row[idx + 1])
                })
        self.number = row[0]
        self.discipline = str(row[7])
        self.club = Club.storage[row[8]].external_id
        self.coaches = str(row[9])
        program_name = row[10]
        default_for = row[11]
        self.programs = [] if program_name is None else [{
            "external_id": str(program_name),
            "default_for": default_for,
            "name": str(program_name),
            "acrobatics": acrobatics,
        }]
        self.external_id = md5((
            str(self.number) + "|" +
            str(self.discipline) + "|" +
            self.club + "|" +
            "|".join([s["first_name"] + "$" + s["last_name"] for s in self.sportsmen])
        ).encode("utf-8")).hexdigest()
        if self.external_id in self.storage:
            if len(self.programs) > 0:
                self.storage[self.external_id].programs.append(self.programs[0])
        else:
            self.storage[self.external_id] = self

    def serialize(self):
        result = {
            k: getattr(self, k)
            for k in ["sportsmen", "club", "coaches", "number", "programs", "external_id"]
            if getattr(self, k) is not None
        }
        return result


class Formation:
    storage = []

    def __init__(self, grid, first_row, num_rows):
        rows = [grid.getRow(i, 9) for i in range(first_row, first_row + num_rows)]
        form_data = rows[0][:5]
        self.number = form_data[0]
        self.discipline = str(form_data[1])
        self.formation_name = str(form_data[2] or "")
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
            self.club + "|" + self.formation_name + "|" + str(self.number) + "|" + self.discipline
        ).encode("utf-8")).hexdigest()
        self.storage.append(self)

    def serialize(self):
        result = {
            k: getattr(self, k)
            for k in ["formation_name", "sportsmen", "acrobatics", "club", "coaches", "number", "external_id"]
            if getattr(self, k) is not None
        }
        result.update({
            "programs": [],
        })
        return result


class Tour:
    storage = []

    def __init__(self, grid, idx):
        row = grid.getRow(idx, 7)
        if row[0] is None:
            return
        self.discipline = row[0]
        self.name = row[1]
        self.hope_tour = row[2] == "Y"
        self.scoring_system_name, self.num_advances, self.participants_per_heat = row[3:6]
        self.default_program = "" if row[6] is None else row[6]
        self.storage.append(self)

    def serialize(self):
        return {
            k: getattr(self, k)
            for k in ["name", "hope_tour", "scoring_system_name", "num_advances", "participants_per_heat", "default_program"]
        }


class CompetitionPlanItem:
    storage = []

    def __init__(self, grid, idx):
        row = grid.getRow(idx, 6)
        if row[0] is None:
            return
        self.sp = row[0]
        self.verbose_name = row[1] if row[1] is not None else ""
        self.discipline_external_id = Discipline.storage[row[2]].external_id if row[2] is not None else None
        self.estimated_beginning, self.estimated_duration = ["" if x is None else x for x in row[4:6]]
        self.storage.append(self)

    def serialize(self):
        return {
            k: getattr(self, k)
            for k in ["sp", "verbose_name", "discipline_external_id", "estimated_beginning", "estimated_duration"]
        }


@contextmanager
def step(s):
    print("{} ... ".format(s), end="")
    stdout.flush()
    t = time.time()
    yield
    print("\r{}: DONE ({:.3f}s)".format(s, time.time() - t))


if __name__ == "__main__":

    parser = argparse.ArgumentParser(description='Converts Excel sheet to RockJudge import format')
    parser.add_argument('infile', metavar='<input file>', type=str,
                        help='Input XLSX file')
    parser.add_argument('outfile', metavar='<output file>', type=str,
                        help='Output TXT file')
    parser.add_argument('-t', '--no-tour', dest='add_tours', action='store_false', default=True,
                        help='Do not include tours into output file')
    parser.add_argument('-p', '--no-plan', dest='add_plan', action='store_false', default=True,
                        help='Do not include competition plan into output file')
    args = parser.parse_args()
    with step("Opening document"):
        filename = args.infile
        wb = xl.load_workbook(filename, data_only=True)

    with step("Loading data"):
        grid_clubs = Grid(wb["Clubs"], first_row=2)
        grid_disciplines = Grid(wb["Disciplines"], first_row=2)
        grid_discipline_judges = Grid(wb["Discipline judges"], first_row=2)
        grid_judges = Grid(wb["Judges"], first_row=2)
        grid_couples = Grid(wb["Couples, solo"], first_row=3)
        grid_forms = Grid(wb["Formations"], first_row=3)
        grid_tours = Grid(wb["Tours"], first_row=2)
        grid_plan = Grid(wb["Competition plan"], first_row=2)

    with step("Parsing clubs"):
        for idx in range(1000):
            try:
                Club(grid_clubs, idx)
            except StopIteration:
                break

    with step("Parsing disciplines"):
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

    with step("Parsing discipline judges"):
        for idx in range(1000):
            DisciplineJudge(grid_discipline_judges, idx)

    with step("Parsing couples"):
        for idx in range(1000):
            try:
                Couple(grid_couples, idx)
            except StopIteration:
                break

    with step("Parsing formations"):
        formation_numbers = grid_forms.getCol(1, 1000)
        latest_row = None
        for idx in range(1000):
            if formation_numbers[idx] is None:
                continue
            if latest_row is not None:
                Formation(grid_forms, latest_row, idx - latest_row)
            latest_row = idx
        if latest_row is not None:
            Formation(grid_forms, latest_row, 1000 - latest_row)

    with step("Parsing tours"):
        for idx in range(1000):
            Tour(grid_tours, idx)

    with step("Parsing competition plan"):
        for idx in range(1000):
            CompetitionPlanItem(grid_plan, idx)

    with step("Saving"):
        with open(args.outfile, "wt", encoding="utf-8") as f:
            f.write(json.dumps({
                "judges": [x.serialize() for x in Judge.storage.values()],
                "clubs": [x.serialize() for x in Club.storage.values()],
                "disciplines": [
                    x.serialize(add_tours=args.add_tours)
                    for x in Discipline.storage.values()
                    if x.has_participants or x.has_judges or x.has_tours
                ],
                "plan": [x.serialize() for x in CompetitionPlanItem.storage] if args.add_plan else []
            }, sort_keys=True, indent=4, ensure_ascii=False))
