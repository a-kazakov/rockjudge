"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JudgeTablet = (function (_React$Component) {
    _inherits(JudgeTablet, _React$Component);

    function JudgeTablet(props) {
        _classCallCheck(this, JudgeTablet);

        _get(Object.getPrototypeOf(JudgeTablet.prototype), "constructor", this).call(this, props);
        this.TOUR_SCHEMA = {
            runs: {
                participant: {},
                scores: {},
                acrobatics: {}
            },
            discipline: {
                discipline_judges: {
                    judge: {}
                }
            }
        };
        this.state = {
            tour: null,
            judge: null,
            discipline_judge: null,
            current_heat: 1,
            page: "dance"
        };
        this.active_tour_id = null;
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this, false));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        message_dispatcher.addListener("active_tour_update", this.dispatchActiveTourUpdate.bind(this, false));
        this.loadData();
    }

    // Loaders

    _createClass(JudgeTablet, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage(reset_heat) {
            var st_judge = storage.get("Judge").by_id(this.props.judge_id);
            if (!st_judge) {
                return;
            }
            var state_upd = {};
            state_upd["judge"] = st_judge.serialize({
                competition: {}
            });
            state_upd["competition"] = state_upd["judge"].competition;
            if (this.active_tour_id !== null) {
                var st_tour = storage.get("Tour").by_id(this.active_tour_id);
                if (st_tour) {
                    var tour = st_tour.serialize(this.TOUR_SCHEMA);
                    state_upd["tour"] = tour;
                    // Find discipline judge
                    state_upd["discipline_judge"] = null;
                    tour.discipline.discipline_judges.forEach((function (dj) {
                        if (dj.judge.id == this.props.judge_id) {
                            state_upd["discipline_judge"] = dj;
                        }
                    }).bind(this));
                    if (reset_heat) {
                        var discipline_judge = state_upd["discipline_judge"];
                        if (!discipline_judge || discipline_judge.role == "head_judge") {
                            state_upd["current_heat"] = 1;
                        } else {
                            var discipline_judge_id = discipline_judge && discipline_judge.id;
                            state_upd["current_heat"] = this.getFirstNonConfirmedHeat(tour.runs, discipline_judge_id) || 1;
                        }
                    }
                }
            }
            this.setState(state_upd);
        }
    }, {
        key: "updateActiveTour",
        value: function updateActiveTour(force_reload, new_active_tour_id) {
            if (new_active_tour_id === null) {
                this.setState({
                    tour: null,
                    discipline_judge: null
                });
                this.active_tour_id = new_active_tour_id;
                storage.del("Tour");
                storage.del("Participant");
                storage.del("Score");
                storage.del("Run");
                storage.del("Discipline");
                storage.del("DisciplineJudge");
                return;
            }
            if (force_reload || new_active_tour_id !== this.active_tour_id) {
                var old_active_tour_id = this.active_tour_id;
                this.active_tour_id = new_active_tour_id;
                Api("tour.get", { tour_id: this.active_tour_id, children: this.TOUR_SCHEMA }).addToDB("Tour", this.active_tour_id).onSuccess(this.reloadFromStorage.bind(this, new_active_tour_id !== old_active_tour_id)).send();
            }
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("judge.get", { judge_id: this.props.judge_id, children: { competition: {} } }).addToDB("Judge", this.props.judge_id).onSuccess(this.reloadFromStorage.bind(this, false)).send();
            Api("tour.find_active", {}).onSuccess(this.dispatchActiveTourUpdate.bind(this, true)).send();
        }

        // Dispatchers

    }, {
        key: "dispatchActiveTourUpdate",
        value: function dispatchActiveTourUpdate(force_reload, data) {
            this.updateActiveTour(force_reload, data["tour_id"]);
        }

        // Listeners

    }, {
        key: "onScoreUpdate",
        value: function onScoreUpdate(score_id, new_score) {
            var request = {
                score_data: new_score,
                force: false
            };
            Api("score.set", { score_id: score_id, data: request }).send();
        }
    }, {
        key: "onScoreConfirm",
        value: function onScoreConfirm(score_id) {
            Api("score.confirm", { score_id: score_id }).send();
        }

        // Actions

    }, {
        key: "toPrevHeat",
        value: function toPrevHeat() {
            this.setState({
                current_heat: this.state.current_heat - 1
            });
        }
    }, {
        key: "toNextHeat",
        value: function toNextHeat() {
            this.setState({
                current_heat: this.state.current_heat + 1
            });
        }
    }, {
        key: "switchPage",
        value: function switchPage(page) {
            this.setState({
                page: page
            });
        }

        // Helpers

    }, {
        key: "getHeatsCount",
        value: function getHeatsCount(runs) {
            runs = runs || this.state.tour.runs;
            return Math.max.apply(Math, _toConsumableArray(runs.map(function (run) {
                return run.heat;
            })));
        }
    }, {
        key: "getFirstNonConfirmedHeat",
        value: function getFirstNonConfirmedHeat(runs, discipline_judge_id) {
            runs = runs || this.state.tour.runs;
            discipline_judge_id = discipline_judge_id || this.state.discipline_judge.id;
            for (var i = 0; i < runs.length; ++i) {
                for (var j = 0; j < runs[i].scores.length; ++j) {
                    var score = runs[i].scores[j];
                    if (score.discipline_judge_id == discipline_judge_id && !score.confirmed && runs[i].performed) {
                        return runs[i].heat;
                    }
                }
            }
            return this.getHeatsCount(runs);
        }

        // Rendering

    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var btn_prev = null;
            var btn_next = null;
            var judge = this.state.judge;
            var judge_number = judge.role_description || _("global.phrases.judge_n", judge.number);
            if (this.state.current_heat > 1) {
                btn_prev = React.createElement(
                    "button",
                    _extends({ className: "btn btn-primary pull-left" }, onTouchOrClick(this.toPrevHeat.bind(this))),
                    _("tablet.buttons.prev_heat")
                );
            }
            if (this.state.current_heat < this.getHeatsCount() && (this.state.discipline_judge.role == "head_judge" || this.getFirstNonConfirmedHeat() > this.state.current_heat)) {
                btn_next = React.createElement(
                    "button",
                    _extends({ className: "btn btn-primary pull-right" }, onTouchOrClick(this.toNextHeat.bind(this))),
                    _("tablet.buttons.next_heat")
                );
            }
            var current_tour = React.createElement(
                "div",
                { className: "header" },
                React.createElement(
                    "table",
                    { className: "full-width" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                null,
                                React.createElement(
                                    "h1",
                                    null,
                                    judge_number
                                ),
                                React.createElement(
                                    "h2",
                                    null,
                                    judge.name
                                )
                            ),
                            React.createElement(
                                "td",
                                null,
                                React.createElement(
                                    "h1",
                                    null,
                                    this.state.tour.discipline.name
                                ),
                                React.createElement(
                                    "h2",
                                    null,
                                    this.state.tour.name,
                                    "       ",
                                    _("tablet.headers.heat"),
                                    ": ",
                                    this.state.current_heat,
                                    " / ",
                                    this.getHeatsCount()
                                )
                            )
                        )
                    )
                )
            );
            return React.createElement(
                "header",
                null,
                btn_prev,
                btn_next,
                current_tour
            );
        }
    }, {
        key: "renderSplashScreen",
        value: function renderSplashScreen() {
            var judge = this.state.judge;
            var judge_number = judge.role_description || _("global.phrases.judge_n", judge.number);
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "a",
                        { className: "btn btn-primary pull-left", href: "/" },
                        _("tablet.buttons.to_start_page")
                    ),
                    React.createElement(
                        "div",
                        { className: "header" },
                        React.createElement(
                            "h1",
                            null,
                            this.state.competition.name
                        )
                    ),
                    React.createElement("div", { className: "clearfix" })
                ),
                React.createElement(
                    "div",
                    { className: "judge-number" },
                    judge_number
                ),
                React.createElement(
                    "div",
                    { className: "judge-name" },
                    this.state.judge.name
                ),
                this.state.tour ? React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "not-judging-discipline" },
                        this.state.tour.discipline.name
                    ),
                    React.createElement(
                        "div",
                        { className: "not-judging-tour" },
                        this.state.tour.name
                    ),
                    React.createElement(
                        "div",
                        { className: "not-judging-message" },
                        _("tablet.messages.not_judging_discipline")
                    )
                ) : null
            );
        }
    }, {
        key: "renderScoringLayout",
        value: function renderScoringLayout() {
            var cells = this.state.tour.runs.filter((function (run) {
                return run.heat == this.state.current_heat;
            }).bind(this)).map((function (run) {
                var scores_map = {};
                run.scores.forEach(function (score_data) {
                    scores_map[score_data.discipline_judge_id] = score_data;
                });
                var current_score = scores_map[this.state.discipline_judge.id];
                var header = _("global.phrases.participant_n", run.participant.number, run.participant.name, run.participant.sportsmen.length);
                if (typeof scores_map[this.state.discipline_judge.id] === "undefined") {
                    return React.createElement(
                        "td",
                        { key: run.id },
                        React.createElement(
                            "h2",
                            null,
                            header
                        ),
                        React.createElement(
                            "h3",
                            { className: "text-center" },
                            _("tablet.messages.not_judging_participant")
                        )
                    );
                }
                return React.createElement(
                    "td",
                    { key: run.id },
                    React.createElement(
                        "h2",
                        null,
                        header
                    ),
                    React.createElement(TabletScoreInput, {
                        discipline_judge: this.state.discipline_judge,
                        all_discipline_judges: this.state.tour.discipline.discipline_judges,
                        score: current_score,
                        readOnly: current_score.confirmed,
                        all_scores: scores_map,
                        run: run,
                        page: this.state.page,
                        scoring_system_name: this.state.tour.scoring_system_name,
                        onScoreUpdate: this.onScoreUpdate.bind(this, current_score.id),
                        onScoreConfirm: this.onScoreConfirm.bind(this, current_score.id) })
                );
            }).bind(this));
            var single_run_class = cells.length == 1 ? " single-run" : "";
            if (cells.length > 3) {
                var _ret = (function () {
                    var first_row = [];
                    var second_row = [];
                    cells.forEach(function (cell, idx) {
                        if (idx % 2 === 0) {
                            first_row.push(cell);
                        } else {
                            second_row.push(cell);
                        }
                    });
                    var half_width = 100 / (2 * first_row.length + 1);
                    var first_width = undefined,
                        second_width = undefined;
                    if (first_row.length === second_row.length) {
                        first_width = 100 - half_width;
                        second_width = 100 - half_width;
                    } else {
                        first_width = 100;
                        second_width = 100 - 2 * half_width;
                    }
                    return {
                        v: React.createElement(
                            "div",
                            null,
                            React.createElement(
                                "table",
                                { className: "tablet-main-table", style: { width: first_width + "%", "margin-left": 0 } },
                                React.createElement(
                                    "tbody",
                                    null,
                                    React.createElement(
                                        "tr",
                                        null,
                                        first_row
                                    )
                                )
                            ),
                            React.createElement(
                                "table",
                                { className: "tablet-main-table", style: { width: second_width + "%", "margin-right": first_row.length === second_row.length ? 0 : "auto" } },
                                React.createElement(
                                    "tbody",
                                    null,
                                    React.createElement(
                                        "tr",
                                        null,
                                        second_row
                                    )
                                )
                            )
                        )
                    };
                })();

                if (typeof _ret === "object") return _ret.v;
            }
            return React.createElement(
                "table",
                { className: "tablet-main-table" + single_run_class },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        cells
                    )
                )
            );
        }
    }, {
        key: "renderFooter",
        value: function renderFooter() {
            if (this.state.discipline_judge === null) {
                return null;
            }
            if (this.state.discipline_judge.role != "tech_judge" || this.state.tour.scoring_system_name != "rosfarr.acro" && this.state.tour.scoring_system_name != "rosfarr.am_final_acro") {
                return null;
            }
            return React.createElement(
                "div",
                { className: "footer page-selector" },
                React.createElement(
                    "h3",
                    null,
                    _("tablet.headers.select_page")
                ),
                React.createElement(
                    "button",
                    _extends({
                        className: "btn" + (this.state.page == "dance" ? " active" : "")
                    }, onTouchOrClick(this.switchPage.bind(this, "dance"))),
                    _("tablet.pages.dance")
                ),
                React.createElement(
                    "button",
                    _extends({
                        className: "btn" + (this.state.page == "acro" ? " active" : "")
                    }, onTouchOrClick(this.switchPage.bind(this, "acro"))),
                    _("tablet.pages.acrobatics")
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.judge === null) {
                return React.createElement(Loader, null);
            }
            if (this.state.tour === null) {
                return this.renderSplashScreen();
            }
            if (this.state.discipline_judge === null) {
                return this.renderSplashScreen();
            }
            return React.createElement(
                "div",
                null,
                this.renderHeader(),
                this.renderScoringLayout(),
                this.renderFooter()
            );
        }
    }]);

    return JudgeTablet;
})(React.Component);
//# sourceMappingURL=tablet.js.map