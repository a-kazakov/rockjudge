import _ from "l10n";
import { Api } from "server/api";
import showConfirm from "common/dialogs/showConfirm";
import closeDialog from "common/dialogs/closeDialog";

import EditorRow from "./EditorRow";

export default class Row extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            club: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
                city: PT.string.isRequired,
                external_id: PT.string.isRequired,
            }).isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    handleStartEditing = () => this.setState({ editing: true });
    handleStopEditing = () => this.setState({ editing: false });

    handleSubmission = (data) => {
        Api("club.set", {
            club_id: this.props.club.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }
    handleDeletion = (event) => {
        event.stopPropagation();
        showConfirm(
            _("admin.confirms.delete_club"),
            () => {
                Api("club.delete", {
                    club_id: this.props.club.id,
                })
                    .onSuccess(closeDialog)
                    .send();
        });
    }

    renderEditor() {
        return (
            <EditorRow
                onStopEditing={ this.handleStopEditing }
                onSubmit={ this.handleSubmission }
                { ...this.props }
            />
        );
    }
    renderViewer() {
        let c = this.props.club;
        return (
            <tr
                className="viewer"
                onClick={ this.handleStartEditing }
            >
                <td className="name">
                    { c.name }
                </td>
                <td className="city">
                    { c.city }
                </td>
                <td className="external-id">
                    { c.external_id }
                </td>
                <td className="delete">
                    <button
                        className="btn btn-danger"
                        onClick={ this.handleDeletion }
                    >
                        X
                    </button>
                </td>
            </tr>
        );
    }
    render() {
        if (this.state.editing) {
            return this.renderEditor();
        } else {
            return this.renderViewer();
        }
    }
}

Row.displayName = "AdminPanel_Management_Clubs_Row";
