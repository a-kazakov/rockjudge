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
        event.preventDefault();
        showConfirm(_("admin.confirms.delete_program"), this.props.onDelete);
    };

    renderElement = (element, idx) => {
        return (
            <tr key={idx}>
                <td>{element.description}</td>
                <td className="text-right">{element.score.toFixed(1)}</td>
            </tr>
        );
    };
    render() {
        const program = this.props.entry;
        return (
            <div className="program">
                <h5>
                    {program.name}
                    {program.default_for ? (
                        <em>&nbsp;({program.default_for})</em>
                    ) : null}
                    <div className="actions">
                        <a href="#" onClick={this.props.onStartEditing}>
                            Редактировать
                        </a>
                        {" / "}
                        <a href="#" onClick={this.handleDeletion}>
                            Удалить
                        </a>
                    </div>
                </h5>
                <table className="program-table">
                    <tbody>{program.elements.map(this.renderElement)}</tbody>
                </table>
            </div>
        );
    }
}
