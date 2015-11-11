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

// Head judge

var HeadJudgeActobaticOverrides = (function (_React$Component) {
    _inherits(HeadJudgeActobaticOverrides, _React$Component);

    function HeadJudgeActobaticOverrides() {
        _classCallCheck(this, HeadJudgeActobaticOverrides);

        _get(Object.getPrototypeOf(HeadJudgeActobaticOverrides.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(HeadJudgeActobaticOverrides, [{
        key: "getAcrobaticOverrides",
        value: function getAcrobaticOverrides() {
            return this.props.acrobatics.map(function (acro, idx) {
                return { idx: idx + 1, acrobatic: acro };
            }).filter(function (acro) {
                return acro.acrobatic.original_score != acro.acrobatic.score;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var acrobatic_overrides = this.getAcrobaticOverrides();
            if (acrobatic_overrides.length == 0) {
                return null;
            }
            return React.createElement(
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
                        acrobatic_overrides.map(function (acro) {
                            return React.createElement(
                                "tr",
                                { key: acro.idx },
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
            );
        }
    }]);

    return HeadJudgeActobaticOverrides;
})(React.Component);

var HeadJudgePreviousPenlties = (function (_React$Component2) {
    _inherits(HeadJudgePreviousPenlties, _React$Component2);

    function HeadJudgePreviousPenlties() {
        _classCallCheck(this, HeadJudgePreviousPenlties);

        _get(Object.getPrototypeOf(HeadJudgePreviousPenlties.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(HeadJudgePreviousPenlties, [{
        key: "render",
        value: function render() {
            if (!this.props.penalties || this.props.penalties.length == 0) {
                return null;
            }
            return React.createElement(
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
                        this.props.penalties.map(function (d, idx) {
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
            );
        }
    }]);

    return HeadJudgePreviousPenlties;
})(React.Component);

var HeadJudgeTechJudgeScore = (function (_React$Component3) {
    _inherits(HeadJudgeTechJudgeScore, _React$Component3);

    function HeadJudgeTechJudgeScore() {
        _classCallCheck(this, HeadJudgeTechJudgeScore);

        _get(Object.getPrototypeOf(HeadJudgeTechJudgeScore.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(HeadJudgeTechJudgeScore, [{
        key: "getTimingData",
        value: function getTimingData() {
            var tv_raw_value = this.props.score.data.raw_data.timing_violation;
            if (tv_raw_value === null) {
                return ["-", ""];
            } else if (tv_raw_value) {
                return ["X", " fail"];
            } else {
                return ["OK", " ok"];
            }
        }
    }, {
        key: "render",
        value: function render() {
            var timing_data = this.getTimingData();
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    { className: this.props.score.confirmed ? "confirmed" : "" },
                    this.props.discipline_judge.judge.name
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
                        this.props.score.data.raw_data.jump_steps
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
        }
    }]);

    return HeadJudgeTechJudgeScore;
})(React.Component);

var HeadJudgeTechJudgesScores = (function (_React$Component4) {
    _inherits(HeadJudgeTechJudgesScores, _React$Component4);

    function HeadJudgeTechJudgesScores() {
        _classCallCheck(this, HeadJudgeTechJudgesScores);

        _get(Object.getPrototypeOf(HeadJudgeTechJudgesScores.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(HeadJudgeTechJudgesScores, [{
        key: "getTechDisciplineJudges",
        value: function getTechDisciplineJudges() {
            return this.props.all_discipline_judges.filter(function (dj) {
                return dj.role == "tech_judge";
            });
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            var _this = this;

            return this.getTechDisciplineJudges().map(function (tech_judge) {
                return React.createElement(HeadJudgeTechJudgeScore, {
                    key: tech_judge.id,
                    discipline_judge: tech_judge,
                    score: _this.props.all_scores[tech_judge.id] });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement("div", { className: "spacer" }),
                this.renderContent()
            );
        }
    }]);

    return HeadJudgeTechJudgesScores;
})(React.Component);

var HeadJudgeScoreInput = (function (_React$Component5) {
    _inherits(HeadJudgeScoreInput, _React$Component5);

    function HeadJudgeScoreInput() {
        _classCallCheck(this, HeadJudgeScoreInput);

        _get(Object.getPrototypeOf(HeadJudgeScoreInput.prototype), "constructor", this).apply(this, arguments);
    }

    // Tech Judge

    _createClass(HeadJudgeScoreInput, [{
        key: "getPenaltyCoices",
        value: function getPenaltyCoices() {
            return [[0, __("tablet.head_judge.ok")], [-3, __("tablet.head_judge.yellow_card")], [-30, __("tablet.head_judge.red_card")], [-100, __("tablet.head_judge.black_card")]];
        }
    }, {
        key: "genOnPenaltyUpdate",
        value: function genOnPenaltyUpdate() {
            var _this2 = this;

            return function (new_value) {
                return _this2.props.onScoreUpdate("penalty", new_value);
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    __("tablet.head_judge.penalty_type")
                ),
                React.createElement(TabletSelectorInput, {
                    choices: this.getPenaltyCoices(),
                    active: this.props.score.data.raw_data.penalty,
                    onValueUpdate: this.genOnPenaltyUpdate() }),
                React.createElement(HeadJudgeTechJudgesScores, {
                    all_discipline_judges: this.props.all_discipline_judges,
                    all_scores: this.props.all_scores }),
                React.createElement(HeadJudgeActobaticOverrides, {
                    acrobatics: this.props.run.acrobatics }),
                React.createElement(HeadJudgePreviousPenlties, {
                    penalties: this.props.run.inherited_data.penalties })
            );
        }
    }]);

    return HeadJudgeScoreInput;
})(React.Component);

var TechJudgeAcrobaticOverride = (function (_React$Component6) {
    _inherits(TechJudgeAcrobaticOverride, _React$Component6);

    function TechJudgeAcrobaticOverride() {
        _classCallCheck(this, TechJudgeAcrobaticOverride);

        _get(Object.getPrototypeOf(TechJudgeAcrobaticOverride.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TechJudgeAcrobaticOverride, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "tech-judge-acro" },
                React.createElement(
                    "div",
                    { className: "controls pull-right" },
                    React.createElement(
                        "div",
                        { className: "setter" },
                        React.createElement(TabletPoint5Input, {
                            value: this.props.acro.score,
                            onValueUpdate: this.props.onAcroOverride })
                    )
                ),
                React.createElement(
                    "h3",
                    null,
                    this.props.acro.description,
                    " (=",
                    this.props.acro.original_score,
                    ")"
                ),
                React.createElement("div", { className: "clearfix" })
            );
        }
    }]);

    return TechJudgeAcrobaticOverride;
})(React.Component);

var TechJudgeAcroScoreInput = (function (_React$Component7) {
    _inherits(TechJudgeAcroScoreInput, _React$Component7);

    function TechJudgeAcroScoreInput() {
        _classCallCheck(this, TechJudgeAcroScoreInput);

        _get(Object.getPrototypeOf(TechJudgeAcroScoreInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TechJudgeAcroScoreInput, [{
        key: "genOnAcroOverride",
        value: function genOnAcroOverride(acro_idx) {
            var _this3 = this;

            return function (new_value) {
                return _this3.props.onAcroOverride(acro_idx, new_value);
            };
        }
    }, {
        key: "renderContent",
        value: function renderContent() {
            var _this4 = this;

            return this.props.acrobatics.map(function (acro, idx) {
                return React.createElement(TechJudgeAcrobaticOverride, {
                    key: idx,
                    acro: acro,
                    onAcroOverride: _this4.genOnAcroOverride(idx) });
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                this.renderContent()
            );
        }
    }]);

    return TechJudgeAcroScoreInput;
})(React.Component);

var TechJudgeDanceScoreInput = (function (_React$Component8) {
    _inherits(TechJudgeDanceScoreInput, _React$Component8);

    function TechJudgeDanceScoreInput() {
        _classCallCheck(this, TechJudgeDanceScoreInput);

        _get(Object.getPrototypeOf(TechJudgeDanceScoreInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TechJudgeDanceScoreInput, [{
        key: "genOnScoreUpdate",
        value: function genOnScoreUpdate(score_part) {
            var _this5 = this;

            return function (new_value) {
                return _this5.props.onScoreUpdate(score_part, new_value);
            };
        }
    }, {
        key: "render",
        value: function render() {
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
                    onValueUpdate: this.genOnScoreUpdate("jump_steps") }),
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
                    onValueUpdate: this.genOnScoreUpdate("timing_violation") })
            );
        }
    }]);

    return TechJudgeDanceScoreInput;
})(React.Component);

var TechJudgeScoreInput = (function (_React$Component9) {
    _inherits(TechJudgeScoreInput, _React$Component9);

    function TechJudgeScoreInput() {
        _classCallCheck(this, TechJudgeScoreInput);

        _get(Object.getPrototypeOf(TechJudgeScoreInput.prototype), "constructor", this).apply(this, arguments);
    }

    // Dance judge

    _createClass(TechJudgeScoreInput, [{
        key: "render",
        value: function render() {
            if (this.props.page == "acro") {
                return React.createElement(TechJudgeAcroScoreInput, {
                    acrobatics: this.props.run.acrobatics,
                    onAcroOverride: this.props.onAcroOverride });
            } else {
                return React.createElement(TechJudgeDanceScoreInput, {
                    score: this.props.score,
                    onScoreUpdate: this.props.onScoreUpdate });
            }
        }
    }]);

    return TechJudgeScoreInput;
})(React.Component);

var DanceJudgeScorePartInput = (function (_React$Component10) {
    _inherits(DanceJudgeScorePartInput, _React$Component10);

    function DanceJudgeScorePartInput() {
        _classCallCheck(this, DanceJudgeScorePartInput);

        _get(Object.getPrototypeOf(DanceJudgeScorePartInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(DanceJudgeScorePartInput, [{
        key: "genOnScoreUpdate",
        value: function genOnScoreUpdate() {
            var _this6 = this;

            return function (new_value) {
                return _this6.props.onScoreUpdate(_this6.props.part, new_value);
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    __("tablet.dance_judge." + this.props.part)
                ),
                React.createElement(ScorePartScale, _extends({
                    scale: this.props.scale,
                    active: this.props.score.data.raw_data[this.props.part],
                    onValueUpdate: this.genOnScoreUpdate()
                }, this.props.scale_props))
            );
        }
    }]);

    return DanceJudgeScorePartInput;
})(React.Component);

var DanceJudgeScoreMistakes = (function (_React$Component11) {
    _inherits(DanceJudgeScoreMistakes, _React$Component11);

    function DanceJudgeScoreMistakes() {
        _classCallCheck(this, DanceJudgeScoreMistakes);

        _get(Object.getPrototypeOf(DanceJudgeScoreMistakes.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(DanceJudgeScoreMistakes, [{
        key: "genOnScoreUpdate",
        value: function genOnScoreUpdate(score_part) {
            var _this7 = this;

            return function (new_value) {
                return _this7.props.onScoreUpdate(score_part, new_value);
            };
        }
    }, {
        key: "render",
        value: function render() {
            var score_data = this.props.score.data.raw_data;
            return React.createElement(
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
                                value: score_data.small_mistakes,
                                onValueUpdate: this.genOnScoreUpdate("small_mistakes") })
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
                                value: score_data.big_mistakes,
                                onValueUpdate: this.genOnScoreUpdate("big_mistakes") })
                        )
                    )
                )
            );
        }
    }]);

    return DanceJudgeScoreMistakes;
})(React.Component);

var DanceJudgeFinalDanceScoreInput = (function (_React$Component12) {
    _inherits(DanceJudgeFinalDanceScoreInput, _React$Component12);

    function DanceJudgeFinalDanceScoreInput() {
        _classCallCheck(this, DanceJudgeFinalDanceScoreInput);

        _get(Object.getPrototypeOf(DanceJudgeFinalDanceScoreInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(DanceJudgeFinalDanceScoreInput, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "fw_woman",
                    scale: "reduction"
                }, this.props)),
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "fw_man",
                    scale: "reduction"
                }, this.props)),
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "dance_figs",
                    scale: "point5",
                    scale_props: {
                        min: 0,
                        max: 12.5
                    }
                }, this.props)),
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "composition",
                    scale: "point5",
                    scale_props: {
                        min: 0,
                        max: 10
                    }
                }, this.props)),
                React.createElement(DanceJudgeScoreMistakes, this.props)
            );
        }
    }]);

    return DanceJudgeFinalDanceScoreInput;
})(React.Component);

var DanceJudgeDanceScoreInput = (function (_React$Component13) {
    _inherits(DanceJudgeDanceScoreInput, _React$Component13);

    function DanceJudgeDanceScoreInput() {
        _classCallCheck(this, DanceJudgeDanceScoreInput);

        _get(Object.getPrototypeOf(DanceJudgeDanceScoreInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(DanceJudgeDanceScoreInput, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "fw_woman",
                    scale: "reduction"
                }, this.props)),
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "fw_man",
                    scale: "reduction"
                }, this.props)),
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "dance_figs",
                    scale: "integer",
                    scale_props: {
                        min: 0,
                        max: 25
                    }
                }, this.props)),
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "composition",
                    scale: "integer",
                    scale_props: {
                        min: 0,
                        max: 20
                    }
                }, this.props)),
                React.createElement(DanceJudgeScoreMistakes, this.props)
            );
        }
    }]);

    return DanceJudgeDanceScoreInput;
})(React.Component);

