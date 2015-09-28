class JudgeTablet extends React.Component {

    // Intiialization

    constructor(props) {
        super(props);
        this.state = {
            tour_id: null,
            judge: null,
            current_heat: 1,
        };
        this.state.next_state = null;
        window.message_dispatcher.subscribe("run_update", this.dispatchRunUpdate.bind(this));
        window.message_dispatcher.subscribe("active_tour_update", this.dispatchActiveTourUpdate.bind(this));
        this.loadData();
    }
    loadData() {
        Api.get_judge(this.props.judge_id, function(new_judge) {
            this.setState({
                judge: new_judge
            });
        }.bind(this));
        Api.get_active_tour(function(response) {
            this.dispatchActiveTourUpdate(response["tour_id"]);
        }.bind(this));
    }

    // Dispatchers

    dispatchRunUpdate(run_id, new_run) {
        var changed = false;
        var new_runs = this.state.tour.runs.map(function(run) {
            if (run_id != run.id) {
                changed = true;
                return run;
            }
            return new_run;
        });
        if (changed) {
            var new_tour = $.extend({}, this.state.tour);
            new_tour.runs = new_runs
            this.setState({
                tour: new_tour,
            });
        }
    }
    dispatchActiveTourUpdate(tour_id) {
        if (tour_id === null) {
            this.setState({
                tour_id: null,
                current_heat: 1,
            });
        }
        if (this.state.tour_id == tour_id) {
            return;
        }
        Api.get_tour(tour_id, function(new_tour) {
            this.setState({
                tour_id: tour_id,
                tour: new_tour,
            });
        }.bind(this));
    }

    // Listeners

    onScoreUpdate(run_id, new_score) {
        Api.set_judge_score(run_id, this.props.judge_id, new_score);
    }

    // Actions

    toPrevHeat() {
        this.setState({
            current_heat: this.state.current_heat - 1,
        });
    }

    toNextHeat() {
        this.setState({
            current_heat: this.state.current_heat + 1,
        });
    }

    // Rendering

    renderHeader() {
        return <header>
            <h1>{ this.state.judge.name }</h1>
        </header>
    }
    renderScoringLayout() {
        if (this.state.tour_id === null) {
            return <p>No active tour</p>;
        }
        return this.state.tour.runs
            .filter(function(run) {
                return run.heat == this.state.current_heat;
            }.bind(this))
            .map(function(run) {
                return <div>
                    <h2>{ run.participant.name }</h2>
                    <TabletScoreInput
                        key={ run.id }
                        score={ run.scores[this.props.judge_id] }
                        onScoreUpdate={ this.onScoreUpdate.bind(this, run.id) } />
                </div>
            }.bind(this));
    }
    renderCurrentHeatControl() {
        if (this.state.tour_id === null) {
            return <div></div>;
        }
        return <div>
            <button onClick={ this.toPrevHeat.bind(this) }>Prev heat</button>
            <button onClick={ this.toNextHeat.bind(this) }>Next heat</button>
            Current heat: { this.state.current_heat }
        </div>;
    }
    render() {
        if (this.state.judge === null) {
            return <p>Loading ...</p>;
        }
        return <div>
            { this.renderHeader() }
            { this.renderScoringLayout() }
            { this.renderCurrentHeatControl() }
        </div>
    }
}
