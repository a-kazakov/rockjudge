import getScoringType from "common/getScoringType";

import ConfirmationButton from "./ConfirmationButton";
import AcroScore from "./AcroScore";
import DanceScore from "./DanceScore";
import DanceHalvedScore from "./DanceHalvedScore";
import FormationScore from "./FormationScore";
import FormationAcroScore from "./FormationAcroScore";
import SimplifiedScore from "./SimplifiedScore";
import HeadJudgeScore from "./HeadJudgeScore";
import HeadJudgeFormationScore from "./HeadJudgeFormationScore";
import TechJudgeScore from "./TechJudgeScore";

export default class Editor extends React.Component {
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
    renderBody(scoring_type) {
        if (
            scoring_type === "head" &&
            ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) >= 0
        ) {
            scoring_type = "head_formation";
        }
        const score_props = {
            score:     this.props.score,
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
        case "dance_halved":
            return (
                <DanceHalvedScore { ...score_props } />
            );
        case "formation":
            return (
                <FormationScore { ...score_props } />
            );
        case "formation_acro":
            return (
                <FormationAcroScore { ...score_props } />
            );
        case "simplified":
            return (
                <SimplifiedScore { ...score_props } />
            );
        case "head":
            return (
                <HeadJudgeScore { ...score_props } />
            );
        case "head_formation":
            return (
                <HeadJudgeFormationScore { ...score_props } />
            );
        case "tech":
            return (
                <TechJudgeScore { ...score_props } />
            );
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

Editor.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor";
