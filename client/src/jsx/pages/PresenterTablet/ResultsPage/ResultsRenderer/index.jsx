import React from "react";

import makeDisciplineResultsTable from "common/makeDisciplineResultsTable";
import PT from "prop-types";
import Row from "./Row";

export default class ResultsRenderer extends React.Component {
    static propTypes = {
        discipline: PT.object.isRequired,
    };

    renderRowHeader(prev_row, next_row) {
        if (
            typeof prev_row !== "undefined" &&
            prev_row.run.tour_id === next_row.run.tour_id
        ) {
            return null;
        }
        return (
            <div
                className="tour-name"
                key={ `H${next_row.run.id}` }
            >
                { next_row.run.tour.name }
            </div>
        );
    }
    renderRow(row) {
        return (
            <Row
                key={ `R${row.run.id}` }
                place={ row.place }
                run={ row.run }
            />
        );
    }
    renderRows() {
        const table = makeDisciplineResultsTable(this.props.discipline);
        let result = [];
        for (let i = table.length - 1; i >= 0; --i) {
            const header = this.renderRowHeader(table[i + 1], table[i]);
            if (header) {
                result.push(header);
            }
            result.push(this.renderRow(table[i]));
        }
        return result;
    }
    render() {
        return (
            <div className="discipline-results">
                { this.renderRows() }
            </div>
        );
    }
}
