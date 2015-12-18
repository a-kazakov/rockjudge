"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClubsSelector = (function (_React$Component) {
    _inherits(ClubsSelector, _React$Component);

    function ClubsSelector() {
        _classCallCheck(this, ClubsSelector);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ClubsSelector).apply(this, arguments));
    }

    _createClass(ClubsSelector, [{
        key: "renderList",
        value: function renderList() {
            return this.props.clubs.map(function (club) {
                return React.createElement(
                    "option",
                    { value: club.id, key: club.id },
                    club.name
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "select",
                {
                    className: "full-width",
                    value: this.props.club_id,
                    onChange: this.props.onChange },
                this.renderList()
            );
        }
    }]);

    return ClubsSelector;
})(React.Component);

var ParticipantEditorRowGeneralInfo = (function (_React$Component2) {
    _inherits(ParticipantEditorRowGeneralInfo, _React$Component2);

    function ParticipantEditorRowGeneralInfo() {
        _classCallCheck(this, ParticipantEditorRowGeneralInfo);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantEditorRowGeneralInfo).apply(this, arguments));
    }

    _createClass(ParticipantEditorRowGeneralInfo, [{
        key: "genOnChange",
        value: function genOnChange(field) {
            var _this3 = this;

            return function (event) {
                return _this3.props.onChange(field, event.target.value);
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h4",
                    null,
                    _("models.participant.general_info")
                ),
                React.createElement("input", {
                    placeholder: _("models.participant.number"),
                    className: "full-width",
                    value: this.props.participant.number,
                    onChange: this.genOnChange("number") }),
                React.createElement(ClubsSelector, {
                    className: "full-width",
                    participant: this.props.participant,
                    club_id: this.props.participant.club_id,
                    clubs: this.props.clubs,
                    onChange: this.genOnChange("club_id") }),
                React.createElement("input", {
                    placeholder: _("models.participant.coaches"),
                    className: "full-width",
                    value: this.props.participant.coaches,
                    onChange: this.genOnChange("coaches") }),
                React.createElement("input", {
                    placeholder: _("models.participant.formation_name"),
                    className: "full-width",
                    value: this.props.participant.formation_name,
                    onChange: this.genOnChange("formation_name") })
            );
        }
    }]);

    return ParticipantEditorRowGeneralInfo;
})(React.Component);

var ParticipantEditorRowSportsman = (function (_React$Component3) {
    _inherits(ParticipantEditorRowSportsman, _React$Component3);

    function ParticipantEditorRowSportsman() {
        _classCallCheck(this, ParticipantEditorRowSportsman);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantEditorRowSportsman).apply(this, arguments));
    }

    _createClass(ParticipantEditorRowSportsman, [{
        key: "genOnChange",
        value: function genOnChange(field) {
            var _this5 = this;

            return function (event) {
                return _this5.props.onChange(field, event.target.value);
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "sportsman" },
                React.createElement("input", {
                    type: "text",
                    className: "last-name",
                    placeholder: _("models.participant.last_name"),
                    value: this.props.sportsman.last_name,
                    onChange: this.genOnChange("last_name") }),
                React.createElement("input", {
                    type: "text",
                    className: "first-name",
                    placeholder: _("models.participant.first_name"),
                    value: this.props.sportsman.first_name,
                    onChange: this.genOnChange("first_name") }),
                React.createElement("input", {
                    type: "text",
                    className: "yob",
                    placeholder: _("models.participant.yob"),
                    value: this.props.sportsman.year_of_birth,
                    onChange: this.genOnChange("year_of_birth") }),
                React.createElement(
                    "select",
                    {
                        className: "gender",
                        value: this.props.sportsman.gender,
                        onChange: this.genOnChange("gender") },
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
                        onClick: this.props.onSportsmanRemove },
                    "X"
                )
            );
        }
    }]);

    return ParticipantEditorRowSportsman;
})(React.Component);

