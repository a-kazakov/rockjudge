import _ from "l10n";

import CacheMixin from "common/CacheMixin";

import Item from "./Item";

export default class LineJudgeScore extends CacheMixin(React.Component) {
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
        return this.scores.map(score => {
            const dj = this.line_judges_index.get(score.discipline_judge_id);
            return (
                <Item
                    key={ dj.id }
                    judge={ dj.judge }
                    score={ score }
                />
            );
        });
    }
    render() {
        return (
            <div>
                <h3>{ _("tablet.head_judge.dance_judge_scores") }</h3>
                <table className="dance-judge-scores"><tbody>
                    <tr className="numbers">
                        { this.renderNumbers() }
                    </tr>
                    <tr className="scores">
                        { this.renderScores() }
                    </tr>
                </tbody></table>
            </div>
        );
    }
}
