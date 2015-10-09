"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResultsTableRow = (function (_React$Component) {
    _inherits(TourResultsTableRow, _React$Component);

    function TourResultsTableRow() {
        _classCallCheck(this, TourResultsTableRow);

        _get(Object.getPrototypeOf(TourResultsTableRow.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourResultsTableRow, [{
        key: "render",
        value: function render() {
            var next_tour_cell = this.props.has_next_tour ? React.createElement(
                "td",
                { className: "next-tour" },
                this.props.row.advances ? "Yes" : "No"
            ) : null;
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "place" },
                    this.props.row.place
                ),
                React.createElement(
                    "td",
                    { className: "number" },
                    this.props.row.participant.number
                ),
                React.createElement(
                    "td",
                    { className: "participant" },
                    this.props.row.participant.name
                ),
                React.createElement(
                    "td",
                    { className: "score" },
                    this.props.row.scores.total_run_score
                ),
                next_tour_cell
            );
        }
    }]);

    return TourResultsTableRow;
})(React.Component);

var TourResultsTable = (function (_React$Component2) {
    _inherits(TourResultsTable, _React$Component2);

    function TourResultsTable() {
        _classCallCheck(this, TourResultsTable);

        _get(Object.getPrototypeOf(TourResultsTable.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourResultsTable, [{
        key: "render",
        value: function render() {
            var rows = this.props.data.map((function (row) {
                return React.createElement(TourResultsTableRow, {
                    row: row,
                    key: row.id,
                    has_next_tour: this.props.has_next_tour });
            }).bind(this));
            return React.createElement(
                "table",
                { className: "scores-table" },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { className: "place" },
                            "Place"
                        ),
                        React.createElement(
                            "th",
                            { className: "number" },
                            "Number"
                        ),
                        React.createElement(
                            "th",
                            { className: "participant" },
                            "Participant"
                        ),
                        React.createElement(
                            "th",
                            { className: "score" },
                            "Score"
                        ),
                        this.props.has_next_tour ? React.createElement(
                            "th",
                            { className: "next-tour" },
                            "Next tour"
                        ) : null
                    )
                ),
                React.createElement(
                    "tbody",
                    null,
                    rows
                )
            );
        }
    }]);

    return TourResultsTable;
})(React.Component);