"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BaseScoreInput = (function (_React$Component) {
    _inherits(BaseScoreInput, _React$Component);

    function BaseScoreInput() {
        _classCallCheck(this, BaseScoreInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(BaseScoreInput).apply(this, arguments));
    }

    _createClass(BaseScoreInput, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "form",
                { onSubmit: this.onSubmit.bind(this), className: "form-score-input" },
                this.renderTable(),
                this.renderButtons()
            );
        }
    }, {
        key: "renderButtons",
        value: function renderButtons() {
            if (this.props.readOnly) {
                return React.createElement(
                    "button",
                    { className: "btn btn-primary", type: "button", onClick: this.props.stopEditing },
                    _("global.buttons.close")
                );
            }
            return React.createElement(
                "div",
                null,
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
                ),
                React.createElement(ConfirmationButton, {
                    judge_role: this.props.discipline_judge.role,
                    confirmed: this.props.confirmed,
                    toggleConfirmation: this.props.toggleConfirmation,
                    onKeyUp: this.onKeyUp.bind(this) })
            );
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            ReactDOM.findDOMNode(this).querySelectorAll("input")[0].select();
            this.onMount.apply(this, arguments);
        }
    }, {
        key: "onMount",
        value: function onMount() {}
    }, {
        key: "onChange",
        value: function onChange(key, event) {
            if ((typeof key === "undefined" ? "undefined" : _typeof(key)) != "object") {
                key = [key];
            }
            var score = this.serialize();
            var score_inner = score;
            for (var idx = 0; idx < key.length - 1; ++idx) {
                score_inner = score_inner[key[idx]];
            }
            score_inner[key[key.length - 1]] = event.target.type == "checkbox" ? event.target.indeterminate ? null : event.target.checked : event.target.value;
            this.props.updateValue(score);
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
        key: "isEmpty",
        value: function isEmpty(value) {
            return value === "" || value === null;
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(e) {
            e.preventDefault();
            this.props.submitValue(this.serialize());
        }
    }]);

    return BaseScoreInput;
})(React.Component);

var DanceScoreInput = (function (_BaseScoreInput) {
    _inherits(DanceScoreInput, _BaseScoreInput);

    function DanceScoreInput() {
        _classCallCheck(this, DanceScoreInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(DanceScoreInput).apply(this, arguments));
    }

    _createClass(DanceScoreInput, [{
        key: "renderTable",
        value: function renderTable() {
            return React.createElement(
                "table",
                null,
                React.createElement(
                    "tbody",
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
                                readOnly: this.props.readOnly,
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
                                readOnly: this.props.readOnly,
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
                                readOnly: this.props.readOnly,
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
                                readOnly: this.props.readOnly,
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
                                readOnly: this.props.readOnly,
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
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "big_mistakes"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    )
                )
            );
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                fw_man: !this.isEmpty(this.props.score.fw_man) ? parseInt(this.props.score.fw_man) || 0 : null,
                fw_woman: !this.isEmpty(this.props.score.fw_woman) ? parseInt(this.props.score.fw_woman) || 0 : null,
                dance_figs: !this.isEmpty(this.props.score.dance_figs) ? parseFloat(this.props.score.dance_figs) || 0 : null,
                composition: !this.isEmpty(this.props.score.composition) ? parseFloat(this.props.score.composition) || 0 : null,
                small_mistakes: !this.isEmpty(this.props.score.small_mistakes) ? parseInt(this.props.score.small_mistakes) || 0 : null,
                big_mistakes: !this.isEmpty(this.props.score.big_mistakes) ? parseInt(this.props.score.big_mistakes) || 0 : null
            };
        }
    }]);

    return DanceScoreInput;
})(BaseScoreInput);

