import { React } from "HostModules";
import PT from "prop-types";
import _ from "l10n";
import NumberSelectorInput from "tablet_ui/NumberSelectorInput";

export default class ScoringSection extends React.Component {
    static propTypes = {
        group: PT.string,
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

    maybeRenderPrimaryHeader() {
        const { group } = this.props;
        if (group == null) {
            return null;
        }
        return <h3 className="primary">{_(`score_parts.groups.long.${group}`)}</h3>;
    }
    render() {
        const { max, score, part, readOnly, group } = this.props;
        return (
            <>
                {this.maybeRenderPrimaryHeader()}
                <h3 className={group != null ? "secondary" : ""}>
                    {_(`score_parts.components.long.${part}`)}
                </h3>
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
