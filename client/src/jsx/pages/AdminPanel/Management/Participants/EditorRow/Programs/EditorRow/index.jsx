import React from "react";

import closeDialog from "common/dialogs/closeDialog";
import showError from "common/dialogs/showError";
import showInput from "common/dialogs/showInput";
import makeClassName from "common/makeClassName";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import Elements from "./Elements";

export default class EditorRow extends React.Component {
    static propTypes = {
        creating: PT.bool.isRequired,
        entry: PT.instanceOf(Model),
        formData: PT.shape({
            name: PT.string.isRequired,
            default_for: PT.string.isRequired,
            elements: PT.arrayOf(
                PT.object.isRequired,
            ).isRequired,
        }).isRequired,
        loading: PT.bool.isRequired,
        onDiscard: PT.func.isRequired,
        onFieldChange: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    handleNameChange = (event) => this.props.onFieldChange("name", event.target.value);
    handleDefaultForChange = (event) => this.props.onFieldChange("default_for", event.target.value);
    handleElementsChange = (value) => this.props.onFieldChange("elements", value);
    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit();
    };
    handleLoadAcrobatics = () => {
        showInput(
            _("admin.headers.load_acrobatics"),
            _("admin.labels.paste_acro"),
            value => {
                try {
                    const data = JSON.parse(value);
                    this.handleElementsChange(
                        data.map(e => ({
                            description: e[0] || "",
                            score: e[1] || "",
                        }))
                    );
                    closeDialog();
                }
                catch (ex) {
                    showError(_("errors.admin.load_syntax_error"));
                }
            }
        );
    };

    getClassName() {
        return makeClassName({
            "program-editor": true,
            "create": this.props.creating,
        });
    }
    render() {
        return (
            <form
                className={ this.getClassName() }
                onSubmit={ this.handleSubmission }
            >
                <input
                    className="name"
                    disabled={ this.props.loading }
                    placeholder={ _("models.program.name") }
                    value={ this.props.formData.name }
                    onChange={ this.handleNameChange }
                />
                <input
                    className="default-for"
                    disabled={ this.props.loading }
                    placeholder={ _("models.program.default_for") }
                    value={ this.props.formData.default_for }
                    onChange={ this.handleDefaultForChange }
                />
                <Elements
                    loading={ this.props.loading }
                    value={ this.props.formData.elements }
                    onChange={ this.handleElementsChange }
                />
                <button
                    className="load-button"
                    type="button"
                    onClick={ this.handleLoadAcrobatics }
                >
                    { _("admin.buttons.load_acro") }
                </button>
                <button
                    className="submit-button"
                    disabled={ this.props.loading }
                >
                    { _("global.buttons.submit") }
                </button>
                <button
                    className="discard-button"
                    disabled={ this.props.loading }
                    type="button"
                    onClick={ this.props.onDiscard }
                >
                    { _("global.buttons.discard") }
                </button>
            </form>
        );
    }
}
