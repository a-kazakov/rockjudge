import { React } from "HostModules";

import PT from "prop-types";

import NumberSelectorInput from "tablet_ui/NumberSelectorInput";
import MultipleOptionsInput from "tablet_ui/MultipleOptionsInput";

const MULTIPLE_SELECT_CHOICES = [
    ["S", "♠", "active-green"],
    ["H", "♥", "active-red"],
    ["C", "♣", "active-white"],
    ["D", "♦", "active-yellow"],
];

export default class NotesSection extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    handleNumberChange = value => {
        this.props.onScoreUpdate(this.props.score.id, { note_number: value });
    };
    handlePicsChange = value => {
        this.props.onScoreUpdate(this.props.score.id, { note_pics: value });
    };

    render() {
        const { score, readOnly } = this.props;
        if (score == null || score.run.status !== "OK") {
            return null;
        }
        return (
            <div>
                <NumberSelectorInput
                    max={5}
                    min={1}
                    readOnly={readOnly}
                    rowSize={1}
                    style="grid"
                    value={score.data.note_number}
                    onChange={this.handleNumberChange}
                />
                <MultipleOptionsInput
                    choices={MULTIPLE_SELECT_CHOICES}
                    readOnly={readOnly}
                    rowSize={1}
                    style="grid"
                    value={score.data.note_pics}
                    onChange={this.handlePicsChange}
                />
            </div>
        );
    }
}
