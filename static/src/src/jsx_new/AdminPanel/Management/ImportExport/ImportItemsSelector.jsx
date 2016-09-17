import _ from "l10n";

import ImportItemsCheckbox from "./ImportItemsCheckbox";

export default class ImportItemsSelector extends React.Component {
    static get propTypes() {
        return {};
    }
    constructor(props) {
        super(props);
        this.state = {
            items: {
                disciplines: true,
                tours: true,
                participants: true,
                discipline_judges: true,
                plan: true,
                judges: true,
                clubs: true,
            },
        };
    }
    handleChange = (type, value) => {
        let new_items = Object.assign({}, this.state.items); // clone
        new_items[type] = value;
        if (type === "disciplines" && !value) {
            new_items.tours = false;
            new_items.participants = false;
            new_items.discipline_judges = false;
        }
        if (type === "clubs" && !value) {
            new_items.participants = false;
        }
        if (type === "judges" && !value) {
            new_items.discipline_judges = false;
        }
        this.setState({
            items: new_items,
        });
    }
    getValue() {
        return this.state.items;
    }
    renderCheckbox(type, disabled=false) {
        return (
            <ImportItemsCheckbox
                disabled={ disabled }
                label={ _(`admin.labels.${type}`) }
                type={ type }
                value={ this.state.items[type] }
                onChange={ this.handleChange }
            />
        );
    }
    render() {
        return (
            <div className="import-items-selector">
                { this.renderCheckbox("disciplines") }
                { this.renderCheckbox("clubs") }
                { this.renderCheckbox("judges") }
                { this.renderCheckbox("tours", !this.state.items.disciplines) }
                { this.renderCheckbox("participants", !this.state.items.disciplines || !this.state.items.clubs) }
                { this.renderCheckbox("discipline_judges", !this.state.items.disciplines || !this.state.items.judges) }
                { this.renderCheckbox("plan") }
            </div>
        );
    }
}

ImportItemsSelector.displayName = "AdminPanel_Management_ImportExport_ImportItemsSelector";
