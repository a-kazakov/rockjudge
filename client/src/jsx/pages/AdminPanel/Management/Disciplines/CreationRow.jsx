import _ from "l10n";
import Api from "common/server/Api";

import EditorRow from "./EditorRow";

export default class CreationRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                id: PT.number.isRequired,
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
        Api("discipline.create", {
            competition_id: this.props.competition.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }

    renderEditor() {
        let empty_data = {
            "name": "",
            "discipline_judges": [],
            "sp": 0,
            "external_id": "",
        }
        return (
            <EditorRow
                newDiscipline
                discipline={ empty_data }
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
                    className="create-button"
                    type="button"
                    onClick={ this.handleStartEditing }
                >
                    { _("admin.buttons.add_discipline") }
                </button>
            </td></tr>
        );
    }
    render() {
        return this.state.editing
            ? this.renderEditor()
            : this.renderButton();
    }
}

CreationRow.displayName = "AdminPanel_Management_Disciplines_CreationRow";
