import { React } from "HostModules";
import PT from "prop-types";
import formatScore from "./formatScore";
import _ from "l10n";

const ROWS = [
    ["tech_execution", "tech_control|Bottom"],
    ["tech_style|Bottom", "group_sync|Left"],
    ["group_similarity|Bottom", "group_position|Bottom"],
    ["choreography_art", "choreography_performance|Bottom"],
    ["choreography_complexity|Right", "impression"],
];

export default class JazzGroupScore extends React.Component {
    static propTypes = {
        example: PT.bool,
        scoreResult: PT.object,
    };
    static defaultProps = {
        example: false,
    };

    renderCell = data => {
        const [part, border] = data.split("|");
        const style =
            border == null ? null : { [`border${border}`]: "0.5pt solid #999" };
        return (
            <td key={part} style={style}>
                <p className="text-center">
                    {this.props.example
                        ? _(`score_parts.components.short.${part}`)
                        : formatScore(
                              this.props.scoreResult.extra_data.parts[part],
                              "@",
                          )}
                </p>
            </td>
        );
    };
    renderRow = (cells, idx) => {
        return <tr key={idx}>{cells.map(this.renderCell)}</tr>;
    };
    render() {
        return (
            <table className="score-breakdown" style={{ width: "50pt" }}>
                <tbody style={{ width: "50pt" }}>{ROWS.map(this.renderRow)}</tbody>
            </table>
        );
    }
}
