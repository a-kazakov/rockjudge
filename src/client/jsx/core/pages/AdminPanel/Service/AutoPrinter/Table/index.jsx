import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import _ from "l10n";

import Row from "./Row";

export default class Table extends React.Component {
    static propTypes = {
        actions: PT.object.isRequired,
        possibleActions: PT.arrayOf(PT.string.isRequired).isRequired,
        tours: PT.arrayOf(PT.instanceOf(Model).isRequired).isRequired,
        onChange: PT.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeCell: null,
        };
    }

    handleChange = (tour_id, new_value) => {
        let new_actions = Object.assign({}, this.props.actions);
        new_actions[tour_id] = new_value;
        this.props.onChange(new_actions);
    };
    handleMove = (tour_id, action, direction) => {
        const DELTAS = {
            up: [-1, 0],
            down: [1, 0],
            left: [0, -1],
            right: [0, 1],
        };
        const [tour_delta, action_delta] = DELTAS[direction];
        const next_tour_idx =
            this.props.tours.findIndex(tour => tour.id === tour_id) + tour_delta;
        const next_tour = this.props.tours[next_tour_idx];
        const next_action_idx =
            this.props.possibleActions.indexOf(action) + action_delta;
        const next_action = this.props.possibleActions[next_action_idx];
        if (!next_action || !next_tour) {
            return;
        }
        this.setState({
            activeCell: {
                tour_id: next_tour.id,
                action: next_action,
                token: Math.random().toString(),
            },
        });
    };

    render() {
        return (
            <table className="tours-table">
                <tbody>
                    <tr>
                        <th className="discipline">
                            {_("admin.auto_printer.discipline")}
                        </th>
                        <th>{_("admin.auto_printer.heats")}</th>
                        <th>{_("admin.auto_printer.results_1")}</th>
                        <th>{_("admin.auto_printer.results_2")}</th>
                        <th>{_("admin.auto_printer.results_3")}</th>
                        <th>{_("admin.auto_printer.discipline_results")}</th>
                    </tr>
                    {this.props.tours.map(tour => (
                        <Row
                            activeCell={this.state.activeCell}
                            key={tour.id}
                            possibleActions={this.props.possibleActions}
                            row={this.props.actions[tour.id] || {}}
                            tour={tour}
                            onChange={this.handleChange}
                            onMove={this.handleMove}
                        />
                    ))}
                </tbody>
            </table>
        );
    }
}