var AcroScoreInput = (function (_BaseScoreInput2) {
    _inherits(AcroScoreInput, _BaseScoreInput2);

    function AcroScoreInput() {
        _classCallCheck(this, AcroScoreInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(AcroScoreInput).apply(this, arguments));
    }

    _createClass(AcroScoreInput, [{
        key: "renderTable",
        value: function renderTable() {
            var fields = this.props.score.reductions.map((function (value, idx) {
                return [React.createElement(
                    "th",
                    { key: "H" + idx },
                    "A",
                    idx + 1,
                    ":"
                ), React.createElement(
                    "td",
                    { key: "V" + idx },
                    React.createElement("input", {
                        type: "text",
                        value: this.props.score.reductions[idx],
                        readOnly: this.props.readOnly,
                        onChange: this.onChange.bind(this, ["reductions", idx]),
                        onKeyUp: this.onKeyUp.bind(this) })
                )];
            }).bind(this));
            fields.push([React.createElement(
                "th",
                { key: "HFD" },
                "FD:"
            ), React.createElement(
                "td",
                { key: "VFD" },
                React.createElement("input", {
                    type: "text",
                    value: this.props.score.mistakes,
                    readOnly: this.props.readOnly,
                    onChange: this.onChange.bind(this, "mistakes"),
                    onKeyUp: this.onKeyUp.bind(this) })
            )]);
            var rows = [];
            for (var idx = 0; idx < fields.length; idx += 2) {
                rows.push(React.createElement(
                    "tr",
                    { key: "R" + idx },
                    fields.slice(idx, idx + 2)
                ));
            }
            return React.createElement(
                "table",
                null,
                React.createElement(
                    "tbody",
                    null,
                    rows
                )
            );
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                reductions: this.props.score.reductions.map((function (reduction) {
                    return !this.isEmpty(reduction) ? parseInt(reduction) || 0 : null;
                }).bind(this)),
                mistakes: parseInt(this.props.score.mistakes) || 0
            };
        }
    }]);

    return AcroScoreInput;
})(BaseScoreInput);

var FormationScoreInput = (function (_BaseScoreInput3) {
    _inherits(FormationScoreInput, _BaseScoreInput3);

    function FormationScoreInput() {
        _classCallCheck(this, FormationScoreInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FormationScoreInput).apply(this, arguments));
    }

    _createClass(FormationScoreInput, [{
        key: "renderTable",
        value: function renderTable() {
            return React.createElement(
                "table",
                null,
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
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
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "dance_tech"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
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
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "dance_figs"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
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
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "impression"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
                        React.createElement(
                            "th",
                            null,
                            "M:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.small_mistakes,
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "small_mistakes"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    )
                )
            );
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                dance_tech: !this.isEmpty(this.props.score.dance_tech) ? parseFloat(this.props.score.dance_tech) || 0 : null,
                dance_figs: !this.isEmpty(this.props.score.dance_figs) ? parseFloat(this.props.score.dance_figs) || 0 : null,
                impression: !this.isEmpty(this.props.score.impression) ? parseFloat(this.props.score.impression) || 0 : null,
                mistakes: !this.isEmpty(this.props.score.mistakes) ? parseInt(this.props.score.mistakes) || 0 : null
            };
        }
    }]);

    return FormationScoreInput;
})(BaseScoreInput);

var FormationAcroScoreInput = (function (_BaseScoreInput4) {
    _inherits(FormationAcroScoreInput, _BaseScoreInput4);

    function FormationAcroScoreInput() {
        _classCallCheck(this, FormationAcroScoreInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(FormationAcroScoreInput).apply(this, arguments));
    }

    _createClass(FormationAcroScoreInput, [{
        key: "renderTable",
        value: function renderTable() {
            return React.createElement(
                "table",
                null,
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "A:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.acrobatics,
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "acrobatics"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
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
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "dance_tech"),
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
                                readOnly: this.props.readOnly,
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
                                readOnly: this.props.readOnly,
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
                                readOnly: this.props.readOnly,
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
                                value: this.props.score.small_mistakes,
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "small_mistakes"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    )
                )
            );
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                acrobatics: !this.isEmpty(this.props.score.acrobatics) ? parseFloat(this.props.score.acrobatics) || 0 : null,
                dance_tech: !this.isEmpty(this.props.score.dance_tech) ? parseFloat(this.props.score.dance_tech) || 0 : null,
                dance_figs: !this.isEmpty(this.props.score.dance_figs) ? parseFloat(this.props.score.dance_figs) || 0 : null,
                impression: !this.isEmpty(this.props.score.impression) ? parseFloat(this.props.score.impression) || 0 : null,
                small_mistakes: !this.isEmpty(this.props.score.small_mistakes) ? parseInt(this.props.score.small_mistakes) || 0 : null,
                big_mistakes: !this.isEmpty(this.props.score.big_mistakes) ? parseInt(this.props.score.big_mistakes) || 0 : null
            };
        }
    }]);

    return FormationAcroScoreInput;
})(BaseScoreInput);

