import LoadingComponent from "common/server/LoadingComponent";
import FullscreenButton from "common/components/FullscreenButton"
import Loader from "common/components/Loader";

import SplashScreen from "./SplashScreen";

import rules_set from "rules_sets/loader";

export default class JudgeTablet extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            judgeId: PT.number.isRequired,
            activeTourId: PT.number.isRequired,
        };
    }

    CLASS_ID = "judge_tablet";
    API_MODELS = {
        judge: {
            model_type: "Judge",
            model_id_getter: props => props.judgeId,
            schema: {
                competition: {},
            }
        },
        tour: {
            model_type: "Tour",
            model_id_getter: props => props.activeTourId,
            schema: {
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
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            judge: null,
            tour: null,
            disciplineJudge: null,
        };
    }

    getDisciplineJudgeFromTour(tour) {
        if (tour === null) {
            return null;
        }
        return tour.discipline.discipline_judges.find(
            dj => dj.judge.id === this.props.judgeId
        ) || null;
    }

    getAdditionalStateUpdate(next_state) {
        return {
            disciplineJudge: next_state.tour &&
                             this.getDisciplineJudgeFromTour(next_state.tour),
        };
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