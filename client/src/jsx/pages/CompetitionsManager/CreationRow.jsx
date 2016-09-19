import _ from "l10n";
import Api from "common/server/Api";

import EditorRow from "./EditorRow";

export default class CreationRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            rulesSets: PT.object.isRequired,
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
        Api("competition.create", {
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }

    renderEditor() {
        const empty_data = {
            "name": "",
            "date": "",
            "active": true,
            "info": [],
            "rules_set": Object.keys(this.props.rulesSets).sort()[0],
        }
        return (
            <EditorRow
                newCompetition
                baseTabIndex={ 1000 * 10000 }
                competition={ empty_data }
                rulesSets={ this.props.rulesSets }
                onStopEditing={ this.handleStopEditing }
                onSubmit={ this.handleSubmission }
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
                    { _("admin.buttons.add_competition") }
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

CreationRow.displayName = "CompetitionsManager_CreationRow";
