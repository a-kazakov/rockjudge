import { Api, storage, message_dispatcher, makeDisciplineResultsTable } from "HostModules";

export default class Renderer extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineId: PT.number.isRequired,
            position: PT.number,
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
            results: {},
            competition: {},
            discipline_judges: {
                judge: {},
            },
            tours: {
                runs: {
                    participant: {
                        club: {},
                    },
                },
            },
        };
    }

    setupStorage(discipline_id=null) {
        if (discipline_id === null) {
            discipline_id = this.props.disciplineId;
        }
        this.storage = storage.getDomain(`juding_scores_${discipline_id}`);
    }
    freeStorage(discipline_id=null) {
        if (discipline_id === null) {
            discipline_id = this.props.disciplineId;
        }
        storage.delDomain(`juding_scores_${discipline_id}`);
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

    renderEmpty() {
        return (
            <div className="Awarding">
                <div className="discipline-name">
                    { this.state.discipline.name }
                </div>
            </div>
        );
    }
    renderPlace(row) {
        if (row.place === null) {
            return null;
        }
        return (
            <div className="place">
                { `${row.place} место` }
            </div>
        );
    }
    render() {
        if (this.state.discipline === null) {
            return null;
        }
        const table = makeDisciplineResultsTable(this.state.discipline)
        const row = table[this.props.position];
        if (!row) {
            return this.renderEmpty();
        }
        return (
            <div className="Awarding">
                <div className="discipline-name">
                    { this.state.discipline.name }
                </div>
                { this.renderPlace(row) }
                <div className="participant-name">
                    { row.run.participant.name }
                </div>
                <div className="participant-club">
                    { row.run.participant.club.name }
                </div>
            </div>
        );
    }
}

Renderer.displayName = "Awarding_Renderer";
