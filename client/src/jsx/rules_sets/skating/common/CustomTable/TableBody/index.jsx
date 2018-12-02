import {React} from "HostModules";

import PT from "prop-types";
import Row from "./Row";

export default class TableBody extends React.Component {
    static propTypes = {
        cols: PT.array.isRequired,
        rowKey: PT.string,
        rows: PT.array.isRequired,
        widths: PT.object.isRequired,
    };

    renderRow = (row, idx) => {
        const key = this.props.rowKey != null ? (row[this.props.rowKey] || `nokey_${idx}`) : idx;
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