import React from "react";

import PT from "prop-types";
import Api from "common/server/Api";

export default class HeatCell extends React.Component {
    static propTypes = {
        editing: PT.bool.isRequired,
        readOnly: PT.bool.isRequired,
        run: PT.shape({
            id: PT.number.isRequired,
            heat: PT.number.isRequired,
        }).isRequired,
        onEditRequest: PT.func.isRequired,
        onStopEditing: PT.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.run.heat.toString(),
        }
    }
    UNSAFE_componentWIllReceiveProps(next_props) {
        if (!this.props.editing && next_props.editing) {
            this.setState({
                inputValue: next_props.run.heat.toString(),
            });
        }
    }

    makeInputRef = (ref) => {
        if (ref && !this._input) {
            ref.select();
        }
        this._input = ref;
    }

    handleChange = (event) => {
        this.setState({
            inputValue: event.target.value.replace(/[^\d]/, ""),
        });
    }
    handleKeyUp = (event) => {
        if (event.keyCode === 13) { // Enter
            this.submit();
        } else if (event.keyCode === 27) { // Esc
            this.props.onStopEditing();
        }
    };
    handleStartEditing = () => {
        if (this.props.readOnly) {
            return;
        }
        this.props.onEditRequest({
            type: "heat",
            run_id: this.props.run.id,
        });
    };

    submit() {
        let value = parseInt(this._input.value, 10);
        if (isNaN(value)) {
            value = 0;
        }
        Api("model/update", {
            model_name: "Run",
            model_id: this.props.run.id,
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
                        ref={ this.makeInputRef }
                        value={ this.state.inputValue }
                        onChange={ this.handleChange }
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
