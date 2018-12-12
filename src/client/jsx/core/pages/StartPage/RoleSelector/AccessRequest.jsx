import React from "react";

import PT from "prop-types";
import _ from "l10n";
import Api from "common/server/Api";
import keys_storage from "common/keys_storage";

export default class AccessRequest extends React.Component {
    static propTypes = {
        competitionId: PT.number.isRequired,
    };

    handleButtonClick = () => {
        Api("model/create", {
            model_name: "ClientAuth",
            data: {
                client_id: keys_storage.client_id,
                competition_id: this.props.competitionId,
            },
        }).send();
    };

    render() {
        return (
            <div className="access-request">
                <h3>{_("start_page.messages.access_request")}</h3>
                <button type="button" onClick={this.handleButtonClick}>
                    {_("start_page.buttons.request_access")}
                </button>
            </div>
        );
    }
}