var ParticipantEditorRowSportsmenList = (function (_React$Component4) {
    _inherits(ParticipantEditorRowSportsmenList, _React$Component4);

    function ParticipantEditorRowSportsmenList() {
        _classCallCheck(this, ParticipantEditorRowSportsmenList);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantEditorRowSportsmenList).apply(this, arguments));
    }

    _createClass(ParticipantEditorRowSportsmenList, [{
        key: "genOnChange",
        value: function genOnChange(idx) {
            var _this7 = this;

            return function (field, value) {
                var list = clone(_this7.props.sportsmen);
                list[idx][field] = value;
                _this7.props.onChange("sportsmen", list);
            };
        }
    }, {
        key: "addSportsman",
        value: function addSportsman() {
            var list = clone(this.props.sportsmen);
            list.push({
                "last_name": "",
                "first_name": "",
                "year_of_birth": "0",
                "gender": "F"
            });
            this.props.onChange("sportsmen", list);
        }
    }, {
        key: "removeSportsman",
        value: function removeSportsman(idx) {
            var list = clone(this.props.sportsmen);
            list.splice(idx, 1);
            this.props.onChange("sportsmen", list);
        }
    }, {
        key: "render",
        value: function render() {
            var _this8 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h4",
                    null,
                    _("models.participant.sportsmen")
                ),
                this.props.sportsmen.map(function (sp, idx) {
                    return React.createElement(ParticipantEditorRowSportsman, {
                        key: idx,
                        sportsman: sp,
                        onSportsmanRemove: _this8.removeSportsman.bind(_this8, idx),
                        onChange: _this8.genOnChange(idx) });
                }),
                React.createElement(
                    "button",
                    {
                        type: "button",
                        className: "full-width btn btn-sm btn-default",
                        onClick: this.addSportsman.bind(this) },
                    _("global.buttons.add")
                )
            );
        }
    }]);

    return ParticipantEditorRowSportsmenList;
})(React.Component);

var ParticipantEditorRowProgramEditorElement = (function (_React$Component5) {
    _inherits(ParticipantEditorRowProgramEditorElement, _React$Component5);

    function ParticipantEditorRowProgramEditorElement() {
        _classCallCheck(this, ParticipantEditorRowProgramEditorElement);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantEditorRowProgramEditorElement).apply(this, arguments));
    }

    _createClass(ParticipantEditorRowProgramEditorElement, [{
        key: "genOnChange",
        value: function genOnChange(field) {
            var _this10 = this;

            return function (event) {
                return _this10.props.onChange(field, event.target.value);
            };
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "acrobatic" },
                React.createElement("input", {
                    type: "text",
                    className: "description",
                    placeholder: _("models.participant.acro_description"),
                    value: this.props.element.description,
                    onChange: this.genOnChange("description") }),
                React.createElement("input", {
                    type: "text",
                    className: "score",
                    placeholder: _("models.participant.acro_score"),
                    value: this.props.element.score,
                    onChange: this.genOnChange("score") }),
                React.createElement(
                    "button",
                    {
                        type: "button",
                        className: "del btn btn-danger",
                        onClick: this.props.onElementRemove },
                    "X"
                )
            );
        }
    }]);

    return ParticipantEditorRowProgramEditorElement;
})(React.Component);

var ParticipantEditorRowProgramEditorElements = (function (_React$Component6) {
    _inherits(ParticipantEditorRowProgramEditorElements, _React$Component6);

    function ParticipantEditorRowProgramEditorElements(props) {
        _classCallCheck(this, ParticipantEditorRowProgramEditorElements);

        var _this11 = _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantEditorRowProgramEditorElements).call(this, props));

        _this11.state = {
            elements: clone(_this11.props.elements)
        };
        return _this11;
    }

    _createClass(ParticipantEditorRowProgramEditorElements, [{
        key: "changeElements",
        value: function changeElements(func) {
            var elements = clone(this.state.elements);
            elements = func(elements);
            this.setState({ elements: elements });
        }
    }, {
        key: "onChange",
        value: function onChange(idx, field, value) {
            this.changeElements(function (elements) {
                elements[idx][field] = value;
                return elements;
            });
        }
    }, {
        key: "addElement",
        value: function addElement() {
            this.changeElements(function (elements) {
                elements.push({
                    description: "",
                    score: 0
                });
                return elements;
            });
        }
    }, {
        key: "removeElement",
        value: function removeElement(idx) {
            this.changeElements(function (elements) {
                elements.splice(idx, 1);
                return elements;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this12 = this;

            return React.createElement(
                "div",
                { className: "elements" },
                this.state.elements.map(function (element, idx) {
                    return React.createElement(ParticipantEditorRowProgramEditorElement, {
                        key: idx,
                        element: element,
                        onChange: _this12.onChange.bind(_this12, idx),
                        onElementRemove: _this12.removeElement.bind(_this12, idx) });
                }),
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-sm btn-default full-width", onClick: this.addElement.bind(this) },
                    _("global.buttons.add")
                )
            );
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return this.state.elements.map(function (element) {
                return {
                    description: element.description,
                    score: parseFloat(element.score) || 0
                };
            });
        }
    }]);

    return ParticipantEditorRowProgramEditorElements;
})(React.Component);

