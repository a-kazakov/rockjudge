import { React } from "HostModules";

import PT from "prop-types";
import checkSS from "common/checkSS";
import GeneralEditor from "./GeneralEditor";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import ReductionBlock from "./GeneralEditor/blocks/ReductionBlock";

export default class SoloScore extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        scoreData: PT.object.isRequired,
        scoringSystemName: PT.string.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    render() {
        const step = checkSS(this.props.scoringSystemName, "rough") ? 1 : 0.5;
        return (
            <GeneralEditor
                initialData={this.props.scoreData}
                readOnly={this.props.readOnly}
                onDiscard={this.props.onDiscard}
                onSubmit={this.props.onSubmit}
            >
                <ReductionBlock nullable field="fw" label="FW" />
                <NumberBlock nullable field="dance_figs" label="DF" step={step} />
                <NumberBlock nullable field="composition" label="DF" step={step} />
                <NumberBlock field="small_mistakes" label="SM" max={100} />
                <NumberBlock field="big_mistakes" label="BM" max={100} />
            </GeneralEditor>
        );
    }
}
