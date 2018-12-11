import { React } from "HostModules";

import VerboseJudgeScore from "common/VerboseJudgeScore";
import PT from "prop-types";
import InfoCell from "./InfoCell";

export default class Row extends React.Component {
    static propTypes = {
        lineDisciplineJudges: PT.arrayOf(PT.object.isRequired).isRequired,
        row: PT.shape({
            run: PT.object.isRequired,
            run_result: PT.object.isRequired,
            scores: PT.object.isRequired,
        }).isRequired,
        tour: PT.object.isRequired,
    };

    renderScore(discipline_judge, score_data) {
        if (!score_data) {
            return <p className="text-center">&mdash;</p>;
        }
        return (
            <VerboseJudgeScore
                disciplineJudge={discipline_judge}
                score={score_data.score}
                scoreResult={score_data.result}
                showScore={this.props.row.run.status === "OK"}
                tour={this.props.tour}
            />
        );
    }
    renderJudgesScores() {
        const scores_map = this.props.row.scores;
        return this.props.lineDisciplineJudges.map((dj, idx) => (
            <td key={dj.id || `I${idx}`}>{this.renderScore(dj, scores_map[dj.id])}</td>
        ));
    }
    render() {
        return (
            <tr>
                <td className="place" style={{ borderRight: "1pt solid black" }}>
                    <p className="text-center">{this.props.row.run_result.place}</p>
                </td>
                <InfoCell row={this.props.row} tour={this.props.tour} />
                {this.renderJudgesScores()}
            </tr>
        );
    }
}
