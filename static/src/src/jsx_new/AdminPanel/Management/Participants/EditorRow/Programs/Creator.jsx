import _ from "l10n";
import { Api } from "server/api";

import Editor from "./Editor";

export default class Creator extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            participant: PT.shape({
                id: PT.number.isRequired,
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
        Api("program.create", {
            participant_id: this.props.participant.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }

    renderBody() {
        if (this.state.editing) {
            const empty_program = {
                name: "",
                default_for: "",
                acrobatics: [],
            };
            return (
                <Editor
                    creating
                    program={ empty_program }
                    onStopEditing={ this.handleStopEditing }
                    onSubmit={ this.handleSubmission }
                />
            );
        }
        return (
            <button
                className="btn btn-sm btn-default full-width"
                type="button"
                onClick={ this.handleStartEditing }
            >
                { _("global.buttons.add") }
            </button>
        );
    }
    render() {
        return (
            <div className="program-creator">
                { this.renderBody() }
            </div>
        );
    }
}

Creator.displayName = "AdminPanel_Management_Participants_EditorRow_Programs_Creator";
