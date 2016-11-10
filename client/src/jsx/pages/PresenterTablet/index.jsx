import Api from "common/server/Api";
import Loader from "common/components/Loader";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import HeatsPage from "./HeatsPage";
import InfoPage from "./InfoPage";
import LeftBar from "./LeftBar";
import PlanPage from "./PlanPage";
import ResultsPage from "./ResultsPage";

export default class PresenterTablet extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionId: PT.number.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            page: "info",
            heat: 1,
            competition: null,
            activeTourId: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage);
        message_dispatcher.addListener("reload_data", this.loadData);
        message_dispatcher.addListener("active_tour_update", this.handleActiveTourUpdate);
        this.loadData();
    }

    get SCHEMA() {
        return {
            clubs: {},
            disciplines: {
                tours: {},
            },
            judges: {},
            plan: {},
        };
    }

    reloadFromStorage = () => {
        const competition = storage.get("Competition")
            .by_id(this.props.competitionId)
            .serialize(this.SCHEMA)
        this.setState({
            competition: competition,
        });
    }
    loadData = () => {
        Api("competition.get", {
            competition_id: this.props.competitionId,
            children: this.SCHEMA,
        })
            .addToDB("Competition", this.props.competitionId)
            .onSuccess(this.reloadFromStorage)
            .send();

        Api("tour.find_active", {})
            .onSuccess(this.handleActiveTourUpdate)
            .send();
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
    handleActiveTourUpdate = (data) => {
        if (data.tour_id !== this.state.activeTourId) {
            this.setState({
                activeTourId: data.tour_id,
                heat: 1,
            })
        }
    }

    handleHeatChange = (heat) => this.setState({ heat });
    handlePageChange = (page) => this.setState({ page });

    renderBody() {
        if (this.state.competition === null) {
            return (
                <Loader />
            );
        }
        switch (this.state.page) {
        case "info":
            return (
                <InfoPage
                    competition={ this.state.competition }
                />
            );
        case "heats":
            return (
                <HeatsPage
                    activeTourId={ this.state.activeTourId }
                    heat={ this.state.heat }
                    onHeatChange={ this.handleHeatChange }
                />
            );
        case "plan":
            return (
                <PlanPage
                    competition={ this.state.competition }
                />
            );
        case "results":
            return (
                <ResultsPage
                    competition={ this.state.competition }
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

PresenterTablet.displayName = "PresenterTablet";
