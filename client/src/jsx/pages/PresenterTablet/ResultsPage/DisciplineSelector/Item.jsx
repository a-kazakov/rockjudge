import React from "react";

import makeClassName from "common/makeClassName";
import PT from "prop-types";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

export default class Item extends React.Component {
    static propTypes = {
        active: PT.bool.isRequired,
        discipline: PT.object.isRequired,
        onDisciplineChange: PT.func.isRequired,
    };

    handleClick = () => {
        this.props.onDisciplineChange(this.props.discipline);
    };

    getClassName() {
        return makeClassName({
            "item": true,
            "active": this.props.active,
        });
    }
    render() {
        return (
            <div
                className={ this.getClassName() }
                { ...onTouchEndOrClick(this.handleClick) }
            >
                { this.props.discipline.name }
            </div>
        );
    }
}
