import _ from "l10n";

export default class EditorRow extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            item: PT.shape({
                sp: PT.oneOfType([
                    PT.number.isRequired,
                    PT.string.isRequired,
                ]).isRequired,
                estimated_beginning: PT.string.isRequired,
                estimated_duration: PT.string.isRequired,
                verbose_name: PT.string.isRequired,
                tour_id: PT.number,
            }).isRequired,
            newItem: PT.bool,
            tours: PT.arrayOf(
                PT.shape({
                    id: PT.number.isRequired,
                    name: PT.string.isRequired,
                }).isRequired
            ).isRequired,
            onStopEditing: PT.func.isRequired,
            onSubmit: PT.func.isRequired,
        };
    }
    static defaultProps() {
        return {
            newItem: false,
        };
    }

    makeSpRef = (ref) => {
        if (ref && !this._sp) {
            ref.select();
        }
        this._sp = ref;
    };
    makeTourIdRef             = (ref) => this._tour_id = ref;
    makeVerboseNameRef        = (ref) => this._verbose_name = ref;
    makeEstimatedBeginningRef = (ref) => this._estimated_beginning = ref;
    makeEstimatedDurationRef  = (ref) => this._estimated_duration = ref;

    serialize() {
        return {
            sp: parseInt(this._sp.value, 10) || 0,
            tour_id: this._tour_id.value === "" ? null : Number(this._tour_id.value),
            verbose_name: this._verbose_name.value,
            estimated_beginning: this._estimated_beginning.value,
            estimated_duration: this._estimated_duration.value,
        }
    }
    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.serialize());
    }

    getClassName() {
        let result = "editor";
        if (this.props.newItem) {
            result += " create";
        }
        return result;
    }
    render() {
        return (
            <tr className={ this.getClassName() }>
                <td colSpan="6">
                    <form onSubmit={ this.handleSubmission }>
                        <div className="col-5">
                            <label>
                                { _("models.competition_plan_item.sp") }
                                <input
                                    defaultValue={ this.props.item.sp }
                                    ref={ this.makeSpRef }
                                />
                            </label>
                        </div>
                        <div className="col-10">
                            <label>
                                { _("models.competition_plan_item.verbose_name") }
                                <input
                                    defaultValue={ this.props.item.verbose_name }
                                    ref={ this.makeVerboseNameRef }
                                />
                            </label>
                            <label>
                                { _("models.competition_plan_item.tour") }
                                <select
                                    defaultValue={ this.props.item.tour_id || "" }
                                    ref={ this.makeTourIdRef }
                                >
                                    <option value="">
                                        ----------
                                    </option>
                                    { this.props.tours.map(tour =>
                                        <option key={ tour.id } value={ tour.id }>
                                            { tour.name }
                                        </option>
                                    ) }
                                </select>
                            </label>
                        </div>
                        <div className="col-5">
                            <label>
                                { _("models.competition_plan_item.estimated_beginning") }
                                <input
                                    defaultValue={ this.props.item.estimated_beginning }
                                    ref={ this.makeEstimatedBeginningRef }
                                />
                            </label>
                            <label>
                                { _("models.competition_plan_item.estimated_duration") }
                                <input
                                    defaultValue={ this.props.item.estimated_duration }
                                    ref={ this.makeEstimatedDurationRef }
                                />
                            </label>
                        </div>
                        <div className="col-4">
                            <div className="buttons vertical">
                                <button
                                    className="btn btn-primary"
                                    type="submit"
                                >
                                    { _("global.buttons.submit") }
                                </button>
                                <button
                                    className="btn btn-danger"
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

EditorRow.displayName = "AdminPanel_Management_CompetitionPlan_EditorRow";
