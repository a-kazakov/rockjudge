"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParticipantNumbersNumber = (function (_React$Component) {
    _inherits(ParticipantNumbersNumber, _React$Component);

    function ParticipantNumbersNumber() {
        _classCallCheck(this, ParticipantNumbersNumber);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantNumbersNumber).apply(this, arguments));
    }

    _createClass(ParticipantNumbersNumber, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "participant" },
                React.createElement(
                    "p",
                    { className: "spacer-top" },
                    " "
                ),
                React.createElement(
                    "div",
                    { className: "competition" },
                    React.createElement(
                        "p",
                        null,
                        this.props.competition_name,
                        " "
                    )
                ),
                React.createElement(
                    "p",
                    { className: "spacer-top2" },
                    " "
                ),
                React.createElement(
                    "p",
                    { className: "number" },
                    this.props.participant.number
                ),
                React.createElement(
                    "p",
                    { className: "name" },
                    this.props.participant.name,
                    " "
                ),
                React.createElement(
                    "p",
                    { className: "discipline" },
                    this.props.participant.discipline_name,
                    " "
                ),
                React.createElement(
                    "p",
                    { className: "club" },
                    this.props.participant.club.name,
                    " — ",
                    this.props.participant.club.city
                ),
                React.createElement(
                    "p",
                    { className: "spacer-bottom" },
                    " "
                )
            );
        }
    }]);

    return ParticipantNumbersNumber;
})(React.Component);

var ParticipantNumbers = (function (_React$Component2) {
    _inherits(ParticipantNumbers, _React$Component2);

    function ParticipantNumbers() {
        _classCallCheck(this, ParticipantNumbers);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(ParticipantNumbers).apply(this, arguments));
    }

    _createClass(ParticipantNumbers, [{
        key: "makeParticipantsList",
        value: function makeParticipantsList() {
            var res = [];
            this.props.disciplines.forEach(function (discipline, idx) {
                return res = res.concat(discipline.participants.map(function (participant) {
                    return {
                        id: participant.id,
                        number: participant.number,
                        name: participant.name,
                        club: participant.club,
                        discipline_idx: idx,
                        discipline_name: discipline.name
                    };
                }));
            });
            res.sort(function (a, b) {
                return CmpChain().cmp(a.club.city, b.club.city).cmp(a.club.name, b.club.name).cmp(a.discipline_idx, b.discipline_idx).cmp(a.number, b.number).end();
            });
            return res;
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { ref: "content", className: "print-only" },
                this.makeParticipantsList().map(function (participant) {
                    return React.createElement(ParticipantNumbersNumber, {
                        participant: participant,
                        competition_name: _this3.props.competition_name,
                        key: participant.id });
                })
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "numbers.docx" : arguments[0];

            Docx(filename).setMargins([0, 10, 0, 10]).setBody(this.refs.content.innerHTML).addStyle("div", "margin", "0").addStyle("div", "padding", "0").addStyle("p", "mso-line-height-rule", "exactly").addStyle("div", "mso-line-height-rule", "exactly").addStyle(".participant", "text-align", "center").addStyle(".spacer-top", "line-height", "20pt").addStyle(".competition", "line-height", "15pt").addStyle(".spacer-top2", "line-height", "30pt").addStyle(".number", "line-height", "300pt").addStyle(".name", "line-height", "10pt").addStyle(".club", "line-height", "10pt").addStyle(".discipline", "line-height", "10pt").addStyle(".spacer-bottom", "line-height", "16pt").addStyle(".number", "font-size", "350pt").addStyle(".number", "letter-spacing:", "-20.0pt").addStyle(".competition", "font-size", "12pt").addStyle(".competition", "font-weight", "bold").addStyle(".competition", "border-bottom", "1pt solid black").addStyle(".name", "font-size", "12pt").addStyle(".name", "font-weight", "bold").addStyle(".club", "font-size", "12pt").addStyle(".discipline", "font-size", "12pt").save();
        }
    }]);

    return ParticipantNumbers;
})(React.Component);

