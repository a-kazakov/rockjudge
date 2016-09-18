export default class CompetitionInfo extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                info: PT.arrayOf(
                    PT.arrayOf(PT.string.isRequired).isRequired
                ).isRequired,
            }).isRequired,
        };
    }

    renderRow = (row, idx) => {
        const [label, value] = row;
        return (
            <tr key={ idx }>
                <th>{ label }</th>
                <td>{ value }</td>
            </tr>
        );
    }
    render() {
        return (
            <table className="competition-info"><tbody>
                { this.props.competition.info.map(this.renderRow) }
            </tbody></table>
        );
    }
}

CompetitionInfo.displayName = "PresenterTablet_InfoPage_CompetitionInfo";
