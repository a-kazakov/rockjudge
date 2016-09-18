import _ from "l10n";
import Api from "common/server/Api";
import showConfirm from "common/dialogs/showConfirm";
import closeDialog from "common/dialogs/closeDialog";

import AutoPrinterStatus from "./AutoPrinterStatus";
import ClientsAuth from "./ClientsAuth";
import Unfinalize from "./Unfinalize";

export default class Service extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
        };
    }

    handleClientsReload = () => {
        showConfirm(_("admin.confirms.reload_clients"), () => {
            Api("service.reload_clients", {}).onSuccess(closeDialog).send();
        });
    }
    handleClientsRefresh() {
        showConfirm(_("admin.confirms.refresh_clients"), () => {
            Api("service.refresh_clients", {}).onSuccess(closeDialog).send();
        });
    }

    render() {
        return (
            <div className="app">
                <div className="app-content">
                    <header className="app-header">
                        <h1>
                            { _("admin.headers.service_menu") }
                        </h1>
                    </header>
                    <div className="service-menu app-body">
                        <h3>
                            { _("admin.headers.clients_management") }
                        </h3>
                        <button
                            className="btn btn-primary control-btn"
                            onClick={ this.handleClientsReload }
                        >
                            { _("admin.buttons.reload_clients") }
                        </button>
                        <button
                            className="btn btn-primary control-btn"
                            onClick={ this.handleClientsRefresh }
                        >
                            { _("admin.buttons.refresh_clients") }
                        </button>
                        <h3>
                            { _("admin.headers.unfinalize_tour") }
                        </h3>
                        <Unfinalize
                            competition={ this.props.competition }
                        />
                        <h3>
                            { _("admin.headers.auto_printer") }
                        </h3>
                        <AutoPrinterStatus
                            competition={ this.props.competition }
                        />
                        <h3>
                            { _("admin.headers.clients_management") }
                        </h3>
                        <ClientsAuth
                            competition={ this.props.competition }
                        />
                        <h3>
                            { _("admin.headers.about") }
                        </h3>
                        { _("admin.alerts.about", "v1.1 prerelease", "") }
                    </div>
                </div>
            </div>
        );
    }
}

Service.displayName = "AdminPanel_Service";
