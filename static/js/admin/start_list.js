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
                        club: {}
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
                            club: {}
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
                    "table",
                    { className: "inner-competition" },
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
                                { className: "club" },
                                _("models.participant.club_name")
                            ),
                            React.createElement(
                                "th",
                                { className: "coaches" },
                                _("models.participant.coaches")
                            )
                        ),
                        ic.participants.map(function (p) {
                            return React.createElement(
                                "tr",
                                { key: p.id },
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
                                    { className: "club" },
                                    p.club.name,
                                    ", ",
                                    p.club.city
                                ),
                                React.createElement(
                                    "td",
                                    { className: "coaches" },
                                    p.coaches.split(",").map(function (c) {
                                        return [c.trim(), React.createElement("br", null)];
                                    })
                                )
                            );
                        })
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
                            { className: "btn btn-primary", onClick: function () {
                                    return print();
                                } },
                            _("results.buttons.print")
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
                    this.state.inner_competitions.map(function (ic) {
                        return _this.renderInnerCompetition(ic);
                    })
                )
            );
        }
    }]);

    return StartList;
})(React.Component);
//# sourceMappingURL=start_list.js.map