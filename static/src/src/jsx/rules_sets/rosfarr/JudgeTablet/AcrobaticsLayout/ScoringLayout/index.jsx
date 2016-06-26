import _ from "l10n";

import Elements from "./Elements";
import Mistakes from "./Mistakes";

export default class ScoringLayout extends React.Component {
    onAcroReductionUpdate = (acro_idx, value) => {
        let reductions = this.props.scoreData.reductions.map(() => null);
        reductions[acro_idx] = value;
        this.props.onScoreUpdate("reductions", reductions);
    }
    render() {
        return (
            <div>
                <Elements
                    reductions={ this.props.scoreData.reductions }
                    onAcroReductionUpdate={ this.onAcroReductionUpdate } />
                <Mistakes
                    mistakes={ this.props.scoreData.mistakes }
                    onScoreUpdate={ this.props.onScoreUpdate } />
            </div>
        );
    }
}
