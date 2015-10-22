"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DisciplineEditorRow = (function (_React$Component) {
    _inherits(DisciplineEditorRow, _React$Component);

    function DisciplineEditorRow() {
        _classCallCheck(this, DisciplineEditorRow);

        _get(Object.getPrototypeOf(DisciplineEditorRow.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(DisciplineEditorRow, [{
        key: "sertialize",
        value: function sertialize() {
            return {
                name: this._name.value,
                sp: this._sp.value,
                external_id: this._external_id.value
            };
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            if (!this.props.newDiscipline) {
                Api("discipline.set", {
                    discipline_id: this.props.discipline.id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            } else {
                Api("discipline.create", {
                    competition_id: this.props.competition_id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this = this;

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
                                { className: "col-md-5" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.discipline.name"),
                                    React.createElement("input", {
                                        ref: (function (e) {
                                            if (e) {
                                                e.getDOMNode().select();this._name = e.getDOMNode();
                                            }
                                        }).bind(this),
                                        className: "full-width",
                                        defaultValue: this.props.discipline.name })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-2" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.discipline.sp"),
                                    React.createElement("input", {
                                        ref: function (e) {
                                            return e && (_this._sp = e.getDOMNode());
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.discipline.sp })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-2" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.discipline.external_id"),
                                    React.createElement("br", null),
                                    React.createElement("input", {
                                        ref: function (e) {
                                            return e && (_this._external_id = e.getDOMNode());
                                        },
                                        defaultValue: this.props.discipline.external_id })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-3" },
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

        _get(Object.getPrototypeOf(DisciplineRow.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
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

        _get(Object.getPrototypeOf(DisciplineCreationRow.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
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

        _get(Object.getPrototypeOf(DisciplinesManagementUI.prototype), "constructor", this).call(this, props);
        this.state = {
            creating: false
        };
    }

    _createClass(DisciplinesManagementUI, [{
        key: "renderTable",
        value: function renderTable() {
            var rows = this.props.disciplines.map((function (discipline) {
                return React.createElement(DisciplineRow, {
                    key: discipline.id,
                    discipline: discipline });
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
                        React.createElement(DisciplineCreationRow, { competition_id: this.props.competition_id })
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