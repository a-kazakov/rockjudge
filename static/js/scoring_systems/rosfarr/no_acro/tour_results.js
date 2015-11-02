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

var TourResultsVerboseTableRow = (function (_React$Component) {
    _inherits(TourResultsVerboseTableRow, _React$Component);

    function TourResultsVerboseTableRow() {
        _classCallCheck(this, TourResultsVerboseTableRow);

        _get(Object.getPrototypeOf(TourResultsVerboseTableRow.prototype), "constructor", this).apply(this, arguments);
    }

    _createClass(TourResultsVerboseTableRow, [{
        key: "formatScore",
        value: function formatScore(score, template) {
            if (!template) {
                template = "$";
            }
            if (score === null) {
                return React.createElement(
                    "span",
                    null,
                    "—"
                );
            }
            return template.replace("$", score).replace("@", score.toFixed(1));
        }
    }, {
        key: "renderFormationScore",
        value: function renderFormationScore(score, additiolal_data) {
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
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.dt"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.dance_tech, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.df"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.dance_figs, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.i"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.impression, "@")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.sm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.small_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.bm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.big_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                score.data.total_score
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.p"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                additiolal_data.places[score.id]
                            )
                        )
                    )
                )
            );
        }
    }, {
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
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.fw"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.fw_woman, "-$%")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.fm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.fw_man, "-$%")
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.df"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.dance_figs)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.c"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.composition)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.sm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.small_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.bm"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.big_mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                score.data.total_score
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "renderAcroScore",
        value: function renderAcroScore(score) {
            var acro_scores = score.data.raw_data.deductions.map((function (score, idx) {
                return React.createElement(
                    "tr",
                    { key: idx },
                    React.createElement(
                        "th",
                        null,
                        React.createElement(
                            "p",
                            null,
                            __("results.breakdown.acro_n", idx + 1),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score, "-$%")
                        )
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
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.fd"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "p",
                                null,
                                this.formatScore(score.data.raw_data.mistakes)
                            )
                        )
                    ),
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            null,
                            React.createElement(
                                "p",
                                null,
                                __("results.breakdown.t"),
                                ":"
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "total-score" },
                            React.createElement(
                                "p",
                                null,
                                score.data.total_score
                            )
                        )
                    )
                )
            );
        }
    }, {
        key: "renderScore",
        value: function renderScore(judge, score, additiolal_data) {
            if (judge.role == "dance_judge") {
                if (this.props.tour.scoring_system_name == "rosfarr.formation") {
                    return this.renderFormationScore(score, additiolal_data);
                }
                return this.renderDanceScore(score, additiolal_data);
            }
            if (judge.role == "acro_judge") {
                return this.renderAcroScore(score, additiolal_data);
            }
            return React.createElement(
                "span",
                null,
                score.total_score
            );
        }
    }, {
        key: "renderInfoBlock",
        value: function renderInfoBlock() {
            var has_acro_overrides = false;
            this.props.run.acrobatics.forEach(function (acro) {
                if (acro.score !== acro.original_score) {
                    has_acro_overrides = true;
                }
            });
            return React.createElement(
                "td",
                { className: "info-block" },
                React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        _("global.phrases.participant_n", this.props.run.participant.number, null, this.props.run.participant.sportsmen.length)
                    )
                ),
                getParticipantDisplay(this.props.run.participant),
                React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        __("results.labels.penalty"),
                        ": "
                    ),
                    this.props.head_judge_score ? this.props.head_judge_score.data.total_score : React.createElement(
                        "span",
                        null,
                        "—"
                    )
                ),
                this.props.tour.scoring_system_name == "rosfarr.acro" && this.props.run.acrobatics.length > 0 ? React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        null,
                        React.createElement(
                            "strong",
                            null,
                            has_acro_overrides ? __("results.labels.acrobatics_verbose") : __("results.labels.acrobatics"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "table",
                        { className: "acro-table" },
                        React.createElement(
                            "tbody",
                            null,
                            React.createElement(
                                "tr",
                                null,
                                " ",
                                this.props.run.acrobatics.map(function (acro, idx) {
                                    return React.createElement(
                                        "td",
                                        { key: idx },
                                        React.createElement(
                                            "p",
                                            { className: "text-center" },
                                            acro.original_score.toFixed(1)
                                        )
                                    );
                                }),
                                " "
                            ),
                            has_acro_overrides ? React.createElement(
                                "tr",
                                null,
                                " ",
                                this.props.run.acrobatics.map(function (acro, idx) {
                                    return React.createElement(
                                        "td",
                                        { key: idx },
                                        React.createElement(
                                            "p",
                                            { className: "text-center" },
                                            acro.score.toFixed(1)
                                        )
                                    );
                                }),
                                " "
                            ) : null
                        )
                    )
                ) : null,
                this.props.tour.scoring_system_name !== "rosfarr.formation" ? React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        __("results.labels.total_score"),
                        ": ",
                        this.props.run.total_score
                    )
                ) : null,
                this.props.has_next_tour ? React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        __("results.labels.next_tour"),
                        ": "
                    ),
                    this.props.results_info.advances ? _("global.labels.yes") : _("global.labels.no")
                ) : null
            );
        }
    }, {
        key: "render",
        value: function render() {
            var _this = this;

            var judges_scores = this.props.scores.map((function (score, idx) {
                return React.createElement(
                    "td",
                    { className: "w-13", key: idx },
                    " ",
                    _this.renderScore(_this.props.discipline_judges[idx], score, _this.props.results_info.additional_data),
                    " "
                );
            }).bind(this));
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "w-3 place" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.results_info.place
                    )
                ),
                this.renderInfoBlock(),
                judges_scores
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
            var tour_wrapper = new TourScoresWrapper(this.props.tour, this.props.results);
            var discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
            var scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
            var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
                return row[0];
            });
            var results_info = tour_wrapper.getResultsInfo();
            var runs = tour_wrapper.getRuns();
            var has_next_tour = this.props.tour.next_tour_id !== null;
            var rows = [];
            for (var idx = 0; idx < runs.length; ++idx) {
                rows.push(React.createElement(TourResultsVerboseTableRow, {
                    key: runs[idx].id,
                    tour: this.props.tour,
                    run: runs[idx],
                    scores: scores_table[idx],
                    head_judge_score: head_judge_scores[idx],
                    results_info: results_info[idx],
                    discipline_judges: discipline_judges,
                    has_next_tour: has_next_tour }));
            };
            var judges_header = discipline_judges.map(function (dj) {
                return React.createElement(
                    "th",
                    { key: dj.id },
                    React.createElement(
                        "p",
                        null,
                        dj.judge.number
                    )
                );
            });
            return React.createElement(
                "table",
                { className: "bordered-table", style: { width: "100%" } },
                React.createElement(
                    "thead",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "th",
                            { className: "w-3 place" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.place")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "participant" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.info")
                            )
                        ),
                        judges_header
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
            var card = this.props.head_judge_score ? this.props.head_judge_score.data.total_score : "0";
            return React.createElement(
                "tr",
                null,
                React.createElement(
                    "td",
                    { className: "w-7 place" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.results_info.place
                    )
                ),
                React.createElement(
                    "td",
                    { className: "w-6 number" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.run.participant.number
                    )
                ),
                React.createElement(
                    "td",
                    { className: "participant" },
                    React.createElement(
                        "p",
                        null,
                        getParticipantDisplay(this.props.run.participant)
                    )
                ),
                React.createElement(
                    "td",
                    { className: "club" },
                    React.createElement(
                        "p",
                        null,
                        this.props.run.participant.club.name
                    )
                ),
                this.props.has_total_score ? React.createElement(
                    "td",
                    { className: "w-18 score" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        this.props.run.total_score
                    )
                ) : null,
                React.createElement(
                    "td",
                    { className: "w-8 card" },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        card
                    )
                )
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
        key: "renderAdvancesHeader",
        value: function renderAdvancesHeader(prev_row, next_row, idx) {
            if (prev_row && prev_row.advances == next_row.advances) {
                return null;
            }
            return React.createElement(
                "th",
                { className: "advances-header", colSpan: "6", key: "NT" + idx },
                next_row.advances ? React.createElement(
                    "p",
                    { className: "text-left" },
                    __("results.headers.participants_advanced")
                ) : React.createElement(
                    "p",
                    { className: "text-left" },
                    __("results.headers.participants_not_advanced")
                )
            );
        }
    }, {
        key: "render",
        value: function render() {
            var tour_wrapper = new TourScoresWrapper(this.props.tour, this.props.results);
            var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
                return row[0];
            });
            var results_info = tour_wrapper.getResultsInfo();
            var runs = tour_wrapper.getRuns();
            var has_next_tour = this.props.tour.next_tour_id !== null;
            var has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation";
            var rows = [];
            for (var idx = 0; idx < runs.length; ++idx) {
                if (has_next_tour) {
                    rows.push(this.renderAdvancesHeader(results_info[idx - 1], results_info[idx], idx));
                }
                rows.push(React.createElement(TourResultsTableRow, {
                    key: runs[idx].id,
                    head_judge_score: head_judge_scores[idx],
                    results_info: results_info[idx],
                    run: runs[idx],
                    has_next_tour: has_next_tour,
                    has_total_score: has_total_score }));
            };
            return React.createElement(
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
                            { className: "w-7 place" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.place")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "w-6 number" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.number")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "participant" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.participant_name")
                            )
                        ),
                        React.createElement(
                            "th",
                            { className: "club" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.participant_club")
                            )
                        ),
                        has_total_score ? React.createElement(
                            "th",
                            { className: "w-18 score" },
                            React.createElement(
                                "p",
                                null,
                                __("results.labels.total_score")
                            )
                        ) : null,
                        React.createElement(
                            "th",
                            { className: "w-8 card" },
                            React.createElement(
                                "p",
                                { className: "text-center" },
                                __("results.labels.card")
                            )
                        )
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