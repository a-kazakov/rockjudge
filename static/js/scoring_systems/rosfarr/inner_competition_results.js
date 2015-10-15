"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function __() {
    var args = [];
    for (var idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _.apply(undefined, ["scoring_systems.rosfarr." + arguments[0]].concat(args));
}

var InnerCompetitionResultsTable = (function (_React$Component) {
    _inherits(InnerCompetitionResultsTable, _React$Component);

    function InnerCompetitionResultsTable() {
        _classCallCheck(this, InnerCompetitionResultsTable);

        _get(Object.getPrototypeOf(InnerCompetitionResultsTable.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(InnerCompetitionResultsTable, [{
        key: "renderRowHeader",
        value: function renderRowHeader(prev_row, next_row) {
            var render = typeof prev_row == "undefined" || prev_row.run.tour.id != next_row.run.tour.id;
            if (!render) {
                return null;
            }
            return React.createElement(
                "tr",
                { key: "H" + next_row.run.id },
                React.createElement(
                    "td",
                    { className: "tour-name", colSpan: "5" },
                    next_row.run.tour.name
                )
            );
        }

        // <td>{ row.run.participant.coach.split(",").map((c) => [c.trim(), <br />]) }</td>
    }, {
        key: "renderRow",
        value: function renderRow(row) {
            var sp_name = row.run.participant.sportsmen.length > 2 ? [React.createElement(
                "strong",
                null,
                row.run.participant.formation_name
            ), React.createElement("br", null)] : [];
            sp_name = sp_name.concat(row.run.participant.sportsmen.map(function (sp) {
                return [sp.last_name + " " + sp.first_name, React.createElement("br", null)];
            }));
            return React.createElement(
                "tr",
                { key: "R" + row.run.id },
                React.createElement(
                    "td",
                    { className: "place" },
                    row.place === null ? "" : row.place
                ),
                React.createElement(
                    "td",
                    { className: "number" },
                    row.run.participant.number
                ),
                React.createElement(
                    "td",
                    { className: "sportsmen" },
                    sp_name
                ),
                React.createElement(
                    "td",
                    { className: "coaches" },
                    "TBD"
                ),
                React.createElement(
                    "td",
                    { className: "club" },
                    row.run.participant.club.name,
                    ", ",
                    row.run.participant.club.city
                )
            );
        }
    }, {
        key: "renderRows",
        value: function renderRows() {
            var result = [];
            var table = this.props.table;
            for (var i = 0; i < table.length; ++i) {
                var header = this.renderRowHeader(table[i - 1], table[i]);
                header && result.push(header);
                result.push(this.renderRow(table[i]));
            }
            return result;
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { className: "ic-results" },
                React.createElement(
                    "table",
                    { className: "scores-table" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "th",
                                { className: "place" },
                                __("results.labels.place")
                            ),
                            React.createElement(
                                "th",
                                { className: "number" },
                                __("results.labels.number")
                            ),
                            React.createElement(
                                "th",
                                { className: "sportsmen" },
                                __("results.labels.sportsmen")
                            ),
                            React.createElement(
                                "th",
                                { className: "coaches" },
                                __("results.labels.participant_coach")
                            ),
                            React.createElement(
                                "th",
                                { className: "club" },
                                __("results.labels.participant_club")
                            )
                        ),
                        this.renderRows()
                    )
                )
            );
        }
    }]);

    return InnerCompetitionResultsTable;
})(React.Component);
//# sourceMappingURL=inner_competition_results.js.map