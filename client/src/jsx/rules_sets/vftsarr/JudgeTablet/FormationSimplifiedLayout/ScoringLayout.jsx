import _ from "l10n";

import Mistakes from "JudgeTablet/components/Mistakes";
import GeneralScale from "JudgeTablet/components/GeneralScale";

export default class ScoringLayout extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            score: PT.object.isRequired,
            scoreData: PT.object.isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
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
                { this.renderPart("fw", "reduction") }
                { this.renderPart("dance_figs", "number", { min: 0, max: 10, step: 0.5 }) }
                { this.renderPart("composition", "number", { min: 0, max: 10, step: 0.5 }) }
                { this.renderPart("figures", "number", { min: 0, max: 10, step: 0.5 }) }
                <Mistakes
                    formation
                    readOnly={ this.props.readOnly }
                    scoreData={ this.props.scoreData }
                    onScoreUpdate={ this.props.onScoreUpdate }
                />
            </div>
        );
    }
}
