import { _ } from "l10n/loader";
import { tour_names } from "l10n/loader";
import { GL } from "common/definitions";

export default class InputForm extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            classes: PT.arrayOf(PT.string.isRequired),
            competition: PT.shape({
                rules_set: PT.string.isRequired,
            }).isRequired,
            tour: PT.shape({
                default_program: PT.string.isRequired,
                finalized: PT.bool.isRequired,
                hope_tour: PT.bool.isRequired,
                name: PT.string.isRequired,
                num_advances: PT.number.isRequired,
                participants_per_heat: PT.number.isRequired,
                scoring_system_name: PT.string.isRequired,
            }), // not required
            onStopEditing: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }
    static get defaultProps() {
        return {
            classes: [],
            tour: null,
        }
    }

    makeNameRef               = (ref) => this._name = ref;
    makeParticipantPerHeatRef = (ref) => this._participants_per_heat = ref;
    makeDefaultProgramRef     = (ref) => this._default_program = ref;
    makeNumAdvandesRef        = (ref) => this._num_advances = ref;
    makeScoringSystemRef      = (ref) => this._scoring_system_name = ref;
    makeHopeTourRef           = (ref) => this._hope_tour = ref;

    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.serialize());
    }
    serialize() {
        let result = {
            name:                  this._name.value,
            participants_per_heat: parseInt(this._participants_per_heat.value) || 1,
            default_program:       this._default_program.value,
        };
        if (!this.props.tour || !this.props.tour.finalized) {
            Object.assign(result, {
                num_advances:        parseInt(this._num_advances.value) || 0,
                scoring_system_name: this._scoring_system_name.value,
                hope_tour :          this._hope_tour.checked,
            });
        }
        return result;
    }
    render() {
        const classes = ["tour"].concat(this.props.classes).join(" ");
        const tour = this.props.tour || {
            id: "new",
            finalized: false,
            hope_tour: false,
            name: "",
            num_advances: "",
            participants_per_heat: "1",
            default_program: "",
            scoring_system_name: GL.scoring_systems[this.props.competition.rules_set][0],
        }
        return (
            <form
                className={ classes }
                key={ tour.id }
                onSubmit={ this.handleSubmission }
            >
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group form-group-sm">
                            <label className="control-label">
                                { _("models.tour.name") }
                            </label>
                            <input
                                className="form-control"
                                defaultValue={ tour.name }
                                list="dl_tours"
                                ref={ this.makeNameRef }
                                type="text"
                            />
                        </div>
                        <div className="form-group form-group-sm row">
                            <div className="col-lg-4">
                                <label className="control-label">
                                    { _("models.tour.num_advances") }
                                </label>
                                <input
                                    className="form-control"
                                    defaultValue={ tour.num_advances }
                                    disabled={ tour.finalized }
                                    ref={ this.makeNumAdvandesRef }
                                    type="text"
                                />
                            </div>
                            <div className="col-lg-4">
                                <label className="control-label">
                                    { _("models.tour.participants_per_heat") }
                                </label>
                                <input
                                    className="form-control"
                                    defaultValue={ tour.participants_per_heat }
                                    ref={ this.makeParticipantPerHeatRef }
                                    type="text"
                                />
                            </div>
                            <div className="col-lg-4">
                                <label className="control-label">
                                    { _("models.tour.is_hope_tour") }
                                </label>
                                <div className="checkbox">
                                    <label>
                                        <input
                                            defaultChecked={ tour.hope_tour }
                                            disabled={ tour.finalized }
                                            ref={ this.makeHopeTourRef }
                                            type="checkbox"
                                        />
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="form-group form-group-sm">
                            <label className="control-label">
                                { _("models.tour.scoring_system_name") }
                            </label>
                            <select
                                className="form-control"
                                defaultValue={ tour.scoring_system_name }
                                disabled={ tour.finalized }
                                ref={ this.makeScoringSystemRef }
                            >
                                { GL.scoring_systems[this.props.competition.rules_set].map((sn) =>
                                    <option key={ sn } value={ sn }>
                                        { _("scoring_systems_names." + sn) }
                                    </option>
                                ) }
                            </select>
                        </div>
                        <div className="form-group form-group-sm row">
                            <div className="col-lg-6">
                                <label className="control-label">
                                    { _("models.tour.default_program") }
                                </label>
                                <input
                                    className="form-control"
                                    defaultValue={ tour.default_program || "" }
                                    list="dl_programs"
                                    ref={ this.makeDefaultProgramRef }
                                    type="text"
                                />
                            </div>
                            <div className="col-lg-6">
                                <label className="control-label">
                                    &nbsp;
                                </label>
                                <div className="text-right">
                                    <button
                                        className="btn btn-primary btn-sm"
                                        type="submit"
                                    >
                                        { _("global.buttons.submit") }
                                    </button>
                                    &nbsp;
                                    <button
                                        className="btn btn-primary btn-sm"
                                        type="button"
                                        onClick={ this.props.onStopEditing }
                                    >
                                        { _("global.buttons.discard") }
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}

InputForm.displayName = "AdminPanel_Management_Tours_InputForm";
