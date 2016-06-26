export default class Grid extends React.Component {
    get two_rows() {
        return this.props.children.length >= 4;
    }
    get width_value() {
        return this.two_rows
            ? 99.9 / (this.props.children.length + 1) * 2
            : 99.9 / this.props.children.length;
    }
    get width() {
        return `${ this.width_value.toFixed(5) }%`;
    }
    get max_width() {
        const line_size = this.two_rows
            ? Math.floor((this.props.children.length + 1) / 2 + 0.001)
            : this.props.children.length;
        return `${600 * line_size}px`
    }
    get asym_layout() {
        this.two_rows
            ? this.props.children % 2 === 0
            : false;
    }
    renderRow(elements, is_second_row) {
        if (elements === null) {
            return null;
        }
        const row_width = `${(elements.length * this.width_value).toFixed(5)}%`;
        let class_name = "row";
        if (!this.asym_layout) {
            class_name += " align-center";
        } else if (is_second_row) {
            class_name += " align-left";
        } else {
            class_name += " align-right";
        }
        return (
            <table className={ class_name } style={{ width: row_width }}><tbody>
                <tr>
                    { elements.map((e, idx) =>
                        <td className="item" key={ idx } style={{ width: this.width }}>
                            { e }
                        </td>
                    ) }
                </tr>
            </tbody></table>
        )
    }
    render() {
        const class_name = this.two_rows ? "grid two-rows" : "grid";
        const first_row = this.two_rows
            ? this.props.children.filter((x, idx) => idx % 2 === 1)
            : this.props.children;
        const second_row = this.two_rows
            ? this.props.children.filter((x, idx) => idx % 2 === 0)
            : null;
        return (
            <div className={ class_name } style={{ maxWidth: this.max_width }}>
                { this.renderRow(first_row, false) }
                { this.renderRow(second_row, true) }
            </div>
        )
    }
}
