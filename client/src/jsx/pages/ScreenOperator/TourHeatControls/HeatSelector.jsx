import _ from "l10n";
import Api from "common/server/Api";
import Loader from "common/components/Loader";
import storage from "common/server/storage";
import message_dispatcher from "common/server/message_dispatcher";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import HeatSelectorRow from "./HeatSelectorRow";

export default class HeatSelector extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tourId: PT.number.isRequired,
            value: PT.number,
            onHeatSelect: PT.func.isRequired,
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
        if (this.props.tourId !== next_props.tourId) {
            this.setState({
                tour: null,
            });
            this.freeStorage(this.props.tourId);
            this.setupStorage(next_props.tourId);
        }
    }
    componentDidUpdate(prev_props) {
        if (prev_props.tourId !== this.props.tourId) {
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
            runs: {
                participant: {},
            },
        };
    }

    setupStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tourId;
        }
        this.storage = storage.getDomain(`heats_${tour_id}`);
    }
    freeStorage(tour_id=null) {
        if (tour_id === null) {
            tour_id = this.props.tourId;
        }
        storage.delDomain(`heats_${tour_id}`);
    }

    reloadFromStorage = () => {
        const s_tour = this.storage.get("Tour").by_id(this.props.tourId);
        if (!s_tour) {
            return null;
        }
        this.setState({
            tour: s_tour.serialize(this.SCHEMA),
        });
    }
    loadData = () => {
        Api("tour.get", {
            tour_id: this.props.tourId,
            children: this.SCHEMA,
        })
            .addToDB("Tour", this.props.tourId, this.storage)
            .onSuccess(this.reloadFromStorage)
            .send();
    }

    handleHeatReset = () => {
        this.props.onHeatSelect(null);
    }

    render() {
        if (this.state.tour === null) {
            return (
                <Loader />
            );
        }
        let result = [];
        const max_heat = Math.max(...this.state.tour.runs.map((run) => run.heat));
        for (let heat = 1; heat <= max_heat; ++heat) {
            result.push(
                <HeatSelectorRow
                    heat={ heat }
                    key={ heat }
                    runs={ this.state.tour.runs.filter((run) => run.heat === heat) }
                    selected={ this.props.value === heat }
                    onHeatSelect={ this.props.onHeatSelect }
                />
            )
        }
        return (
            <div className="heat-selector">
                <button
                    className="reset-button"
                    type="button"
                    { ...onTouchEndOrClick(this.handleHeatReset) }
                >
                    { _("screen_operator.buttons.reset_heat") }
                </button>
                { result }
            </div>
        );
    }
}

HeatSelector.displayName = "ScreenOperator_TourHeatControls_HeatSelector";
