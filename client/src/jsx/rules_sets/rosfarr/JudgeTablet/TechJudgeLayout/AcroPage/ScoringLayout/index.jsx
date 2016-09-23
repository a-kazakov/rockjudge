import _ from "l10n";

import { Api } from "HostModules";

import CacheMixin from "common/CacheMixin";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";

import Element from "./Element";

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
    onAcroOverride = (acro_idx, value) => {
        if (this.score.confirmed) {
            return;
        }
        Api("acrobatic_override.set", {
            run_id: this.props.run.id,
            acrobatic_idx: acro_idx,
            score: value,
        }).send();
    }
    genOnAcroOverride(acro_idx) {
        return (new_value) => this.onAcroOverride(acro_idx, new_value);
    }
    renderContent() {
        return this.props.run.acrobatics.map((acro, idx) =>
            <Element
                readOnly={ this.score.confirmed }
                key={ idx }
                acro={ acro }
                onAcroOverride={ this.genOnAcroOverride(idx) }
            />
        );
    }
    render() {
        const header = _("global.phrases.participant_n",
            this.props.run.participant.number,
            this.props.run.participant.name,
            this.props.run.participant.sportsmen.length);
        if (this.score === null) {
            return (
                <div />
            );
        }
        return (
            <div className="layout-participant">
                <h2>{ header }</h2>
                { this.renderContent() }
                <ConfirmationButton
                    confirmed={ this.score.confirmed }
                    onConfirm={ this.onConfirm }
                />
            </div>
        );
    }
}
