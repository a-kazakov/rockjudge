import Section from "./Section";
import ClubsShown from "../ClubsShown";
import groupParticipants from "../groupParticipants";

export default class Disciplines extends React.Component {
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
        const disciplines = groupParticipants(this.props.competition, this.props.config);
        return (
            <div>
                <ClubsShown { ...this.props } />
                { disciplines.map(discipline =>
                    <Section
                        discipline={ discipline }
                        key={ discipline.id }
                        { ...this.props }
                    />
                ) }
            </div>
        );
    }
}

Disciplines.displayName = "AdminPanel_Management_StartList_Disciplines";
