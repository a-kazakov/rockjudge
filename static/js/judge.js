(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.TourResultsTable = exports.TourResultsSemiVerboseTable = exports.TourResultsVerboseTable = undefined;

var _loader = require("i10n/loader");

var _base = require("common/rosfarr/base");

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function __() {
    var args = [];
    for (var idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _loader._.apply(undefined, ["scoring_systems.rosfarr." + arguments[0]].concat(args));
}

var TourResultsVerboseTableColumnWidths = function () {
    function TourResultsVerboseTableColumnWidths(n_judges) {
        _classCallCheck(this, TourResultsVerboseTableColumnWidths);

        this.judge_width = Math.round(70 / n_judges);
        this.place_width = 7;
        this.info_width = 100 - this.judge_width * n_judges - this.place_width;
    }

    TourResultsVerboseTableColumnWidths.prototype.genPlaceStyle = function genPlaceStyle() {
        return {
            width: this.place_width + "%"
        };
    };

    TourResultsVerboseTableColumnWidths.prototype.genInfoStyle = function genInfoStyle() {
        return {
            width: this.info_width + "%"
        };
    };

    TourResultsVerboseTableColumnWidths.prototype.genJudgeStyle = function genJudgeStyle() {
        return {
            width: this.judge_width + "%"
        };
    };

    return TourResultsVerboseTableColumnWidths;
}();

var TourResultsVerboseTableRow = function (_React$Component) {
    _inherits(TourResultsVerboseTableRow, _React$Component);

    function TourResultsVerboseTableRow() {
        _classCallCheck(this, TourResultsVerboseTableRow);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    TourResultsVerboseTableRow.prototype.formatScore = function formatScore(score, template) {
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
    };

    TourResultsVerboseTableRow.prototype.renderFormationScore = function renderFormationScore(score, additiolal_data) {
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
                            __("results.breakdown.m"),
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
    };

    TourResultsVerboseTableRow.prototype.renderFormationAcroScore = function renderFormationAcroScore(score, additiolal_data) {
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
                            __("results.breakdown.a"),
                            ":"
                        )
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "p",
                            null,
                            this.formatScore(score.data.raw_data.acrobatics, "@")
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
    };

    TourResultsVerboseTableRow.prototype.renderDanceScore = function renderDanceScore(score) {
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
    };

    TourResultsVerboseTableRow.prototype.renderAcroScore = function renderAcroScore(score) {
        var acro_scores = score.data.raw_data.reductions.map(function (score, idx) {
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
        }.bind(this));
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
    };

    TourResultsVerboseTableRow.prototype.renderScore = function renderScore(judge, score, additiolal_data) {
        switch ((0, _base.getScoringType)(judge, this.props.tour.scoring_system_name)) {
            case "dance":
                return this.renderDanceScore(score, additiolal_data);
            case "acro":
                return this.renderAcroScore(score, additiolal_data);
            case "formation":
                return this.renderFormationScore(score, additiolal_data);
            case "formation_acro":
                return this.renderFormationAcroScore(score, additiolal_data);
            default:
                return React.createElement(
                    "p",
                    { className: "text-center" },
                    score.data.total_score.toFixed(2)
                );
        }
    };

    TourResultsVerboseTableRow.prototype.renderParticipantInfo = function renderParticipantInfo() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "p",
                null,
                React.createElement(
                    "strong",
                    null,
                    (0, _loader._)("global.phrases.participant_n", this.props.run.participant.number, null, this.props.run.participant.sportsmen.length)
                )
            ),
            (0, _base.getParticipantDisplay)(this.props.run.participant)
        );
    };

    TourResultsVerboseTableRow.prototype.renderHeadJudgePenalty = function renderHeadJudgePenalty() {
        if (!this.props.run.performed) {
            return null;
        }
        return React.createElement(
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
        );
    };

    TourResultsVerboseTableRow.prototype.renderAcroTable = function renderAcroTable() {
        if (!this.props.run.performed) {
            return null;
        }
        var has_acro_overrides = false;
        var render_acro_table = this.props.tour.scoring_system_name === "rosfarr.acro" || this.props.tour.scoring_system_name === "rosfarr.am_final_acro";
        if (!render_acro_table) {
            return null;
        }
        this.props.run.acrobatics.forEach(function (acro) {
            if (acro.score !== acro.original_score) {
                has_acro_overrides = true;
            }
        });
        if (this.props.run.acrobatics.length === 0) {
            return null;
        }
        var acro_cell_width = 100 / this.props.run.acrobatics.length + "%";
        return React.createElement(
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
                        this.props.run.acrobatics.map(function (acro, idx) {
                            return React.createElement(
                                "td",
                                { key: idx, style: { width: acro_cell_width } },
                                React.createElement(
                                    "p",
                                    { className: "text-center" },
                                    acro.original_score.toFixed(1)
                                )
                            );
                        })
                    ),
                    has_acro_overrides ? React.createElement(
                        "tr",
                        null,
                        this.props.run.acrobatics.map(function (acro, idx) {
                            return React.createElement(
                                "td",
                                { key: idx, style: { width: acro_cell_width } },
                                React.createElement(
                                    "p",
                                    { className: "text-center" },
                                    acro.score.toFixed(1)
                                )
                            );
                        })
                    ) : null
                )
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderAmClassFwScore = function renderAmClassFwScore() {
        if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
            return null;
        }
        return React.createElement(
            "p",
            null,
            React.createElement(
                "strong",
                null,
                __("results.labels.fw_score")
            ),
            ": ",
            this.props.run.verbose_total_score.previous_tour.primary_score.toFixed(2) + " / " + this.props.run.verbose_total_score.previous_tour.secondary_score.toFixed(2),
            " "
        );
    };

    TourResultsVerboseTableRow.prototype.renderAmClassAcroScore = function renderAmClassAcroScore() {
        if (!this.props.run.performed) {
            return null;
        }
        if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
            return null;
        }
        return React.createElement(
            "p",
            null,
            React.createElement(
                "strong",
                null,
                __("results.labels.acro_score")
            ),
            ": ",
            this.props.run.verbose_total_score.current_tour.primary_score.toFixed(2) + " / " + this.props.run.verbose_total_score.current_tour.secondary_score.toFixed(2),
            " "
        );
    };

    TourResultsVerboseTableRow.prototype.renderTotalScore = function renderTotalScore() {
        if (!this.props.run.performed) {
            return null;
        }
        if (this.props.tour.scoring_system_name === "rosfarr.formation") {
            return null;
        }
        if (this.props.tour.scoring_system_name === "rosfarr.formation_acro") {
            return null;
        }
        return React.createElement(
            "p",
            null,
            React.createElement(
                "strong",
                null,
                __("results.labels.total_score"),
                ": ",
                this.props.run.total_score
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderNotPerformedLabel = function renderNotPerformedLabel() {
        if (this.props.run.performed) {
            return null;
        }
        return React.createElement(
            "p",
            null,
            React.createElement(
                "em",
                null,
                __("results.labels.not_performed")
            )
        );
    };

    TourResultsVerboseTableRow.prototype.renderNextTourLabel = function renderNextTourLabel() {
        if (!this.props.has_next_tour) {
            return null;
        }
        React.createElement(
            "p",
            null,
            React.createElement(
                "strong",
                null,
                __("results.labels.next_tour"),
                ": "
            ),
            this.props.results_info.advances ? (0, _loader._)("global.labels.yes") : (0, _loader._)("global.labels.no")
        );
    };

    TourResultsVerboseTableRow.prototype.renderInfoBlock = function renderInfoBlock() {
        return React.createElement(
            "td",
            { className: "info-block", style: this.props.widths.genInfoStyle() },
            this.renderParticipantInfo(),
            this.renderHeadJudgePenalty(),
            this.renderAcroTable(),
            this.renderAmClassFwScore(),
            this.renderAmClassAcroScore(),
            this.renderTotalScore(),
            this.renderNotPerformedLabel(),
            this.renderNextTourLabel()
        );
    };

    TourResultsVerboseTableRow.prototype.render = function render() {
        var _this2 = this;

        var judges_scores = this.props.scores.map(function (score, idx) {
            return React.createElement(
                "td",
                { key: idx, style: _this2.props.widths.genJudgeStyle() },
                _this2.renderScore(_this2.props.discipline_judges[idx], score, _this2.props.results_info.additional_data)
            );
        });
        if (!this.props.run.performed) {
            judges_scores = this.props.scores.map(function (score, idx) {
                return React.createElement(
                    "td",
                    { style: _this2.props.widths.genJudgeStyle(), key: idx },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        "—"
                    )
                );
            });
        }
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                { className: "place", style: this.props.widths.genPlaceStyle() },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    this.props.results_info.place
                )
            ),
            this.renderInfoBlock(),
            judges_scores
        );
    };

    return TourResultsVerboseTableRow;
}(React.Component);

var TourResultsVerboseTable = exports.TourResultsVerboseTable = function (_React$Component2) {
    _inherits(TourResultsVerboseTable, _React$Component2);

    function TourResultsVerboseTable() {
        _classCallCheck(this, TourResultsVerboseTable);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    TourResultsVerboseTable.prototype.render = function render() {
        var tour_wrapper = new _base.TourScoresWrapper(this.props.tour, this.props.results);
        var discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
        var scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
        var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
            return row[0];
        });
        var results_info = tour_wrapper.getResultsInfo();
        var runs = tour_wrapper.getRuns();
        var has_next_tour = this.props.tour.next_tour_id !== null;
        var rows = [];
        var widths = new TourResultsVerboseTableColumnWidths(discipline_judges.length);
        for (var idx = 0; idx < runs.length; ++idx) {
            rows.push(React.createElement(TourResultsVerboseTableRow, {
                key: runs[idx].id,
                tour: this.props.tour,
                run: runs[idx],
                scores: scores_table[idx],
                widths: widths,
                head_judge_score: head_judge_scores[idx],
                results_info: results_info[idx],
                discipline_judges: discipline_judges,
                has_next_tour: has_next_tour }));
        };
        var judges_header = discipline_judges.map(function (dj) {
            return React.createElement(
                "th",
                { key: dj.id, width: widths.genJudgeStyle() },
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
                        { className: "place", width: widths.genPlaceStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.place")
                        )
                    ),
                    React.createElement(
                        "th",
                        { className: "participant", width: widths.genInfoStyle() },
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
    };

    return TourResultsVerboseTable;
}(React.Component);

var TourResultsSemiVerboseTableColumnWidths = function () {
    function TourResultsSemiVerboseTableColumnWidths(n_judges) {
        _classCallCheck(this, TourResultsSemiVerboseTableColumnWidths);

        this.judge_width = Math.round(55 / n_judges);
        this.total_score_width = 14;
        this.place_width = 6;
        this.number_width = 3;
        this.name_width = 100 - this.judge_width * n_judges - this.total_score_width - this.place_width - this.number_width;
    }

    TourResultsSemiVerboseTableColumnWidths.prototype.genPlaceStyle = function genPlaceStyle() {
        return {
            width: this.place_width + "%"
        };
    };

    TourResultsSemiVerboseTableColumnWidths.prototype.genNumberStyle = function genNumberStyle() {
        return {
            width: this.number_width + "%"
        };
    };

    TourResultsSemiVerboseTableColumnWidths.prototype.genNameStyle = function genNameStyle() {
        return {
            width: this.name_width + "%"
        };
    };

    TourResultsSemiVerboseTableColumnWidths.prototype.genTotalScoreStyle = function genTotalScoreStyle() {
        return {
            width: this.total_score_width + "%"
        };
    };

    TourResultsSemiVerboseTableColumnWidths.prototype.genJudgeStyle = function genJudgeStyle() {
        return {
            width: this.judge_width + "%"
        };
    };

    return TourResultsSemiVerboseTableColumnWidths;
}();

var TourResultsSemiVerboseTableRow = function (_React$Component3) {
    _inherits(TourResultsSemiVerboseTableRow, _React$Component3);

    function TourResultsSemiVerboseTableRow() {
        _classCallCheck(this, TourResultsSemiVerboseTableRow);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    TourResultsSemiVerboseTableRow.prototype.renderFormationScore = function renderFormationScore(score, additiolal_data) {
        return React.createElement(
            "p",
            { className: "text-center" },
            React.createElement(
                "strong",
                null,
                additiolal_data.places[score.id]
            ),
            " (",
            score.data.total_score.toFixed(1),
            ")"
        );
    };

    TourResultsSemiVerboseTableRow.prototype.renderScore = function renderScore(judge, score, additiolal_data) {
        if (judge.role === "dance_judge") {
            if (this.props.tour.scoring_system_name === "rosfarr.formation" || this.props.tour.scoring_system_name === "rosfarr.formation_acro") {
                return this.renderFormationScore(score, additiolal_data);
            }
        }
        return React.createElement(
            "p",
            { className: "text-center" },
            score.data.total_score.toFixed(2)
        );
    };

    TourResultsSemiVerboseTableRow.prototype.render = function render() {
        var _this5 = this;

        var judges_scores = this.props.scores.map(function (score, idx) {
            return React.createElement(
                "td",
                { key: idx },
                " ",
                _this5.renderScore(_this5.props.discipline_judges[idx], score, _this5.props.results_info.additional_data),
                " "
            );
        });
        if (!this.props.run.performed) {
            judges_scores = this.props.scores.map(function (score, idx) {
                return React.createElement(
                    "td",
                    { key: idx },
                    React.createElement(
                        "p",
                        { className: "text-center" },
                        "—"
                    )
                );
            });
        }
        var total_score = this.props.run.verbose_total_score;
        return React.createElement(
            "tr",
            null,
            React.createElement(
                "td",
                { className: "place" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    this.props.results_info.place
                )
            ),
            React.createElement(
                "td",
                { className: "number" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    this.props.run.participant.number
                )
            ),
            React.createElement(
                "td",
                { className: "participant" },
                (0, _base.getParticipantDisplay)(this.props.run.participant)
            ),
            this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro" ? React.createElement(
                "td",
                { className: "total-score" },
                function () {
                    if (!_this5.props.run.performed) {
                        return React.createElement(
                            "p",
                            { className: "text-center" },
                            "—"
                        );
                    }
                    if (_this5.props.tour.scoring_system_name === "rosfarr.am_final_acro") {
                        return React.createElement(
                            "p",
                            { className: "text-center" },
                            React.createElement(
                                "em",
                                null,
                                __("results.labels.fw_score_short"),
                                ": ",
                                total_score.previous_tour.primary_score.toFixed(2),
                                " / ",
                                total_score.previous_tour.secondary_score.toFixed(2),
                                React.createElement("br", null)
                            ),
                            React.createElement(
                                "strong",
                                null,
                                total_score.primary_score.toFixed(2)
                            ),
                            " /",
                            " ",
                            total_score.secondary_score.toFixed(2)
                        );
                    }
                    return React.createElement(
                        "p",
                        { className: "text-center" },
                        React.createElement(
                            "strong",
                            null,
                            total_score.primary_score.toFixed(2)
                        ),
                        " /",
                        " ",
                        total_score.secondary_score.toFixed(2)
                    );
                }()
            ) : null,
            judges_scores,
            React.createElement(
                "td",
                { className: "card" },
                React.createElement(
                    "p",
                    { className: "text-center" },
                    this.props.head_judge_score && this.props.run.performed ? this.props.head_judge_score.data.total_score : React.createElement(
                        "span",
                        null,
                        "—"
                    )
                )
            )
        );
    };

    return TourResultsSemiVerboseTableRow;
}(React.Component);

var TourResultsSemiVerboseTable = exports.TourResultsSemiVerboseTable = function (_React$Component4) {
    _inherits(TourResultsSemiVerboseTable, _React$Component4);

    function TourResultsSemiVerboseTable() {
        _classCallCheck(this, TourResultsSemiVerboseTable);

        return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
    }

    TourResultsSemiVerboseTable.prototype.renderAdvancesHeader = function renderAdvancesHeader(has_next_tour, prev_row, next_row, prev_run, next_run, idx, n_cols) {
        var prev_status = prev_row ? prev_run.performed ? prev_row.advances ? "advanced" : "not_advanced" : "not_performed" : null;
        var next_status = next_run.performed ? next_row.advances ? "advanced" : "not_advanced" : "not_performed";
        var result = prev_status !== next_status ? next_status === "not_performed" ? React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_not_performed")
        ) : has_next_tour ? next_status === "not_advanced" ? React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_not_advanced")
        ) : React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_advanced")
        ) : null : null;
        if (result === null) {
            return null;
        }
        return React.createElement(
            "tr",
            { key: "NT" + idx },
            React.createElement(
                "th",
                { className: "advances-header", colSpan: n_cols },
                result
            )
        );
    };

    TourResultsSemiVerboseTable.prototype.render = function render() {
        var tour_wrapper = new _base.TourScoresWrapper(this.props.tour, this.props.results);
        var discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
        var scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
        var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
            return row[0];
        });
        var results_info = tour_wrapper.getResultsInfo();
        var runs = tour_wrapper.getRuns();
        var has_next_tour = this.props.tour.next_tour_id !== null;
        var has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro";
        var widths = new TourResultsSemiVerboseTableColumnWidths(discipline_judges.length + 1);
        var judges_header = discipline_judges.map(function (dj) {
            var suffix = (0, _base.getScoringType)(dj, this.props.tour.scoring_system_name) === "acro" ? " (A)" : "";
            return React.createElement(
                "th",
                { key: dj.id, style: widths.genJudgeStyle() },
                React.createElement(
                    "p",
                    null,
                    dj.judge.number + suffix
                )
            );
        }.bind(this));
        var rows = [];
        for (var idx = 0; idx < runs.length; ++idx) {
            rows.push(this.renderAdvancesHeader(has_next_tour, results_info[idx - 1], results_info[idx], runs[idx - 1], runs[idx], idx, 4 + discipline_judges.length + has_total_score));
            rows.push(React.createElement(TourResultsSemiVerboseTableRow, {
                key: runs[idx].id,
                head_judge_score: head_judge_scores[idx],
                results_info: results_info[idx],
                tour: this.props.tour,
                run: runs[idx],
                scores: scores_table[idx],
                discipline_judges: discipline_judges,
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
                        { className: "place", style: widths.genPlaceStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.place")
                        )
                    ),
                    React.createElement(
                        "th",
                        { className: "number", style: widths.genNumberStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.number")
                        )
                    ),
                    React.createElement(
                        "th",
                        { className: "participant", style: widths.genNameStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.participant_name")
                        )
                    ),
                    has_total_score ? React.createElement(
                        "th",
                        { className: "total-score", style: widths.genTotalScoreStyle() },
                        React.createElement(
                            "p",
                            null,
                            __("results.labels.total_score")
                        )
                    ) : null,
                    judges_header,
                    React.createElement(
                        "th",
                        { className: "card", style: widths.genJudgeStyle() },
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
    };

    return TourResultsSemiVerboseTable;
}(React.Component);

var TourResultsTableRow = function (_React$Component5) {
    _inherits(TourResultsTableRow, _React$Component5);

    function TourResultsTableRow() {
        _classCallCheck(this, TourResultsTableRow);

        return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
    }

    TourResultsTableRow.prototype.render = function render() {
        var card = this.props.run.performed ? this.props.head_judge_score ? this.props.head_judge_score.data.total_score : "0" : React.createElement(
            "span",
            null,
            "—"
        );
        var total_score = this.props.has_total_score ? this.props.run.performed ? React.createElement(
            "p",
            { className: "text-center" },
            React.createElement(
                "strong",
                null,
                this.props.run.verbose_total_score.primary_score.toFixed(2)
            ),
            " /",
            " ",
            this.props.run.verbose_total_score.secondary_score.toFixed(2)
        ) : React.createElement(
            "p",
            { className: "text-center" },
            "—"
        ) : null;
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
                { className: "w-30 participant" },
                (0, _base.getParticipantDisplay)(this.props.run.participant)
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
                total_score
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
    };

    return TourResultsTableRow;
}(React.Component);

var TourResultsTable = exports.TourResultsTable = function (_React$Component6) {
    _inherits(TourResultsTable, _React$Component6);

    function TourResultsTable() {
        _classCallCheck(this, TourResultsTable);

        return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
    }

    TourResultsTable.prototype.renderAdvancesHeader = function renderAdvancesHeader(has_next_tour, prev_row, next_row, prev_run, next_run, idx, n_cols) {
        var prev_status = prev_row ? prev_run.performed ? prev_row.advances ? "advanced" : "not_advanced" : "not_performed" : null;
        var next_status = next_run.performed ? next_row.advances ? "advanced" : "not_advanced" : "not_performed";
        var result = prev_status !== next_status ? next_status === "not_performed" ? React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_not_performed")
        ) : has_next_tour ? next_status === "not_advanced" ? React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_not_advanced")
        ) : React.createElement(
            "p",
            { className: "text-left" },
            __("results.headers.participants_advanced")
        ) : null : null;
        if (result === null) {
            return null;
        }
        return React.createElement(
            "tr",
            { key: "NT" + idx },
            React.createElement(
                "th",
                { className: "advances-header", colSpan: n_cols },
                result
            )
        );
    };

    TourResultsTable.prototype.render = function render() {
        var tour_wrapper = new _base.TourScoresWrapper(this.props.tour, this.props.results);
        var head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map(function (row) {
            return row[0];
        });
        var results_info = tour_wrapper.getResultsInfo();
        var runs = tour_wrapper.getRuns();
        var has_next_tour = this.props.tour.next_tour_id !== null;
        var has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro";
        var rows = [];
        for (var idx = 0; idx < runs.length; ++idx) {
            rows.push(this.renderAdvancesHeader(has_next_tour, results_info[idx - 1], results_info[idx], runs[idx - 1], runs[idx], idx, 5 + has_total_score));
            rows.push(React.createElement(TourResultsTableRow, {
                key: runs[idx].id,
                head_judge_score: head_judge_scores[idx],
                results_info: results_info[idx],
                run: runs[idx],
                has_next_tour: has_next_tour,
                has_total_score: has_total_score }));
        };
        return React.createElement(
            "div",
            { className: "brief-table" },
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
                            { className: "w-30 participant" },
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
            )
        );
    };

    return TourResultsTable;
}(React.Component);

},{"common/rosfarr/base":6,"i10n/loader":7}],2:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.TourResultsBody = exports.TourResultsButtons = undefined;

var _loader = require("i10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _printable = require("ui/printable");

var _docx = require("common/docx");

var _tour_results = require("./rosfarr/tour_results");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TourResultsButtons = exports.TourResultsButtons = function (_React$Component) {
    _inherits(TourResultsButtons, _React$Component);

    function TourResultsButtons() {
        _classCallCheck(this, TourResultsButtons);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    TourResultsButtons.prototype.signal = function signal(message) {
        var _this2 = this;

        return function () {
            return _this2.props.onSignal(message);
        }.bind(this);
    };

    TourResultsButtons.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "button",
                { className: "btn btn-primary", onClick: this.signal("docx") },
                "DOCX"
            )
        );
    };

    return TourResultsButtons;
}(React.Component);

var TourResultsBody = exports.TourResultsBody = function (_React$Component2) {
    _inherits(TourResultsBody, _React$Component2);

    // Initialization

    function TourResultsBody(props) {
        _classCallCheck(this, TourResultsBody);

        var _this3 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this3.state = {
            tour: null,
            results: null
        };
        _this3.TOUR_SCHEMA = {
            discipline: {
                competition: {},
                discipline_judges: {
                    judge: {}
                }
            },
            runs: {
                acrobatics: {},
                scores: {},
                participant: {
                    club: {}
                }
            }
        };
        return _this3;
    }

    TourResultsBody.prototype.componentWillMount = function componentWillMount() {
        var _this4 = this;

        this.storage = _storage.storage.getDomain("results_" + this.props.tour_id);
        this.reload_listener = _message_dispatcher.message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = _message_dispatcher.message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.results_change_listener = _message_dispatcher.message_dispatcher.addListener("tour_results_changed reload_data", function (message) {
            if (!message || message.tour_id === this.props.tour_id) {
                this.loadResults();
            }
        }.bind(this));
        this.loadData();
        this.loadResults();
        if (this.props.autoDocx) {
            (function () {
                var interval_id = setInterval(function () {
                    if (_this4.refs.content) {
                        clearInterval(interval_id);
                        _this4.createDocx(_this4.props.autoDocx.filename);
                        _this4.props.autoDocx.callback(_this4.props.autoDocx.filename);
                    }
                }, 500);
            })();
        }
    };

    TourResultsBody.prototype.componentWillUnmount = function componentWillUnmount() {
        _message_dispatcher.message_dispatcher.removeListener(this.reload_listener);
        _message_dispatcher.message_dispatcher.removeListener(this.db_update_listener);
        _message_dispatcher.message_dispatcher.removeListener(this.results_change_listener);
        _storage.storage.delDomain("results_" + this.props.tour_id);
    };

    TourResultsBody.prototype.reloadFromStorage = function reloadFromStorage() {
        var serialized = this.storage.get("Tour").by_id(this.props.tour_id).serialize(this.TOUR_SCHEMA);
        this.setState({
            tour: serialized
        });
    };

    TourResultsBody.prototype.loadResults = function loadResults() {
        (0, _api.Api)("tour.get_results", { tour_id: this.props.tour_id }).onSuccess(function (new_results) {
            this.setState({
                "results": new_results
            });
            this.reloadFromStorage();
        }.bind(this)).send();
    };

    TourResultsBody.prototype.loadData = function loadData() {
        (0, _api.Api)("tour.get", { tour_id: this.props.tour_id, children: this.TOUR_SCHEMA }).addToDB("Tour", this.props.tour_id, this.storage).onSuccess(this.reloadFromStorage.bind(this)).send();
    };

    // Listeners

    TourResultsBody.prototype.onSignal = function onSignal(message) {
        switch (message) {
            case "docx":
                this.createDocx();
                break;
            default:
                console.log("Unknown message:", message);
        }
    };

    // Rendering

    TourResultsBody.prototype.renderNonFinalizedWarning = function renderNonFinalizedWarning() {
        if (!this.state.tour.finalized) {
            return React.createElement(
                "div",
                { className: "alert alert-danger" },
                (0, _loader._)("results.alerts.not_finalized")
            );
        }
    };

    TourResultsBody.prototype.render = function render() {
        // eslint-disable-line react/sort-comp
        if (this.state.tour === null || this.state.results === null) {
            return React.createElement(_components.Loader, null);
        }
        var table = null;
        if (this.props.verbosity === "3") {
            table = React.createElement(_tour_results.TourResultsVerboseTable, this.state);
        } else if (this.props.verbosity === "2") {
            table = React.createElement(_tour_results.TourResultsSemiVerboseTable, this.state);
        } else {
            table = React.createElement(_tour_results.TourResultsTable, this.state);
        }
        this.rendered = true;
        if (this.props.tableOnly) {
            return React.createElement(
                "div",
                { className: "tour-results", ref: "content" },
                this.renderNonFinalizedWarning(),
                table
            );
        }
        var body = React.createElement(
            "div",
            { className: "tour-results p-content", ref: "content" },
            this.renderNonFinalizedWarning(),
            table
        );
        return this.props.printable ? React.createElement(_printable.Printable, {
            ref: "printable",
            header: this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date,
            title1: (0, _loader._)("admin.headers.tour_results"),
            title2: this.state.tour.discipline.name,
            title3: this.state.tour.name,
            body: body }) : body;
    };

    TourResultsBody.prototype.createDocx = function createDocx() {
        var filename = arguments.length <= 0 || arguments[0] === undefined ? "tour-results.docx" : arguments[0];

        (0, _docx.Docx)(filename).setMargins([10, 10, 15, 10]).setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date).setTitle1((0, _loader._)("admin.headers.tour_results")).setTitle2(this.state.tour.discipline.name).setTitle3(this.state.tour.name).setBody(ReactDOM.findDOMNode(this.refs.content).innerHTML).addStyle(".bordered-table", "font-size", this.props.verbosity === "1" ? "12pt" : "9pt").addStyle(".bordered-table .acro-table td", "font-size", "9pt").addStyle(".bordered-table .acro-table td", "padding", "0 3pt").addStyle(".bordered-table .acro-table td", "border", "0.5pt solid black").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "font-size", "9pt").addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "border", "none").addStyle(".bordered-table .score-breakdown th", "padding", "0 1pt 0 0").addStyle(".bordered-table .score-breakdown td", "padding", "0 0 0 1pt").addStyle(".score-breakdown th", "text-align", "right").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown td", "text-align", "left").addStyle(".score-breakdown", "width", "50pt").addStyle(".advances-header", "background-color", "#ddd").addStyle(".total-score", "font-weight", "bold").addStyle(".head_judge", "width", "5%").addStyle(".dance_judge", "width", "8%").addStyle(".acro_judge", "width", "8%").save();
    };

    return TourResultsBody;
}(React.Component);

},{"./rosfarr/tour_results":1,"common/docx":5,"i10n/loader":7,"server/api":10,"server/message_dispatcher":11,"server/storage":12,"ui/components":13,"ui/printable":15}],3:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.Judge = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("i10n/loader");

var _api = require("server/api");

var _storage = require("server/storage");

var _message_dispatcher = require("server/message_dispatcher");

var _components = require("ui/components");

var _dialogs = require("ui/dialogs");

var _tablet_components = require("ui/tablet_components");

var _tour_results = require("admin/judging/tour_results");

var _rosfarr = require("./rosfarr");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Judge = exports.Judge = function (_React$Component) {
    _inherits(Judge, _React$Component);

    _createClass(Judge, null, [{
        key: "propTypes",
        get: function get() {
            return {
                judge_id: React.PropTypes.number.isRequired
            };
        }
    }]);

    function Judge(props) {
        _classCallCheck(this, Judge);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.TOUR_SCHEMA = {
            runs: {
                participant: {},
                scores: {},
                acrobatics: {}
            },
            discipline: {
                discipline_judges: {
                    judge: {}
                }
            }
        };
        _this.state = {
            tour: null,
            judge: null,
            discipline_judge: null,
            current_heat: 1,
            page: "default"
        };
        _this.active_tour_id = null;
        _message_dispatcher.message_dispatcher.addListener("db_update", _this.reloadFromStorage.bind(_this, false));
        _message_dispatcher.message_dispatcher.addListener("reload_data", _this.loadData.bind(_this));
        _message_dispatcher.message_dispatcher.addListener("active_tour_update", _this.dispatchActiveTourUpdate.bind(_this, false));
        _this.loadData();
        return _this;
    }

    // Loaders

    Judge.prototype.reloadFromStorage = function reloadFromStorage(reset_heat) {
        var st_judge = _storage.storage.get("Judge").by_id(this.props.judge_id);
        if (!st_judge) {
            return;
        }
        var state_upd = {};
        state_upd["judge"] = st_judge.serialize({
            competition: {}
        });
        state_upd["competition"] = state_upd["judge"].competition;
        if (this.active_tour_id !== null) {
            var st_tour = _storage.storage.get("Tour").by_id(this.active_tour_id);
            if (st_tour) {
                var tour = st_tour.serialize(this.TOUR_SCHEMA);
                if (tour.discipline && tour.discipline.discipline_judges) {
                    state_upd["tour"] = tour;
                    // Find discipline judge
                    state_upd["discipline_judge"] = null;
                    tour.discipline.discipline_judges.forEach(function (dj) {
                        if (dj.judge.id === this.props.judge_id) {
                            state_upd["discipline_judge"] = dj;
                        }
                    }.bind(this));
                    if (reset_heat) {
                        var discipline_judge = state_upd["discipline_judge"];
                        if (!discipline_judge || discipline_judge.role === "head_judge") {
                            state_upd["current_heat"] = 1;
                        } else {
                            var discipline_judge_id = discipline_judge && discipline_judge.id;
                            state_upd["current_heat"] = this.getFirstNonConfirmedHeat(tour.runs, discipline_judge_id) || 1;
                        }
                        state_upd["page"] = "default";
                    }
                }
            }
        }
        this.setState(state_upd);
    };

    Judge.prototype.updateActiveTour = function updateActiveTour(force_reload, new_active_tour_id) {
        if (new_active_tour_id === null) {
            this.setState({
                tour: null,
                discipline_judge: null
            });
            this.active_tour_id = new_active_tour_id;
            _storage.storage.del("Tour");
            _storage.storage.del("Participant");
            _storage.storage.del("Score");
            _storage.storage.del("Run");
            _storage.storage.del("Discipline");
            _storage.storage.del("DisciplineJudge");
            return;
        }
        if (force_reload || new_active_tour_id !== this.active_tour_id) {
            var old_active_tour_id = this.active_tour_id;
            this.active_tour_id = new_active_tour_id;
            (0, _api.Api)("tour.get", { tour_id: this.active_tour_id, children: this.TOUR_SCHEMA }).addToDB("Tour", this.active_tour_id).onSuccess(this.reloadFromStorage.bind(this, new_active_tour_id !== old_active_tour_id)).send();
        }
    };

    Judge.prototype.loadData = function loadData() {
        (0, _api.Api)("judge.get", { judge_id: this.props.judge_id, children: { competition: {} } }).addToDB("Judge", this.props.judge_id).onSuccess(this.reloadFromStorage.bind(this, false)).send();
        (0, _api.Api)("tour.find_active", {}).onSuccess(this.dispatchActiveTourUpdate.bind(this, true)).send();
    };

    // Dispatchers

    Judge.prototype.dispatchActiveTourUpdate = function dispatchActiveTourUpdate(force_reload, data) {
        this.updateActiveTour(force_reload, data["tour_id"]);
    };

    // Listeners

    Judge.prototype.onScoreUpdate = function onScoreUpdate(score_id, new_score) {
        var request = {
            score_data: new_score,
            force: false
        };
        (0, _api.Api)("score.set", { score_id: score_id, data: request }).send();
    };

    Judge.prototype.onScoreConfirm = function onScoreConfirm(score_id) {
        (0, _api.Api)("score.confirm", { score_id: score_id }).send();
    };

    // Actions

    Judge.prototype.toPrevHeat = function toPrevHeat() {
        this.setState({
            current_heat: this.state.current_heat - 1
        });
    };

    Judge.prototype.toNextHeat = function toNextHeat() {
        this.setState({
            current_heat: this.state.current_heat + 1
        });
    };

    Judge.prototype.switchPage = function switchPage(page) {
        this.setState({
            page: page
        });
    };

    Judge.prototype.stopTour = function stopTour() {
        var _this2 = this;

        (0, _dialogs.showConfirm)((0, _loader._)("tablet.confirms.stop_tour"), function () {
            if (_this2.state.tour) {
                (0, _api.Api)("tour.stop", { tour_id: _this2.state.tour.id }).onSuccess(function () {
                    return swal.close();
                }).send();
            }
        });
    };

    Judge.prototype.finalizeTour = function finalizeTour() {
        var _this3 = this;

        (0, _dialogs.showConfirm)((0, _loader._)("tablet.confirms.finalize_tour"), function () {
            if (_this3.state.tour) {
                (0, _api.Api)("tour.finalize", { tour_id: _this3.state.tour.id }).onSuccess(function () {
                    return swal.close();
                }).send();
            }
        });
    };

    Judge.prototype.stopTourAndStartNext = function stopTourAndStartNext() {
        var _this4 = this;

        (0, _dialogs.showConfirm)((0, _loader._)("tablet.confirms.stop_tour_and_start_next"), function () {
            if (_this4.state.tour) {
                (function () {
                    var tour_id = _this4.state.tour.id;
                    (0, _api.Api)("tour.stop", { tour_id: tour_id }).onSuccess(function () {
                        (0, _api.Api)("tour.start_next_after", { tour_id: tour_id }).onSuccess(function () {
                            return swal.close();
                        }).send();
                    }).send();
                })();
            }
        });
    };

    Judge.prototype.finalizeTourAndStartNext = function finalizeTourAndStartNext() {
        var _this5 = this;

        (0, _dialogs.showConfirm)((0, _loader._)("tablet.confirms.finalize_tour_and_start_next"), function () {
            if (_this5.state.tour) {
                (function () {
                    var tour_id = _this5.state.tour.id;
                    (0, _api.Api)("tour.finalize", { tour_id: tour_id }).onSuccess(function () {
                        (0, _api.Api)("tour.start_next_after", { tour_id: tour_id }).onSuccess(function () {
                            return swal.close();
                        }).send();
                    }).send();
                })();
            }
        });
    };

    // Helpers

    Judge.prototype.getHeatsCount = function getHeatsCount(runs) {
        var _Math;

        runs = runs || this.state.tour.runs;
        return (_Math = Math).max.apply(_Math, runs.map(function (run) {
            return run.heat;
        }));
    };

    Judge.prototype.getFirstNonConfirmedHeat = function getFirstNonConfirmedHeat(runs, discipline_judge_id) {
        runs = runs || this.state.tour.runs;
        discipline_judge_id = discipline_judge_id || this.state.discipline_judge.id;
        for (var i = 0; i < runs.length; ++i) {
            for (var j = 0; j < runs[i].scores.length; ++j) {
                var score = runs[i].scores[j];
                if (score.discipline_judge_id === discipline_judge_id && !score.confirmed && runs[i].performed) {
                    return runs[i].heat;
                }
            }
        }
        return this.getHeatsCount(runs);
    };

    Judge.prototype.hasUnconfirmedScores = function hasUnconfirmedScores() {
        var runs = this.state.tour.runs;
        var confirmed_scores = {};
        for (var i = runs.length - 1; i >= 0; --i) {
            for (var j = 0; j < runs[i].scores.length; ++j) {
                var score = runs[i].scores[j];
                if (score.confirmed) {
                    confirmed_scores[score.discipline_judge_id] = true;
                }
            }
            if (Object.keys(confirmed_scores).length > 0) {
                if (i === 0) {
                    return false;
                }
                for (var j = 0; j < runs[i].scores.length; ++j) {
                    var score = runs[i - 1].scores[j];
                    if (score.confirmed && !confirmed_scores[score.discipline_judge_id]) {
                        return true;
                    }
                }
                return false;
            }
        }
        return false;
    };

    // Rendering

    Judge.prototype.renderResults = function renderResults() {
        return React.createElement(
            "div",
            { className: "body results" },
            React.createElement(_tour_results.TourResultsBody, { tour_id: this.state.tour.id, verbosity: "2", tableOnly: true })
        );
    };

    Judge.prototype.renderHasUnconfirmedScoresWarning = function renderHasUnconfirmedScoresWarning() {
        if (!this.hasUnconfirmedScores()) {
            return null;
        }
        return React.createElement(
            "div",
            { className: "warning" },
            React.createElement(
                "div",
                { className: "content" },
                (0, _loader._)("tablet.alerts.has_unconfirmed_scores")
            )
        );
    };

    Judge.prototype.renderActions = function renderActions() {
        return React.createElement(
            "div",
            { className: "body actions" },
            this.renderHasUnconfirmedScoresWarning(),
            React.createElement(
                "div",
                { className: "item" },
                React.createElement(
                    "button",
                    _extends({ className: "tbtn btn-primary", type: "button"
                    }, (0, _tablet_components.onTouchOrClick)(this.stopTour.bind(this))),
                    (0, _loader._)("tablet.buttons.stop_tour")
                )
            ),
            React.createElement(
                "div",
                { className: "item" },
                React.createElement(
                    "button",
                    _extends({ className: "tbtn btn-primary", type: "button"
                    }, (0, _tablet_components.onTouchOrClick)(this.finalizeTour.bind(this))),
                    (0, _loader._)("tablet.buttons.finalize_tour")
                )
            ),
            React.createElement(
                "div",
                { className: "item" },
                React.createElement(
                    "button",
                    _extends({ className: "tbtn btn-primary", type: "button"
                    }, (0, _tablet_components.onTouchOrClick)(this.stopTourAndStartNext.bind(this))),
                    (0, _loader._)("tablet.buttons.stop_tour_and_start_next")
                )
            ),
            React.createElement(
                "div",
                { className: "item" },
                React.createElement(
                    "button",
                    _extends({ className: "tbtn btn-primary", type: "button"
                    }, (0, _tablet_components.onTouchOrClick)(this.finalizeTourAndStartNext.bind(this))),
                    (0, _loader._)("tablet.buttons.finalize_tour_and_start_next")
                )
            )
        );
    };

    Judge.prototype.renderHeader = function renderHeader() {
        var btn_prev = null;
        var btn_next = null;
        var judge = this.state.judge;
        var judge_number = judge.role_description || (0, _loader._)("global.phrases.judge_n", judge.number);
        if (this.state.page !== "results" && this.state.page !== "actions") {
            if (this.state.current_heat > 1) {
                btn_prev = React.createElement(
                    "button",
                    _extends({ className: "btn btn-primary pull-left" }, (0, _tablet_components.onTouchOrClick)(this.toPrevHeat.bind(this))),
                    (0, _loader._)("tablet.buttons.prev_heat")
                );
            }
            if (this.state.current_heat < this.getHeatsCount() && (this.state.discipline_judge.role === "head_judge" || this.getFirstNonConfirmedHeat() > this.state.current_heat)) {
                btn_next = React.createElement(
                    "button",
                    _extends({ className: "btn btn-primary pull-right" }, (0, _tablet_components.onTouchOrClick)(this.toNextHeat.bind(this))),
                    (0, _loader._)("tablet.buttons.next_heat")
                );
            }
        }
        var current_tour = React.createElement(
            "div",
            { className: "header" },
            React.createElement(
                "table",
                { className: "full-width" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "h1",
                                null,
                                judge_number
                            ),
                            React.createElement(
                                "h2",
                                null,
                                judge.name
                            )
                        ),
                        React.createElement(
                            "td",
                            null,
                            React.createElement(
                                "h1",
                                null,
                                this.state.tour.discipline.name
                            ),
                            React.createElement(
                                "h2",
                                null,
                                this.state.tour.name,
                                "       ",
                                (0, _loader._)("tablet.headers.heat"),
                                ": ",
                                this.state.current_heat,
                                " / ",
                                this.getHeatsCount()
                            )
                        )
                    )
                )
            )
        );
        return React.createElement(
            "header",
            null,
            btn_prev,
            btn_next,
            current_tour
        );
    };

    Judge.prototype.renderSplashScreen = function renderSplashScreen() {
        var judge = this.state.judge;
        var judge_number = judge.role_description || (0, _loader._)("global.phrases.judge_n", judge.number);
        return React.createElement(
            "div",
            { className: "judge-tablet" },
            React.createElement(
                "header",
                null,
                React.createElement(
                    "a",
                    { className: "btn btn-primary pull-left", href: "/" },
                    (0, _loader._)("tablet.buttons.to_start_page")
                ),
                React.createElement(
                    "div",
                    { className: "header" },
                    React.createElement(
                        "h1",
                        null,
                        this.state.competition.name
                    )
                ),
                React.createElement("div", { className: "clearfix" })
            ),
            React.createElement(
                "div",
                { className: "splash-screen" },
                React.createElement(
                    "div",
                    { className: "judge-number" },
                    judge_number
                ),
                React.createElement(
                    "div",
                    { className: "judge-name" },
                    this.state.judge.name
                ),
                this.state.tour ? React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "div",
                        { className: "not-judging-discipline" },
                        this.state.tour.discipline.name
                    ),
                    React.createElement(
                        "div",
                        { className: "not-judging-tour" },
                        this.state.tour.name
                    ),
                    React.createElement(
                        "div",
                        { className: "not-judging-message" },
                        (0, _loader._)("tablet.messages.not_judging_discipline")
                    )
                ) : null
            )
        );
    };

    Judge.prototype.renderScoringLayout = function renderScoringLayout() {
        if (this.state.page === "results") {
            return this.renderResults();
        }
        if (this.state.page === "actions") {
            return this.renderActions();
        }
        var cells = this.state.tour.runs.filter(function (run) {
            return run.heat === this.state.current_heat;
        }.bind(this)).map(function (run) {
            var scores_map = {};
            run.scores.forEach(function (score_data) {
                scores_map[score_data.discipline_judge_id] = score_data;
            });
            var current_score = scores_map[this.state.discipline_judge.id];
            var header = (0, _loader._)("global.phrases.participant_n", run.participant.number, run.participant.name, run.participant.sportsmen.length);
            if (typeof scores_map[this.state.discipline_judge.id] === "undefined") {
                return React.createElement(
                    "td",
                    { key: run.id },
                    React.createElement(
                        "h2",
                        null,
                        header
                    ),
                    React.createElement(
                        "h3",
                        { className: "text-center" },
                        (0, _loader._)("tablet.messages.not_judging_participant")
                    )
                );
            }
            return React.createElement(
                "td",
                { key: run.id },
                React.createElement(
                    "h2",
                    null,
                    header
                ),
                React.createElement(_rosfarr.TabletScoreInput, {
                    discipline_judge: this.state.discipline_judge,
                    all_discipline_judges: this.state.tour.discipline.discipline_judges,
                    score: current_score,
                    readOnly: current_score.confirmed,
                    all_scores: scores_map,
                    run: run,
                    page: this.state.page,
                    scoring_system_name: this.state.tour.scoring_system_name,
                    onScoreUpdate: this.onScoreUpdate.bind(this, current_score.id),
                    onScoreConfirm: this.onScoreConfirm.bind(this, current_score.id) })
            );
        }.bind(this));
        var single_run_class = cells.length === 1 ? " single-run" : "";
        if (cells.length > 3) {
            var _ret3 = function () {
                var first_row = [];
                var second_row = [];
                cells.forEach(function (cell, idx) {
                    if (idx % 2 === 0) {
                        first_row.push(cell);
                    } else {
                        second_row.push(cell);
                    }
                });
                var half_width = 100 / (2 * first_row.length + 1);
                var first_width = undefined,
                    second_width = undefined;
                if (first_row.length === second_row.length) {
                    first_width = 100 - half_width;
                    second_width = 100 - half_width;
                } else {
                    first_width = 100;
                    second_width = 100 - 2 * half_width;
                }
                return {
                    v: React.createElement(
                        "div",
                        { className: "body" },
                        React.createElement(
                            "table",
                            { className: "main-table", style: { width: first_width + "%", "marginLeft": 0 } },
                            React.createElement(
                                "tbody",
                                null,
                                React.createElement(
                                    "tr",
                                    null,
                                    first_row
                                )
                            )
                        ),
                        React.createElement(
                            "table",
                            { className: "main-table", style: { width: second_width + "%", "marginRight": first_row.length === second_row.length ? 0 : "auto" } },
                            React.createElement(
                                "tbody",
                                null,
                                React.createElement(
                                    "tr",
                                    null,
                                    second_row
                                )
                            )
                        )
                    )
                };
            }();

            if ((typeof _ret3 === "undefined" ? "undefined" : _typeof(_ret3)) === "object") return _ret3.v;
        }
        return React.createElement(
            "div",
            { className: "body" },
            React.createElement(
                "table",
                { className: "main-table" + single_run_class },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        cells
                    )
                )
            ),
            ";"
        );
    };

    Judge.prototype.renderFooter = function renderFooter() {
        if (this.state.discipline_judge === null) {
            return null;
        }
        if (this.state.discipline_judge.role === "head_judge") {
            return React.createElement(
                "div",
                { className: "footer page-selector" },
                React.createElement(
                    "button",
                    _extends({
                        className: "btn" + (this.state.page === "default" ? " active" : "")
                    }, (0, _tablet_components.onTouchOrClick)(this.switchPage.bind(this, "default"))),
                    (0, _loader._)("tablet.pages.heats")
                ),
                React.createElement(
                    "button",
                    _extends({
                        className: "btn" + (this.state.page === "results" ? " active" : "")
                    }, (0, _tablet_components.onTouchOrClick)(this.switchPage.bind(this, "results"))),
                    (0, _loader._)("tablet.pages.results")
                ),
                React.createElement(
                    "button",
                    _extends({
                        className: "btn" + (this.state.page === "actions" ? " active" : "")
                    }, (0, _tablet_components.onTouchOrClick)(this.switchPage.bind(this, "actions"))),
                    (0, _loader._)("tablet.pages.actions")
                )
            );
        }
        if (this.state.discipline_judge.role !== "tech_judge" || this.state.tour.scoring_system_name !== "rosfarr.acro" && this.state.tour.scoring_system_name !== "rosfarr.am_final_acro") {
            return null;
        }
        return React.createElement(
            "div",
            { className: "footer page-selector" },
            React.createElement(
                "button",
                _extends({
                    className: "btn" + (this.state.page === "default" ? " active" : "")
                }, (0, _tablet_components.onTouchOrClick)(this.switchPage.bind(this, "default"))),
                (0, _loader._)("tablet.pages.dance")
            ),
            React.createElement(
                "button",
                _extends({
                    className: "btn" + (this.state.page === "acro" ? " active" : "")
                }, (0, _tablet_components.onTouchOrClick)(this.switchPage.bind(this, "acro"))),
                (0, _loader._)("tablet.pages.acrobatics")
            )
        );
    };

    Judge.prototype.render = function render() {
        if (this.state.judge === null) {
            return React.createElement(_components.Loader, null);
        }
        if (this.state.tour === null) {
            return this.renderSplashScreen();
        }
        if (this.state.discipline_judge === null) {
            return this.renderSplashScreen();
        }
        return React.createElement(
            "div",
            { className: "judge-tablet" },
            this.renderHeader(),
            this.renderScoringLayout(),
            this.renderFooter()
        );
    };

    return Judge;
}(React.Component);

},{"./rosfarr":4,"admin/judging/tour_results":2,"i10n/loader":7,"server/api":10,"server/message_dispatcher":11,"server/storage":12,"ui/components":13,"ui/dialogs":14,"ui/tablet_components":16}],4:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.TabletScoreInput = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _loader = require("i10n/loader");

var _api = require("server/api");

var _tablet_components = require("ui/tablet_components");

var _base = require("common/rosfarr/base");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function __() {
    var args = [];
    for (var idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _loader._.apply(undefined, ["scoring_systems.rosfarr." + arguments[0]].concat(args));
}

// Head judge

var HeadJudgeActobaticOverrides = function (_React$Component) {
    _inherits(HeadJudgeActobaticOverrides, _React$Component);

    function HeadJudgeActobaticOverrides() {
        _classCallCheck(this, HeadJudgeActobaticOverrides);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    HeadJudgeActobaticOverrides.prototype.getAcrobaticOverrides = function getAcrobaticOverrides() {
        return this.props.acrobatics.map(function (acro, idx) {
            return { idx: idx + 1, acrobatic: acro };
        }).filter(function (acro) {
            return acro.acrobatic.original_score !== acro.acrobatic.score;
        });
    };

    HeadJudgeActobaticOverrides.prototype.render = function render() {
        var acrobatic_overrides = this.getAcrobaticOverrides();
        if (acrobatic_overrides.length === 0) {
            return null;
        }
        return React.createElement(
            "div",
            null,
            React.createElement("div", { className: "spacer" }),
            React.createElement(
                "h3",
                null,
                __("tablet.head_judge.acrobatic_overrides")
            ),
            React.createElement(
                "table",
                { className: "full-width" },
                React.createElement(
                    "tbody",
                    null,
                    acrobatic_overrides.map(function (acro) {
                        return React.createElement(
                            "tr",
                            { key: acro.idx },
                            React.createElement(
                                "td",
                                { className: "w-5" },
                                acro.idx
                            ),
                            React.createElement(
                                "td",
                                null,
                                acro.acrobatic.description
                            ),
                            React.createElement(
                                "td",
                                { className: "w-10 text-right" },
                                acro.acrobatic.original_score.toFixed(1)
                            ),
                            React.createElement(
                                "td",
                                { className: "w-5 text-center" },
                                "→"
                            ),
                            React.createElement(
                                "td",
                                { className: "w-10 text-left" },
                                acro.acrobatic.score.toFixed(1)
                            )
                        );
                    })
                )
            )
        );
    };

    _createClass(HeadJudgeActobaticOverrides, null, [{
        key: "propTypes",
        get: function get() {
            return {
                acrobatics: React.PropTypes.array.isRequired
            };
        }
    }]);

    return HeadJudgeActobaticOverrides;
}(React.Component);

var HeadJudgePreviousPenalties = function (_React$Component2) {
    _inherits(HeadJudgePreviousPenalties, _React$Component2);

    function HeadJudgePreviousPenalties() {
        _classCallCheck(this, HeadJudgePreviousPenalties);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    HeadJudgePreviousPenalties.prototype.render = function render() {
        if (!this.props.penalties || this.props.penalties.length === 0) {
            return null;
        }
        return React.createElement(
            "div",
            null,
            React.createElement("div", { className: "spacer" }),
            React.createElement(
                "h3",
                null,
                __("tablet.head_judge.previous_penalties")
            ),
            React.createElement(
                "table",
                { className: "full-width" },
                React.createElement(
                    "tbody",
                    null,
                    " ",
                    this.props.penalties.map(function (d, idx) {
                        return React.createElement(
                            "tr",
                            { key: idx },
                            React.createElement(
                                "td",
                                { className: "w-10 text-center" },
                                React.createElement(
                                    "strong",
                                    null,
                                    d.penalty
                                )
                            ),
                            React.createElement(
                                "td",
                                null,
                                d.tour
                            )
                        );
                    })
                )
            )
        );
    };

    _createClass(HeadJudgePreviousPenalties, null, [{
        key: "propTypes",
        get: function get() {
            return {
                penalties: React.PropTypes.array
            };
        }
    }]);

    return HeadJudgePreviousPenalties;
}(React.Component);

var HeadJudgeTechJudgeScore = function (_React$Component3) {
    _inherits(HeadJudgeTechJudgeScore, _React$Component3);

    function HeadJudgeTechJudgeScore() {
        _classCallCheck(this, HeadJudgeTechJudgeScore);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    HeadJudgeTechJudgeScore.prototype.getTimingData = function getTimingData() {
        var tv_raw_value = this.props.score.data.raw_data.timing_violation;
        if (tv_raw_value === null) {
            return ["-", ""];
        } else if (tv_raw_value) {
            return ["X", " fail"];
        } else {
            return ["OK", " ok"];
        }
    };

    HeadJudgeTechJudgeScore.prototype.render = function render() {
        var timing_data = this.getTimingData();
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                { className: this.props.score.confirmed ? "confirmed" : "" },
                this.props.discipline_judge.judge.name
            ),
            React.createElement(
                "table",
                { className: "tech-judge-info" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        null,
                        React.createElement(
                            "td",
                            { className: "title" },
                            __("tablet.tech_judge.jump_steps")
                        ),
                        React.createElement(
                            "td",
                            { className: "value" },
                            React.createElement(
                                "div",
                                { className: "inner" },
                                this.props.score.data.raw_data.jump_steps
                            )
                        ),
                        React.createElement(
                            "td",
                            { className: "title" },
                            __("tablet.tech_judge.timing")
                        ),
                        React.createElement(
                            "td",
                            { className: "value" },
                            React.createElement(
                                "div",
                                { className: "inner" + timing_data[1] },
                                timing_data[0]
                            )
                        )
                    )
                )
            )
        );
    };

    _createClass(HeadJudgeTechJudgeScore, null, [{
        key: "propTypes",
        get: function get() {
            return {
                score: React.PropTypes.object.isRequired,
                discipline_judge: React.PropTypes.object.isRequired
            };
        }
    }]);

    return HeadJudgeTechJudgeScore;
}(React.Component);

var HeadJudgeTechJudgesScores = function (_React$Component4) {
    _inherits(HeadJudgeTechJudgesScores, _React$Component4);

    function HeadJudgeTechJudgesScores() {
        _classCallCheck(this, HeadJudgeTechJudgesScores);

        return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
    }

    HeadJudgeTechJudgesScores.prototype.getTechDisciplineJudges = function getTechDisciplineJudges() {
        return this.props.all_discipline_judges.filter(function (dj) {
            return dj.role === "tech_judge";
        });
    };

    HeadJudgeTechJudgesScores.prototype.renderContent = function renderContent() {
        var _this5 = this;

        return this.getTechDisciplineJudges().map(function (tech_judge) {
            return React.createElement(HeadJudgeTechJudgeScore, {
                key: tech_judge.id,
                discipline_judge: tech_judge,
                score: _this5.props.all_scores[tech_judge.id] });
        });
    };

    HeadJudgeTechJudgesScores.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement("div", { className: "spacer" }),
            this.renderContent()
        );
    };

    _createClass(HeadJudgeTechJudgesScores, null, [{
        key: "propTypes",
        get: function get() {
            return {
                all_discipline_judges: React.PropTypes.array.isRequired,
                all_scores: React.PropTypes.object.isRequired
            };
        }
    }]);

    return HeadJudgeTechJudgesScores;
}(React.Component);

var HeadJudgeDanceJudgeScore = function (_React$Component5) {
    _inherits(HeadJudgeDanceJudgeScore, _React$Component5);

    function HeadJudgeDanceJudgeScore() {
        _classCallCheck(this, HeadJudgeDanceJudgeScore);

        return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
    }

    HeadJudgeDanceJudgeScore.prototype.render = function render() {
        return React.createElement(
            "td",
            { className: this.props.score.confirmed ? "confirmed" : "" },
            this.props.score.data.total_score.toFixed(2)
        );
    };

    _createClass(HeadJudgeDanceJudgeScore, null, [{
        key: "propTypes",
        get: function get() {
            return {
                score: React.PropTypes.object.isRequired
            };
        }
    }]);

    return HeadJudgeDanceJudgeScore;
}(React.Component);

var HeadJudgeDanceJudgesScores = function (_React$Component6) {
    _inherits(HeadJudgeDanceJudgesScores, _React$Component6);

    function HeadJudgeDanceJudgesScores() {
        _classCallCheck(this, HeadJudgeDanceJudgesScores);

        return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
    }

    HeadJudgeDanceJudgesScores.prototype.getDanceDisciplineJudges = function getDanceDisciplineJudges() {
        return this.props.all_discipline_judges.filter(function (dj) {
            return dj.role === "dance_judge" || dj.role === "acro_judge";
        });
    };

    HeadJudgeDanceJudgesScores.prototype.renderNumbers = function renderNumbers() {
        return this.getDanceDisciplineJudges().map(function (judge) {
            return React.createElement(
                "td",
                { key: judge.id },
                judge.judge.number,
                judge.role === "acro_judge" ? " (A)" : ""
            );
        });
    };

    HeadJudgeDanceJudgesScores.prototype.renderScores = function renderScores() {
        var _this8 = this;

        return this.getDanceDisciplineJudges().map(function (judge) {
            return React.createElement(HeadJudgeDanceJudgeScore, {
                key: judge.id,
                discipline_judge: judge,
                score: _this8.props.all_scores[judge.id] });
        });
    };

    HeadJudgeDanceJudgesScores.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                __("tablet.head_judge.dance_judge_scores")
            ),
            React.createElement(
                "table",
                { className: "dance-judge-scores" },
                React.createElement(
                    "tbody",
                    null,
                    React.createElement(
                        "tr",
                        { className: "numbers" },
                        this.renderNumbers()
                    ),
                    React.createElement(
                        "tr",
                        { className: "scores" },
                        this.renderScores()
                    )
                )
            )
        );
    };

    _createClass(HeadJudgeDanceJudgesScores, null, [{
        key: "propTypes",
        get: function get() {
            return {
                all_discipline_judges: React.PropTypes.array.isRequired,
                all_scores: React.PropTypes.object.isRequired
            };
        }
    }]);

    return HeadJudgeDanceJudgesScores;
}(React.Component);

var HeadJudgeNotPerformedSwitch = function (_React$Component7) {
    _inherits(HeadJudgeNotPerformedSwitch, _React$Component7);

    function HeadJudgeNotPerformedSwitch() {
        _classCallCheck(this, HeadJudgeNotPerformedSwitch);

        return _possibleConstructorReturn(this, _React$Component7.apply(this, arguments));
    }

    HeadJudgeNotPerformedSwitch.prototype.markNotPerformed = function markNotPerformed() {
        (0, _api.Api)("run.mark_not_performed", { run_id: this.props.run_id }).send();
    };

    HeadJudgeNotPerformedSwitch.prototype.markPerformed = function markPerformed() {
        (0, _api.Api)("run.mark_performed", { run_id: this.props.run_id }).send();
    };

    HeadJudgeNotPerformedSwitch.prototype.renderButton = function renderButton() {
        if (this.props.performed) {
            return React.createElement(
                "button",
                _extends({ type: "button", className: "btn btn-sm btn-danger" }, (0, _tablet_components.onTouchOrClick)(this.markNotPerformed.bind(this))),
                (0, _loader._)("tablet.buttons.not_performed")
            );
        } else {
            return React.createElement(
                "button",
                _extends({ type: "button", className: "btn btn-sm btn-success" }, (0, _tablet_components.onTouchOrClick)(this.markPerformed.bind(this))),
                (0, _loader._)("tablet.buttons.performed")
            );
        }
    };

    HeadJudgeNotPerformedSwitch.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "not-performed-control" },
            this.renderButton()
        );
    };

    _createClass(HeadJudgeNotPerformedSwitch, null, [{
        key: "propTypes",
        get: function get() {
            return {
                performed: React.PropTypes.bool,
                run_id: React.PropTypes.number.isRequired
            };
        }
    }]);

    return HeadJudgeNotPerformedSwitch;
}(React.Component);

var HeadJudgeScoreInput = function (_React$Component8) {
    _inherits(HeadJudgeScoreInput, _React$Component8);

    function HeadJudgeScoreInput() {
        _classCallCheck(this, HeadJudgeScoreInput);

        return _possibleConstructorReturn(this, _React$Component8.apply(this, arguments));
    }

    HeadJudgeScoreInput.prototype.getPenaltyCoices = function getPenaltyCoices() {
        if (this.props.scoring_system_name === "rosfarr.formation") {
            return [[0, __("tablet.head_judge.ok")], [-5, __("tablet.head_judge.form_yellow_card")], [-15, __("tablet.head_judge.form_red_card")], [-100, __("tablet.head_judge.black_card")]];
        }
        return [[0, __("tablet.head_judge.ok")], [-3, __("tablet.head_judge.yellow_card")], [-30, __("tablet.head_judge.red_card")], [-100, __("tablet.head_judge.black_card")]];
    };

    HeadJudgeScoreInput.prototype.genOnPenaltyUpdate = function genOnPenaltyUpdate() {
        var _this11 = this;

        return function (new_value) {
            return _this11.props.onScoreUpdate("penalty", new_value);
        };
    };

    HeadJudgeScoreInput.prototype.render = function render() {
        if (!this.props.run.performed) {
            return React.createElement(HeadJudgeNotPerformedSwitch, {
                run_id: this.props.run.id,
                performed: this.props.run.performed });
        }
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                __("tablet.head_judge.penalty_type")
            ),
            React.createElement(_tablet_components.TabletSelectorInput, {
                choices: this.getPenaltyCoices(),
                active: this.props.score.data.raw_data.penalty,
                onValueUpdate: this.genOnPenaltyUpdate() }),
            React.createElement(HeadJudgeTechJudgesScores, {
                all_discipline_judges: this.props.all_discipline_judges,
                all_scores: this.props.all_scores }),
            React.createElement(HeadJudgeDanceJudgesScores, {
                all_discipline_judges: this.props.all_discipline_judges,
                all_scores: this.props.all_scores }),
            React.createElement(HeadJudgeActobaticOverrides, {
                acrobatics: this.props.run.acrobatics }),
            React.createElement(HeadJudgePreviousPenalties, {
                penalties: this.props.run.inherited_data.penalties }),
            React.createElement(HeadJudgeNotPerformedSwitch, {
                run_id: this.props.run.id,
                performed: this.props.run.performed })
        );
    };

    _createClass(HeadJudgeScoreInput, null, [{
        key: "propTypes",
        get: function get() {
            return {
                scoring_system_name: React.PropTypes.string.isRequired,
                all_discipline_judges: React.PropTypes.array.isRequired,
                all_scores: React.PropTypes.object.isRequired,
                run: React.PropTypes.object.isRequired,
                score: React.PropTypes.object.isRequired,
                onScoreUpdate: React.PropTypes.func.isRequired
            };
        }
    }]);

    return HeadJudgeScoreInput;
}(React.Component);

// Tech Judge

var TechJudgeAcrobaticOverride = function (_React$Component9) {
    _inherits(TechJudgeAcrobaticOverride, _React$Component9);

    function TechJudgeAcrobaticOverride() {
        _classCallCheck(this, TechJudgeAcrobaticOverride);

        return _possibleConstructorReturn(this, _React$Component9.apply(this, arguments));
    }

    TechJudgeAcrobaticOverride.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "tech-judge-acro" },
            React.createElement(
                "div",
                { className: "controls pull-right" },
                React.createElement(
                    "div",
                    { className: "setter" },
                    React.createElement(_tablet_components.TabletPoint5Input, {
                        value: this.props.acro.score,
                        onValueUpdate: this.props.onAcroOverride })
                )
            ),
            React.createElement(
                "h3",
                null,
                this.props.acro.description,
                " (=",
                this.props.acro.original_score,
                ")"
            ),
            React.createElement("div", { className: "clearfix" })
        );
    };

    return TechJudgeAcrobaticOverride;
}(React.Component);

var TechJudgeAcroScoreInput = function (_React$Component10) {
    _inherits(TechJudgeAcroScoreInput, _React$Component10);

    function TechJudgeAcroScoreInput() {
        _classCallCheck(this, TechJudgeAcroScoreInput);

        return _possibleConstructorReturn(this, _React$Component10.apply(this, arguments));
    }

    TechJudgeAcroScoreInput.prototype.genOnAcroOverride = function genOnAcroOverride(acro_idx) {
        var _this14 = this;

        return function (new_value) {
            return _this14.props.onAcroOverride(acro_idx, new_value);
        };
    };

    TechJudgeAcroScoreInput.prototype.renderContent = function renderContent() {
        var _this15 = this;

        return this.props.acrobatics.map(function (acro, idx) {
            return React.createElement(TechJudgeAcrobaticOverride, {
                key: idx,
                acro: acro,
                onAcroOverride: _this15.genOnAcroOverride(idx) });
        });
    };

    TechJudgeAcroScoreInput.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            this.renderContent()
        );
    };

    return TechJudgeAcroScoreInput;
}(React.Component);

var TechJudgeDanceScoreInput = function (_React$Component11) {
    _inherits(TechJudgeDanceScoreInput, _React$Component11);

    function TechJudgeDanceScoreInput() {
        _classCallCheck(this, TechJudgeDanceScoreInput);

        return _possibleConstructorReturn(this, _React$Component11.apply(this, arguments));
    }

    TechJudgeDanceScoreInput.prototype.genOnScoreUpdate = function genOnScoreUpdate(score_part) {
        var _this17 = this;

        return function (new_value) {
            return _this17.props.onScoreUpdate(score_part, new_value);
        };
    };

    TechJudgeDanceScoreInput.prototype.render = function render() {
        var score = this.props.score.data;
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                __("tablet.tech_judge.jump_steps")
            ),
            React.createElement(_tablet_components.TabletIntegerInput, {
                value: score.raw_data.jump_steps,
                sendDeltas: true,
                onValueUpdate: this.genOnScoreUpdate("jump_steps") }),
            React.createElement("div", { className: "spacer" }),
            React.createElement(
                "h3",
                null,
                __("tablet.tech_judge.timing")
            ),
            React.createElement(_tablet_components.StopWatch, { score_id: this.props.score.id }),
            React.createElement(_tablet_components.TabletSelectorInput, {
                choices: [[true, "X"], [null, "-"], [false, "OK"]],
                active: score.raw_data.timing_violation,
                onValueUpdate: this.genOnScoreUpdate("timing_violation") })
        );
    };

    return TechJudgeDanceScoreInput;
}(React.Component);

var TechJudgeScoreInput = function (_React$Component12) {
    _inherits(TechJudgeScoreInput, _React$Component12);

    function TechJudgeScoreInput() {
        _classCallCheck(this, TechJudgeScoreInput);

        return _possibleConstructorReturn(this, _React$Component12.apply(this, arguments));
    }

    TechJudgeScoreInput.prototype.render = function render() {
        if (this.props.page === "acro") {
            return React.createElement(TechJudgeAcroScoreInput, {
                acrobatics: this.props.run.acrobatics,
                onAcroOverride: this.props.onAcroOverride });
        } else {
            return React.createElement(TechJudgeDanceScoreInput, {
                score: this.props.score,
                onScoreUpdate: this.props.onScoreUpdate });
        }
    };

    return TechJudgeScoreInput;
}(React.Component);

// Dance judge

var DanceJudgeScorePartInput = function (_React$Component13) {
    _inherits(DanceJudgeScorePartInput, _React$Component13);

    function DanceJudgeScorePartInput() {
        _classCallCheck(this, DanceJudgeScorePartInput);

        return _possibleConstructorReturn(this, _React$Component13.apply(this, arguments));
    }

    DanceJudgeScorePartInput.prototype.genOnScoreUpdate = function genOnScoreUpdate() {
        var _this20 = this;

        return function (new_value) {
            return _this20.props.onScoreUpdate(_this20.props.part, new_value);
        };
    };

    DanceJudgeScorePartInput.prototype.renderHeader = function renderHeader() {
        if (this.props.skip_header) {
            return null;
        }
        return React.createElement(
            "h3",
            null,
            __("tablet.dance_judge." + this.props.part)
        );
    };

    DanceJudgeScorePartInput.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            this.renderHeader(),
            React.createElement(ScorePartScale, _extends({
                scale: this.props.scale,
                active: this.props.score.data.raw_data[this.props.part],
                onValueUpdate: this.genOnScoreUpdate()
            }, this.props.scale_props))
        );
    };

    return DanceJudgeScorePartInput;
}(React.Component);

var DanceJudgeScoreMistakes = function (_React$Component14) {
    _inherits(DanceJudgeScoreMistakes, _React$Component14);

    function DanceJudgeScoreMistakes() {
        _classCallCheck(this, DanceJudgeScoreMistakes);

        return _possibleConstructorReturn(this, _React$Component14.apply(this, arguments));
    }

    DanceJudgeScoreMistakes.prototype.genOnScoreUpdate = function genOnScoreUpdate(score_part) {
        var _this22 = this;

        return function (new_value) {
            return _this22.props.onScoreUpdate(score_part, new_value);
        };
    };

    DanceJudgeScoreMistakes.prototype.render = function render() {
        var score_data = this.props.score.data.raw_data;
        return React.createElement(
            "table",
            { className: "mistakes full-width" },
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "h3",
                            null,
                            __("tablet.dance_judge.small_mistakes")
                        ),
                        React.createElement(_tablet_components.TabletIntegerInput, {
                            value: score_data.small_mistakes,
                            onValueUpdate: this.genOnScoreUpdate("small_mistakes") })
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "h3",
                            null,
                            __("tablet.dance_judge.big_mistakes")
                        ),
                        React.createElement(_tablet_components.TabletIntegerInput, {
                            value: score_data.big_mistakes,
                            onValueUpdate: this.genOnScoreUpdate("big_mistakes") })
                    )
                )
            )
        );
    };

    return DanceJudgeScoreMistakes;
}(React.Component);

var DanceJudgeScoreFormationMistakes = function (_React$Component15) {
    _inherits(DanceJudgeScoreFormationMistakes, _React$Component15);

    function DanceJudgeScoreFormationMistakes() {
        _classCallCheck(this, DanceJudgeScoreFormationMistakes);

        return _possibleConstructorReturn(this, _React$Component15.apply(this, arguments));
    }

    DanceJudgeScoreFormationMistakes.prototype.render = function render() {
        var score_data = this.props.score.data.raw_data;
        return React.createElement(
            "div",
            { className: "mistakes" },
            React.createElement(
                "h3",
                null,
                __("tablet.dance_judge.form_mistakes")
            ),
            React.createElement(_tablet_components.TabletIntegerInput, {
                value: score_data.mistakes,
                onValueUpdate: this.props.onScoreUpdate.bind(this, "mistakes") })
        );
    };

    return DanceJudgeScoreFormationMistakes;
}(React.Component);

var DanceJudgeScoreFormationAcroMistakes = function (_React$Component16) {
    _inherits(DanceJudgeScoreFormationAcroMistakes, _React$Component16);

    function DanceJudgeScoreFormationAcroMistakes() {
        _classCallCheck(this, DanceJudgeScoreFormationAcroMistakes);

        return _possibleConstructorReturn(this, _React$Component16.apply(this, arguments));
    }

    DanceJudgeScoreFormationAcroMistakes.prototype.genOnScoreUpdate = function genOnScoreUpdate(score_part) {
        var _this25 = this;

        return function (new_value) {
            return _this25.props.onScoreUpdate(score_part, new_value);
        };
    };

    DanceJudgeScoreFormationAcroMistakes.prototype.render = function render() {
        var score_data = this.props.score.data.raw_data;
        return React.createElement(
            "table",
            { className: "mistakes full-width" },
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "h3",
                            null,
                            __("tablet.dance_judge.form_small_mistakes")
                        ),
                        React.createElement(_tablet_components.TabletIntegerInput, {
                            value: score_data.small_mistakes,
                            onValueUpdate: this.genOnScoreUpdate("small_mistakes") })
                    ),
                    React.createElement(
                        "td",
                        null,
                        React.createElement(
                            "h3",
                            null,
                            __("tablet.dance_judge.form_big_mistakes")
                        ),
                        React.createElement(_tablet_components.TabletIntegerInput, {
                            value: score_data.big_mistakes,
                            onValueUpdate: this.genOnScoreUpdate("big_mistakes") })
                    )
                )
            )
        );
    };

    return DanceJudgeScoreFormationAcroMistakes;
}(React.Component);

var DanceJudgeFinalDanceScoreInput = function (_React$Component17) {
    _inherits(DanceJudgeFinalDanceScoreInput, _React$Component17);

    function DanceJudgeFinalDanceScoreInput() {
        _classCallCheck(this, DanceJudgeFinalDanceScoreInput);

        return _possibleConstructorReturn(this, _React$Component17.apply(this, arguments));
    }

    DanceJudgeFinalDanceScoreInput.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "fw_woman",
                scale: "reduction"
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "fw_man",
                scale: "reduction"
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "dance_figs",
                scale: "point5",
                scale_props: {
                    min: 0,
                    max: 12.5
                }
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "composition",
                scale: "point5",
                scale_props: {
                    min: 0,
                    max: 10
                }
            }, this.props)),
            React.createElement(DanceJudgeScoreMistakes, this.props)
        );
    };

    return DanceJudgeFinalDanceScoreInput;
}(React.Component);

var DanceJudgeDanceScoreInput = function (_React$Component18) {
    _inherits(DanceJudgeDanceScoreInput, _React$Component18);

    function DanceJudgeDanceScoreInput() {
        _classCallCheck(this, DanceJudgeDanceScoreInput);

        return _possibleConstructorReturn(this, _React$Component18.apply(this, arguments));
    }

    DanceJudgeDanceScoreInput.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "fw_woman",
                scale: "reduction"
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "fw_man",
                scale: "reduction"
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "dance_figs",
                scale: "integer",
                scale_props: {
                    min: 0,
                    max: 25
                }
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "composition",
                scale: "integer",
                scale_props: {
                    min: 0,
                    max: 20
                }
            }, this.props)),
            React.createElement(DanceJudgeScoreMistakes, this.props)
        );
    };

    return DanceJudgeDanceScoreInput;
}(React.Component);

var DanceJudgeFormationScoreInput = function (_React$Component19) {
    _inherits(DanceJudgeFormationScoreInput, _React$Component19);

    function DanceJudgeFormationScoreInput() {
        _classCallCheck(this, DanceJudgeFormationScoreInput);

        return _possibleConstructorReturn(this, _React$Component19.apply(this, arguments));
    }

    DanceJudgeFormationScoreInput.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "dance_tech",
                scale: "point5",
                scale_props: {
                    min: 0,
                    max: 10
                }
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "dance_figs",
                scale: "point5",
                scale_props: {
                    min: 0,
                    max: 10
                }
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "impression",
                scale: "point5",
                scale_props: {
                    min: 0,
                    max: 10
                }
            }, this.props)),
            React.createElement(DanceJudgeScoreFormationMistakes, this.props)
        );
    };

    return DanceJudgeFormationScoreInput;
}(React.Component);

var DanceJudgeFormationAcroScoreInput = function (_React$Component20) {
    _inherits(DanceJudgeFormationAcroScoreInput, _React$Component20);

    function DanceJudgeFormationAcroScoreInput() {
        _classCallCheck(this, DanceJudgeFormationAcroScoreInput);

        return _possibleConstructorReturn(this, _React$Component20.apply(this, arguments));
    }

    DanceJudgeFormationAcroScoreInput.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "acrobatics",
                scale: "point5",
                scale_props: {
                    min: 0,
                    max: 10
                }
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "dance_tech",
                scale: "point5",
                scale_props: {
                    min: 0,
                    max: 10
                }
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "dance_figs",
                scale: "point5",
                scale_props: {
                    min: 0,
                    max: 10
                }
            }, this.props)),
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "impression",
                scale: "point5",
                scale_props: {
                    min: 0,
                    max: 10
                }
            }, this.props)),
            React.createElement(DanceJudgeScoreFormationAcroMistakes, this.props)
        );
    };

    return DanceJudgeFormationAcroScoreInput;
}(React.Component);

var DanceJudgeSimplifiedScoreInput = function (_React$Component21) {
    _inherits(DanceJudgeSimplifiedScoreInput, _React$Component21);

    function DanceJudgeSimplifiedScoreInput() {
        _classCallCheck(this, DanceJudgeSimplifiedScoreInput);

        return _possibleConstructorReturn(this, _React$Component21.apply(this, arguments));
    }

    DanceJudgeSimplifiedScoreInput.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(DanceJudgeScorePartInput, _extends({
                part: "points",
                scale: "grid",
                skip_header: true,
                scale_props: {
                    min: 1,
                    max: 40,
                    row_size: 10
                }
            }, this.props))
        );
    };

    return DanceJudgeSimplifiedScoreInput;
}(React.Component);

var DanceJudgeScoreInput = function (_React$Component22) {
    _inherits(DanceJudgeScoreInput, _React$Component22);

    function DanceJudgeScoreInput() {
        _classCallCheck(this, DanceJudgeScoreInput);

        return _possibleConstructorReturn(this, _React$Component22.apply(this, arguments));
    }

    DanceJudgeScoreInput.prototype.render = function render() {
        var props = {
            score: this.props.score,
            onScoreUpdate: this.props.onScoreUpdate
        };
        switch (this.props.scoring_system_name) {
            case "rosfarr.acro":
            case "rosfarr.no_acro":
                return React.createElement(DanceJudgeDanceScoreInput, props);
            case "rosfarr.am_final_fw":
            case "rosfarr.am_final_acro":
                return React.createElement(DanceJudgeFinalDanceScoreInput, props);
            case "rosfarr.formation":
                return React.createElement(DanceJudgeFormationScoreInput, props);
            case "rosfarr.formation_acro":
                return React.createElement(DanceJudgeFormationAcroScoreInput, props);
            case "rosfarr.simplified":
                return React.createElement(DanceJudgeSimplifiedScoreInput, props);
            default:
                return null;
        }
    };

    return DanceJudgeScoreInput;
}(React.Component);

// Acro judge

var AcroJudgeAcrobaticInput = function (_React$Component23) {
    _inherits(AcroJudgeAcrobaticInput, _React$Component23);

    function AcroJudgeAcrobaticInput() {
        _classCallCheck(this, AcroJudgeAcrobaticInput);

        return _possibleConstructorReturn(this, _React$Component23.apply(this, arguments));
    }

    AcroJudgeAcrobaticInput.prototype.render = function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h3",
                null,
                (0, _loader._)("tablet.headers.acro_n", this.props.acro_idx)
            ),
            React.createElement(ScorePartScale, {
                scale: "reduction",
                active: this.props.reduction,
                onValueUpdate: this.props.onAcroReductionUpdate })
        );
    };

    return AcroJudgeAcrobaticInput;
}(React.Component);

var AcroJudgeScoreMistakes = function (_React$Component24) {
    _inherits(AcroJudgeScoreMistakes, _React$Component24);

    function AcroJudgeScoreMistakes() {
        _classCallCheck(this, AcroJudgeScoreMistakes);

        return _possibleConstructorReturn(this, _React$Component24.apply(this, arguments));
    }

    AcroJudgeScoreMistakes.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "mistakes" },
            React.createElement(
                "h3",
                null,
                __("tablet.acro_judge.fall_down")
            ),
            React.createElement(_tablet_components.TabletIntegerInput, {
                value: this.props.mistakes,
                onValueUpdate: this.props.onScoreUpdate })
        );
    };

    return AcroJudgeScoreMistakes;
}(React.Component);

var AcroJudgeInput = function (_React$Component25) {
    _inherits(AcroJudgeInput, _React$Component25);

    function AcroJudgeInput() {
        _classCallCheck(this, AcroJudgeInput);

        return _possibleConstructorReturn(this, _React$Component25.apply(this, arguments));
    }

    AcroJudgeInput.prototype.genOnAcroReductionUpdate = function genOnAcroReductionUpdate(acro_idx) {
        var _this35 = this;

        return function (new_value) {
            return _this35.props.onAcroReductionUpdate(acro_idx, new_value);
        };
    };

    AcroJudgeInput.prototype.genOnMistakesUpdate = function genOnMistakesUpdate() {
        var _this36 = this;

        return function (new_value) {
            return _this36.props.onScoreUpdate("mistakes", new_value);
        };
    };

    AcroJudgeInput.prototype.render = function render() {
        var _this37 = this;

        var score_data = this.props.score.data.raw_data;
        return React.createElement(
            "div",
            null,
            score_data.reductions.map(function (reduction, acro_idx) {
                return React.createElement(AcroJudgeAcrobaticInput, {
                    key: acro_idx,
                    reduction: reduction,
                    acro_idx: acro_idx,
                    onAcroReductionUpdate: _this37.genOnAcroReductionUpdate(acro_idx) });
            }),
            React.createElement(AcroJudgeScoreMistakes, {
                mistakes: score_data.mistakes,
                onScoreUpdate: this.genOnMistakesUpdate() })
        );
    };

    return AcroJudgeInput;
}(React.Component);

// Common

var NotPerformingMessage = function (_React$Component26) {
    _inherits(NotPerformingMessage, _React$Component26);

    function NotPerformingMessage() {
        _classCallCheck(this, NotPerformingMessage);

        return _possibleConstructorReturn(this, _React$Component26.apply(this, arguments));
    }

    NotPerformingMessage.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "not-performing" },
            (0, _loader._)("tablet.messages.not_performing")
        );
    };

    return NotPerformingMessage;
}(React.Component);

var ScorePartScale = function (_React$Component27) {
    _inherits(ScorePartScale, _React$Component27);

    function ScorePartScale() {
        _classCallCheck(this, ScorePartScale);

        return _possibleConstructorReturn(this, _React$Component27.apply(this, arguments));
    }

    ScorePartScale.prototype.genPossibleReductions = function genPossibleReductions() {
        return [[100, "X"], [75, "-75%"], [50, "-50%"], [25, "-25%"], [10, "-10%"], [5, "-5%"], [0, "OK"]];
    };

    ScorePartScale.prototype.render = function render() {
        switch (this.props.scale) {
            case "point5":
                return React.createElement(_tablet_components.TabletPoint5SelectInput, _extends({ style: "two-lines" }, this.props));
            case "integer":
                return React.createElement(_tablet_components.TabletIntegerSelectInput, _extends({ style: "two-lines" }, this.props));
            case "grid":
                return React.createElement(_tablet_components.TabletIntegerSelectInput, _extends({ style: "grid" }, this.props));
            case "reduction":
                return React.createElement(_tablet_components.TabletSelectorInput, _extends({
                    style: "one-line",
                    choices: this.genPossibleReductions()
                }, this.props));
        }
    };

    return ScorePartScale;
}(React.Component);

var TabletScoreTotalScore = function (_React$Component28) {
    _inherits(TabletScoreTotalScore, _React$Component28);

    function TabletScoreTotalScore() {
        _classCallCheck(this, TabletScoreTotalScore);

        return _possibleConstructorReturn(this, _React$Component28.apply(this, arguments));
    }

    TabletScoreTotalScore.prototype.render = function render() {
        var role = this.props.discipline_judge.role;
        if (this.props.scoring_system_name === "rosfarr.simplified") {
            return null;
        }
        if (role === "head_judge" || role === "tech_judge") {
            return null;
        }
        return React.createElement(
            "div",
            { className: "total-score" },
            __("tablet.global.total_score"),
            ": ",
            this.props.score.data.total_score
        );
    };

    return TabletScoreTotalScore;
}(React.Component);

var TabletScoreConfirmationButton = function (_React$Component29) {
    _inherits(TabletScoreConfirmationButton, _React$Component29);

    function TabletScoreConfirmationButton() {
        _classCallCheck(this, TabletScoreConfirmationButton);

        return _possibleConstructorReturn(this, _React$Component29.apply(this, arguments));
    }

    TabletScoreConfirmationButton.prototype.needConfirmation = function needConfirmation() {
        return this.props.discipline_judge.role !== "head_judge";
    };

    TabletScoreConfirmationButton.prototype.readyToConfirm = function readyToConfirm() {
        var score_data = this.props.score.data.raw_data;
        var keys = Object.getOwnPropertyNames(score_data);
        if (this.props.discipline_judge.role !== "tech_judge") {
            for (var idx in keys) {
                if (score_data[keys[idx]] === null) {
                    return false;
                }
                if (_typeof(score_data[keys[idx]]) === "object") {
                    var arr = score_data[keys[idx]];
                    for (var j in Object.keys(arr)) {
                        if (arr[j] === null) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    };

    TabletScoreConfirmationButton.prototype.render = function render() {
        if (!this.needConfirmation()) {
            return null;
        }
        if (!this.readyToConfirm()) {
            return React.createElement("div", { className: "confirm" });
        }
        return React.createElement(
            "div",
            { className: "confirm" },
            React.createElement(_tablet_components.Slider, {
                onActivate: this.props.onScoreConfirm,
                done: this.props.score.confirmed,
                slideText: (0, _loader._)("judging.buttons.confirm_score"),
                doneText: (0, _loader._)("judging.labels.confirmed") })
        );
    };

    return TabletScoreConfirmationButton;
}(React.Component);

var TabletScoreInput = exports.TabletScoreInput = function (_React$Component30) {
    _inherits(TabletScoreInput, _React$Component30);

    function TabletScoreInput() {
        _classCallCheck(this, TabletScoreInput);

        return _possibleConstructorReturn(this, _React$Component30.apply(this, arguments));
    }

    TabletScoreInput.prototype.updateScores = function updateScores(type, value) {
        if (this.props.readOnly) {
            return;
        }
        var new_score = {};
        new_score[type] = value;
        this.props.onScoreUpdate(new_score);
    };

    TabletScoreInput.prototype.updateAcroReduction = function updateAcroReduction(idx, value) {
        var reductions = this.props.score.data.raw_data.reductions.map(function () {
            return null;
        });
        reductions[idx] = value;
        var new_score = {
            reductions: reductions
        };
        this.props.onScoreUpdate(new_score);
    };

    TabletScoreInput.prototype.overrideAcroScore = function overrideAcroScore(acro_idx, value) {
        if (this.props.readOnly) {
            return;
        }
        (0, _api.Api)("acrobatic_override.set", {
            run_id: this.props.run.id,
            acrobatic_idx: acro_idx,
            score: value
        }).send();
    };

    TabletScoreInput.prototype.renderScoresInput = function renderScoresInput() {
        switch ((0, _base.getScoringType)(this.props.discipline_judge, this.props.scoring_system_name)) {
            case "acro":
                return React.createElement(AcroJudgeInput, {
                    score: this.props.score,
                    onAcroReductionUpdate: this.updateAcroReduction.bind(this),
                    onScoreUpdate: this.updateScores.bind(this) });
            case "dance":
            case "formation":
            case "formation_acro":
            case "simplified":
                return React.createElement(DanceJudgeScoreInput, {
                    score: this.props.score,
                    scoring_system_name: this.props.scoring_system_name,
                    onScoreUpdate: this.updateScores.bind(this) });
            case "head":
                return React.createElement(HeadJudgeScoreInput, {
                    run: this.props.run,
                    score: this.props.score,
                    scoring_system_name: this.props.scoring_system_name,
                    all_discipline_judges: this.props.all_discipline_judges,
                    all_scores: this.props.all_scores,
                    onScoreUpdate: this.updateScores.bind(this) });
            case "tech":
                return React.createElement(TechJudgeScoreInput, {
                    page: this.props.page,
                    run: this.props.run,
                    score: this.props.score,
                    onAcroOverride: this.overrideAcroScore.bind(this),
                    onScoreUpdate: this.updateScores.bind(this) });
            default:
                console.log("Unknown judge role", this.props.discipline_judge.role);
                return null;
        }
    };

    TabletScoreInput.prototype.render = function render() {
        if (!this.props.run.performed && this.props.discipline_judge.role !== "head_judge") {
            return React.createElement(NotPerformingMessage, null);
        }
        return React.createElement(
            "div",
            { className: this.props.readOnly ? "read-only" : "" },
            this.renderScoresInput(),
            React.createElement(TabletScoreTotalScore, {
                scoring_system_name: this.props.scoring_system_name,
                discipline_judge: this.props.discipline_judge,
                score: this.props.score }),
            React.createElement(TabletScoreConfirmationButton, {
                discipline_judge: this.props.discipline_judge,
                score: this.props.score,
                onScoreConfirm: this.props.onScoreConfirm })
        );
    };

    return TabletScoreInput;
}(React.Component);

},{"common/rosfarr/base":6,"i10n/loader":7,"server/api":10,"ui/tablet_components":16}],5:[function(require,module,exports){
"use strict";

exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DocxImpl = function () {
    function DocxImpl(filename) {
        _classCallCheck(this, DocxImpl);

        this.filename = filename;
        this.header = null;
        this.title1 = null;
        this.title2 = null;
        this.title3 = null;
        this.margins = null;
        this.body = "";
        this.orientation = "portrait";
        this.styles = {
            "body": {
                "font-size": "10pt",
                "font-family": "Calibri, Tahoma, Arial, sans-serif"
            },
            "table": {
                "border-collapse": "collapse",
                "width": "100%"
            },
            "tr": {
                "page-break-inside": "avoid"
            },
            "td, th": {
                "padding": "1pt 3pt"
            },
            "h1, h2, h3, h4, h5, h6": {
                "page-break-after": "avoid",
                "margin-bottom": 0
            },
            "h1": {
                "font-size": "20pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "10pt"
            },
            "h2": {
                "font-size": "16pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "6pt"
            },
            "h3": {
                "font-size": "16pt",
                "font-weight": "bold",
                "text-align": "center",
                "margin-top": "4pt"
            },
            "h4 p": {
                "font-size": "14pt",
                "font-weight": "bold",
                "margin": "10pt 0 6pt"
            },
            "h5 p": {
                "font-size": "12pt",
                "font-weight": "bold",
                "margin": "6pt 0"
            },
            ".header": {
                "border-bottom": "1px solid black",
                "font-size": "10pt",
                "font-weight": "bold",
                "margin": 0,
                "padding-bottom": "2pt",
                "margin-bottom": "20pt",
                "text-align": "center"
            },
            "p": {
                "margin": 0,
                "padding": 0
            },
            "li": { "margin-top": 0, "padding-top": 0 },
            ".spacer": {
                "font-size": "14pt"
            },
            ".va-top": {
                "vertical-align": "top"
            },
            ".text-left": { "text-align": "left" },
            ".text-right": { "text-align": "right" },
            ".text-center": { "text-align": "center" },
            ".bordered-table td, .bordered-table th": {
                "border": "1pt solid black"
            }
        };
        this.addWidthCss();
    }

    DocxImpl.prototype.addWidthCss = function addWidthCss() {
        for (var i = 1; i <= 100; ++i) {
            this.addStyle(".w-" + i, "width", i + "%");
        }
    };

    DocxImpl.prototype.addStyle = function addStyle(selector, key, value) {
        if (!this.styles[selector]) {
            this.styles[selector] = {};
        }
        this.styles[selector][key] = value;
        return this;
    };

    DocxImpl.prototype.setHeader = function setHeader(header) {
        this.header = header;
        return this;
    };

    DocxImpl.prototype.setTitle1 = function setTitle1(title1) {
        this.title1 = title1;
        return this;
    };

    DocxImpl.prototype.setTitle2 = function setTitle2(title2) {
        this.title2 = title2;
        return this;
    };

    DocxImpl.prototype.setTitle3 = function setTitle3(title3) {
        this.title3 = title3;
        return this;
    };

    DocxImpl.prototype.setMargins = function setMargins(margins) {
        this.margins = margins;
        return this;
    };

    DocxImpl.prototype.setBody = function setBody(body) {
        this.body = body;
        return this;
    };

    DocxImpl.prototype.setOrientation = function setOrientation(orientation) {
        this.orientation = orientation;
        return this;
    };

    DocxImpl.prototype.renderStyleBlock = function renderStyleBlock(selector, data) {
        var css_pairs = Object.getOwnPropertyNames(data).map(function (key) {
            return key + ': ' + data[key] + '; ';
        });
        return selector + " { " + css_pairs.join(" ") + " }";
    };

    DocxImpl.prototype.renderStyles = function renderStyles() {
        var _this = this;

        var css_blocks = Object.getOwnPropertyNames(this.styles).map(function (selector) {
            return _this.renderStyleBlock(selector, _this.styles[selector]);
        }.bind(this));
        return css_blocks.join("\n");
    };

    DocxImpl.prototype.renderHTML = function renderHTML() {
        var css = this.renderStyles();
        var header = this.header ? '<p class="header">' + this.header + '</p>' : "";
        var title1 = this.title1 ? '<h1>' + this.title1 + '</h1>' : "";
        var title2 = this.title2 ? '<h2>' + this.title2 + '</h2>' : "";
        var title3 = this.title3 ? '<h3>' + this.title3 + '</h3>' : "";
        var spacer = header || title1 || title2 || title3 ? '<p class="spacer">&nbsp;</p>' : "";
        return "<!DOCTYPE html>\n" + "<html><head>" + "<meta charset=\"utf-8\">" + "<style>\n" + css + "\n</style>\n" + "</head><body>\n" + header + title1 + title2 + title3 + spacer + this.body + "</body></html>";
    };

    DocxImpl.prototype.save = function save() {
        var html = this.renderHTML();
        var margins = this.margins || (this.orientation === "portrait" ? [10, 15, 10, 15] : [7, 10, 7, 10]);
        var converted = htmlDocx.asBlob(html, {
            orientation: this.orientation,
            margins: {
                top: Math.floor(margins[0] * 56.659).toString(),
                right: Math.floor(margins[1] * 56.659).toString(),
                bottom: Math.floor(margins[2] * 56.659).toString(),
                left: Math.floor(margins[3] * 56.659).toString()
            }
        });
        saveAs(converted, this.filename);
    };

    return DocxImpl;
}();

var Docx = exports.Docx = function Docx(fn) {
    return new DocxImpl(fn);
};

},{}],6:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.getParticipantDisplay = getParticipantDisplay;
exports.getScoringType = getScoringType;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RunScoresWrapper = exports.RunScoresWrapper = function () {
    function RunScoresWrapper(run, discipline_judges) {
        _classCallCheck(this, RunScoresWrapper);

        this.run = run;
        this.discipline_judges = discipline_judges;
        this.scores_by_discipline_judge_id = {};
        run.scores.forEach(function (score) {
            var dj_id = score.discipline_judge_id;
            this.scores_by_discipline_judge_id[dj_id] = score;
        }.bind(this));
    }

    RunScoresWrapper.prototype.getScoresByJudgeIds = function getScoresByJudgeIds(discipline_judge_ids) {
        var _this = this;

        return discipline_judge_ids.map(function (dj_id) {
            return _this.scores_by_discipline_judge_id[dj_id];
        }.bind(this));
    };

    return RunScoresWrapper;
}();

var TourScoresWrapper = exports.TourScoresWrapper = function () {
    function TourScoresWrapper(tour, results) {
        var _this2 = this;

        _classCallCheck(this, TourScoresWrapper);

        this.run_wrappers = tour.runs.map(function (run) {
            return new RunScoresWrapper(run, tour.discipline_judges);
        });
        this.discipline_judges = tour.discipline.discipline_judges;
        this.discipline_judges_by_roles = {};
        this.discipline_judges.forEach(function (dj, idx) {
            var arr = this.discipline_judges_by_roles[dj.role] || [];
            arr.push({
                idx: idx,
                discipline_judge: dj
            });
            this.discipline_judges_by_roles[dj.role] = arr;
        }.bind(this));
        if (results) {
            (function () {
                var results_by_run_ids = {};
                results.forEach(function (res) {
                    return results_by_run_ids[res.run_id] = res;
                });
                _this2.run_wrappers.forEach(function (w) {
                    return w.results_info = results_by_run_ids[w.run.id];
                });
                _this2.run_wrappers.sort(function (a, b) {
                    return a.results_info.place - b.results_info.place;
                });
            })();
        }
    }

    TourScoresWrapper.prototype.getDisciplineJudgesByRoles = function getDisciplineJudgesByRoles() {
        if (arguments.length === 1) {
            return this.discipline_judges_by_roles[arguments[0]] ? this.discipline_judges_by_roles[arguments[0]].map(function (b) {
                return b.discipline_judge;
            }) : [];
        }
        var res = [];
        for (var i = 0; i < arguments.length; ++i) {
            res = res.concat(this.discipline_judges_by_roles[arguments[i]] || []);
        }
        res.sort(function (a, b) {
            return a.idx - b.idx;
        });
        return res.map(function (b) {
            return b.discipline_judge;
        });
    };

    TourScoresWrapper.prototype.getScoresTableByRoles = function getScoresTableByRoles() {
        var discipline_judge_ids = this.getDisciplineJudgesByRoles.apply(this, arguments).map(function (dj) {
            return dj.id;
        });
        return this.run_wrappers.map(function (w) {
            return w.getScoresByJudgeIds(discipline_judge_ids);
        });
    };

    TourScoresWrapper.prototype.getResultsInfo = function getResultsInfo() {
        return this.run_wrappers.map(function (w) {
            return w.results_info;
        });
    };

    TourScoresWrapper.prototype.getRuns = function getRuns() {
        return this.run_wrappers.map(function (w) {
            return w.run;
        });
    };

    return TourScoresWrapper;
}();

function getParticipantDisplay(participant) {
    if (participant.formation_name !== "") {
        return React.createElement(
            "p",
            null,
            participant.formation_name
        );
    }
    return participant.sportsmen.map(function (s, idx) {
        return React.createElement(
            "p",
            { key: idx },
            s.last_name + " " + s.first_name
        );
    });
}

function getScoringType(discipline_judge, scoring_system_name) {
    switch (discipline_judge.role) {
        case "dance_judge":
            switch (scoring_system_name) {
                case "rosfarr.formation":
                    return "formation";
                case "rosfarr.formation_acro":
                    return "formation_acro";
                case "rosfarr.simplified":
                    return "simplified";
                default:
                    return "dance";
            }
        case "acro_judge":
            switch (scoring_system_name) {
                case "rosfarr.am_final_fw":
                    return "dance";
                default:
                    return "acro";
            }
        case "tech_judge":
            return "tech";
        case "head_judge":
            return "head";
    }
}

},{}],7:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.tour_names = exports._ = undefined;

var _ru = require("./ru");

var _ = exports._ = _ru.translate;
var tour_names = exports.tour_names = (0, _ru.getPossibleTourNames)();

},{"./ru":8}],8:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.translate = translate;
function translate(src, arg) {
    function chooseEnding(n, e1, e2, e5) {
        var x = n % 100;
        if (Math.floor(x / 10) === 1) {
            return e5;
        }
        if (x % 10 === 1) {
            return e1;
        }
        if (x % 10 >= 5 || x % 10 === 0) {
            return e5;
        }
        return e2;
    }

    var PHRASES = {
        "admin": {
            "alerts": {
                "about": function about(version, date) {
                    return React.createElement(
                        "div",
                        { className: "about" },
                        React.createElement(
                            "p",
                            null,
                            React.createElement(
                                "b",
                                null,
                                "RockJudge ",
                                version
                            ),
                            " (от ",
                            date,
                            ") — система для подсчета результатов соревнований по акробатическому рок-н-роллу."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Авторские права на систему RockJudge полностью принадлежат разработчику Артему Казакову. Соавтор системы Антон Амелин."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Система распространяется по лицензии Linum d.o.o (info@linum.hr). Для использования системы судейства RockJudge необходимо и достаточно иметь право использования системы Linum LPS."
                        ),
                        React.createElement(
                            "p",
                            null,
                            "Официальный сайт: ",
                            React.createElement(
                                "a",
                                { href: "https://rockjudge.com/", target: "_blank" },
                                "https://rockjudge.com/"
                            )
                        )
                    );
                },
                "add_programs_after_creation": "Программы можно будет добавить только после сохранения участника",
                "auto_printer_available": "Автоматическая печать корректно настроена и может быть использована.",
                "auto_printer_not_available": "Автоматическая печать недоступна на этом компьтере.",
                "no_finalized": "Отсутствуют финализированные туры",
                "unfinalize_warning": React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "p",
                        null,
                        React.createElement(
                            "strong",
                            null,
                            "Финализация должна отменяться только в исключительных случаях!"
                        )
                    ),
                    React.createElement(
                        "p",
                        null,
                        "Если же это действительно необходимо, обратите внимание, что после повторной финализации список участников следующего тура будет автоматически пересоздан. Результаты участников, прошедших в следующий тур после первой финализации и не прошедших после повторной будут безвозвратно утеряны!"
                    ),
                    React.createElement(
                        "p",
                        null,
                        "И не забудьте заново напечатать все тблицы."
                    )
                )
            },
            "auto_printer": {
                "discipline": "Дисциплина",
                "discipline_results": "Результаты дисциплины",
                "heats": "Заходы сл. тура",
                "print_test_page": "Напечатать тестовую страницу",
                "queue": "Очередь печати",
                "queue_empty": "Очередь пуста",
                "results_1": "Краткая таблица",
                "results_2": "Средняя таблица",
                "results_3": "Подробная таблица",
                "rules": "Задания",
                "test": "",
                "test_page": "Тестовая страница",
                "test_text": "Это тестовая страница RockJudge"
            },
            "buttons": {
                "add_club": "Добавить клуб",
                "add_competition": "Создать соревнование",
                "add_competition_plan_item": "Добавить элемент",
                "add_discipline": "Добавить дисциплину",
                "add_judge": "Добавить судью",
                "add_participant": "Добавить участника",
                "add_tour": "Добавить тур",
                "confirm_score": "Зафиксировать",
                "docx_heats": "Заходы в DOCX",
                "docx_numbers": "Номера в DOCX",
                "docx_results": "Результаты в DOCX",
                "export": "Экспортировать",
                "import": "Импортировать",
                "launch_auto_printer": "Запуск автоматической печати",
                "load_acro": "Загрузить акробатику",
                "refresh_clients": "Перезагрузить все устройства",
                "reload_clients": "Обновить данные на всех устройствах",
                "switch_to_plan": "Сортирока по программе",
                "switch_to_disciplines": "Сортирока по дисциплинам",
                "to_start_page": "На главную",
                "unconfirm_score": "Отмена фиксации",
                "unfinalize": "Отменить финализацию"
            },
            "confirms": {
                "delete_club": "Вы действительно хотите удалить этот клуб?",
                "delete_competition": "Вы действительно хотите удалить это соревнование?",
                "delete_discipline": "Вы действительно хотите удалить эту дисциплину?",
                "delete_judge": "Вы действительно хотите удалить этого судью?",
                "delete_participant": "Вы действительно хотите удалить этого участника?",
                "delete_program": "Вы действительно хотите удалить эту программу?",
                "delete_tour": "Вы действительно хотите удалить этот тур?",
                "refresh_clients": "Вы действительно хотите перезагрузить страницу на всех клиентах?",
                "reload_clients": "Вы действительно хотите обновить данные на всех клиентах?",
                "unfinalize_tour": "Вы действительно хотите отменить финализацию тура? Введите «unfinalize», чтобы продолжить"
            },
            "headers": {
                "about": "О программе",
                "auto_printer": "Автоматическая печать",
                "clients_management": "Управление подключенными устройствами",
                "clubs": "Клубы-участники",
                "clubs_management": "Управление клубами",
                "clubs_summary": "Сводка по клубам",
                "competition_plan": "Программа соревнований",
                "competition_plan_management": "Программа соревнований",
                "competition_report": "Протокол соревнований",
                "competition_results": "Результаты соревнований",
                "competitions_management": "Управление соревнованиями",
                "discipline_judges": "Распределение судей по дисциплинам",
                "discipline_results": "Результаты дисциплины",
                "disciplines_management": "Управление дисциплинами",
                "disciplines_shown": "Информация только по следующим дисциплинам:",
                "disciplines_summary": "Сводка по дисциплинам",
                "export_competition": "Экспорт данных турнира и результатов",
                "import_competition": "Импорт данных турнира",
                "import_export": "Импорт / экспорт",
                "judges": "Судейская бригада",
                "judges_management": "Управление судьями",
                "load_acrobatics": "Загрузка акробатики",
                "participants_management": "Управление участниками",
                "service_menu": "Сервисное меню",
                "start_list": "Стартовый лист",
                "tour_heats": "Заходы участников",
                "tour_results": "Результаты тура",
                "unfinalize_tour": "Отмена финализации тура",
                "unpicked_tours": "Не включены в программу"
            },
            "labels": {
                "competition_date": "Дата проведения",
                "competition_name": "Наименование соревнования",
                "discipline": "Дисциплина",
                "group_by_clubs": "Группировать по клубам",
                "include_acrobatics": "Включить акробатику",
                "include_clubs": "Включить данные о клубах",
                "include_discipline_judges": "Включить распределение судей по дисциплинам",
                "include_extended_info": "Включить расширенную информацию",
                "include_formation_sportsmen": "Включить состав формейшнов",
                "include_judges": "Включить данные о судьях",
                "no_files_selected": "Выберите файл...",
                "paste_acro": "Вставьте данные из калькулятора акробатики",
                "show_summary": "Показывать только количество",
                "sub": "зап" },
            // substitute
            "messages": {
                "invalid_passcode": "Введён неверный код потверждения"
            },
            "menu": {
                "competition_report": "Протокол соревнований",
                "discipline_results": "Результаты дисциплины",
                "import_export": "Импорт / экспорт",
                "manage_clubs": "Управление клубами",
                "manage_competition_plan": "Программа соревнований",
                "manage_disciplines": "Управление дисциплинами",
                "manage_judges": "Управление судьями",
                "manage_sportsmen": "Управление спортсменами",
                "manage_tours": "Управление турами",
                "start_list": "Стартовый лист"
            },
            "phrases": {
                "n_participants": function n_participants(n) {
                    return n.toString() + " участник" + chooseEnding(n, "", "а", "ов");
                },
                "n_sportsmen": function n_sportsmen(n) {
                    return n.toString() + " спортсмен" + chooseEnding(n, "", "а", "ов");
                },
                "total_n_participants": function total_n_participants(n) {
                    return "Итого " + n + " участник" + chooseEnding(n, "", "а", "ов");
                }
            },
            "judging-tabs": {
                "tour-admin": "Управление",
                "heats": "Заходы",
                "results-1": "Краткая таблица",
                "results-2": "Средняя таблица",
                "results-3": "Подробная таблица",
                "discipline-results": "Результаты дисциплины"
            }
        },
        "errors": {
            "admin": {
                "load_syntax_error": "Некорректный формат данных"
            },
            "api": {
                "duplicated_external_id": "В данных имеются записи с повторяющимимся external_id",
                "unable_to_get": function unable_to_get(wanted) {
                    return "Невозможно получить " + wanted + " из запроса";
                }
            },
            "club": {
                "delete_with_participants": "Невозможно удалить клуб, к которому привязаны участники"
            },
            "competition": {
                "delete_non_empty": "Невозможно удалить соревнование, содержащее дисциплины, клубы или судей"
            },
            "competition_plan": {
                "too_many_tours": function too_many_tours(d) {
                    return ["Ошибка в программе соревнований", "В дисциплине " + d + " содержится больше туров, чем создано в системе"];
                }
            },
            "discipline": {
                "change_judges_with_finalized_tour": "Невозможно изменить состав судей для дисциплины, содержащей финализированные туры",
                "delete_with_participants": "Невозможно удалить дисциплину, содержащую участников",
                "delete_with_tours": "Невозможно удалить дисциплину, содержащую туры"
            },
            "discipline_judge": {
                "delete_with_finalized": "Невозможно удалить судью, у корого есть финализированне туры",
                "delete_with_scores": "Невозможно удалить судью принявшего участие в судействе хотя бы одного тура",
                "repeating_judge": function repeating_judge(name) {
                    return name + " встречается в списке судей более одного раза";
                }
            },
            "global": {
                "internal_server_error": ["Ошибка на сервере", "проверьте логи для информации"]
            },
            "judge": {
                "delete_with_disciplines": "Невозможно удалить судью, входящего в судейскую бригаду хотя бы одной дисциплины"
            },
            "participant": {
                "delete_with_finalized_tours": "Невозможно удалить участника, принявшего участие хотя бы в одном финализированном туре"
            },
            "run": {
                "set_performed_flag_on_finalized": "Невозможно изменить статус захода финализинованного тура"
            },
            "score": {
                "score_not_exist": "Попытка получить значение несуществующей оценки судьи",
                "update_on_finalized_tour": "Невозможно изменить оценку в финализированном туре"
            },
            "tour": {
                "add_before_finalized": "Невозможно добавить новый тур перед финализированным",
                "delete_finalized": "Невозможно удалить финализированный тур",
                "delete_in_competition_plan": "Невозможно удалить тур, присутствующий в программе соревнований",
                "init_finailzed": "Невозможно пересоздать финализированный тур",
                "invalid_add_after_id": "Попытка добаить тур в несуществующее место",
                "load_to_non_empty": function load_to_non_empty(d) {
                    return ["Невозможно загрузить туры для дисциплины", "Дисциплина " + d + " уже содержит туры"];
                },
                "next_is_finailzed": "Следующий тур не должен быть финализирован",
                "no_next_tour": "Данный тур последний в программе соревнований",
                "not_in_competition_plan": "Данный тур не содержится в программе соревнований",
                "prev_not_finailzed": "Предыдущий тур должен быть финализирован",
                "start_finalized": "Невозможно запустить финализированный тур",
                "update_finalized": "Для финализированного тура не допускается изменение квоты вывода, типа тура или системы судейства"
            }
        },
        "global": {
            "buttons": {
                "add": "Добавить",
                "close": "Закрыть",
                "deselect_all": "Снять все",
                "edit": "Редактировать",
                "delete": "Удалить",
                "discard": "Отменить",
                "load": "Загрузить",
                "save": "Сохранить",
                "select_all": "Выбрать все",
                "submit": "Сохранить"
            },
            "labels": {
                "browse": "Обзор...",
                "connecting": "Подключение к сети",
                "connection_problem": "Проблемы с сетью",
                "yes": "Да",
                "no": "Нет"
            },
            "messages": {
                "connection_error": "Похоже, имеются проблемы с сетью",
                "error_header": "Ошибка",
                "success": "Операция успешно завершена"
            },
            "phrases": {
                "heat_n": function heat_n(n) {
                    return "Заход №" + n.toString();
                },
                "judge_n": function judge_n(n) {
                    return "Линейный судья №" + n.toString();
                },
                "participant_n": function participant_n(n, name, n_sp) {
                    return n_sp > 2 ? "Формейшн №" + n.toString() + (name ? ": " + name : "") : (n_sp === 2 ? "Пара №" : "Участник №") + n.toString();
                }
            }
        },
        "judging": {
            "buttons": {
                "confirm_score": "Зафиксировать",
                "init_tour": "Пересоздать тур",
                "finalize_tour": "Финализировать",
                "reset_acrobatic_override": "Сброс",
                "shuffle_heats": "Перемешать заходы",
                "start_tour": "Начать тур",
                "stop_tour": "Остановить тур"
            },
            "confirms": {
                "finalize_tour": "Вы действительно хотите финализировать этот тур?",
                "init_tour": "Вы действительно хотите пересоздать этот тур?",
                "load_program": "Вы действительно хотите перезагрузить программу для этого участника?",
                "shuffle_heats": "Вы действительно хотите перемешать заходы?",
                "stop_tour": "Вы действительно хотите остановить этот тур?"
            },
            "headers": {
                "acrobatic_overrides": "Корректировки базовых оценок акробатики"
            },
            "labels": {
                "acro_description": "Описание трюка",
                "acro_idx": "№ трюка",
                "acrobatics": "Акробатика",
                "club": "Клуб",
                "confirmed": "Зафиксировано",
                "heat": "Заход",
                "new_score": "Корр.",
                "number": "№",
                "old_score": "База",
                "participant_name": "Участник",
                "performed": "В",
                "total_score": "Сумма баллов"
            }
        },
        "models": {
            "club": {
                "name": "Название клуба",
                "city": "Город",
                "external_id": "Внешний ID"
            },
            "competition": {
                "active": "Активно",
                "date": "Дата",
                "info": "Дополнительная информация для протокола",
                "info_item_title": "Заголовок",
                "info_item_value": "Значение",
                "name": "Название"
            },
            "competition_plan_item": {
                "discipline": "Дисциплина",
                "estimated_beginning": "Начало",
                "estimated_duration": "Длительность",
                "name": "Название",
                "sp": "Приоритет",
                "tour": "Тур",
                "verbose_name": "Название"
            },
            "discipline": {
                "discipline_judges": "Судьи",
                "external_id": "Внешний ID",
                "name": "Название дисциплины",
                "sp": "Приоритет"
            },
            "discipline_judge": {
                "roles": {
                    "acro_judge": "А",
                    "dance_judge": "T",
                    "head_judge": "Гл",
                    "tech_judge": "Тех"
                },
                "roles_legend": React.createElement(
                    "table",
                    { className: "w-100" },
                    React.createElement(
                        "tbody",
                        null,
                        React.createElement(
                            "tr",
                            null,
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "Гл — главный судья"
                            ),
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "Т — судья танца"
                            ),
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "А — судья акробатики"
                            ),
                            React.createElement(
                                "td",
                                { className: "w-25" },
                                "Тex — технический судья"
                            )
                        )
                    )
                )
            },
            "judge": {
                "category": "Категория",
                "external_id": "Вн. ID",
                "name": "Ф. И. О.",
                "number": "Номер",
                "role": "Роль в судействе",
                "role_description": "Должность",
                "sp": "Приоритет"
            },
            "participant": {
                "acro_description": "Описание трюка",
                "acro_descriptions": "Описание трюков",
                "acro_score": "Оценка",
                "acrobatics": "Акробатика",
                "club_name": "Клуб",
                "club_city": "Город",
                "coaches": "Тренеры",
                "discipline_name": "Дисциплина",
                "first_name": "Имя",
                "gender": "Пол",
                "gender_f": "Ж",
                "gender_m": "М",
                "general_info": "Основная информация",
                "formation_name": "Название команды формейшн",
                "last_name": "Фамилия",
                "name": "Участник",
                "number": "Номер",
                "programs": "Программы",
                "sportsmen": "Спортсмены",
                "sportsmen_year_of_birth": "Г.р.",
                "substitute_n": "Осн.",
                "substitute_y": "Зап.",
                "year_of_birth": "Год рождения",
                "yob": "Г.р."
            },
            "program": {
                "default_for": "По умолчанию",
                "name": "Название программы"
            },
            "tour": {
                "default_program": "Акробатика по умолчанию",
                "is_hope_tour": "Тур «Надежды»",
                "name": "Название тура",
                "num_advances": "Квота вывода",
                "participants_per_heat": "Участников в заходе",
                "scoring_system_name": "Система судейства"
            }
        },
        "screen_operator": {
            "buttons": {
                "reset_heat": "Сброс номера захода",
                "reset_place": "Сброс места"
            },
            "headers": {
                "discipline": "Дисциплина",
                "heat": "Заход",
                "places": "Места для вывода",
                "tour": "Тур"
            },
            "labels": {
                "place": "место",
                "heat": "заход"
            }
        },
        "presenter": {
            "headers": {
                "clubs": "Клубы-участники",
                "heats": "Заходы",
                "info": "Информация",
                "judges": "Судьи",
                "results": "Результаты"
            },
            "labels": {
                "no_active_tour": "Нет активного тура",
                "place": "место"
            }
        },
        "results": {
            "alerts": {
                "not_finalized": "Данные результаты не являются окончательными."
            },
            "buttons": {
                "print": "Печать",
                "simple_view": "Упрощенная таблица",
                "verbose_view": "Подробная таблица"
            }
        },
        "start_page": {
            "headers": {
                "select_competition": "Выберите соревнование для продолжения",
                "select_role": "Выберите свою роль"
            },
            "messages": {
                "no_competitions": "Нет активных соревнований",
                "competitions_management_link": function competitions_management_link(link) {
                    return React.createElement(
                        "span",
                        null,
                        "Управление соревнованиями находится по адресу ",
                        React.createElement(
                            "a",
                            { href: link },
                            link
                        )
                    );
                }
            },
            "roles": {
                "administrator": "Администратор",
                "presenter": "Ведущий",
                "screen": "Экран",
                "screen_operator": "Оператор экрана"
            }
        },
        "tablet": {
            "alerts": {
                "has_unconfirmed_scores": "Имеются незафиксированные оценки судей в последнем заходе."
            },
            "buttons": {
                "finalize_tour": "Финализировать тур",
                "finalize_tour_and_start_next": "Финализировать тур и перейти к следующему",
                "next_heat": "След. заход",
                "not_performed": "Невыход на площадку",
                "performed": "Отмена невыхода на площадку",
                "prev_heat": "Пред. заход",
                "reset_stopwatch": "Сброс",
                "start_stopwatch": "Старт",
                "stop_stopwatch": "Стоп",
                "stop_tour": "Завершить тур",
                "stop_tour_and_start_next": "Перейти к следующему туру",
                "to_start_page": "На главную"
            },
            "confirms": {
                "finalize_tour": "Вы действительно хотите финализировать этот тур?",
                "finalize_tour_and_start_next": "Вы действительно хотите финализировать этот тур и перейти к следующему туру?",
                "stop_tour": "Вы действительно хотите остановить этот тур?",
                "stop_tour_and_start_next": "Вы действительно хотите перейти к следующему туру?"
            },
            "headers": {
                "acro_n": function acro_n(n) {
                    return "Акробатика №" + (n + 1);
                },
                "heat": "Заход",
                "presenter": "Ведущий",
                "select_page": "Страница"
            },
            "messages": {
                "not_judging_discipline": "Вы не участвуете в судействе данной дисциплины",
                "not_judging_participant": "Вы не оцениваете этого участника",
                "not_judging_tour": "Вы не оцениваете этот тур",
                "not_performing": "Не выступает"
            },
            "pages": {
                "acrobatics": "Акробатика",
                "actions": "Действия",
                "dance": "Танец",
                "heats": "Заходы",
                "results": "Результаты"
            }
        },

        "scoring_systems": {
            "rosfarr": {
                "tablet": {
                    "acro_judge": {
                        "fall_down": "Падения (-30)"
                    },
                    "dance_judge": {
                        "acrobatics": "Акробатика",
                        "big_mistakes": "Большие ошибки (-30)",
                        "composition": "Композиция",
                        "dance_figs": "Танцевальные фигуры",
                        "dance_tech": "Техника танцевания",
                        "form_fall_down": "Падения (-3)",
                        "form_mistakes": "Ошибки (-2)",
                        "form_small_mistakes": "Маленькие ошибки (-2)",
                        "form_big_mistakes": "Большие ошибки (-3)",
                        "fw_man": "Основной ход, партнёр (сбавка в %)",
                        "fw_woman": "Основной ход, партнёрша (сбавка в %)",
                        "impression": "Общее впечатление",
                        "points": "Оценка",
                        "small_mistakes": "Маленькие ошибки (-5)"
                    },
                    "global": {
                        "total_score": "Сумма баллов"
                    },
                    "head_judge": {
                        "acrobatic_overrides": "Корректировки акробатики",
                        "black_card": "-100",
                        "dance_judge_scores": "Оценки линейных судей",
                        "ok": "OK",
                        "penalty_type": "Штрафные санкции",
                        "previous_penalties": "Предыдущие штрафы",
                        "red_card": "-30",
                        "yellow_card": "-3",
                        "form_yellow_card": "-5",
                        "form_red_card": "-15"
                    },
                    "tech_judge": {
                        "jump_steps": "Основные ходы",
                        "reset_to_n": function reset_to_n(n) {
                            return "Сброс на " + n.toString();
                        },
                        "timing": "Длительность"
                    }
                },
                "results": {
                    "breakdown": {
                        "a": "A",
                        "acro_n": function acro_n(n) {
                            return "A" + n.toString();
                        },
                        "bm": "БО",
                        "c": "К",
                        "df": "ТФ",
                        "dt": "ТT",
                        "fd": "П",
                        "fm": "ОХм",
                        "fw": "ОХж",
                        "i": "ОВ",
                        "m": "Ош",
                        "p": "М",
                        "sm": "МО",
                        "t": "Σ"
                    },
                    "headers": {
                        "participants_advanced": "Прошли в следующий тур",
                        "participants_not_advanced": "Не прошли в следующий тур",
                        "participants_not_performed": "Не выступали"
                    },
                    "labels": {
                        "acro_score": "Результат акро",
                        "acrobatics": "Акробатика",
                        "acrobatics_verbose": "Акробатика (заявка/факт)",
                        "card": "Штраф",
                        "fw_score": "Результат ТН",
                        "fw_score_short": "ТН",
                        "info": "Участник, результат",
                        "next_tour": "Следующий тур",
                        "not_performed": "Не принимал участие",
                        "number": "№",
                        "participant_club": "Клуб",
                        "participant_coaches": "Тренеры",
                        "participant_name": "Участник",
                        "penalty": "Штраф главного судьи",
                        "place": "Место",
                        "sportsmen": "Спортсмены",
                        "sportsmen_year_of_birth": "Г.р.",
                        "total_score": "Итог"
                    }
                }
            }
        },

        "scoring_systems_names": {
            "rosfarr": {
                "acro": "РосФАРР, акробатические программы",
                "am_final_acro": "РосФАРР, A и M классы, финал, акробатика",
                "am_final_fw": "РосФАРР, A и M классы, финал, техника ног",
                "formation": "РосФАРР, формейшн без акробатики",
                "formation_acro": "РосФАРР, формейшн с акробатикой",
                "no_acro": "РосФАРР, танцевальные программы",
                "simplified": "РосФАРР, упрощенная система (1–40)"
            }
        },
        "judge_roles": {
            "": "-",
            "acro_judge": "Судья акробатики",
            "dance_judge": "Судья танца",
            "head_judge": "Главный судья",
            "tech_judge": "Технический судья"
        }
    };
    var path = src.split(".");
    var phrase_ptr = PHRASES;
    path.forEach(function (chunk) {
        return phrase_ptr = phrase_ptr[chunk];
    });
    if (typeof phrase_ptr === "undefined") {
        console.error("Unable to find translation for " + src);
        return;
    }
    if (typeof phrase_ptr === "function") {
        var args = [];
        for (var idx = 1; idx < arguments.length; ++idx) {
            args.push(arguments[idx]);
        }
        return phrase_ptr.apply(undefined, args);
    }
    return phrase_ptr;
}

var getPossibleTourNames = exports.getPossibleTourNames = function getPossibleTourNames() {
    return ["Финал", "Тур «Надежды»", "Отборочный тур", "1/2 финала", "1/4 финала", "1/8 финала", "1/16 финала", "Финал, техника ног", "Финал, акробатика"];
};

},{}],9:[function(require,module,exports){
"use strict";

var _main = require("clients/judge/main");

ReactDOM.render(React.createElement(_main.Judge, window.page_props), window.document.getElementById("content"));

},{"clients/judge/main":3}],10:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.Api = undefined;

var _loader = require("i10n/loader");

var _storage = require("server/storage");

var _dialogs = require("ui/dialogs");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ApiImpl = function () {
    function ApiImpl(method, data) {
        _classCallCheck(this, ApiImpl);

        this.method = method;
        this.data = data;
        this.cb_success = function () {};
        this.cb_error = function (msg, code, args) {
            return (0, _dialogs.showError)(code ? _loader._.apply(undefined, [code].concat(args)) : msg);
        };
        this.cb_fail = function () {
            var _console;

            for (var _len = arguments.length, data = Array(_len), _key = 0; _key < _len; _key++) {
                data[_key] = arguments[_key];
            }

            return (_console = console).error.apply(_console, ["API fail"].concat(data));
        };
        this.cb_done = function () {};
        this.update_db = function () {};
    }

    ApiImpl.prototype.onDone = function onDone(callback) {
        this.cb_done = callback;
        return this;
    };

    ApiImpl.prototype.onSuccess = function onSuccess(callback) {
        this.cb_success = callback;
        return this;
    };

    ApiImpl.prototype.onError = function onError(callback) {
        this.cb_error = callback;
        return this;
    };

    ApiImpl.prototype.onFail = function onFail(callback) {
        this.cb_fail = callback;
        return this;
    };

    ApiImpl.prototype.addToDB = function addToDB(model_type, model_id) {
        var st = arguments.length <= 2 || arguments[2] === undefined ? _storage.storage : arguments[2];

        this.update_db = function (response) {
            st.get(model_type).add(model_id, response);
        };
        return this;
    };

    ApiImpl.prototype.send = function send() {
        var _this = this;

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api", true);
        xhr.onload = function () {
            _this.cb_done();
            if (xhr.status !== 200) {
                _this.cb_fail();
                return;
            }
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                _this.update_db(response.response);
                _this.cb_success(response.response);
            } else {
                _this.cb_error(response.message, response.code, response.args);
            }
        };
        xhr.onerror = function () {
            _this.cb_done();
            _this.cb_fail();
        };
        var data = new FormData();
        data.append("client_id", window.client_id);
        data.append("data", JSON.stringify(this.data));
        data.append("method", this.method);
        xhr.send(data);
    };

    return ApiImpl;
}();

var Api = exports.Api = function Api() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
    }

    return new (Function.prototype.bind.apply(ApiImpl, [null].concat(args)))();
};

},{"i10n/loader":7,"server/storage":12,"ui/dialogs":14}],11:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.message_dispatcher = undefined;

var _storage = require("server/storage");

var _components = require("ui/components");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MessageDispatcher = function () {
    function MessageDispatcher() {
        _classCallCheck(this, MessageDispatcher);

        this.closed = false;
        this.listeners = {};
        this.listeners_cnt = 0;
        this.connect();
    }

    MessageDispatcher.prototype.connect = function connect() {
        console.log("Connecting to websocket...");
        this.ws = new SockJS("http://" + window.location.host + "/ws");
        this.ws.onopen = function () {
            _components.connection_status.setOk();
            console.log("Connected.");
            if (this.closed) {
                this.onMessage({
                    data: JSON.stringify({
                        messages: [["reload_data", null]],
                        model_updates: []
                    })
                });
            }
        }.bind(this);
        this.ws.onclose = function () {
            _components.connection_status.setFail();
            console.log("Connection closed.");
            this.closed = true;
            setTimeout(this.connect.bind(this), 500);
        }.bind(this);
        this.ws.onmessage = this.onMessage.bind(this);
    };

    MessageDispatcher.prototype.onMessage = function onMessage(message) {
        var _this = this;

        var data = JSON.parse(message.data);
        if (data["client_id"]) {
            window.client_id = data["client_id"];
            return;
        }
        data.messages.forEach(function (data) {
            var msg_type = data[0];
            var msg_data = data[1];
            var listeners = this.listeners[msg_type] || {};
            if (msg_type === "force_refresh") {
                window.location.reload(true);
            }
            Object.keys(this.listeners[msg_type] || {}).forEach(function (key) {
                return listeners[key](msg_data);
            });
        }.bind(this));
        var data_changed = false;
        data.model_updates.forEach(function (model_info) {
            data_changed = _storage.storage.updateModel(model_info.model, model_info.id, model_info.data) || data_changed;
        });
        if (data_changed) {
            (function () {
                var listeners = _this.listeners["db_update"] || {};
                Object.keys(listeners).forEach(function (key) {
                    if (listeners[key]) {
                        listeners[key]();
                    }
                });
            })();
        }
    };

    MessageDispatcher.prototype.getListenerId = function getListenerId() {
        return this.listeners_cnt++;
    };

    MessageDispatcher.prototype.addListener = function addListener(msg_types, callback) {
        var id = this.getListenerId();
        msg_types.split(" ").forEach(function (msg_type) {
            if (!this.listeners[msg_type]) {
                this.listeners[msg_type] = {};
            }
            this.listeners[msg_type][id] = callback;
        }.bind(this));
        return id;
    };

    MessageDispatcher.prototype.removeListener = function removeListener(listener_id) {
        Object.keys(this.listeners).forEach(function (key) {
            delete this.listeners[key][listener_id];
        }.bind(this));
    };

    return MessageDispatcher;
}();

var message_dispatcher = exports.message_dispatcher = new MessageDispatcher();

},{"server/storage":12,"ui/components":13}],12:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Ref = function () {
    function Ref(storage, model_name, id) {
        _classCallCheck(this, Ref);

        this.model_name = model_name;
        this.id = id;
        this.storage = storage;
    }

    Ref.prototype.get = function get() {
        return this.storage.get(this.model_name).by_id(this.id);
    };

    return Ref;
}();

var Model = function () {
    function Model(storage, id, model_storage) {
        _classCallCheck(this, Model);

        this.id = id;
        this.__storage = storage;
        this.__key_types = {};
        this.__model_storage = model_storage;
    }

    Model.prototype.addBackRef = function addBackRef(key, ref) {
        this[key] = ref;
        this.__key_types[key] = "^";
    };

    Model.prototype.update = function update(data) {
        var _this = this;

        var create = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

        for (var idx in data) {
            if (data.hasOwnProperty(idx)) {
                if (idx.charAt(0) === "*" || idx.charAt(0) === "^") {
                    if (!create && typeof this[idx.slice(1)] === "undefined") {
                        continue;
                    }
                }
                if (idx.charAt(0) === "*") {
                    (function () {
                        var key = idx.slice(1);
                        _this[key] = [];
                        var back_ref = new Ref(_this.__storage, _this.__model_storage.model_name, _this.id);
                        var back_ref_key = data[idx].back_ref;
                        data[idx].children.forEach(function (nested_data) {
                            if (_typeof(nested_data.data) === "object") {
                                this.__storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                            }
                            var ref = new Ref(this.__storage, nested_data.model, nested_data.id);
                            ref.get().addBackRef(back_ref_key, back_ref);
                            this[key].push(ref);
                        }.bind(_this));
                        _this.__key_types[key] = "*";
                    })();
                } else if (idx.charAt(0) === "^") {
                    var key = idx.slice(1);
                    var nested_data = data[idx];
                    if ((typeof nested_data === "undefined" ? "undefined" : _typeof(nested_data)) === "object") {
                        this.__storage.get(nested_data.model).add(nested_data.id, nested_data.data);
                    }
                    this[key] = new Ref(this.__storage, nested_data.model, nested_data.id);
                    this.__key_types[key] = "^";
                } else {
                    this[idx] = data[idx];
                    this.__key_types[idx] = "";
                }
            }
        }
    };

    Model.prototype.serialize = function serialize(schema) {
        var _this2 = this;

        var result = {};

        var _loop = function _loop(key) {
            if (_this2.__key_types.hasOwnProperty(key)) {
                switch (_this2.__key_types[key]) {
                    case "*":
                        if (key in schema) {
                            result[key] = _this2[key].map(function (ref) {
                                return ref.get().serialize(schema[key]);
                            });
                        }
                        break;
                    case "^":
                        if (key in schema) {
                            result[key] = _this2[key].get().serialize(schema[key]);
                        }
                        break;
                    default:
                        result[key] = _this2[key];
                }
            }
        };

        for (var key in this.__key_types) {
            _loop(key);
        }result.id = this.id;
        return result;
    };

    return Model;
}();

var ModelsStorage = function () {
    function ModelsStorage(storage, model_name) {
        _classCallCheck(this, ModelsStorage);

        this.model_name = model_name;
        this.models = {};
        this.storage = storage;
    }

    ModelsStorage.prototype.add = function add(id, data) {
        if (typeof this.models[id] === "undefined") {
            this.models[id] = new Model(this.storage, id, this);
        }
        this.models[id].update(data);
    };

    ModelsStorage.prototype.update = function update(id, data) {
        if (this.models[id]) {
            this.models[id].update(data, false);
            return true;
        }
        return false;
    };

    ModelsStorage.prototype.by_id = function by_id(id) {
        return this.models[id];
    };

    ModelsStorage.prototype.all = function all() {
        var keys = Object.getOwnPropertyNames(this.models);
        return keys.map(function (key) {
            return this.models[key];
        }.bind(this));
    };

    return ModelsStorage;
}();

var Storage = function () {
    function Storage() {
        _classCallCheck(this, Storage);

        this.model_storages = {};
        this.domains = {};
    }

    Storage.prototype.getDomain = function getDomain(domain) {
        if (typeof this.domains[domain] === "undefined") {
            this.domains[domain] = new Storage();
        }
        return this.domains[domain];
    };

    Storage.prototype.delDomain = function delDomain(domain) {
        delete this.domains[domain];
    };

    Storage.prototype.get = function get(model_name) {
        if (typeof this.model_storages[model_name] === "undefined") {
            this.model_storages[model_name] = new ModelsStorage(this, model_name);
        }
        return this.model_storages[model_name];
    };

    Storage.prototype.del = function del(model_name) {
        delete this.model_storages[model_name];
    };

    Storage.prototype.updateModel = function updateModel(model_type, model_id, data) {
        var _this3 = this,
            _arguments = arguments;

        var data_changed = false;
        if (this.model_storages[model_type]) {
            data_changed = this.get(model_type).add(model_id, data) || data_changed;
        }
        Object.keys(this.domains).forEach(function (key) {
            var _domains$key;

            return data_changed = (_domains$key = _this3.domains[key]).updateModel.apply(_domains$key, _arguments) || data_changed;
        });
        // return data_changed;
        return true;
    };

    return Storage;
}();

var storage = exports.storage = new Storage();

},{}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.connection_status = exports.Loader = undefined;

var _loader = require("i10n/loader");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Loader = exports.Loader = function (_React$Component) {
    _inherits(Loader, _React$Component);

    function Loader() {
        _classCallCheck(this, Loader);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Loader.prototype.render = function render() {
        return React.createElement(
            "table",
            { style: { "height": "100%", "width": "100%" } },
            React.createElement(
                "tbody",
                null,
                React.createElement(
                    "tr",
                    null,
                    React.createElement(
                        "td",
                        { style: { "textAlign": "center" } },
                        React.createElement("img", { src: "/static/img/ajax-loader.gif" })
                    )
                )
            )
        );
    };

    return Loader;
}(React.Component);

var ConnectionStatusMock = function () {
    function ConnectionStatusMock() {
        _classCallCheck(this, ConnectionStatusMock);
    }

    ConnectionStatusMock.prototype.setOk = function setOk() {};

    ConnectionStatusMock.prototype.setFail = function setFail() {};

    return ConnectionStatusMock;
}();

var ConnectionStatus = function (_React$Component2) {
    _inherits(ConnectionStatus, _React$Component2);

    function ConnectionStatus(props) {
        _classCallCheck(this, ConnectionStatus);

        var _this2 = _possibleConstructorReturn(this, _React$Component2.call(this, props));

        _this2.state = {
            "connected": null
        };
        return _this2;
    }

    ConnectionStatus.prototype.componentWillUnmount = function componentWillUnmount() {
        this.stopInterval();
    };

    ConnectionStatus.init = function init() {
        var element = window.document.getElementById("connection_status");
        if (element) {
            return ReactDOM.render(React.createElement(ConnectionStatus, null), element);
        }
        return new ConnectionStatusMock();
    };

    ConnectionStatus.prototype.startInterval = function startInterval() {
        var _this3 = this;

        if (this.interval) {
            return;
        }
        this.interval = setInterval(function () {
            _this3.setState({
                tick: !_this3.state.tick
            });
        }, 750);
    };

    ConnectionStatus.prototype.stopInterval = function stopInterval() {
        if (!this.interval) {
            return;
        }
        clearInterval(this.interval);
        this.interval = null;
    };

    ConnectionStatus.prototype.setOk = function setOk() {
        this.stopInterval();
        this.setState({ connected: true, tick: false });
    };

    ConnectionStatus.prototype.setFail = function setFail() {
        this.startInterval();
        this.setState({ connected: false });
    };

    ConnectionStatus.prototype.render = function render() {
        if (this.state.connected) {
            return React.createElement("div", { className: "connection-status ok" });
        }
        if (this.state.connected === null) {
            return React.createElement(
                "div",
                { className: "connection-status alert-warning" },
                (0, _loader._)("global.labels.connecting")
            );
        }
        return React.createElement(
            "div",
            { className: "connection-status alert-danger" + (this.state.tick ? " tick" : "") },
            (0, _loader._)("global.labels.connection_problem")
        );
    };

    return ConnectionStatus;
}(React.Component);

var connection_status = exports.connection_status = ConnectionStatus.init();

},{"i10n/loader":7}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.showError = showError;
exports.showConfirm = showConfirm;

var _loader = require("i10n/loader");

function showError(msg) {
    var title = (typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object" ? msg[0] : (0, _loader._)("global.messages.error_header");
    var text = (typeof msg === "undefined" ? "undefined" : _typeof(msg)) === "object" ? msg[1] : msg;
    swal({
        title: title,
        text: text,
        type: "error",
        animation: false
    });
}

function showConfirm(message, action) {
    var close_on_confirm = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

    return swal({
        title: message,
        animation: false,
        showCancelButton: true,
        confirmButtonText: (0, _loader._)("global.labels.yes"),
        cancelButtonText: (0, _loader._)("global.labels.no"),
        closeOnConfirm: close_on_confirm
    }, action);
}

},{"i10n/loader":7}],15:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Printable = exports.Printable = function (_React$Component) {
    _inherits(Printable, _React$Component);

    function Printable() {
        _classCallCheck(this, Printable);

        return _possibleConstructorReturn(this, _React$Component.apply(this, arguments));
    }

    Printable.prototype.fetchPrintableData = function fetchPrintableData() {
        return this._body.innerHTML;
    };

    Printable.prototype.renderHeader = function renderHeader() {
        return this.props.header ? React.createElement(
            "div",
            { className: "p-header" },
            this.props.header
        ) : null;
    };

    Printable.prototype.renderTitle1 = function renderTitle1() {
        return this.props.title1 ? React.createElement(
            "h1",
            null,
            this.props.title1
        ) : null;
    };

    Printable.prototype.renderTitle2 = function renderTitle2() {
        return this.props.title2 ? React.createElement(
            "h2",
            null,
            this.props.title2
        ) : null;
    };

    Printable.prototype.renderTitle3 = function renderTitle3() {
        return this.props.title3 ? React.createElement(
            "h3",
            null,
            this.props.title3
        ) : null;
    };

    Printable.prototype.renderBody = function renderBody() {
        var _this2 = this;

        return React.createElement(
            "div",
            {
                className: "p-content",
                ref: function ref(e) {
                    return _this2._body = e;
                }
            },
            this.props.body
        );
    };

    Printable.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "printable" },
            this.renderHeader(),
            this.renderTitle1(),
            this.renderTitle2(),
            this.renderTitle3(),
            this.renderBody()
        );
    };

    _createClass(Printable, null, [{
        key: "propTypes",
        get: function get() {
            return {
                header: React.PropTypes.string,
                title1: React.PropTypes.string,
                title2: React.PropTypes.string,
                title3: React.PropTypes.string,
                body: React.PropTypes.node.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }]);

    return Printable;
}(React.Component);

},{}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports.StopWatch = exports.TabletPoint5Input = exports.TabletIntegerInput = exports.TabletPoint5SelectInput = exports.TabletIntegerSelectInput = exports.TabletSelectorInput = exports.Slider = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.onTouchOrClick = onTouchOrClick;
exports.onTouchEndOrClick = onTouchEndOrClick;

var _loader = require("i10n/loader");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function onTouchOrClick(handler) {
    var f = function f(event) {
        event.preventDefault();
        return handler(event);
    };
    return {
        onTouchStart: f,
        onClick: f
    };
}

function onTouchEndOrClick(handler, prevent_default) {
    var _handler = function _handler() {};
    var distance = 0;
    var latest_pos = [0, 0];
    var fire = function fire(event) {
        event.preventDefault();
        return _handler();
    };
    var discard = function discard() {
        _handler = function _handler() {};
    };
    var move = function move(event) {
        var current_pos = [event.touches[0].pageX, event.touches[0].pageY];
        var sqr = function sqr(x) {
            return x * x;
        };
        distance += Math.sqrt(sqr(current_pos[0] - latest_pos[0]) + sqr(current_pos[1] - latest_pos[1]));
        latest_pos = current_pos;
        if (distance > 20) {
            discard();
        }
    };
    var start = function start(event) {
        _handler = handler;
        distance = 0;
        latest_pos = [event.touches[0].pageX, event.touches[0].pageY];
    };
    return {
        onTouchStart: start,
        onTouchEnd: fire,
        onTouchMove: move,
        onTouchCancel: discard,
        onClick: handler
    };
}

var Slider = exports.Slider = function (_React$Component) {
    _inherits(Slider, _React$Component);

    _createClass(Slider, null, [{
        key: "propTypes",
        get: function get() {
            return {
                done: React.PropTypes.bool,
                doneText: React.PropTypes.string,
                slideText: React.PropTypes.string,
                onActivate: React.PropTypes.func
            };
        }
    }]);

    function Slider(props) {
        _classCallCheck(this, Slider);

        var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

        _this.state = {
            position: 0,
            touch: false,
            finished: false
        };
        _this.pin = null;
        return _this;
    }

    Slider.prototype.componentWillUpdate = function componentWillUpdate(nextProps) {
        if (!this.props.done && nextProps.done) {
            this.setState({
                finished: false
            });
        }
    };

    Slider.prototype.isFree = function isFree() {
        return !this.state.touch && !this.props.done && !this.state.finished;
    };

    Slider.prototype.getOuterTextOpacity = function getOuterTextOpacity() {
        if (this.state.finished) {
            return 0;
        }
        var value = Math.min(Math.max(100 - this.state.position, 0), 100);
        return (value / 100).toFixed(3);
    };

    Slider.prototype.getElementOffset = function getElementOffset(element) {
        var res = 0;
        while (element) {
            res += element.offsetLeft || 0;
            element = element.parentNode;
        }
        return res;
    };

    Slider.prototype.getTouch = function getTouch(event) {
        var touch = event.touches[0];
        var parent = event.target.parentNode;
        return touch.pageX - this.getElementOffset(parent);
    };

    Slider.prototype.getRelativeTouch = function getRelativeTouch(event) {
        var touch = event.touches[0];
        var parent = event.target;
        return touch.pageX - this.getElementOffset(parent);
    };

    Slider.prototype.getSliderPos = function getSliderPos(event) {
        var pos = this.getTouch(event) - this.pin;
        return Math.min(Math.max(pos, 0), 200);
    };

    Slider.prototype.onClick = function onClick(event) {
        if (this.state.finished || this.props.done) {
            return;
        }
        this.setState({
            posision: 200,
            touch: false,
            finished: true
        });
        this.props.onActivate();
    };

    Slider.prototype.onTouchStart = function onTouchStart(event) {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        this.pin = this.getRelativeTouch(event);
        this.setState({
            position: this.getSliderPos(event),
            touch: true
        });
    };

    Slider.prototype.onTouchMove = function onTouchMove(event) {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        this.setState({
            position: this.getSliderPos(event)
        });
    };

    Slider.prototype.onTouchEnd = function onTouchEnd(event) {
        event.preventDefault();
        if (this.state.finished || this.props.done) {
            return;
        }
        if (this.state.position === 200) {
            this.setState({
                position: 0,
                finished: true,
                touch: false
            });
            this.props.onActivate();
        } else {
            this.setState({
                position: 0,
                touch: false
            });
        }
    };

    Slider.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "slider noselect" },
            React.createElement(
                "div",
                { className: "inner" + (this.isFree() ? " free" : ""),
                    style: { left: this.props.done || this.state.finished ? "200px" : this.state.position + "px" },
                    onTouchStart: this.onTouchStart.bind(this),
                    onTouchMove: this.onTouchMove.bind(this),
                    onTouchEnd: this.onTouchEnd.bind(this),
                    onClick: this.onClick.bind(this)
                },
                "→"
            ),
            this.props.done ? React.createElement(
                "span",
                {
                    style: { color: "rgb(100,100,100)" },
                    className: "done-text"
                },
                this.props.doneText
            ) : React.createElement(
                "span",
                {
                    style: { color: "rgba(100,100,100," + this.getOuterTextOpacity() + ")" },
                    className: "slide-text" + (this.isFree() ? " free" : "")
                },
                this.props.slideText
            )
        );
    };

    return Slider;
}(React.Component);

var TabletSelectorInput = exports.TabletSelectorInput = function (_React$Component2) {
    _inherits(TabletSelectorInput, _React$Component2);

    function TabletSelectorInput() {
        _classCallCheck(this, TabletSelectorInput);

        return _possibleConstructorReturn(this, _React$Component2.apply(this, arguments));
    }

    TabletSelectorInput.prototype.getButtonsCount = function getButtonsCount() {
        if (this.props.style === "grid") {
            return this.props.row_size;
        }
        return this.props.choices.length;
    };

    TabletSelectorInput.prototype.onClick = function onClick(n) {
        this.props.onValueUpdate(n);
    };

    TabletSelectorInput.prototype.render = function render() {
        var _this3 = this;

        var result = [];
        this.props.choices.forEach(function (el, idx) {
            var key = el[0];
            var text = el[1];
            var active_class_name = _this3.props.active === key ? " active" : "";
            result.push(React.createElement(
                "button",
                _extends({
                    key: key
                }, onTouchOrClick(_this3.onClick.bind(_this3, key)), {
                    className: "tbtn score-btn" + active_class_name
                }),
                text
            ));
            if (_this3.props.style === "grid" && (idx + 1) % _this3.props.row_size === 0) {
                result.push(React.createElement("br", { key: "br" + idx }));
            }
        });
        var layout_class = this.props.style !== "two-lines" ? "selector-layout" : "selector-layout-2rows";
        var selected_class = this.props.active === null ? "" : " selected";
        return React.createElement(
            "div",
            { className: "scoring-layout " + layout_class + selected_class + " n-" + this.getButtonsCount().toString() },
            result
        );
    };

    _createClass(TabletSelectorInput, null, [{
        key: "propTypes",
        get: function get() {
            return {
                style: React.PropTypes.string,
                choices: React.PropTypes.string.isRequired,
                row_size: React.PropTypes.number,
                active: React.PropTypes.number,
                onValueUpdate: React.PropTypes.func.isRequired
            };
        }
    }]);

    return TabletSelectorInput;
}(React.Component);

var TabletIntegerSelectInput = exports.TabletIntegerSelectInput = function (_React$Component3) {
    _inherits(TabletIntegerSelectInput, _React$Component3);

    function TabletIntegerSelectInput() {
        _classCallCheck(this, TabletIntegerSelectInput);

        return _possibleConstructorReturn(this, _React$Component3.apply(this, arguments));
    }

    TabletIntegerSelectInput.prototype.createArray = function createArray(min, max) {
        var result = [];
        for (var idx = min; idx <= max; ++idx) {
            result.push([idx, idx.toString()]);
        }
        return result;
    };

    TabletIntegerSelectInput.prototype.render = function render() {
        return React.createElement(TabletSelectorInput, _extends({
            choices: this.createArray(this.props.min, this.props.max)
        }, this.props));
    };

    _createClass(TabletIntegerSelectInput, null, [{
        key: "propTypes",
        get: function get() {
            return {
                min: React.PropTypes.number.isRequired,
                max: React.PropTypes.number.isRequired
            };
        }
    }]);

    return TabletIntegerSelectInput;
}(React.Component);

var TabletPoint5SelectInput = exports.TabletPoint5SelectInput = function (_React$Component4) {
    _inherits(TabletPoint5SelectInput, _React$Component4);

    function TabletPoint5SelectInput() {
        _classCallCheck(this, TabletPoint5SelectInput);

        return _possibleConstructorReturn(this, _React$Component4.apply(this, arguments));
    }

    TabletPoint5SelectInput.prototype.createArray = function createArray(min, max) {
        var result = [];
        for (var idx = Math.round(2 * min); idx <= Math.round(2 * max); ++idx) {
            result.push([idx / 2, idx % 2 ? (idx / 2).toFixed(1) : Math.floor(idx / 2).toString()]);
        }
        return result;
    };

    TabletPoint5SelectInput.prototype.render = function render() {
        return React.createElement(TabletSelectorInput, _extends({
            choices: this.createArray(this.props.min, this.props.max)
        }, this.props));
    };

    _createClass(TabletPoint5SelectInput, null, [{
        key: "propTypes",
        get: function get() {
            return {
                min: React.PropTypes.number.isRequired,
                max: React.PropTypes.number.isRequired
            };
        }
    }]);

    return TabletPoint5SelectInput;
}(React.Component);

var TabletIntegerInput = exports.TabletIntegerInput = function (_React$Component5) {
    _inherits(TabletIntegerInput, _React$Component5);

    function TabletIntegerInput() {
        _classCallCheck(this, TabletIntegerInput);

        return _possibleConstructorReturn(this, _React$Component5.apply(this, arguments));
    }

    TabletIntegerInput.prototype.onMinus = function onMinus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": -1 });
        } else {
            this.props.onValueUpdate(this.props.value - 1);
        }
    };

    TabletIntegerInput.prototype.onPlus = function onPlus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": 1 });
        } else {
            this.props.onValueUpdate(this.props.value + 1);
        }
    };

    TabletIntegerInput.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "tablet-integer-input" },
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-minus"
                }, onTouchOrClick(this.onMinus.bind(this))),
                "−"
            ),
            React.createElement(
                "div",
                { className: "value" },
                this.props.value
            ),
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-plus"
                }, onTouchOrClick(this.onPlus.bind(this))),
                "+"
            )
        );
    };

    _createClass(TabletIntegerInput, null, [{
        key: "propTypes",
        get: function get() {
            return {
                value: React.PropTypes.number.isRequired,
                onValueUpdate: React.PropTypes.func.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                sendDeltas: false
            };
        }
    }]);

    return TabletIntegerInput;
}(React.Component);

var TabletPoint5Input = exports.TabletPoint5Input = function (_React$Component6) {
    _inherits(TabletPoint5Input, _React$Component6);

    function TabletPoint5Input() {
        _classCallCheck(this, TabletPoint5Input);

        return _possibleConstructorReturn(this, _React$Component6.apply(this, arguments));
    }

    TabletPoint5Input.prototype.onMinus = function onMinus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": -0.5 });
        } else {
            this.props.onValueUpdate(this.props.value - 0.5);
        }
    };

    TabletPoint5Input.prototype.onPlus = function onPlus() {
        if (this.props.sendDeltas) {
            this.props.onValueUpdate({ "delta": 0.5 });
        } else {
            this.props.onValueUpdate(this.props.value + 0.5);
        }
    };

    TabletPoint5Input.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "tablet-integer-input" },
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-minus"
                }, onTouchOrClick(this.onMinus.bind(this))),
                "−"
            ),
            React.createElement(
                "div",
                { className: "value" },
                this.props.value
            ),
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-plus"
                }, onTouchOrClick(this.onPlus.bind(this))),
                "+"
            )
        );
    };

    _createClass(TabletPoint5Input, null, [{
        key: "propTypes",
        get: function get() {
            return {
                value: React.PropTypes.number.isRequired,
                onValueUpdate: React.PropTypes.func.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }, {
        key: "defaultProps",
        get: function get() {
            return {
                sendDeltas: false
            };
        }
    }]);

    return TabletPoint5Input;
}(React.Component);

var stopwatches = {};

var StopWatch = exports.StopWatch = function (_React$Component7) {
    _inherits(StopWatch, _React$Component7);

    _createClass(StopWatch, null, [{
        key: "propTypes",
        get: function get() {
            return {
                score_id: React.PropTypes.number,
                onValueUpdate: React.PropTypes.func.isRequired,
                sendDeltas: React.PropTypes.bool
            };
        }
    }]);

    function StopWatch(props) {
        _classCallCheck(this, StopWatch);

        var _this8 = _possibleConstructorReturn(this, _React$Component7.call(this, props));

        _this8.state = stopwatches[_this8.props.score_id] || {
            active: false,
            value: 0,
            str_value: "0:00",
            interval: null
        };
        if (_this8.state.active) {
            _this8.state.interval = setInterval(_this8.tick.bind(_this8), 10); // eslint-disable-line react/no-direct-mutation-state
        }
        return _this8;
    }

    StopWatch.prototype.componentWillUnmount = function componentWillUnmount() {
        clearInterval(this.state.interval);
        stopwatches[this.props.score_id] = this.state;
    };

    StopWatch.prototype.now = function now() {
        return new Date().getTime();
    };

    StopWatch.prototype.toggle = function toggle() {
        this.state.active ? this.stop() : this.start();
    };

    StopWatch.prototype.start = function start() {
        this.setState({
            active: true,
            start_at: this.now() - this.state.value,
            interval: setInterval(this.tick.bind(this), 10)
        });
    };

    StopWatch.prototype.stop = function stop() {
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: this.value()
        });
    };

    StopWatch.prototype.reset = function reset() {
        clearInterval(this.state.interval);
        this.setState({
            active: false,
            value: 0
        });
    };

    StopWatch.prototype.value = function value() {
        return this.state.active ? this.now() - this.state.start_at : this.state.value;
    };

    StopWatch.prototype.tick = function tick() {
        var new_value = this.value();
        if (new_value !== this.state.value) {
            this.setState({
                value: this.value()
            });
        }
    };

    StopWatch.prototype.pad = function pad(num, size) {
        var s = "0000" + num.toString();
        return s.substr(s.length - size);
    };

    StopWatch.prototype.getStrValue = function getStrValue() {
        var val = this.value();
        var m = 0,
            s = 0;
        var result = '';
        m = Math.floor(val / (60 * 1000));
        val %= 60 * 1000;
        s = Math.floor(val / 1000);
        return m.toString() + ':' + this.pad(s, 2);
    };

    StopWatch.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "stopwatch" },
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-reset ignore-readonly"
                }, onTouchOrClick(this.reset.bind(this))),
                (0, _loader._)("tablet.buttons.reset_stopwatch")
            ),
            React.createElement(
                "button",
                _extends({
                    className: "tbtn btn-toggle ignore-readonly" + (this.state.active ? " active" : "")
                }, onTouchOrClick(this.toggle.bind(this))),
                this.state.active ? (0, _loader._)("tablet.buttons.stop_stopwatch") : (0, _loader._)("tablet.buttons.start_stopwatch")
            ),
            React.createElement(
                "div",
                { className: "time" },
                this.getStrValue()
            )
        );
    };

    return StopWatch;
}(React.Component);

},{"i10n/loader":7}]},{},[9])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXHJvc2ZhcnJcXHRvdXJfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXHRvdXJfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcY2xpZW50c1xcanVkZ2VcXG1haW4uanN4Iiwic3JjXFxqc3hcXGNsaWVudHNcXGp1ZGdlXFxyb3NmYXJyLmpzeCIsInNyY1xcanN4XFxjb21tb25cXGRvY3guanN4Iiwic3JjXFxqc3hcXGNvbW1vblxccm9zZmFyclxcYmFzZS5qc3giLCJzcmNcXGpzeFxcaTEwblxcbG9hZGVyLmpzeCIsInNyY1xcanN4XFxpMTBuXFxydS5qc3giLCJzcmNcXGpzeFxcanVkZ2UuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcYXBpLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXG1lc3NhZ2VfZGlzcGF0Y2hlci5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxzdG9yYWdlLmpzeCIsInNyY1xcanN4XFx1aVxcY29tcG9uZW50cy5qc3giLCJzcmNcXGpzeFxcdWlcXGRpYWxvZ3MuanN4Iiwic3JjXFxqc3hcXHVpXFxwcmludGFibGUuanN4Iiwic3JjXFxqc3hcXHVpXFx0YWJsZXRfY29tcG9uZW50cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNJQSxTQUFTLEVBQVQsR0FBYztBQUNWLFFBQUksT0FBTyxFQUFQLENBRE07QUFFVixTQUFLLElBQUksTUFBTSxDQUFOLEVBQVMsTUFBTSxVQUFVLE1BQVYsRUFBa0IsRUFBRSxHQUFGLEVBQU87QUFDN0MsYUFBSyxJQUFMLENBQVUsVUFBVSxHQUFWLENBQVYsRUFENkM7S0FBakQ7QUFHQSxXQUFPLDRCQUFFLDZCQUE2QixVQUFVLENBQVYsQ0FBN0IsU0FBOEMsS0FBaEQsQ0FBUCxDQUxV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SixDQUZEO0FBR1YsWUFBSSxTQUFTLEVBQVQsQ0FITTtBQUlWLFlBQUksS0FBSyxLQUFMLENBQVcsT0FBTyxLQUFLLElBQUwsQ0FBUCxDQUFmLENBSlU7QUFLVixlQUFPLEtBQUssSUFBTCxDQUxHO0FBTVYsWUFBSSxLQUFLLEtBQUwsQ0FBVyxNQUFNLElBQU4sQ0FBZixDQU5VO0FBT1YsZUFBTyxFQUFFLFFBQUYsS0FBZSxHQUFmLEdBQXFCLEtBQUssR0FBTCxDQUFTLENBQVQsRUFBWSxDQUFaLENBQXJCLENBUEc7OztBQXBFTCx3QkE2RVQsMkJBQVM7QUFDTCxlQUNJOztjQUFLLFdBQVUsV0FBVixFQUFMO1lBQ0k7OztBQUNJLCtCQUFVLGdDQUFWO21CQUNJLGVBQWUsS0FBSyxLQUFMLENBQVcsSUFBWCxDQUFnQixJQUFoQixDQUFmLEVBRlI7Z0JBSU0sZUFBRSxnQ0FBRixDQUpOO2FBREo7WUFPSTs7O0FBQ0ksK0JBQVkscUNBQXFDLEtBQUssS0FBTCxDQUFXLE1BQVgsR0FBb0IsU0FBcEIsR0FBZ0MsRUFBaEMsQ0FBckM7bUJBQ1IsZUFBZSxLQUFLLE1BQUwsQ0FBWSxJQUFaLENBQWlCLElBQWpCLENBQWYsRUFGUjtnQkFJTSxLQUFLLEtBQUwsQ0FBVyxNQUFYLEdBQW9CLGVBQUUsK0JBQUYsQ0FBcEIsR0FBeUQsZUFBRSxnQ0FBRixDQUF6RDthQVhWO1lBYUk7O2tCQUFLLFdBQVUsTUFBVixFQUFMO2dCQUNNLEtBQUssV0FBTCxFQUROO2FBYko7U0FESixDQURLOzs7V0E3RUE7RUFBa0IsTUFBTSxTQUFOIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgVG91clNjb3Jlc1dyYXBwZXIsIGdldFBhcnRpY2lwYW50RGlzcGxheSwgZ2V0U2NvcmluZ1R5cGUgfSBmcm9tIFwiY29tbW9uL3Jvc2ZhcnIvYmFzZVwiO1xyXG5cclxuXHJcbmZ1bmN0aW9uIF9fKCkge1xyXG4gICAgbGV0IGFyZ3MgPSBbXTtcclxuICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpZHhdKTtcclxuICAgIH1cclxuICAgIHJldHVybiBfKFwic2NvcmluZ19zeXN0ZW1zLnJvc2ZhcnIuXCIgKyBhcmd1bWVudHNbMF0sIC4uLmFyZ3MpO1xyXG59XHJcblxyXG5jbGFzcyBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZUNvbHVtbldpZHRocyB7XHJcbiAgICBjb25zdHJ1Y3RvcihuX2p1ZGdlcykge1xyXG4gICAgICAgIHRoaXMuanVkZ2Vfd2lkdGggPSBNYXRoLnJvdW5kKDcwIC8gbl9qdWRnZXMpO1xyXG4gICAgICAgIHRoaXMucGxhY2Vfd2lkdGggPSA3XHJcbiAgICAgICAgdGhpcy5pbmZvX3dpZHRoID0gMTAwIC0gdGhpcy5qdWRnZV93aWR0aCAqIG5fanVkZ2VzIC0gdGhpcy5wbGFjZV93aWR0aDtcclxuICAgIH1cclxuICAgIGdlblBsYWNlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuSW5mb1N0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmluZm9fd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuSnVkZ2VTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5qdWRnZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRvdXJSZXN1bHRzVmVyYm9zZVRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGZvcm1hdFNjb3JlKHNjb3JlLCB0ZW1wbGF0ZSkge1xyXG4gICAgICAgIGlmICghdGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgdGVtcGxhdGUgPSBcIiRcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHNjb3JlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8c3Bhbj4mbWRhc2g7PC9zcGFuPlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGVtcGxhdGUucmVwbGFjZShcIiRcIiwgc2NvcmUpLnJlcGxhY2UoXCJAXCIsIHNjb3JlLnRvRml4ZWQoMSkpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyRm9ybWF0aW9uU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmRmXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmRhbmNlX2ZpZ3MsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uaVwiKSAgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuaW1wcmVzc2lvbiwgXCJAXCIpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5tXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IHNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnBcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBhZGRpdGlvbGFsX2RhdGEucGxhY2VzW3Njb3JlLmlkXSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbiAgICByZW5kZXJGb3JtYXRpb25BY3JvU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5hXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmFjcm9iYXRpY3MsIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uZHRcIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuZGFuY2VfdGVjaCwgXCJAXCIpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmlcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmltcHJlc3Npb24sIFwiQFwiKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uc21cIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuc21hbGxfbWlzdGFrZXMpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5ibVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5iaWdfbWlzdGFrZXMpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24ucFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IGFkZGl0aW9sYWxfZGF0YS5wbGFjZXNbc2NvcmUuaWRdIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxuICAgIHJlbmRlckRhbmNlU2NvcmUoc2NvcmUpIHtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uZndcIikgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuZndfd29tYW4sIFwiLSQlXCIpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5mbVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5md19tYW4sIFwiLSQlXCIpIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uY1wiKSAgfTo8L3A+PC90aD48dGQ+PHA+eyB0aGlzLmZvcm1hdFNjb3JlKHNjb3JlLmRhdGEucmF3X2RhdGEuY29tcG9zaXRpb24pIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5zbVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmJtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmJpZ19taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+PC90ZD48L3RyPlxyXG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxuICAgIHJlbmRlckFjcm9TY29yZShzY29yZSkge1xyXG4gICAgICAgIGxldCBhY3JvX3Njb3JlcyA9IHNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9ucy5tYXAoZnVuY3Rpb24oc2NvcmUsIGlkeCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPHRyIGtleT17IGlkeCB9PlxyXG4gICAgICAgICAgICAgICAgPHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5hY3JvX25cIiwgaWR4ICsgMSkgfTo8L3A+PC90aD5cclxuICAgICAgICAgICAgICAgIDx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUsIFwiLSQlXCIpIH08L3A+PC90ZD5cclxuICAgICAgICAgICAgPC90cj5cclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxyXG4gICAgICAgICAgICB7IGFjcm9fc2NvcmVzIH1cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uZmRcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cclxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IHNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD48L3RkPjwvdHI+XHJcbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG4gICAgcmVuZGVyU2NvcmUoanVkZ2UsIHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcclxuICAgICAgICBzd2l0Y2ggKGdldFNjb3JpbmdUeXBlKGp1ZGdlLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkpIHtcclxuICAgICAgICBjYXNlIFwiZGFuY2VcIjpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRGFuY2VTY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKTtcclxuICAgICAgICBjYXNlIFwiYWNyb1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJBY3JvU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSk7XHJcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKTtcclxuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uX2Fjcm9cIjpcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyRm9ybWF0aW9uQWNyb1Njb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH08L3A+O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlclBhcnRpY2lwYW50SW5mbygpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPHA+PHN0cm9uZz57IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIsXHJcbiAgICAgICAgICAgICAgICBudWxsLFxyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aFxyXG4gICAgICAgICAgICApfTwvc3Ryb25nPjwvcD5cclxuICAgICAgICAgICAgeyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQpIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxuICAgIHJlbmRlckhlYWRKdWRnZVBlbmFsdHkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wZW5hbHR5XCIpIH06IDwvc3Ryb25nPlxyXG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZSA/IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZS5kYXRhLnRvdGFsX3Njb3JlIDogPHNwYW4+Jm1kYXNoOzwvc3Bhbj4gfTwvcD5cclxuICAgIH1cclxuICAgIHJlbmRlckFjcm9UYWJsZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGhhc19hY3JvX292ZXJyaWRlcyA9IGZhbHNlO1xyXG4gICAgICAgIGxldCByZW5kZXJfYWNyb190YWJsZSA9IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYWNyb1wiIHx8XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiO1xyXG4gICAgICAgIGlmICghcmVuZGVyX2Fjcm9fdGFibGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MuZm9yRWFjaChmdW5jdGlvbihhY3JvKSB7XHJcbiAgICAgICAgICAgIGlmIChhY3JvLnNjb3JlICE9PSBhY3JvLm9yaWdpbmFsX3Njb3JlKSB7XHJcbiAgICAgICAgICAgICAgICBoYXNfYWNyb19vdmVycmlkZXMgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgYWNyb19jZWxsX3dpZHRoID0gKDEwMCAvIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubGVuZ3RoKSArIFwiJVwiO1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8cD48c3Ryb25nPnsgaGFzX2Fjcm9fb3ZlcnJpZGVzID8gX18oXCJyZXN1bHRzLmxhYmVscy5hY3JvYmF0aWNzX3ZlcmJvc2VcIikgOiBfXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NcIikgfTo8L3N0cm9uZz48L3A+XHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJhY3JvLXRhYmxlXCI+PHRib2R5PlxyXG4gICAgICAgICAgICAgICAgPHRyPntcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLm1hcCgoYWNybywgaWR4KSA9PiA8dGQga2V5PXsgaWR4IH0gc3R5bGU9e3sgd2lkdGg6IGFjcm9fY2VsbF93aWR0aCB9fT48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjcm8ub3JpZ2luYWxfc2NvcmUudG9GaXhlZCgxKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGQ+KVxyXG4gICAgICAgICAgICAgICAgfTwvdHI+XHJcbiAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFzX2Fjcm9fb3ZlcnJpZGVzID8gPHRyPntcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT4gPHRkIGtleT17IGlkeCB9IHN0eWxlPXt7IHdpZHRoOiBhY3JvX2NlbGxfd2lkdGggfX0+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5zY29yZS50b0ZpeGVkKDEpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGQ+KVxyXG4gICAgICAgICAgICAgICAgICAgIH08L3RyPiA6IG51bGxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG4gICAgcmVuZGVyQW1DbGFzc0Z3U2NvcmUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPHA+PHN0cm9uZz57IF9fKFwicmVzdWx0cy5sYWJlbHMuZndfc2NvcmVcIikgfTwvc3Ryb25nPjoge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpICsgXCIgLyBcIiArXHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKVxyXG4gICAgICAgIH0gPC9wPlxyXG4gICAgfVxyXG4gICAgcmVuZGVyQW1DbGFzc0Fjcm9TY29yZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPHA+PHN0cm9uZz57IF9fKFwicmVzdWx0cy5sYWJlbHMuYWNyb19zY29yZVwiKSB9PC9zdHJvbmc+OiB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUuY3VycmVudF90b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKSArIFwiIC8gXCIgK1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLmN1cnJlbnRfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKVxyXG4gICAgICAgIH0gPC9wPlxyXG4gICAgfVxyXG4gICAgcmVuZGVyVG90YWxTY29yZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy50b3RhbF9zY29yZVwiKSB9OiB7IHRoaXMucHJvcHMucnVuLnRvdGFsX3Njb3JlIH08L3N0cm9uZz48L3A+O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyTm90UGVyZm9ybWVkTGFiZWwoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxwPjxlbT5cclxuICAgICAgICAgICAgeyBfXyhcInJlc3VsdHMubGFiZWxzLm5vdF9wZXJmb3JtZWRcIikgfVxyXG4gICAgICAgIDwvZW0+PC9wPlxyXG4gICAgfVxyXG4gICAgcmVuZGVyTmV4dFRvdXJMYWJlbCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMuaGFzX25leHRfdG91cikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgPHA+PHN0cm9uZz57IF9fKFwicmVzdWx0cy5sYWJlbHMubmV4dF90b3VyXCIpIH06IDwvc3Ryb25nPntcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8uYWR2YW5jZXMgPyBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIikgOiBfKFwiZ2xvYmFsLmxhYmVscy5ub1wiKVxyXG4gICAgICAgIH08L3A+XHJcbiAgICB9XHJcbiAgICByZW5kZXJJbmZvQmxvY2soKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJpbmZvLWJsb2NrXCIgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5JbmZvU3R5bGUoKSB9PlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyUGFydGljaXBhbnRJbmZvKCkgfVxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZEp1ZGdlUGVuYWx0eSgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFjcm9UYWJsZSgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFtQ2xhc3NGd1Njb3JlKCkgfVxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQW1DbGFzc0Fjcm9TY29yZSgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmUoKSB9XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOb3RQZXJmb3JtZWRMYWJlbCgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5leHRUb3VyTGFiZWwoKSB9XHJcbiAgICAgICAgPC90ZD5cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQganVkZ2VzX3Njb3JlcyA9IHRoaXMucHJvcHMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT5cclxuICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9IHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmUodGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlc1tpZHhdLCBzY29yZSwgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8uYWRkaXRpb25hbF9kYXRhKSB9XHJcbiAgICAgICAgICAgIDwvdGQ+KTtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICBqdWRnZXNfc2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZXMubWFwKChzY29yZSwgaWR4KSA9PlxyXG4gICAgICAgICAgICAgICAgPHRkIHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0ga2V5PXsgaWR4IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPjwvdGQ+KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDx0cj5cclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCIgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5QbGFjZVN0eWxlKCkgfT5cclxuICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5wbGFjZSB9PC9wPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySW5mb0Jsb2NrKCkgfVxyXG4gICAgICAgICAgICB7IGp1ZGdlc19zY29yZXMgfVxyXG4gICAgICAgIDwvdHI+XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHRvdXJfd3JhcHBlciA9IG5ldyBUb3VyU2NvcmVzV3JhcHBlcih0aGlzLnByb3BzLnRvdXIsIHRoaXMucHJvcHMucmVzdWx0cyk7XHJcbiAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2VzID0gdG91cl93cmFwcGVyLmdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKFwiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCIpO1xyXG4gICAgICAgIGxldCBzY29yZXNfdGFibGUgPSB0b3VyX3dyYXBwZXIuZ2V0U2NvcmVzVGFibGVCeVJvbGVzKFwiYWNyb19qdWRnZVwiLCBcImRhbmNlX2p1ZGdlXCIpO1xyXG4gICAgICAgIGxldCBoZWFkX2p1ZGdlX3Njb3JlcyA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJoZWFkX2p1ZGdlXCIpLm1hcCgocm93KSA9PiByb3dbMF0pO1xyXG4gICAgICAgIGxldCByZXN1bHRzX2luZm8gPSB0b3VyX3dyYXBwZXIuZ2V0UmVzdWx0c0luZm8oKTtcclxuICAgICAgICBsZXQgcnVucyA9IHRvdXJfd3JhcHBlci5nZXRSdW5zKCk7XHJcbiAgICAgICAgbGV0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xyXG4gICAgICAgIGxldCByb3dzID0gW107XHJcbiAgICAgICAgbGV0IHdpZHRocyA9IG5ldyBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZUNvbHVtbldpZHRocyhkaXNjaXBsaW5lX2p1ZGdlcy5sZW5ndGgpO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHJ1bnMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICByb3dzLnB1c2goPFRvdXJSZXN1bHRzVmVyYm9zZVRhYmxlUm93XHJcbiAgICAgICAgICAgICAgICBrZXk9eyBydW5zW2lkeF0uaWQgfVxyXG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XHJcbiAgICAgICAgICAgICAgICBydW49eyBydW5zW2lkeF0gfVxyXG4gICAgICAgICAgICAgICAgc2NvcmVzPXsgc2NvcmVzX3RhYmxlW2lkeF0gfVxyXG4gICAgICAgICAgICAgICAgd2lkdGhzPXsgd2lkdGhzIH1cclxuICAgICAgICAgICAgICAgIGhlYWRfanVkZ2Vfc2NvcmU9eyBoZWFkX2p1ZGdlX3Njb3Jlc1tpZHhdIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mbz17IHJlc3VsdHNfaW5mb1tpZHhdIH1cclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzPXsgZGlzY2lwbGluZV9qdWRnZXMgfVxyXG4gICAgICAgICAgICAgICAgaGFzX25leHRfdG91cj17IGhhc19uZXh0X3RvdXIgfSAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgbGV0IGp1ZGdlc19oZWFkZXIgPSBkaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZnVuY3Rpb24oZGopIHtcclxuICAgICAgICAgICAgcmV0dXJuIDx0aCBrZXk9eyBkai5pZCB9IHdpZHRoPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PjxwPnsgZGouanVkZ2UubnVtYmVyIH08L3A+PC90aD5cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCIgc3R5bGU9e3sgd2lkdGg6IFwiMTAwJVwiIH19PlxyXG4gICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBsYWNlXCIgd2lkdGg9eyB3aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIiB3aWR0aD17IHdpZHRocy5nZW5JbmZvU3R5bGUoKSB9PjxwPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IF9fKFwicmVzdWx0cy5sYWJlbHMuaW5mb1wiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBqdWRnZXNfaGVhZGVyIH1cclxuICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgIHsgcm93cyB9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgPC90YWJsZT5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlQ29sdW1uV2lkdGhzIHtcclxuICAgIGNvbnN0cnVjdG9yKG5fanVkZ2VzKSB7XHJcbiAgICAgICAgdGhpcy5qdWRnZV93aWR0aCA9IE1hdGgucm91bmQoNTUgLyBuX2p1ZGdlcyk7XHJcbiAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCA9IDE0O1xyXG4gICAgICAgIHRoaXMucGxhY2Vfd2lkdGggPSA2O1xyXG4gICAgICAgIHRoaXMubnVtYmVyX3dpZHRoID0gMztcclxuICAgICAgICB0aGlzLm5hbWVfd2lkdGggPSAxMDAgLSB0aGlzLmp1ZGdlX3dpZHRoICogbl9qdWRnZXMgLVxyXG4gICAgICAgICAgICB0aGlzLnRvdGFsX3Njb3JlX3dpZHRoIC0gdGhpcy5wbGFjZV93aWR0aCAtIHRoaXMubnVtYmVyX3dpZHRoO1xyXG4gICAgfVxyXG4gICAgZ2VuUGxhY2VTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5wbGFjZV93aWR0aH0lYCxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZW5OdW1iZXJTdHlsZSgpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICB3aWR0aDogYCR7dGhpcy5udW1iZXJfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuTmFtZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLm5hbWVfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ2VuVG90YWxTY29yZVN0eWxlKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnRvdGFsX3Njb3JlX3dpZHRofSVgLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdlbkp1ZGdlU3R5bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyRm9ybWF0aW9uU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xyXG4gICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPjxzdHJvbmc+eyBhZGRpdGlvbGFsX2RhdGEucGxhY2VzW3Njb3JlLmlkXSB9PC9zdHJvbmc+ICh7IHNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgxKSB9KTwvcD5cclxuICAgIH1cclxuICAgIHJlbmRlclNjb3JlKGp1ZGdlLCBzY29yZSwgYWRkaXRpb2xhbF9kYXRhKSB7XHJcbiAgICAgICAgaWYgKGp1ZGdlLnJvbGUgPT09IFwiZGFuY2VfanVkZ2VcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25cIiB8fCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlLnRvRml4ZWQoMikgfTwvcD47XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IGp1ZGdlc19zY29yZXMgPSB0aGlzLnByb3BzLnNjb3Jlcy5tYXAoKHNjb3JlLCBpZHgpID0+IDx0ZCBrZXk9eyBpZHggfT4ge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclNjb3JlKHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZXNbaWR4XSwgc2NvcmUsIHRoaXMucHJvcHMucmVzdWx0c19pbmZvLmFkZGl0aW9uYWxfZGF0YSlcclxuICAgICAgICB9IDwvdGQ+KTtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICBqdWRnZXNfc2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZXMubWFwKChzY29yZSwgaWR4KSA9PlxyXG4gICAgICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD48L3RkPik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCB0b3RhbF9zY29yZSA9IHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmU7XHJcbiAgICAgICAgcmV0dXJuIDx0cj5cclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInBsYWNlXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHRoaXMucHJvcHMucmVzdWx0c19pbmZvLnBsYWNlIH08L3A+PC90ZD5cclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm51bWJlclwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfTwvcD48L3RkPlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj57IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudCkgfTwvdGQ+XHJcbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25cIiAmJiB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCJcclxuICAgICAgICAgICAgICAgID8gPHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyAoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD47XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZW0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgX18oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZV9zaG9ydFwiKSB9e1wiOiBcIn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeyB0b3RhbF9zY29yZS5wcmV2aW91c190b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKSB9e1wiIC8gXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9PGJyIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9lbT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH08L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+eyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfTwvc3Ryb25nPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7L3tcIiBcIn17IHRvdGFsX3Njb3JlLnNlY29uZGFyeV9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjtcclxuICAgICAgICAgICAgICAgICAgICB9KSgpIH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+IDogbnVsbCB9XHJcbiAgICAgICAgICAgIHsganVkZ2VzX3Njb3JlcyB9XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJjYXJkXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUgJiYgdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkXHJcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZVxyXG4gICAgICAgICAgICAgICAgICAgIDogPHNwYW4+Jm1kYXNoOzwvc3Bhbj5cclxuICAgICAgICAgICAgfTwvcD48L3RkPlxyXG4gICAgICAgIDwvdHI+XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyQWR2YW5jZXNIZWFkZXIoaGFzX25leHRfdG91ciAscHJldl9yb3csIG5leHRfcm93LCBwcmV2X3J1biwgbmV4dF9ydW4sIGlkeCwgbl9jb2xzKSB7XHJcbiAgICAgICAgbGV0IHByZXZfc3RhdHVzID0gcHJldl9yb3dcclxuICAgICAgICAgICAgPyBwcmV2X3J1bi5wZXJmb3JtZWRcclxuICAgICAgICAgICAgICAgID8gcHJldl9yb3cuYWR2YW5jZXNcclxuICAgICAgICAgICAgICAgICAgICA/IFwiYWR2YW5jZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgIDogXCJub3RfYWR2YW5jZWRcIlxyXG4gICAgICAgICAgICAgICAgOiBcIm5vdF9wZXJmb3JtZWRcIlxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgbGV0IG5leHRfc3RhdHVzID0gbmV4dF9ydW4ucGVyZm9ybWVkXHJcbiAgICAgICAgICAgID8gbmV4dF9yb3cuYWR2YW5jZXNcclxuICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXHJcbiAgICAgICAgICAgICAgICA6IFwibm90X2FkdmFuY2VkXCJcclxuICAgICAgICAgICAgOiBcIm5vdF9wZXJmb3JtZWRcIjtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gcHJldl9zdGF0dXMgIT09IG5leHRfc3RhdHVzXHJcbiAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X3BlcmZvcm1lZFwiXHJcbiAgICAgICAgICAgICAgICA/IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIikgfTwvcD5cclxuICAgICAgICAgICAgICAgIDogaGFzX25leHRfdG91clxyXG4gICAgICAgICAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X2FkdmFuY2VkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIikgfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgOiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19hZHZhbmNlZFwiKSB9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxyXG4gICAgICAgICAgICA6IG51bGw7XHJcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIk5UXCIgKyBpZHggfT48dGggY2xhc3NOYW1lPVwiYWR2YW5jZXMtaGVhZGVyXCIgY29sU3Bhbj17IG5fY29scyB9PlxyXG4gICAgICAgICAgICB7IHJlc3VsdCB9XHJcbiAgICAgICAgPC90aD48L3RyPlxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCB0b3VyX3dyYXBwZXIgPSBuZXcgVG91clNjb3Jlc1dyYXBwZXIodGhpcy5wcm9wcy50b3VyLCB0aGlzLnByb3BzLnJlc3VsdHMpO1xyXG4gICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlcyA9IHRvdXJfd3JhcHBlci5nZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcclxuICAgICAgICBsZXQgc2NvcmVzX3RhYmxlID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcclxuICAgICAgICBsZXQgaGVhZF9qdWRnZV9zY29yZXMgPSB0b3VyX3dyYXBwZXIuZ2V0U2NvcmVzVGFibGVCeVJvbGVzKFwiaGVhZF9qdWRnZVwiKS5tYXAoKHJvdykgPT4gcm93WzBdKTtcclxuICAgICAgICBsZXQgcmVzdWx0c19pbmZvID0gdG91cl93cmFwcGVyLmdldFJlc3VsdHNJbmZvKCk7XHJcbiAgICAgICAgbGV0IHJ1bnMgPSB0b3VyX3dyYXBwZXIuZ2V0UnVucygpO1xyXG4gICAgICAgIGxldCBoYXNfbmV4dF90b3VyID0gdGhpcy5wcm9wcy50b3VyLm5leHRfdG91cl9pZCAhPT0gbnVsbDtcclxuICAgICAgICBsZXQgaGFzX3RvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25cIiAmJiB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI7XHJcbiAgICAgICAgbGV0IHdpZHRocyA9IG5ldyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGVDb2x1bW5XaWR0aHMoZGlzY2lwbGluZV9qdWRnZXMubGVuZ3RoICsgMSk7XHJcbiAgICAgICAgbGV0IGp1ZGdlc19oZWFkZXIgPSBkaXNjaXBsaW5lX2p1ZGdlcy5tYXAoZnVuY3Rpb24oZGopIHtcclxuICAgICAgICAgICAgbGV0IHN1ZmZpeCA9IGdldFNjb3JpbmdUeXBlKGRqLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPT09IFwiYWNyb1wiID8gXCIgKEEpXCIgOiBcIlwiO1xyXG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17IGRqLmlkIH0gc3R5bGU9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+PHA+eyBkai5qdWRnZS5udW1iZXIgKyBzdWZmaXggfTwvcD48L3RoPlxyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBydW5zLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgcm93cy5wdXNoKHRoaXMucmVuZGVyQWR2YW5jZXNIZWFkZXIoXHJcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvW2lkeCAtIDFdLFxyXG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvW2lkeF0sXHJcbiAgICAgICAgICAgICAgICBydW5zW2lkeCAtIDFdLFxyXG4gICAgICAgICAgICAgICAgcnVuc1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgaWR4LFxyXG4gICAgICAgICAgICAgICAgNCArIGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCArIGhhc190b3RhbF9zY29yZVxyXG4gICAgICAgICAgICApKTtcclxuICAgICAgICAgICAgcm93cy5wdXNoKDxUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGVSb3dcclxuICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XHJcbiAgICAgICAgICAgICAgICBoZWFkX2p1ZGdlX3Njb3JlPXsgaGVhZF9qdWRnZV9zY29yZXNbaWR4XSB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm89eyByZXN1bHRzX2luZm9baWR4XSB9XHJcbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cclxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1bnNbaWR4XSB9XHJcbiAgICAgICAgICAgICAgICBzY29yZXM9eyBzY29yZXNfdGFibGVbaWR4XSB9XHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlcz17IGRpc2NpcGxpbmVfanVkZ2VzIH1cclxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXI9eyBoYXNfbmV4dF90b3VyIH1cclxuICAgICAgICAgICAgICAgIGhhc190b3RhbF9zY29yZT17IGhhc190b3RhbF9zY29yZSB9IC8+XHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCI+XHJcbiAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0cj5cclxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwicGxhY2VcIiBzdHlsZT17IHdpZHRocy5nZW5QbGFjZVN0eWxlKCkgfT48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGxhY2VcIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJudW1iZXJcIiBzdHlsZT17IHdpZHRocy5nZW5OdW1iZXJTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInBhcnRpY2lwYW50XCIgc3R5bGU9eyB3aWR0aHMuZ2VuTmFtZVN0eWxlKCkgfT48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBoYXNfdG90YWxfc2NvcmUgPyA8dGggY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIiBzdHlsZT17IHdpZHRocy5nZW5Ub3RhbFNjb3JlU3R5bGUoKSB9PjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy50b3RhbF9zY29yZVwiKSB9PC9wPjwvdGg+IDogbnVsbCB9XHJcbiAgICAgICAgICAgICAgICAgICAgeyBqdWRnZXNfaGVhZGVyIH1cclxuICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwiY2FyZFwiIHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBfXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgPHRib2R5PlxyXG4gICAgICAgICAgICAgICAgeyByb3dzIH1cclxuICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICA8L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUb3VyUmVzdWx0c1RhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgY2FyZCA9IHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxyXG4gICAgICAgICAgICA/IHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZVxyXG4gICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZVxyXG4gICAgICAgICAgICAgICAgOiBcIjBcIlxyXG4gICAgICAgICAgICA6IDxzcGFuPiZtZGFzaDs8L3NwYW4+O1xyXG4gICAgICAgIGxldCB0b3RhbF9zY29yZSA9IHRoaXMucHJvcHMuaGFzX3RvdGFsX3Njb3JlID9cclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkXHJcbiAgICAgICAgICAgICAgICA/IDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57IHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH08L3N0cm9uZz5cclxuICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9XHJcbiAgICAgICAgICAgICAgICA8L3A+XHJcbiAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD5cclxuICAgICAgICAgICAgOiBudWxsO1xyXG4gICAgICAgIHJldHVybiA8dHI+XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8ucGxhY2UgfTwvcD48L3RkPlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy02IG51bWJlclwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudC5udW1iZXIgfTwvcD48L3RkPlxyXG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0zMCBwYXJ0aWNpcGFudFwiPnsgZ2V0UGFydGljaXBhbnREaXNwbGF5KHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50KSB9PC90ZD5cclxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIj48cD57IHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9PC9wPjwvdGQ+XHJcbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5oYXNfdG90YWxfc2NvcmUgPyA8dGQgY2xhc3NOYW1lPVwidy0xOCBzY29yZVwiPnsgdG90YWxfc2NvcmUgfTwvdGQ+IDogbnVsbCB9XHJcbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBjYXJkIH08L3A+PC90ZD5cclxuICAgICAgICA8L3RyPlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNUYWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXJBZHZhbmNlc0hlYWRlcihoYXNfbmV4dF90b3VyLCBwcmV2X3JvdywgbmV4dF9yb3csIHByZXZfcnVuLCBuZXh0X3J1biwgaWR4LCBuX2NvbHMpIHtcclxuICAgICAgICBsZXQgcHJldl9zdGF0dXMgPSBwcmV2X3Jvd1xyXG4gICAgICAgICAgICA/IHByZXZfcnVuLnBlcmZvcm1lZFxyXG4gICAgICAgICAgICAgICAgPyBwcmV2X3Jvdy5hZHZhbmNlc1xyXG4gICAgICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgOiBcIm5vdF9hZHZhbmNlZFwiXHJcbiAgICAgICAgICAgICAgICA6IFwibm90X3BlcmZvcm1lZFwiXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICBsZXQgbmV4dF9zdGF0dXMgPSBuZXh0X3J1bi5wZXJmb3JtZWRcclxuICAgICAgICAgICAgPyBuZXh0X3Jvdy5hZHZhbmNlc1xyXG4gICAgICAgICAgICAgICAgPyBcImFkdmFuY2VkXCJcclxuICAgICAgICAgICAgICAgIDogXCJub3RfYWR2YW5jZWRcIlxyXG4gICAgICAgICAgICA6IFwibm90X3BlcmZvcm1lZFwiO1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBwcmV2X3N0YXR1cyAhPT0gbmV4dF9zdGF0dXNcclxuICAgICAgICAgICAgPyBuZXh0X3N0YXR1cyA9PT0gXCJub3RfcGVyZm9ybWVkXCJcclxuICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfbm90X3BlcmZvcm1lZFwiKSB9PC9wPlxyXG4gICAgICAgICAgICAgICAgOiBoYXNfbmV4dF90b3VyXHJcbiAgICAgICAgICAgICAgICAgICAgPyBuZXh0X3N0YXR1cyA9PT0gXCJub3RfYWR2YW5jZWRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiKSB9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX2FkdmFuY2VkXCIpIH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgOiBudWxsXHJcbiAgICAgICAgICAgIDogbnVsbDtcclxuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiTlRcIiArIGlkeCB9Pjx0aCBjbGFzc05hbWU9XCJhZHZhbmNlcy1oZWFkZXJcIiBjb2xTcGFuPXsgbl9jb2xzIH0+XHJcbiAgICAgICAgICAgIHsgcmVzdWx0IH1cclxuICAgICAgICA8L3RoPjwvdHI+XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHRvdXJfd3JhcHBlciA9IG5ldyBUb3VyU2NvcmVzV3JhcHBlcih0aGlzLnByb3BzLnRvdXIsIHRoaXMucHJvcHMucmVzdWx0cyk7XHJcbiAgICAgICAgbGV0IGhlYWRfanVkZ2Vfc2NvcmVzID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImhlYWRfanVkZ2VcIikubWFwKChyb3cpID0+IHJvd1swXSk7XHJcbiAgICAgICAgbGV0IHJlc3VsdHNfaW5mbyA9IHRvdXJfd3JhcHBlci5nZXRSZXN1bHRzSW5mbygpO1xyXG4gICAgICAgIGxldCBydW5zID0gdG91cl93cmFwcGVyLmdldFJ1bnMoKTtcclxuICAgICAgICBsZXQgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XHJcbiAgICAgICAgbGV0IGhhc190b3RhbF9zY29yZSA9IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIgJiYgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiO1xyXG4gICAgICAgIGxldCByb3dzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcnVucy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLnJlbmRlckFkdmFuY2VzSGVhZGVyKFxyXG4gICAgICAgICAgICAgICAgaGFzX25leHRfdG91cixcclxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHggLSAxXSxcclxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHhdLFxyXG4gICAgICAgICAgICAgICAgcnVuc1tpZHggLSAxXSxcclxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4XSxcclxuICAgICAgICAgICAgICAgIGlkeCxcclxuICAgICAgICAgICAgICAgIDUgKyBoYXNfdG90YWxfc2NvcmVcclxuICAgICAgICAgICAgKSk7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaCg8VG91clJlc3VsdHNUYWJsZVJvd1xyXG4gICAgICAgICAgICAgICAga2V5PXsgcnVuc1tpZHhdLmlkIH1cclxuICAgICAgICAgICAgICAgIGhlYWRfanVkZ2Vfc2NvcmU9eyBoZWFkX2p1ZGdlX3Njb3Jlc1tpZHhdIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mbz17IHJlc3VsdHNfaW5mb1tpZHhdIH1cclxuICAgICAgICAgICAgICAgIHJ1bj17IHJ1bnNbaWR4XSB9XHJcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyPXsgaGFzX25leHRfdG91ciB9XHJcbiAgICAgICAgICAgICAgICBoYXNfdG90YWxfc2NvcmU9eyBoYXNfdG90YWxfc2NvcmUgfSAvPlxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYnJpZWYtdGFibGVcIj5cclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImJvcmRlcmVkLXRhYmxlXCI+XHJcbiAgICAgICAgICAgICAgICA8dGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGggY2xhc3NOYW1lPVwidy03IHBsYWNlXCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBsYWNlXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctMzAgcGFydGljaXBhbnRcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfbmFtZVwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJjbHViXCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X2NsdWJcIikgfTwvcD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IGhhc190b3RhbF9zY29yZSA/IDx0aCBjbGFzc05hbWU9XCJ3LTE4IHNjb3JlXCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH08L3A+PC90aD4gOiBudWxsIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctOCBjYXJkXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IF9fKFwicmVzdWx0cy5sYWJlbHMuY2FyZFwiKSB9PC9wPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICAgICAgeyByb3dzIH1cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xyXG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xyXG5pbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IG1lc3NhZ2VfZGlzcGF0Y2hlciB9IGZyb20gXCJzZXJ2ZXIvbWVzc2FnZV9kaXNwYXRjaGVyXCI7XHJcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IFByaW50YWJsZSB9IGZyb20gXCJ1aS9wcmludGFibGVcIjtcclxuaW1wb3J0IHsgRG9jeCB9IGZyb20gXCJjb21tb24vZG9jeFwiO1xyXG5cclxuaW1wb3J0IHsgVG91clJlc3VsdHNUYWJsZSwgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlLCBUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZSB9IGZyb20gXCIuL3Jvc2ZhcnIvdG91cl9yZXN1bHRzXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFRvdXJSZXN1bHRzQnV0dG9ucyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzaWduYWwobWVzc2FnZSkge1xyXG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnlcIiBvbkNsaWNrPXsgdGhpcy5zaWduYWwoXCJkb2N4XCIpIH0+XHJcbiAgICAgICAgICAgICAgICBET0NYXHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNCb2R5IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuXHJcbiAgICAvLyBJbml0aWFsaXphdGlvblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXHJcbiAgICAgICAgICAgIHJlc3VsdHM6IG51bGwsXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuVE9VUl9TQ0hFTUEgPSB7XHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHtcclxuICAgICAgICAgICAgICAgIGNvbXBldGl0aW9uOiB7fSxcclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAganVkZ2U6IHt9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcnVuczoge1xyXG4gICAgICAgICAgICAgICAgYWNyb2JhdGljczoge30sXHJcbiAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxyXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQ6IHtcclxuICAgICAgICAgICAgICAgICAgICBjbHViOiB7fSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxNb3VudCgpIHtcclxuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlLmdldERvbWFpbihcInJlc3VsdHNfXCIgKyB0aGlzLnByb3BzLnRvdXJfaWQpO1xyXG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmRiX3VwZGF0ZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImRiX3VwZGF0ZVwiLCB0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpO1xyXG4gICAgICAgIHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJ0b3VyX3Jlc3VsdHNfY2hhbmdlZCByZWxvYWRfZGF0YVwiLCBmdW5jdGlvbihtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSB8fCBtZXNzYWdlLnRvdXJfaWQgPT09IHRoaXMucHJvcHMudG91cl9pZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5sb2FkUmVzdWx0cygpO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmF1dG9Eb2N4KSB7XHJcbiAgICAgICAgICAgIGxldCBpbnRlcnZhbF9pZCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlZnMuY29udGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCh0aGlzLnByb3BzLmF1dG9Eb2N4LmZpbGVuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmF1dG9Eb2N4LmNhbGxiYWNrKHRoaXMucHJvcHMuYXV0b0RvY3guZmlsZW5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5yZW1vdmVMaXN0ZW5lcih0aGlzLnJlbG9hZF9saXN0ZW5lcik7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIucmVtb3ZlTGlzdGVuZXIodGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lcik7XHJcbiAgICAgICAgc3RvcmFnZS5kZWxEb21haW4oXCJyZXN1bHRzX1wiICsgdGhpcy5wcm9wcy50b3VyX2lkKTtcclxuICAgIH1cclxuICAgIHJlbG9hZEZyb21TdG9yYWdlKCkge1xyXG4gICAgICAgIGxldCBzZXJpYWxpemVkID0gdGhpcy5zdG9yYWdlLmdldChcIlRvdXJcIilcclxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMucHJvcHMudG91cl9pZClcclxuICAgICAgICAgICAgLnNlcmlhbGl6ZSh0aGlzLlRPVVJfU0NIRU1BKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgdG91cjogc2VyaWFsaXplZCxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGxvYWRSZXN1bHRzKCkge1xyXG4gICAgICAgIEFwaShcInRvdXIuZ2V0X3Jlc3VsdHNcIiwge3RvdXJfaWQ6IHRoaXMucHJvcHMudG91cl9pZH0pXHJcbiAgICAgICAgLm9uU3VjY2VzcyhmdW5jdGlvbihuZXdfcmVzdWx0cykge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBuZXdfcmVzdWx0cyxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UoKTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICAgICAgLnNlbmQoKTtcclxuICAgIH1cclxuICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgIEFwaShcInRvdXIuZ2V0XCIsIHsgdG91cl9pZDogdGhpcy5wcm9wcy50b3VyX2lkLCBjaGlsZHJlbjogdGhpcy5UT1VSX1NDSEVNQX0pXHJcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0aGlzLnByb3BzLnRvdXJfaWQsIHRoaXMuc3RvcmFnZSlcclxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcykpXHJcbiAgICAgICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gTGlzdGVuZXJzXHJcblxyXG4gICAgb25TaWduYWwobWVzc2FnZSkge1xyXG4gICAgICAgIHN3aXRjaCAobWVzc2FnZSkge1xyXG4gICAgICAgIGNhc2UgXCJkb2N4XCI6XHJcbiAgICAgICAgICAgIHRoaXMuY3JlYXRlRG9jeCgpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24gbWVzc2FnZTpcIiwgbWVzc2FnZSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gUmVuZGVyaW5nXHJcblxyXG4gICAgcmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3RhdGUudG91ci5maW5hbGl6ZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+eyBfKFwicmVzdWx0cy5hbGVydHMubm90X2ZpbmFsaXplZFwiKSB9PC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsIHx8IHRoaXMuc3RhdGUucmVzdWx0cyA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPExvYWRlciAvPlxyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgdGFibGUgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZlcmJvc2l0eSA9PT0gXCIzXCIpIHtcclxuICAgICAgICAgICAgdGFibGUgPSA8VG91clJlc3VsdHNWZXJib3NlVGFibGUgey4uLnRoaXMuc3RhdGV9IC8+XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByb3BzLnZlcmJvc2l0eSA9PT0gXCIyXCIpIHtcclxuICAgICAgICAgICAgdGFibGUgPSA8VG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlIHsuLi50aGlzLnN0YXRlfSAvPlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRhYmxlID0gPFRvdXJSZXN1bHRzVGFibGUgey4uLnRoaXMuc3RhdGV9IC8+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyZWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnRhYmxlT25seSkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLXJlc3VsdHNcIiByZWY9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIH1cclxuICAgICAgICAgICAgICAgIHsgdGFibGUgfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGJvZHkgPSA8ZGl2IGNsYXNzTmFtZT1cInRvdXItcmVzdWx0cyBwLWNvbnRlbnRcIiByZWY9XCJjb250ZW50XCI+XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJOb25GaW5hbGl6ZWRXYXJuaW5nKCkgfVxyXG4gICAgICAgICAgICB7IHRhYmxlIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5wcmludGFibGVcclxuICAgICAgICAgICAgPyA8UHJpbnRhYmxlXHJcbiAgICAgICAgICAgICAgICByZWY9XCJwcmludGFibGVcIlxyXG4gICAgICAgICAgICAgICAgaGVhZGVyPXsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUgfVxyXG4gICAgICAgICAgICAgICAgdGl0bGUxPXsgXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpIH1cclxuICAgICAgICAgICAgICAgIHRpdGxlMj17IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgdGl0bGUzPXsgdGhpcy5zdGF0ZS50b3VyLm5hbWUgfVxyXG4gICAgICAgICAgICAgICAgYm9keT17IGJvZHkgfSAvPlxyXG4gICAgICAgICAgICA6IGJvZHk7XHJcbiAgICB9XHJcbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwidG91ci1yZXN1bHRzLmRvY3hcIikge1xyXG4gICAgICAgIERvY3goZmlsZW5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRNYXJnaW5zKFsxMCwgMTAsIDE1LCAxMF0pXHJcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTEoXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpKVxyXG4gICAgICAgICAgICAuc2V0VGl0bGUyKHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS50b3VyLm5hbWUpXHJcbiAgICAgICAgICAgIC5zZXRCb2R5KFJlYWN0RE9NLmZpbmRET01Ob2RlKHRoaXMucmVmcy5jb250ZW50KS5pbm5lckhUTUwpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZVwiLCBcImZvbnQtc2l6ZVwiLCB0aGlzLnByb3BzLnZlcmJvc2l0eSA9PT0gXCIxXCIgPyBcIjEycHRcIiA6IFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcImZvbnQtc2l6ZVwiLCBcIjlwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJwYWRkaW5nXCIsIFwiMCAzcHRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwiYm9yZGVyXCIsIFwiMC41cHQgc29saWQgYmxhY2tcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkLCAuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcImJvcmRlclwiLCBcIm5vbmVcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJwYWRkaW5nXCIsIFwiMCAxcHQgMCAwXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwicGFkZGluZ1wiLCBcIjAgMCAwIDFwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwidGV4dC1hbGlnblwiLCBcInJpZ2h0XCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd24gdGRcIiwgXCJ0ZXh0LWFsaWduXCIsIFwibGVmdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwidGV4dC1hbGlnblwiLCBcImxlZnRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93blwiLCBcIndpZHRoXCIsIFwiNTBwdFwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYWR2YW5jZXMtaGVhZGVyXCIsIFwiYmFja2dyb3VuZC1jb2xvclwiLCBcIiNkZGRcIilcclxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdGFsLXNjb3JlXCIsIFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5oZWFkX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI1JVwiKVxyXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuZGFuY2VfanVkZ2VcIiwgXCJ3aWR0aFwiLCBcIjglXCIpXHJcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hY3JvX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI4JVwiKVxyXG4gICAgICAgICAgICAuc2F2ZSgpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcclxuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xyXG5pbXBvcnQgeyBtZXNzYWdlX2Rpc3BhdGNoZXIgfSBmcm9tIFwic2VydmVyL21lc3NhZ2VfZGlzcGF0Y2hlclwiO1xyXG5pbXBvcnQgeyBMb2FkZXIgfSBmcm9tIFwidWkvY29tcG9uZW50c1wiO1xyXG5pbXBvcnQgeyBzaG93Q29uZmlybSB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XHJcbmltcG9ydCB7IG9uVG91Y2hPckNsaWNrIH0gZnJvbSBcInVpL3RhYmxldF9jb21wb25lbnRzXCI7XHJcbmltcG9ydCB7IFRvdXJSZXN1bHRzQm9keSB9IGZyb20gXCJhZG1pbi9qdWRnaW5nL3RvdXJfcmVzdWx0c1wiO1xyXG5cclxuaW1wb3J0IHsgVGFibGV0U2NvcmVJbnB1dCB9IGZyb20gXCIuL3Jvc2ZhcnJcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgSnVkZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAganVkZ2VfaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuVE9VUl9TQ0hFTUEgPSB7XHJcbiAgICAgICAgICAgIHJ1bnM6IHtcclxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7fSxcclxuICAgICAgICAgICAgICAgIHNjb3Jlczoge30sXHJcbiAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiB7fSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgZGlzY2lwbGluZToge1xyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZXM6IHtcclxuICAgICAgICAgICAgICAgICAgICBqdWRnZToge30sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgdG91cjogbnVsbCxcclxuICAgICAgICAgICAganVkZ2U6IG51bGwsXHJcbiAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2U6IG51bGwsXHJcbiAgICAgICAgICAgIGN1cnJlbnRfaGVhdDogMSxcclxuICAgICAgICAgICAgcGFnZTogXCJkZWZhdWx0XCIsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmFjdGl2ZV90b3VyX2lkID0gbnVsbDtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMsIGZhbHNlKSk7XHJcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJhY3RpdmVfdG91cl91cGRhdGVcIiwgdGhpcy5kaXNwYXRjaEFjdGl2ZVRvdXJVcGRhdGUuYmluZCh0aGlzLCBmYWxzZSkpO1xyXG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBMb2FkZXJzXHJcblxyXG4gICAgcmVsb2FkRnJvbVN0b3JhZ2UocmVzZXRfaGVhdCkge1xyXG4gICAgICAgIGxldCBzdF9qdWRnZSA9IHN0b3JhZ2UuZ2V0KFwiSnVkZ2VcIikuYnlfaWQodGhpcy5wcm9wcy5qdWRnZV9pZClcclxuICAgICAgICBpZiAoIXN0X2p1ZGdlKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHN0YXRlX3VwZCA9IHt9XHJcbiAgICAgICAgc3RhdGVfdXBkW1wianVkZ2VcIl0gPSBzdF9qdWRnZS5zZXJpYWxpemUoe1xyXG4gICAgICAgICAgICBjb21wZXRpdGlvbjoge31cclxuICAgICAgICB9KVxyXG4gICAgICAgIHN0YXRlX3VwZFtcImNvbXBldGl0aW9uXCJdID0gc3RhdGVfdXBkW1wianVkZ2VcIl0uY29tcGV0aXRpb247XHJcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3RvdXJfaWQgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgbGV0IHN0X3RvdXIgPSBzdG9yYWdlLmdldChcIlRvdXJcIikuYnlfaWQodGhpcy5hY3RpdmVfdG91cl9pZCk7XHJcbiAgICAgICAgICAgIGlmIChzdF90b3VyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG91ciA9IHN0X3RvdXIuc2VyaWFsaXplKHRoaXMuVE9VUl9TQ0hFTUEpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvdXIuZGlzY2lwbGluZSAmJiB0b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZV91cGRbXCJ0b3VyXCJdID0gdG91cjtcclxuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIGRpc2NpcGxpbmUganVkZ2VcclxuICAgICAgICAgICAgICAgICAgICBzdGF0ZV91cGRbXCJkaXNjaXBsaW5lX2p1ZGdlXCJdID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICB0b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXMuZm9yRWFjaChmdW5jdGlvbihkaikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGouanVkZ2UuaWQgPT09IHRoaXMucHJvcHMuanVkZ2VfaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlX3VwZFtcImRpc2NpcGxpbmVfanVkZ2VcIl0gPSBkajtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc2V0X2hlYXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2UgPSBzdGF0ZV91cGRbXCJkaXNjaXBsaW5lX2p1ZGdlXCJdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc2NpcGxpbmVfanVkZ2UgfHwgZGlzY2lwbGluZV9qdWRnZS5yb2xlID09PSBcImhlYWRfanVkZ2VcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVfdXBkW1wiY3VycmVudF9oZWF0XCJdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlX2lkID0gZGlzY2lwbGluZV9qdWRnZSAmJiBkaXNjaXBsaW5lX2p1ZGdlLmlkO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhdGVfdXBkW1wiY3VycmVudF9oZWF0XCJdID0gdGhpcy5nZXRGaXJzdE5vbkNvbmZpcm1lZEhlYXQodG91ci5ydW5zLCBkaXNjaXBsaW5lX2p1ZGdlX2lkKSB8fCAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlX3VwZFtcInBhZ2VcIl0gPSBcImRlZmF1bHRcIjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZV91cGQpO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlQWN0aXZlVG91cihmb3JjZV9yZWxvYWQsIG5ld19hY3RpdmVfdG91cl9pZCkge1xyXG4gICAgICAgIGlmIChuZXdfYWN0aXZlX3RvdXJfaWQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB0b3VyOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZTogbnVsbCxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlX3RvdXJfaWQgPSBuZXdfYWN0aXZlX3RvdXJfaWQ7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiVG91clwiKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5kZWwoXCJQYXJ0aWNpcGFudFwiKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5kZWwoXCJTY29yZVwiKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5kZWwoXCJSdW5cIik7XHJcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiRGlzY2lwbGluZVwiKTtcclxuICAgICAgICAgICAgc3RvcmFnZS5kZWwoXCJEaXNjaXBsaW5lSnVkZ2VcIik7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZvcmNlX3JlbG9hZCB8fCBuZXdfYWN0aXZlX3RvdXJfaWQgIT09IHRoaXMuYWN0aXZlX3RvdXJfaWQpIHtcclxuICAgICAgICAgICAgbGV0IG9sZF9hY3RpdmVfdG91cl9pZCA9IHRoaXMuYWN0aXZlX3RvdXJfaWQ7XHJcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlX3RvdXJfaWQgPSBuZXdfYWN0aXZlX3RvdXJfaWQ7XHJcbiAgICAgICAgICAgIEFwaShcInRvdXIuZ2V0XCIsIHsgdG91cl9pZDogdGhpcy5hY3RpdmVfdG91cl9pZCwgY2hpbGRyZW46IHRoaXMuVE9VUl9TQ0hFTUEgfSlcclxuICAgICAgICAgICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0aGlzLmFjdGl2ZV90b3VyX2lkKVxyXG4gICAgICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcywgbmV3X2FjdGl2ZV90b3VyX2lkICE9PSBvbGRfYWN0aXZlX3RvdXJfaWQpKVxyXG4gICAgICAgICAgICAgICAgLnNlbmQoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGxvYWREYXRhKCkge1xyXG4gICAgICAgIEFwaShcImp1ZGdlLmdldFwiLCB7IGp1ZGdlX2lkOiB0aGlzLnByb3BzLmp1ZGdlX2lkLCBjaGlsZHJlbjogeyBjb21wZXRpdGlvbjoge30gfSB9KVxyXG4gICAgICAgICAgICAuYWRkVG9EQihcIkp1ZGdlXCIsIHRoaXMucHJvcHMuanVkZ2VfaWQpXHJcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMsIGZhbHNlKSlcclxuICAgICAgICAgICAgLnNlbmQoKTtcclxuICAgICAgICBBcGkoXCJ0b3VyLmZpbmRfYWN0aXZlXCIsIHt9KVxyXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMuZGlzcGF0Y2hBY3RpdmVUb3VyVXBkYXRlLmJpbmQodGhpcywgdHJ1ZSkpXHJcbiAgICAgICAgICAgIC5zZW5kKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gRGlzcGF0Y2hlcnNcclxuXHJcbiAgICBkaXNwYXRjaEFjdGl2ZVRvdXJVcGRhdGUoZm9yY2VfcmVsb2FkLCBkYXRhKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVBY3RpdmVUb3VyKGZvcmNlX3JlbG9hZCwgZGF0YVtcInRvdXJfaWRcIl0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIExpc3RlbmVyc1xyXG5cclxuICAgIG9uU2NvcmVVcGRhdGUoc2NvcmVfaWQsIG5ld19zY29yZSkge1xyXG4gICAgICAgIGxldCByZXF1ZXN0ID0ge1xyXG4gICAgICAgICAgICBzY29yZV9kYXRhOiBuZXdfc2NvcmUsXHJcbiAgICAgICAgICAgIGZvcmNlOiBmYWxzZSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIEFwaShcInNjb3JlLnNldFwiLCB7c2NvcmVfaWQ6IHNjb3JlX2lkLCBkYXRhOiByZXF1ZXN0fSkuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIG9uU2NvcmVDb25maXJtKHNjb3JlX2lkKSB7XHJcbiAgICAgICAgQXBpKFwic2NvcmUuY29uZmlybVwiLCB7c2NvcmVfaWQ6IHNjb3JlX2lkfSkuc2VuZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEFjdGlvbnNcclxuXHJcbiAgICB0b1ByZXZIZWF0KCkge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBjdXJyZW50X2hlYXQ6IHRoaXMuc3RhdGUuY3VycmVudF9oZWF0IC0gMSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHRvTmV4dEhlYXQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGN1cnJlbnRfaGVhdDogdGhpcy5zdGF0ZS5jdXJyZW50X2hlYXQgKyAxLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc3dpdGNoUGFnZShwYWdlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdG9wVG91cigpIHtcclxuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLnN0b3BfdG91clwiKSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyKSB7XHJcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0b3BcIiwgeyB0b3VyX2lkOiB0aGlzLnN0YXRlLnRvdXIuaWQgfSkub25TdWNjZXNzKCgpID0+IHN3YWwuY2xvc2UoKSkuc2VuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBmaW5hbGl6ZVRvdXIoKSB7XHJcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5maW5hbGl6ZV90b3VyXCIpLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIpIHtcclxuICAgICAgICAgICAgICAgIEFwaShcInRvdXIuZmluYWxpemVcIiwgeyB0b3VyX2lkOiB0aGlzLnN0YXRlLnRvdXIuaWQgfSkub25TdWNjZXNzKCgpID0+IHN3YWwuY2xvc2UoKSkuc2VuZCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBzdG9wVG91ckFuZFN0YXJ0TmV4dCgpIHtcclxuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLnN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiKSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG91cl9pZCA9IHRoaXMuc3RhdGUudG91ci5pZDtcclxuICAgICAgICAgICAgICAgIEFwaShcInRvdXIuc3RvcFwiLCB7IHRvdXJfaWQgfSkub25TdWNjZXNzKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0YXJ0X25leHRfYWZ0ZXJcIiwgeyB0b3VyX2lkIH0pLm9uU3VjY2VzcygoKSA9PiBzd2FsLmNsb3NlKCkpLnNlbmQoKTtcclxuICAgICAgICAgICAgICAgIH0pLnNlbmQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZmluYWxpemVUb3VyQW5kU3RhcnROZXh0KCkge1xyXG4gICAgICAgIHNob3dDb25maXJtKF8oXCJ0YWJsZXQuY29uZmlybXMuZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiKSwgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG91cl9pZCA9IHRoaXMuc3RhdGUudG91ci5pZDtcclxuICAgICAgICAgICAgICAgIEFwaShcInRvdXIuZmluYWxpemVcIiwgeyB0b3VyX2lkIH0pLm9uU3VjY2VzcygoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdGFydF9uZXh0X2FmdGVyXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4gc3dhbC5jbG9zZSgpKS5zZW5kKCk7XHJcbiAgICAgICAgICAgICAgICB9KS5zZW5kKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIZWxwZXJzXHJcblxyXG4gICAgZ2V0SGVhdHNDb3VudChydW5zKSB7XHJcbiAgICAgICAgcnVucyA9IHJ1bnMgfHwgdGhpcy5zdGF0ZS50b3VyLnJ1bnM7XHJcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLnJ1bnMubWFwKChydW4pID0+IHJ1bi5oZWF0KSk7XHJcbiAgICB9XHJcbiAgICBnZXRGaXJzdE5vbkNvbmZpcm1lZEhlYXQocnVucywgZGlzY2lwbGluZV9qdWRnZV9pZCkge1xyXG4gICAgICAgIHJ1bnMgPSBydW5zIHx8IHRoaXMuc3RhdGUudG91ci5ydW5zO1xyXG4gICAgICAgIGRpc2NpcGxpbmVfanVkZ2VfaWQgPSBkaXNjaXBsaW5lX2p1ZGdlX2lkIHx8IHRoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZS5pZDtcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJ1bnMubGVuZ3RoOyArK2kpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBydW5zW2ldLnNjb3Jlcy5sZW5ndGg7ICsraikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gcnVuc1tpXS5zY29yZXNbal07XHJcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZCA9PT0gZGlzY2lwbGluZV9qdWRnZV9pZCAmJiAhc2NvcmUuY29uZmlybWVkICYmIHJ1bnNbaV0ucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bnNbaV0uaGVhdDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRIZWF0c0NvdW50KHJ1bnMpO1xyXG4gICAgfVxyXG4gICAgaGFzVW5jb25maXJtZWRTY29yZXMoKSB7XHJcbiAgICAgICAgbGV0IHJ1bnMgPSB0aGlzLnN0YXRlLnRvdXIucnVucztcclxuICAgICAgICBsZXQgY29uZmlybWVkX3Njb3JlcyA9IHt9O1xyXG4gICAgICAgIGZvciAobGV0IGkgPSBydW5zLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XHJcbiAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcnVuc1tpXS5zY29yZXMubGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IHJ1bnNbaV0uc2NvcmVzW2pdO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmNvbmZpcm1lZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpcm1lZF9zY29yZXNbc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZF0gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhjb25maXJtZWRfc2NvcmVzKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgcnVuc1tpXS5zY29yZXMubGVuZ3RoOyArK2opIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSBydW5zW2kgLSAxXS5zY29yZXNbal07XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjb3JlLmNvbmZpcm1lZCAmJiAhY29uZmlybWVkX3Njb3Jlc1tzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkXSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbmRlcmluZ1xyXG5cclxuICAgIHJlbmRlclJlc3VsdHMoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYm9keSByZXN1bHRzXCI+XHJcbiAgICAgICAgICAgIDxUb3VyUmVzdWx0c0JvZHkgdG91cl9pZD17IHRoaXMuc3RhdGUudG91ci5pZCB9IHZlcmJvc2l0eT1cIjJcIiB0YWJsZU9ubHkgLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxuICAgIHJlbmRlckhhc1VuY29uZmlybWVkU2NvcmVzV2FybmluZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaGFzVW5jb25maXJtZWRTY29yZXMoKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYWxlcnRzLmhhc191bmNvbmZpcm1lZF9zY29yZXNcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJBY3Rpb25zKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYm9keSBhY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySGFzVW5jb25maXJtZWRTY29yZXNXYXJuaW5nKCkgfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5zdG9wVG91ci5iaW5kKHRoaXMpKX0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnN0b3BfdG91clwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidGJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMuZmluYWxpemVUb3VyLmJpbmQodGhpcykpfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMuZmluYWxpemVfdG91clwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidGJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMuc3RvcFRvdXJBbmRTdGFydE5leHQuYmluZCh0aGlzKSl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInRidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5maW5hbGl6ZVRvdXJBbmRTdGFydE5leHQuYmluZCh0aGlzKSl9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5maW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCIpIH1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVySGVhZGVyKCkge1xyXG4gICAgICAgIGxldCBidG5fcHJldiA9IG51bGw7XHJcbiAgICAgICAgbGV0IGJ0bl9uZXh0ID0gbnVsbDtcclxuICAgICAgICBsZXQganVkZ2UgPSB0aGlzLnN0YXRlLmp1ZGdlO1xyXG4gICAgICAgIGxldCBqdWRnZV9udW1iZXIgPSBqdWRnZS5yb2xlX2Rlc2NyaXB0aW9uIHx8IF8oXCJnbG9iYWwucGhyYXNlcy5qdWRnZV9uXCIsIGp1ZGdlLm51bWJlcik7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGFnZSAhPT0gXCJyZXN1bHRzXCIgJiYgdGhpcy5zdGF0ZS5wYWdlICE9PSBcImFjdGlvbnNcIikge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50X2hlYXQgPiAxKSB7XHJcbiAgICAgICAgICAgICAgICBidG5fcHJldiA9IDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtbGVmdFwiIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvUHJldkhlYXQuYmluZCh0aGlzKSl9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnByZXZfaGVhdFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudF9oZWF0IDwgdGhpcy5nZXRIZWF0c0NvdW50KCkgJiYgKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZS5yb2xlID09PSBcImhlYWRfanVkZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuZ2V0Rmlyc3ROb25Db25maXJtZWRIZWF0KCkgPiB0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdCkpIHtcclxuICAgICAgICAgICAgICAgIGJ0bl9uZXh0ID0gPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvTmV4dEhlYXQuYmluZCh0aGlzKSl9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLm5leHRfaGVhdFwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IGN1cnJlbnRfdG91ciA9IDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XHJcbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZD5cclxuICAgICAgICAgICAgICAgICAgICA8aDE+eyBqdWRnZV9udW1iZXIgfTwvaDE+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPnsganVkZ2UubmFtZSB9PC9oMj5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgxPnsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9PC9oMT5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+eyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5oZWFkZXJzLmhlYXRcIikgfTogeyB0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdCB9IC8geyB0aGlzLmdldEhlYXRzQ291bnQoKSB9PC9oMj5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgICAgICByZXR1cm4gPGhlYWRlcj5cclxuICAgICAgICAgICAgeyBidG5fcHJldiB9XHJcbiAgICAgICAgICAgIHsgYnRuX25leHQgfVxyXG4gICAgICAgICAgICB7IGN1cnJlbnRfdG91ciB9XHJcbiAgICAgICAgPC9oZWFkZXI+XHJcbiAgICB9XHJcbiAgICByZW5kZXJTcGxhc2hTY3JlZW4oKSB7XHJcbiAgICAgICAgbGV0IGp1ZGdlID0gdGhpcy5zdGF0ZS5qdWRnZTtcclxuICAgICAgICBsZXQganVkZ2VfbnVtYmVyID0ganVkZ2Uucm9sZV9kZXNjcmlwdGlvbiB8fCBfKFwiZ2xvYmFsLnBocmFzZXMuanVkZ2VfblwiLCBqdWRnZS5udW1iZXIpO1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImp1ZGdlLXRhYmxldFwiPlxyXG4gICAgICAgICAgICA8aGVhZGVyPlxyXG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtbGVmdFwiIGhyZWY9XCIvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMudG9fc3RhcnRfcGFnZVwiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMT57IHRoaXMuc3RhdGUuY29tcGV0aXRpb24ubmFtZSB9PC9oMT5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxyXG4gICAgICAgICAgICA8L2hlYWRlcj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGxhc2gtc2NyZWVuXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImp1ZGdlLW51bWJlclwiPnsganVkZ2VfbnVtYmVyIH08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwianVkZ2UtbmFtZVwiPnsgdGhpcy5zdGF0ZS5qdWRnZS5uYW1lIH08L2Rpdj5cclxuICAgICAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnRvdXIgPyA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1qdWRnaW5nLWRpc2NpcGxpbmVcIj57IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUgfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1qdWRnaW5nLXRvdXJcIj57IHRoaXMuc3RhdGUudG91ci5uYW1lIH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3QtanVkZ2luZy1tZXNzYWdlXCI+eyBfKFwidGFibGV0Lm1lc3NhZ2VzLm5vdF9qdWRnaW5nX2Rpc2NpcGxpbmVcIikgfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IG51bGxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbiAgICByZW5kZXJTY29yaW5nTGF5b3V0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09IFwicmVzdWx0c1wiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlclJlc3VsdHMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGFnZSA9PT0gXCJhY3Rpb25zXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQWN0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgY2VsbHMgPSB0aGlzLnN0YXRlLnRvdXIucnVuc1xyXG4gICAgICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKHJ1bikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ1bi5oZWF0ID09PSB0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdDtcclxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxyXG4gICAgICAgICAgICAubWFwKGZ1bmN0aW9uKHJ1bikge1xyXG4gICAgICAgICAgICAgICAgbGV0IHNjb3Jlc19tYXAgPSB7fVxyXG4gICAgICAgICAgICAgICAgcnVuLnNjb3Jlcy5mb3JFYWNoKGZ1bmN0aW9uKHNjb3JlX2RhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29yZXNfbWFwW3Njb3JlX2RhdGEuZGlzY2lwbGluZV9qdWRnZV9pZF0gPSBzY29yZV9kYXRhO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudF9zY29yZSA9IHNjb3Jlc19tYXBbdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX2p1ZGdlLmlkXTtcclxuICAgICAgICAgICAgICAgIGxldCBoZWFkZXIgPSBfKFwiZ2xvYmFsLnBocmFzZXMucGFydGljaXBhbnRfblwiLCBydW4ucGFydGljaXBhbnQubnVtYmVyLCBydW4ucGFydGljaXBhbnQubmFtZSwgcnVuLnBhcnRpY2lwYW50LnNwb3J0c21lbi5sZW5ndGgpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzY29yZXNfbWFwW3RoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZS5pZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHRkIGtleT17IHJ1bi5pZCB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aDI+eyBoZWFkZXIgfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgXyhcInRhYmxldC5tZXNzYWdlcy5ub3RfanVkZ2luZ19wYXJ0aWNpcGFudFwiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIDx0ZCBrZXk9eyBydW4uaWQgfT5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+eyBoZWFkZXIgfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRhYmxldFNjb3JlSW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZT17IHRoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbF9kaXNjaXBsaW5lX2p1ZGdlcz17IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgc2NvcmU9eyBjdXJyZW50X3Njb3JlIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyBjdXJyZW50X3Njb3JlLmNvbmZpcm1lZCB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbF9zY29yZXM9eyBzY29yZXNfbWFwIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuPXsgcnVuIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZT17IHRoaXMuc3RhdGUucGFnZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU9eyB0aGlzLnN0YXRlLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLm9uU2NvcmVVcGRhdGUuYmluZCh0aGlzLCBjdXJyZW50X3Njb3JlLmlkKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5vblNjb3JlQ29uZmlybS5iaW5kKHRoaXMsIGN1cnJlbnRfc2NvcmUuaWQpIH0gLz5cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgbGV0IHNpbmdsZV9ydW5fY2xhc3MgPSBjZWxscy5sZW5ndGggPT09IDEgPyBcIiBzaW5nbGUtcnVuXCIgOiBcIlwiO1xyXG4gICAgICAgIGlmIChjZWxscy5sZW5ndGggPiAzKSB7XHJcbiAgICAgICAgICAgIGxldCBmaXJzdF9yb3cgPSBbXVxyXG4gICAgICAgICAgICBsZXQgc2Vjb25kX3JvdyA9IFtdXHJcbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGlkeCAlIDIgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdF9yb3cucHVzaChjZWxsKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Vjb25kX3Jvdy5wdXNoKGNlbGwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICBsZXQgaGFsZl93aWR0aCA9IDEwMCAvICgyICogZmlyc3Rfcm93Lmxlbmd0aCArIDEpO1xyXG4gICAgICAgICAgICBsZXQgZmlyc3Rfd2lkdGgsIHNlY29uZF93aWR0aDtcclxuICAgICAgICAgICAgaWYgKGZpcnN0X3Jvdy5sZW5ndGggPT09IHNlY29uZF9yb3cubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICBbZmlyc3Rfd2lkdGgsIHNlY29uZF93aWR0aF0gPSBbMTAwIC0gaGFsZl93aWR0aCwgMTAwIC0gaGFsZl93aWR0aF07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBbZmlyc3Rfd2lkdGgsIHNlY29uZF93aWR0aF0gPSBbMTAwLCAxMDAgLSAyICogaGFsZl93aWR0aF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxyXG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cIm1haW4tdGFibGVcIiBzdHlsZT17eyB3aWR0aDogZmlyc3Rfd2lkdGggKyBcIiVcIiwgXCJtYXJnaW5MZWZ0XCI6IDAgfX0+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgICAgICB7IGZpcnN0X3JvdyB9XHJcbiAgICAgICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtYWluLXRhYmxlXCIgc3R5bGU9e3sgd2lkdGg6IHNlY29uZF93aWR0aCArIFwiJVwiLCBcIm1hcmdpblJpZ2h0XCI6IGZpcnN0X3Jvdy5sZW5ndGggPT09IHNlY29uZF9yb3cubGVuZ3RoID8gMCA6IFwiYXV0b1wiIH19Pjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBzZWNvbmRfcm93IH1cclxuICAgICAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXsgXCJtYWluLXRhYmxlXCIgKyBzaW5nbGVfcnVuX2NsYXNzIH0+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgIHsgY2VsbHMgfVxyXG4gICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT47XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbiAgICByZW5kZXJGb290ZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZS5yb2xlID09PSBcImhlYWRfanVkZ2VcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb290ZXIgcGFnZS1zZWxlY3RvclwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiYnRuXCIgKyAodGhpcy5zdGF0ZS5wYWdlID09PSBcImRlZmF1bHRcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnN3aXRjaFBhZ2UuYmluZCh0aGlzLCBcImRlZmF1bHRcIikpfT57IF8oXCJ0YWJsZXQucGFnZXMuaGVhdHNcIikgfVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJidG5cIiArICh0aGlzLnN0YXRlLnBhZ2UgPT09IFwicmVzdWx0c1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMuc3dpdGNoUGFnZS5iaW5kKHRoaXMsIFwicmVzdWx0c1wiKSl9PnsgXyhcInRhYmxldC5wYWdlcy5yZXN1bHRzXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiYnRuXCIgKyAodGhpcy5zdGF0ZS5wYWdlID09PSBcImFjdGlvbnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxyXG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnN3aXRjaFBhZ2UuYmluZCh0aGlzLCBcImFjdGlvbnNcIikpfT57IF8oXCJ0YWJsZXQucGFnZXMuYWN0aW9uc1wiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPC9kaXY+O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kaXNjaXBsaW5lX2p1ZGdlLnJvbGUgIT09IFwidGVjaF9qdWRnZVwiIHx8IChcclxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuYWNyb1wiICYmXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb290ZXIgcGFnZS1zZWxlY3RvclwiPlxyXG4gICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImJ0blwiICsgKHRoaXMuc3RhdGUucGFnZSA9PT0gXCJkZWZhdWx0XCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cclxuICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnN3aXRjaFBhZ2UuYmluZCh0aGlzLCBcImRlZmF1bHRcIikpfT57IF8oXCJ0YWJsZXQucGFnZXMuZGFuY2VcIikgfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJidG5cIiArICh0aGlzLnN0YXRlLnBhZ2UgPT09IFwiYWNyb1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XHJcbiAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5zd2l0Y2hQYWdlLmJpbmQodGhpcywgXCJhY3JvXCIpKX0+eyBfKFwidGFibGV0LnBhZ2VzLmFjcm9iYXRpY3NcIikgfVxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8L2Rpdj47XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuanVkZ2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxMb2FkZXIgLz47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyU3BsYXNoU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2NpcGxpbmVfanVkZ2UgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyU3BsYXNoU2NyZWVuKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImp1ZGdlLXRhYmxldFwiPlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmluZ0xheW91dCgpIH1cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckZvb3RlcigpIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XHJcbmltcG9ydCB7XHJcbiAgICBvblRvdWNoT3JDbGljayxcclxuICAgIFRhYmxldEludGVnZXJJbnB1dCxcclxuICAgIFRhYmxldEludGVnZXJTZWxlY3RJbnB1dCxcclxuICAgIFRhYmxldFNlbGVjdG9ySW5wdXQsXHJcbiAgICBUYWJsZXRQb2ludDVJbnB1dCxcclxuICAgIFRhYmxldFBvaW50NVNlbGVjdElucHV0LFxyXG4gICAgU3RvcFdhdGNoLFxyXG4gICAgU2xpZGVyLFxyXG59IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xyXG5cclxuaW1wb3J0IHsgZ2V0U2NvcmluZ1R5cGUgfSBmcm9tIFwiY29tbW9uL3Jvc2ZhcnIvYmFzZVwiO1xyXG5cclxuZnVuY3Rpb24gX18oKSB7XHJcbiAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIF8oXCJzY29yaW5nX3N5c3RlbXMucm9zZmFyci5cIiArIGFyZ3VtZW50c1swXSwgLi4uYXJncyk7XHJcbn1cclxuXHJcbi8vIEhlYWQganVkZ2VcclxuXHJcbmNsYXNzIEhlYWRKdWRnZUFjdG9iYXRpY092ZXJyaWRlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhY3JvYmF0aWNzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgZ2V0QWNyb2JhdGljT3ZlcnJpZGVzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFjcm9iYXRpY3NcclxuICAgICAgICAgICAgLm1hcCgoYWNybywgaWR4KSA9PiAoeyBpZHg6IGlkeCArIDEsIGFjcm9iYXRpYzogYWNybyB9KSlcclxuICAgICAgICAgICAgLmZpbHRlcigoYWNybykgPT4gYWNyby5hY3JvYmF0aWMub3JpZ2luYWxfc2NvcmUgIT09IGFjcm8uYWNyb2JhdGljLnNjb3JlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgYWNyb2JhdGljX292ZXJyaWRlcyA9IHRoaXMuZ2V0QWNyb2JhdGljT3ZlcnJpZGVzKCk7XHJcbiAgICAgICAgaWYgKGFjcm9iYXRpY19vdmVycmlkZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5hY3JvYmF0aWNfb3ZlcnJpZGVzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiZnVsbC13aWR0aFwiPjx0Ym9keT5cclxuICAgICAgICAgICAgICAgIHsgYWNyb2JhdGljX292ZXJyaWRlcy5tYXAoKGFjcm8pID0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGFjcm8uaWR4IH0+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTVcIj57IGFjcm8uaWR4IH08L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQ+eyBhY3JvLmFjcm9iYXRpYy5kZXNjcmlwdGlvbiB9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgdGV4dC1yaWdodFwiPnsgYWNyby5hY3JvYmF0aWMub3JpZ2luYWxfc2NvcmUudG9GaXhlZCgxKSB9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNSB0ZXh0LWNlbnRlclwiPuKGkjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTEwIHRleHQtbGVmdFwiPnsgYWNyby5hY3JvYmF0aWMuc2NvcmUudG9GaXhlZCgxKSB9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSGVhZEp1ZGdlUHJldmlvdXNQZW5hbHRpZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgcGVuYWx0aWVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucGVuYWx0aWVzIHx8IHRoaXMucHJvcHMucGVuYWx0aWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LmhlYWRfanVkZ2UucHJldmlvdXNfcGVuYWx0aWVzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiZnVsbC13aWR0aFwiPjx0Ym9keT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5wZW5hbHRpZXMubWFwKChkLCBpZHgpID0+XHJcbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGlkeCB9PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xMCB0ZXh0LWNlbnRlclwiPjxzdHJvbmc+eyBkLnBlbmFsdHkgfTwvc3Ryb25nPjwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57IGQudG91ciB9PC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgKSB9XHJcbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSGVhZEp1ZGdlVGVjaEp1ZGdlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2NvcmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBnZXRUaW1pbmdEYXRhKCkge1xyXG4gICAgICAgIGxldCB0dl9yYXdfdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEudGltaW5nX3Zpb2xhdGlvbjtcclxuICAgICAgICBpZiAodHZfcmF3X3ZhbHVlID09PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXCItXCIsIFwiXCJdO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHZfcmF3X3ZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXCJYXCIsIFwiIGZhaWxcIl07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFtcIk9LXCIsIFwiIG9rXCJdO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgdGltaW5nX2RhdGEgPSB0aGlzLmdldFRpbWluZ0RhdGEoKTtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT17IHRoaXMucHJvcHMuc2NvcmUuY29uZmlybWVkID8gXCJjb25maXJtZWRcIiA6IFwiXCIgfT57IHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZS5qdWRnZS5uYW1lIH08L2gzPlxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwidGVjaC1qdWRnZS1pbmZvXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgX18oXCJ0YWJsZXQudGVjaF9qdWRnZS5qdW1wX3N0ZXBzXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidmFsdWVcIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLmp1bXBfc3RlcHMgfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgX18oXCJ0YWJsZXQudGVjaF9qdWRnZS50aW1pbmdcIikgfVxyXG4gICAgICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJpbm5lclwiICsgdGltaW5nX2RhdGFbMV0gfT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aW1pbmdfZGF0YVswXSB9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSGVhZEp1ZGdlVGVjaEp1ZGdlc1Njb3JlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxfZGlzY2lwbGluZV9qdWRnZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBhbGxfc2NvcmVzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldFRlY2hEaXNjaXBsaW5lSnVkZ2VzKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsbF9kaXNjaXBsaW5lX2p1ZGdlcy5maWx0ZXIoKGRqKSA9PiBkai5yb2xlID09PSBcInRlY2hfanVkZ2VcIik7XHJcbiAgICB9XHJcbiAgICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFRlY2hEaXNjaXBsaW5lSnVkZ2VzKCkubWFwKCh0ZWNoX2p1ZGdlKSA9PlxyXG4gICAgICAgICAgICA8SGVhZEp1ZGdlVGVjaEp1ZGdlU2NvcmVcclxuICAgICAgICAgICAgICAgIGtleT17IHRlY2hfanVkZ2UuaWQgfVxyXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZT17IHRlY2hfanVkZ2UgfVxyXG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLmFsbF9zY29yZXNbdGVjaF9qdWRnZS5pZF0gfSAvPlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCI+PC9kaXY+XHJcbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb250ZW50KCkgfVxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBIZWFkSnVkZ2VEYW5jZUp1ZGdlU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgc2NvcmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8dGQgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5zY29yZS5jb25maXJtZWQgPyBcImNvbmZpcm1lZFwiIDogXCJcIiB9PlxyXG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH1cclxuICAgICAgICA8L3RkPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBIZWFkSnVkZ2VEYW5jZUp1ZGdlc1Njb3JlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGxfZGlzY2lwbGluZV9qdWRnZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBhbGxfc2NvcmVzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldERhbmNlRGlzY2lwbGluZUp1ZGdlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGxfZGlzY2lwbGluZV9qdWRnZXMuZmlsdGVyKChkaikgPT4gZGoucm9sZSA9PT0gXCJkYW5jZV9qdWRnZVwiIHx8IGRqLnJvbGUgPT09IFwiYWNyb19qdWRnZVwiKTtcclxuICAgIH1cclxuICAgIHJlbmRlck51bWJlcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGFuY2VEaXNjaXBsaW5lSnVkZ2VzKCkubWFwKChqdWRnZSkgPT5cclxuICAgICAgICAgICAgPHRkIGtleT17IGp1ZGdlLmlkIH0+eyBqdWRnZS5qdWRnZS5udW1iZXIgfXsganVkZ2Uucm9sZSA9PT0gXCJhY3JvX2p1ZGdlXCIgPyBcIiAoQSlcIiA6IFwiXCIgfTwvdGQ+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHJlbmRlclNjb3JlcygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW5jZURpc2NpcGxpbmVKdWRnZXMoKS5tYXAoKGp1ZGdlKSA9PlxyXG4gICAgICAgICAgICA8SGVhZEp1ZGdlRGFuY2VKdWRnZVNjb3JlXHJcbiAgICAgICAgICAgICAgICBrZXk9eyBqdWRnZS5pZCB9XHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlPXsganVkZ2UgfVxyXG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLmFsbF9zY29yZXNbanVkZ2UuaWRdIH0gLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8aDM+eyBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLmRhbmNlX2p1ZGdlX3Njb3Jlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImRhbmNlLWp1ZGdlLXNjb3Jlc1wiPjx0Ym9keT5cclxuICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJudW1iZXJzXCI+eyB0aGlzLnJlbmRlck51bWJlcnMoKSB9PC90cj5cclxuICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJzY29yZXNcIj57IHRoaXMucmVuZGVyU2NvcmVzKCkgfTwvdHI+XHJcbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSGVhZEp1ZGdlTm90UGVyZm9ybWVkU3dpdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHBlcmZvcm1lZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgIHJ1bl9pZDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBtYXJrTm90UGVyZm9ybWVkKCkge1xyXG4gICAgICAgIEFwaShcInJ1bi5tYXJrX25vdF9wZXJmb3JtZWRcIiwgeyBydW5faWQ6IHRoaXMucHJvcHMucnVuX2lkIH0pLnNlbmQoKTtcclxuICAgIH1cclxuICAgIG1hcmtQZXJmb3JtZWQoKSB7XHJcbiAgICAgICAgQXBpKFwicnVuLm1hcmtfcGVyZm9ybWVkXCIsIHsgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bl9pZCB9KS5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGVyZm9ybWVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1kYW5nZXJcIiB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMubWFya05vdFBlcmZvcm1lZC5iaW5kKHRoaXMpKSB9PlxyXG4gICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMubm90X3BlcmZvcm1lZFwiKSB9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1zdWNjZXNzXCIgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLm1hcmtQZXJmb3JtZWQuYmluZCh0aGlzKSkgfT5cclxuICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnBlcmZvcm1lZFwiKSB9XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJub3QtcGVyZm9ybWVkLWNvbnRyb2xcIj5cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbigpIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgSGVhZEp1ZGdlU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGFsbF9kaXNjaXBsaW5lX2p1ZGdlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIGFsbF9zY29yZXM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgcnVuOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNjb3JlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldFBlbmFsdHlDb2ljZXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBbXHJcbiAgICAgICAgICAgICAgICBbMCwgICAgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5va1wiKV0sXHJcbiAgICAgICAgICAgICAgICBbLTUsICAgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5mb3JtX3llbGxvd19jYXJkXCIpXSxcclxuICAgICAgICAgICAgICAgIFstMTUsICBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLmZvcm1fcmVkX2NhcmRcIildLFxyXG4gICAgICAgICAgICAgICAgWy0xMDAsIF9fKFwidGFibGV0LmhlYWRfanVkZ2UuYmxhY2tfY2FyZFwiKV1cclxuICAgICAgICAgICAgXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIFtcclxuICAgICAgICAgICAgWzAsICAgIF9fKFwidGFibGV0LmhlYWRfanVkZ2Uub2tcIildLFxyXG4gICAgICAgICAgICBbLTMsICAgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS55ZWxsb3dfY2FyZFwiKV0sXHJcbiAgICAgICAgICAgIFstMzAsICBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLnJlZF9jYXJkXCIpXSxcclxuICAgICAgICAgICAgWy0xMDAsIF9fKFwidGFibGV0LmhlYWRfanVkZ2UuYmxhY2tfY2FyZFwiKV1cclxuICAgICAgICBdO1xyXG4gICAgfVxyXG4gICAgZ2VuT25QZW5hbHR5VXBkYXRlKCkge1xyXG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJwZW5hbHR5XCIsIG5ld192YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxIZWFkSnVkZ2VOb3RQZXJmb3JtZWRTd2l0Y2hcclxuICAgICAgICAgICAgICAgIHJ1bl9pZD17IHRoaXMucHJvcHMucnVuLmlkIH1cclxuICAgICAgICAgICAgICAgIHBlcmZvcm1lZD17IHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCB9IC8+XHJcblxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5wZW5hbHR5X3R5cGVcIikgfTwvaDM+XHJcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5nZXRQZW5hbHR5Q29pY2VzKCkgfVxyXG4gICAgICAgICAgICAgICAgYWN0aXZlPXsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnBlbmFsdHkgfVxyXG4gICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMuZ2VuT25QZW5hbHR5VXBkYXRlKCkgfSAvPlxyXG4gICAgICAgICAgICA8SGVhZEp1ZGdlVGVjaEp1ZGdlc1Njb3Jlc1xyXG4gICAgICAgICAgICAgICAgYWxsX2Rpc2NpcGxpbmVfanVkZ2VzPXsgdGhpcy5wcm9wcy5hbGxfZGlzY2lwbGluZV9qdWRnZXMgfVxyXG4gICAgICAgICAgICAgICAgYWxsX3Njb3Jlcz17IHRoaXMucHJvcHMuYWxsX3Njb3JlcyB9IC8+XHJcbiAgICAgICAgICAgIDxIZWFkSnVkZ2VEYW5jZUp1ZGdlc1Njb3Jlc1xyXG4gICAgICAgICAgICAgICAgYWxsX2Rpc2NpcGxpbmVfanVkZ2VzPXsgdGhpcy5wcm9wcy5hbGxfZGlzY2lwbGluZV9qdWRnZXMgfVxyXG4gICAgICAgICAgICAgICAgYWxsX3Njb3Jlcz17IHRoaXMucHJvcHMuYWxsX3Njb3JlcyB9IC8+XHJcbiAgICAgICAgICAgIDxIZWFkSnVkZ2VBY3RvYmF0aWNPdmVycmlkZXNcclxuICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M9eyB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzIH0gLz5cclxuICAgICAgICAgICAgPEhlYWRKdWRnZVByZXZpb3VzUGVuYWx0aWVzXHJcbiAgICAgICAgICAgICAgICBwZW5hbHRpZXM9eyB0aGlzLnByb3BzLnJ1bi5pbmhlcml0ZWRfZGF0YS5wZW5hbHRpZXMgfSAvPlxyXG4gICAgICAgICAgICA8SGVhZEp1ZGdlTm90UGVyZm9ybWVkU3dpdGNoXHJcbiAgICAgICAgICAgICAgICBydW5faWQ9eyB0aGlzLnByb3BzLnJ1bi5pZCB9XHJcbiAgICAgICAgICAgICAgICBwZXJmb3JtZWQ9eyB0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQgfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBUZWNoIEp1ZGdlXHJcblxyXG5jbGFzcyBUZWNoSnVkZ2VBY3JvYmF0aWNPdmVycmlkZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGVjaC1qdWRnZS1hY3JvXCI+XHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udHJvbHMgcHVsbC1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzZXR0ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICA8VGFibGV0UG9pbnQ1SW5wdXRcclxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLmFjcm8uc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5wcm9wcy5vbkFjcm9PdmVycmlkZSB9IC8+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDxoMz5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5hY3JvLmRlc2NyaXB0aW9uIH0gKD17IHRoaXMucHJvcHMuYWNyby5vcmlnaW5hbF9zY29yZSB9KVxyXG4gICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRlY2hKdWRnZUFjcm9TY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGdlbk9uQWNyb092ZXJyaWRlKGFjcm9faWR4KSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXdfdmFsdWUpID0+IHRoaXMucHJvcHMub25BY3JvT3ZlcnJpZGUoYWNyb19pZHgsIG5ld192YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXJDb250ZW50KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFjcm9iYXRpY3MubWFwKChhY3JvLCBpZHgpID0+XHJcbiAgICAgICAgICAgIDxUZWNoSnVkZ2VBY3JvYmF0aWNPdmVycmlkZVxyXG4gICAgICAgICAgICAgICAga2V5PXsgaWR4IH1cclxuICAgICAgICAgICAgICAgIGFjcm89eyBhY3JvIH1cclxuICAgICAgICAgICAgICAgIG9uQWNyb092ZXJyaWRlPXsgdGhpcy5nZW5PbkFjcm9PdmVycmlkZShpZHgpIH0gLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQ29udGVudCgpIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGVjaEp1ZGdlRGFuY2VTY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGdlbk9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCkge1xyXG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCwgbmV3X3ZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgc2NvcmUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGE7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LnRlY2hfanVkZ2UuanVtcF9zdGVwc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZS5yYXdfZGF0YS5qdW1wX3N0ZXBzIH1cclxuICAgICAgICAgICAgICAgIHNlbmREZWx0YXNcclxuICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLmdlbk9uU2NvcmVVcGRhdGUoXCJqdW1wX3N0ZXBzXCIpIH0gLz5cclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIj48L2Rpdj5cclxuICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQudGVjaF9qdWRnZS50aW1pbmdcIikgfTwvaDM+XHJcbiAgICAgICAgICAgIDxTdG9wV2F0Y2ggc2NvcmVfaWQ9eyB0aGlzLnByb3BzLnNjb3JlLmlkIH0gLz5cclxuICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyBbW3RydWUsIFwiWFwiXSwgW251bGwsIFwiLVwiXSwgW2ZhbHNlLCBcIk9LXCJdXSB9XHJcbiAgICAgICAgICAgICAgICBhY3RpdmU9eyBzY29yZS5yYXdfZGF0YS50aW1pbmdfdmlvbGF0aW9uIH1cclxuICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLmdlbk9uU2NvcmVVcGRhdGUoXCJ0aW1pbmdfdmlvbGF0aW9uXCIpIH0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgVGVjaEp1ZGdlU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGFnZSA9PT0gXCJhY3JvXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxUZWNoSnVkZ2VBY3JvU2NvcmVJbnB1dFxyXG4gICAgICAgICAgICAgICAgYWNyb2JhdGljcz17IHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MgfVxyXG4gICAgICAgICAgICAgICAgb25BY3JvT3ZlcnJpZGU9eyB0aGlzLnByb3BzLm9uQWNyb092ZXJyaWRlIH0gLz5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gPFRlY2hKdWRnZURhbmNlU2NvcmVJbnB1dFxyXG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfSAvPlxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gRGFuY2UganVkZ2VcclxuXHJcbmNsYXNzIERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBnZW5PblNjb3JlVXBkYXRlKCkge1xyXG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5wcm9wcy5wYXJ0LCBuZXdfdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVySGVhZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNraXBfaGVhZGVyKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGgzPnsgX18oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuXCIgKyB0aGlzLnByb3BzLnBhcnQpIH08L2gzPlxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxyXG4gICAgICAgICAgICA8U2NvcmVQYXJ0U2NhbGVcclxuICAgICAgICAgICAgICAgIHNjYWxlPXsgdGhpcy5wcm9wcy5zY2FsZSB9XHJcbiAgICAgICAgICAgICAgICBhY3RpdmU9eyB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGFbdGhpcy5wcm9wcy5wYXJ0XSB9XHJcbiAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblNjb3JlVXBkYXRlKCkgfVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuc2NhbGVfcHJvcHN9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIERhbmNlSnVkZ2VTY29yZU1pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGdlbk9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCkge1xyXG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCwgbmV3X3ZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgc2NvcmVfZGF0YSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cIm1pc3Rha2VzIGZ1bGwtd2lkdGhcIj48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICA8aDM+eyBfXyhcInRhYmxldC5kYW5jZV9qdWRnZS5zbWFsbF9taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxUYWJsZXRJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlX2RhdGEuc21hbGxfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLmdlbk9uU2NvcmVVcGRhdGUoXCJzbWFsbF9taXN0YWtlc1wiKSB9IC8+XHJcbiAgICAgICAgICAgIDwvdGQ+PHRkPlxyXG4gICAgICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuYmlnX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgc2NvcmVfZGF0YS5iaWdfbWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLmdlbk9uU2NvcmVVcGRhdGUoXCJiaWdfbWlzdGFrZXNcIikgfSAvPlxyXG4gICAgICAgICAgICA8L3RkPlxyXG4gICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEYW5jZUp1ZGdlU2NvcmVGb3JtYXRpb25NaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHNjb3JlX2RhdGEgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGE7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibWlzdGFrZXNcIj5cclxuICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuZm9ybV9taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZV9kYXRhLm1pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUuYmluZCh0aGlzLCBcIm1pc3Rha2VzXCIpIH0gLz5cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRGFuY2VKdWRnZVNjb3JlRm9ybWF0aW9uQWNyb01pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGdlbk9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCkge1xyXG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCwgbmV3X3ZhbHVlKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgc2NvcmVfZGF0YSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcclxuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cIm1pc3Rha2VzIGZ1bGwtd2lkdGhcIj48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICA8dGQ+XHJcbiAgICAgICAgICAgICAgICA8aDM+eyBfXyhcInRhYmxldC5kYW5jZV9qdWRnZS5mb3JtX3NtYWxsX21pc3Rha2VzXCIpIH08L2gzPlxyXG4gICAgICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgc2NvcmVfZGF0YS5zbWFsbF9taXN0YWtlcyB9XHJcbiAgICAgICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMuZ2VuT25TY29yZVVwZGF0ZShcInNtYWxsX21pc3Rha2VzXCIpIH0gLz5cclxuICAgICAgICAgICAgPC90ZD48dGQ+XHJcbiAgICAgICAgICAgICAgICA8aDM+eyBfXyhcInRhYmxldC5kYW5jZV9qdWRnZS5mb3JtX2JpZ19taXN0YWtlc1wiKSB9PC9oMz5cclxuICAgICAgICAgICAgICAgIDxUYWJsZXRJbnRlZ2VySW5wdXRcclxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlX2RhdGEuYmlnX21pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblNjb3JlVXBkYXRlKFwiYmlnX21pc3Rha2VzXCIpIH0gLz5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgRGFuY2VKdWRnZUZpbmFsRGFuY2VTY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxyXG4gICAgICAgICAgICAgICAgcGFydD1cImZ3X3dvbWFuXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicmVkdWN0aW9uXCJcclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XHJcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZndfbWFuXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicmVkdWN0aW9uXCJcclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XHJcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZGFuY2VfZmlnc1wiXHJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInBvaW50NVwiXHJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgICAgICAgICBtYXg6IDEyLjUsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcclxuICAgICAgICAgICAgICAgIHBhcnQ9XCJjb21wb3NpdGlvblwiXHJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInBvaW50NVwiXHJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgICAgICAgICBtYXg6IDEwLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlTWlzdGFrZXNcclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEYW5jZUp1ZGdlRGFuY2VTY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gPGRpdj5cclxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxyXG4gICAgICAgICAgICAgICAgcGFydD1cImZ3X3dvbWFuXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicmVkdWN0aW9uXCJcclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XHJcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZndfbWFuXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicmVkdWN0aW9uXCJcclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XHJcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZGFuY2VfZmlnc1wiXHJcbiAgICAgICAgICAgICAgICBzY2FsZT1cImludGVnZXJcIlxyXG4gICAgICAgICAgICAgICAgc2NhbGVfcHJvcHM9e3tcclxuICAgICAgICAgICAgICAgICAgICBtaW46IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4OiAyNSxcclxuICAgICAgICAgICAgICAgIH19XHJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cclxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxyXG4gICAgICAgICAgICAgICAgcGFydD1cImNvbXBvc2l0aW9uXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwiaW50ZWdlclwiXHJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xyXG4gICAgICAgICAgICAgICAgICAgIG1pbjogMCxcclxuICAgICAgICAgICAgICAgICAgICBtYXg6IDIwLFxyXG4gICAgICAgICAgICAgICAgfX1cclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlTWlzdGFrZXNcclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEYW5jZUp1ZGdlRm9ybWF0aW9uU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcclxuICAgICAgICAgICAgICAgIHBhcnQ9XCJkYW5jZV90ZWNoXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcclxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcclxuICAgICAgICAgICAgICAgIHBhcnQ9XCJkYW5jZV9maWdzXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcclxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcclxuICAgICAgICAgICAgICAgIHBhcnQ9XCJpbXByZXNzaW9uXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcclxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVGb3JtYXRpb25NaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIERhbmNlSnVkZ2VGb3JtYXRpb25BY3JvU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcclxuICAgICAgICAgICAgICAgIHBhcnQ9XCJhY3JvYmF0aWNzXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcclxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcclxuICAgICAgICAgICAgICAgIHBhcnQ9XCJkYW5jZV90ZWNoXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcclxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcclxuICAgICAgICAgICAgICAgIHBhcnQ9XCJkYW5jZV9maWdzXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcclxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcclxuICAgICAgICAgICAgICAgIHBhcnQ9XCJpbXByZXNzaW9uXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcclxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XHJcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVGb3JtYXRpb25BY3JvTWlzdGFrZXNcclxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBEYW5jZUp1ZGdlU2ltcGxpZmllZFNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XHJcbiAgICAgICAgICAgICAgICBwYXJ0PVwicG9pbnRzXCJcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwiZ3JpZFwiXHJcbiAgICAgICAgICAgICAgICBza2lwX2hlYWRlclxyXG4gICAgICAgICAgICAgICAgc2NhbGVfcHJvcHM9e3tcclxuICAgICAgICAgICAgICAgICAgICBtaW46IDEsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4OiA0MCxcclxuICAgICAgICAgICAgICAgICAgICByb3dfc2l6ZTogMTAsXHJcbiAgICAgICAgICAgICAgICB9fVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIERhbmNlSnVkZ2VTY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBsZXQgcHJvcHMgPSB7XHJcbiAgICAgICAgICAgIHNjb3JlOiB0aGlzLnByb3BzLnNjb3JlLFxyXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUsXHJcbiAgICAgICAgfTtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2NvcmluZ19zeXN0ZW1fbmFtZSkge1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmFjcm9cIjpcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5ub19hY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA8RGFuY2VKdWRnZURhbmNlU2NvcmVJbnB1dCB7Li4ucHJvcHN9IC8+XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfZndcIjpcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA8RGFuY2VKdWRnZUZpbmFsRGFuY2VTY29yZUlucHV0IHsuLi5wcm9wc30gLz5cclxuICAgICAgICBjYXNlIFwicm9zZmFyci5mb3JtYXRpb25cIjpcclxuICAgICAgICAgICAgcmV0dXJuIDxEYW5jZUp1ZGdlRm9ybWF0aW9uU2NvcmVJbnB1dCB7Li4ucHJvcHN9IC8+XHJcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjpcclxuICAgICAgICAgICAgcmV0dXJuIDxEYW5jZUp1ZGdlRm9ybWF0aW9uQWNyb1Njb3JlSW5wdXQgey4uLnByb3BzfSAvPlxyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLnNpbXBsaWZpZWRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDxEYW5jZUp1ZGdlU2ltcGxpZmllZFNjb3JlSW5wdXQgey4uLnByb3BzfSAvPlxyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gQWNybyBqdWRnZVxyXG5cclxuY2xhc3MgQWNyb0p1ZGdlQWNyb2JhdGljSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRlcnMuYWNyb19uXCIsIHRoaXMucHJvcHMuYWNyb19pZHgpIH08L2gzPlxyXG4gICAgICAgICAgICA8U2NvcmVQYXJ0U2NhbGVcclxuICAgICAgICAgICAgICAgIHNjYWxlPVwicmVkdWN0aW9uXCJcclxuICAgICAgICAgICAgICAgIGFjdGl2ZT17IHRoaXMucHJvcHMucmVkdWN0aW9uIH1cclxuICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLnByb3BzLm9uQWNyb1JlZHVjdGlvblVwZGF0ZSB9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFjcm9KdWRnZVNjb3JlTWlzdGFrZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm1pc3Rha2VzXCI+XHJcbiAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LmFjcm9fanVkZ2UuZmFsbF9kb3duXCIpIH08L2gzPlxyXG4gICAgICAgICAgICA8VGFibGV0SW50ZWdlcklucHV0XHJcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHRoaXMucHJvcHMubWlzdGFrZXMgfVxyXG4gICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIEFjcm9KdWRnZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGdlbk9uQWNyb1JlZHVjdGlvblVwZGF0ZShhY3JvX2lkeCkge1xyXG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uQWNyb1JlZHVjdGlvblVwZGF0ZShhY3JvX2lkeCwgbmV3X3ZhbHVlKTtcclxuICAgIH1cclxuICAgIGdlbk9uTWlzdGFrZXNVcGRhdGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIChuZXdfdmFsdWUpID0+IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcIm1pc3Rha2VzXCIsIG5ld192YWx1ZSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgbGV0IHNjb3JlX2RhdGEgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGE7XHJcbiAgICAgICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgICAgICAgIHsgc2NvcmVfZGF0YS5yZWR1Y3Rpb25zLm1hcCgocmVkdWN0aW9uLCBhY3JvX2lkeCkgPT5cclxuICAgICAgICAgICAgICAgIDxBY3JvSnVkZ2VBY3JvYmF0aWNJbnB1dFxyXG4gICAgICAgICAgICAgICAgICAgIGtleT17IGFjcm9faWR4IH1cclxuICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb249eyByZWR1Y3Rpb24gfVxyXG4gICAgICAgICAgICAgICAgICAgIGFjcm9faWR4PXsgYWNyb19pZHggfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQWNyb1JlZHVjdGlvblVwZGF0ZT17IHRoaXMuZ2VuT25BY3JvUmVkdWN0aW9uVXBkYXRlKGFjcm9faWR4KSB9IC8+XHJcbiAgICAgICAgICAgICkgfVxyXG4gICAgICAgICAgICA8QWNyb0p1ZGdlU2NvcmVNaXN0YWtlc1xyXG4gICAgICAgICAgICAgICAgbWlzdGFrZXM9eyBzY29yZV9kYXRhLm1pc3Rha2VzIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLmdlbk9uTWlzdGFrZXNVcGRhdGUoKSB9IC8+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIENvbW1vblxyXG5cclxuY2xhc3MgTm90UGVyZm9ybWluZ01lc3NhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtaW5nXCI+XHJcbiAgICAgICAgICAgIHsgXyhcInRhYmxldC5tZXNzYWdlcy5ub3RfcGVyZm9ybWluZ1wiKSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFNjb3JlUGFydFNjYWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGdlblBvc3NpYmxlUmVkdWN0aW9ucygpIHtcclxuICAgICAgICByZXR1cm4gW1xyXG4gICAgICAgICAgICBbMTAwLCBcIlhcIl0sXHJcbiAgICAgICAgICAgIFs3NSwgIFwiLTc1JVwiXSxcclxuICAgICAgICAgICAgWzUwLCAgXCItNTAlXCJdLFxyXG4gICAgICAgICAgICBbMjUsICBcIi0yNSVcIl0sXHJcbiAgICAgICAgICAgIFsxMCwgIFwiLTEwJVwiXSxcclxuICAgICAgICAgICAgWzUsICAgXCItNSVcIl0sXHJcbiAgICAgICAgICAgIFswLCAgIFwiT0tcIl0sXHJcbiAgICAgICAgXVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zY2FsZSkge1xyXG4gICAgICAgIGNhc2UgXCJwb2ludDVcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDxUYWJsZXRQb2ludDVTZWxlY3RJbnB1dCBzdHlsZT1cInR3by1saW5lc1wiIHsuLi50aGlzLnByb3BzfSAvPlxyXG4gICAgICAgIGNhc2UgXCJpbnRlZ2VyXCI6XHJcbiAgICAgICAgICAgIHJldHVybiA8VGFibGV0SW50ZWdlclNlbGVjdElucHV0IHN0eWxlPVwidHdvLWxpbmVzXCIgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgY2FzZSBcImdyaWRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDxUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQgc3R5bGU9XCJncmlkXCIgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgY2FzZSBcInJlZHVjdGlvblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPFRhYmxldFNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgIHN0eWxlPVwib25lLWxpbmVcIlxyXG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuZ2VuUG9zc2libGVSZWR1Y3Rpb25zKCkgfVxyXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBUYWJsZXRTY29yZVRvdGFsU2NvcmUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCByb2xlID0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlLnJvbGU7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLnNpbXBsaWZpZWRcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvbGUgPT09IFwiaGVhZF9qdWRnZVwiIHx8IHJvbGUgPT09IFwidGVjaF9qdWRnZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPlxyXG4gICAgICAgICAgICB7IF9fKFwidGFibGV0Lmdsb2JhbC50b3RhbF9zY29yZVwiKSB9OiB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFRhYmxldFNjb3JlQ29uZmlybWF0aW9uQnV0dG9uIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIG5lZWRDb25maXJtYXRpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZS5yb2xlICE9PSBcImhlYWRfanVkZ2VcIjtcclxuICAgIH1cclxuICAgIHJlYWR5VG9Db25maXJtKCkge1xyXG4gICAgICAgIGxldCBzY29yZV9kYXRhID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhO1xyXG4gICAgICAgIGxldCBrZXlzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoc2NvcmVfZGF0YSk7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZS5yb2xlICE9PSBcInRlY2hfanVkZ2VcIikge1xyXG4gICAgICAgICAgICBmb3IgKGxldCBpZHggaW4ga2V5cykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlX2RhdGFba2V5c1tpZHhdXSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NvcmVfZGF0YVtrZXlzW2lkeF1dID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IHNjb3JlX2RhdGFba2V5c1tpZHhdXTtcclxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIE9iamVjdC5rZXlzKGFycikpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycltqXSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5uZWVkQ29uZmlybWF0aW9uKCkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5yZWFkeVRvQ29uZmlybSgpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm1cIj48L2Rpdj47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm1cIj5cclxuICAgICAgICAgICAgPFNsaWRlclxyXG4gICAgICAgICAgICAgICAgb25BY3RpdmF0ZT17IHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0gfVxyXG4gICAgICAgICAgICAgICAgZG9uZT17IHRoaXMucHJvcHMuc2NvcmUuY29uZmlybWVkIH1cclxuICAgICAgICAgICAgICAgIHNsaWRlVGV4dD17IF8oXCJqdWRnaW5nLmJ1dHRvbnMuY29uZmlybV9zY29yZVwiKSB9XHJcbiAgICAgICAgICAgICAgICBkb25lVGV4dD17IF8oXCJqdWRnaW5nLmxhYmVscy5jb25maXJtZWRcIikgfSAvPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldFNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgdXBkYXRlU2NvcmVzKHR5cGUsIHZhbHVlKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgbmV3X3Njb3JlID0ge307XHJcbiAgICAgICAgbmV3X3Njb3JlW3R5cGVdID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKG5ld19zY29yZSk7XHJcbiAgICB9XHJcbiAgICB1cGRhdGVBY3JvUmVkdWN0aW9uKGlkeCwgdmFsdWUpIHtcclxuICAgICAgICBsZXQgcmVkdWN0aW9ucyA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcCgoKSA9PiBudWxsKTtcclxuICAgICAgICByZWR1Y3Rpb25zW2lkeF0gPSB2YWx1ZTtcclxuICAgICAgICBsZXQgbmV3X3Njb3JlID0ge1xyXG4gICAgICAgICAgICByZWR1Y3Rpb25zOiByZWR1Y3Rpb25zLFxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUobmV3X3Njb3JlKTtcclxuICAgIH1cclxuICAgIG92ZXJyaWRlQWNyb1Njb3JlKGFjcm9faWR4LCB2YWx1ZSkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgQXBpKFwiYWNyb2JhdGljX292ZXJyaWRlLnNldFwiLCB7XHJcbiAgICAgICAgICAgIHJ1bl9pZDogdGhpcy5wcm9wcy5ydW4uaWQsXHJcbiAgICAgICAgICAgIGFjcm9iYXRpY19pZHg6IGFjcm9faWR4LFxyXG4gICAgICAgICAgICBzY29yZTogdmFsdWUsXHJcbiAgICAgICAgfSkuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyU2NvcmVzSW5wdXQoKSB7XHJcbiAgICAgICAgc3dpdGNoIChnZXRTY29yaW5nVHlwZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2UsIHRoaXMucHJvcHMuc2NvcmluZ19zeXN0ZW1fbmFtZSkpIHtcclxuICAgICAgICBjYXNlIFwiYWNyb1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gPEFjcm9KdWRnZUlucHV0XHJcbiAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlPXsgdGhpcy51cGRhdGVBY3JvUmVkdWN0aW9uLmJpbmQodGhpcykgfVxyXG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMudXBkYXRlU2NvcmVzLmJpbmQodGhpcykgfSAvPlxyXG4gICAgICAgIGNhc2UgXCJkYW5jZVwiOlxyXG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25cIjpcclxuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uX2Fjcm9cIjpcclxuICAgICAgICBjYXNlIFwic2ltcGxpZmllZFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPERhbmNlSnVkZ2VTY29yZUlucHV0XHJcbiAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZT17IHRoaXMucHJvcHMuc2NvcmluZ19zeXN0ZW1fbmFtZSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy51cGRhdGVTY29yZXMuYmluZCh0aGlzKSB9IC8+XHJcbiAgICAgICAgY2FzZSBcImhlYWRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIDxIZWFkSnVkZ2VTY29yZUlucHV0XHJcbiAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XHJcbiAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxyXG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZT17IHRoaXMucHJvcHMuc2NvcmluZ19zeXN0ZW1fbmFtZSB9XHJcbiAgICAgICAgICAgICAgICBhbGxfZGlzY2lwbGluZV9qdWRnZXM9eyB0aGlzLnByb3BzLmFsbF9kaXNjaXBsaW5lX2p1ZGdlcyB9XHJcbiAgICAgICAgICAgICAgICBhbGxfc2NvcmVzPXsgdGhpcy5wcm9wcy5hbGxfc2NvcmVzIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnVwZGF0ZVNjb3Jlcy5iaW5kKHRoaXMpIH0gLz5cclxuICAgICAgICBjYXNlIFwidGVjaFwiOlxyXG4gICAgICAgICAgICByZXR1cm4gPFRlY2hKdWRnZVNjb3JlSW5wdXRcclxuICAgICAgICAgICAgICAgIHBhZ2U9eyB0aGlzLnByb3BzLnBhZ2UgfVxyXG4gICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxyXG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cclxuICAgICAgICAgICAgICAgIG9uQWNyb092ZXJyaWRlPXsgdGhpcy5vdmVycmlkZUFjcm9TY29yZS5iaW5kKHRoaXMpIH1cclxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnVwZGF0ZVNjb3Jlcy5iaW5kKHRoaXMpIH0gLz5cclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIlVua25vd24ganVkZ2Ugcm9sZVwiLCB0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2Uucm9sZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCAmJiB0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2Uucm9sZSAhPT0gXCJoZWFkX2p1ZGdlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIDxOb3RQZXJmb3JtaW5nTWVzc2FnZSAvPlxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9eyB0aGlzLnByb3BzLnJlYWRPbmx5ID8gXCJyZWFkLW9ubHlcIiA6IFwiXCIgfT5cclxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclNjb3Jlc0lucHV0KCkgfVxyXG4gICAgICAgICAgICA8VGFibGV0U2NvcmVUb3RhbFNjb3JlXHJcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lPXsgdGhpcy5wcm9wcy5zY29yaW5nX3N5c3RlbV9uYW1lIH1cclxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2UgfVxyXG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH0gLz5cclxuICAgICAgICAgICAgPFRhYmxldFNjb3JlQ29uZmlybWF0aW9uQnV0dG9uXHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlIH1cclxuICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XHJcbiAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0gfSAvPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgfVxyXG59XHJcbiIsImNsYXNzIERvY3hJbXBsIHtcclxuICAgIGNvbnN0cnVjdG9yKGZpbGVuYW1lKSB7XHJcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xyXG4gICAgICAgIHRoaXMuaGVhZGVyID0gbnVsbDtcclxuICAgICAgICB0aGlzLnRpdGxlMSA9IG51bGw7XHJcbiAgICAgICAgdGhpcy50aXRsZTIgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudGl0bGUzID0gbnVsbDtcclxuICAgICAgICB0aGlzLm1hcmdpbnMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuYm9keSA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9IFwicG9ydHJhaXRcIjtcclxuICAgICAgICB0aGlzLnN0eWxlcyA9IHtcclxuICAgICAgICAgICAgXCJib2R5XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTBwdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb250LWZhbWlseVwiOiBcIkNhbGlicmksIFRhaG9tYSwgQXJpYWwsIHNhbnMtc2VyaWZcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0YWJsZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xsYXBzZVwiOiBcImNvbGxhcHNlXCIsXHJcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFnZS1icmVhay1pbnNpZGVcIjogXCJhdm9pZFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRkLCB0aFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdcIjogXCIxcHQgM3B0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaDEsIGgyLCBoMywgaDQsIGg1LCBoNlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstYWZ0ZXJcIjogXCJhdm9pZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tXCI6IDAsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaDFcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIyMHB0XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi10b3BcIjogXCIxMHB0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaDJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNnB0XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi10b3BcIjogXCI2cHRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoM1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE2cHRcIixcclxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXHJcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjRwdFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImg0IHBcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNHB0XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogXCIxMHB0IDAgNnB0XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaDUgcFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEycHRcIixcclxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiBcIjZwdCAwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiLmhlYWRlclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImJvcmRlci1ib3R0b21cIjogXCIxcHggc29saWQgYmxhY2tcIixcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTBwdFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXHJcbiAgICAgICAgICAgICAgICBcInBhZGRpbmctYm90dG9tXCI6IFwiMnB0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi1ib3R0b21cIjogXCIyMHB0XCIsXHJcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXHJcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdcIjogMCxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsaVwiOiB7IFwibWFyZ2luLXRvcFwiOiAwLCBcInBhZGRpbmctdG9wXCI6IDAgfSxcclxuICAgICAgICAgICAgXCIuc3BhY2VyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTRwdFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIi52YS10b3BcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ2ZXJ0aWNhbC1hbGlnblwiOiBcInRvcFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIi50ZXh0LWxlZnRcIjogeyBcInRleHQtYWxpZ25cIjogXCJsZWZ0XCIgfSxcclxuICAgICAgICAgICAgXCIudGV4dC1yaWdodFwiOiB7IFwidGV4dC1hbGlnblwiOiBcInJpZ2h0XCIgfSxcclxuICAgICAgICAgICAgXCIudGV4dC1jZW50ZXJcIjogeyBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIiB9LFxyXG4gICAgICAgICAgICBcIi5ib3JkZXJlZC10YWJsZSB0ZCwgLmJvcmRlcmVkLXRhYmxlIHRoXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYm9yZGVyXCI6IFwiMXB0IHNvbGlkIGJsYWNrXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuYWRkV2lkdGhDc3MoKTtcclxuICAgIH1cclxuICAgIGFkZFdpZHRoQ3NzKCkge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDw9IDEwMDsgKytpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkU3R5bGUoXCIudy1cIiArIGksIFwid2lkdGhcIiwgaSArIFwiJVwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYWRkU3R5bGUoc2VsZWN0b3IsIGtleSwgdmFsdWUpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3R5bGVzW3NlbGVjdG9yXSkge1xyXG4gICAgICAgICAgICB0aGlzLnN0eWxlc1tzZWxlY3Rvcl0gPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zdHlsZXNbc2VsZWN0b3JdW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldEhlYWRlcihoZWFkZXIpIHtcclxuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFRpdGxlMSh0aXRsZTEpIHtcclxuICAgICAgICB0aGlzLnRpdGxlMSA9IHRpdGxlMTtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFRpdGxlMih0aXRsZTIpIHtcclxuICAgICAgICB0aGlzLnRpdGxlMiA9IHRpdGxlMjtcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldFRpdGxlMyh0aXRsZTMpIHtcclxuICAgICAgICB0aGlzLnRpdGxlMyA9IHRpdGxlMztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIHNldE1hcmdpbnMobWFyZ2lucykge1xyXG4gICAgICAgIHRoaXMubWFyZ2lucyA9IG1hcmdpbnM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZXRCb2R5KGJvZHkpIHtcclxuICAgICAgICB0aGlzLmJvZHkgPSBib2R5O1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG4gICAgc2V0T3JpZW50YXRpb24ob3JpZW50YXRpb24pIHtcclxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU3R5bGVCbG9jayhzZWxlY3RvciwgZGF0YSkge1xyXG4gICAgICAgIGxldCBjc3NfcGFpcnMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhkYXRhKS5tYXAoKGtleSkgPT4ga2V5ICsgJzogJyArIGRhdGFba2V5XSArICc7ICcpXHJcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yICsgXCIgeyBcIiArIGNzc19wYWlycy5qb2luKFwiIFwiKSArIFwiIH1cIjtcclxuICAgIH1cclxuICAgIHJlbmRlclN0eWxlcygpIHtcclxuICAgICAgICBsZXQgY3NzX2Jsb2NrcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuc3R5bGVzKS5tYXAoKFxyXG4gICAgICAgICAgICAoc2VsZWN0b3IpID0+IHRoaXMucmVuZGVyU3R5bGVCbG9jayhzZWxlY3RvciwgdGhpcy5zdHlsZXNbc2VsZWN0b3JdKVxyXG4gICAgICAgICkuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIGNzc19ibG9ja3Muam9pbihcIlxcblwiKTtcclxuICAgIH1cclxuICAgIHJlbmRlckhUTUwoKSB7XHJcbiAgICAgICAgbGV0IGNzcyA9IHRoaXMucmVuZGVyU3R5bGVzKCk7XHJcbiAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMuaGVhZGVyID8gJzxwIGNsYXNzPVwiaGVhZGVyXCI+JyArIHRoaXMuaGVhZGVyICsgJzwvcD4nIDogXCJcIjtcclxuICAgICAgICBsZXQgdGl0bGUxID0gdGhpcy50aXRsZTEgPyAnPGgxPicgKyB0aGlzLnRpdGxlMSArICc8L2gxPicgOiBcIlwiO1xyXG4gICAgICAgIGxldCB0aXRsZTIgPSB0aGlzLnRpdGxlMiA/ICc8aDI+JyArIHRoaXMudGl0bGUyICsgJzwvaDI+JyA6IFwiXCI7XHJcbiAgICAgICAgbGV0IHRpdGxlMyA9IHRoaXMudGl0bGUzID8gJzxoMz4nICsgdGhpcy50aXRsZTMgKyAnPC9oMz4nIDogXCJcIjtcclxuICAgICAgICBsZXQgc3BhY2VyID0gKGhlYWRlciB8fCB0aXRsZTEgfHwgdGl0bGUyIHx8IHRpdGxlMykgPyAnPHAgY2xhc3M9XCJzcGFjZXJcIj4mbmJzcDs8L3A+JyA6IFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIFwiPCFET0NUWVBFIGh0bWw+XFxuXCIgK1xyXG4gICAgICAgICAgICBcIjxodG1sPjxoZWFkPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPG1ldGEgY2hhcnNldD1cXFwidXRmLThcXFwiPlwiICtcclxuICAgICAgICAgICAgICAgIFwiPHN0eWxlPlxcblwiICsgY3NzICsgXCJcXG48L3N0eWxlPlxcblwiICtcclxuICAgICAgICAgICAgXCI8L2hlYWQ+PGJvZHk+XFxuXCIgK1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyICtcclxuICAgICAgICAgICAgICAgIHRpdGxlMSArXHJcbiAgICAgICAgICAgICAgICB0aXRsZTIgK1xyXG4gICAgICAgICAgICAgICAgdGl0bGUzICtcclxuICAgICAgICAgICAgICAgIHNwYWNlciArXHJcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkgK1xyXG4gICAgICAgICAgICBcIjwvYm9keT48L2h0bWw+XCI7XHJcbiAgICB9XHJcblxyXG4gICAgc2F2ZSgpIHtcclxuICAgICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVySFRNTCgpO1xyXG4gICAgICAgIGxldCBtYXJnaW5zID0gdGhpcy5tYXJnaW5zIHx8ICh0aGlzLm9yaWVudGF0aW9uID09PSBcInBvcnRyYWl0XCIgPyBbMTAsIDE1LCAxMCwgMTVdIDogWzcsIDEwLCA3LCAxMF0pO1xyXG4gICAgICAgIGxldCBjb252ZXJ0ZWQgPSBodG1sRG9jeC5hc0Jsb2IoaHRtbCwge1xyXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogdGhpcy5vcmllbnRhdGlvbixcclxuICAgICAgICAgICAgbWFyZ2luczoge1xyXG4gICAgICAgICAgICAgICAgdG9wOiAgICBNYXRoLmZsb29yKG1hcmdpbnNbMF0gKiA1Ni42NTkpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICByaWdodDogIE1hdGguZmxvb3IobWFyZ2luc1sxXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIGJvdHRvbTogTWF0aC5mbG9vcihtYXJnaW5zWzJdICogNTYuNjU5KS50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgbGVmdDogICBNYXRoLmZsb29yKG1hcmdpbnNbM10gKiA1Ni42NTkpLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBzYXZlQXMoY29udmVydGVkLCB0aGlzLmZpbGVuYW1lKTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCB2YXIgRG9jeCA9IChmbikgPT4gbmV3IERvY3hJbXBsKGZuKTtcclxuIiwiZXhwb3J0IGNsYXNzIFJ1blNjb3Jlc1dyYXBwZXIge1xyXG4gICAgY29uc3RydWN0b3IocnVuLCBkaXNjaXBsaW5lX2p1ZGdlcykge1xyXG4gICAgICAgIHRoaXMucnVuID0gcnVuO1xyXG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXMgPSBkaXNjaXBsaW5lX2p1ZGdlcztcclxuICAgICAgICB0aGlzLnNjb3Jlc19ieV9kaXNjaXBsaW5lX2p1ZGdlX2lkID0ge31cclxuICAgICAgICBydW4uc2NvcmVzLmZvckVhY2goZnVuY3Rpb24oc2NvcmUpIHtcclxuICAgICAgICAgICAgbGV0IGRqX2lkID0gc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZDtcclxuICAgICAgICAgICAgdGhpcy5zY29yZXNfYnlfZGlzY2lwbGluZV9qdWRnZV9pZFtkal9pZF0gPSBzY29yZTtcclxuICAgICAgICB9LmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG4gICAgZ2V0U2NvcmVzQnlKdWRnZUlkcyhkaXNjaXBsaW5lX2p1ZGdlX2lkcykge1xyXG4gICAgICAgIHJldHVybiBkaXNjaXBsaW5lX2p1ZGdlX2lkcy5tYXAoKChkal9pZCkgPT4gdGhpcy5zY29yZXNfYnlfZGlzY2lwbGluZV9qdWRnZV9pZFtkal9pZF0pLmJpbmQodGhpcykpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVG91clNjb3Jlc1dyYXBwZXIge1xyXG4gICAgY29uc3RydWN0b3IodG91ciwgcmVzdWx0cykge1xyXG4gICAgICAgIHRoaXMucnVuX3dyYXBwZXJzID0gdG91ci5ydW5zLm1hcCgocnVuKSA9PiBuZXcgUnVuU2NvcmVzV3JhcHBlcihydW4sIHRvdXIuZGlzY2lwbGluZV9qdWRnZXMpKTtcclxuICAgICAgICB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzID0gdG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzO1xyXG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXMgPSB7fTtcclxuICAgICAgICB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzLmZvckVhY2goZnVuY3Rpb24oZGosIGlkeCkge1xyXG4gICAgICAgICAgICBsZXQgYXJyID0gdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1tkai5yb2xlXSB8fCBbXTtcclxuICAgICAgICAgICAgYXJyLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgaWR4OiBpZHgsXHJcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlOiBkaixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbZGoucm9sZV0gPSBhcnI7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBpZiAocmVzdWx0cykge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0c19ieV9ydW5faWRzID0ge307XHJcbiAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzKSA9PlxyXG4gICAgICAgICAgICAgICAgcmVzdWx0c19ieV9ydW5faWRzW3Jlcy5ydW5faWRdID0gcmVzKTtcclxuICAgICAgICAgICAgdGhpcy5ydW5fd3JhcHBlcnMuZm9yRWFjaCgodykgPT5cclxuICAgICAgICAgICAgICAgIHcucmVzdWx0c19pbmZvID0gcmVzdWx0c19ieV9ydW5faWRzW3cucnVuLmlkXSk7XHJcbiAgICAgICAgICAgIHRoaXMucnVuX3dyYXBwZXJzLnNvcnQoKGEsIGIpID0+IGEucmVzdWx0c19pbmZvLnBsYWNlIC0gYi5yZXN1bHRzX2luZm8ucGxhY2UpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKCkge1xyXG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2FyZ3VtZW50c1swXV1cclxuICAgICAgICAgICAgICAgID8gdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1thcmd1bWVudHNbMF1dLm1hcCgoYikgPT4gYi5kaXNjaXBsaW5lX2p1ZGdlKVxyXG4gICAgICAgICAgICAgICAgOiBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHJlcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7XHJcbiAgICAgICAgICAgIHJlcyA9IHJlcy5jb25jYXQodGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1thcmd1bWVudHNbaV1dIHx8IFtdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzLnNvcnQoKGEsIGIpID0+IGEuaWR4IC0gYi5pZHgpO1xyXG4gICAgICAgIHJldHVybiByZXMubWFwKChiKSA9PiBiLmRpc2NpcGxpbmVfanVkZ2UpO1xyXG4gICAgfVxyXG4gICAgZ2V0U2NvcmVzVGFibGVCeVJvbGVzKCkge1xyXG4gICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlX2lkcyA9IHRoaXMuZ2V0RGlzY2lwbGluZUp1ZGdlc0J5Um9sZXMoLi4uYXJndW1lbnRzKS5tYXAoKGRqKSA9PiBkai5pZCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuX3dyYXBwZXJzLm1hcCgodykgPT4gdy5nZXRTY29yZXNCeUp1ZGdlSWRzKGRpc2NpcGxpbmVfanVkZ2VfaWRzKSk7XHJcbiAgICB9XHJcbiAgICBnZXRSZXN1bHRzSW5mbygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5ydW5fd3JhcHBlcnMubWFwKCh3KSA9PiB3LnJlc3VsdHNfaW5mbyk7XHJcbiAgICB9XHJcbiAgICBnZXRSdW5zKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJ1bl93cmFwcGVycy5tYXAoKHcpID0+IHcucnVuKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnRpY2lwYW50RGlzcGxheShwYXJ0aWNpcGFudCkge1xyXG4gICAgaWYgKHBhcnRpY2lwYW50LmZvcm1hdGlvbl9uYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgcmV0dXJuIDxwPnsgcGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgfTwvcD47XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGFydGljaXBhbnQuc3BvcnRzbWVuLm1hcCgocywgaWR4KSA9PiA8cCBrZXk9eyBpZHggfT57IHMubGFzdF9uYW1lICsgXCIgXCIgKyBzLmZpcnN0X25hbWUgfTwvcD4pO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2NvcmluZ1R5cGUoZGlzY2lwbGluZV9qdWRnZSwgc2NvcmluZ19zeXN0ZW1fbmFtZSkge1xyXG4gICAgc3dpdGNoIChkaXNjaXBsaW5lX2p1ZGdlLnJvbGUpIHtcclxuICAgIGNhc2UgXCJkYW5jZV9qdWRnZVwiOlxyXG4gICAgICAgIHN3aXRjaCAoc2NvcmluZ19zeXN0ZW1fbmFtZSkge1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmZvcm1hdGlvblwiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJmb3JtYXRpb25cIjtcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJmb3JtYXRpb25fYWNyb1wiO1xyXG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLnNpbXBsaWZpZWRcIjpcclxuICAgICAgICAgICAgcmV0dXJuIFwic2ltcGxpZmllZFwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlXCI7XHJcbiAgICAgICAgfVxyXG4gICAgY2FzZSBcImFjcm9fanVkZ2VcIjpcclxuICAgICAgICBzd2l0Y2ggKHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcclxuICAgICAgICBjYXNlIFwicm9zZmFyci5hbV9maW5hbF9md1wiOlxyXG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZVwiO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybiBcImFjcm9cIjtcclxuICAgICAgICB9XHJcbiAgICBjYXNlIFwidGVjaF9qdWRnZVwiOlxyXG4gICAgICAgIHJldHVybiBcInRlY2hcIjtcclxuICAgIGNhc2UgXCJoZWFkX2p1ZGdlXCI6XHJcbiAgICAgICAgcmV0dXJuIFwiaGVhZFwiO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7IHRyYW5zbGF0ZSwgZ2V0UG9zc2libGVUb3VyTmFtZXMgfSBmcm9tIFwiLi9ydVwiO1xyXG5cclxuZXhwb3J0IHZhciBfID0gdHJhbnNsYXRlO1xyXG5leHBvcnQgdmFyIHRvdXJfbmFtZXMgPSBnZXRQb3NzaWJsZVRvdXJOYW1lcygpO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKHNyYywgYXJnKSB7XHJcbiAgICBmdW5jdGlvbiBjaG9vc2VFbmRpbmcobiwgZTEsIGUyLCBlNSkge1xyXG4gICAgICAgIGxldCB4ID0gbiAlIDEwMDtcclxuICAgICAgICBpZiAoTWF0aC5mbG9vcih4IC8gMTApID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTE7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPj0gNSB8fCB4ICUgMTAgPT09IDApIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZTI7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IFBIUkFTRVMgPSB7XHJcbiAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgIFwiYWxlcnRzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogKHZlcnNpb24sIGRhdGUpID0+IDxkaXYgY2xhc3NOYW1lPVwiYWJvdXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48Yj5Sb2NrSnVkZ2Uge3ZlcnNpb259PC9iPiAo0L7RgiB7ZGF0ZX0pICZtZGFzaDsg0YHQuNGB0YLQtdC80LAg0LTQu9GPINC/0L7QtNGB0YfQtdGC0LAg0YDQtdC30YPQu9GM0YLQsNGC0L7QsiDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Lkg0L/QviDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQvtC80YMg0YDQvtC6LdC9LdGA0L7Qu9C70YMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCQ0LLRgtC+0YDRgdC60LjQtSDQv9GA0LDQstCwINC90LAg0YHQuNGB0YLQtdC80YMgUm9ja0p1ZGdlINC/0L7Qu9C90L7RgdGC0YzRjiDQv9GA0LjQvdCw0LTQu9C10LbQsNGCINGA0LDQt9GA0LDQsdC+0YLRh9C40LrRgyDQkNGA0YLQtdC80YMg0JrQsNC30LDQutC+0LLRgy4g0KHQvtCw0LLRgtC+0YAg0YHQuNGB0YLQtdC80Ysg0JDQvdGC0L7QvSDQkNC80LXQu9C40L0uPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCh0LjRgdGC0LXQvNCwINGA0LDRgdC/0YDQvtGB0YLRgNCw0L3Rj9C10YLRgdGPINC/0L4g0LvQuNGG0LXQvdC30LjQuCBMaW51bSBkLm8ubyAoaW5mb0BsaW51bS5ocikuINCU0LvRjyDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LAgUm9ja0p1ZGdlINC90LXQvtCx0YXQvtC00LjQvNC+INC4INC00L7RgdGC0LDRgtC+0YfQvdC+INC40LzQtdGC0Ywg0L/RgNCw0LLQviDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LjRjyDRgdC40YHRgtC10LzRiyBMaW51bSBMUFMuPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCe0YTQuNGG0LjQsNC70YzQvdGL0Lkg0YHQsNC50YI6IDxhIGhyZWY9XCJodHRwczovL3JvY2tqdWRnZS5jb20vXCIgdGFyZ2V0PVwiX2JsYW5rXCI+aHR0cHM6Ly9yb2NranVkZ2UuY29tLzwvYT48L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj4sXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wcm9ncmFtc19hZnRlcl9jcmVhdGlvblwiOiBcItCf0YDQvtCz0YDQsNC80LzRiyDQvNC+0LbQvdC+INCx0YPQtNC10YIg0LTQvtCx0LDQstC40YLRjCDRgtC+0LvRjNC60L4g0L/QvtGB0LvQtSDRgdC+0YXRgNCw0L3QtdC90LjRjyDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC60L7RgNGA0LXQutGC0L3QviDQvdCw0YHRgtGA0L7QtdC90LAg0Lgg0LzQvtC20LXRgiDQsdGL0YLRjCDQuNGB0L/QvtC70YzQt9C+0LLQsNC90LAuXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9ub3RfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0L3QtdC00L7RgdGC0YPQv9C90LAg0L3QsCDRjdGC0L7QvCDQutC+0LzQv9GM0YLQtdGA0LUuXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2ZpbmFsaXplZFwiOiBcItCe0YLRgdGD0YLRgdGC0LLRg9GO0YIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV93YXJuaW5nXCI6IDxkaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PHN0cm9uZz7QpNC40L3QsNC70LjQt9Cw0YbQuNGPINC00L7Qu9C20L3QsCDQvtGC0LzQtdC90Y/RgtGM0YHRjyDRgtC+0LvRjNC60L4g0LIg0LjRgdC60LvRjtGH0LjRgtC10LvRjNC90YvRhSDRgdC70YPRh9Cw0Y/RhSE8L3N0cm9uZz48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JXRgdC70Lgg0LbQtSDRjdGC0L4g0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0L3QtdC+0LHRhdC+0LTQuNC80L4sINC+0LHRgNCw0YLQuNGC0LUg0LLQvdC40LzQsNC90LjQtSwg0YfRgtC+INC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YHQv9C40YHQvtC6INGD0YfQsNGB0YLQvdC40LrQvtCyXHJcbiAgICAgICAgICAgICAgICAgICAg0YHQu9C10LTRg9GO0YnQtdCz0L4g0YLRg9GA0LAg0LHRg9C00LXRgiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQuCDQv9C10YDQtdGB0L7Qt9C00LDQvS4g0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YPRh9Cw0YHRgtC90LjQutC+0LIsINC/0YDQvtGI0LXQtNGI0LjRhSDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC/0L7RgdC70LUg0L/QtdGA0LLQvtC5XHJcbiAgICAgICAgICAgICAgICAgICAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDQuCDQvdC1INC/0YDQvtGI0LXQtNGI0LjRhSDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDQsdGD0LTRg9GCINCx0LXQt9Cy0L7Qt9Cy0YDQsNGC0L3QviDRg9GC0LXRgNGP0L3RiyE8L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0Jgg0L3QtSDQt9Cw0LHRg9C00YzRgtC1INC30LDQvdC+0LLQviDQvdCw0L/QtdGH0LDRgtCw0YLRjCDQstGB0LUg0YLQsdC70LjRhtGLLjwvcD48L2Rpdj4sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINGB0LsuwqDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmludF90ZXN0X3BhZ2VcIjogXCLQndCw0L/QtdGH0LDRgtCw0YLRjCDRgtC10YHRgtC+0LLRg9GOINGB0YLRgNCw0L3QuNGG0YNcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVcIjogXCLQntGH0LXRgNC10LTRjCDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwicXVldWVfZW1wdHlcIjogXCLQntGH0LXRgNC10LTRjCDQv9GD0YHRgtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNfM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJydWxlc1wiOiBcItCX0LDQtNCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RcIjogXCJcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF9wYWdlXCI6IFwi0KLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfdGV4dFwiOiBcItCt0YLQviDRgtC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LAgUm9ja0p1ZGdlXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZF9jbHViXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQutC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25cIjogXCLQodC+0LfQtNCw0YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uX3BsYW5faXRlbVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0Y3Qu9C10LzQtdC90YJcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2Rpc2NpcGxpbmVcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9qdWRnZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YHRg9C00YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcGFydGljaXBhbnRcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfdG91clwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X2hlYXRzXCI6IFwi0JfQsNGF0L7QtNGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9udW1iZXJzXCI6IFwi0J3QvtC80LXRgNCwINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRcIjogXCLQrdC60YHQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydFwiOiBcItCY0LzQv9C+0YDRgtC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImxhdW5jaF9hdXRvX3ByaW50ZXJcIjogXCLQl9Cw0L/Rg9GB0Log0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60L7QuSDQv9C10YfQsNGC0LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMINCw0LrRgNC+0LHQsNGC0LjQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCf0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINCy0YHQtSDRg9GB0YLRgNC+0LnRgdGC0LLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCe0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0YPRgdGC0YDQvtC50YHRgtCy0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fcGxhblwiOiBcItCh0L7RgNGC0LjRgNC+0LrQsCDQv9C+INC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzd2l0Y2hfdG9fZGlzY2lwbGluZXNcIjogXCLQodC+0YDRgtC40YDQvtC60LAg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuY29uZmlybV9zY29yZVwiOiBcItCe0YLQvNC10L3QsCDRhNC40LrRgdCw0YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVcIjogXCLQntGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jbHViXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0LrQu9GD0LE/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9jb21wZXRpdGlvblwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQviDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LU/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9kaXNjaXBsaW5lXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC00LjRgdGG0LjQv9C70LjQvdGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfanVkZ2VcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGB0YPQtNGM0Y4/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQv9GA0L7Qs9GA0LDQvNC80YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDRgdGC0YDQsNC90LjRhtGDINC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjiDRgtGD0YDQsD8g0JLQstC10LTQuNGC0LUgwqt1bmZpbmFsaXplwrssINGH0YLQvtCx0Ysg0L/RgNC+0LTQvtC70LbQuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWJvdXRcIjogXCLQniDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiY2xpZW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0L/QvtC00LrQu9GO0YfQtdC90L3Ri9C80Lgg0YPRgdGC0YDQvtC50YHRgtCy0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzXCI6IFwi0JrQu9GD0LHRiy3Rg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC60LvRg9Cx0LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX3N1bW1hcnlcIjogXCLQodCy0L7QtNC60LAg0L/QviDQutC70YPQsdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9tYW5hZ2VtZW50XCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCg0LDRgdC/0YDQtdC00LXQu9C10L3QuNC1INGB0YPQtNC10Lkg0L/QviDQtNC40YHRhtC40L/Qu9C40L3QsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfc2hvd25cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0L/QviDRgdC70LXQtNGD0Y7RidC40Lwg0LTQuNGB0YbQuNC/0LvQuNC90LDQvDpcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfc3VtbWFyeVwiOiBcItCh0LLQvtC00LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0X2NvbXBldGl0aW9uXCI6IFwi0K3QutGB0L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwINC4INGA0LXQt9GD0LvRjNGC0LDRgtC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2NvbXBldGl0aW9uXCI6IFwi0JjQvNC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00LXQudGB0LrQsNGPINCx0YDQuNCz0LDQtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvYmF0aWNzXCI6IFwi0JfQsNCz0YDRg9C30LrQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGD0YfQsNGB0YLQvdC40LrQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic2VydmljZV9tZW51XCI6IFwi0KHQtdGA0LLQuNGB0L3QvtC1INC80LXQvdGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDRg9GH0LDRgdGC0L3QuNC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQntGC0LzQtdC90LAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bnBpY2tlZF90b3Vyc1wiOiBcItCd0LUg0LLQutC70Y7Rh9C10L3RiyDQsiDQv9GA0L7Qs9GA0LDQvNC80YNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9kYXRlXCI6IFwi0JTQsNGC0LAg0L/RgNC+0LLQtdC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fbmFtZVwiOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9jbHVic1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC60LvRg9Cx0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Rpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2V4dGVuZGVkX2luZm9cIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdGI0LjRgNC10L3QvdGD0Y4g0LjQvdGE0L7RgNC80LDRhtC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDRgdGD0LTRjNGP0YVcIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmlsZXNfc2VsZWN0ZWRcIjogXCLQktGL0LHQtdGA0LjRgtC1INGE0LDQudC7Li4uXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhc3RlX2Fjcm9cIjogXCLQktGB0YLQsNCy0YzRgtC1INC00LDQvdC90YvQtSDQuNC3INC60LDQu9GM0LrRg9C70Y/RgtC+0YDQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3N1bW1hcnlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0LrQvtC70LjRh9C10YHRgtCy0L5cIixcclxuICAgICAgICAgICAgICAgIFwic3ViXCI6IFwi0LfQsNC/XCIsICAvLyBzdWJzdGl0dXRlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX3Bhc3Njb2RlXCI6IFwi0JLQstC10LTRkdC9INC90LXQstC10YDQvdGL0Lkg0LrQvtC0INC/0L7RgtCy0LXRgNC20LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lbnVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9yZXBvcnRcIjogXCLQn9GA0L7RgtC+0LrQvtC7INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NsdWJzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9kaXNjaXBsaW5lc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfanVkZ2VzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX3Nwb3J0c21lblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGB0L/QvtGA0YLRgdC80LXQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfdG91cnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgtGD0YDQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfbGlzdFwiOiBcItCh0YLQsNGA0YLQvtCy0YvQuSDQu9C40YHRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuX3BhcnRpY2lwYW50c1wiOiBuID0+IG4udG9TdHJpbmcoKSArIFwiINGD0YfQsNGB0YLQvdC40LpcIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwibl9zcG9ydHNtZW5cIjogbiA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSxcclxuICAgICAgICAgICAgICAgIFwidG90YWxfbl9wYXJ0aWNpcGFudHNcIjogbiA9PiBcItCY0YLQvtCz0L4gXCIgKyBuICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdpbmctdGFic1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvdXItYWRtaW5cIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzLTNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZS1yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZXJyb3JzXCI6IHtcclxuICAgICAgICAgICAgXCJhZG1pblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImxvYWRfc3ludGF4X2Vycm9yXCI6IFwi0J3QtdC60L7RgNGA0LXQutGC0L3Ri9C5INGE0L7RgNC80LDRgiDQtNCw0L3QvdGL0YVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhcGlcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkdXBsaWNhdGVkX2V4dGVybmFsX2lkXCI6IFwi0JIg0LTQsNC90L3Ri9GFINC40LzQtdGO0YLRgdGPINC30LDQv9C40YHQuCDRgSDQv9C+0LLRgtC+0YDRj9GO0YnQuNC80LjQvNGB0Y8gZXh0ZXJuYWxfaWRcIixcclxuICAgICAgICAgICAgICAgIFwidW5hYmxlX3RvX2dldFwiOiAod2FudGVkKSA9PiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC/0L7Qu9GD0YfQuNGC0YwgXCIgKyB3YW50ZWQgKyBcIiDQuNC3INC30LDQv9GA0L7RgdCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY2x1YlwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC60LvRg9CxLCDQuiDQutC+0YLQvtGA0L7QvNGDINC/0YDQuNCy0Y/Qt9Cw0L3RiyDRg9GH0LDRgdGC0L3QuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9ub25fZW1wdHlcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LUsINGB0L7QtNC10YDQttCw0YnQtdC1INC00LjRgdGG0LjQv9C70LjQvdGLLCDQutC70YPQsdGLINC40LvQuCDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRvb19tYW55X3RvdXJzXCI6IChkKSA9PiBbXCLQntGI0LjQsdC60LAg0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLCBg0JIg0LTQuNGB0YbQuNC/0LvQuNC90LUgJHtkfSDRgdC+0LTQtdGA0LbQuNGC0YHRjyDQsdC+0LvRjNGI0LUg0YLRg9GA0L7Qsiwg0YfQtdC8INGB0L7Qt9C00LDQvdC+INCyINGB0LjRgdGC0LXQvNC1YF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2hhbmdlX2p1ZGdlc193aXRoX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDRgdC+0YHRgtCw0LIg0YHRg9C00LXQuSDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YssINGB0L7QtNC10YDQttCw0YnQtdC5INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3BhcnRpY2lwYW50c1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRg9GH0LDRgdGC0L3QuNC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF90b3Vyc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINC00LjRgdGG0LjQv9C70LjQvdGDLCDRgdC+0LTQtdGA0LbQsNGJ0YPRjiDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOLCDRgyDQutC+0YDQvtCz0L4g0LXRgdGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3Njb3Jlc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4g0L/RgNC40L3Rj9Cy0YjQtdCz0L4g0YPRh9Cw0YHRgtC40LUg0LIg0YHRg9C00LXQudGB0YLQstC1INGF0L7RgtGPINCx0Ysg0L7QtNC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlcGVhdGluZ19qdWRnZVwiOiAobmFtZSkgPT4gbmFtZSArIFwiINCy0YHRgtGA0LXRh9Cw0LXRgtGB0Y8g0LIg0YHQv9C40YHQutC1INGB0YPQtNC10Lkg0LHQvtC70LXQtSDQvtC00L3QvtCz0L4g0YDQsNC30LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJpbnRlcm5hbF9zZXJ2ZXJfZXJyb3JcIjogW1wi0J7RiNC40LHQutCwINC90LAg0YHQtdGA0LLQtdGA0LVcIiwgXCLQv9GA0L7QstC10YDRjNGC0LUg0LvQvtCz0Lgg0LTQu9GPINC40L3RhNC+0YDQvNCw0YbQuNC4XCJdLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZGlzY2lwbGluZXNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRgdGD0LTRjNGOLCDQstGF0L7QtNGP0YnQtdCz0L4g0LIg0YHRg9C00LXQudGB0LrRg9GOINCx0YDQuNCz0LDQtNGDINGF0L7RgtGPINCx0Ysg0L7QtNC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfZmluYWxpemVkX3RvdXJzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwLCDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDRhdC+0YLRjyDQsdGLINCyINC+0LTQvdC+0Lwg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0Lwg0YLRg9GA0LVcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJ1blwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInNldF9wZXJmb3JtZWRfZmxhZ19vbl9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0YLQsNGC0YPRgSDQt9Cw0YXQvtC00LAg0YTQuNC90LDQu9C40LfQuNC90L7QstCw0L3QvdC+0LPQviDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInNjb3JlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2NvcmVfbm90X2V4aXN0XCI6IFwi0J/QvtC/0YvRgtC60LAg0L/QvtC70YPRh9C40YLRjCDQt9C90LDRh9C10L3QuNC1INC90LXRgdGD0YnQtdGB0YLQstGD0Y7RidC10Lkg0L7RhtC10L3QutC4INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwidXBkYXRlX29uX2ZpbmFsaXplZF90b3VyXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0LjQt9C80LXQvdC40YLRjCDQvtGG0LXQvdC60YMg0LIg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0Lwg0YLRg9GA0LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJ0b3VyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkX2JlZm9yZV9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQtNC+0LHQsNCy0LjRgtGMINC90L7QstGL0Lkg0YLRg9GAINC/0LXRgNC10LQg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfaW5fY29tcGV0aXRpb25fcGxhblwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGC0YPRgCwg0L/RgNC40YHRg9GC0YHRgtCy0YPRjtGJ0LjQuSDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfZmluYWlsemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9hZGRfYWZ0ZXJfaWRcIjogXCLQn9C+0L/Ri9GC0LrQsCDQtNC+0LHQsNC40YLRjCDRgtGD0YAg0LIg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQtSDQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfdG9fbm9uX2VtcHR5XCI6IChkKSA9PiBbXCLQndC10LLQvtC30LzQvtC20L3QviDQt9Cw0LPRgNGD0LfQuNGC0Ywg0YLRg9GA0Ysg0LTQu9GPINC00LjRgdGG0LjQv9C70LjQvdGLXCIsIGDQlNC40YHRhtC40L/Qu9C40L3QsCAke2R9INGD0LbQtSDRgdC+0LTQtdGA0LbQuNGCINGC0YPRgNGLYF0sXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaXNfZmluYWlsemVkXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQvdC1INC00L7Qu9C20LXQvSDQsdGL0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19uZXh0X3RvdXJcIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC/0L7RgdC70LXQtNC90LjQuSDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0JTQsNC90L3Ri9C5INGC0YPRgCDQvdC1INGB0L7QtNC10YDQttC40YLRgdGPINCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwicHJldl9ub3RfZmluYWlsemVkXCI6IFwi0J/RgNC10LTRi9C00YPRidC40Lkg0YLRg9GAINC00L7Qu9C20LXQvSDQsdGL0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9maW5hbGl6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQt9Cw0L/Rg9GB0YLQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInVwZGF0ZV9maW5hbGl6ZWRcIjogXCLQlNC70Y8g0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdC+0LPQviDRgtGD0YDQsCDQvdC1INC00L7Qv9GD0YHQutCw0LXRgtGB0Y8g0LjQt9C80LXQvdC10L3QuNC1INC60LLQvtGC0Ysg0LLRi9Cy0L7QtNCwLCDRgtC40L/QsCDRgtGD0YDQsCDQuNC70Lgg0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFkZFwiOiBcItCU0L7QsdCw0LLQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiY2xvc2VcIjogXCLQl9Cw0LrRgNGL0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZXNlbGVjdF9hbGxcIjogXCLQodC90Y/RgtGMINCy0YHQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJlZGl0XCI6IFwi0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlXCI6IFwi0KPQtNCw0LvQuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2FyZFwiOiBcItCe0YLQvNC10L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZFwiOiBcItCX0LDQs9GA0YPQt9C40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzYXZlXCI6IFwi0KHQvtGF0YDQsNC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9hbGxcIjogXCLQktGL0LHRgNCw0YLRjCDQstGB0LVcIixcclxuICAgICAgICAgICAgICAgIFwic3VibWl0XCI6IFwi0KHQvtGF0YDQsNC90LjRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYnJvd3NlXCI6IFwi0J7QsdC30L7RgC4uLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW5nXCI6IFwi0J/QvtC00LrQu9GO0YfQtdC90LjQtSDQuiDRgdC10YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX3Byb2JsZW1cIjogXCLQn9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwieWVzXCI6IFwi0JTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub1wiOiBcItCd0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29ubmVjdGlvbl9lcnJvclwiOiBcItCf0L7RhdC+0LbQtSwg0LjQvNC10Y7RgtGB0Y8g0L/RgNC+0LHQu9C10LzRiyDRgSDRgdC10YLRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImVycm9yX2hlYWRlclwiOiBcItCe0YjQuNCx0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWNjZXNzXCI6IFwi0J7Qv9C10YDQsNGG0LjRjyDRg9GB0L/QtdGI0L3QviDQt9Cw0LLQtdGA0YjQtdC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwaHJhc2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiaGVhdF9uXCI6IChuKSA9PiBcItCX0LDRhdC+0LQg4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlX25cIjogKG4pID0+IFwi0JvQuNC90LXQudC90YvQuSDRgdGD0LTRjNGPIOKEllwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uXCI6IChuLCBuYW1lLCBuX3NwKSA9PlxyXG4gICAgICAgICAgICAgICAgICAgIChuX3NwID4gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA/IFwi0KTQvtGA0LzQtdC50YjQvSDihJZcIiArIG4udG9TdHJpbmcoKSArIChuYW1lID8gXCI6IFwiICsgbmFtZSA6IFwiXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDogKG5fc3AgPT09IDJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQn9Cw0YDQsCDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBcItCj0YfQsNGB0YLQvdC40Log4oSWXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgKSArIG4udG9TdHJpbmcoKVxyXG4gICAgICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2luZ1wiOiB7XHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1fc2NvcmVcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbml0X3RvdXJcIjogXCLQn9C10YDQtdGB0L7Qt9C00LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9hY3JvYmF0aWNfb3ZlcnJpZGVcIjogXCLQodCx0YDQvtGBXCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQn9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfdG91clwiOiBcItCd0LDRh9Cw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0J7RgdGC0LDQvdC+0LLQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10YHQvtC30LTQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQv9GA0L7Qs9GA0LDQvNC80YMg0LTQu9GPINGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaHVmZmxlX2hlYXRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQvNC10YjQsNGC0Ywg0LfQsNGF0L7QtNGLP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsdCw0LfQvtCy0YvRhSDQvtGG0LXQvdC+0Log0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uXCI6IFwi0J7Qv9C40YHQsNC90LjQtSDRgtGA0Y7QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9faWR4XCI6IFwi4oSWINGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtZWRcIjogXCLQl9Cw0YTQuNC60YHQuNGA0L7QstCw0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuZXdfc2NvcmVcIjogXCLQmtC+0YDRgC5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXHJcbiAgICAgICAgICAgICAgICBcIm9sZF9zY29yZVwiOiBcItCR0LDQt9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCSXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwibW9kZWxzXCI6IHtcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQu9GD0LHQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjaXR5XCI6IFwi0JPQvtGA0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L3QtdGI0L3QuNC5IElEXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3RpdmVcIjogXCLQkNC60YLQuNCy0L3QvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkYXRlXCI6IFwi0JTQsNGC0LBcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCU0L7Qv9C+0LvQvdC40YLQtdC70YzQvdCw0Y8g0LjQvdGE0L7RgNC80LDRhtC40Y8g0LTQu9GPINC/0YDQvtGC0L7QutC+0LvQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdGl0bGVcIjogXCLQl9Cw0LPQvtC70L7QstC+0LpcIixcclxuICAgICAgICAgICAgICAgIFwiaW5mb19pdGVtX3ZhbHVlXCI6IFwi0JfQvdCw0YfQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uX3BsYW5faXRlbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJlc3RpbWF0ZWRfYmVnaW5uaW5nXCI6IFwi0J3QsNGH0LDQu9C+XCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9kdXJhdGlvblwiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyXCI6IFwi0KLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInZlcmJvc2VfbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LVcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQodGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicm9sZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCQXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcIlRcIixcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C7XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGFXCIsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlc19sZWdlbmRcIjogKFxyXG4gICAgICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ3LTEwMFwiPjx0Ym9keT48dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JPQuyDigJQg0LPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KIg4oCUINGB0YPQtNGM0Y8g0YLQsNC90YbQsDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0JAg4oCUINGB0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60Lg8L3RkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0yNVwiPtCiZXgg4oCUINGC0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRjzwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICApLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCLQmtCw0YLQtdCz0L7RgNC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC9LiBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KQuINCYLiDQni5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwi0KDQvtC70Ywg0LIg0YHRg9C00LXQudGB0YLQstC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVfZGVzY3JpcHRpb25cIjogXCLQlNC+0LvQttC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvbnNcIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX25hbWVcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX2NpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX25hbWVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwi0JjQvNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlclwiOiBcItCf0L7Qu1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfZlwiOiBcItCWXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9tXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZXJhbF9pbmZvXCI6IFwi0J7RgdC90L7QstC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQvtC80LDQvdC00Ysg0YTQvtGA0LzQtdC50YjQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCLQpNCw0LzQuNC70LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByb2dyYW1zXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfblwiOiBcItCe0YHQvS5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV95XCI6IFwi0JfQsNC/LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZWFyX29mX2JpcnRoXCI6IFwi0JPQvtC0INGA0L7QttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwieW9iXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvZ3JhbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfZm9yXCI6IFwi0J/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfcHJvZ3JhbVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX2hvcGVfdG91clwiOiBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwibnVtX2FkdmFuY2VzXCI6IFwi0JrQstC+0YLQsCDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX3Blcl9oZWF0XCI6IFwi0KPRh9Cw0YHRgtC90LjQutC+0LIg0LIg0LfQsNGF0L7QtNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjb3Jpbmdfc3lzdGVtX25hbWVcIjogXCLQodC40YHRgtC10LzQsCDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfaGVhdFwiOiBcItCh0LHRgNC+0YEg0L3QvtC80LXRgNCwINC30LDRhdC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9wbGFjZVwiOiBcItCh0LHRgNC+0YEg0LzQtdGB0YLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VzXCI6IFwi0JzQtdGB0YLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicHJlc2VudGVyXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19hY3RpdmVfdG91clwiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsZV92aWV3XCI6IFwi0KPQv9GA0L7RidC10L3QvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfY29tcGV0aXRpb25cIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICDQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4INC90LDRhdC+0LTQuNGC0YHRjyDQv9C+INCw0LTRgNC10YHRgyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0J/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YNcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGB0YLQsNC90L7QstC40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDP1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwi0JDQutGA0L7QsdCw0YLQuNC60LAg4oSWXCIgKyAobiArIDEpLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0XCI6IFwi0JfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmVzZW50ZXJcIjogXCLQktC10LTRg9GJ0LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfcGFnZVwiOiBcItCh0YLRgNCw0L3QuNGG0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX2Rpc2NpcGxpbmVcIjogXCLQktGLINC90LUg0YPRh9Cw0YHRgtCy0YPQtdGC0LUg0LIg0YHRg9C00LXQudGB0YLQstC1INC00LDQvdC90L7QuSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ19wYXJ0aWNpcGFudFwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ190b3VyXCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtGCINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWluZ1wiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWN0aW9uc1wiOiBcItCU0LXQudGB0YLQstC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZGFuY2VcIjogXCLQotCw0L3QtdGGXCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRi1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImFjcm9fanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJiaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjb21wb3NpdGlvblwiOiBcItCa0L7QvNC/0L7Qt9C40YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfZmlnc1wiOiBcItCi0LDQvdGG0LXQstCw0LvRjNC90YvQtSDRhNC40LPRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV90ZWNoXCI6IFwi0KLQtdGF0L3QuNC60LAg0YLQsNC90YbQtdCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2ZhbGxfZG93blwiOiBcItCf0LDQtNC10L3QuNGPICgtMylcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX21pc3Rha2VzXCI6IFwi0J7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3NtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9iaWdfbWlzdGFrZXNcIjogXCLQkdC+0LvRjNGI0LjQtSDQvtGI0LjQsdC60LggKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfd29tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YDRiNCwICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbXByZXNzaW9uXCI6IFwi0J7QsdGJ0LXQtSDQstC/0LXRh9Cw0YLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicG9pbnRzXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtNSlcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCh0YPQvNC80LAg0LHQsNC70LvQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY19vdmVycmlkZXNcIjogXCLQmtC+0YDRgNC10LrRgtC40YDQvtCy0LrQuCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJsYWNrX2NhcmRcIjogXCItMTAwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2Vfc2NvcmVzXCI6IFwi0J7RhtC10L3QutC4INC70LjQvdC10LnQvdGL0YUg0YHRg9C00LXQuVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm9rXCI6IFwiT0tcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5X3R5cGVcIjogXCLQqNGC0YDQsNGE0L3Ri9C1INGB0LDQvdC60YbQuNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicHJldmlvdXNfcGVuYWx0aWVzXCI6IFwi0J/RgNC10LTRi9C00YPRidC40LUg0YjRgtGA0LDRhNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVkX2NhcmRcIjogXCItMzBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ5ZWxsb3dfY2FyZFwiOiBcIi0zXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV95ZWxsb3dfY2FyZFwiOiBcIi01XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9yZWRfY2FyZFwiOiBcIi0xNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJqdW1wX3N0ZXBzXCI6IFwi0J7RgdC90L7QstC90YvQtSDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlc2V0X3RvX25cIjogKG4pID0+IFwi0KHQsdGA0L7RgSDQvdCwIFwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRpbWluZ1wiOiBcItCU0LvQuNGC0LXQu9GM0L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcImJyZWFrZG93blwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYVwiOiBcIkFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX25cIjogKG4pID0+IFwiQVwiICsgbi50b1N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJtXCI6IFwi0JHQnlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNcIjogXCLQmlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRmXCI6IFwi0KLQpFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImR0XCI6IFwi0KJUXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmRcIjogXCLQn1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZtXCI6IFwi0J7QpdC8XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndcIjogXCLQntCl0LZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpXCI6IFwi0J7QklwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm1cIjogXCLQntGIXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicFwiOiBcItCcXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic21cIjogXCLQnNCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidFwiOiBcIs6jXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19hZHZhbmNlZFwiOiBcItCf0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiOiBcItCd0LUg0L/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0LLRi9GB0YLRg9C/0LDQu9C4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQsNC60YDQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NfdmVyYm9zZVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwICjQt9Cw0Y/QstC60LAv0YTQsNC60YIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY2FyZFwiOiBcItCo0YLRgNCw0YRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZVwiOiBcItCg0LXQt9GD0LvRjNGC0LDRgiDQotCdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfc2NvcmVfc2hvcnRcIjogXCLQotCdXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW5mb1wiOiBcItCj0YfQsNGB0YLQvdC40LosINGA0LXQt9GD0LvRjNGC0LDRglwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5leHRfdG91clwiOiBcItCh0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQv9GA0LjQvdC40LzQsNC7INGD0YfQsNGB0YLQuNC1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi4oSWXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwZW5hbHR5XCI6IFwi0KjRgtGA0LDRhCDQs9C70LDQstC90L7Qs9C+INGB0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItCc0LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5cIjogXCLQodC/0L7RgNGC0YHQvNC10L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQmNGC0L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc19uYW1lc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60LjQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9md1wiOiBcItCg0L7RgdCk0JDQoNCgLCBBINC4IE0g0LrQu9Cw0YHRgdGLLCDRhNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0LHQtdC3INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGE0L7RgNC80LXQudGI0L0g0YEg0LDQutGA0L7QsdCw0YLQuNC60L7QuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGC0LDQvdGG0LXQstCw0LvRjNC90YvQtSDQv9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic2ltcGxpZmllZFwiOiBcItCg0L7RgdCk0JDQoNCgLCDRg9C/0YDQvtGJ0LXQvdC90LDRjyDRgdC40YHRgtC10LzQsCAoMeKAkzQwKVwiLFxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBcImp1ZGdlX3JvbGVzXCI6IHtcclxuICAgICAgICAgICAgXCJcIjogXCItXCIsXHJcbiAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiBcItCh0YPQtNGM0Y8g0YLQsNC90YbQsFwiLFxyXG4gICAgICAgICAgICBcImhlYWRfanVkZ2VcIjogXCLQk9C70LDQstC90YvQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiBcItCi0LXRhdC90LjRh9C10YHQutC40Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgIH0sXHJcbiAgICB9O1xyXG4gICAgbGV0IHBhdGggPSBzcmMuc3BsaXQoXCIuXCIpO1xyXG4gICAgbGV0IHBocmFzZV9wdHIgPSBQSFJBU0VTO1xyXG4gICAgcGF0aC5mb3JFYWNoKChjaHVuaykgPT4gcGhyYXNlX3B0ciA9IHBocmFzZV9wdHJbY2h1bmtdKTtcclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJ1bmRlZmluZWRcIikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJVbmFibGUgdG8gZmluZCB0cmFuc2xhdGlvbiBmb3IgXCIgKyBzcmMpO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0eXBlb2YgcGhyYXNlX3B0ciA9PT0gXCJmdW5jdGlvblwiKSB7XHJcbiAgICAgICAgbGV0IGFyZ3MgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xyXG4gICAgICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcGhyYXNlX3B0ciguLi5hcmdzKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwaHJhc2VfcHRyO1xyXG59XHJcblxyXG5leHBvcnQgdmFyIGdldFBvc3NpYmxlVG91ck5hbWVzID0gKCkgPT4gW1xyXG4gICAgXCLQpNC40L3QsNC7XCIsXHJcbiAgICBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgIFwi0J7RgtCx0L7RgNC+0YfQvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICBcIjEvMiDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS80INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzgg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvMTYg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgXCLQpNC40L3QsNC7LCDQsNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG5dO1xyXG4iLCJpbXBvcnQgeyBKdWRnZSB9IGZyb20gXCJjbGllbnRzL2p1ZGdlL21haW5cIjtcclxuXHJcblxyXG5SZWFjdERPTS5yZW5kZXIoXHJcbiAgICA8SnVkZ2UgeyAuLi53aW5kb3cucGFnZV9wcm9wcyB9IC8+LFxyXG4gICAgd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKVxyXG4pO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgc2hvd0Vycm9yIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcblxyXG5jbGFzcyBBcGlJbXBsIHtcclxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IChtc2csIGNvZGUsIGFyZ3MpID0+IHNob3dFcnJvcihjb2RlID8gXyhjb2RlLCAuLi5hcmdzKSA6IG1zZyk7XHJcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gKC4uLmRhdGEpID0+IGNvbnNvbGUuZXJyb3IoXCJBUEkgZmFpbFwiLCAuLi5kYXRhKTtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG4gICAgb25Eb25lKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9kb25lID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvblN1Y2Nlc3MoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRXJyb3IoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvbkZhaWwoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFkZFRvREIobW9kZWxfdHlwZSwgbW9kZWxfaWQsIHN0PXN0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHN0LmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZW5kKCkge1xyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgXCIvYXBpXCIsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfZGIocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9zdWNjZXNzKHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZXJyb3IocmVzcG9uc2UubWVzc2FnZSwgcmVzcG9uc2UuY29kZSwgcmVzcG9uc2UuYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiY2xpZW50X2lkXCIsIHdpbmRvdy5jbGllbnRfaWQpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcIm1ldGhvZFwiLCB0aGlzLm1ldGhvZCk7XHJcbiAgICAgICAgeGhyLnNlbmQoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgQXBpID0gKC4uLmFyZ3MpID0+IG5ldyBBcGlJbXBsKC4uLmFyZ3MpO1xyXG4iLCJpbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IGNvbm5lY3Rpb25fc3RhdHVzIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlRGlzcGF0Y2hlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNfY250ID0gMDtcclxuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcclxuICAgIH1cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIHdlYnNvY2tldC4uLlwiKTtcclxuICAgICAgICB0aGlzLndzID0gbmV3IFNvY2tKUyhcImh0dHA6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvd3NcIik7XHJcbiAgICAgICAgdGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0T2soKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQuXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbW1wicmVsb2FkX2RhdGFcIiwgbnVsbF1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbF91cGRhdGVzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0RmFpbCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gY2xvc2VkLlwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY29ubmVjdC5iaW5kKHRoaXMpLCA1MDApO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbk1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhW1wiY2xpZW50X2lkXCJdKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGllbnRfaWQgPSBkYXRhW1wiY2xpZW50X2lkXCJdO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEubWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBtc2dfdHlwZSA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgIGxldCBtc2dfZGF0YSA9IGRhdGFbMV07XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge307XHJcbiAgICAgICAgICAgIGlmIChtc2dfdHlwZSA9PT0gXCJmb3JjZV9yZWZyZXNoXCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9KS5mb3JFYWNoKChrZXkpID0+IGxpc3RlbmVyc1trZXldKG1zZ19kYXRhKSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgZGF0YS5tb2RlbF91cGRhdGVzLmZvckVhY2goKG1vZGVsX2luZm8pID0+IHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gc3RvcmFnZS51cGRhdGVNb2RlbChtb2RlbF9pbmZvLm1vZGVsLCBtb2RlbF9pbmZvLmlkLCBtb2RlbF9pbmZvLmRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZGF0YV9jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tcImRiX3VwZGF0ZVwiXSB8fCB7fTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldExpc3RlbmVySWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzX2NudCsrO1xyXG4gICAgfVxyXG4gICAgYWRkTGlzdGVuZXIobXNnX3R5cGVzLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuZ2V0TGlzdGVuZXJJZCgpO1xyXG4gICAgICAgIG1zZ190eXBlcy5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihtc2dfdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW21zZ190eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdW2lkXSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJfaWQpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW2tleV1bbGlzdGVuZXJfaWRdO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgbWVzc2FnZV9kaXNwYXRjaGVyID0gbmV3IE1lc3NhZ2VEaXNwYXRjaGVyKCk7XHJcbiIsImNsYXNzIFJlZiB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lLCBpZCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5tb2RlbF9uYW1lKS5ieV9pZCh0aGlzLmlkKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgaWQsIG1vZGVsX3N0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fX3N0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXMgPSB7fTtcclxuICAgICAgICB0aGlzLl9fbW9kZWxfc3RvcmFnZSA9IG1vZGVsX3N0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGRCYWNrUmVmKGtleSwgcmVmKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gcmVmO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGRhdGEsIGNyZWF0ZT10cnVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkeCkpIHtcclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiIHx8IGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZSAmJiB0eXBlb2YgdGhpc1tpZHguc2xpY2UoMSldID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gW11cclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIHRoaXMuX19tb2RlbF9zdG9yYWdlLm1vZGVsX25hbWUsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmX2tleSA9IGRhdGFbaWR4XS5iYWNrX3JlZjtcclxuICAgICAgICAgICAgICAgIGRhdGFbaWR4XS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKG5lc3RlZF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YS5kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmLmdldCgpLmFkZEJhY2tSZWYoYmFja19yZWZfa2V5LCBiYWNrX3JlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldLnB1c2gocmVmKTtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIipcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXN0ZWRfZGF0YSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2lkeF0gPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2lkeF0gPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VyaWFsaXplKHNjaGVtYSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB7fVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9fa2V5X3R5cGVzKSBpZiAodGhpcy5fX2tleV90eXBlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fX2tleV90eXBlc1trZXldKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIqXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLm1hcChmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZi5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJeXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5pZCA9IHRoaXMuaWRcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbHNTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMubW9kZWxzID0ge307XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZChpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbHNbaWRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXSA9IG5ldyBNb2RlbCh0aGlzLnN0b3JhZ2UsIGlkLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsc1tpZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBieV9pZChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tpZF07XHJcbiAgICB9XHJcbiAgICBhbGwoKSB7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1vZGVscyk7XHJcbiAgICAgICAgcmV0dXJuIGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNba2V5XTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlcyA9IHt9XHJcbiAgICAgICAgdGhpcy5kb21haW5zID0ge31cclxuICAgIH1cclxuICAgIGdldERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZG9tYWluc1tkb21haW5dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tYWluc1tkb21haW5dID0gbmV3IFN0b3JhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZGVsRG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGdldChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPSBuZXcgTW9kZWxzU3RvcmFnZSh0aGlzLCBtb2RlbF9uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICBkZWwobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlTW9kZWwobW9kZWxfdHlwZSwgbW9kZWxfaWQsIGRhdGEpIHtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfdHlwZV0pIHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCBkYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZG9tYWlucykuZm9yRWFjaCgoa2V5KSA9PlxyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmRvbWFpbnNba2V5XS51cGRhdGVNb2RlbCguLi5hcmd1bWVudHMpIHx8IGRhdGFfY2hhbmdlZCk7XHJcbiAgICAgICAgLy8gcmV0dXJuIGRhdGFfY2hhbmdlZDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoKVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIExvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBzdHlsZT17eyBcImhlaWdodFwiOiBcIjEwMCVcIiwgXCJ3aWR0aFwiOiBcIjEwMCVcIiB9fT48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9e3sgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIiB9fT5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9pbWcvYWpheC1sb2FkZXIuZ2lmXCIgLz5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1c01vY2sge1xyXG4gICAgc2V0T2soKSB7fVxyXG4gICAgc2V0RmFpbCgpIHt9XHJcbn1cclxuXHJcbmNsYXNzIENvbm5lY3Rpb25TdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgXCJjb25uZWN0ZWRcIjogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdGlvbl9zdGF0dXNcIik7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcclxuICAgICAgICAgICAgICAgIDxDb25uZWN0aW9uU3RhdHVzIC8+LFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25TdGF0dXNNb2NrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEludGVydmFsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHRpY2s6ICF0aGlzLnN0YXRlLnRpY2ssXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDc1MCk7XHJcbiAgICB9XHJcbiAgICBzdG9wSW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0T2soKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiB0cnVlLCB0aWNrOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHNldEZhaWwoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEludGVydmFsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3RlZDogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIG9rXCI+PC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3RlZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25uZWN0aW9uLXN0YXR1cyBhbGVydC13YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW5nXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJjb25uZWN0aW9uLXN0YXR1cyBhbGVydC1kYW5nZXJcIiArICh0aGlzLnN0YXRlLnRpY2sgPyBcIiB0aWNrXCIgOiBcIlwiKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5sYWJlbHMuY29ubmVjdGlvbl9wcm9ibGVtXCIpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIGNvbm5lY3Rpb25fc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5pbml0KCk7XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcclxuXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1zZykge1xyXG4gICAgbGV0IHRpdGxlID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzBdIDogXyhcImdsb2JhbC5tZXNzYWdlcy5lcnJvcl9oZWFkZXJcIik7XHJcbiAgICBsZXQgdGV4dCA9ICh0eXBlb2YgbXNnID09PSBcIm9iamVjdFwiKSA/IG1zZ1sxXSA6IG1zZztcclxuICAgIHN3YWwoe1xyXG4gICAgICAgIHRpdGxlOiB0aXRsZSxcclxuICAgICAgICB0ZXh0OiB0ZXh0LFxyXG4gICAgICAgIHR5cGU6IFwiZXJyb3JcIixcclxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBzaG93Q29uZmlybShtZXNzYWdlLCBhY3Rpb24sIGNsb3NlX29uX2NvbmZpcm09ZmFsc2UpIHtcclxuICAgIHJldHVybiBzd2FsKHtcclxuICAgICAgICB0aXRsZTogbWVzc2FnZSxcclxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxyXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXHJcbiAgICAgICAgY29uZmlybUJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSxcclxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy5ub1wiKSxcclxuICAgICAgICBjbG9zZU9uQ29uZmlybTogY2xvc2Vfb25fY29uZmlybSxcclxuICAgIH0sIGFjdGlvbik7XHJcbn1cclxuIiwiZXhwb3J0IGNsYXNzIFByaW50YWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIHRpdGxlMTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcclxuICAgICAgICAgICAgdGl0bGUyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICB0aXRsZTM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIGJvZHk6IFJlYWN0LlByb3BUeXBlcy5ub2RlLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBmZXRjaFByaW50YWJsZURhdGEoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvZHkuaW5uZXJIVE1MO1xyXG4gICAgfVxyXG4gICAgcmVuZGVySGVhZGVyKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmhlYWRlciA/IDxkaXYgY2xhc3NOYW1lPVwicC1oZWFkZXJcIj57IHRoaXMucHJvcHMuaGVhZGVyIH08L2Rpdj4gOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyVGl0bGUxKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMSA/IDxoMT57IHRoaXMucHJvcHMudGl0bGUxIH08L2gxPiA6IG51bGw7XHJcbiAgICB9XHJcbiAgICByZW5kZXJUaXRsZTIoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUyID8gPGgyPnsgdGhpcy5wcm9wcy50aXRsZTIgfTwvaDI+IDogbnVsbDtcclxuICAgIH1cclxuICAgIHJlbmRlclRpdGxlMygpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTMgPyA8aDM+eyB0aGlzLnByb3BzLnRpdGxlMyB9PC9oMz4gOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyQm9keSgpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2XHJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLWNvbnRlbnRcIlxyXG4gICAgICAgICAgICAgICAgcmVmPXsgZSA9PiB0aGlzLl9ib2R5ID0gZSB9XHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5ib2R5IH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInByaW50YWJsZVwiPlxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUxKCkgfVxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUyKCkgfVxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUzKCkgfVxyXG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hPckNsaWNrKGhhbmRsZXIpIHtcclxuICAgIGxldCBmID0gKGV2ZW50KSA9PiB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICByZXR1cm4gaGFuZGxlcihldmVudCk7XHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBvblRvdWNoU3RhcnQ6IGYsXHJcbiAgICAgICAgb25DbGljazogZixcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hFbmRPckNsaWNrKGhhbmRsZXIsIHByZXZlbnRfZGVmYXVsdCkge1xyXG4gICAgbGV0IF9oYW5kbGVyID0gKCkgPT4ge307XHJcbiAgICBsZXQgZGlzdGFuY2UgPSAwO1xyXG4gICAgbGV0IGxhdGVzdF9wb3MgPSBbMCwgMF07XHJcbiAgICBsZXQgZmlyZSA9IChldmVudCkgPT4ge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVyKCk7XHJcbiAgICB9XHJcbiAgICBsZXQgZGlzY2FyZCA9ICgpID0+IHtcclxuICAgICAgICBfaGFuZGxlciA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG4gICAgbGV0IG1vdmUgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBsZXQgY3VycmVudF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XHJcbiAgICAgICAgbGV0IHNxciA9ICh4KSA9PiB4ICogeDtcclxuICAgICAgICBkaXN0YW5jZSArPSBNYXRoLnNxcnQoc3FyKGN1cnJlbnRfcG9zWzBdIC0gbGF0ZXN0X3Bvc1swXSkgKyBzcXIoY3VycmVudF9wb3NbMV0gLSBsYXRlc3RfcG9zWzFdKSk7XHJcbiAgICAgICAgbGF0ZXN0X3BvcyA9IGN1cnJlbnRfcG9zO1xyXG4gICAgICAgIGlmIChkaXN0YW5jZSA+IDIwKSB7XHJcbiAgICAgICAgICAgIGRpc2NhcmQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBsZXQgc3RhcnQgPSAoZXZlbnQpID0+IHtcclxuICAgICAgICBfaGFuZGxlciA9IGhhbmRsZXI7XHJcbiAgICAgICAgZGlzdGFuY2UgPSAwO1xyXG4gICAgICAgIGxhdGVzdF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XHJcbiAgICB9XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIG9uVG91Y2hTdGFydDogc3RhcnQsXHJcbiAgICAgICAgb25Ub3VjaEVuZDogZmlyZSxcclxuICAgICAgICBvblRvdWNoTW92ZTogbW92ZSxcclxuICAgICAgICBvblRvdWNoQ2FuY2VsOiBkaXNjYXJkLFxyXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZXIsXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTbGlkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgZG9uZTogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgICAgIGRvbmVUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBzbGlkZVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXHJcbiAgICAgICAgICAgIG9uQWN0aXZhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wcykge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnBpbiA9IG51bGw7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVXBkYXRlKG5leHRQcm9wcykge1xyXG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5kb25lICYmIG5leHRQcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBpc0ZyZWUoKSB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0YXRlLnRvdWNoICYmICF0aGlzLnByb3BzLmRvbmUgJiYgIXRoaXMuc3RhdGUuZmluaXNoZWQ7XHJcbiAgICB9XHJcbiAgICBnZXRPdXRlclRleHRPcGFjaXR5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgdmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCgxMDAgLSB0aGlzLnN0YXRlLnBvc2l0aW9uLCAwKSwgMTAwKTtcclxuICAgICAgICByZXR1cm4gKHZhbHVlIC8gMTAwKS50b0ZpeGVkKDMpO1xyXG4gICAgfVxyXG4gICAgZ2V0RWxlbWVudE9mZnNldChlbGVtZW50KSB7XHJcbiAgICAgICAgbGV0IHJlcyA9IDA7XHJcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmVzICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xyXG4gICAgICAgICAgICBlbGVtZW50ID0gZWxlbWVudC5wYXJlbnROb2RlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgZ2V0VG91Y2goZXZlbnQpIHtcclxuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQucGFyZW50Tm9kZTtcclxuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcclxuICAgIH1cclxuICAgIGdldFJlbGF0aXZlVG91Y2goZXZlbnQpIHtcclxuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xyXG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQ7XHJcbiAgICAgICAgcmV0dXJuIHRvdWNoLnBhZ2VYIC0gdGhpcy5nZXRFbGVtZW50T2Zmc2V0KHBhcmVudCk7XHJcbiAgICB9XHJcbiAgICBnZXRTbGlkZXJQb3MoZXZlbnQpIHtcclxuICAgICAgICBsZXQgcG9zID0gdGhpcy5nZXRUb3VjaChldmVudCkgLSB0aGlzLnBpbjtcclxuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgMjAwKTtcclxuICAgIH1cclxuICAgIG9uQ2xpY2soZXZlbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcG9zaXNpb246IDIwMCxcclxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcclxuICAgIH1cclxuICAgIG9uVG91Y2hTdGFydChldmVudCkge1xyXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5waW4gPSB0aGlzLmdldFJlbGF0aXZlVG91Y2goZXZlbnQpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xyXG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxyXG4gICAgICAgICAgICB0b3VjaDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uVG91Y2hNb3ZlKGV2ZW50KSB7XHJcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uVG91Y2hFbmQoZXZlbnQpIHtcclxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBvc2l0aW9uID09PSAyMDApIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcclxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInNsaWRlciBub3NlbGVjdFwiPlxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpbm5lclwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKX1cclxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6ICh0aGlzLnByb3BzLmRvbmUgfHwgdGhpcy5zdGF0ZS5maW5pc2hlZCkgPyBcIjIwMHB4XCIgOiB0aGlzLnN0YXRlLnBvc2l0aW9uICsgXCJweFwiIH19XHJcbiAgICAgICAgICAgICAgICBvblRvdWNoU3RhcnQ9eyB0aGlzLm9uVG91Y2hTdGFydC5iaW5kKHRoaXMpIH1cclxuICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsgdGhpcy5vblRvdWNoTW92ZS5iaW5kKHRoaXMpIH1cclxuICAgICAgICAgICAgICAgIG9uVG91Y2hFbmQ9eyB0aGlzLm9uVG91Y2hFbmQuYmluZCh0aGlzKSB9XHJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXsgdGhpcy5vbkNsaWNrLmJpbmQodGhpcykgfVxyXG4gICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICDihpJcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lXHJcbiAgICAgICAgICAgICAgICA/IDxzcGFuXHJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgY29sb3I6IFwicmdiKDEwMCwxMDAsMTAwKVwiIH19XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJkb25lLXRleHRcIiB9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmRvbmVUZXh0IH1cclxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDogPHNwYW5cclxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCJyZ2JhKDEwMCwxMDAsMTAwLFwiICsgdGhpcy5nZXRPdXRlclRleHRPcGFjaXR5KCkgKyBcIilcIiB9fVxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwic2xpZGUtdGV4dFwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKSB9XHJcbiAgICAgICAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNsaWRlVGV4dCB9XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICA8L2Rpdj5cclxuICAgIH1cclxufVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRTZWxlY3RvcklucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHN0eWxlOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxyXG4gICAgICAgICAgICBjaG9pY2VzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHJvd19zaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICBhY3RpdmU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXHJcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGdldEJ1dHRvbnNDb3VudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMucm93X3NpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNob2ljZXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgb25DbGljayhuKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKG4pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLnByb3BzLmNob2ljZXMuZm9yRWFjaCgoZWwsIGlkeCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQga2V5ID0gZWxbMF07XHJcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZWxbMV07XHJcbiAgICAgICAgICAgIGxldCBhY3RpdmVfY2xhc3NfbmFtZSA9ICh0aGlzLnByb3BzLmFjdGl2ZSA9PT0ga2V5KSA/IFwiIGFjdGl2ZVwiIDogXCJcIjtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goXHJcbiAgICAgICAgICAgICAgICA8YnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICAga2V5PXsga2V5IH1cclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbkNsaWNrLmJpbmQodGhpcywga2V5KSl9XHJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJ0YnRuIHNjb3JlLWJ0blwiICsgYWN0aXZlX2NsYXNzX25hbWUgfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHt0ZXh0fVxyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+KTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc3R5bGUgPT09IFwiZ3JpZFwiICYmIChpZHggKyAxKSAlIHRoaXMucHJvcHMucm93X3NpemUgPT09IDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKDxiciBrZXk9eyBcImJyXCIgKyBpZHggfSAvPilcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBsYXlvdXRfY2xhc3MgPSAodGhpcy5wcm9wcy5zdHlsZSAhPT0gXCJ0d28tbGluZXNcIikgPyBcInNlbGVjdG9yLWxheW91dFwiIDogXCJzZWxlY3Rvci1sYXlvdXQtMnJvd3NcIjtcclxuICAgICAgICBsZXQgc2VsZWN0ZWRfY2xhc3MgPSB0aGlzLnByb3BzLmFjdGl2ZSA9PT0gbnVsbCA/IFwiXCIgOiBcIiBzZWxlY3RlZFwiXHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtcInNjb3JpbmctbGF5b3V0IFwiICsgbGF5b3V0X2NsYXNzICsgc2VsZWN0ZWRfY2xhc3MgKyBcIiBuLVwiICsgdGhpcy5nZXRCdXR0b25zQ291bnQoKS50b1N0cmluZygpIH0+eyByZXN1bHQgfTwvZGl2PlxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0SW50ZWdlclNlbGVjdElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG1pbjogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcclxuICAgICAgICBsZXQgcmVzdWx0ID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gbWluOyBpZHggPD0gbWF4OyArK2lkeCkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChbaWR4LCBpZHgudG9TdHJpbmcoKV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XHJcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5jcmVhdGVBcnJheSh0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpIH1cclxuICAgICAgICAgICAgICAgIHsgLi4udGhpcy5wcm9wcyB9XHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGFibGV0UG9pbnQ1U2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBjcmVhdGVBcnJheShtaW4sIG1heCkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcclxuICAgICAgICBmb3IgKGxldCBpZHggPSBNYXRoLnJvdW5kKDIgKiBtaW4pOyBpZHggPD0gTWF0aC5yb3VuZCgyICogbWF4KTsgKytpZHgpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCAvIDIsIChpZHggJSAyKSA/IChpZHggLyAyKS50b0ZpeGVkKDEpIDogTWF0aC5mbG9vcihpZHggLyAyKS50b1N0cmluZygpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcclxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmNyZWF0ZUFycmF5KHRoaXMucHJvcHMubWluLCB0aGlzLnByb3BzLm1heCkgfVxyXG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICApXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VySW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgdmFsdWU6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcclxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBnZXQgZGVmYXVsdFByb3BzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uTWludXMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2VuZERlbHRhcykge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogLTF9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSAtIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uUGx1cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAxfSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtaW50ZWdlci1pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbk1pbnVzLmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblBsdXMuYmluZCh0aGlzKSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgK1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRhYmxldFBvaW50NUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHZhbHVlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXHJcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBmYWxzZSxcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvbk1pbnVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IC0wLjV9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSAtIDAuNSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25QbHVzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcclxuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHtcImRlbHRhXCI6IDAuNX0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh0aGlzLnByb3BzLnZhbHVlICsgMC41KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtaW50ZWdlci1pbnB1dFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbk1pbnVzLmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcclxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblBsdXMuYmluZCh0aGlzKSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgK1xyXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxudmFyIHN0b3B3YXRjaGVzID0ge307XHJcblxyXG5leHBvcnQgY2xhc3MgU3RvcFdhdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHNjb3JlX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxyXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxyXG4gICAgICAgICAgICBzZW5kRGVsdGFzOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVfaWRdIHx8IHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsdWU6IDAsXHJcbiAgICAgICAgICAgIHN0cl92YWx1ZTogXCIwOjAwXCIsXHJcbiAgICAgICAgICAgIGludGVydmFsOiBudWxsLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3RhdGUuaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCh0aGlzLnRpY2suYmluZCh0aGlzKSwgMTApOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9uby1kaXJlY3QtbXV0YXRpb24tc3RhdGVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuc3RhdGUuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVfaWRdID0gdGhpcy5zdGF0ZTtcclxuICAgIH1cclxuICAgIG5vdygpIHtcclxuICAgICAgICByZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgIH1cclxuICAgIHRvZ2dsZSgpIHtcclxuICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZSA/IHRoaXMuc3RvcCgpIDogdGhpcy5zdGFydCgpO1xyXG4gICAgfVxyXG4gICAgc3RhcnQoKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogdHJ1ZSxcclxuICAgICAgICAgICAgc3RhcnRfYXQ6IHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnZhbHVlLFxyXG4gICAgICAgICAgICBpbnRlcnZhbDogc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIDEwKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHN0b3AoKSB7XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcclxuICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHJlc2V0KCkge1xyXG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXHJcbiAgICAgICAgICAgIHZhbHVlOiAwLFxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdmFsdWUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYWN0aXZlXHJcbiAgICAgICAgICAgID8gKHRoaXMubm93KCkgLSB0aGlzLnN0YXRlLnN0YXJ0X2F0KVxyXG4gICAgICAgICAgICA6IHRoaXMuc3RhdGUudmFsdWU7XHJcbiAgICB9XHJcbiAgICB0aWNrKCkge1xyXG4gICAgICAgIHZhciBuZXdfdmFsdWUgPSB0aGlzLnZhbHVlKCk7XHJcbiAgICAgICAgaWYgKG5ld192YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHBhZChudW0sIHNpemUpIHtcclxuICAgICAgICB2YXIgcyA9IFwiMDAwMFwiICsgbnVtLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIHMuc3Vic3RyKHMubGVuZ3RoIC0gc2l6ZSk7XHJcbiAgICB9XHJcbiAgICBnZXRTdHJWYWx1ZSgpIHtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy52YWx1ZSgpO1xyXG4gICAgICAgIHZhciBtID0gMCwgcyA9IDA7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICcnO1xyXG4gICAgICAgIG0gPSBNYXRoLmZsb29yKHZhbCAvICg2MCAqIDEwMDApKTtcclxuICAgICAgICB2YWwgJT0gNjAgKiAxMDAwO1xyXG4gICAgICAgIHMgPSBNYXRoLmZsb29yKHZhbCAvIDEwMDApO1xyXG4gICAgICAgIHJldHVybiBtLnRvU3RyaW5nKCkgKyAnOicgKyB0aGlzLnBhZChzLCAyKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0b3B3YXRjaFwiPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXJlc2V0IGlnbm9yZS1yZWFkb25seVwiXHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMucmVzZXQuYmluZCh0aGlzKSl9XHJcbiAgICAgICAgICAgICAgICA+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucmVzZXRfc3RvcHdhdGNoXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGJ1dHRvblxyXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwidGJ0biBidG4tdG9nZ2xlIGlnbm9yZS1yZWFkb25seVwiICsgKHRoaXMuc3RhdGUuYWN0aXZlID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XHJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMudG9nZ2xlLmJpbmQodGhpcykpfVxyXG4gICAgICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5zdGF0ZS5hY3RpdmUgPyBfKFwidGFibGV0LmJ1dHRvbnMuc3RvcF9zdG9wd2F0Y2hcIikgOiBfKFwidGFibGV0LmJ1dHRvbnMuc3RhcnRfc3RvcHdhdGNoXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aW1lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLmdldFN0clZhbHVlKCkgfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG4iXX0=
