import _ from "l10n";
import Api from "common/server/Api";

import EditorRow from "./EditorRow";

export default class CreationRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tours: PT.arrayOf(PT.object.isRequired).isRequired,
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
        Api("competition_plan_item.create", {
            competition_id: this.props.competition.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }

    renderEditor() {
        let empty_data = {
            "sp": "",
            "verbose_name": "",
            "tour_id": null,
            "estimated_duration": "",
            "estimated_beginning": "",
        }
        return (
            <EditorRow
                newItem
                item={ empty_data }
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
                    { _("admin.buttons.add_competition_plan_item") }
                </button>
            </td></tr>
        );
    }
    render() {
        return this.state.editing ? this.renderEditor() : this.renderButton();
    }
}


CreationRow.displayName = "AdminPanel_Management_CompetitionPlan_CreationRow";
