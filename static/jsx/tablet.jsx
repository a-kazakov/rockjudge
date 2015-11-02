React.initializeTouchEvents(true);


class JudgeTablet extends React.Component {
    constructor(props) {
        super(props);
        this.TOUR_SCHEMA = {
            runs: {
                participant: {},
                scores: {},
                acrobatics: {},
            },
            discipline: {
                discipline_judges: {
                    judge: {},
                },
            },
        };
        this.state = {
            tour: null,
            judge: null,
            discipline_judge: null,
            current_heat: 1,
            page: "dance",
        };
        this.active_tour_id = null;
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this, false));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        message_dispatcher.addListener("active_tour_update", this.dispatchActiveTourUpdate.bind(this, false));
        this.loadData();
    }

    // Loaders

    reloadFromStorage(reset_heat) {
        let st_judge = storage.get("Judge").by_id(this.props.judge_id)
        if (!st_judge) {
            return;
        }
        let state_upd = {}
        state_upd["judge"] = st_judge.serialize({
            competition: {}
        })
        state_upd["competition"] = state_upd["judge"].competition;
        if (this.active_tour_id !== null) {
            let st_tour = storage.get("Tour").by_id(this.active_tour_id);
            if (st_tour) {
                let tour = st_tour.serialize(this.TOUR_SCHEMA);
                state_upd["tour"] = tour;
                // Set find discipline judge
                state_upd["discipline_judge"] = null;
                tour.discipline.discipline_judges.forEach(function(dj) {
                    if (dj.judge.id == this.props.judge_id) {
                        state_upd["discipline_judge"] = dj;
                    }
                }.bind(this));
                if (reset_heat) {
                    let discipline_judge = state_upd["discipline_judge"];
                    if (!discipline_judge || discipline_judge.role == "head_judge") {
                        state_upd["current_heat"] = 1;
                    } else {
                        let discipline_judge_id = discipline_judge && discipline_judge.id;
                        state_upd["current_heat"] = this.getFirstNonConfirmedHeat(tour.runs, discipline_judge_id) || 1;
                    }
                }
            }
        }
        this.setState(state_upd);
    }
    updateActiveTour(force_reload, new_active_tour_id) {
        if (new_active_tour_id === null) {
            this.setState({
                tour: null,
                discipline_judge: null,
            });
            this.active_tour_id = new_active_tour_id;
            return;
        }
        if (force_reload || new_active_tour_id !== this.active_tour_id) {
            let old_active_tour_id = this.active_tour_id;
            this.active_tour_id = new_active_tour_id;
            Api("tour.get", { tour_id: this.active_tour_id, children: this.TOUR_SCHEMA })
                .updateDB("Tour", this.active_tour_id)
                .onSuccess(this.reloadFromStorage.bind(this, new_active_tour_id !== old_active_tour_id))
                .send()
        }
    }
    loadData() {
        Api("judge.get", { judge_id: this.props.judge_id, children: { competition: {} } })
            .updateDB("Judge", this.props.judge_id)
            .onSuccess(this.reloadFromStorage.bind(this, false))
            .send();
        Api("tour.find_active", {})
            .onSuccess(this.dispatchActiveTourUpdate.bind(this, true))
            .send();
    }

    // Dispatchers

    dispatchActiveTourUpdate(force_reload, data) {
        this.updateActiveTour(force_reload, data["tour_id"]);
    }

    // Listeners

    onScoreUpdate(score_id, new_score) {
        let request = {
            score_data: new_score,
            force: false,
        };
        Api("score.set", {score_id: score_id, data: request}).send();
    }

    onScoreConfirm(score_id) {
        Api("score.confirm", {score_id: score_id}).send();
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

    getHeatsCount(runs) {
        runs = runs || this.state.tour.runs;
        return Math.max(...runs.map((run) => run.heat));
    }
    getFirstNonConfirmedHeat(runs, discipline_judge_id) {
        runs = runs || this.state.tour.runs;
        discipline_judge_id = discipline_judge_id || this.state.discipline_judge.id;
        for (let i = 0; i < runs.length; ++i) {
            for (let j = 0; j < runs[i].scores.length; ++j) {
                let score = runs[i].scores[j];
                if (score.discipline_judge_id == discipline_judge_id && !score.confirmed) {
                    return runs[i].heat;
                }
            }
        }
        return this.getHeatsCount(runs);
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
        if (this.state.current_heat < this.getHeatsCount() && (
                this.state.discipline_judge.role == "head_judge"
                || this.getFirstNonConfirmedHeat() > this.state.current_heat)) {
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
        let judge_number = judge.role_description || _("global.phrases.judge_n", judge.number);
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
            {
                this.state.tour ? <div>
                    <div className="not-judging-discipline">{ this.state.tour.discipline.name }</div>
                    <div className="not-judging-tour">{ this.state.tour.name }</div>
                    <div className="not-judging-message">{ _("tablet.messages.not_judging_discipline") }</div>
                </div> : null
            }
        </div>;
    }
    renderScoringLayout() {
        let cells = this.state.tour.runs
            .filter(function(run) {
                return run.heat == this.state.current_heat;
            }.bind(this))
            .map(function(run) {
                let scores_map = {}
                run.scores.forEach(function(score_data) {
                    scores_map[score_data.discipline_judge_id] = score_data;
                });
                let current_score = scores_map[this.state.discipline_judge.id];
                let header = _("global.phrases.participant_n", run.participant.number, run.participant.name, run.participant.sportsmen.length);
                if (typeof scores_map[this.state.discipline_judge.id] === "undefined") {
                    return <td key={ run.id }>
                        <h2>{ header }</h2>
                        <h3 className="text-center">{ _("tablet.messages.not_judging_participant") }</h3>
                    </td>
                }
                return <td key={ run.id }>
                    <h2>{ header }</h2>
                    <TabletScoreInput
                        acrobatics={ run.acrobatics }
                        discipline_judge={ this.state.discipline_judge }
                        all_discipline_judges={ this.state.tour.discipline.discipline_judges }
                        score={ current_score }
                        readOnly={ current_score.confirmed }
                        all_scores={ scores_map }
                        run_id={ run.id }
                        page={ this.state.page }
                        scoring_system_name={ this.state.tour.scoring_system_name }
                        onScoreUpdate={ this.onScoreUpdate.bind(this, current_score.id) }
                        onScoreConfirm={ this.onScoreConfirm.bind(this, current_score.id) } />
                </td>
            }.bind(this));
        var single_run_class = cells.length == 1 ? " single-run" : "";
        return <table className={ "tablet-main-table" + single_run_class }><tbody><tr>
            { cells }
        </tr></tbody></table>;
    }
    renderFooter() {
        if (this.state.discipline_judge === null) {
            return null;
        }
        if (this.state.discipline_judge.role != "tech_judge" || this.state.tour.scoring_system_name != "rosfarr.acro") {
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
        if (this.state.discipline_judge === null) {
            return this.renderSplashScreen();
        }
        return <div>
            { this.renderHeader() }
            { this.renderScoringLayout() }
            { this.renderFooter() }
        </div>
    }
}
