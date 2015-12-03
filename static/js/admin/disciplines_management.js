"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisciplineEditorRow = (function (_React$Component) {
    _inherits(DisciplineEditorRow, _React$Component);

    function DisciplineEditorRow(props) {
        _classCallCheck(this, DisciplineEditorRow);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineEditorRow).call(this, props));

        _this.state = {
            discipline_judges: props.discipline.discipline_judges.map(function (dj) {
                return {
                    judge_id: dj.judge.id,
                    role: dj.role
                };
            })
        };
        return _this;
    }

    _createClass(DisciplineEditorRow, [{
        key: "addDisciplineJudge",
        value: function addDisciplineJudge() {
            var discipline_judges = $.extend([], this.state.discipline_judges);
            var new_idx = discipline_judges.length;
            discipline_judges.push({
                judge_id: this.props.judges[0] && this.props.judges[0].id,
                role: GL.judge_roles[0]
            });
            this.latest_added = "j" + new_idx;
            this.setState({
                discipline_judges: discipline_judges
            });
        }
    }, {
        key: "removeDisciplineJudge",
        value: function removeDisciplineJudge(idx) {
            var discipline_judges = $.extend([], this.state.discipline_judges);
            discipline_judges.splice(idx, 1);
            this.setState({
                discipline_judges: discipline_judges
            });
        }
    }, {
        key: "validate",
        value: function validate() {
            var used_judges = {};
            this.state.discipline_judges.forEach((function (dj) {
                if (used_judges[dj.judge_id]) {
                    var judge = this.props.judges.filter(function (j) {
                        return j.id == dj.judge_id;
                    })[0];
                    throw _("errors.discipline_judge.repeating_judge", judge.name);
                }
                used_judges[dj.judge_id] = true;
            }).bind(this));
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                name: this._name.value,
                sp: this._sp.value,
                discipline_judges: this.state.discipline_judges.map(function (dj) {
                    return {
                        judge_id: parseInt(dj.judge_id),
                        role: dj.role
                    };
                }),
                external_id: this._external_id.value
            };
        }
    }, {
        key: "onDisciplineJudgeChange",
        value: function onDisciplineJudgeChange(idx, field, event) {
            var discipline_judges = $.extend([], this.state.discipline_judges);
            discipline_judges[idx][field] = event.target.value;
            this.setState({
                discipline_judges: discipline_judges
            });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            try {
                this.validate();
                if (!this.props.newDiscipline) {
                    Api("discipline.set", {
                        discipline_id: this.props.discipline.id,
                        data: this.serialize()
                    }).onSuccess(this.props.stopEditing).send();
                } else {
                    Api("discipline.create", {
                        competition_id: this.props.competition_id,
                        data: this.serialize()
                    }).onSuccess(this.props.stopEditing).send();
                }
            } catch (ex) {
                showError(ex);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return React.createElement(
                "tr",
                { className: "editor" + (this.props.newDiscipline ? " create" : "") },
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
                                { className: "col-lg-4" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.discipline.name"),
                                    React.createElement("input", {
                                        ref: (function (e) {
                                            if (e) {
                                                this._name = e;
                                            }
                                        }).bind(this),
                                        className: "full-width",
                                        defaultValue: this.props.discipline.name })
                                ),
                                React.createElement(
                                    "div",
                                    { className: "row" },
                                    React.createElement(
                                        "div",
                                        { className: "col-lg-6" },
                                        React.createElement(
                                            "label",
                                            { className: "full-width" },
                                            _("models.discipline.sp"),
                                            React.createElement("input", {
                                                ref: function ref(e) {
                                                    return e && (_this2._sp = e);
                                                },
                                                className: "full-width",
                                                defaultValue: this.props.discipline.sp })
                                        )
                                    ),
                                    React.createElement(
                                        "div",
                                        { className: "col-lg-6" },
                                        React.createElement(
                                            "label",
                                            { className: "full-width" },
                                            _("models.discipline.external_id"),
                                            React.createElement("br", null),
                                            React.createElement("input", {
                                                ref: function ref(e) {
                                                    return e && (_this2._external_id = e);
                                                },
                                                className: "full-width",
                                                defaultValue: this.props.discipline.external_id })
                                        )
                                    )
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-lg-6" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.discipline.discipline_judges")
                                ),
                                this.state.discipline_judges.map(function (dj, idx) {
                                    return React.createElement(
                                        "div",
                                        { key: idx },
                                        React.createElement(
                                            "select",
                                            { value: dj.judge_id, className: "judge", onChange: _this2.onDisciplineJudgeChange.bind(_this2, idx, "judge_id") },
                                            _this2.props.judges.map(function (j) {
                                                return React.createElement(
                                                    "option",
                                                    { value: j.id, key: j.id },
                                                    j.name
                                                );
                                            })
                                        ),
                                        React.createElement(
                                            "select",
                                            { value: dj.role, className: "judge-role", onChange: _this2.onDisciplineJudgeChange.bind(_this2, idx, "role") },
                                            GL.judge_roles.map(function (jr) {
                                                return React.createElement(
                                                    "option",
                                                    { value: jr, key: jr },
                                                    _("judge_roles." + jr)
                                                );
                                            })
                                        ),
                                        React.createElement(
                                            "button",
                                            {
                                                type: "button",
                                                className: "del btn btn-danger",
                                                onClick: _this2.removeDisciplineJudge.bind(_this2, idx) },
                                            "X"
                                        )
                                    );
                                }),
                                React.createElement(
                                    "button",
                                    {
                                        type: "button",
                                        className: "full-width btn btn-sm btn-default",
                                        onClick: this.addDisciplineJudge.bind(this) },
                                    _("global.buttons.add")
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-lg-2" },
                                React.createElement(
                                    "label",
                                    null,
                                    " "
                                ),
                                React.createElement(
                                    "div",
                                    { className: "buttons" },
                                    React.createElement(
                                        "button",
                                        {
                                            type: "submit",
                                            className: "btn btn-primary" },
                                        _("global.buttons.submit")
                                    ),
                                    React.createElement("br", null),
                                    React.createElement(
                                        "button",
                                        {
                                            type: "button",
                                            className: "btn btn-danger",
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

    return DisciplineEditorRow;
})(React.Component);

var DisciplineRow = (function (_React$Component2) {
    _inherits(DisciplineRow, _React$Component2);

    function DisciplineRow(props) {
        _classCallCheck(this, DisciplineRow);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineRow).call(this, props));

        _this3.state = {
            editing: false
        };
        return _this3;
    }

    _createClass(DisciplineRow, [{
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
            event.stopPropagation();
            if (confirm(_("admin.confirms.delete_discipline"))) {
                Api("discipline.delete", {
                    discipline_id: this.props.discipline.id
                }).send();
            }
        }
    }, {
        key: "renderEditor",
        value: function renderEditor() {
            return React.createElement(DisciplineEditorRow, _extends({
                newDiscipline: false,
                stopEditing: this.stopEditing.bind(this)
            }, this.props));
        }
    }, {
        key: "renderViewer",
        value: function renderViewer() {
            var c = this.props.discipline;
            return React.createElement(
                "tr",
                { className: "viewer", onClick: this.startEditing.bind(this) },
                React.createElement(
                    "td",
                    { className: "name" },
                    c.name
                ),
                React.createElement(
                    "td",
                    { className: "sp" },
                    c.sp
                ),
                React.createElement(
                    "td",
                    { className: "external-id" },
                    c.external_id
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

    return DisciplineRow;
})(React.Component);

var DisciplineCreationRow = (function (_React$Component3) {
    _inherits(DisciplineCreationRow, _React$Component3);

    function DisciplineCreationRow(props) {
        _classCallCheck(this, DisciplineCreationRow);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplineCreationRow).call(this, props));

        _this4.state = {
            editing: false
        };
        return _this4;
    }

    _createClass(DisciplineCreationRow, [{
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
                "discipline_judges": [],
                "sp": "0",
                "external_id": ""
            };
            return React.createElement(DisciplineEditorRow, _extends({
                newDiscipline: true,
                stopEditing: this.stopEditing.bind(this),
                discipline: empty_data
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
                        _("admin.buttons.add_discipline")
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

    return DisciplineCreationRow;
})(React.Component);

var DisciplinesManagementUI = (function (_React$Component4) {
    _inherits(DisciplinesManagementUI, _React$Component4);

    function DisciplinesManagementUI(props) {
        _classCallCheck(this, DisciplinesManagementUI);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(DisciplinesManagementUI).call(this, props));

        _this5.state = {
            creating: false
        };
        return _this5;
    }

    _createClass(DisciplinesManagementUI, [{
        key: "renderTable",
        value: function renderTable() {
            var rows = this.props.disciplines.map((function (discipline) {
                return React.createElement(DisciplineRow, {
                    key: discipline.id,
                    judges: this.props.judges,
                    discipline: discipline,
                    all_disciplines: this.props.disciplines });
            }).bind(this));
            return React.createElement(
                "div",
                { className: "manage-disciplines" },
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
                                { className: "name" },
                                _("models.discipline.name")
                            ),
                            React.createElement(
                                "th",
                                { className: "sp" },
                                _("models.discipline.sp")
                            ),
                            React.createElement(
                                "th",
                                { className: "external-id" },
                                _("models.discipline.external_id")
                            ),
                            React.createElement("th", { className: "delete" })
                        ),
                        rows,
                        React.createElement(DisciplineCreationRow, {
                            judges: this.props.judges,
                            competition_id: this.props.competition_id })
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        _("admin.headers.disciplines_management")
                    )
                ),
                this.renderTable()
            );
        }
    }]);

    return DisciplinesManagementUI;
})(React.Component);
//# sourceMappingURL=disciplines_management.js.map