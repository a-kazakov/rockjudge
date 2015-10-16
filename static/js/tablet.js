"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

React.initializeTouchEvents(true);

var JudgeTablet = (function (_React$Component) {
    _inherits(JudgeTablet, _React$Component);

    // Intiialization

    function JudgeTablet(props) {
        _classCallCheck(this, JudgeTablet);

        _get(Object.getPrototypeOf(JudgeTablet.prototype), "constructor", this).call(this, props);
        this.state = {
            tour: null,
            judge: null,
            current_heat: 1,
            page: "dance",
            active_tour_id: null
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        message_dispatcher.addListener("active_tour_update", this.dispatchActiveTourUpdate.bind(this));
        this.loadData();
    }

    _createClass(JudgeTablet, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var judge = storage.get("Judge").by_id(this.props.judge_id).serialize({});
            var competition = storage.get("Competition").by_id(this.props.competition_id).serialize({ judges: {} });
            var active_tour_id = this.state.active_tour_id;
            if (active_tour_id === null) {
                this.setState({
                    judge: judge,
                    competition: competition,
                    tour: null
                });
                return;
            }
            var active_tour_model = storage.get("Tour").by_id(active_tour_id);
            if (!active_tour_model) {
                this.setState({
                    judge: judge,
                    competition: competition,
                    tour: null
                });
                return;
            }
            this.setState({
                judge: judge,
                competition: competition,
                tour: active_tour_model.serialize({
                    runs: {
                        participant: {
                            "sportsmen": {}
                        },
                        scores: {},
                        acrobatics: {}
                    },
                    inner_competition: {}
                })
            });
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("tournaments.competition.get", { competition_id: this.props.competition_id, children: {
                    judges: {}
                } }).updateDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
            Api("tournaments.tour.find_active", {}).onSuccess((function (response) {
                this.dispatchActiveTourUpdate(response);
            }).bind(this)).send();
        }

        // Dispatchers

    }, {
        key: "dispatchActiveTourUpdate",
        value: function dispatchActiveTourUpdate(response) {
            var tour_id = response.tour_id;
            if (this.state.tour === null && tour_id === null || this.state.tour !== null && this.state.tour.id == tour_id) {
                return;
            }
            this.setState({
                "active_tour_id": tour_id
            });
            if (tour_id === null) {
                storage.del("Tour");
                storage.del("Run");
                storage.del("Score");
                storage.del("Participant");
                storage.del("Sportsman");
                this.setState({
                    tour: null,
                    current_heat: 1
                });
                return;
            }
            Api("tournaments.tour.get", { tour_id: tour_id, children: {
                    runs: {
                        participant: {
                            "sportsmen": {}
                        },
                        scores: {},
                        acrobatics: {}
                    },
                    inner_competition: {}
                } }).updateDB("Tour", tour_id).onSuccess((function () {
                this.reloadFromStorage(tour_id);
                this.setState({
                    current_heat: 1
                });
            }).bind(this)).send();
        }

        // Listeners

    }, {
        key: "onScoreUpdate",
        value: function onScoreUpdate(score_id, new_score) {
            Api("tournaments.score.set", { score_id: score_id, data: new_score }).send();
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
        value: function getHeatsCount() {
            return Math.max.apply(Math, _toConsumableArray(this.state.tour.runs.map(function (run) {
                return run.heat;
            })));
        }

        // Rendering

    }, {
        key: "renderHeader",
        value: function renderHeader() {
            var btn_prev = null;
            var btn_next = null;
            if (this.state.tour !== null) {
                if (this.state.current_heat > 1) {
                    btn_prev = React.createElement(
                        "button",
                        _extends({ className: "btn btn-primary btn-prev-heat" }, onTouchOrClick(this.toPrevHeat.bind(this))),
                        "Previous heat"
                    );
                }
                if (this.state.current_heat < this.getHeatsCount()) {
                    btn_next = React.createElement(
                        "button",
                        _extends({ className: "btn btn-primary btn-next-heat" }, onTouchOrClick(this.toNextHeat.bind(this))),
                        "Next heat"
                    );
                }
            }
            var current_tour = this.state.tour === null ? null : React.createElement(
                "div",
                { className: "header" },
                React.createElement(
                    "h1",
                    null,
                    this.state.tour.inner_competition.name,
                    ": ",
                    this.state.tour.name
                ),
                React.createElement(
                    "h2",
                    null,
                    _("tablet.headers.heat"),
                    ": ",
                    this.state.current_heat,
                    " / ",
                    this.getHeatsCount()
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
        key: "renderJudgeInfo",
        value: function renderJudgeInfo() {
            var judge = this.state.judge;
            var judge_number = judge.role_description || _("global.phrases.judge_n", this.state.judge.number);
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "div",
                    { className: "judge-number" },
                    judge_number
                ),
                React.createElement(
                    "div",
                    { className: "judge-name" },
                    this.state.judge.name
                )
            );
        }
    }, {
        key: "renderScoringLayout",
        value: function renderScoringLayout() {
            if (this.state.tour === null) {
                return this.renderJudgeInfo();
            }
            var cells = this.state.tour.runs.filter((function (run) {
                return run.heat == this.state.current_heat;
            }).bind(this)).map((function (run) {
                var scores_map = {};
                run.scores.forEach(function (score_data) {
                    scores_map[score_data.judge_id] = score_data;
                });
                var header = _("global.phrases.participant_n", run.participant.number, run.participant.sportsmen.length);
                if (typeof scores_map[this.props.judge_id] === "undefined") {
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
                            _("tablet.messages.not_judging")
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
                        acrobatics: run.acrobatics,
                        judge_id: this.props.judge_id,
                        judges: this.state.competition.judges,
                        run_id: run.id,
                        page: this.state.page,
                        scores: scores_map,
                        scoring_system: this.state.tour.scoring_system,
                        onScoreUpdate: this.onScoreUpdate.bind(this, scores_map[this.props.judge_id].id) })
                );
            }).bind(this));
            var one_run_class = cells.length == 1 ? " single-run" : "";
            return React.createElement(
                "table",
                { className: "tablet-main-table" + one_run_class },
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
            if (this.state.tour === null || this.state.judge.role != "tech_judge") {
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
                return React.createElement(
                    "p",
                    null,
                    "Loading ..."
                );
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