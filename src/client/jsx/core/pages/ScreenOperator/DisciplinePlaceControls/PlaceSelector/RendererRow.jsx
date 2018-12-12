import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import _ from "l10n";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import makeClassName from "common/makeClassName";

export default class RendererRow extends React.Component {
    static propTypes = {
        participant: PT.instanceOf(Model).isRequired,
        place: PT.number,
        position: PT.number.isRequired,
        selected: PT.bool.isRequired,
        onPositionSelect: PT.func.isRequired,
    };

    handleClick = () => {
        this.props.onPositionSelect(this.props.position);
    };

    getClassName() {
        return makeClassName({
            row: true,
            selected: this.props.selected,
        });
    }
    renderPlace() {
        if (this.props.place == null) {
            return null;
        }
        return (
            <div>
                {this.props.place}
                <div className="place-label">{_("presenter.labels.place")}</div>
            </div>
        );
    }
    render() {
        return (
            <table
                className={this.getClassName()}
                {...onTouchEndOrClick(this.handleClick)}
            >
                <tbody>
                    <tr>
                        <td className="place" rowSpan="2">
                            {this.renderPlace()}
                        </td>
                        <td className="number">{this.props.participant.number}</td>
                        <td className="name">{this.props.participant.name}</td>
                    </tr>
                    <tr>
                        <td className="club" colSpan="2">
                            {this.props.participant.club.name}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
