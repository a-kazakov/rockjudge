"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParticipantEditorRow = (function (_React$Component) {
    _inherits(ParticipantEditorRow, _React$Component);

    function ParticipantEditorRow(props) {
        _classCallCheck(this, ParticipantEditorRow);

        _get(Object.getPrototypeOf(ParticipantEditorRow.prototype), "constructor", this).call(this, props);
        var state = $.extend({}, this.props.participant);
        state.club_id = state.club.id;
        this.state = state;
        this.latest_added = "base";
    }

    _createClass(ParticipantEditorRow, [{
        key: "onChange",
        value: function onChange(group, idx, field, type, event) {
            var new_value = event.target.value;
            var state = $.extend({}, this.state, true);
            switch (type) {
                case "number":
                    new_value = new_value.replace(/\D+/, "");
                    break;
                case "score":
                    new_value = new_value.replace(/[^\d.]+/, "");
                    break;
            }
            switch (group) {
                case "sp":
                    state.sportsmen[idx][field] = new_value;
                    break;
                case "acro":
                    state.acrobatics[idx][field] = new_value;
                    break;
                case "":
                    state[field] = new_value;
            }
            this.setState(state);
        }
    }, {
        key: "addSportsman",
        value: function addSportsman() {
            var sportsmen = $.extend([], this.state.sportsmen);
            var new_idx = sportsmen.length;
            sportsmen.push({
                last_name: "",
                first_name: "",
                year_of_birth: 2000,
                gender: "F"
            });
            this.latest_added = "sp" + new_idx;
            this.setState({
                sportsmen: sportsmen
            });
        }
    }, {
        key: "addAcrobatic",
        value: function addAcrobatic() {
            var acrobatics = $.extend([], this.state.acrobatics);
            var new_idx = acrobatics.length;
            acrobatics.push({
                description: "",
                score: 0
            });
            this.latest_added = "acro" + new_idx;
            this.setState({
                acrobatics: acrobatics
            });
        }
    }, {
        key: "removeSportsman",
        value: function removeSportsman(idx) {
            var sportsmen = $.extend([], this.state.sportsmen);
            sportsmen.splice(idx, 1);
            this.setState({
                sportsmen: sportsmen
            });
        }
    }, {
        key: "removeAcrobatic",
        value: function removeAcrobatic(idx) {
            var acrobatics = $.extend([], this.state.acrobatics);
            acrobatics.splice(idx, 1);
            this.setState({
                acrobatics: acrobatics
            });
        }
    }, {
        key: "sertialize",
        value: function sertialize() {
            return {
                number: this.state.number,
                club_id: this.state.club_id,
                coaches: this.state.coaches,
                formation_name: this.state.formation_name,
                acrobatics: this.state.acrobatics.map(function (acro) {
                    return {
                        description: acro.description,
                        score: acro.score
                    };
                }),
                sportsmen: this.state.sportsmen.map(function (sp) {
                    return {
                        last_name: sp.last_name,
                        first_name: sp.first_name,
                        year_of_birth: sp.year_of_birth,
                        gender: sp.gender
                    };
                })
            };
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            if (!this.props.newParticipant) {
                Api("tournaments.participant.set", {
                    participant_id: this.state.id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            } else {
                Api("tournaments.participant.create", {
                    inner_competition_id: this.props.inner_competition_id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var bti = (this.state.number || 1000) * 10000;
            var sportsmen = this.state.sportsmen.map((function (sp, idx) {
                return React.createElement(
                    "div",
                    { className: "sportsman", key: idx },
                    React.createElement("input", {
                        tabIndex: bti + 1000 + 10 * idx + 1,
                        ref: (function (e) {
                            if (e && this.latest_added == "sp" + idx.toString()) {
                                e.getDOMNode().select();
                                this.latest_added = null;
                            };
                        }).bind(this),
                        type: "text",
                        className: "last-name",
                        placeholder: _("models.participant.last_name"),
                        value: sp.last_name,
                        onChange: this.onChange.bind(this, "sp", idx, "last_name", "any") }),
                    React.createElement("input", {
                        tabIndex: bti + 1000 + 10 * idx + 2,
                        type: "text",
                        className: "first-name",
                        placeholder: _("models.participant.first_name"),
                        value: sp.first_name,
                        onChange: this.onChange.bind(this, "sp", idx, "first_name", "any") }),
                    React.createElement("input", {
                        tabIndex: bti + 1000 + 10 * idx + 3,
                        type: "text",
                        className: "yob",
                        placeholder: _("models.participant.yob"),
                        value: sp.year_of_birth,
                        onChange: this.onChange.bind(this, "sp", idx, "year_of_birth", "number") }),
                    React.createElement(
                        "select",
                        {
                            tabIndex: bti + 1000 + 10 * idx + 3,
                            className: "gender",
                            value: sp.gender,
                            onChange: this.onChange.bind(this, "sp", idx, "gender", "any") },
                        React.createElement(
                            "option",
                            { value: "F" },
                            _("models.participant.gender_f")
                        ),
                        React.createElement(
                            "option",
                            { value: "M" },
                            _("models.participant.gender_m")
                        )
                    ),
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            className: "del btn btn-danger",
                            onClick: this.removeSportsman.bind(this, idx) },
                        "X"
                    )
                );
            }).bind(this));
            var acrobatics = this.state.acrobatics.map((function (acro, idx) {
                return React.createElement(
                    "div",
                    { className: "acrobatic", key: idx },
                    React.createElement("input", {
                        tabIndex: bti + 2000 + 10 * idx + 1,
                        ref: (function (e) {
                            if (e && this.latest_added == "acro" + idx.toString()) {
                                e.getDOMNode().select();
                                this.latest_added = null;
                            };
                        }).bind(this),
                        type: "text",
                        className: "description",
                        placeholder: _("models.participant.acro_description"),
                        value: acro.description,
                        onChange: this.onChange.bind(this, "acro", idx, "description", "any") }),
                    React.createElement("input", {
                        tabIndex: bti + 2000 + 10 * idx + 2,
                        type: "text",
                        className: "score",
                        placeholder: _("models.participant.acro_score"),
                        value: acro.score,
                        onChange: this.onChange.bind(this, "acro", idx, "score", "score") }),
                    React.createElement(
                        "button",
                        {
                            type: "button",
                            className: "del btn btn-danger",
                            onClick: this.removeAcrobatic.bind(this, idx) },
                        "X"
                    )
                );
            }).bind(this));
            var clubs = this.props.clubs.map(function (club) {
                return React.createElement(
                    "option",
                    { value: club.id, key: club.id },
                    club.name
                );
            });
            return React.createElement(
                "tr",
                { className: "editor" + (this.props.newParticipant ? " create" : "") },
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
                                { className: "col-md-3 general-info" },
                                React.createElement(
                                    "h4",
                                    null,
                                    _("models.participant.general_info")
                                ),
                                React.createElement("input", {
                                    tabIndex: bti + 1,
                                    ref: (function (e) {
                                        if (e && this.latest_added == "base") {
                                            e.getDOMNode().select();
                                            this.latest_added = null;
                                        };
                                    }).bind(this),
                                    placeholder: _("models.participant.number"),
                                    className: "full-width",
                                    value: this.state.number,
                                    onChange: this.onChange.bind(this, "", null, "number", "number") }),
                                React.createElement(
                                    "select",
                                    {
                                        tabIndex: bti + 2,
                                        className: "full-width",
                                        value: this.state.club_id,
                                        onChange: this.onChange.bind(this, "", null, "club_id", "any") },
                                    clubs
                                ),
                                React.createElement("input", {
                                    tabIndex: bti + 3,
                                    placeholder: _("models.participant.coaches"),
                                    className: "full-width",
                                    value: this.state.coaches,
                                    onChange: this.onChange.bind(this, "", null, "coaches", "any") }),
                                React.createElement("input", {
                                    tabIndex: bti + 4,
                                    placeholder: _("models.participant.formation_name"),
                                    className: "full-width",
                                    value: this.state.formation_name,
                                    onChange: this.onChange.bind(this, "", null, "formation_name", "any") }),
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
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-4" },
                                React.createElement(
                                    "h4",
                                    null,
                                    _("models.participant.sportsmen")
                                ),
                                sportsmen,
                                React.createElement(
                                    "button",
                                    {
                                        tabIndex: bti + 1999,
                                        type: "button",
                                        className: "full-width btn btn-sm btn-default",
                                        onClick: this.addSportsman.bind(this) },
                                    _("global.buttons.add")
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-5" },
                                React.createElement(
                                    "h4",
                                    null,
                                    _("models.participant.acrobatics")
                                ),
                                acrobatics,
                                React.createElement(
                                    "button",
                                    {
                                        tabIndex: bti + 2999,
                                        type: "button",
                                        className: "full-width btn btn-sm btn-default",
                                        onClick: this.addAcrobatic.bind(this) },
                                    _("global.buttons.add")
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);

    return ParticipantEditorRow;
})(React.Component);

var ParticipantRow = (function (_React$Component2) {
    _inherits(ParticipantRow, _React$Component2);

    function ParticipantRow(props) {
        _classCallCheck(this, ParticipantRow);

        _get(Object.getPrototypeOf(ParticipantRow.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
    }

    _createClass(ParticipantRow, [{
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
            if (confirm(_("admin.confirms.delete_participant"))) {
                Api("tournaments.participant.delete", {
                    participant_id: this.props.participant.id
                }).send();
            }
        }
    }, {
        key: "renderEditor",
        value: function renderEditor() {
            return React.createElement(ParticipantEditorRow, _extends({
                newParticipant: false,
                stopEditing: this.stopEditing.bind(this)
            }, this.props));
        }
    }, {
        key: "renderViewer",
        value: function renderViewer() {
            var p = this.props.participant;
            return React.createElement(
                "tr",
                { className: "viewer", onClick: this.startEditing.bind(this) },
                React.createElement(
                    "td",
                    { className: "number" },
                    p.number
                ),
                React.createElement(
                    "td",
                    { className: "name" },
                    p.name
                ),
                React.createElement(
                    "td",
                    { className: "club-name" },
                    p.club.name
                ),
                React.createElement(
                    "td",
                    { className: "club-city" },
                    p.club.city
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

    return ParticipantRow;
})(React.Component);

var ParticipantCreationRow = (function (_React$Component3) {
    _inherits(ParticipantCreationRow, _React$Component3);

    function ParticipantCreationRow(props) {
        _classCallCheck(this, ParticipantCreationRow);

        _get(Object.getPrototypeOf(ParticipantCreationRow.prototype), "constructor", this).call(this, props);
        this.state = {
            editing: false
        };
    }

    _createClass(ParticipantCreationRow, [{
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
                "formation_name": "",
                "coaches": "",
                "number": "",
                "club": { "id": this.props.clubs[0] ? this.props.clubs[0].id : null },
                "sportsmen": [],
                "acrobatics": []
            };
            return React.createElement(ParticipantEditorRow, _extends({
                newParticipant: true,
                stopEditing: this.stopEditing.bind(this),
                participant: empty_data
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
                        _("admin.buttons.add_participant")
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

    return ParticipantCreationRow;
})(React.Component);

var ParticipantsManager = (function (_React$Component4) {
    _inherits(ParticipantsManager, _React$Component4);

    function ParticipantsManager(props) {
        _classCallCheck(this, ParticipantsManager);

        _get(Object.getPrototypeOf(ParticipantsManager.prototype), "constructor", this).call(this, props);
        this.state = {
            name: null
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }

    _createClass(ParticipantsManager, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                competition: {
                    clubs: {}
                },
                participants: {
                    acrobatics: {},
                    club: {},
                    sportsmen: {}
                }
            };
            var serialized = storage.get("InnerCompetition").by_id(this.props.inner_competition_id).serialize(SCHEMA);
            this.setState(serialized);
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("tournaments.inner_competition.get", {
                inner_competition_id: this.props.inner_competition_id,
                children: {
                    competition: {
                        clubs: {}
                    },
                    participants: {
                        acrobatics: {},
                        club: {},
                        sportsmen: {}
                    }
                }
            }).updateDB("InnerCompetition", this.props.inner_competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "renderTable",
        value: function renderTable() {
            var rows = this.state.participants.map((function (participant) {
                return React.createElement(ParticipantRow, {
                    key: participant.id,
                    participant: participant,
                    clubs: this.state.competition.clubs });
            }).bind(this));
            return React.createElement(
                "div",
                { className: "manage-participants" },
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
                                { className: "number" },
                                _("models.participant.number")
                            ),
                            React.createElement(
                                "th",
                                { className: "name" },
                                _("models.participant.name")
                            ),
                            React.createElement(
                                "th",
                                { className: "club-name" },
                                _("models.participant.club_name")
                            ),
                            React.createElement(
                                "th",
                                { className: "club-city" },
                                _("models.participant.club_city")
                            ),
                            React.createElement("th", { className: "delete" })
                        ),
                        rows,
                        React.createElement(ParticipantCreationRow, {
                            clubs: this.state.competition.clubs,
                            inner_competition_id: this.props.inner_competition_id })
                    )
                ),
                React.createElement(
                    "div",
                    { className: "total-participants" },
                    _("admin.phrases.total_n_participants", this.state.participants.length)
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.name === null) {
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
                        this.state.name
                    ),
                    React.createElement(
                        "h2",
                        null,
                        _("admin.headers.participants_management")
                    )
                ),
                this.renderTable()
            );
        }
    }]);

    return ParticipantsManager;
})(React.Component);
//# sourceMappingURL=manage_participants.js.map