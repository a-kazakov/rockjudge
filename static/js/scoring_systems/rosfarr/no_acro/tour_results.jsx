class TourResultsTableRow extends React.Component {
    render() {
        var next_tour_cell = this.props.has_next_tour
            ? <td className="next-tour">{ this.props.row.advances ? "Yes" : "No" }</td>
            : null;
        return <tr>
            <td className="place">{ this.props.row.place }</td>
            <td className="number">{ this.props.row.participant.number }</td>
            <td className="participant">{ this.props.row.participant.name }</td>
            <td className="score">{ this.props.row.scores.total_run_score }</td>
            { next_tour_cell }
        </tr>
    }
}

class TourResultsTable extends React.Component {
    render() {
        var rows = this.props.data.map(function(row) {
            return <TourResultsTableRow
                row={ row }
                key={ row.id }
                has_next_tour={ this.props.has_next_tour } />
        }.bind(this));
        return <table className="table results-table">
            <thead>
                <tr>
                    <th className="place">Place</th>
                    <th className="number">Number</th>
                    <th className="participant">Participant</th>
                    <th className="score">Score</th>
                    { this.props.has_next_tour ? <th className="next-tour">Next tour</th> : null }
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}
