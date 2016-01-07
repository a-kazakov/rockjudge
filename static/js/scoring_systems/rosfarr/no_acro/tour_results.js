"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function __() {
    var args = [];
    for (var idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _.apply(undefined, ["scoring_systems.rosfarr." + arguments[0]].concat(args));
}

var TourResultsVerboseTableColumnWidths = (function () {
    function TourResultsVerboseTableColumnWidths(n_judges) {
        _classCallCheck(this, TourResultsVerboseTableColumnWidths);

        this.judge_width = Math.round(70 / n_judges);
        this.place_width = 7;
        this.info_width = 100 - this.judge_width * n_judges - this.place_width;
    }

    _createClass(TourResultsVerboseTableColumnWidths, [{
        key: "genPlaceStyle",
        value: function genPlaceStyle() {
            return {
                width: this.place_width + "%"
            };
        }
    }, {
        key: "genInfoStyle",
        value: function genInfoStyle() {
            return {
                width: this.info_width + "%"
            };
        }
    }, {
        key: "genJudgeStyle",
        value: function genJudgeStyle() {
            return {
                width: this.judge_width + "%"
            };
        }
    }]);

    return TourResultsVerboseTableColumnWidths;
})();

var TourResultsVerboseTableRow = (function (_React$Component) {
    _inherits(TourResultsVerboseTableRow, _React$Component);

    function TourResultsVerboseTableRow() {
        _classCallCheck(this, TourResultsVerboseTableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourResultsVerboseTableRow).apply(this, arguments));
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
            var acro_scores = score.data.raw_data.reductions.map((function (score, idx) {
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
            switch (getScoringType(judge, this.props.tour.scoring_system_name)) {
                case "dance":
                    return this.renderDanceScore(score, additiolal_data);
                case "acro":
                    return this.renderAcroScore(score, additiolal_data);
                case "formation":
                    return this.renderFormationScore(score, additiolal_data);
                default:
                    return React.createElement(
                        "p",
                        { className: "text-center" },
                        score.data.total_score.toFixed(2)
                    );
            }
        }
    }, {
        key: "renderParticipantInfo",
        value: function renderParticipantInfo() {
            return React.createElement(
                "div",
                null,
                React.createElement(
                    "p",
                    null,
                    React.createElement(
                        "strong",
                        null,
                        _("global.phrases.participant_n", this.props.run.participant.number, null, this.props.run.participant.sportsmen.length)
                    )
                ),
                getParticipantDisplay(this.props.run.participant)
            );
        }
    }, {
        key: "renderHeadJudgePenalty",
        value: function renderHeadJudgePenalty() {
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
        }
    }, {
        key: "renderAcroTable",
        value: function renderAcroTable() {
            if (!this.props.run.performed) {
                return null;
            }
            var has_acro_overrides = false;
            var render_acro_table = this.props.tour.scoring_system_name == "rosfarr.acro" || this.props.tour.scoring_system_name == "rosfarr.am_final_acro";
            if (!render_acro_table) {
                return null;
            }
            this.props.run.acrobatics.forEach(function (acro) {
                if (acro.score !== acro.original_score) {
                    has_acro_overrides = true;
                }
            });
            if (this.props.run.acrobatics.length == 0) {
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
        }
    }, {
        key: "renderAmClassFwScore",
        value: function renderAmClassFwScore() {
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
        }
    }, {
        key: "renderAmClassAcroScore",
        value: function renderAmClassAcroScore() {
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
        }
    }, {
        key: "renderTotalScore",
        value: function renderTotalScore() {
            if (!this.props.run.performed) {
                return null;
            }
            if (this.props.tour.scoring_system_name === "rosfarr.formation") {
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
        }
    }, {
        key: "renderNotPerformedLabel",
        value: function renderNotPerformedLabel() {
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
        }
    }, {
        key: "renderNextTourLabel",
        value: function renderNextTourLabel() {
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
                this.props.results_info.advances ? _("global.labels.yes") : _("global.labels.no")
            );
        }
    }, {
        key: "renderInfoBlock",
        value: function renderInfoBlock() {
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
        }
    }, {
        key: "render",
        value: function render() {
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
        }
    }]);

    return TourResultsVerboseTableRow;
})(React.Component);

var TourResultsVerboseTable = (function (_React$Component2) {
    _inherits(TourResultsVerboseTable, _React$Component2);

    function TourResultsVerboseTable() {
        _classCallCheck(this, TourResultsVerboseTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourResultsVerboseTable).apply(this, arguments));
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
        }
    }]);

    return TourResultsVerboseTable;
})(React.Component);

