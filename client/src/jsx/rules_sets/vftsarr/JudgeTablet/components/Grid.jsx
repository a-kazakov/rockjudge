import { React } from "HostModules";

import PT from "prop-types";
import makeClassName from "../../../../lib/common/makeClassName";

export default class Grid extends React.Component {
    static propTypes = {
        children: PT.node.isRequired,
        noMaxWidth: PT.bool,
        smallBlocks: PT.bool,
    };
    static get defaultProps() {
        return {
            noMaxWidth: false,
            smallBlocks: false,
        };
    }

    getMaxWidth() {
        if (this.props.noMaxWidth) {
            return null;
        }
        const line_size = this.two_rows
            ? Math.floor((this.children.length + 1) / 2 + 0.001)
            : this.children.length;
        const base_width = this.props.smallBlocks ? 600 : 900;
        return `${base_width * line_size}px`;
    }
    setupCache() {
        this.children = Array.isArray(this.props.children)
            ? this.props.children
            : [this.props.children];
        this.two_rows = this.children.length >= 4;
        this.width_value = this.two_rows
            ? (99.9 / (this.children.length + 1)) * 2
            : 99.9 / this.children.length;
        this.width = `${this.width_value.toFixed(5)}%`;
        this.max_width = this.getMaxWidth();
        this.asym_layout = this.two_rows && this.children.length % 2 === 0;
    }

    renderRow(elements, is_second_row, is_compact) {
        if (elements == null) {
            return null;
        }
        const row_width = `${(elements.length * this.width_value).toFixed(5)}%`;
        let class_name = "grid-row";
        if (!this.asym_layout) {
            class_name += " align-center";
        } else if (is_second_row) {
            class_name += " align-right";
        } else {
            class_name += " align-left";
        }
        return (
            <table className={class_name} style={{ width: row_width }}>
                <tbody>
                    <tr className={makeClassName({ "compact-row": is_compact })}>
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
    render() {
        this.setupCache();
        const class_name = this.two_rows ? "Grid two-rows" : "Grid";
        const first_row = this.two_rows
            ? this.children.filter((x, idx) => idx % 2 === 0)
            : this.children;
        const second_row = this.two_rows
            ? this.children.filter((x, idx) => idx % 2 === 1)
            : null;
        const max_row_size = Math.max(first_row.length, second_row?.length || 0);
        const is_compact = max_row_size >= 3;
        return (
            <div className={class_name} style={{ maxWidth: this.max_width }}>
                {this.renderRow(first_row, false, is_compact)}
                {this.renderRow(second_row, true, is_compact)}
            </div>
        );
    }
}
