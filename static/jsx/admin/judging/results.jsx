class TourResultsButtons extends React.Component {
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

class TourResultsBody extends React.Component {

    // Initialization

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
            results: null,
        }
        this.TOUR_SCHEMA = {
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
    componentWillMount() {
        this.storage = storage.getDomain("results_" + this.props.tour_id);
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.results_change_listener = message_dispatcher.addListener("tour_results_changed reload_data", function(message) {
            if (!message || message.tour_id == this.props.tour_id) {
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
        storage.delDomain("results_" + this.props.tour_id);
    }
    reloadFromStorage() {
        let serialized = this.storage.get("Tour")
            .by_id(this.props.tour_id)
            .serialize(this.TOUR_SCHEMA);
        this.setState({
            tour: serialized,
        });
    }
    loadResults() {
        Api("tour.get_results", {tour_id: this.props.tour_id})
        .onSuccess(function(new_results) {
            this.setState({
                "results": new_results,
            });
            this.reloadFromStorage();
        }.bind(this))
        .send();
    }
    loadData() {
        Api("tour.get", { tour_id: this.props.tour_id, children: this.TOUR_SCHEMA})
            .addToDB("Tour", this.props.tour_id, this.storage)
            .onSuccess(this.reloadFromStorage.bind(this))
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

    renderNonFinalizedWarning() {
        if (!this.state.tour.finalized) {
            return <div className="alert alert-danger">{ _("results.alerts.not_finalized") }</div>
        }
    }
    render() {
        if (this.state.tour === null || this.state.results === null) {
            return <Loader />
        }
        var table = null;
        if (this.props.verbosity == "3") {
            table = <TourResultsVerboseTable {...this.state} />
        } else if (this.props.verbosity == "2") {
            table = <TourSemiVerboseResultsTable {...this.state} />
        } else {
            table = <TourResultsTable {...this.state} />
        }
        return <div className="tour-results" ref="content">
            { this.renderNonFinalizedWarning() }
            { table }
        </div>
    }
    createDocx() {
        Docx("tour-results")
            .setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date)
            .setTitle1(_("admin.headers.tour_results"))
            .setTitle2(this.state.tour.discipline.name)
            .setTitle3(this.state.tour.name)
            .setBody(ReactDOM.findDOMNode(this.refs.content).innerHTML)
            .addStyle(".bordered-table", "font-size", this.props.verbosity == "1" ? "12pt" : "9pt")
            .addStyle(".bordered-table .acro-table td", "font-size", "9pt")
            .addStyle(".bordered-table .acro-table td", "padding", "0 3pt")
            .addStyle(".bordered-table .acro-table td", "border", "0.5pt solid black")
            .addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "font-size", "9pt")
            .addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "border", "none")
            .addStyle(".bordered-table .score-breakdown th", "padding", "0 1pt 0 0")
            .addStyle(".bordered-table .score-breakdown td", "padding", "0 0 0 1pt")
            .addStyle(".score-breakdown th", "text-align", "right")
            .addStyle(".score-breakdown td", "text-align", "left")
            .addStyle(".score-breakdown td", "text-align", "left")
            .addStyle(".score-breakdown", "width", "50pt")
            .addStyle(".total-score", "font-weight", "bold")
            .addStyle(".advances-header", "background-color", "#ddd")
            .addStyle(".head_judge", "width", "5%")
            .addStyle(".dance_judge", "width", "8%")
            .addStyle(".acro_judge", "width", "8%")
            .save();
    }
}
