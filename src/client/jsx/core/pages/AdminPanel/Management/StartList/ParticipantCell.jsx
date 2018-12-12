import React from "react";

import PT from "prop-types";
import _ from "l10n";

export default class ParticipantCell extends React.Component {
    static propTypes = {
        config: PT.shape({
            include_formation_sportsmen: PT.bool.isRequired,
        }).isRequired,
        participant: PT.shape({
            formation_name: PT.string.isRequired,
            sportsmen: PT.arrayOf(
                PT.shape({
                    last_name: PT.string.isRequired,
                    first_name: PT.string.isRequired,
                    substitute: PT.bool.isRequired,
                }).isRequired,
            ).isRequired,
        }).isRequired,
    };
    renderFormationName() {
        const formation_name = this.props.participant.formation_name;
        if (formation_name !== "") {
            return (
                <tr key="FN">
                    <th colSpan="2">
                        <p className="text-left">{formation_name}</p>
                    </th>
                </tr>
            );
        }
        return null;
    }
    renderSportsmen() {
        if (
            this.props.config.include_formation_sportsmen ||
            this.props.participant.formation_name === ""
        ) {
            return this.props.participant.sportsmen.map((s, idx) => (
                <tr key={idx}>
                    <td className="w-75">
                        <p>
                            {`${s.last_name} ${s.first_name}`}
                            {s.substitute ? (
                                <i>{` (${_("admin.labels.sub")}.)`}</i>
                            ) : null}
                        </p>
                    </td>
                    <td className="w-25">
                        <p className="text-center">{s.year_of_birth}</p>
                    </td>
                </tr>
            ));
        }
    }
    render() {
        return (
            <table className="inner">
                <tbody>
                    {this.renderFormationName()}
                    {this.renderSportsmen()}
                </tbody>
            </table>
        );
    }
}
