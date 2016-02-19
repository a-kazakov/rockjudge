import { _ } from "i10n/loader";
import { Api } from "server/api";


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
        reader.onload = (f) => {
            this.setState({
                submitting: true,
            });
            Api("competition.load", {
                competition_id: this.props.competition_id,
                data: f.target.result,
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
                    <label>
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
