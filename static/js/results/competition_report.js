"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CompetitionReport = (function (_React$Component) {
    _inherits(CompetitionReport, _React$Component);

    function CompetitionReport(props) {
        _classCallCheck(this, CompetitionReport);

        _get(Object.getPrototypeOf(CompetitionReport.prototype), "constructor", this).call(this, props);
        this.state = {
            competition: null
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }

    _createClass(CompetitionReport, [{
        key: "reloadFromStorage",
        value: function reloadFromStorage() {
            var data = storage.get("Competition").by_id(this.props.competition_id).serialize({
                disciplines: {},
                judges: {},
                clubs: {
                    participants: {}
                }
            });
            this.setState({
                competition: data
            });
        }
    }, {
        key: "loadData",
        value: function loadData() {
            Api("competition.get", {
                competition_id: this.props.competition_id,
                children: {
                    clubs: {
                        participants: {}
                    },
                    disciplines: {},
                    judges: {}
                }
            }).addToDB("Competition", this.props.competition_id).onSuccess(this.reloadFromStorage.bind(this)).send();
        }
    }, {
        key: "renderInfoTable",
        value: function renderInfoTable() {
            return React.createElement(
                "table",
                { className: "info" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { className: "w-40" },
                            React.createElement(
                                "p",
                                { className: "text-left" },
                                _("admin.labels.competition_name")
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "w-60" },
                            React.createElement(
                                "p",
                                null,
                                React.createElement(
                                    "strong",
                                    null,
                                    this.state.competition.name
                                )
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { className: "w-40" },
                            React.createElement(
                                "p",
                                { className: "text-left" },
                                _("admin.labels.competition_date")
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "w-60" },
                            React.createElement(
                                "p",
                                null,
                                React.createElement(
                                    "strong",
                                    null,
                                    this.state.competition.date
                                )
                            )
                        )
                    ),
                    this.state.competition.info.map(function (row) {
                        return React.createElement(
                            "tr",
                            { key: row[0] },
                            React.createElement(
                                "th",
                                { className: "w-40" },
                                React.createElement(
                                    "p",
                                    { className: "text-left" },
                                    row[0]
                                )
                            ),
                            React.createElement(
                                "td",
                                { className: "w-60" },
                                React.createElement(
                                    "p",
                                    null,
                                    row[1]
                                )
                            )
                        );
                    })
                )
            );
        }
    }, {
        key: "renderClubs",
        value: function renderClubs() {
            var clubs = this.state.competition.clubs.filter(function (club) {
                return club.participants.length > 0;
            });
            var clubs_dict = {};
            var cities = [];
            clubs.forEach(function (club) {
                return clubs_dict[club.city] = [];
            });
            clubs.forEach(function (club) {
                return clubs_dict[club.city].push(club.name);
            });
            clubs.forEach(function (club) {
                return clubs_dict[club.city].sort;
            });
            Object.getOwnPropertyNames(clubs_dict).forEach(function (city) {
                return cities.push(city);
            });
            cities.sort();
            return React.createElement(
                "table",
                { className: "clubs" },
                React.createElement(
                    "tbody",
                    null,
                    cities.map(function (city) {
                        return React.createElement(
                            "tr",
                            { key: city, className: "va-top" },
                            React.createElement(
                                "th",
                                { className: "w-20" },
                                React.createElement(
                                    "p",
                                    { className: "text-left" },
                                    city
                                )
                            ),
                            React.createElement(
                                "td",
                                { className: "w-80" },
                                React.createElement(
                                    "p",
                                    null,
                                    clubs_dict[city].join(", ")
                                )
                            )
                        );
                    })
                )
            );
        }
    }, {
        key: "renderJudges",
        value: function renderJudges() {
            return React.createElement(
                "table",
                { className: "judges" },
                React.createElement(
                    "tbody",
                    null,
                    this.state.competition.judges.map(function (judge) {
                        return React.createElement(
                            "tr",
                            { key: judge.id },
                            React.createElement(
                                "th",
                                { className: "w-40" },
                                React.createElement(
                                    "p",
                                    { className: "text-left" },
                                    judge.role_description || _("global.phrases.judge_n", judge.number)
                                )
                            ),
                            React.createElement(
                                "td",
                                { className: "w-60" },
                                React.createElement(
                                    "p",
                                    null,
                                    judge.name,
                                    ", ",
                                    judge.category
                                )
                            )
                        );
                    })
                )
            );
        }
    }, {
        key: "renderResults",
        value: function renderResults() {
            return this.state.competition.disciplines.map(function (ic) {
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
                    React.createElement(DisciplineResults, {
                        discipline_id: ic.id,
                        table_only: true })
                );
            });
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.competition === null) {
                return React.createElement(
                    "span",
                    null,
                    "Loading..."
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
                        _("admin.headers.competition_report")
                    )
                ),
                React.createElement(
                    "div",
                    { className: "competition-report", ref: "main_table" },
                    this.renderInfoTable(),
                    React.createElement(
                        "h4",
                        null,
                        React.createElement(
                            "p",
                            null,
                            _("admin.headers.clubs")
                        )
                    ),
                    this.renderClubs(),
                    React.createElement(
                        "h4",
                        null,
                        React.createElement(
                            "p",
                            null,
                            _("admin.headers.judges")
                        )
                    ),
                    this.renderJudges(),
                    React.createElement(
                        "h4",
                        null,
                        React.createElement(
                            "p",
                            null,
                            _("admin.headers.competition_results")
                        )
                    ),
                    this.renderResults()
                )
            );
        }
    }, {
        key: "createDocx",
        value: function createDocx() {
            Docx("report").setMargins([10, 15, 10, 25]).setTitle1(_("admin.headers.competition_report")).setBody(this.refs.main_table.innerHTML).addStyle(".spacer td", "height", "5pt").addStyle(".tour-name", "background", "#ddd").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none").addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0").addStyle(".sportsmen", "width", "100%").save();
        }
    }]);

    return CompetitionReport;
})(React.Component);
//# sourceMappingURL=competition_report.js.map