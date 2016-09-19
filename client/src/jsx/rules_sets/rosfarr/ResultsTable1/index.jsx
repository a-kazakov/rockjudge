import _ from "l10n";

import Row from "./Row"

export default class ResultsTable1 extends React.Component {
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

    static transformDocx(docx) {
        docx
            .addStyle(".bordered-table", "font-size", "12pt")
            .addStyle(".advances-header", "background-color", "#ddd");
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
            <tr key={ `AH${next_row.run.id}` }>
                <th className="advances-header" colSpan={ n_cols }>
                    <p className="text-left">
                        { this.getStatusHeader(next_status) }
                    </p>
                </th>
            </tr>
        )
    }
    render() {
        const has_next_tour = this.props.tour.next_tour_id !== null;
        const show_total_score = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(
            this.props.tour.scoring_system_name) < 0;
        const djs_map = new Map(this.props.tour.discipline.discipline_judges.map(dj => [dj.id, dj]));
        let rows = [];
        for (let idx = 0; idx < this.props.table.length; ++idx) {
            rows.push(this.renderAdvancesHeader(
                this.props.table[idx - 1],
                this.props.table[idx],
                has_next_tour,
                5 + show_total_score
            ));
            const row = this.props.table[idx];
            rows.push(
                <Row
                    disciplineJudgesMap={ djs_map }
                    key={ row.run.id }
                    row={ row }
                    showTotalScore={ show_total_score }
                />
            );
        }
        return (
            <div className="ResultsTable1">
                <table className="bordered-table">
                    <thead>
                        <tr>
                            <th className="w-7 place">
                                <p>
                                    { _("results.labels.place") }
                                </p>
                            </th>
                            <th className="w-6 number">
                                <p>
                                    { _("results.labels.number") }
                                </p>
                            </th>
                            <th className="w-30 participant">
                                <p>
                                    { _("results.labels.participant_name") }
                                </p>
                            </th>
                            <th className="club">
                                <p>
                                    { _("results.labels.participant_club") }
                                </p>
                            </th>
                            { show_total_score ? (
                                <th className="w-18 score">
                                    <p>
                                        { _("results.labels.total_score") }
                                    </p>
                                </th>
                            ) : null }
                            <th className="w-8 card">
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
            </div>
        );
    }
}

ResultsTable1.displayName = "rules_sets_rosfarr_ResultsTable1";
