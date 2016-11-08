import _ from "l10n";

export default function PreviousPenalties(props) {
    if (!props.run.inherited_data.penalties || props.run.inherited_data.penalties.length === 0) {
        return <div />;
    }
    return (
        <div>
            <div className="spacer" />
            <h3>{ _("tablet.head_judge.previous_penalties") }</h3>
            <table className="full-width"><tbody>
                { props.run.inherited_data.penalties.map((d, idx) =>
                    <tr key={ idx }>
                        <td className="w-10 text-center"><strong>{ d.penalty }</strong></td>
                        <td>{ d.tour }</td>
                    </tr>
                ) }
            </tbody></table>
        </div>
    );
}
