import { _ } from "l10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { Loader } from "ui/components";

import Row from "./Row";
import CreationRow from "./CreationRow";

export default class Participants extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
            disciplineId: PT.number.isRequired,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            discipline: null,
        };
    }
    componentWillMount() {
        this.setupStorage();
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData);
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage);
        this.loadData();
    }
    componentWillReceiveProps(next_props) {
        if (this.props.disciplineId !== next_props.disciplineId) {
            this.setState({
                discipline: null,
            });
            this.freeStorage(this.props.disciplineId);
            this.setupStorage(next_props.disciplineId);
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.disciplineId !== this.props.disciplineId) {
            this.loadData();
        }
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        this.freeStorage();
    }

    get SCHEMA() {
        return {
            participants: {
                club: {},
                programs: {},
            },
        };
    }

    setupStorage(discipline_id=null) {
        if (discipline_id === null) {
            discipline_id = this.props.disciplineId;
        }
        this.storage = storage.getDomain(`participants_${discipline_id}`);
    }
    freeStorage(discipline_id=null) {
        if (discipline_id === null) {
            discipline_id = this.props.disciplineId;
        }
        storage.delDomain(`participants_${discipline_id}`);
    }

    reloadFromStorage = () => {
        const serialized = this.storage.get("Discipline")
            .by_id(this.props.disciplineId)
            .serialize(this.SCHEMA);
        this.setState({
            discipline: serialized,
        });
    }
    loadData = () => {
        Api("discipline.get", {
            discipline_id: this.props.disciplineId,
            children: this.SCHEMA,
        })
            .addToDB("Discipline", this.props.disciplineId, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
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
            <div className="manage-participants">
                <table className="table table-striped">
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
                <div className="total-participants">
                    { _("admin.phrases.total_n_participants", this.state.discipline.participants.length) }
                </div>
            </div>
        );
    }
    render() {
        if (this.state.discipline === null) {
            return (
                <Loader />
            );
        }
        return (
            <div className="app-content">
                <header className="app-header">
                    <h1>
                        { this.state.discipline.name }
                    </h1>
                    <h2>
                        { _("admin.headers.participants_management") }
                    </h2>
                </header>
                <div className="app-body">
                    { this.renderTable() }
                </div>
            </div>
        );
    }
}

Participants.displayName = "AdminPanel_Management_Participants";
