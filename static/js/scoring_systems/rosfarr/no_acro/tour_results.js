"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResultsVerboseTableRow = (function (_React$Component) {
    _inherits(TourResultsVerboseTableRow, _React$Component);

    function TourResultsVerboseTableRow() {
        _classCallCheck(this, TourResultsVerboseTableRow);

        _get(Object.getPrototypeOf(TourResultsVerboseTableRow.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourResultsVerboseTableRow, [{
        key: "renderDanceScore",
        value: function renderDanceScore(score) {
            return React.createElement(
                "table",
                { className: "score-breakdown" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "FW:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "-",
                            score.raw_data.fw_woman,
                            "%"
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "FM:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            "-",
                            score.raw_data.fw_man,
                            "%"
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "DF:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            score.raw_data.dance_figs
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "C:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            score.raw_data.composition
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "BM:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            score.raw_data.big_mistakes
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "SM:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            score.raw_data.small_mistakes
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "T:"
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            score.total_score
                        )
                    )
                )
            );
        }
    }, {
        key: "renderAcroScore",
        value: function renderAcroScore(score) {
            var acro_scores = score.raw_data.deductions.map((function (score, idx) {
                return React.createElement(
                    "tr",
                    { key: idx },
                    React.createElement(
                        "th",
                        null,
                        "A",
                        idx + 1,
                        ":"
                    ),
                    React.createElement(
                        "td",
                        null,
                        "-",
                        score,
                        "%"
                    )
                );
            }).bind(this));
            return React.createElement(
                "table",
                { className: "score-breakdown" },
                React.createElement(
                    "tbody",
                    null,
                    acro_scores,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "FD:"
                        ),
                        React.createElement(
                            "td",
                            null,
                            score.raw_data.mistakes
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            "T:"
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            score.total_score
                        )
                    )
                )
            );
        }
    }, {
        key: "renderScore",
        value: function renderScore(judge, score) {
            if (judge.role == "dance_judge") {
                return this.renderDanceScore(score);
            }
            if (judge.role == "acro_judge") {
                if (this.props.scoring_system == "rosfarr.acro") {
                    return this.renderAcroScore(score);
                } else {
                    return this.renderDanceScore(score);
                }
            }
            return React.createElement(
                "span",
                null,
                score.total_score,
                " "
            );
        }
    }, {
        key: "render",
        value: function render() {
            var next_tour_cell = this.props.has_next_tour ? React.createElement(
                "td",
                { className: "next-tour" },
                this.props.row.advances ? "Yes" : "No"
            ) : null;
            var judges_scores = this.props.judges.map((function (judge) {
                var score = this.props.row.scores.scores[judge.id].data;
                return React.createElement(
                    "td",
                    { key: judge.id },
                    this.renderScore(judge, score)
                );
            }).bind(this));
            var acro_scores_cell = null;
            if (this.props.scoring_system == "rosfarr.acro") {
                var acro_scores = this.props.row.acrobatics.map((function (acro, idx) {
                    return React.createElement(
                        "tr",
                        { key: idx },
                        React.createElement(
                            "th",
                            null,
                            "A",
                            idx + 1,
                            ":"
                        ),
                        React.createElement(
                            "td",
                            null,
                            acro.score.toFixed(1)
                        )
                    );
                }).bind(this));
                acro_scores_cell = React.createElement(
                    "td",
                    { className: "acro_scores" },
                    React.createElement(
                        "table",
                        { className: "score-breakdown" },
                        React.createElement(
                            "tbody",
                            null,
                            acro_scores
                        )
                    )
                );
            }
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
                acro_scores_cell,
                judges_scores,
                next_tour_cell
            );
        }
    }]);

    return TourResultsVerboseTableRow;
})(React.Component);

var TourResultsVerboseTable = (function (_React$Component2) {
    _inherits(TourResultsVerboseTable, _React$Component2);

    function TourResultsVerboseTable() {
        _classCallCheck(this, TourResultsVerboseTable);

        _get(Object.getPrototypeOf(TourResultsVerboseTable.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourResultsVerboseTable, [{
        key: "render",
        value: function render() {
            var rows = this.props.data.map((function (row) {
                return React.createElement(TourResultsVerboseTableRow, {
                    row: row,
                    key: row.participant.id,
                    has_next_tour: this.props.has_next_tour,
                    judges: this.props.judges,
                    scoring_system: this.props.scoring_system });
            }).bind(this));
            var judges_header = this.props.judges.map(function (judge) {
                return React.createElement(
                    "th",
                    { key: judge.id },
                    judge.number
                );
            });
            var acro_header = this.props.scoring_system == "rosfarr.acro" ? React.createElement(
                "th",
                { className: "acro" },
                "Acrobatic"
            ) : null;
            return React.createElement(
                "table",
                { className: "scores-table no-break" },
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
                        acro_header,
                        judges_header,
                        this.props.has_next_tour ? React.createElement(
                            "th",
                            { className: "next-tour" },
                            React.createElement(
                                "div",
                                null,
                                "Next tour"
                            )
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

    return TourResultsVerboseTable;
})(React.Component);

var TourResultsTableRow = (function (_React$Component3) {
    _inherits(TourResultsTableRow, _React$Component3);

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

var TourResultsTable = (function (_React$Component4) {
    _inherits(TourResultsTable, _React$Component4);

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
                    key: row.participant.id,
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
//# sourceMappingURL=tour_results.js.map