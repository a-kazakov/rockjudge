import React from "react";

import PT from "prop-types";

export default class NavButton extends React.Component {
    static propTypes = {
        active: PT.bool.isRequired,
        label: PT.string.isRequired,
        mkey: PT.string.isRequired,
        onPageSwitch: PT.func.isRequired,
    };

    handleClick = (event) => {
        event.preventDefault();
        this.props.onPageSwitch(this.props.mkey);
    }

    getClassName() {
        return this.props.active
            ? "active"
            : "";
    }
    render() {
        return (
            <a
                className={ this.getClassName() }
                href="#"
                onClick={ this.handleClick }
            >
                { this.props.label }
            </a>
        );
    }
}
