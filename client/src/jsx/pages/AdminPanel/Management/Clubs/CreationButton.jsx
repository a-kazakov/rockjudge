import React from "react";

import _ from "l10n/index";
import PT from "prop-types";

export default class CreationButton extends React.Component {
    static propTypes = {
        onClick: PT.func.isRequired,
    };

    render() {
        return (
            <tr><td colSpan="4">
                <button
                    className="create-button"
                    type="button"
                    onClick={ this.props.onClick }
                >
                    { _("admin.buttons.add_club") }
                </button>
            </td></tr>
        );
    }
}

