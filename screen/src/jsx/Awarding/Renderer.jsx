import LoadingComponent from "LoadingComponent";
import { makeDisciplineResultsTable } from "HostModules";

export default class Renderer extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineId: PT.number.isRequired,
            position: PT.number,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            discipline: null,
        };
    }

    CLASS_ID = "screen_awarding";
    API_MODELS = {
        discipline: {
            model_type: "Discipline",
            model_id_getter: props => props.disciplineId,
            schema: {
                results: {},
                competition: {},
                discipline_judges: {
                    judge: {},
                },
                tours: {
                    runs: {
                        participant: {
                            club: {},
                        },
                    },
                },
            },
        },
    };

    renderEmpty() {
        return (
            <div className="Awarding">
                <div className="discipline-name">
                    { this.state.discipline.name }
                </div>
            </div>
        );
    }
    renderPlace(row) {
        if (row.place === null) {
            return null;
        }
        return (
            <div className="place">
                { `${row.place} место` }
            </div>
        );
    }
    render() {
        if (this.state.discipline === null) {
            return null;
        }
        const table = makeDisciplineResultsTable(this.state.discipline)
        const row = table[this.props.position];
        if (!row) {
            return this.renderEmpty();
        }
        return (
            <div className="Awarding">
                <div className="discipline-name">
                    { this.state.discipline.name }
                </div>
                { this.renderPlace(row) }
                <div className="participant-name">
                    { row.run.participant.name }
                </div>
                <div className="participant-club">
                    { row.run.participant.club.name }
                </div>
            </div>
        );
    }
}

Renderer.displayName = "Awarding_Renderer";
