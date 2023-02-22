import { React } from "HostModules";

import PT from "prop-types";
import checkSS from "common/checkSS";
import GeneralEditor from "./GeneralEditor";
import CardReasonsBlock from "./GeneralEditor/blocks/CardReasonsBlock";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import SelectorBlock from "./GeneralEditor/blocks/SelectorBlock";
import TimeBlock from "./GeneralEditor/blocks/TimeBlock";

export default class TechJudgeScore extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        scoreData: PT.object.isRequired,
        scoringSystemName: PT.string.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    renderFallDown() {
        if (!checkSS(this.props.scoringSystemName, "acro")) {
            return null;
        }
        return <NumberBlock field="fall_down" label="FD" max={100} />;
    }
    renderUndercount() {
        if (!checkSS(this.props.scoringSystemName, "formation")) {
            return null;
        }
        return <NumberBlock field="undercount" label="UC" max={100} />;
    }
    render() {
        return (
            <GeneralEditor
                initialData={this.props.scoreData}
                readOnly={this.props.readOnly}
                onDiscard={this.props.onDiscard}
                onSubmit={this.props.onSubmit}
            >
                <NumberBlock field="jump_steps" label="BS" max={100} />
                <TimeBlock nullable field="time" label="T" />
                {this.renderFallDown()}
                {this.renderUndercount()}
                <NumberBlock field="restarts" label="RS" max={100} />
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
