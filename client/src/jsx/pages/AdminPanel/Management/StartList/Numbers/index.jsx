import React from "react";

import PT from "prop-types";
import Docx from "common/Docx";

import OneNumber from "./OneNumber";
import Model from "common/server/Storage/models/Model";

export default class Numbers extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            clubs: PT.object.isRequired,
            disciplines: PT.object.isRequired,
            group_by_clubs: PT.bool.isRequired,
        }).isRequired,
    };

    static getParticipants = (group) => group.participants;

    makeRef = (ref) => this._body = ref;

    makeParticipantsList() {
        const groups = this.props.config.group_by_clubs
            ? this.props.competition.clubs
            : this.props.competition.disciplines;
        return [].concat.apply([], groups.map(this.constructor.getParticipants))
            .filter(this.filterParticipant);
    }

    filterParticipant = (participant) => {
        return (
            this.props.config.disciplines[participant.discipline.id]
            && this.props.config.clubs[participant.club.id]
        );
    };

    render() {  // eslint-disable-line react/sort-comp
        return (
            <div className="print-only" ref={ this.makeRef }>
                { this.makeParticipantsList().map((participant) =>
                    <OneNumber
                        competition={ this.props.competition }
                        key={ participant.id }
                        participant={ participant }
                    />
                ) }
            </div>
        );
    }

    createDocx(filename="numbers.docx") {
        Docx(filename)
            .setMargins([0, 10, 0, 10])
            .setBody(this._body.innerHTML)
            .addStyle("div", "margin", "0")
            .addStyle("div", "padding", "0")
            .addStyle("p", "mso-line-height-rule", "exactly")
            .addStyle("div", "mso-line-height-rule", "exactly")
            .addStyle(".participant", "text-align", "center")

            .addStyle(".spacer-top", "line-height", "20pt")
            .addStyle(".competition", "line-height", "15pt")
            .addStyle(".spacer-top2", "line-height", "30pt")
            .addStyle(".number", "line-height", "300pt")
            .addStyle(".name", "line-height", "10pt")
            .addStyle(".club", "line-height", "10pt")
            .addStyle(".discipline", "line-height", "10pt")
            .addStyle(".spacer-bottom", "line-height", "16pt")

            .addStyle(".number", "font-size", "350pt")
            .addStyle(".number", "letter-spacing:", "-20.0pt")
            .addStyle(".competition", "font-size", "12pt")
            .addStyle(".competition", "font-weight", "bold")
            .addStyle(".competition", "border-bottom", "1pt solid black")
            .addStyle(".name", "font-size", "12pt")
            .addStyle(".name", "font-weight", "bold")
            .addStyle(".club", "font-size", "12pt")
            .addStyle(".discipline", "font-size", "12pt")

            .save();
    }
}
