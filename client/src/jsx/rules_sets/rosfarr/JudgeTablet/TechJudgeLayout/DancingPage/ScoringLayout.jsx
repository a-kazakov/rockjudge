import _ from "l10n";

import SelectorInput from "tablet_ui/SelectorInput";
import IntegerInput from "tablet_ui/IntegerInput";

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
            }).isRequired,
            score: PT.shape({
                confirmed: PT.bool.isRequired,
                id: PT.number.isRequired,
                data: PT.object.isRequired,
            }),
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handleScoreChange = (part, value) => {
        let data = {};
        data[part] = value;
        this.props.onScoreUpdate(this.props.score.id, data);
    }

    handleJumpStepsChange = (value) => this.handleScoreChange("jump_steps", value);
    handleTimeChange = (value) => this.handleScoreChange("time", value);
    handleCardChange = (value) => this.handleScoreChange("card", value);

    genOnScoreUpdate(score_part) {
        return (new_value) => this.onScoreUpdate(score_part, new_value);
    }

    renderScoringLayout() {
        if (this.props.score === null) {
            return (
                <div className="not-performing">
                    { _("tablet.global.no_score") }
                </div>
            );
        }
        const score = this.props.score.data;
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
                    readOnly={ this.props.score.confirmed }
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
                        readOnly={ this.props.score.confirmed }
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
                        readOnly={ this.props.score.confirmed }
                        scoreId={ this.props.score.id }
                        value={ score.raw_data.time }
                        onChange={ this.handleTimeChange }
                    />
                </div>
                <div className="clearfix" />
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
