import React from "react";

import PT from "prop-types";
import makeClassName from "common/makeClassName";

export default class Item extends React.Component {
    static propTypes = {
        active: PT.bool.isRequired,
        tour: PT.shape({
            finalized: PT.bool.isRequired,
            id: PT.number.isRequired,
            name: PT.string.isRequired,
        }).isRequired,
        onActiveTourChange: PT.func.isRequired,
    };

    handleClick = () => {
        this.props.onActiveTourChange(this.props.tour.id);
    }

    getClassName() {
        return makeClassName({
            "level-2": true,
            "grey": this.props.tour.finalized,
            "active": this.props.active,
        });
    }
    render() {
        return (
            <div
                className={ this.getClassName() }
                onClick={ this.handleClick }
            >
                { this.props.tour.name }
            </div>
        );
    }
}
