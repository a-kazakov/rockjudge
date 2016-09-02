import _ from "l10n";

import CacheMixin from "common/CacheMixin";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";

import {
    onTouchOrClick,
    TabletIntegerInput,
    TabletIntegerSelectInput,
    TabletSelectorInput,
    TabletPoint5SelectInput,
    TabletAcroOverrideInput,
    StopWatch,
    Slider,
} from "ui/tablet_components";

export default class ScoringLayout extends CacheMixin(React.Component) {
    get score() {
        return this.fetchFromCache("score", () => {
            for (const score of this.props.run.scores) {
                if (score.discipline_judge_id === this.props.disciplineJudge.id) {
                    return score;
                }
            }
            return null;
        });
    }
    onConfirm = () => {
        this.props.onScoreConfirm(this.score.id);
    }
    onScoreUpdate = (part, value) => {
        let data = {};
        data[part] = value;
        this.props.onScoreUpdate(this.score.id, data);
    }
    genOnScoreUpdate(score_part) {
        return (new_value) => this.onScoreUpdate(score_part, new_value);
    }
    render() {
        let score = this.score.data;
        const class_name = this.score.confirmed ? "layout-participant read-only" : "layout-participant";
        const header = _("global.phrases.participant_n",
            this.props.run.participant.number,
            this.props.run.participant.name,
            this.props.run.participant.sportsmen.length);
        return (
            <div className={ class_name }>
                <h2>{ header }</h2>
                <h3>{ _("tablet.tech_judge.jump_steps") }</h3>
                <TabletIntegerInput
                    sendDeltas
                    value={ score.raw_data.jump_steps }
                    onValueUpdate={ this.genOnScoreUpdate("jump_steps") } />
                <div className="spacer"></div>
                <h3>{ _("tablet.tech_judge.timing") }</h3>
                <StopWatch score_id={ this.score.id } />
                <TabletSelectorInput
                    choices={ [[true, "X"], [null, "-"], [false, "OK"]] }
                    value={ score.raw_data.timing_violation }
                    onValueUpdate={ this.genOnScoreUpdate("timing_violation") } />
                <ConfirmationButton
                    confirmed={ this.score.confirmed }
                    onConfirm={ this.onConfirm } />
            </div>
        );
    }
}
