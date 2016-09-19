import _ from "l10n";

import OneCheckbox from "./OneCheckbox";

export default class CheckboxesSet extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            items: PT.arrayOf(
                PT.shape({
                    id: PT.oneOfType([
                        PT.string.isRequired,
                        PT.number.isRequired,
                    ]).isRequired,
                    name: PT.string.isRequired,
                }).isRequired
            ).isRequired,
            mkey: PT.string.isRequired,
            values: PT.object.isRequired,
            onChange: PT.func.isRequired,
        };
    }
    setAll(value) {
        let new_values = Object.assign({}, this.props.values);
        for (const key of Object.keys(new_values)) {
            new_values[key] = value;
        }
        this.props.onChange(this.props.mkey, new_values);
    }

    handleCbChange = (id, value) => {
        let new_values = Object.assign({}, this.props.values);
        new_values[id] = value;
        this.props.onChange(this.props.mkey, new_values);
    }
    handleSelectAll = (event) => {
        event.preventDefault();
        this.setAll(true);
    }
    handleDeselectAll = (event) => {
        event.preventDefault();
        this.setAll(false);
    }

    render() {
        return (
            <div className="CheckboxesSet">
                { this.props.items.map(item =>
                    <OneCheckbox
                        key={ item.id }
                        label={ item.name }
                        mkey={ item.id }
                        value={ this.props.values[item.id] }
                        onChange={ this.handleCbChange }
                    />
                ) }
                <a href="#" onClick={ this.handleSelectAll }>
                    { _("global.buttons.select_all") }
                </a>
                <a href="#" onClick={ this.handleDeselectAll }>
                    { _("global.buttons.deselect_all") }
                </a>
            </div>
        );
    }
}

CheckboxesSet.displayName = "AdminPanel_components_ConfigPanel_CheckboxesSet";
