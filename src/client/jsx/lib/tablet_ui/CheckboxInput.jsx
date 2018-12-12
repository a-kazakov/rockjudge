import React from "react";

import PT from "prop-types";
import makeClassName from "common/makeClassName";
import onTouchEndOrClick from "./onTouchEndOrClick";

export default class CheckboxInput extends React.Component {
    static propTypes = {
        label: PT.string.isRequired,
        readOnly: PT.bool,
        value: PT.bool.isRequired,
        onChange: PT.func.isRequired,
    };
    static get defaultProps() {
        return {
            readOnly: false,
        };
    }

    handleClick = () => {
        this.props.onChange(!this.props.value);
    };

    getSquareClassName() {
        return makeClassName({
            square: true,
            checked: this.props.value,
            "read-only": this.props.readOnly,
        });
    }
    render() {
        return (
            <div className="CheckboxInput" {...onTouchEndOrClick(this.handleClick)}>
                <div className={this.getSquareClassName()}>
                    {this.props.value ? "🗸" : ""}
                </div>
                <div className="label">{this.props.label}</div>
            </div>
        );
    }
}
