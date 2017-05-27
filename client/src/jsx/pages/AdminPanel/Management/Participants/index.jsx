import _ from "l10n";
import LoadingComponent from "common/server/LoadingComponent";
import Loader from "common/components/Loader";

import Row from "./Row";
import CreationRow from "./CreationRow";

export default class Participants extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
            disciplineId: PT.number.isRequired,
        };
    }

    CLASS_ID = "participants";
    API_MODELS = {
        discipline: {
            model_type: "Discipline",
            model_id_getter: props => props.disciplineId,
            schema: {
                participants: {
                    club: {},
                    programs: {},
                },
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            discipline: null,
        };
    }

    renderTable() {
        let rows = this.state.discipline.participants.map((participant) =>
            <Row
                competition={ this.props.competition }
                key={ participant.id }
                participant={ participant }
            />
        );
        return (
            <table>
                <tbody>
                    <tr>
                        <th className="number">
                            { _("models.participant.number") }
                        </th>
                        <th className="name">
                            { _("models.participant.name") }
                        </th>
                        <th className="club-name">
                            { _("models.participant.club_name") }
                        </th>
                        <th className="club-city">
                            { _("models.participant.club_city") }
                        </th>
                        <th className="delete" />
                    </tr>
                    { rows }
                    <CreationRow
                        competition={ this.props.competition }
                        discipline={ this.state.discipline }
                    />
                </tbody>
            </table>
        );
    }
    render() {
        if (this.state.discipline === null) {
            return (
                <Loader />
            );
        }
        return (
            <div className="Participants">
                <header>
                    <h1>
                        { this.state.discipline.name }
                    </h1>
                    <h2>
                        { _("admin.headers.participants_management") }
                    </h2>
                </header>
                <div className="body">
                    { this.renderTable() }
                    <div className="total-participants">
                        { _("admin.phrases.total_n_participants", this.state.discipline.participants.length) }
                    </div>
                </div>
            </div>
        );
    }
}

Participants.displayName = "AdminPanel_Management_Participants";
