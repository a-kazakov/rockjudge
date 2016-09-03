import _ from "l10n";

import Row from "./Row";
import ColumnsWidths from "./ColumnsWidths";

import TourScoresWrapper from "common/TourScoresWrapper";
import getScoringType from "common/getScoringType";

export default class ResultsTable2 extends React.Component {
    renderAdvancesHeader(has_next_tour, prev_row, next_row, prev_run, next_run, idx, n_cols) {
        let prev_status = prev_row
            ? prev_run.performed
                ? prev_row.advances
                    ? "advanced"
                    : "not_advanced"
                : "not_performed"
            : null;
        let next_status = next_run.performed
            ? next_row.advances
                ? "advanced"
                : "not_advanced"
            : "not_performed";
        let result = prev_status !== next_status
            ? next_status === "not_performed"
                ? <p className="text-left">{ _("results.headers.participants_not_performed") }</p>
                : has_next_tour
                    ? next_status === "not_advanced"
                        ? <p className="text-left">{ _("results.headers.participants_not_advanced") }</p>
                        : <p className="text-left">{ _("results.headers.participants_advanced") }</p>
                    : null
            : null;
        if (result === null) {
            return null;
        }
        return (
            <tr key={ "NT" + idx }>
                <th className="advances-header" colSpan={ n_cols }>
                    { result }
                </th>
            </tr>
        );
    }
    render() {
        const tour_wrapper = new TourScoresWrapper(this.props.tour, this.props.results);
        const discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
        const scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
        const head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map((row) => row[0]);
        const results_info = tour_wrapper.getResultsInfo();
        const runs = tour_wrapper.getRuns();
        const has_next_tour = this.props.tour.next_tour_id !== null;
        const has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro";
        const widths = new ColumnsWidths(discipline_judges.length + 1);
        const judges_header = discipline_judges.map((dj) => {
            const suffix = getScoringType(dj, this.props.tour.scoring_system_name) === "acro" ? " (A)" : "";
            return (
                <th key={ dj.id } style={ widths.genJudgeStyle() }>
                    <p>
                        { dj.judge.number + suffix }
                    </p>
                </th>
            );
        });
        let rows = [];
        for (let idx = 0; idx < runs.length; ++idx) {
            rows.push(this.renderAdvancesHeader(
                has_next_tour,
                results_info[idx - 1],
                results_info[idx],
                runs[idx - 1],
                runs[idx],
                idx,
                4 + discipline_judges.length + has_total_score
            ));
            rows.push(
                <Row
                    key={ runs[idx].id }
                    head_judge_score={ head_judge_scores[idx] }
                    results_info={ results_info[idx] }
                    tour={ this.props.tour }
                    run={ runs[idx] }
                    scores={ scores_table[idx] }
                    discipline_judges={ discipline_judges }
                    has_next_tour={ has_next_tour }
                    has_total_score={ has_total_score }
                />
            );
        };
        return <table className="bordered-table">
            <thead>
                <tr>
                    <th className="place" style={ widths.genPlaceStyle() }><p>{ _("results.labels.place") }</p></th>
                    <th className="number" style={ widths.genNumberStyle() }><p>{ _("results.labels.number") }</p></th>
                    <th className="participant" style={ widths.genNameStyle() }><p>{ _("results.labels.participant_name") }</p></th>
                    { has_total_score ? <th className="total-score" style={ widths.genTotalScoreStyle() }><p>{ _("results.labels.total_score") }</p></th> : null }
                    { judges_header }
                    <th className="card" style={ widths.genJudgeStyle() }><p className="text-center">{ _("results.labels.card") }</p></th>
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}
