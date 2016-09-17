import _ from "l10n";
import { Api } from "server/api";
import { showConfirm } from "ui/dialogs";

import EditorRow from "./EditorRow";

export default class Row extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            judge: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
                number: PT.string.isRequired,
                category: PT.string.isRequired,
                role_description: PT.string.isRequired,
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
        Api("judge.set", {
            judge_id: this.props.judge.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }
    handleDeletion = (event) => {
        event.stopPropagation();
        showConfirm(
            _("admin.confirms.delete_judge"),
            () => {
                Api("judge.delete", {
                    judge_id: this.props.judge.id,
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
                <td className="role-description">
                    { this.props.judge.role_description || _("global.phrases.judge_n", this.props.judge.number) }
                </td>
                <td className="name">
                    { this.props.judge.name }
                </td>
                <td className="category">
                    { this.props.judge.category }
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

Row.displayName = "AdminPanel_Management_Judges_Row";
