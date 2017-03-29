import _ from "l10n";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";

export default class Participant extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            layoutClass: PT.func.isRequired,
            run: PT.shape({
                status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
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
            onScoreUpdate: PT.func.isRequired,
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

    handleConfirm = () => {
        this.props.onScoreConfirm(this.score.id);
    }
    handleScoreUpdate = (key, value) => {
        if (this.score.confirmed) {
            return;
        }
        let score_data = {};
        score_data[key] = value;
        this.props.onScoreUpdate(this.score.id, score_data);
    }
    handleAcroReductionUpdate = (acro_idx, value) => {
        if (this.score.confirmed) {
            return;
        }
        let reductions = this.score.data.raw_data.reductions.map(() => null);
        reductions[acro_idx] = value;
        this.onScoreUpdate("reductions", reductions);
    }

    renderScoringLayout() {
        const score_data = this.score.data.raw_data;
        const ScoringComponent = this.props.layoutClass;
        if (this.score === null) {
            return (
                <div />
            );
        }
        return (
            <div>
                <ScoringComponent
                    readOnly={ this.score.confirmed }
                    score={ this.score }
                    scoreData={ score_data }
                    onScoreUpdate={ this.handleScoreUpdate }
                />
                <ConfirmationButton
                    canConfirm={ this.canConfirm() }
                    confirmed={ this.score.confirmed }
                    onConfirm={ this.handleConfirm }
                />
            </div>
        );
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
