import _ from "l10n";
import Loader from "common/components/Loader";
import LoadingComponent from "common/server/LoadingComponent";

import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import HeatSelectorRow from "./HeatSelectorRow";

export default class HeatSelector extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tourId: PT.number.isRequired,
            value: PT.number,
            onHeatSelect: PT.func.isRequired,
        };
    }

    CLASS_ID = "screen_operator_heat_selector";
    API_MODELS = {
        tour: {
            model_type: "Tour",
            model_id_getter: props => props.tourId,
            schema: {
                runs: {
                    participant: {},
                },
            }
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            tour: null,
        };
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
