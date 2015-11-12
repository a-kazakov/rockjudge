"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
                ReactDOM.findDOMNode(this).querySelector("input").select();
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
            Api("run.set", { run_id: this.props.run_id, data: { heat: this.state.current_value } }).onSuccess((function () {
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

var TourAdminButtons = (function (_React$Component2) {
    _inherits(TourAdminButtons, _React$Component2);

    function TourAdminButtons() {
        _classCallCheck(this, TourAdminButtons);

        _get(Object.getPrototypeOf(TourAdminButtons.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourAdminButtons, [{
        key: "signal",
        value: function signal(message) {
            var _this = this;

            return (function () {
                return _this.props.onSignal(message);
            }).bind(this);
        }
    }, {
        key: "render",
        value: function render() {
            var result = [];
            if (!this.props.tour.active) {
                result = result.concat([React.createElement(
                    "button",
                    { className: "btn btn-primary", onClick: this.signal("init_tour"), key: "btn-init-tour" },
                    _("judging.buttons.init_tour")
                ), React.createElement(
                    "button",
                    { className: "btn btn-primary", onClick: this.signal("finalize_tour"), key: "btn-finalize-tour" },
                    _("judging.buttons.finalize_tour")
                ), React.createElement(
                    "button",
                    { className: "btn btn-primary", onClick: this.signal("shuffle_heats"), key: "btn-shuffle-heats" },
                    _("judging.buttons.shuffle_heats")
                )]);
            }
            result.push(React.createElement(TourAdminStartStopTourButton, {
                tour: this.props.tour,
                onStart: this.signal("start_tour"),
                onStop: this.signal("stop_tour"),
                key: "btn-start-stop" }));
            return React.createElement(
                "div",
                null,
                result
            );
        }
    }]);

    return TourAdminButtons;
})(React.Component);

var TourAdminScoreCellWrapper = (function (_React$Component3) {
    _inherits(TourAdminScoreCellWrapper, _React$Component3);

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
            if (typeof this.props.value === "undefined") {
                return React.createElement(
                    "td",
                    { className: "no-score" },
                    " "
                );
            }
            var classes = ["judge"].concat(this.state.editing ? ["editing"] : []).concat(this.props.confirmed ? ["confirmed-score"] : []);
            return React.createElement(
                "td",
                { className: classes.join(" ") },
                React.createElement(TourAdminScoreCell, {
                    discipline_judge: this.props.discipline_judge,
                    scoring_system_name: this.props.scoring_system_name,
                    startEditing: this.startEditing.bind(this),
                    stopEditing: this.stopEditing.bind(this),
                    updateValue: this.updateValue.bind(this),
                    submitValue: this.submitValue.bind(this),
                    toggleConfirmation: this.toggleConfirmation.bind(this),
                    editing: this.state.editing,
                    value: this.state.editing ? this.state.current_value : this.props.value,
                    confirmed: this.props.confirmed })
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
            var request = {
                score_data: new_value,
                force: true
            };
            Api("score.set", { score_id: this.props.score_id, data: request }).onSuccess(this.stopEditing.bind(this)).send();
        }
    }, {
        key: "toggleConfirmation",
        value: function toggleConfirmation() {
            if (this.props.confirmed) {
                Api("score.unconfirm", { score_id: this.props.score_id }).send();
            } else {
                Api("score.confirm", { score_id: this.props.score_id }).send();
            }
        }
    }]);

    return TourAdminScoreCellWrapper;
})(React.Component);

var TourAdminScoresRow = (function (_React$Component4) {
    _inherits(TourAdminScoresRow, _React$Component4);

    function TourAdminScoresRow() {
        _classCallCheck(this, TourAdminScoresRow);

        _get(Object.getPrototypeOf(TourAdminScoresRow.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourAdminScoresRow, [{
        key: "render",
        value: function render() {
            var scores_map = {};
            this.props.run.scores.forEach(function (score_data) {
                scores_map[score_data.discipline_judge_id] = score_data;
            });
            var scores = this.props.discipline_judges.map((function (discipline_judge, idx) {
                var score = scores_map[discipline_judge.id];
                return React.createElement(TourAdminScoreCellWrapper, {
                    key: score && score.id || "I" + idx,
                    discipline_judge: discipline_judge,
                    scoring_system_name: this.props.scoring_system_name,
                    score_id: score && score.id,
                    value: score && score.data,
                    confirmed: score && score.confirmed });
            }).bind(this));
            return React.createElement(
                "tr",
                { className: this.props.run.heat % 2 ? "odd-heat" : "" },
                React.createElement(TourAdminHeatValue, {
                    run_id: this.props.run.id,
                    value: this.props.run.heat,
                    updateValue: this.updateHeat.bind(this) }),
                React.createElement(
                    "td",
                    { className: "number" },
                    this.props.run.participant.number
                ),
                React.createElement(
                    "td",
                    { className: "name" },
                    this.props.run.participant.name
                ),
                React.createElement(TourAdminAcrobaticsCell, {
                    run_id: this.props.run.id,
                    program_name: this.props.run.program_name,
                    acrobatics: this.props.run.acrobatics,
                    programs: this.props.run.participant.programs }),
                React.createElement(
                    "td",
                    { className: "total" },
                    this.props.run.total_score
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

var TourAdminStartStopTourButton = (function (_React$Component5) {
    _inherits(TourAdminStartStopTourButton, _React$Component5);

    function TourAdminStartStopTourButton() {
        _classCallCheck(this, TourAdminStartStopTourButton);

        _get(Object.getPrototypeOf(TourAdminStartStopTourButton.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourAdminStartStopTourButton, [{
        key: "render",
        value: function render() {
            if (this.props.tour.active) {
                return React.createElement(
                    "button",
                    { className: "btn btn-danger", onClick: this.props.onStop },
                    _("judging.buttons.stop_tour")
                );
            } else {
                return React.createElement(
                    "button",
                    { className: "btn btn-success", onClick: this.props.onStart },
                    _("judging.buttons.start_tour")
                );
            }
        }
    }]);

    return TourAdminStartStopTourButton;
})(React.Component);

var TourAdminAcrobaticEditorRow = (function (_React$Component6) {
    _inherits(TourAdminAcrobaticEditorRow, _React$Component6);

    function TourAdminAcrobaticEditorRow() {
        _classCallCheck(this, TourAdminAcrobaticEditorRow);

        _get(Object.getPrototypeOf(TourAdminAcrobaticEditorRow.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourAdminAcrobaticEditorRow, [{
        key: "onPlus",
        value: function onPlus() {
            var value = Math.round(2 * this.props.acrobatic.score + 1) / 2;
            Api("acrobatic_override.set", {
                run_id: this.props.run_id,
                acrobatic_idx: this.props.acro_idx,
                score: value
            }).send();
        }
    }, {
        key: "onMinus",
        value: function onMinus() {
            var value = Math.max(0, Math.round(2 * this.props.acrobatic.score - 1) / 2);
            Api("acrobatic_override.set", {
                run_id: this.props.run_id,
                acrobatic_idx: this.props.acro_idx,
                score: value
            }).send();
        }
    }, {
        key: "onReset",
        value: function onReset() {
            Api("acrobatic_override.set", {
                run_id: this.props.run_id,
                acrobatic_idx: this.props.acro_idx,
                score: null
            }).send();
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "description" },
                    this.props.acrobatic.description
                ),
                React.createElement(
                    "td",
                    { className: "old-score" },
                    this.props.acrobatic.original_score.toFixed(1)
                ),
                React.createElement(
                    "td",
                    { className: "new-score" },
                    this.props.acrobatic.has_override ? this.props.acrobatic.score.toFixed(1) : null
                ),
                React.createElement(
                    "td",
                    { className: "controls" },
                    this.props.acrobatic.has_override ? React.createElement(
                        "button",
                        { className: "btn btn-default btn-sm", onClick: this.onReset.bind(this) },
                        _("judging.buttons.reset_acrobatic_override")
                    ) : null,
                    React.createElement(
                        "button",
                        { className: "btn btn-default btn-sm", onClick: this.onMinus.bind(this) },
                        "−"
                    ),
                    React.createElement(
                        "button",
                        { className: "btn btn-default btn-sm", onClick: this.onPlus.bind(this) },
                        "+"
                    )
                )
            );
        }
    }]);

    return TourAdminAcrobaticEditorRow;
})(React.Component);

var TourAdminAcrobaticLoader = (function (_React$Component7) {
    _inherits(TourAdminAcrobaticLoader, _React$Component7);

    function TourAdminAcrobaticLoader() {
        _classCallCheck(this, TourAdminAcrobaticLoader);

        _get(Object.getPrototypeOf(TourAdminAcrobaticLoader.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourAdminAcrobaticLoader, [{
        key: "onSubmit",
        value: function onSubmit() {
            var value = this.refs.selector.value;
            if (value === "null") {
                value = null;
            }
            if (confirm("sure?")) {
                this.props.onLoad(value);
            }
        }
    }, {
        key: "renderSelector",
        value: function renderSelector() {
            return React.createElement(
                "select",
                { defaultValue: "null", ref: "selector" },
                React.createElement(
                    "option",
                    { value: "null" },
                    "-"
                ),
                this.props.programs.map(function (program) {
                    return React.createElement(
                        "option",
                        { value: program.id, key: program.id },
                        program.name
                    );
                })
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.onSubmit.bind(this), className: "acro-loader pull-left" },
                this.renderSelector(),
                React.createElement(
                    "button",
                    { className: "btn btn-primary btn-sm" },
                    _("global.buttons.load")
                )
            );
        }
    }]);

    return TourAdminAcrobaticLoader;
})(React.Component);

var TourAdminAcrobaticEditor = (function (_React$Component8) {
    _inherits(TourAdminAcrobaticEditor, _React$Component8);

    function TourAdminAcrobaticEditor() {
        _classCallCheck(this, TourAdminAcrobaticEditor);

        _get(Object.getPrototypeOf(TourAdminAcrobaticEditor.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourAdminAcrobaticEditor, [{
        key: "loadAcrobatics",
        value: function loadAcrobatics(program_id) {
            Api("run.load_program", { program_id: program_id, run_id: this.props.run_id }).send();
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            var _this2 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h4",
                    null,
                    this.props.program_name
                ),
                React.createElement(
                    "table",
                    { className: "acrobatics" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { className: "description" },
                                _("judging.labels.acro_description")
                            ),
                            React.createElement(
                                "th",
                                { className: "old-score" },
                                _("judging.labels.old_score")
                            ),
                            React.createElement(
                                "th",
                                { className: "new-score" },
                                _("judging.labels.new_score")
                            ),
                            React.createElement("th", { className: "controls" })
                        ),
                        this.props.acrobatics.map(function (acro, idx) {
                            return React.createElement(TourAdminAcrobaticEditorRow, {
                                acrobatic: acro,
                                acro_idx: idx,
                                run_id: _this2.props.run_id,
                                key: idx });
                        })
                    )
                )
            );
        }
    }, {
        key: "renderMock",
        value: function renderMock() {
            return React.createElement(
                "div",
                { className: "no-program text-center" },
                "No program loaded"
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "form-acro-input" },
                this.props.program_name === null ? this.renderMock() : this.renderBody(),
                React.createElement(TourAdminAcrobaticLoader, {
                    onLoad: this.loadAcrobatics.bind(this),
                    programs: this.props.programs }),
                React.createElement(
                    "button",
                    { className: "btn btn-primary btn-sm pull-right", onClick: this.props.stopEditing },
                    _("global.buttons.close")
                ),
                React.createElement("div", { className: "clearfix" })
            );
        }
    }]);

    return TourAdminAcrobaticEditor;
})(React.Component);

var TourAdminAcrobaticsCell = (function (_React$Component9) {
    _inherits(TourAdminAcrobaticsCell, _React$Component9);

    function TourAdminAcrobaticsCell(props) {
        _classCallCheck(this, TourAdminAcrobaticsCell);

        _get(Object.getPrototypeOf(TourAdminAcrobaticsCell.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
    }

    _createClass(TourAdminAcrobaticsCell, [{
        key: "startEditing",
        value: function startEditing() {
            if (current_editing_cell !== null) {
                current_editing_cell.stopEditing();
            }
            current_editing_cell = this;
            this.setState({
                editing: true
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
        key: "render",
        value: function render() {
            if (this.state.editing) {
                return React.createElement(
                    "td",
                    { className: "acrobatics editing" },
                    React.createElement(TourAdminAcrobaticEditor, _extends({
                        stopEditing: this.stopEditing.bind(this)
                    }, this.props))
                );
            }
            if (this.props.program_name === null) {
                return React.createElement(
                    "td",
                    { className: "acrobatics", onClick: this.startEditing.bind(this) },
                    "—"
                );
            }
            var has_overrides = false;
            var original_score = 0;
            var score = 0;
            this.props.acrobatics.forEach(function (acro) {
                original_score += acro.original_score;
                score += acro.score;
                has_overrides = has_overrides || acro.score != acro.original_score;
            });
            return React.createElement(
                "td",
                { className: "acrobatics", onClick: this.startEditing.bind(this) },
                has_overrides ? original_score.toFixed(1) + " → " + score.toFixed(1) : score.toFixed(1)
            );
        }
    }]);

    return TourAdminAcrobaticsCell;
})(React.Component);

var TourAdminBody = (function (_React$Component10) {
    _inherits(TourAdminBody, _React$Component10);

    // Intiialization

    function TourAdminBody(props) {
        _classCallCheck(this, TourAdminBody);

        _get(Object.getPrototypeOf(TourAdminBody.prototype), "constructor", this).call(this, props);
        this.state = {
            name: null
        };
    }

    _createClass(TourAdminBody, [{
        key: "componentWillMount",
        value: function componentWillMount() {
            this.storage = storage.getDomain("judging_" + this.props.tour_id);
            this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
            this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
            this.loadData();
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            message_dispatcher.removeListener(this.reload_listener);
            message_dispatcher.removeListener(this.db_update_listener);
            storage.delDomain("judging_" + this.props.tour_id);
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                discipline: {
                    competition: {},
                    discipline_judges: {
                        judge: {}
                    }
                },
                runs: {
                    scores: {},
                    participant: {
                        programs: {}
                    }
                }
            };
            var serialized = this.storage.get("Tour").by_id(this.props.tour_id).serialize(SCHEMA);
            this.setState(serialized);
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("tour.get", {
                tour_id: this.props.tour_id,
                children: {
                    discipline: {
                        competition: {},
                        discipline_judges: {
                            judge: {}
                        }
                    },
                    runs: {
                        acrobatics: {},
                        scores: {},
                        participant: {
                            programs: {}
                        }
                    }
                }
            }).addToDB("Tour", this.props.tour_id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
        }

        // Listeners

    }, {
        key: "onSignal",
        value: function onSignal(message) {
            switch (message) {
                case "init_tour":
                    if (confirm(_("judging.confirms.init_tour"))) {
                        Api("tour.init", { tour_id: this.props.tour_id }).send();
                    }
                    break;
                case "finalize_tour":
                    if (confirm(_("judging.confirms.finalize_tour"))) {
                        Api("tour.finalize", { tour_id: this.props.tour_id }).send();
                    }
                    break;
                case "shuffle_heats":
                    if (confirm(_("judging.confirms.shuffle_heats"))) {
                        Api("tour.shuffle_heats", { tour_id: this.props.tour_id }).send();
                    }
                    break;
                case "start_tour":
                    Api("tour.start", { tour_id: this.props.tour_id }).send();
                    break;
                case "stop_tour":
                    Api("tour.stop", { tour_id: this.props.tour_id }).send();
                    break;
                default:
                    console.error("Unknown signal received:", message);
            }
        }

        // Helpers

    }, {
        key: "getAcrobaticOverrides",
        value: function getAcrobaticOverrides() {
            var result = [];
            this.state.runs.forEach(function (run) {
                run.acrobatics.forEach(function (acro, idx) {
                    if (acro.original_score != acro.score) {
                        result.push({
                            run: run,
                            acro_idx: idx + 1,
                            acro_description: acro.description,
                            score: acro.score,
                            original_score: acro.original_score
                        });
                    }
                });
            });
            return result;
        }

        // Rendering

    }, {
        key: "render",
        value: function render() {
            if (this.state.name === null) {
                return React.createElement(
                    "span",
                    null,
                    "Loading..."
                );
            }
            var discipline_judges = this.state.discipline.discipline_judges;
            var rows = this.state.runs.map((function (run) {
                return React.createElement(TourAdminScoresRow, {
                    key: run.id,
                    run: run,
                    scoring_system_name: this.state.scoring_system_name,
                    discipline_judges: discipline_judges });
            }).bind(this));
            var judges_header = discipline_judges.map((function (discipline_judge) {
                // TODO: move role staff to scoring system logic
                return React.createElement(
                    "th",
                    { className: "judge", key: discipline_judge.id },
                    discipline_judge.judge.number + (discipline_judge.role == "acro_judge" ? "*" : "")
                );
            }).bind(this));
            return React.createElement(
                "div",
                { className: "tour-admin" },
                React.createElement(
                    "table",
                    { className: "bordered-table" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { className: "heat" },
                                React.createElement(
                                    "p",
                                    null,
                                    _("judging.labels.heat")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "number" },
                                React.createElement(
                                    "p",
                                    null,
                                    _("judging.labels.number")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "name" },
                                React.createElement(
                                    "p",
                                    null,
                                    _("judging.labels.participant_name")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "acrobatics" },
                                React.createElement(
                                    "p",
                                    null,
                                    _("judging.labels.acrobatics")
                                )
                            ),
                            React.createElement(
                                "th",
                                { className: "total" },
                                React.createElement(
                                    "p",
                                    null,
                                    _("judging.labels.total_score")
                                )
                            ),
                            judges_header
                        ),
                        rows
                    )
                )
            );
        }
    }]);

    return TourAdminBody;
})(React.Component);
//# sourceMappingURL=tour_admin.js.map