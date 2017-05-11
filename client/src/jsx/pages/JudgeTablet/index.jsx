import Api from "common/server/Api";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";
import FullscreenButton from "common/components/FullscreenButton"
import Loader from "common/components/Loader";

import SplashScreen from "./SplashScreen";

import rules_set from "rules_sets/loader";

export default class JudgeTablet extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            judgeId: PT.number.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            judge: null,
            tour: null,
            disciplineJudge: null,
        };
        this._current_active_tour_id = null;
    }

    componentDidMount() {
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData);
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage);
        this.active_tours_update_listener = message_dispatcher.addListener("active_tours_update", this.handleActiveToursUpdate);
        this.loadData();
    }

    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        message_dispatcher.removeListener(this.active_tours_update_listener);
    }

    get TOUR_SCHEMA() {
        return {
            results: {},
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
    }

    get JUDGE_SCHEMA() {
        return {
            competition: {},
        }
    }

    updateStorage(old_tour_id, new_tour_id) {
        if (old_tour_id !== null) {
            storage.delDomain(`judge_tablet_${old_tour_id}`);
        }
        if (new_tour_id !== null) {
            this.tour_storage = storage.getDomain(`judge_tablet_${new_tour_id}`);
        }
    }

    handleActiveToursUpdate = (data) => {
        const { competition_id, active_tours } = data;
        if (this.state.judge === null || competition_id !== this.state.judge.competition.id) {
            return;
        }
        const tour_info = active_tours[0] || null;
        const tour_id = tour_info && tour_info.tour_id;
        if (tour_id === this._current_active_tour_id) {
            return;
        }
        this.updateStorage(this._current_active_tour_id, tour_id);
        this._current_active_tour_id = tour_id;
        if (tour_id !== null) {
            this.loadTourData();
        }
        this.setState({
            disciplineJudge: null,
            tour: null,
        });
    }

    loadTourData() {
        if (this._current_active_tour_id === null) {
            return;
        }
        Api("tour.get", {
            tour_id: this._current_active_tour_id,
            children: this.TOUR_SCHEMA,
        })
            .addToDB("Tour", this._current_active_tour_id, this.tour_storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }

    getJudgeFromStorage() {
        const st_judge = storage.get("Judge").by_id(this.props.judgeId)
        if (!st_judge) {
            return null;
        }
        return st_judge.serialize(this.JUDGE_SCHEMA);
    }

    getTourFromStorage() {
        if (!this._current_active_tour_id || !this.tour_storage) {
            return null;
        }
        const st_tour = this.tour_storage.get("Tour").by_id(this._current_active_tour_id);
        if (!st_tour) {
            return null;
        }
        return st_tour.serialize(this.TOUR_SCHEMA);
    }

    getDisciplineJudgeFromTour(tour) {
        if (tour === null) {
            return null;
        }
        return tour.discipline.discipline_judges.find(
            dj => dj.judge.id === this.props.judgeId
        ) || null;
    }

    reloadFromStorage = () => {
        const judge = this.getJudgeFromStorage();
        const tour = this.getTourFromStorage();
        const disciplineJudge = this.getDisciplineJudgeFromTour(tour);
        this.setState({ judge, tour, disciplineJudge });
    }

    loadData = () => {
        Api("judge.get", {
            judge_id: this.props.judgeId,
            children: this.JUDGE_SCHEMA,
        })
            .addToDB("Judge", this.props.judgeId)
            .onSuccess(() => {
                this.reloadFromStorage();
                Api("competition.get_active_tours", {
                    competition_id: this.state.judge.competition.id,
                })
                    .onSuccess((response) => this.handleActiveToursUpdate({
                        competition_id: this.state.judge.competition.id,
                        active_tours: response,
                    }))
                    .send();
            })
            .send();
    }

    // Rendering

    renderBody() {
        if (this.state.judge === null) {
            return (
                <Loader />
            );
        }
        if (this.state.tour === null || this.state.disciplineJudge === null) {
            return (
                <SplashScreen
                    judge={ this.state.judge }
                    tour={ this.state.tour }
                />
            );
        }
        const JudgeTabletComponent = rules_set.judge_tablet;
        return (
            <JudgeTabletComponent
                disciplineJudge={ this.state.disciplineJudge }
                tour={ this.state.tour }
            />
        );
    }
    render() {
        return (
            <div className="JudgeTablet rules-set" key="outer">
                { this.renderBody() }
                <FullscreenButton />
            </div>
        );
    }
}

JudgeTablet.displayName = "JudgeTablet";
