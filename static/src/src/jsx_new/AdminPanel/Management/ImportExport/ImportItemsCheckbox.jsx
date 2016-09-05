export default class ImportItemsCheckbox extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disabled: PT.bool.isRequired,
            label: PT.string.isRequired,
            type: PT.string.isRequired,
            value: PT.bool.isRequired,
            onChange: PT.func.isRequired,
        };
    }
    constructor(props) {
        super(props);
    }
    handleChange = (e) => {
        this.props.onChange(this.props.type, e.target.checked);
    }
    render() {
        return (
            <div className="switch">
                <label>
                    <input
                        checked={ this.props.value }
                        disabled={ this.props.disabled }
                        type="checkbox"
                        onChange={ this.handleChange }
                    />
                    { this.props.label }
                </label>
            </div>
        );
    }
}

ImportItemsCheckbox.displayName = "AdminPanel_Management_ImportExport_ImportItemsCheckbox";
