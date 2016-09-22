import _ from "l10n";

import CacheMixin from "common/CacheMixin";
import SelectorInput from "tablet_ui/SelectorInput";
import IntegerInput from "tablet_ui/IntegerInput";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";

import StopWatch from "./StopWatch";

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

    handleConfirmation = () => {
        this.props.onScoreConfirm(this.score.id);
    }
    handleScoreChange = (part, value) => {
        let data = {};
        data[part] = value;
        this.props.onScoreUpdate(this.score.id, data);
    }

    handleJumpStepsChange = (value) => this.handleScoreChange("jump_steps", value);
    handleTimingViolationChange = (value) => this.handleScoreChange("timing_violation", value);
    handlePenaltyChange = (value) => this.handleScoreChange("penalty", value);

    genOnScoreUpdate(score_part) {
        return (new_value) => this.onScoreUpdate(score_part, new_value);
    }
    render() {
        const score = this.score.data;
        const header = _("global.phrases.participant_n",
            this.props.run.participant.number,
            this.props.run.participant.name,
            this.props.run.participant.sportsmen.length);
        const penalties = ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) >= 0
            ? [
                [0,    _("tablet.tech_judge.ok")],
                [-5,   _("tablet.tech_judge.form_yellow_card")],
                [-15,  _("tablet.tech_judge.form_red_card")],
            ]
            : [
                [0,    _("tablet.tech_judge.ok")],
                [-3,   _("tablet.tech_judge.yellow_card")],
                [-30,  _("tablet.tech_judge.red_card")],
                [-100, _("tablet.tech_judge.black_card")],
            ];
        return (
            <div className="layout-participant">
                <h2>
                    { header }
                </h2>
                <h3>
                    { _("tablet.head_judge.penalty_type") }
                </h3>
                <SelectorInput
                    choices={ penalties }
                    value={ score.raw_data.penalty }
                    onChange={ this.handlePenaltyChange }
                />
                <div className="spacer" />
                <h3>{ _("tablet.tech_judge.jump_steps") }</h3>
                <IntegerInput
                    sendDeltas
                    readOnly={ this.score.confirmed }
                    value={ score.raw_data.jump_steps }
                    onChange={ this.handleJumpStepsChange }
                />
                <div className="spacer" />
                <h3>
                    { _("tablet.tech_judge.timing") }
                </h3>
                <StopWatch
                    scoreId={ this.score.id }
                />
                <SelectorInput
                    choices={ [[true, "X"], [null, "-"], [false, "OK"]] }
                    readOnly={ this.score.confirmed }
                    value={ score.raw_data.timing_violation }
                    onChange={ this.handleTimingViolationChange }
                />
                <div className="spacer" />
                <ConfirmationButton
                    confirmed={ this.score.confirmed }
                    onConfirm={ this.handleConfirmation }
                />
            </div>
        );
    }
}
