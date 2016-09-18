import _ from "l10n";

import Row from "./Row";
import ColumnsWidths from "./ColumnsWidths";

import getJudgeTableMark from "getJudgeTableMark";
import getScoringType from "common/getScoringType";

export default class ResultsTable2 extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            table: PT.arrayOf(
                PT.shape({
                    advances: PT.bool.isRequired,
                    run: PT.shape({
                        id: PT.number.isRequired,
                        performed: PT.bool.isRequired,
                    }).isRequired,
                }).isRequired
            ).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
                next_tour_id: PT.number,
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

    getRowStatus(row) {
        if (!row) {
            return "none";
        }
        if (!row.run.performed) {
            return "not_performed";
        }
        return row.advances ? "advanced" : "not_advanced";
    }
    getStatusHeader(row_status) {
        return _(`results.headers.participants_${row_status}`);
    }
    renderAdvancesHeader(prev_row, next_row, has_next_tour, n_cols) {
        const prev_status = this.getRowStatus(prev_row);
        const next_status = this.getRowStatus(next_row);
        if (prev_status === next_status) {
            return null;
        }
        if (next_status !== "not_performed" && !has_next_tour) {
            return null;
        }
        return (
            <tr key={ "AH" + next_row.run.id }>
                <th className="advances-header" colSpan={ n_cols }>
                    <p className="text-left">
                        { this.getStatusHeader(next_status) }
                    </p>
                </th>
            </tr>
        )
    }

    render() {
        const show_total_score = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(
            this.props.tour.scoring_system_name) < 0;
        const line_judges = this.props.tour.discipline.discipline_judges.filter(
            dj => ["acro_judge", "dance_judge"].indexOf(dj.role) >= 0);
        const has_next_tour = this.props.tour.next_tour_id !== null;
        const widths = new ColumnsWidths(line_judges.length, show_total_score);
        const djs_map = new Map(this.props.tour.discipline.discipline_judges.map(dj => [dj.id, dj]));
        let rows = [];
        for (let idx = 0; idx < this.props.table.length; ++idx) {
            rows.push(this.renderAdvancesHeader(
                this.props.table[idx - 1],
                this.props.table[idx],
                has_next_tour,
                4 + line_judges.length + show_total_score
            ));
            rows.push(
                <Row
                    disciplineJudgesMap={ djs_map }
                    key={ this.props.table[idx].run.id }
                    lineDisciplineJudges={ line_judges }
                    row={ this.props.table[idx] }
                    showTotalScore={ show_total_score }
                    tour={ this.props.tour }
                />
            );
        };
        return (
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th className="place" style={ widths.genPlaceStyle() }>
                            <p>
                                { _("results.labels.place") }
                            </p>
                        </th>
                        <th className="number" style={ widths.genNumberStyle() }>
                            <p>
                                { _("results.labels.number") }
                            </p>
                        </th>
                        <th className="participant" style={ widths.genNameStyle() }>
                            <p>
                                { _("results.labels.participant_name") }
                            </p>
                        </th>
                        { show_total_score ? (
                            <th className="total-score" style={ widths.genTotalScoreStyle() }>
                                <p>
                                    { _("results.labels.total_score") }
                                </p>
                            </th>
                        ) : null }
                        { line_judges.map(dj =>
                            <th key={ dj.id } style={ widths.genJudgeStyle() }>
                                <p>
                                    { getJudgeTableMark(dj) }
                                </p>
                            </th>
                        ) }
                        <th className="card" style={ widths.genJudgeStyle() }>
                            <p className="text-center">
                                { _("results.labels.card") }
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    { rows }
                </tbody>
            </table>
        );
    }
}

ResultsTable2.displayName = "rules_sets_rosfarr_ResultsTable2";
