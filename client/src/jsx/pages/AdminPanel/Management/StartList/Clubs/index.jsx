import React from "react";

import PT from "prop-types";
import Section from "./Section";
import DisciplinesShown from "../DisciplinesShown";
import Model from "common/server/Storage/models/Model";

export default class Clubs extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            clubs: PT.object.isRequired,
            disciplines: PT.object.isRequired,
            group_by_clubs: PT.bool.isRequired,
        }).isRequired,
    };

    filterClub = (club) => this.props.config.clubs[club.id];

    renderSection = (club) => {
        return (
            <Section
                club={ club }
                key={ club.id }
                { ...this.props }
            />
        );
    };
    render() {
        const clubs = this.props.competition.clubs.filter(this.filterClub);
        return (
            <div>
                <DisciplinesShown { ...this.props } />
                { clubs.map(this.renderSection) }
            </div>
        );
    }
}
