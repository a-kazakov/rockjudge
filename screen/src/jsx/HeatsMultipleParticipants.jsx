import { Api, storage, message_dispatcher } from "HostModules";

export default class HeatsMultipleParticipants extends React.Component {
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

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
        };
    }

    componentWillMount() {
        this._message_dispatchers = [
            message_dispatcher.addListener("db_update", this.reloadFromStorage),
            message_dispatcher.addListener("reload_date", this.loadData),
        ];
        this.loadData();
    }
    componentWillReceiveProps(next_props) {
        if (next_props.competition.screen_data.controls_state.tour_id !== this.controls.tour_id) {
            this.setState({
                tour: null,
            });
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.competition.screen_data.controls_state.tour_id !== this.controls.tour_id) {
            this.loadData();
        }
    }
    componentWillUnmount() {
        for (const md of this._message_dispatchers) {
            message_dispatcher.removeListener(md);
        }
    }

    get SCHEMA() {
        return {
            discipline: {
                discipline_judges: {},
            },
            runs: {
                participant: {},
                scores: {},
            },
        }
    }

    loadData = () => {
        Api("tour.get", {
            tour_id: this.controls.tour_id,
            children: this.SCHEMA,
        })
            .addToDB("Tour", this.controls.tour_id, storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }
    reloadFromStorage = () => {
        const serialized = storage
            .get("Tour")
            .by_id(this.controls.tour_id)
            .serialize(this.SCHEMA);
        this.setState({
            tour: serialized,
        });
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
