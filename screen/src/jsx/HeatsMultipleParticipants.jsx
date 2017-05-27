import LoadingComponent from "LoadingComponent";

export default class HeatsMultipleParticipants extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                screen_data: PT.shape({
                    controls_state: PT.shape({
                        tour_id: PT.number.isRequired,
                        heat: PT.number,
                    }).isRequired,
                }).isRequired,
            }).isRequired,
        };
    }

    CLASS_ID = "screen_heat_mult_participants";
    API_MODELS = {
        tour: {
            model_type: "Tour",
            model_id_getter: props => props.competition.screen_data.controls_state.tour_id,
            schema: {
                discipline: {
                    discipline_judges: {},
                },
                runs: {
                    participant: {},
                    scores: {},
                },
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
        };
    }

    get controls() {
        return this.props.competition.screen_data.controls_state;
    }

    canShowScores(run) {
        const scores_map = new Map(run.scores.map(s => [s.discipline_judge_id, s]));
        for (const dj of this.state.tour.discipline.discipline_judges) {
            if (["dance_judge", "acro_judge"].indexOf(dj.role) >= 0 && !scores_map.get(dj.id).confirmed) {
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
        const score_class = this.canShowScores(run) ? "score" : "score hidden";
        const score = typeof run.verbose_total_score.primary_score !== "undefined"
            ? run.verbose_total_score.primary_score.toFixed(2)
            : "";
        return (
            <div className={ score_class }>
                { `Результат: ${score}` }
            </div>
        );
    }

    renderRun(run) {
        const class_name = run.performed ? "run" : "run hidden";
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
        if (this.controls.heat === null) {
            return null;
        }
        const runs = this.state.tour.runs.filter(r => r.heat === this.controls.heat);
        const two_rows = runs.length > 4;
        const class_name = two_rows ? "runs two-rows" : "runs";
        return (
            <div className={ class_name }>
                { runs.map(run => this.renderRun(run)) }
            </div>
        );
    }
    renderHeat() {
        if (this.controls.heat === null) {
            return null;
        }
        const num_heats = Math.max(...this.state.tour.runs.map(r => r.heat));
        return (
            <div className="heat">
                { `Заход ${this.controls.heat}/${num_heats}` }
            </div>
        );
    }
    render() {
        if (this.state.tour === null) {
            return this.renderEmpty();
        }
        return (
            <div className="HeatsMultipleParticipants">
                <div className="discipline-name">
                    { this.state.tour.discipline.name }
                </div>
                <div className="tour-name">
                    { this.state.tour.name }
                </div>
                { this.renderHeat() }
                { this.renderRuns() }
            </div>
        );
    }
}

HeatsMultipleParticipants.displayName = "HeatsMultipleParticipants";
