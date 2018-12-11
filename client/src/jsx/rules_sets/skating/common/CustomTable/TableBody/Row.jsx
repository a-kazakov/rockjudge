import { React } from "HostModules";

import PT from "prop-types";

export default class Row extends React.Component {
    static propTypes = {
        cols: PT.array.isRequired,
        row: PT.object.isRequired,
        widths: PT.object.isRequired,
    };

    static renderCellContent(content) {
        if (["string", "number"].includes(typeof content)) {
            content = { text: content.toString() };
        }
        if (content == null || typeof content !== "object") {
            return null;
        }
        if (content.raw) {
            return content.text;
        }
        return (
            <p
                style={{
                    margin: "0",
                    color: content.color,
                }}
            >
                {content.text}
            </p>
        );
    }
    renderCell = col => {
        return (
            <td
                key={col.key}
                style={{
                    fontWeight: col.fontWeight,
                    textAlign: col.textAlign,
                    borderLeft: (col.lines || []).includes("left")
                        ? "1pt solid black"
                        : "none",
                    borderRight: (col.lines || []).includes("right")
                        ? "1pt solid black"
                        : "none",
                    borderBottom: "0.5pt solid #aaa",
                    padding: "1pt 3pt",
                    width: this.props.widths[col.key],
                }}
            >
                {this.constructor.renderCellContent(this.props.row[col.key])}
            </td>
        );
    };
    renderSectionHeader() {
        return (
            <td
                colSpan={this.props.cols.length}
                style={{
                    borderBottom: "1pt solid black",
                    paddingTop: "10pt",
                    fontWeight: "bold",
                }}
            >
                {this.props.row.title}
            </td>
        );
    }
    renderData() {
        if (this.props.row._type === "section_header") {
            return this.renderSectionHeader();
        }
        return this.props.cols.map(this.renderCell);
    }
    render() {
        return <tr>{this.renderData()}</tr>;
    }
}
