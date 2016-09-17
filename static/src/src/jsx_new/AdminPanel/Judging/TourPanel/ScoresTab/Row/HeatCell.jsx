import { Api } from "server/api";

export default class HeatCell extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            editing: PT.bool.isRequired,
            readOnly: PT.bool.isRequired,
            run: PT.shape({
                id: PT.number.isRequired,
                heat: PT.number.isRequired,
            }).isRequired,
            onEditRequest: PT.func.isRequired,
            onStopEditing: PT.func.isRequired,
        };
    }

    makeInputRef = (ref) => {
        if (ref && !this._input) {
            ref.select();
        }
        this._input = ref;
    }

    handleKeyUp = (event) => {
        if (event.keyCode === 13) { // Enter
            this.submit();
        } else if (event.keyCode === 27) { // Esc
            this.props.onStopEditing();
        }
    }
    handleStartEditing = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onEditRequest({
            type: "heat",
            run_id: this.props.run.id,
        });
    }

    submit() {
        let value = parseInt(this._input.value, 10);
        if (isNaN(value)) {
            value = 0;
        }
        Api("run.set", {
            run_id: this.props.run.id,
            data: {
                heat: value,
            },
        })
            .onSuccess(this.props.onStopEditing)
            .send();
    }

    render() {
        if (this.props.editing) {
            return (
                <td className="heat">
                    <input
                        className="input-heat"
                        defaultValue={ this.props.run.heat.toString() }
                        ref={ this.makeInputRef }
                        type="text"
                        onKeyUp={ this.handleKeyUp }
                    />
                </td>
            );
        } else {
            return (
                <td
                    className="heat"
                    onClick={ this.handleStartEditing }
                >
                    { this.props.run.heat }
                </td>
            );
        }
    }
}

HeatCell.displayName = "AdminPanel_Judging_TourPanel_ScoresTab_Row_HeatCell";
