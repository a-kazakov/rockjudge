import _ from "l10n";

import makeTourResultsTable from "common/makeTourResultsTable";
import CustomTable from "common/CustomTable";
import getJudgeTableMark from "getJudgeTableMark";
import getParticipantDisplay from "common/getParticipantDisplay";

export default class ResultsTable2 extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
                next_tour_id: PT.number,
                results: PT.arrayOf(
                    PT.shape({
                        place: PT.number,
                        advances: PT.bool.isRequired,
                        run_id: PT.number.isRequired,
                        additional_data: PT.object.isRequired,
                    }).isRequired,
                ).isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                    }).isRequired,
                ).isRequired,
                discipline: PT.shape({
                    discipline_judges: PT.arrayOf(
                        PT.shape({
                            role: PT.string.isRequired,
                        }).isRequired
                    ).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    static get verbose() {
        return false;
    }

    static getPaperOrientation(tour) {
        if (!tour.scoring_system_name.includes("final")) {
            return "portrait";
        }
        return this.verbose ? "landscape" : "portrait";
    }

    static transformDocx(docx, tour) {
        docx.setOrientation(this.getPaperOrientation(tour));
    }

    static getRowStatus(row) {
        if (!row) {
            return "none";
        }
        if (row.run.status !== "OK") {
            return row.run.status;
        }
        return row.advances ? "advanced" : "not_advanced";
    }

    static getScoreText(row, score) {
        if (row.run.status !== "OK" || !score) {
            return "—";
        }
        return score.data.total_score;
    }

    get font_size() {
        const n_runs = this.props.tour.runs.length;
        if (this.constructor.verbose) {
            return n_runs >= 10 ? 8 : 9;
        } else {
            return 11;
        }
    }
    setupCache() {
        this.is_final = this.props.tour.scoring_system_name.includes("final");
        this.show_total_score = !this.is_final;
        this.has_next_tour = this.props.tour.next_tour_id !== null;
        this.table = makeTourResultsTable(this.props.tour);
        this.line_judges = this.props.tour.discipline.discipline_judges.filter(dj => dj.role === "dance_judge");
        this.paper_orientation = this.constructor.getPaperOrientation(this.props.tour);
        this.show_judge_scores = this.props.tour.scoring_system_name !== "skating.final_summary";
        this.show_tours_places = this.props.tour.scoring_system_name === "skating.final_summary";
        this.show_skating_table = this.constructor.verbose;
        this.show_ec_table = (
            this.props.tour.scoring_system_name === "skating.final_summary" &&
            this.constructor.verbose
        );
    }

    getColWidth(base_width) {
        let pre_res = base_width;
        if (this.paper_orientation === "landscape") {
            pre_res *= 210 / 297;
        }
        if (!this.constructor.verbose) {
            pre_res *= this.font_size / 9;
        }
        return pre_res;
    }

    getCols() {
        let result = [{
            "key": "place",
            "title":  _("results.labels.place"),
            "textAlign": "center",
            "lines": ["right"],
            "width": this.getColWidth(6),
        }, {
            "key": "number",
            "title":  _("results.labels.number"),
            "textAlign": "center",
            "fontWeight": "bold",
            "width": this.getColWidth(4),
        }, {
            "key": "participant_name",
            "title":  _("results.labels.participant_name"),
            "width": this.getColWidth(20),
        }];
        if (this.show_total_score) {
            result.push({
                "key": "total_score",
                "title": _("results.labels.total_score"),
                "textAlign": "center",
                "width": this.getColWidth(6),
            });
        }
        if (this.show_judge_scores) {
            let is_first = true;
            for (const dj of this.line_judges) {
                result.push({
                    "key": `judge_score_${dj.id}`,
                    "title": getJudgeTableMark(dj),
                    "textAlign": "center",
                    "lines": is_first ? ["left"] : [],
                });
                is_first = false;
            }
        }
        if (this.show_tours_places && this.table.length > 0) {
            const prev_tours_count = this.table[0].additional_data.tours_places.length;
            for (let idx = 0; idx < prev_tours_count; ++idx) {
                result.push({
                    "key": `tour_place_${idx}`,
                    "title": `D${idx + 1}`,
                    "textAlign": "center",
                    "lines": idx === 0 ? ["left"] : [],
                });
            }
            result.push({
                "key": `tours_places_sum`,
                "title": _("results.labels.tours_places_sum"),
                "textAlign": "center",
                "lines": ["left"],
            });
        }
        if (this.show_ec_table) {
            for (let place = 1; place <= this.props.tour.runs.length; ++place) {
                result.push({
                    "key": `ec_table_${place}`,
                    "title": `(1-${place})`,
                    "textAlign": "center",
                    "lines": place === 1 ? ["left"] : [],
                });
            }
        }
        if (this.show_skating_table) {
            for (let place = 1; place <= this.props.tour.runs.length; ++place) {
                result.push({
                    "key": `skating_table_${place}`,
                    "title": `1-${place}`,
                    "textAlign": "center",
                    "lines": place === 1 ? ["left"] : [],
                });
            }
        }
        return result;
    }

    getAdvancesRow(prev_row, next_row) {
        const prev_status = this.constructor.getRowStatus(prev_row);
        const next_status = this.constructor.getRowStatus(next_row);
        if (prev_status === next_status) {
            return null;
        }
        if (!["NP", "DQ"].includes(next_status) && !this.has_next_tour) {
            return null;
        }
        return _(`results.headers.participants_${next_status}`);
    }

    getRows() {
        let result = [];
        for (let idx = 0; idx < this.table.length; ++idx) {
            const adv_text = this.getAdvancesRow(this.table[idx - 1], this.table[idx]);
            if (adv_text !== null) {
                result.push({
                    _type: "section_header",
                    "title": adv_text,
                })
            }
            const row = this.table[idx];
            let row_data = {
                "run_id": row.run.id,
                "place": row.place,
                "number": row.run.participant.number,
                "participant_name": {
                    "raw": true,
                    "text": getParticipantDisplay(row.run.participant),
                },
                "total_score": row.run.total_score,
            };
            const scores_map = new Map(row.run.scores.map(score => [score.discipline_judge_id, score]));
            for (const dj of this.line_judges) {
                row_data[`judge_score_${dj.id}`] = this.constructor.getScoreText(row, scores_map.get(dj.id))
            }
            if (row.additional_data.skating_row) {
                for (let sk_idx = 0; sk_idx < this.props.tour.runs.length; ++sk_idx) {
                    const [pr, sec] = row.additional_data.skating_row[sk_idx];
                    row_data[`skating_table_${sk_idx + 1}`] =
                        pr < row.additional_data.skating_quorum
                            ? {"text": `${pr}`, "color": "#aaa"}
                            : `${pr} (${sec})`;
                }
            }
            if (row.additional_data.ec_skating_row) {
                for (let sk_idx = 0; sk_idx < this.props.tour.runs.length; ++sk_idx) {
                    const [pr, sec] = row.additional_data.ec_skating_row[sk_idx];
                    row_data[`ec_table_${sk_idx + 1}`] = sk_idx  === idx
                        ? `${pr} (${sec})`
                        : {"text": `${pr} (${sec})`, "color": "#aaa"};
                }
            }
            if (row.additional_data.tours_places) {
                for (let tp_idx = 0; tp_idx < row.additional_data.tours_places.length; ++tp_idx) {
                    row_data[`tour_place_${tp_idx}`] = row.additional_data.tours_places[tp_idx];
                }
                row_data[`tours_places_sum`] = row.additional_data.tours_places_sum;
            }
            result.push(row_data);
        }
        return result;
    }

    render() {
        this.setupCache();
        return (
            <div className="ResultsTable1">
                <CustomTable
                    cols={ this.getCols() }
                    fontSize={ `${this.font_size}pt` }
                    rowKey="run_id"
                    rows={ this.getRows() }
                />
            </div>
        );
    }
}
