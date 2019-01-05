import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import Item from "./Item";

export default class LineJudgeScoreView extends React.Component {
    static propTypes = {
        scoresData: PT.arrayOf(
            PT.shape({
                disciplineJudge: PT.object.isRequired,
                score: PT.object,
                scoreResult: PT.object,
            }).isRequired,
        ).isRequired,
    };

    state = {
        verboseIdx: null,
    };

    makeScoresRowRef = ref => (this._scores_row = ref);

    handleShowVerboseScore = event => {
        event.preventDefault();
        const position_obj = event.touches ? event.touches[0] : event;
        const target = this._scores_row;
        const rect = target.getBoundingClientRect();
        const offset = position_obj.clientX - rect.left;
        const selected_idx = Math.floor(
            offset / (target.offsetWidth / this.props.scoresData.length),
        );
        this.setState({
            verboseIdx: selected_idx,
        });
    };

    handleHideVerboseScore = event => {
        event.preventDefault();
        this.setState({ verboseIdx: null });
    };

    renderNumbers() {
        return this.props.scoresData.map(({ disciplineJudge }) => (
            <td key={disciplineJudge.id}>{disciplineJudge.judge.number}</td>
        ));
    }
    renderScores() {
        return this.props.scoresData.map(
            ({ disciplineJudge, score, scoreResult }, idx) => {
                return (
                    <Item
                        disciplineJudge={disciplineJudge}
                        key={disciplineJudge.id}
                        score={score}
                        scoreResult={scoreResult}
                        showVerbose={this.state.verboseIdx === idx}
                    />
                );
            },
        );
    }
    render() {
        return (
            <div>
                <h3>{_("tablet.head_judge.dance_judge_scores")}</h3>
                <table className="line-judge-scores">
                    <tbody>
                        <tr className="numbers">{this.renderNumbers()}</tr>
                        <tr
                            className="scores"
                            ref={this.makeScoresRowRef}
                            onMouseMove={this.handleShowVerboseScore}
                            onMouseOut={this.handleHideVerboseScore}
                            onMouseUp={this.handleHideVerboseScore}
                            onTouchCancel={this.handleHideVerboseScore}
                            onTouchEnd={this.handleHideVerboseScore}
                            onTouchMove={this.handleShowVerboseScore}
                            onTouchStart={this.handleShowVerboseScore}
                        >
                            {this.renderScores()}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
