"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function __() {
    var args = [];
    for (var idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _.apply(undefined, ["scoring_systems.rosfarr." + arguments[0]].concat(args));
}

var TabletScoreInput = (function (_React$Component) {
    _inherits(TabletScoreInput, _React$Component);

    function TabletScoreInput() {
        _classCallCheck(this, TabletScoreInput);

        _get(Object.getPrototypeOf(TabletScoreInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TabletScoreInput, [{
        key: "updateScores",
        value: function updateScores(type, value) {
            if (this.props.readOnly) {
                return;
            }
            var new_score = {};
            new_score[type] = value;
            this.props.onScoreUpdate(new_score);
        }
    }, {
        key: "updateAcroDeduction",
        value: function updateAcroDeduction(idx, value) {
            var deductions = this.props.score.data.raw_data.deductions.map(function () {
                return null;
            });
            deductions[idx] = value;
            var new_score = {
                deductions: deductions
            };
            this.props.onScoreUpdate(new_score);
        }
    }, {
        key: "overrideAcroScore",
        value: function overrideAcroScore(acro_idx, value) {
            if (this.props.readOnly) {
                return;
            }
            Api("acrobatic_override.set", {
                run_id: this.props.run.id,
                acrobatic_idx: acro_idx,
                score: value
            }).send();
        }
    }, {
        key: "allowHeatsChange",
        value: function allowHeatsChange() {
            return this.props.discipline_judge.role == "head_judge";
        }
    }, {
        key: "renderHeadJudgeInput",
        value: function renderHeadJudgeInput() {
            var acrobatic_overrides = this.props.run.acrobatics.map(function (acro, idx) {
                return { idx: idx + 1, acrobatic: acro };
            }).filter(function (acro) {
                return acro.acrobatic.original_score != acro.acrobatic.score;
            });
            var tech_judges = this.props.all_discipline_judges.filter(function (discipline_judge) {
                return discipline_judge.role == "tech_judge";
            }).map((function (tech_judge) {
                var tech_score = this.props.all_scores[tech_judge.id];
                var timing_data = tech_score.data.raw_data.timing_violation === null ? ["-", ""] : tech_score.data.raw_data.timing_violation ? ["X", " fail"] : ["OK", " ok"];
                return React.createElement(
                    "div",
                    { key: tech_judge.id },
                    React.createElement(
                        "h3",
                        { className: tech_score.confirmed ? "confirmed" : "" },
                        tech_judge.judge.name
                    ),
                    React.createElement(
                        "div",
                        { className: "tech-judge-info" },
                        React.createElement(
                            "div",
                            { className: "title" },
                            __("tablet.tech_judge.jump_steps")
                        ),
                        React.createElement(
                            "div",
                            { className: "value" },
                            tech_score.data.raw_data.jump_steps
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "tech-judge-info" },
                        React.createElement(
                            "div",
                            { className: "title" },
                            __("tablet.tech_judge.timing")
                        ),
                        React.createElement(
                            "div",
                            { className: "value" + timing_data[1] },
                            timing_data[0]
                        )
                    )
                );
            }).bind(this));
            var penalties = this.props.run.inherited_data.penalties && this.props.run.inherited_data.penalties.length > 0 ? React.createElement(
                "div",
                null,
                React.createElement("div", { className: "spacer" }),
                React.createElement(
                    "h3",
                    null,
                    __("tablet.head_judge.previous_penalties")
                ),
                React.createElement(
                    "table",
                    { className: "full-width" },
                    React.createElement(
                        "tbody",
                        null,
                        " ",
                        this.props.run.inherited_data.penalties.map(function (d, idx) {
                            return React.createElement(
                                "tr",
                                { key: idx },
                                React.createElement(
                                    "td",
                                    { className: "w-10 text-center" },
                                    React.createElement(
                                        "strong",
                                        null,
                                        d.penalty
                                    )
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    d.tour
                                )
                            );
                        })
                    )
                )
            ) : null;
            var acrobatics = acrobatic_overrides.length > 0 ? React.createElement(
                "div",
                null,
                React.createElement("div", { className: "spacer" }),
                React.createElement(
                    "h3",
                    null,
                    __("tablet.head_judge.acrobatic_overrides")
                ),
                React.createElement(
                    "table",
                    { className: "full-width" },
                    React.createElement(
                        "tbody",
                        null,
                        acrobatic_overrides.map(function (acro, idx) {
                            return React.createElement(
                                "tr",
                                { key: idx },
                                React.createElement(
                                    "td",
                                    { className: "w-5" },
                                    acro.idx
                                ),
                                React.createElement(
                                    "td",
                                    null,
                                    acro.acrobatic.description
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-10 text-right" },
                                    acro.acrobatic.original_score.toFixed(1)
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-5 text-center" },
                                    "→"
                                ),
                                React.createElement(
                                    "td",
                                    { className: "w-10 text-left" },
                                    acro.acrobatic.score.toFixed(1)
                                )
                            );
                        })
                    )
                )
            ) : null;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    __("tablet.head_judge.penalty_type")
                ),
                React.createElement(TabletSelectorInput, {
                    choices: [[0, __("tablet.head_judge.ok")], [-3, __("tablet.head_judge.yellow_card")], [-30, __("tablet.head_judge.red_card")], [-100, __("tablet.head_judge.black_card")]],
                    active: this.props.score.data.raw_data.penalty,
                    onValueUpdate: this.updateScores.bind(this, "penalty") }),
                React.createElement("div", { className: "spacer" }),
                tech_judges,
                acrobatics,
                penalties
            );
        }
    }, {
        key: "renderTechJudgeInputAcro",
        value: function renderTechJudgeInputAcro() {
            var acrobatics = this.props.run.acrobatics.map((function (acro, idx) {
                return React.createElement(
                    "div",
                    { className: "tech-judge-acro", key: acro.id },
                    React.createElement(
                        "div",
                        { className: "controls pull-right" },
                        React.createElement(
                            "div",
                            { className: "setter" },
                            React.createElement(TabletPoint5Input, {
                                value: acro.score,
                                onValueUpdate: this.overrideAcroScore.bind(this, idx) })
                        )
                    ),
                    React.createElement(
                        "h3",
                        null,
                        acro.description,
                        " (=",
                        acro.original_score,
                        ")"
                    ),
                    React.createElement("div", { className: "clearfix" })
                );
            }).bind(this));
            return React.createElement(
                "div",
                null,
                acrobatics
            );
        }
    }, {
        key: "renderTechJudgeInputDance",
        value: function renderTechJudgeInputDance() {
            var score = this.props.score.data;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    __("tablet.tech_judge.jump_steps")
                ),
                React.createElement(TabletIntegerInput, {
                    value: score.raw_data.jump_steps,
                    onValueUpdate: this.updateScores.bind(this, "jump_steps") }),
                React.createElement("div", { className: "spacer" }),
                React.createElement(
                    "h3",
                    null,
                    __("tablet.tech_judge.timing")
                ),
                React.createElement(StopWatch, null),
                React.createElement(TabletSelectorInput, {
                    choices: [[true, "X"], [null, "-"], [false, "OK"]],
                    active: score.raw_data.timing_violation,
                    onValueUpdate: this.updateScores.bind(this, "timing_violation") })
            );
        }
    }, {
        key: "renderTechJudgeInput",
        value: function renderTechJudgeInput() {
            var content;
            if (this.props.page == "acro") {
                return this.renderTechJudgeInputAcro();
            } else {
                return this.renderTechJudgeInputDance();
            }
        }
    }, {
        key: "renderDanceJudgeInput",
        value: function renderDanceJudgeInput() {
            var score = this.props.score.data;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    __("tablet.dance_judge.fw_woman")
                ),
                React.createElement(TabletSelectorInput, {
                    choices: [[100, "X"], [75, "75%"], [50, "50%"], [25, "25%"], [10, "10%"], [5, "5%"], [0, "OK"]],
                    active: score.raw_data.fw_woman,
                    onValueUpdate: this.updateScores.bind(this, "fw_woman") }),
                React.createElement(
                    "h3",
                    null,
                    __("tablet.dance_judge.fw_man")
                ),
                React.createElement(TabletSelectorInput, {
                    choices: [[100, "X"], [75, "75%"], [50, "50%"], [25, "25%"], [10, "10%"], [5, "5%"], [0, "OK"]],
                    active: score.raw_data.fw_man,
                    onValueUpdate: this.updateScores.bind(this, "fw_man") }),
                React.createElement(
                    "h3",
                    null,
                    __("tablet.dance_judge.dance_figs")
                ),
                React.createElement(TabletIntegerSelectInput, {
                    min: 0,
                    max: 25,
                    active: score.raw_data.dance_figs,
                    onValueUpdate: this.updateScores.bind(this, "dance_figs") }),
                React.createElement(
                    "h3",
                    null,
                    __("tablet.dance_judge.composition")
                ),
                React.createElement(TabletIntegerSelectInput, {
                    min: 0,
                    max: 20,
                    active: score.raw_data.composition,
                    onValueUpdate: this.updateScores.bind(this, "composition") }),
                React.createElement(
                    "table",
                    { className: "mistakes full-width" },
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
                                    "h3",
                                    null,
                                    __("tablet.dance_judge.small_mistakes")
                                ),
                                React.createElement(TabletIntegerInput, {
                                    value: score.raw_data.small_mistakes,
                                    onValueUpdate: this.updateScores.bind(this, "small_mistakes") })
                            ),
                            React.createElement(
                                "td",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    __("tablet.dance_judge.big_mistakes")
                                ),
                                React.createElement(TabletIntegerInput, {
                                    value: score.raw_data.big_mistakes,
                                    onValueUpdate: this.updateScores.bind(this, "big_mistakes") })
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "total-score" },
                    __("tablet.global.total_score"),
                    ": ",
                    score.total_score
                )
            );
        }
    }, {
        key: "renderAcroJudgeInput",
        value: function renderAcroJudgeInput() {
            var score = this.props.score.data;
            var inputs = this.props.run.acrobatics.map((function (acro, idx) {
                return React.createElement(
                    "div",
                    { key: idx },
                    React.createElement(
                        "h3",
                        null,
                        _("tablet.headers.acro_n", idx)
                    ),
                    React.createElement(TabletSelectorInput, {
                        choices: [[100, "X"], [75, "75%"], [50, "50%"], [25, "25%"], [10, "10%"], [5, "5%"], [0, "OK"]],
                        active: score.raw_data.deductions[idx],
                        onValueUpdate: this.updateAcroDeduction.bind(this, idx) })
                );
            }).bind(this));
            return React.createElement(
                "div",
                null,
                inputs,
                React.createElement(
                    "div",
                    { className: "mistakes" },
                    React.createElement(
                        "h3",
                        null,
                        __("tablet.acro_judge.fall_down")
                    ),
                    React.createElement(TabletIntegerInput, {
                        value: score.raw_data.mistakes,
                        onValueUpdate: this.updateScores.bind(this, "mistakes") })
                ),
                React.createElement(
                    "div",
                    { className: "total-score" },
                    __("tablet.global.total_score"),
                    ": ",
                    score.total_score
                )
            );
        }
    }, {
        key: "renderFormationInput",
        value: function renderFormationInput() {
            var score = this.props.score.data;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    __("tablet.dance_judge.dance_tech")
                ),
                React.createElement(TabletPointFiveSelectInput, {
                    min: 0,
                    max: 10,
                    active: score.raw_data.dance_tech,
                    onValueUpdate: this.updateScores.bind(this, "dance_tech") }),
                React.createElement(
                    "h3",
                    null,
                    __("tablet.dance_judge.dance_figs")
                ),
                React.createElement(TabletPointFiveSelectInput, {
                    min: 0,
                    max: 10,
                    active: score.raw_data.dance_figs,
                    onValueUpdate: this.updateScores.bind(this, "dance_figs") }),
                React.createElement(
                    "h3",
                    null,
                    __("tablet.dance_judge.impression")
                ),
                React.createElement(TabletPointFiveSelectInput, {
                    min: 0,
                    max: 10,
                    active: score.raw_data.impression,
                    onValueUpdate: this.updateScores.bind(this, "impression") }),
                React.createElement(
                    "table",
                    { className: "mistakes full-width" },
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
                                    "h3",
                                    null,
                                    __("tablet.dance_judge.small_mistakes")
                                ),
                                React.createElement(TabletIntegerInput, {
                                    value: score.raw_data.small_mistakes,
                                    onValueUpdate: this.updateScores.bind(this, "small_mistakes") })
                            ),
                            React.createElement(
                                "td",
                                null,
                                React.createElement(
                                    "h3",
                                    null,
                                    __("tablet.dance_judge.big_mistakes")
                                ),
                                React.createElement(TabletIntegerInput, {
                                    value: score.raw_data.big_mistakes,
                                    onValueUpdate: this.updateScores.bind(this, "big_mistakes") })
                            )
                        )
                    )
                ),
                React.createElement(
                    "div",
                    { className: "total-score" },
                    __("tablet.global.total_score"),
                    ": ",
                    score.total_score
                )
            );
        }
    }, {
        key: "renderScoresInput",
        value: function renderScoresInput() {
            switch (this.props.discipline_judge.role) {
                case "acro_judge":
                    return this.props.scoring_system_name == "rosfarr.no_acro" ? this.renderDanceJudgeInput() : this.renderAcroJudgeInput();
                case "dance_judge":
                    if (this.props.scoring_system_name == "rosfarr.formation") {
                        return this.renderFormationInput();
                    }
                    return this.renderDanceJudgeInput();
                case "head_judge":
                    return this.renderHeadJudgeInput();
                case "tech_judge":
                    return this.renderTechJudgeInput();
                default:
                    console.log("Unknown judge role", this.props.discipline_judge.role);
                    return null;
            }
        }
    }, {
        key: "renderConfirmationButton",
        value: function renderConfirmationButton() {
            if (this.props.score.confirmed) {
                return null;
            }
            if (this.allowHeatsChange()) {
                return null;
            }
            var score_data = this.props.score.data.raw_data;
            var keys = Object.getOwnPropertyNames(score_data);
            if (this.props.discipline_judge.role !== "tech_judge") {
                for (var idx in keys) {
                    if (score_data[keys[idx]] === null) {
                        return null;
                    }
                    if (typeof score_data[keys[idx]] == "object") {
                        var arr = score_data[keys[idx]];
                        for (var j in Object.keys(arr)) {
                            if (arr[j] === null) {
                                return null;
                            }
                        }
                    }
                }
            }
            return React.createElement(
                "div",
                { className: "confirm" },
                React.createElement(
                    "button",
                    _extends({ className: "tbtn" }, onTouchOrClick(this.props.onScoreConfirm)),
                    _("judging.buttons.confirm_score")
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: this.props.readOnly ? "read-only" : "" },
                this.renderScoresInput(),
                this.renderConfirmationButton()
            );
        }
    }]);

    return TabletScoreInput;
})(React.Component);
//# sourceMappingURL=tablet.js.map