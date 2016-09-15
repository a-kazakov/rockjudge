import { _ } from "l10n/loader";

import keys_storage from "common/keys_storage";

export default class NoAccess extends React.Component {
    render() {
        return (
            <div className="no-access">
                <div className="content">
                    <h3>
                        { _("start_page.messages.pending_access_request") }
                    </h3>
                </div>
                <div className="client-id">
                    { _("start_page.messages.client_id", keys_storage.client_id) }
                </div>
            </div>
        );
    }
}

NoAccess.displayName = "StartPage_RoleSelector_NoAccess";
