import {React} from "HostModules";

import PT from "prop-types";
import VerboseJudgeScore from "common/VerboseJudgeScore";

export default class Item extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        score: PT.object.isRequired,
        scoreData: PT.shape({
            is_valid: PT.bool.isRequired,
            total_score_str: PT.string.isRequired,
            extra_data: PT.object.isRequired,
        }).isRequired,
        showVerbose: PT.bool.isRequired,
    };

    renderVerboseScore() {
        if (!this.props.showVerbose) {
            return null;
        }
        if (
            [
                "skating.qualification_simple",
                "skating.final_simple",
            ].includes(this.props.score.run.tour.scoring_system_name)
        ) {
            return null;
        }
        return (
            <div className="verbose-score">
                <div className="judge-name">
                    { this.props.disciplineJudge.judge.name }
                </div>
                <VerboseJudgeScore
                    disciplineJudge={ this.props.disciplineJudge }
                    score={ this.props.score }
                    scoreData={ this.props.scoreData }
                />
                <div className="triangle" />
            </div>
        );
    }
    render() {
        const confirmed = this.props.score && this.props.score.confirmed;
        return (
            <td className={ confirmed ? "confirmed" : "" }>
                { this.props.score
                    ? this.props.scoreData.total_score_str
                    : "—" }
                { this.renderVerboseScore() }
            </td>
        );
    }
}
