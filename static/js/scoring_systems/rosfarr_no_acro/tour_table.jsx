class TourTableRow extends React.Component {
    render() {
        return <tr>
            <td>{ this.props.place }</td>
            <td>{ this.props.participant }</td>
            <td>{ this.props.total_score }</td>
            <td>{ this.props.advances ? "Yes" : "No" }</td>
        </tr>
    }
}

class TourTable extends React.Component {
    render() {
        rows = this.props.data.map(function(row) {
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
