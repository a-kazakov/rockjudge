import "babel-polyfill";

import { _ } from "i10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { Loader } from "ui/components";
import { showConfirm } from "ui/dialogs";
import { onTouchOrClick } from "ui/tablet_components";
import { TourResultsBody } from "admin/judging/tour_results";

import { TabletScoreInput } from "./rosfarr";


export class Judge extends React.Component {
    static get propTypes() {
        return {
            judge_id: React.PropTypes.number.isRequired,
        };
    }

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
            page: "default",
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
                if (tour.discipline && tour.discipline.discipline_judges) {
                    state_upd["tour"] = tour;
                    // Find discipline judge
                    state_upd["discipline_judge"] = null;
                    tour.discipline.discipline_judges.forEach(dj => {
                        if (dj.judge.id === this.props.judge_id) {
                            state_upd["discipline_judge"] = dj;
                        }
                    });
                    if (reset_heat) {
                        let discipline_judge = state_upd["discipline_judge"];
                        if (!discipline_judge || discipline_judge.role === "head_judge") {
                            state_upd["current_heat"] = 1;
                        } else {
                            let discipline_judge_id = discipline_judge && discipline_judge.id;
                            state_upd["current_heat"] = this.getFirstNonConfirmedHeat(tour.runs, discipline_judge_id) || 1;
                        }
                        state_upd["page"] = "default";
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
            storage.del("Tour");
            storage.del("Participant");
            storage.del("Score");
            storage.del("Run");
            storage.del("Discipline");
            storage.del("DisciplineJudge");
            return;
        }
        if (force_reload || new_active_tour_id !== this.active_tour_id) {
            let old_active_tour_id = this.active_tour_id;
            this.active_tour_id = new_active_tour_id;
            Api("tour.get", { tour_id: this.active_tour_id, children: this.TOUR_SCHEMA })
                .addToDB("Tour", this.active_tour_id)
                .onSuccess(this.reloadFromStorage.bind(this, new_active_tour_id !== old_active_tour_id))
                .send()
        }
    }
    loadData() {
        Api("judge.get", { judge_id: this.props.judge_id, children: { competition: {} } })
            .addToDB("Judge", this.props.judge_id)
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
    stopTour() {
        showConfirm(_("tablet.confirms.stop_tour"), () => {
            if (this.state.tour) {
                Api("tour.stop", { tour_id: this.state.tour.id }).onSuccess(() => swal.close()).send();
            }
        });
    }
    finalizeTour() {
        showConfirm(_("tablet.confirms.finalize_tour"), () => {
            if (this.state.tour) {
                Api("tour.finalize", { tour_id: this.state.tour.id }).onSuccess(() => swal.close()).send();
            }
        });
    }
    stopTourAndStartNext() {
        showConfirm(_("tablet.confirms.stop_tour_and_start_next"), () => {
            if (this.state.tour) {
                let tour_id = this.state.tour.id;
                Api("tour.stop", { tour_id }).onSuccess(() => {
                    Api("tour.start_next_after", { tour_id }).onSuccess(() => swal.close()).send();
                }).send();
            }
        });
    }
    finalizeTourAndStartNext() {
        showConfirm(_("tablet.confirms.finalize_tour_and_start_next"), () => {
            if (this.state.tour) {
                let tour_id = this.state.tour.id;
                Api("tour.finalize", { tour_id }).onSuccess(() => {
                    Api("tour.start_next_after", { tour_id }).onSuccess(() => swal.close()).send();
                }).send();
            }
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
                if (score.discipline_judge_id === discipline_judge_id && !score.confirmed && runs[i].performed) {
                    return runs[i].heat;
                }
            }
        }
        return this.getHeatsCount(runs);
    }
    hasUnconfirmedScores() {
        const runs = this.state.tour.runs;
        const latest_heat = runs[runs.length - 1].heat;
        if (latest_heat === runs[0].heat) {
            return false
        }
        const latest_runs = runs.filter(r => r.heat === latest_heat);
        const prev_runs = runs.filter(r => r.heat === latest_heat - 1);
        let scores = new Map();
        const process_run = (run, type) => {
            for (const score of run.scores) {
                const dj_id = score.discipline_judge_id;
                if (!scores.has(dj_id)) {
                    scores.set(dj_id, {
                        latest: 0,
                        prev: 0,
                    });
                }
                if (score.confirmed) {
                    ++scores.get(dj_id)[type];
                }
            }
        };
        for (const run of latest_runs) {
            process_run(run, "latest");
        }
        for (const run of prev_runs) {
            process_run(run, "prev");
        }
        for (const stats of scores.values()) {
            if (stats.prev > 0 && stats.latest < latest_runs.length) {
                return true;
            }
        }
        return false;
    }

    // Rendering

    renderResults() {
        return <div className="body results">
            <TourResultsBody tour_id={ this.state.tour.id } verbosity="2" tableOnly />
        </div>
    }
    renderHasUnconfirmedScoresWarning() {
        if (!this.hasUnconfirmedScores()) {
            return null;
        }
        return (
            <div className="warning">
                <div className="content">
                    { _("tablet.alerts.has_unconfirmed_scores") }
                </div>
            </div>
        );
    }
    renderActions() {
        return (
            <div className="body actions">
                { this.renderHasUnconfirmedScoresWarning() }
                <div className="item">
                    <button className="tbtn btn-primary" type="button"
                            {...onTouchOrClick(this.stopTour.bind(this))}>
                        { _("tablet.buttons.stop_tour") }
                    </button>
                </div>
                <div className="item">
                    <button className="tbtn btn-primary" type="button"
                            {...onTouchOrClick(this.finalizeTour.bind(this))}>
                        { _("tablet.buttons.finalize_tour") }
                    </button>
                </div>
                <div className="item">
                    <button className="tbtn btn-primary" type="button"
                            {...onTouchOrClick(this.stopTourAndStartNext.bind(this))}>
                        { _("tablet.buttons.stop_tour_and_start_next") }
                    </button>
                </div>
                <div className="item">
                    <button className="tbtn btn-primary" type="button"
                             {...onTouchOrClick(this.finalizeTourAndStartNext.bind(this))}>
                        { _("tablet.buttons.finalize_tour_and_start_next") }
                    </button>
                </div>
            </div>
        );
    }
    renderHeader() {
        let btn_prev = null;
        let btn_next = null;
        let judge = this.state.judge;
        let judge_number = judge.role_description || _("global.phrases.judge_n", judge.number);
        if (this.state.page !== "results" && this.state.page !== "actions") {
            if (this.state.current_heat > 1) {
                btn_prev = <button className="btn btn-primary pull-left" {...onTouchOrClick(this.toPrevHeat.bind(this))}>
                    { _("tablet.buttons.prev_heat") }
                </button>;
            }
            if (this.state.current_heat < this.getHeatsCount() && (
                    this.state.discipline_judge.role === "head_judge"
                    || this.getFirstNonConfirmedHeat() > this.state.current_heat)) {
                btn_next = <button className="btn btn-primary pull-right" {...onTouchOrClick(this.toNextHeat.bind(this))}>
                    { _("tablet.buttons.next_heat") }
                </button>;
            }
        }
        let current_tour = <div className="header">
            <table className="full-width"><tbody><tr>
                <td>
                    <h1>{ judge_number }</h1>
                    <h2>{ judge.name }</h2>
                </td>
                <td>
                    <h1>{ this.state.tour.discipline.name }</h1>
                    <h2>{ this.state.tour.name }&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        { _("tablet.headers.heat") }: { this.state.current_heat } / { this.getHeatsCount() }</h2>
                </td>
            </tr></tbody></table>
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
        return <div className="judge-tablet">
            <header>
                <a className="btn btn-primary pull-left" href="/">
                    { _("tablet.buttons.to_start_page") }
                </a>
                <div className="header">
                    <h1>{ this.state.competition.name }</h1>
                </div>
                <div className="clearfix"></div>
            </header>
            <div className="splash-screen">
                <div className="judge-number">{ judge_number }</div>
                <div className="judge-name">{ this.state.judge.name }</div>
                {
                    this.state.tour ? <div>
                        <div className="not-judging-discipline">{ this.state.tour.discipline.name }</div>
                        <div className="not-judging-tour">{ this.state.tour.name }</div>
                        <div className="not-judging-message">{ _("tablet.messages.not_judging_discipline") }</div>
                    </div> : null
                }
            </div>
        </div>
    }
    renderScoringLayout() {
        if (this.state.page === "results") {
            return this.renderResults();
        }
        if (this.state.page === "actions") {
            return this.renderActions();
        }
        let cells = this.state.tour.runs
            .filter(function(run) {
                return run.heat === this.state.current_heat;
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
                        discipline_judge={ this.state.discipline_judge }
                        all_discipline_judges={ this.state.tour.discipline.discipline_judges }
                        score={ current_score }
                        readOnly={ current_score.confirmed }
                        all_scores={ scores_map }
                        run={ run }
                        page={ this.state.page }
                        scoring_system_name={ this.state.tour.scoring_system_name }
                        onScoreUpdate={ this.onScoreUpdate.bind(this, current_score.id) }
                        onScoreConfirm={ this.onScoreConfirm.bind(this, current_score.id) } />
                </td>
            }.bind(this));
        let single_run_class = cells.length === 1 ? " single-run" : "";
        if (cells.length > 3) {
            let first_row = []
            let second_row = []
            cells.forEach((cell, idx) => {
                if (idx % 2 === 0) {
                    first_row.push(cell);
                } else {
                    second_row.push(cell);
                }
            })
            let half_width = 100 / (2 * first_row.length + 1);
            let first_width, second_width;
            if (first_row.length === second_row.length) {
                [first_width, second_width] = [100 - half_width, 100 - half_width];
            } else {
                [first_width, second_width] = [100, 100 - 2 * half_width];
            }
            return <div className="body">
                <table className="main-table" style={{ width: first_width + "%", "marginLeft": 0 }}><tbody><tr>
                    { first_row }
                </tr></tbody></table>
                <table className="main-table" style={{ width: second_width + "%", "marginRight": first_row.length === second_row.length ? 0 : "auto" }}><tbody><tr>
                    { second_row }
                </tr></tbody></table>
            </div>
        }
        return <div className="body">
            <table className={ "main-table" + single_run_class }><tbody><tr>
                { cells }
            </tr></tbody></table>;
        </div>
    }
    renderFooter() {
        if (this.state.discipline_judge === null) {
            return null;
        }
        if (this.state.discipline_judge.role === "head_judge") {
            return <div className="footer page-selector">
                <button
                    className={ "btn" + (this.state.page === "default" ? " active" : "") }
                    {...onTouchOrClick(this.switchPage.bind(this, "default"))}>{ _("tablet.pages.heats") }
                </button>
                <button
                    className={ "btn" + (this.state.page === "results" ? " active" : "") }
                    {...onTouchOrClick(this.switchPage.bind(this, "results"))}>{ _("tablet.pages.results") }
                </button>
                <button
                    className={ "btn" + (this.state.page === "actions" ? " active" : "") }
                    {...onTouchOrClick(this.switchPage.bind(this, "actions"))}>{ _("tablet.pages.actions") }
                </button>
            </div>;
        }
        if (this.state.discipline_judge.role !== "tech_judge" || (
                this.state.tour.scoring_system_name !== "rosfarr.acro" &&
                    this.state.tour.scoring_system_name !== "rosfarr.am_final_acro")) {
            return null;
        }
        return <div className="footer page-selector">
            <button
                className={ "btn" + (this.state.page === "default" ? " active" : "") }
                {...onTouchOrClick(this.switchPage.bind(this, "default"))}>{ _("tablet.pages.dance") }
            </button>
            <button
                className={ "btn" + (this.state.page === "acro" ? " active" : "") }
                {...onTouchOrClick(this.switchPage.bind(this, "acro"))}>{ _("tablet.pages.acrobatics") }
            </button>
        </div>;
    }
    render() {
        if (this.state.judge === null) {
            return <Loader />;
        }
        if (this.state.tour === null) {
            return this.renderSplashScreen();
        }
        if (this.state.discipline_judge === null) {
            return this.renderSplashScreen();
        }
        return <div className="judge-tablet">
            { this.renderHeader() }
            { this.renderScoringLayout() }
            { this.renderFooter() }
        </div>
    }
}
