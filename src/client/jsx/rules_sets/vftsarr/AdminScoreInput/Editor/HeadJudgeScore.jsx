import { React } from "HostModules";

import GeneralEditor from "./GeneralEditor";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import SelectorBlock from "./GeneralEditor/blocks/SelectorBlock";
import CardReasonsBlock from "./GeneralEditor/blocks/CardReasonsBlock";
import PT from "prop-types";

export default class HeadJudgeScore extends React.Component {
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
                <NumberBlock field="bonus" label="B" max={10} min={-10} />
                <SelectorBlock
                    nullable
                    field="card"
                    label="C"
                    options={[["OK", "OK"], ["YC", "YC"], ["RC", "RC"]]}
                />
                <CardReasonsBlock
                    field="card_reasons"
                    label="Card reasons"
                    scoringSystemName={this.props.scoringSystemName}
                />
            </GeneralEditor>
        );
    }
}
