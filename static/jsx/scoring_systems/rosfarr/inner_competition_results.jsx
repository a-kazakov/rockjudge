function __() {
    let args = [];
    for (let idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _("scoring_systems.rosfarr." + arguments[0], ...args);
}

class InnerCompetitionResultsTable extends React.Component {
    renderRowHeader(prev_row, next_row) {
        let need_render = (typeof prev_row == "undefined") || (prev_row.run.tour.id != next_row.run.tour.id)
        if (!need_render) {
            return null;
        }
        return <tr key={ "H" + next_row.run.id }><th className="tour-name" colSpan="5">
            <p className="text-center">{ next_row.run.tour.name }</p>
        </th></tr>;
    }
    renderRow(row) {
        let sp_name = row.run.participant.sportsmen.length > 2
            ? [<strong>{ row.run.participant.formation_name }</strong>, <br />]
            : [];
        sp_name = sp_name.concat(row.run.participant.sportsmen.map((sp) => [sp.last_name + " " + sp.first_name, <br />]));
        return <tr key={ "R" + row.run.id }>
            <td className="w-8 place"><p className="text-center">{ row.place === null ? "" : row.place }</p></td>
            <td className="w-8 number"><p className="text-center">{ row.run.participant.number }</p></td>
            <td className="w-25 sportsmen"><p>{ sp_name }</p></td>
            <td className="w-34 club"><p>{ row.run.participant.club.name }, { row.run.participant.club.city }</p></td>
            <td className="w-25 coaches"><p>{ row.run.participant.coaches.split(",").map((c) => [c.trim(), <br />]) }</p></td>
        </tr>;
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
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th className="w-8 place"><p>{ __("results.labels.place") }</p></th>
                        <th className="w-8 number"><p>{ __("results.labels.number") }</p></th>
                        <th className="w-25 sportsmen"><p>{ __("results.labels.sportsmen") }</p></th>
                        <th className="w-34 club"><p>{ __("results.labels.participant_club") }</p></th>
                        <th className="w-25 coaches"><p>{ __("results.labels.participant_coaches") }</p></th>
                    </tr>
                </thead>
                <tbody>
                    { this.renderRows() }
                </tbody>
            </table>
        </div>;
    }
}