var DanceJudgeFormationScoreInput = (function (_React$Component14) {
    _inherits(DanceJudgeFormationScoreInput, _React$Component14);

    function DanceJudgeFormationScoreInput() {
        _classCallCheck(this, DanceJudgeFormationScoreInput);

        _get(Object.getPrototypeOf(DanceJudgeFormationScoreInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(DanceJudgeFormationScoreInput, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "dance_tech",
                    scale: "point5",
                    scale_props: {
                        min: 0,
                        max: 10
                    }
                }, this.props)),
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "dance_figs",
                    scale: "point5",
                    scale_props: {
                        min: 0,
                        max: 10
                    }
                }, this.props)),
                React.createElement(DanceJudgeScorePartInput, _extends({
                    part: "impression",
                    scale: "point5",
                    scale_props: {
                        min: 0,
                        max: 10
                    }
                }, this.props)),
                React.createElement(DanceJudgeScoreMistakes, this.props)
            );
        }
    }]);

    return DanceJudgeFormationScoreInput;
})(React.Component);

var DanceJudgeScoreInput = (function (_React$Component15) {
    _inherits(DanceJudgeScoreInput, _React$Component15);

    function DanceJudgeScoreInput() {
        _classCallCheck(this, DanceJudgeScoreInput);

        _get(Object.getPrototypeOf(DanceJudgeScoreInput.prototype), "constructor", this).apply(this, arguments);
    }

    // AcroJudge

    _createClass(DanceJudgeScoreInput, [{
        key: "render",
        value: function render() {
            var props = {
                score: this.props.score,
                onScoreUpdate: this.props.onScoreUpdate
            };
            switch (this.props.scoring_system_name) {
                case "rosfarr.acro":
                case "rosfarr.no_acro":
                    return React.createElement(DanceJudgeDanceScoreInput, props);
                case "rosfarr.am_final_fw":
                case "rosfarr.am_final_acro":
                    return React.createElement(DanceJudgeFinalDanceScoreInput, props);
                case "rosfarr.formation":
                    return React.createElement(DanceJudgeFormationScoreInput, props);
                default:
                    return null;
            }
        }
    }]);

    return DanceJudgeScoreInput;
})(React.Component);

