import React from "react";

import Model from "common/server/Storage/models/Model";
import Renderer from "./Renderer";
import PT from "prop-types";

export default class TourResultsTab extends React.Component {
    static propTypes = {
        autoDocx: PT.object,
        tour: PT.instanceOf(Model).isRequired,
        verbosity: PT.number.isRequired,
    };

    makeResultsRef = (ref) => this._results = ref;

    handleSignal = (message) => {
        this._results.handleSignal(message);
    };

    // Rendering

    render() {
        return (
            <div className="TourResultsTab rules-set">
                <Renderer
                    autoDocx={ this.props.autoDocx }
                    ref={ this.makeResultsRef }
                    tour={ this.props.tour }
                    verbosity={ this.props.verbosity }
                />
            </div>
        );
    }
}

