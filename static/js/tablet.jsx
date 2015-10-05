React.initializeTouchEvents(true);


class JudgeTablet extends React.Component {

    // Intiialization

    constructor(props) {
        super(props);
        this.state = {
            tour_id: null,
            judge: null,
            current_heat: 1,
            page: "dance",
        };
        // TODO: add filters
        // TODO: support tour_full_update
        // TOFO: suport run update withour "full"
        window.message_dispatcher.addListener("run_update run_full_update score_update")
            .fetchObject("tournaments.run.get", true)
            .setCallback(this.dispatchRunUpdate.bind(this));
        window.message_dispatcher.addListener("active_tour_update")
            .fetchObject("tournaments.tour.find_active")
            .setCallback(this.dispatchActiveTourUpdate.bind(this));
        this.loadData();
    }
    loadData() {
        (new Api("tournaments.judge.get", {judge_id: this.props.judge_id, recursive: false})).onSuccess(function(response) {
            this.setState({
                judge: response
            });
        }.bind(this)).send();
        (new Api("tournaments.tour.find_active", {})).onSuccess(function(response) {
            this.dispatchActiveTourUpdate(response);
        }.bind(this)).send();
    }

    // Dispatchers

    dispatchRunUpdate(new_run) {
        var changed = false;
        var new_runs = this.state.tour.runs.map(function(run) {
            if (new_run.id != run.id) {
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
    dispatchActiveTourUpdate(response) {
        var tour_id = response.tour_id;
        if (tour_id === null) {
            this.setState({
                tour_id: null,
                current_heat: 1,
            });
        }
        if (this.state.tour_id == tour_id) {
            return;
        }
        (new Api("tournaments.tour.get", {tour_id: tour_id, recursive: true})).onSuccess(function(new_tour) {
            this.setState({
                tour_id: tour_id,
                tour: new_tour,
            });
        }.bind(this)).send();
    }

    // Listeners

    onScoreUpdate(score_id, new_score) {
        (new Api("tournaments.score.set", {score_id: score_id, data: new_score})).send();
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
    switchPage(page) {
        this.setState({
            page: page,
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
                        acrobatics={ run.acrobatics }
                        judge_id={ this.props.judge_id }
                        judges={ this.state.tour.judges }
                        run_id={ run.id }
                        page={ this.state.page }
                        scores={ run.scores.scores }
                        scoring_system={ this.state.tour.scoring_system }
                        onScoreUpdate={ this.onScoreUpdate.bind(this, run.scores.scores[this.props.judge_id].id) } />
                </td>
            }.bind(this));
        var one_run_class = cells.length == 1 ? " single-run" : "";
        return <table className={ "tablet-main-table" + one_run_class }><tbody><tr>
            { cells }
        </tr></tbody></table>;
    }
    renderFooter() {
        if (this.state.tour_id === null || this.state.judge.role != "tech_judge") {
            return null;
        }
        return <div className="footer page-selector">
            <h3>Select page:</h3>
            <button
                className={ this.state.page == "dance" ? "active" : ""}
                onClick={ this.switchPage.bind(this, "dance") }>Dance
            </button>
            <button
                className={ this.state.page == "acro" ? "active" : ""}
                onClick={ this.switchPage.bind(this, "acro") }>Acrobaics
            </button>
        </div>;
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
