import _ from "l10n";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            idx: PT.number.isRequired,
            sportsman: PT.shape({
                last_name: PT.string.isRequired,
                first_name: PT.string.isRequired,
                year_of_birth: PT.string.isRequired,
                gender: PT.oneOf(["M", "F"]).isRequired,
                substitute: PT.bool.isRequired,
            }).isRequired,
            onChange: PT.func.isRequired,
            onDelete: PT.func.isRequired,
        };
    }
    handleChange(field, value) {
        let new_sportsman = Object.assign({}, this.props.sportsman); // clone
        new_sportsman[field] = value;
        this.props.onChange(this.props.idx, new_sportsman);
    }

    handleLastNameChange    = (e) => this.handleChange("last_name",     e.target.value);
    handleFirstNameChange   = (e) => this.handleChange("first_name",    e.target.value);
    handleYobChange         = (e) => this.handleChange("year_of_birth", e.target.value);
    handleGenderChange      = (e) => this.handleChange("gender",        e.target.value);
    handleSubstitudeChange  = (e) => this.handleChange("substitute",    e.target.value === "Y");

    handleDeletion = () => {
        this.props.onDelete(this.props.idx)
    }

    render() {
        return (
            <div className="sportsman">
                <input
                    className="last-name"
                    placeholder={ _("models.participant.last_name") }
                    type="text"
                    value={ this.props.sportsman.last_name }
                    onChange={ this.handleLastNameChange }
                />
                <input
                    className="first-name"
                    placeholder={ _("models.participant.first_name") }
                    type="text"
                    value={ this.props.sportsman.first_name }
                    onChange={ this.handleFirstNameChange }
                />
                <input
                    className="yob"
                    placeholder={ _("models.participant.yob") }
                    type="text"
                    value={ this.props.sportsman.year_of_birth }
                    onChange={ this.handleYobChange }
                />
                <select
                    className="gender"
                    value={ this.props.sportsman.gender }
                    onChange={ this.handleGenderChange }
                >
                    <option value="F">
                        { _("models.participant.gender_f") }
                    </option>
                    <option value="M">
                        { _("models.participant.gender_m") }
                    </option>
                </select>
                <select
                    className="substitute"
                    value={ this.props.sportsman.substitute ? "Y" : "N" }
                    onChange={ this.handleSubstitudeChange }
                >
                    <option value="N">
                        { _("models.participant.substitute_n") }
                    </option>
                    <option value="Y">
                        { _("models.participant.substitute_y") }
                    </option>
                </select>
                <button
                    className="delete"
                    type="button"
                    onClick={ this.handleDeletion }
                >
                    X
                </button>
            </div>
        );
    }
}

Row.displayName = "AdminPanel_Management_Participants_EditorRow_SportsmenList_Row";
