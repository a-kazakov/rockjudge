import _ from "l10n";

import { onTouchEndOrClick } from "ui/tablet_components";

export default class Header extends React.Component {
    renderPrevHeatButton() {
        if (this.props.heat <= 1) {
            return (
                <div className="btn-container" />
            );
        }
        return (
            <div className="btn-container left">
                <button
                    className="btn btn-primary"
                    { ...onTouchEndOrClick(this.props.onPrevHeatClick) }
                >
                    { _("tablet.buttons.prev_heat") }
                </button>
            </div>
        );
    }
    renderNextHeatButton() {
        if (this.props.heat >= this.props.maxHeat) {
            return (
                <div className="btn-container" />
            );
        }
        return (
            <div className="btn-container right">
                <button
                    className="btn btn-primary"
                    { ...onTouchEndOrClick(this.props.onNextHeatClick) }
                >
                    { _("tablet.buttons.next_heat") }
                </button>
            </div>
        );
    }
    render() {
        const judge_number = this.props.judge.role_description || _("global.phrases.judge_n", this.props.judge.number);
        return (
            <header className="flex">
                { this.renderPrevHeatButton() }
                <div className="flex-container">
                    <div className="box">
                        <h1>{ judge_number }</h1>
                        <h2>{ this.props.judge.name }</h2>
                    </div>
                    <div className="box">
                        <h1>{ this.props.tour.discipline.name }</h1>
                        <h2>
                            { this.props.tour.name }
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            { _("tablet.global.heat_number", this.props.heat, this.props.heatsCount ) }
                        </h2>
                    </div>
                </div>
                { this.renderNextHeatButton() }
         </header>
        );
    }
}
