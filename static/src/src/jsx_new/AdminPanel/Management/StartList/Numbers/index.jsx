import Docx from "common/Docx";

import OneNumber from "./OneNumber";

export default class Numbers extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
            participantsGroups: PT.arrayOf(
                PT.oneOfType([
                    PT.shape({
                        participants: PT.arrayOf(
                            PT.shape({
                                id: PT.number.isRequired,
                                name: PT.string.isRequired,
                                club: PT.object.isRequired,
                            }).isRequired
                        ).isRequired,
                        name: PT.string.isRequired,
                    }).isRequired,
                    PT.shape({
                        participants: PT.arrayOf(
                            PT.shape({
                                id: PT.number.isRequired,
                                name: PT.string.isRequired,
                                discipline: PT.shape({
                                    name: PT.string.isRequired,
                                }).isRequired,
                            }).isRequired
                        ).isRequired,
                        club: PT.object.isRequired,
                    }).isRequired,
                ]).isRequired
            ).isRequired,
        };
    }

    makeRef = (ref) => this._body = ref;

    makeParticipantsList() {
        let res = [];
        for (const group of this.props.participantsGroups) {
            res = res.concat(group.participants.map(participant => ({
                id: participant.id,
                number: participant.number,
                name: participant.name,
                club: participant.club
                    ? participant.club
                    : group.club,
                discipline_name: participant.discipline
                    ? participant.discipline.name
                    : group.name,
            })))
        }
        return res;
    }

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

Numbers.displayName = "AdminPanel_Management_StartList_Numbers";