var AcroJudgeAcrobaticInput = (function (_React$Component16) {
    _inherits(AcroJudgeAcrobaticInput, _React$Component16);

    function AcroJudgeAcrobaticInput() {
        _classCallCheck(this, AcroJudgeAcrobaticInput);

        _get(Object.getPrototypeOf(AcroJudgeAcrobaticInput.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(AcroJudgeAcrobaticInput, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h3",
                    null,
                    _("tablet.headers.acro_n", this.props.acro_idx)
                ),
                React.createElement(ScorePartScale, {
                    scale: "reduction",
                    active: this.props.reduction,
                    onValueUpdate: this.props.onAcroReductionUpdate })
            );
        }
    }]);

    return AcroJudgeAcrobaticInput;
})(React.Component);

var AcroJudgeScoreMistakes = (function (_React$Component17) {
    _inherits(AcroJudgeScoreMistakes, _React$Component17);

    function AcroJudgeScoreMistakes() {
        _classCallCheck(this, AcroJudgeScoreMistakes);

        _get(Object.getPrototypeOf(AcroJudgeScoreMistakes.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(AcroJudgeScoreMistakes, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "mistakes" },
                React.createElement(
                    "h3",
                    null,
                    __("tablet.acro_judge.fall_down")
                ),
                React.createElement(TabletIntegerInput, {
                    value: this.props.mistakes,
                    onValueUpdate: this.props.onScoreUpdate })
            );
        }
    }]);

    return AcroJudgeScoreMistakes;
})(React.Component);

