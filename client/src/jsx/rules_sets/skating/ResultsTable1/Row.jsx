import getParticipantDisplay from "common/getParticipantDisplay";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudgesMap: PT.instanceOf(Map).isRequired,
            isFinal: PT.bool.isRequired,
            row: PT.shape({
                place: PT.number,
                run: PT.shape({
                    status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                    disqualified: PT.bool.isRequired,
                    participant: PT.shape({
                        number: PT.number.isRequired,
                        club: PT.shape({
                            name: PT.string.isRequired,
                        }).isRequired,
                    }).isRequired,
                    scores: PT.arrayOf(
                        PT.shape({
                            discipline_judge_id: PT.number.isRequired,
                        }).isRequired
                    ).isRequired,
                    verbose_total_score: PT.shape({
                        crosses: PT.number.isRequired,
                    }),
                }).isRequired,
            }).isRequired,
            showTotalScore: PT.bool.isRequired,
        };
    }
    getPlace() {
        return this.props.row.run.disqualified
            ? null
            : this.props.row.place;
    }
    renderTotalScoreCell() {
        if (!this.props.showTotalScore) {
            return null;
        }
        let content = "—";
        if (this.props.row.run.status === "OK") {
            content = (
                <span>
                    { this.props.row.run.verbose_total_score.crosses }
                </span>
            );
        }
        return (
            <td className="w-10 score">
                <p className="text-center">
                    { content }
                </p>
            </td>
        );
    }
    render() {
        return (
            <tr>
                <td className="w-7 place">
                    <p className="text-center">
                        { this.getPlace() }
                    </p>
                </td>
                <td className="w-6 number">
                    <p className="text-center">
                        { this.props.row.run.participant.number }
                    </p>
                </td>
                <td className="w-35 participant">
                    { getParticipantDisplay(this.props.row.run.participant)
                 }</td>
                <td className="club">
                    <p>
                        { this.props.row.run.participant.club.name }
                    </p>
                </td>
                { this.renderTotalScoreCell() }
            </tr>
        );
    }
}
