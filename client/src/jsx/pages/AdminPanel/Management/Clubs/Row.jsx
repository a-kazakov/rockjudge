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

    handleDeletion = event => {
        event.stopPropagation();
        showConfirm(_("admin.confirms.delete_club"), this.props.onDelete);
    };
    render() {
        let c = this.props.entry;
        return (
            <tr className="viewer" onClick={this.props.onStartEditing}>
                <td className="name">{c.name}</td>
                <td className="city">{c.city}</td>
                <td className="external-id">{c.external_id}</td>
                <td className="delete">
                    <button className="btn btn-danger" onClick={this.handleDeletion}>
                        X
                    </button>
                </td>
            </tr>
        );
    }
}
