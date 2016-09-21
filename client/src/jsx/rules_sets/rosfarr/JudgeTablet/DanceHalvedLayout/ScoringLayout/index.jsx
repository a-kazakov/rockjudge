import _ from "l10n";

import ScorePart from "./ScorePart";
import Mistakes from "./Mistakes";
import TotalScore from "JudgeTablet/TotalScore";

export default class ScoringLayout extends React.Component {
    renderPart(code, scale, additional_props={}) {
        return (
            <ScorePart
                code={ code }
                header={ _(`tablet.dance_judge.${code}`) }
                readOnly={ this.props.readOnly }
                scale={ scale }
                value={ this.props.scoreData[code] }
                onScoreUpdate={ this.props.onScoreUpdate }
                {...additional_props}
            />
        );
    }
    render() {
        return (
            <div>
                { this.renderPart("fw_woman", "reduction") }
                { this.renderPart("fw_man", "reduction") }
                { this.renderPart("dance_figs", "point5", { min: 0, max: 12.5 }) }
                { this.renderPart("composition", "point5", { min: 0, max: 10 }) }
                <Mistakes
                    readOnly={ this.props.readOnly }
                    scoreData={ this.props.scoreData }
                    onScoreUpdate={ this.props.onScoreUpdate }
                />
                <TotalScore
                    score={ this.props.score }
                />
            </div>
        );
    }
}