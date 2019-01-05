import { React } from "HostModules";

import lastOf from "common/tools/lastOf";
import _ from "l10n";
import PT from "prop-types";
import Row from "./Row";

export default class ResultsTable1 extends React.Component {
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

    static transformDocx(docx) {
        docx.addStyle("table", "font-size", "12pt")
            .addStyle("td", "border-bottom", "0.5pt solid #aaa")
            .addStyle("th", "border-bottom", "1pt solid black")
            .addStyle("th.advances-header", "border-bottom", "1pt solid black")
            .addStyle("th.advances-header", "padding-top", "10pt");
    }

    getStatusHeader(row_status) {
        return _(`results.headers.participants_${row_status}`);
    }
    getRowStatus(row) {
        if (row == null) {
            return "none";
        }
        if (row.run_result.extra_data.status !== "OK") {
            return row.run_result.extra_data.status;
        }
        return row.run_result.advanced ? "advanced" : "not_advanced";
    }
    renderAdvancesHeader(prev_row, row, has_next_tour, n_cols) {
        const prev_status = this.getRowStatus(prev_row);
        const next_status = this.getRowStatus(row);
        if (prev_status === next_status) {
            return null;
        }
        if (!["NP", "DQ"].includes(next_status) && !has_next_tour) {
            return null;
        }
        return (
            <tr key={`AH${row.run.id}`}>
                <th className="advances-header" colSpan={n_cols}>
                    <p className="text-left">{this.getStatusHeader(next_status)}</p>
                </th>
            </tr>
        );
    }
    renderRows() {
        const { tour, rows } = this.props.computedTour;
        const all_tours = tour.discipline.tours;
        const has_next_tour = lastOf(all_tours).id !== tour.id;
        let result = [];
        let prev_row = null;
        for (const row of rows) {
            result.push(this.renderAdvancesHeader(prev_row, row, has_next_tour, 6));
            result.push(<Row key={row.run.id} row={row} />);
            prev_row = row;
        }
        return result;
    }
    render() {
        return (
            <div className="ResultsTable1">
                <table style={{ width: "100%" }}>
                    <thead>
                        <tr>
                            <th className="w-7 place">
                                <p>{_("results.labels.place")}</p>
                            </th>
                            <th className="w-6 number">
                                <p>{_("results.labels.number")}</p>
                            </th>
                            <th className="w-25 participant">
                                <p className="text-left">
                                    {_("results.labels.participant_name")}
                                </p>
                            </th>
                            <th className="club">
                                <p className="text-left">
                                    {_("results.labels.participant_club")}
                                </p>
                            </th>
                            <th className="w-10 score">
                                <p>{_("results.labels.total_score")}</p>
                            </th>
                            <th className="w-12 card">
                                <p className="text-center">
                                    {_("results.labels.card")}
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                </table>
            </div>
        );
    }
}
