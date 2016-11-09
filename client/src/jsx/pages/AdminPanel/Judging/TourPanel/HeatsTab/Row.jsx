export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            participant: PT.shape({
                number: PT.number.isRequired,
                name: PT.string.isRequired,
                club: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    render() {
        return (
            <tr>
                <td className="w-8">
                    <p className="text-center">
                        { this.props.participant.number }
                    </p>
                </td>
                <td>
                    <p>
                        { this.props.participant.name }
                    </p>
                </td>
                <td>
                    <p>
                        { this.props.participant.club.name }
                    </p>
                </td>
            </tr>
        );
    }
}

Row.displayName = "AdminPanel_Judging_TourPanel_HeatsTab_Row";
