import _ from "l10n";
import Api from "common/server/Api";
import clone from "common/tools/clone";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";
import Loader from "common/components/Loader";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import ScreenManifest from "common/ScreenManifest";

import LeftCol from "./LeftCol";
import TourHeatControls from "./TourHeatControls";
import TourControls from "./TourControls";
import DisciplinePlaceControls from "./DisciplinePlaceControls";

export default class ScreenOperator extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionId: PT.number.isRequired,
            manifest: PT.object.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.manifest = new ScreenManifest(this.props.manifest)
        this.state = {
            competition: null,
            pendingData: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
    }

    get SCHEMA() {
        return {
            disciplines: {
                tours: {},
            },
        };
    }

    loadData() {
        Api("competition.get", {
            competition_id: this.props.competitionId,
            children: this.SCHEMA,
        })
            .addToDB("Competition", this.props.competitionId)
            .onSuccess(this.reloadFromStorage.bind(this))
            .send();
    }
    reloadFromStorage() {
        const s_competition = storage.get("Competition").by_id(this.props.competitionId);
        if (!s_competition) {
            return;
        }
        this.setState({
            competition: s_competition.serialize(this.SCHEMA),
        })
    }

    get data() {
        return this.state.pendingData || this.state.competition.screen_data;
    }

    handleDataSubmission = () => {
        if (!this.validatePendingData()) {
            return;
        }
        Api("competition.set", {
            competition_id: this.props.competitionId,
            data: {
                screen_data: this.state.pendingData,
            },
        })
            .onSuccess(this.handleDataReset)
            .send();
    }
    handleDataReset = () => {
        this.setState({
            pendingData: null,
        });
    }

    getDefaultControlsState(controls_type) {
        switch (controls_type) {
            case "none":
                return {}
            case "tour-heat":
                return {
                    tour_id: null,
                    heat: 1,
                }
            case "tour":
                return {
                    tour_id: null,
                }
            case "discipline-place":
                return {
                    discipline_id: null,
                    position: null,
                }
        }
    }
    updateData(updater) {
        let data = this.state.pendingData
            ? clone(this.state.pendingData)
            : clone(this.state.competition.screen_data);
        data = updater(data);
        this.setState({
            pendingData: data,
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
    }
    handleControlsStateChange = (new_value) => {
        this.updateData(data => {
            data.controls_state = new_value;
            return data;
        });
    }
    handleToggleFullScreen = () => {
        if (
            !window.document.fullscreenElement &&
            !window.document.mozFullScreenElement &&
            !window.document.webkitFullscreenElement
        ) {
            const node = ReactDOM.findDOMNode(this);
            if (node.requestFullscreen) {
                node.requestFullscreen();
            } else if (node.mozRequestFullScreen) {
                node.mozRequestFullScreen();
            } else if (node.msRequestFullscreen) {
                node.msRequestFullscreen();
            } else if (node.webkitRequestFullscreen) {
                node.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (node.webkitEnterFullscreen) {
                node.webkitEnterFullscreen();
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
            return this.state.pendingData.controls_state.tour_id !== null;
        case "discipline-place":
            return this.state.pendingData.controls_state.discipline_id !== null;
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
                        competition={ this.state.competition }
                        controlsState={ data.controls_state }
                        key={ data.screen_id }
                        onChange={ this.handleControlsStateChange }
                    />
                );
            case "tour":
                return (
                    <TourControls
                        competition={ this.state.competition }
                        controlsState={ data.controls_state }
                        key={ data.screen_id }
                        onChange={ this.handleControlsStateChange }
                    />
                );
            case "discipline-place":
                return (
                    <DisciplinePlaceControls
                        competition={ this.state.competition }
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
        if (this.state.competition === null) {
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

ScreenOperator.displayName = "ScreenOperator";
