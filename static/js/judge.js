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
                "competition_info": "Информация о турнире",
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
                "sportsmen_list": "Список спортсменов",
                "start_list": "Стартовый лист",
                "tour_heats": "Заходы участников",
                "tour_results": "Результаты тура",
                "unfinalize_tour": "Отмена финализации тура",
                "unpicked_tours": "Не включены в программу"
            },
            "labels": {
                "clubs": "Клубы",
                "competition_date": "Дата проведения",
                "competition_name": "Наименование соревнования",
                "discipline": "Дисциплина",
                "discipline_judges": "Распределение судей по дисциплинам",
                "disciplines": "Дисциплины",
                "group_by_clubs": "Группировать по клубам",
                "include_acrobatics": "Включить акробатику",
                "include_clubs": "Включить данные о клубах",
                "include_discipline_judges": "Включить распределение судей по дисциплинам",
                "include_extended_info": "Включить расширенную информацию",
                "include_formation_sportsmen": "Включить состав формейшнов",
                "include_judges": "Включить данные о судьях",
                "judges": "Судьи",
                "no_files_selected": "Выберите файл...",
                "participants": "Участники",
                "paste_acro": "Вставьте данные из калькулятора акробатики",
                "plan": "Программа турнира",
                "show_sportsmen_only": "Показывать только спортсменов",
                "show_summary": "Показывать только количество",
                "sub": "зап", // substitute
                "tours": "Туры"
            },
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
                "n_sportsmen": function n_sportsmen(n, s) {
                    return n.toString() + " спортсмен" + chooseEnding(n, "", "а", "ов") + (s > 0 ? " (+" + s + " запасн" + chooseEnding(s, "ой", "ых", "ых") + ")" : "");
                },
                "n_sportsmen_short": function n_sportsmen_short(n, s) {
                    return n.toString() + " спортсмен" + chooseEnding(n, "", "а", "ов") + (s > 0 ? " (+" + s + " зап.)" : "");
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
                },
                "invalid_discipline_found": "Программа соревнований содержит туры, отсутствующие в системе"
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
                "sportsman": "Спортсмен",
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
                "stop_tour_and_start_next": "Завершить тур и перейти к следующему туру",
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

        _this.onClick = function (event) {
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.setState({
                posision: 200,
                touch: false,
                finished: true
            });
            _this.props.onActivate();
        };

        _this.onTouchStart = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.pin = _this.getRelativeTouch(event);
            _this.setState({
                position: _this.getSliderPos(event),
                touch: true
            });
        };

        _this.onTouchMove = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            _this.setState({
                position: _this.getSliderPos(event)
            });
        };

        _this.onTouchEnd = function (event) {
            event.preventDefault();
            if (_this.state.finished || _this.props.done) {
                return;
            }
            if (_this.state.position === 200) {
                _this.setState({
                    position: 0,
                    finished: true,
                    touch: false
                });
                _this.props.onActivate();
            } else {
                _this.setState({
                    position: 0,
                    touch: false
                });
            }
        };

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

    Slider.prototype.render = function render() {
        return React.createElement(
            "div",
            { className: "slider noselect" },
            React.createElement(
                "div",
                { className: "inner" + (this.isFree() ? " free" : ""),
                    style: { left: this.props.done || this.state.finished ? "200px" : this.state.position + "px" },
                    onTouchStart: this.onTouchStart,
                    onTouchMove: this.onTouchMove,
                    onTouchEnd: this.onTouchEnd,
                    onClick: this.onClick
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXHJvc2ZhcnJcXHRvdXJfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcYWRtaW5cXGp1ZGdpbmdcXHRvdXJfcmVzdWx0cy5qc3giLCJzcmNcXGpzeFxcY2xpZW50c1xcanVkZ2VcXG1haW4uanN4Iiwic3JjXFxqc3hcXGNsaWVudHNcXGp1ZGdlXFxyb3NmYXJyLmpzeCIsInNyY1xcanN4XFxjb21tb25cXGRvY3guanN4Iiwic3JjXFxqc3hcXGNvbW1vblxccm9zZmFyclxcYmFzZS5qc3giLCJzcmNcXGpzeFxcaTEwblxcbG9hZGVyLmpzeCIsInNyY1xcanN4XFxpMTBuXFxydS5qc3giLCJzcmNcXGpzeFxcanVkZ2UuanN4Iiwic3JjXFxqc3hcXHNlcnZlclxcYXBpLmpzeCIsInNyY1xcanN4XFxzZXJ2ZXJcXG1lc3NhZ2VfZGlzcGF0Y2hlci5qc3giLCJzcmNcXGpzeFxcc2VydmVyXFxzdG9yYWdlLmpzeCIsInNyY1xcanN4XFx1aVxcY29tcG9uZW50cy5qc3giLCJzcmNcXGpzeFxcdWlcXGRpYWxvZ3MuanN4Iiwic3JjXFxqc3hcXHVpXFxwcmludGFibGUuanN4Iiwic3JjXFxqc3hcXHVpXFx0YWJsZXRfY29tcG9uZW50cy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUNJQSxTQUFTLEVBQVQsR0FBYztBQUNWLFFBQUksT0FBTyxFQUFQLENBRE07QUFFVixTQUFLLElBQUksTUFBTSxDQUFOLEVBQVMsTUFBTSxVQUFVLE1BQVYsRUFBa0IsRUFBRSxHQUFGLEVBQU87QUFDN0MsYUFBSyxJQUFMLENBQVUsVUFBVSxHQUFWLENBQVYsRUFENkM7S0FBakQ7QUFHQSxXQUFPLDRCQUFFLDZCQUE2QixVQUFVLENBQVYsQ0FBN0IsU0FBOEMsS0FBaEQsQ0FBUCxDQUxVO0NBQWQ7O0lBUU07QUFDRixhQURFLG1D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O21CQUNSLGVBQWUsS0FBSyxNQUFMLENBQVksSUFBWixDQUFpQixJQUFqQixDQUFmLEVBRlI7Z0JBSU0sS0FBSyxLQUFMLENBQVcsTUFBWCxHQUFvQixlQUFFLCtCQUFGLENBQXBCLEdBQXlELGVBQUUsZ0NBQUYsQ0FBekQ7YUFYVjtZQWFJOztrQkFBSyxXQUFVLE1BQVYsRUFBTDtnQkFDTSxLQUFLLFdBQUwsRUFETjthQWJKO1NBREosQ0FESzs7O1dBN0VBO0VBQWtCLE1BQU0sU0FBTiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBUb3VyU2NvcmVzV3JhcHBlciwgZ2V0UGFydGljaXBhbnREaXNwbGF5LCBnZXRTY29yaW5nVHlwZSB9IGZyb20gXCJjb21tb24vcm9zZmFyci9iYXNlXCI7XG5cblxuZnVuY3Rpb24gX18oKSB7XG4gICAgbGV0IGFyZ3MgPSBbXTtcbiAgICBmb3IgKGxldCBpZHggPSAxOyBpZHggPCBhcmd1bWVudHMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICBhcmdzLnB1c2goYXJndW1lbnRzW2lkeF0pO1xuICAgIH1cbiAgICByZXR1cm4gXyhcInNjb3Jpbmdfc3lzdGVtcy5yb3NmYXJyLlwiICsgYXJndW1lbnRzWzBdLCAuLi5hcmdzKTtcbn1cblxuY2xhc3MgVG91clJlc3VsdHNWZXJib3NlVGFibGVDb2x1bW5XaWR0aHMge1xuICAgIGNvbnN0cnVjdG9yKG5fanVkZ2VzKSB7XG4gICAgICAgIHRoaXMuanVkZ2Vfd2lkdGggPSBNYXRoLnJvdW5kKDcwIC8gbl9qdWRnZXMpO1xuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gN1xuICAgICAgICB0aGlzLmluZm9fd2lkdGggPSAxMDAgLSB0aGlzLmp1ZGdlX3dpZHRoICogbl9qdWRnZXMgLSB0aGlzLnBsYWNlX3dpZHRoO1xuICAgIH1cbiAgICBnZW5QbGFjZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMucGxhY2Vfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuSW5mb1N0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuaW5mb193aWR0aH0lYCxcbiAgICAgICAgfVxuICAgIH1cbiAgICBnZW5KdWRnZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMuanVkZ2Vfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG59XG5cbmNsYXNzIFRvdXJSZXN1bHRzVmVyYm9zZVRhYmxlUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBmb3JtYXRTY29yZShzY29yZSwgdGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgdGVtcGxhdGUgPSBcIiRcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc2NvcmUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8c3Bhbj4mbWRhc2g7PC9zcGFuPlxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZS5yZXBsYWNlKFwiJFwiLCBzY29yZSkucmVwbGFjZShcIkBcIiwgc2NvcmUudG9GaXhlZCgxKSk7XG4gICAgfVxuICAgIHJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5pbXByZXNzaW9uLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5tXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLm1pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnRcIikgIH06PC9wPjwvdGg+PHRkIGNsYXNzTmFtZT1cInRvdGFsLXNjb3JlXCI+PHA+eyBzY29yZS5kYXRhLnRvdGFsX3Njb3JlIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24ucFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IGFkZGl0aW9sYWxfZGF0YS5wbGFjZXNbc2NvcmUuaWRdIH08L3A+PC90ZD48L3RyPlxuICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgfVxuICAgIHJlbmRlckZvcm1hdGlvbkFjcm9TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKSB7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwic2NvcmUtYnJlYWtkb3duXCI+PHRib2R5PlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uYVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5hY3JvYmF0aWNzLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kdFwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV90ZWNoLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5pXCIpICB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5pbXByZXNzaW9uLCBcIkBcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5zbVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5zbWFsbF9taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5ibVwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5iaWdfbWlzdGFrZXMpIH08L3A+PC90ZD48L3RyPlxuICAgICAgICAgICAgPHRyPjx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24udFwiKSAgfTo8L3A+PC90aD48dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj48cD57IHNjb3JlLmRhdGEudG90YWxfc2NvcmUgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5wXCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgYWRkaXRpb2xhbF9kYXRhLnBsYWNlc1tzY29yZS5pZF0gfTwvcD48L3RkPjwvdHI+XG4gICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG4gICAgcmVuZGVyRGFuY2VTY29yZShzY29yZSkge1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cInNjb3JlLWJyZWFrZG93blwiPjx0Ym9keT5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmZ3XCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmZ3X3dvbWFuLCBcIi0kJVwiKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmZtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmZ3X21hbiwgXCItJCVcIikgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi5kZlwiKSB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5kYW5jZV9maWdzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmNcIikgIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmNvbXBvc2l0aW9uKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLnNtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLnNtYWxsX21pc3Rha2VzKSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmJtXCIpIH06PC9wPjwvdGg+PHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZS5kYXRhLnJhd19kYXRhLmJpZ19taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbiAgICByZW5kZXJBY3JvU2NvcmUoc2NvcmUpIHtcbiAgICAgICAgbGV0IGFjcm9fc2NvcmVzID0gc2NvcmUuZGF0YS5yYXdfZGF0YS5yZWR1Y3Rpb25zLm1hcChmdW5jdGlvbihzY29yZSwgaWR4KSB7XG4gICAgICAgICAgICByZXR1cm4gPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgIDx0aD48cD57IF9fKFwicmVzdWx0cy5icmVha2Rvd24uYWNyb19uXCIsIGlkeCArIDEpIH06PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgPHRkPjxwPnsgdGhpcy5mb3JtYXRTY29yZShzY29yZSwgXCItJCVcIikgfTwvcD48L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJzY29yZS1icmVha2Rvd25cIj48dGJvZHk+XG4gICAgICAgICAgICB7IGFjcm9fc2NvcmVzIH1cbiAgICAgICAgICAgIDx0cj48dGg+PHA+eyBfXyhcInJlc3VsdHMuYnJlYWtkb3duLmZkXCIpICB9OjwvcD48L3RoPjx0ZD48cD57IHRoaXMuZm9ybWF0U2NvcmUoc2NvcmUuZGF0YS5yYXdfZGF0YS5taXN0YWtlcykgfTwvcD48L3RkPjwvdHI+XG4gICAgICAgICAgICA8dHI+PHRoPjxwPnsgX18oXCJyZXN1bHRzLmJyZWFrZG93bi50XCIpICB9OjwvcD48L3RoPjx0ZCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiPjxwPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZSB9PC9wPjwvdGQ+PC90cj5cbiAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgIH1cbiAgICByZW5kZXJTY29yZShqdWRnZSwgc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xuICAgICAgICBzd2l0Y2ggKGdldFNjb3JpbmdUeXBlKGp1ZGdlLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkpIHtcbiAgICAgICAgY2FzZSBcImRhbmNlXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJEYW5jZVNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xuICAgICAgICBjYXNlIFwiYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyQWNyb1Njb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpO1xuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKTtcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvbl9hY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25BY3JvU2NvcmUoc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHNjb3JlLmRhdGEudG90YWxfc2NvcmUudG9GaXhlZCgyKSB9PC9wPjtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZW5kZXJQYXJ0aWNpcGFudEluZm8oKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPHA+PHN0cm9uZz57IF8oXCJnbG9iYWwucGhyYXNlcy5wYXJ0aWNpcGFudF9uXCIsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyLFxuICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQuc3BvcnRzbWVuLmxlbmd0aFxuICAgICAgICAgICAgKX08L3N0cm9uZz48L3A+XG4gICAgICAgICAgICB7IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG4gICAgcmVuZGVySGVhZEp1ZGdlUGVuYWx0eSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wZW5hbHR5XCIpIH06IDwvc3Ryb25nPlxuICAgICAgICAgICAgeyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZSA6IDxzcGFuPiZtZGFzaDs8L3NwYW4+IH08L3A+XG4gICAgfVxuICAgIHJlbmRlckFjcm9UYWJsZSgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGxldCBoYXNfYWNyb19vdmVycmlkZXMgPSBmYWxzZTtcbiAgICAgICAgbGV0IHJlbmRlcl9hY3JvX3RhYmxlID0gdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5hY3JvXCIgfHxcbiAgICAgICAgICAgIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiO1xuICAgICAgICBpZiAoIXJlbmRlcl9hY3JvX3RhYmxlKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLmZvckVhY2goZnVuY3Rpb24oYWNybykge1xuICAgICAgICAgICAgaWYgKGFjcm8uc2NvcmUgIT09IGFjcm8ub3JpZ2luYWxfc2NvcmUpIHtcbiAgICAgICAgICAgICAgICBoYXNfYWNyb19vdmVycmlkZXMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgYWNyb19jZWxsX3dpZHRoID0gKDEwMCAvIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubGVuZ3RoKSArIFwiJVwiO1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxwPjxzdHJvbmc+eyBoYXNfYWNyb19vdmVycmlkZXMgPyBfXyhcInJlc3VsdHMubGFiZWxzLmFjcm9iYXRpY3NfdmVyYm9zZVwiKSA6IF9fKFwicmVzdWx0cy5sYWJlbHMuYWNyb2JhdGljc1wiKSB9Ojwvc3Ryb25nPjwvcD5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJhY3JvLXRhYmxlXCI+PHRib2R5PlxuICAgICAgICAgICAgICAgIDx0cj57XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLmFjcm9iYXRpY3MubWFwKChhY3JvLCBpZHgpID0+IDx0ZCBrZXk9eyBpZHggfSBzdHlsZT17eyB3aWR0aDogYWNyb19jZWxsX3dpZHRoIH19PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGFjcm8ub3JpZ2luYWxfc2NvcmUudG9GaXhlZCgxKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD48L3RkPilcbiAgICAgICAgICAgICAgICB9PC90cj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGhhc19hY3JvX292ZXJyaWRlcyA/IDx0cj57XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzLm1hcCgoYWNybywgaWR4KSA9PiA8dGQga2V5PXsgaWR4IH0gc3R5bGU9e3sgd2lkdGg6IGFjcm9fY2VsbF93aWR0aCB9fT48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgYWNyby5zY29yZS50b0ZpeGVkKDEpIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvcD48L3RkPilcbiAgICAgICAgICAgICAgICAgICAgfTwvdHI+IDogbnVsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIHJlbmRlckFtQ2xhc3NGd1Njb3JlKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy5md19zY29yZVwiKSB9PC9zdHJvbmc+OiB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpICsgXCIgLyBcIiArXG4gICAgICAgICAgICB0aGlzLnByb3BzLnJ1bi52ZXJib3NlX3RvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMilcbiAgICAgICAgfSA8L3A+XG4gICAgfVxuICAgIHJlbmRlckFtQ2xhc3NBY3JvU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cD48c3Ryb25nPnsgX18oXCJyZXN1bHRzLmxhYmVscy5hY3JvX3Njb3JlXCIpIH08L3N0cm9uZz46IHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUuY3VycmVudF90b3VyLnByaW1hcnlfc2NvcmUudG9GaXhlZCgyKSArIFwiIC8gXCIgK1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZS5jdXJyZW50X3RvdXIuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMilcbiAgICAgICAgfSA8L3A+XG4gICAgfVxuICAgIHJlbmRlclRvdGFsU2NvcmUoKSB7XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lID09PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH06IHsgdGhpcy5wcm9wcy5ydW4udG90YWxfc2NvcmUgfTwvc3Ryb25nPjwvcD47XG4gICAgfVxuICAgIHJlbmRlck5vdFBlcmZvcm1lZExhYmVsKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHA+PGVtPlxuICAgICAgICAgICAgeyBfXyhcInJlc3VsdHMubGFiZWxzLm5vdF9wZXJmb3JtZWRcIikgfVxuICAgICAgICA8L2VtPjwvcD5cbiAgICB9XG4gICAgcmVuZGVyTmV4dFRvdXJMYWJlbCgpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmhhc19uZXh0X3RvdXIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIDxwPjxzdHJvbmc+eyBfXyhcInJlc3VsdHMubGFiZWxzLm5leHRfdG91clwiKSB9OiA8L3N0cm9uZz57XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5hZHZhbmNlcyA/IF8oXCJnbG9iYWwubGFiZWxzLnllc1wiKSA6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpXG4gICAgICAgIH08L3A+XG4gICAgfVxuICAgIHJlbmRlckluZm9CbG9jaygpIHtcbiAgICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9XCJpbmZvLWJsb2NrXCIgc3R5bGU9eyB0aGlzLnByb3BzLndpZHRocy5nZW5JbmZvU3R5bGUoKSB9PlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclBhcnRpY2lwYW50SW5mbygpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkSnVkZ2VQZW5hbHR5KCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckFjcm9UYWJsZSgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBbUNsYXNzRndTY29yZSgpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJBbUNsYXNzQWNyb1Njb3JlKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRvdGFsU2NvcmUoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyTm90UGVyZm9ybWVkTGFiZWwoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyTmV4dFRvdXJMYWJlbCgpIH1cbiAgICAgICAgPC90ZD5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQganVkZ2VzX3Njb3JlcyA9IHRoaXMucHJvcHMuc2NvcmVzLm1hcCgoc2NvcmUsIGlkeCkgPT5cbiAgICAgICAgICAgIDx0ZCBrZXk9eyBpZHggfSBzdHlsZT17IHRoaXMucHJvcHMud2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PlxuICAgICAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZSh0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2VzW2lkeF0sIHNjb3JlLCB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5hZGRpdGlvbmFsX2RhdGEpIH1cbiAgICAgICAgICAgIDwvdGQ+KTtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIGp1ZGdlc19zY29yZXMgPSB0aGlzLnByb3BzLnNjb3Jlcy5tYXAoKHNjb3JlLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgPHRkIHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0ga2V5PXsgaWR4IH0+XG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD48L3RkPik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgdGhpcy5wcm9wcy53aWR0aHMuZ2VuUGxhY2VTdHlsZSgpIH0+XG4gICAgICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHRoaXMucHJvcHMucmVzdWx0c19pbmZvLnBsYWNlIH08L3A+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckluZm9CbG9jaygpIH1cbiAgICAgICAgICAgIHsganVkZ2VzX3Njb3JlcyB9XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNWZXJib3NlVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHRvdXJfd3JhcHBlciA9IG5ldyBUb3VyU2NvcmVzV3JhcHBlcih0aGlzLnByb3BzLnRvdXIsIHRoaXMucHJvcHMucmVzdWx0cyk7XG4gICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlcyA9IHRvdXJfd3JhcHBlci5nZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcbiAgICAgICAgbGV0IHNjb3Jlc190YWJsZSA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIik7XG4gICAgICAgIGxldCBoZWFkX2p1ZGdlX3Njb3JlcyA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJoZWFkX2p1ZGdlXCIpLm1hcCgocm93KSA9PiByb3dbMF0pO1xuICAgICAgICBsZXQgcmVzdWx0c19pbmZvID0gdG91cl93cmFwcGVyLmdldFJlc3VsdHNJbmZvKCk7XG4gICAgICAgIGxldCBydW5zID0gdG91cl93cmFwcGVyLmdldFJ1bnMoKTtcbiAgICAgICAgbGV0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xuICAgICAgICBsZXQgcm93cyA9IFtdO1xuICAgICAgICBsZXQgd2lkdGhzID0gbmV3IFRvdXJSZXN1bHRzVmVyYm9zZVRhYmxlQ29sdW1uV2lkdGhzKGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCk7XG4gICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IHJ1bnMubGVuZ3RoOyArK2lkeCkge1xuICAgICAgICAgICAgcm93cy5wdXNoKDxUb3VyUmVzdWx0c1ZlcmJvc2VUYWJsZVJvd1xuICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XG4gICAgICAgICAgICAgICAgdG91cj17IHRoaXMucHJvcHMudG91ciB9XG4gICAgICAgICAgICAgICAgcnVuPXsgcnVuc1tpZHhdIH1cbiAgICAgICAgICAgICAgICBzY29yZXM9eyBzY29yZXNfdGFibGVbaWR4XSB9XG4gICAgICAgICAgICAgICAgd2lkdGhzPXsgd2lkdGhzIH1cbiAgICAgICAgICAgICAgICBoZWFkX2p1ZGdlX3Njb3JlPXsgaGVhZF9qdWRnZV9zY29yZXNbaWR4XSB9XG4gICAgICAgICAgICAgICAgcmVzdWx0c19pbmZvPXsgcmVzdWx0c19pbmZvW2lkeF0gfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzPXsgZGlzY2lwbGluZV9qdWRnZXMgfVxuICAgICAgICAgICAgICAgIGhhc19uZXh0X3RvdXI9eyBoYXNfbmV4dF90b3VyIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIGxldCBqdWRnZXNfaGVhZGVyID0gZGlzY2lwbGluZV9qdWRnZXMubWFwKGZ1bmN0aW9uKGRqKSB7XG4gICAgICAgICAgICByZXR1cm4gPHRoIGtleT17IGRqLmlkIH0gd2lkdGg9eyB3aWR0aHMuZ2VuSnVkZ2VTdHlsZSgpIH0+PHA+eyBkai5qdWRnZS5udW1iZXIgfTwvcD48L3RoPlxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBjbGFzc05hbWU9XCJib3JkZXJlZC10YWJsZVwiIHN0eWxlPXt7IHdpZHRoOiBcIjEwMCVcIiB9fT5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHdpZHRoPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiIHdpZHRoPXsgd2lkdGhzLmdlbkluZm9TdHlsZSgpIH0+PHA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IF9fKFwicmVzdWx0cy5sYWJlbHMuaW5mb1wiKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICB7IGp1ZGdlc19oZWFkZXIgfVxuICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICA8L3RoZWFkPlxuICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHsgcm93cyB9XG4gICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgIH1cbn1cblxuY2xhc3MgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlQ29sdW1uV2lkdGhzIHtcbiAgICBjb25zdHJ1Y3RvcihuX2p1ZGdlcykge1xuICAgICAgICB0aGlzLmp1ZGdlX3dpZHRoID0gTWF0aC5yb3VuZCg1NSAvIG5fanVkZ2VzKTtcbiAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCA9IDE0O1xuICAgICAgICB0aGlzLnBsYWNlX3dpZHRoID0gNjtcbiAgICAgICAgdGhpcy5udW1iZXJfd2lkdGggPSAzO1xuICAgICAgICB0aGlzLm5hbWVfd2lkdGggPSAxMDAgLSB0aGlzLmp1ZGdlX3dpZHRoICogbl9qdWRnZXMgLVxuICAgICAgICAgICAgdGhpcy50b3RhbF9zY29yZV93aWR0aCAtIHRoaXMucGxhY2Vfd2lkdGggLSB0aGlzLm51bWJlcl93aWR0aDtcbiAgICB9XG4gICAgZ2VuUGxhY2VTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLnBsYWNlX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxuICAgIGdlbk51bWJlclN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMubnVtYmVyX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxuICAgIGdlbk5hbWVTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLm5hbWVfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuVG90YWxTY29yZVN0eWxlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgd2lkdGg6IGAke3RoaXMudG90YWxfc2NvcmVfd2lkdGh9JWAsXG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2VuSnVkZ2VTdHlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHdpZHRoOiBgJHt0aGlzLmp1ZGdlX3dpZHRofSVgLFxuICAgICAgICB9XG4gICAgfVxufVxuXG5jbGFzcyBUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlckZvcm1hdGlvblNjb3JlKHNjb3JlLCBhZGRpdGlvbGFsX2RhdGEpIHtcbiAgICAgICAgcmV0dXJuIDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+PHN0cm9uZz57IGFkZGl0aW9sYWxfZGF0YS5wbGFjZXNbc2NvcmUuaWRdIH08L3N0cm9uZz4gKHsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDEpIH0pPC9wPlxuICAgIH1cbiAgICByZW5kZXJTY29yZShqdWRnZSwgc2NvcmUsIGFkZGl0aW9sYWxfZGF0YSkge1xuICAgICAgICBpZiAoanVkZ2Uucm9sZSA9PT0gXCJkYW5jZV9qdWRnZVwiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25cIiB8fCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCIpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJGb3JtYXRpb25TY29yZShzY29yZSwgYWRkaXRpb2xhbF9kYXRhKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH08L3A+O1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBqdWRnZXNfc2NvcmVzID0gdGhpcy5wcm9wcy5zY29yZXMubWFwKChzY29yZSwgaWR4KSA9PiA8dGQga2V5PXsgaWR4IH0+IHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU2NvcmUodGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlc1tpZHhdLCBzY29yZSwgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8uYWRkaXRpb25hbF9kYXRhKVxuICAgICAgICB9IDwvdGQ+KTtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIGp1ZGdlc19zY29yZXMgPSB0aGlzLnByb3BzLnNjb3Jlcy5tYXAoKHNjb3JlLCBpZHgpID0+XG4gICAgICAgICAgICAgICAgPHRkIGtleT17IGlkeCB9PjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD48L3RkPik7XG4gICAgICAgIH1cbiAgICAgICAgbGV0IHRvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy5ydW4udmVyYm9zZV90b3RhbF9zY29yZTtcbiAgICAgICAgcmV0dXJuIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJwbGFjZVwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyB0aGlzLnByb3BzLnJlc3VsdHNfaW5mby5wbGFjZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibnVtYmVyXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50Lm51bWJlciB9PC9wPjwvdGQ+XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwicGFydGljaXBhbnRcIj57IGdldFBhcnRpY2lwYW50RGlzcGxheSh0aGlzLnByb3BzLnJ1bi5wYXJ0aWNpcGFudCkgfTwvdGQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uXCIgJiYgdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiXG4gICAgICAgICAgICAgICAgPyA8dGQgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj4mbWRhc2g7PC9wPjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSA9PT0gXCJyb3NmYXJyLmFtX2ZpbmFsX2Fjcm9cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IF9fKFwicmVzdWx0cy5sYWJlbHMuZndfc2NvcmVfc2hvcnRcIikgfXtcIjogXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7IHRvdGFsX3Njb3JlLnByZXZpb3VzX3RvdXIucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH17XCIgLyBcIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsgdG90YWxfc2NvcmUucHJldmlvdXNfdG91ci5zZWNvbmRhcnlfc2NvcmUudG9GaXhlZCgyKSB9PGJyIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZW0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdHJvbmc+eyB0b3RhbF9zY29yZS5wcmltYXJ5X3Njb3JlLnRvRml4ZWQoMikgfTwvc3Ryb25nPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvcD47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Ryb25nPnsgdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDsve1wiIFwifXsgdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9wPjtcbiAgICAgICAgICAgICAgICAgICAgfSkoKSB9XG4gICAgICAgICAgICAgICAgPC90ZD4gOiBudWxsIH1cbiAgICAgICAgICAgIHsganVkZ2VzX3Njb3JlcyB9XG4gICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwiY2FyZFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+e1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuaGVhZF9qdWRnZV9zY29yZSAmJiB0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZVxuICAgICAgICAgICAgICAgICAgICA6IDxzcGFuPiZtZGFzaDs8L3NwYW4+XG4gICAgICAgICAgICB9PC9wPjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXJBZHZhbmNlc0hlYWRlcihoYXNfbmV4dF90b3VyICxwcmV2X3JvdywgbmV4dF9yb3csIHByZXZfcnVuLCBuZXh0X3J1biwgaWR4LCBuX2NvbHMpIHtcbiAgICAgICAgbGV0IHByZXZfc3RhdHVzID0gcHJldl9yb3dcbiAgICAgICAgICAgID8gcHJldl9ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICAgICAgPyBwcmV2X3Jvdy5hZHZhbmNlc1xuICAgICAgICAgICAgICAgICAgICA/IFwiYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgICAgICA6IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICA6IFwibm90X3BlcmZvcm1lZFwiXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgICAgIGxldCBuZXh0X3N0YXR1cyA9IG5leHRfcnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgPyBuZXh0X3Jvdy5hZHZhbmNlc1xuICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgOiBcIm5vdF9hZHZhbmNlZFwiXG4gICAgICAgICAgICA6IFwibm90X3BlcmZvcm1lZFwiO1xuICAgICAgICBsZXQgcmVzdWx0ID0gcHJldl9zdGF0dXMgIT09IG5leHRfc3RhdHVzXG4gICAgICAgICAgICA/IG5leHRfc3RhdHVzID09PSBcIm5vdF9wZXJmb3JtZWRcIlxuICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfbm90X3BlcmZvcm1lZFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgIDogaGFzX25leHRfdG91clxuICAgICAgICAgICAgICAgICAgICA/IG5leHRfc3RhdHVzID09PSBcIm5vdF9hZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA/IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX25vdF9hZHZhbmNlZFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgOiA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19hZHZhbmNlZFwiKSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgaWYgKHJlc3VsdCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDx0ciBrZXk9eyBcIk5UXCIgKyBpZHggfT48dGggY2xhc3NOYW1lPVwiYWR2YW5jZXMtaGVhZGVyXCIgY29sU3Bhbj17IG5fY29scyB9PlxuICAgICAgICAgICAgeyByZXN1bHQgfVxuICAgICAgICA8L3RoPjwvdHI+XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHRvdXJfd3JhcHBlciA9IG5ldyBUb3VyU2NvcmVzV3JhcHBlcih0aGlzLnByb3BzLnRvdXIsIHRoaXMucHJvcHMucmVzdWx0cyk7XG4gICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlcyA9IHRvdXJfd3JhcHBlci5nZXREaXNjaXBsaW5lSnVkZ2VzQnlSb2xlcyhcImFjcm9fanVkZ2VcIiwgXCJkYW5jZV9qdWRnZVwiKTtcbiAgICAgICAgbGV0IHNjb3Jlc190YWJsZSA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJhY3JvX2p1ZGdlXCIsIFwiZGFuY2VfanVkZ2VcIik7XG4gICAgICAgIGxldCBoZWFkX2p1ZGdlX3Njb3JlcyA9IHRvdXJfd3JhcHBlci5nZXRTY29yZXNUYWJsZUJ5Um9sZXMoXCJoZWFkX2p1ZGdlXCIpLm1hcCgocm93KSA9PiByb3dbMF0pO1xuICAgICAgICBsZXQgcmVzdWx0c19pbmZvID0gdG91cl93cmFwcGVyLmdldFJlc3VsdHNJbmZvKCk7XG4gICAgICAgIGxldCBydW5zID0gdG91cl93cmFwcGVyLmdldFJ1bnMoKTtcbiAgICAgICAgbGV0IGhhc19uZXh0X3RvdXIgPSB0aGlzLnByb3BzLnRvdXIubmV4dF90b3VyX2lkICE9PSBudWxsO1xuICAgICAgICBsZXQgaGFzX3RvdGFsX3Njb3JlID0gdGhpcy5wcm9wcy50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5mb3JtYXRpb25cIiAmJiB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvbl9hY3JvXCI7XG4gICAgICAgIGxldCB3aWR0aHMgPSBuZXcgVG91clJlc3VsdHNTZW1pVmVyYm9zZVRhYmxlQ29sdW1uV2lkdGhzKGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCArIDEpO1xuICAgICAgICBsZXQganVkZ2VzX2hlYWRlciA9IGRpc2NpcGxpbmVfanVkZ2VzLm1hcChmdW5jdGlvbihkaikge1xuICAgICAgICAgICAgbGV0IHN1ZmZpeCA9IGdldFNjb3JpbmdUeXBlKGRqLCB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSkgPT09IFwiYWNyb1wiID8gXCIgKEEpXCIgOiBcIlwiO1xuICAgICAgICAgICAgcmV0dXJuIDx0aCBrZXk9eyBkai5pZCB9IHN0eWxlPXsgd2lkdGhzLmdlbkp1ZGdlU3R5bGUoKSB9PjxwPnsgZGouanVkZ2UubnVtYmVyICsgc3VmZml4IH08L3A+PC90aD5cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcnVucy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHggLSAxXSxcbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm9baWR4XSxcbiAgICAgICAgICAgICAgICBydW5zW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4XSxcbiAgICAgICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICAgICAgNCArIGRpc2NpcGxpbmVfanVkZ2VzLmxlbmd0aCArIGhhc190b3RhbF9zY29yZVxuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICByb3dzLnB1c2goPFRvdXJSZXN1bHRzU2VtaVZlcmJvc2VUYWJsZVJvd1xuICAgICAgICAgICAgICAgIGtleT17IHJ1bnNbaWR4XS5pZCB9XG4gICAgICAgICAgICAgICAgaGVhZF9qdWRnZV9zY29yZT17IGhlYWRfanVkZ2Vfc2NvcmVzW2lkeF0gfVxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mbz17IHJlc3VsdHNfaW5mb1tpZHhdIH1cbiAgICAgICAgICAgICAgICB0b3VyPXsgdGhpcy5wcm9wcy50b3VyIH1cbiAgICAgICAgICAgICAgICBydW49eyBydW5zW2lkeF0gfVxuICAgICAgICAgICAgICAgIHNjb3Jlcz17IHNjb3Jlc190YWJsZVtpZHhdIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlcz17IGRpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyPXsgaGFzX25leHRfdG91ciB9XG4gICAgICAgICAgICAgICAgaGFzX3RvdGFsX3Njb3JlPXsgaGFzX3RvdGFsX3Njb3JlIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwbGFjZVwiIHN0eWxlPXsgd2lkdGhzLmdlblBsYWNlU3R5bGUoKSB9PjxwPnsgX18oXCJyZXN1bHRzLmxhYmVscy5wbGFjZVwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJudW1iZXJcIiBzdHlsZT17IHdpZHRocy5nZW5OdW1iZXJTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLm51bWJlclwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJwYXJ0aWNpcGFudFwiIHN0eWxlPXsgd2lkdGhzLmdlbk5hbWVTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICB7IGhhc190b3RhbF9zY29yZSA/IDx0aCBjbGFzc05hbWU9XCJ0b3RhbC1zY29yZVwiIHN0eWxlPXsgd2lkdGhzLmdlblRvdGFsU2NvcmVTdHlsZSgpIH0+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH08L3A+PC90aD4gOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgeyBqdWRnZXNfaGVhZGVyIH1cbiAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNhcmRcIiBzdHlsZT17IHdpZHRocy5nZW5KdWRnZVN0eWxlKCkgfT48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgX18oXCJyZXN1bHRzLmxhYmVscy5jYXJkXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7IHJvd3MgfVxuICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICB9XG59XG5cbmNsYXNzIFRvdXJSZXN1bHRzVGFibGVSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IGNhcmQgPSB0aGlzLnByb3BzLnJ1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgID8gdGhpcy5wcm9wcy5oZWFkX2p1ZGdlX3Njb3JlXG4gICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLmhlYWRfanVkZ2Vfc2NvcmUuZGF0YS50b3RhbF9zY29yZVxuICAgICAgICAgICAgICAgIDogXCIwXCJcbiAgICAgICAgICAgIDogPHNwYW4+Jm1kYXNoOzwvc3Bhbj47XG4gICAgICAgIGxldCB0b3RhbF9zY29yZSA9IHRoaXMucHJvcHMuaGFzX3RvdGFsX3Njb3JlID9cbiAgICAgICAgICAgIHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZFxuICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPHN0cm9uZz57IHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUucHJpbWFyeV9zY29yZS50b0ZpeGVkKDIpIH08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgICAgJm5ic3A7L3tcIiBcIn17IHRoaXMucHJvcHMucnVuLnZlcmJvc2VfdG90YWxfc2NvcmUuc2Vjb25kYXJ5X3Njb3JlLnRvRml4ZWQoMikgfVxuICAgICAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+Jm1kYXNoOzwvcD5cbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgcmV0dXJuIDx0cj5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5yZXN1bHRzX2luZm8ucGxhY2UgfTwvcD48L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj48cCBjbGFzc05hbWU9XCJ0ZXh0LWNlbnRlclwiPnsgdGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQubnVtYmVyIH08L3A+PC90ZD5cbiAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTMwIHBhcnRpY2lwYW50XCI+eyBnZXRQYXJ0aWNpcGFudERpc3BsYXkodGhpcy5wcm9wcy5ydW4ucGFydGljaXBhbnQpIH08L3RkPlxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cImNsdWJcIj48cD57IHRoaXMucHJvcHMucnVuLnBhcnRpY2lwYW50LmNsdWIubmFtZSB9PC9wPjwvdGQ+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuaGFzX3RvdGFsX3Njb3JlID8gPHRkIGNsYXNzTmFtZT1cInctMTggc2NvcmVcIj57IHRvdGFsX3Njb3JlIH08L3RkPiA6IG51bGwgfVxuICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctOCBjYXJkXCI+PHAgY2xhc3NOYW1lPVwidGV4dC1jZW50ZXJcIj57IGNhcmQgfTwvcD48L3RkPlxuICAgICAgICA8L3RyPlxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvdXJSZXN1bHRzVGFibGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlckFkdmFuY2VzSGVhZGVyKGhhc19uZXh0X3RvdXIsIHByZXZfcm93LCBuZXh0X3JvdywgcHJldl9ydW4sIG5leHRfcnVuLCBpZHgsIG5fY29scykge1xuICAgICAgICBsZXQgcHJldl9zdGF0dXMgPSBwcmV2X3Jvd1xuICAgICAgICAgICAgPyBwcmV2X3J1bi5wZXJmb3JtZWRcbiAgICAgICAgICAgICAgICA/IHByZXZfcm93LmFkdmFuY2VzXG4gICAgICAgICAgICAgICAgICAgID8gXCJhZHZhbmNlZFwiXG4gICAgICAgICAgICAgICAgICAgIDogXCJub3RfYWR2YW5jZWRcIlxuICAgICAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCJcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICAgICAgbGV0IG5leHRfc3RhdHVzID0gbmV4dF9ydW4ucGVyZm9ybWVkXG4gICAgICAgICAgICA/IG5leHRfcm93LmFkdmFuY2VzXG4gICAgICAgICAgICAgICAgPyBcImFkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICA6IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgIDogXCJub3RfcGVyZm9ybWVkXCI7XG4gICAgICAgIGxldCByZXN1bHQgPSBwcmV2X3N0YXR1cyAhPT0gbmV4dF9zdGF0dXNcbiAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X3BlcmZvcm1lZFwiXG4gICAgICAgICAgICAgICAgPyA8cCBjbGFzc05hbWU9XCJ0ZXh0LWxlZnRcIj57IF9fKFwicmVzdWx0cy5oZWFkZXJzLnBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgOiBoYXNfbmV4dF90b3VyXG4gICAgICAgICAgICAgICAgICAgID8gbmV4dF9zdGF0dXMgPT09IFwibm90X2FkdmFuY2VkXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gPHAgY2xhc3NOYW1lPVwidGV4dC1sZWZ0XCI+eyBfXyhcInJlc3VsdHMuaGVhZGVycy5wYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICA6IDxwIGNsYXNzTmFtZT1cInRleHQtbGVmdFwiPnsgX18oXCJyZXN1bHRzLmhlYWRlcnMucGFydGljaXBhbnRzX2FkdmFuY2VkXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgOiBudWxsO1xuICAgICAgICBpZiAocmVzdWx0ID09PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPHRyIGtleT17IFwiTlRcIiArIGlkeCB9Pjx0aCBjbGFzc05hbWU9XCJhZHZhbmNlcy1oZWFkZXJcIiBjb2xTcGFuPXsgbl9jb2xzIH0+XG4gICAgICAgICAgICB7IHJlc3VsdCB9XG4gICAgICAgIDwvdGg+PC90cj5cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgdG91cl93cmFwcGVyID0gbmV3IFRvdXJTY29yZXNXcmFwcGVyKHRoaXMucHJvcHMudG91ciwgdGhpcy5wcm9wcy5yZXN1bHRzKTtcbiAgICAgICAgbGV0IGhlYWRfanVkZ2Vfc2NvcmVzID0gdG91cl93cmFwcGVyLmdldFNjb3Jlc1RhYmxlQnlSb2xlcyhcImhlYWRfanVkZ2VcIikubWFwKChyb3cpID0+IHJvd1swXSk7XG4gICAgICAgIGxldCByZXN1bHRzX2luZm8gPSB0b3VyX3dyYXBwZXIuZ2V0UmVzdWx0c0luZm8oKTtcbiAgICAgICAgbGV0IHJ1bnMgPSB0b3VyX3dyYXBwZXIuZ2V0UnVucygpO1xuICAgICAgICBsZXQgaGFzX25leHRfdG91ciA9IHRoaXMucHJvcHMudG91ci5uZXh0X3RvdXJfaWQgIT09IG51bGw7XG4gICAgICAgIGxldCBoYXNfdG90YWxfc2NvcmUgPSB0aGlzLnByb3BzLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSAhPT0gXCJyb3NmYXJyLmZvcm1hdGlvblwiICYmIHRoaXMucHJvcHMudG91ci5zY29yaW5nX3N5c3RlbV9uYW1lICE9PSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjtcbiAgICAgICAgbGV0IHJvd3MgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaWR4ID0gMDsgaWR4IDwgcnVucy5sZW5ndGg7ICsraWR4KSB7XG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJBZHZhbmNlc0hlYWRlcihcbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyLFxuICAgICAgICAgICAgICAgIHJlc3VsdHNfaW5mb1tpZHggLSAxXSxcbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm9baWR4XSxcbiAgICAgICAgICAgICAgICBydW5zW2lkeCAtIDFdLFxuICAgICAgICAgICAgICAgIHJ1bnNbaWR4XSxcbiAgICAgICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICAgICAgNSArIGhhc190b3RhbF9zY29yZVxuICAgICAgICAgICAgKSk7XG4gICAgICAgICAgICByb3dzLnB1c2goPFRvdXJSZXN1bHRzVGFibGVSb3dcbiAgICAgICAgICAgICAgICBrZXk9eyBydW5zW2lkeF0uaWQgfVxuICAgICAgICAgICAgICAgIGhlYWRfanVkZ2Vfc2NvcmU9eyBoZWFkX2p1ZGdlX3Njb3Jlc1tpZHhdIH1cbiAgICAgICAgICAgICAgICByZXN1bHRzX2luZm89eyByZXN1bHRzX2luZm9baWR4XSB9XG4gICAgICAgICAgICAgICAgcnVuPXsgcnVuc1tpZHhdIH1cbiAgICAgICAgICAgICAgICBoYXNfbmV4dF90b3VyPXsgaGFzX25leHRfdG91ciB9XG4gICAgICAgICAgICAgICAgaGFzX3RvdGFsX3Njb3JlPXsgaGFzX3RvdGFsX3Njb3JlIH0gLz5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImJyaWVmLXRhYmxlXCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiYm9yZGVyZWQtdGFibGVcIj5cbiAgICAgICAgICAgICAgICA8dGhlYWQ+XG4gICAgICAgICAgICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTcgcGxhY2VcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGxhY2VcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cInctNiBudW1iZXJcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMubnVtYmVyXCIpIH08L3A+PC90aD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTMwIHBhcnRpY2lwYW50XCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnBhcnRpY2lwYW50X25hbWVcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoIGNsYXNzTmFtZT1cImNsdWJcIj48cD57IF9fKFwicmVzdWx0cy5sYWJlbHMucGFydGljaXBhbnRfY2x1YlwiKSB9PC9wPjwvdGg+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IGhhc190b3RhbF9zY29yZSA/IDx0aCBjbGFzc05hbWU9XCJ3LTE4IHNjb3JlXCI+PHA+eyBfXyhcInJlc3VsdHMubGFiZWxzLnRvdGFsX3Njb3JlXCIpIH08L3A+PC90aD4gOiBudWxsIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aCBjbGFzc05hbWU9XCJ3LTggY2FyZFwiPjxwIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBfXyhcInJlc3VsdHMubGFiZWxzLmNhcmRcIikgfTwvcD48L3RoPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgICAgICB7IHJvd3MgfVxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBQcmludGFibGUgfSBmcm9tIFwidWkvcHJpbnRhYmxlXCI7XG5pbXBvcnQgeyBEb2N4IH0gZnJvbSBcImNvbW1vbi9kb2N4XCI7XG5cbmltcG9ydCB7IFRvdXJSZXN1bHRzVGFibGUsIFRvdXJSZXN1bHRzU2VtaVZlcmJvc2VUYWJsZSwgVG91clJlc3VsdHNWZXJib3NlVGFibGUgfSBmcm9tIFwiLi9yb3NmYXJyL3RvdXJfcmVzdWx0c1wiO1xuXG5cbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c0J1dHRvbnMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHNpZ25hbChtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiAoKCkgPT4gdGhpcy5wcm9wcy5vblNpZ25hbChtZXNzYWdlKSkuYmluZCh0aGlzKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYnRuIGJ0bi1wcmltYXJ5XCIgb25DbGljaz17IHRoaXMuc2lnbmFsKFwiZG9jeFwiKSB9PlxuICAgICAgICAgICAgICAgIERPQ1hcbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUb3VyUmVzdWx0c0JvZHkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuXG4gICAgLy8gSW5pdGlhbGl6YXRpb25cblxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgICAgICAgIHRvdXI6IG51bGwsXG4gICAgICAgICAgICByZXN1bHRzOiBudWxsLFxuICAgICAgICB9XG4gICAgICAgIHRoaXMuVE9VUl9TQ0hFTUEgPSB7XG4gICAgICAgICAgICBkaXNjaXBsaW5lOiB7XG4gICAgICAgICAgICAgICAgY29tcGV0aXRpb246IHt9LFxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2VzOiB7XG4gICAgICAgICAgICAgICAgICAgIGp1ZGdlOiB7fSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJ1bnM6IHtcbiAgICAgICAgICAgICAgICBhY3JvYmF0aWNzOiB7fSxcbiAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7XG4gICAgICAgICAgICAgICAgICAgIGNsdWI6IHt9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2UuZ2V0RG9tYWluKFwicmVzdWx0c19cIiArIHRoaXMucHJvcHMudG91cl9pZCk7XG4gICAgICAgIHRoaXMucmVsb2FkX2xpc3RlbmVyID0gbWVzc2FnZV9kaXNwYXRjaGVyLmFkZExpc3RlbmVyKFwicmVsb2FkX2RhdGFcIiwgdGhpcy5sb2FkRGF0YS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5kYl91cGRhdGVfbGlzdGVuZXIgPSBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5yZXN1bHRzX2NoYW5nZV9saXN0ZW5lciA9IG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInRvdXJfcmVzdWx0c19jaGFuZ2VkIHJlbG9hZF9kYXRhXCIsIGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIGlmICghbWVzc2FnZSB8fCBtZXNzYWdlLnRvdXJfaWQgPT09IHRoaXMucHJvcHMudG91cl9pZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9hZFJlc3VsdHMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcbiAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xuICAgICAgICB0aGlzLmxvYWRSZXN1bHRzKCk7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmF1dG9Eb2N4KSB7XG4gICAgICAgICAgICBsZXQgaW50ZXJ2YWxfaWQgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVmcy5jb250ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWxfaWQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3godGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYXV0b0RvY3guY2FsbGJhY2sodGhpcy5wcm9wcy5hdXRvRG9jeC5maWxlbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgNTAwKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVsb2FkX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMuZGJfdXBkYXRlX2xpc3RlbmVyKTtcbiAgICAgICAgbWVzc2FnZV9kaXNwYXRjaGVyLnJlbW92ZUxpc3RlbmVyKHRoaXMucmVzdWx0c19jaGFuZ2VfbGlzdGVuZXIpO1xuICAgICAgICBzdG9yYWdlLmRlbERvbWFpbihcInJlc3VsdHNfXCIgKyB0aGlzLnByb3BzLnRvdXJfaWQpO1xuICAgIH1cbiAgICByZWxvYWRGcm9tU3RvcmFnZSgpIHtcbiAgICAgICAgbGV0IHNlcmlhbGl6ZWQgPSB0aGlzLnN0b3JhZ2UuZ2V0KFwiVG91clwiKVxuICAgICAgICAgICAgLmJ5X2lkKHRoaXMucHJvcHMudG91cl9pZClcbiAgICAgICAgICAgIC5zZXJpYWxpemUodGhpcy5UT1VSX1NDSEVNQSk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgdG91cjogc2VyaWFsaXplZCxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGxvYWRSZXN1bHRzKCkge1xuICAgICAgICBBcGkoXCJ0b3VyLmdldF9yZXN1bHRzXCIsIHt0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXJfaWR9KVxuICAgICAgICAub25TdWNjZXNzKGZ1bmN0aW9uKG5ld19yZXN1bHRzKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjogbmV3X3Jlc3VsdHMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UoKTtcbiAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAuc2VuZCgpO1xuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwidG91ci5nZXRcIiwgeyB0b3VyX2lkOiB0aGlzLnByb3BzLnRvdXJfaWQsIGNoaWxkcmVuOiB0aGlzLlRPVVJfU0NIRU1BfSlcbiAgICAgICAgICAgIC5hZGRUb0RCKFwiVG91clwiLCB0aGlzLnByb3BzLnRvdXJfaWQsIHRoaXMuc3RvcmFnZSlcbiAgICAgICAgICAgIC5vblN1Y2Nlc3ModGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLnNlbmQoKTtcbiAgICB9XG5cbiAgICAvLyBMaXN0ZW5lcnNcblxuICAgIG9uU2lnbmFsKG1lc3NhZ2UpIHtcbiAgICAgICAgc3dpdGNoIChtZXNzYWdlKSB7XG4gICAgICAgIGNhc2UgXCJkb2N4XCI6XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZURvY3goKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIG1lc3NhZ2U6XCIsIG1lc3NhZ2UpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW5kZXJpbmdcblxuICAgIHJlbmRlck5vbkZpbmFsaXplZFdhcm5pbmcoKSB7XG4gICAgICAgIGlmICghdGhpcy5zdGF0ZS50b3VyLmZpbmFsaXplZCkge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYWxlcnQgYWxlcnQtZGFuZ2VyXCI+eyBfKFwicmVzdWx0cy5hbGVydHMubm90X2ZpbmFsaXplZFwiKSB9PC9kaXY+XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkgeyAgLy8gZXNsaW50LWRpc2FibGUtbGluZSByZWFjdC9zb3J0LWNvbXBcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91ciA9PT0gbnVsbCB8fCB0aGlzLnN0YXRlLnJlc3VsdHMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRhYmxlID0gbnVsbDtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmVyYm9zaXR5ID09PSBcIjNcIikge1xuICAgICAgICAgICAgdGFibGUgPSA8VG91clJlc3VsdHNWZXJib3NlVGFibGUgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5wcm9wcy52ZXJib3NpdHkgPT09IFwiMlwiKSB7XG4gICAgICAgICAgICB0YWJsZSA9IDxUb3VyUmVzdWx0c1NlbWlWZXJib3NlVGFibGUgey4uLnRoaXMuc3RhdGV9IC8+XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0YWJsZSA9IDxUb3VyUmVzdWx0c1RhYmxlIHsuLi50aGlzLnN0YXRlfSAvPlxuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyZWQgPSB0cnVlO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy50YWJsZU9ubHkpIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cInRvdXItcmVzdWx0c1wiIHJlZj1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVyTm9uRmluYWxpemVkV2FybmluZygpIH1cbiAgICAgICAgICAgICAgICB7IHRhYmxlIH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICB9XG4gICAgICAgIGxldCBib2R5ID0gPGRpdiBjbGFzc05hbWU9XCJ0b3VyLXJlc3VsdHMgcC1jb250ZW50XCIgcmVmPVwiY29udGVudFwiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlck5vbkZpbmFsaXplZFdhcm5pbmcoKSB9XG4gICAgICAgICAgICB7IHRhYmxlIH1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnByaW50YWJsZVxuICAgICAgICAgICAgPyA8UHJpbnRhYmxlXG4gICAgICAgICAgICAgICAgcmVmPVwicHJpbnRhYmxlXCJcbiAgICAgICAgICAgICAgICBoZWFkZXI9eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5jb21wZXRpdGlvbi5uYW1lICsgXCIsIFwiICsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24uZGF0ZSB9XG4gICAgICAgICAgICAgICAgdGl0bGUxPXsgXyhcImFkbWluLmhlYWRlcnMudG91cl9yZXN1bHRzXCIpIH1cbiAgICAgICAgICAgICAgICB0aXRsZTI9eyB0aGlzLnN0YXRlLnRvdXIuZGlzY2lwbGluZS5uYW1lIH1cbiAgICAgICAgICAgICAgICB0aXRsZTM9eyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9XG4gICAgICAgICAgICAgICAgYm9keT17IGJvZHkgfSAvPlxuICAgICAgICAgICAgOiBib2R5O1xuICAgIH1cbiAgICBjcmVhdGVEb2N4KGZpbGVuYW1lPVwidG91ci1yZXN1bHRzLmRvY3hcIikge1xuICAgICAgICBEb2N4KGZpbGVuYW1lKVxuICAgICAgICAgICAgLnNldE1hcmdpbnMoWzEwLCAxMCwgMTUsIDEwXSlcbiAgICAgICAgICAgIC5zZXRIZWFkZXIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUuY29tcGV0aXRpb24ubmFtZSArIFwiLCBcIiArIHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmNvbXBldGl0aW9uLmRhdGUpXG4gICAgICAgICAgICAuc2V0VGl0bGUxKF8oXCJhZG1pbi5oZWFkZXJzLnRvdXJfcmVzdWx0c1wiKSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTIodGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSlcbiAgICAgICAgICAgIC5zZXRUaXRsZTModGhpcy5zdGF0ZS50b3VyLm5hbWUpXG4gICAgICAgICAgICAuc2V0Qm9keShSZWFjdERPTS5maW5kRE9NTm9kZSh0aGlzLnJlZnMuY29udGVudCkuaW5uZXJIVE1MKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlXCIsIFwiZm9udC1zaXplXCIsIHRoaXMucHJvcHMudmVyYm9zaXR5ID09PSBcIjFcIiA/IFwiMTJwdFwiIDogXCI5cHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuYWNyby10YWJsZSB0ZFwiLCBcImZvbnQtc2l6ZVwiLCBcIjlwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5hY3JvLXRhYmxlIHRkXCIsIFwicGFkZGluZ1wiLCBcIjAgM3B0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLmFjcm8tdGFibGUgdGRcIiwgXCJib3JkZXJcIiwgXCIwLjVwdCBzb2xpZCBibGFja1wiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGQsIC5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRoXCIsIFwiZm9udC1zaXplXCIsIFwiOXB0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0ZCwgLmJvcmRlcmVkLXRhYmxlIC5zY29yZS1icmVha2Rvd24gdGhcIiwgXCJib3JkZXJcIiwgXCJub25lXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuYm9yZGVyZWQtdGFibGUgLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInBhZGRpbmdcIiwgXCIwIDFwdCAwIDBcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5ib3JkZXJlZC10YWJsZSAuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwicGFkZGluZ1wiLCBcIjAgMCAwIDFwdFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0aFwiLCBcInRleHQtYWxpZ25cIiwgXCJyaWdodFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnNjb3JlLWJyZWFrZG93biB0ZFwiLCBcInRleHQtYWxpZ25cIiwgXCJsZWZ0XCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuc2NvcmUtYnJlYWtkb3duIHRkXCIsIFwidGV4dC1hbGlnblwiLCBcImxlZnRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5zY29yZS1icmVha2Rvd25cIiwgXCJ3aWR0aFwiLCBcIjUwcHRcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hZHZhbmNlcy1oZWFkZXJcIiwgXCJiYWNrZ3JvdW5kLWNvbG9yXCIsIFwiI2RkZFwiKVxuICAgICAgICAgICAgLmFkZFN0eWxlKFwiLnRvdGFsLXNjb3JlXCIsIFwiZm9udC13ZWlnaHRcIiwgXCJib2xkXCIpXG4gICAgICAgICAgICAuYWRkU3R5bGUoXCIuaGVhZF9qdWRnZVwiLCBcIndpZHRoXCIsIFwiNSVcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5kYW5jZV9qdWRnZVwiLCBcIndpZHRoXCIsIFwiOCVcIilcbiAgICAgICAgICAgIC5hZGRTdHlsZShcIi5hY3JvX2p1ZGdlXCIsIFwid2lkdGhcIiwgXCI4JVwiKVxuICAgICAgICAgICAgLnNhdmUoKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XG5pbXBvcnQgeyBBcGkgfSBmcm9tIFwic2VydmVyL2FwaVwiO1xuaW1wb3J0IHsgc3RvcmFnZSB9IGZyb20gXCJzZXJ2ZXIvc3RvcmFnZVwiO1xuaW1wb3J0IHsgbWVzc2FnZV9kaXNwYXRjaGVyIH0gZnJvbSBcInNlcnZlci9tZXNzYWdlX2Rpc3BhdGNoZXJcIjtcbmltcG9ydCB7IExvYWRlciB9IGZyb20gXCJ1aS9jb21wb25lbnRzXCI7XG5pbXBvcnQgeyBzaG93Q29uZmlybSB9IGZyb20gXCJ1aS9kaWFsb2dzXCI7XG5pbXBvcnQgeyBvblRvdWNoT3JDbGljayB9IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuaW1wb3J0IHsgVG91clJlc3VsdHNCb2R5IH0gZnJvbSBcImFkbWluL2p1ZGdpbmcvdG91cl9yZXN1bHRzXCI7XG5cbmltcG9ydCB7IFRhYmxldFNjb3JlSW5wdXQgfSBmcm9tIFwiLi9yb3NmYXJyXCI7XG5cblxuZXhwb3J0IGNsYXNzIEp1ZGdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGp1ZGdlX2lkOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLlRPVVJfU0NIRU1BID0ge1xuICAgICAgICAgICAgcnVuczoge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50OiB7fSxcbiAgICAgICAgICAgICAgICBzY29yZXM6IHt9LFxuICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M6IHt9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpc2NpcGxpbmU6IHtcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlczoge1xuICAgICAgICAgICAgICAgICAgICBqdWRnZToge30sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICB0b3VyOiBudWxsLFxuICAgICAgICAgICAganVkZ2U6IG51bGwsXG4gICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlOiBudWxsLFxuICAgICAgICAgICAgY3VycmVudF9oZWF0OiAxLFxuICAgICAgICAgICAgcGFnZTogXCJkZWZhdWx0XCIsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuYWN0aXZlX3RvdXJfaWQgPSBudWxsO1xuICAgICAgICBtZXNzYWdlX2Rpc3BhdGNoZXIuYWRkTGlzdGVuZXIoXCJkYl91cGRhdGVcIiwgdGhpcy5yZWxvYWRGcm9tU3RvcmFnZS5iaW5kKHRoaXMsIGZhbHNlKSk7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcInJlbG9hZF9kYXRhXCIsIHRoaXMubG9hZERhdGEuYmluZCh0aGlzKSk7XG4gICAgICAgIG1lc3NhZ2VfZGlzcGF0Y2hlci5hZGRMaXN0ZW5lcihcImFjdGl2ZV90b3VyX3VwZGF0ZVwiLCB0aGlzLmRpc3BhdGNoQWN0aXZlVG91clVwZGF0ZS5iaW5kKHRoaXMsIGZhbHNlKSk7XG4gICAgICAgIHRoaXMubG9hZERhdGEoKTtcbiAgICB9XG5cbiAgICAvLyBMb2FkZXJzXG5cbiAgICByZWxvYWRGcm9tU3RvcmFnZShyZXNldF9oZWF0KSB7XG4gICAgICAgIGxldCBzdF9qdWRnZSA9IHN0b3JhZ2UuZ2V0KFwiSnVkZ2VcIikuYnlfaWQodGhpcy5wcm9wcy5qdWRnZV9pZClcbiAgICAgICAgaWYgKCFzdF9qdWRnZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzdGF0ZV91cGQgPSB7fVxuICAgICAgICBzdGF0ZV91cGRbXCJqdWRnZVwiXSA9IHN0X2p1ZGdlLnNlcmlhbGl6ZSh7XG4gICAgICAgICAgICBjb21wZXRpdGlvbjoge31cbiAgICAgICAgfSlcbiAgICAgICAgc3RhdGVfdXBkW1wiY29tcGV0aXRpb25cIl0gPSBzdGF0ZV91cGRbXCJqdWRnZVwiXS5jb21wZXRpdGlvbjtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlX3RvdXJfaWQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGxldCBzdF90b3VyID0gc3RvcmFnZS5nZXQoXCJUb3VyXCIpLmJ5X2lkKHRoaXMuYWN0aXZlX3RvdXJfaWQpO1xuICAgICAgICAgICAgaWYgKHN0X3RvdXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG91ciA9IHN0X3RvdXIuc2VyaWFsaXplKHRoaXMuVE9VUl9TQ0hFTUEpO1xuICAgICAgICAgICAgICAgIGlmICh0b3VyLmRpc2NpcGxpbmUgJiYgdG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0YXRlX3VwZFtcInRvdXJcIl0gPSB0b3VyO1xuICAgICAgICAgICAgICAgICAgICAvLyBGaW5kIGRpc2NpcGxpbmUganVkZ2VcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVfdXBkW1wiZGlzY2lwbGluZV9qdWRnZVwiXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcy5mb3JFYWNoKGZ1bmN0aW9uKGRqKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGouanVkZ2UuaWQgPT09IHRoaXMucHJvcHMuanVkZ2VfaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGF0ZV91cGRbXCJkaXNjaXBsaW5lX2p1ZGdlXCJdID0gZGo7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNldF9oZWF0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZGlzY2lwbGluZV9qdWRnZSA9IHN0YXRlX3VwZFtcImRpc2NpcGxpbmVfanVkZ2VcIl07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWRpc2NpcGxpbmVfanVkZ2UgfHwgZGlzY2lwbGluZV9qdWRnZS5yb2xlID09PSBcImhlYWRfanVkZ2VcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlX3VwZFtcImN1cnJlbnRfaGVhdFwiXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBkaXNjaXBsaW5lX2p1ZGdlX2lkID0gZGlzY2lwbGluZV9qdWRnZSAmJiBkaXNjaXBsaW5lX2p1ZGdlLmlkO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlX3VwZFtcImN1cnJlbnRfaGVhdFwiXSA9IHRoaXMuZ2V0Rmlyc3ROb25Db25maXJtZWRIZWF0KHRvdXIucnVucywgZGlzY2lwbGluZV9qdWRnZV9pZCkgfHwgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXRlX3VwZFtcInBhZ2VcIl0gPSBcImRlZmF1bHRcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFN0YXRlKHN0YXRlX3VwZCk7XG4gICAgfVxuICAgIHVwZGF0ZUFjdGl2ZVRvdXIoZm9yY2VfcmVsb2FkLCBuZXdfYWN0aXZlX3RvdXJfaWQpIHtcbiAgICAgICAgaWYgKG5ld19hY3RpdmVfdG91cl9pZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdG91cjogbnVsbCxcbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlOiBudWxsLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLmFjdGl2ZV90b3VyX2lkID0gbmV3X2FjdGl2ZV90b3VyX2lkO1xuICAgICAgICAgICAgc3RvcmFnZS5kZWwoXCJUb3VyXCIpO1xuICAgICAgICAgICAgc3RvcmFnZS5kZWwoXCJQYXJ0aWNpcGFudFwiKTtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiU2NvcmVcIik7XG4gICAgICAgICAgICBzdG9yYWdlLmRlbChcIlJ1blwiKTtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiRGlzY2lwbGluZVwiKTtcbiAgICAgICAgICAgIHN0b3JhZ2UuZGVsKFwiRGlzY2lwbGluZUp1ZGdlXCIpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmb3JjZV9yZWxvYWQgfHwgbmV3X2FjdGl2ZV90b3VyX2lkICE9PSB0aGlzLmFjdGl2ZV90b3VyX2lkKSB7XG4gICAgICAgICAgICBsZXQgb2xkX2FjdGl2ZV90b3VyX2lkID0gdGhpcy5hY3RpdmVfdG91cl9pZDtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZlX3RvdXJfaWQgPSBuZXdfYWN0aXZlX3RvdXJfaWQ7XG4gICAgICAgICAgICBBcGkoXCJ0b3VyLmdldFwiLCB7IHRvdXJfaWQ6IHRoaXMuYWN0aXZlX3RvdXJfaWQsIGNoaWxkcmVuOiB0aGlzLlRPVVJfU0NIRU1BIH0pXG4gICAgICAgICAgICAgICAgLmFkZFRvREIoXCJUb3VyXCIsIHRoaXMuYWN0aXZlX3RvdXJfaWQpXG4gICAgICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLnJlbG9hZEZyb21TdG9yYWdlLmJpbmQodGhpcywgbmV3X2FjdGl2ZV90b3VyX2lkICE9PSBvbGRfYWN0aXZlX3RvdXJfaWQpKVxuICAgICAgICAgICAgICAgIC5zZW5kKClcbiAgICAgICAgfVxuICAgIH1cbiAgICBsb2FkRGF0YSgpIHtcbiAgICAgICAgQXBpKFwianVkZ2UuZ2V0XCIsIHsganVkZ2VfaWQ6IHRoaXMucHJvcHMuanVkZ2VfaWQsIGNoaWxkcmVuOiB7IGNvbXBldGl0aW9uOiB7fSB9IH0pXG4gICAgICAgICAgICAuYWRkVG9EQihcIkp1ZGdlXCIsIHRoaXMucHJvcHMuanVkZ2VfaWQpXG4gICAgICAgICAgICAub25TdWNjZXNzKHRoaXMucmVsb2FkRnJvbVN0b3JhZ2UuYmluZCh0aGlzLCBmYWxzZSkpXG4gICAgICAgICAgICAuc2VuZCgpO1xuICAgICAgICBBcGkoXCJ0b3VyLmZpbmRfYWN0aXZlXCIsIHt9KVxuICAgICAgICAgICAgLm9uU3VjY2Vzcyh0aGlzLmRpc3BhdGNoQWN0aXZlVG91clVwZGF0ZS5iaW5kKHRoaXMsIHRydWUpKVxuICAgICAgICAgICAgLnNlbmQoKTtcbiAgICB9XG5cbiAgICAvLyBEaXNwYXRjaGVyc1xuXG4gICAgZGlzcGF0Y2hBY3RpdmVUb3VyVXBkYXRlKGZvcmNlX3JlbG9hZCwgZGF0YSkge1xuICAgICAgICB0aGlzLnVwZGF0ZUFjdGl2ZVRvdXIoZm9yY2VfcmVsb2FkLCBkYXRhW1widG91cl9pZFwiXSk7XG4gICAgfVxuXG4gICAgLy8gTGlzdGVuZXJzXG5cbiAgICBvblNjb3JlVXBkYXRlKHNjb3JlX2lkLCBuZXdfc2NvcmUpIHtcbiAgICAgICAgbGV0IHJlcXVlc3QgPSB7XG4gICAgICAgICAgICBzY29yZV9kYXRhOiBuZXdfc2NvcmUsXG4gICAgICAgICAgICBmb3JjZTogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIEFwaShcInNjb3JlLnNldFwiLCB7c2NvcmVfaWQ6IHNjb3JlX2lkLCBkYXRhOiByZXF1ZXN0fSkuc2VuZCgpO1xuICAgIH1cblxuICAgIG9uU2NvcmVDb25maXJtKHNjb3JlX2lkKSB7XG4gICAgICAgIEFwaShcInNjb3JlLmNvbmZpcm1cIiwge3Njb3JlX2lkOiBzY29yZV9pZH0pLnNlbmQoKTtcbiAgICB9XG5cbiAgICAvLyBBY3Rpb25zXG5cbiAgICB0b1ByZXZIZWF0KCkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIGN1cnJlbnRfaGVhdDogdGhpcy5zdGF0ZS5jdXJyZW50X2hlYXQgLSAxLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgdG9OZXh0SGVhdCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBjdXJyZW50X2hlYXQ6IHRoaXMuc3RhdGUuY3VycmVudF9oZWF0ICsgMSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN3aXRjaFBhZ2UocGFnZSkge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgIHBhZ2U6IHBhZ2UsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBzdG9wVG91cigpIHtcbiAgICAgICAgc2hvd0NvbmZpcm0oXyhcInRhYmxldC5jb25maXJtcy5zdG9wX3RvdXJcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0b3BcIiwgeyB0b3VyX2lkOiB0aGlzLnN0YXRlLnRvdXIuaWQgfSkub25TdWNjZXNzKCgpID0+IHN3YWwuY2xvc2UoKSkuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluYWxpemVUb3VyKCkge1xuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLmZpbmFsaXplX3RvdXJcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLmZpbmFsaXplXCIsIHsgdG91cl9pZDogdGhpcy5zdGF0ZS50b3VyLmlkIH0pLm9uU3VjY2VzcygoKSA9PiBzd2FsLmNsb3NlKCkpLnNlbmQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0b3BUb3VyQW5kU3RhcnROZXh0KCkge1xuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLnN0b3BfdG91cl9hbmRfc3RhcnRfbmV4dFwiKSwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUudG91cikge1xuICAgICAgICAgICAgICAgIGxldCB0b3VyX2lkID0gdGhpcy5zdGF0ZS50b3VyLmlkO1xuICAgICAgICAgICAgICAgIEFwaShcInRvdXIuc3RvcFwiLCB7IHRvdXJfaWQgfSkub25TdWNjZXNzKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgQXBpKFwidG91ci5zdGFydF9uZXh0X2FmdGVyXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4gc3dhbC5jbG9zZSgpKS5zZW5kKCk7XG4gICAgICAgICAgICAgICAgfSkuc2VuZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZmluYWxpemVUb3VyQW5kU3RhcnROZXh0KCkge1xuICAgICAgICBzaG93Q29uZmlybShfKFwidGFibGV0LmNvbmZpcm1zLmZpbmFsaXplX3RvdXJfYW5kX3N0YXJ0X25leHRcIiksICgpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgdG91cl9pZCA9IHRoaXMuc3RhdGUudG91ci5pZDtcbiAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLmZpbmFsaXplXCIsIHsgdG91cl9pZCB9KS5vblN1Y2Nlc3MoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBBcGkoXCJ0b3VyLnN0YXJ0X25leHRfYWZ0ZXJcIiwgeyB0b3VyX2lkIH0pLm9uU3VjY2VzcygoKSA9PiBzd2FsLmNsb3NlKCkpLnNlbmQoKTtcbiAgICAgICAgICAgICAgICB9KS5zZW5kKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIEhlbHBlcnNcblxuICAgIGdldEhlYXRzQ291bnQocnVucykge1xuICAgICAgICBydW5zID0gcnVucyB8fCB0aGlzLnN0YXRlLnRvdXIucnVucztcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KC4uLnJ1bnMubWFwKChydW4pID0+IHJ1bi5oZWF0KSk7XG4gICAgfVxuICAgIGdldEZpcnN0Tm9uQ29uZmlybWVkSGVhdChydW5zLCBkaXNjaXBsaW5lX2p1ZGdlX2lkKSB7XG4gICAgICAgIHJ1bnMgPSBydW5zIHx8IHRoaXMuc3RhdGUudG91ci5ydW5zO1xuICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlX2lkID0gZGlzY2lwbGluZV9qdWRnZV9pZCB8fCB0aGlzLnN0YXRlLmRpc2NpcGxpbmVfanVkZ2UuaWQ7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnVucy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBydW5zW2ldLnNjb3Jlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGxldCBzY29yZSA9IHJ1bnNbaV0uc2NvcmVzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChzY29yZS5kaXNjaXBsaW5lX2p1ZGdlX2lkID09PSBkaXNjaXBsaW5lX2p1ZGdlX2lkICYmICFzY29yZS5jb25maXJtZWQgJiYgcnVuc1tpXS5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJ1bnNbaV0uaGVhdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0SGVhdHNDb3VudChydW5zKTtcbiAgICB9XG4gICAgaGFzVW5jb25maXJtZWRTY29yZXMoKSB7XG4gICAgICAgIGxldCBydW5zID0gdGhpcy5zdGF0ZS50b3VyLnJ1bnM7XG4gICAgICAgIGxldCBjb25maXJtZWRfc2NvcmVzID0ge307XG4gICAgICAgIGZvciAobGV0IGkgPSBydW5zLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHJ1bnNbaV0uc2NvcmVzLmxlbmd0aDsgKytqKSB7XG4gICAgICAgICAgICAgICAgbGV0IHNjb3JlID0gcnVuc1tpXS5zY29yZXNbal07XG4gICAgICAgICAgICAgICAgaWYgKHNjb3JlLmNvbmZpcm1lZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25maXJtZWRfc2NvcmVzW3Njb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWRdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY29uZmlybWVkX3Njb3JlcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBydW5zW2ldLnNjb3Jlcy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgc2NvcmUgPSBydW5zW2kgLSAxXS5zY29yZXNbal07XG4gICAgICAgICAgICAgICAgICAgIGlmIChzY29yZS5jb25maXJtZWQgJiYgIWNvbmZpcm1lZF9zY29yZXNbc2NvcmUuZGlzY2lwbGluZV9qdWRnZV9pZF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gUmVuZGVyaW5nXG5cbiAgICByZW5kZXJSZXN1bHRzKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJib2R5IHJlc3VsdHNcIj5cbiAgICAgICAgICAgIDxUb3VyUmVzdWx0c0JvZHkgdG91cl9pZD17IHRoaXMuc3RhdGUudG91ci5pZCB9IHZlcmJvc2l0eT1cIjJcIiB0YWJsZU9ubHkgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIHJlbmRlckhhc1VuY29uZmlybWVkU2NvcmVzV2FybmluZygpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc1VuY29uZmlybWVkU2NvcmVzKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIndhcm5pbmdcIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmFsZXJ0cy5oYXNfdW5jb25maXJtZWRfc2NvcmVzXCIpIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbiAgICByZW5kZXJBY3Rpb25zKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJib2R5IGFjdGlvbnNcIj5cbiAgICAgICAgICAgICAgICB7IHRoaXMucmVuZGVySGFzVW5jb25maXJtZWRTY29yZXNXYXJuaW5nKCkgfVxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaXRlbVwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInRidG4gYnRuLXByaW1hcnlcIiB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5zdG9wVG91ci5iaW5kKHRoaXMpKX0+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdG9wX3RvdXJcIikgfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMuZmluYWxpemVUb3VyLmJpbmQodGhpcykpfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLmZpbmFsaXplX3RvdXJcIikgfVxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIml0ZW1cIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wcmltYXJ5XCIgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMuc3RvcFRvdXJBbmRTdGFydE5leHQuYmluZCh0aGlzKSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMuc3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCIpIH1cbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJpdGVtXCI+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidGJ0biBidG4tcHJpbWFyeVwiIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5maW5hbGl6ZVRvdXJBbmRTdGFydE5leHQuYmluZCh0aGlzKSl9PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMuZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiKSB9XG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlckhlYWRlcigpIHtcbiAgICAgICAgbGV0IGJ0bl9wcmV2ID0gbnVsbDtcbiAgICAgICAgbGV0IGJ0bl9uZXh0ID0gbnVsbDtcbiAgICAgICAgbGV0IGp1ZGdlID0gdGhpcy5zdGF0ZS5qdWRnZTtcbiAgICAgICAgbGV0IGp1ZGdlX251bWJlciA9IGp1ZGdlLnJvbGVfZGVzY3JpcHRpb24gfHwgXyhcImdsb2JhbC5waHJhc2VzLmp1ZGdlX25cIiwganVkZ2UubnVtYmVyKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGFnZSAhPT0gXCJyZXN1bHRzXCIgJiYgdGhpcy5zdGF0ZS5wYWdlICE9PSBcImFjdGlvbnNcIikge1xuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudF9oZWF0ID4gMSkge1xuICAgICAgICAgICAgICAgIGJ0bl9wcmV2ID0gPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1sZWZ0XCIgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMudG9QcmV2SGVhdC5iaW5kKHRoaXMpKX0+XG4gICAgICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLnByZXZfaGVhdFwiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuY3VycmVudF9oZWF0IDwgdGhpcy5nZXRIZWF0c0NvdW50KCkgJiYgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmRpc2NpcGxpbmVfanVkZ2Uucm9sZSA9PT0gXCJoZWFkX2p1ZGdlXCJcbiAgICAgICAgICAgICAgICAgICAgfHwgdGhpcy5nZXRGaXJzdE5vbkNvbmZpcm1lZEhlYXQoKSA+IHRoaXMuc3RhdGUuY3VycmVudF9oZWF0KSkge1xuICAgICAgICAgICAgICAgIGJ0bl9uZXh0ID0gPGJ1dHRvbiBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1yaWdodFwiIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnRvTmV4dEhlYXQuYmluZCh0aGlzKSl9PlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5uZXh0X2hlYXRcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgY3VycmVudF90b3VyID0gPGRpdiBjbGFzc05hbWU9XCJoZWFkZXJcIj5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJmdWxsLXdpZHRoXCI+PHRib2R5Pjx0cj5cbiAgICAgICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgICAgIDxoMT57IGp1ZGdlX251bWJlciB9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgPGgyPnsganVkZ2UubmFtZSB9PC9oMj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgICAgPGgxPnsgdGhpcy5zdGF0ZS50b3VyLmRpc2NpcGxpbmUubmFtZSB9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgPGgyPnsgdGhpcy5zdGF0ZS50b3VyLm5hbWUgfSZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwOyZuYnNwO1xuICAgICAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmhlYWRlcnMuaGVhdFwiKSB9OiB7IHRoaXMuc3RhdGUuY3VycmVudF9oZWF0IH0gLyB7IHRoaXMuZ2V0SGVhdHNDb3VudCgpIH08L2gyPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgPC9kaXY+O1xuICAgICAgICByZXR1cm4gPGhlYWRlcj5cbiAgICAgICAgICAgIHsgYnRuX3ByZXYgfVxuICAgICAgICAgICAgeyBidG5fbmV4dCB9XG4gICAgICAgICAgICB7IGN1cnJlbnRfdG91ciB9XG4gICAgICAgIDwvaGVhZGVyPlxuICAgIH1cbiAgICByZW5kZXJTcGxhc2hTY3JlZW4oKSB7XG4gICAgICAgIGxldCBqdWRnZSA9IHRoaXMuc3RhdGUuanVkZ2U7XG4gICAgICAgIGxldCBqdWRnZV9udW1iZXIgPSBqdWRnZS5yb2xlX2Rlc2NyaXB0aW9uIHx8IF8oXCJnbG9iYWwucGhyYXNlcy5qdWRnZV9uXCIsIGp1ZGdlLm51bWJlcik7XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImp1ZGdlLXRhYmxldFwiPlxuICAgICAgICAgICAgPGhlYWRlcj5cbiAgICAgICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJidG4gYnRuLXByaW1hcnkgcHVsbC1sZWZ0XCIgaHJlZj1cIi9cIj5cbiAgICAgICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMudG9fc3RhcnRfcGFnZVwiKSB9XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMT57IHRoaXMuc3RhdGUuY29tcGV0aXRpb24ubmFtZSB9PC9oMT5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNsZWFyZml4XCI+PC9kaXY+XG4gICAgICAgICAgICA8L2hlYWRlcj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BsYXNoLXNjcmVlblwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwianVkZ2UtbnVtYmVyXCI+eyBqdWRnZV9udW1iZXIgfTwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwianVkZ2UtbmFtZVwiPnsgdGhpcy5zdGF0ZS5qdWRnZS5uYW1lIH08L2Rpdj5cbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudG91ciA/IDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1qdWRnaW5nLWRpc2NpcGxpbmVcIj57IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLm5hbWUgfTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJub3QtanVkZ2luZy10b3VyXCI+eyB0aGlzLnN0YXRlLnRvdXIubmFtZSB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm5vdC1qdWRnaW5nLW1lc3NhZ2VcIj57IF8oXCJ0YWJsZXQubWVzc2FnZXMubm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiKSB9PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PiA6IG51bGxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIHJlbmRlclNjb3JpbmdMYXlvdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnBhZ2UgPT09IFwicmVzdWx0c1wiKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJSZXN1bHRzKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUucGFnZSA9PT0gXCJhY3Rpb25zXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlckFjdGlvbnMoKTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgY2VsbHMgPSB0aGlzLnN0YXRlLnRvdXIucnVuc1xuICAgICAgICAgICAgLmZpbHRlcihmdW5jdGlvbihydW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcnVuLmhlYXQgPT09IHRoaXMuc3RhdGUuY3VycmVudF9oZWF0O1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbihydW4pIHtcbiAgICAgICAgICAgICAgICBsZXQgc2NvcmVzX21hcCA9IHt9XG4gICAgICAgICAgICAgICAgcnVuLnNjb3Jlcy5mb3JFYWNoKGZ1bmN0aW9uKHNjb3JlX2RhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2NvcmVzX21hcFtzY29yZV9kYXRhLmRpc2NpcGxpbmVfanVkZ2VfaWRdID0gc2NvcmVfZGF0YTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudF9zY29yZSA9IHNjb3Jlc19tYXBbdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX2p1ZGdlLmlkXTtcbiAgICAgICAgICAgICAgICBsZXQgaGVhZGVyID0gXyhcImdsb2JhbC5waHJhc2VzLnBhcnRpY2lwYW50X25cIiwgcnVuLnBhcnRpY2lwYW50Lm51bWJlciwgcnVuLnBhcnRpY2lwYW50Lm5hbWUsIHJ1bi5wYXJ0aWNpcGFudC5zcG9ydHNtZW4ubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNjb3Jlc19tYXBbdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX2p1ZGdlLmlkXSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHRkIGtleT17IHJ1bi5pZCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgyPnsgaGVhZGVyIH08L2gyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT1cInRleHQtY2VudGVyXCI+eyBfKFwidGFibGV0Lm1lc3NhZ2VzLm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCIpIH08L2gzPlxuICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gPHRkIGtleT17IHJ1bi5pZCB9PlxuICAgICAgICAgICAgICAgICAgICA8aDI+eyBoZWFkZXIgfTwvaDI+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZXRTY29yZUlucHV0XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlPXsgdGhpcy5zdGF0ZS5kaXNjaXBsaW5lX2p1ZGdlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbF9kaXNjaXBsaW5lX2p1ZGdlcz17IHRoaXMuc3RhdGUudG91ci5kaXNjaXBsaW5lLmRpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3JlPXsgY3VycmVudF9zY29yZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWFkT25seT17IGN1cnJlbnRfc2NvcmUuY29uZmlybWVkIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFsbF9zY29yZXM9eyBzY29yZXNfbWFwIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bj17IHJ1biB9XG4gICAgICAgICAgICAgICAgICAgICAgICBwYWdlPXsgdGhpcy5zdGF0ZS5wYWdlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU9eyB0aGlzLnN0YXRlLnRvdXIuc2NvcmluZ19zeXN0ZW1fbmFtZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy5vblNjb3JlVXBkYXRlLmJpbmQodGhpcywgY3VycmVudF9zY29yZS5pZCkgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25TY29yZUNvbmZpcm09eyB0aGlzLm9uU2NvcmVDb25maXJtLmJpbmQodGhpcywgY3VycmVudF9zY29yZS5pZCkgfSAvPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgICAgICBsZXQgc2luZ2xlX3J1bl9jbGFzcyA9IGNlbGxzLmxlbmd0aCA9PT0gMSA/IFwiIHNpbmdsZS1ydW5cIiA6IFwiXCI7XG4gICAgICAgIGlmIChjZWxscy5sZW5ndGggPiAzKSB7XG4gICAgICAgICAgICBsZXQgZmlyc3Rfcm93ID0gW11cbiAgICAgICAgICAgIGxldCBzZWNvbmRfcm93ID0gW11cbiAgICAgICAgICAgIGNlbGxzLmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpZHggJSAyID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0X3Jvdy5wdXNoKGNlbGwpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZF9yb3cucHVzaChjZWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgbGV0IGhhbGZfd2lkdGggPSAxMDAgLyAoMiAqIGZpcnN0X3Jvdy5sZW5ndGggKyAxKTtcbiAgICAgICAgICAgIGxldCBmaXJzdF93aWR0aCwgc2Vjb25kX3dpZHRoO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3Jvdy5sZW5ndGggPT09IHNlY29uZF9yb3cubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgW2ZpcnN0X3dpZHRoLCBzZWNvbmRfd2lkdGhdID0gWzEwMCAtIGhhbGZfd2lkdGgsIDEwMCAtIGhhbGZfd2lkdGhdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBbZmlyc3Rfd2lkdGgsIHNlY29uZF93aWR0aF0gPSBbMTAwLCAxMDAgLSAyICogaGFsZl93aWR0aF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJib2R5XCI+XG4gICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cIm1haW4tdGFibGVcIiBzdHlsZT17eyB3aWR0aDogZmlyc3Rfd2lkdGggKyBcIiVcIiwgXCJtYXJnaW5MZWZ0XCI6IDAgfX0+PHRib2R5Pjx0cj5cbiAgICAgICAgICAgICAgICAgICAgeyBmaXJzdF9yb3cgfVxuICAgICAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPlxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJtYWluLXRhYmxlXCIgc3R5bGU9e3sgd2lkdGg6IHNlY29uZF93aWR0aCArIFwiJVwiLCBcIm1hcmdpblJpZ2h0XCI6IGZpcnN0X3Jvdy5sZW5ndGggPT09IHNlY29uZF9yb3cubGVuZ3RoID8gMCA6IFwiYXV0b1wiIH19Pjx0Ym9keT48dHI+XG4gICAgICAgICAgICAgICAgICAgIHsgc2Vjb25kX3JvdyB9XG4gICAgICAgICAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJib2R5XCI+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXsgXCJtYWluLXRhYmxlXCIgKyBzaW5nbGVfcnVuX2NsYXNzIH0+PHRib2R5Pjx0cj5cbiAgICAgICAgICAgICAgICB7IGNlbGxzIH1cbiAgICAgICAgICAgIDwvdHI+PC90Ym9keT48L3RhYmxlPjtcbiAgICAgICAgPC9kaXY+XG4gICAgfVxuICAgIHJlbmRlckZvb3RlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZS5yb2xlID09PSBcImhlYWRfanVkZ2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiZm9vdGVyIHBhZ2Utc2VsZWN0b3JcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiYnRuXCIgKyAodGhpcy5zdGF0ZS5wYWdlID09PSBcImRlZmF1bHRcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5zd2l0Y2hQYWdlLmJpbmQodGhpcywgXCJkZWZhdWx0XCIpKX0+eyBfKFwidGFibGV0LnBhZ2VzLmhlYXRzXCIpIH1cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiYnRuXCIgKyAodGhpcy5zdGF0ZS5wYWdlID09PSBcInJlc3VsdHNcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5zd2l0Y2hQYWdlLmJpbmQodGhpcywgXCJyZXN1bHRzXCIpKX0+eyBfKFwidGFibGV0LnBhZ2VzLnJlc3VsdHNcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJidG5cIiArICh0aGlzLnN0YXRlLnBhZ2UgPT09IFwiYWN0aW9uc1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnN3aXRjaFBhZ2UuYmluZCh0aGlzLCBcImFjdGlvbnNcIikpfT57IF8oXCJ0YWJsZXQucGFnZXMuYWN0aW9uc1wiKSB9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZGlzY2lwbGluZV9qdWRnZS5yb2xlICE9PSBcInRlY2hfanVkZ2VcIiB8fCAoXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hY3JvXCIgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS50b3VyLnNjb3Jpbmdfc3lzdGVtX25hbWUgIT09IFwicm9zZmFyci5hbV9maW5hbF9hY3JvXCIpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJmb290ZXIgcGFnZS1zZWxlY3RvclwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwiYnRuXCIgKyAodGhpcy5zdGF0ZS5wYWdlID09PSBcImRlZmF1bHRcIiA/IFwiIGFjdGl2ZVwiIDogXCJcIikgfVxuICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLnN3aXRjaFBhZ2UuYmluZCh0aGlzLCBcImRlZmF1bHRcIikpfT57IF8oXCJ0YWJsZXQucGFnZXMuZGFuY2VcIikgfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJidG5cIiArICh0aGlzLnN0YXRlLnBhZ2UgPT09IFwiYWNyb1wiID8gXCIgYWN0aXZlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMuc3dpdGNoUGFnZS5iaW5kKHRoaXMsIFwiYWNyb1wiKSl9PnsgXyhcInRhYmxldC5wYWdlcy5hY3JvYmF0aWNzXCIpIH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj47XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuanVkZ2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiA8TG9hZGVyIC8+O1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnRvdXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlclNwbGFzaFNjcmVlbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmRpc2NpcGxpbmVfanVkZ2UgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlbmRlclNwbGFzaFNjcmVlbigpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImp1ZGdlLXRhYmxldFwiPlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yaW5nTGF5b3V0KCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckZvb3RlcigpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuaW1wb3J0IHsgQXBpIH0gZnJvbSBcInNlcnZlci9hcGlcIjtcbmltcG9ydCB7XG4gICAgb25Ub3VjaE9yQ2xpY2ssXG4gICAgVGFibGV0SW50ZWdlcklucHV0LFxuICAgIFRhYmxldEludGVnZXJTZWxlY3RJbnB1dCxcbiAgICBUYWJsZXRTZWxlY3RvcklucHV0LFxuICAgIFRhYmxldFBvaW50NUlucHV0LFxuICAgIFRhYmxldFBvaW50NVNlbGVjdElucHV0LFxuICAgIFN0b3BXYXRjaCxcbiAgICBTbGlkZXIsXG59IGZyb20gXCJ1aS90YWJsZXRfY29tcG9uZW50c1wiO1xuXG5pbXBvcnQgeyBnZXRTY29yaW5nVHlwZSB9IGZyb20gXCJjb21tb24vcm9zZmFyci9iYXNlXCI7XG5cbmZ1bmN0aW9uIF9fKCkge1xuICAgIGxldCBhcmdzID0gW107XG4gICAgZm9yIChsZXQgaWR4ID0gMTsgaWR4IDwgYXJndW1lbnRzLmxlbmd0aDsgKytpZHgpIHtcbiAgICAgICAgYXJncy5wdXNoKGFyZ3VtZW50c1tpZHhdKTtcbiAgICB9XG4gICAgcmV0dXJuIF8oXCJzY29yaW5nX3N5c3RlbXMucm9zZmFyci5cIiArIGFyZ3VtZW50c1swXSwgLi4uYXJncyk7XG59XG5cbi8vIEhlYWQganVkZ2VcblxuY2xhc3MgSGVhZEp1ZGdlQWN0b2JhdGljT3ZlcnJpZGVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFjcm9iYXRpY3M6IFJlYWN0LlByb3BUeXBlcy5hcnJheS5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBnZXRBY3JvYmF0aWNPdmVycmlkZXMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmFjcm9iYXRpY3NcbiAgICAgICAgICAgIC5tYXAoKGFjcm8sIGlkeCkgPT4gKHsgaWR4OiBpZHggKyAxLCBhY3JvYmF0aWM6IGFjcm8gfSkpXG4gICAgICAgICAgICAuZmlsdGVyKChhY3JvKSA9PiBhY3JvLmFjcm9iYXRpYy5vcmlnaW5hbF9zY29yZSAhPT0gYWNyby5hY3JvYmF0aWMuc2NvcmUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBhY3JvYmF0aWNfb3ZlcnJpZGVzID0gdGhpcy5nZXRBY3JvYmF0aWNPdmVycmlkZXMoKTtcbiAgICAgICAgaWYgKGFjcm9iYXRpY19vdmVycmlkZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCI+PC9kaXY+XG4gICAgICAgICAgICA8aDM+eyBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLmFjcm9iYXRpY19vdmVycmlkZXNcIikgfTwvaDM+XG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwiZnVsbC13aWR0aFwiPjx0Ym9keT5cbiAgICAgICAgICAgICAgICB7IGFjcm9iYXRpY19vdmVycmlkZXMubWFwKChhY3JvKSA9PlxuICAgICAgICAgICAgICAgICAgICA8dHIga2V5PXsgYWNyby5pZHggfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTVcIj57IGFjcm8uaWR4IH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnsgYWNyby5hY3JvYmF0aWMuZGVzY3JpcHRpb24gfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xMCB0ZXh0LXJpZ2h0XCI+eyBhY3JvLmFjcm9iYXRpYy5vcmlnaW5hbF9zY29yZS50b0ZpeGVkKDEpIH08L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctNSB0ZXh0LWNlbnRlclwiPuKGkjwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidy0xMCB0ZXh0LWxlZnRcIj57IGFjcm8uYWNyb2JhdGljLnNjb3JlLnRvRml4ZWQoMSkgfTwvdGQ+XG4gICAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgSGVhZEp1ZGdlUHJldmlvdXNQZW5hbHRpZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcGVuYWx0aWVzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXksXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLnBlbmFsdGllcyB8fCB0aGlzLnByb3BzLnBlbmFsdGllcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJzcGFjZXJcIj48L2Rpdj5cbiAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LmhlYWRfanVkZ2UucHJldmlvdXNfcGVuYWx0aWVzXCIpIH08L2gzPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cImZ1bGwtd2lkdGhcIj48dGJvZHk+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnBlbmFsdGllcy5tYXAoKGQsIGlkeCkgPT5cbiAgICAgICAgICAgICAgICAgICAgPHRyIGtleT17IGlkeCB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMTAgdGV4dC1jZW50ZXJcIj48c3Ryb25nPnsgZC5wZW5hbHR5IH08L3N0cm9uZz48L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkPnsgZC50b3VyIH08L3RkPlxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICkgfVxuICAgICAgICAgICAgPC90Ym9keT48L3RhYmxlPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIEhlYWRKdWRnZVRlY2hKdWRnZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldFRpbWluZ0RhdGEoKSB7XG4gICAgICAgIGxldCB0dl9yYXdfdmFsdWUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEudGltaW5nX3Zpb2xhdGlvbjtcbiAgICAgICAgaWYgKHR2X3Jhd192YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIFtcIi1cIiwgXCJcIl07XG4gICAgICAgIH0gZWxzZSBpZiAodHZfcmF3X3ZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gW1wiWFwiLCBcIiBmYWlsXCJdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFtcIk9LXCIsIFwiIG9rXCJdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHRpbWluZ19kYXRhID0gdGhpcy5nZXRUaW1pbmdEYXRhKCk7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGgzIGNsYXNzTmFtZT17IHRoaXMucHJvcHMuc2NvcmUuY29uZmlybWVkID8gXCJjb25maXJtZWRcIiA6IFwiXCIgfT57IHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZS5qdWRnZS5uYW1lIH08L2gzPlxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInRlY2gtanVkZ2UtaW5mb1wiPjx0Ym9keT48dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgX18oXCJ0YWJsZXQudGVjaF9qdWRnZS5qdW1wX3N0ZXBzXCIpIH1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ2YWx1ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImlubmVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YS5qdW1wX3N0ZXBzIH1cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyBfXyhcInRhYmxldC50ZWNoX2p1ZGdlLnRpbWluZ1wiKSB9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9eyBcImlubmVyXCIgKyB0aW1pbmdfZGF0YVsxXSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0aW1pbmdfZGF0YVswXSB9XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBIZWFkSnVkZ2VUZWNoSnVkZ2VzU2NvcmVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsbF9kaXNjaXBsaW5lX2p1ZGdlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBhbGxfc2NvcmVzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldFRlY2hEaXNjaXBsaW5lSnVkZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5hbGxfZGlzY2lwbGluZV9qdWRnZXMuZmlsdGVyKChkaikgPT4gZGoucm9sZSA9PT0gXCJ0ZWNoX2p1ZGdlXCIpO1xuICAgIH1cbiAgICByZW5kZXJDb250ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRUZWNoRGlzY2lwbGluZUp1ZGdlcygpLm1hcCgodGVjaF9qdWRnZSkgPT5cbiAgICAgICAgICAgIDxIZWFkSnVkZ2VUZWNoSnVkZ2VTY29yZVxuICAgICAgICAgICAgICAgIGtleT17IHRlY2hfanVkZ2UuaWQgfVxuICAgICAgICAgICAgICAgIGRpc2NpcGxpbmVfanVkZ2U9eyB0ZWNoX2p1ZGdlIH1cbiAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuYWxsX3Njb3Jlc1t0ZWNoX2p1ZGdlLmlkXSB9IC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInNwYWNlclwiPjwvZGl2PlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckNvbnRlbnQoKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgSGVhZEp1ZGdlRGFuY2VKdWRnZVNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNjb3JlOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDx0ZCBjbGFzc05hbWU9eyB0aGlzLnByb3BzLnNjb3JlLmNvbmZpcm1lZCA/IFwiY29uZmlybWVkXCIgOiBcIlwiIH0+XG4gICAgICAgICAgICB7IHRoaXMucHJvcHMuc2NvcmUuZGF0YS50b3RhbF9zY29yZS50b0ZpeGVkKDIpIH1cbiAgICAgICAgPC90ZD5cbiAgICB9XG59XG5cbmNsYXNzIEhlYWRKdWRnZURhbmNlSnVkZ2VzU2NvcmVzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsbF9kaXNjaXBsaW5lX2p1ZGdlczogUmVhY3QuUHJvcFR5cGVzLmFycmF5LmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBhbGxfc2NvcmVzOiBSZWFjdC5Qcm9wVHlwZXMub2JqZWN0LmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldERhbmNlRGlzY2lwbGluZUp1ZGdlcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWxsX2Rpc2NpcGxpbmVfanVkZ2VzLmZpbHRlcigoZGopID0+IGRqLnJvbGUgPT09IFwiZGFuY2VfanVkZ2VcIiB8fCBkai5yb2xlID09PSBcImFjcm9fanVkZ2VcIik7XG4gICAgfVxuICAgIHJlbmRlck51bWJlcnMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldERhbmNlRGlzY2lwbGluZUp1ZGdlcygpLm1hcCgoanVkZ2UpID0+XG4gICAgICAgICAgICA8dGQga2V5PXsganVkZ2UuaWQgfT57IGp1ZGdlLmp1ZGdlLm51bWJlciB9eyBqdWRnZS5yb2xlID09PSBcImFjcm9fanVkZ2VcIiA/IFwiIChBKVwiIDogXCJcIiB9PC90ZD5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmVzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXREYW5jZURpc2NpcGxpbmVKdWRnZXMoKS5tYXAoKGp1ZGdlKSA9PlxuICAgICAgICAgICAgPEhlYWRKdWRnZURhbmNlSnVkZ2VTY29yZVxuICAgICAgICAgICAgICAgIGtleT17IGp1ZGdlLmlkIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlPXsganVkZ2UgfVxuICAgICAgICAgICAgICAgIHNjb3JlPXsgdGhpcy5wcm9wcy5hbGxfc2NvcmVzW2p1ZGdlLmlkXSB9IC8+XG4gICAgICAgICk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8aDM+eyBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLmRhbmNlX2p1ZGdlX3Njb3Jlc1wiKSB9PC9oMz5cbiAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9XCJkYW5jZS1qdWRnZS1zY29yZXNcIj48dGJvZHk+XG4gICAgICAgICAgICAgICAgPHRyIGNsYXNzTmFtZT1cIm51bWJlcnNcIj57IHRoaXMucmVuZGVyTnVtYmVycygpIH08L3RyPlxuICAgICAgICAgICAgICAgIDx0ciBjbGFzc05hbWU9XCJzY29yZXNcIj57IHRoaXMucmVuZGVyU2NvcmVzKCkgfTwvdHI+XG4gICAgICAgICAgICA8L3Rib2R5PjwvdGFibGU+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgSGVhZEp1ZGdlTm90UGVyZm9ybWVkU3dpdGNoIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBlcmZvcm1lZDogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgICAgICBydW5faWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgbWFya05vdFBlcmZvcm1lZCgpIHtcbiAgICAgICAgQXBpKFwicnVuLm1hcmtfbm90X3BlcmZvcm1lZFwiLCB7IHJ1bl9pZDogdGhpcy5wcm9wcy5ydW5faWQgfSkuc2VuZCgpO1xuICAgIH1cbiAgICBtYXJrUGVyZm9ybWVkKCkge1xuICAgICAgICBBcGkoXCJydW4ubWFya19wZXJmb3JtZWRcIiwgeyBydW5faWQ6IHRoaXMucHJvcHMucnVuX2lkIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgcmVuZGVyQnV0dG9uKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5wZXJmb3JtZWQpIHtcbiAgICAgICAgICAgIHJldHVybiA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzc05hbWU9XCJidG4gYnRuLXNtIGJ0bi1kYW5nZXJcIiB7IC4uLm9uVG91Y2hPckNsaWNrKHRoaXMubWFya05vdFBlcmZvcm1lZC5iaW5kKHRoaXMpKSB9PlxuICAgICAgICAgICAgICAgIHsgXyhcInRhYmxldC5idXR0b25zLm5vdF9wZXJmb3JtZWRcIikgfVxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3NOYW1lPVwiYnRuIGJ0bi1zbSBidG4tc3VjY2Vzc1wiIHsgLi4ub25Ub3VjaE9yQ2xpY2sodGhpcy5tYXJrUGVyZm9ybWVkLmJpbmQodGhpcykpIH0+XG4gICAgICAgICAgICAgICAgeyBfKFwidGFibGV0LmJ1dHRvbnMucGVyZm9ybWVkXCIpIH1cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibm90LXBlcmZvcm1lZC1jb250cm9sXCI+XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQnV0dG9uKCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIEhlYWRKdWRnZVNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmluZ19zeXN0ZW1fbmFtZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgYWxsX2Rpc2NpcGxpbmVfanVkZ2VzOiBSZWFjdC5Qcm9wVHlwZXMuYXJyYXkuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIGFsbF9zY29yZXM6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJ1bjogUmVhY3QuUHJvcFR5cGVzLm9iamVjdC5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2NvcmU6IFJlYWN0LlByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU6IFJlYWN0LlByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldFBlbmFsdHlDb2ljZXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5mb3JtYXRpb25cIikge1xuICAgICAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgICAgICBbMCwgICAgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5va1wiKV0sXG4gICAgICAgICAgICAgICAgWy01LCAgIF9fKFwidGFibGV0LmhlYWRfanVkZ2UuZm9ybV95ZWxsb3dfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0xNSwgIF9fKFwidGFibGV0LmhlYWRfanVkZ2UuZm9ybV9yZWRfY2FyZFwiKV0sXG4gICAgICAgICAgICAgICAgWy0xMDAsIF9fKFwidGFibGV0LmhlYWRfanVkZ2UuYmxhY2tfY2FyZFwiKV1cbiAgICAgICAgICAgIF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFswLCAgICBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLm9rXCIpXSxcbiAgICAgICAgICAgIFstMywgICBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLnllbGxvd19jYXJkXCIpXSxcbiAgICAgICAgICAgIFstMzAsICBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLnJlZF9jYXJkXCIpXSxcbiAgICAgICAgICAgIFstMTAwLCBfXyhcInRhYmxldC5oZWFkX2p1ZGdlLmJsYWNrX2NhcmRcIildXG4gICAgICAgIF07XG4gICAgfVxuICAgIGdlbk9uUGVuYWx0eVVwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIChuZXdfdmFsdWUpID0+IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcInBlbmFsdHlcIiwgbmV3X3ZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCkge1xuICAgICAgICAgICAgcmV0dXJuIDxIZWFkSnVkZ2VOb3RQZXJmb3JtZWRTd2l0Y2hcbiAgICAgICAgICAgICAgICBydW5faWQ9eyB0aGlzLnByb3BzLnJ1bi5pZCB9XG4gICAgICAgICAgICAgICAgcGVyZm9ybWVkPXsgdGhpcy5wcm9wcy5ydW4ucGVyZm9ybWVkIH0gLz5cblxuICAgICAgICB9XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuaGVhZF9qdWRnZS5wZW5hbHR5X3R5cGVcIikgfTwvaDM+XG4gICAgICAgICAgICA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmdldFBlbmFsdHlDb2ljZXMoKSB9XG4gICAgICAgICAgICAgICAgYWN0aXZlPXsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhLnBlbmFsdHkgfVxuICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLmdlbk9uUGVuYWx0eVVwZGF0ZSgpIH0gLz5cbiAgICAgICAgICAgIDxIZWFkSnVkZ2VUZWNoSnVkZ2VzU2NvcmVzXG4gICAgICAgICAgICAgICAgYWxsX2Rpc2NpcGxpbmVfanVkZ2VzPXsgdGhpcy5wcm9wcy5hbGxfZGlzY2lwbGluZV9qdWRnZXMgfVxuICAgICAgICAgICAgICAgIGFsbF9zY29yZXM9eyB0aGlzLnByb3BzLmFsbF9zY29yZXMgfSAvPlxuICAgICAgICAgICAgPEhlYWRKdWRnZURhbmNlSnVkZ2VzU2NvcmVzXG4gICAgICAgICAgICAgICAgYWxsX2Rpc2NpcGxpbmVfanVkZ2VzPXsgdGhpcy5wcm9wcy5hbGxfZGlzY2lwbGluZV9qdWRnZXMgfVxuICAgICAgICAgICAgICAgIGFsbF9zY29yZXM9eyB0aGlzLnByb3BzLmFsbF9zY29yZXMgfSAvPlxuICAgICAgICAgICAgPEhlYWRKdWRnZUFjdG9iYXRpY092ZXJyaWRlc1xuICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M9eyB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzIH0gLz5cbiAgICAgICAgICAgIDxIZWFkSnVkZ2VQcmV2aW91c1BlbmFsdGllc1xuICAgICAgICAgICAgICAgIHBlbmFsdGllcz17IHRoaXMucHJvcHMucnVuLmluaGVyaXRlZF9kYXRhLnBlbmFsdGllcyB9IC8+XG4gICAgICAgICAgICA8SGVhZEp1ZGdlTm90UGVyZm9ybWVkU3dpdGNoXG4gICAgICAgICAgICAgICAgcnVuX2lkPXsgdGhpcy5wcm9wcy5ydW4uaWQgfVxuICAgICAgICAgICAgICAgIHBlcmZvcm1lZD17IHRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuLy8gVGVjaCBKdWRnZVxuXG5jbGFzcyBUZWNoSnVkZ2VBY3JvYmF0aWNPdmVycmlkZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJ0ZWNoLWp1ZGdlLWFjcm9cIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udHJvbHMgcHVsbC1yaWdodFwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic2V0dGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxUYWJsZXRQb2ludDVJbnB1dFxuICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLmFjcm8uc2NvcmUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMucHJvcHMub25BY3JvT3ZlcnJpZGUgfSAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8aDM+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmFjcm8uZGVzY3JpcHRpb24gfSAoPXsgdGhpcy5wcm9wcy5hY3JvLm9yaWdpbmFsX3Njb3JlIH0pXG4gICAgICAgICAgICA8L2gzPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjbGVhcmZpeFwiPjwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFRlY2hKdWRnZUFjcm9TY29yZUlucHV0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBnZW5PbkFjcm9PdmVycmlkZShhY3JvX2lkeCkge1xuICAgICAgICByZXR1cm4gKG5ld192YWx1ZSkgPT4gdGhpcy5wcm9wcy5vbkFjcm9PdmVycmlkZShhY3JvX2lkeCwgbmV3X3ZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyQ29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuYWNyb2JhdGljcy5tYXAoKGFjcm8sIGlkeCkgPT5cbiAgICAgICAgICAgIDxUZWNoSnVkZ2VBY3JvYmF0aWNPdmVycmlkZVxuICAgICAgICAgICAgICAgIGtleT17IGlkeCB9XG4gICAgICAgICAgICAgICAgYWNybz17IGFjcm8gfVxuICAgICAgICAgICAgICAgIG9uQWNyb092ZXJyaWRlPXsgdGhpcy5nZW5PbkFjcm9PdmVycmlkZShpZHgpIH0gLz5cbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJDb250ZW50KCkgfVxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG5cbmNsYXNzIFRlY2hKdWRnZURhbmNlU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgZ2VuT25TY29yZVVwZGF0ZShzY29yZV9wYXJ0KSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCwgbmV3X3ZhbHVlKTtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgc2NvcmUgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGE7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQudGVjaF9qdWRnZS5qdW1wX3N0ZXBzXCIpIH08L2gzPlxuICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxuICAgICAgICAgICAgICAgIHZhbHVlPXsgc2NvcmUucmF3X2RhdGEuanVtcF9zdGVwcyB9XG4gICAgICAgICAgICAgICAgc2VuZERlbHRhc1xuICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLmdlbk9uU2NvcmVVcGRhdGUoXCJqdW1wX3N0ZXBzXCIpIH0gLz5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwic3BhY2VyXCI+PC9kaXY+XG4gICAgICAgICAgICA8aDM+eyBfXyhcInRhYmxldC50ZWNoX2p1ZGdlLnRpbWluZ1wiKSB9PC9oMz5cbiAgICAgICAgICAgIDxTdG9wV2F0Y2ggc2NvcmVfaWQ9eyB0aGlzLnByb3BzLnNjb3JlLmlkIH0gLz5cbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IFtbdHJ1ZSwgXCJYXCJdLCBbbnVsbCwgXCItXCJdLCBbZmFsc2UsIFwiT0tcIl1dIH1cbiAgICAgICAgICAgICAgICBhY3RpdmU9eyBzY29yZS5yYXdfZGF0YS50aW1pbmdfdmlvbGF0aW9uIH1cbiAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblNjb3JlVXBkYXRlKFwidGltaW5nX3Zpb2xhdGlvblwiKSB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgVGVjaEp1ZGdlU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5wYWdlID09PSBcImFjcm9cIikge1xuICAgICAgICAgICAgcmV0dXJuIDxUZWNoSnVkZ2VBY3JvU2NvcmVJbnB1dFxuICAgICAgICAgICAgICAgIGFjcm9iYXRpY3M9eyB0aGlzLnByb3BzLnJ1bi5hY3JvYmF0aWNzIH1cbiAgICAgICAgICAgICAgICBvbkFjcm9PdmVycmlkZT17IHRoaXMucHJvcHMub25BY3JvT3ZlcnJpZGUgfSAvPlxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDxUZWNoSnVkZ2VEYW5jZVNjb3JlSW5wdXRcbiAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUgfSAvPlxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyBEYW5jZSBqdWRnZVxuXG5jbGFzcyBEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGdlbk9uU2NvcmVVcGRhdGUoKSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUodGhpcy5wcm9wcy5wYXJ0LCBuZXdfdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNraXBfaGVhZGVyKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGgzPnsgX18oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuXCIgKyB0aGlzLnByb3BzLnBhcnQpIH08L2gzPlxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlckhlYWRlcigpIH1cbiAgICAgICAgICAgIDxTY29yZVBhcnRTY2FsZVxuICAgICAgICAgICAgICAgIHNjYWxlPXsgdGhpcy5wcm9wcy5zY2FsZSB9XG4gICAgICAgICAgICAgICAgYWN0aXZlPXsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhW3RoaXMucHJvcHMucGFydF0gfVxuICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLmdlbk9uU2NvcmVVcGRhdGUoKSB9XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHMuc2NhbGVfcHJvcHN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgRGFuY2VKdWRnZVNjb3JlTWlzdGFrZXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGdlbk9uU2NvcmVVcGRhdGUoc2NvcmVfcGFydCkge1xuICAgICAgICByZXR1cm4gKG5ld192YWx1ZSkgPT4gdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlKHNjb3JlX3BhcnQsIG5ld192YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHNjb3JlX2RhdGEgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGE7XG4gICAgICAgIHJldHVybiA8dGFibGUgY2xhc3NOYW1lPVwibWlzdGFrZXMgZnVsbC13aWR0aFwiPjx0Ym9keT48dHI+XG4gICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuZGFuY2VfanVkZ2Uuc21hbGxfbWlzdGFrZXNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlX2RhdGEuc21hbGxfbWlzdGFrZXMgfVxuICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblNjb3JlVXBkYXRlKFwic21hbGxfbWlzdGFrZXNcIikgfSAvPlxuICAgICAgICAgICAgPC90ZD48dGQ+XG4gICAgICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuYmlnX21pc3Rha2VzXCIpIH08L2gzPlxuICAgICAgICAgICAgICAgIDxUYWJsZXRJbnRlZ2VySW5wdXRcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZV9kYXRhLmJpZ19taXN0YWtlcyB9XG4gICAgICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLmdlbk9uU2NvcmVVcGRhdGUoXCJiaWdfbWlzdGFrZXNcIikgfSAvPlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj48L3Rib2R5PjwvdGFibGU+XG4gICAgfVxufVxuXG5jbGFzcyBEYW5jZUp1ZGdlU2NvcmVGb3JtYXRpb25NaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBsZXQgc2NvcmVfZGF0YSA9IHRoaXMucHJvcHMuc2NvcmUuZGF0YS5yYXdfZGF0YTtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibWlzdGFrZXNcIj5cbiAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LmRhbmNlX2p1ZGdlLmZvcm1fbWlzdGFrZXNcIikgfTwvaDM+XG4gICAgICAgICAgICA8VGFibGV0SW50ZWdlcklucHV0XG4gICAgICAgICAgICAgICAgdmFsdWU9eyBzY29yZV9kYXRhLm1pc3Rha2VzIH1cbiAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlLmJpbmQodGhpcywgXCJtaXN0YWtlc1wiKSB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgRGFuY2VKdWRnZVNjb3JlRm9ybWF0aW9uQWNyb01pc3Rha2VzIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBnZW5PblNjb3JlVXBkYXRlKHNjb3JlX3BhcnQpIHtcbiAgICAgICAgcmV0dXJuIChuZXdfdmFsdWUpID0+IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShzY29yZV9wYXJ0LCBuZXdfdmFsdWUpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCBzY29yZV9kYXRhID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhO1xuICAgICAgICByZXR1cm4gPHRhYmxlIGNsYXNzTmFtZT1cIm1pc3Rha2VzIGZ1bGwtd2lkdGhcIj48dGJvZHk+PHRyPlxuICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxoMz57IF9fKFwidGFibGV0LmRhbmNlX2p1ZGdlLmZvcm1fc21hbGxfbWlzdGFrZXNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlX2RhdGEuc21hbGxfbWlzdGFrZXMgfVxuICAgICAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5nZW5PblNjb3JlVXBkYXRlKFwic21hbGxfbWlzdGFrZXNcIikgfSAvPlxuICAgICAgICAgICAgPC90ZD48dGQ+XG4gICAgICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuZGFuY2VfanVkZ2UuZm9ybV9iaWdfbWlzdGFrZXNcIikgfTwvaDM+XG4gICAgICAgICAgICAgICAgPFRhYmxldEludGVnZXJJbnB1dFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZT17IHNjb3JlX2RhdGEuYmlnX21pc3Rha2VzIH1cbiAgICAgICAgICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZT17IHRoaXMuZ2VuT25TY29yZVVwZGF0ZShcImJpZ19taXN0YWtlc1wiKSB9IC8+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cbiAgICB9XG59XG5cbmNsYXNzIERhbmNlSnVkZ2VGaW5hbERhbmNlU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZndfd29tYW5cIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwicmVkdWN0aW9uXCJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZndfbWFuXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInJlZHVjdGlvblwiXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImRhbmNlX2ZpZ3NcIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTIuNSxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxuICAgICAgICAgICAgICAgIHBhcnQ9XCJjb21wb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJwb2ludDVcIlxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiAxMCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZU1pc3Rha2VzXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgRGFuY2VKdWRnZURhbmNlU2NvcmVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZndfd29tYW5cIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwicmVkdWN0aW9uXCJcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZndfbWFuXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInJlZHVjdGlvblwiXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImRhbmNlX2ZpZ3NcIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwiaW50ZWdlclwiXG4gICAgICAgICAgICAgICAgc2NhbGVfcHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IDI1LFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImNvbXBvc2l0aW9uXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cImludGVnZXJcIlxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiAyMCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZU1pc3Rha2VzXG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgRGFuY2VKdWRnZUZvcm1hdGlvblNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImRhbmNlX3RlY2hcIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZGFuY2VfZmlnc1wiXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJwb2ludDVcIlxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiAxMCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxuICAgICAgICAgICAgICAgIHBhcnQ9XCJpbXByZXNzaW9uXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInBvaW50NVwiXG4gICAgICAgICAgICAgICAgc2NhbGVfcHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IDEwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlRm9ybWF0aW9uTWlzdGFrZXNcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBEYW5jZUp1ZGdlRm9ybWF0aW9uQWNyb1Njb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImFjcm9iYXRpY3NcIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVQYXJ0SW5wdXRcbiAgICAgICAgICAgICAgICBwYXJ0PVwiZGFuY2VfdGVjaFwiXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJwb2ludDVcIlxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiAxMCxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICAgICAgPERhbmNlSnVkZ2VTY29yZVBhcnRJbnB1dFxuICAgICAgICAgICAgICAgIHBhcnQ9XCJkYW5jZV9maWdzXCJcbiAgICAgICAgICAgICAgICBzY2FsZT1cInBvaW50NVwiXG4gICAgICAgICAgICAgICAgc2NhbGVfcHJvcHM9e3tcbiAgICAgICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgICAgICBtYXg6IDEwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cImltcHJlc3Npb25cIlxuICAgICAgICAgICAgICAgIHNjYWxlPVwicG9pbnQ1XCJcbiAgICAgICAgICAgICAgICBzY2FsZV9wcm9wcz17e1xuICAgICAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgICAgIG1heDogMTAsXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgICAgIDxEYW5jZUp1ZGdlU2NvcmVGb3JtYXRpb25BY3JvTWlzdGFrZXNcbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBEYW5jZUp1ZGdlU2ltcGxpZmllZFNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXY+XG4gICAgICAgICAgICA8RGFuY2VKdWRnZVNjb3JlUGFydElucHV0XG4gICAgICAgICAgICAgICAgcGFydD1cInBvaW50c1wiXG4gICAgICAgICAgICAgICAgc2NhbGU9XCJncmlkXCJcbiAgICAgICAgICAgICAgICBza2lwX2hlYWRlclxuICAgICAgICAgICAgICAgIHNjYWxlX3Byb3BzPXt7XG4gICAgICAgICAgICAgICAgICAgIG1pbjogMSxcbiAgICAgICAgICAgICAgICAgICAgbWF4OiA0MCxcbiAgICAgICAgICAgICAgICAgICAgcm93X3NpemU6IDEwLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgRGFuY2VKdWRnZVNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHByb3BzID0ge1xuICAgICAgICAgICAgc2NvcmU6IHRoaXMucHJvcHMuc2NvcmUsXG4gICAgICAgICAgICBvblNjb3JlVXBkYXRlOiB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUsXG4gICAgICAgIH07XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zY29yaW5nX3N5c3RlbV9uYW1lKSB7XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLmFjcm9cIjpcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIubm9fYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIDxEYW5jZUp1ZGdlRGFuY2VTY29yZUlucHV0IHsuLi5wcm9wc30gLz5cbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfZndcIjpcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIDxEYW5jZUp1ZGdlRmluYWxEYW5jZVNjb3JlSW5wdXQgey4uLnByb3BzfSAvPlxuICAgICAgICBjYXNlIFwicm9zZmFyci5mb3JtYXRpb25cIjpcbiAgICAgICAgICAgIHJldHVybiA8RGFuY2VKdWRnZUZvcm1hdGlvblNjb3JlSW5wdXQgey4uLnByb3BzfSAvPlxuICAgICAgICBjYXNlIFwicm9zZmFyci5mb3JtYXRpb25fYWNyb1wiOlxuICAgICAgICAgICAgcmV0dXJuIDxEYW5jZUp1ZGdlRm9ybWF0aW9uQWNyb1Njb3JlSW5wdXQgey4uLnByb3BzfSAvPlxuICAgICAgICBjYXNlIFwicm9zZmFyci5zaW1wbGlmaWVkXCI6XG4gICAgICAgICAgICByZXR1cm4gPERhbmNlSnVkZ2VTaW1wbGlmaWVkU2NvcmVJbnB1dCB7Li4ucHJvcHN9IC8+XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gQWNybyBqdWRnZVxuXG5jbGFzcyBBY3JvSnVkZ2VBY3JvYmF0aWNJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdj5cbiAgICAgICAgICAgIDxoMz57IF8oXCJ0YWJsZXQuaGVhZGVycy5hY3JvX25cIiwgdGhpcy5wcm9wcy5hY3JvX2lkeCkgfTwvaDM+XG4gICAgICAgICAgICA8U2NvcmVQYXJ0U2NhbGVcbiAgICAgICAgICAgICAgICBzY2FsZT1cInJlZHVjdGlvblwiXG4gICAgICAgICAgICAgICAgYWN0aXZlPXsgdGhpcy5wcm9wcy5yZWR1Y3Rpb24gfVxuICAgICAgICAgICAgICAgIG9uVmFsdWVVcGRhdGU9eyB0aGlzLnByb3BzLm9uQWNyb1JlZHVjdGlvblVwZGF0ZSB9IC8+XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgQWNyb0p1ZGdlU2NvcmVNaXN0YWtlcyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJtaXN0YWtlc1wiPlxuICAgICAgICAgICAgPGgzPnsgX18oXCJ0YWJsZXQuYWNyb19qdWRnZS5mYWxsX2Rvd25cIikgfTwvaDM+XG4gICAgICAgICAgICA8VGFibGV0SW50ZWdlcklucHV0XG4gICAgICAgICAgICAgICAgdmFsdWU9eyB0aGlzLnByb3BzLm1pc3Rha2VzIH1cbiAgICAgICAgICAgICAgICBvblZhbHVlVXBkYXRlPXsgdGhpcy5wcm9wcy5vblNjb3JlVXBkYXRlIH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBBY3JvSnVkZ2VJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgZ2VuT25BY3JvUmVkdWN0aW9uVXBkYXRlKGFjcm9faWR4KSB7XG4gICAgICAgIHJldHVybiAobmV3X3ZhbHVlKSA9PiB0aGlzLnByb3BzLm9uQWNyb1JlZHVjdGlvblVwZGF0ZShhY3JvX2lkeCwgbmV3X3ZhbHVlKTtcbiAgICB9XG4gICAgZ2VuT25NaXN0YWtlc1VwZGF0ZSgpIHtcbiAgICAgICAgcmV0dXJuIChuZXdfdmFsdWUpID0+IHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShcIm1pc3Rha2VzXCIsIG5ld192YWx1ZSk7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgbGV0IHNjb3JlX2RhdGEgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGE7XG4gICAgICAgIHJldHVybiA8ZGl2PlxuICAgICAgICAgICAgeyBzY29yZV9kYXRhLnJlZHVjdGlvbnMubWFwKChyZWR1Y3Rpb24sIGFjcm9faWR4KSA9PlxuICAgICAgICAgICAgICAgIDxBY3JvSnVkZ2VBY3JvYmF0aWNJbnB1dFxuICAgICAgICAgICAgICAgICAgICBrZXk9eyBhY3JvX2lkeCB9XG4gICAgICAgICAgICAgICAgICAgIHJlZHVjdGlvbj17IHJlZHVjdGlvbiB9XG4gICAgICAgICAgICAgICAgICAgIGFjcm9faWR4PXsgYWNyb19pZHggfVxuICAgICAgICAgICAgICAgICAgICBvbkFjcm9SZWR1Y3Rpb25VcGRhdGU9eyB0aGlzLmdlbk9uQWNyb1JlZHVjdGlvblVwZGF0ZShhY3JvX2lkeCkgfSAvPlxuICAgICAgICAgICAgKSB9XG4gICAgICAgICAgICA8QWNyb0p1ZGdlU2NvcmVNaXN0YWtlc1xuICAgICAgICAgICAgICAgIG1pc3Rha2VzPXsgc2NvcmVfZGF0YS5taXN0YWtlcyB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMuZ2VuT25NaXN0YWtlc1VwZGF0ZSgpIH0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG4vLyBDb21tb25cblxuY2xhc3MgTm90UGVyZm9ybWluZ01lc3NhZ2UgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwibm90LXBlcmZvcm1pbmdcIj5cbiAgICAgICAgICAgIHsgXyhcInRhYmxldC5tZXNzYWdlcy5ub3RfcGVyZm9ybWluZ1wiKSB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuY2xhc3MgU2NvcmVQYXJ0U2NhbGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIGdlblBvc3NpYmxlUmVkdWN0aW9ucygpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIFsxMDAsIFwiWFwiXSxcbiAgICAgICAgICAgIFs3NSwgIFwiLTc1JVwiXSxcbiAgICAgICAgICAgIFs1MCwgIFwiLTUwJVwiXSxcbiAgICAgICAgICAgIFsyNSwgIFwiLTI1JVwiXSxcbiAgICAgICAgICAgIFsxMCwgIFwiLTEwJVwiXSxcbiAgICAgICAgICAgIFs1LCAgIFwiLTUlXCJdLFxuICAgICAgICAgICAgWzAsICAgXCJPS1wiXSxcbiAgICAgICAgXVxuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHN3aXRjaCAodGhpcy5wcm9wcy5zY2FsZSkge1xuICAgICAgICBjYXNlIFwicG9pbnQ1XCI6XG4gICAgICAgICAgICByZXR1cm4gPFRhYmxldFBvaW50NVNlbGVjdElucHV0IHN0eWxlPVwidHdvLWxpbmVzXCIgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgIGNhc2UgXCJpbnRlZ2VyXCI6XG4gICAgICAgICAgICByZXR1cm4gPFRhYmxldEludGVnZXJTZWxlY3RJbnB1dCBzdHlsZT1cInR3by1saW5lc1wiIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgICBjYXNlIFwiZ3JpZFwiOlxuICAgICAgICAgICAgcmV0dXJuIDxUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQgc3R5bGU9XCJncmlkXCIgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICAgIGNhc2UgXCJyZWR1Y3Rpb25cIjpcbiAgICAgICAgICAgIHJldHVybiA8VGFibGV0U2VsZWN0b3JJbnB1dFxuICAgICAgICAgICAgICAgIHN0eWxlPVwib25lLWxpbmVcIlxuICAgICAgICAgICAgICAgIGNob2ljZXM9eyB0aGlzLmdlblBvc3NpYmxlUmVkdWN0aW9ucygpIH1cbiAgICAgICAgICAgICAgICB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgICAgfVxuICAgIH1cbn1cblxuY2xhc3MgVGFibGV0U2NvcmVUb3RhbFNjb3JlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCByb2xlID0gdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlLnJvbGU7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNjb3Jpbmdfc3lzdGVtX25hbWUgPT09IFwicm9zZmFyci5zaW1wbGlmaWVkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChyb2xlID09PSBcImhlYWRfanVkZ2VcIiB8fCByb2xlID09PSBcInRlY2hfanVkZ2VcIikge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwidG90YWwtc2NvcmVcIj5cbiAgICAgICAgICAgIHsgX18oXCJ0YWJsZXQuZ2xvYmFsLnRvdGFsX3Njb3JlXCIpIH06IHsgdGhpcy5wcm9wcy5zY29yZS5kYXRhLnRvdGFsX3Njb3JlIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuXG5jbGFzcyBUYWJsZXRTY29yZUNvbmZpcm1hdGlvbkJ1dHRvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgbmVlZENvbmZpcm1hdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZS5yb2xlICE9PSBcImhlYWRfanVkZ2VcIjtcbiAgICB9XG4gICAgcmVhZHlUb0NvbmZpcm0oKSB7XG4gICAgICAgIGxldCBzY29yZV9kYXRhID0gdGhpcy5wcm9wcy5zY29yZS5kYXRhLnJhd19kYXRhO1xuICAgICAgICBsZXQga2V5cyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNjb3JlX2RhdGEpO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlLnJvbGUgIT09IFwidGVjaF9qdWRnZVwiKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpZHggaW4ga2V5cykge1xuICAgICAgICAgICAgICAgIGlmIChzY29yZV9kYXRhW2tleXNbaWR4XV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHNjb3JlX2RhdGFba2V5c1tpZHhdXSA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgICAgICAgICAgICBsZXQgYXJyID0gc2NvcmVfZGF0YVtrZXlzW2lkeF1dO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBqIGluIE9iamVjdC5rZXlzKGFycikpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhcnJbal0gPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLm5lZWRDb25maXJtYXRpb24oKSkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLnJlYWR5VG9Db25maXJtKCkpIHtcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbmZpcm1cIj48L2Rpdj47XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiY29uZmlybVwiPlxuICAgICAgICAgICAgPFNsaWRlclxuICAgICAgICAgICAgICAgIG9uQWN0aXZhdGU9eyB0aGlzLnByb3BzLm9uU2NvcmVDb25maXJtIH1cbiAgICAgICAgICAgICAgICBkb25lPXsgdGhpcy5wcm9wcy5zY29yZS5jb25maXJtZWQgfVxuICAgICAgICAgICAgICAgIHNsaWRlVGV4dD17IF8oXCJqdWRnaW5nLmJ1dHRvbnMuY29uZmlybV9zY29yZVwiKSB9XG4gICAgICAgICAgICAgICAgZG9uZVRleHQ9eyBfKFwianVkZ2luZy5sYWJlbHMuY29uZmlybWVkXCIpIH0gLz5cbiAgICAgICAgPC9kaXY+O1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxldFNjb3JlSW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHVwZGF0ZVNjb3Jlcyh0eXBlLCB2YWx1ZSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWFkT25seSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBuZXdfc2NvcmUgPSB7fTtcbiAgICAgICAgbmV3X3Njb3JlW3R5cGVdID0gdmFsdWU7XG4gICAgICAgIHRoaXMucHJvcHMub25TY29yZVVwZGF0ZShuZXdfc2NvcmUpO1xuICAgIH1cbiAgICB1cGRhdGVBY3JvUmVkdWN0aW9uKGlkeCwgdmFsdWUpIHtcbiAgICAgICAgbGV0IHJlZHVjdGlvbnMgPSB0aGlzLnByb3BzLnNjb3JlLmRhdGEucmF3X2RhdGEucmVkdWN0aW9ucy5tYXAoKCkgPT4gbnVsbCk7XG4gICAgICAgIHJlZHVjdGlvbnNbaWR4XSA9IHZhbHVlO1xuICAgICAgICBsZXQgbmV3X3Njb3JlID0ge1xuICAgICAgICAgICAgcmVkdWN0aW9uczogcmVkdWN0aW9ucyxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnByb3BzLm9uU2NvcmVVcGRhdGUobmV3X3Njb3JlKTtcbiAgICB9XG4gICAgb3ZlcnJpZGVBY3JvU2NvcmUoYWNyb19pZHgsIHZhbHVlKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlYWRPbmx5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgQXBpKFwiYWNyb2JhdGljX292ZXJyaWRlLnNldFwiLCB7XG4gICAgICAgICAgICBydW5faWQ6IHRoaXMucHJvcHMucnVuLmlkLFxuICAgICAgICAgICAgYWNyb2JhdGljX2lkeDogYWNyb19pZHgsXG4gICAgICAgICAgICBzY29yZTogdmFsdWUsXG4gICAgICAgIH0pLnNlbmQoKTtcbiAgICB9XG4gICAgcmVuZGVyU2NvcmVzSW5wdXQoKSB7XG4gICAgICAgIHN3aXRjaCAoZ2V0U2NvcmluZ1R5cGUodGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlLCB0aGlzLnByb3BzLnNjb3Jpbmdfc3lzdGVtX25hbWUpKSB7XG4gICAgICAgIGNhc2UgXCJhY3JvXCI6XG4gICAgICAgICAgICByZXR1cm4gPEFjcm9KdWRnZUlucHV0XG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cbiAgICAgICAgICAgICAgICBvbkFjcm9SZWR1Y3Rpb25VcGRhdGU9eyB0aGlzLnVwZGF0ZUFjcm9SZWR1Y3Rpb24uYmluZCh0aGlzKSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMudXBkYXRlU2NvcmVzLmJpbmQodGhpcykgfSAvPlxuICAgICAgICBjYXNlIFwiZGFuY2VcIjpcbiAgICAgICAgY2FzZSBcImZvcm1hdGlvblwiOlxuICAgICAgICBjYXNlIFwiZm9ybWF0aW9uX2Fjcm9cIjpcbiAgICAgICAgY2FzZSBcInNpbXBsaWZpZWRcIjpcbiAgICAgICAgICAgIHJldHVybiA8RGFuY2VKdWRnZVNjb3JlSW5wdXRcbiAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU9eyB0aGlzLnByb3BzLnNjb3Jpbmdfc3lzdGVtX25hbWUgfVxuICAgICAgICAgICAgICAgIG9uU2NvcmVVcGRhdGU9eyB0aGlzLnVwZGF0ZVNjb3Jlcy5iaW5kKHRoaXMpIH0gLz5cbiAgICAgICAgY2FzZSBcImhlYWRcIjpcbiAgICAgICAgICAgIHJldHVybiA8SGVhZEp1ZGdlU2NvcmVJbnB1dFxuICAgICAgICAgICAgICAgIHJ1bj17IHRoaXMucHJvcHMucnVuIH1cbiAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfVxuICAgICAgICAgICAgICAgIHNjb3Jpbmdfc3lzdGVtX25hbWU9eyB0aGlzLnByb3BzLnNjb3Jpbmdfc3lzdGVtX25hbWUgfVxuICAgICAgICAgICAgICAgIGFsbF9kaXNjaXBsaW5lX2p1ZGdlcz17IHRoaXMucHJvcHMuYWxsX2Rpc2NpcGxpbmVfanVkZ2VzIH1cbiAgICAgICAgICAgICAgICBhbGxfc2NvcmVzPXsgdGhpcy5wcm9wcy5hbGxfc2NvcmVzIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlVXBkYXRlPXsgdGhpcy51cGRhdGVTY29yZXMuYmluZCh0aGlzKSB9IC8+XG4gICAgICAgIGNhc2UgXCJ0ZWNoXCI6XG4gICAgICAgICAgICByZXR1cm4gPFRlY2hKdWRnZVNjb3JlSW5wdXRcbiAgICAgICAgICAgICAgICBwYWdlPXsgdGhpcy5wcm9wcy5wYWdlIH1cbiAgICAgICAgICAgICAgICBydW49eyB0aGlzLnByb3BzLnJ1biB9XG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cbiAgICAgICAgICAgICAgICBvbkFjcm9PdmVycmlkZT17IHRoaXMub3ZlcnJpZGVBY3JvU2NvcmUuYmluZCh0aGlzKSB9XG4gICAgICAgICAgICAgICAgb25TY29yZVVwZGF0ZT17IHRoaXMudXBkYXRlU2NvcmVzLmJpbmQodGhpcykgfSAvPlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJVbmtub3duIGp1ZGdlIHJvbGVcIiwgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlLnJvbGUpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucnVuLnBlcmZvcm1lZCAmJiB0aGlzLnByb3BzLmRpc2NpcGxpbmVfanVkZ2Uucm9sZSAhPT0gXCJoZWFkX2p1ZGdlXCIpIHtcbiAgICAgICAgICAgIHJldHVybiA8Tm90UGVyZm9ybWluZ01lc3NhZ2UgLz5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9eyB0aGlzLnByb3BzLnJlYWRPbmx5ID8gXCJyZWFkLW9ubHlcIiA6IFwiXCIgfT5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJTY29yZXNJbnB1dCgpIH1cbiAgICAgICAgICAgIDxUYWJsZXRTY29yZVRvdGFsU2NvcmVcbiAgICAgICAgICAgICAgICBzY29yaW5nX3N5c3RlbV9uYW1lPXsgdGhpcy5wcm9wcy5zY29yaW5nX3N5c3RlbV9uYW1lIH1cbiAgICAgICAgICAgICAgICBkaXNjaXBsaW5lX2p1ZGdlPXsgdGhpcy5wcm9wcy5kaXNjaXBsaW5lX2p1ZGdlIH1cbiAgICAgICAgICAgICAgICBzY29yZT17IHRoaXMucHJvcHMuc2NvcmUgfSAvPlxuICAgICAgICAgICAgPFRhYmxldFNjb3JlQ29uZmlybWF0aW9uQnV0dG9uXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZT17IHRoaXMucHJvcHMuZGlzY2lwbGluZV9qdWRnZSB9XG4gICAgICAgICAgICAgICAgc2NvcmU9eyB0aGlzLnByb3BzLnNjb3JlIH1cbiAgICAgICAgICAgICAgICBvblNjb3JlQ29uZmlybT17IHRoaXMucHJvcHMub25TY29yZUNvbmZpcm0gfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICB9XG59XG4iLCJjbGFzcyBEb2N4SW1wbCB7XG4gICAgY29uc3RydWN0b3IoZmlsZW5hbWUpIHtcbiAgICAgICAgdGhpcy5maWxlbmFtZSA9IGZpbGVuYW1lO1xuICAgICAgICB0aGlzLmhlYWRlciA9IG51bGw7XG4gICAgICAgIHRoaXMudGl0bGUxID0gbnVsbDtcbiAgICAgICAgdGhpcy50aXRsZTIgPSBudWxsO1xuICAgICAgICB0aGlzLnRpdGxlMyA9IG51bGw7XG4gICAgICAgIHRoaXMubWFyZ2lucyA9IG51bGw7XG4gICAgICAgIHRoaXMuYm9keSA9IFwiXCI7XG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBcInBvcnRyYWl0XCI7XG4gICAgICAgIHRoaXMuc3R5bGVzID0ge1xuICAgICAgICAgICAgXCJib2R5XCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEwcHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtZmFtaWx5XCI6IFwiQ2FsaWJyaSwgVGFob21hLCBBcmlhbCwgc2Fucy1zZXJpZlwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGFibGVcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWNvbGxhcHNlXCI6IFwiY29sbGFwc2VcIixcbiAgICAgICAgICAgICAgICBcIndpZHRoXCI6IFwiMTAwJVwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidHJcIjoge1xuICAgICAgICAgICAgICAgIFwicGFnZS1icmVhay1pbnNpZGVcIjogXCJhdm9pZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwidGQsIHRoXCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdcIjogXCIxcHQgM3B0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoMSwgaDIsIGgzLCBoNCwgaDUsIGg2XCI6IHtcbiAgICAgICAgICAgICAgICBcInBhZ2UtYnJlYWstYWZ0ZXJcIjogXCJhdm9pZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luLWJvdHRvbVwiOiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDFcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMjBwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiMTBwdFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwiaDJcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTZwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJ0ZXh0LWFsaWduXCI6IFwiY2VudGVyXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tdG9wXCI6IFwiNnB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoM1wiOiB7XG4gICAgICAgICAgICAgICAgXCJmb250LXNpemVcIjogXCIxNnB0XCIsXG4gICAgICAgICAgICAgICAgXCJmb250LXdlaWdodFwiOiBcImJvbGRcIixcbiAgICAgICAgICAgICAgICBcInRleHQtYWxpZ25cIjogXCJjZW50ZXJcIixcbiAgICAgICAgICAgICAgICBcIm1hcmdpbi10b3BcIjogXCI0cHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImg0IHBcIjoge1xuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTRwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogXCIxMHB0IDAgNnB0XCIsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgXCJoNSBwXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjEycHRcIixcbiAgICAgICAgICAgICAgICBcImZvbnQtd2VpZ2h0XCI6IFwiYm9sZFwiLFxuICAgICAgICAgICAgICAgIFwibWFyZ2luXCI6IFwiNnB0IDBcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi5oZWFkZXJcIjoge1xuICAgICAgICAgICAgICAgIFwiYm9yZGVyLWJvdHRvbVwiOiBcIjFweCBzb2xpZCBibGFja1wiLFxuICAgICAgICAgICAgICAgIFwiZm9udC1zaXplXCI6IFwiMTBwdFwiLFxuICAgICAgICAgICAgICAgIFwiZm9udC13ZWlnaHRcIjogXCJib2xkXCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogMCxcbiAgICAgICAgICAgICAgICBcInBhZGRpbmctYm90dG9tXCI6IFwiMnB0XCIsXG4gICAgICAgICAgICAgICAgXCJtYXJnaW4tYm90dG9tXCI6IFwiMjBwdFwiLFxuICAgICAgICAgICAgICAgIFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIFwicFwiOiB7XG4gICAgICAgICAgICAgICAgXCJtYXJnaW5cIjogMCxcbiAgICAgICAgICAgICAgICBcInBhZGRpbmdcIjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcImxpXCI6IHsgXCJtYXJnaW4tdG9wXCI6IDAsIFwicGFkZGluZy10b3BcIjogMCB9LFxuICAgICAgICAgICAgXCIuc3BhY2VyXCI6IHtcbiAgICAgICAgICAgICAgICBcImZvbnQtc2l6ZVwiOiBcIjE0cHRcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi52YS10b3BcIjoge1xuICAgICAgICAgICAgICAgIFwidmVydGljYWwtYWxpZ25cIjogXCJ0b3BcIixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBcIi50ZXh0LWxlZnRcIjogeyBcInRleHQtYWxpZ25cIjogXCJsZWZ0XCIgfSxcbiAgICAgICAgICAgIFwiLnRleHQtcmlnaHRcIjogeyBcInRleHQtYWxpZ25cIjogXCJyaWdodFwiIH0sXG4gICAgICAgICAgICBcIi50ZXh0LWNlbnRlclwiOiB7IFwidGV4dC1hbGlnblwiOiBcImNlbnRlclwiIH0sXG4gICAgICAgICAgICBcIi5ib3JkZXJlZC10YWJsZSB0ZCwgLmJvcmRlcmVkLXRhYmxlIHRoXCI6IHtcbiAgICAgICAgICAgICAgICBcImJvcmRlclwiOiBcIjFwdCBzb2xpZCBibGFja1wiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmFkZFdpZHRoQ3NzKCk7XG4gICAgfVxuICAgIGFkZFdpZHRoQ3NzKCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMTsgaSA8PSAxMDA7ICsraSkge1xuICAgICAgICAgICAgdGhpcy5hZGRTdHlsZShcIi53LVwiICsgaSwgXCJ3aWR0aFwiLCBpICsgXCIlXCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkU3R5bGUoc2VsZWN0b3IsIGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCF0aGlzLnN0eWxlc1tzZWxlY3Rvcl0pIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVzW3NlbGVjdG9yXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3R5bGVzW3NlbGVjdG9yXVtrZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRIZWFkZXIoaGVhZGVyKSB7XG4gICAgICAgIHRoaXMuaGVhZGVyID0gaGVhZGVyO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0VGl0bGUxKHRpdGxlMSkge1xuICAgICAgICB0aGlzLnRpdGxlMSA9IHRpdGxlMTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldFRpdGxlMih0aXRsZTIpIHtcbiAgICAgICAgdGhpcy50aXRsZTIgPSB0aXRsZTI7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRUaXRsZTModGl0bGUzKSB7XG4gICAgICAgIHRoaXMudGl0bGUzID0gdGl0bGUzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgc2V0TWFyZ2lucyhtYXJnaW5zKSB7XG4gICAgICAgIHRoaXMubWFyZ2lucyA9IG1hcmdpbnM7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBzZXRCb2R5KGJvZHkpIHtcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIHNldE9yaWVudGF0aW9uKG9yaWVudGF0aW9uKSB7XG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgcmVuZGVyU3R5bGVCbG9jayhzZWxlY3RvciwgZGF0YSkge1xuICAgICAgICBsZXQgY3NzX3BhaXJzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoZGF0YSkubWFwKChrZXkpID0+IGtleSArICc6ICcgKyBkYXRhW2tleV0gKyAnOyAnKVxuICAgICAgICByZXR1cm4gc2VsZWN0b3IgKyBcIiB7IFwiICsgY3NzX3BhaXJzLmpvaW4oXCIgXCIpICsgXCIgfVwiO1xuICAgIH1cbiAgICByZW5kZXJTdHlsZXMoKSB7XG4gICAgICAgIGxldCBjc3NfYmxvY2tzID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5zdHlsZXMpLm1hcCgoXG4gICAgICAgICAgICAoc2VsZWN0b3IpID0+IHRoaXMucmVuZGVyU3R5bGVCbG9jayhzZWxlY3RvciwgdGhpcy5zdHlsZXNbc2VsZWN0b3JdKVxuICAgICAgICApLmJpbmQodGhpcykpO1xuICAgICAgICByZXR1cm4gY3NzX2Jsb2Nrcy5qb2luKFwiXFxuXCIpO1xuICAgIH1cbiAgICByZW5kZXJIVE1MKCkge1xuICAgICAgICBsZXQgY3NzID0gdGhpcy5yZW5kZXJTdHlsZXMoKTtcbiAgICAgICAgbGV0IGhlYWRlciA9IHRoaXMuaGVhZGVyID8gJzxwIGNsYXNzPVwiaGVhZGVyXCI+JyArIHRoaXMuaGVhZGVyICsgJzwvcD4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMSA9IHRoaXMudGl0bGUxID8gJzxoMT4nICsgdGhpcy50aXRsZTEgKyAnPC9oMT4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMiA9IHRoaXMudGl0bGUyID8gJzxoMj4nICsgdGhpcy50aXRsZTIgKyAnPC9oMj4nIDogXCJcIjtcbiAgICAgICAgbGV0IHRpdGxlMyA9IHRoaXMudGl0bGUzID8gJzxoMz4nICsgdGhpcy50aXRsZTMgKyAnPC9oMz4nIDogXCJcIjtcbiAgICAgICAgbGV0IHNwYWNlciA9IChoZWFkZXIgfHwgdGl0bGUxIHx8IHRpdGxlMiB8fCB0aXRsZTMpID8gJzxwIGNsYXNzPVwic3BhY2VyXCI+Jm5ic3A7PC9wPicgOiBcIlwiO1xuICAgICAgICByZXR1cm4gXCI8IURPQ1RZUEUgaHRtbD5cXG5cIiArXG4gICAgICAgICAgICBcIjxodG1sPjxoZWFkPlwiICtcbiAgICAgICAgICAgICAgICBcIjxtZXRhIGNoYXJzZXQ9XFxcInV0Zi04XFxcIj5cIiArXG4gICAgICAgICAgICAgICAgXCI8c3R5bGU+XFxuXCIgKyBjc3MgKyBcIlxcbjwvc3R5bGU+XFxuXCIgK1xuICAgICAgICAgICAgXCI8L2hlYWQ+PGJvZHk+XFxuXCIgK1xuICAgICAgICAgICAgICAgIGhlYWRlciArXG4gICAgICAgICAgICAgICAgdGl0bGUxICtcbiAgICAgICAgICAgICAgICB0aXRsZTIgK1xuICAgICAgICAgICAgICAgIHRpdGxlMyArXG4gICAgICAgICAgICAgICAgc3BhY2VyICtcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkgK1xuICAgICAgICAgICAgXCI8L2JvZHk+PC9odG1sPlwiO1xuICAgIH1cblxuICAgIHNhdmUoKSB7XG4gICAgICAgIGxldCBodG1sID0gdGhpcy5yZW5kZXJIVE1MKCk7XG4gICAgICAgIGxldCBtYXJnaW5zID0gdGhpcy5tYXJnaW5zIHx8ICh0aGlzLm9yaWVudGF0aW9uID09PSBcInBvcnRyYWl0XCIgPyBbMTAsIDE1LCAxMCwgMTVdIDogWzcsIDEwLCA3LCAxMF0pO1xuICAgICAgICBsZXQgY29udmVydGVkID0gaHRtbERvY3guYXNCbG9iKGh0bWwsIHtcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiB0aGlzLm9yaWVudGF0aW9uLFxuICAgICAgICAgICAgbWFyZ2luczoge1xuICAgICAgICAgICAgICAgIHRvcDogICAgTWF0aC5mbG9vcihtYXJnaW5zWzBdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiAgTWF0aC5mbG9vcihtYXJnaW5zWzFdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogTWF0aC5mbG9vcihtYXJnaW5zWzJdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGxlZnQ6ICAgTWF0aC5mbG9vcihtYXJnaW5zWzNdICogNTYuNjU5KS50b1N0cmluZygpLFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgc2F2ZUFzKGNvbnZlcnRlZCwgdGhpcy5maWxlbmFtZSk7XG4gICAgfVxufVxuXG5cbmV4cG9ydCB2YXIgRG9jeCA9IChmbikgPT4gbmV3IERvY3hJbXBsKGZuKTtcbiIsImV4cG9ydCBjbGFzcyBSdW5TY29yZXNXcmFwcGVyIHtcbiAgICBjb25zdHJ1Y3RvcihydW4sIGRpc2NpcGxpbmVfanVkZ2VzKSB7XG4gICAgICAgIHRoaXMucnVuID0gcnVuO1xuICAgICAgICB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzID0gZGlzY2lwbGluZV9qdWRnZXM7XG4gICAgICAgIHRoaXMuc2NvcmVzX2J5X2Rpc2NpcGxpbmVfanVkZ2VfaWQgPSB7fVxuICAgICAgICBydW4uc2NvcmVzLmZvckVhY2goZnVuY3Rpb24oc2NvcmUpIHtcbiAgICAgICAgICAgIGxldCBkal9pZCA9IHNjb3JlLmRpc2NpcGxpbmVfanVkZ2VfaWQ7XG4gICAgICAgICAgICB0aGlzLnNjb3Jlc19ieV9kaXNjaXBsaW5lX2p1ZGdlX2lkW2RqX2lkXSA9IHNjb3JlO1xuICAgICAgICB9LmJpbmQodGhpcykpO1xuICAgIH1cbiAgICBnZXRTY29yZXNCeUp1ZGdlSWRzKGRpc2NpcGxpbmVfanVkZ2VfaWRzKSB7XG4gICAgICAgIHJldHVybiBkaXNjaXBsaW5lX2p1ZGdlX2lkcy5tYXAoKChkal9pZCkgPT4gdGhpcy5zY29yZXNfYnlfZGlzY2lwbGluZV9qdWRnZV9pZFtkal9pZF0pLmJpbmQodGhpcykpO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRvdXJTY29yZXNXcmFwcGVyIHtcbiAgICBjb25zdHJ1Y3Rvcih0b3VyLCByZXN1bHRzKSB7XG4gICAgICAgIHRoaXMucnVuX3dyYXBwZXJzID0gdG91ci5ydW5zLm1hcCgocnVuKSA9PiBuZXcgUnVuU2NvcmVzV3JhcHBlcihydW4sIHRvdXIuZGlzY2lwbGluZV9qdWRnZXMpKTtcbiAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlcyA9IHRvdXIuZGlzY2lwbGluZS5kaXNjaXBsaW5lX2p1ZGdlcztcbiAgICAgICAgdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlcyA9IHt9O1xuICAgICAgICB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzLmZvckVhY2goZnVuY3Rpb24oZGosIGlkeCkge1xuICAgICAgICAgICAgbGV0IGFyciA9IHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbZGoucm9sZV0gfHwgW107XG4gICAgICAgICAgICBhcnIucHVzaCh7XG4gICAgICAgICAgICAgICAgaWR4OiBpZHgsXG4gICAgICAgICAgICAgICAgZGlzY2lwbGluZV9qdWRnZTogZGosXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbZGoucm9sZV0gPSBhcnI7XG4gICAgICAgIH0uYmluZCh0aGlzKSk7XG4gICAgICAgIGlmIChyZXN1bHRzKSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0c19ieV9ydW5faWRzID0ge307XG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2goKHJlcykgPT5cbiAgICAgICAgICAgICAgICByZXN1bHRzX2J5X3J1bl9pZHNbcmVzLnJ1bl9pZF0gPSByZXMpO1xuICAgICAgICAgICAgdGhpcy5ydW5fd3JhcHBlcnMuZm9yRWFjaCgodykgPT5cbiAgICAgICAgICAgICAgICB3LnJlc3VsdHNfaW5mbyA9IHJlc3VsdHNfYnlfcnVuX2lkc1t3LnJ1bi5pZF0pO1xuICAgICAgICAgICAgdGhpcy5ydW5fd3JhcHBlcnMuc29ydCgoYSwgYikgPT4gYS5yZXN1bHRzX2luZm8ucGxhY2UgLSBiLnJlc3VsdHNfaW5mby5wbGFjZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZ2V0RGlzY2lwbGluZUp1ZGdlc0J5Um9sZXMoKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNjaXBsaW5lX2p1ZGdlc19ieV9yb2xlc1thcmd1bWVudHNbMF1dXG4gICAgICAgICAgICAgICAgPyB0aGlzLmRpc2NpcGxpbmVfanVkZ2VzX2J5X3JvbGVzW2FyZ3VtZW50c1swXV0ubWFwKChiKSA9PiBiLmRpc2NpcGxpbmVfanVkZ2UpXG4gICAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVzID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICByZXMgPSByZXMuY29uY2F0KHRoaXMuZGlzY2lwbGluZV9qdWRnZXNfYnlfcm9sZXNbYXJndW1lbnRzW2ldXSB8fCBbXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzLnNvcnQoKGEsIGIpID0+IGEuaWR4IC0gYi5pZHgpO1xuICAgICAgICByZXR1cm4gcmVzLm1hcCgoYikgPT4gYi5kaXNjaXBsaW5lX2p1ZGdlKTtcbiAgICB9XG4gICAgZ2V0U2NvcmVzVGFibGVCeVJvbGVzKCkge1xuICAgICAgICBsZXQgZGlzY2lwbGluZV9qdWRnZV9pZHMgPSB0aGlzLmdldERpc2NpcGxpbmVKdWRnZXNCeVJvbGVzKC4uLmFyZ3VtZW50cykubWFwKChkaikgPT4gZGouaWQpO1xuICAgICAgICByZXR1cm4gdGhpcy5ydW5fd3JhcHBlcnMubWFwKCh3KSA9PiB3LmdldFNjb3Jlc0J5SnVkZ2VJZHMoZGlzY2lwbGluZV9qdWRnZV9pZHMpKTtcbiAgICB9XG4gICAgZ2V0UmVzdWx0c0luZm8oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJ1bl93cmFwcGVycy5tYXAoKHcpID0+IHcucmVzdWx0c19pbmZvKTtcbiAgICB9XG4gICAgZ2V0UnVucygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucnVuX3dyYXBwZXJzLm1hcCgodykgPT4gdy5ydW4pO1xuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhcnRpY2lwYW50RGlzcGxheShwYXJ0aWNpcGFudCkge1xuICAgIGlmIChwYXJ0aWNpcGFudC5mb3JtYXRpb25fbmFtZSAhPT0gXCJcIikge1xuICAgICAgICByZXR1cm4gPHA+eyBwYXJ0aWNpcGFudC5mb3JtYXRpb25fbmFtZSB9PC9wPjtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnRpY2lwYW50LnNwb3J0c21lbi5tYXAoKHMsIGlkeCkgPT4gPHAga2V5PXsgaWR4IH0+eyBzLmxhc3RfbmFtZSArIFwiIFwiICsgcy5maXJzdF9uYW1lIH08L3A+KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjb3JpbmdUeXBlKGRpc2NpcGxpbmVfanVkZ2UsIHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcbiAgICBzd2l0Y2ggKGRpc2NpcGxpbmVfanVkZ2Uucm9sZSkge1xuICAgIGNhc2UgXCJkYW5jZV9qdWRnZVwiOlxuICAgICAgICBzd2l0Y2ggKHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uXCI6XG4gICAgICAgICAgICByZXR1cm4gXCJmb3JtYXRpb25cIjtcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuZm9ybWF0aW9uX2Fjcm9cIjpcbiAgICAgICAgICAgIHJldHVybiBcImZvcm1hdGlvbl9hY3JvXCI7XG4gICAgICAgIGNhc2UgXCJyb3NmYXJyLnNpbXBsaWZpZWRcIjpcbiAgICAgICAgICAgIHJldHVybiBcInNpbXBsaWZpZWRcIjtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlXCI7XG4gICAgICAgIH1cbiAgICBjYXNlIFwiYWNyb19qdWRnZVwiOlxuICAgICAgICBzd2l0Y2ggKHNjb3Jpbmdfc3lzdGVtX25hbWUpIHtcbiAgICAgICAgY2FzZSBcInJvc2ZhcnIuYW1fZmluYWxfZndcIjpcbiAgICAgICAgICAgIHJldHVybiBcImRhbmNlXCI7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gXCJhY3JvXCI7XG4gICAgICAgIH1cbiAgICBjYXNlIFwidGVjaF9qdWRnZVwiOlxuICAgICAgICByZXR1cm4gXCJ0ZWNoXCI7XG4gICAgY2FzZSBcImhlYWRfanVkZ2VcIjpcbiAgICAgICAgcmV0dXJuIFwiaGVhZFwiO1xuICAgIH1cbn1cbiIsImltcG9ydCB7IHRyYW5zbGF0ZSwgZ2V0UG9zc2libGVUb3VyTmFtZXMgfSBmcm9tIFwiLi9ydVwiO1xuXG5leHBvcnQgdmFyIF8gPSB0cmFuc2xhdGU7XG5leHBvcnQgdmFyIHRvdXJfbmFtZXMgPSBnZXRQb3NzaWJsZVRvdXJOYW1lcygpO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShzcmMsIGFyZykge1xyXG4gICAgZnVuY3Rpb24gY2hvb3NlRW5kaW5nKG4sIGUxLCBlMiwgZTUpIHtcclxuICAgICAgICBsZXQgeCA9IG4gJSAxMDA7XHJcbiAgICAgICAgaWYgKE1hdGguZmxvb3IoeCAvIDEwKSA9PT0gMSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZTU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh4ICUgMTAgPT09IDEpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGUxO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoeCAlIDEwID49IDUgfHwgeCAlIDEwID09PSAwKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBlNTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGUyO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBQSFJBU0VTID0ge1xyXG4gICAgICAgIFwiYWRtaW5cIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6ICh2ZXJzaW9uLCBkYXRlKSA9PiA8ZGl2IGNsYXNzTmFtZT1cImFib3V0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHA+PGI+Um9ja0p1ZGdlIHt2ZXJzaW9ufTwvYj4gKNC+0YIge2RhdGV9KSAmbWRhc2g7INGB0LjRgdGC0LXQvNCwINC00LvRjyDQv9C+0LTRgdGH0LXRgtCwINGA0LXQt9GD0LvRjNGC0LDRgtC+0LIg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5INC/0L4g0LDQutGA0L7QsdCw0YLQuNGH0LXRgdC60L7QvNGDINGA0L7Qui3QvS3RgNC+0LvQu9GDLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QkNCy0YLQvtGA0YHQutC40LUg0L/RgNCw0LLQsCDQvdCwINGB0LjRgdGC0LXQvNGDIFJvY2tKdWRnZSDQv9C+0LvQvdC+0YHRgtGM0Y4g0L/RgNC40L3QsNC00LvQtdC20LDRgiDRgNCw0LfRgNCw0LHQvtGC0YfQuNC60YMg0JDRgNGC0LXQvNGDINCa0LDQt9Cw0LrQvtCy0YMuINCh0L7QsNCy0YLQvtGAINGB0LjRgdGC0LXQvNGLINCQ0L3RgtC+0L0g0JDQvNC10LvQuNC9LjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QodC40YHRgtC10LzQsCDRgNCw0YHQv9GA0L7RgdGC0YDQsNC90Y/QtdGC0YHRjyDQv9C+INC70LjRhtC10L3Qt9C40LggTGludW0gZC5vLm8gKGluZm9AbGludW0uaHIpLiDQlNC70Y8g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80Ysg0YHRg9C00LXQudGB0YLQstCwIFJvY2tKdWRnZSDQvdC10L7QsdGF0L7QtNC40LzQviDQuCDQtNC+0YHRgtCw0YLQvtGH0L3QviDQuNC80LXRgtGMINC/0YDQsNCy0L4g0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdC40Y8g0YHQuNGB0YLQtdC80YsgTGludW0gTFBTLjwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8cD7QntGE0LjRhtC40LDQu9GM0L3Ri9C5INGB0LDQudGCOiA8YSBocmVmPVwiaHR0cHM6Ly9yb2NranVkZ2UuY29tL1wiIHRhcmdldD1cIl9ibGFua1wiPmh0dHBzOi8vcm9ja2p1ZGdlLmNvbS88L2E+PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+LFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfcHJvZ3JhbXNfYWZ0ZXJfY3JlYXRpb25cIjogXCLQn9GA0L7Qs9GA0LDQvNC80Ysg0LzQvtC20L3QviDQsdGD0LTQtdGCINC00L7QsdCw0LLQuNGC0Ywg0YLQvtC70YzQutC+INC/0L7RgdC70LUg0YHQvtGF0YDQsNC90LXQvdC40Y8g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlcl9hdmFpbGFibGVcIjogXCLQkNCy0YLQvtC80LDRgtC40YfQtdGB0LrQsNGPINC/0LXRh9Cw0YLRjCDQutC+0YDRgNC10LrRgtC90L4g0L3QsNGB0YLRgNC+0LXQvdCwINC4INC80L7QttC10YIg0LHRi9GC0Ywg0LjRgdC/0L7Qu9GM0LfQvtCy0LDQvdCwLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJhdXRvX3ByaW50ZXJfbm90X2F2YWlsYWJsZVwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMINC90LXQtNC+0YHRgtGD0L/QvdCwINC90LAg0Y3RgtC+0Lwg0LrQvtC80L/RjNGC0LXRgNC1LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maW5hbGl6ZWRcIjogXCLQntGC0YHRg9GC0YHRgtCy0YPRjtGCINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C1INGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInVuZmluYWxpemVfd2FybmluZ1wiOiA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPjxzdHJvbmc+0KTQuNC90LDQu9C40LfQsNGG0LjRjyDQtNC+0LvQttC90LAg0L7RgtC80LXQvdGP0YLRjNGB0Y8g0YLQvtC70YzQutC+INCyINC40YHQutC70Y7Rh9C40YLQtdC70YzQvdGL0YUg0YHQu9GD0YfQsNGP0YUhPC9zdHJvbmc+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCV0YHQu9C4INC20LUg0Y3RgtC+INC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INC90LXQvtCx0YXQvtC00LjQvNC+LCDQvtCx0YDQsNGC0LjRgtC1INCy0L3QuNC80LDQvdC40LUsINGH0YLQviDQv9C+0YHQu9C1INC/0L7QstGC0L7RgNC90L7QuSDRhNC40L3QsNC70LjQt9Cw0YbQuNC4INGB0L/QuNGB0L7QuiDRg9GH0LDRgdGC0L3QuNC60L7QslxyXG4gICAgICAgICAgICAgICAgICAgINGB0LvQtdC00YPRjtGJ0LXQs9C+INGC0YPRgNCwINCx0YPQtNC10YIg0LDQstGC0L7QvNCw0YLQuNGH0LXRgdC60Lgg0L/QtdGA0LXRgdC+0LfQtNCw0L0uINCg0LXQt9GD0LvRjNGC0LDRgtGLINGD0YfQsNGB0YLQvdC40LrQvtCyLCDQv9GA0L7RiNC10LTRiNC40YUg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgCDQv9C+0YHQu9C1INC/0LXRgNCy0L7QuVxyXG4gICAgICAgICAgICAgICAgICAgINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0Lgg0L3QtSDQv9GA0L7RiNC10LTRiNC40YUg0L/QvtGB0LvQtSDQv9C+0LLRgtC+0YDQvdC+0Lkg0LHRg9C00YPRgiDQsdC10LfQstC+0LfQstGA0LDRgtC90L4g0YPRgtC10YDRj9C90YshPC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwPtCYINC90LUg0LfQsNCx0YPQtNGM0YLQtSDQt9Cw0L3QvtCy0L4g0L3QsNC/0LXRh9Cw0YLQsNGC0Ywg0LLRgdC1INGC0LHQu9C40YbRiy48L3A+PC9kaXY+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVcIjogXCLQlNC40YHRhtC40L/Qu9C40L3QsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDRgdC7LsKg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicHJpbnRfdGVzdF9wYWdlXCI6IFwi0J3QsNC/0LXRh9Cw0YLQsNGC0Ywg0YLQtdGB0YLQvtCy0YPRjiDRgdGC0YDQsNC90LjRhtGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlXCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInF1ZXVlX2VtcHR5XCI6IFwi0J7Rh9C10YDQtdC00Ywg0L/Rg9GB0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzFcIjogXCLQmtGA0LDRgtC60LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzJcIjogXCLQodGA0LXQtNC90Y/RjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXzNcIjogXCLQn9C+0LTRgNC+0LHQvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwicnVsZXNcIjogXCLQl9Cw0LTQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0XCI6IFwiXCIsXHJcbiAgICAgICAgICAgICAgICBcInRlc3RfcGFnZVwiOiBcItCi0LXRgdGC0L7QstCw0Y8g0YHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0ZXN0X3RleHRcIjogXCLQrdGC0L4g0YLQtdGB0YLQvtCy0LDRjyDRgdGC0YDQsNC90LjRhtCwIFJvY2tKdWRnZVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfY2x1YlwiOiBcItCU0L7QsdCw0LLQuNGC0Ywg0LrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX2NvbXBldGl0aW9uXCI6IFwi0KHQvtC30LTQsNGC0Ywg0YHQvtGA0LXQstC90L7QstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9jb21wZXRpdGlvbl9wbGFuX2l0ZW1cIjogXCLQlNC+0LHQsNCy0LjRgtGMINGN0LvQtdC80LXQvdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcImFkZF9kaXNjaXBsaW5lXCI6IFwi0JTQvtCx0LDQstC40YLRjCDQtNC40YHRhtC40L/Qu9C40L3Rg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhZGRfanVkZ2VcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGB0YPQtNGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3BhcnRpY2lwYW50XCI6IFwi0JTQvtCx0LDQstC40YLRjCDRg9GH0LDRgdGC0L3QuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWRkX3RvdXJcIjogXCLQlNC+0LHQsNCy0LjRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb25maXJtX3Njb3JlXCI6IFwi0JfQsNGE0LjQutGB0LjRgNC+0LLQsNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwiZG9jeF9oZWF0c1wiOiBcItCX0LDRhdC+0LTRiyDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfbnVtYmVyc1wiOiBcItCd0L7QvNC10YDQsCDQsiBET0NYXCIsXHJcbiAgICAgICAgICAgICAgICBcImRvY3hfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINCyIERPQ1hcIixcclxuICAgICAgICAgICAgICAgIFwiZXhwb3J0XCI6IFwi0K3QutGB0L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRcIjogXCLQmNC80L/QvtGA0YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsYXVuY2hfYXV0b19wcmludGVyXCI6IFwi0JfQsNC/0YPRgdC6INCw0LLRgtC+0LzQsNGC0LjRh9C10YHQutC+0Lkg0L/QtdGH0LDRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfYWNyb1wiOiBcItCX0LDQs9GA0YPQt9C40YLRjCDQsNC60YDQvtCx0LDRgtC40LrRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJyZWZyZXNoX2NsaWVudHNcIjogXCLQn9C10YDQtdC30LDQs9GA0YPQt9C40YLRjCDQstGB0LUg0YPRgdGC0YDQvtC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVsb2FkX2NsaWVudHNcIjogXCLQntCx0L3QvtCy0LjRgtGMINC00LDQvdC90YvQtSDQvdCwINCy0YHQtdGFINGD0YHRgtGA0L7QudGB0YLQstCw0YVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX3BsYW5cIjogXCLQodC+0YDRgtC40YDQvtC60LAg0L/QviDQv9GA0L7Qs9GA0LDQvNC80LVcIixcclxuICAgICAgICAgICAgICAgIFwic3dpdGNoX3RvX2Rpc2NpcGxpbmVzXCI6IFwi0KHQvtGA0YLQuNGA0L7QutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmNvbmZpcm1fc2NvcmVcIjogXCLQntGC0LzQtdC90LAg0YTQuNC60YHQsNGG0LjQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplXCI6IFwi0J7RgtC80LXQvdC40YLRjCDRhNC40L3QsNC70LjQt9Cw0YbQuNGOXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29uZmlybXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY2x1YlwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINC60LvRg9CxP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfY29tcGV0aXRpb25cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L4g0YHQvtGA0LXQstC90L7QstCw0L3QuNC1P1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZGlzY2lwbGluZVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLRgyDQtNC40YHRhtC40L/Qu9C40L3Rgz9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX2p1ZGdlXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YPQtNCw0LvQuNGC0Ywg0Y3RgtC+0LPQviDRgdGD0LTRjNGOP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfcGFydGljaXBhbnRcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0L7Qs9C+INGD0YfQsNGB0YLQvdC40LrQsD9cIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3Byb2dyYW1cIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRg9C00LDQu9C40YLRjCDRjdGC0YMg0L/RgNC+0LPRgNCw0LzQvNGDP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGD0LTQsNC70LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwicmVmcmVzaF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQuNGC0Ywg0YHRgtGA0LDQvdC40YbRgyDQvdCwINCy0YHQtdGFINC60LvQuNC10L3RgtCw0YU/XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlbG9hZF9jbGllbnRzXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L7QsdC90L7QstC40YLRjCDQtNCw0L3QvdGL0LUg0L3QsCDQstGB0LXRhSDQutC70LjQtdC90YLQsNGFP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQvtGC0LzQtdC90LjRgtGMINGE0LjQvdCw0LvQuNC30LDRhtC40Y4g0YLRg9GA0LA/INCS0LLQtdC00LjRgtC1IMKrdW5maW5hbGl6ZcK7LCDRh9GC0L7QsdGLINC/0YDQvtC00L7Qu9C20LjRgtGMXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFib3V0XCI6IFwi0J4g0L/RgNC+0LPRgNCw0LzQvNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImF1dG9fcHJpbnRlclwiOiBcItCQ0LLRgtC+0LzQsNGC0LjRh9C10YHQutCw0Y8g0L/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsaWVudHNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC/0L7QtNC60LvRjtGH0LXQvdC90YvQvNC4INGD0YHRgtGA0L7QudGB0YLQstCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic1wiOiBcItCa0LvRg9Cx0Yst0YPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbHVic19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2luZm9cIjogXCLQmNC90YTQvtGA0LzQsNGG0LjRjyDQviDRgtGD0YDQvdC40YDQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuX21hbmFnZW1lbnRcIjogXCLQn9GA0L7Qs9GA0LDQvNC80LAg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3Jlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiY29tcGV0aXRpb25zX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0KDQsNGB0L/RgNC10LTQtdC70LXQvdC40LUg0YHRg9C00LXQuSDQv9C+INC00LjRgdGG0LjQv9C70LjQvdCw0LxcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0LTQuNGB0YbQuNC/0LvQuNC90YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZXNfbWFuYWdlbWVudFwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INC00LjRgdGG0LjQv9C70LjQvdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zaG93blwiOiBcItCY0L3RhNC+0YDQvNCw0YbQuNGPINGC0L7Qu9GM0LrQviDQv9C+INGB0LvQtdC00YPRjtGJ0LjQvCDQtNC40YHRhtC40L/Qu9C40L3QsNC8OlwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc19zdW1tYXJ5XCI6IFwi0KHQstC+0LTQutCwINC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJleHBvcnRfY29tcGV0aXRpb25cIjogXCLQrdC60YHQv9C+0YDRgiDQtNCw0L3QvdGL0YUg0YLRg9GA0L3QuNGA0LAg0Lgg0YDQtdC30YPQu9GM0YLQsNGC0L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbXBvcnRfY29tcGV0aXRpb25cIjogXCLQmNC80L/QvtGA0YIg0LTQsNC90L3Ri9GFINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJqdWRnZXNcIjogXCLQodGD0LTQtdC50YHQutCw0Y8g0LHRgNC40LPQsNC00LBcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzX21hbmFnZW1lbnRcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkX2Fjcm9iYXRpY3NcIjogXCLQl9Cw0LPRgNGD0LfQutCwINCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19tYW5hZ2VtZW50XCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YPRh9Cw0YHRgtC90LjQutCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzZXJ2aWNlX21lbnVcIjogXCLQodC10YDQstC40YHQvdC+0LUg0LzQtdC90Y5cIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX2xpc3RcIjogXCLQodC/0LjRgdC+0Log0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJfaGVhdHNcIjogXCLQl9Cw0YXQvtC00Ysg0YPRh9Cw0YHRgtC90LjQutC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwidG91cl9yZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0Ysg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5maW5hbGl6ZV90b3VyXCI6IFwi0J7RgtC80LXQvdCwINGE0LjQvdCw0LvQuNC30LDRhtC40Lgg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwidW5waWNrZWRfdG91cnNcIjogXCLQndC1INCy0LrQu9GO0YfQtdC90Ysg0LIg0L/RgNC+0LPRgNCw0LzQvNGDXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX2RhdGVcIjogXCLQlNCw0YLQsCDQv9GA0L7QstC10LTQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9uYW1lXCI6IFwi0J3QsNC40LzQtdC90L7QstCw0L3QuNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZXNcIjogXCLQoNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lc1wiOiBcItCU0LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImdyb3VwX2J5X2NsdWJzXCI6IFwi0JPRgNGD0L/Qv9C40YDQvtCy0LDRgtGMINC/0L4g0LrQu9GD0LHQsNC8XCIsXHJcbiAgICAgICAgICAgICAgICBcImluY2x1ZGVfYWNyb2JhdGljc1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LDQutGA0L7QsdCw0YLQuNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9jbHVic1wiOiBcItCS0LrQu9GO0YfQuNGC0Ywg0LTQsNC90L3Ri9C1INC+INC60LvRg9Cx0LDRhVwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2Rpc2NpcGxpbmVfanVkZ2VzXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgNCw0YHQv9GA0LXQtNC10LvQtdC90LjQtSDRgdGD0LTQtdC5INC/0L4g0LTQuNGB0YbQuNC/0LvQuNC90LDQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmNsdWRlX2V4dGVuZGVkX2luZm9cIjogXCLQktC60LvRjtGH0LjRgtGMINGA0LDRgdGI0LjRgNC10L3QvdGD0Y4g0LjQvdGE0L7RgNC80LDRhtC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9mb3JtYXRpb25fc3BvcnRzbWVuXCI6IFwi0JLQutC70Y7Rh9C40YLRjCDRgdC+0YHRgtCw0LIg0YTQvtGA0LzQtdC50YjQvdC+0LJcIixcclxuICAgICAgICAgICAgICAgIFwiaW5jbHVkZV9qdWRnZXNcIjogXCLQktC60LvRjtGH0LjRgtGMINC00LDQvdC90YvQtSDQviDRgdGD0LTRjNGP0YVcIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJub19maWxlc19zZWxlY3RlZFwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YTQsNC50LsuLi5cIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzXCI6IFwi0KPRh9Cw0YHRgtC90LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICBcInBhc3RlX2Fjcm9cIjogXCLQktGB0YLQsNCy0YzRgtC1INC00LDQvdC90YvQtSDQuNC3INC60LDQu9GM0LrRg9C70Y/RgtC+0YDQsCDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJwbGFuXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGC0YPRgNC90LjRgNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInNob3dfc3BvcnRzbWVuX29ubHlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0YHQv9C+0YDRgtGB0LzQtdC90L7QslwiLFxyXG4gICAgICAgICAgICAgICAgXCJzaG93X3N1bW1hcnlcIjogXCLQn9C+0LrQsNC30YvQstCw0YLRjCDRgtC+0LvRjNC60L4g0LrQvtC70LjRh9C10YHRgtCy0L5cIixcclxuICAgICAgICAgICAgICAgIFwic3ViXCI6IFwi0LfQsNC/XCIsICAvLyBzdWJzdGl0dXRlXHJcbiAgICAgICAgICAgICAgICBcInRvdXJzXCI6IFwi0KLRg9GA0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludmFsaWRfcGFzc2NvZGVcIjogXCLQktCy0LXQtNGR0L0g0L3QtdCy0LXRgNC90YvQuSDQutC+0LQg0L/QvtGC0LLQtdGA0LbQtNC10L3QuNGPXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVudVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImNvbXBldGl0aW9uX3JlcG9ydFwiOiBcItCf0YDQvtGC0L7QutC+0Lsg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfcmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLINC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImltcG9ydF9leHBvcnRcIjogXCLQmNC80L/QvtGA0YIgLyDRjdC60YHQv9C+0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY2x1YnNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDQutC70YPQsdCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2VfY29tcGV0aXRpb25fcGxhblwiOiBcItCf0YDQvtCz0YDQsNC80LzQsCDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibWFuYWdlX2Rpc2NpcGxpbmVzXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0LTQuNGB0YbQuNC/0LvQuNC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV9qdWRnZXNcIjogXCLQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdGD0LTRjNGP0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJtYW5hZ2Vfc3BvcnRzbWVuXCI6IFwi0KPQv9GA0LDQstC70LXQvdC40LUg0YHQv9C+0YDRgtGB0LzQtdC90LDQvNC4XCIsXHJcbiAgICAgICAgICAgICAgICBcIm1hbmFnZV90b3Vyc1wiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1INGC0YPRgNCw0LzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF9saXN0XCI6IFwi0KHRgtCw0YDRgtC+0LLRi9C5INC70LjRgdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGhyYXNlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5fcGFydGljaXBhbnRzXCI6IG4gPT4gbi50b1N0cmluZygpICsgXCIg0YPRh9Cw0YHRgtC90LjQulwiICsgY2hvb3NlRW5kaW5nKG4sIFwiXCIsIFwi0LBcIiwgXCLQvtCyXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJuX3Nwb3J0c21lblwiOiAobiwgcykgPT4gbi50b1N0cmluZygpICsgXCIg0YHQv9C+0YDRgtGB0LzQtdC9XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIikgKyAocyA+IDAgPyBgICgrJHtzfSDQt9Cw0L/QsNGB0L0keyBjaG9vc2VFbmRpbmcocywgXCLQvtC5XCIsIFwi0YvRhVwiLCBcItGL0YVcIikgfSlgIDogXCJcIiksXHJcbiAgICAgICAgICAgICAgICBcIm5fc3BvcnRzbWVuX3Nob3J0XCI6IChuLCBzKSA9PiBuLnRvU3RyaW5nKCkgKyBcIiDRgdC/0L7RgNGC0YHQvNC10L1cIiArIGNob29zZUVuZGluZyhuLCBcIlwiLCBcItCwXCIsIFwi0L7QslwiKSArIChzID4gMCA/IGAgKCske3N9INC30LDQvy4pYCA6IFwiXCIpLFxyXG4gICAgICAgICAgICAgICAgXCJ0b3RhbF9uX3BhcnRpY2lwYW50c1wiOiBuID0+IFwi0JjRgtC+0LPQviBcIiArIG4gKyBcIiDRg9GH0LDRgdGC0L3QuNC6XCIgKyBjaG9vc2VFbmRpbmcobiwgXCJcIiwgXCLQsFwiLCBcItC+0LJcIiksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2luZy10YWJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG91ci1hZG1pblwiOiBcItCj0L/RgNCw0LLQu9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRzXCI6IFwi0JfQsNGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMVwiOiBcItCa0YDQsNGC0LrQsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtMlwiOiBcItCh0YDQtdC00L3Rj9GPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHMtM1wiOiBcItCf0L7QtNGA0L7QsdC90LDRjyDRgtCw0LHQu9C40YbQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lLXJlc3VsdHNcIjogXCLQoNC10LfRg9C70YzRgtCw0YLRiyDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJlcnJvcnNcIjoge1xyXG4gICAgICAgICAgICBcImFkbWluXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibG9hZF9zeW50YXhfZXJyb3JcIjogXCLQndC10LrQvtGA0YDQtdC60YLQvdGL0Lkg0YTQvtGA0LzQsNGCINC00LDQvdC90YvRhVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImFwaVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImR1cGxpY2F0ZWRfZXh0ZXJuYWxfaWRcIjogXCLQkiDQtNCw0L3QvdGL0YUg0LjQvNC10Y7RgtGB0Y8g0LfQsNC/0LjRgdC4INGBINC/0L7QstGC0L7RgNGP0Y7RidC40LzQuNC80YHRjyBleHRlcm5hbF9pZFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1bmFibGVfdG9fZ2V0XCI6ICh3YW50ZWQpID0+IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0L/QvtC70YPRh9C40YLRjCBcIiArIHdhbnRlZCArIFwiINC40Lcg0LfQsNC/0YDQvtGB0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjbHViXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LrQu9GD0LEsINC6INC60L7RgtC+0YDQvtC80YMg0L/RgNC40LLRj9C30LDQvdGLINGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbXBldGl0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX25vbl9lbXB0eVwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSwg0YHQvtC00LXRgNC20LDRidC10LUg0LTQuNGB0YbQuNC/0LvQuNC90YssINC60LvRg9Cx0Ysg0LjQu9C4INGB0YPQtNC10LlcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvbl9wbGFuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwidG9vX21hbnlfdG91cnNcIjogKGQpID0+IFtcItCe0YjQuNCx0LrQsCDQsiDQv9GA0L7Qs9GA0LDQvNC80LUg0YHQvtGA0LXQstC90L7QstCw0L3QuNC5XCIsIGDQkiDQtNC40YHRhtC40L/Qu9C40L3QtSAke2R9INGB0L7QtNC10YDQttC40YLRgdGPINCx0L7Qu9GM0YjQtSDRgtGD0YDQvtCyLCDRh9C10Lwg0YHQvtC30LTQsNC90L4g0LIg0YHQuNGB0YLQtdC80LVgXSxcclxuICAgICAgICAgICAgICAgIFwiaW52YWxpZF9kaXNjaXBsaW5lX2ZvdW5kXCI6IFwi0J/RgNC+0LPRgNCw0LzQvNCwINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuSDRgdC+0LTQtdGA0LbQuNGCINGC0YPRgNGLLCDQvtGC0YHRg9GC0YHRgtCy0YPRjtGJ0LjQtSDQsiDRgdC40YHRgtC10LzQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjaGFuZ2VfanVkZ2VzX3dpdGhfZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINGB0L7RgdGC0LDQsiDRgdGD0LTQtdC5INC00LvRjyDQtNC40YHRhtC40L/Qu9C40L3Riywg0YHQvtC00LXRgNC20LDRidC10Lkg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfcGFydGljaXBhbnRzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGD0YfQsNGB0YLQvdC40LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX3RvdXJzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0LTQuNGB0YbQuNC/0LvQuNC90YMsINGB0L7QtNC10YDQttCw0YnRg9GOINGC0YPRgNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiZGlzY2lwbGluZV9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV93aXRoX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINGDINC60L7RgNC+0LPQviDQtdGB0YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90LUg0YLRg9GA0YtcIixcclxuICAgICAgICAgICAgICAgIFwiZGVsZXRlX3dpdGhfc2NvcmVzXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YHRg9C00YzRjiDQv9GA0LjQvdGP0LLRiNC10LPQviDRg9GH0LDRgdGC0LjQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicmVwZWF0aW5nX2p1ZGdlXCI6IChuYW1lKSA9PiBuYW1lICsgXCIg0LLRgdGC0YDQtdGH0LDQtdGC0YHRjyDQsiDRgdC/0LjRgdC60LUg0YHRg9C00LXQuSDQsdC+0LvQtdC1INC+0LTQvdC+0LPQviDRgNCw0LfQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImdsb2JhbFwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImludGVybmFsX3NlcnZlcl9lcnJvclwiOiBbXCLQntGI0LjQsdC60LAg0L3QsCDRgdC10YDQstC10YDQtVwiLCBcItC/0YDQvtCy0LXRgNGM0YLQtSDQu9C+0LPQuCDQtNC70Y8g0LjQvdGE0L7RgNC80LDRhtC40LhcIl0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9kaXNjaXBsaW5lc1wiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INGD0LTQsNC70LjRgtGMINGB0YPQtNGM0Y4sINCy0YXQvtC00Y/RidC10LPQviDQsiDRgdGD0LTQtdC50YHQutGD0Y4g0LHRgNC40LPQsNC00YMg0YXQvtGC0Y8g0LHRiyDQvtC00L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicGFydGljaXBhbnRcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfd2l0aF9maW5hbGl6ZWRfdG91cnNcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDRg9C00LDQu9C40YLRjCDRg9GH0LDRgdGC0L3QuNC60LAsINC/0YDQuNC90Y/QstGI0LXQs9C+INGD0YfQsNGB0YLQuNC1INGF0L7RgtGPINCx0Ysg0LIg0L7QtNC90L7QvCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicnVuXCI6IHtcclxuICAgICAgICAgICAgICAgIFwic2V0X3BlcmZvcm1lZF9mbGFnX29uX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC40LfQvNC10L3QuNGC0Ywg0YHRgtCw0YLRg9GBINC30LDRhdC+0LTQsCDRhNC40L3QsNC70LjQt9C40L3QvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwic2NvcmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzY29yZV9ub3RfZXhpc3RcIjogXCLQn9C+0L/Ri9GC0LrQsCDQv9C+0LvRg9GH0LjRgtGMINC30L3QsNGH0LXQvdC40LUg0L3QtdGB0YPRidC10YHRgtCy0YPRjtGJ0LXQuSDQvtGG0LXQvdC60Lgg0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJ1cGRhdGVfb25fZmluYWxpemVkX3RvdXJcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQuNC30LzQtdC90LjRgtGMINC+0YbQtdC90LrRgyDQsiDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7QvCDRgtGD0YDQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInRvdXJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJhZGRfYmVmb3JlX2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC00L7QsdCw0LLQuNGC0Ywg0L3QvtCy0YvQuSDRgtGD0YAg0L/QtdGA0LXQtCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQvFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVfZmluYWxpemVkXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0L3QvdGL0Lkg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlbGV0ZV9pbl9jb21wZXRpdGlvbl9wbGFuXCI6IFwi0J3QtdCy0L7Qt9C80L7QttC90L4g0YPQtNCw0LvQuNGC0Ywg0YLRg9GALCDQv9GA0LjRgdGD0YLRgdGC0LLRg9GO0YnQuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF9maW5haWx6ZWRcIjogXCLQndC10LLQvtC30LzQvtC20L3QviDQv9C10YDQtdGB0L7Qt9C00LDRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC90L3Ri9C5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbnZhbGlkX2FkZF9hZnRlcl9pZFwiOiBcItCf0L7Qv9GL0YLQutCwINC00L7QsdCw0LjRgtGMINGC0YPRgCDQsiDQvdC10YHRg9GJ0LXRgdGC0LLRg9GO0YnQtdC1INC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwibG9hZF90b19ub25fZW1wdHlcIjogKGQpID0+IFtcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQs9GA0YPQt9C40YLRjCDRgtGD0YDRiyDQtNC70Y8g0LTQuNGB0YbQuNC/0LvQuNC90YtcIiwgYNCU0LjRgdGG0LjQv9C70LjQvdCwICR7ZH0g0YPQttC1INGB0L7QtNC10YDQttC40YIg0YLRg9GA0YtgXSxcclxuICAgICAgICAgICAgICAgIFwibmV4dF9pc19maW5haWx6ZWRcIjogXCLQodC70LXQtNGD0Y7RidC40Lkg0YLRg9GAINC90LUg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX25leHRfdG91clwiOiBcItCU0LDQvdC90YvQuSDRgtGD0YAg0L/QvtGB0LvQtdC00L3QuNC5INCyINC/0YDQvtCz0YDQsNC80LzQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40LlcIixcclxuICAgICAgICAgICAgICAgIFwibm90X2luX2NvbXBldGl0aW9uX3BsYW5cIjogXCLQlNCw0L3QvdGL0Lkg0YLRg9GAINC90LUg0YHQvtC00LXRgNC20LjRgtGB0Y8g0LIg0L/RgNC+0LPRgNCw0LzQvNC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJwcmV2X25vdF9maW5haWx6ZWRcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQuSDRgtGD0YAg0LTQvtC70LbQtdC9INCx0YvRgtGMINGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0YXJ0X2ZpbmFsaXplZFwiOiBcItCd0LXQstC+0LfQvNC+0LbQvdC+INC30LDQv9GD0YHRgtC40YLRjCDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90YvQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidXBkYXRlX2ZpbmFsaXplZFwiOiBcItCU0LvRjyDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDQvdC90L7Qs9C+INGC0YPRgNCwINC90LUg0LTQvtC/0YPRgdC60LDQtdGC0YHRjyDQuNC30LzQtdC90LXQvdC40LUg0LrQstC+0YLRiyDQstGL0LLQvtC00LAsINGC0LjQv9CwINGC0YPRgNCwINC40LvQuCDRgdC40YHRgtC10LzRiyDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwiZ2xvYmFsXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRkXCI6IFwi0JTQvtCx0LDQstC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJjbG9zZVwiOiBcItCX0LDQutGA0YvRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImRlc2VsZWN0X2FsbFwiOiBcItCh0L3Rj9GC0Ywg0LLRgdC1XCIsXHJcbiAgICAgICAgICAgICAgICBcImVkaXRcIjogXCLQoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkZWxldGVcIjogXCLQo9C00LDQu9C40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJkaXNjYXJkXCI6IFwi0J7RgtC80LXQvdC40YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJsb2FkXCI6IFwi0JfQsNCz0YDRg9C30LjRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNhdmVcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgICAgIFwic2VsZWN0X2FsbFwiOiBcItCS0YvQsdGA0LDRgtGMINCy0YHQtVwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdWJtaXRcIjogXCLQodC+0YXRgNCw0L3QuNGC0YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJicm93c2VcIjogXCLQntCx0LfQvtGALi4uXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3RpbmdcIjogXCLQn9C+0LTQutC70Y7Rh9C10L3QuNC1INC6INGB0LXRgtC4XCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbm5lY3Rpb25fcHJvYmxlbVwiOiBcItCf0YDQvtCx0LvQtdC80Ysg0YEg0YHQtdGC0YzRjlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZXNcIjogXCLQlNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vXCI6IFwi0J3QtdGCXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwibWVzc2FnZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjb25uZWN0aW9uX2Vycm9yXCI6IFwi0J/QvtGF0L7QttC1LCDQuNC80LXRjtGC0YHRjyDQv9GA0L7QsdC70LXQvNGLINGBINGB0LXRgtGM0Y5cIixcclxuICAgICAgICAgICAgICAgIFwiZXJyb3JfaGVhZGVyXCI6IFwi0J7RiNC40LHQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1Y2Nlc3NcIjogXCLQntC/0LXRgNCw0YbQuNGPINGD0YHQv9C10YjQvdC+INC30LDQstC10YDRiNC10L3QsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBocmFzZXNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoZWF0X25cIjogKG4pID0+IFwi0JfQsNGF0L7QtCDihJZcIiArIG4udG9TdHJpbmcoKSxcclxuICAgICAgICAgICAgICAgIFwianVkZ2VfblwiOiAobikgPT4gXCLQm9C40L3QtdC50L3Ri9C5INGB0YPQtNGM0Y8g4oSWXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50X25cIjogKG4sIG5hbWUsIG5fc3ApID0+XHJcbiAgICAgICAgICAgICAgICAgICAgKG5fc3AgPiAyXHJcbiAgICAgICAgICAgICAgICAgICAgICAgID8gXCLQpNC+0YDQvNC10LnRiNC9IOKEllwiICsgbi50b1N0cmluZygpICsgKG5hbWUgPyBcIjogXCIgKyBuYW1lIDogXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgOiAobl9zcCA9PT0gMlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBcItCf0LDRgNCwIOKEllwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IFwi0KPRh9Cw0YHRgtC90LjQuiDihJZcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICApICsgbi50b1N0cmluZygpXHJcbiAgICAgICAgICAgICAgICAgICAgKSxcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJqdWRnaW5nXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY29uZmlybV9zY29yZVwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcImluaXRfdG91clwiOiBcItCf0LXRgNC10YHQvtC30LTQsNGC0Ywg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQpNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X2Fjcm9iYXRpY19vdmVycmlkZVwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic2h1ZmZsZV9oZWF0c1wiOiBcItCf0LXRgNC10LzQtdGI0LDRgtGMINC30LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzdGFydF90b3VyXCI6IFwi0J3QsNGH0LDRgtGMINGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3RvdXJcIjogXCLQntGB0YLQsNC90L7QstC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb25maXJtc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImZpbmFsaXplX3RvdXJcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDRhNC40L3QsNC70LjQt9C40YDQvtCy0LDRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwiaW5pdF90b3VyXCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXRgdC+0LfQtNCw0YLRjCDRjdGC0L7RgiDRgtGD0YA/XCIsXHJcbiAgICAgICAgICAgICAgICBcImxvYWRfcHJvZ3JhbVwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC/0LXRgNC10LfQsNCz0YDRg9C30LjRgtGMINC/0YDQvtCz0YDQsNC80LzRgyDQtNC70Y8g0Y3RgtC+0LPQviDRg9GH0LDRgdGC0L3QuNC60LA/XCIsXHJcbiAgICAgICAgICAgICAgICBcInNodWZmbGVfaGVhdHNcIjogXCLQktGLINC00LXQudGB0YLQstC40YLQtdC70YzQvdC+INGF0L7RgtC40YLQtSDQv9C10YDQtdC80LXRiNCw0YLRjCDQt9Cw0YXQvtC00Ys/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCx0LDQt9C+0LLRi9GFINC+0YbQtdC90L7QuiDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImxhYmVsc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fZGVzY3JpcHRpb25cIjogXCLQntC/0LjRgdCw0L3QuNC1INGC0YDRjtC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb19pZHhcIjogXCLihJYg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvYmF0aWNzXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiY2x1YlwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNvbmZpcm1lZFwiOiBcItCX0LDRhNC40LrRgdC40YDQvtCy0LDQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5ld19zY29yZVwiOiBcItCa0L7RgNGALlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgIFwib2xkX3Njb3JlXCI6IFwi0JHQsNC30LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRfbmFtZVwiOiBcItCj0YfQsNGB0YLQvdC40LpcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0JJcIixcclxuICAgICAgICAgICAgICAgIFwidG90YWxfc2NvcmVcIjogXCLQodGD0LzQvNCwINCx0LDQu9C70L7QslwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgXCJtb2RlbHNcIjoge1xyXG4gICAgICAgICAgICBcImNsdWJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC70YPQsdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNpdHlcIjogXCLQk9C+0YDQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcImV4dGVybmFsX2lkXCI6IFwi0JLQvdC10YjQvdC40LkgSURcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJjb21wZXRpdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjdGl2ZVwiOiBcItCQ0LrRgtC40LLQvdC+XCIsXHJcbiAgICAgICAgICAgICAgICBcImRhdGVcIjogXCLQlNCw0YLQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JTQvtC/0L7Qu9C90LjRgtC10LvRjNC90LDRjyDQuNC90YTQvtGA0LzQsNGG0LjRjyDQtNC70Y8g0L/RgNC+0YLQvtC60L7Qu9CwXCIsXHJcbiAgICAgICAgICAgICAgICBcImluZm9faXRlbV90aXRsZVwiOiBcItCX0LDQs9C+0LvQvtCy0L7QulwiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvX2l0ZW1fdmFsdWVcIjogXCLQl9C90LDRh9C10L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiY29tcGV0aXRpb25fcGxhbl9pdGVtXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZGlzY2lwbGluZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImVzdGltYXRlZF9iZWdpbm5pbmdcIjogXCLQndCw0YfQsNC70L5cIixcclxuICAgICAgICAgICAgICAgIFwiZXN0aW1hdGVkX2R1cmF0aW9uXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQndCw0LfQstCw0L3QuNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwXCI6IFwi0J/RgNC40L7RgNC40YLQtdGCXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtVwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lX2p1ZGdlc1wiOiBcItCh0YPQtNGM0LhcIixcclxuICAgICAgICAgICAgICAgIFwiZXh0ZXJuYWxfaWRcIjogXCLQktC90LXRiNC90LjQuSBJRFwiLFxyXG4gICAgICAgICAgICAgICAgXCJuYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQtNC40YHRhtC40L/Qu9C40L3Ri1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImRpc2NpcGxpbmVfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJyb2xlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0JBcIixcclxuICAgICAgICAgICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwiVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LtcIixcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjogXCLQotC10YVcIixcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJvbGVzX2xlZ2VuZFwiOiAoXHJcbiAgICAgICAgICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT1cInctMTAwXCI+PHRib2R5Pjx0cj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7Qk9C7IOKAlCDQs9C70LDQstC90YvQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QoiDigJQg0YHRg9C00YzRjyDRgtCw0L3RhtCwPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cInctMjVcIj7QkCDigJQg0YHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuDwvdGQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJ3LTI1XCI+0KJleCDigJQg0YLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPPC90ZD5cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgICAgICAgICAgICAgICksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwianVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBcItCa0LDRgtC10LPQvtGA0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJleHRlcm5hbF9pZFwiOiBcItCS0L0uIElEXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQpC4g0JguINCeLlwiLFxyXG4gICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLQndC+0LzQtdGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInJvbGVcIjogXCLQoNC+0LvRjCDQsiDRgdGD0LTQtdC50YHRgtCy0LVcIixcclxuICAgICAgICAgICAgICAgIFwicm9sZV9kZXNjcmlwdGlvblwiOiBcItCU0L7Qu9C20L3QvtGB0YLRjFwiLFxyXG4gICAgICAgICAgICAgICAgXCJzcFwiOiBcItCf0YDQuNC+0YDQuNGC0LXRglwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInBhcnRpY2lwYW50XCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb19kZXNjcmlwdGlvblwiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3JvX2Rlc2NyaXB0aW9uc1wiOiBcItCe0L/QuNGB0LDQvdC40LUg0YLRgNGO0LrQvtCyXCIsXHJcbiAgICAgICAgICAgICAgICBcImFjcm9fc2NvcmVcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfbmFtZVwiOiBcItCa0LvRg9CxXCIsXHJcbiAgICAgICAgICAgICAgICBcImNsdWJfY2l0eVwiOiBcItCT0L7RgNC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwiY29hY2hlc1wiOiBcItCi0YDQtdC90LXRgNGLXCIsXHJcbiAgICAgICAgICAgICAgICBcImRpc2NpcGxpbmVfbmFtZVwiOiBcItCU0LjRgdGG0LjQv9C70LjQvdCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImZpcnN0X25hbWVcIjogXCLQmNC80Y9cIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyXCI6IFwi0J/QvtC7XCIsXHJcbiAgICAgICAgICAgICAgICBcImdlbmRlcl9mXCI6IFwi0JZcIixcclxuICAgICAgICAgICAgICAgIFwiZ2VuZGVyX21cIjogXCLQnFwiLFxyXG4gICAgICAgICAgICAgICAgXCJnZW5lcmFsX2luZm9cIjogXCLQntGB0L3QvtCy0L3QsNGPINC40L3RhNC+0YDQvNCw0YbQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcImZvcm1hdGlvbl9uYW1lXCI6IFwi0J3QsNC30LLQsNC90LjQtSDQutC+0LzQsNC90LTRiyDRhNC+0YDQvNC10LnRiNC9XCIsXHJcbiAgICAgICAgICAgICAgICBcImxhc3RfbmFtZVwiOiBcItCk0LDQvNC40LvQuNGPXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5hbWVcIjogXCLQo9GH0LDRgdGC0L3QuNC6XCIsXHJcbiAgICAgICAgICAgICAgICBcIm51bWJlclwiOiBcItCd0L7QvNC10YBcIixcclxuICAgICAgICAgICAgICAgIFwicHJvZ3JhbXNcIjogXCLQn9GA0L7Qs9GA0LDQvNC80YtcIixcclxuICAgICAgICAgICAgICAgIFwic3BvcnRzbWFuXCI6IFwi0KHQv9C+0YDRgtGB0LzQtdC9XCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcInNwb3J0c21lbl95ZWFyX29mX2JpcnRoXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgICAgICBcInN1YnN0aXR1dGVfblwiOiBcItCe0YHQvS5cIixcclxuICAgICAgICAgICAgICAgIFwic3Vic3RpdHV0ZV95XCI6IFwi0JfQsNC/LlwiLFxyXG4gICAgICAgICAgICAgICAgXCJ5ZWFyX29mX2JpcnRoXCI6IFwi0JPQvtC0INGA0L7QttC00LXQvdC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwieW9iXCI6IFwi0JMu0YAuXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwicHJvZ3JhbVwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfZm9yXCI6IFwi0J/QviDRg9C80L7Qu9GH0LDQvdC40Y5cIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0L/RgNC+0LPRgNCw0LzQvNGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwidG91clwiOiB7XHJcbiAgICAgICAgICAgICAgICBcImRlZmF1bHRfcHJvZ3JhbVwiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwINC/0L4g0YPQvNC+0LvRh9Cw0L3QuNGOXCIsXHJcbiAgICAgICAgICAgICAgICBcImlzX2hvcGVfdG91clwiOiBcItCi0YPRgCDCq9Cd0LDQtNC10LbQtNGLwrtcIixcclxuICAgICAgICAgICAgICAgIFwibmFtZVwiOiBcItCd0LDQt9Cy0LDQvdC40LUg0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwibnVtX2FkdmFuY2VzXCI6IFwi0JrQstC+0YLQsCDQstGL0LLQvtC00LBcIixcclxuICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX3Blcl9oZWF0XCI6IFwi0KPRh9Cw0YHRgtC90LjQutC+0LIg0LIg0LfQsNGF0L7QtNC1XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjb3Jpbmdfc3lzdGVtX25hbWVcIjogXCLQodC40YHRgtC10LzQsCDRgdGD0LTQtdC50YHRgtCy0LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IHtcclxuICAgICAgICAgICAgXCJidXR0b25zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicmVzZXRfaGVhdFwiOiBcItCh0LHRgNC+0YEg0L3QvtC80LXRgNCwINC30LDRhdC+0LTQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXNldF9wbGFjZVwiOiBcItCh0LHRgNC+0YEg0LzQtdGB0YLQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJkaXNjaXBsaW5lXCI6IFwi0JTQuNGB0YbQuNC/0LvQuNC90LBcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItCX0LDRhdC+0LRcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VzXCI6IFwi0JzQtdGB0YLQsCDQtNC70Y8g0LLRi9Cy0L7QtNCwXCIsXHJcbiAgICAgICAgICAgICAgICBcInRvdXJcIjogXCLQotGD0YBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwbGFjZVwiOiBcItC80LXRgdGC0L5cIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdFwiOiBcItC30LDRhdC+0LRcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwicHJlc2VudGVyXCI6IHtcclxuICAgICAgICAgICAgXCJoZWFkZXJzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiY2x1YnNcIjogXCLQmtC70YPQsdGLLdGD0YfQsNGB0YLQvdC40LrQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJoZWF0c1wiOiBcItCX0LDRhdC+0LTRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0JjQvdGE0L7RgNC80LDRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgIFwianVkZ2VzXCI6IFwi0KHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgXCJyZXN1bHRzXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGC0YtcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJsYWJlbHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJub19hY3RpdmVfdG91clwiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3QvtCz0L4g0YLRg9GA0LBcIixcclxuICAgICAgICAgICAgICAgIFwicGxhY2VcIjogXCLQvNC10YHRgtC+XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICBcImFsZXJ0c1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vdF9maW5hbGl6ZWRcIjogXCLQlNCw0L3QvdGL0LUg0YDQtdC30YPQu9GM0YLQsNGC0Ysg0L3QtSDRj9Cy0LvRj9GO0YLRgdGPINC+0LrQvtC90YfQsNGC0LXQu9GM0L3Ri9C80LguXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiYnV0dG9uc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcInByaW50XCI6IFwi0J/QtdGH0LDRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICBcInNpbXBsZV92aWV3XCI6IFwi0KPQv9GA0L7RidC10L3QvdCw0Y8g0YLQsNCx0LvQuNGG0LBcIixcclxuICAgICAgICAgICAgICAgIFwidmVyYm9zZV92aWV3XCI6IFwi0J/QvtC00YDQvtCx0L3QsNGPINGC0LDQsdC70LjRhtCwXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICBcInN0YXJ0X3BhZ2VcIjoge1xyXG4gICAgICAgICAgICBcImhlYWRlcnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3RfY29tcGV0aXRpb25cIjogXCLQktGL0LHQtdGA0LjRgtC1INGB0L7RgNC10LLQvdC+0LLQsNC90LjQtSDQtNC70Y8g0L/RgNC+0LTQvtC70LbQtdC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzZWxlY3Rfcm9sZVwiOiBcItCS0YvQsdC10YDQuNGC0LUg0YHQstC+0Y4g0YDQvtC70YxcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJtZXNzYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcIm5vX2NvbXBldGl0aW9uc1wiOiBcItCd0LXRgiDQsNC60YLQuNCy0L3Ri9GFINGB0L7RgNC10LLQvdC+0LLQsNC90LjQuVwiLFxyXG4gICAgICAgICAgICAgICAgXCJjb21wZXRpdGlvbnNfbWFuYWdlbWVudF9saW5rXCI6IChsaW5rKSA9PiA8c3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICDQo9C/0YDQsNCy0LvQtdC90LjQtSDRgdC+0YDQtdCy0L3QvtCy0LDQvdC40Y/QvNC4INC90LDRhdC+0LTQuNGC0YHRjyDQv9C+INCw0LTRgNC10YHRgyZuYnNwO1xyXG4gICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBsaW5rIH0+eyBsaW5rIH08L2E+XHJcbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcInJvbGVzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWRtaW5pc3RyYXRvclwiOiBcItCQ0LTQvNC40L3QuNGB0YLRgNCw0YLQvtGAXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNjcmVlblwiOiBcItCt0LrRgNCw0L1cIixcclxuICAgICAgICAgICAgICAgIFwic2NyZWVuX29wZXJhdG9yXCI6IFwi0J7Qv9C10YDQsNGC0L7RgCDRjdC60YDQsNC90LBcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIFwidGFibGV0XCI6IHtcclxuICAgICAgICAgICAgXCJhbGVydHNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJoYXNfdW5jb25maXJtZWRfc2NvcmVzXCI6IFwi0JjQvNC10Y7RgtGB0Y8g0L3QtdC30LDRhNC40LrRgdC40YDQvtCy0LDQvdC90YvQtSDQvtGG0LXQvdC60Lgg0YHRg9C00LXQuSDQsiDQv9C+0YHQu9C10LTQvdC10Lwg0LfQsNGF0L7QtNC1LlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImJ1dHRvbnNcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyXCI6IFwi0KTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91cl9hbmRfc3RhcnRfbmV4dFwiOiBcItCk0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0YLRg9GAINC4INC/0LXRgNC10LnRgtC4INC6INGB0LvQtdC00YPRjtGJ0LXQvNGDXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5leHRfaGVhdFwiOiBcItCh0LvQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC10LLRi9GF0L7QtCDQvdCwINC/0LvQvtGJ0LDQtNC60YNcIixcclxuICAgICAgICAgICAgICAgIFwicGVyZm9ybWVkXCI6IFwi0J7RgtC80LXQvdCwINC90LXQstGL0YXQvtC00LAg0L3QsCDQv9C70L7RidCw0LTQutGDXCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXZfaGVhdFwiOiBcItCf0YDQtdC0LiDQt9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInJlc2V0X3N0b3B3YXRjaFwiOiBcItCh0LHRgNC+0YFcIixcclxuICAgICAgICAgICAgICAgIFwic3RhcnRfc3RvcHdhdGNoXCI6IFwi0KHRgtCw0YDRglwiLFxyXG4gICAgICAgICAgICAgICAgXCJzdG9wX3N0b3B3YXRjaFwiOiBcItCh0YLQvtC/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCX0LDQstC10YDRiNC40YLRjCDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JfQsNCy0LXRgNGI0LjRgtGMINGC0YPRgCDQuCDQv9C10YDQtdC50YLQuCDQuiDRgdC70LXQtNGD0Y7RidC10LzRgyDRgtGD0YDRg1wiLFxyXG4gICAgICAgICAgICAgICAgXCJ0b19zdGFydF9wYWdlXCI6IFwi0J3QsCDQs9C70LDQstC90YPRjlwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcImNvbmZpcm1zXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiZmluYWxpemVfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INGE0LjQvdCw0LvQuNC30LjRgNC+0LLQsNGC0Ywg0Y3RgtC+0YIg0YLRg9GAP1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmaW5hbGl6ZV90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0YTQuNC90LDQu9C40LfQuNGA0L7QstCw0YLRjCDRjdGC0L7RgiDRgtGD0YAg0Lgg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgICAgICBcInN0b3BfdG91clwiOiBcItCS0Ysg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90L4g0YXQvtGC0LjRgtC1INC+0YHRgtCw0L3QvtCy0LjRgtGMINGN0YLQvtGCINGC0YPRgD9cIixcclxuICAgICAgICAgICAgICAgIFwic3RvcF90b3VyX2FuZF9zdGFydF9uZXh0XCI6IFwi0JLRiyDQtNC10LnRgdGC0LLQuNGC0LXQu9GM0L3QviDRhdC+0YLQuNGC0LUg0L/QtdGA0LXQudGC0Lgg0Log0YHQu9C10LTRg9GO0YnQtdC80YMg0YLRg9GA0YM/XCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCLQkNC60YDQvtCx0LDRgtC40LrQsCDihJZcIiArIChuICsgMSksXHJcbiAgICAgICAgICAgICAgICBcImhlYXRcIjogXCLQl9Cw0YXQvtC0XCIsXHJcbiAgICAgICAgICAgICAgICBcInByZXNlbnRlclwiOiBcItCS0LXQtNGD0YnQuNC5XCIsXHJcbiAgICAgICAgICAgICAgICBcInNlbGVjdF9wYWdlXCI6IFwi0KHRgtGA0LDQvdC40YbQsFwiLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBcIm1lc3NhZ2VzXCI6IHtcclxuICAgICAgICAgICAgICAgIFwibm90X2p1ZGdpbmdfZGlzY2lwbGluZVwiOiBcItCS0Ysg0L3QtSDRg9GH0LDRgdGC0LLRg9C10YLQtSDQsiDRgdGD0LTQtdC50YHRgtCy0LUg0LTQsNC90L3QvtC5INC00LjRgdGG0LjQv9C70LjQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3BhcnRpY2lwYW50XCI6IFwi0JLRiyDQvdC1INC+0YbQtdC90LjQstCw0LXRgtC1INGN0YLQvtCz0L4g0YPRh9Cw0YHRgtC90LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9qdWRnaW5nX3RvdXJcIjogXCLQktGLINC90LUg0L7RhtC10L3QuNCy0LDQtdGC0LUg0Y3RgtC+0YIg0YLRg9GAXCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtaW5nXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC10YJcIixcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgXCJwYWdlc1wiOiB7XHJcbiAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgXCJhY3Rpb25zXCI6IFwi0JTQtdC50YHRgtCy0LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgXCJkYW5jZVwiOiBcItCi0LDQvdC10YZcIixcclxuICAgICAgICAgICAgICAgIFwiaGVhdHNcIjogXCLQl9Cw0YXQvtC00YtcIixcclxuICAgICAgICAgICAgICAgIFwicmVzdWx0c1wiOiBcItCg0LXQt9GD0LvRjNGC0LDRgtGLXCIsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuXHJcbiAgICAgICAgXCJzY29yaW5nX3N5c3RlbXNcIjoge1xyXG4gICAgICAgICAgICBcInJvc2ZhcnJcIjoge1xyXG4gICAgICAgICAgICAgICAgXCJ0YWJsZXRcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYWNyb19qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zMClcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiZGFuY2VfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9iYXRpY3NcIjogXCLQkNC60YDQvtCx0LDRgtC40LrQsFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImJpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMwKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImNvbXBvc2l0aW9uXCI6IFwi0JrQvtC80L/QvtC30LjRhtC40Y9cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9maWdzXCI6IFwi0KLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INGE0LjQs9GD0YDRi1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImRhbmNlX3RlY2hcIjogXCLQotC10YXQvdC40LrQsCDRgtCw0L3RhtC10LLQsNC90LjRj1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fZmFsbF9kb3duXCI6IFwi0J/QsNC00LXQvdC40Y8gKC0zKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fbWlzdGFrZXNcIjogXCLQntGI0LjQsdC60LggKC0yKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZvcm1fc21hbGxfbWlzdGFrZXNcIjogXCLQnNCw0LvQtdC90YzQutC40LUg0L7RiNC40LHQutC4ICgtMilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX2JpZ19taXN0YWtlc1wiOiBcItCR0L7Qu9GM0YjQuNC1INC+0YjQuNCx0LrQuCAoLTMpXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZndfbWFuXCI6IFwi0J7RgdC90L7QstC90L7QuSDRhdC+0LQsINC/0LDRgNGC0L3RkdGAICjRgdCx0LDQstC60LAg0LIgJSlcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd193b21hblwiOiBcItCe0YHQvdC+0LLQvdC+0Lkg0YXQvtC0LCDQv9Cw0YDRgtC90ZHRgNGI0LAgKNGB0LHQsNCy0LrQsCDQsiAlKVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImltcHJlc3Npb25cIjogXCLQntCx0YnQtdC1INCy0L/QtdGH0LDRgtC70LXQvdC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwb2ludHNcIjogXCLQntGG0LXQvdC60LBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbWFsbF9taXN0YWtlc1wiOiBcItCc0LDQu9C10L3RjNC60LjQtSDQvtGI0LjQsdC60LggKC01KVwiLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgXCJnbG9iYWxcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInRvdGFsX3Njb3JlXCI6IFwi0KHRg9C80LzQsCDQsdCw0LvQu9C+0LJcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljX292ZXJyaWRlc1wiOiBcItCa0L7RgNGA0LXQutGC0LjRgNC+0LLQutC4INCw0LrRgNC+0LHQsNGC0LjQutC4XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYmxhY2tfY2FyZFwiOiBcIi0xMDBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJkYW5jZV9qdWRnZV9zY29yZXNcIjogXCLQntGG0LXQvdC60Lgg0LvQuNC90LXQudC90YvRhSDRgdGD0LTQtdC5XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwib2tcIjogXCJPS1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlfdHlwZVwiOiBcItCo0YLRgNCw0YTQvdGL0LUg0YHQsNC90LrRhtC40LhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwcmV2aW91c19wZW5hbHRpZXNcIjogXCLQn9GA0LXQtNGL0LTRg9GJ0LjQtSDRiNGC0YDQsNGE0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZWRfY2FyZFwiOiBcIi0zMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInllbGxvd19jYXJkXCI6IFwiLTNcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3llbGxvd19jYXJkXCI6IFwiLTVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmb3JtX3JlZF9jYXJkXCI6IFwiLTE1XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBcInRlY2hfanVkZ2VcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImp1bXBfc3RlcHNcIjogXCLQntGB0L3QvtCy0L3Ri9C1INGF0L7QtNGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicmVzZXRfdG9fblwiOiAobikgPT4gXCLQodCx0YDQvtGBINC90LAgXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwidGltaW5nXCI6IFwi0JTQu9C40YLQtdC70YzQvdC+0YHRgtGMXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBcInJlc3VsdHNcIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwiYnJlYWtkb3duXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhXCI6IFwiQVwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImFjcm9fblwiOiAobikgPT4gXCJBXCIgKyBuLnRvU3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYm1cIjogXCLQkdCeXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiY1wiOiBcItCaXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZGZcIjogXCLQotCkXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZHRcIjogXCLQolRcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmZFwiOiBcItCfXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiZm1cIjogXCLQntCl0LxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd1wiOiBcItCe0KXQtlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImlcIjogXCLQntCSXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibVwiOiBcItCe0YhcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwXCI6IFwi0JxcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJzbVwiOiBcItCc0J5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0XCI6IFwizqNcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwiaGVhZGVyc1wiOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwicGFydGljaXBhbnRzX2FkdmFuY2VkXCI6IFwi0J/RgNC+0YjQu9C4INCyINGB0LvQtdC00YPRjtGJ0LjQuSDRgtGD0YBcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudHNfbm90X2FkdmFuY2VkXCI6IFwi0J3QtSDQv9GA0L7RiNC70Lgg0LIg0YHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBhcnRpY2lwYW50c19ub3RfcGVyZm9ybWVkXCI6IFwi0J3QtSDQstGL0YHRgtGD0L/QsNC70LhcIixcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIFwibGFiZWxzXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJhY3JvX3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCw0LrRgNC+XCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc1wiOiBcItCQ0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwiYWNyb2JhdGljc192ZXJib3NlXCI6IFwi0JDQutGA0L7QsdCw0YLQuNC60LAgKNC30LDRj9Cy0LrQsC/RhNCw0LrRgilcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJjYXJkXCI6IFwi0KjRgtGA0LDRhFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcImZ3X3Njb3JlXCI6IFwi0KDQtdC30YPQu9GM0YLQsNGCINCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJmd19zY29yZV9zaG9ydFwiOiBcItCi0J1cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJpbmZvXCI6IFwi0KPRh9Cw0YHRgtC90LjQuiwg0YDQtdC30YPQu9GM0YLQsNGCXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwibmV4dF90b3VyXCI6IFwi0KHQu9C10LTRg9GO0YnQuNC5INGC0YPRgFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcIm5vdF9wZXJmb3JtZWRcIjogXCLQndC1INC/0YDQuNC90LjQvNCw0Lsg0YPRh9Cw0YHRgtC40LVcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJudW1iZXJcIjogXCLihJZcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jbHViXCI6IFwi0JrQu9GD0LFcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9jb2FjaGVzXCI6IFwi0KLRgNC10L3QtdGA0YtcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJwYXJ0aWNpcGFudF9uYW1lXCI6IFwi0KPRh9Cw0YHRgtC90LjQulwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBlbmFsdHlcIjogXCLQqNGC0YDQsNGEINCz0LvQsNCy0L3QvtCz0L4g0YHRg9C00YzQuFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInBsYWNlXCI6IFwi0JzQtdGB0YLQvlwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBcInNwb3J0c21lblwiOiBcItCh0L/QvtGA0YLRgdC80LXQvdGLXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIFwic3BvcnRzbWVuX3llYXJfb2ZfYmlydGhcIjogXCLQky7RgC5cIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0b3RhbF9zY29yZVwiOiBcItCY0YLQvtCzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcblxyXG4gICAgICAgIFwic2NvcmluZ19zeXN0ZW1zX25hbWVzXCI6IHtcclxuICAgICAgICAgICAgXCJyb3NmYXJyXCI6IHtcclxuICAgICAgICAgICAgICAgIFwiYWNyb1wiOiBcItCg0L7RgdCk0JDQoNCgLCDQsNC60YDQvtCx0LDRgtC40YfQtdGB0LrQuNC1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJhbV9maW5hbF9hY3JvXCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbiAgICAgICAgICAgICAgICBcImFtX2ZpbmFsX2Z3XCI6IFwi0KDQvtGB0KTQkNCg0KAsIEEg0LggTSDQutC70LDRgdGB0YssINGE0LjQvdCw0LssINGC0LXRhdC90LjQutCwINC90L7Qs1wiLFxyXG4gICAgICAgICAgICAgICAgXCJmb3JtYXRpb25cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDQsdC10Lcg0LDQutGA0L7QsdCw0YLQuNC60LhcIixcclxuICAgICAgICAgICAgICAgIFwiZm9ybWF0aW9uX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YTQvtGA0LzQtdC50YjQvSDRgSDQsNC60YDQvtCx0LDRgtC40LrQvtC5XCIsXHJcbiAgICAgICAgICAgICAgICBcIm5vX2Fjcm9cIjogXCLQoNC+0YHQpNCQ0KDQoCwg0YLQsNC90YbQtdCy0LDQu9GM0L3Ri9C1INC/0YDQvtCz0YDQsNC80LzRi1wiLFxyXG4gICAgICAgICAgICAgICAgXCJzaW1wbGlmaWVkXCI6IFwi0KDQvtGB0KTQkNCg0KAsINGD0L/RgNC+0YnQtdC90L3QsNGPINGB0LjRgdGC0LXQvNCwICgx4oCTNDApXCIsXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIFwianVkZ2Vfcm9sZXNcIjoge1xyXG4gICAgICAgICAgICBcIlwiOiBcIi1cIixcclxuICAgICAgICAgICAgXCJhY3JvX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDQsNC60YDQvtCx0LDRgtC40LrQuFwiLFxyXG4gICAgICAgICAgICBcImRhbmNlX2p1ZGdlXCI6IFwi0KHRg9C00YzRjyDRgtCw0L3RhtCwXCIsXHJcbiAgICAgICAgICAgIFwiaGVhZF9qdWRnZVwiOiBcItCT0LvQsNCy0L3Ri9C5INGB0YPQtNGM0Y9cIixcclxuICAgICAgICAgICAgXCJ0ZWNoX2p1ZGdlXCI6IFwi0KLQtdGF0L3QuNGH0LXRgdC60LjQuSDRgdGD0LTRjNGPXCIsXHJcbiAgICAgICAgfSxcclxuICAgIH07XHJcbiAgICBsZXQgcGF0aCA9IHNyYy5zcGxpdChcIi5cIik7XHJcbiAgICBsZXQgcGhyYXNlX3B0ciA9IFBIUkFTRVM7XHJcbiAgICBwYXRoLmZvckVhY2goKGNodW5rKSA9PiBwaHJhc2VfcHRyID0gcGhyYXNlX3B0cltjaHVua10pO1xyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihcIlVuYWJsZSB0byBmaW5kIHRyYW5zbGF0aW9uIGZvciBcIiArIHNyYyk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHR5cGVvZiBwaHJhc2VfcHRyID09PSBcImZ1bmN0aW9uXCIpIHtcclxuICAgICAgICBsZXQgYXJncyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IGlkeCA9IDE7IGlkeCA8IGFyZ3VtZW50cy5sZW5ndGg7ICsraWR4KSB7XHJcbiAgICAgICAgICAgIGFyZ3MucHVzaChhcmd1bWVudHNbaWR4XSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwaHJhc2VfcHRyKC4uLmFyZ3MpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHBocmFzZV9wdHI7XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgZ2V0UG9zc2libGVUb3VyTmFtZXMgPSAoKSA9PiBbXHJcbiAgICBcItCk0LjQvdCw0LtcIixcclxuICAgIFwi0KLRg9GAIMKr0J3QsNC00LXQttC00YvCu1wiLFxyXG4gICAgXCLQntGC0LHQvtGA0L7Rh9C90YvQuSDRgtGD0YBcIixcclxuICAgIFwiMS8yINGE0LjQvdCw0LvQsFwiLFxyXG4gICAgXCIxLzQg0YTQuNC90LDQu9CwXCIsXHJcbiAgICBcIjEvOCDRhNC40L3QsNC70LBcIixcclxuICAgIFwiMS8xNiDRhNC40L3QsNC70LBcIixcclxuICAgIFwi0KTQuNC90LDQuywg0YLQtdGF0L3QuNC60LAg0L3QvtCzXCIsXHJcbiAgICBcItCk0LjQvdCw0LssINCw0LrRgNC+0LHQsNGC0LjQutCwXCIsXHJcbl07XHJcbiIsImltcG9ydCB7IEp1ZGdlIH0gZnJvbSBcImNsaWVudHMvanVkZ2UvbWFpblwiO1xuXG5cblJlYWN0RE9NLnJlbmRlcihcbiAgICA8SnVkZ2UgeyAuLi53aW5kb3cucGFnZV9wcm9wcyB9IC8+LFxuICAgIHdpbmRvdy5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbnRlbnRcIilcbik7XG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcbmltcG9ydCB7IHN0b3JhZ2UgfSBmcm9tIFwic2VydmVyL3N0b3JhZ2VcIjtcclxuaW1wb3J0IHsgc2hvd0Vycm9yIH0gZnJvbSBcInVpL2RpYWxvZ3NcIjtcclxuXHJcblxyXG5jbGFzcyBBcGlJbXBsIHtcclxuICAgIGNvbnN0cnVjdG9yKG1ldGhvZCwgZGF0YSkge1xyXG4gICAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5jYl9zdWNjZXNzID0gKCkgPT4ge307XHJcbiAgICAgICAgdGhpcy5jYl9lcnJvciA9IChtc2csIGNvZGUsIGFyZ3MpID0+IHNob3dFcnJvcihjb2RlID8gXyhjb2RlLCAuLi5hcmdzKSA6IG1zZyk7XHJcbiAgICAgICAgdGhpcy5jYl9mYWlsID0gKC4uLmRhdGEpID0+IGNvbnNvbGUuZXJyb3IoXCJBUEkgZmFpbFwiLCAuLi5kYXRhKTtcclxuICAgICAgICB0aGlzLmNiX2RvbmUgPSAoKSA9PiB7fTtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9ICgpID0+IHt9O1xyXG4gICAgfVxyXG4gICAgb25Eb25lKGNhbGxiYWNrKSB7XHJcbiAgICAgICAgdGhpcy5jYl9kb25lID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvblN1Y2Nlc3MoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX3N1Y2Nlc3MgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIG9uRXJyb3IoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2Vycm9yID0gY2FsbGJhY2s7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBvbkZhaWwoY2FsbGJhY2spIHtcclxuICAgICAgICB0aGlzLmNiX2ZhaWwgPSBjYWxsYmFjaztcclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIGFkZFRvREIobW9kZWxfdHlwZSwgbW9kZWxfaWQsIHN0PXN0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZV9kYiA9IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XHJcbiAgICAgICAgICAgIHN0LmdldChtb2RlbF90eXBlKS5hZGQobW9kZWxfaWQsIHJlc3BvbnNlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICBzZW5kKCkge1xyXG4gICAgICAgIGxldCB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgXCIvYXBpXCIsIHRydWUpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY2JfZG9uZSgpO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyAhPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNiX2ZhaWwoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsZXQgcmVzcG9uc2UgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVfZGIocmVzcG9uc2UucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jYl9zdWNjZXNzKHJlc3BvbnNlLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY2JfZXJyb3IocmVzcG9uc2UubWVzc2FnZSwgcmVzcG9uc2UuY29kZSwgcmVzcG9uc2UuYXJncyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNiX2RvbmUoKTtcclxuICAgICAgICAgICAgdGhpcy5jYl9mYWlsKCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBsZXQgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiY2xpZW50X2lkXCIsIHdpbmRvdy5jbGllbnRfaWQpO1xyXG4gICAgICAgIGRhdGEuYXBwZW5kKFwiZGF0YVwiLCBKU09OLnN0cmluZ2lmeSh0aGlzLmRhdGEpKTtcclxuICAgICAgICBkYXRhLmFwcGVuZChcIm1ldGhvZFwiLCB0aGlzLm1ldGhvZCk7XHJcbiAgICAgICAgeGhyLnNlbmQoZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgQXBpID0gKC4uLmFyZ3MpID0+IG5ldyBBcGlJbXBsKC4uLmFyZ3MpO1xyXG4iLCJpbXBvcnQgeyBzdG9yYWdlIH0gZnJvbSBcInNlcnZlci9zdG9yYWdlXCI7XHJcbmltcG9ydCB7IGNvbm5lY3Rpb25fc3RhdHVzIH0gZnJvbSBcInVpL2NvbXBvbmVudHNcIjtcclxuXHJcblxyXG5jbGFzcyBNZXNzYWdlRGlzcGF0Y2hlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICB0aGlzLmNsb3NlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMubGlzdGVuZXJzID0ge307XHJcbiAgICAgICAgdGhpcy5saXN0ZW5lcnNfY250ID0gMDtcclxuICAgICAgICB0aGlzLmNvbm5lY3QoKTtcclxuICAgIH1cclxuICAgIGNvbm5lY3QoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0aW5nIHRvIHdlYnNvY2tldC4uLlwiKTtcclxuICAgICAgICB0aGlzLndzID0gbmV3IFNvY2tKUyhcImh0dHA6Ly9cIiArIHdpbmRvdy5sb2NhdGlvbi5ob3N0ICsgXCIvd3NcIik7XHJcbiAgICAgICAgdGhpcy53cy5vbm9wZW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0T2soKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJDb25uZWN0ZWQuXCIpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jbG9zZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMub25NZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2VzOiBbW1wicmVsb2FkX2RhdGFcIiwgbnVsbF1dLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlbF91cGRhdGVzOiBbXSxcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9uY2xvc2UgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29ubmVjdGlvbl9zdGF0dXMuc2V0RmFpbCgpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIkNvbm5lY3Rpb24gY2xvc2VkLlwiKTtcclxuICAgICAgICAgICAgdGhpcy5jbG9zZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KHRoaXMuY29ubmVjdC5iaW5kKHRoaXMpLCA1MDApO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLndzLm9ubWVzc2FnZSA9IHRoaXMub25NZXNzYWdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBvbk1lc3NhZ2UobWVzc2FnZSkge1xyXG4gICAgICAgIGxldCBkYXRhID0gSlNPTi5wYXJzZShtZXNzYWdlLmRhdGEpO1xyXG4gICAgICAgIGlmIChkYXRhW1wiY2xpZW50X2lkXCJdKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5jbGllbnRfaWQgPSBkYXRhW1wiY2xpZW50X2lkXCJdO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGRhdGEubWVzc2FnZXMuZm9yRWFjaChmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgIGxldCBtc2dfdHlwZSA9IGRhdGFbMF07XHJcbiAgICAgICAgICAgIGxldCBtc2dfZGF0YSA9IGRhdGFbMV07XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1ttc2dfdHlwZV0gfHwge307XHJcbiAgICAgICAgICAgIGlmIChtc2dfdHlwZSA9PT0gXCJmb3JjZV9yZWZyZXNoXCIpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQodHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgT2JqZWN0LmtleXModGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdIHx8IHt9KS5mb3JFYWNoKChrZXkpID0+IGxpc3RlbmVyc1trZXldKG1zZ19kYXRhKSk7XHJcbiAgICAgICAgfS5iaW5kKHRoaXMpKTtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgZGF0YS5tb2RlbF91cGRhdGVzLmZvckVhY2goKG1vZGVsX2luZm8pID0+IHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gc3RvcmFnZS51cGRhdGVNb2RlbChtb2RlbF9pbmZvLm1vZGVsLCBtb2RlbF9pbmZvLmlkLCBtb2RlbF9pbmZvLmRhdGEpIHx8IGRhdGFfY2hhbmdlZDtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoZGF0YV9jaGFuZ2VkKSB7XHJcbiAgICAgICAgICAgIGxldCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tcImRiX3VwZGF0ZVwiXSB8fCB7fTtcclxuICAgICAgICAgICAgT2JqZWN0LmtleXMobGlzdGVuZXJzKS5mb3JFYWNoKChrZXkpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lcnNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpc3RlbmVyc1trZXldKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldExpc3RlbmVySWQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubGlzdGVuZXJzX2NudCsrO1xyXG4gICAgfVxyXG4gICAgYWRkTGlzdGVuZXIobXNnX3R5cGVzLCBjYWxsYmFjaykge1xyXG4gICAgICAgIGxldCBpZCA9IHRoaXMuZ2V0TGlzdGVuZXJJZCgpO1xyXG4gICAgICAgIG1zZ190eXBlcy5zcGxpdChcIiBcIikuZm9yRWFjaChmdW5jdGlvbihtc2dfdHlwZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMubGlzdGVuZXJzW21zZ190eXBlXSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5saXN0ZW5lcnNbbXNnX3R5cGVdW2lkXSA9IGNhbGxiYWNrO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlTGlzdGVuZXIobGlzdGVuZXJfaWQpIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmxpc3RlbmVycykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgZGVsZXRlIHRoaXMubGlzdGVuZXJzW2tleV1bbGlzdGVuZXJfaWRdO1xyXG4gICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB2YXIgbWVzc2FnZV9kaXNwYXRjaGVyID0gbmV3IE1lc3NhZ2VEaXNwYXRjaGVyKCk7XHJcbiIsImNsYXNzIFJlZiB7XHJcbiAgICBjb25zdHJ1Y3RvcihzdG9yYWdlLCBtb2RlbF9uYW1lLCBpZCkge1xyXG4gICAgICAgIHRoaXMubW9kZWxfbmFtZSA9IG1vZGVsX25hbWU7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBnZXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5nZXQodGhpcy5tb2RlbF9uYW1lKS5ieV9pZCh0aGlzLmlkKTtcclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3Ioc3RvcmFnZSwgaWQsIG1vZGVsX3N0b3JhZ2UpIHtcclxuICAgICAgICB0aGlzLmlkID0gaWQ7XHJcbiAgICAgICAgdGhpcy5fX3N0b3JhZ2UgPSBzdG9yYWdlO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXMgPSB7fTtcclxuICAgICAgICB0aGlzLl9fbW9kZWxfc3RvcmFnZSA9IG1vZGVsX3N0b3JhZ2U7XHJcbiAgICB9XHJcbiAgICBhZGRCYWNrUmVmKGtleSwgcmVmKSB7XHJcbiAgICAgICAgdGhpc1trZXldID0gcmVmO1xyXG4gICAgICAgIHRoaXMuX19rZXlfdHlwZXNba2V5XSA9IFwiXlwiO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlKGRhdGEsIGNyZWF0ZT10cnVlKSB7XHJcbiAgICAgICAgZm9yIChsZXQgaWR4IGluIGRhdGEpIGlmIChkYXRhLmhhc093blByb3BlcnR5KGlkeCkpIHtcclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiIHx8IGlkeC5jaGFyQXQoMCkgPT09IFwiXlwiKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNyZWF0ZSAmJiB0eXBlb2YgdGhpc1tpZHguc2xpY2UoMSldID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKGlkeC5jaGFyQXQoMCkgPT09IFwiKlwiKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQga2V5ID0gaWR4LnNsaWNlKDEpO1xyXG4gICAgICAgICAgICAgICAgdGhpc1trZXldID0gW11cclxuICAgICAgICAgICAgICAgIGxldCBiYWNrX3JlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIHRoaXMuX19tb2RlbF9zdG9yYWdlLm1vZGVsX25hbWUsIHRoaXMuaWQpO1xyXG4gICAgICAgICAgICAgICAgbGV0IGJhY2tfcmVmX2tleSA9IGRhdGFbaWR4XS5iYWNrX3JlZjtcclxuICAgICAgICAgICAgICAgIGRhdGFbaWR4XS5jaGlsZHJlbi5mb3JFYWNoKGZ1bmN0aW9uKG5lc3RlZF9kYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBuZXN0ZWRfZGF0YS5kYXRhID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19zdG9yYWdlLmdldChuZXN0ZWRfZGF0YS5tb2RlbCkuYWRkKG5lc3RlZF9kYXRhLmlkLCBuZXN0ZWRfZGF0YS5kYXRhKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlZiA9IG5ldyBSZWYodGhpcy5fX3N0b3JhZ2UsIG5lc3RlZF9kYXRhLm1vZGVsLCBuZXN0ZWRfZGF0YS5pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVmLmdldCgpLmFkZEJhY2tSZWYoYmFja19yZWZfa2V5LCBiYWNrX3JlZik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldLnB1c2gocmVmKTtcclxuICAgICAgICAgICAgICAgIH0uYmluZCh0aGlzKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2tleV0gPSBcIipcIjtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpZHguY2hhckF0KDApID09PSBcIl5cIikge1xyXG4gICAgICAgICAgICAgICAgbGV0IGtleSA9IGlkeC5zbGljZSgxKTtcclxuICAgICAgICAgICAgICAgIGxldCBuZXN0ZWRfZGF0YSA9IGRhdGFbaWR4XTtcclxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbmVzdGVkX2RhdGEgPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fc3RvcmFnZS5nZXQobmVzdGVkX2RhdGEubW9kZWwpLmFkZChuZXN0ZWRfZGF0YS5pZCwgbmVzdGVkX2RhdGEuZGF0YSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBuZXcgUmVmKHRoaXMuX19zdG9yYWdlLCBuZXN0ZWRfZGF0YS5tb2RlbCwgbmVzdGVkX2RhdGEuaWQpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fX2tleV90eXBlc1trZXldID0gXCJeXCI7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzW2lkeF0gPSBkYXRhW2lkeF07XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9fa2V5X3R5cGVzW2lkeF0gPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2VyaWFsaXplKHNjaGVtYSkge1xyXG4gICAgICAgIGxldCByZXN1bHQgPSB7fVxyXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9fa2V5X3R5cGVzKSBpZiAodGhpcy5fX2tleV90eXBlcy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5fX2tleV90eXBlc1trZXldKSB7XHJcbiAgICAgICAgICAgIGNhc2UgXCIqXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLm1hcChmdW5jdGlvbihyZWYpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlZi5nZXQoKS5zZXJpYWxpemUoc2NoZW1hW2tleV0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgXCJeXCI6XHJcbiAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHNjaGVtYSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldLmdldCgpLnNlcmlhbGl6ZShzY2hlbWFba2V5XSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpc1trZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJlc3VsdC5pZCA9IHRoaXMuaWRcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG59XHJcblxyXG5jbGFzcyBNb2RlbHNTdG9yYWdlIHtcclxuICAgIGNvbnN0cnVjdG9yKHN0b3JhZ2UsIG1vZGVsX25hbWUpIHtcclxuICAgICAgICB0aGlzLm1vZGVsX25hbWUgPSBtb2RlbF9uYW1lO1xyXG4gICAgICAgIHRoaXMubW9kZWxzID0ge307XHJcbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcclxuICAgIH1cclxuICAgIGFkZChpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5tb2RlbHNbaWRdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxzW2lkXSA9IG5ldyBNb2RlbCh0aGlzLnN0b3JhZ2UsIGlkLCB0aGlzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhKTtcclxuICAgIH1cclxuICAgIHVwZGF0ZShpZCwgZGF0YSkge1xyXG4gICAgICAgIGlmICh0aGlzLm1vZGVsc1tpZF0pIHtcclxuICAgICAgICAgICAgdGhpcy5tb2RlbHNbaWRdLnVwZGF0ZShkYXRhLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBieV9pZChpZCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1vZGVsc1tpZF07XHJcbiAgICB9XHJcbiAgICBhbGwoKSB7XHJcbiAgICAgICAgbGV0IGtleXMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLm1vZGVscyk7XHJcbiAgICAgICAgcmV0dXJuIGtleXMubWFwKGZ1bmN0aW9uKGtleSkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tb2RlbHNba2V5XTtcclxuICAgICAgICB9LmJpbmQodGhpcykpXHJcbiAgICB9XHJcbn1cclxuXHJcbmNsYXNzIFN0b3JhZ2Uge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgdGhpcy5tb2RlbF9zdG9yYWdlcyA9IHt9XHJcbiAgICAgICAgdGhpcy5kb21haW5zID0ge31cclxuICAgIH1cclxuICAgIGdldERvbWFpbihkb21haW4pIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZG9tYWluc1tkb21haW5dID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9tYWluc1tkb21haW5dID0gbmV3IFN0b3JhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZG9tYWluc1tkb21haW5dO1xyXG4gICAgfVxyXG4gICAgZGVsRG9tYWluKGRvbWFpbikge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmRvbWFpbnNbZG9tYWluXTtcclxuICAgIH1cclxuICAgIGdldChtb2RlbF9uYW1lKSB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdID09PSBcInVuZGVmaW5lZFwiKSB7XHJcbiAgICAgICAgICAgIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV0gPSBuZXcgTW9kZWxzU3RvcmFnZSh0aGlzLCBtb2RlbF9uYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfbmFtZV07XHJcbiAgICB9XHJcbiAgICBkZWwobW9kZWxfbmFtZSkge1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLm1vZGVsX3N0b3JhZ2VzW21vZGVsX25hbWVdO1xyXG4gICAgfVxyXG4gICAgdXBkYXRlTW9kZWwobW9kZWxfdHlwZSwgbW9kZWxfaWQsIGRhdGEpIHtcclxuICAgICAgICBsZXQgZGF0YV9jaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMubW9kZWxfc3RvcmFnZXNbbW9kZWxfdHlwZV0pIHtcclxuICAgICAgICAgICAgZGF0YV9jaGFuZ2VkID0gdGhpcy5nZXQobW9kZWxfdHlwZSkuYWRkKG1vZGVsX2lkLCBkYXRhKSB8fCBkYXRhX2NoYW5nZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuZG9tYWlucykuZm9yRWFjaCgoa2V5KSA9PlxyXG4gICAgICAgICAgICBkYXRhX2NoYW5nZWQgPSB0aGlzLmRvbWFpbnNba2V5XS51cGRhdGVNb2RlbCguLi5hcmd1bWVudHMpIHx8IGRhdGFfY2hhbmdlZCk7XHJcbiAgICAgICAgLy8gcmV0dXJuIGRhdGFfY2hhbmdlZDtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IHZhciBzdG9yYWdlID0gbmV3IFN0b3JhZ2UoKVxyXG4iLCJpbXBvcnQgeyBfIH0gZnJvbSBcImkxMG4vbG9hZGVyXCI7XHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIExvYWRlciBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIDx0YWJsZSBzdHlsZT17eyBcImhlaWdodFwiOiBcIjEwMCVcIiwgXCJ3aWR0aFwiOiBcIjEwMCVcIiB9fT48dGJvZHk+PHRyPlxyXG4gICAgICAgICAgICA8dGQgc3R5bGU9e3sgXCJ0ZXh0QWxpZ25cIjogXCJjZW50ZXJcIiB9fT5cclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiL3N0YXRpYy9pbWcvYWpheC1sb2FkZXIuZ2lmXCIgLz5cclxuICAgICAgICAgICAgPC90ZD5cclxuICAgICAgICA8L3RyPjwvdGJvZHk+PC90YWJsZT5cclxuICAgIH1cclxufVxyXG5cclxuY2xhc3MgQ29ubmVjdGlvblN0YXR1c01vY2sge1xyXG4gICAgc2V0T2soKSB7fVxyXG4gICAgc2V0RmFpbCgpIHt9XHJcbn1cclxuXHJcbmNsYXNzIENvbm5lY3Rpb25TdGF0dXMgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHtcclxuICAgICAgICAgICAgXCJjb25uZWN0ZWRcIjogbnVsbCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBpbml0KCkge1xyXG4gICAgICAgIGxldCBlbGVtZW50ID0gd2luZG93LmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29ubmVjdGlvbl9zdGF0dXNcIik7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0RE9NLnJlbmRlcihcclxuICAgICAgICAgICAgICAgIDxDb25uZWN0aW9uU3RhdHVzIC8+LFxyXG4gICAgICAgICAgICAgICAgZWxlbWVudFxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3IENvbm5lY3Rpb25TdGF0dXNNb2NrKCk7XHJcbiAgICB9XHJcbiAgICBzdGFydEludGVydmFsKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcclxuICAgICAgICAgICAgICAgIHRpY2s6ICF0aGlzLnN0YXRlLnRpY2ssXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDc1MCk7XHJcbiAgICB9XHJcbiAgICBzdG9wSW50ZXJ2YWwoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmludGVydmFsKSB7XHJcbiAgICAgICAgICAgIHJldHVyblxyXG4gICAgICAgIH1cclxuICAgICAgICBjbGVhckludGVydmFsKHRoaXMuaW50ZXJ2YWwpO1xyXG4gICAgICAgIHRoaXMuaW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgfVxyXG4gICAgc2V0T2soKSB7XHJcbiAgICAgICAgdGhpcy5zdG9wSW50ZXJ2YWwoKTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgY29ubmVjdGVkOiB0cnVlLCB0aWNrOiBmYWxzZSB9KTtcclxuICAgIH1cclxuICAgIHNldEZhaWwoKSB7XHJcbiAgICAgICAgdGhpcy5zdGFydEludGVydmFsKCk7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGNvbm5lY3RlZDogZmFsc2UgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuY29ubmVjdGVkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT1cImNvbm5lY3Rpb24tc3RhdHVzIG9rXCI+PC9kaXY+XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmNvbm5lY3RlZCA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb25uZWN0aW9uLXN0YXR1cyBhbGVydC13YXJuaW5nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgeyBfKFwiZ2xvYmFsLmxhYmVscy5jb25uZWN0aW5nXCIpIH1cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXsgXCJjb25uZWN0aW9uLXN0YXR1cyBhbGVydC1kYW5nZXJcIiArICh0aGlzLnN0YXRlLnRpY2sgPyBcIiB0aWNrXCIgOiBcIlwiKSB9PlxyXG4gICAgICAgICAgICAgICAgICAgIHsgXyhcImdsb2JhbC5sYWJlbHMuY29ubmVjdGlvbl9wcm9ibGVtXCIpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKVxyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIGNvbm5lY3Rpb25fc3RhdHVzID0gQ29ubmVjdGlvblN0YXR1cy5pbml0KCk7XHJcbiIsImltcG9ydCB7IF8gfSBmcm9tIFwiaTEwbi9sb2FkZXJcIjtcblxuXG5leHBvcnQgZnVuY3Rpb24gc2hvd0Vycm9yKG1zZykge1xuICAgIGxldCB0aXRsZSA9ICh0eXBlb2YgbXNnID09PSBcIm9iamVjdFwiKSA/IG1zZ1swXSA6IF8oXCJnbG9iYWwubWVzc2FnZXMuZXJyb3JfaGVhZGVyXCIpO1xuICAgIGxldCB0ZXh0ID0gKHR5cGVvZiBtc2cgPT09IFwib2JqZWN0XCIpID8gbXNnWzFdIDogbXNnO1xuICAgIHN3YWwoe1xuICAgICAgICB0aXRsZTogdGl0bGUsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIHR5cGU6IFwiZXJyb3JcIixcbiAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNob3dDb25maXJtKG1lc3NhZ2UsIGFjdGlvbiwgY2xvc2Vfb25fY29uZmlybT1mYWxzZSkge1xuICAgIHJldHVybiBzd2FsKHtcbiAgICAgICAgdGl0bGU6IG1lc3NhZ2UsXG4gICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgIHNob3dDYW5jZWxCdXR0b246IHRydWUsXG4gICAgICAgIGNvbmZpcm1CdXR0b25UZXh0OiBfKFwiZ2xvYmFsLmxhYmVscy55ZXNcIiksXG4gICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6IF8oXCJnbG9iYWwubGFiZWxzLm5vXCIpLFxuICAgICAgICBjbG9zZU9uQ29uZmlybTogY2xvc2Vfb25fY29uZmlybSxcbiAgICB9LCBhY3Rpb24pO1xufVxuIiwiZXhwb3J0IGNsYXNzIFByaW50YWJsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBoZWFkZXI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0aXRsZTE6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0aXRsZTI6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICB0aXRsZTM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBib2R5OiBSZWFjdC5Qcm9wVHlwZXMubm9kZS5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGZldGNoUHJpbnRhYmxlRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2JvZHkuaW5uZXJIVE1MO1xuICAgIH1cbiAgICByZW5kZXJIZWFkZXIoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmhlYWRlciA/IDxkaXYgY2xhc3NOYW1lPVwicC1oZWFkZXJcIj57IHRoaXMucHJvcHMuaGVhZGVyIH08L2Rpdj4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJUaXRsZTEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnRpdGxlMSA/IDxoMT57IHRoaXMucHJvcHMudGl0bGUxIH08L2gxPiA6IG51bGw7XG4gICAgfVxuICAgIHJlbmRlclRpdGxlMigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudGl0bGUyID8gPGgyPnsgdGhpcy5wcm9wcy50aXRsZTIgfTwvaDI+IDogbnVsbDtcbiAgICB9XG4gICAgcmVuZGVyVGl0bGUzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy50aXRsZTMgPyA8aDM+eyB0aGlzLnByb3BzLnRpdGxlMyB9PC9oMz4gOiBudWxsO1xuICAgIH1cbiAgICByZW5kZXJCb2R5KCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInAtY29udGVudFwiXG4gICAgICAgICAgICAgICAgcmVmPXsgZSA9PiB0aGlzLl9ib2R5ID0gZSB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLmJvZHkgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJwcmludGFibGVcIj5cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJIZWFkZXIoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyVGl0bGUxKCkgfVxuICAgICAgICAgICAgeyB0aGlzLnJlbmRlclRpdGxlMigpIH1cbiAgICAgICAgICAgIHsgdGhpcy5yZW5kZXJUaXRsZTMoKSB9XG4gICAgICAgICAgICB7IHRoaXMucmVuZGVyQm9keSgpIH1cbiAgICAgICAgPC9kaXY+XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgXyB9IGZyb20gXCJpMTBuL2xvYWRlclwiO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBvblRvdWNoT3JDbGljayhoYW5kbGVyKSB7XG4gICAgbGV0IGYgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIGhhbmRsZXIoZXZlbnQpO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBmLFxuICAgICAgICBvbkNsaWNrOiBmLFxuICAgIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9uVG91Y2hFbmRPckNsaWNrKGhhbmRsZXIsIHByZXZlbnRfZGVmYXVsdCkge1xuICAgIGxldCBfaGFuZGxlciA9ICgpID0+IHt9O1xuICAgIGxldCBkaXN0YW5jZSA9IDA7XG4gICAgbGV0IGxhdGVzdF9wb3MgPSBbMCwgMF07XG4gICAgbGV0IGZpcmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIF9oYW5kbGVyKCk7XG4gICAgfVxuICAgIGxldCBkaXNjYXJkID0gKCkgPT4ge1xuICAgICAgICBfaGFuZGxlciA9ICgpID0+IHt9O1xuICAgIH1cbiAgICBsZXQgbW92ZSA9IChldmVudCkgPT4ge1xuICAgICAgICBsZXQgY3VycmVudF9wb3MgPSBbZXZlbnQudG91Y2hlc1swXS5wYWdlWCwgZXZlbnQudG91Y2hlc1swXS5wYWdlWV07XG4gICAgICAgIGxldCBzcXIgPSAoeCkgPT4geCAqIHg7XG4gICAgICAgIGRpc3RhbmNlICs9IE1hdGguc3FydChzcXIoY3VycmVudF9wb3NbMF0gLSBsYXRlc3RfcG9zWzBdKSArIHNxcihjdXJyZW50X3Bvc1sxXSAtIGxhdGVzdF9wb3NbMV0pKTtcbiAgICAgICAgbGF0ZXN0X3BvcyA9IGN1cnJlbnRfcG9zO1xuICAgICAgICBpZiAoZGlzdGFuY2UgPiAyMCkge1xuICAgICAgICAgICAgZGlzY2FyZCgpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGxldCBzdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBfaGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgIGRpc3RhbmNlID0gMDtcbiAgICAgICAgbGF0ZXN0X3BvcyA9IFtldmVudC50b3VjaGVzWzBdLnBhZ2VYLCBldmVudC50b3VjaGVzWzBdLnBhZ2VZXTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgb25Ub3VjaFN0YXJ0OiBzdGFydCxcbiAgICAgICAgb25Ub3VjaEVuZDogZmlyZSxcbiAgICAgICAgb25Ub3VjaE1vdmU6IG1vdmUsXG4gICAgICAgIG9uVG91Y2hDYW5jZWw6IGRpc2NhcmQsXG4gICAgICAgIG9uQ2xpY2s6IGhhbmRsZXIsXG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU2xpZGVyIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50IHtcbiAgICBzdGF0aWMgZ2V0IHByb3BUeXBlcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRvbmU6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICAgICAgZG9uZVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBzbGlkZVRleHQ6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcsXG4gICAgICAgICAgICBvbkFjdGl2YXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYyxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICBmaW5pc2hlZDogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucGluID0gbnVsbDtcbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVwZGF0ZShuZXh0UHJvcHMpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmRvbmUgJiYgbmV4dFByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkOiBmYWxzZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlzRnJlZSgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLnN0YXRlLnRvdWNoICYmICF0aGlzLnByb3BzLmRvbmUgJiYgIXRoaXMuc3RhdGUuZmluaXNoZWQ7XG4gICAgfVxuICAgIGdldE91dGVyVGV4dE9wYWNpdHkoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICBsZXQgdmFsdWUgPSBNYXRoLm1pbihNYXRoLm1heCgxMDAgLSB0aGlzLnN0YXRlLnBvc2l0aW9uLCAwKSwgMTAwKTtcbiAgICAgICAgcmV0dXJuICh2YWx1ZSAvIDEwMCkudG9GaXhlZCgzKTtcbiAgICB9XG4gICAgZ2V0RWxlbWVudE9mZnNldChlbGVtZW50KSB7XG4gICAgICAgIGxldCByZXMgPSAwO1xuICAgICAgICB3aGlsZSAoZWxlbWVudCkge1xuICAgICAgICAgICAgcmVzICs9IGVsZW1lbnQub2Zmc2V0TGVmdCB8fCAwO1xuICAgICAgICAgICAgZWxlbWVudCA9IGVsZW1lbnQucGFyZW50Tm9kZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBnZXRUb3VjaChldmVudCkge1xuICAgICAgICBsZXQgdG91Y2ggPSBldmVudC50b3VjaGVzWzBdO1xuICAgICAgICBsZXQgcGFyZW50ID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGU7XG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xuICAgIH1cbiAgICBnZXRSZWxhdGl2ZVRvdWNoKGV2ZW50KSB7XG4gICAgICAgIGxldCB0b3VjaCA9IGV2ZW50LnRvdWNoZXNbMF07XG4gICAgICAgIGxldCBwYXJlbnQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIHJldHVybiB0b3VjaC5wYWdlWCAtIHRoaXMuZ2V0RWxlbWVudE9mZnNldChwYXJlbnQpO1xuICAgIH1cbiAgICBnZXRTbGlkZXJQb3MoZXZlbnQpIHtcbiAgICAgICAgbGV0IHBvcyA9IHRoaXMuZ2V0VG91Y2goZXZlbnQpIC0gdGhpcy5waW47XG4gICAgICAgIHJldHVybiBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCAyMDApO1xuICAgIH1cbiAgICBvbkNsaWNrID0gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZpbmlzaGVkIHx8IHRoaXMucHJvcHMuZG9uZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXNpb246IDIwMCxcbiAgICAgICAgICAgIHRvdWNoOiBmYWxzZSxcbiAgICAgICAgICAgIGZpbmlzaGVkOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkFjdGl2YXRlKCk7XG4gICAgfVxuICAgIG9uVG91Y2hTdGFydCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnBpbiA9IHRoaXMuZ2V0UmVsYXRpdmVUb3VjaChldmVudCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgcG9zaXRpb246IHRoaXMuZ2V0U2xpZGVyUG9zKGV2ZW50KSxcbiAgICAgICAgICAgIHRvdWNoOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25Ub3VjaE1vdmUgPSAoZXZlbnQpID0+IHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZmluaXNoZWQgfHwgdGhpcy5wcm9wcy5kb25lKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBwb3NpdGlvbjogdGhpcy5nZXRTbGlkZXJQb3MoZXZlbnQpLFxuICAgICAgICB9KTtcbiAgICB9XG4gICAgb25Ub3VjaEVuZCA9IChldmVudCkgPT4ge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5maW5pc2hlZCB8fCB0aGlzLnByb3BzLmRvbmUpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5wb3NpdGlvbiA9PT0gMjAwKSB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogMCxcbiAgICAgICAgICAgICAgICBmaW5pc2hlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0b3VjaDogZmFsc2UsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25BY3RpdmF0ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgcG9zaXRpb246IDAsXG4gICAgICAgICAgICAgICAgdG91Y2g6IGZhbHNlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9XCJzbGlkZXIgbm9zZWxlY3RcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtcImlubmVyXCIgKyAodGhpcy5pc0ZyZWUoKSA/IFwiIGZyZWVcIiA6IFwiXCIpfVxuICAgICAgICAgICAgICAgIHN0eWxlPXt7IGxlZnQ6ICh0aGlzLnByb3BzLmRvbmUgfHwgdGhpcy5zdGF0ZS5maW5pc2hlZCkgPyBcIjIwMHB4XCIgOiB0aGlzLnN0YXRlLnBvc2l0aW9uICsgXCJweFwiIH19XG4gICAgICAgICAgICAgICAgb25Ub3VjaFN0YXJ0PXsgdGhpcy5vblRvdWNoU3RhcnQgfVxuICAgICAgICAgICAgICAgIG9uVG91Y2hNb3ZlPXsgdGhpcy5vblRvdWNoTW92ZSB9XG4gICAgICAgICAgICAgICAgb25Ub3VjaEVuZD17IHRoaXMub25Ub3VjaEVuZCB9XG4gICAgICAgICAgICAgICAgb25DbGljaz17IHRoaXMub25DbGljayB9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAg4oaSXG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHsgdGhpcy5wcm9wcy5kb25lXG4gICAgICAgICAgICAgICAgPyA8c3BhblxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17eyBjb2xvcjogXCJyZ2IoMTAwLDEwMCwxMDApXCIgfX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJkb25lLXRleHRcIiB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuZG9uZVRleHQgfVxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA6IDxzcGFuXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7IGNvbG9yOiBcInJnYmEoMTAwLDEwMCwxMDAsXCIgKyB0aGlzLmdldE91dGVyVGV4dE9wYWNpdHkoKSArIFwiKVwiIH19XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17IFwic2xpZGUtdGV4dFwiICsgKHRoaXMuaXNGcmVlKCkgPyBcIiBmcmVlXCIgOiBcIlwiKSB9XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRoaXMucHJvcHMuc2xpZGVUZXh0IH1cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICB9XG4gICAgICAgIDwvZGl2PlxuICAgIH1cbn1cblxuXG5leHBvcnQgY2xhc3MgVGFibGV0U2VsZWN0b3JJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzdHlsZTogUmVhY3QuUHJvcFR5cGVzLnN0cmluZyxcbiAgICAgICAgICAgIGNob2ljZXM6IFJlYWN0LlByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHJvd19zaXplOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgYWN0aXZlOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0QnV0dG9uc0NvdW50KCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zdHlsZSA9PT0gXCJncmlkXCIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLnJvd19zaXplO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLmNob2ljZXMubGVuZ3RoO1xuICAgIH1cbiAgICBvbkNsaWNrKG4pIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKG4pO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICAgICAgdGhpcy5wcm9wcy5jaG9pY2VzLmZvckVhY2goKGVsLCBpZHgpID0+IHtcbiAgICAgICAgICAgIGxldCBrZXkgPSBlbFswXTtcbiAgICAgICAgICAgIGxldCB0ZXh0ID0gZWxbMV07XG4gICAgICAgICAgICBsZXQgYWN0aXZlX2NsYXNzX25hbWUgPSAodGhpcy5wcm9wcy5hY3RpdmUgPT09IGtleSkgPyBcIiBhY3RpdmVcIiA6IFwiXCI7XG4gICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGtleT17IGtleSB9XG4gICAgICAgICAgICAgICAgICAgIHsuLi5vblRvdWNoT3JDbGljayh0aGlzLm9uQ2xpY2suYmluZCh0aGlzLCBrZXkpKX1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJ0YnRuIHNjb3JlLWJ0blwiICsgYWN0aXZlX2NsYXNzX25hbWUgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge3RleHR9XG4gICAgICAgICAgICAgICAgPC9idXR0b24+KTtcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnN0eWxlID09PSBcImdyaWRcIiAmJiAoaWR4ICsgMSkgJSB0aGlzLnByb3BzLnJvd19zaXplID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goPGJyIGtleT17IFwiYnJcIiArIGlkeCB9IC8+KVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGV0IGxheW91dF9jbGFzcyA9ICh0aGlzLnByb3BzLnN0eWxlICE9PSBcInR3by1saW5lc1wiKSA/IFwic2VsZWN0b3ItbGF5b3V0XCIgOiBcInNlbGVjdG9yLWxheW91dC0ycm93c1wiO1xuICAgICAgICBsZXQgc2VsZWN0ZWRfY2xhc3MgPSB0aGlzLnByb3BzLmFjdGl2ZSA9PT0gbnVsbCA/IFwiXCIgOiBcIiBzZWxlY3RlZFwiXG4gICAgICAgIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17XCJzY29yaW5nLWxheW91dCBcIiArIGxheW91dF9jbGFzcyArIHNlbGVjdGVkX2NsYXNzICsgXCIgbi1cIiArIHRoaXMuZ2V0QnV0dG9uc0NvdW50KCkudG9TdHJpbmcoKSB9PnsgcmVzdWx0IH08L2Rpdj5cbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRJbnRlZ2VyU2VsZWN0SW5wdXQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgbWluOiBSZWFjdC5Qcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgICAgICAgICBtYXg6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgY3JlYXRlQXJyYXkobWluLCBtYXgpIHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IgKGxldCBpZHggPSBtaW47IGlkeCA8PSBtYXg7ICsraWR4KSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChbaWR4LCBpZHgudG9TdHJpbmcoKV0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxUYWJsZXRTZWxlY3RvcklucHV0XG4gICAgICAgICAgICAgICAgY2hvaWNlcz17IHRoaXMuY3JlYXRlQXJyYXkodGhpcy5wcm9wcy5taW4sIHRoaXMucHJvcHMubWF4KSB9XG4gICAgICAgICAgICAgICAgeyAuLi50aGlzLnByb3BzIH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRQb2ludDVTZWxlY3RJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtaW46IFJlYWN0LlByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIG1heDogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBjcmVhdGVBcnJheShtaW4sIG1heCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gW107XG4gICAgICAgIGZvciAobGV0IGlkeCA9IE1hdGgucm91bmQoMiAqIG1pbik7IGlkeCA8PSBNYXRoLnJvdW5kKDIgKiBtYXgpOyArK2lkeCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goW2lkeCAvIDIsIChpZHggJSAyKSA/IChpZHggLyAyKS50b0ZpeGVkKDEpIDogTWF0aC5mbG9vcihpZHggLyAyKS50b1N0cmluZygpXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPFRhYmxldFNlbGVjdG9ySW5wdXRcbiAgICAgICAgICAgICAgICBjaG9pY2VzPXsgdGhpcy5jcmVhdGVBcnJheSh0aGlzLnByb3BzLm1pbiwgdGhpcy5wcm9wcy5tYXgpIH1cbiAgICAgICAgICAgICAgICB7IC4uLnRoaXMucHJvcHMgfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKVxuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFRhYmxldEludGVnZXJJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTWludXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAtMX0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5vblZhbHVlVXBkYXRlKHRoaXMucHJvcHMudmFsdWUgLSAxKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBvblBsdXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAxfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSArIDEpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGFibGV0LWludGVnZXItaW5wdXRcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLW1pbnVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25NaW51cy5iaW5kKHRoaXMpKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICZtaW51cztcbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZhbHVlXCI+XG4gICAgICAgICAgICAgICAgICAgIHsgdGhpcy5wcm9wcy52YWx1ZSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJ0YnRuIGJ0bi1wbHVzXCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMub25QbHVzLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgK1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBUYWJsZXRQb2ludDVJbnB1dCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gICAgc3RhdGljIGdldCBwcm9wVHlwZXMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogUmVhY3QuUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgb25WYWx1ZVVwZGF0ZTogUmVhY3QuUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IFJlYWN0LlByb3BUeXBlcy5ib29sLFxuICAgICAgICB9O1xuICAgIH1cbiAgICBzdGF0aWMgZ2V0IGRlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHNlbmREZWx0YXM6IGZhbHNlLFxuICAgICAgICB9XG4gICAgfVxuICAgIG9uTWludXMoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlbmREZWx0YXMpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMub25WYWx1ZVVwZGF0ZSh7XCJkZWx0YVwiOiAtMC41fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSAtIDAuNSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgb25QbHVzKCkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5zZW5kRGVsdGFzKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUoe1wiZGVsdGFcIjogMC41fSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uVmFsdWVVcGRhdGUodGhpcy5wcm9wcy52YWx1ZSArIDAuNSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmVuZGVyKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0YWJsZXQtaW50ZWdlci1pbnB1dFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tbWludXNcIlxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vbk1pbnVzLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgJm1pbnVzO1xuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidmFsdWVcIj5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnByb3BzLnZhbHVlIH1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInRidG4gYnRuLXBsdXNcIlxuICAgICAgICAgICAgICAgICAgICB7Li4ub25Ub3VjaE9yQ2xpY2sodGhpcy5vblBsdXMuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICArXG4gICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cblxudmFyIHN0b3B3YXRjaGVzID0ge307XG5cbmV4cG9ydCBjbGFzcyBTdG9wV2F0Y2ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQge1xuICAgIHN0YXRpYyBnZXQgcHJvcFR5cGVzKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgc2NvcmVfaWQ6IFJlYWN0LlByb3BUeXBlcy5udW1iZXIsXG4gICAgICAgICAgICBvblZhbHVlVXBkYXRlOiBSZWFjdC5Qcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgICAgICAgICAgc2VuZERlbHRhczogUmVhY3QuUHJvcFR5cGVzLmJvb2wsXG4gICAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVfaWRdIHx8IHtcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZTogMCxcbiAgICAgICAgICAgIHN0cl92YWx1ZTogXCIwOjAwXCIsXG4gICAgICAgICAgICBpbnRlcnZhbDogbnVsbCxcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuYWN0aXZlKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLmludGVydmFsID0gc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIDEwKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgcmVhY3Qvbm8tZGlyZWN0LW11dGF0aW9uLXN0YXRlXG4gICAgICAgIH1cbiAgICB9XG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHN0b3B3YXRjaGVzW3RoaXMucHJvcHMuc2NvcmVfaWRdID0gdGhpcy5zdGF0ZTtcbiAgICB9XG4gICAgbm93KCkge1xuICAgICAgICByZXR1cm4gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcbiAgICB9XG4gICAgdG9nZ2xlKCkge1xuICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZSA/IHRoaXMuc3RvcCgpIDogdGhpcy5zdGFydCgpO1xuICAgIH1cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IHRydWUsXG4gICAgICAgICAgICBzdGFydF9hdDogdGhpcy5ub3coKSAtIHRoaXMuc3RhdGUudmFsdWUsXG4gICAgICAgICAgICBpbnRlcnZhbDogc2V0SW50ZXJ2YWwodGhpcy50aWNrLmJpbmQodGhpcyksIDEwKSxcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHN0b3AoKSB7XG4gICAgICAgIGNsZWFySW50ZXJ2YWwodGhpcy5zdGF0ZS5pbnRlcnZhbCk7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgYWN0aXZlOiBmYWxzZSxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnZhbHVlKCksXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXNldCgpIHtcbiAgICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLnN0YXRlLmludGVydmFsKTtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgdmFsdWU6IDAsXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUuYWN0aXZlXG4gICAgICAgICAgICA/ICh0aGlzLm5vdygpIC0gdGhpcy5zdGF0ZS5zdGFydF9hdClcbiAgICAgICAgICAgIDogdGhpcy5zdGF0ZS52YWx1ZTtcbiAgICB9XG4gICAgdGljaygpIHtcbiAgICAgICAgdmFyIG5ld192YWx1ZSA9IHRoaXMudmFsdWUoKTtcbiAgICAgICAgaWYgKG5ld192YWx1ZSAhPT0gdGhpcy5zdGF0ZS52YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoaXMudmFsdWUoKSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuICAgIHBhZChudW0sIHNpemUpIHtcbiAgICAgICAgdmFyIHMgPSBcIjAwMDBcIiArIG51bS50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gcy5zdWJzdHIocy5sZW5ndGggLSBzaXplKTtcbiAgICB9XG4gICAgZ2V0U3RyVmFsdWUoKSB7XG4gICAgICAgIHZhciB2YWwgPSB0aGlzLnZhbHVlKCk7XG4gICAgICAgIHZhciBtID0gMCwgcyA9IDA7XG4gICAgICAgIHZhciByZXN1bHQgPSAnJztcbiAgICAgICAgbSA9IE1hdGguZmxvb3IodmFsIC8gKDYwICogMTAwMCkpO1xuICAgICAgICB2YWwgJT0gNjAgKiAxMDAwO1xuICAgICAgICBzID0gTWF0aC5mbG9vcih2YWwgLyAxMDAwKTtcbiAgICAgICAgcmV0dXJuIG0udG9TdHJpbmcoKSArICc6JyArIHRoaXMucGFkKHMsIDIpO1xuICAgIH1cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInN0b3B3YXRjaFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwidGJ0biBidG4tcmVzZXQgaWdub3JlLXJlYWRvbmx5XCJcbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMucmVzZXQuYmluZCh0aGlzKSl9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7IF8oXCJ0YWJsZXQuYnV0dG9ucy5yZXNldF9zdG9wd2F0Y2hcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsgXCJ0YnRuIGJ0bi10b2dnbGUgaWdub3JlLXJlYWRvbmx5XCIgKyAodGhpcy5zdGF0ZS5hY3RpdmUgPyBcIiBhY3RpdmVcIiA6IFwiXCIpIH1cbiAgICAgICAgICAgICAgICAgICAgey4uLm9uVG91Y2hPckNsaWNrKHRoaXMudG9nZ2xlLmJpbmQodGhpcykpfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgeyB0aGlzLnN0YXRlLmFjdGl2ZSA/IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdG9wX3N0b3B3YXRjaFwiKSA6IF8oXCJ0YWJsZXQuYnV0dG9ucy5zdGFydF9zdG9wd2F0Y2hcIikgfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGltZVwiPlxuICAgICAgICAgICAgICAgICAgICB7IHRoaXMuZ2V0U3RyVmFsdWUoKSB9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn1cbiJdfQ==
