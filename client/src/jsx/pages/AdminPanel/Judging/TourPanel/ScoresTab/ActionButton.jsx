import React from "react";

import PT from "prop-types";
import makeClassName from "common/makeClassName";


export default class ActionButton extends React.Component {
    static propTypes = {
        mkey: PT.any,
        style: PT.oneOf(["red", "dark"]),
        text: PT.string.isRequired,
        onClick: PT.func.isRequired,
    };

    handleClick = (event) => {
        event.stopPropagation();
        this.props.onClick(this.props.mkey);
    };

    getClassName() {
        return makeClassName({
            "red": this.props.style === "red",
            "dark": this.props.style === "dark",
        });
    }
    render() {
        return (
            <button
                className={ this.getClassName() }
                onClick={ this.handleClick }
            >
                { this.props.text }
            </button>
        );
    }
}