import _ from "l10n";

import Row from "./Row"

import makeTourResultsTable from "common/makeTourResultsTable";

export default class ResultsTable1 extends React.PureComponent {
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

    static transformDocx(docx) {
        docx
            .addStyle("table", "font-size", "12pt")
            .addStyle("td", "border-bottom", "0.5pt solid #aaa")
            .addStyle("th", "border-bottom", "1pt solid black")
            .addStyle("th.advances-header", "border-bottom", "1pt solid black")
            .addStyle("th.advances-header", "padding-top", "10pt");
    }

    getRowStatus(row) {
        if (!row) {
            return "none";
        }
        if (row.run.status !== "OK") {
            return row.run.status;
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
        if (!["NP", "DQ"].includes(next_status) && !has_next_tour) {
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
        const is_formation = ["rosfarr.formation", "rosfarr.formation_acro"].includes(this.props.tour.scoring_system_name)
        const show_total_score = !is_formation;
        const djs_map = new Map(this.props.tour.discipline.discipline_judges.map(dj => [dj.id, dj]));
        const table = makeTourResultsTable(this.props.tour);
        let rows = [];
        for (let idx = 0; idx < table.length; ++idx) {
            rows.push(this.renderAdvancesHeader(
                table[idx - 1],
                table[idx],
                has_next_tour,
                5 + show_total_score
            ));
            const row = table[idx];
            rows.push(
                <Row
                    disciplineJudgesMap={ djs_map }
                    isFormation={ is_formation }
                    key={ row.run.id }
                    row={ row }
                    showTotalScore={ show_total_score }
                />
            );
        }
        return (
            <div className="ResultsTable1">
                <table>
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
                                <p className="text-left">
                                    { _("results.labels.participant_name") }
                                </p>
                            </th>
                            <th className="club">
                                <p className="text-left">
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
