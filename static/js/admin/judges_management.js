"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JudgeInputForm = (function (_React$Component) {
    _inherits(JudgeInputForm, _React$Component);

    function JudgeInputForm() {
        _classCallCheck(this, JudgeInputForm);

        _get(Object.getPrototypeOf(JudgeInputForm.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(JudgeInputForm, [{
        key: "render",
        value: function render() {
            var classes = ["judge", "form-horizontal"].concat(this.props.classes || []).join(" ");
            var judge = this.props.judge || { id: "new" };
            return React.createElement(
                "form",
                { className: classes, key: judge.id, onSubmit: this.submitJudge.bind(this) },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-6" },
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                _("models.judge.name")
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "name",
                                    defaultValue: judge.name })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                _("models.judge.role")
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "role",
                                    defaultValue: judge.role })
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-3" },
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                _("models.judge.category")
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "category",
                                    defaultValue: judge.category })
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                _("models.judge.number")
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement("input", {
                                    type: "text",
                                    className: "form-control",
                                    ref: "number",
                                    defaultValue: judge.number })
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-3" },
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "label",
                                { className: "col-sm-4 control-label" },
                                _("models.judge.hide_from_results")
                            ),
                            React.createElement(
                                "div",
                                { className: "col-sm-8" },
                                React.createElement(
                                    "div",
                                    { className: "checkbox" },
                                    React.createElement(
                                        "label",
                                        null,
                                        React.createElement("input", {
                                            type: "checkbox",
                                            ref: "hide_from_results",
                                            defaultChecked: judge.hide_from_results })
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "form-group form-group-sm" },
                            React.createElement(
                                "div",
                                { className: "col-sm-offset-4 col-sm-8" },
                                React.createElement(
                                    "button",
                                    { className: "btn btn-primary btn-sm", type: "submit" },
                                    _("global.buttons.submit")
                                ),
                                " ",
                                React.createElement(
                                    "button",
                                    { className: "btn btn-primary btn-sm", type: "button", onClick: this.props.stopEditing },
                                    _("global.buttons.discard")
                                )
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "submitJudge",
        value: function submitJudge(event) {
            event.preventDefault();
            this.props.submitJudge(this.serialize());
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                name: this.refs.name.getDOMNode().value,
                role: this.refs.role.getDOMNode().value,
                category: this.refs.category.getDOMNode().value,
                number: this.refs.number.getDOMNode().value,
                hide_from_results: this.refs.hide_from_results.getDOMNode().checked
            };
        }
    }]);

    return JudgeInputForm;
})(React.Component);

var JudgeEditingUI = (function (_React$Component2) {
    _inherits(JudgeEditingUI, _React$Component2);

    function JudgeEditingUI(props) {
        _classCallCheck(this, JudgeEditingUI);

        _get(Object.getPrototypeOf(JudgeEditingUI.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
    }

    _createClass(JudgeEditingUI, [{
        key: "startEditing",
        value: function startEditing() {
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
        }
    }, {
        key: "renderEditor",
        value: function renderEditor() {
            return React.createElement(JudgeInputForm, {
                judge: this.props.judge,
                submitJudge: this.submitJudge.bind(this),
                stopEditing: this.stopEditing.bind(this) });
        }
    }, {
        key: "renderViewer",
        value: function renderViewer() {
            return React.createElement(
                "div",
                { className: "judge", key: this.props.judge.id },
                React.createElement(
                    "h3",
                    null,
                    this.props.judge.name
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-md-5" },
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                _("models.judge.category"),
                                ":"
                            ),
                            " ",
                            this.props.judge.category,
                            " "
                        ),
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                _("models.judge.role"),
                                ":"
                            ),
                            " ",
                            this.props.judge.role,
                            " "
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-5" },
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                _("models.judge.number"),
                                ":"
                            ),
                            " ",
                            this.props.judge.number,
                            " "
                        ),
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "strong",
                                null,
                                _("models.judge.hide_from_results"),
                                ":"
                            ),
                            " ",
                            this.props.judge.hide_from_results ? _("global.labels.yes") : _("global.labels.no"),
                            " "
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-md-2" },
                        React.createElement(
                            "button",
                            { className: "full-width btn btn-primary btn-sm", onClick: this.startEditing.bind(this) },
                            _("global.buttons.edit")
                        ),
                        React.createElement("br", null),
                        React.createElement(
                            "button",
                            { className: "full-width btn btn-danger btn-sm", onClick: this.deleteJudge.bind(this) },
                            _("global.buttons.delete")
                        )
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return this.state.editing ? this.renderEditor() : this.renderViewer();
        }
    }, {
        key: "submitJudge",
        value: function submitJudge(data) {
            Api("tournaments.judge.set", {
                judge_id: this.props.judge.id,
                data: data
            }).onSuccess((function (response) {
                this.stopEditing();
            }).bind(this)).send();
        }
    }, {
        key: "deleteJudge",
        value: function deleteJudge() {
            if (!confirm(_("admin.confirms.delete_judge"))) {
                return false;
            }
            Api("tournaments.judge.delete", { judge_id: this.props.judge.id }).send();
        }
    }]);

    return JudgeEditingUI;
})(React.Component);

var JudgeCreatingUI = (function (_React$Component3) {
    _inherits(JudgeCreatingUI, _React$Component3);

    function JudgeCreatingUI() {
        _classCallCheck(this, JudgeCreatingUI);

        _get(Object.getPrototypeOf(JudgeCreatingUI.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(JudgeCreatingUI, [{
        key: "render",
        value: function render() {
            return React.createElement(JudgeInputForm, {
                classes: ["judge-create"],
                submitJudge: this.submitJudge.bind(this),
                stopEditing: this.props.stopEditing });
        }
    }, {
        key: "submitJudge",
        value: function submitJudge(data) {
            Api("tournaments.judge.create", {
                competition_id: this.props.competition_id,
                data: data
            }).onSuccess((function (response) {
                this.props.stopEditing();
            }).bind(this)).send();
        }
    }]);

    return JudgeCreatingUI;
})(React.Component);

var JudgesManagementUI = (function (_React$Component4) {
    _inherits(JudgesManagementUI, _React$Component4);

    function JudgesManagementUI(props) {
        _classCallCheck(this, JudgesManagementUI);

        _get(Object.getPrototypeOf(JudgesManagementUI.prototype), "constructor", this).call(this, props);
        this.state = {
            creating: false
        };
    }

    _createClass(JudgesManagementUI, [{
        key: "startCreating",
        value: function startCreating() {
            this.setState({
                creating: true
            });
        }
    }, {
        key: "stopCreating",
        value: function stopCreating() {
            this.setState({
                creating: false
            });
        }
    }, {
        key: "renderTourCreation",
        value: function renderTourCreation() {
            if (this.state.creating) {
                return React.createElement(JudgeCreatingUI, {
                    competition_id: this.props.competition_id,
                    stopEditing: this.stopCreating.bind(this) });
            } else {
                return React.createElement(
                    "button",
                    { className: "btn btn-default full-width", onClick: this.startCreating.bind(this) },
                    _("global.buttons.add")
                );
            }
        }
    }, {
        key: "render",
        value: function render() {
            var judges = this.props.judges.map((function (judge) {
                return React.createElement(JudgeEditingUI, {
                    judge: judge,
                    key: judge.id });
            }).bind(this));
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        _("admin.headers.judges_management")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "judges-management-ui" },
                    judges,
                    this.renderTourCreation()
                )
            );
        }
    }]);

    return JudgesManagementUI;
})(React.Component);
//# sourceMappingURL=judges_management.js.map