import getParticipantDisplay from "common/getParticipantDisplay";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudgesMap: PT.instanceOf(Map).isRequired,
            isFinal: PT.bool.isRequired,
            lineDisciplineJudges: PT.arrayOf(
                PT.shape({
                    role: PT.string.isRequired,
                }).isRequired
            ).isRequired,
            row: PT.shape({
                additional_data: PT.shape({
                    skating_row: PT.arrayOf(
                        PT.arrayOf(
                            PT.number,
                        ).isRequired,
                    ).isRequired,
                }).isRequired,
                place: PT.number,
                run: PT.shape({
                    status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                    disqualified: PT.bool.isRequired,
                    participant: PT.shape({
                        number: PT.number.isRequired,
                        name: PT.string.isRequired,
                        sportsmen: PT.array.isRequired,
                    }).isRequired,
                    scores: PT.arrayOf(
                        PT.shape({
                            discipline_judge_id: PT.number.isRequired,
                        }).isRequired
                    ).isRequired,
                    total_score: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
            showTotalScore: PT.bool.isRequired,
            verbose: PT.bool.isRequired,
        };
    }

    getPlace() {
        return this.props.row.run.disqualified
            ? null
            : this.props.row.place;
    }
    renderScore(discipline_judge, score) {
        if (this.props.row.run.status !== "OK") {
            return (
                <p className="text-center">
                    &mdash;
                </p>
            );
        }
        if (!score) {
            return (
                <p className="text-center">
                    &mdash;
                </p>
            )
        }
        return (
            <p className="text-center">
                { score.data.total_score }
            </p>
        );
    }
    renderTotalScoreCell() {
        if (!this.props.showTotalScore) {
            return null;
        }
        if (this.props.row.run.status !== "OK") {
            return (
                <td className="total-score">
                    <p className="text-center">
                        &mdash;
                    </p>
                </td>
            );
        }
        return (
            <td className="total-score">
                <p className="text-center">
                    { this.props.row.run.total_score }
                </p>
            </td>
        );
    }
    renderJudgesScores() {
        const scores_map = new Map(this.props.row.run.scores.map(score => [score.discipline_judge_id, score]));
        return this.props.lineDisciplineJudges.map((dj, idx) =>
            <td key={ dj?.id || `I${idx}` }>
                { this.renderScore(dj, scores_map.get(dj.id)) }
            </td>
        );
    }
    renderSkatingValues() {
        if (!this.props.verbose || !this.props.isFinal) {
            return null;
        }
        const quorum = Math.floor((this.props.lineDisciplineJudges.length + 1.001) / 2);
        let result = [];
        let idx = 0;
        for (const [pr, sec] of this.props.row.additional_data.skating_row) {
            const text = pr === null ? "-" : pr < quorum ? `${pr}` : `${pr} (${sec})`;
            const color = pr < quorum ? "#999" : "#000";
            const borderLeft = idx === 0 ? "1pt solid black" : "none";
            result.push(
                <td key={ idx++ } style={ { color, borderLeft } }>
                    <p className="text-center">
                        { text }
                    </p>
                </td>
            )
        }
        return result;
    }
    render() {
        return (
            <tr>
                <td
                    className="place"
                    style={ { borderRight: "1pt solid black" } }
                >
                    <p className="text-center">
                        { this.getPlace() }
                    </p>
                </td>
                <td
                    className="number"
                    style={ { fontWeight: "bold" } }
                >
                    <p className="text-center">
                        { this.props.row.run.participant.number }
                    </p>
                </td>
                <td className="participant">
                    { getParticipantDisplay(this.props.row.run.participant) }
                </td>
                { this.renderTotalScoreCell() }
                { this.renderJudgesScores() }
                { this.renderSkatingValues() }
            </tr>
        );
    }
}
