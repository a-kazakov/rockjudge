import _ from "l10n";

import Mistakes from "./Mistakes";
import GeneralScale from "JudgeTablet/GeneralScale";
import TotalScore from "JudgeTablet/TotalScore";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            score: PT.object.isRequired,
            scoreData: PT.object.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    renderPart(code, scale, additional_props={}) {
        return (
            <GeneralScale
                code={ code }
                header={ _(`tablet.dance_judge.${code}`) }
                readOnly={ this.props.readOnly }
                scale={ scale }
                value={ this.props.scoreData[code] }
                onChange={ this.props.onScoreUpdate }
                { ...additional_props }
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
