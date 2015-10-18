"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RoleSelector = (function (_React$Component) {
    _inherits(RoleSelector, _React$Component);

    function RoleSelector() {
        _classCallCheck(this, RoleSelector);

        _get(Object.getPrototypeOf(RoleSelector.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(RoleSelector, [{
        key: "render",
        value: function render() {
            var judges = this.props.competition.judges.filter(function (judge) {
                return judge.role != "";
            }).map(function (judge) {
                return React.createElement(
                    "a",
                    { href: "/tablet/" + judge.id.toString(), className: "btn btn-default btn-lg" },
                    judge.role_description || _("global.phrases.judge_n", judge.number),
                    ": ",
                    judge.name
                );
            });
            return React.createElement(
                "div",
                { className: "role-selector" },
                React.createElement(
                    "h3",
                    null,
                    _("start_page.headers.select_role")
                ),
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-sm-6" },
                        React.createElement(
                            "div",
                            { className: "btn-group-vertical full-width" },
                            React.createElement(
                                "a",
                                { href: "/presenter", className: "btn btn-default btn-lg" },
                                _("start_page.roles.presenter")
                            ),
                            React.createElement(
                                "a",
                                { href: "/admin/" + this.props.competition.id.toString(), className: "btn btn-default btn-lg" },
                                _("start_page.roles.administrator")
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "col-sm-6" },
                        React.createElement(
                            "div",
                            { className: "btn-group-vertical full-width" },
                            judges
                        )
                    )
                )
            );
        }
    }]);

    return RoleSelector;
})(React.Component);

var StartPage = (function (_React$Component2) {
    _inherits(StartPage, _React$Component2);

    function StartPage(props) {
        _classCallCheck(this, StartPage);

        _get(Object.getPrototypeOf(StartPage.prototype), "constructor", this).call(this, props);
        this.loadData();
        this.state = {
            all_loaded: false,
            selected_competition: null
        };
    }

    _createClass(StartPage, [{
        key: "loadCompetitionData",
        value: function loadCompetitionData(competition_id) {
            Api("tournaments.competition.get", {
                competition_id: competition_id,
                children: {
                    judges: {}
                }
            }).updateDB("Competition", competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "loadData",
        value: function loadData() {
            this.props.competition_ids.forEach((function (competition_id) {
                this.loadCompetitionData(competition_id);
            }).bind(this));
        }
    }, {
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var SCHEMA = {
                judges: {}
            };
            var all_loaded = true;
            var competitions = this.props.competition_ids.map(function (competition_id) {
                var st_obj = storage.get("Competition").by_id(competition_id);
                if (!st_obj) {
                    all_loaded = false;
                    return null;
                }
                return st_obj.serialize(SCHEMA);
            });
            this.setState({
                competitions: competitions,
                all_loaded: all_loaded
            });
        }
    }, {
        key: "selectCompetition",
        value: function selectCompetition(idx) {
            this.setState({
                selected_competition: idx
            });
        }
    }, {
        key: "renderCompetitionSelector",
        value: function renderCompetitionSelector() {
            var comps = this.state.competitions.map((function (comp, idx) {
                return React.createElement(
                    "div",
                    { key: comp.id, className: "button", onClick: this.selectCompetition.bind(this, idx) },
                    comp.name
                );
            }).bind(this));
            return React.createElement(
                "div",
                { className: "competition-selector" },
                React.createElement(
                    "h3",
                    null,
                    _("start_page.headers.select_competition")
                ),
                React.createElement(
                    "div",
                    { className: "list" },
                    comps
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            if (!this.state.all_loaded) {
                return React.createElement(
                    "span",
                    null,
                    "Loading ..."
                );
            }
            if (this.state.selected_competition !== null) {
                return React.createElement(
                    "div",
                    { className: "start-screen" },
                    React.createElement(RoleSelector, { competition: this.state.competitions[this.state.selected_competition] })
                );
            }
            if (this.state.competitions.length == 1) {
                return React.createElement(
                    "div",
                    { className: "start-screen" },
                    React.createElement(RoleSelector, { competition: this.state.competitions[0] })
                );
            }
            return React.createElement(
                "div",
                { className: "start-screen" },
                this.renderCompetitionSelector()
            );
        }
    }]);

    return StartPage;
})(React.Component);
//# sourceMappingURL=start_page.js.map