import { React } from "HostModules";
import PT from "prop-types";
import _ from "l10n";
import NumberSelectorInput from "tablet_ui/NumberSelectorInput";

export default class ScoringSection extends React.Component {
    static propTypes = {
        max: PT.number,
        part: PT.string.isRequired,
        readOnly: PT.bool.isRequired,
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };
    static defaultProps = {
        max: 10,
    };

    handleChange = value => {
        this.props.onScoreUpdate(this.props.part, value);
    };
    render() {
        const { max, score, part, readOnly } = this.props;
        return (
            <>
                <h3>{_(`score_parts.components.long.${part}`)}</h3>
                <NumberSelectorInput
                    compact
                    highlightLower
                    jumbo
                    max={max}
                    min={0}
                    readOnly={readOnly}
                    step={0.5}
                    style="one-line"
                    value={score.data[part]}
                    onChange={this.handleChange}
                />
            </>
        );
    }
}
