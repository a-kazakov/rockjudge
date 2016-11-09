import _ from "l10n";

import Row from "./Row";
import Acrobatics from "../Acrobatics";
import SportsmenList from "../SportsmenList";
import StatInfo from "../StatInfo";

export default class Section extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            config: PT.shape({
                include_acrobatics: PT.bool.isRequired,
                show_sportsmen_only: PT.bool.isRequired,
                disciplines: PT.object.isRequired,
            }).isRequired,
            discipline: PT.shape({
                id: PT.number.isRequired,
                name: PT.string.isRequired,
                participants: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
        };
    }
    renderRows() {
        let result = [];
        for (const participant of this.props.discipline.participants) {
            const include_acrobatics =
                this.props.config.include_acrobatics &&
                participant.programs.length !== 0;
            result.push(
                <Row
                    acroIncluded={ include_acrobatics }
                    config={ this.props.config }
                    key={ `P${participant.id}` }
                    participant={ participant }
                />
            );
            if (include_acrobatics) {
                result.push(
                    <Acrobatics
                        config={ this.props.config }
                        key={ `A${participant.id}` }
                        participant={ participant }
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
                    participants={ this.props.discipline.participants }
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
                    <th className="w-28 club">
                        <p>
                            { _("models.participant.club_name") }
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
        );
    }
    render() {
        if (!this.props.config.disciplines[this.props.discipline.id]) {
            return null;
        }
        return (
            <div>
                <h5>
                    <p>
                        { this.props.discipline.name }
                    </p>
                </h5>
                <div className="discipline">
                    { this.renderBody() }
                    <StatInfo
                        participants={ this.props.discipline.participants }
                    />
                </div>
            </div>
        );
    }
}

Section.displayName = "AdminPanel_Management_StartList_Disciplines_Section";
