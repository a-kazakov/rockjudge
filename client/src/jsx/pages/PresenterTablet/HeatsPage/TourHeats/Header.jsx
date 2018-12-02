import React from "react";

import PT from "prop-types";
import _ from "l10n/index";

import onTouchOrClick from "tablet_ui/onTouchOrClick";

export default class Header extends React.Component {
    static propTypes = {
        heat: PT.number.isRequired,
        maxHeat: PT.number.isRequired,
        showButtons: PT.bool.isRequired,
        tour: PT.object.isRequired,
        onNextHeatClick: PT.func.isRequired,
        onPrevHeatClick: PT.func.isRequired,
    };
    renderPrevHeatButton() {
        if (this.props.heat <= 1 || !this.props.showButtons) {
            return null;
        }
        return (
            <button { ...onTouchOrClick(this.props.onPrevHeatClick) }>
                { _("tablet.buttons.prev_heat_short") }
            </button>
        );
    }
    renderNextHeatButton() {
        if (this.props.heat >= this.props.maxHeat || !this.props.showButtons) {
            return null;
        }
        return (
            <button { ...onTouchOrClick(this.props.onNextHeatClick) }>
                { _("tablet.buttons.next_heat_short") }
            </button>
        );
    }
    render() {
        return (
            <header className="flex">
                <div className="button-container">
                    { this.renderPrevHeatButton() }
                </div>
                <div className="data">
                    <h2>
                        { this.props.tour.discipline.name }
                    </h2>
                    <h2>
                        { this.props.tour.name }
                    </h2>
                    <h1>
                        { `${_("tablet.headers.heat")}: ${this.props.heat} / ${this.props.maxHeat}` }
                    </h1>
                </div>
                <div className="button-container">
                    { this.renderNextHeatButton() }
                </div>
            </header>
        );
    }
}