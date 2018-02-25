export default class RunScoresWrapper {
    constructor(run, discipline_judges) {
        this.run = run;
        this.discipline_judges = discipline_judges;
        this.scores_by_discipline_judge_id = {}
        run.scores.forEach(function(score) {
            let dj_id = score.discipline_judge_id;
            this.scores_by_discipline_judge_id[dj_id] = score;
        }.bind(this));
    }
    getScoresByJudgeIds(discipline_judge_ids) {
        return discipline_judge_ids.map(dj_id => this.scores_by_discipline_judge_id[dj_id]);
    }
}
