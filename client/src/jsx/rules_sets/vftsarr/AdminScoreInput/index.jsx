import {React} from "HostModules";

import PT from "prop-types";
import Editor from "./Editor";

export default class AdminScoreInput extends React.Component {
    static propTypes = {
        confirmed: PT.bool.isRequired,
        disciplineJudgeRole: PT.string.isRequired,
        editing: PT.bool.isRequired,
        readOnly: PT.bool.isRequired,
        scoreComputedData: PT.shape({
            is_valid: PT.bool.isRequired,
            total_score_str: PT.string.isRequired,
            extra_data: PT.shape({
                parts: PT.object.isRequired,
            }).isRequired,
        }).isRequired,
        scoreData: PT.object.isRequired,
        scoringSystemName: PT.string.isRequired,
        onConfirmationToggle: PT.func.isRequired,
        onDiscard: PT.func.isRequired,
        onSubmit: PT.func.isRequired,
    };
    render() {
        const {editing, scoreComputedData, ...other_props} = this.props;
        if (!editing) {
            return (
                <span>
                    { scoreComputedData.total_score_str }
                </span>
            );
        } else {
            return (
                <Editor { ...other_props } />
            );
        }
    }
}

