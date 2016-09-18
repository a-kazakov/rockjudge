import _ from "l10n";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import DisciplineResults from "common/components/DisciplineResults";

import Renderer from "./Renderer";

export default class PlaceSelector extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineId: PT.number.isRequired,
            value: PT.number,
            onChange: PT.func.isRequired,
        };
    }

    handlePlaceReset = () => {
        this.props.onChange(null);
    }

    render() {
        if (this.props.disciplineId === null) {
            return null;
        }
        return (
            <div>
                <button
                    className="btn btn-sm btn-warning btn-reset-place"
                    type="button"
                    { ...onTouchEndOrClick(this.handlePlaceReset) }
                >
                    { _("screen_operator.buttons.reset_place") }
                </button>
                <DisciplineResults
                    disciplineId={ this.props.disciplineId }
                    key={ this.props.disciplineId }
                    renderer={ Renderer }
                    value={ this.props.value }
                    onPositionSelect={ this.props.onChange }
                />
            </div>
        );
    }
}

PlaceSelector.displayName = "ScreenOperator_DisciplinePlaceControls_PlaceSelector";
