import _ from "l10n";
import Api from "common/server/Api";

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
                <h3>
                    { _("start_page.messages.access_request") }
                </h3>
                <button
                    type="button"
                    onClick={ this.handleButtonClick }
                >
                    { _("start_page.buttons.request_access") }
                </button>
            </div>
        );
    }
}

AccessRequest.displayName = "StartPage_RoleSelector_AccessRequest";
