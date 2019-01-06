import { React } from "HostModules";
import PT from "prop-types";
import formatScore from "./formatScore";
import _ from "l10n";

const ROWS = [
    ["tech_fulfillment", "tech_control"],
    ["tech_power|Bottom", "tech_stretching|Bottom"],
    ["choreography_musicality", "choreography_complexity"],
    ["choreography_style|Bottom", "choreography_performance|Bottom"],
    ["group_sync|Right", "impression"],
];

const BORDER_STYLE = "0.5pt solid #999";

export default class CoupleScore extends React.Component {
    static propTypes = {
        example: PT.bool,
        scoreResult: PT.object,
    };
    static defaultProps = {
        example: false,
    };

    renderPartText = part => {
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
            <table className="score-breakdown" style={{ width: "50pt" }}>
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
