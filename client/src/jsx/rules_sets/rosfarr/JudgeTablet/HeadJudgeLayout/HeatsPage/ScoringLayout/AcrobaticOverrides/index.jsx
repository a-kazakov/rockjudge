import _ from "l10n";

export default class ActobaticOverrides extends React.Component {
    getAcrobaticOverrides() {
        return this.props.run.acrobatics
            .map((acro, idx) => ({ idx: idx + 1, acrobatic: acro }))
            .filter((acro) => acro.acrobatic.original_score !== acro.acrobatic.score);
    }
    render() {
        let acrobatic_overrides = this.getAcrobaticOverrides();
        if (acrobatic_overrides.length === 0) {
            return null;
        }
        return (
            <div>
                <div className="spacer"></div>
                <h3>{ _("tablet.head_judge.acrobatic_overrides") }</h3>
                <table className="full-width"><tbody>
                    { acrobatic_overrides.map((acro) =>
                        <tr key={ acro.idx }>
                            <td className="w-5">{ acro.idx }</td>
                            <td>{ acro.acrobatic.description }</td>
                            <td className="w-10 text-right">{ acro.acrobatic.original_score.toFixed(1) }</td>
                            <td className="w-5 text-center">→</td>
                            <td className="w-10 text-left">{ acro.acrobatic.score.toFixed(1) }</td>
                        </tr>
                    ) }
                </tbody></table>
            </div>
        );
    }
}