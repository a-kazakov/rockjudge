class TourResults extends React.Component {

    // Initialization

    constructor(props) {
        super(props);
        this.state={
            name: "",
            results: [],
            finalized: true,
        }
        window.message_dispatcher.addListener("tour_update tour_full_update score_update")
            .setCallback(this.loadData.bind(this));
            // TODO: add filter
        this.loadData();
    }
    loadData() {
        (new Api("tournaments.tour.get_results", {tour_id: this.props.tour_id})).onSuccess(function(new_results) {
            this.setState(new_results);
        }.bind(this)).send();
    }

    // Rendering

    renderNonFinalizedWarning() {
        if (!this.state.finalized) {
            return <div className="alert alert-danger">These results are not yet finalized!</div>
        }
    }
    render() {
        return <div>
            <header>
                <div className="controls">
                    <button className="btn btn-primary" onClick={ function() { window.print(); } }>Print</button>
                </div>
                <h1>{ this.state.inner_competition_name }</h1>
                <h2>{ this.state.name }</h2>
            </header>
            <div className="tour-results">
                { this.renderNonFinalizedWarning() }
                <TourResultsTable
                    data={ this.state.results }
                    has_next_tour={ this.state.next_tour_id != null } />
            </div>
        </div>
    }
}
