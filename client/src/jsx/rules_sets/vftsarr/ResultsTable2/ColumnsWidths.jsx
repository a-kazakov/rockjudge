export default class ColumnsWidths {
    constructor(n_judges, has_total_score) {
        this.judge_width = Math.round((has_total_score ? 55 : 65) / (n_judges + 1));
        this.total_score_width = has_total_score ? 14 : 0;
        this.place_width = 6;
        this.number_width = 4;
        this.name_width = 100 - this.judge_width * (n_judges + 1) -
            this.total_score_width - this.place_width - this.number_width;
    }
    genPlaceStyle() {
        return {
            width: `${this.place_width}%`,
        }
    }
    genNumberStyle() {
        return {
            width: `${this.number_width}%`,
        }
    }
    genNameStyle() {
        return {
            width: `${this.name_width}%`,
        }
    }
    genTotalScoreStyle() {
        return {
            width: `${this.total_score_width}%`,
        }
    }
    genJudgeStyle() {
        return {
            width: `${this.judge_width}%`,
        }
    }
}
