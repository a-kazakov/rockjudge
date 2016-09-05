import ParticipantCell from "../ParticipantCell";

export default class Row extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            acroIncluded: PT.bool.isRequired,
            config: PT.object.isRequired,
            participant: PT.shape({
                coaches: PT.string.isRequired,
                number: PT.number.isRequired,
                discipline: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    render() {
        const class_name = this.props.acroIncluded ? "has-acro" : "";
        const coaches = this.props.participant.coaches.split(",").map(
            coach => [coach.trim(), <br key="X" />]
        )
        return (
            <tr className={ class_name }>
                <td className="w-8 number">
                    <p className="text-center">
                        { this.props.participant.number }
                    </p>
                </td>
                <td className="w-36 name" colSpan="2">
                    <ParticipantCell
                        config={ this.props.config }
                        participant={ this.props.participant }
                    />
                </td>
                <td className="w-28 club">
                    <p>
                        { this.props.participant.discipline.name }
                    </p>
                </td>
                <td className="w-28 coaches">
                    <p>
                        { coaches }
                    </p>
                </td>
            </tr>
        );
    }
}

Row.displayName = "AdminPanel_Management_StartList_Clubs_Row";
