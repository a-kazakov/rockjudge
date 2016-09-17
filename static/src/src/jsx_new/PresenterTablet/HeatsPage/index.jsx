import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { Loader } from "ui/components";

import CurrentHeat from "./CurrentHeat";
import Header from "./Header";
import NoTourScreen from "./NoTourScreen";

export default class HeatsPage extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            activeTourId: PT.number,
            heat: PT.number.isRequired,
            onHeatChange: PT.func.isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
        };
    }

    componentWillMount() {
        this.setupStorage();
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData);
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage);
        this.loadData();
    }
    componentWillReceiveProps(next_props) {
        if (this.props.activeTourId !== next_props.activeTourId) {
            this.setState({
                tour: null,
            });
            this.freeStorage(this.props.activeTourId);
            this.setupStorage(next_props.activeTourId);
            this.loadData();
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.activeTourId !== this.props.activeTourId) {
            this.loadData();
        }
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        this.freeStorage();
    }

    get SCHEMA() {
        return {
            discipline: {},
            runs: {
                participant: {
                    "club": {},
                    "sportsmen": {},
                },
            },
        };
    }

    setupStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.activeTourId;
        }
        this.storage = storage.getDomain(`heats_${tour_id}`);
    }
    freeStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.activeTourId;
        }
        storage.delDomain(`heats_${tour_id}`);
    }

    reloadFromStorage = () => {
        if (this.props.activeTourId === null) {
            return;
        }
        const s_tour = this.storage.get("Tour").by_id(this.props.activeTourId);
        const serialized = s_tour ? s_tour.serialize(this.SCHEMA) : null;
        this.setState({
            tour: serialized,
        });
    }
    loadData = () => {
        if (this.props.activeTourId === null) {
            return;
        }
        Api("tour.get", {
            tour_id: this.props.activeTourId,
            children: this.SCHEMA,
        })
            .addToDB("Tour", this.props.activeTourId, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }

    handlePrevHeatClick = () => {
        this.props.onHeatChange(this.props.heat - 1);
    }
    handleNextHeatClick = () => {
        this.props.onHeatChange(this.props.heat + 1);
    }

    getHeatsCount() {
        return Math.max(...this.state.tour.runs.map(run => run.heat));
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
