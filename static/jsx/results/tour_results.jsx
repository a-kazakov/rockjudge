class TourResults extends React.Component {

    // Initialization

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            results: [],
            finalized: true,
            judges: [],
            verbose: false,
        }
        message_dispatcher.addListener("tour_results_changed reload_data", function(message) {
            if (message.tour_id == this.props.tour_id) {
                this.loadData();
            }
        }.bind(this));
        this.loadData();
    }
    loadData() {
        Api("tournaments.tour.get_results", {tour_id: this.props.tour_id}).onSuccess(function(new_results) {
            this.setState(new_results);
        }.bind(this)).send();
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
        if (!this.state.finalized) {
            return <div className="alert alert-danger">{ _("results.alerts.not_finalized") }</div>
        }
    }
    render() {
        var active_judges = this.state.judges.filter(function(judge) {
            return judge.role !== "" && judge.role != "tech_judge"; // TODO: move this to scoring system
        });
        var table = null;
        if (this.state.verbose) {
            table = <TourResultsVerboseTable
                judges={ active_judges }
                data={ this.state.results }
                has_next_tour={ this.state.next_tour_id != null }
                scoring_system={ this.state.scoring_system } />
        } else {
            table = <TourResultsTable
                data={ this.state.results }
                has_next_tour={ this.state.next_tour_id != null } />
        }
        return <div>
            <header>
                <div className="controls">
                    { this.renderVerboseButton() }
                    <button className="btn btn-primary" onClick={ this.createDocx.bind(this) }>DOCX</button>
                </div>
                <h1>{ this.state.discipline_name }</h1>
                <h2>{ this.state.name }</h2>
            </header>
            <div className="tour-results" ref="content">
                { this.renderNonFinalizedWarning() }
                { table }
            </div>
        </div>
    }
    createDocx() {
        Docx("tour-results")
            .setOrientation(this.state.verbose ? "landscape" : "portrait")
            .setHeader(this.state.discipline_name)
            .setSubheader(this.state.name)
            .setBody(React.findDOMNode(this.refs.content).innerHTML)
            .addStyle(".bordered-table .score-breakdown td, .bordered-table .score-breakdown th", "border", "none")
            .addStyle(".bordered-table .score-breakdown th", "padding", "0 1pt 0 0")
            .addStyle(".bordered-table .score-breakdown td", "padding", "0 0 0 1pt")
            .addStyle(".score-breakdown th", "text-align", "right")
            .addStyle(".score-breakdown td", "text-align", "left")
            .addStyle(".score-breakdown td", "text-align", "left")
            .addStyle(".score-breakdown", "width", "50pt")
            .addStyle(".total-score", "font-weight", "bold")
            .save();
    }
}
