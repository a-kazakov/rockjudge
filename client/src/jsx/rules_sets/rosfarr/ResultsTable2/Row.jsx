import _ from "l10n";

import getParticipantDisplay from "common/getParticipantDisplay";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudgesMap: PT.instanceOf(Map).isRequired,
            lineDisciplineJudges: PT.arrayOf(
                PT.shape({
                    role: PT.string.isRequired,
                }).isRequired
            ).isRequired,
            row: PT.shape({
                additional_data: PT.object.isRequired,
                place: PT.number,
                run: PT.shape({
                    performed: PT.bool.isRequired,
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
                        primary_score: PT.number,
                        secondary_score: PT.number,
                        previous_tour: PT.shape({
                            primary_score: PT.number,
                            secondary_score: PT.number,
                        }),
                        total_penalty: PT.number,
                    }),
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
            showTotalScore: PT.bool.isRequired,
        };
    }

    isFormation() {
        return ["rosfarr.formation", "rosfarr.formation_acro"].indexOf(this.props.tour.scoring_system_name) >= 0;
    }

    getCard() {
        if (!this.props.row.run.performed) {
            return "—";
        }
        return this.props.row.run.verbose_total_score.total_penalty.toFixed();
    }
    renderFormationScore(score) {
        return (
            <p className="text-center">
                <strong>
                    { this.props.row.additional_data.places[score.id] }
                </strong>
                { ` (${score.data.total_score.toFixed(1)})` }
            </p>
        );
    }
    renderScore(discipline_judge, score) {
        if (!this.props.row.run.performed) {
            return (
                <p className="text-center">
                    &mdash;
                </p>
            );
        }
        if (discipline_judge.role === "dance_judge" && this.isFormation()) {
            return this.renderFormationScore(score);
        }
        return (
            <p className="text-center">
                { score.data.total_score.toFixed(2) }
            </p>
        );
    }
    renderTotalScoreCell() {
        const total_score = this.props.row.run.verbose_total_score;
        if (!this.props.showTotalScore) {
            return null;
        }
        if (!this.props.row.run.performed) {
            return (
                <td className="total-score">
                    <p className="text-center">
                        &mdash;
                    </p>
                </td>
            );
        }
        if (this.props.tour.scoring_system_name === "rosfarr.am_final_acro") {
            const p_score = total_score.previous_tour.primary_score.toFixed(2);
            const s_score = total_score.previous_tour.secondary_score.toFixed(2);
            return (
                <td className="total-score">
                    <p className="text-center">
                        <em>
                            { `${_("results.labels.fw_score_short") }: ${p_score} / ${s_score}` }
                        </em>
                        <br />
                        <strong>
                            { total_score.primary_score.toFixed(2) }
                        </strong>
                        &nbsp;{ "/ " }
                        { total_score.secondary_score.toFixed(2) }
                    </p>
                </td>
            );
        }
        return (
            <td className="total-score">
                <p className="text-center">
                    <strong>
                        { total_score.primary_score.toFixed(2) }
                    </strong>
                    &nbsp;{ "/ " }
                    { total_score.secondary_score.toFixed(2) }
                </p>
            </td>
        );
    }
    renderJudgesScores() {
        const scores_map = new Map(this.props.row.run.scores.map(score => [score.discipline_judge_id, score]));
        return this.props.lineDisciplineJudges.map((dj, idx) =>
            <td key={ dj ? dj.id : `I${idx}` }>
                { this.renderScore(dj, scores_map.get(dj.id)) }
            </td>
        );
    }
    render() {
        return (
            <tr>
                <td className="place">
                    <p className="text-center">
                        { this.props.row.place }
                    </p>
                </td>
                <td className="number">
                    <p className="text-center">
                        { this.props.row.run.participant.number }
                    </p>
                </td>
                <td className="participant">
                    { getParticipantDisplay(this.props.row.run.participant) }
                </td>
                { this.renderTotalScoreCell() }
                { this.renderJudgesScores() }
                <td className="card">
                    <p className="text-center">
                        { this.getCard() }
                    </p>
                </td>
            </tr>
        );
    }
}

Row.displayName = "rules_sets_rosfarr_ResultsTable2_Row";
