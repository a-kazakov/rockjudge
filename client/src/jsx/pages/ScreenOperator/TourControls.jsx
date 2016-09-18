import _ from "l10n";

import TourSelector from "./TourSelector";

export default class TourControls extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
            controlsState: PT.shape({
                tour_id: PT.number,
            }).isRequired,
            onChange: PT.func.isRequired,
        };
    }

    handleTourChange = (new_value) => {
        const new_state = Object.assign({}, this.props.controlsState);
        new_state.tour_id = new_value;
        this.props.onChange(new_state);
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
            </div>
        );
    }
}

TourControls.displayName = "ScreenOperator_TourControls";
