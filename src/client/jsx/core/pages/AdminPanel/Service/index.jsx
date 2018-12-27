import React from "react";

import closeDialog from "common/dialogs/closeDialog";
import showConfirm from "common/dialogs/showConfirm";
import Api from "common/server/Api";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import AutoPrinterStatus from "./AutoPrinterStatus";
import BulkTourInit from "./BulkTourInit";
import ClientsAuth from "./ClientsAuth";
import Unfinalize from "./Unfinalize";

export default class Service extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };

    handleClientsRefresh() {
        showConfirm(_("admin.confirms.refresh_clients"), () => {
            Api("service/refresh_clients", {})
                .onSuccess(closeDialog)
                .send();
        });
    }

    render() {
        return (
            <div className="Service">
                <header>
                    <h1>{_("admin.headers.service_menu")}</h1>
                </header>
                <div className="body">
                    <h3>{_("admin.headers.clients_management")}</h3>
                    <ClientsAuth competition={this.props.competition} />
                    <button
                        className="action-button"
                        onClick={this.handleClientsRefresh}
                    >
                        {_("admin.buttons.refresh_clients")}
                    </button>
                    <h3>{_("admin.headers.unfinalize_tour")}</h3>
                    <Unfinalize competition={this.props.competition} />
                    <h3>{_("admin.headers.auto_printer")}</h3>
                    <AutoPrinterStatus competition={this.props.competition} />
                    <h3>{_("admin.headers.shortcuts")}</h3>
                    <BulkTourInit competition={this.props.competition} />
                    <h3>{_("admin.headers.about")}</h3>
                    {_("admin.alerts.about", "v2.0 prerelease", "27.12.2018")}
                </div>
            </div>
        );
    }
}
