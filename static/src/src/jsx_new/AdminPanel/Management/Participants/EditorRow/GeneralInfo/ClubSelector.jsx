export default class ClubSelector extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            clubs: PT.arrayOf(PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
            })).isRequired,
            participantData: PT.shape({
                club_id: PT.number.isRequired,
            }).isRequired,
            onChange: PT.func.isRequired,
        };
    }
    handleChange = (e) => {
        this.props.onChange("club_id", parseInt(e.target.value));
    }
    renderList() {
        return this.props.clubs.map((club) =>
            <option key={ club.id } value={ club.id }>
                { club.name }
            </option>
        );
    }
    render() {
        return (
            <select
                className="full-width"
                value={ this.props.participantData.club_id }
                onChange={ this.handleChange }
            >
                { this.renderList() }
            </select>
        );
    }
}

ClubSelector.displayName = "AdminPanel_Management_Participants_EditorRow_GeneralInfo_ClubSelector";
