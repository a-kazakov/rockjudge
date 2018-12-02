import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import SelectorInput from "tablet_ui/SelectorInput";
import NumberSelectorInput from "tablet_ui/NumberSelectorInput";
import MultipleOptionsInput from "tablet_ui/MultipleOptionsInput";

export default class ScoringLayout extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    handleCrossChange = () => {
        this.props.onScoreUpdate("cross", !this.props.score.data.cross);
    };
    handleNumberChange = (value) => {
        this.props.onScoreUpdate("note_number", value);
    };
    handlePicsChange = (value) => {
        this.props.onScoreUpdate("note_pics", value);
    };

    render() {
        return (
            <div>
                <SelectorInput
                    jumbo
                    choices={ [
                        [true, "X", "active-green"],
                    ] }
                    readOnly={ this.props.readOnly }
                    style="one-line"
                    value={ this.props.score.data.cross }
                    onChange={ this.handleCrossChange }
                />
                <h3>{ _("tablet.dance_judge.notes") }</h3>
                <NumberSelectorInput
                    compact
                    max={ 5 }
                    min={ 1 }
                    readOnly={ this.props.readOnly }
                    style="one-line"
                    value={ this.props.score.data.note_number }
                    onChange={ this.handleNumberChange }
                />
                <MultipleOptionsInput
                    compact
                    choices={ [
                        ["S", "♠", "active-green"],
                        ["H", "♥", "active-red"],
                        ["C", "♣", "active-white"],
                        ["D", "♦", "active-yellow"],
                    ] }
                    readOnly={ this.props.readOnly }
                    style="one-line"
                    value={ this.props.score.data.note_pics }
                    onChange={ this.handlePicsChange }
                />
            </div>
        );
    }
}