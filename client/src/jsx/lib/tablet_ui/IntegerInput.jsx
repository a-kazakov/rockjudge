import makeClassName from "common/makeClassName";

import onTouchOrClick from "./onTouchOrClick";

export default class IntegerInput extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool,
            sendDeltas: PT.bool,
            value: PT.number.isRequired,
            onChange: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            readOnly: false,
            sendDeltas: false,
        }
    }

    handleMinus = () => {
        if (this.props.readOnly) {
            return;
        }
        if (this.props.sendDeltas) {
            this.props.onChange({"delta": -1});
        } else {
            this.props.onChange(this.props.value - 1);
        }
    }
    handlePlus = () => {
        if (this.props.readOnly) {
            return;
        }
        if (this.props.sendDeltas) {
            this.props.onChange({"delta": 1});
        } else {
            this.props.onChange(this.props.value + 1);
        }
    }


    getClassName() {
        return makeClassName({
            "IntegerInput": true,
            "read-only": this.props.readOnly,
        });
    }
    render() {
        return (
            <div className={ this.getClassName() }>
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
