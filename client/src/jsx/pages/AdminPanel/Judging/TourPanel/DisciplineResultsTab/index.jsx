import LoadingComponent from "common/server/LoadingComponent";
import Loader from "common/components/Loader";

import Renderer from "./Renderer";

export default class DisciplineResultsTab extends LoadingComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            autoDocx: PT.object,
            discipline: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
        };
    }

    CLASS_ID = "discipline_results_tab";
    API_MODELS = {
        discipline: {
            model_type: "Discipline",
            model_id_getter: props => props.discipline.id,
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

    constructor(props) {
        super(props);
        this.state = {
            discipline: null,
        };
    }

    makeResultsRef = (ref) => this._results = ref;

    handleSignal = (message) => {
        this._results.handleSignal(message);
    }

    // Rendering

    render() {
        if (this.state.discipline === null) {
            return (
                <Loader />
            );
        }
        return (
            <div className="DisciplineResultsTab rules-set">
                <Renderer
                    autoDocx={ this.props.autoDocx }
                    discipline={ this.state.discipline }
                    ref={ this.makeResultsRef }
                />
            </div>
        );
    }
}


DisciplineResultsTab.displayName = "AdminPanel_Judging_DisciplinePanel_DisciplineResultsTab";
