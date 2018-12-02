import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";

export default class Clubs extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            include_clubs: PT.bool.isRequired,
        }).isRequired,
    };

    render() {
        if (!this.props.config.include_clubs) {
            return null;
        }
        const clubs = this.props.competition.clubs.filter(club => club.participants.length > 0);
        let clubs_dict = new Map();
        for (const club of clubs) {
            let city_clubs = clubs_dict.get(club.city);
            if (!city_clubs) {
                city_clubs = []
                clubs_dict.set(club.city, city_clubs);
            }
            city_clubs.push(club.name);
        }
        for (const city_clubs of clubs_dict.values()) {
            city_clubs.sort();
        }
        let cities = Array.from(clubs_dict.keys());
        cities.sort();
        return (
            <div>
                <h4>
                    <p>
                        { _("admin.headers.clubs") }
                    </p>
                </h4>
                <table className="clubs"><tbody>
                    { cities.map(city =>
                        <tr className="va-top" key={ city }>
                            <th className="w-20">
                                <p className="text-left">
                                    { city }
                                </p>
                            </th>
                            <td className="w-80">
                                <p>
                                    { clubs_dict.get(city).join(", ") }
                                </p>
                            </td>
                        </tr>
                    ) }
                </tbody></table>
            </div>
        );
    }
}