var AcroJudgeInput = (function (_React$Component18) {
    _inherits(AcroJudgeInput, _React$Component18);

    function AcroJudgeInput() {
        _classCallCheck(this, AcroJudgeInput);

        _get(Object.getPrototypeOf(AcroJudgeInput.prototype), "constructor", this).apply(this, arguments);
    }

    // Common

    _createClass(AcroJudgeInput, [{
        key: "genOnAcroReductionUpdate",
        value: function genOnAcroReductionUpdate(acro_idx) {
            var _this8 = this;

            return function (new_value) {
                return _this8.props.onAcroReductionUpdate(acro_idx, new_value);
            };
        }
    }, {
        key: "genOnMistakesUpdate",
        value: function genOnMistakesUpdate() {
            var _this9 = this;

            return function (new_value) {
                return _this9.props.onScoreUpdate("mistakes", new_value);
            };
        }
    }, {
        key: "render",
        value: function render() {
            var _this10 = this;

            var score_data = this.props.score.data.raw_data;
            return React.createElement(
                "div",
                null,
                score_data.reductions.map(function (reduction, acro_idx) {
                    return React.createElement(AcroJudgeAcrobaticInput, {
                        key: acro_idx,
                        reduction: reduction,
                        acro_idx: acro_idx,
                        onAcroReductionUpdate: _this10.genOnAcroReductionUpdate(acro_idx) });
                }),
                React.createElement(AcroJudgeScoreMistakes, {
                    mistakes: score_data.mistakes,
                    onScoreUpdate: this.genOnMistakesUpdate() })
            );
        }
    }]);

    return AcroJudgeInput;
})(React.Component);

