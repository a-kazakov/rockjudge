import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import _ from "l10n";

import TourSelector from "./TourSelector";

export default class TourControls extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        controlsState: PT.shape({
            tour_id: PT.number,
        }).isRequired,
        onChange: PT.func.isRequired,
    };

    handleTourChange = new_value => {
        const new_state = Object.assign({}, this.props.controlsState);
        new_state.tour_id = new_value;
        this.props.onChange(new_state);
    };

    render() {
        return (
            <div>
                <h3>{_("screen_operator.headers.tour")}</h3>
                <TourSelector
                    competition={this.props.competition}
                    value={this.props.controlsState.tour_id}
                    onChange={this.handleTourChange}
                />
            </div>
        );
    }
}
