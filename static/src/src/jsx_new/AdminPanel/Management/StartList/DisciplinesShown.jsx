import _ from "l10n";

export default class DisciplinesShown extends React.Component {
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

DisciplinesShown.displayName = "AdminPanel_Management_StartList_DisciplinesShown";
