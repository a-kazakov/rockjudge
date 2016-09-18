import onTouchOrClick from "./onTouchOrClick";

export default class IntegerInput extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            sendDeltas: PT.bool,
            value: PT.number.isRequired,
            onChange: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            sendDeltas: false,
        }
    }

    handleMinus = () => {
        if (this.props.sendDeltas) {
            this.props.onChange({"delta": -1});
        } else {
            this.props.onChange(this.props.value - 1);
        }
    }
    handlePlus = () => {
        if (this.props.sendDeltas) {
            this.props.onChange({"delta": 1});
        } else {
            this.props.onChange(this.props.value + 1);
        }
    }

    render() {
        return (
            <div className="tablet-integer-input">
                <button
                    className="tbtn btn-minus"
                    { ...onTouchOrClick(this.handleMinus) }
                >
                    &minus;
                </button>
                <div className="value">
                    { this.props.value }
                </div>
                <button
                    className="tbtn btn-plus"
                    { ...onTouchOrClick(this.handlePlus) }
                >
                    +
                </button>
            </div>
        )
    }
}

IntegerInput.displayName = "tablet_ui_IntegerInput";
