import _ from "l10n";

import Row from "./Row";
import Acrobatics from "../Acrobatics";
import SportsmenList from "../SportsmenList";
import StatInfo from "../StatInfo";

export default class Section extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            club: PT.shape({
                name: PT.string.isRequired,
                city: PT.string.isRequired,
                participants: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
            config: PT.shape({
                include_acrobatics: PT.bool.isRequired,
                show_sportsmen_only: PT.bool.isRequired,
            }).isRequired,
        };
    }

    renderRows() {
        let result = [];
        for (const p of this.props.club.participants) {
            const include_acrobatics =
                this.props.config.include_acrobatics &&
                p.programs.length !== 0;
            result.push(
                <Row
                    acroIncluded={ include_acrobatics }
                    config={ this.props.config }
                    key={ `P${p.id}` }
                    participant={ p }
                />
            );
            if (include_acrobatics) {
                result.push(
                    <Acrobatics
                        config={ this.props.config }
                        key={ `A${p.id}` }
                        participant={ p }
                    />
                )
            }
        }
        return result;
    }
    renderBody() {
        if (this.props.config.show_sportsmen_only) {
            return (
                <SportsmenList
                    config={ this.props.config }
                    participants={ this.props.club.participants }
                />
            );
        }
        return (
            <table className="bordered-table"><thead>
                <tr>
                    <th className="w-8 number">
                        <p>
                            { _("models.participant.number") }
                        </p>
                    </th>
                    <th className="w-27 name">
                        <p>
                            { _("models.participant.sportsmen") }
                        </p>
                    </th>
                    <th className="w-9 year-of-birth">
                        <p>
                            { _("models.participant.sportsmen_year_of_birth") }
                        </p>
                    </th>
                    <th className="w-28 discipline">
                        <p>
                            { _("models.participant.discipline_name") }
                        </p>
                    </th>
                    <th className="w-28 coaches">
                        <p>
                            { _("models.participant.coaches") }
                        </p>
                    </th>
                </tr>
            </thead><tbody>
                { this.renderRows() }
            </tbody></table>
        )
    }
    render() {
        return (
            <div>
                <h5>
                    <p>
                        { `${this.props.club.name}, ${this.props.club.city}` }
                    </p>
                </h5>
                <div className="club">
                    { this.renderBody() }
                    <StatInfo
                        participants={ this.props.club.participants }
                    />
                </div>
            </div>
        );
    }
}

Section.displayName = "AdminPanel_Management_StartList_Clubs_Section";
