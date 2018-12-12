import { React } from "HostModules";

import PT from "prop-types";
import Element from "./Element";

export default class ScoringLayout extends React.Component {
    static propTypes = {
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    static canConfirm(score_data, run) {
        for (let idx = 1; idx <= Math.min(run.acrobatics.length, 6); ++idx) {
            if (score_data[`a${idx}`] == null) {
                return false;
            }
        }
        return true;
    }

    handleAcroReductionUpdate = (acro_idx, value) => {
        this.props.onScoreUpdate(`a${acro_idx + 1}`, value);
    };

    render() {
        return (
            <div>
                {this.props.score.run.acrobatics.slice(0, 8).map((acro, acro_idx) => (
                    <Element
                        acroIdx={acro_idx}
                        key={acro_idx}
                        readOnly={this.props.score.confirmed}
                        reduction={this.props.score.data[`a${acro_idx + 1}`]}
                        onAcroReductionUpdate={this.handleAcroReductionUpdate}
                    />
                ))}
            </div>
        );
    }
}
