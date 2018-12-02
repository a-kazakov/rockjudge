import React from "react";

import PT from "prop-types";
import _ from "l10n";
import Model from "common/server/Storage/models/Model";

export default class DisciplinesShown extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            disciplines: PT.object.isRequired,
        }).isRequired,
    };

    hasDisabledDisciplines() {
        return this.props.competition.disciplines.findIndex(
            d => !this.props.config.disciplines[d.id]
        ) >= 0;
    }
    getEnabledDisciplines() {
        return this.props.competition.disciplines.filter(
            d => this.props.config.disciplines[d.id]
        );
    }

    render() {
        if (!this.hasDisabledDisciplines()) {
            return null;
        }
        const disciplines = this.getEnabledDisciplines();
        if (disciplines.length === 0) {
            return null;
        }
        return (
            <div className="disciplines-shown">
                <p>
                    <strong>
                        { _("admin.headers.disciplines_shown") }
                    </strong>
                </p>
                <ul>
                    { disciplines.map(d =>
                        <li key={ d.id }>
                            { d.name }
                        </li>
                    ) }
                </ul>
            </div>
        )
    }
}
