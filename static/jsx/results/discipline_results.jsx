class DisciplineResults extends React.Component {

    // Initialization

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
        };
        this.runs_loaded = false;
        message_dispatcher.addListener("db_update", this.reloadState.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        message_dispatcher.addListener("tour_results_changed", function(data) {
            let tour_storage = storage.get("Tour").by_id(data["tour_id"]);
            if (!tour_storage) {
                return;
            }
            if (tour_storage.discipline.id == this.props.discipline_id) {
                this.loadResults();
            }
        }.bind(this));
        this.loadData();
    }
    reloadState() {
        if (!this.state.discipline_results) {
            return;
        }
        if (!this.runs_loaded) {
            return;
        }
        let storage_runs = storage.get("Run")
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
            discipline: storage.get("Discipline").by_id(this.props.discipline_id).serialize({}),
        });
    }
    loadResults() {
        Api("tournaments.discipline.get_results", {
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
        Api("tournaments.discipline.get", {
            discipline_id: this.props.discipline_id,
            children: {
                tours: {
                    runs: {
                        participant: {
                            sportsmen: {},
                            club: {},
                        },
                    }
                }
            }
        })
        .updateDB("Discipline", this.props.discipline_id)
        .onSuccess(function() {
            this.runs_loaded = true;
            this.reloadState(this)
        }.bind(this))
        .send();
        this.loadResults();
    }
    render() {
        if (!this.state.loaded) {
            return <span>Loading...</span>;
        }
        if (this.props.table_only) {
            return <DisciplineResultsTable table={ this.state.table } />
        }
        return <div>
            <header>
                <div className="controls">
                    <button className="btn btn-primary" onClick={ this.createDocx.bind(this) }>DOCX</button>
                </div>
                <h1>{ this.state.discipline.name }</h1>
            </header>
            <DisciplineResultsTable table={ this.state.table } ref="main_table" />
        </div>
    }
    createDocx() {
        Docx("discipline-results")
            .setHeader(this.state.discipline.name)
            .setSubheader(_("admin.headers.discipline_results"))
            .setBody(React.findDOMNode(this.refs.main_table).innerHTML)
            .addStyle(".tour-name", "background", "#ccc")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "border", "none")
            .addStyle(".bordered-table .sportsmen td, .bordered-table .sportsmen th", "padding", "0")
            .addStyle(".sportsmen", "width", "100%")
            .save();
    }
}
