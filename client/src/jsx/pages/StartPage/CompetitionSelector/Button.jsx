import React from "react";

import PT from "prop-types";

export default class Button extends React.Component {
    static propTypes = {
        competition: PT.shape({
            id: PT.number.isRequired,
            name: PT.string.isRequired,
        }).isRequired,
        onSelect: PT.func.isRequired,
    };

    handleClick = () => {
        this.props.onSelect(this.props.competition.id);
    }

    render() {
        return (
            <div
                className="button"
                onClick={ this.handleClick }
            >
                { this.props.competition.name }
            </div>
        );
    }
}