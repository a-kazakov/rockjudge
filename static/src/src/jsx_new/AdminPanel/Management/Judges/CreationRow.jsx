import _ from "l10n";
import { Api } from "server/api";

import EditorRow from "./EditorRow";

export default class CreationRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
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
        Api("judge.create", {
            competition_id: this.props.competition.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }

    renderEditor() {
        const empty_data = {
            "number": "",
            "category": "",
            "name": "",
            "role_description": "",
            "external_id": "",
            "sp": 0,
        }
        return (
            <EditorRow
                newJudge
                judge={ empty_data }
                onStopEditing={ this.handleStopEditing }
                onSubmit={ this.handleSubmission }
                { ...this.props }
            />
        );
    }
    renderButton() {
        return (
            <tr><td colSpan="5">
                <button
                    className="btn btn-default full-width"
                    type="button"
                    onClick={ this.handleStartEditing }
                >
                    { _("admin.buttons.add_judge") }
                </button>
            </td></tr>
        );
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    }
}

CreationRow.displayName = "AdminPanel_Management_Judges_CreationRow";
