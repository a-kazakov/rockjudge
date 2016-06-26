import _ from "l10n";

export default class Header extends React.Component {
    renderPrevHeatButton() {
        if (this.props.heat <= 1) {
            return null;
        }
        return (
            <button className="btn btn-primary pull-left" onClick={ this.props.onPrevHeatClick }>
                { _("tablet.buttons.prev_heat") }
            </button>
        );
    }
    renderNextHeatButton() {
        if (this.props.heat >= this.props.maxHeat) {
            return null;
        }
        return (
            <button className="btn btn-primary pull-right" onClick={ this.props.onNextHeatClick }>
                { _("tablet.buttons.next_heat") }
            </button>
        );
    }
    render() {
        return (
            <header>
                { this.renderPrevHeatButton() }
                { this.renderNextHeatButton() }
                <div className="header">
                    <table className="full-width"><tbody><tr>
                        <td>
                            <h1>{ _("tablet.global.judge_number", this.props.judge.number) }</h1>
                            <h2>{ this.props.judge.name }</h2>
                        </td>
                        <td>
                            <h1>{ this.props.tour.discipline.name }</h1>
                            <h2>
                                { this.props.tour.name }
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                { _("tablet.global.heat_number", this.props.heat, this.props.heatsCount ) }
                            </h2>
                        </td>
                    </tr></tbody></table>
                </div>
             </header>
        );
    }
}
