import makeClassName from "common/makeClassName";

import Item from "./Item";

export default class SelectorInput extends React.Component {
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
            rowSize: 10,
            style: "one-line",
        };
    }

    getButtonsCount() {
        if (this.props.style === "grid") {
            return this.props.rowSize;
        }
        return this.props.choices.length;
    }

    getClassName() {
        return makeClassName({
            "scoring-layout": true,
            "selector-layout": this.props.style !== "two-lines",
            "selector-layout-2rows": this.props.style === "two-lines",
            "selected": this.props.value !== null,
            [`n-${this.getButtonsCount()}`]: true,
        });
    }
    renderRows() {
        let result = [];
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
            const [value, text] = this.props.choices[idx];
            result.push(
                <Item
                    active={ value === this.props.value }
                    key={ idx }
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

SelectorInput.displayName = "tablet_ui_SelectorInput";