var TourResultsSemiVerboseTableColumnWidths = (function () {
    function TourResultsSemiVerboseTableColumnWidths(n_judges) {
        _classCallCheck(this, TourResultsSemiVerboseTableColumnWidths);

        this.judge_width = Math.round(55 / n_judges);
        this.total_score_width = 14;
        this.place_width = 6;
        this.number_width = 3;
        this.name_width = 100 - this.judge_width * n_judges - this.total_score_width - this.place_width - this.number_width;
    }

    _createClass(TourResultsSemiVerboseTableColumnWidths, [{
        key: "genPlaceStyle",
        value: function genPlaceStyle() {
            return {
                width: this.place_width + "%"
            };
        }
    }, {
        key: "genNumberStyle",
        value: function genNumberStyle() {
            return {
                width: this.number_width + "%"
            };
        }
    }, {
        key: "genNameStyle",
        value: function genNameStyle() {
            return {
                width: this.name_width + "%"
            };
        }
    }, {
        key: "genTotalScoreStyle",
        value: function genTotalScoreStyle() {
            return {
                width: this.total_score_width + "%"
            };
        }
    }, {
        key: "genJudgeStyle",
        value: function genJudgeStyle() {
            return {
                width: this.judge_width + "%"
            };
        }
    }]);

    return TourResultsSemiVerboseTableColumnWidths;
})();

var TourResultsSemiVerboseTableRow = (function (_React$Component3) {
    _inherits(TourResultsSemiVerboseTableRow, _React$Component3);

    function TourResultsSemiVerboseTableRow() {
        _classCallCheck(this, TourResultsSemiVerboseTableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourResultsSemiVerboseTableRow).apply(this, arguments));
    }

    _createClass(TourResultsSemiVerboseTableRow, [{
        key: "renderFormationScore",
        value: function renderFormationScore(score, additiolal_data) {
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
        }
    }, {
        key: "renderScore",
        value: function renderScore(judge, score, additiolal_data) {
            if (judge.role == "dance_judge") {
                if (this.props.tour.scoring_system_name == "rosfarr.formation") {
                    return this.renderFormationScore(score, additiolal_data);
                }
            }
            return React.createElement(
                "p",
                { className: "text-center" },
                score.data.total_score.toFixed(2)
            );
        }
    }, {
        key: "render",
        value: function render() {
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
                    getParticipantDisplay(this.props.run.participant)
                ),
                this.props.tour.scoring_system_name !== "rosfarr.formation" ? React.createElement(
                    "td",
                    { className: "total-score" },
                    (function () {
                        if (!_this5.props.run.performed) {
                            return React.createElement(
                                "p",
                                { className: "text-center" },
                                "—"
                            );
                        }
                        if (_this5.props.tour.scoring_system_name == "rosfarr.am_final_acro") {
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
                    })()
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
        }
    }]);

    return TourResultsSemiVerboseTableRow;
})(React.Component);

var TourSemiVerboseResultsTable = (function (_React$Component4) {
    _inherits(TourSemiVerboseResultsTable, _React$Component4);

    function TourSemiVerboseResultsTable() {
        _classCallCheck(this, TourSemiVerboseResultsTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourSemiVerboseResultsTable).apply(this, arguments));
    }

    _createClass(TourSemiVerboseResultsTable, [{
        key: "renderAdvancesHeader",
        value: function renderAdvancesHeader(has_next_tour, prev_row, next_row, prev_run, next_run, idx, n_cols) {
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
        }
    }, {
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
            var has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation";
            var widths = new TourResultsSemiVerboseTableColumnWidths(discipline_judges.length + 1);
            var judges_header = discipline_judges.map((function (dj) {
                var suffix = getScoringType(dj, this.props.tour.scoring_system_name) == "acro" ? " (A)" : "";
                return React.createElement(
                    "th",
                    { key: dj.id, style: widths.genJudgeStyle() },
                    React.createElement(
                        "p",
                        null,
                        dj.judge.number + suffix
                    )
                );
            }).bind(this));
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
        }
    }]);

    return TourSemiVerboseResultsTable;
})(React.Component);

var TourResultsTableRow = (function (_React$Component5) {
    _inherits(TourResultsTableRow, _React$Component5);

    function TourResultsTableRow() {
        _classCallCheck(this, TourResultsTableRow);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourResultsTableRow).apply(this, arguments));
    }

    _createClass(TourResultsTableRow, [{
        key: "render",
        value: function render() {
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
                    getParticipantDisplay(this.props.run.participant)
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
        }
    }]);

    return TourResultsTableRow;
})(React.Component);

var TourResultsTable = (function (_React$Component6) {
    _inherits(TourResultsTable, _React$Component6);

    function TourResultsTable() {
        _classCallCheck(this, TourResultsTable);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(TourResultsTable).apply(this, arguments));
    }

    _createClass(TourResultsTable, [{
        key: "renderAdvancesHeader",
        value: function renderAdvancesHeader(has_next_tour, prev_row, next_row, prev_run, next_run, idx, n_cols) {
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
                "table",
                { className: "bordered-table brief-table" },
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
            );
        }
    }]);

    return TourResultsTable;
})(React.Component);
//# sourceMappingURL=tour_results.js.map