import _ from "l10n";
import Api from "common/server/Api";
import showConfirm from "common/dialogs/showConfirm";
import closeDialog from "common/dialogs/closeDialog";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            client: PT.shape({
                id: PT.number.isRequired,
                client_id: PT.number.isRequired,
                access_level: PT.string.isRequired,
            }).isRequired,
            competition: PT.shape({
                judges: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        number: PT.string.isRequired,
                        name: PT.string.isRequired,
                        role_description: PT.string.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
    }

    getAccessLevels() {
        let result = new Map(["none", "admin", "presenter", "any_judge"].map(level =>
            [level, _(`global.access_levels.${level}`)]
        ));
        for (const judge of this.props.competition.judges) {
            const judge_role = judge.role_description || _("global.phrases.judge_n", judge.number);
            result.set(`judge_${judge.id}`, `${judge_role}: ${judge.name}`);
        }
        return result;
    }

    makeSelectRef = (ref) => this._select = ref;

    handleStartEditing = () => this.setState({ editing: true });
    handleStopEditing = () => this.setState({ editing: false });

    handleSubmission = () => {
        Api("client_auth.set", {
            client_auth_id: this.props.client.id,
            data: {
                access_level: this._select.value,
            },
        })
            .onSuccess(this.handleStopEditing)
            .send();
    }
    handleDeletion = (event) => {
        event.stopPropagation();
        showConfirm(
            _("admin.confirms.delete_client"),
            () => {
                Api("client_auth.delete", {
                    client_auth_id: this.props.client.id,
                })
                    .onSuccess(closeDialog)
                    .send();
        });
    }

    renderAccessLevelCell() {
        const access_levels = this.getAccessLevels();
        if (!this.state.editing) {
            return (
                <td className="access-level">
                    { access_levels.get(this.props.client.access_level) }
                </td>
            )
        }
        return (
            <td className="access-level">
                <select
                    defaultValue={ this.props.client.access_level }
                    ref={ this.makeSelectRef }
                >
                    { Array.from(access_levels.entries()).map(([level, description]) =>
                        <option key={ level } value={ level }>
                            { description }
                        </option>
                    ) }
                </select>
            </td>
        )
    }
    renderButtons() {
        if (this.state.editing) {
            return (
                <div>
                    <button
                        className="save-button"
                        type="button"
                        onClick={ this.handleSubmission }
                    >
                        { _("global.buttons.save") }
                    </button>
                    <button
                        className="discard-button"
                        type="button"
                        onClick={ this.handleStopEditing }
                    >
                        { _("global.buttons.discard") }
                    </button>
                </div>
            );
        }
        return (
            <div>
                <button
                    className="edit-button"
                    type="button"
                    onClick={ this.handleStartEditing }
                >
                    { _("global.buttons.edit") }
                </button>
                <button
                    className="delete-button"
                    type="button"
                    onClick={ this.handleDeletion }
                >
                    { _("global.buttons.delete") }
                </button>
            </div>
        );
    }
    render() {
        return (
            <tr>
                <th className="id">
                    { `ID ${ this.props.client.client_id }` }
                </th>
                { this.renderAccessLevelCell() }
                <td className="buttons">
                    { this.renderButtons() }
                </td>
            </tr>
        );
    }
}

Row.displayName = "AdminPanel_Service_ClientsAuth_Row";
