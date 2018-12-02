import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import CustomTable from "common/CustomTable";
import getJudgeTableMark from "getJudgeTableMark";
import getParticipantDisplay from "common/getParticipantDisplay";
import lastOf from "common/tools/lastOf";

export default class ResultsTable2 extends React.Component {
    static propTypes = {
        computedTour: PT.shape({
            tour: PT.object.isRequired,
            tour_result: PT.object.isRequired,
            rows: PT.arrayOf(
                PT.shape({
                    run: PT.object.isRequired,
                    run_result: PT.object.isRequired,
                    scores: PT.object.isRequired,
                }).isRequired,
            ).isRequired,
        }).isRequired,
    };

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
        return row.run_result.advanced ? "advanced" : "not_advanced";
    }

    get font_size() {
        const n_runs = this.props.computedTour.tour.runs.length;
        if (this.constructor.verbose) {
            return n_runs >= 10 ? 8 : 9;
        } else {
            return 11;
        }
    }
    setupCache() {
        const {tour} = this.props.computedTour;
        const all_tours = tour.discipline.tours;
        this.is_final = tour.scoring_system_name.includes("final");
        this.show_total_score = !this.is_final;
        this.has_next_tour = lastOf(all_tours).id !== tour.id;
        this.table = this.props.computedTour.rows;
        this.line_judges = tour.discipline.discipline_judges.filter(dj => dj.role === "dance_judge");
        this.paper_orientation = this.constructor.getPaperOrientation(tour);
        this.show_judge_scores = tour.scoring_system_name !== "skating.final_summary";
        this.show_tours_places = tour.scoring_system_name === "skating.final_summary";
        this.show_skating_table = this.constructor.verbose && tour.scoring_system_name.includes("final");
        this.show_ec_table = (
            tour.scoring_system_name === "skating.final_summary" &&
            this.constructor.verbose
        );
    }

    getScoreText(row, score) {
        if (row.run.status !== "OK" || !score) {
            return "—";
        }
        const score_result = this.props.computedTour.tour_result.scores_results[score.id];
        return score_result?.total_score_str ?? "";
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
        const {tour} = this.props.computedTour;
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
            const prev_tours_count = this.table[0].run_result.extra_data.tours_places.length;
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
            for (let place = 1; place <= tour.runs.length; ++place) {
                result.push({
                    "key": `ec_table_${place}`,
                    "title": `(1-${place})`,
                    "textAlign": "center",
                    "lines": place === 1 ? ["left"] : [],
                });
            }
        }
        if (this.show_skating_table) {
            for (let place = 1; place <= tour.runs.length; ++place) {
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
        const {tour, tour_result} = this.props.computedTour;
        let result = [];
        const {skating_quorum} = tour_result.extra_data;
        for (let idx = 0; idx < this.table.length; ++idx) {
            const adv_text = this.getAdvancesRow(this.table[idx - 1], this.table[idx]);
            if (adv_text != null) {
                result.push({
                    _type: "section_header",
                    "title": adv_text,
                })
            }
            const row = this.table[idx];
            let row_data = {
                "run_id": row.run.id,
                "place": row.run_result.place,
                "number": row.run.participant.number,
                "participant_name": {
                    "raw": true,
                    "text": getParticipantDisplay(row.run.participant),
                },
                "total_score": row.run_result.total_score_str,
            };
            const scores_map = new Map(row.run.scores.map(score => [score.discipline_judge_id, score]));
            for (const dj of this.line_judges) {
                row_data[`judge_score_${dj.id}`] = this.getScoreText(row, scores_map.get(dj.id))
            }
            const row_extra = row.run_result.extra_data;
            if (row_extra.skating_row != null) {
                for (let sk_idx = 0; sk_idx < tour.runs.length; ++sk_idx) {
                    const [pr, sec] = row_extra.skating_row[sk_idx];
                    row_data[`skating_table_${sk_idx + 1}`] =
                        pr < skating_quorum
                            ? {"text": `${pr}`, "color": "#aaa"}
                            : `${pr} (${sec})`;
                }
            }
            if (row_extra.ec_skating_row != null) {
                for (let sk_idx = 0; sk_idx < tour.runs.length; ++sk_idx) {
                    const [pr, sec] = row_extra.ec_skating_row[sk_idx];
                    row_data[`ec_table_${sk_idx + 1}`] = sk_idx  === idx
                        ? `${pr} (${sec})`
                        : {"text": `${pr} (${sec})`, "color": "#aaa"};
                }
            }
            if (row_extra.tours_places != null) {
                for (let tp_idx = 0; tp_idx < row_extra.tours_places.length; ++tp_idx) {
                    row_data[`tour_place_${tp_idx}`] = row_extra.tours_places[tp_idx];
                }
                row_data[`tours_places_sum`] = row_extra.tours_places_sum;
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