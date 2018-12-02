import React from "react";

import makeClassName from "common/makeClassName";
import Api from "common/server/Api";
import Model from "common/server/Storage/models/Model";
import PT from "prop-types";
import rules_set from "rules_sets/loader";

export default class ScoreCell extends React.Component {
    static propTypes = {
        disciplineJudge: PT.instanceOf(Model).isRequired,
        editing: PT.bool.isRequired,
        readOnly: PT.bool.isRequired,
        score: PT.instanceOf(Model),
        onEditRequest: PT.func.isRequired,
        onStopEditing: PT.func.isRequired,
    };
    static get defaultProps() {
        return {
            score: null,
        }
    }
    handleStartEditing = () => {
        this.props.onEditRequest({
            type: "score",
            score_id: this.props.score.id,
        });
    };

    handleSubmission = (data) => {
        Api("model/update", {
            model_name: "Score",
            model_id: this.props.score.id,
            data: {data},
        })
            .onSuccess(this.props.onStopEditing)
            .send();
    };
    handleConfirmationToggle = () => {
        Api("model/update", {
            model_name: "Score",
            model_id: this.props.score.id,
            data: {
                confirmed: !this.props.score.confirmed,
            },
        })
            .send();
    };

    getClasssName() {
        return makeClassName({
            "judge": true,
            "rules-set": true,
            "editing": this.props.editing,
            "confirmed-score": this.props.score.confirmed,
        });
    }
    render() {
        const score = this.props.score;
        const computed_data = score?.run.tour.results?.scores_results[score?.id];
        if (!score || !computed_data) {
            return (
                <td className="judge no-score">
                    &nbsp;
                </td>
            );
        }
        const InputComponent = rules_set.admin_score_input;
        return (
            <td
                className={ this.getClasssName() }
                onClick={ this.handleStartEditing }
            >
                <InputComponent
                    confirmed={ this.props.score.confirmed }
                    disciplineJudgeRole={ this.props.disciplineJudge.role }
                    editing={ this.props.editing }
                    readOnly={ this.props.readOnly }
                    scoreComputedData={ computed_data }
                    scoreData={ this.props.score.data }
                    scoringSystemName={ this.props.score.run.tour.scoring_system_name }
                    onConfirmationToggle={ this.handleConfirmationToggle }
                    onDiscard={ this.props.onStopEditing }
                    onSubmit={ this.handleSubmission }
                />
            </td>
        )
    }
}

