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
            activeTourId: PT.number,
            hasActiveTours: PT.bool.isRequired,
        };
    }

    CLASS_ID = "judge_tablet";
    API_MODELS = {
        judge: {
            model_type: "Judge",
            model_id_getter: props => props.judgeId,
            schema: {
                competition: {},
            },
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
                    hasActiveTours={ this.props.hasActiveTours }
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
