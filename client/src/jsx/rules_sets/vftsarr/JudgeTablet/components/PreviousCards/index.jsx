import _ from "l10n";

export default class PreviousCards extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            run: PT.shape({
                inherited_data: PT.shape({
                    cards: PT.arrayOf(
                        PT.shape({
                            tour: PT.string.isRequired,
                            card: PT.string.isRequired,
                        }).isRequired,
                    ), // optional
                }).isRequired,
            }).isRequired,
        };
    }

    render() {
        if (!this.props.run.inherited_data.cards || this.props.run.inherited_data.cards.length === 0) {
            return <div />;
        }
        return (
            <div>
                <h3>{ _("tablet.head_judge.previous_cards") }</h3>
                <table className="full-width"><tbody>
                    { this.props.run.inherited_data.cards.map((d, idx) =>
                        <tr key={ idx }>
                            <td className="w-10 text-center">
                                <strong>{ _(`results.cards.short_${d.card}`) }</strong>
                            </td>
                            <td>{ d.tour }</td>
                        </tr>
                    ) }
                </tbody></table>
            </div>
        );
    }
}
