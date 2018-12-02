import React from "react";

import PT from "prop-types";
import _ from "l10n";

export default class CreationButton extends React.Component {
    static propTypes = {
        onClick: PT.func.isRequired,
    };

    render() {
        return (
            <tr><td colSpan="5">
                <button
                    className="create-button"
                    type="button"
                    onClick={ this.props.onClick }
                >
                    { _("admin.buttons.add_competition") }
                </button>
            </td></tr>
        );
    }
}