var ParticipantEditorRowProgramEditor = (function (_React$Component7) {
    _inherits(ParticipantEditorRowProgramEditor, _React$Component7);

    function ParticipantEditorRowProgramEditor() {
        _classCallCheck(this, ParticipantEditorRowProgramEditor);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantEditorRowProgramEditor).apply(this, arguments));
    }

    _createClass(ParticipantEditorRowProgramEditor, [{
        key: "render",
        value: function render() {
            var _this14 = this;

            var classes = ["program-editor"];
            if (this.props.creating) {
                classes.push("create");
            }
            return React.createElement(
                "form",
                { className: classes.join(" "), onSubmit: function onSubmit(e) {
                        e.preventDefault();_this14.props.onSubmit(_this14.serialize());
                    } },
                React.createElement("input", {
                    ref: "name",
                    className: "name",
                    defaultValue: this.props.program.name || "",
                    placeholder: _("models.program.name") }),
                React.createElement("input", {
                    ref: "default_for",
                    className: "default-for",
                    defaultValue: this.props.program.default_for || "",
                    placeholder: _("models.program.default_for") }),
                React.createElement(ParticipantEditorRowProgramEditorElements, {
                    ref: "elements_editor",
                    elements: this.props.program.acrobatics || [] }),
                React.createElement(
                    "button",
                    { className: "btn btn-sm btn-primary" },
                    _("global.buttons.submit")
                ),
                React.createElement(
                    "button",
                    { type: "button", className: "btn btn-sm btn-danger", onClick: this.props.onStopEditing },
                    _("global.buttons.discard")
                )
            );
        }
    }, {
        key: "serialize",
        value: function serialize() {
            return {
                name: this.refs.name.value,
                default_for: this.refs.default_for.value,
                acrobatics: this.refs.elements_editor.serialize()
            };
        }
    }]);

    return ParticipantEditorRowProgramEditor;
})(React.Component);

var ParticipantEditorRowProgramCreator = (function (_React$Component8) {
    _inherits(ParticipantEditorRowProgramCreator, _React$Component8);

    function ParticipantEditorRowProgramCreator(props) {
        _classCallCheck(this, ParticipantEditorRowProgramCreator);

        var _this15 = _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantEditorRowProgramCreator).call(this, props));

        _this15.state = {
            editing: false
        };
        return _this15;
    }

    _createClass(ParticipantEditorRowProgramCreator, [{
        key: "stopEditing",
        value: function stopEditing() {
            this.setState({
                editing: false
            });
        }
    }, {
        key: "startEditing",
        value: function startEditing() {
            this.setState({
                editing: true
            });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(data) {
            Api("program.create", { participant_id: this.props.participant_id, data: data }).onSuccess(this.stopEditing.bind(this)).send();
        }
    }, {
        key: "renderBody",
        value: function renderBody() {
            if (this.state.editing) {
                return React.createElement(ParticipantEditorRowProgramEditor, {
                    onSubmit: this.onSubmit.bind(this),
                    onStopEditing: this.stopEditing.bind(this),
                    creating: true,
                    program: {} });
            }
            return React.createElement(
                "button",
                { type: "button", className: "btn btn-sm btn-default full-width", onClick: this.startEditing.bind(this) },
                _("global.buttons.add")
            );
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "program-creator" },
                this.renderBody()
            );
        }
    }]);

    return ParticipantEditorRowProgramCreator;
})(React.Component);

