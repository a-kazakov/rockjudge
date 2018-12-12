import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import SideMenu from "./SideMenu";
import TourPanel from "./TourPanel";

export default class Judging extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
    };

    static getTourIdFromHash() {
        let chunks = window.location.hash.substr(1).split("/");
        if (chunks[1] && /^\d+$/.test(chunks[1])) {
            return Number(chunks[1]);
        }
        return null;
    }

    constructor(props) {
        super(props);
        this.state = {
            activeTourId: this.constructor.getTourIdFromHash(),
        };
    }

    getActiveTour() {
        if (this.state.activeTourId == null) {
            return null;
        }
        return this.props.competition.subscription_storage.get(
            "Tour",
            this.state.activeTourId,
        );
    }

    handleActiveTourChange = activeTourId => {
        this.setState({ activeTourId });
        window.location.hash = `#judging/${activeTourId}`;
    };

    renderTourPanel() {
        const tour = this.getActiveTour();
        if (!tour) {
            return null;
        }
        return <TourPanel key={tour.id} tour={tour} />;
    }
    render() {
        return (
            <div className="Judging">
                <SideMenu
                    activeTourId={this.state.activeTourId}
                    competition={this.props.competition}
                    onActiveTourChange={this.handleActiveTourChange}
                />
                {this.renderTourPanel()}
            </div>
        );
    }
}
