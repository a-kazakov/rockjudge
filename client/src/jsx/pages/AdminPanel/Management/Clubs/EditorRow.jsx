import _ from "l10n";

export default class EditorRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            club: PT.shape({
                name: PT.string.isRequired,
                city: PT.string.isRequired,
                external_id: PT.string,
            }).isRequired,
            newClub: PT.bool,
            onStopEditing: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            newClub: false,
        }
    }

    makeCityRef       = (ref) => this._city = ref;
    makeExternalIdRef = (ref) => this._external_id = ref;

    makeNameRef = (ref) => {
        if (ref && !this._name) {
            ref.select();
        }
        this._name = ref;
    }

    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.serialize());
    }

    serialize() {
        return {
            name: this._name.value,
            city: this._city.value,
            external_id: this._external_id.value !== ""
                ? this._external_id.value
                : null,
        }
    }

    getClassName() {
        let result = "editor";
        if (this.props.newClub) {
            result += " create";
        }
        return result;
    }
    render() {
        return (
            <tr className={ this.getClassName() }>
                <td colSpan="4">
                    <form onSubmit={ this.handleSubmission }>
                        <div className="rows">
                            <div className="col-md-5">
                                <label className="full-width">
                                    { _("models.club.name") }
                                    <input
                                        className="full-width"
                                        defaultValue={ this.props.club.name }
                                        ref={ this.makeNameRef }
                                    />
                                </label>
                            </div>
                            <div className="col-md-2">
                                <label className="full-width">
                                    { _("models.club.city") }
                                    <input
                                        className="full-width"
                                        defaultValue={ this.props.club.city }
                                        ref={ this.makeCityRef }
                                    />
                                </label>
                            </div>
                            <div className="col-md-2">
                                <label className="full-width">
                                    { _("models.club.external_id") }<br />
                                    <input
                                        defaultValue={ this.props.club.external_id || "" }
                                        ref={ this.makeExternalIdRef }
                                    />
                                </label>
                            </div>
                            <div className="col-md-3">
                                <div className="buttons">
                                    <div className="buttons">
                                        <button
                                            className="btn btn-sm btn-primary"
                                            type="submit"
                                        >
                                            { _("global.buttons.submit") }
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger"
                                            type="button"
                                            onClick={ this.props.onStopEditing }
                                        >
                                            { _("global.buttons.discard") }
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
        );
    }
}

EditorRow.displayName = "AdminPanel_Management_Clubs_EditorRow";
