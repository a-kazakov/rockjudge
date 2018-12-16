import { React } from "HostModules";

import makeTourResultsTable from "common/makeTourResultsTable";
import PT from "prop-types";
import ResultsTable2 from "ResultsTable2";

export default class ResultsPage extends React.Component {
    static propTypes = {
        tour: PT.object.isRequired,
    };

    // Initialization

    render() {
        return (
            <div className="body results">
                <ResultsTable2 computedTour={makeTourResultsTable(this.props.tour)} />
            </div>
        );
    }
}
