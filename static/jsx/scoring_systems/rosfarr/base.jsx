class RunScoresWrapper {
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
        return discipline_judge_ids.map(((dj_id) => this.scores_by_discipline_judge_id[dj_id]).bind(this));
    }
}

class TourScoresWrapper {
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
    getDisciplineJudgesByRoles() {
        if (arguments.length == 1) {
            return this.discipline_judges_by_roles[arguments[0]].map((b) => b.discipline_judge);
        }
        let res = [];
        for (let i = 0; i < arguments.length; ++i) {
            res = res.concat(this.discipline_judges_by_roles[arguments[i]] || []);
        }
        res.sort((a, b) => a.idx - b.idx);
        return res.map((b) => b.discipline_judge);
    }
    getScoresTableByRoles() {
        let discipline_judge_ids = this.getDisciplineJudgesByRoles(...arguments).map((dj) => dj.id);
        return this.run_wrappers.map((w) => w.getScoresByJudgeIds(discipline_judge_ids));
    }
    getResultsInfo() {
        return this.run_wrappers.map((w) => w.results_info);
    }
    getRuns() {
        return this.run_wrappers.map((w) => w.run);
    }
}

function getParticipantDisplay(participant) {
    if (participant.formation_name !== "") {
        return <p>{ participant.formation_name }</p>;
    }
    return participant.sportsmen.map((s, idx) => <p key={ idx }>{ s.last_name + " " + s.first_name }</p>);
}

function getScoringType(discipline_judge, scoring_system_name) {
    switch (discipline_judge.role) {
    case "dance_judge":
        switch (scoring_system_name) {
        case "rosfarr.formation":
            return "formation";
        default:
            return "dance";
        }
    case "acro_judge":
        switch (scoring_system_name) {
        case "rosfarr.am_final_fw":
            return "dance";
        default:
            return "acro";
        }
    case "tech_judge":
        return "tech";
    case "head_judge":
        return "head";
    }
}
