import _ from "l10n";

export default class DisciplineResultsTable extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            table: PT.arrayOf(
                PT.shape({
                    place: PT.number,
                    run: PT.shape({
                        participant: PT.shape({
                            number: PT.number.isRequired,
                            coaches: PT.string.isRequired,
                            sportsmen: PT.arrayOf(
                                PT.shape({
                                    last_name: PT.string.isRequired,
                                    first_name: PT.string.isRequired,
                                    year_of_birth: PT.number.isRequired,
                                    substitute: PT.bool.isRequired,
                                })
                            ),
                            club: PT.shape({
                                city: PT.string.isRequired,
                                name: PT.string.isRequired,
                            }).isRequired,
                        }).isRequired,
                    }).isRequired,
                    tour: PT.shape({
                        name: PT.string.isRequired,
                    }).isRequired,
                }).isRequired
            ).isRequired,
        };
    }

    static transformDocx(docx) {
        docx
            .addStyle(".tour-name", "background", "#ddd")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0")
            .addStyle(".sportsmen", "width", "100%");
    }

    renderRowHeader(prev_row, next_row) {
        const need_render =
            typeof prev_row === "undefined" ||
            prev_row.tour.id !== next_row.tour.id;
        if (!need_render) {
            return null;
        }
        return (
            <tr key={ `H${next_row.run.id}` }>
                <th className="tour-name" colSpan="6">
                    <p className="text-center">
                        { next_row.tour.name }
                    </p>
                </th>
            </tr>
        );
    }
    renderRow(row) {
        let p = row.run.participant;
        return (
            <tr key={ `R${row.run.id}` }>
                <td className="w-8 place">
                    <p className="text-center">
                        { row.run.disqualified
                            ? _("results.labels.dq")
                            : (row.place === null ? "" : row.place) }
                    </p>
                </td>
                <td className="w-8 number">
                    <p className="text-center">
                        { p.number }
                    </p>
                </td>
                <td className="w-36" colSpan="2">
                    <table className="sportsmen"><tbody>
                        { p.formation_name ? (
                            <tr>
                                <th colSpan="2">
                                    <p className="text-left">
                                        { p.formation_name }
                                    </p>
                                </th>
                            </tr>
                        ) : null }
                        { p.sportsmen.map((s, idx) =>
                            <tr key={ idx }>
                                <td className="w-75">
                                    <p>
                                        { `${s.last_name} ${s.first_name}` }
                                        { s.substitute ? <i> ({ _("results.labels.sub") }.)</i> : null }
                                    </p>
                                </td>
                                <td className="w-25">
                                    <p className="text-center">
                                        { s.year_of_birth }
                                    </p>
                                </td>
                            </tr>
                        ) }
                    </tbody></table>
                </td>
                <td className="w-24 club">
                    <p>
                        { p.club.name }
                    </p>
                </td>
                <td className="w-24 coaches">
                    <p>
                        { p.coaches.split(",").map(c => [c.trim(), <br key="X" />]) }
                    </p>
                </td>
            </tr>
        );
    }
    renderRows() {
        let result = [];
        const table = this.props.table;
        for (let i = 0; i < table.length; ++i) {
            const header = this.renderRowHeader(table[i - 1], table[i]);
            if (header !== null) {
                result.push(header);
            }
            result.push(this.renderRow(table[i]));
        }
        return result;
    }
    render() {
        return (
            <div className="DisciplineResultsTable">
                <table className="bordered-table">
                    <thead>
                        <tr>
                            <th className="w-8">
                                <p>
                                    { _("results.labels.place") }
                                </p>
                            </th>
                            <th className="w-8">
                                <p>
                                    { _("results.labels.number") }
                                </p>
                            </th>
                            <th className="w-27">
                                <p>
                                    { _("results.labels.sportsmen") }
                                </p>
                            </th>
                            <th className="w-9">
                                <p>
                                    { _("results.labels.sportsmen_year_of_birth") }
                                </p>
                            </th>
                            <th className="w-24">
                                <p>
                                    { _("results.labels.participant_club") }
                                </p>
                            </th>
                            <th className="w-24">
                                <p>
                                    { _("results.labels.participant_coaches") }
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.renderRows() }
                    </tbody>
                </table>
            </div>
        );
    }
}

DisciplineResultsTable.displayName = "rules_sets_rosfarr_DisciplineResultsTable";
