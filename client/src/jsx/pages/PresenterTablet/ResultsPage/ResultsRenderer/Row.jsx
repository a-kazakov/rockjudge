import React from "react";

import makeClassName from "common/makeClassName";
import PT from "prop-types";
import _ from "l10n";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

export default class Row extends React.Component {
    static propTypes = {
        place: PT.number,
        run: PT.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            active: false,
        }
    }
    handleToggleState = () => {
        this.setState({
            active: !this.state.active,
        });
    };

    getClassName() {
        return makeClassName({
            "row": true,
            "active": this.state.active,
        });
    }
    renderPlace() {
        if (this.props.run.status === "DQ") {
            return (
                <div className="place-label">
                    { _("presenter.labels.disqualified") }
                </div>
            )
        }
        if (this.props.place == null) {
            return null;
        }
        return (
            <div>
                { this.props.place }
                <div className="place-label">
                    { _("presenter.labels.place") }
                </div>
            </div>
        );
    }
    render() {
        return (
            <table
                className={ this.getClassName() }
                { ...onTouchEndOrClick(this.handleToggleState) }
            >
                <tbody>
                    <tr>
                        <td className="place" rowSpan="3">
                            { this.renderPlace() }
                        </td>
                        <td className="number">
                            { this.props.run.participant.number }
                        </td>
                        <td className="name">
                            { this.props.run.participant.name }
                        </td>
                    </tr>
                    <tr>
                        <td className="club" colSpan="2">
                            { `${this.props.run.participant.club.name}, ${this.props.run.participant.club.city}` }
                        </td>
                    </tr>
                    <tr>
                        <td className="coaches" colSpan="2">
                            { this.props.run.participant.coaches }
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
