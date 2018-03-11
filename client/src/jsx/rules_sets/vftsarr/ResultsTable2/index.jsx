import _ from "l10n";

import Row from "./Row";
import makeTourResultsTable from "common/makeTourResultsTable";

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

    static transformDocx(docx) {
        docx
            .addStyle("table", "font-size", "9pt")
            .addStyle("th", "border-bottom", "1pt solid black")
            .addStyle("th.advances-header", "border-bottom", "1pt solid black")
            .addStyle("th.advances-header", "padding-top", "10pt")
            .addStyle("td", "border-bottom", "0.5pt solid #aaa");
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
        const table = makeTourResultsTable(this.props.tour);
        let rows = [];
        for (let idx = 0; idx < table.length; ++idx) {
            rows.push(this.renderAdvancesHeader(
                table[idx - 1],
                table[idx],
                has_next_tour,
                6,
            ));
            rows.push(
                <Row
                    key={ table[idx].run.id }
                    row={ table[idx] }
                    tour={ this.props.tour }
                />
            );
        }
        return (
            <div className="ResultsTable2">
                <table>
                    <thead>
                        <tr>
                            <th className="w-6">
                                <p className="place">
                                    { _("results.labels.place") }
                                </p>
                            </th>
                            <th className="w-4">
                                <p className="text-center">
                                    { _("results.labels.number") }
                                </p>
                            </th>
                            <th className="w-17">
                                <p className="text-left">
                                    { _("results.labels.participant_name") }
                                </p>
                            </th>
                            <th className="w-50">
                                <p className="text-center">
                                    { _("results.labels.criterias") }
                                </p>
                            </th>
                            <th className="w-11">
                                <p className="text-center">
                                    { _("results.labels.total_score") }
                                </p>
                            </th>
                            <th className="w-13">
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

