import { _ } from "l10n/loader";
import { Api } from "server/api";
import { storage } from "server/storage";
import { message_dispatcher } from "server/message_dispatcher";
import { Loader } from "ui/components";
import { Printable } from "ui/printable";
import { Docx } from "common/docx";

import TourResults from "common/TourResults";

import Wrapper from "./Wrapper";

export default class TourResultsTab extends React.Component {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
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

    render() {
        return (
            <TourResults
                ref={ this.makeResultsRef }
                renderer={ Wrapper }
                tourId={ this.props.tour.id }
                verbosity={ this.props.verbosity }
            />
        );
    }
}


TourResultsTab.displayName = "AdminPanel_Judging_TourPanel_TourResultsTab";
