import React from "react";

import Loader from "common/components/Loader";
import makeDisciplineResultsTable from "common/makeDisciplineResultsTable";
import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import RendererRow from "./RendererRow";

export default class Renderer extends React.Component {
    static propTypes = {
        discipline: PT.instanceOf(Model),
        value: PT.number,
        onPositionSelect: PT.func.isRequired,
    };

    renderRowHeader(prev_row, next_row) {
        if (
            typeof prev_row !== "undefined" &&
            prev_row.run.tour.id === next_row.run.tour.id
        ) {
            return null;
        }
        return (
            <div className="tour-name" key={`H${next_row.run.id}`}>
                {next_row.run.tour.name}
            </div>
        );
    }
    renderRow(row, position) {
        return (
            <RendererRow
                key={`R${row.run.id}`}
                participant={row.run.participant}
                place={row.place}
                position={position}
                selected={this.props.value != null && position >= this.props.value}
                onPositionSelect={this.props.onPositionSelect}
            />
        );
    }
    renderRows() {
        let result = [];
        const table = makeDisciplineResultsTable(this.props.discipline);
        for (let i = table.length - 1; i >= 0; --i) {
            const header = this.renderRowHeader(table[i + 1], table[i]);
            if (header) {
                result.push(header);
            }
            result.push(this.renderRow(table[i], i));
        }
        return result;
    }
    render() {
        if (this.props.discipline == null) {
            return <Loader />;
        }
        return <div className="discipline-results">{this.renderRows()}</div>;
    }
}
