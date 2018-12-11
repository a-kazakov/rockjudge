import React from "react";

import _ from "l10n";
import PT from "prop-types";
import makeClassName from "common/makeClassName";

export default class EditorRow extends React.Component {
    static propTypes = {
        creating: PT.bool.isRequired,
        formData: PT.shape({
            number: PT.string.isRequired,
            category: PT.string.isRequired,
            name: PT.string.isRequired,
            role_description: PT.string.isRequired,
            external_id: PT.string.isRequired,
            sp: PT.string.isRequired,
        }).isRequired,
        loading: PT.bool.isRequired,
        onDiscard: PT.func.isRequired,
        onFieldChange: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    handleNumberChange = event =>
        this.props.onFieldChange("number", event.target.value);
    handleCategoryChange = event =>
        this.props.onFieldChange("category", event.target.value);
    handleNameChange = event => this.props.onFieldChange("name", event.target.value);
    handleRoleDescriptionChange = event =>
        this.props.onFieldChange("role_description", event.target.value);
    handleExternalIdChange = event =>
        this.props.onFieldChange("external_id", event.target.value);
    handleSpChange = event => this.props.onFieldChange("sp", event.target.value);
    handleSubmission = event => {
        event.preventDefault();
        this.props.onSubmit();
    };

    getClassName() {
        return makeClassName({
            editor: true,
            create: this.props.creating,
        });
    }
    renderButtons() {
        return (
            <div className="buttons vertical">
                <button disabled={this.props.loading} type="submit">
                    {_("global.buttons.submit")}
                </button>
                <button
                    disabled={this.props.loading}
                    type="button"
                    onClick={this.props.onDiscard}
                >
                    {_("global.buttons.discard")}
                </button>
            </div>
        );
    }
    render() {
        return (
            <tr className={this.getClassName()}>
                <td colSpan="5">
                    <form onSubmit={this.handleSubmission}>
                        <div className="col-2">
                            <label className="full-width">
                                {_("models.judge.number")}
                                <input
                                    disabled={this.props.loading}
                                    value={this.props.formData.number}
                                    onChange={this.handleNumberChange}
                                />
                            </label>
                        </div>
                        <div className="col-2">
                            <label className="full-width">
                                {_("models.judge.category")}
                                <input
                                    disabled={this.props.loading}
                                    value={this.props.formData.category}
                                    onChange={this.handleCategoryChange}
                                />
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="full-width">
                                {_("models.judge.name")}
                                <input
                                    disabled={this.props.loading}
                                    value={this.props.formData.name}
                                    onChange={this.handleNameChange}
                                />
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="full-width">
                                {_("models.judge.role_description")}
                                <input
                                    disabled={this.props.loading}
                                    value={this.props.formData.role_description}
                                    onChange={this.handleRoleDescriptionChange}
                                />
                            </label>
                        </div>
                        <div className="col-3">
                            <label className="full-width">
                                {_("models.judge.external_id")}
                                <input
                                    disabled={this.props.loading}
                                    value={this.props.formData.external_id}
                                    onChange={this.handleExternalIdChange}
                                />
                            </label>
                        </div>
                        <div className="col-2">
                            <label className="full-width">
                                {_("models.judge.sp")}
                                <input
                                    disabled={this.props.loading}
                                    value={this.props.formData.sp}
                                    onChange={this.handleSpChange}
                                />
                            </label>
                        </div>
                        <div className="col-3">{this.renderButtons()}</div>
                    </form>
                </td>
            </tr>
        );
    }
}
