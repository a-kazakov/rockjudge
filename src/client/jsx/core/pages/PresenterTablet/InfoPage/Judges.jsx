import React from "react";

import PT from "prop-types";
import _ from "l10n";

export default class Judges extends React.Component {
    static propTypes = {
        competition: PT.shape({
            judges: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                    category: PT.string.isRequired,
                    name: PT.string.isRequired,
                    number: PT.string.isRequired,
                    role_description: PT.string.isRequired,
                }).isRequired,
            ).isRequired,
        }).isRequired,
    };

    renderRow = judge => {
        return (
            <tr key={judge.id}>
                <th>
                    {judge.role_description ||
                        _("global.phrases.judge_n", judge.number)}
                </th>
                <td>{`${judge.name} — ${judge.category}`}</td>
            </tr>
        );
    };
    render() {
        return (
            <table className="judges">
                <tbody>{this.props.competition.judges.map(this.renderRow)}</tbody>
            </table>
        );
    }
}
