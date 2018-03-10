import _ from "l10n";

import getParticipantDisplay from "common/getParticipantDisplay";
import getCardReasons from "common/getCardReasons";
import getCard from "common/getCard";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudgesMap: PT.instanceOf(Map).isRequired,
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
                        card_reasons: PT.object,
                        score_value: PT.number,
                        fw_score: PT.number,
                        acro_score: PT.number,
                    }),
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }
    getPlace() {
        return this.props.row.run.disqualified
            ? null
            : this.props.row.place;
    }
    renderTotalScoreCell() {
        let content = "—";
        if (this.props.row.run.status === "OK") {
            content =  this.props.row.run.verbose_total_score.score_value.toFixed(3);
        }
        return (
            <td className="score">
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
                    className="place"
                    style={ { borderRight: "1pt solid black" } }
                >
                    <p className="text-center">
                        { this.getPlace() }
                    </p>
                </td>
                <td
                    className="number"
                    style={ { fontWeight: "bold" } }
                >
                    <p className="text-center">
                        { this.props.row.run.participant.number }
                    </p>
                </td>
                <td className="participant">
                    { getParticipantDisplay(this.props.row.run.participant) }
                </td>
                <td className="club">
                    <p>
                        { this.props.row.run.participant.club.name }
                    </p>
                </td>
                { this.renderTotalScoreCell() }
                <td className="card">
                    { getCard(
                        this.props.row.run,
                        this.props.tour,
                        {reasons_style: {fontSize: "8pt"}, p_class: "text-center"})
                    }
                </td>
            </tr>
        );
    }
}

