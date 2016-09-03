import CacheMixin from "common/CacheMixin";

import Item from "./Item";

export default class TechJudgesScores extends CacheMixin(React.Component) {
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
    render() {
        return (
            <div>
                { this.scores.map(score =>
                    <Item
                        key={ score.id }
                        score={ score }
                        judge={ this.tech_judges_index.get(score.discipline_judge_id).judge }
                    />
                )}
            </div>
        );
    }
}
