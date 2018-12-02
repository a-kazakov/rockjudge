import React from "react";

import PT from "prop-types";
import _ from "l10n";

import Row from "./Row";
import Acrobatics from "../Acrobatics";
import SportsmenList from "../SportsmenList";
import StatInfo from "../StatInfo";
import Model from "common/server/Storage/models/Model";

export default class Section extends React.Component {
    static propTypes = {
        config: PT.shape({
            include_acrobatics: PT.bool.isRequired,
            show_sportsmen_only: PT.bool.isRequired,
            disciplines: PT.object.isRequired,
            clubs: PT.object.isRequired,
        }).isRequired,
        discipline: PT.instanceOf(Model).isRequired,
    };

    filterParticipant = (participant) => this.props.config.clubs[participant.club.id];

    renderRows(participants) {
        let result = [];
        for (const participant of participants) {
            const include_acrobatics =
                this.props.config.include_acrobatics &&
                participant.programs.length !== 0;
            result.push(
                <Row
                    acroIncluded={ include_acrobatics }
                    config={ this.props.config }
                    key={ `P${participant.id}` }
                    participant={ participant }
                />
            );
            if (include_acrobatics) {
                result.push(
                    <Acrobatics
                        config={ this.props.config }
                        key={ `A${participant.id}` }
                        participant={ participant }
                    />
                )
            }
        }
        return result;
    }
    renderBody(participants) {
        if (this.props.config.show_sportsmen_only) {
            return (
                <SportsmenList
                    config={ this.props.config }
                    participants={ participants }
                />
            );
        }
        return (
            <table className="outer"><thead>
                <tr>
                    <th className="w-8 number">
                        <p>
                            { _("models.participant.number") }
                        </p>
                    </th>
                    <th className="w-27 name">
                        <p className="text-left">
                            { _("models.participant.sportsmen") }
                        </p>
                    </th>
                    <th className="w-9 year-of-birth">
                        <p>
                            { _("models.participant.sportsmen_year_of_birth") }
                        </p>
                    </th>
                    <th className="w-28 club">
                        <p className="text-left">
                            { _("models.participant.club_name") }
                        </p>
                    </th>
                    <th className="w-28 coaches">
                        <p className="text-left">
                            { _("models.participant.coaches") }
                        </p>
                    </th>
                </tr>
            </thead><tbody>
                { this.renderRows(participants) }
            </tbody></table>
        );
    }
    render() {
        const participants = this.props.discipline.participants.filter(this.filterParticipant);
        return (
            <div>
                <h5>
                    <p>
                        { this.props.discipline.name }
                    </p>
                </h5>
                <div className="discipline">
                    { this.renderBody(participants) }
                    <StatInfo
                        participants={ participants }
                    />
                </div>
            </div>
        );
    }
}
