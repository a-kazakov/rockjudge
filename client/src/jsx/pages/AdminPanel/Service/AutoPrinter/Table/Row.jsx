import Cell from "./Cell";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            activeCell: PT.shape({
                action: PT.string.isRequired,
                token: PT.string.isRequired,
                tour_id: PT.number.isRequired,
            }),
            possibleActions: PT.arrayOf(PT.string.isRequired).isRequired,
            row: PT.object.isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
                discipline: PT.shape({
                    name: PT.string.isRequired,
                }).isRequired,
            }).isRequired,
            onChange: PT.func.isRequired,
            onMove: PT.func.isRequired,
        };
    }

    handleChange = (action, new_value) => {
        let new_row = Object.assign({}, this.props.row);
        new_row[action] = new_value;
        this.props.onChange(this.props.tour.id, new_row);
    }

    render() {
        return (
            <tr>
                <td className="discipline">
                    { `${this.props.tour.discipline.name} — ${this.props.tour.name}` }
                </td>
                { this.props.possibleActions.map(action =>
                    <Cell
                        action={ action }
                        activeCell={ this.props.activeCell }
                        key={ action }
                        tour={ this.props.tour }
                        value={ this.props.row[action] || "" }
                        onChange={ this.handleChange }
                        onMove={ this.props.onMove }
                    />
                ) }
            </tr>
        );
    }
}

Row.displayName = "AdminPanel_Service_AutoPrinter_Table_Row";
