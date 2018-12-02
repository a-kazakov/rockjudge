import React from "react";

import PT from "prop-types";
import SelectorInput from "./SelectorInput";

export default class NumberSelectorInput extends React.Component {
    static propTypes = {
        decimalSize: PT.number,
        max: PT.number.isRequired,
        min: PT.number.isRequired,
        step: PT.number,
    };
    static get defaultProps() {
        return {
            step: 1,
            decimalSize: 0,
        };
    }

    makeChoices(min, max, step, decimal_size) {
        let result = [];
        for (let value = min; value <= max; value += step) {
            let text = value.toFixed(decimal_size);
            const tail = value - Math.floor(value);
            if (decimal_size === 0 && Math.abs(tail - 0.5) < 0.01) {
                text = "½";
            }
            result.push([value, text]);
        }
        return result;
    }

    render() {
        const { min, max, step, decimalSize, ...other_props } = this.props;
        return (
            <SelectorInput
                choices={ this.makeChoices(min, max, step, decimalSize) }
                { ...other_props }
            />
        )
    }
}
