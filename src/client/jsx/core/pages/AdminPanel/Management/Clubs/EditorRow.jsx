import React from "react";

import makeClassName from "common/makeClassName";
import _ from "l10n";
import PT from "prop-types";

export default class EditorRow extends React.Component {
    static propTypes = {
        creating: PT.bool.isRequired,
        formData: PT.shape({
            name: PT.string.isRequired,
            city: PT.string.isRequired,
            external_id: PT.string.isRequired,
        }).isRequired,
        loading: PT.bool.isRequired,
        onDiscard: PT.func.isRequired,
        onFieldChange: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    handleNameChange = event => this.props.onFieldChange("name", event.target.value);
    handleCityChange = event => this.props.onFieldChange("city", event.target.value);
    handleExternalIdChange = event =>
        this.props.onFieldChange("external_id", event.target.value);
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
            <div className="buttons">
                <div className="buttons horizontal">
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
            </div>
        );
    }
    render() {
        return (
            <tr className={this.getClassName()}>
                <td colSpan="4">
                    <form onSubmit={this.handleSubmission}>
                        <div className="col-10">
                            <label>
                                {_("models.club.name")}
                                <input
                                    disabled={this.props.loading}
                                    value={this.props.formData.name}
                                    onChange={this.handleNameChange}
                                />
                            </label>
                        </div>
                        <div className="col-4">
                            <label>
                                {_("models.club.city")}
                                <input
                                    disabled={this.props.loading}
                                    value={this.props.formData.city}
                                    onChange={this.handleCityChange}
                                />
                            </label>
                        </div>
                        <div className="col-4">
                            <label>
                                {_("models.club.external_id")}
                                <br />
                                <input
                                    disabled={this.props.loading}
                                    value={this.props.formData.external_id}
                                    onChange={this.handleExternalIdChange}
                                />
                            </label>
                        </div>
                        <div className="col-6">{this.renderButtons()}</div>
                    </form>
                </td>
            </tr>
        );
    }
}
