import _ from "l10n";
import rules_set from "rules_sets/loader";

export default class InputForm extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            classes: PT.arrayOf(PT.string.isRequired),
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
            participants_per_heat: parseInt(this._participants_per_heat.value, 10) || 1,
            default_program:       this._default_program.value,
        };
        if (!this.props.tour || !this.props.tour.finalized) {
            Object.assign(result, {
                num_advances:        parseInt(this._num_advances.value, 10) || 0,
                scoring_system_name: this._scoring_system_name.value,
                hope_tour :          this._hope_tour.checked,
            });
        }
        return result;
    }
    render() {
        const classes = ["tour", "editor"].concat(this.props.classes).join(" ");
        const tour = this.props.tour || {
            id: "new",
            finalized: false,
            hope_tour: false,
            name: "",
            num_advances: "",
            participants_per_heat: "1",
            default_program: "",
            scoring_system_name: rules_set.meta.scoring_systems[0],
        }
        return (
            <form
                className={ classes }
                key={ tour.id }
                onSubmit={ this.handleSubmission }
            >
                <div className="row">
                    <div className="col-12 wrapper">
                        <div className="col-24">
                            <label>
                                { _("models.tour.name") }
                                <input
                                    required
                                    defaultValue={ tour.name }
                                    list="dl_tours"
                                    ref={ this.makeNameRef }
                                    type="text"
                                />
                            </label>
                        </div>
                        <div className="col-8">
                            <label>
                                { _("models.tour.num_advances") }
                            </label>
                            <input
                                defaultValue={ tour.num_advances }
                                disabled={ tour.finalized }
                                ref={ this.makeNumAdvandesRef }
                                type="text"
                            />
                        </div>
                        <div className="col-8">
                            <label>
                                { _("models.tour.participants_per_heat") }
                                <input
                                    defaultValue={ tour.participants_per_heat }
                                    ref={ this.makeParticipantPerHeatRef }
                                    type="text"
                                />
                            </label>
                        </div>
                        <div className="col-8">
                            <label>
                                { _("models.tour.is_hope_tour") }
                                <input
                                    defaultChecked={ tour.hope_tour }
                                    disabled={ tour.finalized }
                                    ref={ this.makeHopeTourRef }
                                    type="checkbox"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="col-12 wrapper">
                        <div className="col-24">
                            <label>
                                { _("models.tour.scoring_system_name") }
                                <select
                                    defaultValue={ tour.scoring_system_name }
                                    disabled={ tour.finalized }
                                    ref={ this.makeScoringSystemRef }
                                >
                                    { rules_set.meta.scoring_systems.map((sn) =>
                                        <option key={ sn } value={ sn }>
                                            { rules_set.translate(`scoring_systems_names.${sn}`) }
                                        </option>
                                    ) }
                                </select>
                            </label>
                        </div>
                        <div className="col-12">
                            <label>
                                { _("models.tour.default_program") }
                            </label>
                            <input
                                defaultValue={ tour.default_program || "" }
                                list="dl_programs"
                                ref={ this.makeDefaultProgramRef }
                                type="text"
                            />
                        </div>
                        <div className="col-12">
                            <div className="buttons horizontal">
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
                    </div>
                </div>
            </form>
        );
    }
}

InputForm.displayName = "AdminPanel_Management_Tours_InputForm";
