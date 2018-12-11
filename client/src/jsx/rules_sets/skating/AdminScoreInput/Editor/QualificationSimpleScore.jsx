import { React } from "HostModules";

import PT from "prop-types";
import GeneralEditor from "./GeneralEditor";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import SelectorBlock from "./GeneralEditor/blocks/SelectorBlock";

export default class SimplifiedScore extends React.Component {
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
                <SelectorBlock
                    field="cross"
                    label="X"
                    options={[[true, "X"], [false, "–"]]}
                />
                <NumberBlock nullable field="note_number" label="N" max={5} min={1} />
            </GeneralEditor>
        );
    }
}
