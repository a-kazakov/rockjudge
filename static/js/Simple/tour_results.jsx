class TourResults extends React.Component {

    // Initialization

    constructor(props) {
        super(props);
        this.state={
            name: "",
            results: [],
            finalized: true,
        }
        window.message_dispatcher.subscribe("tour_results_update", this.dispatchTourResultsUpdate.bind(this));
        this.loadData();
    }
    loadData() {
        Api.get_tour_results(this.props.tour_id, function(new_results) {
            this.setState(new_results);
        }.bind(this));
    }

    // Dispatchers

    dispatchTourResultsUpdate(tour_id, new_results) {
        if (tour_id != this.props.tour_id) {
            return;
        }
        this.setState(new_results);
    }

    // Rendering

    renderNonFinalizedWarning() {
        if (!this.state.finalized) {
            return <div className="non-finalized-warning">These results are not yet finalized!</div>
        }
    }
    render() {
        return <div>
            <header>
                <div className="controls">
                    <button onClick={ function() { window.print(); } }>Print</button>
                </div>
                <h1>{ this.state.inner_competition_name }</h1>
                <h2>{ this.state.name }</h2>
            </header>
            <div className="tour-results">
                { this.renderNonFinalizedWarning() }
                <TourTable
                    data={ this.state.results }
                    has_next_tour={ this.state.next_tour_id != null } />
            </div>
        </div>
    }
}
