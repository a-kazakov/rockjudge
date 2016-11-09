export default class RunInfo extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            run: PT.shape({
                id: PT.number.isRequired,
                participant: PT.shape({
                    number: PT.number.isRequired,
                    name: PT.string.isRequired,
                    club: PT.shape({
                        name: PT.string.isRequired,
                        city: PT.string.isRequired,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    render() {
        return (
            <table><tbody>
                <tr>
                    <td className="number" rowSpan="2">
                        { this.props.run.participant.number }
                    </td>
                    <td className="name">
                        { this.props.run.participant.name }
                    </td>
                </tr><tr>
                    <td className="club">
                        { `${this.props.run.participant.club.name}, ${this.props.run.participant.club.city}` }
                    </td>
                </tr>
            </tbody></table>
        );
    }
}

RunInfo.displayName = "PresenterTablet_HeatsPage_CurrentHeat_RunInfo";
