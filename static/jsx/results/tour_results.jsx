class TourResults extends React.Component {

    // Initialization

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
            results: null,
            verbose: false,
        }
        message_dispatcher.addListener("tour_results_changed reload_data", function(message) {
            if (!message || message.tour_id == this.props.tour_id) {
                this.loadData();
            }
        }.bind(this));
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
        this.loadData();
    }
    reloadFromStorage() {
        let serialized = storage.get("Tour")
            .by_id(this.props.tour_id)
            .serialize(this.TOUR_SCHEMA);
        this.setState({
            tour: serialized,
        });
    }
    loadData() {
        Api("tour.get_results", {tour_id: this.props.tour_id}).onSuccess(function(new_results) {
            this.setState({
                "results": new_results,
            });
        }.bind(this)).send();
        Api("tour.get", { tour_id: this.props.tour_id, children: this.TOUR_SCHEMA})
            .updateDB("Tour", this.props.tour_id)
            .onSuccess(this.reloadFromStorage.bind(this))
            .send();
    }

    // Control

    toggleVerbose() {
        this.setState({
            verbose: !this.state.verbose,
        });
    }

    // Rendering

    renderVerboseButton() {
        if (this.state.verbose) {
            return <button className="btn btn-primary" onClick={ this.toggleVerbose.bind(this) }>{ _("results.buttons.simple_view") }</button>
        } else {
            return <button className="btn btn-primary" onClick={ this.toggleVerbose.bind(this) }>{ _("results.buttons.verbose_view") }</button>
        }
    }
    renderNonFinalizedWarning() {
        if (!this.state.tour.finalized) {
            return <div className="alert alert-danger">{ _("results.alerts.not_finalized") }</div>
        }
    }
    render() {
        if (this.state.tour === null || this.state.results === null) {
            return <span>Loading ...</span>
        }
        var table = null;
        if (this.state.verbose) {
            table = <TourResultsVerboseTable {...this.state} />
        } else {
            table = <TourResultsTable {...this.state} />
        }
        return <div>
            <header>
                <div className="controls">
                    { this.renderVerboseButton() }
                    <button className="btn btn-primary" onClick={ this.createDocx.bind(this) }>{ _("admin.buttons.docx_results") }</button>
                    <button className="btn btn-primary" onClick={ (() => this.refs.heats.createDocx()).bind(this) }>
                        { _("admin.buttons.docx_heats") }
                    </button>
                </div>
                <h1>{ this.state.tour.discipline.name }</h1>
                <h2>{ this.state.tour.name }</h2>
            </header>
            <div className="tour-results" ref="content">
                { this.renderNonFinalizedWarning() }
                { table }
            </div>
            <HeatsTable
                ref="heats"
                name={ this.state.tour.name }
                discipline={ this.state.tour.discipline }
                runs={ this.state.tour.runs } />
        </div>
    }
    createDocx() {
        Docx("tour-results")
            .setHeader(this.state.tour.discipline.competition.name + ", " + this.state.tour.discipline.competition.date)
            .setTitle1(_("admin.headers.tour_results"))
            .setTitle2(this.state.tour.discipline.name)
            .setTitle3(this.state.tour.name)
            .setBody(ReactDOM.findDOMNode(this.refs.content).innerHTML)
            .addStyle(".bordered-table", "font-size", this.state.verbose ? "9pt" : "12pt")
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
