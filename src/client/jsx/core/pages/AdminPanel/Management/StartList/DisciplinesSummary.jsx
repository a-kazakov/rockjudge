import React from "react";

import PT from "prop-types";
import ClubsShown from "./ClubsShown";
import StatInfo from "./StatInfo";
import Model from "common/server/Storage/models/Model";

export default class DisciplinesSummary extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            clubs: PT.object.isRequired,
            disciplines: PT.object.isRequired,
            group_by_clubs: PT.bool.isRequired,
        }).isRequired,
    };

    filterParticipant = participant => this.props.config.clubs[participant.club.id];
    filterDiscipline = discipline => this.props.config.disciplines[discipline.id];

    renderDiscipline = discipline => {
        return (
            <StatInfo
                tableRow
                key={discipline.id}
                label={`${discipline.name}`}
                participants={discipline.participants.filter(this.filterParticipant)}
            />
        );
    };
    render() {
        const disciplines = this.props.competition.disciplines.filter(
            this.filterDiscipline,
        );
        const all_participants = [].concat.apply(
            [],
            disciplines.map(d => d.participants),
        );
        return (
            <div className="summary">
                <ClubsShown {...this.props} />
                <table className="outer">
                    <tbody>
                        <tr>
                            <th colSpan={4}>&nbsp;</th>
                        </tr>
                        {disciplines.map(this.renderDiscipline)}
                    </tbody>
                </table>
                <p>&nbsp;</p>
                <StatInfo participants={all_participants} />
            </div>
        );
    }
}
