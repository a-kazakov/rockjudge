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
                status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
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

    handleConfirmation = () => {
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

    renderScoringLayout() {
        return (
            <div>
                { this.props.run.acrobatics.map((acro, idx) =>
                    <Element
                        acro={ acro }
                        idx={ idx }
                        key={ idx }
                        readOnly={ this.score.confirmed }
                        onAcroOverride={ this.handleAcroOverride }
                    />
                ) }
                <ConfirmationButton
                    confirmed={ this.score.confirmed }
                    onConfirm={ this.handleConfirmation }
                />
            </div>
        )
    }
    renderNotOkStatusMessage() {
        return (
            <div className="not-performing">
                { this.props.run.status === "NP"
                    ? _("tablet.global.not_performing")
                    : _("tablet.global.disqualified") }
            </div>
        );
    }
    render() {
        this.setupCache();
        if (this.score === null) {
            return (
                <div />
            );
        }
        const header = _("global.phrases.participant_n",
            this.props.run.participant.number,
            this.props.run.participant.name,
            this.props.run.participant.sportsmen.length);
        return (
            <div className="layout-participant">
                <h2>
                    { header }
                </h2>
                { this.props.run.status === "OK"
                    ? this.renderScoringLayout()
                    : this.renderNotOkStatusMessage() }
            </div>
        );
    }
}
