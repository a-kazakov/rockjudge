import Row from "./Row";

export default class TableBody extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            cols: PT.array.isRequired,
            rows: PT.array.isRequired,
            rowKey: PT.string,
            widths: PT.object.isRequired,
        };
    }

    renderRow = (row, idx) => {
        const key = this.props.rowKey !== null ? (row[this.props.rowKey] || `nokey_${idx}`) : idx;
        return (
            <Row
                cols={ this.props.cols }
                key={ key }
                row={ row }
                widths={ this.props.widths }
            />
        )
    };

    render() {
        return (
            <tbody>
                { this.props.rows.map(this.renderRow) }
            </tbody>
        );
    }
}
