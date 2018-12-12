import React from "react";

import PT from "prop-types";
import onTouchOrClick from "tablet_ui/onTouchOrClick";

export default class Item extends React.Component {
    static propTypes = {
        active: PT.bool.isRequired,
        page: PT.oneOf(["info", "plan", "heats", "results"]).isRequired,
        title: PT.string.isRequired,
        onPageChange: PT.func.isRequired,
    };

    handleClick = () => {
        this.props.onPageChange(this.props.page);
    };

    getClassName() {
        let result = "item";
        if (this.props.active) {
            result += " active";
        }
        return result;
    }
    render() {
        return (
            <div className={this.getClassName()} {...onTouchOrClick(this.handleClick)}>
                <span>{this.props.title}</span>
            </div>
        );
    }
}
