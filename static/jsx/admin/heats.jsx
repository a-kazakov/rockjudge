class HeatsTable extends React.Component {
    renderHeatHeader(prev_row, next_row) {
        let need_render = (typeof prev_row == "undefined") || (prev_row.heat != next_row.heat)
        if (!need_render) {
            return null;
        }
        return <tr key={ "H" + next_row.heat }><th className="heat-number" colSpan="3">
            <p>{ _("global.phrases.heat_n", next_row.heat) }</p>
        </th></tr>;

    }
    renderHeatRow(row) {
        return <tr key={ "R" + row.id }>
            <td className="w-8"><p className="text-center">{ row.participant.number }</p></td>
            <td className="w-50"><p>{ row.participant.name }</p></td>
            <td className="w-42"><p>{ row.participant.club.name }</p></td>
        </tr>;
    }
    renderHeatRows() {
        let result = [];
        let runs = this.props.runs;
        for (let i = 0; i < runs.length; ++i) {
            let header = this.renderHeatHeader(runs[i - 1], runs[i]);
            header && result.push(header);
            result.push(this.renderHeatRow(runs[i]));
        }
        return result;
    }
    render() {
        return <div className="print-only" ref="printable_heats">
            <table className="bordered-table"><thead>
                <tr>
                    <th className="w-8"><p>{ _("judging.labels.number") }</p></th>
                    <th className="w-46"><p>{ _("judging.labels.participant_name") }</p></th>
                    <th className="w-46"><p>{ _("judging.labels.club") }</p></th>
                </tr>
            </thead><tbody>
                { this.renderHeatRows() }
            </tbody></table>
        </div>
    }
    createDocx() {
        console.log(this.props.discipline);
        Docx("tour-heats")
            .setHeader(this.props.discipline.competition.name + ", " + this.props.discipline.competition.date)
            .setTitle1(_("admin.headers.tour_heats"))
            .setTitle2(this.props.discipline.name)
            .setTitle3(this.props.name)
            .setBody(ReactDOM.findDOMNode(this.refs.printable_heats).innerHTML)
            .addStyle(".heat-number", "background", "#ccc")
            .addStyle(".heat-number", "text-align", "left")
            .addStyle("td, th", "font-size", "12pt")
            .save();
    }
}
