import React from "react";

import PT from "prop-types";

export default class CompetitionInfo extends React.Component {
    static propTypes = {
        competition: PT.shape({
            info: PT.arrayOf(PT.arrayOf(PT.string.isRequired).isRequired).isRequired,
        }).isRequired,
    };

    renderRow = (row, idx) => {
        const [label, value] = row;
        return (
            <tr key={idx}>
                <th>{label}</th>
                <td>{value}</td>
            </tr>
        );
    };
    render() {
        return (
            <table className="competition-info">
                <tbody>{this.props.competition.info.map(this.renderRow)}</tbody>
            </table>
        );
    }
}
