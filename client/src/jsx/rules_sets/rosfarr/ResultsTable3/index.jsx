import _ from "l10n";

import Row from "./Row";
import ColumnsWidths from "./ColumnsWidths";

import getJudgeTableMark from "getJudgeTableMark";
import makeTourResultsTable from "common/makeTourResultsTable";

export default class ResultsTable3 extends React.PureComponent {
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
            .addStyle("table.results-table", "font-size", "9pt")
            .addStyle("table.results-table .acro-table td", "font-size", "9pt")
            .addStyle("table.results-table .acro-table td", "padding", "0 3pt")
            .addStyle("table.results-table .acro-table td", "border", "0.5pt solid black")
            .addStyle("table.results-table table.score-breakdown td, .bordered-table table.score-breakdown th", "font-size", "9pt")
            .addStyle("table.results-table table.score-breakdown td, .bordered-table table.score-breakdown th", "border", "none")
            .addStyle("table.results-table table.score-breakdown th", "padding", "0 1pt 0 0")
            .addStyle("table.results-table table.score-breakdown td", "padding", "0 0 0 1pt")
            .addStyle("table.results-table td", "border-top", "1pt solid black")
            .addStyle("table.score-breakdown th", "text-align", "right")
            .addStyle("table.score-breakdown td", "text-align", "left")
            .addStyle("table.score-breakdown td", "text-align", "left")
            .addStyle("table.score-breakdown", "width", "50pt")
            .addStyle("table.score-breakdown th", "width", "20pt")
            .addStyle(".advances-header", "background-color", "#ddd")
            .addStyle(".total-score", "font-weight", "bold");
    }

    render() {
        const line_judges = this.props.tour.discipline.discipline_judges.filter(
            dj => ["acro_judge", "dance_judge"].indexOf(dj.role) >= 0);
        const widths = new ColumnsWidths(line_judges.length);
        const djs_map = new Map(this.props.tour.discipline.discipline_judges.map(dj => [dj.id, dj]));
        const table = makeTourResultsTable(this.props.tour);
        return (
            <div className="ResultsTable3">
                <table className="results-table">
                    <thead>
                        <tr>
                            <th className="place" style={ widths.genPlaceStyle() }>
                                <p>
                                    { _("results.labels.place") }
                                </p>
                            </th>
                            <th className="participant" style={ widths.genInfoStyle() }>
                                <p>
                                    { _("results.labels.info") }
                                </p>
                            </th>
                            { line_judges.map(dj =>
                                <th key={ dj.id } style={ widths.genJudgeStyle() }>
                                    <p>
                                        { getJudgeTableMark(dj) }
                                    </p>
                                </th>
                            ) }
                        </tr>
                    </thead>
                    <tbody>
                        { table.map(row =>
                            <Row
                                disciplineJudgesMap={ djs_map }
                                key={ row.run.id }
                                lineDisciplineJudges={ line_judges }
                                row={ row }
                                tour={ this.props.tour }
                            />
                        ) }
                    </tbody>
                </table>
            </div>
        );
    }
}

ResultsTable3.displayName = "rules_sets_rosfarr_ResultsTable3";
