import { Api, React } from "HostModules";

import PT from "prop-types";

import ResultsTable2 from "ResultsTable2";
import makeTourResultsTable from "common/makeTourResultsTable";

export default class ResultsPage extends React.Component {
    static propTypes = {
        tour: PT.object.isRequired,
    };

    handleNumAdvancesChange = num_advances => {
        Api("model/update", {
            model_name: "Tour",
            model_id: this.props.tour.id,
            data: { num_advances },
        }).send();
    };

    render() {
        return (
            <div className="body results" style={{ padding: "10px" }}>
                <ResultsTable2 computedTour={makeTourResultsTable(this.props.tour)} />
            </div>
        );
    }
}
