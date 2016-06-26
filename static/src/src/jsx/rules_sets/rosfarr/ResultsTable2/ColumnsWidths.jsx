export default class ColumnsWidths {
    constructor(n_judges) {
        this.judge_width = Math.round(55 / n_judges);
        this.total_score_width = 14;
        this.place_width = 6;
        this.number_width = 3;
        this.name_width = 100 - this.judge_width * n_judges -
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
