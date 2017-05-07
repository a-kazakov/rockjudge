import VerboseJudgeScore from "common/VerboseJudgeScore";

import InfoCell from "./InfoCell";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudgesMap: PT.instanceOf(Map).isRequired,
            lineDisciplineJudges: PT.arrayOf(
                PT.shape({
                    role: PT.string.isRequired,
                }).isRequired
            ).isRequired,
            row: PT.shape({
                additional_data: PT.object.isRequired,
                place: PT.number,
                run: PT.shape({
                    disqualified: PT.bool.isRequired,
                    status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                    scores: PT.arrayOf(
                        PT.shape({
                            discipline_judge_id: PT.number.isRequired,
                        }).isRequired
                    ).isRequired,
                    verbose_total_score: PT.shape({
                        primary_score: PT.number,
                        secondary_score: PT.number,
                        previous_tour: PT.shape({
                            primary_score: PT.number,
                            secondary_score: PT.number,
                        }),
                    }),
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }

    getPlace() {
        return this.props.row.run.disqualified
            ? null
            : this.props.row.place;
    }
    renderScore(discipline_judge, score) {
        if (!score) {
            return (
                <p className="text-center">
                    &mdash;
                </p>
            )
        }
        return (
            <VerboseJudgeScore
                additionalData={ this.props.row.additional_data }
                disciplineJudge={ discipline_judge }
                run={ this.props.row.run }
                score={ score }
                showScore={ this.props.row.run.status === "OK" }
                tour={ this.props.tour }
            />
        );
    }
    renderJudgesScores() {
        const scores_map = new Map(this.props.row.run.scores.map(score => [score.discipline_judge_id, score]));
        return this.props.lineDisciplineJudges.map((dj, idx) =>
            <td key={ dj ? dj.id : `I${idx}` }>
                { this.renderScore(dj, scores_map.get(dj.id)) }
            </td>
        );
    }
    render() {
        return (
            <tr>
                <td className="place">
                    <p className="text-center">
                        { this.getPlace() }
                    </p>
                </td>
                <InfoCell
                    disciplineJudgesMap={ this.props.disciplineJudgesMap }
                    row={ this.props.row }
                    tour={ this.props.tour }
                />
                { this.renderJudgesScores() }
            </tr>
        );
    }
}

Row.displayName = "rules_sets_rosfarr_ResultsTable3_Row";
