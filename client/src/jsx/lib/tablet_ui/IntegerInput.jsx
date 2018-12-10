import React from "react";

import PT from "prop-types";
import makeClassName from "common/makeClassName";

import onTouchOrClick from "./onTouchOrClick";

export default class IntegerInput extends React.Component {
    static propTypes = {
        jumbo: PT.bool,
        max: PT.number,
        min: PT.number,
        readOnly: PT.bool,
        value: PT.number.isRequired,
        onChange: PT.func.isRequired,
    };
    static get defaultProps() {
        return {
            jumbo: false,
            max: 100,
            min: 0,
            readOnly: false,
        }
    }

    handleUpdate(delta) {
        const {min, max, value} = this.props;
        const next_value = value + delta;
        if (this.props.readOnly) {
            return;
        }
        if (!(min <= next_value && next_value <= max)) {
            return;
        }
        this.props.onChange(next_value);
    }
    handleMinus = () => this.handleUpdate(-1);
    handlePlus = () => this.handleUpdate(1);


    getClassName() {
        return makeClassName({
            "IntegerInput": true,
            "jumbo": this.props.jumbo,
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
