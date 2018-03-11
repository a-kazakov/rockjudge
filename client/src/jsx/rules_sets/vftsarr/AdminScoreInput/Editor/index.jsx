import _ from "l10n";

import getScoringType from "common/getScoringType";

import ConfirmationButton from "./ConfirmationButton";
import AcroScore from "./AcroScore";
import DanceScore from "./DanceScore";
import FormationScore from "./FormationScore";
import SimplifiedScore from "./SimplifiedScore";
import SoloScore from "./SoloScore";
import HeadJudgeScore from "./HeadJudgeScore";
import TechJudgeScore from "./TechJudgeScore";

export default class Editor extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.object.isRequired,
            readOnly: PT.bool.isRequired,
            score: PT.object.isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
            onConfirmationToggle: PT.func.isRequired,
            onDiscard: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }

    handleDiscardClick = (event) => {
        event.stopPropagation();
        this.props.onDiscard();
    };

    renderWrongJudgeRoleMessage() {
        return (
            <div className="score-editor">
                <div className="error-message">
                    { _("admin.messages.wrong_judge_role") }
                </div>
                <div className="buttons">
                    <button
                        className="discard-button"
                        type="button"
                        onClick={ this.handleDiscardClick }
                    >
                        { _("global.buttons.discard") }
                    </button>
                </div>
            </div>
        );
    }
    renderBody(scoring_type) {
        const score_props = {
            score:     this.props.score,
            tour:      this.props.tour,
            readOnly:  this.props.readOnly,
            onSubmit:  this.props.onSubmit,
            onDiscard: this.props.onDiscard,
        };
        switch (scoring_type) {
        case "acro":
            return (
                <AcroScore { ...score_props } />
            );
        case "dance":
            return (
                <DanceScore { ...score_props } />
            );
        case "formation":
        case "formation_acro":
            return (
                <FormationScore { ...score_props } />
            );
        case "simplified":
            return (
                <SimplifiedScore { ...score_props } />
            );
        case "solo":
            return (
                <SoloScore { ...score_props } />
            );
        case "head":
            return (
                <HeadJudgeScore { ...score_props } />
            );
        case "tech":
            return (
                <TechJudgeScore { ...score_props } />
            );
        case null:
            return this.renderWrongJudgeRoleMessage();
        default:
            console.error(`Unknown scoring type: ${scoring_type}`);
        }
    }
    renderConfirmationButton(scoring_type) {
        if (this.props.readOnly || scoring_type === "head") {
            return null;
        }
        return (
            <ConfirmationButton
                confirmed={ this.props.score.confirmed }
                onConfirmationToggle={ this.props.onConfirmationToggle }
            />
        )
    }
    render() {
        const scoring_type = getScoringType(this.props.disciplineJudge, this.props.tour.scoring_system_name);
        return (
            <div className="AdminScoreInput">
                { this.renderBody(scoring_type) }
                { this.renderConfirmationButton(scoring_type) }
            </div>
        );
    }
}

