import { React } from "HostModules";

import _ from "l10n";

import PT from "prop-types";
import GeneralEditor from "./GeneralEditor";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";

export default class HiphopGroupScore extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        scoreData: PT.object.isRequired,
        scoringSystemName: PT.string.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    renderBlock(part) {
        return (
            <NumberBlock
                nullable
                field={part}
                label={_(`score_parts.components.short.${part}`)}
                max={10}
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
                {this.renderBlock("tech_power")}
                {this.renderBlock("tech_control")}
                {this.renderBlock("tech_execution_sport")}
                {this.renderBlock("group_sync")}
                {this.renderBlock("group_similarity")}
                {this.renderBlock("group_position")}
                {this.renderBlock("choreography_art")}
                {this.renderBlock("choreography_performance_effects")}
                {this.renderBlock("choreography_complexity")}
                {this.renderBlock("impression")}
            </GeneralEditor>
        );
    }
}
