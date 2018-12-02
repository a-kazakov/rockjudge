import React from "react";

import FullscreenButton from "common/components/FullscreenButton"
import Loader from "common/components/Loader";
import Storage from "common/server/Storage";
import CompetitionSubscription from "common/server/Storage/subscriptions/CompetitionSubscription";
import PT from "prop-types";
import HeatsPage from "./HeatsPage";
import InfoPage from "./InfoPage";
import LeftBar from "./LeftBar";
import PlanPage from "./PlanPage";
import ResultsPage from "./ResultsPage";

export default class PresenterTablet extends React.Component {
    static propTypes = {
        competitionId: PT.number.isRequired,
    };

    // Intialization

    constructor(props) {
        super(props);
        this.state = {
            competitionStorage: null,
            page: "info",
        };
    }

    componentDidMount() {
        this._storage = new Storage();
        this._storage.init(this.reload).then(this.subscribe).catch(console.error.bind(console));
    }

    subscribe = () => {
        this._competition_subscription = new CompetitionSubscription(this.props.competitionId);
        this._storage.subscribe(this._competition_subscription)
            .then(this.updateCompetitionStorage)
            .catch(console.error.bind(console));
    };

    updateCompetitionStorage = (competitionStorage) => {
        this.setState({competitionStorage});
    };
    reload = () => this.forceUpdate();

    handlePageChange = (page) => this.setState({page});

    renderBody() {
        const competition = this.state.competitionStorage?.get("Competition", this.props.competitionId);
        if (!competition) {
            return (
                <Loader />
            );
        }
        switch (this.state.page) {
        case "info":
            return (
                <InfoPage
                    competition={ competition }
                />
            );
        case "heats":
            return (
                <HeatsPage
                    competition={ competition }
                    onHeatChange={ this.handleHeatChange }
                />
            );
        case "plan":
            return (
                <PlanPage
                    competition={ competition }
                />
            );
        case "results":
            return (
                <ResultsPage
                    competition={ competition }
                />
            );
        }
    }

    render() {
        return (
            <div className="PresenterTablet">
                <LeftBar
                    page={ this.state.page }
                    onPageChange={ this.handlePageChange }
                />
                <div className="content">
                    { this.renderBody() }
                </div>
                <FullscreenButton />
            </div>
        );
    }
}
