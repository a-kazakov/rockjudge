import { React } from "HostModules";

import PT from "prop-types";
import GeneralEditor from "./GeneralEditor";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";

export default class Final3dScore extends React.Component {
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
                <NumberBlock nullable field="tech" label="T" max={10} min={1} />
                <NumberBlock nullable field="composition" label="C" max={10} min={1} />
                <NumberBlock nullable field="art" label="A" max={10} min={1} />
                <NumberBlock nullable field="place" label="P" max={50} min={1} />
            </GeneralEditor>
        );
    }
}
