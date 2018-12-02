import React from "react";

import PT from "prop-types";
import Section from "./Section";
import ClubsShown from "../ClubsShown";
import Model from "common/server/Storage/models/Model";

export default class Disciplines extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            clubs: PT.object.isRequired,
            disciplines: PT.object.isRequired,
            group_by_clubs: PT.bool.isRequired,
        }).isRequired,
    };

    filterDiscipline = (discipline) => this.props.config.disciplines[discipline.id];

    renderSection = (discipline) => {
        return (
            <Section
                discipline={ discipline }
                key={ discipline.id }
                { ...this.props }
            />
        );
    };
    render() {
        const disciplines = this.props.competition.disciplines.filter(this.filterDiscipline);
        return (
            <div>
                <ClubsShown { ...this.props } />
                { disciplines.map(this.renderSection) }
            </div>
        );
    }
}
