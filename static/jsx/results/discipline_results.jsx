class DisciplineResultsButtons extends React.Component {
    signal(message) {
        return (() => this.props.onSignal(message)).bind(this);
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
        this.storage = storage.getDomain("discipline_results_" + this.props.discipline_id);
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
        if (this.props.autoDocx) {
            let interval_id = setInterval(() => {
                if (this.refs.main_table) {
                    clearInterval(interval_id);
                    this.createDocx(this.props.autoDocx.filename);
                    this.props.autoDocx.callback(this.props.autoDocx.filename);
                }
            }, 500);
        }
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        message_dispatcher.removeListener(this.results_change_listener);
        storage.delDomain("discipline_results_" + this.props.discipline_id);
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
        for (let i = 0; i < results.length; ++i) {
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
        .onSuccess(response => {
            this.setState({
                discipline_results: response,
            });
            this.reloadState();
        })
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
        .onSuccess(() => {
            this.runs_loaded = true;
            this.reloadState(this)
        })
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

    renderBody() {
        switch (this.props.renderer) {
        case "presenter":
            return <DisciplineResultsPresenterTable table={ this.state.table } ref="main_table" />
        case "screen_operator":
            return <DisciplineResultsScreenOperatorTable
                table={ this.state.table }
                selectedPlace={ this.props.selectedPlace }
                onPlaceSelect={ this.props.onPlaceSelect }
                ref="main_table" />
        case "page":
            return <Printable
                ref="printable"
                header={ this.state.discipline.competition.name + ", " + this.state.discipline.competition.date }
                title1={ _("admin.headers.discipline_results") }
                title3={ this.state.discipline.name }
                body={ <DisciplineResultsTable table={ this.state.table } /> } />
        case "table":
            return <DisciplineResultsTable table={ this.state.table } ref="main_table" />
        default:
        }
    }

    render() {
        if (!this.state.loaded) {
            return <div className="discipline-results"><Loader /></div>
        }
        return <div className="discipline-results">
            { this.renderBody() }
        </div>
    }
    createDocx(filename="discipline-results.docx") {
        Docx(filename)
            .setHeader(this.state.discipline.competition.name + ", " + this.state.discipline.competition.date)
            .setTitle1(_("admin.headers.discipline_results"))
            .setTitle3(this.state.discipline.name)
            .setBody(this.refs.printable.fetchPrintableData())
            .addStyle(".tour-name", "background", "#ddd")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0")
            .addStyle(".sportsmen", "width", "100%")
            .save();
    }
}
