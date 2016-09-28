import _ from "l10n";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

export default class Header extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            heat: PT.number.isRequired,
            heatsCount: PT.number.isRequired,
            hideHeatsButtons: PT.bool,
            judge: PT.shape({
                name: PT.string.isRequired,
                role_description: PT.string,
                number: PT.string.isRequired,
            }).isRequired,
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

    static get defaultProps() {
        return {
            hideHeatsButtons: false,
        };
    }

    renderPrevHeatButton() {
        if (this.props.hideHeatsButtons || this.props.heat <= 1) {
            return (
                <div className="button-container" />
            );
        }
        return (
            <div className="button-container left">
                <button { ...onTouchEndOrClick(this.props.onPrevHeatClick) }>
                    { _("tablet.buttons.prev_heat") }
                </button>
            </div>
        );
    }
    renderNextHeatButton() {
        if (this.props.hideHeatsButtons || this.props.heat >= this.props.maxHeat) {
            return (
                <div className="button-container" />
            );
        }
        return (
            <div className="button-container right">
                <button { ...onTouchEndOrClick(this.props.onNextHeatClick) }>
                    { _("tablet.buttons.next_heat") }
                </button>
            </div>
        );
    }
    render() {
        const judge_number = this.props.judge.role_description || _("global.phrases.judge_n", this.props.judge.number);
        return (
            <header>
                { this.renderPrevHeatButton() }
                <div className="data">
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
