import React from "react";

import showConfirm from "common/dialogs/showConfirm";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";

export default class Row extends React.Component {
    static propTypes = {
        entry: PT.instanceOf(Model).isRequired,
        loading: PT.bool.isRequired,
        onDelete: PT.func.isRequired,
        onStartEditing: PT.func.isRequired,
    };

    handleDeletion = () => {
        showConfirm(_("admin.confirms.delete_participant"), this.props.onDelete);
    };
    render() {
        const participant = this.props.entry;
        return (
            <tr className="viewer" onClick={this.props.onStartEditing}>
                <td className="number">{participant.number}</td>
                <td className="name">{participant.name}</td>
                <td className="club-name">{participant.club.name}</td>
                <td className="club-city">{participant.club.city}</td>
                <td className="delete">
                    <button
                        className="btn btn-danger"
                        type="button"
                        onClick={this.handleDeletion}
                    >
                        X
                    </button>
                </td>
            </tr>
        );
    }
}
