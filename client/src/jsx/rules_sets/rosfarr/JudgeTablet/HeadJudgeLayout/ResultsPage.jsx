import { TourResultsLoader } from "HostModules";

import ResultsTable2 from "ResultsTable2";

export default class ResultsPage extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tour: PT.shape({
                id: PT.number.isRequired,
                results: PT.object.isRequired,
            }).isRequired,
        };
    }

    // Initialization

    render() {
        return (
            <div className="body results">
                <ResultsTable2
                    tour={ this.props.tour }
                />
            </div>
        )
    }
}
