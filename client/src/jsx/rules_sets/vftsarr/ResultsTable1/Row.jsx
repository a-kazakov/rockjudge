import { React } from "HostModules";

import getCard from "common/getCard";
import getParticipantDisplay from "common/getParticipantDisplay";
import PT from "prop-types";

export default class Row extends React.Component {
    static propTypes = {
        row: PT.shape({
            run: PT.object.isRequired,
            run_result: PT.object.isRequired,
            scores: PT.object.isRequired,
        }).isRequired,
    };

    render() {
        return (
            <tr>
                <td className="place" style={{ borderRight: "1pt solid black" }}>
                    <p className="text-center">{this.props.row.run_result.place}</p>
                </td>
                <td className="number" style={{ fontWeight: "bold" }}>
                    <p className="text-center">
                        {this.props.row.run.participant.number}
                    </p>
                </td>
                <td className="participant">
                    {getParticipantDisplay(this.props.row.run.participant)}
                </td>
                <td className="club">
                    <p>{this.props.row.run.participant.club.name}</p>
                </td>
                <td className="total-score">
                    <p className="text-center">
                        {this.props.row.run_result.total_score_str}
                    </p>
                </td>
                <td className="card">
                    {getCard(this.props.row.run_result, this.props.row.run.tour, {
                        reasons_style: { fontSize: "8pt" },
                        p_class: "text-center",
                    })}
                </td>
            </tr>
        );
    }
}
