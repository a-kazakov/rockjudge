import {React} from "HostModules";

import PT from "prop-types";

export default class HeatsMultipleParticipants extends React.Component {
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

    ensureCorrectTour() {
        if (!this.is_tour_loaded) {
            setTimeout(() => this.props.onActiveTourIdChange(this.controls.tour_id || null));
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
            <div className="HeatsMultipleParticipants" />
        );
    }
    renderResult(run) {
        if (!this.props.showScore) {
            return null;
        }
        const score_class = this.canShowScores(run) ? "score" : "score hidden";
        const score = run.tour.results.runs_results[run.id]?.total_score_str ?? "";
        return (
            <div className={ score_class }>
                { `Результат: ${score}` }
            </div>
        );
    }

    renderRun(run) {
        const class_name = run.status === "OK" ? "run" : "run hidden";
        const name = run.participant.formation_name === ""
            ? run.participant.sportsmen.map(s => `${s.last_name} ${s.first_name}`).join("\n")
            : run.participant.formation_name;
        return (
            <div className={ class_name } key={ run.id }>
                <div className="participant-number">
                    { run.participant.number }
                </div>
                <div className="participant-name">
                    { name }
                </div>
                { this.renderResult(run) }
            </div>
        );
    }
    renderRuns() {
        if (this.controls.heat == null) {
            return null;
        }
        const runs = this.props.activeTour.runs.filter(r => r.heat === this.controls.heat);
        const two_rows = runs.length >= 4;
        const class_name = two_rows ? "runs two-rows" : "runs";
        return (
            <div className={ class_name }>
                { runs.map(run => this.renderRun(run)) }
            </div>
        );
    }
    renderHeat() {
        if (this.controls.heat == null) {
            return null;
        }
        const num_heats = Math.max(0, ...this.props.activeTour.runs.map(r => r.heat));
        return (
            <div className="heat">
                { `Заход ${this.controls.heat}/${num_heats}` }
            </div>
        );
    }
    render() {
        if (!this.is_tour_loaded || this.props.activeTour == null) {
            return this.renderEmpty();
        }
        return (
            <div className="HeatsMultipleParticipants">
                <div className="discipline-name">
                    { this.props.activeTour.discipline.name }
                </div>
                <div className="tour-name">
                    { this.props.activeTour.name }
                </div>
                { this.renderHeat() }
                { this.renderRuns() }
            </div>
        );
    }
}
