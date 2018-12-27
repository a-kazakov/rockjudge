import { React } from "HostModules";

import PT from "prop-types";
import VerboseJudgeScore from "common/VerboseJudgeScore";

export default class Item extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        score: PT.object,
        scoreResult: PT.shape({
            is_valid: PT.bool.isRequired,
            total_score_str: PT.string.isRequired,
            extra_data: PT.object.isRequired,
        }),
        showVerbose: PT.bool.isRequired,
    };

    renderVerboseScore() {
        const { score, scoreResult, disciplineJudge } = this.props;
        if (!this.props.showVerbose || score == null) {
            return null;
        }
        if (
            ["skating.qualification_simple", "skating.final_simple"].includes(
                score.run.tour.scoring_system_name,
            )
        ) {
            return null;
        }
        return (
            <div className="verbose-score">
                <div className="judge-name">{disciplineJudge.judge.name}</div>
                <VerboseJudgeScore
                    disciplineJudge={disciplineJudge}
                    score={score}
                    scoreResult={scoreResult}
                />
                <div className="triangle" />
            </div>
        );
    }
    render() {
        const { score, scoreResult } = this.props;
        const confirmed = score?.confirmed;
        return (
            <td className={confirmed ? "confirmed" : ""}>
                {score != null ? scoreResult.total_score_str : "—"}
                {this.renderVerboseScore()}
            </td>
        );
    }
}
