import React from "react";

import makeClassName from "common/makeClassName";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import rules_set from "rules_sets/loader";

export default class EditorRow extends React.Component {
    static propTypes = {
        creating: PT.bool.isRequired,
        entry: PT.instanceOf(Model),
        formData: PT.shape({
            name: PT.string.isRequired,
            num_advances: PT.string.isRequired,
            participants_per_heat: PT.string.isRequired,
            hope_tour: PT.bool.isRequired,
            scoring_system_name: PT.string.isRequired,
            default_program: PT.string.isRequired,
        }).isRequired,
        loading: PT.bool.isRequired,
        onDiscard: PT.func.isRequired,
        onFieldChange: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    handleNameChange = event => this.props.onFieldChange("name", event.target.value);
    handleNumAdvancesChange = event =>
        this.props.onFieldChange("num_advances", event.target.value);
    handleParticipantsPerHeatChange = event =>
        this.props.onFieldChange("participants_per_heat", event.target.value);
    handleHopeTourChange = event =>
        this.props.onFieldChange("hope_tour", event.target.checked);
    handleScoringSystemNameChange = event =>
        this.props.onFieldChange("scoring_system_name", event.target.value);
    handleDefaultProgramChange = event =>
        this.props.onFieldChange("default_program", event.target.value);
    handleSubmission = event => {
        event.preventDefault();
        this.props.onSubmit();
    };

    getClassName() {
        return makeClassName({
            tour: true,
            editor: true,
            create: this.props.creating,
        });
    }
    renderScoringSystemNameOption = scoring_system_name => {
        return (
            <option key={scoring_system_name} value={scoring_system_name}>
                {rules_set.translate(`scoring_systems_names.${scoring_system_name}`)}
            </option>
        );
    };
    render() {
        return (
            <form className={this.getClassName()} onSubmit={this.handleSubmission}>
                <div className="row">
                    <div className="col-12 wrapper">
                        <div className="col-24">
                            <label>
                                {_("models.tour.name")}
                                <input
                                    disabled={this.props.loading}
                                    list="dl_tours"
                                    value={this.props.formData.name}
                                    onChange={this.handleNameChange}
                                />
                            </label>
                        </div>
                        <div className="col-8">
                            <label>{_("models.tour.num_advances")}</label>
                            <input
                                disabled={
                                    this.props.loading || this.props.entry?.finalized
                                }
                                value={this.props.formData.num_advances}
                                onChange={this.handleNumAdvancesChange}
                            />
                        </div>
                        <div className="col-8">
                            <label>
                                {_("models.tour.participants_per_heat")}
                                <input
                                    disabled={this.props.loading}
                                    value={this.props.formData.participants_per_heat}
                                    onChange={this.handleParticipantsPerHeatChange}
                                />
                            </label>
                        </div>
                        <div className="col-8">
                            <label>
                                {_("models.tour.is_hope_tour")}
                                <input
                                    checked={this.props.formData.hope_tour}
                                    disabled={
                                        this.props.loading ||
                                        this.props.entry?.finalized
                                    }
                                    type="checkbox"
                                    onChange={this.handleHopeTourChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="col-12 wrapper">
                        <div className="col-24">
                            <label>
                                {_("models.tour.scoring_system_name")}
                                <select
                                    disabled={
                                        this.props.loading ||
                                        this.props.entry?.finalized
                                    }
                                    value={this.props.formData.scoring_system_name}
                                    onChange={this.handleScoringSystemNameChange}
                                >
                                    {rules_set.meta.scoring_systems.map(
                                        this.renderScoringSystemNameOption,
                                    )}
                                </select>
                            </label>
                        </div>
                        <div className="col-12">
                            <label>{_("models.tour.default_program")}</label>
                            <input
                                disabled={this.props.loading}
                                list="dl_programs"
                                value={this.props.formData.default_program}
                                onChange={this.handleDefaultProgramChange}
                            />
                        </div>
                        <div className="col-12">
                            <div className="buttons horizontal">
                                <button type="submit">
                                    {_("global.buttons.submit")}
                                </button>
                                <button type="button" onClick={this.props.onDiscard}>
                                    {_("global.buttons.discard")}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}
