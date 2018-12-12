import React from "react";

import PT from "prop-types";
import DisciplinesShown from "./DisciplinesShown";
import StatInfo from "./StatInfo";
import Model from "common/server/Storage/models/Model";

export default class ClubsSummary extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            clubs: PT.object.isRequired,
            disciplines: PT.object.isRequired,
            group_by_clubs: PT.bool.isRequired,
        }).isRequired,
    };

    filterParticipant = participant =>
        this.props.config.disciplines[participant.discipline.id];
    filterClub = club => this.props.config.clubs[club.id];

    renderClub = club => {
        return (
            <StatInfo
                tableRow
                key={club.id}
                label={`${club.name}, ${club.city}`}
                participants={club.participants.filter(this.filterParticipant)}
            />
        );
    };
    render() {
        const clubs = this.props.competition.clubs.filter(this.filterClub);
        const all_participants = [].concat.apply([], clubs.map(c => c.participants));
        return (
            <div className="summary">
                <DisciplinesShown {...this.props} />
                <table className="outer">
                    <tbody>
                        <tr>
                            <th colSpan={4}>&nbsp;</th>
                        </tr>
                        {clubs.map(this.renderClub)}
                    </tbody>
                </table>
                <p>&nbsp;</p>
                <StatInfo participants={all_participants} />
            </div>
        );
    }
}
