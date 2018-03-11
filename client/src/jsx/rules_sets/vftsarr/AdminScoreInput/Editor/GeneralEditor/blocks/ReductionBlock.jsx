import SelectorBlock from "./SelectorBlock";

const REDUCTIONS = [100, 75, 50, 35, 25, 15, 10, 5, 0];

export default class ReductionBlock extends SelectorBlock {
    static get propTypes() {
        const PT = React.PropTypes;
        const prev = super.constructor.propTypes || {};
        return Object.assign({}, prev, {
            nullable: PT.bool,
        });
    }
    static get defaultProps() {
        const prev = super.constructor.defaultProps || {};
        return Object.assign({}, prev, {
            nullable: false,
        });
    }

    getOptions() {
        let result = [];
        if (this.props.nullable) {
            result.push([null, "—"]);
        }
        return result.concat(REDUCTIONS.map(x => [x, `-${x}%`]));
    }
}