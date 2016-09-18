import _ from "l10n";

import onTouchOrClick from "tablet_ui/onTouchOrClick";

export default class Header extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            heat: PT.number.isRequired,
            maxHeat: PT.number.isRequired,
            tour: PT.shape({
                name: PT.string.isRequired,
                discipline: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
            onNextHeatClick: PT.func.isRequired,
            onPrevHeatClick: PT.func.isRequired,
        };
    }
    renderPrevHeatButton() {
        if (this.props.heat <= 1) {
            return null;
        }
        return (
            <button
                className="btn btn-primary pull-left"
                { ...onTouchOrClick(this.props.onPrevHeatClick) }
            >
                { _("tablet.buttons.prev_heat") }
            </button>
        );
    }
    renderNextHeatButton() {
        if (this.props.heat >= this.props.maxHeat) {
            return null;
        }
        return (
            <button
                className="btn btn-primary pull-right"
                { ...onTouchOrClick(this.props.onNextHeatClick) }
            >
                { _("tablet.buttons.next_heat") }
            </button>
        );
    }
    render() {
        return (
            <header className="flex">
                { this.renderPrevHeatButton() }
                { this.renderNextHeatButton() }
                <div className="header">
                    <h1>
                        { this.props.tour.discipline.name }
                    </h1>
                    <h2>
                        { this.props.tour.name }
                    </h2>
                </div>
            </header>
        );
    }
}
