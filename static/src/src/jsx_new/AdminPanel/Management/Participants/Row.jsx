import _ from "l10n";
import { Api } from "server/api";
import { showConfirm } from "ui/dialogs";

import EditorRow from "./EditorRow";

export default class Row extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
            participant: PT.shape({
                id: PT.number.isRequired,
                number: PT.number.isRequired,
                name: PT.string.isRequired,
                club: PT.shape({
                    name: PT.string.isRequired,
                    city: PT.string.isRequired,
                }).isRequired,
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
        Api("participant.set", {
            participant_id: this.props.participant.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }
    handleDeletion = (event) => {
        event.stopPropagation();
        showConfirm(
            _("admin.confirms.delete_participant"),
            () => {
                Api("participant.delete", {
                    participant_id: this.props.participant.id,
                })
                    .onSuccess(() => swal.close())
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
        return (
            <tr
                className="viewer"
                onClick={ this.handleStartEditing }
            >
                <td className="number">
                    { this.props.participant.number }
                </td>
                <td className="name">
                    { this.props.participant.name }
                </td>
                <td className="club-name">
                    { this.props.participant.club.name }
                </td>
                <td className="club-city">
                    { this.props.participant.club.city }
                </td>
                <td className="delete">
                    <button
                        className="btn btn-danger"
                        type="button"
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

Row.displayName = "AdminPanel_Management_Participants_Row";
