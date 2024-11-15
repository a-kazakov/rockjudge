import { React } from "HostModules";

import PT from "prop-types";
import GeneralEditor from "./GeneralEditor";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import ReductionBlock from "./GeneralEditor/blocks/ReductionBlock";
import checkSS from "common/checkSS";

export default class DanceScore extends React.Component {
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
                <ReductionBlock nullable field="fw_woman" label="FW" />
                <ReductionBlock nullable field="fw_man" label="FM" />
                <NumberBlock nullable field="dance_figs" label="DF" step={step} />
                <NumberBlock nullable field="composition" label="C" step={step} />
                <NumberBlock field="small_mistakes" label="SM" max={100} />
                <NumberBlock field="big_mistakes" label="BM" max={100} />
            </GeneralEditor>
        );
    }
}
