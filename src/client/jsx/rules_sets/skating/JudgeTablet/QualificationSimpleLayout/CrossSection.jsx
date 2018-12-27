import { React } from "HostModules";

import PT from "prop-types";

import SelectorInput from "tablet_ui/SelectorInput";

const SELECTOR_INPUT_CHOICES = [[true, "X", "active-green"]];

export default class CrossSection extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    handleCrossChange = () => {
        this.props.onScoreUpdate(this.props.score.id, {
            cross: !this.props.score.data.cross,
        });
    };

    render() {
        const { score, readOnly } = this.props;
        if (score == null || score.run.status !== "OK") {
            return null;
        }
        return (
            <SelectorInput
                jumbo
                choices={SELECTOR_INPUT_CHOICES}
                readOnly={readOnly}
                style="one-line"
                value={score.data.cross /* intentional || operator */ || null}
                onChange={this.handleCrossChange}
            />
        );
    }
}
