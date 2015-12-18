"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var JudgeEditorRow = (function (_React$Component) {
    _inherits(JudgeEditorRow, _React$Component);

    function JudgeEditorRow() {
        _classCallCheck(this, JudgeEditorRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(JudgeEditorRow).apply(this, arguments));
    }

    _createClass(JudgeEditorRow, [{
        key: "sertialize",
        value: function sertialize() {
            return {
                name: this._name.value,
                number: this._number.value,
                category: this._category.value,
                role_description: this._role_description.value,
                sp: this._sp.value,
                external_id: this._external_id.value
            };
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            if (!this.props.newJudge) {
                Api("judge.set", {
                    judge_id: this.props.judge.id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            } else {
                Api("judge.create", {
                    competition_id: this.props.competition_id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "tr",
                { className: "editor" + (this.props.newJudge ? " create" : "") },
                React.createElement(
                    "td",
                    { colSpan: "5" },
                    React.createElement(
                        "form",
                        { onSubmit: this.onSubmit.bind(this) },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col-lg-1" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.judge.number"),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            if (e) {
                                                e.select();_this2._number = e;
                                            }
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.judge.number })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-lg-1" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.judge.category"),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            return e && (_this2._category = e);
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.judge.category })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-lg-3" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.judge.name"),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            return e && (_this2._name = e);
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.judge.name })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-lg-3" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.judge.role_description"),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            return e && (_this2._role_description = e);
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.judge.role_description })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-lg-1" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.judge.external_id"),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            return e && (_this2._external_id = e);
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.judge.external_id })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-lg-1" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.judge.sp"),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            return e && (_this2._sp = e);
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.judge.sp })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-lg-2" },
                                React.createElement(
                                    "div",
                                    { className: "buttons" },
                                    React.createElement(
                                        "button",
                                        {
                                            type: "submit",
                                            className: "btn btn-sm btn-primary" },
                                        _("global.buttons.submit")
                                    ),
                                    React.createElement(
                                        "button",
                                        {
                                            type: "button",
                                            className: "btn btn-sm btn-danger",
                                            onClick: this.props.stopEditing },
                                        _("global.buttons.discard")
                                    )
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return JudgeEditorRow;
})(React.Component);

var JudgeRow = (function (_React$Component2) {
    _inherits(JudgeRow, _React$Component2);

    function JudgeRow(props) {
        _classCallCheck(this, JudgeRow);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(JudgeRow).call(this, props));

        _this3.state = {
            editing: false
        };
        return _this3;
    }

    _createClass(JudgeRow, [{
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
        key: "onDelete",
        value: function onDelete(event) {
            var _this4 = this;

            event.stopPropagation();
            swal_confirm(_("admin.confirms.delete_judge"), function () {
                Api("judge.delete", {
                    judge_id: _this4.props.judge.id
                }).onSuccess(function () {
                    return swal.close();
                }).send();
            });
        }
    }, {
        key: "renderEditor",
        value: function renderEditor() {
            return React.createElement(JudgeEditorRow, _extends({
                newJudge: false,
                stopEditing: this.stopEditing.bind(this)
            }, this.props));
        }
    }, {
        key: "renderViewer",
        value: function renderViewer() {
            var j = this.props.judge;
            return React.createElement(
                "tr",
                { className: "viewer", onClick: this.startEditing.bind(this) },
                React.createElement(
                    "td",
                    { className: "role-description" },
                    j.role_description || _("global.phrases.judge_n", j.number)
                ),
                React.createElement(
                    "td",
                    { className: "name" },
                    j.name
                ),
                React.createElement(
                    "td",
                    { className: "category" },
                    j.category
                ),
                React.createElement(
                    "td",
                    { className: "delete" },
                    React.createElement(
                        "button",
                        { className: "btn btn-danger", onClick: this.onDelete.bind(this) },
                        "X"
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.editing) {
                return this.renderEditor();
            } else {
                return this.renderViewer();
            }
        }
    }]);

    return JudgeRow;
})(React.Component);

var JudgeCreationRow = (function (_React$Component3) {
    _inherits(JudgeCreationRow, _React$Component3);

    function JudgeCreationRow(props) {
        _classCallCheck(this, JudgeCreationRow);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(JudgeCreationRow).call(this, props));

        _this5.state = {
            editing: false
        };
        return _this5;
    }

    _createClass(JudgeCreationRow, [{
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
            var empty_data = {
                "name": "",
                "number": "",
                "role_description": "",
                "category": ""
            };
            return React.createElement(JudgeEditorRow, _extends({
                newJudge: true,
                stopEditing: this.stopEditing.bind(this),
                judge: empty_data
            }, this.props));
        }
    }, {
        key: "renderButton",
        value: function renderButton() {
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { colSpan: "5" },
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            className: "btn btn-default full-width",
                            onClick: this.startEditing.bind(this) },
                        _("admin.buttons.add_judge")
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return this.state.editing ? this.renderEditor() : this.renderButton();
        }
    }]);

    return JudgeCreationRow;
})(React.Component);

var JudgesManagementUI = (function (_React$Component4) {
    _inherits(JudgesManagementUI, _React$Component4);

    function JudgesManagementUI(props) {
        _classCallCheck(this, JudgesManagementUI);

        var _this6 = _possibleConstructorReturn(this, Object.getPrototypeOf(JudgesManagementUI).call(this, props));

        _this6.state = {
            creating: false
        };
        return _this6;
    }

    _createClass(JudgesManagementUI, [{
        key: "renderTable",
        value: function renderTable() {
            var rows = this.props.judges.map((function (judge) {
                return React.createElement(JudgeRow, {
                    key: judge.id,
                    judge: judge });
            }).bind(this));
            return React.createElement(
                "div",
                { className: "manage-judges" },
                React.createElement(
                    "table",
                    { className: "table table-striped" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { className: "role_description" },
                                _("models.judge.role_description")
                            ),
                            React.createElement(
                                "th",
                                { className: "name" },
                                _("models.judge.name")
                            ),
                            React.createElement(
                                "th",
                                { className: "category" },
                                _("models.judge.category")
                            ),
                            React.createElement("th", { className: "delete" })
                        ),
                        rows,
                        React.createElement(JudgeCreationRow, { competition_id: this.props.competition_id })
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "app-content" },
                React.createElement(
                    "header",
                    { className: "app-header" },
                    React.createElement(
                        "h1",
                        null,
                        _("admin.headers.judges_management")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "app-body" },
                    this.renderTable()
                )
            );
        }
    }]);

    return JudgesManagementUI;
})(React.Component);
//# sourceMappingURL=judges_management.js.map