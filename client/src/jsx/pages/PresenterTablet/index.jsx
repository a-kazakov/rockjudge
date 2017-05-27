import Api from "common/server/Api";
import websocket from "common/server/websocket";

import LoadingComponent from "common/server/LoadingComponent";
import FullscreenButton from "common/components/FullscreenButton"
import Loader from "common/components/Loader";

import HeatsPage from "./HeatsPage";
import InfoPage from "./InfoPage";
import LeftBar from "./LeftBar";
import PlanPage from "./PlanPage";
import ResultsPage from "./ResultsPage";

export default class PresenterTablet extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competitionId: PT.number.isRequired,
        };
    }

    CLASS_ID = "presenter_tablet";
    API_MODELS = {
        competition: {
            model_type: "Competition",
            model_id_getter: props => props.competitionId,
            schema: {
                clubs: {},
                disciplines: {
                    tours: {},
                },
                judges: {},
                plan: {},
            },
        },
    };


    constructor(props) {
        super(props);
        this.state = {
            page: "info",
            heat: 1,
            competition: null,
            activeTourId: null,
        };
    }

    componentDidMount() {
        super.componentDidMount();
        this.active_tours_update_listener = websocket.addListener("active_tours_update", this.handleActiveToursUpdateMessage);
        Api("competition.get_active_tours", { competition_id: this.props.competitionId })
            .onSuccess(this.handleActiveToursUpdate)
            .send();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
        websocket.removeListener(this.active_tours_update_listener);
    }

    handleActiveToursUpdate = (active_tours) => {
        const tour_info = active_tours[0] || null;
        const tour_id = tour_info && tour_info.tour_id;
        if (tour_id === this.state.activeTourId) {
            return;
        }
        this.setState({
            activeTourId: tour_id,
            heat: 1,
        });
    }
    handleActiveToursUpdateMessage = (data) => {
        const { competition_id, active_tours } = data;
        if (competition_id !== this.props.competitionId) {
            return;
        }
        this.handleActiveToursUpdate(active_tours);
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
                <FullscreenButton />
            </div>
        );
    }
}

PresenterTablet.displayName = "PresenterTablet";
