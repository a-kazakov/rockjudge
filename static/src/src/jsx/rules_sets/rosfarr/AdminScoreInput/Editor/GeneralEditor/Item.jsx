export default class Item extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            field: PT.shape({
                label: PT.string.isRequired,
                key: PT.string.isRequired,
                options: PT.arrayOf(
                    PT.arrayOf(PT.string.isRequired).isRequired
                ).isRequired,
            }).isRequired,
            readOnly: PT.bool.isRequired,
            value: PT.string.isRequired,
            onChange: PT.func.isRequired,
        };
    }

    handleChange = (event) => {
        this.props.onChange(this.props.field.key, event.target.value);
    }

    renderValue() {
        if (this.props.readOnly) {
            return (
                <div className="score-value">
                    <div className="read-only">
                        { this.props.field.options.find(o => o[0] === this.props.value)[1] }
                    </div>
                </div>
            );
        }
        return (
            <div className="score-value">
                <select
                    value={ this.props.value }
                    onChange={ this.handleChange }
                >
                    { this.props.field.options.map(option => {
                        const [value, label] = option;
                        return (
                            <option key={ value } value={ value }>
                                { label }
                            </option>
                        );
                    }) }
                </select>
            </div>
        );
    }
    render() {
        return (
            <div className="item">
                <div className="score-label">
                    { this.props.field.label }
                </div>
                { this.renderValue() }
            </div>
        );
    }
}

Item.displayName = "rules_sets_rosfarr_AdminScoreInput_Editor_GeneralEditor_Item";
