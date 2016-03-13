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

    // Rendering

    Judge.prototype.renderResults = function renderResults() {
        return React.createElement(
            "div",
            { className: "body results" },
            React.createElement(_tour_results.TourResultsBody, { tour_id: this.state.tour.id, verbosity: "2", tableOnly: true })
        );
    };

    Judge.prototype.renderActions = function renderActions() {
        return React.createElement(
            "div",
            { className: "body actions" },
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
                "group_by_clubs": "Группировать по клубам",
                "include_acrobatics": "Включить акробатику",
                "include_clubs": "Включить данные о клубах",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXHJvc2ZhcnJcXHRvdXJfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXHRvdXJfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcY2xpZW50c1xcanVkZ2VcXG1haW4uanN4Iiwic3JjXFxqc3hcXGNsaWVudHNcXGp1ZGdlXFxyb3NmYXJyLmpzeCIsInNyY1xcanN4XFxjb21tb25cXGRvY3guanN4Iiwic3JjXFxqc3hcXGNvbW1vblxccm9zZmFyclxcYmFzZS5qc3giLCJzcmNcXGpzeFxcaTEwblxcbG9hZGVyLmpzeCIsInNyY1xcanN4XFxpMTBuXFxydS5qc3giLCJzcmNcXGpzeFxcanVkZ2UuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcYXBpLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXG1lc3NhZ2VfZGlzcGF0Y2hlci5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxzdG9yYWdlLmpzeCIsInNyY1xcanN4XFx1aVxcY29tcG9uZW50cy5qc3giLCJzcmNcXGpzeFxcdWlcXGRpYWxvZ3MuanN4Iiwic3JjXFxqc3hcXHVpXFxwcmludGFibGUuanN4Iiwic3JjXFxqc3hcXHVpXFx0YWJsZXRfY29tcG9uZW50cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNJQSxTQUFTLEVBQVQsR0FBYztBQUNWLFFBQUksT0FBTyxFQUFQLENBRE07QUFFVixTQUFLLElBQUksTUFBTSxDQUFOLEVBQVMsTUFBTSxVQUFVLE1BQVYsRUFBa0IsRUFBRSxHQUFGLEVBQU87QUFDN0MsYUFBSyxJQUFMLENBQVUsVUFBVSxHQUFWLENBQVYsRUFENkM7S0FBakQ7QUFHQSxXQUFPLDRCQUFFLDZCQUE2QixVQUFVLENBQVYsQ0FBN0IsU0FBOEMsS0FBaEQsQ0FBUCxDQUxVO0NBQWQ7O0lBUU07QUFDRixhQURFLG1D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QUYsQ0FBekQ7YUFYVjtZQWFJOztrQkFBSyxXQUFVLE1BQVYsRUFBTDtnQkFDTSxLQUFLLFdBQUwsRUFETjthQWJKO1NBREosQ0FESzs7O1dBN0VBO0VBQWtCLE1BQU0sU0FBTiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBUb3VyU2NvcmVzV3JhcHBlciwgZ2V0UGFydGljaXBhbnREaXNwbGF5LCBnZXRTY29yaW5nVHlwZSB9IGZyb20gXCJjb21tb24vcm9zZmFyci9iYXNlXCI7XG5cblxuZnVuY3Rpb24gX18oKSB7XG4gICAgbGV0IGFyZ3MgPSBbXTtcbiAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xuICAgIH1cbiAgICByZXR1cm4gXyhcInNjb3Jpbmdfc3lzdGVtcy5yb3NmYXJyLlwiICsgYXJndW1lbnRzWzBdLCAuLi5hcmdzKTtcbn1cblxuY2xhc3MgVG91clJlc3VsdHNWZXJib3NlVGFibGVDb2x1bW5XaWR0aHMge1xuICAgIGNvbnN0cnVjdG9yKG5fanVkZ2VzKSB7XG4gICAgICAgIHRoaXMuanVkZ2Vfd2lkdGggPSBNYXRoLnJvdW5kKDcwIC8gbl9qdWRnZXMpO1xuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gN1xuICAgICAgICB0aGlzLmluZm9fd2lkdGggPSAxMDAgLSB0aGlzLmp1ZGdlX3dpZHRoICogbl9qdWRnZXMgLSB0aGlzLnBsYWNlX3dpZHRoO1xuICAgIH1cbiAgICBnZW5QbGFjZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuSW5mb1N0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuaW5mb193aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5KdWRnZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFRvdXJSZXN1bHRzVmVyYm9zZVRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBmb3JtYXRTY29yZShzY29yZSwgdGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgPSBcIiRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8c3Bhbj4mbWRhc2g7PC9zcGFuPlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKFwiJFwiLCBzY29yZSkucmVwbGFjZShcIkBcIiwgc2NvcmUudG9GaXhlZCgxKSk7XG4gICAgfVxuICAgIHJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5pbXByZXNzaW9uLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5tXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24ucFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IGFkZGl0aW9sYWxfZGF0YS5wbGFjZXNbc2NvcmUuaWRdIH08L3A+PC90ZD48L3RyPlxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxuICAgIHJlbmRlckZvcm1hdGlvbkFjcm9TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKSB7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uYVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5hY3JvYmF0aWNzLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5pbXByZXNzaW9uLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5zbVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5ibVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5iaWdfbWlzdGFrZXMpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IHNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgYWRkaXRpb2xhbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfTwvcD48L3RkPjwvdHI+XG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG4gICAgcmVuZGVyRGFuY2VTY29yZShzY29yZSkge1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmZ3XCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmZ3X3dvbWFuLCBcIi0kJVwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmZtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmZ3X21hbiwgXCItJCVcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmNcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmNvbXBvc2l0aW9uKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnNtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLnNtYWxsX21pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmJtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmJpZ19taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbiAgICByZW5kZXJBY3JvU2NvcmUoc2NvcmUpIHtcbiAgICAgICAgbGV0IGFjcm9fc2NvcmVzID0gc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcChmdW5jdGlvbihzY29yZSwgaWR4KSB7XG4gICAgICAgICAgICByZXR1cm4gPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgIDx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uYWNyb19uXCIsIGlkeCArIDEpIH06PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgPHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZSwgXCItJCVcIikgfTwvcD48L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICB7IGFjcm9fc2NvcmVzIH1cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmZkXCIpICB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbiAgICByZW5kZXJTY29yZShqdWRnZSwgc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xuICAgICAgICBzd2l0Y2ggKGdldFNjb3JpbmdUeXBlKGp1ZGdlLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkpIHtcbiAgICAgICAgY2FzZSBcImRhbmNlXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEYW5jZVNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xuICAgICAgICBjYXNlIFwiYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQWNyb1Njb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKTtcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvbl9hY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25BY3JvU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKSB9PC9wPjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJQYXJ0aWNpcGFudEluZm8oKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPHA+PHN0cm9uZz57IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aFxuICAgICAgICAgICAgKX08L3N0cm9uZz48L3A+XG4gICAgICAgICAgICB7IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVySGVhZEp1ZGdlUGVuYWx0eSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wZW5hbHR5XCIpIH06IDwvc3Ryb25nPlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZSA6IDxzcGFuPiZtZGFzaDs8L3NwYW4+IH08L3A+XG4gICAgfVxuICAgIHJlbmRlckFjcm9UYWJsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBoYXNfYWNyb19vdmVycmlkZXMgPSBmYWxzZTtcbiAgICAgICAgbGV0IHJlbmRlcl9hY3JvX3RhYmxlID0gdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5hY3JvXCIgfHxcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiO1xuICAgICAgICBpZiAoIXJlbmRlcl9hY3JvX3RhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLmZvckVhY2goZnVuY3Rpb24oYWNybykge1xuICAgICAgICAgICAgaWYgKGFjcm8uc2NvcmUgIT09IGFjcm8ub3JpZ2luYWxfc2NvcmUpIHtcbiAgICAgICAgICAgICAgICBoYXNfYWNyb19vdmVycmlkZXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYWNyb19jZWxsX3dpZHRoID0gKDEwMCAvIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubGVuZ3RoKSArIFwiJVwiO1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxwPjxzdHJvbmc+eyBoYXNfYWNyb19vdmVycmlkZXMgPyBfXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NfdmVyYm9zZVwiKSA6IF9fKFwicmVzdWx0cy5sYWJlbHMuYWNyb2JhdGljc1wiKSB9Ojwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJhY3JvLXRhYmxlXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubWFwKChhY3JvLCBpZHgpID0+IDx0ZCBrZXk9eyBpZHggfSBzdHlsZT17eyB3aWR0aDogYWNyb19jZWxsX3dpZHRoIH19PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjcm8ub3JpZ2luYWxfc2NvcmUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD48L3RkPilcbiAgICAgICAgICAgICAgICB9PC90cj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhhc19hY3JvX292ZXJyaWRlcyA/IDx0cj57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLm1hcCgoYWNybywgaWR4KSA9PiA8dGQga2V5PXsgaWR4IH0gc3R5bGU9e3sgd2lkdGg6IGFjcm9fY2VsbF93aWR0aCB9fT48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5zY29yZS50b0ZpeGVkKDEpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD48L3RkPilcbiAgICAgICAgICAgICAgICAgICAgfTwvdHI+IDogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIHJlbmRlckFtQ2xhc3NGd1Njb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZVwiKSB9PC9zdHJvbmc+OiB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpICsgXCIgLyBcIiArXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMilcbiAgICAgICAgfSA8L3A+XG4gICAgfVxuICAgIHJlbmRlckFtQ2xhc3NBY3JvU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy5hY3JvX3Njb3JlXCIpIH08L3N0cm9uZz46IHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUuY3VycmVudF90b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKSArIFwiIC8gXCIgK1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5jdXJyZW50X3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMilcbiAgICAgICAgfSA8L3A+XG4gICAgfVxuICAgIHJlbmRlclRvdGFsU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH06IHsgdGhpcy5wcm9wcy5ydW4udG90YWxfc2NvcmUgfTwvc3Ryb25nPjwvcD47XG4gICAgfVxuICAgIHJlbmRlck5vdFBlcmZvcm1lZExhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHA+PGVtPlxuICAgICAgICAgICAgeyBfXyhcInJlc3VsdHMubGFiZWxzLm5vdF9wZXJmb3JtZWRcIikgfVxuICAgICAgICA8L2VtPjwvcD5cbiAgICB9XG4gICAgcmVuZGVyTmV4dFRvdXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmhhc19uZXh0X3RvdXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLm5leHRfdG91clwiKSB9OiA8L3N0cm9uZz57XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5hZHZhbmNlcyA/IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSA6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpXG4gICAgICAgIH08L3A+XG4gICAgfVxuICAgIHJlbmRlckluZm9CbG9jaygpIHtcbiAgICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJpbmZvLWJsb2NrXCIgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5JbmZvU3R5bGUoKSB9PlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnRpY2lwYW50SW5mbygpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkSnVkZ2VQZW5hbHR5KCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFjcm9UYWJsZSgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBbUNsYXNzRndTY29yZSgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBbUNsYXNzQWNyb1Njb3JlKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmUoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyTm90UGVyZm9ybWVkTGFiZWwoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyTmV4dFRvdXJMYWJlbCgpIH1cbiAgICAgICAgPC90ZD5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQganVkZ2VzX3Njb3JlcyA9IHRoaXMucHJvcHMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT5cbiAgICAgICAgICAgIDx0ZCBrZXk9eyBpZHggfSBzdHlsZT17IHRoaXMucHJvcHMud2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2VzW2lkeF0sIHNjb3JlLCB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5hZGRpdGlvbmFsX2RhdGEpIH1cbiAgICAgICAgICAgIDwvdGQ+KTtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIGp1ZGdlc19zY29yZXMgPSB0aGlzLnByb3BzLnNjb3Jlcy5tYXAoKHNjb3JlLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgPHRkIHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0ga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD48L3RkPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHRoaXMucHJvcHMucmVzdWx0c19pbmZvLnBsYWNlIH08L3A+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckluZm9CbG9jaygpIH1cbiAgICAgICAgICAgIHsganVkZ2VzX3Njb3JlcyB9XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNWZXJib3NlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHRvdXJfd3JhcHBlciA9IG5ldyBUb3VyU2NvcmVzV3JhcHBlcih0aGlzLnByb3BzLnRvdXIsIHRoaXMucHJvcHMucmVzdWx0cyk7XG4gICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlcyA9IHRvdXJfd3JhcHBlci5nZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcbiAgICAgICAgbGV0IHNjb3Jlc190YWJsZSA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIik7XG4gICAgICAgIGxldCBoZWFkX2p1ZGdlX3Njb3JlcyA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJoZWFkX2p1ZGdlXCIpLm1hcCgocm93KSA9PiByb3dbMF0pO1xuICAgICAgICBsZXQgcmVzdWx0c19pbmZvID0gdG91cl93cmFwcGVyLmdldFJlc3VsdHNJbmZvKCk7XG4gICAgICAgIGxldCBydW5zID0gdG91cl93cmFwcGVyLmdldFJ1bnMoKTtcbiAgICAgICAgbGV0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xuICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICBsZXQgd2lkdGhzID0gbmV3IFRvdXJSZXN1bHRzVmVyYm9zZVRhYmxlQ29sdW1uV2lkdGhzKGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHJ1bnMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICAgICAgcm93cy5wdXNoKDxUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZVJvd1xuICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgcnVuPXsgcnVuc1tpZHhdIH1cbiAgICAgICAgICAgICAgICBzY29yZXM9eyBzY29yZXNfdGFibGVbaWR4XSB9XG4gICAgICAgICAgICAgICAgd2lkdGhzPXsgd2lkdGhzIH1cbiAgICAgICAgICAgICAgICBoZWFkX2p1ZGdlX3Njb3JlPXsgaGVhZF9qdWRnZV9zY29yZXNbaWR4XSB9XG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvPXsgcmVzdWx0c19pbmZvW2lkeF0gfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzPXsgZGlzY2lwbGluZV9qdWRnZXMgfVxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXI9eyBoYXNfbmV4dF90b3VyIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBqdWRnZXNfaGVhZGVyID0gZGlzY2lwbGluZV9qdWRnZXMubWFwKGZ1bmN0aW9uKGRqKSB7XG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17IGRqLmlkIH0gd2lkdGg9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+PHA+eyBkai5qdWRnZS5udW1iZXIgfTwvcD48L3RoPlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiIHN0eWxlPXt7IHdpZHRoOiBcIjEwMCVcIiB9fT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHdpZHRoPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiIHdpZHRoPXsgd2lkdGhzLmdlbkluZm9TdHlsZSgpIH0+PHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IF9fKFwicmVzdWx0cy5sYWJlbHMuaW5mb1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICB7IGp1ZGdlc19oZWFkZXIgfVxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHsgcm93cyB9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgIH1cbn1cblxuY2xhc3MgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlQ29sdW1uV2lkdGhzIHtcbiAgICBjb25zdHJ1Y3RvcihuX2p1ZGdlcykge1xuICAgICAgICB0aGlzLmp1ZGdlX3dpZHRoID0gTWF0aC5yb3VuZCg1NSAvIG5fanVkZ2VzKTtcbiAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCA9IDE0O1xuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gNjtcbiAgICAgICAgdGhpcy5udW1iZXJfd2lkdGggPSAzO1xuICAgICAgICB0aGlzLm5hbWVfd2lkdGggPSAxMDAgLSB0aGlzLmp1ZGdlX3dpZHRoICogbl9qdWRnZXMgLVxuICAgICAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCAtIHRoaXMucGxhY2Vfd2lkdGggLSB0aGlzLm51bWJlcl93aWR0aDtcbiAgICB9XG4gICAgZ2VuUGxhY2VTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBsYWNlX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxuICAgIGdlbk51bWJlclN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMubnVtYmVyX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxuICAgIGdlbk5hbWVTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLm5hbWVfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuVG90YWxTY29yZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMudG90YWxfc2NvcmVfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuSnVkZ2VTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmp1ZGdlX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcbiAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+PHN0cm9uZz57IGFkZGl0aW9sYWxfZGF0YS5wbGFjZXNbc2NvcmUuaWRdIH08L3N0cm9uZz4gKHsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDEpIH0pPC9wPlxuICAgIH1cbiAgICByZW5kZXJTY29yZShqdWRnZSwgc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xuICAgICAgICBpZiAoanVkZ2Uucm9sZSA9PT0gXCJkYW5jZV9qdWRnZVwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25cIiB8fCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH08L3A+O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBqdWRnZXNfc2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZXMubWFwKChzY29yZSwgaWR4KSA9PiA8dGQga2V5PXsgaWR4IH0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU2NvcmUodGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlc1tpZHhdLCBzY29yZSwgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8uYWRkaXRpb25hbF9kYXRhKVxuICAgICAgICB9IDwvdGQ+KTtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIGp1ZGdlc19zY29yZXMgPSB0aGlzLnByb3BzLnNjb3Jlcy5tYXAoKHNjb3JlLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD48L3RkPik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZTtcbiAgICAgICAgcmV0dXJuIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5wbGFjZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlciB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj57IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudCkgfTwvdGQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIgJiYgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXG4gICAgICAgICAgICAgICAgPyA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF9fKFwicmVzdWx0cy5sYWJlbHMuZndfc2NvcmVfc2hvcnRcIikgfXtcIjogXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH17XCIgLyBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9PGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+eyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjtcbiAgICAgICAgICAgICAgICAgICAgfSkoKSB9XG4gICAgICAgICAgICAgICAgPC90ZD4gOiBudWxsIH1cbiAgICAgICAgICAgIHsganVkZ2VzX3Njb3JlcyB9XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2FyZFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+e1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZSAmJiB0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZVxuICAgICAgICAgICAgICAgICAgICA6IDxzcGFuPiZtZGFzaDs8L3NwYW4+XG4gICAgICAgICAgICB9PC9wPjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJBZHZhbmNlc0hlYWRlcihoYXNfbmV4dF90b3VyICxwcmV2X3JvdywgbmV4dF9yb3csIHByZXZfcnVuLCBuZXh0X3J1biwgaWR4LCBuX2NvbHMpIHtcbiAgICAgICAgbGV0IHByZXZfc3RhdHVzID0gcHJldl9yb3dcbiAgICAgICAgICAgID8gcHJldl9ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICAgICAgPyBwcmV2X3Jvdy5hZHZhbmNlc1xuICAgICAgICAgICAgICAgICAgICA/IFwiYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgICAgICA6IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICA6IFwibm90X3BlcmZvcm1lZFwiXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGxldCBuZXh0X3N0YXR1cyA9IG5leHRfcnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgPyBuZXh0X3Jvdy5hZHZhbmNlc1xuICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgOiBcIm5vdF9hZHZhbmNlZFwiXG4gICAgICAgICAgICA6IFwibm90X3BlcmZvcm1lZFwiO1xuICAgICAgICBsZXQgcmVzdWx0ID0gcHJldl9zdGF0dXMgIT09IG5leHRfc3RhdHVzXG4gICAgICAgICAgICA/IG5leHRfc3RhdHVzID09PSBcIm5vdF9wZXJmb3JtZWRcIlxuICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfbm90X3BlcmZvcm1lZFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgIDogaGFzX25leHRfdG91clxuICAgICAgICAgICAgICAgICAgICA/IG5leHRfc3RhdHVzID09PSBcIm5vdF9hZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA/IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgOiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19hZHZhbmNlZFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIk5UXCIgKyBpZHggfT48dGggY2xhc3NOYW1lPVwiYWR2YW5jZXMtaGVhZGVyXCIgY29sU3Bhbj17IG5fY29scyB9PlxuICAgICAgICAgICAgeyByZXN1bHQgfVxuICAgICAgICA8L3RoPjwvdHI+XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHRvdXJfd3JhcHBlciA9IG5ldyBUb3VyU2NvcmVzV3JhcHBlcih0aGlzLnByb3BzLnRvdXIsIHRoaXMucHJvcHMucmVzdWx0cyk7XG4gICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlcyA9IHRvdXJfd3JhcHBlci5nZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcbiAgICAgICAgbGV0IHNjb3Jlc190YWJsZSA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIik7XG4gICAgICAgIGxldCBoZWFkX2p1ZGdlX3Njb3JlcyA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJoZWFkX2p1ZGdlXCIpLm1hcCgocm93KSA9PiByb3dbMF0pO1xuICAgICAgICBsZXQgcmVzdWx0c19pbmZvID0gdG91cl93cmFwcGVyLmdldFJlc3VsdHNJbmZvKCk7XG4gICAgICAgIGxldCBydW5zID0gdG91cl93cmFwcGVyLmdldFJ1bnMoKTtcbiAgICAgICAgbGV0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xuICAgICAgICBsZXQgaGFzX3RvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25cIiAmJiB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI7XG4gICAgICAgIGxldCB3aWR0aHMgPSBuZXcgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlQ29sdW1uV2lkdGhzKGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCArIDEpO1xuICAgICAgICBsZXQganVkZ2VzX2hlYWRlciA9IGRpc2NpcGxpbmVfanVkZ2VzLm1hcChmdW5jdGlvbihkaikge1xuICAgICAgICAgICAgbGV0IHN1ZmZpeCA9IGdldFNjb3JpbmdUeXBlKGRqLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPT09IFwiYWNyb1wiID8gXCIgKEEpXCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIDx0aCBrZXk9eyBkai5pZCB9IHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PjxwPnsgZGouanVkZ2UubnVtYmVyICsgc3VmZml4IH08L3A+PC90aD5cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcnVucy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHggLSAxXSxcbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm9baWR4XSxcbiAgICAgICAgICAgICAgICBydW5zW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4XSxcbiAgICAgICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICAgICAgNCArIGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCArIGhhc190b3RhbF9zY29yZVxuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICByb3dzLnB1c2goPFRvdXJSZXN1bHRzU2VtaVZlcmJvc2VUYWJsZVJvd1xuICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XG4gICAgICAgICAgICAgICAgaGVhZF9qdWRnZV9zY29yZT17IGhlYWRfanVkZ2Vfc2NvcmVzW2lkeF0gfVxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mbz17IHJlc3VsdHNfaW5mb1tpZHhdIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW5zW2lkeF0gfVxuICAgICAgICAgICAgICAgIHNjb3Jlcz17IHNjb3Jlc190YWJsZVtpZHhdIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlcz17IGRpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyPXsgaGFzX25leHRfdG91ciB9XG4gICAgICAgICAgICAgICAgaGFzX3RvdGFsX3Njb3JlPXsgaGFzX3RvdGFsX3Njb3JlIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJudW1iZXJcIiBzdHlsZT17IHdpZHRocy5nZW5OdW1iZXJTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiIHN0eWxlPXsgd2lkdGhzLmdlbk5hbWVTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICB7IGhhc190b3RhbF9zY29yZSA/IDx0aCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiIHN0eWxlPXsgd2lkdGhzLmdlblRvdGFsU2NvcmVTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH08L3A+PC90aD4gOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgeyBqdWRnZXNfaGVhZGVyIH1cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17IHdpZHRocy5nZW5KdWRnZVN0eWxlKCkgfT48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgX18oXCJyZXN1bHRzLmxhYmVscy5jYXJkXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7IHJvd3MgfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICB9XG59XG5cbmNsYXNzIFRvdXJSZXN1bHRzVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGNhcmQgPSB0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5oZWFkX2p1ZGdlX3Njb3JlXG4gICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZVxuICAgICAgICAgICAgICAgIDogXCIwXCJcbiAgICAgICAgICAgIDogPHNwYW4+Jm1kYXNoOzwvc3Bhbj47XG4gICAgICAgIGxldCB0b3RhbF9zY29yZSA9IHRoaXMucHJvcHMuaGFzX3RvdGFsX3Njb3JlID9cbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57IHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgJm5ic3A7L3tcIiBcIn17IHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD5cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8ucGxhY2UgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTMwIHBhcnRpY2lwYW50XCI+eyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQpIH08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIj48cD57IHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuaGFzX3RvdGFsX3Njb3JlID8gPHRkIGNsYXNzTmFtZT1cInctMTggc2NvcmVcIj57IHRvdGFsX3Njb3JlIH08L3RkPiA6IG51bGwgfVxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBjYXJkXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IGNhcmQgfTwvcD48L3RkPlxuICAgICAgICA8L3RyPlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvdXJSZXN1bHRzVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKGhhc19uZXh0X3RvdXIsIHByZXZfcm93LCBuZXh0X3JvdywgcHJldl9ydW4sIG5leHRfcnVuLCBpZHgsIG5fY29scykge1xuICAgICAgICBsZXQgcHJldl9zdGF0dXMgPSBwcmV2X3Jvd1xuICAgICAgICAgICAgPyBwcmV2X3J1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgICAgICA/IHByZXZfcm93LmFkdmFuY2VzXG4gICAgICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJub3RfYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCJcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgbGV0IG5leHRfc3RhdHVzID0gbmV4dF9ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICA/IG5leHRfcm93LmFkdmFuY2VzXG4gICAgICAgICAgICAgICAgPyBcImFkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICA6IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCI7XG4gICAgICAgIGxldCByZXN1bHQgPSBwcmV2X3N0YXR1cyAhPT0gbmV4dF9zdGF0dXNcbiAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X3BlcmZvcm1lZFwiXG4gICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgOiBoYXNfbmV4dF90b3VyXG4gICAgICAgICAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX2FkdmFuY2VkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiTlRcIiArIGlkeCB9Pjx0aCBjbGFzc05hbWU9XCJhZHZhbmNlcy1oZWFkZXJcIiBjb2xTcGFuPXsgbl9jb2xzIH0+XG4gICAgICAgICAgICB7IHJlc3VsdCB9XG4gICAgICAgIDwvdGg+PC90cj5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgdG91cl93cmFwcGVyID0gbmV3IFRvdXJTY29yZXNXcmFwcGVyKHRoaXMucHJvcHMudG91ciwgdGhpcy5wcm9wcy5yZXN1bHRzKTtcbiAgICAgICAgbGV0IGhlYWRfanVkZ2Vfc2NvcmVzID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImhlYWRfanVkZ2VcIikubWFwKChyb3cpID0+IHJvd1swXSk7XG4gICAgICAgIGxldCByZXN1bHRzX2luZm8gPSB0b3VyX3dyYXBwZXIuZ2V0UmVzdWx0c0luZm8oKTtcbiAgICAgICAgbGV0IHJ1bnMgPSB0b3VyX3dyYXBwZXIuZ2V0UnVucygpO1xuICAgICAgICBsZXQgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XG4gICAgICAgIGxldCBoYXNfdG90YWxfc2NvcmUgPSB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiICYmIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjtcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcnVucy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHggLSAxXSxcbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm9baWR4XSxcbiAgICAgICAgICAgICAgICBydW5zW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4XSxcbiAgICAgICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICAgICAgNSArIGhhc190b3RhbF9zY29yZVxuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICByb3dzLnB1c2goPFRvdXJSZXN1bHRzVGFibGVSb3dcbiAgICAgICAgICAgICAgICBrZXk9eyBydW5zW2lkeF0uaWQgfVxuICAgICAgICAgICAgICAgIGhlYWRfanVkZ2Vfc2NvcmU9eyBoZWFkX2p1ZGdlX3Njb3Jlc1tpZHhdIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm89eyByZXN1bHRzX2luZm9baWR4XSB9XG4gICAgICAgICAgICAgICAgcnVuPXsgcnVuc1tpZHhdIH1cbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyPXsgaGFzX25leHRfdG91ciB9XG4gICAgICAgICAgICAgICAgaGFzX3RvdGFsX3Njb3JlPXsgaGFzX3RvdGFsX3Njb3JlIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImJyaWVmLXRhYmxlXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGxhY2VcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTMwIHBhcnRpY2lwYW50XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNsdWJcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY2x1YlwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGhhc190b3RhbF9zY29yZSA/IDx0aCBjbGFzc05hbWU9XCJ3LTE4IHNjb3JlXCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH08L3A+PC90aD4gOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBfXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7IHJvd3MgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBQcmludGFibGUgfSBmcm9tIFwidWkvcHJpbnRhYmxlXCI7XG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XG5cbmltcG9ydCB7IFRvdXJSZXN1bHRzVGFibGUsIFRvdXJSZXN1bHRzU2VtaVZlcmJvc2VUYWJsZSwgVG91clJlc3VsdHNWZXJib3NlVGFibGUgfSBmcm9tIFwiLi9yb3NmYXJyL3RvdXJfcmVzdWx0c1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c0J1dHRvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHNpZ25hbChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17IHRoaXMuc2lnbmFsKFwiZG9jeFwiKSB9PlxuICAgICAgICAgICAgICAgIERPQ1hcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c0JvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgLy8gSW5pdGlhbGl6YXRpb25cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgICAgICByZXN1bHRzOiBudWxsLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuVE9VUl9TQ0hFTUEgPSB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lOiB7XG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiB7XG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlOiB7fSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bnM6IHtcbiAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiB7fSxcbiAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwicmVzdWx0c19cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInRvdXJfcmVzdWx0c19jaGFuZ2VkIHJlbG9hZF9kYXRhXCIsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSB8fCBtZXNzYWdlLnRvdXJfaWQgPT09IHRoaXMucHJvcHMudG91cl9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmF1dG9Eb2N4KSB7XG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWxfaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmcy5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfaWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3godGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3guY2FsbGJhY2sodGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIpO1xuICAgICAgICBzdG9yYWdlLmRlbERvbWFpbihcInJlc3VsdHNfXCIgKyB0aGlzLnByb3BzLnRvdXJfaWQpO1xuICAgIH1cbiAgICByZWxvYWRGcm9tU3RvcmFnZSgpIHtcbiAgICAgICAgbGV0IHNlcmlhbGl6ZWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKVxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMucHJvcHMudG91cl9pZClcbiAgICAgICAgICAgIC5zZXJpYWxpemUodGhpcy5UT1VSX1NDSEVNQSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdG91cjogc2VyaWFsaXplZCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxvYWRSZXN1bHRzKCkge1xuICAgICAgICBBcGkoXCJ0b3VyLmdldF9yZXN1bHRzXCIsIHt0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXJfaWR9KVxuICAgICAgICAub25TdWNjZXNzKGZ1bmN0aW9uKG5ld19yZXN1bHRzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogbmV3X3Jlc3VsdHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAuc2VuZCgpO1xuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwgeyB0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXJfaWQsIGNoaWxkcmVuOiB0aGlzLlRPVVJfU0NIRU1BfSlcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0aGlzLnByb3BzLnRvdXJfaWQsIHRoaXMuc3RvcmFnZSlcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnNlbmQoKTtcbiAgICB9XG5cbiAgICAvLyBMaXN0ZW5lcnNcblxuICAgIG9uU2lnbmFsKG1lc3NhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlKSB7XG4gICAgICAgIGNhc2UgXCJkb2N4XCI6XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW5kZXJpbmdcblxuICAgIHJlbmRlck5vbkZpbmFsaXplZFdhcm5pbmcoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS50b3VyLmZpbmFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+eyBfKFwicmVzdWx0cy5hbGVydHMubm90X2ZpbmFsaXplZFwiKSB9PC9kaXY+XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91ciA9PT0gbnVsbCB8fCB0aGlzLnN0YXRlLnJlc3VsdHMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRhYmxlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmVyYm9zaXR5ID09PSBcIjNcIikge1xuICAgICAgICAgICAgdGFibGUgPSA8VG91clJlc3VsdHNWZXJib3NlVGFibGUgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy52ZXJib3NpdHkgPT09IFwiMlwiKSB7XG4gICAgICAgICAgICB0YWJsZSA9IDxUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGUgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YWJsZSA9IDxUb3VyUmVzdWx0c1RhYmxlIHsuLi50aGlzLnN0YXRlfSAvPlxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50YWJsZU9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvdXItcmVzdWx0c1wiIHJlZj1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIH1cbiAgICAgICAgICAgICAgICB7IHRhYmxlIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIGxldCBib2R5ID0gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLXJlc3VsdHMgcC1jb250ZW50XCIgcmVmPVwiY29udGVudFwiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5vbkZpbmFsaXplZFdhcm5pbmcoKSB9XG4gICAgICAgICAgICB7IHRhYmxlIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnByaW50YWJsZVxuICAgICAgICAgICAgPyA8UHJpbnRhYmxlXG4gICAgICAgICAgICAgICAgcmVmPVwicHJpbnRhYmxlXCJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSB9XG4gICAgICAgICAgICAgICAgdGl0bGUxPXsgXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpIH1cbiAgICAgICAgICAgICAgICB0aXRsZTI9eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgICAgICB0aXRsZTM9eyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgYm9keT17IGJvZHkgfSAvPlxuICAgICAgICAgICAgOiBib2R5O1xuICAgIH1cbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwidG91ci1yZXN1bHRzLmRvY3hcIikge1xuICAgICAgICBEb2N4KGZpbGVuYW1lKVxuICAgICAgICAgICAgLnNldE1hcmdpbnMoWzEwLCAxMCwgMTUsIDEwXSlcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXG4gICAgICAgICAgICAuc2V0VGl0bGUxKF8oXCJhZG1pbi5oZWFkZXJzLnRvdXJfcmVzdWx0c1wiKSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS50b3VyLm5hbWUpXG4gICAgICAgICAgICAuc2V0Qm9keShSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuY29udGVudCkuaW5uZXJIVE1MKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlXCIsIFwiZm9udC1zaXplXCIsIHRoaXMucHJvcHMudmVyYm9zaXR5ID09PSBcIjFcIiA/IFwiMTJwdFwiIDogXCI5cHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcImZvbnQtc2l6ZVwiLCBcIjlwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwicGFkZGluZ1wiLCBcIjAgM3B0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJib3JkZXJcIiwgXCIwLjVwdCBzb2xpZCBibGFja1wiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJib3JkZXJcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInBhZGRpbmdcIiwgXCIwIDFwdCAwIDBcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwicGFkZGluZ1wiLCBcIjAgMCAwIDFwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInRleHQtYWxpZ25cIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0ZFwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwidGV4dC1hbGlnblwiLCBcImxlZnRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd25cIiwgXCJ3aWR0aFwiLCBcIjUwcHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdGFsLXNjb3JlXCIsIFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuaGVhZF9qdWRnZVwiLCBcIndpZHRoXCIsIFwiNSVcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5kYW5jZV9qdWRnZVwiLCBcIndpZHRoXCIsIFwiOCVcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hY3JvX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI4JVwiKVxuICAgICAgICAgICAgLnNhdmUoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBzaG93Q29uZmlybSB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBvblRvdWNoT3JDbGljayB9IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgVG91clJlc3VsdHNCb2R5IH0gZnJvbSBcImFkbWluL2p1ZGdpbmcvdG91cl9yZXN1bHRzXCI7XG5cbmltcG9ydCB7IFRhYmxldFNjb3JlSW5wdXQgfSBmcm9tIFwiLi9yb3NmYXJyXCI7XG5cblxuZXhwb3J0IGNsYXNzIEp1ZGdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGp1ZGdlX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLlRPVVJfU0NIRU1BID0ge1xuICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7fSxcbiAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxuICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczoge1xuICAgICAgICAgICAgICAgICAgICBqdWRnZToge30sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0b3VyOiBudWxsLFxuICAgICAgICAgICAganVkZ2U6IG51bGwsXG4gICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlOiBudWxsLFxuICAgICAgICAgICAgY3VycmVudF9oZWF0OiAxLFxuICAgICAgICAgICAgcGFnZTogXCJkZWZhdWx0XCIsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWN0aXZlX3RvdXJfaWQgPSBudWxsO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMsIGZhbHNlKSk7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImFjdGl2ZV90b3VyX3VwZGF0ZVwiLCB0aGlzLmRpc3BhdGNoQWN0aXZlVG91clVwZGF0ZS5iaW5kKHRoaXMsIGZhbHNlKSk7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICB9XG5cbiAgICAvLyBMb2FkZXJzXG5cbiAgICByZWxvYWRGcm9tU3RvcmFnZShyZXNldF9oZWF0KSB7XG4gICAgICAgIGxldCBzdF9qdWRnZSA9IHN0b3JhZ2UuZ2V0KFwiSnVkZ2VcIikuYnlfaWQodGhpcy5wcm9wcy5qdWRnZV9pZClcbiAgICAgICAgaWYgKCFzdF9qdWRnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzdGF0ZV91cGQgPSB7fVxuICAgICAgICBzdGF0ZV91cGRbXCJqdWRnZVwiXSA9IHN0X2p1ZGdlLnNlcmlhbGl6ZSh7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjoge31cbiAgICAgICAgfSlcbiAgICAgICAgc3RhdGVfdXBkW1wiY29tcGV0aXRpb25cIl0gPSBzdGF0ZV91cGRbXCJqdWRnZVwiXS5jb21wZXRpdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3RvdXJfaWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBzdF90b3VyID0gc3RvcmFnZS5nZXQoXCJUb3VyXCIpLmJ5X2lkKHRoaXMuYWN0aXZlX3RvdXJfaWQpO1xuICAgICAgICAgICAgaWYgKHN0X3RvdXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG91ciA9IHN0X3RvdXIuc2VyaWFsaXplKHRoaXMuVE9VUl9TQ0hFTUEpO1xuICAgICAgICAgICAgICAgIGlmICh0b3VyLmRpc2NpcGxpbmUgJiYgdG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlX3VwZFtcInRvdXJcIl0gPSB0b3VyO1xuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIGRpc2NpcGxpbmUganVkZ2VcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVfdXBkW1wiZGlzY2lwbGluZV9qdWRnZVwiXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGouanVkZ2UuaWQgPT09IHRoaXMucHJvcHMuanVkZ2VfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZV91cGRbXCJkaXNjaXBsaW5lX2p1ZGdlXCJdID0gZGo7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNldF9oZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzY2lwbGluZV9qdWRnZSA9IHN0YXRlX3VwZFtcImRpc2NpcGxpbmVfanVkZ2VcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc2NpcGxpbmVfanVkZ2UgfHwgZGlzY2lwbGluZV9qdWRnZS5yb2xlID09PSBcImhlYWRfanVkZ2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlX3VwZFtcImN1cnJlbnRfaGVhdFwiXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlX2lkID0gZGlzY2lwbGluZV9qdWRnZSAmJiBkaXNjaXBsaW5lX2p1ZGdlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlX3VwZFtcImN1cnJlbnRfaGVhdFwiXSA9IHRoaXMuZ2V0Rmlyc3ROb25Db25maXJtZWRIZWF0KHRvdXIucnVucywgZGlzY2lwbGluZV9qdWRnZV9pZCkgfHwgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlX3VwZFtcInBhZ2VcIl0gPSBcImRlZmF1bHRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlX3VwZCk7XG4gICAgfVxuICAgIHVwZGF0ZUFjdGl2ZVRvdXIoZm9yY2VfcmVsb2FkLCBuZXdfYWN0aXZlX3RvdXJfaWQpIHtcbiAgICAgICAgaWYgKG5ld19hY3RpdmVfdG91cl9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG91cjogbnVsbCxcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlOiBudWxsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZV90b3VyX2lkID0gbmV3X2FjdGl2ZV90b3VyX2lkO1xuICAgICAgICAgICAgc3RvcmFnZS5kZWwoXCJUb3VyXCIpO1xuICAgICAgICAgICAgc3RvcmFnZS5kZWwoXCJQYXJ0aWNpcGFudFwiKTtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiU2NvcmVcIik7XG4gICAgICAgICAgICBzdG9yYWdlLmRlbChcIlJ1blwiKTtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiRGlzY2lwbGluZVwiKTtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiRGlzY2lwbGluZUp1ZGdlXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JjZV9yZWxvYWQgfHwgbmV3X2FjdGl2ZV90b3VyX2lkICE9PSB0aGlzLmFjdGl2ZV90b3VyX2lkKSB7XG4gICAgICAgICAgICBsZXQgb2xkX2FjdGl2ZV90b3VyX2lkID0gdGhpcy5hY3RpdmVfdG91cl9pZDtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlX3RvdXJfaWQgPSBuZXdfYWN0aXZlX3RvdXJfaWQ7XG4gICAgICAgICAgICBBcGkoXCJ0b3VyLmdldFwiLCB7IHRvdXJfaWQ6IHRoaXMuYWN0aXZlX3RvdXJfaWQsIGNoaWxkcmVuOiB0aGlzLlRPVVJfU0NIRU1BIH0pXG4gICAgICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMuYWN0aXZlX3RvdXJfaWQpXG4gICAgICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcywgbmV3X2FjdGl2ZV90b3VyX2lkICE9PSBvbGRfYWN0aXZlX3RvdXJfaWQpKVxuICAgICAgICAgICAgICAgIC5zZW5kKClcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwianVkZ2UuZ2V0XCIsIHsganVkZ2VfaWQ6IHRoaXMucHJvcHMuanVkZ2VfaWQsIGNoaWxkcmVuOiB7IGNvbXBldGl0aW9uOiB7fSB9IH0pXG4gICAgICAgICAgICAuYWRkVG9EQihcIkp1ZGdlXCIsIHRoaXMucHJvcHMuanVkZ2VfaWQpXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzLCBmYWxzZSkpXG4gICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICBBcGkoXCJ0b3VyLmZpbmRfYWN0aXZlXCIsIHt9KVxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLmRpc3BhdGNoQWN0aXZlVG91clVwZGF0ZS5iaW5kKHRoaXMsIHRydWUpKVxuICAgICAgICAgICAgLnNlbmQoKTtcbiAgICB9XG5cbiAgICAvLyBEaXNwYXRjaGVyc1xuXG4gICAgZGlzcGF0Y2hBY3RpdmVUb3VyVXBkYXRlKGZvcmNlX3JlbG9hZCwgZGF0YSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVRvdXIoZm9yY2VfcmVsb2FkLCBkYXRhW1widG91cl9pZFwiXSk7XG4gICAgfVxuXG4gICAgLy8gTGlzdGVuZXJzXG5cbiAgICBvblNjb3JlVXBkYXRlKHNjb3JlX2lkLCBuZXdfc2NvcmUpIHtcbiAgICAgICAgbGV0IHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBzY29yZV9kYXRhOiBuZXdfc2NvcmUsXG4gICAgICAgICAgICBmb3JjZTogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIEFwaShcInNjb3JlLnNldFwiLCB7c2NvcmVfaWQ6IHNjb3JlX2lkLCBkYXRhOiByZXF1ZXN0fSkuc2VuZCgpO1xuICAgIH1cblxuICAgIG9uU2NvcmVDb25maXJtKHNjb3JlX2lkKSB7XG4gICAgICAgIEFwaShcInNjb3JlLmNvbmZpcm1cIiwge3Njb3JlX2lkOiBzY29yZV9pZH0pLnNlbmQoKTtcbiAgICB9XG5cbiAgICAvLyBBY3Rpb25zXG5cbiAgICB0b1ByZXZIZWF0KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRfaGVhdDogdGhpcy5zdGF0ZS5jdXJyZW50X2hlYXQgLSAxLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdG9OZXh0SGVhdCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50X2hlYXQ6IHRoaXMuc3RhdGUuY3VycmVudF9oZWF0ICsgMSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN3aXRjaFBhZ2UocGFnZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wVG91cigpIHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5zdG9wX3RvdXJcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0b3BcIiwgeyB0b3VyX2lkOiB0aGlzLnN0YXRlLnRvdXIuaWQgfSkub25TdWNjZXNzKCgpID0+IHN3YWwuY2xvc2UoKSkuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluYWxpemVUb3VyKCkge1xuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLmZpbmFsaXplX3RvdXJcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLmZpbmFsaXplXCIsIHsgdG91cl9pZDogdGhpcy5zdGF0ZS50b3VyLmlkIH0pLm9uU3VjY2VzcygoKSA9PiBzd2FsLmNsb3NlKCkpLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0b3BUb3VyQW5kU3RhcnROZXh0KCkge1xuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLnN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiKSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91cikge1xuICAgICAgICAgICAgICAgIGxldCB0b3VyX2lkID0gdGhpcy5zdGF0ZS50b3VyLmlkO1xuICAgICAgICAgICAgICAgIEFwaShcInRvdXIuc3RvcFwiLCB7IHRvdXJfaWQgfSkub25TdWNjZXNzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdGFydF9uZXh0X2FmdGVyXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4gc3dhbC5jbG9zZSgpKS5zZW5kKCk7XG4gICAgICAgICAgICAgICAgfSkuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluYWxpemVUb3VyQW5kU3RhcnROZXh0KCkge1xuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLmZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG91cl9pZCA9IHRoaXMuc3RhdGUudG91ci5pZDtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLmZpbmFsaXplXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0YXJ0X25leHRfYWZ0ZXJcIiwgeyB0b3VyX2lkIH0pLm9uU3VjY2VzcygoKSA9PiBzd2FsLmNsb3NlKCkpLnNlbmQoKTtcbiAgICAgICAgICAgICAgICB9KS5zZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEhlbHBlcnNcblxuICAgIGdldEhlYXRzQ291bnQocnVucykge1xuICAgICAgICBydW5zID0gcnVucyB8fCB0aGlzLnN0YXRlLnRvdXIucnVucztcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLnJ1bnMubWFwKChydW4pID0+IHJ1bi5oZWF0KSk7XG4gICAgfVxuICAgIGdldEZpcnN0Tm9uQ29uZmlybWVkSGVhdChydW5zLCBkaXNjaXBsaW5lX2p1ZGdlX2lkKSB7XG4gICAgICAgIHJ1bnMgPSBydW5zIHx8IHRoaXMuc3RhdGUudG91ci5ydW5zO1xuICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlX2lkID0gZGlzY2lwbGluZV9qdWRnZV9pZCB8fCB0aGlzLnN0YXRlLmRpc2NpcGxpbmVfanVkZ2UuaWQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBydW5zW2ldLnNjb3Jlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IHJ1bnNbaV0uc2NvcmVzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkID09PSBkaXNjaXBsaW5lX2p1ZGdlX2lkICYmICFzY29yZS5jb25maXJtZWQgJiYgcnVuc1tpXS5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bnNbaV0uaGVhdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SGVhdHNDb3VudChydW5zKTtcbiAgICB9XG5cbiAgICAvLyBSZW5kZXJpbmdcblxuICAgIHJlbmRlclJlc3VsdHMoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImJvZHkgcmVzdWx0c1wiPlxuICAgICAgICAgICAgPFRvdXJSZXN1bHRzQm9keSB0b3VyX2lkPXsgdGhpcy5zdGF0ZS50b3VyLmlkIH0gdmVyYm9zaXR5PVwiMlwiIHRhYmxlT25seSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVyQWN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYm9keSBhY3Rpb25zXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1cIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInRidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnN0b3BUb3VyLmJpbmQodGhpcykpfT5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMuc3RvcF90b3VyXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5maW5hbGl6ZVRvdXIuYmluZCh0aGlzKSl9PlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5maW5hbGl6ZV90b3VyXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5zdG9wVG91ckFuZFN0YXJ0TmV4dC5iaW5kKHRoaXMpKX0+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbVwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidGJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLmZpbmFsaXplVG91ckFuZFN0YXJ0TmV4dC5iaW5kKHRoaXMpKX0+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLmZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGxldCBidG5fcHJldiA9IG51bGw7XG4gICAgICAgIGxldCBidG5fbmV4dCA9IG51bGw7XG4gICAgICAgIGxldCBqdWRnZSA9IHRoaXMuc3RhdGUuanVkZ2U7XG4gICAgICAgIGxldCBqdWRnZV9udW1iZXIgPSBqdWRnZS5yb2xlX2Rlc2NyaXB0aW9uIHx8IF8oXCJnbG9iYWwucGhyYXNlcy5qdWRnZV9uXCIsIGp1ZGdlLm51bWJlcik7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBhZ2UgIT09IFwicmVzdWx0c1wiICYmIHRoaXMuc3RhdGUucGFnZSAhPT0gXCJhY3Rpb25zXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdCA+IDEpIHtcbiAgICAgICAgICAgICAgICBidG5fcHJldiA9IDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtbGVmdFwiIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvUHJldkhlYXQuYmluZCh0aGlzKSl9PlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5wcmV2X2hlYXRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdCA8IHRoaXMuZ2V0SGVhdHNDb3VudCgpICYmIChcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX2p1ZGdlLnJvbGUgPT09IFwiaGVhZF9qdWRnZVwiXG4gICAgICAgICAgICAgICAgICAgIHx8IHRoaXMuZ2V0Rmlyc3ROb25Db25maXJtZWRIZWF0KCkgPiB0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdCkpIHtcbiAgICAgICAgICAgICAgICBidG5fbmV4dCA9IDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtcmlnaHRcIiB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy50b05leHRIZWF0LmJpbmQodGhpcykpfT5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMubmV4dF9oZWF0XCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGN1cnJlbnRfdG91ciA9IDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiZnVsbC13aWR0aFwiPjx0Ym9keT48dHI+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgICA8aDE+eyBqdWRnZV9udW1iZXIgfTwvaDE+XG4gICAgICAgICAgICAgICAgICAgIDxoMj57IGp1ZGdlLm5hbWUgfTwvaDI+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgIDxoMT57IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUgfTwvaDE+XG4gICAgICAgICAgICAgICAgICAgIDxoMj57IHRoaXMuc3RhdGUudG91ci5uYW1lIH0mbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDsmbmJzcDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5oZWFkZXJzLmhlYXRcIikgfTogeyB0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdCB9IC8geyB0aGlzLmdldEhlYXRzQ291bnQoKSB9PC9oMj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XG4gICAgICAgIDwvZGl2PjtcbiAgICAgICAgcmV0dXJuIDxoZWFkZXI+XG4gICAgICAgICAgICB7IGJ0bl9wcmV2IH1cbiAgICAgICAgICAgIHsgYnRuX25leHQgfVxuICAgICAgICAgICAgeyBjdXJyZW50X3RvdXIgfVxuICAgICAgICA8L2hlYWRlcj5cbiAgICB9XG4gICAgcmVuZGVyU3BsYXNoU2NyZWVuKCkge1xuICAgICAgICBsZXQganVkZ2UgPSB0aGlzLnN0YXRlLmp1ZGdlO1xuICAgICAgICBsZXQganVkZ2VfbnVtYmVyID0ganVkZ2Uucm9sZV9kZXNjcmlwdGlvbiB8fCBfKFwiZ2xvYmFsLnBocmFzZXMuanVkZ2VfblwiLCBqdWRnZS5udW1iZXIpO1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJqdWRnZS10YWJsZXRcIj5cbiAgICAgICAgICAgIDxoZWFkZXI+XG4gICAgICAgICAgICAgICAgPGEgY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5IHB1bGwtbGVmdFwiIGhyZWY9XCIvXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnRvX3N0YXJ0X3BhZ2VcIikgfVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImhlYWRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8aDE+eyB0aGlzLnN0YXRlLmNvbXBldGl0aW9uLm5hbWUgfTwvaDE+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9oZWFkZXI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwbGFzaC1zY3JlZW5cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImp1ZGdlLW51bWJlclwiPnsganVkZ2VfbnVtYmVyIH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImp1ZGdlLW5hbWVcIj57IHRoaXMuc3RhdGUuanVkZ2UubmFtZSB9PC9kaXY+XG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnRvdXIgPyA8ZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3QtanVkZ2luZy1kaXNjaXBsaW5lXCI+eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lIH08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibm90LWp1ZGdpbmctdG91clwiPnsgdGhpcy5zdGF0ZS50b3VyLm5hbWUgfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3QtanVkZ2luZy1tZXNzYWdlXCI+eyBfKFwidGFibGV0Lm1lc3NhZ2VzLm5vdF9qdWRnaW5nX2Rpc2NpcGxpbmVcIikgfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj4gOiBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICByZW5kZXJTY29yaW5nTGF5b3V0KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wYWdlID09PSBcInJlc3VsdHNcIikge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyUmVzdWx0cygpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09IFwiYWN0aW9uc1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJBY3Rpb25zKCk7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGNlbGxzID0gdGhpcy5zdGF0ZS50b3VyLnJ1bnNcbiAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24ocnVuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJ1bi5oZWF0ID09PSB0aGlzLnN0YXRlLmN1cnJlbnRfaGVhdDtcbiAgICAgICAgICAgIH0uYmluZCh0aGlzKSlcbiAgICAgICAgICAgIC5tYXAoZnVuY3Rpb24ocnVuKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNjb3Jlc19tYXAgPSB7fVxuICAgICAgICAgICAgICAgIHJ1bi5zY29yZXMuZm9yRWFjaChmdW5jdGlvbihzY29yZV9kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3Jlc19tYXBbc2NvcmVfZGF0YS5kaXNjaXBsaW5lX2p1ZGdlX2lkXSA9IHNjb3JlX2RhdGE7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRfc2NvcmUgPSBzY29yZXNfbWFwW3RoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZS5pZF07XG4gICAgICAgICAgICAgICAgbGV0IGhlYWRlciA9IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsIHJ1bi5wYXJ0aWNpcGFudC5udW1iZXIsIHJ1bi5wYXJ0aWNpcGFudC5uYW1lLCBydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzY29yZXNfbWFwW3RoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZS5pZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDx0ZCBrZXk9eyBydW4uaWQgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMj57IGhlYWRlciB9PC9oMj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgXyhcInRhYmxldC5tZXNzYWdlcy5ub3RfanVkZ2luZ19wYXJ0aWNpcGFudFwiKSB9PC9oMz5cbiAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIDx0ZCBrZXk9eyBydW4uaWQgfT5cbiAgICAgICAgICAgICAgICAgICAgPGgyPnsgaGVhZGVyIH08L2gyPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGV0U2NvcmVJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZT17IHRoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxfZGlzY2lwbGluZV9qdWRnZXM9eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcyB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yZT17IGN1cnJlbnRfc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVhZE9ubHk9eyBjdXJyZW50X3Njb3JlLmNvbmZpcm1lZCB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhbGxfc2NvcmVzPXsgc2NvcmVzX21hcCB9XG4gICAgICAgICAgICAgICAgICAgICAgICBydW49eyBydW4gfVxuICAgICAgICAgICAgICAgICAgICAgICAgcGFnZT17IHRoaXMuc3RhdGUucGFnZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lPXsgdGhpcy5zdGF0ZS50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMub25TY29yZVVwZGF0ZS5iaW5kKHRoaXMsIGN1cnJlbnRfc2NvcmUuaWQpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uU2NvcmVDb25maXJtPXsgdGhpcy5vblNjb3JlQ29uZmlybS5iaW5kKHRoaXMsIGN1cnJlbnRfc2NvcmUuaWQpIH0gLz5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgbGV0IHNpbmdsZV9ydW5fY2xhc3MgPSBjZWxscy5sZW5ndGggPT09IDEgPyBcIiBzaW5nbGUtcnVuXCIgOiBcIlwiO1xuICAgICAgICBpZiAoY2VsbHMubGVuZ3RoID4gMykge1xuICAgICAgICAgICAgbGV0IGZpcnN0X3JvdyA9IFtdXG4gICAgICAgICAgICBsZXQgc2Vjb25kX3JvdyA9IFtdXG4gICAgICAgICAgICBjZWxscy5mb3JFYWNoKChjZWxsLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoaWR4ICUgMiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdF9yb3cucHVzaChjZWxsKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmRfcm93LnB1c2goY2VsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGxldCBoYWxmX3dpZHRoID0gMTAwIC8gKDIgKiBmaXJzdF9yb3cubGVuZ3RoICsgMSk7XG4gICAgICAgICAgICBsZXQgZmlyc3Rfd2lkdGgsIHNlY29uZF93aWR0aDtcbiAgICAgICAgICAgIGlmIChmaXJzdF9yb3cubGVuZ3RoID09PSBzZWNvbmRfcm93Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIFtmaXJzdF93aWR0aCwgc2Vjb25kX3dpZHRoXSA9IFsxMDAgLSBoYWxmX3dpZHRoLCAxMDAgLSBoYWxmX3dpZHRoXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgW2ZpcnN0X3dpZHRoLCBzZWNvbmRfd2lkdGhdID0gWzEwMCwgMTAwIC0gMiAqIGhhbGZfd2lkdGhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtYWluLXRhYmxlXCIgc3R5bGU9e3sgd2lkdGg6IGZpcnN0X3dpZHRoICsgXCIlXCIsIFwibWFyZ2luTGVmdFwiOiAwIH19Pjx0Ym9keT48dHI+XG4gICAgICAgICAgICAgICAgICAgIHsgZmlyc3Rfcm93IH1cbiAgICAgICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwibWFpbi10YWJsZVwiIHN0eWxlPXt7IHdpZHRoOiBzZWNvbmRfd2lkdGggKyBcIiVcIiwgXCJtYXJnaW5SaWdodFwiOiBmaXJzdF9yb3cubGVuZ3RoID09PSBzZWNvbmRfcm93Lmxlbmd0aCA/IDAgOiBcImF1dG9cIiB9fT48dGJvZHk+PHRyPlxuICAgICAgICAgICAgICAgICAgICB7IHNlY29uZF9yb3cgfVxuICAgICAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYm9keVwiPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17IFwibWFpbi10YWJsZVwiICsgc2luZ2xlX3J1bl9jbGFzcyB9Pjx0Ym9keT48dHI+XG4gICAgICAgICAgICAgICAgeyBjZWxscyB9XG4gICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT47XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbiAgICByZW5kZXJGb290ZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2NpcGxpbmVfanVkZ2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2NpcGxpbmVfanVkZ2Uucm9sZSA9PT0gXCJoZWFkX2p1ZGdlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImZvb3RlciBwYWdlLXNlbGVjdG9yXCI+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImJ0blwiICsgKHRoaXMuc3RhdGUucGFnZSA9PT0gXCJkZWZhdWx0XCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMuc3dpdGNoUGFnZS5iaW5kKHRoaXMsIFwiZGVmYXVsdFwiKSl9PnsgXyhcInRhYmxldC5wYWdlcy5oZWF0c1wiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImJ0blwiICsgKHRoaXMuc3RhdGUucGFnZSA9PT0gXCJyZXN1bHRzXCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMuc3dpdGNoUGFnZS5iaW5kKHRoaXMsIFwicmVzdWx0c1wiKSl9PnsgXyhcInRhYmxldC5wYWdlcy5yZXN1bHRzXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiYnRuXCIgKyAodGhpcy5zdGF0ZS5wYWdlID09PSBcImFjdGlvbnNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5zd2l0Y2hQYWdlLmJpbmQodGhpcywgXCJhY3Rpb25zXCIpKX0+eyBfKFwidGFibGV0LnBhZ2VzLmFjdGlvbnNcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2NpcGxpbmVfanVkZ2Uucm9sZSAhPT0gXCJ0ZWNoX2p1ZGdlXCIgfHwgKFxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuYWNyb1wiICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyIHBhZ2Utc2VsZWN0b3JcIj5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eyBcImJ0blwiICsgKHRoaXMuc3RhdGUucGFnZSA9PT0gXCJkZWZhdWx0XCIgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5zd2l0Y2hQYWdlLmJpbmQodGhpcywgXCJkZWZhdWx0XCIpKX0+eyBfKFwidGFibGV0LnBhZ2VzLmRhbmNlXCIpIH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiYnRuXCIgKyAodGhpcy5zdGF0ZS5wYWdlID09PSBcImFjcm9cIiA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnN3aXRjaFBhZ2UuYmluZCh0aGlzLCBcImFjcm9cIikpfT57IF8oXCJ0YWJsZXQucGFnZXMuYWNyb2JhdGljc1wiKSB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmp1ZGdlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gPExvYWRlciAvPjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS50b3VyID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJTcGxhc2hTY3JlZW4oKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5kaXNjaXBsaW5lX2p1ZGdlID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJTcGxhc2hTY3JlZW4oKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJqdWRnZS10YWJsZXRcIj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmluZ0xheW91dCgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJGb290ZXIoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IEFwaSB9IGZyb20gXCJzZXJ2ZXIvYXBpXCI7XG5pbXBvcnQge1xuICAgIG9uVG91Y2hPckNsaWNrLFxuICAgIFRhYmxldEludGVnZXJJbnB1dCxcbiAgICBUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQsXG4gICAgVGFibGV0U2VsZWN0b3JJbnB1dCxcbiAgICBUYWJsZXRQb2ludDVJbnB1dCxcbiAgICBUYWJsZXRQb2ludDVTZWxlY3RJbnB1dCxcbiAgICBTdG9wV2F0Y2gsXG4gICAgU2xpZGVyLFxufSBmcm9tIFwidWkvdGFibGV0X2NvbXBvbmVudHNcIjtcblxuaW1wb3J0IHsgZ2V0U2NvcmluZ1R5cGUgfSBmcm9tIFwiY29tbW9uL3Jvc2ZhcnIvYmFzZVwiO1xuXG5mdW5jdGlvbiBfXygpIHtcbiAgICBsZXQgYXJncyA9IFtdO1xuICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XG4gICAgfVxuICAgIHJldHVybiBfKFwic2NvcmluZ19zeXN0ZW1zLnJvc2ZhcnIuXCIgKyBhcmd1bWVudHNbMF0sIC4uLmFyZ3MpO1xufVxuXG4vLyBIZWFkIGp1ZGdlXG5cbmNsYXNzIEhlYWRKdWRnZUFjdG9iYXRpY092ZXJyaWRlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhY3JvYmF0aWNzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0QWNyb2JhdGljT3ZlcnJpZGVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hY3JvYmF0aWNzXG4gICAgICAgICAgICAubWFwKChhY3JvLCBpZHgpID0+ICh7IGlkeDogaWR4ICsgMSwgYWNyb2JhdGljOiBhY3JvIH0pKVxuICAgICAgICAgICAgLmZpbHRlcigoYWNybykgPT4gYWNyby5hY3JvYmF0aWMub3JpZ2luYWxfc2NvcmUgIT09IGFjcm8uYWNyb2JhdGljLnNjb3JlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgYWNyb2JhdGljX292ZXJyaWRlcyA9IHRoaXMuZ2V0QWNyb2JhdGljT3ZlcnJpZGVzKCk7XG4gICAgICAgIGlmIChhY3JvYmF0aWNfb3ZlcnJpZGVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiPjwvZGl2PlxuICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5hY3JvYmF0aWNfb3ZlcnJpZGVzXCIpIH08L2gzPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImZ1bGwtd2lkdGhcIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgeyBhY3JvYmF0aWNfb3ZlcnJpZGVzLm1hcCgoYWNybykgPT5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGFjcm8uaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy01XCI+eyBhY3JvLmlkeCB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57IGFjcm8uYWNyb2JhdGljLmRlc2NyaXB0aW9uIH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgdGV4dC1yaWdodFwiPnsgYWNyby5hY3JvYmF0aWMub3JpZ2luYWxfc2NvcmUudG9GaXhlZCgxKSB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTUgdGV4dC1jZW50ZXJcIj7ihpI8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgdGV4dC1sZWZ0XCI+eyBhY3JvLmFjcm9iYXRpYy5zY29yZS50b0ZpeGVkKDEpIH08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIEhlYWRKdWRnZVByZXZpb3VzUGVuYWx0aWVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBlbmFsdGllczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5wZW5hbHRpZXMgfHwgdGhpcy5wcm9wcy5wZW5hbHRpZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCI+PC9kaXY+XG4gICAgICAgICAgICA8aDM+eyBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLnByZXZpb3VzX3BlbmFsdGllc1wiKSB9PC9oMz5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+PHRib2R5PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5wZW5hbHRpZXMubWFwKChkLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgICAgIDx0ciBrZXk9eyBpZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTEwIHRleHQtY2VudGVyXCI+PHN0cm9uZz57IGQucGVuYWx0eSB9PC9zdHJvbmc+PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZD57IGQudG91ciB9PC90ZD5cbiAgICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICApIH1cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBIZWFkSnVkZ2VUZWNoSnVkZ2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRUaW1pbmdEYXRhKCkge1xuICAgICAgICBsZXQgdHZfcmF3X3ZhbHVlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnRpbWluZ192aW9sYXRpb247XG4gICAgICAgIGlmICh0dl9yYXdfdmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBbXCItXCIsIFwiXCJdO1xuICAgICAgICB9IGVsc2UgaWYgKHR2X3Jhd192YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIFtcIlhcIiwgXCIgZmFpbFwiXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBbXCJPS1wiLCBcIiBva1wiXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCB0aW1pbmdfZGF0YSA9IHRoaXMuZ2V0VGltaW5nRGF0YSgpO1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxoMyBjbGFzc05hbWU9eyB0aGlzLnByb3BzLnNjb3JlLmNvbmZpcm1lZCA/IFwiY29uZmlybWVkXCIgOiBcIlwiIH0+eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2UuanVkZ2UubmFtZSB9PC9oMz5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJ0ZWNoLWp1ZGdlLWluZm9cIj48dGJvZHk+PHRyPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ0aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IF9fKFwidGFibGV0LnRlY2hfanVkZ2UuanVtcF9zdGVwc1wiKSB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpbm5lclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEuanVtcF9zdGVwcyB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgX18oXCJ0YWJsZXQudGVjaF9qdWRnZS50aW1pbmdcIikgfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJpbm5lclwiICsgdGltaW5nX2RhdGFbMV0gfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGltaW5nX2RhdGFbMF0gfVxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgSGVhZEp1ZGdlVGVjaEp1ZGdlc1Njb3JlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbGxfZGlzY2lwbGluZV9qdWRnZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgYWxsX3Njb3JlczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRUZWNoRGlzY2lwbGluZUp1ZGdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxsX2Rpc2NpcGxpbmVfanVkZ2VzLmZpbHRlcigoZGopID0+IGRqLnJvbGUgPT09IFwidGVjaF9qdWRnZVwiKTtcbiAgICB9XG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VGVjaERpc2NpcGxpbmVKdWRnZXMoKS5tYXAoKHRlY2hfanVkZ2UpID0+XG4gICAgICAgICAgICA8SGVhZEp1ZGdlVGVjaEp1ZGdlU2NvcmVcbiAgICAgICAgICAgICAgICBrZXk9eyB0ZWNoX2p1ZGdlLmlkIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlPXsgdGVjaF9qdWRnZSB9XG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLmFsbF9zY29yZXNbdGVjaF9qdWRnZS5pZF0gfSAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb250ZW50KCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIEhlYWRKdWRnZURhbmNlSnVkZ2VTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY29yZTogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8dGQgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5zY29yZS5jb25maXJtZWQgPyBcImNvbmZpcm1lZFwiIDogXCJcIiB9PlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLnNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKSB9XG4gICAgICAgIDwvdGQ+XG4gICAgfVxufVxuXG5jbGFzcyBIZWFkSnVkZ2VEYW5jZUp1ZGdlc1Njb3JlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbGxfZGlzY2lwbGluZV9qdWRnZXM6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgYWxsX3Njb3JlczogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXREYW5jZURpc2NpcGxpbmVKdWRnZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFsbF9kaXNjaXBsaW5lX2p1ZGdlcy5maWx0ZXIoKGRqKSA9PiBkai5yb2xlID09PSBcImRhbmNlX2p1ZGdlXCIgfHwgZGoucm9sZSA9PT0gXCJhY3JvX2p1ZGdlXCIpO1xuICAgIH1cbiAgICByZW5kZXJOdW1iZXJzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW5jZURpc2NpcGxpbmVKdWRnZXMoKS5tYXAoKGp1ZGdlKSA9PlxuICAgICAgICAgICAgPHRkIGtleT17IGp1ZGdlLmlkIH0+eyBqdWRnZS5qdWRnZS5udW1iZXIgfXsganVkZ2Uucm9sZSA9PT0gXCJhY3JvX2p1ZGdlXCIgPyBcIiAoQSlcIiA6IFwiXCIgfTwvdGQ+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlclNjb3JlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGFuY2VEaXNjaXBsaW5lSnVkZ2VzKCkubWFwKChqdWRnZSkgPT5cbiAgICAgICAgICAgIDxIZWFkSnVkZ2VEYW5jZUp1ZGdlU2NvcmVcbiAgICAgICAgICAgICAgICBrZXk9eyBqdWRnZS5pZCB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZT17IGp1ZGdlIH1cbiAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuYWxsX3Njb3Jlc1tqdWRnZS5pZF0gfSAvPlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5kYW5jZV9qdWRnZV9zY29yZXNcIikgfTwvaDM+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiZGFuY2UtanVkZ2Utc2NvcmVzXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJudW1iZXJzXCI+eyB0aGlzLnJlbmRlck51bWJlcnMoKSB9PC90cj5cbiAgICAgICAgICAgICAgICA8dHIgY2xhc3NOYW1lPVwic2NvcmVzXCI+eyB0aGlzLnJlbmRlclNjb3JlcygpIH08L3RyPlxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIEhlYWRKdWRnZU5vdFBlcmZvcm1lZFN3aXRjaCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwZXJmb3JtZWQ6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgcnVuX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIG1hcmtOb3RQZXJmb3JtZWQoKSB7XG4gICAgICAgIEFwaShcInJ1bi5tYXJrX25vdF9wZXJmb3JtZWRcIiwgeyBydW5faWQ6IHRoaXMucHJvcHMucnVuX2lkIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgbWFya1BlcmZvcm1lZCgpIHtcbiAgICAgICAgQXBpKFwicnVuLm1hcmtfcGVyZm9ybWVkXCIsIHsgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bl9pZCB9KS5zZW5kKCk7XG4gICAgfVxuICAgIHJlbmRlckJ1dHRvbigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tZGFuZ2VyXCIgeyAuLi5vblRvdWNoT3JDbGljayh0aGlzLm1hcmtOb3RQZXJmb3JtZWQuYmluZCh0aGlzKSkgfT5cbiAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5ub3RfcGVyZm9ybWVkXCIpIH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzTmFtZT1cImJ0biBidG4tc20gYnRuLXN1Y2Nlc3NcIiB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMubWFya1BlcmZvcm1lZC5iaW5kKHRoaXMpKSB9PlxuICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnBlcmZvcm1lZFwiKSB9XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtZWQtY29udHJvbFwiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJ1dHRvbigpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBIZWFkSnVkZ2VTY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGFsbF9kaXNjaXBsaW5lX2p1ZGdlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBhbGxfc2NvcmVzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBydW46IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNjb3JlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRQZW5hbHR5Q29pY2VzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICAgICAgWzAsICAgIF9fKFwidGFibGV0LmhlYWRfanVkZ2Uub2tcIildLFxuICAgICAgICAgICAgICAgIFstNSwgICBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLmZvcm1feWVsbG93X2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMTUsICBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLmZvcm1fcmVkX2NhcmRcIildLFxuICAgICAgICAgICAgICAgIFstMTAwLCBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLmJsYWNrX2NhcmRcIildXG4gICAgICAgICAgICBdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBbMCwgICAgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5va1wiKV0sXG4gICAgICAgICAgICBbLTMsICAgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS55ZWxsb3dfY2FyZFwiKV0sXG4gICAgICAgICAgICBbLTMwLCAgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5yZWRfY2FyZFwiKV0sXG4gICAgICAgICAgICBbLTEwMCwgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5ibGFja19jYXJkXCIpXVxuICAgICAgICBdO1xuICAgIH1cbiAgICBnZW5PblBlbmFsdHlVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJwZW5hbHR5XCIsIG5ld192YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiA8SGVhZEp1ZGdlTm90UGVyZm9ybWVkU3dpdGNoXG4gICAgICAgICAgICAgICAgcnVuX2lkPXsgdGhpcy5wcm9wcy5ydW4uaWQgfVxuICAgICAgICAgICAgICAgIHBlcmZvcm1lZD17IHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCB9IC8+XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LmhlYWRfanVkZ2UucGVuYWx0eV90eXBlXCIpIH08L2gzPlxuICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5nZXRQZW5hbHR5Q29pY2VzKCkgfVxuICAgICAgICAgICAgICAgIGFjdGl2ZT17IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5wZW5hbHR5IH1cbiAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblBlbmFsdHlVcGRhdGUoKSB9IC8+XG4gICAgICAgICAgICA8SGVhZEp1ZGdlVGVjaEp1ZGdlc1Njb3Jlc1xuICAgICAgICAgICAgICAgIGFsbF9kaXNjaXBsaW5lX2p1ZGdlcz17IHRoaXMucHJvcHMuYWxsX2Rpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICBhbGxfc2NvcmVzPXsgdGhpcy5wcm9wcy5hbGxfc2NvcmVzIH0gLz5cbiAgICAgICAgICAgIDxIZWFkSnVkZ2VEYW5jZUp1ZGdlc1Njb3Jlc1xuICAgICAgICAgICAgICAgIGFsbF9kaXNjaXBsaW5lX2p1ZGdlcz17IHRoaXMucHJvcHMuYWxsX2Rpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICBhbGxfc2NvcmVzPXsgdGhpcy5wcm9wcy5hbGxfc2NvcmVzIH0gLz5cbiAgICAgICAgICAgIDxIZWFkSnVkZ2VBY3RvYmF0aWNPdmVycmlkZXNcbiAgICAgICAgICAgICAgICBhY3JvYmF0aWNzPXsgdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcyB9IC8+XG4gICAgICAgICAgICA8SGVhZEp1ZGdlUHJldmlvdXNQZW5hbHRpZXNcbiAgICAgICAgICAgICAgICBwZW5hbHRpZXM9eyB0aGlzLnByb3BzLnJ1bi5pbmhlcml0ZWRfZGF0YS5wZW5hbHRpZXMgfSAvPlxuICAgICAgICAgICAgPEhlYWRKdWRnZU5vdFBlcmZvcm1lZFN3aXRjaFxuICAgICAgICAgICAgICAgIHJ1bl9pZD17IHRoaXMucHJvcHMucnVuLmlkIH1cbiAgICAgICAgICAgICAgICBwZXJmb3JtZWQ9eyB0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQgfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbi8vIFRlY2ggSnVkZ2VcblxuY2xhc3MgVGVjaEp1ZGdlQWNyb2JhdGljT3ZlcnJpZGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidGVjaC1qdWRnZS1hY3JvXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRyb2xzIHB1bGwtcmlnaHRcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNldHRlclwiPlxuICAgICAgICAgICAgICAgICAgICA8VGFibGV0UG9pbnQ1SW5wdXRcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5hY3JvLnNjb3JlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLnByb3BzLm9uQWNyb092ZXJyaWRlIH0gLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGgzPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5hY3JvLmRlc2NyaXB0aW9uIH0gKD17IHRoaXMucHJvcHMuYWNyby5vcmlnaW5hbF9zY29yZSB9KVxuICAgICAgICAgICAgPC9oMz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2xlYXJmaXhcIj48L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBUZWNoSnVkZ2VBY3JvU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgZ2VuT25BY3JvT3ZlcnJpZGUoYWNyb19pZHgpIHtcbiAgICAgICAgcmV0dXJuIChuZXdfdmFsdWUpID0+IHRoaXMucHJvcHMub25BY3JvT3ZlcnJpZGUoYWNyb19pZHgsIG5ld192YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlckNvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFjcm9iYXRpY3MubWFwKChhY3JvLCBpZHgpID0+XG4gICAgICAgICAgICA8VGVjaEp1ZGdlQWNyb2JhdGljT3ZlcnJpZGVcbiAgICAgICAgICAgICAgICBrZXk9eyBpZHggfVxuICAgICAgICAgICAgICAgIGFjcm89eyBhY3JvIH1cbiAgICAgICAgICAgICAgICBvbkFjcm9PdmVycmlkZT17IHRoaXMuZ2VuT25BY3JvT3ZlcnJpZGUoaWR4KSB9IC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQ29udGVudCgpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBUZWNoSnVkZ2VEYW5jZVNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGdlbk9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCkge1xuICAgICAgICByZXR1cm4gKG5ld192YWx1ZSkgPT4gdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHNjb3JlX3BhcnQsIG5ld192YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHNjb3JlID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhO1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LnRlY2hfanVkZ2UuanVtcF9zdGVwc1wiKSB9PC9oMz5cbiAgICAgICAgICAgIDxUYWJsZXRJbnRlZ2VySW5wdXRcbiAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlLnJhd19kYXRhLmp1bXBfc3RlcHMgfVxuICAgICAgICAgICAgICAgIHNlbmREZWx0YXNcbiAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblNjb3JlVXBkYXRlKFwianVtcF9zdGVwc1wiKSB9IC8+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiPjwvZGl2PlxuICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQudGVjaF9qdWRnZS50aW1pbmdcIikgfTwvaDM+XG4gICAgICAgICAgICA8U3RvcFdhdGNoIHNjb3JlX2lkPXsgdGhpcy5wcm9wcy5zY29yZS5pZCB9IC8+XG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyBbW3RydWUsIFwiWFwiXSwgW251bGwsIFwiLVwiXSwgW2ZhbHNlLCBcIk9LXCJdXSB9XG4gICAgICAgICAgICAgICAgYWN0aXZlPXsgc2NvcmUucmF3X2RhdGEudGltaW5nX3Zpb2xhdGlvbiB9XG4gICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMuZ2VuT25TY29yZVVwZGF0ZShcInRpbWluZ192aW9sYXRpb25cIikgfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFRlY2hKdWRnZVNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucGFnZSA9PT0gXCJhY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiA8VGVjaEp1ZGdlQWNyb1Njb3JlSW5wdXRcbiAgICAgICAgICAgICAgICBhY3JvYmF0aWNzPXsgdGhpcy5wcm9wcy5ydW4uYWNyb2JhdGljcyB9XG4gICAgICAgICAgICAgICAgb25BY3JvT3ZlcnJpZGU9eyB0aGlzLnByb3BzLm9uQWNyb092ZXJyaWRlIH0gLz5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiA8VGVjaEp1ZGdlRGFuY2VTY29yZUlucHV0XG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH0gLz5cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gRGFuY2UganVkZ2VcblxuY2xhc3MgRGFuY2VKdWRnZVNjb3JlUGFydElucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBnZW5PblNjb3JlVXBkYXRlKCkge1xuICAgICAgICByZXR1cm4gKG5ld192YWx1ZSkgPT4gdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHRoaXMucHJvcHMucGFydCwgbmV3X3ZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5za2lwX2hlYWRlcikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxoMz57IF9fKFwidGFibGV0LmRhbmNlX2p1ZGdlLlwiICsgdGhpcy5wcm9wcy5wYXJ0KSB9PC9oMz5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XG4gICAgICAgICAgICA8U2NvcmVQYXJ0U2NhbGVcbiAgICAgICAgICAgICAgICBzY2FsZT17IHRoaXMucHJvcHMuc2NhbGUgfVxuICAgICAgICAgICAgICAgIGFjdGl2ZT17IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YVt0aGlzLnByb3BzLnBhcnRdIH1cbiAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblNjb3JlVXBkYXRlKCkgfVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzLnNjYWxlX3Byb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIERhbmNlSnVkZ2VTY29yZU1pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBnZW5PblNjb3JlVXBkYXRlKHNjb3JlX3BhcnQpIHtcbiAgICAgICAgcmV0dXJuIChuZXdfdmFsdWUpID0+IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShzY29yZV9wYXJ0LCBuZXdfdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBzY29yZV9kYXRhID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhO1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cIm1pc3Rha2VzIGZ1bGwtd2lkdGhcIj48dGJvZHk+PHRyPlxuICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LmRhbmNlX2p1ZGdlLnNtYWxsX21pc3Rha2VzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDxUYWJsZXRJbnRlZ2VySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZV9kYXRhLnNtYWxsX21pc3Rha2VzIH1cbiAgICAgICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMuZ2VuT25TY29yZVVwZGF0ZShcInNtYWxsX21pc3Rha2VzXCIpIH0gLz5cbiAgICAgICAgICAgIDwvdGQ+PHRkPlxuICAgICAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LmRhbmNlX2p1ZGdlLmJpZ19taXN0YWtlc1wiKSB9PC9oMz5cbiAgICAgICAgICAgICAgICA8VGFibGV0SW50ZWdlcklucHV0XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlPXsgc2NvcmVfZGF0YS5iaWdfbWlzdGFrZXMgfVxuICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblNjb3JlVXBkYXRlKFwiYmlnX21pc3Rha2VzXCIpIH0gLz5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxuICAgIH1cbn1cblxuY2xhc3MgRGFuY2VKdWRnZVNjb3JlRm9ybWF0aW9uTWlzdGFrZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHNjb3JlX2RhdGEgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGE7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm1pc3Rha2VzXCI+XG4gICAgICAgICAgICA8aDM+eyBfXyhcInRhYmxldC5kYW5jZV9qdWRnZS5mb3JtX21pc3Rha2VzXCIpIH08L2gzPlxuICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxuICAgICAgICAgICAgICAgIHZhbHVlPXsgc2NvcmVfZGF0YS5taXN0YWtlcyB9XG4gICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZS5iaW5kKHRoaXMsIFwibWlzdGFrZXNcIikgfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIERhbmNlSnVkZ2VTY29yZUZvcm1hdGlvbkFjcm9NaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgZ2VuT25TY29yZVVwZGF0ZShzY29yZV9wYXJ0KSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCwgbmV3X3ZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgc2NvcmVfZGF0YSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJtaXN0YWtlcyBmdWxsLXdpZHRoXCI+PHRib2R5Pjx0cj5cbiAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICA8aDM+eyBfXyhcInRhYmxldC5kYW5jZV9qdWRnZS5mb3JtX3NtYWxsX21pc3Rha2VzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDxUYWJsZXRJbnRlZ2VySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZV9kYXRhLnNtYWxsX21pc3Rha2VzIH1cbiAgICAgICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMuZ2VuT25TY29yZVVwZGF0ZShcInNtYWxsX21pc3Rha2VzXCIpIH0gLz5cbiAgICAgICAgICAgIDwvdGQ+PHRkPlxuICAgICAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LmRhbmNlX2p1ZGdlLmZvcm1fYmlnX21pc3Rha2VzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDxUYWJsZXRJbnRlZ2VySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZV9kYXRhLmJpZ19taXN0YWtlcyB9XG4gICAgICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLmdlbk9uU2NvcmVVcGRhdGUoXCJiaWdfbWlzdGFrZXNcIikgfSAvPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XG4gICAgfVxufVxuXG5jbGFzcyBEYW5jZUp1ZGdlRmluYWxEYW5jZVNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImZ3X3dvbWFuXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInJlZHVjdGlvblwiXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImZ3X21hblwiXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJyZWR1Y3Rpb25cIlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxuICAgICAgICAgICAgICAgIHBhcnQ9XCJkYW5jZV9maWdzXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInBvaW50NVwiXG4gICAgICAgICAgICAgICAgc2NhbGVfcHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IDEyLjUsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcbiAgICAgICAgICAgICAgICBwYXJ0PVwiY29tcG9zaXRpb25cIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVNaXN0YWtlc1xuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIERhbmNlSnVkZ2VEYW5jZVNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImZ3X3dvbWFuXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInJlZHVjdGlvblwiXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImZ3X21hblwiXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJyZWR1Y3Rpb25cIlxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxuICAgICAgICAgICAgICAgIHBhcnQ9XCJkYW5jZV9maWdzXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cImludGVnZXJcIlxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiAyNSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxuICAgICAgICAgICAgICAgIHBhcnQ9XCJjb21wb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJpbnRlZ2VyXCJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgICAgIG1heDogMjAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVNaXN0YWtlc1xuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIERhbmNlSnVkZ2VGb3JtYXRpb25TY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxuICAgICAgICAgICAgICAgIHBhcnQ9XCJkYW5jZV90ZWNoXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInBvaW50NVwiXG4gICAgICAgICAgICAgICAgc2NhbGVfcHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IDEwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImRhbmNlX2ZpZ3NcIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcbiAgICAgICAgICAgICAgICBwYXJ0PVwiaW1wcmVzc2lvblwiXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJwb2ludDVcIlxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiAxMCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZUZvcm1hdGlvbk1pc3Rha2VzXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgRGFuY2VKdWRnZUZvcm1hdGlvbkFjcm9TY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxuICAgICAgICAgICAgICAgIHBhcnQ9XCJhY3JvYmF0aWNzXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInBvaW50NVwiXG4gICAgICAgICAgICAgICAgc2NhbGVfcHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IDEwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImRhbmNlX3RlY2hcIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZGFuY2VfZmlnc1wiXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJwb2ludDVcIlxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiAxMCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxuICAgICAgICAgICAgICAgIHBhcnQ9XCJpbXByZXNzaW9uXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInBvaW50NVwiXG4gICAgICAgICAgICAgICAgc2NhbGVfcHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IDEwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlRm9ybWF0aW9uQWNyb01pc3Rha2VzXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgRGFuY2VKdWRnZVNpbXBsaWZpZWRTY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxuICAgICAgICAgICAgICAgIHBhcnQ9XCJwb2ludHNcIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwiZ3JpZFwiXG4gICAgICAgICAgICAgICAgc2tpcF9oZWFkZXJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICBtaW46IDEsXG4gICAgICAgICAgICAgICAgICAgIG1heDogNDAsXG4gICAgICAgICAgICAgICAgICAgIHJvd19zaXplOiAxMCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIERhbmNlSnVkZ2VTY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBwcm9wcyA9IHtcbiAgICAgICAgICAgIHNjb3JlOiB0aGlzLnByb3BzLnNjb3JlLFxuICAgICAgICAgICAgb25TY29yZVVwZGF0ZTogdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlLFxuICAgICAgICB9O1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2NvcmluZ19zeXN0ZW1fbmFtZSkge1xuICAgICAgICBjYXNlIFwicm9zZmFyci5hY3JvXCI6XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLm5vX2Fjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiA8RGFuY2VKdWRnZURhbmNlU2NvcmVJbnB1dCB7Li4ucHJvcHN9IC8+XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmFtX2ZpbmFsX2Z3XCI6XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiA8RGFuY2VKdWRnZUZpbmFsRGFuY2VTY29yZUlucHV0IHsuLi5wcm9wc30gLz5cbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gPERhbmNlSnVkZ2VGb3JtYXRpb25TY29yZUlucHV0IHsuLi5wcm9wc30gLz5cbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiA8RGFuY2VKdWRnZUZvcm1hdGlvbkFjcm9TY29yZUlucHV0IHsuLi5wcm9wc30gLz5cbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuc2ltcGxpZmllZFwiOlxuICAgICAgICAgICAgcmV0dXJuIDxEYW5jZUp1ZGdlU2ltcGxpZmllZFNjb3JlSW5wdXQgey4uLnByb3BzfSAvPlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8vIEFjcm8ganVkZ2VcblxuY2xhc3MgQWNyb0p1ZGdlQWNyb2JhdGljSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8aDM+eyBfKFwidGFibGV0LmhlYWRlcnMuYWNyb19uXCIsIHRoaXMucHJvcHMuYWNyb19pZHgpIH08L2gzPlxuICAgICAgICAgICAgPFNjb3JlUGFydFNjYWxlXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJyZWR1Y3Rpb25cIlxuICAgICAgICAgICAgICAgIGFjdGl2ZT17IHRoaXMucHJvcHMucmVkdWN0aW9uIH1cbiAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5wcm9wcy5vbkFjcm9SZWR1Y3Rpb25VcGRhdGUgfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIEFjcm9KdWRnZVNjb3JlTWlzdGFrZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibWlzdGFrZXNcIj5cbiAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LmFjcm9fanVkZ2UuZmFsbF9kb3duXCIpIH08L2gzPlxuICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxuICAgICAgICAgICAgICAgIHZhbHVlPXsgdGhpcy5wcm9wcy5taXN0YWtlcyB9XG4gICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZSB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgQWNyb0p1ZGdlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGdlbk9uQWNyb1JlZHVjdGlvblVwZGF0ZShhY3JvX2lkeCkge1xuICAgICAgICByZXR1cm4gKG5ld192YWx1ZSkgPT4gdGhpcy5wcm9wcy5vbkFjcm9SZWR1Y3Rpb25VcGRhdGUoYWNyb19pZHgsIG5ld192YWx1ZSk7XG4gICAgfVxuICAgIGdlbk9uTWlzdGFrZXNVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoXCJtaXN0YWtlc1wiLCBuZXdfdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBzY29yZV9kYXRhID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhO1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIHsgc2NvcmVfZGF0YS5yZWR1Y3Rpb25zLm1hcCgocmVkdWN0aW9uLCBhY3JvX2lkeCkgPT5cbiAgICAgICAgICAgICAgICA8QWNyb0p1ZGdlQWNyb2JhdGljSW5wdXRcbiAgICAgICAgICAgICAgICAgICAga2V5PXsgYWNyb19pZHggfVxuICAgICAgICAgICAgICAgICAgICByZWR1Y3Rpb249eyByZWR1Y3Rpb24gfVxuICAgICAgICAgICAgICAgICAgICBhY3JvX2lkeD17IGFjcm9faWR4IH1cbiAgICAgICAgICAgICAgICAgICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlPXsgdGhpcy5nZW5PbkFjcm9SZWR1Y3Rpb25VcGRhdGUoYWNyb19pZHgpIH0gLz5cbiAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgPEFjcm9KdWRnZVNjb3JlTWlzdGFrZXNcbiAgICAgICAgICAgICAgICBtaXN0YWtlcz17IHNjb3JlX2RhdGEubWlzdGFrZXMgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLmdlbk9uTWlzdGFrZXNVcGRhdGUoKSB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuLy8gQ29tbW9uXG5cbmNsYXNzIE5vdFBlcmZvcm1pbmdNZXNzYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1wZXJmb3JtaW5nXCI+XG4gICAgICAgICAgICB7IF8oXCJ0YWJsZXQubWVzc2FnZXMubm90X3BlcmZvcm1pbmdcIikgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFNjb3JlUGFydFNjYWxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBnZW5Qb3NzaWJsZVJlZHVjdGlvbnMoKSB7XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICBbMTAwLCBcIlhcIl0sXG4gICAgICAgICAgICBbNzUsICBcIi03NSVcIl0sXG4gICAgICAgICAgICBbNTAsICBcIi01MCVcIl0sXG4gICAgICAgICAgICBbMjUsICBcIi0yNSVcIl0sXG4gICAgICAgICAgICBbMTAsICBcIi0xMCVcIl0sXG4gICAgICAgICAgICBbNSwgICBcIi01JVwiXSxcbiAgICAgICAgICAgIFswLCAgIFwiT0tcIl0sXG4gICAgICAgIF1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMucHJvcHMuc2NhbGUpIHtcbiAgICAgICAgY2FzZSBcInBvaW50NVwiOlxuICAgICAgICAgICAgcmV0dXJuIDxUYWJsZXRQb2ludDVTZWxlY3RJbnB1dCBzdHlsZT1cInR3by1saW5lc1wiIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICBjYXNlIFwiaW50ZWdlclwiOlxuICAgICAgICAgICAgcmV0dXJuIDxUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQgc3R5bGU9XCJ0d28tbGluZXNcIiB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgY2FzZSBcImdyaWRcIjpcbiAgICAgICAgICAgIHJldHVybiA8VGFibGV0SW50ZWdlclNlbGVjdElucHV0IHN0eWxlPVwiZ3JpZFwiIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICBjYXNlIFwicmVkdWN0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gPFRhYmxldFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICBzdHlsZT1cIm9uZS1saW5lXCJcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5nZW5Qb3NzaWJsZVJlZHVjdGlvbnMoKSB9XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFRhYmxldFNjb3JlVG90YWxTY29yZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgcm9sZSA9IHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZS5yb2xlO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuc2ltcGxpZmllZFwiKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAocm9sZSA9PT0gXCJoZWFkX2p1ZGdlXCIgfHwgcm9sZSA9PT0gXCJ0ZWNoX2p1ZGdlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+XG4gICAgICAgICAgICB7IF9fKFwidGFibGV0Lmdsb2JhbC50b3RhbF9zY29yZVwiKSB9OiB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgVGFibGV0U2NvcmVDb25maXJtYXRpb25CdXR0b24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIG5lZWRDb25maXJtYXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2Uucm9sZSAhPT0gXCJoZWFkX2p1ZGdlXCI7XG4gICAgfVxuICAgIHJlYWR5VG9Db25maXJtKCkge1xuICAgICAgICBsZXQgc2NvcmVfZGF0YSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzY29yZV9kYXRhKTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZS5yb2xlICE9PSBcInRlY2hfanVkZ2VcIikge1xuICAgICAgICAgICAgZm9yIChsZXQgaWR4IGluIGtleXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoc2NvcmVfZGF0YVtrZXlzW2lkeF1dID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBzY29yZV9kYXRhW2tleXNbaWR4XV0gPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFyciA9IHNjb3JlX2RhdGFba2V5c1tpZHhdXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaiBpbiBPYmplY3Qua2V5cyhhcnIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXJyW2pdID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5uZWVkQ29uZmlybWF0aW9uKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5yZWFkeVRvQ29uZmlybSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb25maXJtXCI+PC9kaXY+O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm1cIj5cbiAgICAgICAgICAgIDxTbGlkZXJcbiAgICAgICAgICAgICAgICBvbkFjdGl2YXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlQ29uZmlybSB9XG4gICAgICAgICAgICAgICAgZG9uZT17IHRoaXMucHJvcHMuc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICBzbGlkZVRleHQ9eyBfKFwianVkZ2luZy5idXR0b25zLmNvbmZpcm1fc2NvcmVcIikgfVxuICAgICAgICAgICAgICAgIGRvbmVUZXh0PXsgXyhcImp1ZGdpbmcubGFiZWxzLmNvbmZpcm1lZFwiKSB9IC8+XG4gICAgICAgIDwvZGl2PjtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRTY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICB1cGRhdGVTY29yZXModHlwZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVhZE9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgbmV3X3Njb3JlID0ge307XG4gICAgICAgIG5ld19zY29yZVt0eXBlXSA9IHZhbHVlO1xuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUobmV3X3Njb3JlKTtcbiAgICB9XG4gICAgdXBkYXRlQWNyb1JlZHVjdGlvbihpZHgsIHZhbHVlKSB7XG4gICAgICAgIGxldCByZWR1Y3Rpb25zID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnJlZHVjdGlvbnMubWFwKCgpID0+IG51bGwpO1xuICAgICAgICByZWR1Y3Rpb25zW2lkeF0gPSB2YWx1ZTtcbiAgICAgICAgbGV0IG5ld19zY29yZSA9IHtcbiAgICAgICAgICAgIHJlZHVjdGlvbnM6IHJlZHVjdGlvbnMsXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKG5ld19zY29yZSk7XG4gICAgfVxuICAgIG92ZXJyaWRlQWNyb1Njb3JlKGFjcm9faWR4LCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIEFwaShcImFjcm9iYXRpY19vdmVycmlkZS5zZXRcIiwge1xuICAgICAgICAgICAgcnVuX2lkOiB0aGlzLnByb3BzLnJ1bi5pZCxcbiAgICAgICAgICAgIGFjcm9iYXRpY19pZHg6IGFjcm9faWR4LFxuICAgICAgICAgICAgc2NvcmU6IHZhbHVlLFxuICAgICAgICB9KS5zZW5kKCk7XG4gICAgfVxuICAgIHJlbmRlclNjb3Jlc0lucHV0KCkge1xuICAgICAgICBzd2l0Y2ggKGdldFNjb3JpbmdUeXBlKHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZSwgdGhpcy5wcm9wcy5zY29yaW5nX3N5c3RlbV9uYW1lKSkge1xuICAgICAgICBjYXNlIFwiYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIDxBY3JvSnVkZ2VJbnB1dFxuICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XG4gICAgICAgICAgICAgICAgb25BY3JvUmVkdWN0aW9uVXBkYXRlPXsgdGhpcy51cGRhdGVBY3JvUmVkdWN0aW9uLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnVwZGF0ZVNjb3Jlcy5iaW5kKHRoaXMpIH0gLz5cbiAgICAgICAgY2FzZSBcImRhbmNlXCI6XG4gICAgICAgIGNhc2UgXCJmb3JtYXRpb25cIjpcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvbl9hY3JvXCI6XG4gICAgICAgIGNhc2UgXCJzaW1wbGlmaWVkXCI6XG4gICAgICAgICAgICByZXR1cm4gPERhbmNlSnVkZ2VTY29yZUlucHV0XG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lPXsgdGhpcy5wcm9wcy5zY29yaW5nX3N5c3RlbV9uYW1lIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy51cGRhdGVTY29yZXMuYmluZCh0aGlzKSB9IC8+XG4gICAgICAgIGNhc2UgXCJoZWFkXCI6XG4gICAgICAgICAgICByZXR1cm4gPEhlYWRKdWRnZVNjb3JlSW5wdXRcbiAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lPXsgdGhpcy5wcm9wcy5zY29yaW5nX3N5c3RlbV9uYW1lIH1cbiAgICAgICAgICAgICAgICBhbGxfZGlzY2lwbGluZV9qdWRnZXM9eyB0aGlzLnByb3BzLmFsbF9kaXNjaXBsaW5lX2p1ZGdlcyB9XG4gICAgICAgICAgICAgICAgYWxsX3Njb3Jlcz17IHRoaXMucHJvcHMuYWxsX3Njb3JlcyB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMudXBkYXRlU2NvcmVzLmJpbmQodGhpcykgfSAvPlxuICAgICAgICBjYXNlIFwidGVjaFwiOlxuICAgICAgICAgICAgcmV0dXJuIDxUZWNoSnVkZ2VTY29yZUlucHV0XG4gICAgICAgICAgICAgICAgcGFnZT17IHRoaXMucHJvcHMucGFnZSB9XG4gICAgICAgICAgICAgICAgcnVuPXsgdGhpcy5wcm9wcy5ydW4gfVxuICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XG4gICAgICAgICAgICAgICAgb25BY3JvT3ZlcnJpZGU9eyB0aGlzLm92ZXJyaWRlQWNyb1Njb3JlLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnVwZGF0ZVNjb3Jlcy5iaW5kKHRoaXMpIH0gLz5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiVW5rbm93biBqdWRnZSByb2xlXCIsIHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZS5yb2xlKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQgJiYgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlLnJvbGUgIT09IFwiaGVhZF9qdWRnZVwiKSB7XG4gICAgICAgICAgICByZXR1cm4gPE5vdFBlcmZvcm1pbmdNZXNzYWdlIC8+XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXsgdGhpcy5wcm9wcy5yZWFkT25seSA/IFwicmVhZC1vbmx5XCIgOiBcIlwiIH0+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyU2NvcmVzSW5wdXQoKSB9XG4gICAgICAgICAgICA8VGFibGV0U2NvcmVUb3RhbFNjb3JlXG4gICAgICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZT17IHRoaXMucHJvcHMuc2NvcmluZ19zeXN0ZW1fbmFtZSB9XG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZSB9XG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH0gLz5cbiAgICAgICAgICAgIDxUYWJsZXRTY29yZUNvbmZpcm1hdGlvbkJ1dHRvblxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2U9eyB0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2UgfVxuICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5zY29yZSB9XG4gICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuIiwiY2xhc3MgRG9jeEltcGwge1xuICAgIGNvbnN0cnVjdG9yKGZpbGVuYW1lKSB7XG4gICAgICAgIHRoaXMuZmlsZW5hbWUgPSBmaWxlbmFtZTtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlMSA9IG51bGw7XG4gICAgICAgIHRoaXMudGl0bGUyID0gbnVsbDtcbiAgICAgICAgdGhpcy50aXRsZTMgPSBudWxsO1xuICAgICAgICB0aGlzLm1hcmdpbnMgPSBudWxsO1xuICAgICAgICB0aGlzLmJvZHkgPSBcIlwiO1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gXCJwb3J0cmFpdFwiO1xuICAgICAgICB0aGlzLnN0eWxlcyA9IHtcbiAgICAgICAgICAgIFwiYm9keVwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMHB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LWZhbWlseVwiOiBcIkNhbGlicmksIFRhaG9tYSwgQXJpYWwsIHNhbnMtc2VyaWZcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRhYmxlXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci1jb2xsYXBzZVwiOiBcImNvbGxhcHNlXCIsXG4gICAgICAgICAgICAgICAgXCJ3aWR0aFwiOiBcIjEwMCVcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRyXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstaW5zaWRlXCI6IFwiYXZvaWRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInRkLCB0aFwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IFwiMXB0IDNwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDEsIGgyLCBoMywgaDQsIGg1LCBoNlwiOiB7XG4gICAgICAgICAgICAgICAgXCJwYWdlLWJyZWFrLWFmdGVyXCI6IFwiYXZvaWRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi1ib3R0b21cIjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgxXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjIwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImgyXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE2cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLXRvcFwiOiBcIjZwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDNcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNHB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoNCBwXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiMTBwdCAwIDZwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDUgcFwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxMnB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpblwiOiBcIjZwdCAwXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIuaGVhZGVyXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlci1ib3R0b21cIjogXCIxcHggc29saWQgYmxhY2tcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nLWJvdHRvbVwiOiBcIjJwdFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiBcIjIwcHRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcInBcIjoge1xuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IDAsXG4gICAgICAgICAgICAgICAgXCJwYWRkaW5nXCI6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJsaVwiOiB7IFwibWFyZ2luLXRvcFwiOiAwLCBcInBhZGRpbmctdG9wXCI6IDAgfSxcbiAgICAgICAgICAgIFwiLnNwYWNlclwiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNHB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIudmEtdG9wXCI6IHtcbiAgICAgICAgICAgICAgICBcInZlcnRpY2FsLWFsaWduXCI6IFwidG9wXCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCIudGV4dC1sZWZ0XCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwibGVmdFwiIH0sXG4gICAgICAgICAgICBcIi50ZXh0LXJpZ2h0XCI6IHsgXCJ0ZXh0LWFsaWduXCI6IFwicmlnaHRcIiB9LFxuICAgICAgICAgICAgXCIudGV4dC1jZW50ZXJcIjogeyBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIiB9LFxuICAgICAgICAgICAgXCIuYm9yZGVyZWQtdGFibGUgdGQsIC5ib3JkZXJlZC10YWJsZSB0aFwiOiB7XG4gICAgICAgICAgICAgICAgXCJib3JkZXJcIjogXCIxcHQgc29saWQgYmxhY2tcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5hZGRXaWR0aENzcygpO1xuICAgIH1cbiAgICBhZGRXaWR0aENzcygpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPD0gMTAwOyArK2kpIHtcbiAgICAgICAgICAgIHRoaXMuYWRkU3R5bGUoXCIudy1cIiArIGksIFwid2lkdGhcIiwgaSArIFwiJVwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFkZFN0eWxlKHNlbGVjdG9yLCBrZXksIHZhbHVlKSB7XG4gICAgICAgIGlmICghdGhpcy5zdHlsZXNbc2VsZWN0b3JdKSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlc1tzZWxlY3Rvcl0gPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnN0eWxlc1tzZWxlY3Rvcl1ba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0SGVhZGVyKGhlYWRlcikge1xuICAgICAgICB0aGlzLmhlYWRlciA9IGhlYWRlcjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFRpdGxlMSh0aXRsZTEpIHtcbiAgICAgICAgdGhpcy50aXRsZTEgPSB0aXRsZTE7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaXRsZTIodGl0bGUyKSB7XG4gICAgICAgIHRoaXMudGl0bGUyID0gdGl0bGUyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGl0bGUzKHRpdGxlMykge1xuICAgICAgICB0aGlzLnRpdGxlMyA9IHRpdGxlMztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE1hcmdpbnMobWFyZ2lucykge1xuICAgICAgICB0aGlzLm1hcmdpbnMgPSBtYXJnaW5zO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0Qm9keShib2R5KSB7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRPcmllbnRhdGlvbihvcmllbnRhdGlvbikge1xuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlbmRlclN0eWxlQmxvY2soc2VsZWN0b3IsIGRhdGEpIHtcbiAgICAgICAgbGV0IGNzc19wYWlycyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGRhdGEpLm1hcCgoa2V5KSA9PiBrZXkgKyAnOiAnICsgZGF0YVtrZXldICsgJzsgJylcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yICsgXCIgeyBcIiArIGNzc19wYWlycy5qb2luKFwiIFwiKSArIFwiIH1cIjtcbiAgICB9XG4gICAgcmVuZGVyU3R5bGVzKCkge1xuICAgICAgICBsZXQgY3NzX2Jsb2NrcyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuc3R5bGVzKS5tYXAoKFxuICAgICAgICAgICAgKHNlbGVjdG9yKSA9PiB0aGlzLnJlbmRlclN0eWxlQmxvY2soc2VsZWN0b3IsIHRoaXMuc3R5bGVzW3NlbGVjdG9yXSlcbiAgICAgICAgKS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIGNzc19ibG9ja3Muam9pbihcIlxcblwiKTtcbiAgICB9XG4gICAgcmVuZGVySFRNTCgpIHtcbiAgICAgICAgbGV0IGNzcyA9IHRoaXMucmVuZGVyU3R5bGVzKCk7XG4gICAgICAgIGxldCBoZWFkZXIgPSB0aGlzLmhlYWRlciA/ICc8cCBjbGFzcz1cImhlYWRlclwiPicgKyB0aGlzLmhlYWRlciArICc8L3A+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTEgPSB0aGlzLnRpdGxlMSA/ICc8aDE+JyArIHRoaXMudGl0bGUxICsgJzwvaDE+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTIgPSB0aGlzLnRpdGxlMiA/ICc8aDI+JyArIHRoaXMudGl0bGUyICsgJzwvaDI+JyA6IFwiXCI7XG4gICAgICAgIGxldCB0aXRsZTMgPSB0aGlzLnRpdGxlMyA/ICc8aDM+JyArIHRoaXMudGl0bGUzICsgJzwvaDM+JyA6IFwiXCI7XG4gICAgICAgIGxldCBzcGFjZXIgPSAoaGVhZGVyIHx8IHRpdGxlMSB8fCB0aXRsZTIgfHwgdGl0bGUzKSA/ICc8cCBjbGFzcz1cInNwYWNlclwiPiZuYnNwOzwvcD4nIDogXCJcIjtcbiAgICAgICAgcmV0dXJuIFwiPCFET0NUWVBFIGh0bWw+XFxuXCIgK1xuICAgICAgICAgICAgXCI8aHRtbD48aGVhZD5cIiArXG4gICAgICAgICAgICAgICAgXCI8bWV0YSBjaGFyc2V0PVxcXCJ1dGYtOFxcXCI+XCIgK1xuICAgICAgICAgICAgICAgIFwiPHN0eWxlPlxcblwiICsgY3NzICsgXCJcXG48L3N0eWxlPlxcblwiICtcbiAgICAgICAgICAgIFwiPC9oZWFkPjxib2R5PlxcblwiICtcbiAgICAgICAgICAgICAgICBoZWFkZXIgK1xuICAgICAgICAgICAgICAgIHRpdGxlMSArXG4gICAgICAgICAgICAgICAgdGl0bGUyICtcbiAgICAgICAgICAgICAgICB0aXRsZTMgK1xuICAgICAgICAgICAgICAgIHNwYWNlciArXG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5ICtcbiAgICAgICAgICAgIFwiPC9ib2R5PjwvaHRtbD5cIjtcbiAgICB9XG5cbiAgICBzYXZlKCkge1xuICAgICAgICBsZXQgaHRtbCA9IHRoaXMucmVuZGVySFRNTCgpO1xuICAgICAgICBsZXQgbWFyZ2lucyA9IHRoaXMubWFyZ2lucyB8fCAodGhpcy5vcmllbnRhdGlvbiA9PT0gXCJwb3J0cmFpdFwiID8gWzEwLCAxNSwgMTAsIDE1XSA6IFs3LCAxMCwgNywgMTBdKTtcbiAgICAgICAgbGV0IGNvbnZlcnRlZCA9IGh0bWxEb2N4LmFzQmxvYihodG1sLCB7XG4gICAgICAgICAgICBvcmllbnRhdGlvbjogdGhpcy5vcmllbnRhdGlvbixcbiAgICAgICAgICAgIG1hcmdpbnM6IHtcbiAgICAgICAgICAgICAgICB0b3A6ICAgIE1hdGguZmxvb3IobWFyZ2luc1swXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICByaWdodDogIE1hdGguZmxvb3IobWFyZ2luc1sxXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBib3R0b206IE1hdGguZmxvb3IobWFyZ2luc1syXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgICAgICBsZWZ0OiAgIE1hdGguZmxvb3IobWFyZ2luc1szXSAqIDU2LjY1OSkudG9TdHJpbmcoKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNhdmVBcyhjb252ZXJ0ZWQsIHRoaXMuZmlsZW5hbWUpO1xuICAgIH1cbn1cblxuXG5leHBvcnQgdmFyIERvY3ggPSAoZm4pID0+IG5ldyBEb2N4SW1wbChmbik7XG4iLCJleHBvcnQgY2xhc3MgUnVuU2NvcmVzV3JhcHBlciB7XG4gICAgY29uc3RydWN0b3IocnVuLCBkaXNjaXBsaW5lX2p1ZGdlcykge1xuICAgICAgICB0aGlzLnJ1biA9IHJ1bjtcbiAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlcyA9IGRpc2NpcGxpbmVfanVkZ2VzO1xuICAgICAgICB0aGlzLnNjb3Jlc19ieV9kaXNjaXBsaW5lX2p1ZGdlX2lkID0ge31cbiAgICAgICAgcnVuLnNjb3Jlcy5mb3JFYWNoKGZ1bmN0aW9uKHNjb3JlKSB7XG4gICAgICAgICAgICBsZXQgZGpfaWQgPSBzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkO1xuICAgICAgICAgICAgdGhpcy5zY29yZXNfYnlfZGlzY2lwbGluZV9qdWRnZV9pZFtkal9pZF0gPSBzY29yZTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICB9XG4gICAgZ2V0U2NvcmVzQnlKdWRnZUlkcyhkaXNjaXBsaW5lX2p1ZGdlX2lkcykge1xuICAgICAgICByZXR1cm4gZGlzY2lwbGluZV9qdWRnZV9pZHMubWFwKCgoZGpfaWQpID0+IHRoaXMuc2NvcmVzX2J5X2Rpc2NpcGxpbmVfanVkZ2VfaWRbZGpfaWRdKS5iaW5kKHRoaXMpKTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb3VyU2NvcmVzV3JhcHBlciB7XG4gICAgY29uc3RydWN0b3IodG91ciwgcmVzdWx0cykge1xuICAgICAgICB0aGlzLnJ1bl93cmFwcGVycyA9IHRvdXIucnVucy5tYXAoKHJ1bikgPT4gbmV3IFJ1blNjb3Jlc1dyYXBwZXIocnVuLCB0b3VyLmRpc2NpcGxpbmVfanVkZ2VzKSk7XG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXMgPSB0b3VyLmRpc2NpcGxpbmUuZGlzY2lwbGluZV9qdWRnZXM7XG4gICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXMgPSB7fTtcbiAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRqLCBpZHgpIHtcbiAgICAgICAgICAgIGxldCBhcnIgPSB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2RqLnJvbGVdIHx8IFtdO1xuICAgICAgICAgICAgYXJyLnB1c2goe1xuICAgICAgICAgICAgICAgIGlkeDogaWR4LFxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2U6IGRqLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2RqLnJvbGVdID0gYXJyO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBpZiAocmVzdWx0cykge1xuICAgICAgICAgICAgbGV0IHJlc3VsdHNfYnlfcnVuX2lkcyA9IHt9O1xuICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXMpID0+XG4gICAgICAgICAgICAgICAgcmVzdWx0c19ieV9ydW5faWRzW3Jlcy5ydW5faWRdID0gcmVzKTtcbiAgICAgICAgICAgIHRoaXMucnVuX3dyYXBwZXJzLmZvckVhY2goKHcpID0+XG4gICAgICAgICAgICAgICAgdy5yZXN1bHRzX2luZm8gPSByZXN1bHRzX2J5X3J1bl9pZHNbdy5ydW4uaWRdKTtcbiAgICAgICAgICAgIHRoaXMucnVuX3dyYXBwZXJzLnNvcnQoKGEsIGIpID0+IGEucmVzdWx0c19pbmZvLnBsYWNlIC0gYi5yZXN1bHRzX2luZm8ucGxhY2UpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbYXJndW1lbnRzWzBdXVxuICAgICAgICAgICAgICAgID8gdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1thcmd1bWVudHNbMF1dLm1hcCgoYikgPT4gYi5kaXNjaXBsaW5lX2p1ZGdlKVxuICAgICAgICAgICAgICAgIDogW107XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHJlcyA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgcmVzID0gcmVzLmNvbmNhdCh0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2FyZ3VtZW50c1tpXV0gfHwgW10pO1xuICAgICAgICB9XG4gICAgICAgIHJlcy5zb3J0KChhLCBiKSA9PiBhLmlkeCAtIGIuaWR4KTtcbiAgICAgICAgcmV0dXJuIHJlcy5tYXAoKGIpID0+IGIuZGlzY2lwbGluZV9qdWRnZSk7XG4gICAgfVxuICAgIGdldFNjb3Jlc1RhYmxlQnlSb2xlcygpIHtcbiAgICAgICAgbGV0IGRpc2NpcGxpbmVfanVkZ2VfaWRzID0gdGhpcy5nZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcyguLi5hcmd1bWVudHMpLm1hcCgoZGopID0+IGRqLmlkKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuX3dyYXBwZXJzLm1hcCgodykgPT4gdy5nZXRTY29yZXNCeUp1ZGdlSWRzKGRpc2NpcGxpbmVfanVkZ2VfaWRzKSk7XG4gICAgfVxuICAgIGdldFJlc3VsdHNJbmZvKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5fd3JhcHBlcnMubWFwKCh3KSA9PiB3LnJlc3VsdHNfaW5mbyk7XG4gICAgfVxuICAgIGdldFJ1bnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bl93cmFwcGVycy5tYXAoKHcpID0+IHcucnVuKTtcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYXJ0aWNpcGFudERpc3BsYXkocGFydGljaXBhbnQpIHtcbiAgICBpZiAocGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgIT09IFwiXCIpIHtcbiAgICAgICAgcmV0dXJuIDxwPnsgcGFydGljaXBhbnQuZm9ybWF0aW9uX25hbWUgfTwvcD47XG4gICAgfVxuICAgIHJldHVybiBwYXJ0aWNpcGFudC5zcG9ydHNtZW4ubWFwKChzLCBpZHgpID0+IDxwIGtleT17IGlkeCB9Pnsgcy5sYXN0X25hbWUgKyBcIiBcIiArIHMuZmlyc3RfbmFtZSB9PC9wPik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTY29yaW5nVHlwZShkaXNjaXBsaW5lX2p1ZGdlLCBzY29yaW5nX3N5c3RlbV9uYW1lKSB7XG4gICAgc3dpdGNoIChkaXNjaXBsaW5lX2p1ZGdlLnJvbGUpIHtcbiAgICBjYXNlIFwiZGFuY2VfanVkZ2VcIjpcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3N5c3RlbV9uYW1lKSB7XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmZvcm1hdGlvblwiOlxuICAgICAgICAgICAgcmV0dXJuIFwiZm9ybWF0aW9uXCI7XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJmb3JtYXRpb25fYWNyb1wiO1xuICAgICAgICBjYXNlIFwicm9zZmFyci5zaW1wbGlmaWVkXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJzaW1wbGlmaWVkXCI7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZVwiO1xuICAgICAgICB9XG4gICAgY2FzZSBcImFjcm9fanVkZ2VcIjpcbiAgICAgICAgc3dpdGNoIChzY29yaW5nX3N5c3RlbV9uYW1lKSB7XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmFtX2ZpbmFsX2Z3XCI6XG4gICAgICAgICAgICByZXR1cm4gXCJkYW5jZVwiO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIFwiYWNyb1wiO1xuICAgICAgICB9XG4gICAgY2FzZSBcInRlY2hfanVkZ2VcIjpcbiAgICAgICAgcmV0dXJuIFwidGVjaFwiO1xuICAgIGNhc2UgXCJoZWFkX2p1ZGdlXCI6XG4gICAgICAgIHJldHVybiBcImhlYWRcIjtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyB0cmFuc2xhdGUsIGdldFBvc3NpYmxlVG91ck5hbWVzIH0gZnJvbSBcIi4vcnVcIjtcblxuZXhwb3J0IHZhciBfID0gdHJhbnNsYXRlO1xuZXhwb3J0IHZhciB0b3VyX25hbWVzID0gZ2V0UG9zc2libGVUb3VyTmFtZXMoKTtcbiIsImV4cG9ydCBmdW5jdGlvbiB0cmFuc2xhdGUoc3JjLCBhcmcpIHtcclxuICAgIGZ1bmN0aW9uIGNob29zZUVuZGluZyhuLCBlMSwgZTIsIGU1KSB7XHJcbiAgICAgICAgbGV0IHggPSBuICUgMTAwO1xyXG4gICAgICAgIGlmIChNYXRoLmZsb29yKHggLyAxMCkgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGU1O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID09PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHggJSAxMCA+PSA1IHx8IHggJSAxMCA9PT0gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlMjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgUEhSQVNFUyA9IHtcclxuICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiAodmVyc2lvbiwgZGF0ZSkgPT4gPGRpdiBjbGFzc05hbWU9XCJhYm91dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxiPlJvY2tKdWRnZSB7dmVyc2lvbn08L2I+ICjQvtGCIHtkYXRlfSkgJm1kYXNoOyDRgdC40YHRgtC10LzQsCDQtNC70Y8g0L/QvtC00YHRh9C10YLQsCDRgNC10LfRg9C70YzRgtCw0YLQvtCyINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDQv9C+INCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC+0LzRgyDRgNC+0Lot0L0t0YDQvtC70LvRgy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0JDQstGC0L7RgNGB0LrQuNC1INC/0YDQsNCy0LAg0L3QsCDRgdC40YHRgtC10LzRgyBSb2NrSnVkZ2Ug0L/QvtC70L3QvtGB0YLRjNGOINC/0YDQuNC90LDQtNC70LXQttCw0YIg0YDQsNC30YDQsNCx0L7RgtGH0LjQutGDINCQ0YDRgtC10LzRgyDQmtCw0LfQsNC60L7QstGDLiDQodC+0LDQstGC0L7RgCDRgdC40YHRgtC10LzRiyDQkNC90YLQvtC9INCQ0LzQtdC70LjQvS48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0KHQuNGB0YLQtdC80LAg0YDQsNGB0L/RgNC+0YHRgtGA0LDQvdGP0LXRgtGB0Y8g0L/QviDQu9C40YbQtdC90LfQuNC4IExpbnVtIGQuby5vIChpbmZvQGxpbnVtLmhyKS4g0JTQu9GPINC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLINGB0YPQtNC10LnRgdGC0LLQsCBSb2NrSnVkZ2Ug0L3QtdC+0LHRhdC+0LTQuNC80L4g0Lgg0LTQvtGB0YLQsNGC0L7Rh9C90L4g0LjQvNC10YLRjCDQv9GA0LDQstC+INC40YHQv9C+0LvRjNC30L7QstCw0L3QuNGPINGB0LjRgdGC0LXQvNGLIExpbnVtIExQUy48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+0J7RhNC40YbQuNCw0LvRjNC90YvQuSDRgdCw0LnRgjogPGEgaHJlZj1cImh0dHBzOi8vcm9ja2p1ZGdlLmNvbS9cIiB0YXJnZXQ9XCJfYmxhbmtcIj5odHRwczovL3JvY2tqdWRnZS5jb20vPC9hPjwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3Byb2dyYW1zX2FmdGVyX2NyZWF0aW9uXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLINC80L7QttC90L4g0LHRg9C00LXRgiDQtNC+0LHQsNCy0LjRgtGMINGC0L7Qu9GM0LrQviDQv9C+0YHQu9C1INGB0L7RhdGA0LDQvdC10L3QuNGPINGD0YfQsNGB0YLQvdC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfYXZhaWxhYmxlXCI6IFwi0JDQstGC0L7QvNCw0YLQuNGH0LXRgdC60LDRjyDQv9C10YfQsNGC0Ywg0LrQvtGA0YDQtdC60YLQvdC+INC90LDRgdGC0YDQvtC10L3QsCDQuCDQvNC+0LbQtdGCINCx0YvRgtGMINC40YHQv9C+0LvRjNC30L7QstCw0L3QsC5cIixcclxuICAgICAgICAgICAgICAgIFwiYXV0b19wcmludGVyX25vdF9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQvdC10LTQvtGB0YLRg9C/0L3QsCDQvdCwINGN0YLQvtC8INC60L7QvNC/0YzRgtC10YDQtS5cIixcclxuICAgICAgICAgICAgICAgIFwibm9fZmluYWxpemVkXCI6IFwi0J7RgtGB0YPRgtGB0YLQstGD0Y7RgiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQtSDRgtGD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3dhcm5pbmdcIjogPGRpdj5cclxuICAgICAgICAgICAgICAgICAgICA8cD48c3Ryb25nPtCk0LjQvdCw0LvQuNC30LDRhtC40Y8g0LTQvtC70LbQvdCwINC+0YLQvNC10L3Rj9GC0YzRgdGPINGC0L7Qu9GM0LrQviDQsiDQuNGB0LrQu9GO0YfQuNGC0LXQu9GM0L3Ri9GFINGB0LvRg9GH0LDRj9GFITwvc3Ryb25nPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QldGB0LvQuCDQttC1INGN0YLQviDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDQvdC10L7QsdGF0L7QtNC40LzQviwg0L7QsdGA0LDRgtC40YLQtSDQstC90LjQvNCw0L3QuNC1LCDRh9GC0L4g0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgdC/0LjRgdC+0Log0YPRh9Cw0YHRgtC90LjQutC+0LJcclxuICAgICAgICAgICAgICAgICAgICDRgdC70LXQtNGD0Y7RidC10LPQviDRgtGD0YDQsCDQsdGD0LTQtdGCINCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC4INC/0LXRgNC10YHQvtC30LTQsNC9LiDQoNC10LfRg9C70YzRgtCw0YLRiyDRg9GH0LDRgdGC0L3QuNC60L7Qsiwg0L/RgNC+0YjQtdC00YjQuNGFINCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YAg0L/QvtGB0LvQtSDQv9C10YDQstC+0LlcclxuICAgICAgICAgICAgICAgICAgICDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INC4INC90LUg0L/RgNC+0YjQtdC00YjQuNGFINC/0L7RgdC70LUg0L/QvtCy0YLQvtGA0L3QvtC5INCx0YPQtNGD0YIg0LHQtdC30LLQvtC30LLRgNCw0YLQvdC+INGD0YLQtdGA0Y/QvdGLITwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QmCDQvdC1INC30LDQsdGD0LTRjNGC0LUg0LfQsNC90L7QstC+INC90LDQv9C10YfQsNGC0LDRgtGMINCy0YHQtSDRgtCx0LvQuNGG0YsuPC9wPjwvZGl2PixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YHQuy7CoNGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInByaW50X3Rlc3RfcGFnZVwiOiBcItCd0LDQv9C10YfQsNGC0LDRgtGMINGC0LXRgdGC0L7QstGD0Y4g0YHRgtGA0LDQvdC40YbRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWV1ZVwiOiBcItCe0YfQtdGA0LXQtNGMINC/0LXRh9Cw0YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJxdWV1ZV9lbXB0eVwiOiBcItCe0YfQtdGA0LXQtNGMINC/0YPRgdGC0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18xXCI6IFwi0JrRgNCw0YLQutCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18yXCI6IFwi0KHRgNC10LTQvdGP0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c18zXCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJ1bGVzXCI6IFwi0JfQsNC00LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwidGVzdFwiOiBcIlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3BhZ2VcIjogXCLQotC10YHRgtC+0LLQsNGPINGB0YLRgNCw0L3QuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidGVzdF90ZXh0XCI6IFwi0K3RgtC+INGC0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsCBSb2NrSnVkZ2VcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NsdWJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINC60LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvblwiOiBcItCh0L7Qt9C00LDRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRjdC70LXQvNC10L3RglwiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfZGlzY2lwbGluZVwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YNcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2p1ZGdlXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgdGD0LTRjNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9wYXJ0aWNpcGFudFwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF90b3VyXCI6IFwi0JTQvtCx0LDQstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X251bWJlcnNcIjogXCLQndC+0LzQtdGA0LAg0LIgRE9DWFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkb2N4X3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImV4cG9ydFwiOiBcItCt0LrRgdC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0XCI6IFwi0JjQvNC/0L7RgNGC0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwibGF1bmNoX2F1dG9fcHJpbnRlclwiOiBcItCX0LDQv9GD0YHQuiDQsNCy0YLQvtC80LDRgtC40YfQtdGB0LrQvtC5INC/0LXRh9Cw0YLQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9cIjogXCLQl9Cw0LPRgNGD0LfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0J/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0LLRgdC1INGD0YHRgtGA0L7QudGB0YLQstCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0J7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDRg9GB0YLRgNC+0LnRgdGC0LLQsNGFXCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19wbGFuXCI6IFwi0KHQvtGA0YLQuNGA0L7QutCwINC/0L4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInN3aXRjaF90b19kaXNjaXBsaW5lc1wiOiBcItCh0L7RgNGC0LjRgNC+0LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwidG9fc3RhcnRfcGFnZVwiOiBcItCd0LAg0LPQu9Cw0LLQvdGD0Y5cIixcclxuICAgICAgICAgICAgICAgIFwidW5jb25maXJtX3Njb3JlXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQutGB0LDRhtC40LhcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZVwiOiBcItCe0YLQvNC10L3QuNGC0Ywg0YTQuNC90LDQu9C40LfQsNGG0LjRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NsdWJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDQutC70YPQsT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2NvbXBldGl0aW9uXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtT9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2Rpc2NpcGxpbmVcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0LTQuNGB0YbQuNC/0LvQuNC90YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9qdWRnZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtCz0L4g0YHRg9C00YzRjj9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9wcm9ncmFtXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtGDINC/0YDQvtCz0YDQsNC80LzRgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlZnJlc2hfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINGB0YLRgNCw0L3QuNGG0YMg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWxvYWRfY2xpZW50c1wiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0LHQvdC+0LLQuNGC0Ywg0LTQsNC90L3Ri9C1INC90LAg0LLRgdC10YUg0LrQu9C40LXQvdGC0LDRhT9cIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOINGC0YPRgNCwPyDQktCy0LXQtNC40YLQtSDCq3VuZmluYWxpemXCuywg0YfRgtC+0LHRiyDQv9GA0L7QtNC+0LvQttC40YLRjFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhYm91dFwiOiBcItCeINC/0YDQvtCz0YDQsNC80LzQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbGllbnRzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQv9C+0LTQutC70Y7Rh9C10L3QvdGL0LzQuCDRg9GB0YLRgNC+0LnRgdGC0LLQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LrQu9GD0LHQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNfc3VtbWFyeVwiOiBcItCh0LLQvtC00LrQsCDQv9C+INC60LvRg9Cx0LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX21hbmFnZW1lbnRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3QsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfc2hvd25cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDRgtC+0LvRjNC60L4g0L/QviDRgdC70LXQtNGD0Y7RidC40Lwg0LTQuNGB0YbQuNC/0LvQuNC90LDQvDpcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfc3VtbWFyeVwiOiBcItCh0LLQvtC00LrQsCDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0X2NvbXBldGl0aW9uXCI6IFwi0K3QutGB0L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwINC4INGA0LXQt9GD0LvRjNGC0LDRgtC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW1wb3J0X2NvbXBldGl0aW9uXCI6IFwi0JjQvNC/0L7RgNGCINC00LDQvdC90YvRhSDRgtGD0YDQvdC40YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfZXhwb3J0XCI6IFwi0JjQvNC/0L7RgNGCIC8g0Y3QutGB0L/QvtGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00LXQudGB0LrQsNGPINCx0YDQuNCz0LDQtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImp1ZGdlc19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHRg9C00YzRj9C80LhcIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF9hY3JvYmF0aWNzXCI6IFwi0JfQsNCz0YDRg9C30LrQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGD0YfQsNGB0YLQvdC40LrQsNC80LhcIixcclxuICAgICAgICAgICAgICAgIFwic2VydmljZV9tZW51XCI6IFwi0KHQtdGA0LLQuNGB0L3QvtC1INC80LXQvdGOXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2xpc3RcIjogXCLQodGC0LDRgNGC0L7QstGL0Lkg0LvQuNGB0YJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDRg9GH0LDRgdGC0L3QuNC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3VyX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQntGC0LzQtdC90LAg0YTQuNC90LDQu9C40LfQsNGG0LjQuCDRgtGD0YDQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bnBpY2tlZF90b3Vyc1wiOiBcItCd0LUg0LLQutC70Y7Rh9C10L3RiyDQsiDQv9GA0L7Qs9GA0LDQvNC80YNcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9kYXRlXCI6IFwi0JTQsNGC0LAg0L/RgNC+0LLQtdC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25fbmFtZVwiOiBcItCd0LDQuNC80LXQvdC+0LLQsNC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZ3JvdXBfYnlfY2x1YnNcIjogXCLQk9GA0YPQv9C/0LjRgNC+0LLQsNGC0Ywg0L/QviDQutC70YPQsdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9hY3JvYmF0aWNzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2NsdWJzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDQtNCw0L3QvdGL0LUg0L4g0LrQu9GD0LHQsNGFXCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfZXh0ZW5kZWRfaW5mb1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0YDQsNGB0YjQuNGA0LXQvdC90YPRjiDQuNC90YTQvtGA0LzQsNGG0LjRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Zvcm1hdGlvbl9zcG9ydHNtZW5cIjogXCLQktC60LvRjtGH0LjRgtGMINGB0L7RgdGC0LDQsiDRhNC+0YDQvNC10LnRiNC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2p1ZGdlc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INGB0YPQtNGM0Y/RhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maWxlc19zZWxlY3RlZFwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YTQsNC50LsuLi5cIixcclxuICAgICAgICAgICAgICAgIFwicGFzdGVfYWNyb1wiOiBcItCS0YHRgtCw0LLRjNGC0LUg0LTQsNC90L3Ri9C1INC40Lcg0LrQsNC70YzQutGD0LvRj9GC0L7RgNCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInNob3dfc3VtbWFyeVwiOiBcItCf0L7QutCw0LfRi9Cy0LDRgtGMINGC0L7Qu9GM0LrQviDQutC+0LvQuNGH0LXRgdGC0LLQvlwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJcIjogXCLQt9Cw0L9cIiwgIC8vIHN1YnN0aXR1dGVcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfcGFzc2NvZGVcIjogXCLQktCy0LXQtNGR0L0g0L3QtdCy0LXRgNC90YvQuSDQutC+0LQg0L/QvtGC0LLQtdGA0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVudVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY2x1YnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2Rpc2NpcGxpbmVzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9qdWRnZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2Vfc3BvcnRzbWVuXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQv9C+0YDRgtGB0LzQtdC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV90b3Vyc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGC0YPRgNCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5fcGFydGljaXBhbnRzXCI6IG4gPT4gbi50b1N0cmluZygpICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJuX3Nwb3J0c21lblwiOiBuID0+IG4udG9TdHJpbmcoKSArIFwiINGB0L/QvtGA0YLRgdC80LXQvVwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9uX3BhcnRpY2lwYW50c1wiOiBuID0+IFwi0JjRgtC+0LPQviBcIiArIG4gKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2luZy10YWJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG91ci1hZG1pblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lLXJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlcnJvcnNcIjoge1xyXG4gICAgICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibG9hZF9zeW50YXhfZXJyb3JcIjogXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC00LDQvdC90YvRhVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFwaVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImR1cGxpY2F0ZWRfZXh0ZXJuYWxfaWRcIjogXCLQkiDQtNCw0L3QvdGL0YUg0LjQvNC10Y7RgtGB0Y8g0LfQsNC/0LjRgdC4INGBINC/0L7QstGC0L7RgNGP0Y7RidC40LzQuNC80YHRjyBleHRlcm5hbF9pZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmFibGVfdG9fZ2V0XCI6ICh3YW50ZWQpID0+IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QvtC70YPRh9C40YLRjCBcIiArIHdhbnRlZCArIFwiINC40Lcg0LfQsNC/0YDQvtGB0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LrQu9GD0LEsINC6INC60L7RgtC+0YDQvtC80YMg0L/RgNC40LLRj9C30LDQvdGLINGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX25vbl9lbXB0eVwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSwg0YHQvtC00LXRgNC20LDRidC10LUg0LTQuNGB0YbQuNC/0LvQuNC90YssINC60LvRg9Cx0Ysg0LjQu9C4INGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG9vX21hbnlfdG91cnNcIjogKGQpID0+IFtcItCe0YjQuNCx0LrQsCDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsIGDQkiDQtNC40YHRhtC40L/Qu9C40L3QtSAke2R9INGB0L7QtNC10YDQttC40YLRgdGPINCx0L7Qu9GM0YjQtSDRgtGD0YDQvtCyLCDRh9C10Lwg0YHQvtC30LTQsNC90L4g0LIg0YHQuNGB0YLQtdC80LVgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjaGFuZ2VfanVkZ2VzX3dpdGhfZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0L7RgdGC0LDQsiDRgdGD0LTQtdC5INC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Riywg0YHQvtC00LXRgNC20LDRidC10Lkg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGD0YfQsNGB0YLQvdC40LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3RvdXJzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINGDINC60L7RgNC+0LPQviDQtdGB0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfc2NvcmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVwZWF0aW5nX2p1ZGdlXCI6IChuYW1lKSA9PiBuYW1lICsgXCIg0LLRgdGC0YDQtdGH0LDQtdGC0YHRjyDQsiDRgdC/0LjRgdC60LUg0YHRg9C00LXQuSDQsdC+0LvQtdC1INC+0LTQvdC+0LPQviDRgNCw0LfQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludGVybmFsX3NlcnZlcl9lcnJvclwiOiBbXCLQntGI0LjQsdC60LAg0L3QsCDRgdC10YDQstC10YDQtVwiLCBcItC/0YDQvtCy0LXRgNGM0YLQtSDQu9C+0LPQuCDQtNC70Y8g0LjQvdGE0L7RgNC80LDRhtC40LhcIl0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9kaXNjaXBsaW5lc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINCy0YXQvtC00Y/RidC10LPQviDQsiDRgdGD0LTQtdC50YHQutGD0Y4g0LHRgNC40LPQsNC00YMg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRg9GH0LDRgdGC0L3QuNC60LAsINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INGF0L7RgtGPINCx0Ysg0LIg0L7QtNC90L7QvCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicnVuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2V0X3BlcmZvcm1lZF9mbGFnX29uX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHRgtCw0YLRg9GBINC30LDRhdC+0LTQsCDRhNC40L3QsNC70LjQt9C40L3QvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2NvcmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzY29yZV9ub3RfZXhpc3RcIjogXCLQn9C+0L/Ri9GC0LrQsCDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LUg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQuSDQvtGG0LXQvdC60Lgg0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfb25fZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINC+0YbQtdC90LrRgyDQsiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfYmVmb3JlX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC00L7QsdCw0LLQuNGC0Ywg0L3QvtCy0YvQuSDRgtGD0YAg0L/QtdGA0LXQtCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YLRg9GALCDQv9GA0LjRgdGD0YLRgdGC0LLRg9GO0YnQuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF9maW5haWx6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2FkZF9hZnRlcl9pZFwiOiBcItCf0L7Qv9GL0YLQutCwINC00L7QsdCw0LjRgtGMINGC0YPRgCDQsiDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC1INC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF90b19ub25fZW1wdHlcIjogKGQpID0+IFtcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQs9GA0YPQt9C40YLRjCDRgtGD0YDRiyDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YtcIiwgYNCU0LjRgdGG0LjQv9C70LjQvdCwICR7ZH0g0YPQttC1INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YtgXSxcclxuICAgICAgICAgICAgICAgIFwibmV4dF9pc19maW5haWx6ZWRcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC90LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX25leHRfdG91clwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L/QvtGB0LvQtdC00L3QuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC90LUg0YHQvtC00LXRgNC20LjRgtGB0Y8g0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2X25vdF9maW5haWx6ZWRcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgtGD0YAg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQv9GD0YHRgtC40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidXBkYXRlX2ZpbmFsaXplZFwiOiBcItCU0LvRjyDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwINC90LUg0LTQvtC/0YPRgdC60LDQtdGC0YHRjyDQuNC30LzQtdC90LXQvdC40LUg0LrQstC+0YLRiyDQstGL0LLQvtC00LAsINGC0LjQv9CwINGC0YPRgNCwINC40LvQuCDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkXCI6IFwi0JTQvtCx0LDQstC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG9zZVwiOiBcItCX0LDQutGA0YvRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2VsZWN0X2FsbFwiOiBcItCh0L3Rj9GC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImVkaXRcIjogXCLQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVcIjogXCLQo9C00LDQu9C40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjYXJkXCI6IFwi0J7RgtC80LXQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNhdmVcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2FsbFwiOiBcItCS0YvQsdGA0LDRgtGMINCy0YHQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJtaXRcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJicm93c2VcIjogXCLQntCx0LfQvtGALi4uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3RpbmdcIjogXCLQn9C+0LTQutC70Y7Rh9C10L3QuNC1INC6INGB0LXRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fcHJvYmxlbVwiOiBcItCf0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZXNcIjogXCLQlNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vXCI6IFwi0J3QtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX2Vycm9yXCI6IFwi0J/QvtGF0L7QttC1LCDQuNC80LXRjtGC0YHRjyDQv9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiZXJyb3JfaGVhZGVyXCI6IFwi0J7RiNC40LHQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Y2Nlc3NcIjogXCLQntC/0LXRgNCw0YbQuNGPINGD0YHQv9C10YjQvdC+INC30LDQstC10YDRiNC10L3QsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoZWF0X25cIjogKG4pID0+IFwi0JfQsNGF0L7QtCDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwianVkZ2VfblwiOiAobikgPT4gXCLQm9C40L3QtdC50L3Ri9C5INGB0YPQtNGM0Y8g4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25cIjogKG4sIG5hbWUsIG5fc3ApID0+XHJcbiAgICAgICAgICAgICAgICAgICAgKG5fc3AgPiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQpNC+0YDQvNC10LnRiNC9IOKEllwiICsgbi50b1N0cmluZygpICsgKG5hbWUgPyBcIjogXCIgKyBuYW1lIDogXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAobl9zcCA9PT0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCf0LDRgNCwIOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwi0KPRh9Cw0YHRgtC90LjQuiDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgbi50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnaW5nXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCf0LXRgNC10YHQvtC30LTQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2Fjcm9iYXRpY19vdmVycmlkZVwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF90b3VyXCI6IFwi0J3QsNGH0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQntGB0YLQsNC90L7QstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINC/0YDQvtCz0YDQsNC80LzRgyDQtNC70Y8g0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00Ys/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCx0LDQt9C+0LLRi9GFINC+0YbQtdC90L7QuiDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19pZHhcIjogXCLihJYg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5ld19zY29yZVwiOiBcItCa0L7RgNGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwib2xkX3Njb3JlXCI6IFwi0JHQsNC30LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0JJcIixcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb2RlbHNcIjoge1xyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC70YPQsdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGl2ZVwiOiBcItCQ0LrRgtC40LLQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogXCLQlNCw0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQtNC70Y8g0L/RgNC+0YLQvtC60L7Qu9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV90aXRsZVwiOiBcItCX0LDQs9C+0LvQvtCy0L7QulwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdmFsdWVcIjogXCLQl9C90LDRh9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9iZWdpbm5pbmdcIjogXCLQndCw0YfQsNC70L5cIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2R1cmF0aW9uXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImp1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCLQmtCw0YLQtdCz0L7RgNC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC9LiBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KQuINCYLiDQni5cIixcclxuICAgICAgICAgICAgICAgIFwibnVtYmVyXCI6IFwi0J3QvtC80LXRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyb2xlXCI6IFwi0KDQvtC70Ywg0LIg0YHRg9C00LXQudGB0YLQstC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVfZGVzY3JpcHRpb25cIjogXCLQlNC+0LvQttC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic3BcIjogXCLQn9GA0LjQvtGA0LjRgtC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYXJ0aWNpcGFudFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvbnNcIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0J7RhtC10L3QutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX25hbWVcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHViX2NpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX25hbWVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmaXJzdF9uYW1lXCI6IFwi0JjQvNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlclwiOiBcItCf0L7Qu1wiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5kZXJfZlwiOiBcItCWXCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9tXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZXJhbF9pbmZvXCI6IFwi0J7RgdC90L7QstC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fbmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0LrQvtC80LDQvdC00Ysg0YTQvtGA0LzQtdC50YjQvVwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXN0X25hbWVcIjogXCLQpNCw0LzQuNC70LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByb2dyYW1zXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfblwiOiBcItCe0YHQvS5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV95XCI6IFwi0JfQsNC/LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZWFyX29mX2JpcnRoXCI6IFwi0JPQvtC0INGA0L7QttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwieW9iXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvZ3JhbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfZm9yXCI6IFwi0J/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfcHJvZ3JhbVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX2hvcGVfdG91clwiOiBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwibnVtX2FkdmFuY2VzXCI6IFwi0JrQstC+0YLQsCDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX3Blcl9oZWF0XCI6IFwi0KPRh9Cw0YHRgtC90LjQutC+0LIg0LIg0LfQsNGF0L7QtNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjb3Jpbmdfc3lzdGVtX25hbWVcIjogXCLQodC40YHRgtC10LzQsCDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfaGVhdFwiOiBcItCh0LHRgNC+0YEg0L3QvtC80LXRgNCwINC30LDRhdC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9wbGFjZVwiOiBcItCh0LHRgNC+0YEg0LzQtdGB0YLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VzXCI6IFwi0JzQtdGB0YLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicHJlc2VudGVyXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19hY3RpdmVfdG91clwiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsZV92aWV3XCI6IFwi0KPQv9GA0L7RidC10L3QvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfY29tcGV0aXRpb25cIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICDQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4INC90LDRhdC+0LTQuNGC0YHRjyDQv9C+INCw0LTRgNC10YHRgyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJuZXh0X2hlYXRcIjogXCLQodC70LXQtC4g0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub3RfcGVyZm9ybWVkXCI6IFwi0J3QtdCy0YvRhdC+0LQg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInBlcmZvcm1lZFwiOiBcItCe0YLQvNC10L3QsCDQvdC10LLRi9GF0L7QtNCwINC90LAg0L/Qu9C+0YnQsNC00LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2X2hlYXRcIjogXCLQn9GA0LXQtC4g0LfQsNGF0L7QtFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9zdG9wd2F0Y2hcIjogXCLQodCx0YDQvtGBXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X3N0b3B3YXRjaFwiOiBcItCh0YLQsNGA0YJcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF9zdG9wd2F0Y2hcIjogXCLQodGC0L7Qv1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQl9Cw0LLQtdGA0YjQuNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCf0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDINGC0YPRgNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvX3N0YXJ0X3BhZ2VcIjogXCLQndCwINCz0LvQsNCy0L3Rg9GOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7RgdGC0LDQvdC+0LLQuNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJfYW5kX3N0YXJ0X25leHRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRgz9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwIOKEllwiICsgKG4gKyAxKSxcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicHJlc2VudGVyXCI6IFwi0JLQtdC00YPRidC40LlcIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X3BhZ2VcIjogXCLQodGC0YDQsNC90LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub3RfanVkZ2luZ19kaXNjaXBsaW5lXCI6IFwi0JLRiyDQvdC1INGD0YfQsNGB0YLQstGD0LXRgtC1INCyINGB0YPQtNC10LnRgdGC0LLQtSDQtNCw0L3QvdC+0Lkg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfcGFydGljaXBhbnRcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfdG91clwiOiBcItCS0Ysg0L3QtSDQvtGG0LXQvdC40LLQsNC10YLQtSDRjdGC0L7RgiDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1pbmdcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjdGlvbnNcIjogXCLQlNC10LnRgdGC0LLQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImRhbmNlXCI6IFwi0KLQsNC90LXRhlwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG5cclxuICAgICAgICBcInNjb3Jpbmdfc3lzdGVtc1wiOiB7XHJcbiAgICAgICAgICAgIFwicm9zZmFyclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInRhYmxldFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMzApXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY29tcG9zaXRpb25cIjogXCLQmtC+0LzQv9C+0LfQuNGG0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2ZpZ3NcIjogXCLQotCw0L3RhtC10LLQsNC70YzQvdGL0LUg0YTQuNCz0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfdGVjaFwiOiBcItCi0LXRhdC90LjQutCwINGC0LDQvdGG0LXQstCw0L3QuNGPXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9mYWxsX2Rvd25cIjogXCLQn9Cw0LTQtdC90LjRjyAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9taXN0YWtlc1wiOiBcItCe0YjQuNCx0LrQuCAoLTIpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm9ybV9zbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fYmlnX21pc3Rha2VzXCI6IFwi0JHQvtC70YzRiNC40LUg0L7RiNC40LHQutC4ICgtMylcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19tYW5cIjogXCLQntGB0L3QvtCy0L3QvtC5INGF0L7QtCwg0L/QsNGA0YLQvdGR0YAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3dvbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGA0YjQsCAo0YHQsdCw0LLQutCwINCyICUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaW1wcmVzc2lvblwiOiBcItCe0LHRidC10LUg0LLQv9C10YfQsNGC0LvQtdC90LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBvaW50c1wiOiBcItCe0YbQtdC90LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtYWxsX21pc3Rha2VzXCI6IFwi0JzQsNC70LXQvdGM0LrQuNC1INC+0YjQuNCx0LrQuCAoLTUpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNfb3ZlcnJpZGVzXCI6IFwi0JrQvtGA0YDQtdC60YLQuNGA0L7QstC60Lgg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJibGFja19jYXJkXCI6IFwiLTEwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlX3Njb3Jlc1wiOiBcItCe0YbQtdC90LrQuCDQu9C40L3QtdC50L3Ri9GFINGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJva1wiOiBcIk9LXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVuYWx0eV90eXBlXCI6IFwi0KjRgtGA0LDRhNC90YvQtSDRgdCw0L3QutGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInByZXZpb3VzX3BlbmFsdGllc1wiOiBcItCf0YDQtdC00YvQtNGD0YnQuNC1INGI0YLRgNCw0YTRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlZF9jYXJkXCI6IFwiLTMwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwieWVsbG93X2NhcmRcIjogXCItM1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1feWVsbG93X2NhcmRcIjogXCItNVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fcmVkX2NhcmRcIjogXCItMTVcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwidGVjaF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwianVtcF9zdGVwc1wiOiBcItCe0YHQvdC+0LLQvdGL0LUg0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXNldF90b19uXCI6IChuKSA9PiBcItCh0LHRgNC+0YEg0L3QsCBcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0aW1pbmdcIjogXCLQlNC70LjRgtC10LvRjNC90L7RgdGC0YxcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJicmVha2Rvd25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFcIjogXCJBXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb19uXCI6IChuKSA9PiBcIkFcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJibVwiOiBcItCR0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjXCI6IFwi0JpcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkZlwiOiBcItCi0KRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkdFwiOiBcItCiVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZkXCI6IFwi0J9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmbVwiOiBcItCe0KXQvFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3XCI6IFwi0J7QpdC2XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiaVwiOiBcItCe0JJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJtXCI6IFwi0J7RiFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBcIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNtXCI6IFwi0JzQnlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRcIjogXCLOo1wiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfYWR2YW5jZWRcIjogXCLQn9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfYWR2YW5jZWRcIjogXCLQndC1INC/0YDQvtGI0LvQuCDQsiDRgdC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX25vdF9wZXJmb3JtZWRcIjogXCLQndC1INCy0YvRgdGC0YPQv9Cw0LvQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0LDQutGA0L5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzX3ZlcmJvc2VcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsCAo0LfQsNGP0LLQutCwL9GE0LDQutGCKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNhcmRcIjogXCLQqNGC0YDQsNGEXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfc2NvcmVcIjogXCLQoNC10LfRg9C70YzRgtCw0YIg0KLQnVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlX3Nob3J0XCI6IFwi0KLQnVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImluZm9cIjogXCLQo9GH0LDRgdGC0L3QuNC6LCDRgNC10LfRg9C70YzRgtCw0YJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJuZXh0X3RvdXJcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibm90X3BlcmZvcm1lZFwiOiBcItCd0LUg0L/RgNC40L3QuNC80LDQuyDRg9GH0LDRgdGC0LjQtVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcIuKEllwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NsdWJcIjogXCLQmtC70YPQsVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X2NvYWNoZXNcIjogXCLQotGA0LXQvdC10YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGVuYWx0eVwiOiBcItCo0YLRgNCw0YQg0LPQu9Cw0LLQvdC+0LPQviDRgdGD0LTRjNC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQnNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC90YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzcG9ydHNtZW5feWVhcl9vZl9iaXJ0aFwiOiBcItCTLtGALlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0JjRgtC+0LNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNfbmFtZXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsINCw0LrRgNC+0LHQsNGC0LjRh9C10YHQutC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYW1fZmluYWxfZndcIjogXCLQoNC+0YHQpNCQ0KDQoCwgQSDQuCBNINC60LvQsNGB0YHRiywg0YTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvblwiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INCx0LXQtyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRhNC+0YDQvNC10LnRiNC9INGBINCw0LrRgNC+0LHQsNGC0LjQutC+0LlcIixcclxuICAgICAgICAgICAgICAgIFwibm9fYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDRgtCw0L3RhtC10LLQsNC70YzQvdGL0LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsaWZpZWRcIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YPQv9GA0L7RidC10L3QvdCw0Y8g0YHQuNGB0YLQtdC80LAgKDHigJM0MClcIixcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnZV9yb2xlc1wiOiB7XHJcbiAgICAgICAgICAgIFwiXCI6IFwiLVwiLFxyXG4gICAgICAgICAgICBcImFjcm9fanVkZ2VcIjogXCLQodGD0LTRjNGPINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjogXCLQodGD0LTRjNGPINGC0LDQvdGG0LBcIixcclxuICAgICAgICAgICAgXCJoZWFkX2p1ZGdlXCI6IFwi0JPQu9Cw0LLQvdGL0Lkg0YHRg9C00YzRj1wiLFxyXG4gICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YXQvdC40YfQtdGB0LrQuNC5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICB9LFxyXG4gICAgfTtcclxuICAgIGxldCBwYXRoID0gc3JjLnNwbGl0KFwiLlwiKTtcclxuICAgIGxldCBwaHJhc2VfcHRyID0gUEhSQVNFUztcclxuICAgIHBhdGguZm9yRWFjaCgoY2h1bmspID0+IHBocmFzZV9wdHIgPSBwaHJhc2VfcHRyW2NodW5rXSk7XHJcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwidW5kZWZpbmVkXCIpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKFwiVW5hYmxlIHRvIGZpbmQgdHJhbnNsYXRpb24gZm9yIFwiICsgc3JjKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZW9mIHBocmFzZV9wdHIgPT09IFwiZnVuY3Rpb25cIikge1xyXG4gICAgICAgIGxldCBhcmdzID0gW107XHJcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcclxuICAgICAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpZHhdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHBocmFzZV9wdHIoLi4uYXJncyk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gcGhyYXNlX3B0cjtcclxufVxyXG5cclxuZXhwb3J0IHZhciBnZXRQb3NzaWJsZVRvdXJOYW1lcyA9ICgpID0+IFtcclxuICAgIFwi0KTQuNC90LDQu1wiLFxyXG4gICAgXCLQotGD0YAgwqvQndCw0LTQtdC20LTRi8K7XCIsXHJcbiAgICBcItCe0YLQsdC+0YDQvtGH0L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgXCIxLzIg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvNCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS84INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzE2INGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCLQpNC40L3QsNC7LCDRgtC10YXQvdC40LrQsCDQvdC+0LNcIixcclxuICAgIFwi0KTQuNC90LDQuywg0LDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuXTtcclxuIiwiaW1wb3J0IHsgSnVkZ2UgfSBmcm9tIFwiY2xpZW50cy9qdWRnZS9tYWluXCI7XG5cblxuUmVhY3RET00ucmVuZGVyKFxuICAgIDxKdWRnZSB7IC4uLndpbmRvdy5wYWdlX3Byb3BzIH0gLz4sXG4gICAgd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29udGVudFwiKVxuKTtcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcbmltcG9ydCB7IHNob3dFcnJvciB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5cblxuY2xhc3MgQXBpSW1wbCB7XG4gICAgY29uc3RydWN0b3IobWV0aG9kLCBkYXRhKSB7XG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSAoKSA9PiB7fTtcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IChtc2csIGNvZGUsIGFyZ3MpID0+IHNob3dFcnJvcihjb2RlID8gXyhjb2RlLCAuLi5hcmdzKSA6IG1zZyk7XG4gICAgICAgIHRoaXMuY2JfZmFpbCA9ICguLi5kYXRhKSA9PiBjb25zb2xlLmVycm9yKFwiQVBJIGZhaWxcIiwgLi4uZGF0YSk7XG4gICAgICAgIHRoaXMuY2JfZG9uZSA9ICgpID0+IHt9O1xuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9ICgpID0+IHt9O1xuICAgIH1cbiAgICBvbkRvbmUoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYl9kb25lID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvblN1Y2Nlc3MoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gY2FsbGJhY2s7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBvbkVycm9yKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuY2JfZXJyb3IgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIG9uRmFpbChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmNiX2ZhaWwgPSBjYWxsYmFjaztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGFkZFRvREIobW9kZWxfdHlwZSwgbW9kZWxfaWQsIHN0PXN0b3JhZ2UpIHtcbiAgICAgICAgdGhpcy51cGRhdGVfZGIgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgc3QuZ2V0KG1vZGVsX3R5cGUpLmFkZChtb2RlbF9pZCwgcmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZW5kKCkge1xuICAgICAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBcIi9hcGlcIiwgdHJ1ZSk7XG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzICE9PSAyMDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZV9kYihyZXNwb25zZS5yZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jYl9zdWNjZXNzKHJlc3BvbnNlLnJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYl9lcnJvcihyZXNwb25zZS5tZXNzYWdlLCByZXNwb25zZS5jb2RlLCByZXNwb25zZS5hcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgeGhyLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcbiAgICAgICAgICAgIHRoaXMuY2JfZmFpbCgpO1xuICAgICAgICB9O1xuICAgICAgICBsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgICAgICBkYXRhLmFwcGVuZChcImNsaWVudF9pZFwiLCB3aW5kb3cuY2xpZW50X2lkKTtcbiAgICAgICAgZGF0YS5hcHBlbmQoXCJkYXRhXCIsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xuICAgICAgICBkYXRhLmFwcGVuZChcIm1ldGhvZFwiLCB0aGlzLm1ldGhvZCk7XG4gICAgICAgIHhoci5zZW5kKGRhdGEpO1xuICAgIH1cbn1cblxuZXhwb3J0IHZhciBBcGkgPSAoLi4uYXJncykgPT4gbmV3IEFwaUltcGwoLi4uYXJncyk7XG4iLCJpbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IGNvbm5lY3Rpb25fc3RhdHVzIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlRGlzcGF0Y2hlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNfY250ID0gMDtcclxuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcclxuICAgIH1cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIHdlYnNvY2tldC4uLlwiKTtcclxuICAgICAgICB0aGlzLndzID0gbmV3IFNvY2tKUyhcImh0dHA6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvd3NcIik7XHJcbiAgICAgICAgdGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0T2soKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQuXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbW1wicmVsb2FkX2RhdGFcIiwgbnVsbF1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbF91cGRhdGVzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0RmFpbCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gY2xvc2VkLlwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY29ubmVjdC5iaW5kKHRoaXMpLCA1MDApO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbk1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhW1wiY2xpZW50X2lkXCJdKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGllbnRfaWQgPSBkYXRhW1wiY2xpZW50X2lkXCJdO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEubWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBtc2dfdHlwZSA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgIGxldCBtc2dfZGF0YSA9IGRhdGFbMV07XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge307XHJcbiAgICAgICAgICAgIGlmIChtc2dfdHlwZSA9PT0gXCJmb3JjZV9yZWZyZXNoXCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9KS5mb3JFYWNoKChrZXkpID0+IGxpc3RlbmVyc1trZXldKG1zZ19kYXRhKSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgZGF0YS5tb2RlbF91cGRhdGVzLmZvckVhY2goKG1vZGVsX2luZm8pID0+IHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gc3RvcmFnZS51cGRhdGVNb2RlbChtb2RlbF9pbmZvLm1vZGVsLCBtb2RlbF9pbmZvLmlkLCBtb2RlbF9pbmZvLmRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZGF0YV9jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tcImRiX3VwZGF0ZVwiXSB8fCB7fTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldExpc3RlbmVySWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzX2NudCsrO1xyXG4gICAgfVxyXG4gICAgYWRkTGlzdGVuZXIobXNnX3R5cGVzLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuZ2V0TGlzdGVuZXJJZCgpO1xyXG4gICAgICAgIG1zZ190eXBlcy5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihtc2dfdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW21zZ190eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdW2lkXSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJfaWQpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW2tleV1bbGlzdGVuZXJfaWRdO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgbWVzc2FnZV9kaXNwYXRjaGVyID0gbmV3IE1lc3NhZ2VEaXNwYXRjaGVyKCk7XHJcbiIsImNsYXNzIFJlZiB7XG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSwgaWQpIHtcbiAgICAgICAgdGhpcy5tb2RlbF9uYW1lID0gbW9kZWxfbmFtZTtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xuICAgIH1cbiAgICBnZXQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuZ2V0KHRoaXMubW9kZWxfbmFtZSkuYnlfaWQodGhpcy5pZCk7XG4gICAgfVxufVxuXG5jbGFzcyBNb2RlbCB7XG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgaWQsIG1vZGVsX3N0b3JhZ2UpIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLl9fc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXMgPSB7fTtcbiAgICAgICAgdGhpcy5fX21vZGVsX3N0b3JhZ2UgPSBtb2RlbF9zdG9yYWdlO1xuICAgIH1cbiAgICBhZGRCYWNrUmVmKGtleSwgcmVmKSB7XG4gICAgICAgIHRoaXNba2V5XSA9IHJlZjtcbiAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XG4gICAgfVxuICAgIHVwZGF0ZShkYXRhLCBjcmVhdGU9dHJ1ZSkge1xuICAgICAgICBmb3IgKGxldCBpZHggaW4gZGF0YSkgaWYgKGRhdGEuaGFzT3duUHJvcGVydHkoaWR4KSkge1xuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiIHx8IGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjcmVhdGUgJiYgdHlwZW9mIHRoaXNbaWR4LnNsaWNlKDEpXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCIqXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IFtdXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgdGhpcy5fX21vZGVsX3N0b3JhZ2UubW9kZWxfbmFtZSwgdGhpcy5pZCk7XG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmX2tleSA9IGRhdGFbaWR4XS5iYWNrX3JlZjtcbiAgICAgICAgICAgICAgICBkYXRhW2lkeF0uY2hpbGRyZW4uZm9yRWFjaChmdW5jdGlvbihuZXN0ZWRfZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhLmRhdGEgPT09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsZXQgcmVmID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcbiAgICAgICAgICAgICAgICAgICAgcmVmLmdldCgpLmFkZEJhY2tSZWYoYmFja19yZWZfa2V5LCBiYWNrX3JlZik7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XS5wdXNoKHJlZik7XG4gICAgICAgICAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIipcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaWR4LmNoYXJBdCgwKSA9PT0gXCJeXCIpIHtcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xuICAgICAgICAgICAgICAgIGxldCBuZXN0ZWRfZGF0YSA9IGRhdGFbaWR4XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG5lc3RlZF9kYXRhID09PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gbmV3IFJlZih0aGlzLl9fc3RvcmFnZSwgbmVzdGVkX2RhdGEubW9kZWwsIG5lc3RlZF9kYXRhLmlkKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIl5cIjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpc1tpZHhdID0gZGF0YVtpZHhdO1xuICAgICAgICAgICAgICAgIHRoaXMuX19rZXlfdHlwZXNbaWR4XSA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2VyaWFsaXplKHNjaGVtYSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0ge31cbiAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX19rZXlfdHlwZXMpIGlmICh0aGlzLl9fa2V5X3R5cGVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fX2tleV90eXBlc1trZXldKSB7XG4gICAgICAgICAgICBjYXNlIFwiKlwiOlxuICAgICAgICAgICAgICAgIGlmIChrZXkgaW4gc2NoZW1hKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLm1hcChmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZWYuZ2V0KCkuc2VyaWFsaXplKHNjaGVtYVtrZXldKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBcIl5cIjpcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXNba2V5XS5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzW2tleV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmVzdWx0LmlkID0gdGhpcy5pZFxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cblxuY2xhc3MgTW9kZWxzU3RvcmFnZSB7XG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgbW9kZWxfbmFtZSkge1xuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xuICAgICAgICB0aGlzLm1vZGVscyA9IHt9O1xuICAgICAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xuICAgIH1cbiAgICBhZGQoaWQsIGRhdGEpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsc1tpZF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXSA9IG5ldyBNb2RlbCh0aGlzLnN0b3JhZ2UsIGlkLCB0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1vZGVsc1tpZF0udXBkYXRlKGRhdGEpO1xuICAgIH1cbiAgICB1cGRhdGUoaWQsIGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZWxzW2lkXSkge1xuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhLCBmYWxzZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGJ5X2lkKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tpZF07XG4gICAgfVxuICAgIGFsbCgpIHtcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1vZGVscyk7XG4gICAgICAgIHJldHVybiBrZXlzLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1trZXldO1xuICAgICAgICB9LmJpbmQodGhpcykpXG4gICAgfVxufVxuXG5jbGFzcyBTdG9yYWdlIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlcyA9IHt9XG4gICAgICAgIHRoaXMuZG9tYWlucyA9IHt9XG4gICAgfVxuICAgIGdldERvbWFpbihkb21haW4pIHtcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRvbWFpbnNbZG9tYWluXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5kb21haW5zW2RvbWFpbl0gPSBuZXcgU3RvcmFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmRvbWFpbnNbZG9tYWluXTtcbiAgICB9XG4gICAgZGVsRG9tYWluKGRvbWFpbikge1xuICAgICAgICBkZWxldGUgdGhpcy5kb21haW5zW2RvbWFpbl07XG4gICAgfVxuICAgIGdldChtb2RlbF9uYW1lKSB7XG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXSA9IG5ldyBNb2RlbHNTdG9yYWdlKHRoaXMsIG1vZGVsX25hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xuICAgIH1cbiAgICBkZWwobW9kZWxfbmFtZSkge1xuICAgICAgICBkZWxldGUgdGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF9uYW1lXTtcbiAgICB9XG4gICAgdXBkYXRlTW9kZWwobW9kZWxfdHlwZSwgbW9kZWxfaWQsIGRhdGEpIHtcbiAgICAgICAgbGV0IGRhdGFfY2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICBpZiAodGhpcy5tb2RlbF9zdG9yYWdlc1ttb2RlbF90eXBlXSkge1xuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCBkYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5kb21haW5zKS5mb3JFYWNoKChrZXkpID0+XG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmRvbWFpbnNba2V5XS51cGRhdGVNb2RlbCguLi5hcmd1bWVudHMpIHx8IGRhdGFfY2hhbmdlZCk7XG4gICAgICAgIC8vIHJldHVybiBkYXRhX2NoYW5nZWQ7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn1cblxuZXhwb3J0IHZhciBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoKVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBMb2FkZXIgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIHJldHVybiA8dGFibGUgc3R5bGU9e3sgXCJoZWlnaHRcIjogXCIxMDAlXCIsIFwid2lkdGhcIjogXCIxMDAlXCIgfX0+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgPHRkIHN0eWxlPXt7IFwidGV4dEFsaWduXCI6IFwiY2VudGVyXCIgfX0+XHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIi9zdGF0aWMvaW1nL2FqYXgtbG9hZGVyLmdpZlwiIC8+XHJcbiAgICAgICAgICAgIDwvdGQ+XHJcbiAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIENvbm5lY3Rpb25TdGF0dXNNb2NrIHtcclxuICAgIHNldE9rKCkge31cclxuICAgIHNldEZhaWwoKSB7fVxyXG59XHJcblxyXG5jbGFzcyBDb25uZWN0aW9uU3RhdHVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgICAgICAgIFwiY29ubmVjdGVkXCI6IG51bGwsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgaW5pdCgpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbm5lY3Rpb25fc3RhdHVzXCIpO1xyXG4gICAgICAgIGlmIChlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBSZWFjdERPTS5yZW5kZXIoXHJcbiAgICAgICAgICAgICAgICA8Q29ubmVjdGlvblN0YXR1cyAvPixcclxuICAgICAgICAgICAgICAgIGVsZW1lbnRcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBDb25uZWN0aW9uU3RhdHVzTW9jaygpO1xyXG4gICAgfVxyXG4gICAgc3RhcnRJbnRlcnZhbCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pbnRlcnZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XHJcbiAgICAgICAgICAgICAgICB0aWNrOiAhdGhpcy5zdGF0ZS50aWNrLFxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA3NTApO1xyXG4gICAgfVxyXG4gICAgc3RvcEludGVydmFsKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pbnRlcnZhbCkge1xyXG4gICAgICAgICAgICByZXR1cm5cclxuICAgICAgICB9XHJcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmludGVydmFsKTtcclxuICAgICAgICB0aGlzLmludGVydmFsID0gbnVsbDtcclxuICAgIH1cclxuICAgIHNldE9rKCkge1xyXG4gICAgICAgIHRoaXMuc3RvcEludGVydmFsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3RlZDogdHJ1ZSwgdGljazogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICBzZXRGYWlsKCkge1xyXG4gICAgICAgIHRoaXMuc3RhcnRJbnRlcnZhbCgpO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBjb25uZWN0ZWQ6IGZhbHNlIH0pO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3RlZCkge1xyXG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJjb25uZWN0aW9uLXN0YXR1cyBva1wiPjwvZGl2PlxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5jb25uZWN0ZWQgPT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29ubmVjdGlvbi1zdGF0dXMgYWxlcnQtd2FybmluZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5sYWJlbHMuY29ubmVjdGluZ1wiKSB9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17IFwiY29ubmVjdGlvbi1zdGF0dXMgYWxlcnQtZGFuZ2VyXCIgKyAodGhpcy5zdGF0ZS50aWNrID8gXCIgdGlja1wiIDogXCJcIikgfT5cclxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJnbG9iYWwubGFiZWxzLmNvbm5lY3Rpb25fcHJvYmxlbVwiKSB9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIClcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBjb25uZWN0aW9uX3N0YXR1cyA9IENvbm5lY3Rpb25TdGF0dXMuaW5pdCgpO1xyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dFcnJvcihtc2cpIHtcbiAgICBsZXQgdGl0bGUgPSAodHlwZW9mIG1zZyA9PT0gXCJvYmplY3RcIikgPyBtc2dbMF0gOiBfKFwiZ2xvYmFsLm1lc3NhZ2VzLmVycm9yX2hlYWRlclwiKTtcbiAgICBsZXQgdGV4dCA9ICh0eXBlb2YgbXNnID09PSBcIm9iamVjdFwiKSA/IG1zZ1sxXSA6IG1zZztcbiAgICBzd2FsKHtcbiAgICAgICAgdGl0bGU6IHRpdGxlLFxuICAgICAgICB0ZXh0OiB0ZXh0LFxuICAgICAgICB0eXBlOiBcImVycm9yXCIsXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG93Q29uZmlybShtZXNzYWdlLCBhY3Rpb24sIGNsb3NlX29uX2NvbmZpcm09ZmFsc2UpIHtcbiAgICByZXR1cm4gc3dhbCh7XG4gICAgICAgIHRpdGxlOiBtZXNzYWdlLFxuICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICBzaG93Q2FuY2VsQnV0dG9uOiB0cnVlLFxuICAgICAgICBjb25maXJtQnV0dG9uVGV4dDogXyhcImdsb2JhbC5sYWJlbHMueWVzXCIpLFxuICAgICAgICBjYW5jZWxCdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy5ub1wiKSxcbiAgICAgICAgY2xvc2VPbkNvbmZpcm06IGNsb3NlX29uX2NvbmZpcm0sXG4gICAgfSwgYWN0aW9uKTtcbn1cbiIsImV4cG9ydCBjbGFzcyBQcmludGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaGVhZGVyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdGl0bGUxOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdGl0bGUyOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgdGl0bGUzOiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgYm9keTogUmVhY3QuUHJvcFR5cGVzLm5vZGUuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBmZXRjaFByaW50YWJsZURhdGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ib2R5LmlubmVySFRNTDtcbiAgICB9XG4gICAgcmVuZGVySGVhZGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5oZWFkZXIgPyA8ZGl2IGNsYXNzTmFtZT1cInAtaGVhZGVyXCI+eyB0aGlzLnByb3BzLmhlYWRlciB9PC9kaXY+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUxKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTEgPyA8aDE+eyB0aGlzLnByb3BzLnRpdGxlMSB9PC9oMT4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMiA/IDxoMj57IHRoaXMucHJvcHMudGl0bGUyIH08L2gyPiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUzID8gPGgzPnsgdGhpcy5wcm9wcy50aXRsZTMgfTwvaDM+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyQm9keSgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJwLWNvbnRlbnRcIlxuICAgICAgICAgICAgICAgIHJlZj17IGUgPT4gdGhpcy5fYm9keSA9IGUgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5ib2R5IH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwicHJpbnRhYmxlXCI+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVySGVhZGVyKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMSgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTIoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUzKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckJvZHkoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gb25Ub3VjaE9yQ2xpY2soaGFuZGxlcikge1xuICAgIGxldCBmID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBoYW5kbGVyKGV2ZW50KTtcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICAgIG9uVG91Y2hTdGFydDogZixcbiAgICAgICAgb25DbGljazogZixcbiAgICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvblRvdWNoRW5kT3JDbGljayhoYW5kbGVyLCBwcmV2ZW50X2RlZmF1bHQpIHtcbiAgICBsZXQgX2hhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICBsZXQgZGlzdGFuY2UgPSAwO1xuICAgIGxldCBsYXRlc3RfcG9zID0gWzAsIDBdO1xuICAgIGxldCBmaXJlID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBfaGFuZGxlcigpO1xuICAgIH1cbiAgICBsZXQgZGlzY2FyZCA9ICgpID0+IHtcbiAgICAgICAgX2hhbmRsZXIgPSAoKSA9PiB7fTtcbiAgICB9XG4gICAgbGV0IG1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgbGV0IGN1cnJlbnRfcG9zID0gW2V2ZW50LnRvdWNoZXNbMF0ucGFnZVgsIGV2ZW50LnRvdWNoZXNbMF0ucGFnZVldO1xuICAgICAgICBsZXQgc3FyID0gKHgpID0+IHggKiB4O1xuICAgICAgICBkaXN0YW5jZSArPSBNYXRoLnNxcnQoc3FyKGN1cnJlbnRfcG9zWzBdIC0gbGF0ZXN0X3Bvc1swXSkgKyBzcXIoY3VycmVudF9wb3NbMV0gLSBsYXRlc3RfcG9zWzFdKSk7XG4gICAgICAgIGxhdGVzdF9wb3MgPSBjdXJyZW50X3BvcztcbiAgICAgICAgaWYgKGRpc3RhbmNlID4gMjApIHtcbiAgICAgICAgICAgIGRpc2NhcmQoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBsZXQgc3RhcnQgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgX2hhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICBkaXN0YW5jZSA9IDA7XG4gICAgICAgIGxhdGVzdF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIG9uVG91Y2hTdGFydDogc3RhcnQsXG4gICAgICAgIG9uVG91Y2hFbmQ6IGZpcmUsXG4gICAgICAgIG9uVG91Y2hNb3ZlOiBtb3ZlLFxuICAgICAgICBvblRvdWNoQ2FuY2VsOiBkaXNjYXJkLFxuICAgICAgICBvbkNsaWNrOiBoYW5kbGVyLFxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFNsaWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBkb25lOiBSZWFjdC5Qcm9wVHlwZXMuYm9vbCxcbiAgICAgICAgICAgIGRvbmVUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgc2xpZGVUZXh0OiBSZWFjdC5Qcm9wVHlwZXMuc3RyaW5nLFxuICAgICAgICAgICAgb25BY3RpdmF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgZmluaXNoZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLnBpbiA9IG51bGw7XG4gICAgfVxuICAgIGNvbXBvbmVudFdpbGxVcGRhdGUobmV4dFByb3BzKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5kb25lICYmIG5leHRQcm9wcy5kb25lKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpc0ZyZWUoKSB7XG4gICAgICAgIHJldHVybiAhdGhpcy5zdGF0ZS50b3VjaCAmJiAhdGhpcy5wcm9wcy5kb25lICYmICF0aGlzLnN0YXRlLmZpbmlzaGVkO1xuICAgIH1cbiAgICBnZXRPdXRlclRleHRPcGFjaXR5KCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHZhbHVlID0gTWF0aC5taW4oTWF0aC5tYXgoMTAwIC0gdGhpcy5zdGF0ZS5wb3NpdGlvbiwgMCksIDEwMCk7XG4gICAgICAgIHJldHVybiAodmFsdWUgLyAxMDApLnRvRml4ZWQoMyk7XG4gICAgfVxuICAgIGdldEVsZW1lbnRPZmZzZXQoZWxlbWVudCkge1xuICAgICAgICBsZXQgcmVzID0gMDtcbiAgICAgICAgd2hpbGUgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHJlcyArPSBlbGVtZW50Lm9mZnNldExlZnQgfHwgMDtcbiAgICAgICAgICAgIGVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgZ2V0VG91Y2goZXZlbnQpIHtcbiAgICAgICAgbGV0IHRvdWNoID0gZXZlbnQudG91Y2hlc1swXTtcbiAgICAgICAgbGV0IHBhcmVudCA9IGV2ZW50LnRhcmdldC5wYXJlbnROb2RlO1xuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcbiAgICB9XG4gICAgZ2V0UmVsYXRpdmVUb3VjaChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICByZXR1cm4gdG91Y2gucGFnZVggLSB0aGlzLmdldEVsZW1lbnRPZmZzZXQocGFyZW50KTtcbiAgICB9XG4gICAgZ2V0U2xpZGVyUG9zKGV2ZW50KSB7XG4gICAgICAgIGxldCBwb3MgPSB0aGlzLmdldFRvdWNoKGV2ZW50KSAtIHRoaXMucGluO1xuICAgICAgICByZXR1cm4gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgMjAwKTtcbiAgICB9XG4gICAgb25DbGljayhldmVudCkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2lzaW9uOiAyMDAsXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xuICAgIH1cbiAgICBvblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5waW4gPSB0aGlzLmdldFJlbGF0aXZlVG91Y2goZXZlbnQpO1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBvc2l0aW9uOiB0aGlzLmdldFNsaWRlclBvcyhldmVudCksXG4gICAgICAgICAgICB0b3VjaDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIG9uVG91Y2hFbmQoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucG9zaXRpb24gPT09IDIwMCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICAgICAgZmluaXNoZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uQWN0aXZhdGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwic2xpZGVyIG5vc2VsZWN0XCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17XCJpbm5lclwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKX1cbiAgICAgICAgICAgICAgICBzdHlsZT17eyBsZWZ0OiAodGhpcy5wcm9wcy5kb25lIHx8IHRoaXMuc3RhdGUuZmluaXNoZWQpID8gXCIyMDBweFwiIDogdGhpcy5zdGF0ZS5wb3NpdGlvbiArIFwicHhcIiB9fVxuICAgICAgICAgICAgICAgIG9uVG91Y2hTdGFydD17IHRoaXMub25Ub3VjaFN0YXJ0LmJpbmQodGhpcykgfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsgdGhpcy5vblRvdWNoTW92ZS5iaW5kKHRoaXMpIH1cbiAgICAgICAgICAgICAgICBvblRvdWNoRW5kPXsgdGhpcy5vblRvdWNoRW5kLmJpbmQodGhpcykgfVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyB0aGlzLm9uQ2xpY2suYmluZCh0aGlzKSB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAg4oaSXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lXG4gICAgICAgICAgICAgICAgPyA8c3BhblxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCJyZ2IoMTAwLDEwMCwxMDApXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJkb25lLXRleHRcIiB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVRleHQgfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA6IDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcInJnYmEoMTAwLDEwMCwxMDAsXCIgKyB0aGlzLmdldE91dGVyVGV4dE9wYWNpdHkoKSArIFwiKVwiIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwic2xpZGUtdGV4dFwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2xpZGVUZXh0IH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgVGFibGV0U2VsZWN0b3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGNob2ljZXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJvd19zaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0QnV0dG9uc0NvdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvd19zaXplO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNob2ljZXMubGVuZ3RoO1xuICAgIH1cbiAgICBvbkNsaWNrKG4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKG4pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9wcy5jaG9pY2VzLmZvckVhY2goKGVsLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBlbFswXTtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZWxbMV07XG4gICAgICAgICAgICBsZXQgYWN0aXZlX2NsYXNzX25hbWUgPSAodGhpcy5wcm9wcy5hY3RpdmUgPT09IGtleSkgPyBcIiBhY3RpdmVcIiA6IFwiXCI7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17IGtleSB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uQ2xpY2suYmluZCh0aGlzLCBrZXkpKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJ0YnRuIHNjb3JlLWJ0blwiICsgYWN0aXZlX2NsYXNzX25hbWUgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIiAmJiAoaWR4ICsgMSkgJSB0aGlzLnByb3BzLnJvd19zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goPGJyIGtleT17IFwiYnJcIiArIGlkeCB9IC8+KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGxheW91dF9jbGFzcyA9ICh0aGlzLnByb3BzLnN0eWxlICE9PSBcInR3by1saW5lc1wiKSA/IFwic2VsZWN0b3ItbGF5b3V0XCIgOiBcInNlbGVjdG9yLWxheW91dC0ycm93c1wiO1xuICAgICAgICBsZXQgc2VsZWN0ZWRfY2xhc3MgPSB0aGlzLnByb3BzLmFjdGl2ZSA9PT0gbnVsbCA/IFwiXCIgOiBcIiBzZWxlY3RlZFwiXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJzY29yaW5nLWxheW91dCBcIiArIGxheW91dF9jbGFzcyArIHNlbGVjdGVkX2NsYXNzICsgXCIgbi1cIiArIHRoaXMuZ2V0QnV0dG9uc0NvdW50KCkudG9TdHJpbmcoKSB9PnsgcmVzdWx0IH08L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSBtaW47IGlkeCA8PSBtYXg7ICsraWR4KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChbaWR4LCBpZHgudG9TdHJpbmcoKV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRQb2ludDVTZWxlY3RJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjcmVhdGVBcnJheShtaW4sIG1heCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGlkeCA9IE1hdGgucm91bmQoMiAqIG1pbik7IGlkeCA8PSBNYXRoLnJvdW5kKDIgKiBtYXgpOyArK2lkeCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCAvIDIsIChpZHggJSAyKSA/IChpZHggLyAyKS50b0ZpeGVkKDEpIDogTWF0aC5mbG9vcihpZHggLyAyKS50b1N0cmluZygpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5jcmVhdGVBcnJheSh0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpIH1cbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxldEludGVnZXJJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTWludXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAtMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgLSAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblBsdXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAxfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWludGVnZXItaW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRQb2ludDVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTWludXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAtMC41fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSAtIDAuNSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25QbHVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMC41fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSArIDAuNSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtaW50ZWdlci1pbnB1dFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tbWludXNcIlxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbk1pbnVzLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnZhbHVlIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblBsdXMuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICArXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxudmFyIHN0b3B3YXRjaGVzID0ge307XG5cbmV4cG9ydCBjbGFzcyBTdG9wV2F0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmVfaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVfaWRdIHx8IHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIHN0cl92YWx1ZTogXCIwOjAwXCIsXG4gICAgICAgICAgICBpbnRlcnZhbDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIDEwKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlyZWN0LW11dGF0aW9uLXN0YXRlXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVfaWRdID0gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgbm93KCkge1xuICAgICAgICByZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICB9XG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZSA/IHRoaXMuc3RvcCgpIDogdGhpcy5zdGFydCgpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICBzdGFydF9hdDogdGhpcy5ub3coKSAtIHRoaXMuc3RhdGUudmFsdWUsXG4gICAgICAgICAgICBpbnRlcnZhbDogc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIDEwKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYWN0aXZlXG4gICAgICAgICAgICA/ICh0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS5zdGFydF9hdClcbiAgICAgICAgICAgIDogdGhpcy5zdGF0ZS52YWx1ZTtcbiAgICB9XG4gICAgdGljaygpIHtcbiAgICAgICAgdmFyIG5ld192YWx1ZSA9IHRoaXMudmFsdWUoKTtcbiAgICAgICAgaWYgKG5ld192YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhZChudW0sIHNpemUpIHtcbiAgICAgICAgdmFyIHMgPSBcIjAwMDBcIiArIG51bS50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gcy5zdWJzdHIocy5sZW5ndGggLSBzaXplKTtcbiAgICB9XG4gICAgZ2V0U3RyVmFsdWUoKSB7XG4gICAgICAgIHZhciB2YWwgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgIHZhciBtID0gMCwgcyA9IDA7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgICAgbSA9IE1hdGguZmxvb3IodmFsIC8gKDYwICogMTAwMCkpO1xuICAgICAgICB2YWwgJT0gNjAgKiAxMDAwO1xuICAgICAgICBzID0gTWF0aC5mbG9vcih2YWwgLyAxMDAwKTtcbiAgICAgICAgcmV0dXJuIG0udG9TdHJpbmcoKSArICc6JyArIHRoaXMucGFkKHMsIDIpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0b3B3YXRjaFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcmVzZXQgaWdub3JlLXJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMucmVzZXQuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5yZXNldF9zdG9wd2F0Y2hcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJ0YnRuIGJ0bi10b2dnbGUgaWdub3JlLXJlYWRvbmx5XCIgKyAodGhpcy5zdGF0ZS5hY3RpdmUgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMudG9nZ2xlLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmFjdGl2ZSA/IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdG9wX3N0b3B3YXRjaFwiKSA6IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdGFydF9zdG9wd2F0Y2hcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RyVmFsdWUoKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiJdfQ==
