import React from "react";

import _ from "l10n";
import PT from "prop-types";

export default class CreationButton extends React.Component {
    static propTypes = {
        onClick: PT.func.isRequired,
    };

    render() {
        return (
            <tr>
                <td colSpan="6">
                    <button
                        className="create-button"
                        type="button"
                        onClick={this.props.onClick}
                    >
                        {_("admin.buttons.add_competition_plan_item")}
                    </button>
                </td>
            </tr>
        );
    }
}
