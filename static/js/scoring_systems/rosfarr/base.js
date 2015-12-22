"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RunScoresWrapper = (function () {
    function RunScoresWrapper(run, discipline_judges) {
        _classCallCheck(this, RunScoresWrapper);

        this.run = run;
        this.discipline_judges = discipline_judges;
        this.scores_by_discipline_judge_id = {};
        run.scores.forEach((function (score) {
            var dj_id = score.discipline_judge_id;
            this.scores_by_discipline_judge_id[dj_id] = score;
        }).bind(this));
    }

    _createClass(RunScoresWrapper, [{
        key: "getScoresByJudgeIds",
        value: function getScoresByJudgeIds(discipline_judge_ids) {
            var _this = this;

            return discipline_judge_ids.map((function (dj_id) {
                return _this.scores_by_discipline_judge_id[dj_id];
            }).bind(this));
        }
    }]);

    return RunScoresWrapper;
})();

var TourScoresWrapper = (function () {
    function TourScoresWrapper(tour, results) {
        var _this2 = this;

        _classCallCheck(this, TourScoresWrapper);

        this.run_wrappers = tour.runs.map(function (run) {
            return new RunScoresWrapper(run, tour.discipline_judges);
        });
        this.discipline_judges = tour.discipline.discipline_judges;
        this.discipline_judges_by_roles = {};
        this.discipline_judges.forEach((function (dj, idx) {
            var arr = this.discipline_judges_by_roles[dj.role] || [];
            arr.push({
                idx: idx,
                discipline_judge: dj
            });
            this.discipline_judges_by_roles[dj.role] = arr;
        }).bind(this));
        if (results) {
            (function () {
                var results_by_run_ids = {};
                results.forEach(function (res) {
                    return results_by_run_ids[res.run_id] = res;
                });
                _this2.run_wrappers.forEach(function (w) {
                    return w.results_info = results_by_run_ids[w.run.id];
                });
                _this2.run_wrappers.sort(function (a, b) {
                    return a.results_info.place - b.results_info.place;
                });
            })();
        }
    }

    _createClass(TourScoresWrapper, [{
        key: "getDisciplineJudgesByRoles",
        value: function getDisciplineJudgesByRoles() {
            if (arguments.length == 1) {
                return this.discipline_judges_by_roles[arguments[0]] ? this.discipline_judges_by_roles[arguments[0]].map(function (b) {
                    return b.discipline_judge;
                }) : [];
            }
            var res = [];
            for (var i = 0; i < arguments.length; ++i) {
                res = res.concat(this.discipline_judges_by_roles[arguments[i]] || []);
            }
            res.sort(function (a, b) {
                return a.idx - b.idx;
            });
            return res.map(function (b) {
                return b.discipline_judge;
            });
        }
    }, {
        key: "getScoresTableByRoles",
        value: function getScoresTableByRoles() {
            var discipline_judge_ids = this.getDisciplineJudgesByRoles.apply(this, arguments).map(function (dj) {
                return dj.id;
            });
            return this.run_wrappers.map(function (w) {
                return w.getScoresByJudgeIds(discipline_judge_ids);
            });
        }
    }, {
        key: "getResultsInfo",
        value: function getResultsInfo() {
            return this.run_wrappers.map(function (w) {
                return w.results_info;
            });
        }
    }, {
        key: "getRuns",
        value: function getRuns() {
            return this.run_wrappers.map(function (w) {
                return w.run;
            });
        }
    }]);

    return TourScoresWrapper;
})();

function getParticipantDisplay(participant) {
    if (participant.formation_name !== "") {
        return React.createElement(
            "p",
            null,
            participant.formation_name
        );
    }
    return participant.sportsmen.map(function (s, idx) {
        return React.createElement(
            "p",
            { key: idx },
            s.last_name + " " + s.first_name
        );
    });
}

function getScoringType(discipline_judge, scoring_system_name) {
    switch (discipline_judge.role) {
        case "dance_judge":
            switch (scoring_system_name) {
                case "rosfarr.formation":
                    return "formation";
                case "rosfarr.simplified":
                    return "simplified";
                default:
                    return "dance";
            }
        case "acro_judge":
            switch (scoring_system_name) {
                case "rosfarr.am_final_fw":
                    return "dance";
                default:
                    return "acro";
            }
        case "tech_judge":
            return "tech";
        case "head_judge":
            return "head";
    }
}
//# sourceMappingURL=base.js.map