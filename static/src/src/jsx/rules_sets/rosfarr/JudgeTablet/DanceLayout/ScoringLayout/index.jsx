import _ from "l10n";

import ScorePart from "./ScorePart";
import Mistakes from "./Mistakes";

export default class ScoringLayout extends React.Component {
    renderPart(code, scale, additional_props={}) {
        return (
            <ScorePart
                code={ code }
                header={ _(`tablet.dance_judge.${code}`) }
                value={ this.props.scoreData[code] }
                scale={ scale }
                onScoreUpdate={ this.props.onScoreUpdate }
                {...additional_props} />
        );
    }
    render() {
        return (
            <div>
                { this.renderPart("fw_woman", "reduction") }
                { this.renderPart("fw_man", "reduction") }
                { this.renderPart("dance_figs", "integer", { min: 0, max: 25 }) }
                { this.renderPart("composition", "integer", { min: 0, max: 20 }) }
                <Mistakes
                    scoreData={ this.props.scoreData }
                    onScoreUpdate={ this.props.onScoreUpdate } />
            </div>
        );
    }
}
