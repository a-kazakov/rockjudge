import _ from "l10n";

import getParticipantDisplay from "common/getParticipantDisplay";

export default class InfoCell extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudgesMap: PT.instanceOf(Map).isRequired,
            row: PT.shape({
                additional_data: PT.object.isRequired,
                advances: PT.bool.isRequired,
                place: PT.number,
                run: PT.shape({
                    status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                    total_score: PT.string.isRequired,
                    acrobatics: PT.arrayOf(
                        PT.shape({
                            original_score: PT.number.isRequired,
                            score: PT.number.isRequired,
                        }).isRequired
                    ).isRequired,
                    participant: PT.shape({
                        number: PT.number.isRequired,
                        formation_name: PT.string.isRequired,
                        sportsmen: PT.arrayOf(
                            PT.shape({
                                first_name: PT.string.isRequired,
                                last_name: PT.string.isRequired,
                            }).isRequired
                        ).isRequired,
                        club: PT.shape({
                            name: PT.string.isRequired,
                        }).isRequired,
                    }).isRequired,
                    scores: PT.arrayOf(
                        PT.shape({
                            discipline_judge_id: PT.number.isRequired,
                            data: PT.shape({
                                total_score: PT.oneOfType([
                                    PT.number.isRequired,
                                    PT.string.isRequired,
                                ]).isRequired,
                            }),
                        }).isRequired
                    ).isRequired,
                    verbose_total_score: PT.shape({
                        card: PT.oneOf(["OK", "YC", "RC"]),
                        previous_tour: PT.shape({
                            primary_score: PT.number,
                            secondary_score: PT.number,
                        }),
                        current_tour: PT.shape({
                            primary_score: PT.number,
                            secondary_score: PT.number,
                        }),
                    }),
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
                next_tour_id: PT.number,
            }).isRequired,
        };
    }

    getCard() {
        if (this.props.row.run.status !== "OK") {
            return "";
        }
        const card = this.props.row.run.verbose_total_score.card;
        const is_formation = ["rosfarr.formation", "rosfarr.formation_acro"].includes(this.props.tour.scoring_system_name);
        return _(`results.cards.verbose_${card}`, is_formation);
    }
    renderParticipantInfo() {
        return (
            <div>
                <p>
                    <strong>
                        { _("global.phrases.participant_n",
                            this.props.row.run.participant.number,
                            null,
                            this.props.row.run.participant.sportsmen.length)
                        }
                    </strong>
                </p>
                { getParticipantDisplay(this.props.row.run.participant) }
            </div>
        );
    }
    renderHeadJudgePenalty() {
        if (this.props.row.run.status !== "OK") {
            return null;
        }
        const card = this.getCard();
        if (card === "") {
            return;
        }
        return (
            <p>
                <strong>
                    { this.getCard() }
                </strong>
            </p>
        );
    }
    renderAcroTable() {
        if (this.props.row.run.status !== "OK") {
            return null;
        }
        if (["rosfarr.acro", "rosfarr.am_final_acro"].indexOf(this.props.tour.scoring_system_name) < 0) {
            return null;
        }
        if (this.props.row.run.acrobatics.length === 0) {
            return null;
        }
        const has_acro_overrides = this.props.row.run.acrobatics.findIndex(
            element => element.score !== element.original_score
        ) > 0;
        const acro_cell_width = `${(100 / this.props.row.run.acrobatics.length)}%`;
        return (
            <div>
                <p>
                    <strong>
                        { has_acro_overrides
                            ? _("results.labels.acrobatics_verbose")
                            : _("results.labels.acrobatics")
                        }:
                    </strong>
                </p>
                <table className="acro-table"><tbody>
                    <tr>
                        { this.props.row.run.acrobatics.map((acro, idx) =>
                            <td key={ idx } style={ { width: acro_cell_width } }>
                                <p className="text-center">
                                    { acro.original_score.toFixed(1) }
                                </p>
                            </td>
                        ) }
                    </tr>
                    { has_acro_overrides ? (
                        <tr>
                            { this.props.row.run.acrobatics.map((acro, idx) =>
                                <td key={ idx } style={ { width: acro_cell_width } }>
                                    <p className="text-center">
                                        { acro.score.toFixed(1) }
                                    </p>
                                </td>
                            ) }
                        </tr>
                    ) : null }
                </tbody></table>
            </div>
        );
    }
    renderAmClassFwScore() {
        if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
            return null;
        }
        const p_score = this.props.row.run.verbose_total_score.previous_tour.primary_score.toFixed(2);
        const s_score = this.props.row.run.verbose_total_score.previous_tour.secondary_score.toFixed(2);
        return (
            <p>
                <strong>
                    { _("results.labels.fw_score") }
                </strong>
                { `: ${p_score} / ${s_score}` }
            </p>
        );
    }
    renderAmClassAcroScore() {
        if (this.props.row.run.status !== "OK") {
            return null;
        }
        if (this.props.tour.scoring_system_name !== "rosfarr.am_final_acro") {
            return null;
        }
        const p_score = this.props.row.run.verbose_total_score.current_tour.primary_score.toFixed(2);
        const s_score = this.props.row.run.verbose_total_score.current_tour.secondary_score.toFixed(2);
        return (
            <p>
                <strong>
                    { _("results.labels.acro_score") }
                </strong>
                { `: ${p_score} / ${s_score}` }
            </p>
        );
    }
    renderTotalScore() {
        if (this.props.row.run.status !== "OK") {
            return null;
        }
        if (["rosfarr.formation", "rosfarr.formation_acro"].includes(this.props.tour.scoring_system_name)) {
            return null;
        }
        return (
            <p>
                <strong>
                    { `${_("results.labels.total_score")}: ${this.props.row.run.total_score}` }
                </strong>
            </p>
        );
    }
    renderNotPerformedLabel() {
        if (this.props.row.run.status !== "NP") {
            return null;
        }
        return (
            <p>
                <em>
                    { _("results.labels.not_performed") }
                </em>
            </p>
        )
    }
    renderDisqualifiedLabel() {
        if (!this.props.row.run.status !== "DQ") {
            return null;
        }
        return (
            <p>
                <em>
                    { _("results.labels.disqualified") }
                </em>
            </p>
        )
    }
    renderNextTourLabel() {
        if (this.props.tour.next_tour_id === null) {
            return null;
        }
        return (
            <p>
                <strong>
                    { `${_("results.labels.next_tour")}: ` }
                </strong>
                { this.props.row.advances
                    ? _("global.labels.yes")
                    : _("global.labels.no")
                }
            </p>
        );
    }
    render() {
        return (
            <td className="info-block">
                { this.renderParticipantInfo() }
                { this.renderHeadJudgePenalty() }
                { this.renderAcroTable() }
                { this.renderAmClassFwScore() }
                { this.renderAmClassAcroScore() }
                { this.renderTotalScore() }
                { this.renderNotPerformedLabel() }
                { this.renderDisqualifiedLabel() }
                { this.renderNextTourLabel() }
            </td>
        );
    }
}

InfoCell.displayName = "rules_sets_rosfarr_ResultsTable3_InfoCell";
