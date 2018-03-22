export default class Cell extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            action: PT.string.isRequired,
            activeCell: PT.shape({
                action: PT.string.isRequired,
                token: PT.string.isRequired,
                tour_id: PT.number.isRequired,
            }),
            tour: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            value: PT.oneOfType([PT.number.isRequired, PT.string.isRequired]),
            onChange: PT.func.isRequired,
            onMove: PT.func.isRequired,
        };
    }

    componentDidUpdate(prev_props) {
        if (!this.props.activeCell) {
            return;
        }
        if (prev_props.activeCell && prev_props.activeCell.token === this.props.activeCell.token) {
            return;
        }
        if (
            this.props.activeCell.tour_id === this.props.tour.id &&
            this.props.activeCell.action === this.props.action
        ) {
            this._input.select();
        }
    }

    makeInputRef = (ref) => this._input = ref;

    handleChange = (event) => {
        const value = parseInt(event.target.value, 10) || 0;
        this.props.onChange(this.props.action, value)
    }
    handleKeyDown = (event) => {
        const code = event.keyCode || event.which;
        const direction = {
            "37": "left",
            "38": "up",
            "39": "right",
            "40": "down",
        }[code.toString()];
        if (!direction) {
            return;
        }
        event.preventDefault();
        this.props.onMove(this.props.tour.id, this.props.action, direction);
    }

    render() {
        return (
            <td className="input">
                <input
                    defaultValue={ this.props.value }
                    ref={ this.makeInputRef }
                    type="text"
                    onChange={ this.handleChange }
                    onKeyDown={ this.handleKeyDown }
                />
            </td>
        );
    }
}

Cell.displayName = "AdminPanel_Service_AutoPrinter_Table_Cell";
