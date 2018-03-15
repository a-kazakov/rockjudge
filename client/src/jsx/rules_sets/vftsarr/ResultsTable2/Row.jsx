import _ from "l10n";

import getParticipantDisplay from "common/getParticipantDisplay";
import {CRITERIAS_ORDER} from "common/constants";
import getCard from "common/getCard";
import checkSS from "common/checkSS";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            row: PT.shape({
                place: PT.number,
                run: PT.shape({
                    status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                    participant: PT.shape({
                        number: PT.number.isRequired,
                        name: PT.string.isRequired,
                        sportsmen: PT.array.isRequired,
                    }).isRequired,
                    scores: PT.arrayOf(
                        PT.shape({
                            discipline_judge_id: PT.number.isRequired,
                        }).isRequired
                    ).isRequired,
                    verbose_total_score: PT.shape({
                        card: PT.oneOf(["OK", "YC", "RC"]),
                        criterias_scores: PT.object,
                        score_value: PT.number,
                        acro_score: PT.number,
                        fw_score: PT.number,
                        undercount: PT.number,
                        fall_down: PT.number,
                    }),
                }).isRequired,
            }).isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
        };
    }

    getPlace() {
        return this.props.row.run.status === "DQ"
            ? null
            : this.props.row.place;
    }
    renderTotalScoreCell() {
        const total_score = this.props.row.run.verbose_total_score;
        if (this.props.row.run.status !== "OK") {
            return (
                <td className="total-score">
                    <p className="text-center">
                        &mdash;
                    </p>
                </td>
            );
        }
        if (this.props.tour.scoring_system_name === "vftsarr.am_final_acro") {
            const fw_score = total_score.fw_score.toFixed(3);
            const acro_score = total_score.acro_score.toFixed(3);
            return (
                <td className="total-score">
                    <p className="text-center">
                        <em>
                            { `${_("results.labels.fw_score_short") }: ${fw_score}` }
                        </em>
                        <br />
                        <em>
                            { `${_("results.labels.acro_score_short") }: ${acro_score}` }
                        </em>
                        <br />
                        <strong>
                            { `${_("results.labels.total_score") }: ${total_score.score_value.toFixed(3)}` }
                        </strong>
                    </p>
                </td>
            );
        }
        return (
            <td className="total-score">
                <p className="text-center">
                    <strong>
                        { total_score.score_value.toFixed(3) }
                    </strong>
                </p>
            </td>
        );
    }
    renderCriterias(criterias, table_key) {
        const ROW_SIZE = 5;
        let row_buffer = [];
        let rows = [];
        const cell_width = Math.min(ROW_SIZE, criterias.length);
        const cell_style = { "border": "none", "width": `${cell_width}%` };
        for (let idx = 0; idx < criterias.length; ++idx) {
            const cr_name = criterias[idx];
            const cr_value = this.props.row.run.verbose_total_score.criterias_scores[cr_name];
            const cr_name_loc = _(`score_parts.components.short.${cr_name}`);
            row_buffer.push(
                <td
                    key={ cr_name }
                    style={ cell_style }
                >
                    <p className="text-center">
                        <strong>
                            { `${cr_name_loc} ` }
                        </strong>
                        { cr_value.toFixed(3) }
                    </p>
                </td>
            );
            if (row_buffer.length >= ROW_SIZE) {
                rows.push(
                    <tr key={ idx }>
                        { row_buffer }
                    </tr>
                );
                row_buffer = [];
            }
        }
        if (row_buffer.length > 0) {
            if (rows.length > 0) {
                while (row_buffer.length < ROW_SIZE) {
                    row_buffer.push(
                        <td
                            key={ row_buffer.length }
                            style={ cell_style }
                        >
                            <p>
                                &nbsp;
                            </p>
                        </td>
                    );
                }
            }
            rows.push(
                <tr key="last">
                    { row_buffer }
                </tr>
            );
        }
        return (
            <table
                key={ table_key }
                style={ { width: "100%", tableLayout: "fixed" } }
            >
                <tbody>
                    { rows }
                </tbody>
            </table>
        );
    }
    renderJudgesScores() {
        const criterias = this.props.row.run.verbose_total_score.criterias_scores;
        if (!criterias) {
            return (
                <span>&mdash;</span>
            );
        }
        const acro_criterias = Object.keys(criterias)
            .filter(c => /^a\d$/.test(c))
            .sort((a, b) => CRITERIAS_ORDER.get(a) - CRITERIAS_ORDER.get(b));
        const dance_criterias = Object.keys(criterias)
            .filter(c => !/^a\d$/.test(c))
            .sort((a, b) => CRITERIAS_ORDER.get(a) - CRITERIAS_ORDER.get(b));
        const result = [];
        result.push(this.renderCriterias(dance_criterias, "dance"));
        if (acro_criterias.length > 0) {
            result.push(this.renderCriterias(acro_criterias, "acro"));
        }
        return result;
    }
    renderAdditionalData() {
        const need_undercount = checkSS(this.props.tour.scoring_system_name, "formation") &&
            this.props.row.run.verbose_total_score.undercount > 0;
        const need_fall_down = checkSS(this.props.tour.scoring_system_name, "acro") &&
            this.props.row.run.verbose_total_score.fall_down > 0;
        if (!need_undercount && !need_fall_down) {
            return null;
        }
        return (
            <table style={ {width: "100%"} }>
                <tbody>
                    <tr>
                        { need_undercount ? (
                            <td style={ {border: "none"} }>
                                <p className="text-center">
                                    <strong>
                                        { `${_("score_parts.tech.long.undercount")}: ` }
                                    </strong>
                                    { this.props.row.run.verbose_total_score.undercount}
                                </p>
                            </td>
                        ) : null }
                        { need_fall_down ? (
                            <td style={ {border: "none"} }>
                                <p className="text-center">
                                    <strong>
                                        { `${_("score_parts.tech.long.fall_down")}: ` }
                                    </strong>
                                    { this.props.row.run.verbose_total_score.fall_down}
                                </p>
                            </td>
                        ) : null }
                    </tr>
                </tbody>
            </table>
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
                <td>
                    { getParticipantDisplay(this.props.row.run.participant) }
                </td>
                <td className="text-center">
                    { this.renderJudgesScores() }
                    { this.renderAdditionalData() }
                </td>
                { this.renderTotalScoreCell() }
                <td>
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

