import message_dispatcher from "common/server/message_dispatcher";
import storage from "common/server/storage";
import Api from "common/server/Api";
import Loader from "common/components/Loader";

export default class DisciplineResultsLoader extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineId: PT.number.isRequired,
            renderer: PT.func.isRequired,
            showLoader: PT.bool.isRequired,
        };
    }
    static get defaultProps() {
        return {
            showLoader: true,
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            discipline: null,
            results: null,
        };
    }

    componentWillMount() {
        this.setupStorage();
        this.reload_listener = message_dispatcher.addListener("reload_data", () => {
            this.loadData();
            this.loadResults();
        });
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage);
        this.results_change_listener = message_dispatcher.addListener(
            "tour_results_changed reload_data",
            this.handleTourResultsChanged
        );
        this.loadData();
        this.loadResults();
    }
    componentWillReceiveProps(next_props) {
        if (this.props.disciplineId !== next_props.disciplineId) {
            this.setState({
                discipline: null,
                results: null,
            });
            this.freeStorage(this.props.disciplineId);
            this.setupStorage(next_props.disciplineId);
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.disciplineId !== this.props.disciplineId) {
            this.loadData();
            this.loadResults();
        }
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        message_dispatcher.removeListener(this.results_change_listener);
        this.freeStorage();
    }

    get SCHEMA() {
        return {
            competition: {},
            tours: {
                discipline: {},
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
        this.storage = storage.getDomain(`discipline_results_${discipline_id}`);
    }
    freeStorage(discipline_id=null) {
        if (discipline_id === null) {
            discipline_id = this.props.disciplineId;
        }
        storage.delDomain(`discipline_results_${discipline_id}`);
    }

    makeRendererRef = (ref) => this._renderer = ref;

    handleTourResultsChanged = (message) => {
        if (!message) {
            this.loadResults();
            return;
        }
        const tour_storage = this.storage.get("Tour").by_id(message["tour_id"]);
        const tour = tour_storage.serialize({
            discipline: {},
        });
        if (tour === null) { // Fake model
            return;
        }
        if (tour.discipline.id === this.props.disciplineId) {
            this.loadResults();
        }
    }

    getMergedResults() {
        if (this.state.results === null || this.state.discipline === null) {
            return null;
        }
        // Build runs index
        let runs_index = new Map();
        for (const tour of this.state.discipline.tours) {
            for (const run of tour.runs) {
                runs_index.set(run.id, { tour, run });
            }
        }
        // Merge results
        const result = this.state.results.map(row => ({
            place: row.place,
            tour: runs_index.get(row.run_id).tour,
            run: runs_index.get(row.run_id).run,
        }));
        return result;
    }

    loadResults = () => {
        Api("discipline.get_results", {
            discipline_id: this.props.disciplineId,
        })
        .onSuccess(response => {
            this.setState({
                results: response,
            });
        })
        .send();
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
    reloadFromStorage = () => {
        const serialized = this.storage.get("Discipline")
            .by_id(this.props.disciplineId)
            .serialize(this.SCHEMA);
        this.setState({
            discipline: serialized,
        });
    }

    // Listeners

    handleSignal = (message) => {
        if (this._renderer) {
            this._renderer.handleSignal(message);
        }
    }

    // Rendering

    renderBody(table) {
        const { disciplineId, renderer, ...other_props} = this.props; // eslint-disable-line no-unused-vars
        const RenderingComponent = renderer;
        return (
            <RenderingComponent
                discipline={ this.state.discipline }
                ref={ this.makeRendererRef }
                table={ table }
                { ...other_props }
            />
        )
    }
    render() {  // eslint-disable-line react/sort-comp
        const table = this.getMergedResults();
        if (table === null) {
            return (
                <div className="discipline-results">
                    { this.props.showLoader ? <Loader /> : null }
                </div>
            );
        }
        return (
            <div className="discipline-results">
                { this.renderBody(table) }
            </div>
        );
    }
}

DisciplineResultsLoader.displayName = "common_DisciplineResultsLoader";
