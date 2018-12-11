import React from "react";

import showConfirm from "common/dialogs/showConfirm";
import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import rules_set from "rules_sets/loader";

export default class Row extends React.Component {
    static propTypes = {
        entry: PT.instanceOf(Model).isRequired,
        loading: PT.bool.isRequired,
        onDelete: PT.func.isRequired,
        onStartEditing: PT.func.isRequired,
    };

    handleTourDeletion = () => {
        showConfirm(_("admin.confirms.delete_tour"), this.props.onDelete);
    };

    render() {
        const tour = this.props.entry;
        return (
            <div className="tour viewer">
                <h3>{tour.name}</h3>
                <div className="tour-content">
                    <div className="info">
                        <div className="first-col">
                            <p>
                                <strong>{`${_("models.tour.num_advances")}: `}</strong>
                                {tour.num_advances}
                            </p>
                            <p>
                                <strong>
                                    {`${_("models.tour.participants_per_heat")}: `}
                                </strong>
                                {tour.participants_per_heat}
                            </p>
                            <p>
                                <strong>{`${_("models.tour.is_hope_tour")}: `}</strong>
                                {tour.hope_tour
                                    ? _("global.labels.yes")
                                    : _("global.labels.no")}
                            </p>
                        </div>
                        <div className="second-col">
                            <p>
                                <strong>
                                    {`${_("models.tour.scoring_system_name")}: `}
                                </strong>
                                {rules_set.translate(
                                    `scoring_systems_names.${tour.scoring_system_name}`,
                                )}
                            </p>
                            <p>
                                <strong>
                                    {`${_("models.tour.default_program")}: `}
                                </strong>
                                {tour.default_program}
                            </p>
                        </div>
                    </div>
                    <div className="buttons">
                        <button
                            className="edit-button"
                            onClick={this.props.onStartEditing}
                        >
                            {_("global.buttons.edit")}
                        </button>
                        <br />
                        <button
                            className="delete-button"
                            onClick={this.handleTourDeletion}
                        >
                            {_("global.buttons.delete")}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
