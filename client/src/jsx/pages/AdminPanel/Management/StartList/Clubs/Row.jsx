import React from "react";

import PT from "prop-types";
import ParticipantCell from "../ParticipantCell";
import Model from "common/server/Storage/models/Model";

export default class Row extends React.Component {
    static propTypes = {
        acroIncluded: PT.bool.isRequired,
        config: PT.object.isRequired,
        participant: PT.instanceOf(Model).isRequired,
    };

    render() {
        const class_name = this.props.acroIncluded ? "has-acro" : "";
        const coaches = this.props.participant.coaches.split(",").map(
            coach => [coach.trim(), <br key="X" />]
        );
        return (
            <tr className={ class_name }>
                <td
                    className="w-8 number"
                    style={ { borderRight: "1pt solid black" } }
                >
                    <p className="text-center">
                        { this.props.participant.number }
                    </p>
                </td>
                <td className="w-36 name" colSpan="2">
                    <ParticipantCell
                        config={ this.props.config }
                        participant={ this.props.participant }
                    />
                </td>
                <td className="w-28 club">
                    <p>
                        { this.props.participant.discipline.name }
                    </p>
                </td>
                <td className="w-28 coaches">
                    <p>
                        { coaches }
                    </p>
                </td>
            </tr>
        );
    }
}