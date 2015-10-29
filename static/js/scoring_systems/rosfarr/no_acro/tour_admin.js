"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourAdminScoreInput = (function (_React$Component) {
    _inherits(TourAdminScoreInput, _React$Component);

    function TourAdminScoreInput(props) {
        _classCallCheck(this, TourAdminScoreInput);

        _get(Object.getPrototypeOf(TourAdminScoreInput.prototype), "constructor", this).call(this, props);
    }

    _createClass(TourAdminScoreInput, [{
        key: "renderDanceJudgeInput",
        value: function renderDanceJudgeInput() {
            return React.createElement(
                "form",
                { onSubmit: this.onSubmit.bind(this), className: "form-score-input" },
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "FW:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.fw_woman,
                                onChange: this.onChange.bind(this, "fw_woman"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
                        React.createElement(
                            "th",
                            null,
                            "FM:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.fw_man,
                                onChange: this.onChange.bind(this, "fw_man"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "DF:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.dance_figs,
                                onChange: this.onChange.bind(this, "dance_figs"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
                        React.createElement(
                            "th",
                            null,
                            "C:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.composition,
                                onChange: this.onChange.bind(this, "composition"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "SM:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.small_mistakes,
                                onChange: this.onChange.bind(this, "small_mistakes"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
                        React.createElement(
                            "th",
                            null,
                            "BM:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.big_mistakes,
                                onChange: this.onChange.bind(this, "big_mistakes"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    )
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary", type: "submit" },
                    _("global.buttons.submit")
                ),
                " ",
                React.createElement(
                    "button",
                    { className: "btn btn-primary", type: "button", onClick: this.props.stopEditing },
                    _("global.buttons.discard")
                )
            );
        }
    }, {
        key: "renderAcroJudgeInput",
        value: function renderAcroJudgeInput() {
            var fields = this.props.score.deductions.map((function (value, idx) {
                return [React.createElement(
                    "th",
                    null,
                    "A",
                    idx + 1,
                    ":"
                ), React.createElement(
                    "td",
                    null,
                    React.createElement("input", {
                        type: "text",
                        value: this.props.score.deductions[idx],
                        onChange: this.onChange.bind(this, ["deductions", idx]),
                        onKeyUp: this.onKeyUp.bind(this) })
                )];
            }).bind(this));
            fields.push([React.createElement(
                "th",
                null,
                "FD:"
            ), React.createElement(
                "td",
                null,
                React.createElement("input", {
                    type: "text",
                    value: this.props.score.mistakes,
                    onChange: this.onChange.bind(this, "mistakes"),
                    onKeyUp: this.onKeyUp.bind(this) })
            )]);
            var rows = [];
            for (var idx = 0; idx < fields.length; idx += 2) {
                rows.push(React.createElement(
                    "tr",
                    null,
                    fields.slice(idx, idx + 2)
                ));
            }
            return React.createElement(
                "form",
                { onSubmit: this.onSubmit.bind(this), className: "form-score-input" },
                React.createElement(
                    "table",
                    null,
                    rows
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary", type: "submit" },
                    _("global.buttons.submit")
                ),
                " ",
                React.createElement(
                    "button",
                    { className: "btn btn-primary", type: "button", onClick: this.props.stopEditing },
                    _("global.buttons.discard")
                )
            );
        }
    }, {
        key: "renderFormationJudgeInput",
        value: function renderFormationJudgeInput() {
            return React.createElement(
                "form",
                { onSubmit: this.onSubmit.bind(this), className: "form-score-input" },
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement("th", null),
                        React.createElement("td", null),
                        React.createElement(
                            "th",
                            null,
                            "DT:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.dance_tech,
                                onChange: this.onChange.bind(this, "dance_tech"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
                        React.createElement("th", null),
                        React.createElement("td", null)
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "DF:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.dance_figs,
                                onChange: this.onChange.bind(this, "dance_figs"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
                        React.createElement(
                            "th",
                            null,
                            "I:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.impression,
                                onChange: this.onChange.bind(this, "impression"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "SM:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.small_mistakes,
                                onChange: this.onChange.bind(this, "small_mistakes"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
                        React.createElement(
                            "th",
                            null,
                            "BM:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.big_mistakes,
                                onChange: this.onChange.bind(this, "big_mistakes"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    )
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary", type: "submit" },
                    _("global.buttons.submit")
                ),
                " ",
                React.createElement(
                    "button",
                    { className: "btn btn-primary", type: "button", onClick: this.props.stopEditing },
                    _("global.buttons.discard")
                )
            );
        }
    }, {
        key: "renderHeadJudgeInput",
        value: function renderHeadJudgeInput() {
            return React.createElement(
                "form",
                { onSubmit: this.onSubmit.bind(this), className: "form-score-input" },
                React.createElement(
                    "table",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "P:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.penalty,
                                onChange: this.onChange.bind(this, "penalty"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
                        React.createElement(
                            "th",
                            null,
                            "NT:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "checkbox",
                                checked: this.props.score.nexttour,
                                onChange: this.onChange.bind(this, "nexttour"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    )
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary", type: "submit" },
                    _("global.buttons.submit")
                ),
                React.createElement(
                    "button",
                    { className: "btn btn-primary", type: "button", onClick: this.props.stopEditing },
                    _("global.buttons.discard")
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            switch (this.props.discipline_judge.role) {
                case "acro_judge":
                    if (this.props.scoring_system_name == "rosfarr.formation") {
                        return this.renderFormationJudgeInput();
                    }
                    return this.props.scoring_system_name == "rosfarr.no_acro" ? this.renderDanceJudgeInput() : this.renderAcroJudgeInput();
                case "dance_judge":
                    if (this.props.scoring_system_name == "rosfarr.formation") {
                        return this.renderFormationJudgeInput();
                    }
                    return this.renderDanceJudgeInput();
                case "head_judge":
                    return this.renderHeadJudgeInput();
                default:
                    console.log("Unknown judge role", this.props.discipline_judge.role);
                    return null;
            }
        }
    }, {
        key: "onChange",
        value: function onChange(key, event) {
            if (typeof key != "object") {
                key = [key];
            }
            var score = this.serializeScore();
            var score_inner = score;
            for (var idx = 0; idx < key.length - 1; ++idx) {
                score_inner = score_inner[key[idx]];
            }
            score_inner[key[key.length - 1]] = event.target.type == "checkbox" ? event.target.checked : event.target.value;
            this.props.updateValue(score);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            React.findDOMNode(this).querySelectorAll("input")[0].select();
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(event) {
            if (event.keyCode == 27) {
                // Esc
                this.props.stopEditing();
            }
        }
    }, {
        key: "serializeAcroScore",
        value: function serializeAcroScore() {
            return {
                deductions: this.props.score.deductions.map(function (deduction) {
                    return parseInt(deduction) || 0;
                }),
                mistakes: parseInt(this.props.score.mistakes) || 0
            };
        }
    }, {
        key: "serializeDanceScore",
        value: function serializeDanceScore() {
            if (this.props.scoring_system_name == "rosfarr.formation") {
                return {
                    dance_tech: parseFloat(this.props.score.dance_tech) || 0,
                    dance_figs: parseFloat(this.props.score.dance_figs) || 0,
                    impression: parseFloat(this.props.score.impression) || 0,
                    small_mistakes: parseInt(this.props.score.small_mistakes) || 0,
                    big_mistakes: parseInt(this.props.score.big_mistakes) || 0
                };
            }
            return {
                fw_man: parseInt(this.props.score.fw_man) || 0,
                fw_woman: parseInt(this.props.score.fw_woman) || 0,
                dance_figs: parseInt(this.props.score.dance_figs) || 0,
                composition: parseInt(this.props.score.composition) || 0,
                small_mistakes: parseInt(this.props.score.small_mistakes) || 0,
                big_mistakes: parseInt(this.props.score.big_mistakes) || 0
            };
        }
    }, {
        key: "serializeHeadScore",
        value: function serializeHeadScore() {
            return {
                penalty: parseInt(this.props.score.penalty) || 0,
                nexttour: this.props.score.nexttour
            };
        }
    }, {
        key: "serializeScore",
        value: function serializeScore() {
            switch (this.props.discipline_judge.role) {
                case "acro_judge":
                    return this.props.scoring_system_name == "rosfarr.no_acro" ? this.serializeDanceScore() : this.serializeAcroScore();
                case "dance_judge":
                    return this.serializeDanceScore();
                case "head_judge":
                    return this.serializeHeadScore();
                default:
                    console.log("Unknown judge role", this.props.discipline_judge.role);
                    return null;
            }
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(e) {
            e.preventDefault();
            this.props.submitValue(this.serializeScore());
        }
    }]);

    return TourAdminScoreInput;
})(React.Component);

var TourAdminScoreCell = (function (_React$Component2) {
    _inherits(TourAdminScoreCell, _React$Component2);

    function TourAdminScoreCell() {
        _classCallCheck(this, TourAdminScoreCell);

        _get(Object.getPrototypeOf(TourAdminScoreCell.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourAdminScoreCell, [{
        key: "render",
        value: function render() {
            if (!this.props.editing) {
                if (this.props.discipline_judge.role == "head_judge" && this.props.value.raw_data.nexttour) {
                    return React.createElement(
                        "div",
                        { onClick: this.props.startEditing },
                        "[",
                        this.props.value.total_score.toFixed(1),
                        "]"
                    );
                }
                return React.createElement(
                    "div",
                    { onClick: this.props.startEditing },
                    this.props.value.total_score.toFixed(1)
                );
            } else {
                return React.createElement(TourAdminScoreInput, {
                    score: this.props.value.raw_data,
                    discipline_judge: this.props.discipline_judge,
                    scoring_system_name: this.props.scoring_system_name,
                    stopEditing: this.props.stopEditing,
                    updateValue: this.props.updateValue,
                    submitValue: this.props.submitValue });
            }
        }
    }]);

    return TourAdminScoreCell;
})(React.Component);
//# sourceMappingURL=tour_admin.js.map