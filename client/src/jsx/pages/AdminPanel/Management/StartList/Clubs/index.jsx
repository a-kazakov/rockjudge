import Section from "./Section";
import DisciplinesShown from "../DisciplinesShown";
import groupParticipants from "../groupParticipants";

export default class Clubs extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                clubs: PT.arrayOf(PT.object.isRequired).isRequired,
                disciplines: PT.arrayOf(PT.object.isRequired).isRequired,
            }).isRequired,
            config: PT.shape({
                clubs: PT.object.isRequired,
                disciplines: PT.object.isRequired,
                group_by_clubs: PT.bool.isRequired,
            }).isRequired,
        };
    }

    render() {
        const clubs = groupParticipants(this.props.competition, this.props.config);
        return (
            <div>
                <DisciplinesShown { ...this.props } />
                { clubs.map(club =>
                    <Section
                        club={ club }
                        key={ club.id }
                        { ...this.props }
                    />
                ) }
            </div>
        );
    }
}

Clubs.displayName = "AdminPanel_Management_StartList_Clubs";
