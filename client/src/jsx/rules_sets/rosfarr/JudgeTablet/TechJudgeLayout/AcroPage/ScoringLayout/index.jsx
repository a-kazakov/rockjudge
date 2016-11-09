import _ from "l10n";

import { Api } from "HostModules";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";

import Element from "./Element";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            run: PT.shape({
                id: PT.number.isRequired,
                acrobatics: PT.arrayOf(
                    PT.object.isRequired,
                ).isRequired,
                participant: PT.shape({
                    number: PT.number.isRequired,
                    name: PT.string.isRequired,
                    sportsmen: PT.array.isRequired,
                }).isRequired,
                scores: PT.arrayOf(
                    PT.shape({
                        discipline_judge_id: PT.number.isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
            onScoreConfirm: PT.func.isRequired,
        };
    }

    getScore() {
        for (const score of this.props.run.scores) {
            if (score.discipline_judge_id === this.props.disciplineJudge.id) {
                return score;
            }
        }
        return null;
    }
    setupCache() {
        this.score = this.getScore();
    }

    handleConfirm = () => {
        this.props.onScoreConfirm(this.score.id);
    }
    handleAcroOverride = (acro_idx, value) => {
        if (this.score.confirmed) {
            return;
        }
        Api("acrobatic_override.set", {
            run_id: this.props.run.id,
            acrobatic_idx: acro_idx,
            score: value,
        }).send();
    }

    renderContent() {
        return this.props.run.acrobatics.map((acro, idx) =>
            <Element
                acro={ acro }
                idx={ idx }
                key={ idx }
                readOnly={ this.score.confirmed }
                onAcroOverride={ this.handleAcroOverride }
            />
        );
    }
    render() {
        this.setupCache();
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
                    onConfirm={ this.handleConfirm }
                />
            </div>
        );
    }
}
