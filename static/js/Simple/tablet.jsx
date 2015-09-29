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
        var btn_prev = null;
        var btn_next = null;
        if (this.state.tour_id !== null) {
            if (this.state.current_heat > 1) {
                btn_prev = <button className="btn-prev-heat" onClick={ this.toPrevHeat.bind(this) }>Previous heat</button>;
            }
            btn_next = <button className="btn-next-heat" onClick={ this.toNextHeat.bind(this) }>Next heat</button>;
        }
        var current_tour = (this.state.tour_id === null) ? null :
            <div className="header">
                <h1>{ this.state.tour.inner_competition_name }: { this.state.tour.name }</h1>
                <h2>Current heat: { this.state.current_heat }</h2>
            </div>
        return <header>
            { btn_prev }
            { btn_next }
            { current_tour }
        </header>
    }
    renderScoringLayout() {
        if (this.state.tour_id === null) {
            return <p>No active tour</p>;
        }
        var cells = this.state.tour.runs
            .filter(function(run) {
                return run.heat == this.state.current_heat;
            }.bind(this))
            .map(function(run) {
                return <td key={ run.id }>
                    <h2>Participant №{ run.participant.number }</h2>
                    <TabletScoreInput
                        score={ run.scores[this.props.judge_id] }
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
        </div>
    }
}
