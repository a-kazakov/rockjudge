import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoreConfirmation from "./ScoreConfirmation";
import ScoringLayout from "./ScoringLayout";

export default class QualificationSimpleLayout extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        tour: PT.object.isRequired,
    };

    static checkScoreCompletion(score) {
        return score.data.cross;
    }

    render() {
        const scores = this.props.tour.runs
            .filter(run => run.status === "OK")
            .map(run => run.scores.find(score => score?.discipline_judge_id === this.props.disciplineJudge.id))
            .filter(score => score != null);  // Case if score not found
        const crosses = scores.filter(score => score.data.cross).length;

        return (
            <GeneralLayout
                confirmationClass={ ScoreConfirmation }
                footerText={ _("tablet.dance_judge.crosses_status", crosses, this.props.tour.num_advances) }
                layoutClass={ ScoringLayout }
                scoreCompletionChecker={ QualificationSimpleLayout.checkScoreCompletion }
                { ...this.props }
            />
        );
    }
}