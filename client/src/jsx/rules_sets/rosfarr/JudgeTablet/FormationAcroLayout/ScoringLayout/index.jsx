import _ from "l10n";

import ScorePart from "./ScorePart";
import Mistakes from "./Mistakes";
import TotalScore from "JudgeTablet/TotalScore";

export default class ScoringLayout extends React.Component {
    renderPart(code, scale, additional_props={}) {
        return (
            <ScorePart
                readOnly={ this.props.readOnly }
                code={ code }
                header={ _(`tablet.dance_judge.${code}`) }
                value={ this.props.scoreData[code] }
                scale={ scale }
                onScoreUpdate={ this.props.onScoreUpdate }
                {...additional_props}
            />
        );
    }
    render() {
        return (
            <div>
                { this.renderPart("acrobatics", "point5", { min: 0, max: 10 }) }
                { this.renderPart("dance_tech", "point5", { min: 0, max: 10 }) }
                { this.renderPart("dance_figs", "point5", { min: 0, max: 10 }) }
                { this.renderPart("impression", "point5", { min: 0, max: 10 }) }
                <Mistakes
                    readOnly={ this.props.readOnly }
                    scoreData={ this.props.scoreData }
                    onScoreUpdate={ this.props.onScoreUpdate }
                />
                <TotalScore
                    readOnly={ this.props.readOnly }
                    score={ this.props.score }
                />
            </div>
        );
    }
}
