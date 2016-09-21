import { Api, storage, message_dispatcher } from "HostModules";

export default class HeatsOneParticipant extends React.Component {
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
                participant: {
                    club: {},
                },
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
