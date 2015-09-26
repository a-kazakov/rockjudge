class TourTableRow extends React.Component {
    render() {
        return <tr>
            <td>{ this.props.row.place }</td>
            <td>{ this.props.row.participant }</td>
            <td>{ this.props.row.score }</td>
            <td>{ this.props.row.advances ? "Yes" : "No" }</td>
        </tr>
    }
}

class TourTable extends React.Component {
    render() {
        var rows = this.props.data.map(function(row) {
            return <TourTableRow row={ row } />
        })
        return <table>
            <tr>
                <th>Place</th>
                <th>Participant</th>
                <th>Score</th>
                <th>Next tour</th>
            </tr>
            { rows }
        </table>
    }
}
