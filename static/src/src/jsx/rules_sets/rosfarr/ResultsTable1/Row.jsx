import getParticipantDisplay from "common/getParticipantDisplay";

export default class TourResultsTableRow extends React.Component {
    render() {
        let card = this.props.run.performed
            ? this.props.head_judge_score
                ? this.props.head_judge_score.data.total_score
                : "0"
            : <span>&mdash;</span>;
        let total_score = this.props.has_total_score ?
            this.props.run.performed
                ? <p className="text-center">
                    <strong>{ this.props.run.verbose_total_score.primary_score.toFixed(2) }</strong>
                    &nbsp;/{" "}{ this.props.run.verbose_total_score.secondary_score.toFixed(2) }
                </p>
                : <p className="text-center">&mdash;</p>
            : null;
        return <tr>
            <td className="w-7 place"><p className="text-center">{ this.props.results_info.place }</p></td>
            <td className="w-6 number"><p className="text-center">{ this.props.run.participant.number }</p></td>
            <td className="w-30 participant">{ getParticipantDisplay(this.props.run.participant) }</td>
            <td className="club"><p>{ this.props.run.participant.club.name }</p></td>
            { this.props.has_total_score ? <td className="w-18 score">{ total_score }</td> : null }
            <td className="w-8 card"><p className="text-center">{ card }</p></td>
        </tr>
    }
}
