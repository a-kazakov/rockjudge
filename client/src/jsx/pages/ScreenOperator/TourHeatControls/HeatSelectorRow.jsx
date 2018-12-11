import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import _ from "l10n";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";
import makeClassName from "common/makeClassName";

export default class HeatSelectorRow extends React.Component {
    static propTypes = {
        heat: PT.number.isRequired,
        runs: PT.arrayOf(PT.instanceOf(Model).isRequired).isRequired,
        selected: PT.bool.isRequired,
        onHeatSelect: PT.func.isRequired,
    };

    handleClick = () => {
        this.props.onHeatSelect(this.props.heat);
    };

    getClassName() {
        return makeClassName({
            heat: true,
            selected: this.props.selected,
        });
    }
    renderRun = run => {
        return (
            <div className="participant" key={run.id}>
                <div className="number">{run.participant.number}</div>
                <div className="name">{run.participant.name}</div>
            </div>
        );
    };
    render() {
        return (
            <table
                className={this.getClassName()}
                {...onTouchEndOrClick(this.handleClick)}
            >
                <tbody>
                    <tr>
                        <td className="heat-number">
                            <div>{this.props.heat}</div>
                            <div className="heat-label">
                                {_("screen_operator.labels.heat")}
                            </div>
                        </td>
                        <td className="participants">
                            {this.props.runs.map(this.renderRun)}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
