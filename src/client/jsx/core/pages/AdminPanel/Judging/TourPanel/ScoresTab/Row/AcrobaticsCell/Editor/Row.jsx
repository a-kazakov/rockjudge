import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import Api from "common/server/Api";
import PT from "prop-types";

export default class Row extends React.Component {
    static propTypes = {
        element: PT.instanceOf(Model).isRequired,
        readOnly: PT.bool.isRequired,
        run: PT.instanceOf(Model).isRequired,
    };
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
    }

    get has_override() {
        return (
            Math.abs(this.props.element.score - this.props.element.initial_score) > 1e-3
        );
    }

    makeInputRef = ref => {
        if (ref && !this._input) {
            ref.select();
        }
        this._input = ref;
    };

    handleReset = () => {
        Api("model/update", {
            model_name: "RunAcrobatic",
            model_id: this.props.element.id,
            data: { score: this.props.element.initial_score },
        }).send();
    };
    handleStartEditing = () => {
        this.setState({
            editing: true,
        });
    };
    handleInputKeyUp = event => {
        const code = event.keyCode || event.which;
        if (code === 13) {
            // Enter
            this.submit();
        } else if (code === 27) {
            // Esc
            this.stopEditing();
        }
    };

    submit() {
        let value = parseFloat(this._input.value.replace(",", "."));
        if (!Number.isFinite(value) || value < -1e-5) {
            return;
        }
        value = Math.round(value * 100) / 100;
        Api("model/update", {
            model_name: "RunAcrobatic",
            model_id: this.props.element.id,
            data: { score: value },
        })
            .onSuccess(this.stopEditing)
            .send();
    }
    stopEditing = () => {
        this.setState({
            editing: false,
        });
    };

    renderControls() {
        if (this.props.readOnly) {
            return null;
        }
        if (this.state.editing) {
            return (
                <td className="controls">
                    <input
                        className="edit-field"
                        defaultValue={this.props.element.score.toFixed(1)}
                        ref={this.makeInputRef}
                        type="text"
                        onKeyUp={this.handleInputKeyUp}
                    />
                </td>
            );
        }
        return (
            <td className="controls">
                {this.has_override ? (
                    <button className="reset-button" onClick={this.handleReset}>
                        {_("judging.buttons.reset_acrobatic_override")}
                    </button>
                ) : null}
                <button className="edit-button" onClick={this.handleStartEditing}>
                    {_("judging.buttons.edit_acrobatic_override")}
                </button>
            </td>
        );
    }
    render() {
        return (
            <tr>
                <td className="description">{this.props.element.description}</td>
                <td className="old-score">
                    {this.props.element.initial_score.toFixed(1)}
                </td>
                <td className="new-score">
                    {this.has_override ? this.props.element.score.toFixed(1) : null}
                </td>
                {this.renderControls()}
            </tr>
        );
    }
}
