import TableHead from "./TableHead";
import TableBody from "./TableBody";

export default class CustomTable extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            cols: PT.array.isRequired,
            rows: PT.array.isRequired,
            rowKey: PT.string,
            fontSize: PT.string,
        };
    }

    static get defaultProps() {
        return {
            fontSize: "12pt",
            rowKey: null,
        }
    }

    computeColumnWidths() {
        const raw_values = this.props.cols.map(col => col.width);
        const eq_count = raw_values.filter(v => v === null || typeof v === "undefined").length;
        const nums_sum = raw_values.filter(v => typeof v === "number").reduce((a, b) => a + b, 0);
        const new_values = raw_values.map(rv => {
            if (rv === "flex") {
                return null;
            }
            const value = typeof rv === "number" ? rv : (100 - nums_sum) / eq_count;
            return `${value}%`;
        });
        let result = {};
        for (let idx = 0; idx < new_values.length; ++idx) {
            result[this.props.cols[idx].key] = new_values[idx];
        }
        return result;
    }

    getTableStyle() {
        return {
            width: "100%",
            fontSize: this.props.fontSize,
        };
    }
    render() {
        const widths = this.computeColumnWidths();
        return (
            <table style={ this.getTableStyle() }>
                <TableHead
                    cols={ this.props.cols }
                    widths={ widths }
                />
                <TableBody
                    cols={ this.props.cols }
                    rowKey={ this.props.rowKey }
                    rows={ this.props.rows }
                    widths={ widths }
                />
            </table>
        )
    }
}
