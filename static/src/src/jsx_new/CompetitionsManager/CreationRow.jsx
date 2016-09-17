import _ from "l10n";
import Api from "common/server/Api";

import { GL } from "common/definitions";

import EditorRow from "./EditorRow";

export default class CreationRow extends React.Component {
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
        const scoring_systems = Object.keys(GL.scoring_systems);
        scoring_systems.sort()
        const empty_data = {
            "name": "",
            "date": "",
            "active": true,
            "info": [],
            "rules_set": scoring_systems[0],
        }
        return (
            <EditorRow
                newCompetition
                baseTabIndex={ 1000 * 10000 }
                competition={ empty_data }
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
