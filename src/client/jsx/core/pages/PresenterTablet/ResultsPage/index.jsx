import React from "react";

import PT from "prop-types";
import DisciplineSelector from "./DisciplineSelector";
import ResultsRenderer from "./ResultsRenderer";

export default class ResultsPage extends React.Component {
    static propTypes = {
        competition: PT.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            currentDiscipline: null,
        };
    }

    handleCurrentDisciplineChange = currentDiscipline =>
        this.setState({ currentDiscipline });

    renderDisciplineResults() {
        if (this.state.currentDiscipline == null) {
            return <div className="discipline-results" />;
        }
        return <ResultsRenderer discipline={this.state.currentDiscipline} />;
    }
    render() {
        return (
            <div className="results">
                <DisciplineSelector
                    competition={this.props.competition}
                    value={this.state.currentDiscipline?.id}
                    onDisciplineChange={this.handleCurrentDisciplineChange}
                />
                {this.renderDisciplineResults()}
            </div>
        );
    }
}
