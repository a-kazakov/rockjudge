import React from "react";

import PT from "prop-types";

export default class Button extends React.Component {
    static propTypes = {
        className: PT.string,
        label: PT.string.isRequired,
        signalMessage: PT.any.isRequired,
        onSignal: PT.func.isRequired,
    };
    static get defaultProps() {
        return {
            className: "",
        };
    }

    handleClick = () => {
        this.props.onSignal(this.props.signalMessage);
    }

    render() {
        return (
            <button
                className={ this.props.className }
                onClick={ this.handleClick }
            >
                { this.props.label }
            </button>
        );
    }
}
