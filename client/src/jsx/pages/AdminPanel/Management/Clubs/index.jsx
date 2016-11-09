import _ from "l10n";

import Row from "./Row";
import CreationRow from "./CreationRow";

export default class Clubs extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                clubs: PT.arrayOf(PT.object.isRequired).isRequired,
            }).isRequired,
        };
    }
    renderTable() {
        const rows = this.props.competition.clubs.map(club => {
            return (
                <Row
                    club={ club }
                    key={ club.id }
                />
            );
        });
        return (
            <table>
                <tbody>
                    <tr>
                        <th className="name">
                            { _("models.club.name") }
                        </th>
                        <th className="city">
                            { _("models.club.city") }
                        </th>
                        <th className="external-id">
                            { _("models.club.external_id") }
                        </th>
                        <th className="delete" />
                    </tr>
                    { rows }
                    <CreationRow
                        competition={ this.props.competition }
                    />
                </tbody>
            </table>
        );
    }
    render() {
        return (
            <div className="Clubs">
                <header>
                    <h1>
                        { _("admin.headers.clubs_management") }
                    </h1>
                </header>
                <div className="body">
                    { this.renderTable() }
                </div>
            </div>
        );
    }
}

Clubs.displayName = "AdminPanel_Management_Clubs";
