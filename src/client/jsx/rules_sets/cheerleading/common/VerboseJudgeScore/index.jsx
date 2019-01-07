import { React } from "HostModules";

import getScoringType from "common/getScoringType";
import PT from "prop-types";
import JazzGroupScore from "./JazzGroupScore";
import CoupleScore from "./CoupleScore";
import FreestyleGroupScore from "./FreestyleGroupScore";
import HiphopGroupScore from "./HiphopGroupScore";

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
            case "jazz_group":
                ScoreComponent = JazzGroupScore;
                break;
            case "freestyle_group":
                ScoreComponent = FreestyleGroupScore;
                break;
            case "hiphop_group":
                ScoreComponent = HiphopGroupScore;
                break;
            case "couple":
                ScoreComponent = CoupleScore;
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
