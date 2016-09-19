import _ from "l10n";

export default class EditorRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            judge: PT.shape({
                number: PT.string.isRequired,
                category: PT.string.isRequired,
                name: PT.string.isRequired,
                role_description: PT.string.isRequired,
                external_id: PT.string,
                sp: PT.number.isRequired,
            }).isRequired,
            newJudge: PT.bool,
            onStopEditing: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            newJudge: false,
        }
    }

    makeCategoryRef        = (ref) => this._category = ref;
    makeNameRef            = (ref) => this._name = ref;
    makeRoleDescriptionRef = (ref) => this._role_description = ref;
    makeExternalIdRef      = (ref) => this._external_id = ref;
    makeSpRef              = (ref) => this._sp = ref;

    makeNumberRef = (ref) => {
        if (ref && !this._number) {
            ref.select();
        }
        this._number = ref;
    }

    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.serialize());
    }

    serialize() {
        return {
            name: this._name.value,
            number: this._number.value,
            category: this._category.value,
            role_description: this._role_description.value,
            sp: parseInt(this._sp.value, 10),
            external_id: this._external_id.value !== ""
                ? this._external_id.value
                : null,
        }
    }

    getClassName() {
        let result = "editor";
        if (this.props.newJudge) {
            result += " create";
        }
        return result;
    }
    render() {
        return (
            <tr className={ this.getClassName() }>
                <td colSpan="5">
                    <form onSubmit={ this.handleSubmission }>
                        <div className="col-2">
                            <label className="full-width">
                                { _("models.judge.number") }
                                <input
                                    defaultValue={ this.props.judge.number }
                                    ref={ this.makeNumberRef }
                                />
                            </label>
                        </div>
                        <div className="col-2">
                            <label className="full-width">
                                { _("models.judge.category") }
                                <input
                                    defaultValue={ this.props.judge.category }
                                    ref={ this.makeCategoryRef }
                                />
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="full-width">
                                { _("models.judge.name") }
                                <input
                                    defaultValue={ this.props.judge.name }
                                    ref={ this.makeNameRef }
                                />
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="full-width">
                                { _("models.judge.role_description") }
                                <input
                                    defaultValue={ this.props.judge.role_description }
                                    ref={ this.makeRoleDescriptionRef }
                                />
                            </label>
                        </div>
                        <div className="col-3">
                            <label className="full-width">
                                { _("models.judge.external_id") }
                                <input
                                    defaultValue={ this.props.judge.external_id || "" }
                                    ref={ this.makeExternalIdRef }
                                />
                            </label>
                        </div>
                        <div className="col-2">
                            <label className="full-width">
                                { _("models.judge.sp") }
                                <input
                                    className="full-width"
                                    defaultValue={ this.props.judge.sp }
                                    ref={ this.makeSpRef }
                                />
                            </label>
                        </div>
                        <div className="col-3">
                            <div className="buttons vertical">
                                <button type="submit">
                                    { _("global.buttons.submit") }
                                </button>
                                <button
                                    type="button"
                                    onClick={ this.props.onStopEditing }
                                >
                                    { _("global.buttons.discard") }
                                </button>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
        );
    }
}

EditorRow.displayName = "AdminPanel_Management_Judges_EditorRow";
