import _ from "l10n";

import Row from "./Row";
import ColumnsWidths from "./ColumnsWidths";

import getJudgeTableMark from "getJudgeTableMark";
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

    static transformDocx(docx, tour) {
        docx
            .addStyle("table", "font-size", "9pt")
            .addStyle("th", "border-bottom", "1pt solid black")
            .addStyle("th.advances-header", "border-bottom", "1pt solid black")
            .addStyle("th.advances-header", "padding-top", "10pt")
            .addStyle("td", "border-bottom", "0.5pt solid #aaa")
            .setOrientation(this.getPaperOrientation(tour));
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

    renderExtraColsHeaders(widths) {
        let result = [];
        for (let place = 1; place <= this.props.tour.runs.length; ++place) {
            result.push(
                <th
                    className="skating-value"
                    key={ place }
                    style={ widths.genJudgeStyle() }
                >
                    <p className="text-center">
                        { `1-${place}` }
                    </p>
                </th>
            );
        }
        return result;
    }
    render() {
        const is_final = [
            "skating.final_simple",
            "skating.final_3d",
            "skating.final_4d",
        ].includes(this.props.tour.scoring_system_name);
        const show_total_score = !is_final;
        const line_judges = this.props.tour.discipline.discipline_judges.filter(dj => dj.role === "dance_judge")
        const has_next_tour = this.props.tour.next_tour_id !== null;
        const extra_cols = this.constructor.verbose && is_final ? this.props.tour.runs.length : 0;
        const widths = new ColumnsWidths(line_judges.length + extra_cols, show_total_score);
        const djs_map = new Map(this.props.tour.discipline.discipline_judges.map(dj => [dj.id, dj]));
        const table = makeTourResultsTable(this.props.tour);
        let rows = [];
        for (let idx = 0; idx < table.length; ++idx) {
            rows.push(this.renderAdvancesHeader(
                table[idx - 1],
                table[idx],
                has_next_tour,
                3 + line_judges.length + show_total_score + extra_cols,
            ));
            rows.push(
                <Row
                    disciplineJudgesMap={ djs_map }
                    isFinal={ is_final }
                    key={ table[idx].run.id }
                    lineDisciplineJudges={ line_judges }
                    row={ table[idx] }
                    showTotalScore={ show_total_score }
                    tour={ this.props.tour }
                    verbose={ this.constructor.verbose }
                />
            );
        }
        return (
            <div className="ResultsTable2">
                <table>
                    <thead>
                        <tr>
                            <th className="place" style={ widths.genPlaceStyle() }>
                                <p className="text-center">
                                    { _("results.labels.place") }
                                </p>
                            </th>
                            <th className="number" style={ widths.genNumberStyle() }>
                                <p className="text-center">
                                    { _("results.labels.number") }
                                </p>
                            </th>
                            <th className="participant" style={ widths.genNameStyle() }>
                                <p className="text-left">
                                    { _("results.labels.participant_name") }
                                </p>
                            </th>
                            { show_total_score ? (
                                <th className="total-score" style={ widths.genTotalScoreStyle() }>
                                    <p className="text-center">
                                        { _("results.labels.total_score") }
                                    </p>
                                </th>
                            ) : null }
                            { line_judges.map(dj =>
                                <th key={ dj.id } style={ widths.genJudgeStyle() }>
                                    <p className="text-center">
                                        { getJudgeTableMark(dj) }
                                    </p>
                                </th>
                            ) }
                            { is_final && this.constructor.verbose ? this.renderExtraColsHeaders(widths) : null }
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


