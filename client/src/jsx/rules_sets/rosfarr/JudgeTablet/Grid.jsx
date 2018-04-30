export default class Grid extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            children: PT.node.isRequired,
        };
    }

    getMaxWidth() {
        const line_size = this.two_rows
            ? Math.floor((this.children.length + 1) / 2 + 0.001)
            : this.children.length;
        return `${600 * line_size}px`;
    }
    setupCache() {
        this.children = Array.isArray(this.props.children)
            ? this.props.children
            : [this.props.children];
        this.two_rows = this.children.length >= 4;
        this.width_value = this.two_rows
            ? 99.9 / (this.children.length + 1) * 2
            : 99.9 / this.children.length;
        this.width = `${ this.width_value.toFixed(5) }%`;
        this.max_width = this.getMaxWidth();
        this.asym_layout = this.two_rows && this.children.length % 2 === 0;
    }

    renderRow(elements, is_second_row) {
        if (elements === null) {
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
            <table className={ class_name } style={ { width: row_width } }><tbody>
                <tr>
                    { elements.map((e, idx) =>
                        <td
                            className="item"
                            key={ idx }
                            style={ { width: this.width } }
                        >
                            { e }
                        </td>
                    ) }
                </tr>
            </tbody></table>
        )
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
        return (
            <div className={ class_name } style={ { maxWidth: this.max_width } }>
                { this.renderRow(first_row, false) }
                { this.renderRow(second_row, true) }
            </div>
        )
    }
}
