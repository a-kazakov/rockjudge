import _ from "l10n";
import { Api } from "server/api";

import ImportItemsSelector from "./ImportItemsSelector";

export default class ImportExport extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
        };
    }
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
                competition_id: this.props.competition.id,
                data: f.target.result,
                items: this._selector.getValue(),
            }).onSuccess(() => {
                swal({
                    title: _("global.messages.success"),
                    type: "success",
                    animation: false,
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
        Api("competition.export", { competition_id: this.props.competition.id })
            .onSuccess(r => saveAs(new Blob([JSON.stringify(r)], {type : 'application/json'}), "rockjudge.export.json"))
            .send();
    }
    makeSelectorRef = (e) => {
        this._selector = e;
    }
    canImport() {
        return this.state.import_files.length === 1 && !this.state.submitting;
    }
    handleFileSelection = (event) => {
        this.setState({
            import_files: event.target.files,
        });
    }
    handleFormSubmission = (event) => {
        event.preventDefault();
        this.import();
    }
    handleExportClick = () => {
        this.export();
    }
    render() {
        return (
            <div className="app-content load-competition-page">
                <header className="app-head">
                    <h1>{ _("admin.headers.import_export") }</h1>
                </header>
                <div className="import-export">
                    <h3>{ _("admin.headers.import_competition") }</h3>
                    <form
                        className="import-form"
                        onSubmit={ this.handleFormSubmission }
                    >
                        <label className="browse">
                            <div>
                                { _("global.labels.browse") }
                            </div>
                            { this.state.import_files.length === 0
                                ? _("admin.labels.no_files_selected")
                                : this.state.import_files[0].name }
                            <input
                                type="file"
                                onChange={ this.handleFileSelection }
                            />
                        </label>
                        <br />
                        <ImportItemsSelector
                            ref={ this.makeSelectorRef }
                        />
                        <br />
                        <button
                            className="btn btn-primary"
                            disabled={ !this.canImport() }
                            type="submit"
                        >
                            { _("admin.buttons.import") }
                        </button>
                    </form>
                    <h3>{ _("admin.headers.export_competition") }</h3>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={ this.handleExportClick }
                    >
                        { _("admin.buttons.export") }
                    </button>
                </div>
            </div>
        );
    }
}

ImportExport.displayName = "AdminPanel_Management_ImportExport";
