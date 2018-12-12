import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import Item from "./Item";

export default class LineJudgeScore extends React.Component {
    static propTypes = {
        disciplineJudges: PT.arrayOf(PT.object.isRequired).isRequired,
        run: PT.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            verboseIdx: null,
        };
    }

    setupCache() {
        this.line_judges = this.props.disciplineJudges.filter(dj =>
            ["dance_judge", "acro_judge"].includes(dj.role),
        );
        this.line_judges_index = new Map(this.line_judges.map(dj => [dj.id, dj]));
        this.scores = this.props.run.scores.filter(score =>
            this.line_judges_index.has(score.discipline_judge_id),
        );
    }

    makeScoresRowRef = ref => (this._scores_row = ref);

    handleShowVerboseScore = event => {
        event.preventDefault();
        const position_obj = event.touches ? event.touches[0] : event;
        const target = this._scores_row;
        const rect = target.getBoundingClientRect();
        const offset = position_obj.clientX - rect.left;
        const selected_idx = Math.floor(
            offset / (target.offsetWidth / this.scores.length),
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
        return this.scores.map(score => {
            const dj = this.line_judges_index.get(score.discipline_judge_id);
            return <td key={score.id}>{dj.judge.number}</td>;
        });
    }
    renderScores() {
        const scores_results = this.props.run.tour.results.scores_results;
        return this.scores.map((score, idx) => {
            const dj = this.line_judges_index.get(score.discipline_judge_id);
            return (
                <Item
                    disciplineJudge={dj}
                    key={dj.id}
                    score={score}
                    scoreData={scores_results[score.id]}
                    showVerbose={this.state.verboseIdx === idx}
                />
            );
        });
    }
    render() {
        this.setupCache();
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
