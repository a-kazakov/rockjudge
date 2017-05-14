import Api from "common/server/Api";
import Loader from "common/components/Loader";

import storage from "common/server/storage";
import websocket from "common/server/websocket";

import Renderer from "./Renderer";

export default class DisciplineResultsTab extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            autoDocx: PT.object,
            discipline: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
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
        this.reload_listener = websocket.addListener("reload_data", this.loadData);
        this.db_update_listener = websocket.addListener("db_update", this.reloadFromStorage);
        this.loadData();
    }
    componentWillReceiveProps(next_props) {
        if (this.props.discipline.id !== next_props.discipline.id) {
            this.setState({
                discipline: null,
            });
            this.freeStorage(this.props.discipline.id);
            this.setupStorage(next_props.discipline.id);
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.discipline.id !== this.props.discipline.id) {
            this.loadData();
        }
    }
    componentWillUnmount() {
        websocket.removeListener(this.reload_listener);
        websocket.removeListener(this.db_update_listener);
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
            discipline_id = this.props.discipline.id;
        }
        this.storage = storage.getDomain(`juding_scores_${discipline_id}`);
    }
    freeStorage(discipline_id=null) {
        if (discipline_id === null) {
            discipline_id = this.props.discipline.id;
        }
        storage.delDomain(`juding_scores_${discipline_id}`);
    }

    reloadFromStorage = () => {
        const serialized = this.storage.get("Discipline")
            .by_id(this.props.discipline.id)
            .serialize(this.SCHEMA);
        this.setState({
            discipline: serialized,
        });
    }
    loadData = () => {
        Api("discipline.get", {
            discipline_id: this.props.discipline.id,
            children: this.SCHEMA,
        })
            .addToDB("Discipline", this.props.discipline.id, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }

    makeResultsRef = (ref) => this._results = ref;

    handleSignal = (message) => {
        this._results.handleSignal(message);
    }

    // Rendering

    render() {
        if (this.state.discipline === null) {
            return (
                <Loader />
            );
        }
        return (
            <div className="DisciplineResultsTab rules-set">
                <Renderer
                    autoDocx={ this.props.autoDocx }
                    discipline={ this.state.discipline }
                    ref={ this.makeResultsRef }
                />
            </div>
        );
    }
}


DisciplineResultsTab.displayName = "AdminPanel_Judging_DisciplinePanel_DisciplineResultsTab";
