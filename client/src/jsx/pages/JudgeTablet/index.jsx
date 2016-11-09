import Api from "common/server/Api";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";
import Loader from "common/components/Loader";

import SplashScreen from "./SplashScreen";

import rules_set from "rules_sets/loader";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

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
        this.active_tour_update_listener = message_dispatcher.addListener("active_tour_update", this.handleActiveTourUpdate);
        this.loadData();
    }

    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        message_dispatcher.removeListener(this.active_tour_update_listener);
        this.freeStorage();
    }

    get TOUR_SCHEMA() {
        return {
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

    handleActiveTourUpdate = (data) => {
        const { tour_id } = data;
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
            .send()
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
            .onSuccess(this.reloadFromStorage)
            .send();

        Api("tour.find_active", {})
            .onSuccess(this.handleActiveTourUpdate)
            .send();
    }

    // Rendering

    handleToggleFullScreen = () => {
        if (
            !window.document.fullscreenElement &&
            !window.document.mozFullScreenElement &&
            !window.document.webkitFullscreenElement
        ) {
            if (ReactDOM.findDOMNode(this).requestFullscreen) {
                ReactDOM.findDOMNode(this).requestFullscreen();
            } else if (ReactDOM.findDOMNode(this).mozRequestFullScreen) {
                ReactDOM.findDOMNode(this).mozRequestFullScreen();
            } else if (ReactDOM.findDOMNode(this).msRequestFullscreen) {
                ReactDOM.findDOMNode(this).msRequestFullscreen();
            } else if (ReactDOM.findDOMNode(this).webkitRequestFullscreen) {
                ReactDOM.findDOMNode(this).webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (ReactDOM.findDOMNode(this).webkitEnterFullscreen) {
                ReactDOM.findDOMNode(this).webkitEnterFullscreen();
            }
        } else {
            if (window.document.cancelFullScreen) {
                window.document.cancelFullScreen();
            } else if (window.document.mozCancelFullScreen) {
                window.document.mozCancelFullScreen();
            } else if (window.document.msCancelFullScreen) {
                window.document.msCancelFullScreen();
            } else if (window.document.webkitCancelFullScreen) {
                window.document.webkitCancelFullScreen();
            }
        }
    }

    render() {
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
            <div className="JudgeTablet rules-set">
                <JudgeTabletComponent
                    disciplineJudge={ this.state.disciplineJudge }
                    tour={ this.state.tour }
                />
                <div
                    className="btn-fullscreen"
                    { ...onTouchEndOrClick(this.handleToggleFullScreen) }
                >
                    <div />
                </div>
            </div>
        );
    }
}

JudgeTablet.displayName = "JudgeTablet";
