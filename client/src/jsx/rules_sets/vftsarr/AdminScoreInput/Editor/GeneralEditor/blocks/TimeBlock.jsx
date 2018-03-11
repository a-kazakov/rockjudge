import range from "common/range";
import SelectorBlock from "./SelectorBlock";

export default class TimeBlock extends SelectorBlock {
    static formatTime(value) {
        const m = Math.floor(value / 60);
        const s = Math.floor(value % 60);
        const ss = s < 10 ? `0${s}` : s.toString();
        return `${m}:${ss}`;
    }

    getOptions() {
        let result = [];
        if (this.props.nullable) {
            result.push([null, "—"]);
        }
        return result.concat(range(600).map(x => [x, this.constructor.formatTime(x)]));
    }
}
