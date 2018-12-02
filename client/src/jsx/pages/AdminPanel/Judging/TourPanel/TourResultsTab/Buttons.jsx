import React from "react";

import PT from "prop-types";

export default class Buttons extends React.Component {
    static propTypes = {
        onSignal: PT.func.isRequired,
    };

    handleDocxClick = () => {
        return this.props.onSignal("docx");
    }

    render() {
        return (
            <div>
                <button
                    className="btn btn-primary"
                    onClick={ this.handleDocxClick }
                >
                    DOCX
                </button>
            </div>
        );
    }
}
