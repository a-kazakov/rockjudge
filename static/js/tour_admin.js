"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var current_editing_cell = null;

var TourAdminHeatValue = (function (_React$Component) {
    _inherits(TourAdminHeatValue, _React$Component);

    function TourAdminHeatValue(props) {
        _classCallCheck(this, TourAdminHeatValue);

        _get(Object.getPrototypeOf(TourAdminHeatValue.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false,
            current_value: null
        };
    }

    _createClass(TourAdminHeatValue, [{
        key: "render",
        value: function render() {
            if (this.state.editing) {
                return React.createElement(
                    "td",
                    { className: "heat" },
                    React.createElement("input", {
                        className: "input-heat",
                        type: "text",
                        value: this.state.current_value || "",
                        onChange: this.onChange.bind(this),
                        onKeyDown: this.onKeyUp.bind(this) })
                );
            } else {
                return React.createElement(
                    "td",
                    { className: "heat", onClick: this.startEditing.bind(this) },
                    this.props.value
                );
            }
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(event) {
            if (event.keyCode == 13) {
                // Enter
                this.submitValue();
            } else if (event.keyCode == 27) {
                // Esc
                this.stopEditing();
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps, prevState) {
            if (!prevState.editing && this.state.editing) {
                React.findDOMNode(this).querySelector("input").select();
            }
        }
    }, {
        key: "startEditing",
        value: function startEditing() {
            if (current_editing_cell !== null) {
                current_editing_cell.stopEditing();
            }
            current_editing_cell = this;
            this.setState({
                editing: true,
                current_value: this.props.value
            });
        }
    }, {
        key: "stopEditing",
        value: function stopEditing() {
            current_editing_cell = null;
            this.setState({
                editing: false
            });
        }
    }, {
        key: "submitValue",
        value: function submitValue() {
            new Api("tournaments.run.set", { run_id: this.props.run_id, data: { heat: this.state.current_value } }).onSuccess((function () {
                this.stopEditing();
            }).bind(this)).send();
        }
    }, {
        key: "onChange",
        value: function onChange(event) {
            var value = parseInt(event.target.value.replace(/\D/g, ''));
            if (isNaN(value)) {
                value = 0;
            }
            this.setState({
                current_value: value
            });
        }
    }]);

    return TourAdminHeatValue;
})(React.Component);

var TourAdminScoreCellWrapper = (function (_React$Component2) {
    _inherits(TourAdminScoreCellWrapper, _React$Component2);

    function TourAdminScoreCellWrapper(props) {
        _classCallCheck(this, TourAdminScoreCellWrapper);

        _get(Object.getPrototypeOf(TourAdminScoreCellWrapper.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false,
            current_value: this.props.value
        };
    }

    _createClass(TourAdminScoreCellWrapper, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "td",
                { className: "judge" + (this.state.editing ? " editing" : "") },
                React.createElement(TourAdminScoreCell, {
                    judge: this.props.judge,
                    scoring_system: this.props.scoring_system,
                    startEditing: this.startEditing.bind(this),
                    stopEditing: this.stopEditing.bind(this),
                    updateValue: this.updateValue.bind(this),
                    submitValue: this.submitValue.bind(this),
                    editing: this.state.editing,
                    value: this.state.editing ? this.state.current_value : this.props.value })
            );
        }
    }, {
        key: "startEditing",
        value: function startEditing() {
            if (current_editing_cell !== null) {
                current_editing_cell.stopEditing();
            }
            current_editing_cell = this;
            this.setState({
                editing: true,
                current_value: $.extend({}, this.props.value)
            });
        }
    }, {
        key: "stopEditing",
        value: function stopEditing() {
            this.setState({
                editing: false
            });
            current_editing_cell = null;
        }
    }, {
        key: "updateValue",
        value: function updateValue(new_value) {
            var value = this.state.current_value;
            value.raw_data = new_value;
            this.setState({
                current_value: value
            });
        }
    }, {
        key: "submitValue",
        value: function submitValue(new_value) {
            new Api("tournaments.score.set", { score_id: this.props.value.id, data: new_value }).onSuccess((function () {
                this.stopEditing();
            }).bind(this)).send();
        }
    }]);

    return TourAdminScoreCellWrapper;
})(React.Component);

