"use strict";

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
            var new_score = {};
            new_score[type] = value;
            this.props.onScoreUpdate(new_score);
        }
    }, {
        key: "updateAcroDeduction",
        value: function updateAcroDeduction(idx, value) {
            var score = this.props.scores[this.props.judge_id].data;
            var deductions = score.raw_data.deductions.map(function () {
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
            Api("acrobatic_override.set", {
                run_id: this.props.run_id,
                acrobatic_idx: acro_idx,
                score: value
            }).send();
        }
    }, {
        key: "getCurrentJudge",
        value: function getCurrentJudge() {
            for (var idx in this.props.judges) if (this.props.judges.hasOwnProperty(idx)) {
                if (this.props.judges[idx].id === this.props.judge_id) {
                    return this.props.judges[idx];
                }
            }
        }
    }, {
        key: "renderHeadJudgeInput",
        value: function renderHeadJudgeInput() {
            var tech_judges = this.props.judges.filter(function (judge) {
                return judge.role == "tech_judge";
            }).map((function (judge) {
                var timing_data = this.props.scores[judge.id].data.raw_data.timing_violation === null ? ["-", ""] : this.props.scores[judge.id].data.raw_data.timing_violation ? ["X", " fail"] : ["OK", " ok"];
                return React.createElement(
                    "div",
                    { key: judge.id },
                    React.createElement(
                        "h3",
                        null,
                        judge.name,
                        ":"
                    ),
                    React.createElement(
                        "div",
                        { className: "tech-judge-info" },
                        React.createElement(
                            "div",
                            { className: "title" },
                            __("tablet.tech_judge.jump_steps"),
                            ":"
                        ),
                        React.createElement(
                            "div",
                            { className: "value" },
                            this.props.scores[judge.id].data.raw_data.jump_steps
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "tech-judge-info" },
                        React.createElement(
                            "div",
                            { className: "title" },
                            __("tablet.tech_judge.timing"),
                            ":"
                        ),
                        React.createElement(
                            "div",
                            { className: "value" + timing_data[1] },
                            timing_data[0]
                        )
                    )
                );
            }).bind(this));
            var score = this.props.scores[this.props.judge_id].data;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    __("tablet.head_judge.penalty_type"),
                    ":"
                ),
                React.createElement(TabletSelectorInput, {
                    choices: [[0, __("tablet.head_judge.ok")], [-3, __("tablet.head_judge.yellow_card")], [-30, __("tablet.head_judge.red_card")], [-100, __("tablet.head_judge.black_card")]],
                    active: score.raw_data.penalty,
                    onValueUpdate: this.updateScores.bind(this, "penalty") }),
                React.createElement("div", { className: "spacer" }),
                tech_judges
            );
        }
    }, {
        key: "renderTechJudgeInputAcro",
        value: function renderTechJudgeInputAcro() {
            var acrobatics = this.props.acrobatics.map((function (acro, idx) {
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
            var score = this.props.scores[this.props.judge_id].data;
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    __("tablet.tech_judge.jump_steps"),
                    ":"
                ),
                React.createElement(TabletIntegerInput, {
                    value: score.raw_data.jump_steps,
                    onValueUpdate: this.updateScores.bind(this, "jump_steps") }),
                React.createElement("div", { className: "spacer" }),
                React.createElement(
                    "h3",
                    null,
                    __("tablet.tech_judge.timing"),
                    ":"
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
            var score = this.props.scores[this.props.judge_id].data;
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
            var score = this.props.scores[this.props.judge_id].data;
            var inputs = this.props.acrobatics.map((function (acro, idx) {
                return React.createElement(
                    "div",
                    { key: idx },
                    React.createElement(
                        "h3",
                        null,
                        acro.description
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
            var score = this.props.scores[this.props.judge_id].data;
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
        key: "render",
        value: function render() {
            switch (this.getCurrentJudge().role) {
                case "acro_judge":
                    if (this.props.scoring_system_name == "rosfarr.formation") {
                        return this.renderFormationInput();
                    }
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
                    console.log("Unknown judge role", this.props.judges[this.props.judge_id].role);
                    return null;
            }
        }
    }]);

    return TabletScoreInput;
})(React.Component);
//# sourceMappingURL=tablet.js.map