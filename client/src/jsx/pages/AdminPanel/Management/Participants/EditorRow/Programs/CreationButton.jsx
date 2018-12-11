import React from "react";

import _ from "l10n";
import PT from "prop-types";

export default class CreationButton extends React.Component {
    static propTypes = {
        onClick: PT.func.isRequired,
    };

    render() {
        return (
            <div className="program-creator">
                <button
                    className="create-button"
                    type="button"
                    onClick={this.props.onClick}
                >
                    {_("global.buttons.add")}
                </button>
            </div>
        );
    }
}
