import _ from "l10n";

import getParticipantDisplay from "common/getParticipantDisplay";

export default class Row extends React.Component {
    renderFormationScore(score, additiolal_data) {
        return (
            <p className="text-center">
                <strong>{ additiolal_data.places[score.id] }</strong>
                ({ score.data.total_score.toFixed(1) })
            </p>
        );
    }
    renderScore(judge, score, additiolal_data) {
        if (judge.role === "dance_judge") {
            if (this.props.tour.scoring_system_name === "rosfarr.formation" ||
                this.props.tour.scoring_system_name === "rosfarr.formation_acro"
            ) {
                return this.renderFormationScore(score, additiolal_data)
            }
        }
        return <p className="text-center">{ score.data.total_score.toFixed(2) }</p>;
    }
    render() {
        const judges_scores = this.props.run.performed
            ? this.props.scores.map((score, idx) =>
                <td key={ idx }>
                    { this.renderScore(this.props.discipline_judges[idx], score, this.props.results_info.additional_data) }
                </td>
            ) : this.props.scores.map((score, idx) => (
                <td key={ idx }>
                    <p className="text-center">
                        &mdash;
                    </p>
                </td>
            )
        );
        const total_score = this.props.run.verbose_total_score;
        return (
            <tr>
                <td className="place"><p className="text-center">{ this.props.results_info.place }</p></td>
                <td className="number"><p className="text-center">{ this.props.run.participant.number }</p></td>
                <td className="participant">{ getParticipantDisplay(this.props.run.participant) }</td>
                { (this.props.tour.scoring_system_name !== "rosfarr.formation" &&
                   this.props.tour.scoring_system_name !== "rosfarr.formation_acro")
                    ? (
                        <td className="total-score">
                            { (() => {
                                if (!this.props.run.performed) {
                                    return <p className="text-center">&mdash;</p>;
                                }
                                if (this.props.tour.scoring_system_name === "rosfarr.am_final_acro") {
                                    const p_score = total_score.previous_tour.primary_score.toFixed(2);
                                    const s_score = total_score.previous_tour.secondary_score.toFixed(2);
                                    return (
                                        <p className="text-center">
                                            <em>
                                                { `${_("results.labels.fw_score_short") }: ${p_score} / ${s_score}` }
                                            </em>
                                            <br />
                                            <strong>{ total_score.primary_score.toFixed(2) }</strong>
                                            &nbsp;{"/ "}{ total_score.secondary_score.toFixed(2) }
                                        </p>
                                    );
                                }
                                return <p className="text-center">
                                    <strong>{ total_score.primary_score.toFixed(2) }</strong>
                                    &nbsp;/{" "}{ total_score.secondary_score.toFixed(2) }
                                </p>;
                            })() }
                        </td>
                    ) : null
                }
                { judges_scores }
                <td className="card"><p className="text-center">{
                    this.props.head_judge_score && this.props.run.performed
                        ? this.props.head_judge_score.data.total_score
                        : <span>&mdash;</span>
                }</p></td>
            </tr>
        );
    }
}
