import React from "react";

import PT from "prop-types";
import _ from "l10n";

import Button from "./Button";
import Model from "common/server/Storage/models/Model";

export default class CompetitionSelector extends React.Component {
    static propTypes = {
        competitions: PT.arrayOf(
            PT.instanceOf(Model).isRequired
        ).isRequired,
        onSelect: PT.func.isRequired,
    };

    renderNoCompetitions() {
        let link = null;
        if (window.location.hostname === "127.0.0.1") {
            link = (
                <h4>
                    { _("start_page.messages.competitions_management_link", `${window.location.origin}/c`) }
                </h4>
            );
        }
        return (
            <div className="CompetitionSelector no-competitions">
                <h3>
                    { _("start_page.messages.no_competitions") }
                </h3>
                { link }
            </div>
        );
    }
    render() {
        if (this.props.competitions.length === 0) {
            return this.renderNoCompetitions();
        }
        return (
            <div className="CompetitionSelector">
                <h3>
                    { _("start_page.headers.select_competition") }
                </h3>
                <div className="list">
                    { this.props.competitions.map(comp =>
                        <Button
                            competition={ comp }
                            key={ comp.id }
                            onSelect={ this.props.onSelect }
                        />
                    ) }
                </div>
            </div>
        );
    }
}