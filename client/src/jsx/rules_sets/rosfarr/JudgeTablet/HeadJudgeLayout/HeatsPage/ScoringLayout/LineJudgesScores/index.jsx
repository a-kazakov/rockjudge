import _ from "l10n";

import CacheMixin from "common/CacheMixin";

import Item from "./Item";

export default class LineJudgeScore extends CacheMixin(React.Component) {
    constructor(props) {
        super(props);
        this.state = {
            verboseIdx: null,
        };
    }

    get line_judges() {
        return this.fetchFromCache("line_judges", () =>
            this.props.disciplineJudges.filter(dj => dj.role === "dance_judge" || dj.role === "acro_judge"));
    }
    get line_judges_index() {
        return this.fetchFromCache("line_judges_index", () => {
            let result = new Map();
            for (const dj of this.line_judges) {
                result.set(dj.id, dj);
            }
            return result;
        });
    }
    get scores() {
        return this.fetchFromCache("scores", () =>
            this.props.run.scores.filter(score => this.line_judges_index.has(score.discipline_judge_id)));
    }

    makeScoresRowRef = (ref) => this._scores_row = ref;

    handleShowVerboseScore = (event) => {
        event.preventDefault();
        const position_obj = event.touches ? event.touches[0] : event;
        const target = this._scores_row;
        const rect = target.getBoundingClientRect();
        const offset = position_obj.clientX - rect.left;
        const selected_idx = Math.floor(offset / (target.offsetWidth / this.scores.length));
        this.setState({
            verboseIdx: selected_idx,
        });
    }
    handleHideVerboseScore = () => this.setState({ verboseIdx: null });

    renderNumbers() {
        return this.scores.map(score => {
            const dj = this.line_judges_index.get(score.discipline_judge_id);
            return (
                <td key={ score.id }>
                    { `${dj.judge.number }${ dj.role === "acro_judge" ? " (A)" : "" }` }
                </td>
            );
        });
    }
    renderScores() {
        return this.scores.map((score, idx) => {
            const dj = this.line_judges_index.get(score.discipline_judge_id);
            return (
                <Item
                    disciplineJudge={ dj }
                    judge={ dj.judge }
                    key={ dj.id }
                    score={ score }
                    showVerbose={ this.state.verboseIdx === idx }
                    tour={ this.props.tour }
                />
            );
        });
    }
    render() {
        return (
            <div>
                <h3>{ _("tablet.head_judge.dance_judge_scores") }</h3>
                <table className="line-judge-scores"><tbody>
                    <tr className="numbers">
                        { this.renderNumbers() }
                    </tr>
                    <tr
                        className="scores"
                        ref={ this.makeScoresRowRef }
                        onMouseMove={ this.handleShowVerboseScore }
                        onMouseOut={ this.handleHideVerboseScore }
                        onTouchCancel={ this.handleHideVerboseScore }
                        onTouchEnd={ this.handleHideVerboseScore }
                        onTouchMove={ this.handleShowVerboseScore }
                        onTouchStart={ this.handleShowVerboseScore }
                    >
                        { this.renderScores() }
                    </tr>
                </tbody></table>
            </div>
        );
    }
}
