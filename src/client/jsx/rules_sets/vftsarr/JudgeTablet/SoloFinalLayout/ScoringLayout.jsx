import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import Mistakes from "JudgeTablet/components/Mistakes";
import GeneralScale from "JudgeTablet/components/GeneralScale";
import checkSS from "common/checkSS";

export default class ScoringLayout extends React.Component {
    static propTypes = {
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    renderPart(code, scale, additional_props = {}) {
        return (
            <GeneralScale
                code={code}
                header={_(`tablet.dance_judge.${code}`)}
                readOnly={this.props.score.confirmed}
                scale={scale}
                value={this.props.score.data[code]}
                onChange={this.props.onScoreUpdate}
                {...additional_props}
            />
        );
    }
    render() {
        return (
            <div>
                {this.renderPart("fw", "reduction")}
                {this.renderPart("variations", "reduction")}
                {this.renderPart("dance_figs", "number", {
                    min: 0,
                    max: 10,
                    step: 0.5,
                })}
                <Mistakes
                    readOnly={this.props.score.confirmed}
                    scoreData={this.props.score.data}
                    onScoreUpdate={this.props.onScoreUpdate}
                />
            </div>
        );
    }
}
