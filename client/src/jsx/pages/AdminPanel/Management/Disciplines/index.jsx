import _ from "l10n";

import Row from "./Row";
import CreationRow from "./CreationRow";

export default class Disciplines extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                disciplines: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                    }).isRequired
                ).isRequired,
                judges: PT.arrayOf(PT.object.isRequired).isRequired,
            }).isRequired,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
        }
    }
    renderTable() {
        const rows = this.props.competition.disciplines.map(discipline =>
            <Row
                discipline={ discipline }
                judges={ this.props.competition.judges }
                key={ discipline.id }
            />
        );
        return (
            <table>
                <tbody>
                    <tr>
                        <th className="name">
                            { _("models.discipline.name") }
                        </th>
                        <th className="sp">
                            { _("models.discipline.sp") }
                        </th>
                        <th className="external-id">
                            { _("models.discipline.external_id") }
                        </th>
                        <th className="delete" />
                    </tr>
                    { rows }
                    <CreationRow
                        competition={ this.props.competition }
                        judges={ this.props.competition.judges }
                    />
                </tbody>
            </table>
        );
    }
    render() {
        return (
            <div className="Disciplines">
                <header>
                    <h1>
                        { _("admin.headers.disciplines_management") }
                    </h1>
                </header>
                <div className="body">
                    { this.renderTable() }
                </div>
            </div>
        );
    }
}

Disciplines.displayName = "AdminPanel_Management_Disciplines";
