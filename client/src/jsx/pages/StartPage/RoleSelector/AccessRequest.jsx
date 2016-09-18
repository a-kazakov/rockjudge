import _ from "l10n";
import Api from "common/server/Api";

import keys_storage from "common/keys_storage";

export default class AccessRequest extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionId: PT.number.isRequired,
        };
    }

    handleButtonClick = () => {
        Api("client_auth.create", {
            competition_id: this.props.competitionId,
        })
            .send();
    }

    render() {
        return (
            <div className="access-request">
                <div className="content">
                    <h3>
                        { _("start_page.messages.access_request") }
                    </h3>
                    <button
                        className="btn btn-lg btn-primary"
                        type="button"
                        onClick={ this.handleButtonClick }
                    >
                        { _("start_page.buttons.request_access") }
                    </button>
                </div>
                <div className="client-id">
                    { _("start_page.messages.client_id", keys_storage.client_id) }
                </div>
            </div>
        );
    }
}

AccessRequest.displayName = "StartPage_RoleSelector_AccessRequest";
