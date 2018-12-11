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
        club: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            include_acrobatics: PT.bool.isRequired,
            show_sportsmen_only: PT.bool.isRequired,
            disciplines: PT.object.isRequired,
        }).isRequired,
    };

    filterParticipant = participant =>
        this.props.config.disciplines[participant.discipline.id];

    renderRows(participants) {
        let result = [];
        for (const p of participants) {
            const include_acrobatics =
                this.props.config.include_acrobatics && p.programs.length > 0;
            result.push(
                <Row
                    acroIncluded={include_acrobatics}
                    config={this.props.config}
                    key={`P${p.id}`}
                    participant={p}
                />,
            );
            if (include_acrobatics) {
                result.push(
                    <Acrobatics
                        config={this.props.config}
                        key={`A${p.id}`}
                        participant={p}
                    />,
                );
            }
        }
        return result;
    }
    renderBody(participants) {
        if (this.props.config.show_sportsmen_only) {
            return (
                <SportsmenList config={this.props.config} participants={participants} />
            );
        }
        return (
            <table className="outer">
                <thead>
                    <tr>
                        <th className="w-8 number">
                            <p>{_("models.participant.number")}</p>
                        </th>
                        <th className="w-27 name">
                            <p className="text-left">
                                {_("models.participant.sportsmen")}
                            </p>
                        </th>
                        <th className="w-9 year-of-birth">
                            <p>{_("models.participant.sportsmen_year_of_birth")}</p>
                        </th>
                        <th className="w-28 discipline">
                            <p className="text-left">
                                {_("models.participant.discipline_name")}
                            </p>
                        </th>
                        <th className="w-28 coaches">
                            <p className="text-left">
                                {_("models.participant.coaches")}
                            </p>
                        </th>
                    </tr>
                </thead>
                <tbody>{this.renderRows(participants)}</tbody>
            </table>
        );
    }
    render() {
        const participants = this.props.club.participants.filter(
            this.filterParticipant,
        );
        return (
            <div>
                <h5>
                    <p>{`${this.props.club.name}, ${this.props.club.city}`}</p>
                </h5>
                <div className="club">
                    {this.renderBody(participants)}
                    <StatInfo participants={participants} />
                </div>
            </div>
        );
    }
}
