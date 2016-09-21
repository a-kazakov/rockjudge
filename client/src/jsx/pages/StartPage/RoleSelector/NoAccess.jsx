import _ from "l10n";

export default class NoAccess extends React.Component {
    render() {
        return (
            <div className="no-access">
                <h3>
                    { _("start_page.messages.pending_access_request") }
                </h3>
            </div>
        );
    }
}

NoAccess.displayName = "StartPage_RoleSelector_NoAccess";
