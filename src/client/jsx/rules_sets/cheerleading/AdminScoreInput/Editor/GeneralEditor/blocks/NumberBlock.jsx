import PT from "prop-types";
import range from "common/range";
import SelectorBlock from "./SelectorBlock";
import floatToFixed from "common/floatToFixed";

export default class NumberBlock extends SelectorBlock {
    static get propTypes() {
        const prev = super.constructor.propTypes ?? {};
        return Object.assign({}, prev, {
            min: PT.number,
            max: PT.number,
            step: PT.number,
        });
    }
    static get defaultProps() {
        const prev = super.constructor.defaultProps ?? {};
        return Object.assign({}, prev, {
            min: 0,
            max: 10,
            step: 1,
        });
    }
    getOptions() {
        let result = [];
        if (this.props.nullable) {
            result.push([null, "—"]);
        }
        return result.concat(
            range(
                this.props.min,
                this.props.max + this.props.step - 1e-5,
                this.props.step,
            ).map(x => [x, floatToFixed(x, 2)]),
        );
    }
}
