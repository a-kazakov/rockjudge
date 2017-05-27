import LoadingComponent from "LoadingComponent";

export default class HeatsOneParticipant extends LoadingComponent {
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
            showScore: PT.bool,
        };
    }
    static get defaultProps() {
        return {
            showScore: true,
        };
    }

    CLASS_ID = "screen_heat_one_participant";
    API_MODELS = {
        tour: {
            model_type: "Tour",
            model_id_getter: props => props.competition.screen_data.controls_state.tour_id,
            schema: {
                discipline: {
                    discipline_judges: {},
                },
                runs: {
                    participant: {
                        club: {},
                    },
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
            <div className="HeatsOneParticipant" />
        );
    }
    renderResult(run) {
        if (!this.props.showScore) {
            return null;
        }
        const score_class = this.canShowScores(run) ? "score" : "score hidden";
        const score = run.verbose_total_score.primary_score
            ? run.verbose_total_score.primary_score.toFixed(2)
            : "";
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
        const run = this.state.tour.runs.find(r => r.heat === this.controls.heat);
        if (!run) {
            return null;
        }
        const num_heats = Math.max(...this.state.tour.runs.map(r => r.heat));
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
        if (this.state.tour === null) {
            return this.renderEmpty();
        }
        return (
            <div className="HeatsOneParticipant">
                <div className="discipline-name">
                    { this.state.tour.discipline.name }
                </div>
                <div className="tour-name">
                    { this.state.tour.name }
                </div>
                { this.renderRun() }
            </div>
        );
    }
}

HeatsOneParticipant.displayName = "HeatsOneParticipant";
