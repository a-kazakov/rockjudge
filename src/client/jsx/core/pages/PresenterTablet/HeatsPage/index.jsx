import React from "react";

import _ from "l10n";
import TourHeats from "pages/PresenterTablet/HeatsPage/TourHeats";
import PT from "prop-types";
import NoTourScreen from "./NoTourScreen";

export default class HeatsPage extends React.Component {
    static propTypes = {
        competition: PT.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            autoHeat: true,
        };
    }

    handleAutoHeatCheckboxChange = event =>
        this.setState({ autoHeat: event.target.checked });

    getActiveTours() {
        let result = [];
        for (const discipline of this.props.competition.disciplines) {
            for (const tour of discipline.tours) {
                if (tour.active) {
                    result.push(tour);
                    if (result.length >= 4) {
                        return result;
                    }
                }
            }
        }
        return result;
    }
    renderTour(tour, layout) {
        return (
            <TourHeats
                autoHeat={this.state.autoHeat}
                key={tour.id}
                layout={layout}
                tour={tour}
            />
        );
    }
    renderTours(tours) {
        let layout = "small";
        switch (tours.length) {
            case 1:
                layout = "large";
                break;
            case 2:
                layout = "medium";
                break;
        }
        return tours.map(tour => this.renderTour(tour, layout));
    }
    render() {
        const tours = this.getActiveTours();
        if (tours.length === 0) {
            return <NoTourScreen />;
        }
        return (
            <div className="heats-page">
                <div className="tours">{this.renderTours(tours)}</div>
                <div className="autoheat-switch">
                    <label>
                        <input
                            checked={this.state.autoHeat}
                            type="checkbox"
                            onChange={this.handleAutoHeatCheckboxChange}
                        />
                        {_("presenter.labels.enable_auto_heat")}
                    </label>
                </div>
            </div>
        );
    }
}
