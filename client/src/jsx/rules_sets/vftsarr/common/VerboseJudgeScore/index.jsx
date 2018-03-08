import getScoringType from "common/getScoringType";

import AcroScore from "./AcroScore";
import DanceScore from "./DanceScore";
import SoloScore from "./SoloScore";
import FormationAcroScore from "./FormationAcroScore";
import FormationScore from "./FormationScore";
import TechScore from "./TechScore";

export default class VerboseJudgeScore extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            additionalData: PT.object,
            disciplineJudge: PT.object.isRequired,
            showScore: PT.bool.isRequired,
            score: PT.shape({
                data: PT.shape({
                    total_score: PT.oneOfType([
                        PT.number.isRequired,
                        PT.string.isRequired,
                    ]).isRequired,
                }).isRequired,
            }).isRequired,
            run: PT.object.isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }
    static get defaultProps() {
        return {
            showScore: true,
        }
    }

    render() {
        if (!this.props.showScore) {
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
        case "solo":
            ScoreComponent = SoloScore;
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
            run: this.props.run,
            score: this.props.score,
            additionalData: this.props.additionalData,
            scoringType: scoring_type,
            tour: this.props.tour,
        };
        return (
            <ScoreComponent { ...props } />
        );
    }
}

