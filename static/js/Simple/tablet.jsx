class JudgeTablet extends React.Component {

    // Intiialization

    constructor(props) {
        super(props);
        this.state = {
            "status": "HOLD",
            "next_state": null,
            "runs": [],
        };
        this.state.next_state = null;
        window.message_dispatcher.subscribe("run_update", this.dispatchRunUpdate.bind(this));
        window.message_dispatcher.subscribe("current_heat_update", this.dispatchCurrentHeatUpdate.bind(this));
        this.loadData();
    }
    loadData() {
        Api.get_tablet_state(this.props.judge_id, function(state) {
            this.setState(state);
        }.bind(this));
    }

    // Dispatchers

    dispatchRunUpdate(run_id, new_run) {
        var new_runs = this.state.runs.map(function(run) {
            if (run_id != run.id) {
                return run;
            }
            return new_run;
        });
        this.setState({
            runs: new_runs,
        });
    }
    dispatchCurrentHeatUpdate() {
        Api.get_tablet_state(this.props.judge_id, function(state) {
            if (this.state.status == "HOLD" || this.state.runs.length == 0) {
                this.setState(state);
            } else {
                this.setState({
                    next_state: state,
                });
            }
        }.bind(this));
    }

    // Listeners

    onScoreUpdate(run_id, new_score) {
        Api.set_judge_score(run_id, this.props.judge_id, new_score);
    }

    // Actions

    toNextState() {
        var new_state = this.state.next_state;
        new_state.next_state = null;
        this.setState(new_state);
    }

    // Rendering

    getScoringLayout() {
        console.log(this.state);
        switch (this.state.status) {
        case "HOLD":
            return <span>No active tour</span>;
        case "ACTIVE":
            return this.state.runs.map(function(run) {
                return <div>
                    <h2>{ run.participant.name }</h2>
                    <TabletScoreInput
                        key={ run.id }
                        score={ run.scores[this.props.judge_id] }
                        onScoreUpdate={ this.onScoreUpdate.bind(this, run.id) } />
                </div>
            }.bind(this));
        }
    }
    getSubmitButton() {
        if (this.state.next_state !== null) {
            return <button onClick={ this.toNextState.bind(this) }>To next heat ...</button>
        }
    }
    render() {
        return <div>
            { this.getScoringLayout() }
            { this.getSubmitButton() }
        </div>
    }
}
