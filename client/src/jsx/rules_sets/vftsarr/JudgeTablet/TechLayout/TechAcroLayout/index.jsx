import _ from "l10n";

import Header from "JudgeTablet/components/Header";
import ConfirmationButton from "JudgeTablet/components/ConfirmationButton";
import LastPage from "JudgeTablet/components/LastPage";
import ScoringLayoutAcro from "../ScoringLayoutAcro";
import ScoringLayoutDance from "../ScoringLayoutDance";
import JudgingPositionSelector from "./JudgingPositionSelector";

export default class TechAcroLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
                judge: PT.object.isRequired,
            }).isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        heat: PT.number.isRequired,
                        status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                        scores: PT.arrayOf(
                            PT.shape({
                                discipline_judge_id: PT.number.isRequired,
                            }).isRequired,
                        ).isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
            onHeatConfirm: PT.func.isRequired,
            onScoreConfirm: PT.func.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    static names_cache = new Map();
    static convertName(name) {
        if (!this.names_cache.get(name)) {
            const new_name_part = name
                .split("")
                .map((ch, idx, arr) => (idx === 0 || arr[idx - 1] === "_") ? ch.toUpperCase() : ch)
                .filter(ch => ch !== "_")
                .join("");
            this.names_cache.set(
                name,
                `get${new_name_part}`,
            );
        }
        return this.names_cache.get(name);
    }

    constructor(props) {
        super(props);
        this._cache = new Map();
        let pre_state = {
            judgingPosition: null,
        };
        pre_state.showLastPage = this.getValue("can_finish", true, pre_state, props);
        if (this.getValue("judging_position", true, pre_state, props) === null) {
            pre_state.heat = 1;
        } else {
            pre_state.heat = this.getValue("first_non_confirmed_heat", true, pre_state, props) ||
                this.getValue("heats_count", true, pre_state, props);
        }
        this.state = pre_state;
    }

    componentWillReceiveProps(next_props) {
        this.resetCache();
        if (next_props.tour.id !== this.props.tour.id) {
            this.setState({
                heat: this.getValue("first_non_confirmed_heat", false, null, next_props),
                showLastPage: false,
            });
        }
        if (this.state.showLastPage) {
            if (!this.getValue("can_finish", true, null, next_props)) {
                this.setState({
                    showLastPage: false,
                });
            }
        }
    }

    resetCache() {
        this._cache.clear()
    }
    getValue(value_name, use_cache_or_context=true, state=null, props=null) {
        const func = this.constructor.convertName(value_name);
        const context = typeof use_cache_or_context === "object"
            ? use_cache_or_context
            : {
                use_cache: use_cache_or_context,
                state: state || this.state,
                props: props || this.props,
            };
        if (context.use_cache) {
            if (!this._cache.has(value_name)) {
                this._cache.set(value_name, this[func](context));
            }
            return this._cache.get(value_name)
        } else {
            return this[func](context);
        }
    }

    get judging_position() { return this.getValue("judging_position"); }
    get interesting_runs() { return this.getValue("interesting_runs"); }
    get score_by_run_id() { return this.getValue("score_by_run_id"); }
    get heats_count() { return this.getValue("heats_count"); }
    get first_non_confirmed_heat() { return this.getValue("first_non_confirmed_heat"); }
    get can_finish() { return this.getValue("can_finish"); }
    get current_run() { return this.getValue("current_run"); }
    get current_score() { return this.getValue("current_score"); }
    get max_runs_per_heat() { return this.getValue("max_runs_per_heat"); }

    getJudgingPosition(context) {
        const per_heat = this.getValue("max_runs_per_heat", context);
        const position = context.state ? context.state.judgingPosition : null;
        return per_heat === 1 ? 0 : position;
    }

    getMaxRunsPerHeat(context) {
        let counts = new Map();
        for (const run of context.props.tour.runs) {
            if (run.heat <= 0) {
                continue;
            }
            counts.set(run.heat, (counts.get(run.heat) || 0) + 1);
        }
        return Math.max(...counts.values());
    }

    getInterestingRuns(context) {
        let result = [];
        let idx = 0;
        let prev_heat = null;
        const position = this.getValue("judging_position", context);
        for (const run of context.props.tour.runs) {
            if (prev_heat !== run.heat) {
                idx = 0;
            } else {
                idx += 1;
            }
            if (idx === position && run.heat > 0) {
                result.push(run);
            }
            prev_heat = run.heat;
        }
        return result;
    }

    getScoreByRunId(context) {
        function findScore(run) {
            return run.scores.find(s => s.discipline_judge_id === context.props.disciplineJudge.id) || null;
        }
        return new Map(context.props.tour.runs.map(run => [run.id, findScore(run)]));
    }

    getHeatsCount(context) {
        const last_run = context.props.tour.runs[context.props.tour.runs.length - 1];
        if (typeof last_run === "undefined") {
            return 1;
        }
        return last_run.heat;
    }

    getFirstNonConfirmedHeat(context) {
        // Returns null if all runs are confirmed
        const position = this.getValue("judging_position", context);
        if (position === null) {
            return 0;
        }
        const runs = this.getValue("interesting_runs", context);
        const score_by_run_id = this.getValue("score_by_run_id", context);
        for (const run of runs) {
            if (run.status !== "OK") {
                continue;
            }
            const score = score_by_run_id.get(run.id);
            if (score === null || !score.confirmed) {
                return run.heat;
            }
        }
        return null;
    }

    getCanFinish(context) {
        return this.getValue("first_non_confirmed_heat", context) === null;
    }

    getCurrentRun(context) {
        return this.getValue("interesting_runs", context).find(run => run.heat === this.state.heat) || null;
    }

    getCurrentScore(context) {
        const run = this.getValue("current_run", context)
        if (run === null) {
            return null;
        }
        return this.getValue("score_by_run_id", context).get(run.id) || null;
    }

    handleConfirm = () => this.props.onScoreConfirm(this.current_score.id);

    setHeat = (heat) => this.setState({ heat });
    updateHeat = (delta) => this.setHeat(this.state.heat + delta);

    handlePrevHeatClick = () => this.updateHeat(-1);
    handleNextHeatClick = () => this.updateHeat(1);
    handleFinishClick = () => this.setState({ showLastPage: true });
    handleReturnClick = () => this.setState({ showLastPage: false });

    handleScoreUpdate = (key, value) => {
        if (this.current_score.confirmed) {
            return;
        }
        const score_data = key === null
            ? value
            : {[key]: value};
        this.props.onScoreUpdate(this.current_score.id, score_data);
    };

    handleJudgingPositionSelected = (judgingPosition) => {
        this.resetCache();
        let state_upd = {judgingPosition};
        const next_state = Object.assign({}, this.state, state_upd);
        state_upd.heat = this.getValue("first_non_confirmed_heat", true, next_state) ||
            this.getValue("heats_count", true, next_state);
        state_upd.showLastPage = this.getValue("can_finish", true, next_state);
        this.setState(state_upd);
    };

    renderBody() {
        if (this.judging_position === null) {
            return (
                <JudgingPositionSelector
                    numOptions={ this.max_runs_per_heat }
                    onSelected={ this.handleJudgingPositionSelected }
                />
            );
        }
        if (this.state.showLastPage) {
            return (
                <LastPage
                    tour={ this.props.tour }
                />
            );
        }
        if (this.current_run === null) {
            return (
                <div className="body not-performing">
                    { _("tablet.tech_judge.nobody_in_position") }
                </div>
            );
        }
        if (this.current_run.status !== "OK") {
            const header = _("global.phrases.participant_n",
                this.current_run.participant.number,
                this.current_run.participant.name,
                this.current_run.participant.sportsmen.length);
            return (
                <div className="body">
                    <div className="layout-participant">
                        <h2>
                            { header }
                        </h2>
                        <div className="not-performing">
                            { this.current_run.status === "NP"
                                ? _("tablet.global.not_performing")
                                : _("tablet.global.disqualified") }
                        </div>
                    </div>
                </div>
            );
        }
        if (this.current_score === null) {
            return (
                <div className="body not-performing">
                    { _("tablet.global.no_score") }
                </div>
            );
        }
        return (
            <div className="body">
                <div className="sections">
                    <div className="acro-section">
                        <ScoringLayoutAcro
                            disciplineJudge={ this.props.disciplineJudge }
                            readOnly={ this.current_score.confirmed }
                            run={ this.current_run }
                            score={ this.current_score }
                            scoreData={ this.current_score.data.raw_data }
                            onScoreUpdate={ this.handleScoreUpdate }
                        />
                    </div>
                    <div className="dance-section">
                        <ScoringLayoutDance
                            readOnly={ this.current_score.confirmed }
                            run={ this.current_run }
                            score={ this.current_score }
                            scoreData={ this.current_score.data.raw_data }
                            tour={ this.props.tour }
                            onScoreUpdate={ this.handleScoreUpdate }
                        />
                    </div>
                </div>
                <ConfirmationButton
                    canConfirm
                    confirmed={ this.current_score.confirmed }
                    key={ this.state.heat }
                    onConfirm={ this.handleConfirm }
                />
            </div>
        );
    }

    render() {
        this.resetCache();
        return (
            <div className="vftsarr-JudgeTablet TechJudgeAcroLayout">
                <Header
                    canFinish={ !this.state.showLastPage && this.can_finish }
                    canReturn={ this.state.showLastPage }
                    heat={ this.state.heat }
                    heatsCount={ this.heats_count }
                    hideHeatsButtons={ this.state.showLastPage }
                    judge={ this.props.disciplineJudge.judge }
                    maxHeat={ this.judging_position === null ? 1 : (this.first_non_confirmed_heat || this.heats_count) }
                    tour={ this.props.tour }
                    onFinishClick={ this.handleFinishClick }
                    onNextHeatClick={ this.handleNextHeatClick }
                    onPrevHeatClick={ this.handlePrevHeatClick }
                    onReturnClick={ this.handleReturnClick }
                />
                { this.renderBody() }
            </div>
        );
    }
}
