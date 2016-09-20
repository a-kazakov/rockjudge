import Elements from "./Elements";
import Mistakes from "./Mistakes";
import TotalScore from "JudgeTablet/TotalScore";

export default class ScoringLayout extends React.Component {
    handleAcroReductionUpdate = (acro_idx, value) => {
        let reductions = this.props.scoreData.reductions.map(() => null);
        reductions[acro_idx] = value;
        this.props.onScoreUpdate("reductions", reductions);
    }

    render() {
        return (
            <div>
                <Elements
                    readOnly={ this.props.readOnly }
                    reductions={ this.props.scoreData.reductions }
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
