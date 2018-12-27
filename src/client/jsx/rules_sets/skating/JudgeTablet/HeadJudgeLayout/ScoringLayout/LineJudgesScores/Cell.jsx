import { React } from "HostModules";

import PT from "prop-types";
import makeClassName from "common/makeClassName";

export default class Cell extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        medians: PT.instanceOf(Map).isRequired,
        part: PT.string.isRequired,
        score: PT.object.isRequired,
        table: PT.instanceOf(Map).isRequired,
    };

    formatValue(value) {
        if (this.props.part === "cross") {
            return value ? "X" : "";
        }
        if (value == null) {
            return "—";
        }
        if (typeof value !== "number") {
            return value.toString();
        }
        return value
            .toFixed(5)
            .replace(/0+$/, "")
            .replace(/\.$/, "");
    }

    getClassName(cell_value) {
        if (this.props.part === "cross") {
            return makeClassName({
                green: cell_value,
                confirmed: this.props.score.confirmed,
            });
        }
        if (typeof cell_value !== "number") {
            return "";
        }
        const median = this.props.medians.get(this.props.part);
        const scale_size = 10;
        const diff = Math.abs(median - cell_value) / scale_size - 1e-5;
        let result = diff < 0.15 ? "green" : diff < 0.3 ? "yellow" : "red";
        if (this.props.score.confirmed) {
            result += " confirmed";
        }
        return result;
    }

    render() {
        const key = `${this.props.disciplineJudge.id}/${this.props.part}`;
        if (!this.props.table.has(key)) {
            return <td className="no-score" />;
        }
        const cell_value = this.props.table.get(key);
        return (
            <td className={this.getClassName(cell_value)}>
                {this.formatValue(cell_value)}
            </td>
        );
    }
}