var TourAdminScoresRow = (function (_React$Component3) {
    _inherits(TourAdminScoresRow, _React$Component3);

    function TourAdminScoresRow() {
        _classCallCheck(this, TourAdminScoresRow);

        _get(Object.getPrototypeOf(TourAdminScoresRow.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourAdminScoresRow, [{
        key: "render",
        value: function render() {
            var scores = this.props.judges.map((function (judge) {
                return React.createElement(TourAdminScoreCellWrapper, {
                    judge: judge,
                    scoring_system: this.props.scoring_system,
                    value: this.props.scores.scores[judge.id] });
            }).bind(this));
            return React.createElement(
                "tr",
                { className: this.props.heat % 2 ? "odd-heat" : "" },
                React.createElement(TourAdminHeatValue, {
                    run_id: this.props.run_id,
                    value: this.props.heat,
                    updateValue: this.updateHeat.bind(this) }),
                React.createElement(
                    "td",
                    { className: "number" },
                    this.props.participant.number
                ),
                React.createElement(
                    "td",
                    { className: "name" },
                    this.props.participant.name
                ),
                React.createElement(
                    "td",
                    { className: "club" },
                    this.props.participant.club.name
                ),
                React.createElement(
                    "td",
                    { className: "total" },
                    this.props.scores.total_run_score
                ),
                scores
            );
        }
    }, {
        key: "updateHeat",
        value: function updateHeat(new_value) {
            this.props.updateHeatValue(new_value);
        }
    }]);

    return TourAdminScoresRow;
})(React.Component);

var TourAdminScoresTable = (function (_React$Component4) {
    _inherits(TourAdminScoresTable, _React$Component4);

    // Intiialization

    function TourAdminScoresTable(props) {
        _classCallCheck(this, TourAdminScoresTable);

        _get(Object.getPrototypeOf(TourAdminScoresTable.prototype), "constructor", this).call(this, props);
        this.state = {
            id: 0,
            name: "",
            runs: [],
            judges: [],
            active: false,
            current_editing: null
        };
        // TODO: add filters
        window.message_dispatcher.addListener("score_update run_full_update").fetchObject("tournaments.run.get", true).setFilter((function (message) {
            return message.score_id ? this.getScoreIdPath(message.score_id) !== null : this.getRunIdx(message.run_id) !== null;
        }).bind(this)).setCallback(this.dispatchRunUpdate.bind(this));
        window.message_dispatcher.addListener("score_update run_update").fetchObject("tournaments.run.get", false).setFilter((function (message) {
            return this.getRunIdx(message.run_id) !== null;
        }).bind(this)).setCallback(this.dispatchRunUpdate.bind(this));
        window.message_dispatcher.addListener("tour_update").fetchObject("tournaments.tour.get", false).setFilter((function (message) {
            return this.props.tour_id == message.tour_id;
        }).bind(this)).setCallback(this.dispatchTourUpdate.bind(this));
        window.message_dispatcher.addListener("tour_full_update").fetchObject("tournaments.tour.get", true).setFilter((function (message) {
            return this.props.tour_id == message.tour_id;
        }).bind(this)).setCallback(this.dispatchTourUpdate.bind(this));
        window.message_dispatcher.addListener("active_tour_update").fetchObject("tournaments.tour.find_active").setCallback(this.dispatchActiveTourUpdate.bind(this));
        window.message_dispatcher.addListener("competition_full_update").setCallback(this.loadData.bind(this));
        this.loadData();
    }

    _createClass(TourAdminScoresTable, [{
        key: "loadData",
        value: function loadData() {
            new Api("tournaments.tour.get", { tour_id: this.props.tour_id, recursive: true }).onSuccess((function (tour) {
                if (tour.finalized) {
                    window.location.reload(true);
                }
                this.setState(tour);
            }).bind(this)).send();
        }

        // Dispatchers

    }, {
        key: "dispatchTourUpdate",
        value: function dispatchTourUpdate(new_tour) {
            if (new_tour.finalized) {
                window.location.reload(true);
            }
            this.setState(new_tour);
        }
    }, {
        key: "dispatchRunUpdate",
        value: function dispatchRunUpdate(new_run) {
            var new_runs = $.extend([], this.state.runs);
            var run_idx = this.getRunIdx(new_run.id);
            for (var idx in new_run) if (new_run.hasOwnProperty(idx)) {
                new_runs[run_idx][idx] = new_run[idx];
            }
            this.setState({
                runs: new_runs
            });
        }
    }, {
        key: "dispatchActiveTourUpdate",
        value: function dispatchActiveTourUpdate(message) {
            this.setState({
                active: message.tour_id === this.props.tour_id
            });
        }

        // Helpers

    }, {
        key: "getRunIdx",
        value: function getRunIdx(run_id) {
            var result = null;
            this.state.runs.forEach(function (run, run_idx) {
                if (run.id == run_id) {
                    result = run_idx;
                }
            });
            return result;
        }
    }, {
        key: "getScoreIdPath",
        value: function getScoreIdPath(score_id) {
            var result = null;
            this.state.runs.forEach(function (run, run_idx) {
                for (var score_idx in run.scores.scores) if (run.scores.scores.hasOwnProperty(score_idx)) {
                    if (run.scores.scores[score_idx].id == score_id) {
                        result = [run_idx, score_idx];
                    }
                }
            });
            return result;
        }

        // Listeners

    }, {
        key: "onInitButtonClick",
        value: function onInitButtonClick() {
            if (confirm("Are you sure want to recreate participants list for this tour?")) {
                new Api("tournaments.tour.init", { tour_id: this.props.tour_id }).send();
            }
        }
    }, {
        key: "onFinalizeButtonClick",
        value: function onFinalizeButtonClick() {
            if (confirm("Are you sure want to finalize this tour?")) {
                new Api("tournaments.tour.finalize", { tour_id: this.props.tour_id }).send();
            }
        }
    }, {
        key: "onShuffleHeatsButtonClick",
        value: function onShuffleHeatsButtonClick() {
            if (confirm("Are you sure want to shuffle heats?")) {
                new Api("tournaments.tour.shuffle_heats", { tour_id: this.props.tour_id }).send();
            }
        }
    }, {
        key: "onStartTourButtonClick",
        value: function onStartTourButtonClick() {
            new Api("tournaments.tour.start", { tour_id: this.props.tour_id }).send();
        }
    }, {
        key: "onStopTourButtonClick",
        value: function onStopTourButtonClick() {
            new Api("tournaments.tour.stop", { tour_id: this.props.tour_id }).send();
        }

        // Rendering

    }, {
        key: "renderActiveTourControls",
        value: function renderActiveTourControls() {
            if (!this.state.active) {
                return React.createElement(
                    "button",
                    { className: "btn btn-success", onClick: this.onStartTourButtonClick.bind(this) },
                    "Start tour"
                );
            } else {
                return React.createElement(
                    "span",
                    null,
                    React.createElement(
                        "button",
                        { className: "btn btn-danger", onClick: this.onStopTourButtonClick.bind(this) },
                        "Stop tour"
                    ),
                    React.createElement("br", null)
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            var active_judges = this.state.judges.filter(function (judge) {
                return !judge.hide_from_results;
            });
            var rows = this.state.runs.map((function (run) {
                return React.createElement(TourAdminScoresRow, {
                    key: run.id,
                    run_id: run.id,
                    heat: run.heat,
                    participant: run.participant,
                    scores: run.scores,
                    scoring_system: this.state.scoring_system,
                    total_score: run.total_score,
                    judges: active_judges });
            }).bind(this));
            var judges_header = active_judges.map((function (judge) {
                return React.createElement(
                    "th",
                    { className: "judge" },
                    judge.number
                );
            }).bind(this));
            return React.createElement(
                "div",
                { className: "tour-admin" },
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "div",
                        { className: "controls" },
                        this.state.active ? null : React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.onInitButtonClick.bind(this) },
                            "Recreate list"
                        ),
                        this.state.active ? null : React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.onFinalizeButtonClick.bind(this) },
                            "Finalize"
                        ),
                        this.state.active ? null : React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.onShuffleHeatsButtonClick.bind(this) },
                            "Shuffle heats"
                        ),
                        this.renderActiveTourControls()
                    ),
                    React.createElement(
                        "h1",
                        null,
                        this.state.inner_competition_name
                    ),
                    React.createElement(
                        "h2",
                        null,
                        this.state.name
                    )
                ),
                React.createElement(
                    "table",
                    { className: "scores-table" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { className: "heat" },
                                "Heat"
                            ),
                            React.createElement(
                                "th",
                                { className: "number" },
                                "#"
                            ),
                            React.createElement(
                                "th",
                                { className: "name" },
                                "Name"
                            ),
                            React.createElement(
                                "th",
                                { className: "club" },
                                "Club"
                            ),
                            React.createElement(
                                "th",
                                { className: "total" },
                                "Total"
                            ),
                            judges_header
                        ),
                        rows
                    )
                )
            );
        }
    }]);

    return TourAdminScoresTable;
})(React.Component);
//# sourceMappingURL=tour_admin.js.map