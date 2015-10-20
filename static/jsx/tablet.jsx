React.initializeTouchEvents(true);


class JudgeTablet extends React.Component {

    // Intiialization

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
            judge: null,
            current_heat: 1,
            page: "dance",
            active_tour_id: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        message_dispatcher.addListener("active_tour_update", this.dispatchActiveTourUpdate.bind(this));
        this.loadData();
    }
    reloadFromStorage() {
        let judge = storage.get("Judge").by_id(this.props.judge_id).serialize({})
        let competition = storage.get("Competition").by_id(this.props.competition_id).serialize({ judges: {} })
        let active_tour_id = this.state.active_tour_id;
        if (active_tour_id === null) {
            this.setState({
                judge: judge,
                competition: competition,
                tour: null,
            });
            return;
        }
        let active_tour_model = storage.get("Tour").by_id(active_tour_id);
        if (!active_tour_model) {
            this.setState({
                judge: judge,
                competition: competition,
                tour: null,
            });
            return;
        }
        this.setState({
            judge: judge,
            competition: competition,
            tour: active_tour_model.serialize({
                runs: {
                    participant: {
                        "sportsmen": {},
                    },
                    scores: {},
                    acrobatics: {},
                },
                discipline: {},
            }),
        })
    }
    loadData() {
        Api("tournaments.competition.get", {competition_id: this.props.competition_id, children: {
            judges: {},
        }})
            .updateDB("Competition", this.props.competition_id)
            .onSuccess(this.reloadFromStorage.bind(this))
            .send();
        Api("tournaments.tour.find_active", {}).onSuccess(function(response) {
            this.dispatchActiveTourUpdate(response);
        }.bind(this)).send();
    }

    // Dispatchers

    dispatchActiveTourUpdate(response) {
        var tour_id = response.tour_id;
        if ((this.state.tour === null && tour_id === null) || (this.state.tour !== null && this.state.tour.id == tour_id)) {
            return;
        }
        this.setState({
            "active_tour_id": tour_id,
        });
        if (tour_id === null) {
            storage.del("Tour");
            storage.del("Run");
            storage.del("Score");
            storage.del("Participant");
            storage.del("Sportsman");
            storage.del("Discipline");
            this.setState({
                tour: null,
                current_heat: 1,
            });
            return;
        }
        Api("tournaments.tour.get", { tour_id: tour_id, children:{
            runs: {
                participant: {
                    "sportsmen": {},
                },
                scores: {},
                acrobatics: {},
            },
            discipline: {},
        }})
            .updateDB("Tour", tour_id)
            .onSuccess(function() {
                this.reloadFromStorage(tour_id);
                this.setState({
                    current_heat: 1,
                });
            }.bind(this))
            .send();
    }

    // Listeners

    onScoreUpdate(score_id, new_score) {
        Api("tournaments.score.set", {score_id: score_id, data: new_score}).send();
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
        return Math.max(...this.state.tour.runs.map((run) => run.heat));
    }

    // Rendering

    renderHeader() {
        var btn_prev = null;
        var btn_next = null;
        if (this.state.current_heat > 1) {
            btn_prev = <button className="btn btn-primary pull-left" {...onTouchOrClick(this.toPrevHeat.bind(this))}>
                { _("tablet.buttons.prev_heat") }
            </button>;
        }
        if (this.state.current_heat < this.getHeatsCount()) {
            btn_next = <button className="btn btn-primary pull-right" {...onTouchOrClick(this.toNextHeat.bind(this))}>
                { _("tablet.buttons.next_heat") }
            </button>;
        }
        var current_tour = <div className="header">
            <h1>{ this.state.tour.discipline.name }: { this.state.tour.name }</h1>
            <h2>{ _("tablet.headers.heat") }: { this.state.current_heat } / { this.getHeatsCount() }</h2>
        </div>;
        return <header>
            { btn_prev }
            { btn_next }
            { current_tour }
        </header>
    }
    renderSplashScreen() {
        let judge = this.state.judge;
        let judge_number = judge.role_description || _("global.phrases.judge_n", this.state.judge.number);
        return <div>
            <header>
                <a className="btn btn-primary pull-left" href="/">
                    { _("tablet.buttons.to_start_page") }
                </a>
                <div className="header">
                    <h1>{ this.state.competition.name }</h1>
                </div>
                <div className="clearfix"></div>
            </header>
            <div className="judge-number">{ judge_number }</div>
            <div className="judge-name">{ this.state.judge.name }</div>
        </div>;
    }
    renderScoringLayout() {
        var cells = this.state.tour.runs
            .filter(function(run) {
                return run.heat == this.state.current_heat;
            }.bind(this))
            .map(function(run) {
                let scores_map = {}
                run.scores.forEach(function(score_data) {
                    scores_map[score_data.judge_id] = score_data;
                });
                let header = _("global.phrases.participant_n", run.participant.number, run.participant.sportsmen.length);
                if (typeof scores_map[this.props.judge_id] === "undefined") {
                    return <td key={ run.id }>
                        <h2>{ header }</h2>
                        <h3 className="text-center">{ _("tablet.messages.not_judging") }</h3>
                    </td>
                }
                return <td key={ run.id }>
                    <h2>{ header }</h2>
                    <TabletScoreInput
                        acrobatics={ run.acrobatics }
                        judge_id={ this.props.judge_id }
                        judges={ this.state.competition.judges }
                        run_id={ run.id }
                        page={ this.state.page }
                        scores={ scores_map }
                        scoring_system={ this.state.tour.scoring_system }
                        onScoreUpdate={ this.onScoreUpdate.bind(this, scores_map[this.props.judge_id].id) } />
                </td>
            }.bind(this));
        var one_run_class = cells.length == 1 ? " single-run" : "";
        return <table className={ "tablet-main-table" + one_run_class }><tbody><tr>
            { cells }
        </tr></tbody></table>;
    }
    renderFooter() {
        if (this.state.judge.role != "tech_judge" || this.state.tour.scoring_system != "rosfarr.acro") {
            return null;
        }
        return <div className="footer page-selector">
            <h3>{ _("tablet.headers.select_page") }</h3>
            <button
                className={ "btn" + (this.state.page == "dance" ? " active" : "") }
                {...onTouchOrClick(this.switchPage.bind(this, "dance"))}>{ _("tablet.pages.dance") }
            </button>
            <button
                className={ "btn" + (this.state.page == "acro" ? " active" : "") }
                {...onTouchOrClick(this.switchPage.bind(this, "acro"))}>{ _("tablet.pages.acrobatics") }
            </button>
        </div>;
    }
    render() {
        if (this.state.judge === null) {
            return <p>Loading ...</p>;
        }
        if (this.state.tour === null) {
            return this.renderSplashScreen();
        }
        return <div>
            { this.renderHeader() }
            { this.renderScoringLayout() }
            { this.renderFooter() }
        </div>
    }
}
