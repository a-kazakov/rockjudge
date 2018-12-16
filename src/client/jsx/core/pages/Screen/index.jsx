import React from "react";

import ScreenManifest from "common/ScreenManifest";
import Storage from "common/server/Storage";
import CompetitionSubscription from "common/server/Storage/subscriptions/CompetitionSubscription";
import TourSubscription from "common/server/Storage/subscriptions/TourSubscription";
import PT from "prop-types";

import loader from "./loader";
import SafeTimeout from "common/SafeTimeout";

export default class Screen extends React.Component {
    static propTypes = {
        competitionId: PT.number.isRequired,
        manifest: PT.object.isRequired,
    };

    state = {
        competitionStorage: null,
        tourStorage: null,
        activeTourId: null,
    };

    componentDidMount() {
        this._storage = new Storage();
        this._storage
            .init(this.reload)
            .then(this.subscribe)
            .catch(console.error.bind(console));
    }
    componentWillUnmount() {
        this.st.clear();
    }
    st = new SafeTimeout();

    subscribe = () => {
        this._competition_subscription = new CompetitionSubscription(
            this.props.competitionId,
        );
        this._storage
            .subscribe(this._competition_subscription)
            .then(this.updateCompetitionStorage)
            .catch(console.error.bind(console));
    };

    subscribeTour = tour_id => {
        this._tour_subscription = new TourSubscription(tour_id);
        this._storage.subscribe(this._tour_subscription).then(this.updateTourStorage);
    };
    unsubscribeTour() {
        this._storage.unsubscribe(this._tour_subscription);
    }

    updateCompetitionStorage = competitionStorage => {
        this.setState({ competitionStorage });
    };
    updateTourStorage = tourStorage => {
        this.setState({ tourStorage });
    };

    reload = () => this.forceUpdate();

    handleActiveTourIdChange = next_tour_id => {
        if (this.state.activeTourId === next_tour_id) {
            return;
        }
        if (this.state.activeTourId != null) {
            this.unsubscribeTour(this.state.activeTourId);
        }
        if (next_tour_id != null) {
            this.subscribeTour(next_tour_id);
        }
        this.setState({ activeTourId: next_tour_id });
    };

    get manifest() {
        return new ScreenManifest(this.props.manifest);
    }

    render() {
        const competition = this.state.competitionStorage?.get(
            "Competition",
            this.props.competitionId,
        );
        if (!competition) {
            return <div />;
        }
        if (!loader.loaded) {
            this.st.setTimeout(() => this.forceUpdate(), 1000);
            return <div />;
        }
        const RenderingComponent = loader.component;
        return (
            <RenderingComponent
                activeTour={
                    this.state.tourStorage?.get("Tour", this.state.activeTourId) || null
                }
                competition={competition}
                onActiveTourIdChange={this.handleActiveTourIdChange}
            />
        );
    }
}
