export default class Clubs extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                clubs: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        name: PT.string.isRequired,
                        city: PT.string.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
        };
    }

    regroupClubs() {
        let cities = new Map();
        for (const club of this.props.competition.clubs) {
            if (!cities.has(club.city)) {
                cities.set(club.city, [])
            }
            cities.get(club.city).push(club);
        }
        return cities;
    }

    renderRow = (city, clubs) => {
        return (
            <tr key={ city }>
                <th>
                    { city }
                </th>
                <td>
                    { clubs.map(club =>
                        <div key={ club.id }>
                            { club.name }
                        </div>
                    ) }
                </td>
            </tr>
        );
    }
    render() {
        return (
            <table className="judges"><tbody>
                { Array.from(this.regroupClubs().entries()).map(([city, clubs]) =>
                    this.renderRow(city, clubs)
                ) }
            </tbody></table>
        );
    }
}

Clubs.displayName = "PresenterTablet_InfoPage_Clubs";
