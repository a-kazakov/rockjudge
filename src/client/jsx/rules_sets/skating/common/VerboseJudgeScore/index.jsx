import { React } from "HostModules";

import PT from "prop-types";
import getScoringType from "common/getScoringType";
import Final3dScoreCell from "./Final3dScoreCell";

export default class VerboseJudgeScore extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        score: PT.object,
        scoreResult: PT.shape({
            is_valid: PT.bool.isRequired,
            total_score_str: PT.string.isRequired,
            extra_data: PT.object.isRequired,
        }),
        showScore: PT.bool,
    };
    static get defaultProps() {
        return {
            showScore: true,
        };
    }

    getRenderingComponent() {
        const scoring_type = getScoringType(
            this.props.disciplineJudge.role,
            this.props.score.run.tour.scoring_system_name,
        );
        switch (scoring_type) {
            case "final_3d":
                return Final3dScoreCell;
            default:
                return null;
        }
    }
    render() {
        if (!this.props.showScore) {
            return <p className="text-center">&mdash;</p>;
        }
        const ScoreComponent = this.getRenderingComponent();
        if (ScoreComponent == null) {
            return (
                <p className="text-center">{this.props.scoreResult.total_score_str}</p>
            );
        }
        return (
            <ScoreComponent
                score={this.props.score}
                scoreResult={this.props.scoreResult}
            />
        );
    }
}