var ScorePartScale = (function (_React$Component19) {
    _inherits(ScorePartScale, _React$Component19);

    function ScorePartScale() {
        _classCallCheck(this, ScorePartScale);

        _get(Object.getPrototypeOf(ScorePartScale.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(ScorePartScale, [{
        key: "genPossibleReductions",
        value: function genPossibleReductions() {
            return [[100, "X"], [75, "-75%"], [50, "-50%"], [25, "-25%"], [10, "-10%"], [5, "-5%"], [0, "OK"]];
        }
    }, {
        key: "render",
        value: function render() {
            switch (this.props.scale) {
                case "point5":
                    return React.createElement(TabletPointFiveSelectInput, this.props);
                case "integer":
                    return React.createElement(TabletIntegerSelectInput, this.props);
                case "reduction":
                    return React.createElement(TabletSelectorInput, _extends({
                        choices: this.genPossibleReductions()
                    }, this.props));
            }
        }
    }]);

    return ScorePartScale;
})(React.Component);

var TabletScoreTotalScore = (function (_React$Component20) {
    _inherits(TabletScoreTotalScore, _React$Component20);

    function TabletScoreTotalScore() {
        _classCallCheck(this, TabletScoreTotalScore);

        _get(Object.getPrototypeOf(TabletScoreTotalScore.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TabletScoreTotalScore, [{
        key: "render",
        value: function render() {
            var role = this.props.discipline_judge.role;
            if (role === "head_judge" || role === "tech_judge") {
                return null;
            }
            return React.createElement(
                "div",
                { className: "total-score" },
                __("tablet.global.total_score"),
                ": ",
                this.props.score.data.total_score
            );
        }
    }]);

    return TabletScoreTotalScore;
})(React.Component);

var TabletScoreConfirmationButton = (function (_React$Component21) {
    _inherits(TabletScoreConfirmationButton, _React$Component21);

    function TabletScoreConfirmationButton() {
        _classCallCheck(this, TabletScoreConfirmationButton);

        _get(Object.getPrototypeOf(TabletScoreConfirmationButton.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TabletScoreConfirmationButton, [{
        key: "needConfirmation",
        value: function needConfirmation() {
            return this.props.discipline_judge.role !== "head_judge";
        }
    }, {
        key: "readyToConfirm",
        value: function readyToConfirm() {
            var score_data = this.props.score.data.raw_data;
            var keys = Object.getOwnPropertyNames(score_data);
            if (this.props.discipline_judge.role !== "tech_judge") {
                for (var idx in keys) {
                    if (score_data[keys[idx]] === null) {
                        return false;
                    }
                    if (typeof score_data[keys[idx]] == "object") {
                        var arr = score_data[keys[idx]];
                        for (var j in Object.keys(arr)) {
                            if (arr[j] === null) {
                                return false;
                            }
                        }
                    }
                }
            }
            return true;
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.needConfirmation()) {
                return null;
            }
            if (!this.readyToConfirm()) {
                return null;
            }
            return React.createElement(
                "div",
                { className: "confirm" },
                React.createElement(Slider, {
                    onActivate: this.props.onScoreConfirm,
                    done: this.props.score.confirmed,
                    slideText: _("judging.buttons.confirm_score"),
                    doneText: _("judging.labels.confirmed") })
            );
        }
    }]);

    return TabletScoreConfirmationButton;
})(React.Component);

var TabletScoreInput = (function (_React$Component22) {
    _inherits(TabletScoreInput, _React$Component22);

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
        key: "updateAcroReduction",
        value: function updateAcroReduction(idx, value) {
            var reductions = this.props.score.data.raw_data.reductions.map(function () {
                return null;
            });
            reductions[idx] = value;
            var new_score = {
                reductions: reductions
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
        key: "renderScoresInput",
        value: function renderScoresInput() {
            switch (getScoringType(this.props.discipline_judge, this.props.scoring_system_name)) {
                case "acro":
                    return React.createElement(AcroJudgeInput, {
                        score: this.props.score,
                        onAcroReductionUpdate: this.updateAcroReduction.bind(this),
                        onScoreUpdate: this.updateScores.bind(this) });
                case "dance":
                case "formation":
                    return React.createElement(DanceJudgeScoreInput, {
                        score: this.props.score,
                        scoring_system_name: this.props.scoring_system_name,
                        onScoreUpdate: this.updateScores.bind(this) });
                case "head":
                    return React.createElement(HeadJudgeScoreInput, {
                        run: this.props.run,
                        score: this.props.score,
                        all_discipline_judges: this.props.all_discipline_judges,
                        all_scores: this.props.all_scores,
                        onScoreUpdate: this.updateScores.bind(this) });
                case "tech":
                    return React.createElement(TechJudgeScoreInput, {
                        page: this.props.page,
                        run: this.props.run,
                        score: this.props.score,
                        onAcroOverride: this.overrideAcroScore.bind(this),
                        onScoreUpdate: this.updateScores.bind(this) });
                default:
                    console.log("Unknown judge role", this.props.discipline_judge.role);
                    return null;
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: this.props.readOnly ? "read-only" : "" },
                this.renderScoresInput(),
                React.createElement(TabletScoreTotalScore, {
                    discipline_judge: this.props.discipline_judge,
                    score: this.props.score }),
                React.createElement(TabletScoreConfirmationButton, {
                    discipline_judge: this.props.discipline_judge,
                    score: this.props.score,
                    onScoreConfirm: this.props.onScoreConfirm })
            );
        }
    }]);

    return TabletScoreInput;
})(React.Component);
//# sourceMappingURL=tablet.js.map