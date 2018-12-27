import React from "react";

import PT from "prop-types";
import onTouchOrClick from "../onTouchOrClick";

import makeClassName from "common/makeClassName";

export default class Item extends React.PureComponent {
    static propTypes = {
        active: PT.bool.isRequired,
        readOnly: PT.bool.isRequired,
        style: PT.oneOf([
            "active-green",
            "active-red",
            "active-yellow",
            "active-white",
        ]),
        text: PT.string.isRequired,
        value: PT.oneOfType([
            PT.string.isRequired,
            PT.number.isRequired,
            PT.bool.isRequired,
        ]),
        onClick: PT.func.isRequired,
    };

    handleClick = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onClick(this.props.value);
    };

    getClassName() {
        return makeClassName({
            tbtn: true,
            "score-btn": true,
            active: this.props.active,
            "read-only": this.props.readOnly,
            "active-red": this.props.style === "active-red",
            "active-green": this.props.style === "active-green",
            "active-yellow": this.props.style === "active-yellow",
            "active-white": this.props.style === "active-white",
        });
    }
    render() {
        return (
            <button
                className={this.getClassName()}
                {...onTouchOrClick(this.handleClick)}
            >
                {this.props.text}
            </button>
        );
    }
}
