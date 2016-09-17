import _ from "l10n";
import Api from "common/server/Api";

import EditorRow from "./EditorRow";

export default class CreationRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                clubs: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
            discipline: PT.shape({
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
        Api("participant.create", {
            discipline_id: this.props.discipline.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }

    renderEditor() {
        const empty_data = {
            "formation_name": "",
            "coaches": "",
            "number": "",
            "club": {
                "id": this.props.competition.clubs[0]
                    ? this.props.competition.clubs[0].id
                    : null,
            },
            "sportsmen": [],
            "programs": [],
        }
        return (
            <EditorRow
                newParticipant
                participant={ empty_data }
                onStopEditing={ this.handleStopEditing }
                onSubmit={ this.handleSubmission }
                { ...this.props }
            />
        );
    }
    renderButton() {
        return (
            <tr><td colSpan="6">
                <button
                    className="btn btn-default full-width"
                    type="button"
                    onClick={ this.handleStartEditing }
                >
                    { _("admin.buttons.add_participant") }
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

CreationRow.displayName = "AdminPanel_Management_Participants_CreationRow";
