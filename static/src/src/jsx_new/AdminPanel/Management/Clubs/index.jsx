import { _ } from "l10n/loader";

import Row from "./Row";
import CreationRow from "./CreationRow";

export default class Clubs extends React.Component {
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
            <div className="manage-clubs">
                <table className="table table-striped">
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
                            <th className="delete"></th>
                        </tr>
                        { rows }
                        <CreationRow
                            competition={ this.props.competition }
                        />
                    </tbody>
                </table>
            </div>
        );
    }
    render() {
        return (
            <div className="app-content">
                <header className="app-header">
                    <h1>
                        { _("admin.headers.clubs_management") }
                    </h1>
                </header>
                <div className="app-body">
                    { this.renderTable() }
                </div>
            </div>
        );
    }
}

Clubs.displayName = "AdminPanel_Management_Clubs";