var SimplifiedScoreInput = (function (_BaseScoreInput5) {
    _inherits(SimplifiedScoreInput, _BaseScoreInput5);

    function SimplifiedScoreInput() {
        _classCallCheck(this, SimplifiedScoreInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SimplifiedScoreInput).apply(this, arguments));
    }

    _createClass(SimplifiedScoreInput, [{
        key: "renderTable",
        value: function renderTable() {
            return React.createElement(
                "table",
                null,
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "S:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.points,
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "points"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    )
                )
            );
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                points: !this.isEmpty(this.props.score.points) ? parseInt(this.props.score.points) || 0 : null
            };
        }
    }]);

    return SimplifiedScoreInput;
})(BaseScoreInput);

var HeadScoreInput = (function (_BaseScoreInput6) {
    _inherits(HeadScoreInput, _BaseScoreInput6);

    function HeadScoreInput() {
        _classCallCheck(this, HeadScoreInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(HeadScoreInput).apply(this, arguments));
    }

    _createClass(HeadScoreInput, [{
        key: "renderTable",
        value: function renderTable() {
            return React.createElement(
                "table",
                null,
                React.createElement(
                    "tbody",
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
                                readOnly: this.props.readOnly,
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
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "nexttour"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        )
                    )
                )
            );
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                penalty: parseInt(this.props.score.penalty) || 0,
                nexttour: this.props.score.nexttour
            };
        }
    }]);

    return HeadScoreInput;
})(BaseScoreInput);

var TechScoreInput = (function (_BaseScoreInput7) {
    _inherits(TechScoreInput, _BaseScoreInput7);

    function TechScoreInput() {
        _classCallCheck(this, TechScoreInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TechScoreInput).apply(this, arguments));
    }

    _createClass(TechScoreInput, [{
        key: "renderTable",
        value: function renderTable() {
            var _this9 = this;

            return React.createElement(
                "table",
                null,
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "JS:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "text",
                                value: this.props.score.jump_steps,
                                readOnly: this.props.readOnly,
                                onChange: this.onChange.bind(this, "jump_steps"),
                                onKeyUp: this.onKeyUp.bind(this) })
                        ),
                        React.createElement(
                            "th",
                            null,
                            "TV:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement("input", {
                                type: "checkbox",
                                ref: "cb",
                                checked: !!this.props.score.timing_violation,
                                onChange: function onChange(event) {},
                                onKeyUp: this.onKeyUp.bind(this),
                                onClick: function onClick(event) {
                                    if (_this9.props.readOnly) {
                                        event.preventDefault();
                                        return;
                                    }
                                    var cb = event.target;
                                    if (cb.readOnly) {
                                        cb.checked = cb.readOnly = false;
                                    } else if (!cb.checked) {
                                        cb.readOnly = cb.indeterminate = true;
                                    }
                                    _this9.onChange("timing_violation", event);
                                } })
                        )
                    )
                )
            );
        }
    }, {
        key: "onMount",
        value: function onMount() {
            var node = this.refs.cb;
            node.readOnly = this.props.score.timing_violation === null;
            node.indeterminate = this.props.score.timing_violation === null;
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                jump_steps: parseInt(this.props.score.jump_steps) || 0,
                timing_violation: this.props.score.timing_violation
            };
        }
    }]);

    return TechScoreInput;
})(BaseScoreInput);

