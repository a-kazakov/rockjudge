export default class TableHead extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            cols: PT.array.isRequired,
            widths: PT.object.isRequired,
        };
    }

    renderCell = (col) => {
        return (
            <th
                key={ col.key }
                style={ {
                    fontWeight: "bold",
                    textAlign: col.textAlign || "left",
                    width: this.props.widths[col.key],
                    borderBottom: "1pt solid black",
                    padding: "1pt 3pt",
                } }
            >
                <p style={ {margin: "0"} }>
                    { col.title }
                </p>
            </th>
        )
    };

    render() {
        return (
            <thead>
                <tr>
                    { this.props.cols.map(this.renderCell) }
                </tr>
            </thead>
        )
    }
}
