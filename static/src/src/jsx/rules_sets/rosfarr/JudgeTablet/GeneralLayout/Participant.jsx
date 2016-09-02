import _ from "l10n";

import CacheMixin from "common/CacheMixin";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";
import TotalScore from "JudgeTablet/TotalScore";

export default class Participant extends CacheMixin(React.Component) {
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
    canConfirm() {
        const score_data = this.score.data.raw_data;
        for (const key of Object.keys(score_data)) {
            const value = score_data[key];
            if (Array.isArray(value)) {
                if (value.filter(a => a === null).length !== 0) {
                    return false;
                }
            } else {
                if (value === null) {
                    return false;
                }
            }
        }
        return true;
    }
    onConfirm = () => {
        this.props.onScoreConfirm(this.score.id);
    }
    onScoreUpdate = (key, value) => {
        if (this.score.confirmed) {
            return;
        }
        let score_data = {};
        score_data[key] = value;
        this.props.onScoreUpdate(this.score.id, score_data);
    }
    onAcroReductionUpdate = (acro_idx, value) => {
        if (this.score.confirmed) {
            return;
        }
        let reductions = this.score.data.raw_data.reductions.map(() => null);
        reductions[acro_idx] = value;
        this.onScoreUpdate("reductions", reductions);
    }
    renderScoringLayout() {
        const score_data = this.score.data.raw_data;
        const class_name = this.score.confirmed ? "read-only" : "";
        const ScoringComponent = this.props.layoutClass;
        return (
            <div className={ class_name }>
                <ScoringComponent
                    scoreData={ score_data }
                    onScoreUpdate={ this.onScoreUpdate }
                />
                <TotalScore
                    score={ this.score }
                />
                <ConfirmationButton
                    confirmed={ this.score.confirmed }
                    canConfirm={ this.canConfirm() }
                    onConfirm={ this.onConfirm }
                />
            </div>
        );
    }
    renderNotPerformingMessage() {
        return (
            <div className="not-performing">
                { _("tablet.global.not_performing") }
            </div>
        );
    }
    render() {
        const header = _("global.phrases.participant_n",
            this.props.run.participant.number,
            this.props.run.participant.name,
            this.props.run.participant.sportsmen.length);
        return (
            <div className="layout-participant">
                <h2>
                    { header }
                </h2>
                { this.props.run.performed
                    ? this.renderScoringLayout()
                    : this.renderNotPerformingMessage() }
            </div>
        );
    }
}
