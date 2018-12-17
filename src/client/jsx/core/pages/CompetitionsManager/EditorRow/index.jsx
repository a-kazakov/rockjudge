import React from "react";

import PT from "prop-types";
import _ from "l10n";
import makeClassName from "common/makeClassName";

import Info from "./Info";
import Model from "common/server/Storage/models/Model";

export default class EditorRow extends React.Component {
    static propTypes = {
        context: PT.shape({
            rulesSets: PT.arrayOf(PT.string.isRequired).isRequired,
        }).isRequired,
        creating: PT.bool.isRequired,
        entry: PT.instanceOf(Model),
        formData: PT.shape({
            name: PT.string.isRequired,
            date: PT.string.isRequired,
            rules_set: PT.string.isRequired,
            active: PT.bool.isRequired,
            info: PT.arrayOf(PT.arrayOf(PT.string.isRequired).isRequired).isRequired,
        }).isRequired,
        loading: PT.bool.isRequired,
        onDiscard: PT.func.isRequired,
        onFieldChange: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    handleNameChange = event => this.props.onFieldChange("name", event.target.value);
    handleDateChange = event => this.props.onFieldChange("date", event.target.value);
    handleRulesSetChange = event =>
        this.props.onFieldChange("rules_set", event.target.value);
    handleActiveChange = event =>
        this.props.onFieldChange("active", event.target.checked);
    handleInfoChange = value => this.props.onFieldChange("info", value);

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
    renderRulesSet() {
        if (!this.props.creating) {
            return null;
        }
        return (
            <label className="full-width">
                {_("models.competition.rules_set")}
                <select
                    className="full-width"
                    disabled={this.props.loading}
                    value={this.props.formData.rules_set}
                    onChange={this.handleRulesSetChange}
                >
                    {this.props.context.rulesSets.map(([ss, name]) => (
                        <option key={ss} value={ss}>
                            {name}
                        </option>
                    ))}
                </select>
            </label>
        );
    }
    render() {
        return (
            <tr className={this.getClassName()}>
                <td colSpan="4">
                    <form onSubmit={this.handleSubmission}>
                        <div className="col-6 general-info">
                            <label className="full-width">
                                {_("models.competition.name")}
                                <input
                                    required
                                    className="full-width"
                                    disabled={this.props.loading}
                                    value={this.props.formData.name}
                                    onChange={this.handleNameChange}
                                />
                            </label>
                            <label className="full-width">
                                {_("models.competition.date")}
                                <input
                                    required
                                    className="full-width"
                                    disabled={this.props.loading}
                                    value={this.props.formData.date}
                                    onChange={this.handleDateChange}
                                />
                            </label>
                            {this.renderRulesSet()}
                            <label className="full-width">
                                {_("models.competition.active")}
                                <br />
                                <input
                                    checked={this.props.formData.active}
                                    type="checkbox"
                                    onChange={this.handleActiveChange}
                                />
                            </label>
                        </div>
                        <div className="col-14">
                            <label>
                                {_("models.competition.info")}
                                <Info
                                    value={this.props.formData.info}
                                    onChange={this.handleInfoChange}
                                />
                            </label>
                        </div>
                        <div className="col-4">
                            <div className="buttons horizontal">
                                <button className="btn btn-primary" type="submit">
                                    {_("global.buttons.submit")}
                                </button>
                                <button
                                    className="btn btn-danger"
                                    type="button"
                                    onClick={this.props.onDiscard}
                                >
                                    {_("global.buttons.discard")}
                                </button>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
        );
    }
}
