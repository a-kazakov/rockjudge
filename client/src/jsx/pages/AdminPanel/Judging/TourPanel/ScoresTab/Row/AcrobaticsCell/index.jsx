import React from "react";

import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import Editor from "./Editor";

export default class AcrobaticsCell extends React.Component {
    static propTypes = {
        editing: PT.bool.isRequired,
        participant: PT.instanceOf(Model).isRequired,
        readOnly: PT.bool.isRequired,
        run: PT.instanceOf(Model).isRequired,
        onEditRequest: PT.func.isRequired,
        onStopEditing: PT.func.isRequired,
    };

    handleStartEditing = () => {
        this.props.onEditRequest({
            type: "acrobatics",
            run_id: this.props.run.id,
        });
    };

    render() {
        if (this.props.editing) {
            return (
                <td className="acrobatics editing">
                    <Editor
                        participant={ this.props.participant }
                        readOnly={ this.props.readOnly }
                        run={ this.props.run }
                        onStopEditing={ this.props.onStopEditing }
                    />
                </td>
            );
        }
        if (this.props.run.program_name == null) {
            return (
                <td
                    className="acrobatics"
                    onClick={ this.handleStartEditing }
                >
                    &mdash;
                </td>
            );
        }
        let has_overrides = false;
        let initial_score = 0;
        let score = 0;
        for (const acro of this.props.run.acrobatics) {
            initial_score += acro.initial_score;
            score += acro.score;
            has_overrides = has_overrides || acro.score !== acro.initial_score;
        }
        return (
            <td
                className="acrobatics"
                onClick={ this.handleStartEditing }
            >
                { has_overrides
                    ? `${initial_score.toFixed(1)} → ${score.toFixed(1)}`
                    : score.toFixed(1) }
            </td>
        );
    }
}

