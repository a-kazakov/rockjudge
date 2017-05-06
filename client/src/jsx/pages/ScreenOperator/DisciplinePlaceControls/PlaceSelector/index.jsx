import _ from "l10n";
import onTouchEndOrClick from "tablet_ui/onTouchEndOrClick";

import Renderer from "./Renderer";

export default class PlaceSelector extends React.PureComponent {
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
                    className="reset-button"
                    type="button"
                    { ...onTouchEndOrClick(this.handlePlaceReset) }
                >
                    { _("screen_operator.buttons.reset_place") }
                </button>
                <Renderer
                    disciplineId={ this.props.disciplineId }
                    key={ this.props.disciplineId }
                    value={ this.props.value }
                    onPositionSelect={ this.props.onChange }
                />
            </div>
        );
    }
}

PlaceSelector.displayName = "ScreenOperator_DisciplinePlaceControls_PlaceSelector";
