import _ from "l10n";

import GeneralLayout from "JudgeTablet/GeneralLayout";
import ScoreConfirmation from "./ScoreConfirmation";
import ScoringLayout from "./ScoringLayout";

export default class QualificationSimpleLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            disciplineJudge: PT.shape({
                id: PT.number.isRequired,
            }).isRequired,
            tour: PT.shape({
                id: PT.number.isRequired,
                num_advances: PT.number.isRequired,
                runs: PT.arrayOf(
                    PT.shape({
                        status: PT.oneOf(["OK", "NP", "DQ"]).isRequired,
                        scores: PT.arrayOf(
                            PT.shape({
                                discipline_judge_id: PT.number.isRequired,
                            }).isRequired,
                        ).isRequired,
                    }).isRequired,
                ).isRequired,
            }).isRequired,
        };
    }

    render() {
        const scores = this.props.tour.runs
            .filter(run => run.status === "OK")
            .map(run => run.scores.find(score => score?.discipline_judge_id === this.props.disciplineJudge.id))
            .filter(score => score);  // Case if score not found
        const crosses = scores.filter(score => score.data.raw_data.cross).length;

        return (
            <GeneralLayout
                confirmationClass={ ScoreConfirmation }
                footerText={ _("tablet.dance_judge.crosses_status", crosses, this.props.tour.num_advances) }
                layoutClass={ ScoringLayout }
                { ...this.props }
            />
        );
    }
}
