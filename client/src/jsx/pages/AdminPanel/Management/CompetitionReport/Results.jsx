import _ from "l10n";

import rules_set from "rules_sets/loader";

import DisciplineResultsLoader from "common/components/DisciplineResultsLoader";

export default class Results extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                disciplines: PT.arrayOf(
                    PT.shape({
                        id: PT.number.isRequired,
                        name: PT.string.isRequired,
                    }).isRequired
                ).isRequired,
            }).isRequired,
            config: PT.shape({
                disciplines: PT.object.isRequired,
            }).isRequired,
        };
    }
    renderDiscipline = (discipline) => {
        if (!this.props.config.disciplines[discipline.id]) {
            return null;
        }
        return (
            <div key={ discipline.id }>
                <h5><p>{ discipline.name }</p></h5>
                <DisciplineResultsLoader
                    disciplineId={ discipline.id }
                    renderer={ rules_set.discipline_results_table }
                />
            </div>
        )
    }
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
            <div>
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


Results.displayName = "AdminPanel_Management_CompetitionReport_Results";
