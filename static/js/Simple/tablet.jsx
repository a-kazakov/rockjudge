React.initializeTouchEvents(true);

class MusicSpeedChecker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            queue: [],
        };
    }
    now() {
        return (new Date()).getTime();
    }
    tick() {
        var new_queue = $.extend([], this.state.queue);
        new_queue.push(this.now());
        if (new_queue.length > 8) {
            new_queue.shift();
        }
        this.setState({
            queue: new_queue,
        });
    }
    getTempo() {
        var intervals = [];
        for (var i = 1; i < this.state.queue.length; ++i) {
            intervals.push(this.state.queue[i] - this.state.queue[i - 1]);
        }
        intervals.sort();
        return 60000 / intervals[Math.round(intervals.length / 2)];
    }
    getBtnText() {
        if (this.state.queue.length == 0) {
            return "Hit me following music tempo";
        }
        if (this.state.queue.length < 8) {
            return "Hit me following music tempo (" + (8 - this.state.queue.length).toString() + ")";
        }
        return this.getTempo().toFixed(1) + " bpm";
    }
    render() {
        return <div className="music-speed-checker">
            <h3>Music speed checker</h3>
            <button onTouchStart={ this.tick.bind(this) }>{ this.getBtnText() }</button>
        </div>
    }
}

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
        Api.get_judge(this.props.judge_id, function(response) {
            this.setState({
                judge: response
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

    // Helpers

    getHeatsCount() {
        return Math.max(...this.state.tour.runs.map(function(run) {
            return run.heat;
        }));
    }

    // Rendering

    renderHeader() {
        var btn_prev = null;
        var btn_next = null;
        if (this.state.tour_id !== null) {
            if (this.state.current_heat > 1) {
                btn_prev = <button className="btn-prev-heat" onClick={ this.toPrevHeat.bind(this) }>Previous heat</button>;
            }
            if (this.state.current_heat < this.getHeatsCount()) {
                btn_next = <button className="btn-next-heat" onClick={ this.toNextHeat.bind(this) }>Next heat</button>;
            }
        }
        var current_tour = (this.state.tour_id === null) ? null :
            <div className="header">
                <h1>{ this.state.tour.inner_competition_name }: { this.state.tour.name }</h1>
                <h2>Heat: { this.state.current_heat } / { this.getHeatsCount() }</h2>
            </div>
        return <header>
            { btn_prev }
            { btn_next }
            { current_tour }
        </header>
    }
    renderJudgeInfo() {
        return <div>
            <div className="judge-number">Judge { this.state.judge.number }</div>
            <div className="judge-name">{ this.state.judge.name }</div>
        </div>

    }
    renderFooter() {
        if (this.state.tour_id === null || this.state.judge.role == "line_judge") {
            return null;
        }
        return <MusicSpeedChecker />
    }
    renderScoringLayout() {
        if (this.state.tour_id === null) {
            return this.renderJudgeInfo();
        }
        var cells = this.state.tour.runs
            .filter(function(run) {
                return run.heat == this.state.current_heat;
            }.bind(this))
            .map(function(run) {
                return <td key={ run.id }>
                    <h2>Participant №{ run.participant.number }</h2>
                    <TabletScoreInput
                        scores={ run.scores }
                        judge_id={ this.props.judge_id }
                        judges={ this.state.tour.judges }
                        onScoreUpdate={ this.onScoreUpdate.bind(this, run.id) } />
                </td>
            }.bind(this));
        var one_run_class = cells.length == 1 ? " single-run" : "";
        return <table className={ "tablet-main-table" + one_run_class }><tbody><tr>
            { cells }
        </tr></tbody></table>;
    }
    render() {
        if (this.state.judge === null) {
            return <p>Loading ...</p>;
        }
        return <div>
            { this.renderHeader() }
            { this.renderScoringLayout() }
            { this.renderFooter() }
        </div>
    }
}
