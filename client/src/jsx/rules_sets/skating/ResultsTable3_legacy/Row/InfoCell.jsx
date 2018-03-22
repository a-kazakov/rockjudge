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
                        crosses: PT.number.isRequired,
                    }),
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
                next_tour_id: PT.number,
            }).isRequired,
        };
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
    renderTotalScore() {
        if (this.props.row.run.status !== "OK") {
            return null;
        }
        if (["skating.final_simple"].includes(this.props.tour.scoring_system_name)) {
            return null;
        }
        return (
            <p>
                <strong>
                    { `${_("results.labels.total_score")}: ${this.props.row.run.verbose_total_score.crosses}` }
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
        if (this.props.row.run.status !== "DQ") {
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
                { this.renderTotalScore() }
                { this.renderNotPerformedLabel() }
                { this.renderDisqualifiedLabel() }
                { this.renderNextTourLabel() }
            </td>
        );
    }
}
