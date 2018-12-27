import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";
import NumberSelectorInput from "tablet_ui/NumberSelectorInput";

export default class ScoringLayout extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    handleTechChange = value => {
        this.props.onScoreUpdate("tech", value);
    };
    handleCompositionChange = value => {
        this.props.onScoreUpdate("composition", value);
    };
    handleArtChange = value => {
        this.props.onScoreUpdate("art", value);
    };

    render() {
        return (
            <div>
                <h3>{_("tablet.dance_judge.tech")}</h3>
                <NumberSelectorInput
                    jumbo
                    max={10}
                    min={1}
                    readOnly={this.props.readOnly}
                    style="one-line"
                    value={this.props.score.data.tech}
                    onChange={this.handleTechChange}
                />
                <h3>{_("tablet.dance_judge.composition")}</h3>
                <NumberSelectorInput
                    jumbo
                    max={10}
                    min={1}
                    readOnly={this.props.readOnly}
                    style="one-line"
                    value={this.props.score.data.composition}
                    onChange={this.handleCompositionChange}
                />
                <h3>{_("tablet.dance_judge.art")}</h3>
                <NumberSelectorInput
                    jumbo
                    max={10}
                    min={1}
                    readOnly={this.props.readOnly}
                    style="one-line"
                    value={this.props.score.data.art}
                    onChange={this.handleArtChange}
                />
            </div>
        );
    }
}
