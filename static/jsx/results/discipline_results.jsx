class DisciplineResultsButtons extends React.Component {
    signal(message) {
        return (() => {console.log(message); this.props.onSignal(message)}).bind(this);
    }
    render() {
        return <div>
            <button className="btn btn-primary" onClick={ this.signal("docx") }>
                DOCX
            </button>
        </div>
    }
}

class DisciplineResults extends React.Component {

    // Initialization

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
        this.runs_loaded = false;
    }
    componentWillMount() {
        this.storage = storage.getDomain("discipline_results_" + this.props.tour_id);
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadState.bind(this));
        this.results_change_listener = message_dispatcher.addListener("tour_results_changed reload_data", function(message) {
            if (!message) {
                this.loadResults();
                return;
            }
            let tour_storage = this.storage.get("Tour").by_id(message["tour_id"]);
            if (!tour_storage) {
                return;
            }
            if (tour_storage.discipline.id == this.props.discipline_id) {
                this.loadResults();
            }
        }.bind(this));
        this.loadData();
        this.loadResults();
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        message_dispatcher.removeListener(this.results_change_listener);
        storage.delDomain("discipline_results_" + this.props.tour_id);
    }
    reloadState() {
        if (!this.state.discipline_results) {
            return;
        }
        if (!this.runs_loaded) {
            return;
        }
        let storage_runs = this.storage.get("Run")
        let results = this.state.discipline_results;
        let new_state = []
        var SCHEMA = {
            tour: {},
            participant: {
                sportsmen: {},
                club: {},
            },
        }
        for (var i = 0; i < results.length; ++i) {
            new_state.push({
                place: results[i].place,
                run: storage_runs.by_id(results[i].run_id).serialize(SCHEMA),
            });
        }
        this.setState({
            loaded: true,
            table: new_state,
            discipline: this.storage.get("Discipline").by_id(this.props.discipline_id).serialize({
                competition: {},
            }),
        });
    }
    loadResults() {
        Api("discipline.get_results", {
            discipline_id: this.props.discipline_id,
        })
        .onSuccess(function(response) {
            this.setState({
                discipline_results: response,
            });
            this.reloadState();
        }.bind(this))
        .send();
    }
    loadData() {
        Api("discipline.get", {
            discipline_id: this.props.discipline_id,
            children: {
                competition: {},
                tours: {
                    runs: {
                        participant: {
                            club: {},
                        },
                    }
                }
            }
        })
        .addToDB("Discipline", this.props.discipline_id, this.storage)
        .onSuccess(function() {
            this.runs_loaded = true;
            this.reloadState(this)
        }.bind(this))
        .send();
    }

    // Listeners

    onSignal(message) {
        switch (message) {
        case "docx":
            this.createDocx();
            break;
        default:
            console.log("Unknown message:", message)
        }
    }

    // Rendering

    render() {
        if (!this.state.loaded) {
            return <span>Loading...</span>;
        }
        return <div className="discipline-results">
            <DisciplineResultsTable table={ this.state.table } ref="main_table" />
        </div>
    }
    createDocx() {
        Docx("discipline-results")
            .setHeader(this.state.discipline.competition.name + ", " + this.state.discipline.competition.date)
            .setTitle1(_("admin.headers.discipline_results"))
            .setTitle3(this.state.discipline.name)
            .setBody(ReactDOM.findDOMNode(this.refs.main_table).innerHTML)
            .addStyle(".tour-name", "background", "#ddd")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0")
            .addStyle(".sportsmen", "width", "100%")
            .save();
    }
}
