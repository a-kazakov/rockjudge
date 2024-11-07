import { React } from "HostModules";
import PT from "prop-types";
import formatScore from "./formatScore";
import _ from "l10n";

const ROWS = [
    ["stunt_tech", "stunt_complexity|Bottom"],
    ["stunt_shape|Right", ""],
    ["presentation_transitions|Top", "presentation_complexity|Top"],
];

const BORDER_STYLE = "0.5pt solid #999";

export default class ClStuntScore extends React.Component {
    static propTypes = {
        example: PT.bool,
        scoreResult: PT.object,
    };
    static defaultProps = {
        example: false,
    };

    renderPartText = part => {
        if (part === "") {
            return "";
        }
        if (this.props.example) {
            return _(`score_parts.components.short.${part}`);
        }
        switch (part) {
            case "total_score":
                return this.props.scoreResult.total_score_str;
            case "place":
                return formatScore(this.props.scoreResult.extra_data.place);
            default:
                return formatScore(this.props.scoreResult.extra_data.parts[part], "@");
        }
    };
    renderCell = data => {
        const [part, border] = data.split("|");
        const style = border == null ? null : { [`border${border}`]: BORDER_STYLE };
        return (
            <td key={part} style={style}>
                <p className="text-center">{this.renderPartText(part)}</p>
            </td>
        );
    };
    renderRow = (cells, idx) => {
        return <tr key={idx}>{cells.map(this.renderCell)}</tr>;
    };
    render() {
        return (
            <table
                className="score-breakdown"
                style={{ width: "50pt", tableLayout: "fixed" }}
            >
                <tbody style={{ width: "50pt" }}>
                    {ROWS.map(this.renderRow)}
                    <tr>
                        <td style={{ borderTop: BORDER_STYLE }}>
                            <p style={{ textAlign: "center" }}>
                                {this.renderPartText("place")}
                            </p>
                        </td>
                        <td
                            style={{
                                borderTop: BORDER_STYLE,
                                borderLeft: BORDER_STYLE,
                            }}
                        >
                            <p style={{ textAlign: "center", fontWeight: "bold" }}>
                                {this.renderPartText("total_score")}
                            </p>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}