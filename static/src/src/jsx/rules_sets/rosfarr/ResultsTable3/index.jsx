import _ from "l10n";

import Row from "./Row";
import ColumnsWidths from "./ColumnsWidths";

import getJudgeTableMark from "getJudgeTableMark";

export default class ResultsTable3 extends React.Component {
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

    render() {
        const line_judges = this.props.tour.discipline.discipline_judges.filter(
            dj => ["acro_judge", "dance_judge"].indexOf(dj.role) >= 0);
        const widths = new ColumnsWidths(line_judges.length);
        const djs_map = new Map(this.props.tour.discipline.discipline_judges.map(dj => [dj.id, dj]));

        return (
            <table className="bordered-table">
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
                    { this.props.table.map(row =>
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
        );
    }
}

ResultsTable3.displayName = "rules_sets_rosfarr_ResultsTable3";
