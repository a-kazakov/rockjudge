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
            name: null
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }

    _createClass(StartList, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                inner_competitions: {
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
            Api("tournaments.competition.get", {
                competition_id: this.props.competition_id,
                children: {
                    inner_competitions: {
                        participants: {
                            club: {},
                            sportsmen: {}
                        }
                    }
                }
            }).updateDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "renderInnerCompetition",
        value: function renderInnerCompetition(ic) {
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
                    { className: "inner-competition" },
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
                                return React.createElement(
                                    "tr",
                                    { key: p.id },
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
                                                { className: "sportsmen" },
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
                                                    p.sportsmen.map(function (s, idx) {
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
                                                    })
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
                                );
                            })
                        )
                    )
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this = this;

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
                        { ref: "content" },
                        this.state.inner_competitions.map(function (ic) {
                            return _this.renderInnerCompetition(ic);
                        })
                    )
                )
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            Docx("start-list").setHeader(_("admin.headers.start_list")).setBody(React.findDOMNode(this.refs.content).innerHTML).addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0").addStyle(".sportsmen", "width", "100%").save();
        }
    }]);

    return StartList;
})(React.Component);
//# sourceMappingURL=start_list.js.map