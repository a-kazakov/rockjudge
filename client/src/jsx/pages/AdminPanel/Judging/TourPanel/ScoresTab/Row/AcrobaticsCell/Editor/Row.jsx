import _ from "l10n";
import Api from "common/server/Api";

export default class Row extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            element: PT.shape({
                description: PT.string.isRequired,
                has_override: PT.bool.isRequired,
                original_score: PT.number.isRequired,
                score: PT.number.isRequired,
            }).isRequired,
            idx: PT.number.isRequired,
            readOnly: PT.bool.isRequired,
            run: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
    }

    makeInputRef = (ref) => {
        if (ref && !this._input) {
            ref.select();
        }
        this._input = ref;
    }

    handleReset = () => {
        Api("acrobatic_override.set", {
            run_id: this.props.run.id,
            acrobatic_idx: this.props.idx,
            score: null,
        })
            .send();
    }
    handleStartEditing = () => {
        this.setState({
            editing: true,
        })
    }
    handleInputKeyUp = (event) => {
        const code = event.keyCode || event.which;
        if (code === 13) { // Enter
            this.submit();
        } else if (code === 27) { // Esc
            this.stopEditing();
        }
    }

    submit() {
        let value = parseFloat(this._input.value.replace(",", "."));
        if (!Number.isFinite(value) || value < -1e-5) {
            return;
        }
        value = Math.round(value * 100) / 100;
        Api("acrobatic_override.set", {
            run_id: this.props.run.id,
            acrobatic_idx: this.props.idx,
            score: value,
        })
            .onSuccess(this.stopEditing)
            .send();
    }
    stopEditing = () => {
        this.setState({
            editing: false,
        });
    }

    renderControls() {
        if (this.props.readOnly) {
            return null;
        }
        if (this.state.editing) {
            return (
                <td className="controls">
                    <input
                        className="edit-field"
                        defaultValue={ this.props.element.score.toFixed(1) }
                        ref={ this.makeInputRef }
                        type="text"
                        onKeyUp={ this.handleInputKeyUp }
                    />
                </td>
            );
        }
        return (
            <td className="controls">
                { this.props.element.has_override ? (
                    <button
                        className="reset-button"
                        onClick={ this.handleReset }
                    >
                        { _("judging.buttons.reset_acrobatic_override") }
                    </button>
                ) : null }
                <button
                    className="edit-button"
                    onClick={ this.handleStartEditing }
                >
                    { _("judging.buttons.edit_acrobatic_override") }
                </button>
            </td>
        );
    }
    render() {
        return (
            <tr>
                <td className="description">{ this.props.element.description }</td>
                <td className="old-score">
                    { this.props.element.original_score.toFixed(1) }
                </td>
                <td className="new-score">
                    { this.props.element.has_override
                        ? this.props.element.score.toFixed(1)
                        : null }
                </td>
                { this.renderControls() }
            </tr>
        );
    }
}


Row.displayName = "AdminPanel_Judging_TourPanel_ScoresTab_Row_AcrobaticsCell_Editor_Row";
