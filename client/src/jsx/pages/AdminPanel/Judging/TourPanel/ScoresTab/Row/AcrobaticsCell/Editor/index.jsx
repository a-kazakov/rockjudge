import React from "react";

import Model from "common/server/Storage/models/Model";
import _ from "l10n";
import PT from "prop-types";
import Loader from "./Loader";
import Row from "./Row";

export default class Editor extends React.Component {
    static propTypes = {
        participant: PT.instanceOf(Model).isRequired,
        readOnly: PT.bool.isRequired,
        run: PT.instanceOf(Model).isRequired,
        onStopEditing: PT.func.isRequired,
    };

    renderBody() {
        return (
            <div>
                <h4>{this.props.run.program_name}</h4>
                <table className="acrobatics">
                    <tbody>
                        <tr>
                            <th className="description">
                                {_("judging.labels.acro_description")}
                            </th>
                            <th className="old-score">
                                {_("judging.labels.old_score")}
                            </th>
                            <th className="new-score">
                                {_("judging.labels.new_score")}
                            </th>
                            {this.props.readOnly ? null : <th className="controls" />}
                        </tr>
                        {this.props.run.acrobatics.map((element, idx) => (
                            <Row
                                element={element}
                                idx={idx}
                                key={idx}
                                readOnly={this.props.readOnly}
                                run={this.props.run}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
    renderMock() {
        return (
            <div className="no-program text-center">
                {_("admin.labels.no_program_loaded")}
            </div>
        );
    }
    renderLoader() {
        if (this.props.readOnly) {
            return null;
        }
        return <Loader participant={this.props.participant} run={this.props.run} />;
    }
    render() {
        return (
            <div className="acrobatics-editor">
                {this.props.run.program_name == null
                    ? this.renderMock()
                    : this.renderBody()}
                {this.renderLoader()}
                <button
                    className="close-button"
                    type="button"
                    onClick={this.props.onStopEditing}
                >
                    {_("global.buttons.close")}
                </button>
                <div className="clearfix" />
            </div>
        );
    }
}
