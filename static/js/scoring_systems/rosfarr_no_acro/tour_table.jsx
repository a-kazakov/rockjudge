class TourTableRow extends React.Component {
    render() {
        var next_tour_cell = this.props.has_next_tour
            ? <td>{ this.props.row.advances ? "Yes" : "No" }</td>
            : null;
        return <tr>
            <td>{ this.props.row.place }</td>
            <td>{ this.props.row.run.participant.number }</td>
            <td>{ this.props.row.run.participant.name }</td>
            <td>{ this.props.row.run.total_score }</td>
            { next_tour_cell }
        </tr>
    }
}

class TourTable extends React.Component {
    render() {
        var rows = this.props.data.map(function(row) {
            return <TourTableRow
                row={ row }
                key={ row.id }
                has_next_tour={ this.props.has_next_tour } />
        }.bind(this));
        return <table>
            <thead>
                <tr>
                    <th>Place</th>
                    <th>Number</th>
                    <th>Participant</th>
                    <th>Score</th>
                    { this.props.has_next_tour ? <th>Next tour</th> : null }
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    }
}
