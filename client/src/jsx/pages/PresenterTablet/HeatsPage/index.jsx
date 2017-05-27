import LoadingComponent from "common/server/LoadingComponent";
import Loader from "common/components/Loader";

import CurrentHeat from "./CurrentHeat";
import Header from "./Header";
import NoTourScreen from "./NoTourScreen";

export default class HeatsPage extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            activeTourId: PT.number,
            heat: PT.number.isRequired,
            onHeatChange: PT.func.isRequired,
        };
    }

    CLASS_ID = "presenter_tablet_heats";
    API_MODELS = {
        tour: {
            model_type: "Tour",
            model_id_getter: props => props.activeTourId,
            schema: {
                discipline: {},
                runs: {
                    participant: {
                        "club": {},
                        "sportsmen": {},
                    },
                },
            },
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
        };
    }

    onIdChanged = () => {
        this.setState({
            heat: 1,
        });
    }

    handlePrevHeatClick = () => {
        this.props.onHeatChange(this.props.heat - 1);
    }
    handleNextHeatClick = () => {
        this.props.onHeatChange(this.props.heat + 1);
    }

    getHeatsCount() {
        return Math.max(1, ...this.state.tour.runs.map(run => run.heat));
    }

    render() {
        if (this.props.activeTourId === null) {
            return (
                <NoTourScreen />
            );
        }
        if (this.state.tour === null) {
            return (
                <div className="heats">
                    <Loader />
                </div>
            );
        }
        const heats_count = this.getHeatsCount();
        return (
            <div className="heats">
                <Header
                    heat={ this.props.heat }
                    maxHeat={ heats_count }
                    tour={ this.state.tour }
                    onNextHeatClick={ this.handleNextHeatClick }
                    onPrevHeatClick={ this.handlePrevHeatClick }
                />
                <CurrentHeat
                    heat={ this.props.heat }
                    maxHeat={ heats_count }
                    runs={ this.state.tour.runs.filter(run => run.heat === this.props.heat) }
                />
            </div>
        );
    }
}

HeatsPage.displayName = "PresenterTablet_HeatsPage";
