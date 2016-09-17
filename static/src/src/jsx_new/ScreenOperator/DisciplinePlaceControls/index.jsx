import { _ } from "l10n/loader";

import DisciplineSelector from "./DisciplineSelector";
import PlaceSelector from "./PlaceSelector";

export default class DisciplinePlaceControls extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.object.isRequired,
            controlsState: PT.shape({
                discipline_id: PT.number,
                position: PT.number,
            }).isRequired,
            onChange: PT.func.isRequired,
        };
    }

    handleDisciplineChange = (new_value) => {
        let new_state = Object.assign({}, this.props.controlsState);
        new_state.discipline_id = new_value;
        new_state.position = null;
        this.props.onChange(new_state);
    }
    handlePlaceChange = (new_value) => {
        let new_state = Object.assign({}, this.props.controlsState);
        new_state.position = new_value;
        this.props.onChange(new_state);
    }

    renderPlaceSelector() {
        if (this.props.controlsState.discipline_id === null) {
            return null;
        }
        return (
            <div>
                <h3>
                    { _("screen_operator.headers.places") }
                </h3>
                <PlaceSelector
                    disciplineId={ this.props.controlsState.discipline_id }
                    value={ this.props.controlsState.position }
                    onChange={ this.handlePlaceChange }
                />
            </div>
        );
    }
    render() {
        return (
            <div>
                <h3>
                    { _("screen_operator.headers.discipline") }
                </h3>
                <DisciplineSelector
                    competition={ this.props.competition }
                    value={ this.props.controlsState.discipline_id }
                    onChange={ this.handleDisciplineChange }
                />
                { this.renderPlaceSelector() }
            </div>
        );
    }
}

DisciplinePlaceControls.displayName = "ScreenOperator_DisciplinePlaceControls";
