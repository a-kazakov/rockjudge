import React from "react";

import makeClassName from "common/makeClassName";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";

export default class EditorRow extends React.Component {
    static propTypes = {
        context: PT.shape({
            tours: PT.arrayOf(
                PT.instanceOf(Model).isRequired,
            ).isRequired,
        }).isRequired,
        creating: PT.bool.isRequired,
        entry: PT.instanceOf(Model),
        formData: PT.shape({
            sp: PT.string.isRequired,
            verbose_name: PT.string.isRequired,
            tour_id: PT.string.isRequired,
            estimated_beginning: PT.string.isRequired,
            estimated_duration: PT.string.isRequired,
        }).isRequired,
        loading: PT.bool.isRequired,
        onDiscard: PT.func.isRequired,
        onFieldChange: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    handleSpChange = (event) => this.props.onFieldChange("sp", event.target.value);
    handleVerboseNameChange = (event) => this.props.onFieldChange("verbose_name", event.target.value);
    handleTourIdChange = (event) => this.props.onFieldChange("tour_id", event.target.value);
    handleEstimatedBeginningChange = (event) => this.props.onFieldChange("estimated_beginning", event.target.value);
    handleEstimatedDurationChange = (event) => this.props.onFieldChange("estimated_duration", event.target.value);
    handleSubmission = (event) => {
        event.preventDefault();
        this.props.onSubmit();
    };

    getClassName() {
        return makeClassName({
            "editor": true,
            "create": this.props.creating,
        });
    }

    renderTour = (tour) => {
        return (
            <option key={ tour.id } value={ tour.id }>
                { `${tour.discipline.name} — ${tour.name}` }
            </option>
        );
    };
    render() {
        return (
            <tr className={ this.getClassName() }>
                <td colSpan="6">
                    <form onSubmit={ this.handleSubmission }>
                        <div className="col-5">
                            <label>
                                { _("models.competition_plan_item.sp") }
                                <input
                                    disabled={ this.props.loading }
                                    type="number"
                                    value={ this.props.formData.sp }
                                    onChange={ this.handleSpChange }
                                />
                            </label>
                        </div>
                        <div className="col-10">
                            <label>
                                { _("models.competition_plan_item.verbose_name") }
                                <input
                                    disabled={ this.props.loading }
                                    value={ this.props.formData.verbose_name }
                                    onChange={ this.handleVerboseNameChange }
                                />
                            </label>
                            <label>
                                { _("models.competition_plan_item.tour") }
                                <select
                                    disabled={ this.props.loading }
                                    value={ this.props.formData.tour_id }
                                    onChange={ this.handleTourIdChange }
                                >
                                    <option value="null">
                                        ----------
                                    </option>
                                    { this.props.context.tours.map(this.renderTour) }
                                </select>
                            </label>
                        </div>
                        <div className="col-5">
                            <label>
                                { _("models.competition_plan_item.estimated_beginning") }
                                <input
                                    disabled={ this.props.loading }
                                    value={ this.props.formData.estimated_beginning }
                                    onChange={ this.handleEstimatedBeginningChange }
                                />
                            </label>
                            <label>
                                { _("models.competition_plan_item.estimated_duration") }
                                <input
                                    disabled={ this.props.loading }
                                    value={ this.props.formData.estimated_duration }
                                    onChange={ this.handleEstimatedDurationChange }
                                />
                            </label>
                        </div>
                        <div className="col-4">
                            <div className="buttons vertical">
                                <button
                                    className="btn btn-primary"
                                    disabled={ this.props.loading }
                                    type="submit"
                                >
                                    { _("global.buttons.submit") }
                                </button>
                                <button
                                    className="btn btn-danger"
                                    disabled={ this.props.loading }
                                    type="button"
                                    onClick={ this.props.onDiscard }
                                >
                                    { _("global.buttons.discard") }
                                </button>
                            </div>
                        </div>
                    </form>
                </td>
            </tr>
        );
    }
}