var ConfirmationButton = (function (_React$Component2) {
    _inherits(ConfirmationButton, _React$Component2);

    function ConfirmationButton() {
        _classCallCheck(this, ConfirmationButton);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ConfirmationButton).apply(this, arguments));
    }

    _createClass(ConfirmationButton, [{
        key: "render",
        value: function render() {
            if (this.props.judge_role == "head_judge") {
                return null;
            }
            return React.createElement(
                "button",
                {
                    className: "btn btn-sm btn-confirmation" + (this.props.confirmed ? " btn-danger" : " btn-success"),
                    type: "button",
                    onClick: this.props.toggleConfirmation,
                    onKeyUp: this.props.onKeyUp },
                this.props.confirmed ? _("admin.buttons.unconfirm_score") : _("admin.buttons.confirm_score")
            );
        }
    }]);

    return ConfirmationButton;
})(React.Component);

var TourAdminScoreInput = (function (_React$Component3) {
    _inherits(TourAdminScoreInput, _React$Component3);

    function TourAdminScoreInput() {
        _classCallCheck(this, TourAdminScoreInput);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourAdminScoreInput).apply(this, arguments));
    }

    _createClass(TourAdminScoreInput, [{
        key: "render",
        value: function render() {
            switch (this.props.discipline_judge.role) {
                case "acro_judge":
                    if (this.props.scoring_system_name == "rosfarr.am_final_fw") {
                        return React.createElement(DanceScoreInput, this.props);
                    }
                    return React.createElement(AcroScoreInput, this.props);
                case "dance_judge":
                    if (this.props.scoring_system_name == "rosfarr.formation") {
                        return React.createElement(FormationScoreInput, this.props);
                    }
                    if (this.props.scoring_system_name == "rosfarr.formation_acro") {
                        return React.createElement(FormationAcroScoreInput, this.props);
                    }
                    if (this.props.scoring_system_name == "rosfarr.simplified") {
                        return React.createElement(SimplifiedScoreInput, this.props);
                    }
                    return React.createElement(DanceScoreInput, this.props);
                case "head_judge":
                    return React.createElement(HeadScoreInput, this.props);
                case "tech_judge":
                    return React.createElement(TechScoreInput, this.props);
                default:
                    console.log("Unknown judge role", this.props.discipline_judge.role);
                    return null;
            }
        }
    }]);

    return TourAdminScoreInput;
})(React.Component);

var TourAdminScoreCell = (function (_React$Component4) {
    _inherits(TourAdminScoreCell, _React$Component4);

    function TourAdminScoreCell() {
        _classCallCheck(this, TourAdminScoreCell);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourAdminScoreCell).apply(this, arguments));
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
                        this.props.value.total_score.toFixed(2),
                        "]"
                    );
                }
                if (this.props.discipline_judge.role == "tech_judge") {
                    var tv_str = this.props.value.raw_data.timing_violation === null ? " ?" : this.props.value.raw_data.timing_violation ? " ✗" : " ✓";
                    return React.createElement(
                        "div",
                        { onClick: this.props.startEditing },
                        this.props.value.raw_data.jump_steps + tv_str
                    );
                }
                return React.createElement(
                    "div",
                    { onClick: this.props.startEditing },
                    this.props.value.total_score.toFixed(2)
                );
            } else {
                return React.createElement(TourAdminScoreInput, {
                    readOnly: this.props.readOnly,
                    score: this.props.value.raw_data,
                    confirmed: this.props.confirmed,
                    discipline_judge: this.props.discipline_judge,
                    scoring_system_name: this.props.scoring_system_name,
                    stopEditing: this.props.stopEditing,
                    updateValue: this.props.updateValue,
                    submitValue: this.props.submitValue,
                    toggleConfirmation: this.props.toggleConfirmation });
            }
        }
    }]);

    return TourAdminScoreCell;
})(React.Component);
//# sourceMappingURL=tour_admin.js.map