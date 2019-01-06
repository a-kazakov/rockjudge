import { React } from "HostModules";

import PT from "prop-types";
import GeneralEditor from "./GeneralEditor";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";

export default class JazzGroupScore extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        scoreData: PT.object.isRequired,
        scoringSystemName: PT.string.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    render() {
        return (
            <GeneralEditor
                initialData={this.props.scoreData}
                readOnly={this.props.readOnly}
                onDiscard={this.props.onDiscard}
                onSubmit={this.props.onSubmit}
            >
                <NumberBlock
                    nullable
                    field="tech_execution"
                    label="Te"
                    max={10}
                    step={0.5}
                />
                <NumberBlock
                    nullable
                    field="tech_control"
                    label="Tc"
                    max={10}
                    step={0.5}
                />
                <NumberBlock
                    nullable
                    field="tech_style"
                    label="Ts"
                    max={10}
                    step={0.5}
                />
                <NumberBlock
                    nullable
                    field="group_sync"
                    label="Gs"
                    max={10}
                    step={0.5}
                />
                <NumberBlock
                    nullable
                    field="group_similarity"
                    label="Gs"
                    max={10}
                    step={0.5}
                />
                <NumberBlock
                    nullable
                    field="group_position"
                    label="Gp"
                    max={10}
                    step={0.5}
                />
                <NumberBlock
                    nullable
                    field="choreography_art"
                    label="Ca"
                    max={10}
                    step={0.5}
                />
                <NumberBlock
                    nullable
                    field="choreography_performance"
                    label="Cp"
                    max={10}
                    step={0.5}
                />
                <NumberBlock
                    nullable
                    field="choreography_complexity"
                    label="Cc"
                    max={10}
                    step={0.5}
                />
                <NumberBlock
                    nullable
                    field="impression"
                    label="I"
                    max={10}
                    step={0.5}
                />
            </GeneralEditor>
        );
    }
}
