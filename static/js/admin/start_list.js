"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StartList = (function (_React$Component) {
    _inherits(StartList, _React$Component);

    function StartList(props) {
        _classCallCheck(this, StartList);

        _get(Object.getPrototypeOf(StartList.prototype), "constructor", this).call(this, props);
        this.state = {
            name: null,
            include_formation_sportsmen: false,
            include_acrobatics: false
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }

    _createClass(StartList, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                disciplines: {
                    participants: {
                        club: {},
                        sportsmen: {}
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
                            club: {}
                        }
                    }
                }
            }).updateDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "onCbChange",
        value: function onCbChange() {
            this.setState({
                include_acrobatics: this.refs.cb_acro.getDOMNode().checked,
                include_formation_sportsmen: this.refs.cb_forms.getDOMNode().checked
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
            var _this = this;

            if (this.state["hide_" + ic.id]) {
                return null;
            }
            return React.createElement(
                "div",
                { key: ic.id },
                React.createElement(
                    "h4",
                    null,
                    ic.name
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
                                    { className: "w-21 name" },
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
                                    { className: "w-37 club" },
                                    React.createElement(
                                        "p",
                                        null,
                                        _("models.participant.club_name")
                                    )
                                ),
                                React.createElement(
                                    "th",
                                    { className: "w-25 coaches" },
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
                                    { key: p.id, className: !_this.state.include_acrobatics || p.acrobatics.length == 0 ? "" : "has-acro" },
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
                                        { className: "w-30 name", colSpan: "2" },
                                        React.createElement(
                                            "p",
                                            null,
                                            React.createElement(
                                                "table",
                                                { className: "inner" },
                                                React.createElement(
                                                    "tbody",
                                                    null,
                                                    p.formation_name ? React.createElement(
                                                        "th",
                                                        { colSpan: "2" },
                                                        React.createElement(
                                                            "p",
                                                            { className: "text-left" },
                                                            p.formation_name
                                                        )
                                                    ) : null,
                                                    _this.state.include_formation_sportsmen || !p.formation_name ? p.sportsmen.map(function (s, idx) {
                                                        return React.createElement(
                                                            "tr",
                                                            { key: idx },
                                                            React.createElement(
                                                                "td",
                                                                { className: "w-70" },
                                                                React.createElement(
                                                                    "p",
                                                                    null,
                                                                    s.last_name + " " + s.first_name
                                                                )
                                                            ),
                                                            React.createElement(
                                                                "td",
                                                                { className: "w-30" },
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
                                        )
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "w-37 club" },
                                        React.createElement(
                                            "p",
                                            null,
                                            p.club.name,
                                            ", ",
                                            p.club.city
                                        )
                                    ),
                                    React.createElement(
                                        "td",
                                        { className: "w-25 coaches" },
                                        React.createElement(
                                            "p",
                                            null,
                                            p.coaches.split(",").map(function (c) {
                                                return [c.trim(), React.createElement("br", null)];
                                            })
                                        )
                                    )
                                ), !_this.state.include_acrobatics || p.acrobatics.length == 0 ? null : React.createElement(
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
                                                React.createElement(
                                                    "tr",
                                                    null,
                                                    React.createElement(
                                                        "th",
                                                        { className: "w-93" },
                                                        React.createElement(
                                                            "p",
                                                            { className: "text-left" },
                                                            _("models.participant.acro_description")
                                                        )
                                                    ),
                                                    React.createElement(
                                                        "th",
                                                        { className: "w-7" },
                                                        React.createElement(
                                                            "p",
                                                            { className: "text-right" },
                                                            _("models.participant.acro_score")
                                                        )
                                                    )
                                                ),
                                                p.acrobatics.map(function (a, idx) {
                                                    return React.createElement(
                                                        "tr",
                                                        { key: idx },
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
            var _this2 = this;

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
                        "div",
                        { className: "controls" },
                        React.createElement(
                            "button",
                            { className: "btn btn-primary", onClick: this.createDocx.bind(this) },
                            "DOCX"
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
                        "h3",
                        null,
                        this.state.name,
                        ", ",
                        this.state.date
                    ),
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
                                            checked: !_this2.state["hide_" + d.id],
                                            onChange: _this2.onDisciplineCbChange.bind(_this2, d.id) }),
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
                    ),
                    React.createElement(
                        "div",
                        { ref: "content" },
                        this.state.disciplines.map(function (ic) {
                            return _this2.renderDiscipline(ic);
                        })
                    )
                )
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            Docx("start-list").setHeader(_("admin.headers.start_list")).setBody(React.findDOMNode(this.refs.content).innerHTML).addStyle(".bordered-table .inner td, .bordered-table .inner th", "border", "none").addStyle(".bordered-table .inner td, .bordered-table .inner th", "padding", "0").addStyle(".inner", "width", "100%").addStyle(".acro", "border-top", "none !important").addStyle(".has-acro td", "border-bottom", "1px solid #555 !important").addStyle(".has-acro td td", "border-bottom", "none !important").save();
        }
    }]);

    return StartList;
})(React.Component);
//# sourceMappingURL=start_list.js.map