import _ from "l10n";

import getParticipantDisplay from "common/getParticipantDisplay";
import getCardReasons from "common/getCardReasons";
import checkSS from "common/checkSS";

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
    renderCard() {
        if (this.props.row.run.status !== "OK") {
            return null;
        }
        const card = this.props.row.run.verbose_total_score.card;
        const texts = getCardReasons(this.props.tour.scoring_system_name)
            .filter(cr => this.props.row.run.verbose_total_score.card_reasons[cr])
            .map(cr => _(`cards_reasons.long.${cr.toLowerCase()}`));
        let result = [];
        if (card === "OK") {
            return null;
        }
        result.push(
            <p key="C">
                <strong>
                    { _(`cards.verbose.${card}`) }
                </strong>
            </p>
        );
        result = result.concat(texts.map((text, idx) => (
            <p
                key={ idx }
                style={ { marginLeft: "5pt", fontStyle: "italic"} }
            >
                { text }
            </p>
        )));
        return result;
    }
    renderAcroTable() {
        if (this.props.row.run.status !== "OK") {
            return null;
        }
        if (!checkSS(this.props.tour.scoring_system_name, "acro")) {
            return null;
        }
        if (this.props.row.run.acrobatics.length === 0) {
            return null;
        }
        const has_acro_overrides = this.props.row.run.acrobatics.some(
            element => element.score !== element.original_score
        );
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
                <table
                    className="acro-table"
                    style={ {tableLayout: "fixed"} }
                >
                    <tbody>
                        <tr>
                            { this.props.row.run.acrobatics.map((acro, idx) =>
                                <td key={ idx }>
                                    <p className="text-center">
                                        { acro.original_score.toFixed(1) }
                                    </p>
                                </td>
                            ) }
                        </tr>
                        { has_acro_overrides ? (
                            <tr>
                                { this.props.row.run.acrobatics.map((acro, idx) =>
                                    <td key={ idx }>
                                        <p className="text-center">
                                            { acro.score.toFixed(1) }
                                        </p>
                                    </td>
                                ) }
                            </tr>
                        ) : null }
                    </tbody>
                </table>
            </div>
        );
    }
    renderAmClassFwScore() {
        if (this.props.tour.scoring_system_name !== "vftsarr.am_final_acro") {
            return null;
        }
        const score = this.props.row.run.verbose_total_score.fw_score.toFixed(3);
        return (
            <p>
                <strong>
                    { _("results.labels.fw_score") }
                </strong>
                { `: ${score}` }
            </p>
        );
    }
    renderAmClassAcroScore() {
        if (this.props.row.run.status !== "OK") {
            return null;
        }
        if (this.props.tour.scoring_system_name !== "vftsarr.am_final_acro") {
            return null;
        }
        const score = this.props.row.run.verbose_total_score.acro_score.toFixed(3);
        return (
            <p>
                <strong>
                    { _("results.labels.acro_score") }
                </strong>
                { `: ${score}` }
            </p>
        );
    }
    renderTotalScore() {
        if (this.props.row.run.status !== "OK") {
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
                { this.renderCard() }
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

