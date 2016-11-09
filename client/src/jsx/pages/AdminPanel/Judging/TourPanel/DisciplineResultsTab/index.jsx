import DisciplineResultsLoader from "common/components/DisciplineResultsLoader";

import Renderer from "./Renderer";

export default class DisciplineResultsTab extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            autoDocx: PT.object,
            discipline: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
        };
    }

    makeResultsRef = (ref) => this._results = ref;

    handleSignal = (message) => {
        this._results.handleSignal(message);
    }

    // Rendering

    render() {
        return (
            <div className="DisciplineResultsTab rules-set">
                <DisciplineResultsLoader
                    autoDocx={ this.props.autoDocx }
                    disciplineId={ this.props.discipline.id }
                    ref={ this.makeResultsRef }
                    renderer={ Renderer }
                />
            </div>
        );
    }
}


DisciplineResultsTab.displayName = "AdminPanel_Judging_DisciplinePanel_DisciplineResultsTab";
