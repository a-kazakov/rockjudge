import _ from "l10n";

import TourScoresWrapper from "common/TourScoresWrapper";
import Row from "./Row"

export default class ResultsTable1 extends React.Component {
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
        return <tr key={ "NT" + idx }><th className="advances-header" colSpan={ n_cols }>
            { result }
        </th></tr>
    }
    render() {
        let tour_wrapper = new TourScoresWrapper(this.props.tour, this.props.results);
        let head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map((row) => row[0]);
        let results_info = tour_wrapper.getResultsInfo();
        let runs = tour_wrapper.getRuns();
        let has_next_tour = this.props.tour.next_tour_id !== null;
        let has_total_score = this.props.tour.scoring_system_name !== "rosfarr.formation" && this.props.tour.scoring_system_name !== "rosfarr.formation_acro";
        let rows = [];
        for (let idx = 0; idx < runs.length; ++idx) {
            rows.push(this.renderAdvancesHeader(
                has_next_tour,
                results_info[idx - 1],
                results_info[idx],
                runs[idx - 1],
                runs[idx],
                idx,
                5 + has_total_score
            ));
            rows.push(
                <Row
                    key={ runs[idx].id }
                    head_judge_score={ head_judge_scores[idx] }
                    results_info={ results_info[idx] }
                    run={ runs[idx] }
                    has_next_tour={ has_next_tour }
                    has_total_score={ has_total_score }
                />
            );
        };
        return <div className="brief-table">
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th className="w-7 place"><p>{ _("results.labels.place") }</p></th>
                        <th className="w-6 number"><p>{ _("results.labels.number") }</p></th>
                        <th className="w-30 participant"><p>{ _("results.labels.participant_name") }</p></th>
                        <th className="club"><p>{ _("results.labels.participant_club") }</p></th>
                        { has_total_score ? <th className="w-18 score"><p>{ _("results.labels.total_score") }</p></th> : null }
                        <th className="w-8 card"><p className="text-center">{ _("results.labels.card") }</p></th>
                    </tr>
                </thead>
                <tbody>
                    { rows }
                </tbody>
            </table>
        </div>
    }
}
