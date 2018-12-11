import React from "react";

import PT from "prop-types";
import _ from "l10n";
import CmpChain from "common/tools/CmpChain";

import StatInfo from "./StatInfo";
import Model from "common/server/Storage/models/Model";

export default class SportsmenList extends React.Component {
    static propTypes = {
        config: PT.shape({
            clubs: PT.object.isRequired,
            disciplines: PT.object.isRequired,
        }).isRequired,
        participants: PT.arrayOf(PT.instanceOf(Model).isRequired).isRequired,
    };

    filterParticipant = participant => {
        return (
            this.props.config.disciplines[participant.discipline.id] &&
            this.props.config.clubs[participant.club.id]
        );
    };

    renderSportsman = (sportsman, idx) => {
        return (
            <tr key={idx}>
                <td className="w-5" style={{ borderRight: "1pt solid black" }}>
                    <p className="text-right">{idx + 1}</p>
                </td>
                <td className="w-35">
                    <p className="text-left">
                        {`${sportsman.last_name} ${sportsman.first_name}`}
                    </p>
                </td>
                <td className="w-15">
                    <p className="text-center">{sportsman.year_of_birth}</p>
                </td>
                <td className="w-15">
                    <p className="text-center">
                        {sportsman.gender === "F"
                            ? _("models.participant.gender_f")
                            : _("models.participant.gender_m")}
                    </p>
                </td>
                <td className="w-15">
                    <p className="text-center">{sportsman.p_count}</p>
                </td>
                <td className="w-15">
                    <p className="text-center">{sportsman.s_count}</p>
                </td>
            </tr>
        );
    };

    render() {
        let sportsmen = StatInfo.getUniqueSportsmen(
            this.props.participants.filter(this.filterParticipant),
        );
        sportsmen.sort((a, b) =>
            CmpChain()
                .cmp(a.last_name, b.last_name)
                .cmp(a.first_name, b.first_name)
                .cmp(a.gender, b.gender)
                .cmp(a.year_of_birth, b.year_of_birth)
                .end(),
        );
        return (
            <table className="outer">
                <thead>
                    <tr>
                        <th className="w-5">
                            <p>&nbsp;</p>
                        </th>
                        <th className="w-35">
                            <p className="text-left">
                                {_("models.participant.sportsman")}
                            </p>
                        </th>
                        <th className="w-15">
                            <p className="text-center">{_("models.participant.yob")}</p>
                        </th>
                        <th className="w-15">
                            <p className="text-center">
                                {_("models.participant.gender")}
                            </p>
                        </th>
                        <th className="w-15">
                            <p className="text-center">
                                {_("models.participant.substitute_n")}
                            </p>
                        </th>
                        <th className="w-15">
                            <p className="text-center">
                                {_("models.participant.substitute_y")}
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>{sportsmen.map(this.renderSportsman)}</tbody>
            </table>
        );
    }
}
