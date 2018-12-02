import React from "react";

import makeClassName from "common/makeClassName";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import DisciplineJudges from "./DisciplineJudges";

export default class EditorRow extends React.Component {
    static propTypes = {
        context: PT.shape({
            competition: PT.instanceOf(Model).isRequired,
        }),
        creating: PT.bool.isRequired,
        formData: PT.shape({
            name: PT.string.isRequired,
            sp: PT.string.isRequired,
            external_id: PT.string.isRequired,
            discipline_judges: PT.arrayOf(
                PT.object.isRequired,
            ).isRequired,
        }).isRequired,
        loading: PT.bool.isRequired,
        onDiscard: PT.func.isRequired,
        onFieldChange: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    handleNameChange = (event) => this.props.onFieldChange("name", event.target.value);
    handleSpChange = (event) => this.props.onFieldChange("sp", event.target.value);
    handleExternalIdChange = (event) => this.props.onFieldChange("external_id", event.target.value);
    handleDisciplineJudgesChange = (value) => this.props.onFieldChange("discipline_judges", value);
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
    render() {
        return (
            <tr className={ this.getClassName() }>
                <td colSpan="5">
                    <form onSubmit={ this.handleSubmission }>
                        <div className="col-8">
                            <label className="full-width">
                                { _("models.discipline.name") }
                                <input
                                    disabled={ this.props.loading }
                                    value={ this.props.formData.name }
                                    onChange={ this.handleNameChange }
                                />
                            </label>
                            <label className="full-width">
                                { _("models.discipline.sp") }
                                <input
                                    disabled={ this.props.loading }
                                    value={ this.props.formData.sp }
                                    onChange={ this.handleSpChange }
                                />
                            </label>
                            <label className="full-width">
                                { _("models.discipline.external_id") }<br />
                                <input
                                    disabled={ this.props.loading }
                                    value={ this.props.formData.external_id }
                                    onChange={ this.handleExternalIdChange }
                                />
                            </label>
                        </div>
                        <div className="col-12">
                            <label className="full-width">
                                { _("models.discipline.discipline_judges") }
                            </label>
                            <DisciplineJudges
                                competition={ this.props.context.competition }
                                disabled={ this.props.loading }
                                value={ this.props.formData.discipline_judges }
                                onChange={ this.handleDisciplineJudgesChange }
                            />
                        </div>
                        <div className="col-4">
                            <label>&nbsp;</label>
                            <div className="buttons vertical">
                                <button
                                    disabled={ this.props.loading }
                                    type="submit"
                                >
                                    { _("global.buttons.submit") }
                                </button>
                                <button
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

