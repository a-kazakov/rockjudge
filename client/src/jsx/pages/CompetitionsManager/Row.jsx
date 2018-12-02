import React from "react";

import PT from "prop-types";
import _ from "l10n";
import showConfirm from "common/dialogs/showConfirm";
import Model from "common/server/Storage/models/Model";

export default class Row extends React.Component {
    static propTypes = {
        entry: PT.instanceOf(Model).isRequired,
        loading: PT.bool.isRequired,
        onDelete: PT.func.isRequired,
        onStartEditing: PT.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    handleDeletion = (event) => {
        event.stopPropagation();
        showConfirm(
            _("admin.confirms.delete_competition"),
            this.props.onDelete,
        );
    };
    render() {
        const {entry} = this.props;
        return (
            <tr
                className="viewer"
                onClick={ this.props.onStartEditing }
            >
                <td className="name">
                    { entry.name }
                </td>
                <td className="date">
                    { entry.date }
                </td>
                <td className="is-active">
                    { entry.active
                        ? _("global.labels.yes")
                        : _("global.labels.no")
                    }
                </td>
                <td className="delete">
                    <button
                        className="btn btn-danger"
                        tabIndex={ -1 }
                        type="button"
                        onClick={ this.handleDeletion }
                    >
                        X
                    </button>
                </td>
            </tr>
        );
    }
}
