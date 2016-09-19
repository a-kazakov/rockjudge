import TourResults from "common/components/TourResults";

import Wrapper from "./Wrapper";

export default class TourResultsTab extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            autoDocx: PT.object,
            tour: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            verbosity: PT.number.isRequired,
        };
    }

    makeResultsRef = (ref) => this._results = ref;

    handleSignal = (message) => {
        this._results.handleSignal(message);
    }

    // Rendering

    getClassName() {
        return `TourResultsTab rules-set`;
    }
    render() {
        return (
            <div className={ this.getClassName() }>
                <TourResults
                    autoDocx={ this.props.autoDocx }
                    ref={ this.makeResultsRef }
                    renderer={ Wrapper }
                    tourId={ this.props.tour.id }
                    verbosity={ this.props.verbosity }
                />
            </div>
        );
    }
}


TourResultsTab.displayName = "AdminPanel_Judging_TourPanel_TourResultsTab";
