import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";

export default class CreationButton extends React.Component {
    static propTypes = {
        context: PT.shape({
            afterId: PT.number,
            nextTour: PT.instanceOf(Model),
        }).isRequired,
        onClick: PT.func.isRequired,
    };

    handleClick = () => {
        this.props.onClick(this.props.context.afterId);
    };

    render() {
        if (this.props.context.nextTour?.finalized) {
            return null;
        }
        return (
            <button
                className="add-tour-button"
                type="button"
                onClick={ this.handleClick }
            >
                { _("admin.buttons.add_tour") }
            </button>
        );
    }
}

