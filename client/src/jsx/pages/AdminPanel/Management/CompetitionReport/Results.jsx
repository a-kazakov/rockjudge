import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import rules_set from "rules_sets/loader";

export default class Results extends React.Component {
    static propTypes = {
        competition: PT.instanceOf(Model).isRequired,
        config: PT.shape({
            disciplines: PT.object.isRequired,
        }).isRequired,
    };

    renderDiscipline = (discipline) => {
        if (!this.props.config.disciplines[discipline.id]) {
            return null;
        }
        const Renderer = rules_set.discipline_results_table;
        return (
            <div key={ discipline.id }>
                <h5><p>{ discipline.name }</p></h5>
                <Renderer
                    forCompetitionReport
                    discipline={ discipline }
                />
            </div>
        )
    };

    render() {
        let has_disciplines = false;
        for (let i = 0; i < this.props.competition.disciplines.length; ++i) {
            let discipline_id = this.props.competition.disciplines[i].id;
            if (this.props.config.disciplines[discipline_id]) {
                has_disciplines = true;
                break;
            }
        }
        if (!has_disciplines) {
            return null;
        }
        return (
            <div className="rules-set">
                <h4>
                    <p>
                        { _("admin.headers.competition_results") }
                    </p>
                </h4>
                { this.props.competition.disciplines.map(this.renderDiscipline) }
            </div>
        )
    }
}


