import _ from "l10n";

import getParticipantDisplay from "common/getParticipantDisplay";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudgesMap: PT.instanceOf(Map).isRequired,
            isFormation: PT.bool.isRequired,
            row: PT.shape({
                place: PT.number,
                run: PT.shape({
                    status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                    disqualified: PT.bool.isRequired,
                    participant: PT.shape({
                        number: PT.number.isRequired,
                        club: PT.shape({
                            name: PT.string.isRequired,
                        }).isRequired,
                    }).isRequired,
                    scores: PT.arrayOf(
                        PT.shape({
                            discipline_judge_id: PT.number.isRequired,
                        }).isRequired
                    ).isRequired,
                    verbose_total_score: PT.shape({
                        card: PT.oneOf(["OK", "YC", "RC"]),
                        total_penalty: PT.number,
                        primary_score: PT.number,
                        secondary_score: PT.number,
                        previous_tour: PT.shape({
                            primary_score: PT.number,
                            secondary_score: PT.number,
                        }),
                    }),
                }).isRequired,
            }).isRequired,
            showTotalScore: PT.bool.isRequired,
        };
    }
    getCard() {
        if (this.props.row.run.status !== "OK") {
            return "—";
        }
        const card = this.props.row.run.verbose_total_score.card;
        return _(`results.cards.${card}`, this.props.isFormation);
    }
    getPlace() {
        return this.props.row.run.disqualified
            ? null
            : this.props.row.place;
    }
    renderTotalScoreCell() {
        if (!this.props.showTotalScore) {
            return null;
        }
        let content = "—";
        if (this.props.row.run.status === "OK") {
            content = (
                <span>
                    <strong>
                        { this.props.row.run.verbose_total_score.primary_score.toFixed(2) }
                    </strong>
                    &nbsp;{ "/ " }
                    { this.props.row.run.verbose_total_score.secondary_score.toFixed(2) }
                </span>
            );
        }
        return (
            <td className="w-18 score">
                <p className="text-center">
                    { content }
                </p>
            </td>
        );
    }
    render() {
        return (
            <tr>
                <td
                    className="w-7 place"
                    style={ { borderRight: "1pt solid black" } }
                >
                    <p className="text-center">
                        { this.getPlace() }
                    </p>
                </td>
                <td
                    className="w-6 number"
                    style={ { fontWeight: "bold" } }
                >
                    <p className="text-center">
                        { this.props.row.run.participant.number }
                    </p>
                </td>
                <td className="w-30 participant">
                    { getParticipantDisplay(this.props.row.run.participant)
                 }</td>
                <td className="club">
                    <p>
                        { this.props.row.run.participant.club.name }
                    </p>
                </td>
                { this.renderTotalScoreCell() }
                <td className="w-8 card">
                    <p className="text-center">
                        { this.getCard() }
                    </p>
                </td>
            </tr>
        );
    }
}

Row.displayName = "rules_sets_rosfarr_ResultsTable1_Row";
