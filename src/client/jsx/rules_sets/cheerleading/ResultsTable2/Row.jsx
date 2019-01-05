import { React } from "HostModules";

import { CRITERIAS_ORDER } from "common/constants";
import getParticipantDisplay from "common/getParticipantDisplay";
import _ from "l10n";
import PT from "prop-types";

export default class Row extends React.Component {
    static propTypes = {
        row: PT.shape({
            run: PT.object.isRequired,
            run_result: PT.object.isRequired,
            scores: PT.object.isRequired,
        }).isRequired,
    };

    renderTotalScoreCell() {
        if (this.props.row.run_result.extra_data.status !== "OK") {
            return (
                <td className="total-score">
                    <p className="text-center">&mdash;</p>
                </td>
            );
        }
        if (this.props.row.run.tour.scoring_system_name === "vftsarr.am_final_acro") {
            const fw_score =
                this.props.row.run_result.extra_data.fw_score?.toFixed(3) || "—";
            const acro_score =
                this.props.row.run_result.extra_data.acro_score?.toFixed(3) || "—";
            return (
                <td className="total-score">
                    <p className="text-center">
                        <em>{`${_("results.labels.fw_score_short")}: ${fw_score}`}</em>
                        <br />
                        <em>
                            {`${_("results.labels.acro_score_short")}: ${acro_score}`}
                        </em>
                        <br />
                        <strong>
                            {`${_("results.labels.total_score")}: ${
                                this.props.row.run_result.total_score_str
                            }`}
                        </strong>
                    </p>
                </td>
            );
        }
        return (
            <td className="total-score">
                <p className="text-center">
                    <strong>{this.props.row.run_result.total_score_str}</strong>
                </p>
            </td>
        );
    }
    renderCriteriasImpl(criterias, values, table_key) {
        const ROW_SIZE = 5;
        let row_buffer = [];
        let rows = [];
        const cell_width = Math.min(ROW_SIZE, criterias.length);
        const cell_style = { border: "none", width: `${cell_width}%` };
        for (let idx = 0; idx < criterias.length; ++idx) {
            const cr_name = criterias[idx];
            const cr_value = values[cr_name];
            const cr_name_loc = _(`score_parts.components.short.${cr_name}`);
            row_buffer.push(
                <td key={cr_name} style={cell_style}>
                    <p className="text-center">
                        <strong>{`${cr_name_loc} `}</strong>
                        {cr_value.toFixed(3)}
                    </p>
                </td>,
            );
            if (row_buffer.length >= ROW_SIZE) {
                rows.push(<tr key={idx}>{row_buffer}</tr>);
                row_buffer = [];
            }
        }
        if (row_buffer.length > 0) {
            if (rows.length > 0) {
                while (row_buffer.length < ROW_SIZE) {
                    row_buffer.push(
                        <td key={row_buffer.length} style={cell_style}>
                            <p>&nbsp;</p>
                        </td>,
                    );
                }
            }
            rows.push(<tr key="last">{row_buffer}</tr>);
        }
        return (
            <table key={table_key} style={{ width: "100%", tableLayout: "fixed" }}>
                <tbody>{rows}</tbody>
            </table>
        );
    }
    renderCriterias() {
        const criterias = this.props.row.run_result.extra_data.criterias_scores;
        if (!criterias) {
            return <span>&mdash;</span>;
        }
        const acro_criterias = Object.keys(criterias)
            .filter(c => /^a\d$/.test(c))
            .sort((a, b) => CRITERIAS_ORDER.get(a) - CRITERIAS_ORDER.get(b));
        const dance_criterias = Object.keys(criterias)
            .filter(c => !/^a\d$/.test(c))
            .sort((a, b) => CRITERIAS_ORDER.get(a) - CRITERIAS_ORDER.get(b));
        const result = [];
        result.push(this.renderCriteriasImpl(dance_criterias, criterias, "dance"));
        if (acro_criterias.length > 0) {
            result.push(this.renderCriteriasImpl(acro_criterias, criterias, "acro"));
        }
        return result;
    }
    renderAdditionalData() {
        const need_undercount =
            (this.props.row.run_result.extra_data.undercount || 0) > 0;
        const need_fall_down =
            (this.props.row.run_result.extra_data.fall_down || 0) > 0;
        if (!need_undercount && !need_fall_down) {
            return null;
        }
        return (
            <table style={{ width: "100%" }}>
                <tbody>
                    <tr>
                        {need_undercount ? (
                            <td style={{ border: "none" }}>
                                <p className="text-center">
                                    <strong>
                                        {`${_("score_parts.tech.long.undercount")}: `}
                                    </strong>
                                    {this.props.row.run_result.extra_data.undercount}
                                </p>
                            </td>
                        ) : null}
                        {need_fall_down ? (
                            <td style={{ border: "none" }}>
                                <p className="text-center">
                                    <strong>
                                        {`${_("score_parts.tech.long.fall_down")}: `}
                                    </strong>
                                    {this.props.row.run_result.extra_data.fall_down}
                                </p>
                            </td>
                        ) : null}
                    </tr>
                </tbody>
            </table>
        );
    }
    render() {
        return (
            <tr>
                <td className="place" style={{ borderRight: "1pt solid black" }}>
                    <p className="text-center">{this.props.row.run_result.place}</p>
                </td>
                <td className="number" style={{ fontWeight: "bold" }}>
                    <p className="text-center">
                        {this.props.row.run.participant.number}
                    </p>
                </td>
                <td>{getParticipantDisplay(this.props.row.run.participant)}</td>
                <td className="text-center">
                    {this.renderCriterias()}
                    {this.renderAdditionalData()}
                </td>
                {this.renderTotalScoreCell()}
                <td>{""}</td>
            </tr>
        );
    }
}
