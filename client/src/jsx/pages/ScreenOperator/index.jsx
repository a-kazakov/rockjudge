import React from "react";

import FullscreenButton from "common/components/FullscreenButton"
import Loader from "common/components/Loader";
import ScreenManifest from "common/ScreenManifest";
import Api from "common/server/Api";
import Storage from "common/server/Storage";
import CompetitionSubscription from "common/server/Storage/subscriptions/CompetitionSubscription";
import clone from "common/tools/clone";
import _ from "l10n";
import PT from "prop-types";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";
import DisciplinePlaceControls from "./DisciplinePlaceControls";
import LeftCol from "./LeftCol";
import TourControls from "./TourControls";
import TourHeatControls from "./TourHeatControls";


export default class ScreenOperator extends React.Component {
    static propTypes = {
        competitionId: PT.number.isRequired,
        manifest: PT.object.isRequired,
    };

    // Intialization

    constructor(props) {
        super(props);
        this.state = {
            competitionStorage: null,
            pendingData: null,
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

    get competition() {
        return this.state.competitionStorage?.get("Competition", this.props.competitionId);
    }
    get data() {
        return this.state.pendingData || this.competition.screen_data;
    }
    get manifest() {
        return new ScreenManifest(this.props.manifest);
    }

    handleDataSubmission = () => {
        if (!this.validatePendingData()) {
            return;
        }
        Api("model/update", {
            model_name: "Competition",
            model_id: this.props.competitionId,
            data: {
                screen_data: this.state.pendingData,
            },
        })
            .onSuccess(this.handleDataReset)
            .send();
    };
    handleDataReset = () => {
        this.setState({
            pendingData: null,
        });
    };

    getDefaultControlsState(controls_type) {
        switch (controls_type) {
            case "none":
                return {};
            case "tour-heat":
                return {
                    tour_id: null,
                    heat: 1,
                };
            case "tour":
                return {
                    tour_id: null,
                };
            case "discipline-place":
                return {
                    discipline_id: null,
                    position: null,
                };
        }
    }
    updateData(updater) {
        this.setState({
            pendingData: updater(clone(this.data)),
        });
    }

    handleScreenChange = (new_id) => {
        this.updateData(data => {
            if (data.screen_id !== new_id) {
                const screen_data = this.manifest.getScreenDataById(new_id);
                const controls_type = screen_data.controls;
                data = {
                    screen_id: new_id,
                    controls_state: this.getDefaultControlsState(controls_type),
                };
            }
            return data;
        });
    };
    handleControlsStateChange = (new_value) => {
        this.updateData(data => {
            data.controls_state = new_value;
            return data;
        });
    };

    validatePendingData() {
        if (!this.state.pendingData) {
            return false;
        }
        const controls_type = this.manifest.getScreenDataById(this.state.pendingData.screen_id).controls;
        switch (controls_type) {
        case "none":
            return true;
        case "tour":
        case "tour-heat":
            return this.state.pendingData.controls_state.tour_id != null;
        case "discipline-place":
            return this.state.pendingData.controls_state.discipline_id != null;
        }
    }

    renderContols(data) {
        const controls_type = this.manifest.getScreenDataById(data.screen_id).controls;
        switch (controls_type) {
            case "none":
                return null
            case "tour-heat":
                return (
                    <TourHeatControls
                        competition={ this.competition }
                        controlsState={ data.controls_state }
                        key={ data.screen_id }
                        onChange={ this.handleControlsStateChange }
                    />
                );
            case "tour":
                return (
                    <TourControls
                        competition={ this.competition }
                        controlsState={ data.controls_state }
                        key={ data.screen_id }
                        onChange={ this.handleControlsStateChange }
                    />
                );
            case "discipline-place":
                return (
                    <DisciplinePlaceControls
                        competition={ this.competition }
                        controlsState={ data.controls_state }
                        key={ data.screen_id }
                        onChange={ this.handleControlsStateChange }
                    />
                );
        }
    }
    renderButtons() {
        if (!this.state.pendingData) {
            return null;
        }
        return (
            <div className="buttons">
                <button
                    className="discard-button"
                    type="button"
                    { ...onTouchEndOrClick(this.handleDataReset) }
                >
                    { _("global.buttons.discard") }
                </button>
                <button
                    className="submit-button"
                    disabled={ !this.validatePendingData() }
                    type="button"
                    { ...onTouchEndOrClick(this.handleDataSubmission) }
                >
                    { _("global.buttons.submit") }
                </button>
            </div>
        );
    }

    render() {
        if (!this.competition) {
            return (
                <Loader />
            );
        }
        const data = this.data;
        return (
            <div className="ScreenOperator">
                <LeftCol
                    activeScreenId={ data.screen_id }
                    manifest={ this.manifest }
                    onScreenChange={ this.handleScreenChange }
                />
                <div className="body">
                    <div className="controls">
                        { this.renderContols(data) }
                    </div>
                    { this.renderButtons() }
                </div>
                <FullscreenButton />
            </div>
        );
    }
}
