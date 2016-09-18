import _ from "l10n";
import Api from "common/server/Api";
import showConfirm from "common/dialogs/showConfirm";
import closeDialog from "common/dialogs/closeDialog";

import Editor from "./Editor";

export default class Program extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            program: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
                default_for: PT.string,
                acrobatics: PT.arrayOf(PT.object.isRequired).isRequired,
            }).isRequired,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    handleStartEditing = (event) => {
        event.preventDefault();
        this.setState({ editing: true });
    }
    handleStopEditing = () => {
        this.setState({ editing: false });
    }
    handleDeletion = (event) => {
        event.preventDefault();
        showConfirm(
            _("admin.confirms.delete_program"),
            () => {
                Api("program.delete", { program_id: this.props.program.id })
                    .onSuccess(closeDialog)
                    .send();
            }
        );
    }
    handleSubmission = (data) => {
        Api("program.set", { program_id: this.props.program.id, data: data })
            .onSuccess(this.handleStopEditing)
            .send();
    }
    render() {
        if (this.state.editing) {
            return (
                <Editor
                    program={ this.props.program }
                    onStopEditing={ this.handleStopEditing }
                    onSubmit={ this.handleSubmission }
                />
            );
        }
        return (
            <div>
                <h5>
                    { this.props.program.name }
                    { this.props.program.default_for
                        ? <em>&nbsp;({ this.props.program.default_for })</em>
                        : null
                    }
                    { " / " }
                    <a href="#" onClick={ this.handleStartEditing }>
                        Редактировать
                    </a>
                    { " / " }
                    <a href="#" onClick={ this.handleDeletion }>
                        Удалить
                    </a>
                </h5>
                <table className="full-width program"><tbody>
                    { this.props.program.acrobatics.map((element, idx) =>
                        <tr key={ idx }>
                            <td>
                                { element.description }
                            </td>
                            <td className="text-right">
                                { element.score.toFixed(1) }
                            </td>
                        </tr>
                    ) }
                </tbody></table>
            </div>
        );
    }
}

Program.displayName = "AdminPanel_Management_Participants_EditorRow_Programs_Program";
