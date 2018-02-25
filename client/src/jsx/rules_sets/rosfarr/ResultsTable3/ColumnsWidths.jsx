export default class ColumnsWidths {
    constructor(n_judges) {
        this.judge_width = Math.round(70 / n_judges);
        this.place_width = 7
        this.info_width = 100 - this.judge_width * n_judges - this.place_width;
    }
    genPlaceStyle() {
        return {
            width: `${this.place_width}%`,
        }
    }
    genInfoStyle() {
        return {
            width: `${this.info_width}%`,
            textAlign: "left",
        }
    }
    genJudgeStyle() {
        return {
            width: `${this.judge_width}%`,
        }
    }
}
