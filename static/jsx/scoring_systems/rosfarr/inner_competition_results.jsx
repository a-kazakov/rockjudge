function __() {
    let args = [];
    for (let idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _("scoring_systems.rosfarr." + arguments[0], ...args);
}

class InnerCompetitionResultsTable extends React.Component {
    renderRowHeader(prev_row, next_row) {
        let render = (typeof prev_row == "undefined") || (prev_row.run.tour.id != next_row.run.tour.id)
        if (!render) {
            return null;
        }
        return <tr key={ "H" + next_row.run.id }><td className="tour-name" colSpan="5">
            { next_row.run.tour.name }
        </td></tr>;
    }
    // <td>{ row.run.participant.coach.split(",").map((c) => [c.trim(), <br />]) }</td>
    renderRow(row) {
        let sp_name = row.run.participant.sportsmen.length > 2
            ? [<strong>{ row.run.participant.formation_name }</strong>, <br />]
            : [];
        sp_name = sp_name.concat(row.run.participant.sportsmen.map((sp) => [sp.last_name + " " + sp.first_name, <br />]));
        return <tr key={ "R" + row.run.id }>
            <td className="place">{ row.place === null ? "" : row.place }</td>
            <td className="number">{ row.run.participant.number }</td>
            <td className="sportsmen">{ sp_name }</td>
            <td className="coaches">TBD</td>
            <td className="club">{ row.run.participant.club.name }, { row.run.participant.club.city }</td>
        </tr>
    }
    renderRows() {
        let result = [];
        let table = this.props.table;
        for (let i = 0; i < table.length; ++i) {
            let header = this.renderRowHeader(table[i - 1], table[i]);
            header && result.push(header);
            result.push(this.renderRow(table[i]));
        }
        return result;
    }
    render() {
        return <div className="ic-results">
                <table className="scores-table"><tbody>
                <tr>
                    <th className="place">{ __("results.labels.place") }</th>
                    <th className="number">{ __("results.labels.number") }</th>
                    <th className="sportsmen">{ __("results.labels.sportsmen") }</th>
                    <th className="coaches">{ __("results.labels.participant_coach") }</th>
                    <th className="club">{ __("results.labels.participant_club") }</th>
                </tr>
                { this.renderRows() }
            </tbody></table>
        </div>;
    }
}
