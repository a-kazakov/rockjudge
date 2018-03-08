import _ from "l10n";

export default class ActobaticOverrides extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            run: PT.shape({
                acrobatics: PT.arrayOf(
                    PT.shape({
                        original_score: PT.number.isRequired,
                        score: PT.number.isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
        };
    }

    getAcrobaticOverrides() {
        return this.props.run.acrobatics
            .map((acro, idx) => ({ idx: idx + 1, acrobatic: acro }))
            .filter((acro) => acro.acrobatic.original_score !== acro.acrobatic.score);
    }
    formatDescriptionChunk = (text, idx) => {
        if (text === "") {
            return null;
        }
        return (
            idx % 2 === 0
                ? <span key={ idx }>{ text }</span>
                : <span className="highlight" key={ idx }>{ text }</span>
        );
    };
    renderDescription(description) {
        const chunks = description.split("_");
        if (chunks.length % 2 === 0) {
            return description;
        }
        return chunks.map(this.formatDescriptionChunk)
    }
    render() {
        let acrobatic_overrides = this.getAcrobaticOverrides();
        if (acrobatic_overrides.length === 0) {
            return null;
        }
        return (
            <div className="acrobatic-overrides">
                <div className="spacer" />
                <h3>{ _("tablet.head_judge.acrobatic_overrides") }</h3>
                <table><tbody>
                    { acrobatic_overrides.map(acro =>
                        <tr key={ acro.idx }>
                            <td className="w-5 idx">
                                { acro.idx }
                            </td>
                            <td className="description">
                                { this.renderDescription(acro.acrobatic.description) }
                            </td>
                            <td className="w-10 original-score">
                                { acro.acrobatic.original_score.toFixed(1) }
                            </td>
                            <td className="w-5 arrow">
                                →
                            </td>
                            <td className="w-10 score">
                                { acro.acrobatic.score.toFixed(1) }
                            </td>
                        </tr>
                    ) }
                </tbody></table>
            </div>
        );
    }
}