import Elements from "./Elements";
import Mistakes from "./Mistakes";
import TotalScore from "JudgeTablet/TotalScore";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            run: PT.object.isRequired,
            score: PT.object.isRequired,
            scoreData: PT.shape({
                mistakes: PT.any.isRequired,
            }).isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    static canConfirm(score_data, run) {
        for (let idx = 1; idx <= Math.min(run.acrobatics.length, 6); ++idx) {
            if (score_data[`a${idx}`] === null) {
                return false;
            }
        }
        return true;
    }

    handleAcroReductionUpdate = (acro_idx, value) => {
        this.props.onScoreUpdate(`a${acro_idx + 1}`, value);
    }

    render() {
        return (
            <div>
                <Elements
                    readOnly={ this.props.readOnly }
                    run={ this.props.run }
                    scoreData={ this.props.scoreData }
                    onAcroReductionUpdate={ this.handleAcroReductionUpdate }
                />
                <Mistakes
                    mistakes={ this.props.scoreData.mistakes }
                    readOnly={ this.props.readOnly }
                    onScoreUpdate={ this.props.onScoreUpdate }
                />
                <TotalScore
                    score={ this.props.score }
                />
            </div>
        );
    }
}
