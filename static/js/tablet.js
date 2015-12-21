"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JudgeTablet = (function (_React$Component) {
    _inherits(JudgeTablet, _React$Component);

    function JudgeTablet(props) {
        _classCallCheck(this, JudgeTablet);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(JudgeTablet).call(this, props));

        _this.TOUR_SCHEMA = {
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
        _this.state = {
            tour: null,
            judge: null,
            discipline_judge: null,
            current_heat: 1,
            page: "default"
        };
        _this.active_tour_id = null;
        message_dispatcher.addListener("db_update", _this.reloadFromStorage.bind(_this, false));
        message_dispatcher.addListener("reload_data", _this.loadData.bind(_this));
        message_dispatcher.addListener("active_tour_update", _this.dispatchActiveTourUpdate.bind(_this, false));
        _this.loadData();
        return _this;
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
                    if (tour.discipline && tour.discipline.discipline_judges) {
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
                            state_upd["page"] = "default";
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
    }, {
        key: "stopTour",
        value: function stopTour() {
            var _this2 = this;

            swal_confirm(_("tablet.confirms.stop_tour"), function () {
                if (_this2.state.tour) {
                    Api("tour.stop", { tour_id: _this2.state.tour.id }).onSuccess(function () {
                        return swal.close();
                    }).send();
                }
            });
        }
    }, {
        key: "finalizeTour",
        value: function finalizeTour() {
            var _this3 = this;

            swal_confirm(_("tablet.confirms.finalize_tour"), function () {
                if (_this3.state.tour) {
                    Api("tour.finalize", { tour_id: _this3.state.tour.id }).onSuccess(function () {
                        return swal.close();
                    }).send();
                }
            });
        }
    }, {
        key: "stopTourAndStartNext",
        value: function stopTourAndStartNext() {
            var _this4 = this;

            swal_confirm(_("tablet.confirms.stop_tour_and_start_next"), function () {
                if (_this4.state.tour) {
                    (function () {
                        var tour_id = _this4.state.tour.id;
                        Api("tour.stop", { tour_id: tour_id }).onSuccess(function () {
                            Api("tour.start_next_after", { tour_id: tour_id }).onSuccess(function () {
                                return swal.close();
                            }).send();
                        }).send();
                    })();
                }
            });
        }
    }, {
        key: "finalizeTourAndStartNext",
        value: function finalizeTourAndStartNext() {
            var _this5 = this;

            swal_confirm(_("tablet.confirms.finalize_tour_and_start_next"), function () {
                if (_this5.state.tour) {
                    (function () {
                        var tour_id = _this5.state.tour.id;
                        Api("tour.finalize", { tour_id: tour_id }).onSuccess(function () {
                            Api("tour.start_next_after", { tour_id: tour_id }).onSuccess(function () {
                                return swal.close();
                            }).send();
                        }).send();
                    })();
                }
            });
        }

        // Helpers

    }, {
        key: "getHeatsCount",
        value: function getHeatsCount(runs) {
            var _Math;

            runs = runs || this.state.tour.runs;
            return (_Math = Math).max.apply(_Math, _toConsumableArray(runs.map(function (run) {
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
        key: "renderResults",
        value: function renderResults() {
            return React.createElement(
                "div",
                { className: "body results" },
                React.createElement(TourResultsBody, { tour_id: this.state.tour.id, verbosity: "2" })
            );
        }
    }, {
        key: "renderActions",
        value: function renderActions() {
            return React.createElement(
                "div",
                { className: "body actions" },
                React.createElement(
                    "div",
                    { className: "item" },
                    React.createElement(
                        "button",
                        _extends({ className: "tbtn btn-primary", type: "button"
                        }, onTouchOrClick(this.stopTour.bind(this))),
                        _("tablet.buttons.stop_tour")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "item" },
                    React.createElement(
                        "button",
                        _extends({ className: "tbtn btn-primary", type: "button"
                        }, onTouchOrClick(this.finalizeTour.bind(this))),
                        _("tablet.buttons.finalize_tour")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "item" },
                    React.createElement(
                        "button",
                        _extends({ className: "tbtn btn-primary", type: "button"
                        }, onTouchOrClick(this.stopTourAndStartNext.bind(this))),
                        _("tablet.buttons.stop_tour_and_start_next")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "item" },
                    React.createElement(
                        "button",
                        _extends({ className: "tbtn btn-primary", type: "button"
                        }, onTouchOrClick(this.finalizeTourAndStartNext.bind(this))),
                        _("tablet.buttons.finalize_tour_and_start_next")
                    )
                )
            );
        }
    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var btn_prev = null;
            var btn_next = null;
            var judge = this.state.judge;
            var judge_number = judge.role_description || _("global.phrases.judge_n", judge.number);
            if (this.state.page !== "results" && this.state.page !== "actions") {
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
                { className: "judge-tablet" },
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
                    { className: "splash-screen" },
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
                )
            );
        }
    }, {
        key: "renderScoringLayout",
        value: function renderScoringLayout() {
            if (this.state.page == "results") {
                return this.renderResults();
            }
            if (this.state.page == "actions") {
                return this.renderActions();
            }
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
                var _ret3 = (function () {
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
                            { className: "body" },
                            React.createElement(
                                "table",
                                { className: "main-table", style: { width: first_width + "%", "marginLeft": 0 } },
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
                                { className: "main-table", style: { width: second_width + "%", "marginRight": first_row.length === second_row.length ? 0 : "auto" } },
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

                if ((typeof _ret3 === "undefined" ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
            }
            return React.createElement(
                "div",
                { className: "body" },
                React.createElement(
                    "table",
                    { className: "main-table" + single_run_class },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            cells
                        )
                    )
                ),
                ";"
            );
        }
    }, {
        key: "renderFooter",
        value: function renderFooter() {
            if (this.state.discipline_judge === null) {
                return null;
            }
            if (this.state.discipline_judge.role == "head_judge") {
                return React.createElement(
                    "div",
                    { className: "footer page-selector" },
                    React.createElement(
                        "button",
                        _extends({
                            className: "btn" + (this.state.page == "default" ? " active" : "")
                        }, onTouchOrClick(this.switchPage.bind(this, "default"))),
                        _("tablet.pages.heats")
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "btn" + (this.state.page == "results" ? " active" : "")
                        }, onTouchOrClick(this.switchPage.bind(this, "results"))),
                        _("tablet.pages.results")
                    ),
                    React.createElement(
                        "button",
                        _extends({
                            className: "btn" + (this.state.page == "actions" ? " active" : "")
                        }, onTouchOrClick(this.switchPage.bind(this, "actions"))),
                        _("tablet.pages.actions")
                    )
                );
            }
            if (this.state.discipline_judge.role != "tech_judge" || this.state.tour.scoring_system_name != "rosfarr.acro" && this.state.tour.scoring_system_name != "rosfarr.am_final_acro") {
                return null;
            }
            return React.createElement(
                "div",
                { className: "footer page-selector" },
                React.createElement(
                    "button",
                    _extends({
                        className: "btn" + (this.state.page == "default" ? " active" : "")
                    }, onTouchOrClick(this.switchPage.bind(this, "default"))),
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
                { className: "judge-tablet" },
                this.renderHeader(),
                this.renderScoringLayout(),
                this.renderFooter()
            );
        }
    }]);

    return JudgeTablet;
})(React.Component);
//# sourceMappingURL=tablet.js.map