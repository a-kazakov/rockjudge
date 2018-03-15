import Api from "common/server/Api";

import rules_set from "rules_sets/loader";

export default class ScoreCell extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.object.isRequired,
            editing: PT.bool.isRequired,
            readOnly: PT.bool.isRequired,
            score: PT.shape({
                id: PT.number.isRequired,
                confirmed: PT.bool.isRequired,
            }),
            tour: PT.object.isRequired,
            onEditRequest: PT.func.isRequired,
            onStopEditing: PT.func.isRequired,
        };
    }
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
        let request = {
            score_data: data,
            force: true,
        };
        Api("score.set", {
            score_id: this.props.score.id,
            data: request,
        })
            .onSuccess(this.props.onStopEditing)
            .send();
    };
    handleConfirmationToggle = () => {
        if (this.props.score.confirmed) {
            Api("score.unconfirm", {
                score_id: this.props.score.id,
            })
                .send();
        } else {
            Api("score.confirm", {
                score_id: this.props.score.id,
            })
                .send();
        }
    };

    getClasssName() {
        let result = "judge rules-set";
        if (this.props.editing) {
            result += " editing";
        }
        if (this.props.score.confirmed) {
            result += " confirmed-score";
        }
        return result;
    }
    render() {
        if (this.props.score === null) {
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
                    disciplineJudge={ this.props.disciplineJudge }
                    editing={ this.props.editing }
                    readOnly={ this.props.readOnly }
                    score={ this.props.score }
                    tour={ this.props.tour }
                    onConfirmationToggle={ this.handleConfirmationToggle }
                    onDiscard={ this.props.onStopEditing }
                    onSubmit={ this.handleSubmission }
                />
            </td>
        )
    }
}

ScoreCell.displayName = "AdminPanel_Judging_TourPanel_ScoresTab_Row_ScoreCell";
