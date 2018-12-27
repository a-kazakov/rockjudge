import { React } from "HostModules";

import PT from "prop-types";
import LineJudgeScoreView from "./LineJudgeScoreView";

export default class LineJudgeScore extends React.Component {
    static propTypes = {
        disciplineJudges: PT.arrayOf(PT.object.isRequired).isRequired,
        run: PT.object.isRequired,
    };

    getJudgeScoresData() {
        const scores_index = new Map(
            this.props.run.scores.map(score => [score.discipline_judge_id, score]),
        );
        const { scores_results } = this.props.run.tour.results;
        return this.props.disciplineJudges
            .filter(dj => dj.role === "dance_judge")
            .map(disciplineJudge => {
                const score = scores_index.get(disciplineJudge.id);
                const scoreResult = score == null ? null : scores_results[score.id];
                return { disciplineJudge, score, scoreResult };
            });
    }

    render() {
        return <LineJudgeScoreView scoresData={this.getJudgeScoresData()} />;
    }
}
