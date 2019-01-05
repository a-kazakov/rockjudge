import { React } from "HostModules";

import PT from "prop-types";

export default class Grid extends React.Component {
    static propTypes = {
        children: PT.node.isRequired,
        type: PT.oneOf(["normal", "one-line"]),
    };
    static defaultProps = {
        type: "normal",
    };

    setupCache() {
        this.children = Array.isArray(this.props.children)
            ? this.props.children
            : [this.props.children];
        this.multiple_rows = this.children.length >= 4 && this.props.type === "normal";
        this.width_value = this.multiple_rows
            ? (99.9 / (this.children.length + 1)) * 2
            : 99.9 / this.children.length;
        this.width = `${this.width_value.toFixed(5)}%`;
    }

    renderRow(elements) {
        if (elements == null) {
            return null;
        }
        const row_width = `${(elements.length * this.width_value).toFixed(5)}%`;
        const class_name = "grid-row align-center";
        return (
            <table className={class_name} style={{ width: row_width }}>
                <tbody>
                    <tr>
                        {elements.map((e, idx) => (
                            <td
                                className="item"
                                key={idx}
                                style={{ width: this.width }}
                            >
                                {e}
                            </td>
                        ))}
                    </tr>
                </tbody>
            </table>
        );
    }

    renderItemOfMultiple = (element, idx) => {
        return (
            <div className="item" key={idx}>
                {element}
            </div>
        );
    };

    render() {
        this.setupCache();
        const class_name = this.multiple_rows ? "Grid multiple-rows" : "Grid";
        if (!this.multiple_rows) {
            return <div className={class_name}>{this.renderRow(this.children)}</div>;
        }
        return (
            <div className={class_name}>
                {this.children.map(this.renderItemOfMultiple)}
            </div>
        );
    }
}
