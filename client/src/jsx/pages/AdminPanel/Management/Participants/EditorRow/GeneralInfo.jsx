import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n/index";
import PT from "prop-types";

export default class GeneralInfo extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        formData: PT.shape({
            number: PT.string.isRequired,
            club_id: PT.string.isRequired,
            coaches: PT.string.isRequired,
            formation_name: PT.string.isRequired,
            sportsmen: PT.arrayOf(PT.object.isRequired).isRequired,
        }).isRequired,
        loading: PT.bool.isRequired,
        onFieldChange: PT.func.isRequired,
    };

    handleNumberChange = event =>
        this.props.onFieldChange("number", event.target.value);
    handleClubIdChange = event =>
        this.props.onFieldChange("club_id", event.target.value);
    handleCoachesChange = event =>
        this.props.onFieldChange("coaches", event.target.value);
    handleFormationNameChange = event =>
        this.props.onFieldChange("formation_name", event.target.value);

    renderClubListItem = club => {
        return (
            <option key={club.id} value={club.id}>
                {club.name}
            </option>
        );
    };
    render() {
        return (
            <div>
                <label>
                    {_("models.participant.number")}
                    <input
                        disabled={this.props.loading}
                        type="number"
                        value={this.props.formData.number}
                        onChange={this.handleNumberChange}
                    />
                </label>
                <label>
                    {_("models.participant.club_name")}
                    <select
                        className="full-width"
                        disabled={this.props.loading}
                        value={this.props.formData.club_id}
                        onChange={this.handleClubIdChange}
                    >
                        {this.props.competition.clubs.map(this.renderClubListItem)}
                    </select>
                </label>
                <label>
                    {_("models.participant.coaches")}
                    <input
                        disabled={this.props.loading}
                        value={this.props.formData.coaches}
                        onChange={this.handleCoachesChange}
                    />
                </label>
                <label>
                    {_("models.participant.formation_name")}
                    <input
                        disabled={this.props.loading}
                        value={this.props.formData.formation_name}
                        onChange={this.handleFormationNameChange}
                    />
                </label>
            </div>
        );
    }
}
