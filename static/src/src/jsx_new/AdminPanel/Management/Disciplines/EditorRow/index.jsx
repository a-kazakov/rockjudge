import _ from "l10n";
import { showError } from "ui/dialogs";

import DisciplineJudges from "./DisciplineJudges";

export default class EditorRow extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            discipline: PT.shape({
                name: PT.string.isRequired,
                sp: PT.number.isRequired,
                external_id: PT.string.isRequired,
                discipline_judges: PT.arrayOf(PT.object.isRequired).isRequired,
            }).isRequired,
            judges: PT.arrayOf(PT.object.isRequired).isRequired,
            newDiscipline: PT.bool,
            onStopEditing: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            newDiscipline: false,
        };
    }

    makeNameRef = (ref) => {
        if (!this._name && ref) {
            ref.select();
        }
        this._name = ref;
    };
    makeSpRef               = (ref) => this._sp = ref;
    makeExternalIdRef       = (ref) => this._external_id = ref;
    makeDisciplineJudgesRef = (ref) => this._discipline_judges = ref;

    validate() {
        let used_judges = new Set();
        for (const dj of this._discipline_judges.value) {
            if (used_judges.has(dj.judge_id)) {
                const judge = this.props.judges.find(j => j.id === dj.judge_id);
                throw _("errors.discipline_judge.repeating_judge", judge.name);
            }
            used_judges.add(dj.judge_id);
        }
    }
    serialize() {
        return {
            name: this._name.value,
            sp: parseInt(this._sp.value, 10),
            discipline_judges: this._discipline_judges.value,
            external_id: this._external_id.value !== ""
                ? this._external_id.value
                : null,
            }
    }

    handleSubmission = (event) => {
        event.preventDefault();
        try {
            this.validate();
            this.props.onSubmit(this.serialize());
        } catch (ex) {
            showError(ex);
        }
    }

    getClassName() {
        let value = "editor";
        if (this.props.newDiscipline) {
            value += " create";
        }
        return value;
    }
    render() {
        return (
            <tr className={ this.getClassName() }>
                <td colSpan="5">
                    <form onSubmit={ this.handleSubmission }>
                        <div className="row">
                            <div className="col-lg-4">
                                <label className="full-width">
                                    { _("models.discipline.name") }
                                    <input
                                        className="full-width"
                                        defaultValue={ this.props.discipline.name }
                                        ref={ this.makeNameRef }
                                    />
                                </label>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <label className="full-width">
                                            { _("models.discipline.sp") }
                                            <input
                                                className="full-width"
                                                defaultValue={ this.props.discipline.sp }
                                                ref={ this.makeSpRef }
                                            />
                                        </label>
                                    </div>
                                    <div className="col-lg-6">
                                        <label className="full-width">
                                            { _("models.discipline.external_id") }<br />
                                            <input
                                                className="full-width"
                                                defaultValue={ this.props.discipline.external_id || "" }
                                                ref={ this.makeExternalIdRef }
                                            />
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <label className="full-width">
                                    { _("models.discipline.discipline_judges") }
                                </label>
                                <DisciplineJudges
                                    defaultValue={ this.props.discipline.discipline_judges }
                                    judges={ this.props.judges }
                                    ref={ this.makeDisciplineJudgesRef }
                                />
                            </div>
                            <div className="col-lg-2">
                                <label>&nbsp;</label>
                                <div className="buttons">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        { _("global.buttons.submit") }
                                    </button>
                                    <br />
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={ this.props.onStopEditing }
                                    >
                                        { _("global.buttons.discard") }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
        );
    }
}

EditorRow.displayName = "AdminPanel_Management_Disciplines_EditorRow";
