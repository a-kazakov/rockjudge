import _ from "l10n";

import Row from "./Row";
import CreationRow from "./CreationRow";

export default class Judges extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                id: PT.number.isRequired,
                judges: PT.arrayOf(PT.object.isRequired).isRequired,
            }).isRequired,
        };
    }
    renderTable() {
        const rows = this.props.competition.judges.map(judge =>
            <Row
                judge={ judge }
                key={ judge.id }
            />
        );
        return (
            <table>
                <tbody>
                    <tr>
                        <th className="role_description">
                            { _("models.judge.role_description") }
                        </th>
                        <th className="name">
                            { _("models.judge.name") }
                        </th>
                        <th className="category">
                            { _("models.judge.category") }
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
            <div className="Judges">
                <header>
                    <h1>
                        { _("admin.headers.judges_management") }
                    </h1>
                </header>
                <div className="body">
                    { this.renderTable() }
                </div>
            </div>
        );
    }
}

Judges.displayName = "AdminPanel_Management_Judges";
