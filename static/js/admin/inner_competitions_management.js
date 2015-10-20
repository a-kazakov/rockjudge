"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var InnerCompetitionEditorRow = (function (_React$Component) {
    _inherits(InnerCompetitionEditorRow, _React$Component);

    function InnerCompetitionEditorRow() {
        _classCallCheck(this, InnerCompetitionEditorRow);

        _get(Object.getPrototypeOf(InnerCompetitionEditorRow.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(InnerCompetitionEditorRow, [{
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
            if (!this.props.newInnerCompetition) {
                Api("tournaments.inner_competition.set", {
                    inner_competition_id: this.props.inner_competition.id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            } else {
                Api("tournaments.inner_competition.create", {
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
                { className: "editor" + (this.props.newInnerCompetition ? " create" : "") },
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
                                    _("models.inner_competition.name"),
                                    React.createElement("input", {
                                        ref: (function (e) {
                                            if (e) {
                                                e.getDOMNode().select();this._name = e.getDOMNode();
                                            }
                                        }).bind(this),
                                        className: "full-width",
                                        defaultValue: this.props.inner_competition.name })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-2" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.inner_competition.sp"),
                                    React.createElement("input", {
                                        ref: function (e) {
                                            return e && (_this._sp = e.getDOMNode());
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.inner_competition.sp })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-2" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.inner_competition.external_id"),
                                    React.createElement("br", null),
                                    React.createElement("input", {
                                        ref: function (e) {
                                            return e && (_this._external_id = e.getDOMNode());
                                        },
                                        defaultValue: this.props.inner_competition.external_id })
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

    return InnerCompetitionEditorRow;
})(React.Component);

var InnerCompetitionRow = (function (_React$Component2) {
    _inherits(InnerCompetitionRow, _React$Component2);

    function InnerCompetitionRow(props) {
        _classCallCheck(this, InnerCompetitionRow);

        _get(Object.getPrototypeOf(InnerCompetitionRow.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
    }

    _createClass(InnerCompetitionRow, [{
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
            if (confirm(_("admin.confirms.delete_inner_competition"))) {
                Api("tournaments.inner_competition.delete", {
                    inner_competition_id: this.props.inner_competition.id
                }).send();
            }
        }
    }, {
        key: "renderEditor",
        value: function renderEditor() {
            return React.createElement(InnerCompetitionEditorRow, _extends({
                newInnerCompetition: false,
                stopEditing: this.stopEditing.bind(this)
            }, this.props));
        }
    }, {
        key: "renderViewer",
        value: function renderViewer() {
            var c = this.props.inner_competition;
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

    return InnerCompetitionRow;
})(React.Component);

var InnerCompetitionCreationRow = (function (_React$Component3) {
    _inherits(InnerCompetitionCreationRow, _React$Component3);

    function InnerCompetitionCreationRow(props) {
        _classCallCheck(this, InnerCompetitionCreationRow);

        _get(Object.getPrototypeOf(InnerCompetitionCreationRow.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
    }

    _createClass(InnerCompetitionCreationRow, [{
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
            return React.createElement(InnerCompetitionEditorRow, _extends({
                newInnerCompetition: true,
                stopEditing: this.stopEditing.bind(this),
                inner_competition: empty_data
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
                        _("admin.buttons.add_inner_competition")
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

    return InnerCompetitionCreationRow;
})(React.Component);

var InnerCompetitionsManagementUI = (function (_React$Component4) {
    _inherits(InnerCompetitionsManagementUI, _React$Component4);

    function InnerCompetitionsManagementUI(props) {
        _classCallCheck(this, InnerCompetitionsManagementUI);

        _get(Object.getPrototypeOf(InnerCompetitionsManagementUI.prototype), "constructor", this).call(this, props);
        this.state = {
            creating: false
        };
    }

    _createClass(InnerCompetitionsManagementUI, [{
        key: "renderTable",
        value: function renderTable() {
            var rows = this.props.inner_competitions.map((function (inner_competition) {
                return React.createElement(InnerCompetitionRow, {
                    key: inner_competition.id,
                    inner_competition: inner_competition });
            }).bind(this));
            return React.createElement(
                "div",
                { className: "manage-inner-competitions" },
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
                                _("models.inner_competition.name")
                            ),
                            React.createElement(
                                "th",
                                { className: "sp" },
                                _("models.inner_competition.sp")
                            ),
                            React.createElement(
                                "th",
                                { className: "external-id" },
                                _("models.inner_competition.external_id")
                            ),
                            React.createElement("th", { className: "delete" })
                        ),
                        rows,
                        React.createElement(InnerCompetitionCreationRow, { competition_id: this.props.competition_id })
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
                        _("admin.headers.inner_competitions_management")
                    )
                ),
                this.renderTable()
            );
        }
    }]);

    return InnerCompetitionsManagementUI;
})(React.Component);
//# sourceMappingURL=inner_competitions_management.js.map