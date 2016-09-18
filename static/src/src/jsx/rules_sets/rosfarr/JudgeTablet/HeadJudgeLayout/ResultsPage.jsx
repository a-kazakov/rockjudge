import { TourResults } from "HostModules";

import ResultsTable2 from "ResultsTable2";

export default class ResultsPage extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            tour: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
        };
    }

    // Initialization

    render() {
        return (
            <div className="body results">
                <div className="tour-results">
                    <TourResults
                        renderer={ ResultsTable2 }
                        tourId={ this.props.tour.id }
                    />
                </div>
            </div>
        )
    }
}
