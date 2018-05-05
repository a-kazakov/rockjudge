import _ from "l10n";

import SelectorInput from "tablet_ui/SelectorInput";
import NumberSelectorInput from "tablet_ui/NumberSelectorInput";
import MultipleOptionsInput from "tablet_ui/MultipleOptionsInput";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            scoreData: PT.shape({
                cross: PT.bool,
                note_number: PT.number,
                note_pics: PT.string.isRequired,
            }).isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    handleCrossChange = (value) => {
        this.props.onScoreUpdate("cross", value);
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
                        [false, "-", "active-red"],
                        [true, "X", "active-green"],
                    ] }
                    readOnly={ this.props.readOnly }
                    style="one-line"
                    value={ this.props.scoreData.cross }
                    onChange={ this.handleCrossChange }
                />
                <h3>{ _("tablet.dance_judge.notes") }</h3>
                <NumberSelectorInput
                    compact
                    max={ 5 }
                    min={ 1 }
                    readOnly={ this.props.readOnly }
                    style="one-line"
                    value={ this.props.scoreData.note_number }
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
                    value={ this.props.scoreData.note_pics }
                    onChange={ this.handlePicsChange }
                />
            </div>
        );
    }
}
