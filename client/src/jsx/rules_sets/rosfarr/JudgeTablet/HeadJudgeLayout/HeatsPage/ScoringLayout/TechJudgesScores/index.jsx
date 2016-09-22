import _ from "l10n";

import CacheMixin from "common/CacheMixin";

import Item from "./Item";

export default class TechJudgeScore extends CacheMixin(React.Component) {
    get tech_judges() {
        return this.fetchFromCache("tech_judges", () =>
            this.props.disciplineJudges.filter(dj => dj.role === "tech_judge"));
    }
    get tech_judges_index() {
        return this.fetchFromCache("tech_judges_index", () => {
            let result = new Map();
            for (const dj of this.tech_judges) {
                result.set(dj.id, dj);
            }
            return result;
        });
    }
    get scores() {
        return this.fetchFromCache("scores", () =>
            this.props.run.scores.filter(score => this.tech_judges_index.has(score.discipline_judge_id)));
    }
    getStyle() {
        return {
            maxWidth: `${150 * this.tech_judges.length}px`,
        };
    }
    renderNumbers() {
        return this.scores.map(score => {
            const dj = this.tech_judges_index.get(score.discipline_judge_id);
            return (
                <td key={ score.id }>
                    { dj.judge.number }
                </td>
            );
        });
    }
    renderScores() {
        return this.scores.map(score => {
            const dj = this.tech_judges_index.get(score.discipline_judge_id);
            return (
                <Item
                    judge={ dj.judge }
                    key={ dj.id }
                    score={ score }
                />
            );
        });
    }
    render() {
        return (
            <div>
                <h3>{ _("tablet.head_judge.tech_judge_scores") }</h3>
                <table className="tech-judge-scores" style={ this.getStyle() }><tbody>
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
