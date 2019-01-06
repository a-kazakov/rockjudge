import { React } from "HostModules";

import PT from "prop-types";
import GeneralEditor from "./GeneralEditor";
import NumberBlock from "./GeneralEditor/blocks/NumberBlock";
import SelectorBlock from "./GeneralEditor/blocks/SelectorBlock";
import TimeBlock from "./GeneralEditor/blocks/TimeBlock";
import _ from "l10n";
import CheckboxBlock from "AdminScoreInput/Editor/GeneralEditor/blocks/CheckboxBlock";

const VIOLATIONS_OPTIONS = [
    "music_violated",
    "entry_exit_violated",
    "dress_violated",
    "cheer_block_violated",
    "accessories_violated",
].map(p => [p, _(`score_parts.components.medium.${p}`)]);

const TIME_PENALTY_OPTIONS = [[0, "0"], [-1, "-1"], [-3, "-3"]];

export default class TechJudgeScore extends React.Component {
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
                <NumberBlock field="complexity_violations" label="CS" max={100} />
                <NumberBlock field="other_penalties" label="O" max={100} />
                <TimeBlock nullable field="time" label="T" />
                <SelectorBlock
                    field="time_penalty"
                    label="TP"
                    options={TIME_PENALTY_OPTIONS}
                />
                {VIOLATIONS_OPTIONS.map(([field, label]) => (
                    <CheckboxBlock field={field} label={label} />
                ))}
            </GeneralEditor>
        );
    }
}
