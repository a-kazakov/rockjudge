import {React} from "HostModules";

import getScoringType from "common/getScoringType";
import _ from "l10n";
import PT from "prop-types";
import AcroScore from "./AcroScore";
import ConfirmationButton from "./ConfirmationButton";
import DanceExtendedScore from "./DanceExtendedScore";
import DanceScore from "./DanceScore";
import FormationScore from "./FormationScore";
import FormationSimplifiedScore from "./FormationSimplifiedScore";
import HeadJudgeScore from "./HeadJudgeScore";
import SimplifiedScore from "./SimplifiedScore";
import SoloScore from "./SoloScore";
import TechJudgeScore from "./TechJudgeScore";

export default class Editor extends React.Component {
    static propTypes = {
        confirmed: PT.bool.isRequired,
        disciplineJudgeRole: PT.string.isRequired,
        readOnly: PT.bool.isRequired,
        scoreData: PT.object.isRequired,
        scoringSystemName: PT.string.isRequired,
        onConfirmationToggle: PT.func.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

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
            readOnly: this.props.readOnly,
            scoreData: this.props.scoreData,
            scoringSystemName: this.props.scoringSystemName,
            onSubmit:  this.props.onSubmit,
            onDiscard: this.props.onDiscard,
        };
        switch (scoring_type) {
        case "acro":
            return (
                <AcroScore { ...score_props } />
            );
        case "dance_extended":
            return (
                <DanceExtendedScore { ...score_props } />
            );
        case "dance":
            return (
                <DanceScore { ...score_props } />
            );
        case "formation_simplified":
            return (
                <FormationSimplifiedScore { ...score_props } />
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
                confirmed={ this.props.confirmed }
                onConfirmationToggle={ this.props.onConfirmationToggle }
            />
        )
    }
    render() {
        const scoring_type = getScoringType(
            this.props.disciplineJudgeRole,
            this.props.scoringSystemName,
        );
        return (
            <div className="AdminScoreInput">
                { this.renderBody(scoring_type) }
                { this.renderConfirmationButton(scoring_type) }
            </div>
        );
    }
}

