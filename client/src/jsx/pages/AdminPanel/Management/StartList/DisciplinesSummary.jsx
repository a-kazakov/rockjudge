import ClubsShown from "./ClubsShown";
import StatInfo from "./StatInfo";
import groupParticipants from "./groupParticipants";

export default class DisciplinesSummary extends React.PureComponent {
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
        const all_participants = [].concat.apply([], disciplines.map(d => d.participants)); // Join lists
        return (
            <div className="summary">
                <ClubsShown { ...this.props } />
                <table className="bordered-table"><tbody>
                    { disciplines.map(discipline =>
                        <StatInfo
                            tableRow
                            key={ discipline.id }
                            label={ discipline.name }
                            participants={ discipline.participants }
                        />
                    ) }
                </tbody></table>
                <p>&nbsp;</p>
                <StatInfo participants={ all_participants } />
            </div>
        );
    }
}

DisciplinesSummary.displayName = "AdminPanel_Management_StartList_DisciplinesSummary";
