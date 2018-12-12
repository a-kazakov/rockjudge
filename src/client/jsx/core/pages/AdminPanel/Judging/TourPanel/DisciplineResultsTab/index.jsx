import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import Renderer from "./Renderer";

export default class DisciplineResultsTab extends React.Component {
    static propTypes = {
        autoDocx: PT.object,
        discipline: PT.instanceOf(Model).isRequired,
    };

    makeResultsRef = ref => (this._results = ref);

    handleSignal = message => {
        this._results.handleSignal(message);
    };

    // Rendering

    render() {
        return (
            <div className="DisciplineResultsTab rules-set">
                <Renderer
                    autoDocx={this.props.autoDocx}
                    discipline={this.props.discipline}
                    ref={this.makeResultsRef}
                />
            </div>
        );
    }
}