var ParticipantEditorRowProgram = (function (_React$Component9) {
    _inherits(ParticipantEditorRowProgram, _React$Component9);

    function ParticipantEditorRowProgram(props) {
        _classCallCheck(this, ParticipantEditorRowProgram);

        var _this16 = _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantEditorRowProgram).call(this, props));

        _this16.state = {
            editing: false
        };
        return _this16;
    }

    _createClass(ParticipantEditorRowProgram, [{
        key: "stopEditing",
        value: function stopEditing() {
            this.setState({
                editing: false
            });
        }
    }, {
        key: "startEditing",
        value: function startEditing() {
            this.setState({
                editing: true
            });
        }
    }, {
        key: "onDelClick",
        value: function onDelClick(event) {
            var _this17 = this;

            event.preventDefault();
            swal_confirm(_("admin.confirms.delete_program"), function () {
                Api("program.delete", { program_id: _this17.props.program.id }).onSuccess(function () {
                    return swal.close();
                }).send();
            });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(data) {
            Api("program.set", { program_id: this.props.program.id, data: data }).onSuccess(this.stopEditing.bind(this)).send();
        }
    }, {
        key: "render",
        value: function render() {
            var _this18 = this;

            if (this.state.editing) {
                return React.createElement(ParticipantEditorRowProgramEditor, _extends({
                    onSubmit: this.onSubmit.bind(this),
                    onStopEditing: this.stopEditing.bind(this)
                }, this.props));
            }
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h5",
                    null,
                    this.props.program.name,
                    this.props.program.default_for ? React.createElement(
                        "em",
                        null,
                        " (",
                        this.props.program.default_for,
                        ")"
                    ) : null,
                    " / ",
                    React.createElement(
                        "a",
                        { href: "#", onClick: function onClick(e) {
                                e.preventDefault();_this18.startEditing();
                            } },
                        "Редактировать"
                    ),
                    " / ",
                    React.createElement(
                        "a",
                        { href: "#", onClick: this.onDelClick.bind(this) },
                        "Удалить"
                    )
                ),
                React.createElement(
                    "table",
                    { className: "full-width program" },
                    React.createElement(
                        "tbody",
                        null,
                        this.props.program.acrobatics.map(function (element, idx) {
                            return React.createElement(
                                "tr",
                                { key: idx },
                                React.createElement(
                                    "td",
                                    null,
                                    element.description
                                ),
                                React.createElement(
                                    "td",
                                    { className: "text-right" },
                                    element.score.toFixed(1)
                                )
                            );
                        })
                    )
                )
            );
        }
    }]);

    return ParticipantEditorRowProgram;
})(React.Component);

var ParticipantEditorRowPrograms = (function (_React$Component10) {
    _inherits(ParticipantEditorRowPrograms, _React$Component10);

    function ParticipantEditorRowPrograms() {
        _classCallCheck(this, ParticipantEditorRowPrograms);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantEditorRowPrograms).apply(this, arguments));
    }

    _createClass(ParticipantEditorRowPrograms, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "h4",
                    null,
                    _("models.participant.programs")
                ),
                this.props.programs.map(function (p) {
                    return React.createElement(ParticipantEditorRowProgram, {
                        key: p.id,
                        program: p });
                }),
                this.props.newParticipant ? React.createElement(
                    "div",
                    { className: "alert alert-info" },
                    _("admin.alerts.add_programs_after_creation")
                ) : React.createElement(ParticipantEditorRowProgramCreator, {
                    participant_id: this.props.participant_id })
            );
        }
    }]);

    return ParticipantEditorRowPrograms;
})(React.Component);

