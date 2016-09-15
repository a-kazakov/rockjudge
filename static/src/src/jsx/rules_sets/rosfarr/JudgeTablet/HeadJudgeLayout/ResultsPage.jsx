import { Api } from "HostModules";
import { TourResults } from "HostModules";

import { Loader } from "ui/components";

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
                        tourId={ this.props.tour.id }
                        renderer={ ResultsTable2 }
                    />
                </div>
            </div>
        )
    }
}
