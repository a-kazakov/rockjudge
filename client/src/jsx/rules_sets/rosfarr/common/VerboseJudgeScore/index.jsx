import getScoringType from "common/getScoringType";

import AcroScore from "./AcroScore";
import DanceScore from "./DanceScore";
import FormationAcroScore from "./FormationAcroScore";
import FormationScore from "./FormationScore";
import TechScore from "./TechScore";

export default class VerboseJudgeScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            additionalData: PT.object,
            disciplineJudge: PT.object.isRequired,
            performed: PT.bool.isRequired,
            score: PT.shape({
                data: PT.shape({
                    total_score: PT.number.isRequired,
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }

    render() {
        if (!this.props.performed) {
            return (
                <p className="text-center">
                    &mdash;
                </p>
            );
        }
        let ScoreComponent = null;
        const scoring_type = getScoringType(this.props.disciplineJudge, this.props.tour.scoring_system_name);
        switch (scoring_type) {
        case "dance":
        case "dance_halved":
            ScoreComponent = DanceScore;
            break;
        case "acro":
            ScoreComponent = AcroScore;
            break;
        case "formation":
            ScoreComponent = FormationScore;
            break;
        case "formation_acro":
            ScoreComponent = FormationAcroScore;
            break;
        case "tech":
            ScoreComponent = TechScore;
            break;
        default:
            return (
                <p className="text-center">
                    { this.props.score.data.total_score.toFixed(2) }
                </p>
            );
        }
        const props = {
            score: this.props.score,
            additionalData: this.props.additionalData,
            scoringType: scoring_type,
        };
        return (
            <ScoreComponent { ...props } />
        );
    }
}

VerboseJudgeScore.displayName = "rules_sets_rosfarr_common_VerboseJudgeScore";
