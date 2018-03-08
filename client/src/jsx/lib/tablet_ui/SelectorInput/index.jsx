import makeClassName from "common/makeClassName";

import Item from "./Item";

export default class SelectorInput extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            choices: PT.arrayOf(
                PT.arrayOf(
                    PT.oneOfType([
                        PT.string.isRequired,
                        PT.number.isRequired,
                        PT.bool.isRequired,
                    ]),
                ),
            ).isRequired,
            compact: PT.bool.isRequired,
            highlightLower: PT.bool.isRequired,
            jumbo: PT.bool,
            multiple: PT.bool.isRequired,
            readOnly: PT.bool,
            rowSize: PT.number,
            style: PT.oneOf(["grid", "one-line", "two-lines"]),
            value: PT.oneOfType([
                PT.string.isRequired,
                PT.number.isRequired,
                PT.bool.isRequired,
            ]),
            onChange: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            compact: false,
            highlightLower: false,
            jumbo: false,
            multiple: false,
            readOnly: false,
            rowSize: 10,
            style: "one-line",
        };
    }

    isSelected(val) {
        if (!this.props.multiple) {
            return this.props.value === val;
        }
        if (this.props.value instanceof Set) {
            return this.props.value.has(val);
        }
        return this.props.value.includes(val)
    }
    isValueEmpty() {
        if (!this.props.multiple) {
            return this.props.value === null;
        }
        if (this.props.value instanceof Set) {
            return this.props.value.size === 0;
        }
        return this.props.value.length === 0;
    }

    getButtonsCount() {
        if (this.props.style === "grid") {
            return this.props.rowSize;
        }
        return this.props.choices.length;
    }

    getClassName() {
        return makeClassName({
            "SelectorInput": true,
            "compact": this.props.compact,
            "jumbo": this.props.jumbo,
            "one-row": this.props.style !== "two-lines",
            "two-rows": this.props.style === "two-lines",
            "selected": !this.props.multiple && !this.isValueEmpty(),
            [`n-${this.getButtonsCount()}`]: true,
        });
    }
    renderRows() {
        let result = [];
        let selected_idx = null;
        for (let idx = 0; idx < this.props.choices.length; ++idx) {
            const [value, text, style] = this.props.choices[idx];
            if (this.isSelected(value)) {
                selected_idx = idx;
            }
        }
        for (let idx = 0; idx < this.props.choices.length; ++idx) {
            if (
                this.props.style === "grid" &&
                idx !== 0 &&
                idx % this.props.rowSize === 0
            ) {
                result.push(
                    <br key={ `br${idx}` } />
                );
            }
            const [value, text, style] = this.props.choices[idx];
            result.push(
                <Item
                    active={ this.props.highlightLower
                        ? selected_idx !== null && idx <= selected_idx
                        : idx === selected_idx
                    }
                    key={ idx }
                    readOnly={ this.props.readOnly }
                    style={ style }
                    text={ text }
                    value={ value }
                    onClick={ this.props.onChange }
                />
            );
        }
        return result;
    }
    render() {
        return (
            <div className={ this.getClassName() }>
                { this.renderRows() }
            </div>
        );
    }
}
