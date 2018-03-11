import _ from "l10n";
import Api from "common/server/Api";
import showConfirm from "common/dialogs/showConfirm";
import closeDialog from "common/dialogs/closeDialog";

import EditorRow from "./EditorRow";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
                date: PT.string.isRequired,
                active: PT.bool.isRequired,
            }).isRequired,
            idx: PT.number.isRequired,
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
        Api("competition.set", {
            competition_id: this.props.competition.id,
            data: data,
        })
            .onSuccess(this.handleStopEditing)
            .send();
    };
    handleDeletion = (event) => {
        event.stopPropagation();
        showConfirm(
            _("admin.confirms.delete_competition"),
            () => {
                Api("competition.delete", {
                    competition_id: this.props.competition.id,
                })
                    .onSuccess(closeDialog)
                    .send();
            }
        );
    };

    renderEditor() {
        return (
            <EditorRow
                baseTabIndex={ 1000 * this.props.idx }
                competition={ this.props.competition }
                onStopEditing={ this.handleStopEditing }
                onSubmit={ this.handleSubmission }
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
                    { this.props.competition.name }
                </td>
                <td className="date">
                    { this.props.competition.date }
                </td>
                <td className="is-active">
                    { this.props.competition.active
                        ? _("global.labels.yes")
                        : _("global.labels.no")
                    }
                </td>
                <td className="delete">
                    <button
                        className="btn btn-danger"
                        tabIndex={ -1 }
                        type="button"
                        onClick={ this.handleDeletion }
                    >
                        X
                    </button>
                </td>
            </tr>
        );
    }
    render() {
        return this.state.editing
            ? this.renderEditor()
            : this.renderViewer();
    }
}

Row.displayName = "CompetitionsManager_Row";
