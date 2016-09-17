import _ from "l10n";

import TourSelector from "../TourSelector";
import HeatSelector from "./HeatSelector";

export default class TourHeatControls extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
            controlsState: PT.shape({
                tour_id: PT.number,
                heat: PT.number,
            }).isRequired,
            onChange: PT.func.isRequired,
        };
    }

    handleTourChange = (new_value) => {
        let new_state = Object.assign({}, this.props.controlsState);
        new_state.tour_id = new_value;
        new_state.heat = null;
        this.props.onChange(new_state);
    }
    handleHeatChange = (new_value) => {
        let new_state = Object.assign({}, this.props.controlsState);
        new_state.heat = new_value;
        this.props.onChange(new_state);
    }

    renderHeatSelector() {
        if (this.props.controlsState.tour_id === null) {
            return null;
        }
        return (
            <div>
                <h3>
                    { _("screen_operator.headers.heat") }
                </h3>
                <HeatSelector
                    tourId={ this.props.controlsState.tour_id }
                    value={ this.props.controlsState.heat }
                    onHeatSelect={ this.handleHeatChange }
                />
            </div>
        );
    }
    render() {
        return (
            <div>
                <h3>
                    { _("screen_operator.headers.tour") }
                </h3>
                <TourSelector
                    competition={ this.props.competition }
                    value={ this.props.controlsState.tour_id }
                    onChange={ this.handleTourChange }
                />
                { this.renderHeatSelector() }
            </div>
        );
    }
}

TourHeatControls.displayName = "ScreenOperator_TourHeatControls";
