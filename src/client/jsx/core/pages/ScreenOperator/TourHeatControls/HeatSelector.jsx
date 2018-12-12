import React from "react";

import Model from "common/server/Storage/models/Model";
import lastOf from "common/tools/lastOf";
import PT from "prop-types";
import _ from "l10n";
import Loader from "common/components/Loader";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import HeatSelectorRow from "./HeatSelectorRow";

export default class HeatSelector extends React.Component {
    static propTypes = {
        tour: PT.instanceOf(Model).isRequired,
        value: PT.number,
        onHeatSelect: PT.func.isRequired,
    };

    handleHeatReset = () => {
        this.props.onHeatSelect(null);
    };

    render() {
        if (this.props.tour == null) {
            return <Loader />;
        }
        let result = [];
        const max_heat = lastOf(this.props.tour.runs)?.heat || 1;
        for (let heat = 1; heat <= max_heat; ++heat) {
            result.push(
                <HeatSelectorRow
                    heat={heat}
                    key={heat}
                    runs={this.props.tour.runs.filter(run => run.heat === heat)}
                    selected={this.props.value === heat}
                    onHeatSelect={this.props.onHeatSelect}
                />,
            );
        }
        return (
            <div className="heat-selector">
                <button
                    className="reset-button"
                    type="button"
                    {...onTouchEndOrClick(this.handleHeatReset)}
                >
                    {_("screen_operator.buttons.reset_heat")}
                </button>
                {result}
            </div>
        );
    }
}
