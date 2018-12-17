import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import getScoringType from "common/getScoringType";

import HeadJudgeScore from "./HeadJudgeScore";
import QualificationSimpleScore from "./QualificationSimpleScore";
import ConfirmationButton from "./ConfirmationButton";
import FinalSimpleScore from "./FinalSimpleScore";
import Final3dScore from "./Final3dScore";
import { consoleError } from "common/logging";

export default class Editor extends React.Component {
    static propTypes = {
        confirmed: PT.bool.isRequired,
        disciplineJudgeRole: PT.string.isRequired,
        readOnly: PT.bool.isRequired,
        scoreData: PT.object.isRequired,
        scoringSystemName: PT.string.isRequired,
        onConfirmationToggle: PT.func.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };

    handleDiscardClick = event => {
        event.stopPropagation();
        this.props.onDiscard();
    };

    renderWrongJudgeRoleMessage() {
        return (
            <div className="score-editor">
                <div className="error-message">
                    {_("admin.messages.wrong_judge_role")}
                </div>
                <div className="buttons">
                    <button
                        className="discard-button"
                        type="button"
                        onClick={this.handleDiscardClick}
                    >
                        {_("global.buttons.discard")}
                    </button>
                </div>
            </div>
        );
    }
    renderBody(scoring_type) {
        const score_props = {
            readOnly: this.props.readOnly,
            scoreData: this.props.scoreData,
            scoringSystemName: this.props.scoringSystemName,
            onSubmit: this.props.onSubmit,
            onDiscard: this.props.onDiscard,
        };
        switch (scoring_type) {
            case "qualification_simple":
                return <QualificationSimpleScore {...score_props} />;
            case "final_simple":
                return <FinalSimpleScore {...score_props} />;
            case "final_3d":
                return <Final3dScore {...score_props} />;
            case "head":
                return <HeadJudgeScore {...score_props} />;
            case null:
                return this.renderWrongJudgeRoleMessage();
            default:
                consoleError(`Unknown scoring type: ${scoring_type}`);
        }
    }
    renderConfirmationButton(scoring_type) {
        if (this.props.readOnly || scoring_type === "head") {
            return null;
        }
        return (
            <ConfirmationButton
                confirmed={this.props.confirmed}
                onConfirmationToggle={this.props.onConfirmationToggle}
            />
        );
    }
    render() {
        const scoring_type = getScoringType(
            this.props.disciplineJudgeRole,
            this.props.scoringSystemName,
        );
        return (
            <div className="AdminScoreInput">
                {this.renderBody(scoring_type)}
                {this.renderConfirmationButton(scoring_type)}
            </div>
        );
    }
}
