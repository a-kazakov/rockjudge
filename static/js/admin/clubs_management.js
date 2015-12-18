"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClubEditorRow = (function (_React$Component) {
    _inherits(ClubEditorRow, _React$Component);

    function ClubEditorRow() {
        _classCallCheck(this, ClubEditorRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ClubEditorRow).apply(this, arguments));
    }

    _createClass(ClubEditorRow, [{
        key: "sertialize",
        value: function sertialize() {
            return {
                name: this._name.value,
                city: this._city.value,
                external_id: this._external_id.value
            };
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            if (!this.props.newClub) {
                Api("club.set", {
                    club_id: this.props.club.id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            } else {
                Api("club.create", {
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
                { className: "editor" + (this.props.newClub ? " create" : "") },
                React.createElement(
                    "td",
                    { colSpan: "4" },
                    React.createElement(
                        "form",
                        { onSubmit: this.onSubmit.bind(this) },
                        React.createElement(
                            "div",
                            { className: "rows" },
                            React.createElement(
                                "div",
                                { className: "col-md-5" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.club.name"),
                                    React.createElement("input", {
                                        ref: (function (e) {
                                            if (e) {
                                                e.select();this._name = e;
                                            }
                                        }).bind(this),
                                        className: "full-width",
                                        defaultValue: this.props.club.name })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-2" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.club.city"),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            return e && (_this2._city = e);
                                        },
                                        className: "full-width",
                                        defaultValue: this.props.club.city })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-2" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.club.external_id"),
                                    React.createElement("br", null),
                                    React.createElement("input", {
                                        ref: function ref(e) {
                                            return e && (_this2._external_id = e);
                                        },
                                        defaultValue: this.props.club.external_id })
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

    return ClubEditorRow;
})(React.Component);

var ClubRow = (function (_React$Component2) {
    _inherits(ClubRow, _React$Component2);

    function ClubRow(props) {
        _classCallCheck(this, ClubRow);

        var _this3 = _possibleConstructorReturn(this, Object.getPrototypeOf(ClubRow).call(this, props));

        _this3.state = {
            editing: false
        };
        return _this3;
    }

    _createClass(ClubRow, [{
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
            if (confirm(_("admin.confirms.delete_club"))) {
                Api("club.delete", {
                    club_id: this.props.club.id
                }).send();
            }
        }
    }, {
        key: "renderEditor",
        value: function renderEditor() {
            return React.createElement(ClubEditorRow, _extends({
                newClub: false,
                stopEditing: this.stopEditing.bind(this)
            }, this.props));
        }
    }, {
        key: "renderViewer",
        value: function renderViewer() {
            var c = this.props.club;
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
                    { className: "city" },
                    c.city
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

    return ClubRow;
})(React.Component);

var ClubCreationRow = (function (_React$Component3) {
    _inherits(ClubCreationRow, _React$Component3);

    function ClubCreationRow(props) {
        _classCallCheck(this, ClubCreationRow);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(ClubCreationRow).call(this, props));

        _this4.state = {
            editing: false
        };
        return _this4;
    }

    _createClass(ClubCreationRow, [{
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
                "city": "",
                "external_id": ""
            };
            return React.createElement(ClubEditorRow, _extends({
                newClub: true,
                stopEditing: this.stopEditing.bind(this),
                club: empty_data
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
                    { colSpan: "4" },
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            className: "btn btn-default full-width",
                            onClick: this.startEditing.bind(this) },
                        _("admin.buttons.add_club")
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

    return ClubCreationRow;
})(React.Component);

var ClubsManagementUI = (function (_React$Component4) {
    _inherits(ClubsManagementUI, _React$Component4);

    function ClubsManagementUI(props) {
        _classCallCheck(this, ClubsManagementUI);

        var _this5 = _possibleConstructorReturn(this, Object.getPrototypeOf(ClubsManagementUI).call(this, props));

        _this5.state = {
            creating: false
        };
        return _this5;
    }

    _createClass(ClubsManagementUI, [{
        key: "renderTable",
        value: function renderTable() {
            var rows = this.props.clubs.map((function (club) {
                return React.createElement(ClubRow, {
                    key: club.id,
                    club: club });
            }).bind(this));
            return React.createElement(
                "div",
                { className: "manage-clubs" },
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
                                _("models.club.name")
                            ),
                            React.createElement(
                                "th",
                                { className: "city" },
                                _("models.club.city")
                            ),
                            React.createElement(
                                "th",
                                { className: "external-id" },
                                _("models.club.external_id")
                            ),
                            React.createElement("th", { className: "delete" })
                        ),
                        rows,
                        React.createElement(ClubCreationRow, { competition_id: this.props.competition_id })
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
                        _("admin.headers.clubs_management")
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

    return ClubsManagementUI;
})(React.Component);
//# sourceMappingURL=clubs_management.js.map