import _ from "l10n";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";
import Elements from "./Elements";
import Mistakes from "./Mistakes";

export default class Participant extends React.Component {
    constructor(props) {
        super(props);
        this._cache = {};
    }
    componentWillReceiveProps(next_props) {
        this._cache = {};
    }
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
        return this.score.data.raw_data.reductions.filter(a => a === null).length === 0;
    }
    onConfirm = () => {
        this.props.onScoreConfirm(this.score.id);
    }
    fetchFromCache(key, getter) {
        if (!(key in this._cache)) {
            this._cache[key] = getter();
        }
        return this._cache[key];
    }
    onScoreUpdate = (key, value) => {
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
        return (
            <div className={ class_name }>
                <Elements
                    reductions={ score_data.reductions }
                    onAcroReductionUpdate={ this.onAcroReductionUpdate } />
                <Mistakes
                    mistakes={ score_data.mistakes }
                    onScoreUpdate={ this.onScoreUpdate } />
                <ConfirmationButton
                    confirmed={ this.score.confirmed }
                    canConfirm={ this.canConfirm() }
                    onConfirm={ this.onConfirm } />
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
            <div className="participant">
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