var StartList = (function (_React$Component3) {
    _inherits(StartList, _React$Component3);

    function StartList(props) {
        _classCallCheck(this, StartList);

        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(StartList).call(this, props));

        _this4.state = {
            name: null,
            include_formation_sportsmen: false,
            include_acrobatics: false
        };
        message_dispatcher.addListener("db_update", _this4.reloadFromStorage.bind(_this4));
        message_dispatcher.addListener("reload_data", _this4.loadData.bind(_this4));
        _this4.loadData();
        return _this4;
    }

    _createClass(StartList, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                disciplines: {
                    participants: {
                        club: {},
                        programs: {}
                    }
                }
            };
            this.setState(storage.get("Competition").by_id(this.props.competition_id).serialize(SCHEMA));
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("competition.get", {
                competition_id: this.props.competition_id,
                children: {
                    disciplines: {
                        participants: {
                            club: {},
                            programs: {}
                        }
                    }
                }
            }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "onCbChange",
        value: function onCbChange() {
            this.setState({
                include_acrobatics: this.refs.cb_acro.checked,
                include_formation_sportsmen: this.refs.cb_forms.checked
            });
        }
    }, {
        key: "onDisciplineCbChange",
        value: function onDisciplineCbChange(discipline_id, event) {
            var upd = {};
            upd["hide_" + discipline_id] = !event.target.checked;
            this.setState(upd);
        }
    }, {
        key: "setAllDisciplines",
        value: function setAllDisciplines(selected, event) {
            event.preventDefault();
            var upd = {};
            this.state.disciplines.forEach(function (d) {
                return upd["hide_" + d.id] = selected;
            });
            this.setState(upd);
        }
    }, {
        key: "renderDiscipline",
        value: function renderDiscipline(ic) {
            var _this5 = this;

            if (this.state["hide_" + ic.id]) {
                return null;
            }
            return React.createElement(
                "div",
                { key: ic.id },
                React.createElement(
                    "h5",
                    null,
                    React.createElement(
                        "p",
                        null,
                        ic.name
                    )
                ),
                React.createElement(
                    "div",
                    { className: "discipline" },
                    React.createElement(
                        "table",
                        { className: "bordered-table" },
                        React.createElement(
                            "thead",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                React.createElement(
                                    "th",
                                    { className: "w-8 number" },
                                    React.createElement(
                                        "p",
                                        null,
                                        _("models.participant.number")
                                    )
                                ),
                                React.createElement(
                                    "th",
                                    { className: "w-27 name" },
                                    React.createElement(
                                        "p",
                                        null,
                                        _("models.participant.sportsmen")
                                    )
                                ),
                                React.createElement(
                                    "th",
                                    { className: "w-9 year-of-birth" },
                                    React.createElement(
                                        "p",
                                        null,
                                        _("models.participant.sportsmen_year_of_birth")
                                    )
                                ),
                                React.createElement(
                                    "th",
                                    { className: "w-28 club" },
                                    React.createElement(
                                        "p",
                                        null,
                                        _("models.participant.club_name")
                                    )
                                ),
                                React.createElement(
                                    "th",
                                    { className: "w-28 coaches" },
                                    React.createElement(
                                        "p",
                                        null,
                                        _("models.participant.coaches")
                                    )
                                )
                            )
                        ),
                        React.createElement(
                            "tbody",
                            null,
                            ic.participants.map(function (p) {
                                return [React.createElement(
                                    "tr",
                                    { key: p.id, className: !_this5.state.include_acrobatics || p.programs.length == 0 ? "" : "has-acro" },
                                    React.createElement(
                                        "td",
                                        { className: "w-8 number" },
                                        React.createElement(
                                            "p",
                                            { className: "text-center" },
                                            p.number
                                        )
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "w-36 name", colSpan: "2" },
                                        React.createElement(
                                            "table",
                                            { className: "inner" },
                                            React.createElement(
                                                "tbody",
                                                null,
                                                p.formation_name ? React.createElement(
                                                    "tr",
                                                    null,
                                                    React.createElement(
                                                        "th",
                                                        { colSpan: "2" },
                                                        React.createElement(
                                                            "p",
                                                            { className: "text-left" },
                                                            p.formation_name
                                                        )
                                                    )
                                                ) : null,
                                                _this5.state.include_formation_sportsmen || !p.formation_name ? p.sportsmen.map(function (s, idx) {
                                                    return React.createElement(
                                                        "tr",
                                                        { key: idx },
                                                        React.createElement(
                                                            "td",
                                                            { className: "w-75" },
                                                            React.createElement(
                                                                "p",
                                                                null,
                                                                s.last_name + " " + s.first_name
                                                            )
                                                        ),
                                                        React.createElement(
                                                            "td",
                                                            { className: "w-25" },
                                                            React.createElement(
                                                                "p",
                                                                { className: "text-center" },
                                                                s.year_of_birth
                                                            )
                                                        )
                                                    );
                                                }) : null
                                            )
                                        )
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "w-28 club" },
                                        React.createElement(
                                            "p",
                                            null,
                                            p.club.name
                                        )
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "w-28 coaches" },
                                        React.createElement(
                                            "p",
                                            null,
                                            p.coaches.split(",").map(function (c) {
                                                return [c.trim(), React.createElement("br", null)];
                                            })
                                        )
                                    )
                                ), !_this5.state.include_acrobatics || p.programs.length == 0 ? null : React.createElement(
                                    "tr",
                                    { key: "Acro" + p.id },
                                    React.createElement(
                                        "td",
                                        { className: "acro", colSpan: "5" },
                                        React.createElement(
                                            "table",
                                            { className: "inner" },
                                            React.createElement(
                                                "tbody",
                                                null,
                                                p.programs.map(function (pr, pr_idx) {
                                                    return [React.createElement(
                                                        "tr",
                                                        { key: "H" + pr_idx },
                                                        React.createElement(
                                                            "th",
                                                            { colSpan: "2" },
                                                            React.createElement(
                                                                "p",
                                                                { className: "text-left" },
                                                                pr.name
                                                            )
                                                        )
                                                    )].concat(pr.acrobatics.map(function (a, a_idx) {
                                                        return React.createElement(
                                                            "tr",
                                                            { key: "A_" + pr_idx + "_" + a_idx },
                                                            React.createElement(
                                                                "td",
                                                                { className: "w-93" },
                                                                React.createElement(
                                                                    "p",
                                                                    { className: "text-left" },
                                                                    a.description
                                                                )
                                                            ),
                                                            React.createElement(
                                                                "td",
                                                                { className: "w-7" },
                                                                React.createElement(
                                                                    "p",
                                                                    { className: "text-right" },
                                                                    a.score.toFixed(1)
                                                                )
                                                            )
                                                        );
                                                    }));
                                                })
                                            )
                                        )
                                    )
                                )];
                            })
                        )
                    ),
                    React.createElement(
                        "p",
                        { className: "text-right" },
                        React.createElement(
                            "strong",
                            null,
                            _("admin.phrases.total_n_participants", ic.participants.length)
                        )
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this6 = this;

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
                        "div",
                        { className: "controls" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.createDocx.bind(this) },
                            "DOCX"
                        ),
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: function onClick() {
                                    return _this6.refs.numbers.createDocx();
                                } },
                            _("admin.buttons.docx_numbers")
                        )
                    ),
                    React.createElement(
                        "h1",
                        null,
                        _("admin.headers.start_list")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "start-list" },
                    React.createElement(
                        "div",
                        { className: "controls" },
                        React.createElement(
                            "div",
                            { className: "row" },
                            React.createElement(
                                "div",
                                { className: "col-md-6" },
                                this.state.disciplines.map(function (d) {
                                    return React.createElement(
                                        "div",
                                        { className: "switch", key: d.id },
                                        React.createElement(
                                            "label",
                                            null,
                                            React.createElement("input", {
                                                type: "checkbox",
                                                checked: !_this6.state["hide_" + d.id],
                                                onChange: _this6.onDisciplineCbChange.bind(_this6, d.id) }),
                                            d.name
                                        )
                                    );
                                }),
                                React.createElement(
                                    "a",
                                    { href: "#", onClick: this.setAllDisciplines.bind(this, false) },
                                    _("global.buttons.select_all")
                                ),
                                "    ",
                                React.createElement(
                                    "a",
                                    { href: "#", onClick: this.setAllDisciplines.bind(this, true) },
                                    _("global.buttons.deselect_all")
                                )
                            ),
                            React.createElement(
                                "div",
                                { className: "col-md-6" },
                                React.createElement(
                                    "div",
                                    { className: "switch" },
                                    React.createElement(
                                        "label",
                                        null,
                                        React.createElement("input", { type: "checkbox", ref: "cb_acro", onChange: this.onCbChange.bind(this) }),
                                        _("admin.labels.include_acrobatics")
                                    )
                                ),
                                React.createElement(
                                    "div",
                                    { className: "switch" },
                                    React.createElement(
                                        "label",
                                        null,
                                        React.createElement("input", { type: "checkbox", ref: "cb_forms", onChange: this.onCbChange.bind(this) }),
                                        _("admin.labels.include_formation_sportsmen")
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(Printable, {
                        ref: "printable",
                        header: this.state.name + ", " + this.state.date,
                        title1: _("admin.headers.start_list"),
                        body: this.state.disciplines.map(function (dis) {
                            return _this6.renderDiscipline(dis);
                        }) })
                ),
                React.createElement(ParticipantNumbers, {
                    competition_name: this.state.name,
                    disciplines: this.state.disciplines.filter(function (dis) {
                        return !_this6.state["hide_" + dis.id];
                    }),
                    ref: "numbers" })
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            var filename = arguments.length <= 0 || arguments[0] === undefined ? "start-list.docx" : arguments[0];

            Docx(filename).setMargins([10, 15, 10, 25]).setHeader(this.state.name + ", " + this.state.date).setTitle1(_("admin.headers.start_list")).setBody(this.refs.printable.fetchPrintableData()).addStyle(".bordered-table .inner td, .bordered-table .inner th", "border", "none").addStyle(".bordered-table .inner td, .bordered-table .inner th", "padding", "0").addStyle(".inner", "width", "100%").addStyle(".acro", "border-top", "none !important").addStyle(".has-acro td", "border-bottom", "1px solid #555 !important").addStyle(".has-acro td td", "border-bottom", "none !important").save();
        }
    }]);

    return StartList;
})(React.Component);
//# sourceMappingURL=start_list.js.map