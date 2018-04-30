import Api from "common/server/Api";
import websocket from "common/server/websocket";

import MainComponent from "./MainComponent";

export default class JudgeTablet extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            judgeId: PT.number.isRequired,
            competitionId: PT.number.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            activeTourId: null,
            hasActiveTours: false,
        };
    }

    componentDidMount() {
        this.active_tours_update_listener = websocket.addListener("active_tours_update", this.handleActiveToursUpdateMessage);
        Api("competition.get_active_tours", { competition_id: this.props.competitionId })
            .onSuccess(this.handleActiveToursUpdate)
            .send();
    }

    componentWillUnmount() {
        websocket.removeListener(this.active_tours_update_listener);
    }

    handleActiveToursUpdate = (active_tours) => {
        const tour_info = active_tours.find(ti => ti.judges.includes(this.props.judgeId)) || null;
        const tour_id = tour_info?.tour_id || null;
        this.setState({
            activeTourId: tour_id,
            hasActiveTours: active_tours.length > 0,
        });
    };
    handleActiveToursUpdateMessage = (data) => {
        const { competition_id, active_tours } = data;
        if (competition_id !== this.props.competitionId) {
            return;
        }
        this.handleActiveToursUpdate(active_tours);
    };

    // Rendering

    render() {
        return (
            <MainComponent
                activeTourId={ this.state.activeTourId }
                hasActiveTours={ this.state.hasActiveTours }
                { ...this.props }
            />
        );
    }
}

JudgeTablet.displayName = "JudgeTablet";
