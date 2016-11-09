export default class Acrobatics extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            participant: PT.shape({
                programs: PT.arrayOf(
                    PT.shape({
                        name: PT.string.isRequired,
                        acrobatics: PT.arrayOf(
                            PT.shape({
                                description: PT.string.isRequired,
                                score: PT.number.isRequired,
                            }).isRequired
                        ),
                    }).isRequired
                ),
            }).isRequired,
        };
    }
    render() {
        return (
            <tr className="tr-acro">
                <td className="acro" colSpan="5">
                    <table className="inner"><tbody>
                        { this.props.participant.programs.map((pr, pr_idx) =>
                            [
                                <tr key={ `H${pr_idx}` }>
                                    <th colSpan="3">
                                        <p className="text-left">
                                            { pr.name }
                                        </p>
                                    </th>
                                </tr>,
                            ].concat(
                                pr.acrobatics.map((a, a_idx) =>
                                    <tr key={ `A_${pr_idx}_${a_idx}` }>
                                        <td className="w-3">
                                            <p className="text-left">
                                                { a_idx + 1 }
                                            </p>
                                        </td>
                                        <td className="w-90">
                                            <p className="text-left">
                                                { a.description }
                                            </p>
                                        </td>
                                        <td className="w-7">
                                            <p className="text-right">
                                                { a.score.toFixed(1) }
                                            </p>
                                        </td>
                                    </tr>
                                )
                            )
                        ) }
                    </tbody></table>
                </td>
            </tr>
        );
    }
}

Acrobatics.displayName = "AdminPanel_Management_StartList_Acrobatics";
