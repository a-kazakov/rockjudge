import { React } from "HostModules";

import PT from "prop-types";

import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoringLayout from "./ScoringLayout";
import LastPage from "JudgeTablet/LastPage";

export default class ClStuntLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
    };

    static checkScoreCompletion(score) {
        return score.confirmed;
    }

    render() {
        return (
            <GeneralLayout
                lastPageRenderer={LastPage}
                participantLayoutRenderer={ScoringLayout}
                scoreCompletionChecker={this.constructor.checkScoreCompletion}
                {...this.props}
            />
        );
    }
}
