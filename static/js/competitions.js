"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompetitionEditorRow = (function (_React$Component) {
    _inherits(CompetitionEditorRow, _React$Component);

    function CompetitionEditorRow(props) {
        _classCallCheck(this, CompetitionEditorRow);

        _get(Object.getPrototypeOf(CompetitionEditorRow.prototype), "constructor", this).call(this, props);
        var state = $.extend({}, this.props.competition);
        this.state = state;
        this.latest_added = "base";
    }

    _createClass(CompetitionEditorRow, [{
        key: "onChange",
        value: function onChange(group, idx, field, type, event) {
            var new_value = field === "active" ? event.target.checked : event.target.value;
            var state = $.extend({}, this.state, true);
            switch (group) {
                case "info":
                    state.info[idx][field] = new_value;
                    break;
                case "":
                    state[field] = new_value;
            }
            this.setState(state);
        }
    }, {
        key: "addInfoItem",
        value: function addInfoItem() {
            var info = $.extend([], this.state.info);
            var new_idx = info.length;
            info.push(["", ""]);
            this.latest_added = "info" + new_idx;
            this.setState({
                info: info
            });
        }
    }, {
        key: "removeInfoItem",
        value: function removeInfoItem(idx) {
            var info = $.extend([], this.state.info);
            info.splice(idx, 1);
            this.setState({
                info: info
            });
        }
    }, {
        key: "moveInfoItemUp",
        value: function moveInfoItemUp(idx) {
            var info = $.extend([], this.state.info);
            var current = info[idx];
            var upper = info[idx - 1];
            info[idx] = upper;
            info[idx - 1] = current;
            this.setState({
                info: info
            });
        }
    }, {
        key: "moveInfoItemDown",
        value: function moveInfoItemDown(idx) {
            this.moveInfoItemUp(idx + 1);
        }
    }, {
        key: "sertialize",
        value: function sertialize() {
            return {
                name: this.state.name,
                date: this.state.date,
                active: this.state.active,
                info: this.state.info
            };
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            if (!this.props.newCompetition) {
                Api("tournaments.competition.set", {
                    competition_id: this.state.id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            } else {
                Api("tournaments.competition.create", {
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var bti = (this.props.idx || 1000) * 10000;
            var info = this.state.info.map((function (item, idx) {
                return React.createElement(
                    "div",
                    { className: "info-item", key: idx },
                    React.createElement("input", {
                        tabIndex: bti + 1000 + 10 * idx + 1,
                        ref: (function (e) {
                            if (e && this.latest_added == "info" + idx.toString()) {
                                e.getDOMNode().select();
                                this.latest_added = null;
                            };
                        }).bind(this),
                        type: "text",
                        className: "title",
                        placeholder: _("models.competition.info_item_title"),
                        value: item[0],
                        onChange: this.onChange.bind(this, "info", idx, 0, "any") }),
                    React.createElement("input", {
                        tabIndex: bti + 1000 + 10 * idx + 2,
                        type: "text",
                        className: "value",
                        placeholder: _("models.competition.info_item_value"),
                        value: item[1],
                        onChange: this.onChange.bind(this, "info", idx, 1, "any") }),
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            className: "down btn btn-primary",
                            disabled: idx === this.state.info.length - 1,
                            onClick: this.moveInfoItemDown.bind(this, idx) },
                        "↓"
                    ),
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            className: "up btn btn-primary",
                            disabled: idx === 0,
                            onClick: this.moveInfoItemUp.bind(this, idx) },
                        "↑"
                    ),
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            className: "del btn btn-danger",
                            onClick: this.removeInfoItem.bind(this, idx) },
                        "X"
                    )
                );
            }).bind(this));
            return React.createElement(
                "tr",
                { className: "editor" + (this.props.newCompetition ? " create" : "") },
                React.createElement(
                    "td",
                    { colSpan: "4" },
                    React.createElement(
                        "form",
                        { onSubmit: this.onSubmit.bind(this) },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col-md-3 general-info" },
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.competition.name"),
                                    React.createElement("input", {
                                        tabIndex: bti + 1,
                                        ref: (function (e) {
                                            if (e && this.latest_added == "base") {
                                                e.getDOMNode().select();
                                                this.latest_added = null;
                                            };
                                        }).bind(this),
                                        className: "full-width",
                                        value: this.state.name,
                                        onChange: this.onChange.bind(this, "", null, "name", "any") })
                                ),
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.competition.date"),
                                    React.createElement("input", {
                                        tabIndex: bti + 2,
                                        className: "full-width",
                                        value: this.state.date,
                                        onChange: this.onChange.bind(this, "", null, "date", "any") })
                                ),
                                React.createElement(
                                    "label",
                                    { className: "full-width" },
                                    _("models.competition.active"),
                                    React.createElement("br", null),
                                    React.createElement("input", {
                                        tabIndex: bti + 3,
                                        type: "checkbox",
                                        checked: this.state.active,
                                        onChange: this.onChange.bind(this, "", null, "active", "any") })
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-7" },
                                React.createElement(
                                    "label",
                                    null,
                                    _("models.competition.info")
                                ),
                                info,
                                React.createElement(
                                    "button",
                                    {
                                        tabIndex: bti + 1999,
                                        type: "button",
                                        className: "full-width btn btn-sm btn-default",
                                        onClick: this.addInfoItem.bind(this) },
                                    _("global.buttons.add")
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-2" },
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
                                            tabIndex: bti + 10000,
                                            type: "submit",
                                            className: "btn btn-primary" },
                                        _("global.buttons.submit")
                                    ),
                                    React.createElement(
                                        "button",
                                        {
                                            tabIndex: bti + 10001,
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

    return CompetitionEditorRow;
})(React.Component);

var CompetitionRow = (function (_React$Component2) {
    _inherits(CompetitionRow, _React$Component2);

    function CompetitionRow(props) {
        _classCallCheck(this, CompetitionRow);

        _get(Object.getPrototypeOf(CompetitionRow.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
    }

    _createClass(CompetitionRow, [{
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
            if (confirm(_("admin.confirms.delete_competition"))) {
                Api("tournaments.competition.delete", {
                    competition_id: this.props.competition.id
                }).send();
            }
        }
    }, {
        key: "renderEditor",
        value: function renderEditor() {
            return React.createElement(CompetitionEditorRow, _extends({
                newCompetition: false,
                stopEditing: this.stopEditing.bind(this)
            }, this.props));
        }
    }, {
        key: "renderViewer",
        value: function renderViewer() {
            var p = this.props.competition;
            return React.createElement(
                "tr",
                { className: "viewer", onClick: this.startEditing.bind(this) },
                React.createElement(
                    "td",
                    { className: "name" },
                    p.name
                ),
                React.createElement(
                    "td",
                    { className: "date" },
                    p.date
                ),
                React.createElement(
                    "td",
                    { className: "is-active" },
                    p.active ? _("global.labels.yes") : _("global.labels.no")
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

    return CompetitionRow;
})(React.Component);

var CompetitionCreationRow = (function (_React$Component3) {
    _inherits(CompetitionCreationRow, _React$Component3);

    function CompetitionCreationRow(props) {
        _classCallCheck(this, CompetitionCreationRow);

        _get(Object.getPrototypeOf(CompetitionCreationRow.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
    }

    _createClass(CompetitionCreationRow, [{
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
                "date": "",
                "info": []
            };
            return React.createElement(CompetitionEditorRow, _extends({
                newCompetition: true,
                stopEditing: this.stopEditing.bind(this),
                competition: empty_data
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
                        _("admin.buttons.add_competition")
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

    return CompetitionCreationRow;
})(React.Component);

var CompetitionsManager = (function (_React$Component4) {
    _inherits(CompetitionsManager, _React$Component4);

    function CompetitionsManager(props) {
        _classCallCheck(this, CompetitionsManager);

        _get(Object.getPrototypeOf(CompetitionsManager.prototype), "constructor", this).call(this, props);
        this.state = {
            competitions: null
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("competition_list_update", this.loadData.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }

    _createClass(CompetitionsManager, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var serialized = storage.get("Competition").all().map(function (c) {
                return c.serialize({});
            });
            this.setState({
                competitions: serialized
            });
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("tournaments.competition.get_all", {
                children: {}
            }).onSuccess((function (response) {
                response.forEach(function (c) {
                    return storage.get("Competition").add(c.id, c.data);
                });
                this.reloadFromStorage();
            }).bind(this)).send();
        }
    }, {
        key: "renderTable",
        value: function renderTable() {
            var rows = this.state.competitions.map((function (competition) {
                return React.createElement(CompetitionRow, {
                    key: competition.id,
                    competition: competition });
            }).bind(this));
            return React.createElement(
                "div",
                { className: "manage-competitions" },
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
                                _("models.competition.name")
                            ),
                            React.createElement(
                                "th",
                                { className: "date" },
                                _("models.competition.date")
                            ),
                            React.createElement(
                                "th",
                                { className: "is-active" },
                                _("models.competition.active")
                            ),
                            React.createElement("th", { className: "delete" })
                        ),
                        rows,
                        React.createElement(CompetitionCreationRow, {
                            discipline_id: this.props.discipline_id })
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.competitions === null) {
                return React.createElement(
                    "span",
                    null,
                    "Loading ..."
                );
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "header",
                    null,
                    React.createElement(
                        "h1",
                        null,
                        _("admin.headers.competitions_management")
                    )
                ),
                this.renderTable()
            );
        }
    }]);

    return CompetitionsManager;
})(React.Component);
//# sourceMappingURL=competitions.js.map