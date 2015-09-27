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
            return <h2>This results are not yet finalized!</h2>
        }
    }
    render() {
        return <div>
            <h1>{ this.state.name } results</h1>
            { this.renderNonFinalizedWarning() }
            <TourTable
                data={ this.state.results }
                has_next_tour={ this.state.next_tour != null } />
        </div>
    }
}
