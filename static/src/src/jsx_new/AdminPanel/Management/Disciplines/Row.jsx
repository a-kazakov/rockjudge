import _ from "l10n";
import { Api } from "server/api";
import { showConfirm } from "ui/dialogs";

import EditorRow from "./EditorRow";

export default class Row extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            discipline: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
                sp: PT.number.isRequired,
                external_id: PT.string.isRequired,
            }).isRequired,
            judges: PT.arrayOf(PT.object.isRequired).isRequired,
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
        Api("discipline.set", {
            discipline_id: this.props.discipline.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }
    handleDeletion = (event) => {
        event.stopPropagation();
        showConfirm(
            _("admin.confirms.delete_discipline"),
            () => {
                Api("discipline.delete", {
                    discipline_id: this.props.discipline.id,
                })
                    .onSuccess(() => swal.close())
                    .send()
            }
        );
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
                <td className="name">
                    { this.props.discipline.name }
                </td>
                <td className="sp">
                    { this.props.discipline.sp }
                </td>
                <td className="external-id">
                    { this.props.discipline.external_id }
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

Row.displayName = "AdminPanel_Management_Disciplines_Row";
