import { React } from "HostModules";

import PT from "prop-types";
import GeneralEditor from "./GeneralEditor";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";

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
                <NumberBlock field="points" label="P" max={40} />
            </GeneralEditor>
        );
    }
}
