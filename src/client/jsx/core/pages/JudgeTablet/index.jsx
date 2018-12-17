import React from "react";

import FullscreenButton from "common/components/FullscreenButton";
import Loader from "common/components/Loader";
import Storage from "common/server/Storage";
import CompetitionSubscription from "common/server/Storage/subscriptions/CompetitionSubscription";
import SplashScreen from "pages/JudgeTablet/SplashScreen";
import TourLoader from "pages/JudgeTablet/TourLoader";
import PT from "prop-types";
import { consoleError } from "common/logging";

export default class JudgeTablet extends React.Component {
    static propTypes = {
        competitionId: PT.number.isRequired,
        judgeId: PT.number.isRequired,
    };

    // Helpers

    static findJudgeActiveTour(judge) {
        for (const dj of judge.discipline_judges) {
            for (const tour of dj.discipline.tours) {
                if (tour.active) {
                    return [tour, dj];
                }
            }
        }
        return [null, null];
    }

    static checkHasActiveTour(competition) {
        for (const discipline of competition.disciplines) {
            for (const tour of discipline.tours) {
                if (tour.active) {
                    return true;
                }
            }
        }
        return false;
    }

    constructor(props) {
        super(props);
        this.state = {
            competitionStorage: null,
        };
    }

    componentDidMount() {
        this._storage = new Storage();
        this._storage
            .init(this.reload)
            .then(this.subscribe)
            .catch(consoleError);
    }

    subscribe = () => {
        this._competition_subscription = new CompetitionSubscription(
            this.props.competitionId,
        );
        this._storage
            .subscribe(this._competition_subscription)
            .then(this.updateCompetitionStorage)
            .catch(consoleError);
    };

    updateCompetitionStorage = competitionStorage => {
        this.setState({ competitionStorage });
    };
    reload = () => this.forceUpdate();

    // Rendering

    renderBody() {
        const judge = this.state.competitionStorage?.get("Judge", this.props.judgeId);
        if (!judge) {
            return <Loader />;
        }
        const [tour, discipline_judge] = this.constructor.findJudgeActiveTour(judge);
        const has_active_tours = this.constructor.checkHasActiveTour(judge.competition);
        if (tour == null) {
            return (
                <SplashScreen
                    hasActiveTours={has_active_tours}
                    judge={judge}
                    tour={tour}
                />
            );
        }
        return (
            <TourLoader disciplineJudge={discipline_judge} key={tour.id} tour={tour} />
        );
    }

    render() {
        return (
            <div className="JudgeTablet rules-set" key="outer">
                {this.renderBody()}
                <FullscreenButton />
            </div>
        );
    }
}
