import { React } from "HostModules";

import getScoringType from "common/getScoringType";
import PT from "prop-types";
import AcroScore from "./AcroScore";
import DanceExtendedScore from "./DanceExtendedScore";
import DanceScore from "./DanceScore";
import FormationScore from "./FormationScore";
import FormationSimplifiedScore from "./FormationSimplifiedScore";
import SoloScore from "./SoloScore";
import SoloFinalScore from "./SoloFinalScore";
import TechScore from "./TechScore";

export default class VerboseJudgeScore extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        score: PT.object.isRequired,
        scoreResult: PT.object.isRequired,
        showScore: PT.bool,
    };

    static get defaultProps() {
        return {
            showScore: true,
        };
    }

    render() {
        if (!this.props.showScore) {
            return <p className="text-center">&mdash;</p>;
        }
        const tour = this.props.score.run.tour;
        let ScoreComponent = null;
        const scoring_type = getScoringType(
            this.props.disciplineJudge.role,
            tour.results.scoring_system_name,
        );
        switch (scoring_type) {
            case "dance":
                ScoreComponent = DanceScore;
                break;
            case "dance_extended":
                ScoreComponent = DanceExtendedScore;
                break;
            case "acro":
                ScoreComponent = AcroScore;
                break;
            case "formation":
                ScoreComponent = FormationScore;
                break;
            case "formation_simplified":
                ScoreComponent = FormationSimplifiedScore;
                break;
            case "solo":
                ScoreComponent = SoloScore;
                break;
            case "solo_final_spb":
                ScoreComponent = SoloFinalScore;
                break;
            case "tech":
                ScoreComponent = TechScore;
                break;
            default:
                return (
                    <p className="text-center">
                        {this.props.scoreResult.total_score_str}
                    </p>
                );
        }
        const props = {
            score: this.props.score,
            scoreResult: this.props.scoreResult,
            tour: tour,
        };
        return <ScoreComponent {...props} />;
    }
}
