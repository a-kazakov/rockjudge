import {React} from "HostModules";

import PT from "prop-types";
import SafeTimeout from "common/SafeTimeout";

export default class HeatsOneParticipant extends React.Component {
    static propTypes = {
        activeTour: PT.object,
        competition: PT.object.isRequired,
        showScore: PT.bool,
        onActiveTourIdChange: PT.func.isRequired,
    };
    static get defaultProps() {
        return {
            showScore: true,
        };
    }

    componentDidMount() {
        this.ensureCorrectTour();
    }
    componentDidUpdate() {
        this.ensureCorrectTour();
    }
    componentWillUnmount() {
        this.st.clear();
    }
    st = new SafeTimeout();

    ensureCorrectTour() {
        if (!this.is_tour_loaded) {
            this.st.setTimeout(() => this.props.onActiveTourIdChange(this.controls.tour_id || null));
        }
    }

    get controls() {
        return this.props.competition.screen_data.controls_state;
    }
    get is_tour_loaded() {
        return (this.props.activeTour?.id || null) === (this.controls.tour_id || null);
    }

    canShowScores(run) {
        const scores_map = new Map(run.scores.map(s => [s.discipline_judge_id, s]));
        for (const dj of this.props.activeTour.discipline.discipline_judges) {
            if (["dance_judge", "acro_judge"].includes(dj.role) && !scores_map.get(dj.id).confirmed) {
                return false;
            }
        }
        return true;
    }
    renderEmpty() {
        return (
            <div className="HeatsOneParticipant" />
        );
    }
    renderResult(run) {
        if (!this.props.showScore) {
            return null;
        }
        const score_class = this.canShowScores(run) ? "score" : "score hidden";
        const score = run.tour.results.runs_results[run.id]?.total_score_str || "";
        return (
            <div className={ score_class }>
                { `Результат: ${score}` }
            </div>
        );
    }
    renderRun() {
        if (!this.controls.heat) {
            return null;
        }
        const run = this.props.activeTour.runs.find(r => r.heat === this.controls.heat);
        if (!run) {
            return null;
        }
        const num_heats = Math.max(0, ...this.props.activeTour.runs.map(r => r.heat));
        return (
            <div className="run">
                <div className="heat">
                    { `Заход ${run.heat}/${num_heats}` }
                </div>
                <div className="participant-number">
                    { run.participant.number }
                </div>
                <div className="participant-name">
                    { run.participant.name }
                </div>
                <div className="participant-club-name">
                    { run.participant.club.name }
                </div>
                { this.renderResult(run) }
            </div>
        );
    }
    render() {
        if (!this.is_tour_loaded || this.props.activeTour == null) {
            return this.renderEmpty();
        }
        return (
            <div className="HeatsOneParticipant">
                <div className="discipline-name">
                    { this.props.activeTour.discipline.name }
                </div>
                <div className="tour-name">
                    { this.props.activeTour.name }
                </div>
                { this.renderRun() }
            </div>
        );
    }
}
