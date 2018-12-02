import {React} from "HostModules";

import getJudgeTableMark from "getJudgeTableMark";
import _ from "l10n";
import PT from "prop-types";
import ColumnsWidths from "./ColumnsWidths";
import Row from "./Row";

export default class ResultsTable3 extends React.Component {
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
        docx
            .addStyle("table.results-table", "font-size", "9pt")
            .addStyle("table.results-table .acro-table td", "font-size", "9pt")
            .addStyle("table.results-table .acro-table td", "padding", "0")
            .addStyle("table.results-table .acro-table td", "border", "0.5pt solid black")
            .addStyle("table.results-table table.score-breakdown td, .bordered-table table.score-breakdown th", "font-size", "9pt")
            .addStyle("table.results-table table.score-breakdown td, .bordered-table table.score-breakdown th", "border", "none")
            .addStyle("table.results-table table.score-breakdown th", "padding", "0 1pt 0 0")
            .addStyle("table.results-table table.score-breakdown td", "padding", "0 0 0 1pt")
            .addStyle("table.results-table td", "border-top", "1pt solid black")
            .addStyle("table.score-breakdown th", "text-align", "right")
            .addStyle("table.score-breakdown td", "text-align", "left")
            .addStyle("table.score-breakdown", "width", "100%")
            .addStyle("table.score-breakdown th", "width", "50%")
            .addStyle("table.score-breakdown th", "min-width", "20pt")
            .addStyle(".advances-header", "background-color", "#ddd")
            .addStyle(".total-score", "font-weight", "bold");
    }

    render() {
        const line_judges = this.props.computedTour.tour.discipline.discipline_judges.filter(
            dj => ["acro_judge", "dance_judge"].includes(dj.role));
        const widths = new ColumnsWidths(line_judges.length);
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
                        { this.props.computedTour.rows.map(row =>
                            <Row
                                key={ row.run.id }
                                lineDisciplineJudges={ line_judges }
                                row={ row }
                                tour={ this.props.computedTour.tour }
                            />
                        ) }
                    </tbody>
                </table>
            </div>
        );
    }
}

