import React from "react";

import _ from "l10n";
import showConfirm from "common/dialogs/showConfirm";
import PT from "prop-types";
import Model from "common/server/Storage/models/Model";

export default class Row extends React.Component {
    static propTypes = {
        entry: PT.instanceOf(Model).isRequired,
        loading: PT.bool.isRequired,
        onDelete: PT.func.isRequired,
        onStartEditing: PT.func.isRequired,
    };

    handleDeletion = (event) => {
        event.stopPropagation();
        showConfirm(
            _("admin.confirms.delete_judge"),
            this.props.onDelete,
        );
    };

    render() {
        return (
            <tr
                className="viewer"
                onClick={ this.props.onStartEditing }
            >
                <td className="role-description">
                    { this.props.entry.role_description || _("global.phrases.judge_n", this.props.entry.number) }
                </td>
                <td className="name">
                    { this.props.entry.name }
                </td>
                <td className="category">
                    { this.props.entry.category }
                </td>
                <td className="delete">
                    <button onClick={ this.handleDeletion }>
                        X
                    </button>
                </td>
            </tr>
        );
    }
}

