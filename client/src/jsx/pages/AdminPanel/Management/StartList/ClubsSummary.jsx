import DisciplinesShown from "./ClubsShown";
import StatInfo from "./StatInfo";
import groupParticipants from "./groupParticipants";

export default class ClubsSummary extends React.Component {
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
        const all_participants = [].concat.apply([], clubs.map(c => c.participants));
        return (
            <div className="summary">
                <DisciplinesShown { ...this.props } />
                <table className="bordered-table"><tbody>
                    { clubs.map(club =>
                        <StatInfo
                            tableRow
                            key={ club.id }
                            label={ `${club.name}, ${club.city}` }
                            participants={ club.participants }
                        />
                    ) }
                </tbody></table>
                <p>&nbsp;</p>
                <StatInfo participants={ all_participants } />
            </div>
        );
    }
}

ClubsSummary.displayName = "AdminPanel_Management_StartList_ClubsSummary";
