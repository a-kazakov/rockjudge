import DisciplineResultsLoader from "common/components/DisciplineResultsLoader";

import DisciplineSelector from "./DisciplineSelector";
import ResultsRenderer from "./ResultsRenderer";

export default class ResultsPage extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            competition: PT.shape({
                disciplines: PT.arrayOf(
                    PT.object.isRequired
                ).isRequired,
            }).isRequired,
        };
    }

    constructor(props) {
        super(props);
        this.state = {
            currentDisciplineId: null,
        }
    }

    handleCurrentDisciplineChange = (currentDisciplineId) => this.setState({ currentDisciplineId });

    renderDisciplineResults() {
        if (this.state.currentDisciplineId === null) {
            return (
                <div className="discipline-results" />
            );
        }
        return (
            <DisciplineResultsLoader
                disciplineId={ this.state.currentDisciplineId }
                renderer={ ResultsRenderer }
            />
        );
    }
    render() {
        return (
            <div className="results">
                <DisciplineSelector
                    disciplines={ this.props.competition.disciplines }
                    value={ this.state.currentDisciplineId }
                    onDisciplineChange={ this.handleCurrentDisciplineChange }
                />
                { this.renderDisciplineResults() }
            </div>
        );
    }
}

ResultsPage.displayName = "PresenterTablet_ResultsPage";