var ParticipantEditorRow = (function (_React$Component11) {
    _inherits(ParticipantEditorRow, _React$Component11);

    function ParticipantEditorRow(props) {
        _classCallCheck(this, ParticipantEditorRow);

        var _this20 = _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantEditorRow).call(this, props));

        var p = _this20.props.participant;
        _this20.state = {
            participant: {
                number: p.number,
                club_id: p.club.id,
                coaches: p.coaches,
                formation_name: p.formation_name,
                sportsmen: clone(p.sportsmen)
            }
        };
        return _this20;
    }

    _createClass(ParticipantEditorRow, [{
        key: "onChange",
        value: function onChange(field, value) {
            var participant = clone(this.state.participant);
            participant[field] = value;
            this.setState({
                participant: participant
            });
        }
    }, {
        key: "sertialize",
        value: function sertialize() {
            return this.state.participant;
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            event.preventDefault();
            if (!this.props.newParticipant) {
                Api("participant.set", {
                    participant_id: this.props.participant.id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            } else {
                Api("participant.create", {
                    discipline_id: this.props.discipline_id,
                    data: this.sertialize()
                }).onSuccess(this.props.stopEditing).send();
            }
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "tr",
                { className: "editor" + (this.props.newParticipant ? " create" : "") },
                React.createElement(
                    "td",
                    { colSpan: "6" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-7" },
                            React.createElement(
                                "form",
                                { onSubmit: this.onSubmit.bind(this), className: "row" },
                                React.createElement(
                                    "div",
                                    { className: "col-md-5 general-info" },
                                    React.createElement(ParticipantEditorRowGeneralInfo, {
                                        participant: this.state.participant,
                                        clubs: this.props.clubs,
                                        onChange: this.onChange.bind(this) }),
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
                                ),
                                React.createElement(
                                    "div",
                                    { className: "col-md-7" },
                                    React.createElement(ParticipantEditorRowSportsmenList, {
                                        sportsmen: this.state.participant.sportsmen,
                                        onChange: this.onChange.bind(this) })
                                )
                            )
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-5" },
                            React.createElement(ParticipantEditorRowPrograms, {
                                newParticipant: this.props.newParticipant,
                                participant_id: this.props.participant.id,
                                programs: this.props.participant.programs,
                                onChange: this.onChange.bind(this) })
                        )
                    )
                )
            );
        }
    }]);

    return ParticipantEditorRow;
})(React.Component);

var ParticipantRow = (function (_React$Component12) {
    _inherits(ParticipantRow, _React$Component12);

    function ParticipantRow(props) {
        _classCallCheck(this, ParticipantRow);

        var _this21 = _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantRow).call(this, props));

        _this21.state = {
            editing: false
        };
        return _this21;
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
            var _this22 = this;

            event.stopPropagation();
            swal_confirm(_("admin.confirms.delete_participant"), function () {
                Api("participant.delete", {
                    participant_id: _this22.props.participant.id
                }).onSuccess(function () {
                    return swal.close();
                }).send();
            });
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

var ParticipantCreationRow = (function (_React$Component13) {
    _inherits(ParticipantCreationRow, _React$Component13);

    function ParticipantCreationRow(props) {
        _classCallCheck(this, ParticipantCreationRow);

        var _this23 = _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantCreationRow).call(this, props));

        _this23.state = {
            editing: false
        };
        return _this23;
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
                "acrobatics": [],
                "programs": []
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
                    { colSpan: "6" },
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

var ParticipantsManager = (function (_React$Component14) {
    _inherits(ParticipantsManager, _React$Component14);

    function ParticipantsManager(props) {
        _classCallCheck(this, ParticipantsManager);

        var _this24 = _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantsManager).call(this, props));

        _this24.state = {
            name: null
        };
        message_dispatcher.addListener("db_update", _this24.reloadFromStorage.bind(_this24));
        message_dispatcher.addListener("reload_data competition_list_update", _this24.loadData.bind(_this24));
        _this24.loadData();
        return _this24;
    }

    _createClass(ParticipantsManager, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                competition: {
                    clubs: {}
                },
                participants: {
                    club: {},
                    programs: {}
                }
            };
            var serialized = storage.get("Discipline").by_id(this.props.discipline_id).serialize(SCHEMA);
            this.setState(serialized);
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("discipline.get", {
                discipline_id: this.props.discipline_id,
                children: {
                    competition: {
                        clubs: {}
                    },
                    participants: {
                        club: {},
                        programs: {}
                    }
                }
            }).addToDB("Discipline", this.props.discipline_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "renderTable",
        value: function renderTable() {
            var _this25 = this;

            var rows = this.state.participants.map(function (participant) {
                return React.createElement(ParticipantRow, {
                    key: participant.id,
                    participant: participant,
                    clubs: _this25.state.competition.clubs });
            });
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
                            discipline_id: this.props.discipline_id })
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
                return React.createElement(Loader, null);
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
//# sourceMappingURL=participants_management.js.map