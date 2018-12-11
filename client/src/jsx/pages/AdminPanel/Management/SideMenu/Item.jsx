import React from "react";

import PT from "prop-types";
import makeClassName from "common/makeClassName";

export default class Item extends React.Component {
    static propTypes = {
        active: PT.bool.isRequired,
        level: PT.number,
        mkey: PT.any.isRequired,
        title: PT.string.isRequired,
        onClick: PT.func.isRequired,
    };
    static get defaultProps() {
        return {
            level: 1,
        };
    }

    handleClick = () => {
        this.props.onClick(this.props.mkey);
    };

    getClassName() {
        return makeClassName({
            [`level-${this.props.level}`]: true,
            active: this.props.active,
        });
    }
    renderMainPart() {
        return (
            <div className={this.getClassName()} onClick={this.handleClick}>
                {this.props.title}
            </div>
        );
    }
    render() {
        if (this.props.level === 1) {
            return <div className="block">{this.renderMainPart()}</div>;
        }
        return this.renderMainPart();
    }
}
