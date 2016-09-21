import _ from "l10n";
import message_dispatcher from "common/server/message_dispatcher";
import storage from "common/server/storage";
import Api from "common/server/Api";
import Loader from "common/components/Loader";

export default class TourResultsLoader extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tourId: PT.number.isRequired,
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
            tour: null,
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
        if (this.props.tourId !== next_props.tourId) {
            this.setState({
                tour: null,
                results: null,
            });
            this.freeStorage(this.props.tourId);
            this.setupStorage(next_props.tourId);
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.tourId !== this.props.tourId) {
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
            discipline: {
                competition: {},
                discipline_judges: {
                    judge: {},
                },
            },
            runs: {
                acrobatics: {},
                scores: {},
                participant: {
                    club: {},
                },
            },
        };
    }

    setupStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tourId;
        }
        this.storage = storage.getDomain(`tour_results_${tour_id}`);
    }
    freeStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tourId;
        }
        storage.delDomain(`tour_results_${tour_id}`);
    }

    makeRendererRef = (ref) => this._renderer = ref;

    handleTourResultsChanged = (message) => {
        if (!message) {
            this.loadResults();
            return;
        }
        let tour_storage = this.storage.get("Tour").by_id(message["tour_id"]);
        if (!tour_storage) {
            return;
        }
        if (tour_storage.id === this.props.tourId) {
            this.loadResults();
        }
    }

    getMergedResults() {
        if (this.state.results === null || this.state.tour === null) {
            return null;
        }
        // Build runs index
        let runs_index = new Map();
        for (const run of this.state.tour.runs) {
            runs_index.set(run.id, run);
        }
        // Merge results
        const result = this.state.results.map(row => ({
            place: row.place,
            advances: row.advances,
            additional_data: row.additional_data,
            run: runs_index.get(row.run_id),
        }));
        return result;
    }

    loadResults = () => {
        Api("tour.get_results", {
            tour_id: this.props.tourId,
        })
        .onSuccess(response => {
            this.setState({
                results: response,
            });
        })
        .send();
    }
    loadData = () => {
        Api("tour.get", {
            tour_id: this.props.tourId,
            children: this.SCHEMA,
        })
            .addToDB("Tour", this.props.tourId, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }
    reloadFromStorage = () => {
        const serialized = this.storage.get("Tour")
            .by_id(this.props.tourId)
            .serialize(this.SCHEMA);
        this.setState({
            tour: serialized,
        });
    }

    // Listeners

    handleSignal = (message) => {
        if (this._renderer) {
            this._renderer.handleSignal(message);
        }
    }

    // Rendering

    renderNonFinalizedWarning() {
        if (!this.state.tour.finalized) {
            return null;
        }
        return (
            <div className="alert alert-danger">
                { _("results.alerts.not_finalized") }
            </div>
        );
    }
    renderBody(table) {
        const { tourId, renderer, ...other_props} = this.props; // eslint-disable-line no-unused-vars
        const RenderingComponent = renderer;
        return (
            <RenderingComponent
                ref={ this.makeRendererRef }
                table={ table }
                tour={ this.state.tour }
                { ...other_props }
            />
        )
    }
    render() {  // eslint-disable-line react/sort-comp
        const table = this.getMergedResults();
        if (table === null) {
            return (
                <div className="tour-results">
                    { this.props.showLoader ? <Loader /> : null }
                </div>
            );
        }
        return (
            <div className="tour-results">
                { this.renderNonFinalizedWarning }
                { this.renderBody(table) }
            </div>
        );
    }
}

TourResultsLoader.displayName = "common_TourResultsLoader";