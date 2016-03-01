import { _ } from "i10n/loader";
import { Api } from "server/api";
import { showConfirm } from "ui/dialogs";
import { AutoPrinterStatus } from "./auto_printer_status";


export class Service extends React.Component {
    constructor(props) {
        super(props);
    }
    reloadClients() {
        showConfirm(_("admin.confirms.reload_clients"), () => {
            Api("service.reload_clients", {}).onSuccess(() => swal.close()).send();
        });
    }
    refreshClients() {
        showConfirm(_("admin.confirms.refresh_clients"), () => {
            Api("service.refresh_clients", {}).onSuccess(() => swal.close()).send();
        });
    }
    unfinalizeTour(event) {
        event.preventDefault();
        let passcode = swal({
            title: _("admin.headers.unfinalize_tour"),
            text: _("admin.confirms.unfinalize_tour"),
            showCancelButton: true,
            closeOnConfirm: false,
            type: "input",
            animation: false,
        }, (value) => {
            if (value !== "unfinalize") {
                swal.showInputError(_("admin.messages.invalid_passcode"));
                return false;
            }
            Api("tour.unfinalize", {
                tour_id: this._select_unfinalize.value,
            }).onSuccess(function(event) {
                swal({
                    title: _("global.messages.success"),
                    animation: false,
                    type: "success",
                });
            }).send();
        });
    }
    renderUnfinalize() {
        let eligible_tours = [];
        this.props.disciplines.forEach(function(ic) {
            for (var idx = ic.tours.length - 1; idx >= 0; --idx) {
                let tour = ic.tours[idx];
                if (tour.finalized) {
                    eligible_tours.push(
                        <option value={ tour.id } key={ tour.id }>
                            { ic.name } &mdash; { tour.name }
                        </option>);
                    break;
                }
            }
        });
        if (eligible_tours.length === 0) {
            return <div className="alert alert-danger">
                { _("admin.alerts.no_finalized") }
            </div>
        }
        return <div>
            <div className="alert alert-danger">
                { _("admin.alerts.unfinalize_warning") }
            </div>
            <form className="unfinalization" onSubmit={ this.unfinalizeTour.bind(this) }>
                <select className="form-control" ref={ c => this._select_unfinalize = c }>
                    { eligible_tours }
                </select>
                <button className="btn btn-primary" type="submit">{ _("admin.buttons.unfinalize") }</button>
            </form>
        </div>
    }
    render() {
        return <div className="app">
            <div className="app-content">
                <header className="app-header">
                    <h1>{ _("admin.headers.service_menu") }</h1>
                </header>
                <div className="service-menu app-body">
                    <h3>{ _("admin.headers.clients_management") }</h3>
                    <button className="btn btn-primary control-btn" onClick={ this.reloadClients.bind(this) } >
                        { _("admin.buttons.reload_clients") }
                    </button>
                    <button className="btn btn-primary control-btn" onClick={ this.refreshClients.bind(this) }>
                        { _("admin.buttons.refresh_clients") }
                    </button>
                    <h3>{ _("admin.headers.unfinalize_tour") }</h3>
                    { this.renderUnfinalize() }
                    <h3>{ _("admin.headers.auto_printer") }</h3>
                    <AutoPrinterStatus competition_id={ this.props.competition_id } />
                    <h3>{ _("admin.headers.about") }</h3>
                    { _("admin.alerts.about", "v1.0.1", "1 марта 2016г.") }
                </div>
            </div>
        </div>
    }
}
