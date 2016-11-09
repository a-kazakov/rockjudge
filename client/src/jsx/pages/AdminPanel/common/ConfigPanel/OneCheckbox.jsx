export default class OneCheckbox extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            label: PT.string.isRequired,
            mkey: PT.oneOfType([
                PT.string.isRequired,
                PT.number.isRequired,
            ]).isRequired,
            value: PT.bool.isRequired,
            onChange: PT.func.isRequired,
        };
    }

    handleChange = (event) => {
        this.props.onChange(this.props.mkey, event.target.checked);
    }

    render() {
        return (
            <div className="OneCheckbox">
                <label>
                    <input
                        checked={ this.props.value }
                        type="checkbox"
                        onChange={ this.handleChange }
                    />
                    { this.props.label }
                </label>
            </div>
        );
    }
}


OneCheckbox.displayName = "AdminPanel_components_ConfigPanel_OneCheckbox";
