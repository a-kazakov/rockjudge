import _ from "l10n";

import SelectorInput from "tablet_ui/SelectorInput";
import IntegerInput from "tablet_ui/IntegerInput";

import ConfirmationButton from "JudgeTablet/ConfirmationButton";

import PreviousCards from "JudgeTablet/HeadJudgeLayout/HeatsPage/ScoringLayout/PreviousCards";

import StopWatch from "./StopWatch";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
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
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
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

    handleConfirmation = () => {
        this.props.onScoreConfirm(this.score.id);
    }
    handleScoreChange = (part, value) => {
        let data = {};
        data[part] = value;
        this.props.onScoreUpdate(this.score.id, data);
    }

    handleJumpStepsChange = (value) => this.handleScoreChange("jump_steps", value);
    handleTimeChange = (value) => this.handleScoreChange("time", value);
    handleCardChange = (value) => this.handleScoreChange("card", value);

    genOnScoreUpdate(score_part) {
        return (new_value) => this.onScoreUpdate(score_part, new_value);
    }

    renderScoringLayout() {
        const score = this.score.data;
        const cards = ["rosfarr.formation", "rosfarr.formation_acro"].includes(this.props.tour.scoring_system_name)
            ? [
                [null,  "—"],
                ["OK",  _("tablet.tech_judge.ok")],
                ["YC",  _("tablet.tech_judge.form_yellow_card")],
                ["RC",  _("tablet.tech_judge.form_red_card")],
            ]
            : [
                [null,  "—"],
                ["OK",  _("tablet.tech_judge.ok")],
                ["YC",  _("tablet.tech_judge.yellow_card")],
                ["RC",  _("tablet.tech_judge.red_card")],
            ];
        return (
            <div>
                <h3>
                    { _("tablet.tech_judge.card_type") }
                </h3>
                <SelectorInput
                    choices={ cards }
                    readOnly={ this.score.confirmed }
                    value={ score.raw_data.card }
                    onChange={ this.handleCardChange }
                />
                <PreviousCards
                    run={ this.props.run }
                />
                <div className="spacer" />
                <div className="jump-steps">
                    <h3>{ _("tablet.tech_judge.jump_steps") }</h3>
                    <IntegerInput
                        sendDeltas
                        readOnly={ this.score.confirmed }
                        value={ score.raw_data.jump_steps }
                        onChange={ this.handleJumpStepsChange }
                    />
                    <div className="spacer" />
                </div>
                <div className="timing">
                    <h3>
                        { _("tablet.tech_judge.timing") }
                    </h3>
                    <StopWatch
                        readOnly={ this.score.confirmed }
                        scoreId={ this.score.id }
                        value={ score.raw_data.time }
                        onChange={ this.handleTimeChange }
                    />
                </div>
                <div className="spacer clearfix" />
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
