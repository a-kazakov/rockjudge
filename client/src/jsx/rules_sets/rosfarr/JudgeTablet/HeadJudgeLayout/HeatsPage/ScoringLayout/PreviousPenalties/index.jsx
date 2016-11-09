import _ from "l10n";

export default class NotPerPreviousPenaltiesformedSwitch extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            run: PT.shape({
                inherited_data: PT.shape({
                    penalties: PT.arrayOf(
                        PT.shape({
                            tour: PT.string.isRequired,
                            penalty: PT.number.isRequired,
                        }).isRequired,
                    ), // optional
                }).isRequired,
            }).isRequired,
        };
    }

    render() {
        if (!this.props.run.inherited_data.penalties || this.props.run.inherited_data.penalties.length === 0) {
            return <div />;
        }
        return (
            <div>
                <div className="spacer" />
                <h3>{ _("tablet.head_judge.previous_penalties") }</h3>
                <table className="full-width"><tbody>
                    { this.props.run.inherited_data.penalties.map((d, idx) =>
                        <tr key={ idx }>
                            <td className="w-10 text-center"><strong>{ d.penalty }</strong></td>
                            <td>{ d.tour }</td>
                        </tr>
                    ) }
                </tbody></table>
            </div>
        );
    }
}
