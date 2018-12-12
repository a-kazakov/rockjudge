import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";
import makeClassName from "common/makeClassName";

export default class Tour extends React.Component {
    static propTypes = {
        selected: PT.bool.isRequired,
        tour: PT.instanceOf(Model).isRequired,
        onTourSelect: PT.func.isRequired,
    };

    handleClick = () => {
        this.props.onTourSelect(this.props.tour.id);
    };

    getClassName() {
        return makeClassName({
            tour: true,
            selected: this.props.selected,
            active: this.props.tour.active,
            finalized: this.props.tour.finalized,
        });
    }
    render() {
        return (
            <div
                className={this.getClassName()}
                {...onTouchEndOrClick(this.handleClick)}
            >
                {this.props.tour.name}
            </div>
        );
    }
}
