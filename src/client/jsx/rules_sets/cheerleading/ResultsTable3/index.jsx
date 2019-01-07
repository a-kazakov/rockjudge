import { React } from "HostModules";

import getJudgeTableMark from "getJudgeTableMark";
import _ from "l10n";
import PT from "prop-types";
import ColumnsWidths from "./ColumnsWidths";
import Row from "./Row";
import JazzGroupScore from "common/VerboseJudgeScore/JazzGroupScore";
import CoupleScore from "common/VerboseJudgeScore/CoupleScore";
import FreestyleGroupScore from "common/VerboseJudgeScore/FreestyleGroupScore";
import HiphopGroupScore from "common/VerboseJudgeScore/HiphopGroupScore";

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
        docx.addStyle("table.results-table", "font-size", "9pt")
            .addStyle(
                "table.results-table .acro-table td",
                "border",
                "0.5pt solid black",
            )
            .addStyle(
                "table.results-table table.score-breakdown td, table.score-breakdown th",
                "font-size",
                "9pt",
            )
            .addStyle(
                "table.results-table table.score-breakdown td, table.score-breakdown th",
                "border",
                "none",
            )
            .addStyle("table.results-table", "width", "100%")
            .addStyle("table.results-table td", "border-top", "1pt solid black")
            .addStyle("table.results-table table.score-breakdown td", "width", "25pt")
            .addStyle("table.results-table table.score-breakdown", "width", "50pt")
            .addStyle(".total-score", "font-weight", "bold");
    }

    renderHintBody(Component, text) {
        return (
            <table>
                <tbody>
                    <tr>
                        <td style={{ verticalAlign: "top", width: "50pt" }}>
                            <Component example />
                        </td>
                        <td style={{ verticalAlign: "top" }}>{text}</td>
                    </tr>
                </tbody>
            </table>
        );
    }
    renderHint() {
        switch (this.props.computedTour.tour.scoring_system_name) {
            case "cheerleading.jazz_group":
                return this.renderHintBody(
                    JazzGroupScore,
                    _("results.hints.jazz_group"),
                );
            case "cheerleading.freestyle_group":
                return this.renderHintBody(
                    FreestyleGroupScore,
                    _("results.hints.freestyle_group"),
                );
            case "cheerleading.hiphop_group":
                return this.renderHintBody(
                    HiphopGroupScore,
                    _("results.hints.hiphop_group"),
                );
            case "cheerleading.couple":
                return this.renderHintBody(CoupleScore, _("results.hints.couple"));
            default:
                return null;
        }
    }

    render() {
        const line_judges = this.props.computedTour.tour.discipline.discipline_judges.filter(
            dj => dj.role === "dance_judge",
        );
        const widths = new ColumnsWidths(line_judges.length);
        return (
            <div className="ResultsTable3">
                <table className="results-table">
                    <thead>
                        <tr>
                            <th className="place" style={widths.genPlaceStyle()}>
                                <p>{_("results.labels.place")}</p>
                            </th>
                            <th className="participant" style={widths.genInfoStyle()}>
                                <p>{_("results.labels.info")}</p>
                            </th>
                            {line_judges.map(dj => (
                                <th key={dj.id} style={widths.genJudgeStyle()}>
                                    <p>{getJudgeTableMark(dj)}</p>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.computedTour.rows.map(row => (
                            <Row
                                key={row.run.id}
                                lineDisciplineJudges={line_judges}
                                row={row}
                                tour={this.props.computedTour.tour}
                            />
                        ))}
                    </tbody>
                </table>
                <br />
                <br />
                {this.renderHint()}
            </div>
        );
    }
}
