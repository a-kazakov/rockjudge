import RunScoresWrapper from "./RunScoresWrapper";

export default class TourScoresWrapper {
    constructor(tour, results) {
        this.run_wrappers = tour.runs.map((run) => new RunScoresWrapper(run, tour.discipline_judges));
        this.discipline_judges = tour.discipline.discipline_judges;
        this.discipline_judges_by_roles = {};
        this.discipline_judges.forEach(function(dj, idx) {
            let arr = this.discipline_judges_by_roles[dj.role] || [];
            arr.push({
                idx: idx,
                discipline_judge: dj,
            });
            this.discipline_judges_by_roles[dj.role] = arr;
        }.bind(this));
        if (results) {
            let results_by_run_ids = {};
            results.forEach((res) =>
                results_by_run_ids[res.run_id] = res);
            this.run_wrappers.forEach((w) =>
                w.results_info = results_by_run_ids[w.run.id]);
            this.run_wrappers.sort((a, b) => a.results_info.place - b.results_info.place);
        }
    }
    getDisciplineJudgesByRoles(...args) {
        if (args.length === 1) {
            return this.discipline_judges_by_roles[args[0]]
                ? this.discipline_judges_by_roles[args[0]].map((b) => b.discipline_judge)
                : [];
        }
        let res = [];
        for (let i = 0; i < args.length; ++i) {
            res = res.concat(this.discipline_judges_by_roles[args[i]] || []);
        }
        res.sort((a, b) => a.idx - b.idx);
        return res.map((b) => b.discipline_judge);
    }
    getScoresTableByRoles(...args) {
        const discipline_judge_ids = this.getDisciplineJudgesByRoles(...args).map((dj) => dj.id);
        return this.run_wrappers.map((w) => w.getScoresByJudgeIds(discipline_judge_ids));
    }
    getResultsInfo() {
        return this.run_wrappers.map((w) => w.results_info);
    }
    getRuns() {
        return this.run_wrappers.map((w) => w.run);
    }
}
