import Api from "common/server/Api";
import FullscreenButton from "common/components/FullscreenButton"
import Loader from "common/components/Loader";
import storage from "common/server/storage";
import websocket from "common/server/websocket";

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
        websocket.addListener("db_update", this.reloadFromStorage);
        websocket.addListener("reload_data", this.loadData);
        websocket.addListener("active_tours_update", this.handleActiveToursUpdate);
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

        Api("competition.get_active_tours", { competition_id: this.props.competitionId })
            .onSuccess((response) => this.handleActiveToursUpdate({
                competition_id: this.props.competitionId,
                active_tours: response,
            }))
            .send();
    }

    handleActiveToursUpdate = (data) => {
        const { competition_id, active_tours } = data;
        if (competition_id !== this.props.competitionId) {
            return;
        }
        const tour_info = active_tours[0] || null;
        const tour_id = tour_info && tour_info.tour_id;
        if (tour_id !== this.state.activeTourId) {
            this.setState({
                activeTourId: tour_id,
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
                <FullscreenButton />
            </div>
        );
    }
}

PresenterTablet.displayName = "PresenterTablet";
