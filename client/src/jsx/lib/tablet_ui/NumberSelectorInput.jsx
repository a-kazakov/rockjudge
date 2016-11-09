import SelectorInput from "./SelectorInput";

export default class NumberSelectorInput extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            max: PT.number.isRequired,
            min: PT.number.isRequired,
            step: PT.number,
            decimalSize: PT.number,
        };
    }
    static get defaultProps() {
        return {
            step: 1,
            decimalSize: 0,
        };
    }

    makeChoices(min, max, step, decimal_size) {
        let result = [];
        for (let value = min; value <= max; value += step) {
            const text = value.toFixed(decimal_size);
            result.push([Number(text), text]);
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

NumberSelectorInput.displayName = "tablet_ui_NumberSelectorInput";
