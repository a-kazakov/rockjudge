import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import makeDisciplineResultsTable from "common/makeDisciplineResultsTable";

export default class DisciplineResultsTable extends React.Component {
    static propTypes = {
        discipline: PT.object.isRequired,
        forCompetitionReport: PT.bool.isRequired,
    };
    static get defaultProps() {
        return {
            forCompetitionReport: false,
        };
    }

    static transformDocx(docx) {
        docx.addStyle("table.discipline-results th.tour-name", "padding-top", "10pt")
            .addStyle("table.discipline-results th", "border-bottom", "1pt solid black")
            .addStyle(
                "table.discipline-results td",
                "border-bottom",
                "0.5pt solid #aaa",
            )
            .addStyle(
                "table.discipline-results .sportsmen td, .bordered-table .sportsmen th",
                "border",
                "none",
            )
            .addStyle(
                "table.discipline-results .sportsmen td, .bordered-table .sportsmen th",
                "padding",
                "0",
            )
            .addStyle("table.discipline-results .sportsmen", "width", "100%");
    }

    renderRowHeader(prev_row, next_row) {
        if (this.props.forCompetitionReport) {
            return null;
        }
        const need_render =
            typeof prev_row === "undefined" ||
            prev_row.run.tour.id !== next_row.run.tour.id;
        if (!need_render) {
            return null;
        }
        return (
            <tr key={`H${next_row.run.id}`}>
                <th className="tour-name" colSpan="6">
                    <p className="text-left">{next_row.run.tour.name}</p>
                </th>
            </tr>
        );
    }
    renderRow(row) {
        let p = row.run.participant;
        return (
            <tr key={`R${row.run.id}`}>
                <td className="w-8 place" style={{ borderRight: "1pt solid black" }}>
                    <p className="text-center">
                        {row.run.status === "DQ"
                            ? _("results.labels.dq")
                            : row.place ?? ""}
                    </p>
                </td>
                <td className="w-8 number">
                    <p className="text-center" style={{ fontWeight: "bold" }}>
                        {p.number}
                    </p>
                </td>
                <td className="w-36" colSpan="2">
                    <table className="sportsmen">
                        <tbody>
                            {p.formation_name ? (
                                <tr>
                                    <td colSpan="2">
                                        <p
                                            className="text-left"
                                            style={{ fontWeight: "bold" }}
                                        >
                                            {p.formation_name}
                                        </p>
                                    </td>
                                </tr>
                            ) : null}
                            {p.sportsmen.map((s, idx) => (
                                <tr key={idx}>
                                    <td className="w-75">
                                        <p>
                                            {`${s.last_name} ${s.first_name}`}
                                            {s.substitute ? (
                                                <i> ({_("results.labels.sub")}.)</i>
                                            ) : null}
                                        </p>
                                    </td>
                                    <td className="w-25">
                                        <p className="text-center">{s.year_of_birth}</p>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </td>
                <td className="w-24 club">
                    <p>{p.club.name}</p>
                </td>
                <td className="w-24 coaches">
                    <p>{p.coaches.split(",").map(c => [c.trim(), <br key="X" />])}</p>
                </td>
            </tr>
        );
    }
    renderRows() {
        let result = [];
        const table = makeDisciplineResultsTable(this.props.discipline);
        for (let i = 0; i < table.length; ++i) {
            const header = this.renderRowHeader(table[i - 1], table[i]);
            if (header != null) {
                result.push(header);
            }
            result.push(this.renderRow(table[i]));
        }
        return result;
    }
    render() {
        return (
            <div className="DisciplineResultsTable">
                <table className="discipline-results">
                    <thead>
                        <tr>
                            <th className="w-8">
                                <p>{_("results.labels.place")}</p>
                            </th>
                            <th className="w-8">
                                <p>{_("results.labels.number")}</p>
                            </th>
                            <th className="w-27">
                                <p className="text-left">
                                    {_("results.labels.sportsmen")}
                                </p>
                            </th>
                            <th className="w-9">
                                <p>{_("results.labels.sportsmen_year_of_birth")}</p>
                            </th>
                            <th className="w-24">
                                <p className="text-left">
                                    {_("results.labels.participant_club")}
                                </p>
                            </th>
                            <th className="w-24">
                                <p className="text-left">
                                    {_("results.labels.participant_coaches")}
                                </p>
                            </th>
                        </tr>
                    </thead>
                    <tbody>{this.renderRows()}</tbody>
                </table>
            </div>
        );
    }
}
