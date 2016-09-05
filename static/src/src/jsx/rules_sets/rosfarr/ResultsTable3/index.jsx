import _ from "l10n";

import TourScoresWrapper from "common/TourScoresWrapper";
import Row from "./Row";
import ColumnsWidths from "./ColumnsWidths";


export default class ResultsTable3 extends React.Component {
    render() {
        let tour_wrapper = new TourScoresWrapper(this.props.tour, this.props.results);
        let discipline_judges = tour_wrapper.getDisciplineJudgesByRoles("acro_judge", "dance_judge");
        let scores_table = tour_wrapper.getScoresTableByRoles("acro_judge", "dance_judge");
        let head_judge_scores = tour_wrapper.getScoresTableByRoles("head_judge").map((row) => row[0]);
        let results_info = tour_wrapper.getResultsInfo();
        let runs = tour_wrapper.getRuns();
        let has_next_tour = this.props.tour.next_tour_id !== null;
        let rows = [];
        let widths = new ColumnsWidths(discipline_judges.length);
        for (let idx = 0; idx < runs.length; ++idx) {
            rows.push(
                <Row
                    key={ runs[idx].id }
                    tour={ this.props.tour }
                    run={ runs[idx] }
                    scores={ scores_table[idx] }
                    widths={ widths }
                    head_judge_score={ head_judge_scores[idx] }
                    results_info={ results_info[idx] }
                    discipline_judges={ discipline_judges }
                    has_next_tour={ has_next_tour }
                />
            );
        };
        let judges_header = discipline_judges.map(function(dj) {
            return <th key={ dj.id } width={ widths.genJudgeStyle() }><p>{ dj.judge.number }</p></th>
        });
        return <table className="bordered-table" style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th className="place" width={ widths.genPlaceStyle() }><p>{ _("results.labels.place") }</p></th>
                    <th className="participant" width={ widths.genInfoStyle() }><p>
                        { _("results.labels.info") }
                    </p></th>
                    { judges_header }
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}
