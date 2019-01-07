import { React } from "HostModules";

import _ from "l10n";

import PT from "prop-types";
import GeneralEditor from "./GeneralEditor";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";

export default class ClStuntScore extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        scoreData: PT.object.isRequired,
        scoringSystemName: PT.string.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    renderBlock(part, max = 10) {
        return (
            <NumberBlock
                nullable
                field={part}
                label={_(`score_parts.components.short.${part}`)}
                max={max}
                step={0.5}
            />
        );
    }
    render() {
        return (
            <GeneralEditor
                initialData={this.props.scoreData}
                readOnly={this.props.readOnly}
                onDiscard={this.props.onDiscard}
                onSubmit={this.props.onSubmit}
            >
                {this.renderBlock("stunt_tech", 30)}
                {this.renderBlock("stunt_complexity", 25)}
                {this.renderBlock("stunt_shape", 20)}
                {this.renderBlock("presentation_transitions", 15)}
                {this.renderBlock("presentation_complexity", 10)}
            </GeneralEditor>
        );
    }
}
