export default class ColumnsWidths {
    constructor(n_judges, has_total_score, landscape=false) {
        this.name_width = landscape ? 22 : 16;
        this.total_score_width =
            has_total_score
                ? landscape
                    ? 10
                    : 14
                : 0;
        this.place_width = landscape ? 4 : 6;
        this.number_width = landscape ? 3 : 4;
        this.data_width = (100 - (
            this.name_width +
            this.total_score_width +
            this.place_width +
            this.number_width
        )) / (n_judges + 1);
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
            width: `${this.data_width}%`,
        }
    }
}
