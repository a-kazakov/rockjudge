import {React} from "HostModules";

import PT from "prop-types";
import getScoringType from "common/getScoringType";

export default class VerboseJudgeScore extends React.Component {
    static propTypes = {
        disciplineJudge: PT.object.isRequired,
        score: PT.object.isRequired,
        scoreData: PT.shape({
            is_valid: PT.bool.isRequired,
            total_score_str: PT.string.isRequired,
            extra_data: PT.object.isRequired,
        }).isRequired,
        showScore: PT.bool,
    };
    static get defaultProps() {
        return {
            showScore: true,
        }
    }

    render() {
        if (!this.props.showScore) {
            return (
                <p className="text-center">
                    &mdash;
                </p>
            );
        }
        // let ScoreComponent = null;
        const scoring_type = getScoringType(this.props.disciplineJudge, this.props.score.run.tour.scoring_system_name);
        switch (scoring_type) {
        default:
            return (
                <p className="text-center">
                    { this.props.scoreData.total_score_str }
                </p>
            );
        }
        // const props = {
        //     run: this.props.run,
        //     score: this.props.score,
        //     additionalData: this.props.additionalData,
        //     scoringType: scoring_type,
        // };
        // return (
        //     <ScoreComponent { ...props } />
        // );
    }
}

