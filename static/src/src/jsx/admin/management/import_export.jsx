import { _ } from "l10n/loader";
import { Api } from "server/api";
import { clone } from "common/tools";


export class ImportExport extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            import_files: [],
            submitting: false,
        };
    }
    import() {
        let reader = new FileReader();
        this.setState({
            submitting: true,
        });
        reader.onload = (f) => {
            Api("competition.load", {
                competition_id: this.props.competition_id,
                data: f.target.result,
                items: this._selector.getValue(),
            }).onSuccess(() => {
                swal({
                    title: _("global.messages.success"),
                    type: "success",
                    animation: false
                });
            }).onDone(() => {
                this.setState({
                    submitting: false,
                });
            }).send();
        }
        reader.readAsText(this.state.import_files[0]);
    }
    export() {
        Api("competition.export", { competition_id: this.props.competition_id })
            .onSuccess(r => saveAs(new Blob([JSON.stringify(r)], {type : 'application/json'}), "rockjudge.export.json"))
            .send();
    }
    makeSelectorRef = (e) => {
        this._selector = e;
    }
    onSubmit(event) {
        event.preventDefault();
        let data = this._input.value;
    }
    render() {
        return <div className="app-content load-competition-page">
            <header className="app-head">
                <h1>{ _("admin.headers.import_export") }</h1>
            </header>
            <div className="import-export">
                <h3>{ _("admin.headers.import_competition") }</h3>
                <form className="import-form" onSubmit={ e => { e.preventDefault(); this.import(); } }>
                    <label className="browse">
                        <div>
                            { _("global.labels.browse") }
                        </div>
                        { this.state.import_files.length === 0
                            ? _("admin.labels.no_files_selected")
                            : this.state.import_files[0].name }
                        <input type="file"
                               onChange={ e => this.setState({ import_files: e.target.files }) } />
                    </label>
                    <br />
                    <ImportItemsSelector
                        ref={ this.makeSelectorRef } />
                    <br />
                    <button type="submit"
                            className="btn btn-primary"
                            disabled={ this.state.import_files.length !== 1 || this.state.submitting }>
                        { _("admin.buttons.import") }
                    </button>
                </form>
                <h3>{ _("admin.headers.export_competition") }</h3>
                <button type="button"
                        className="btn btn-primary"
                        onClick={ this.export.bind(this) }>
                    { _("admin.buttons.export") }
                </button>
            </div>
        </div>
    }
}

class ImportItemsSelector extends React.Component {
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
            }
        };
    }
    onChange = (type, value) => {
        let new_items = clone(this.state.items);
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
                type={ type }
                label={ _(`admin.labels.${type}`) }
                value={ this.state.items[type] }
                disabled={ disabled }
                onChange={ this.onChange } />
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

class ImportItemsCheckbox extends React.Component {
    constructor(props) {
        super(props);
    }
    onChange = (e) => {
        this.props.onChange(this.props.type, e.target.checked);
    }
    render() {
        return (
            <div className="switch">
                <label>
                    <input
                        type="checkbox"
                        checked={ this.props.value }
                        disabled={ this.props.disabled }
                        onChange={ this.onChange } />
                    { this.props.label }
                </label>
            </div>
        );
    }
}
