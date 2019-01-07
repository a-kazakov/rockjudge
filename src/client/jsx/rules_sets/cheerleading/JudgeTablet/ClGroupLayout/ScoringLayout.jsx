import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";
import SeveralColumns from "JudgeTablet/SeveralColumns";
import ConfirmationButton from "JudgeTablet/ConfirmationButton";
import ScoringSection from "JudgeTablet/ScoringSection";

const RATIOS_EQ = [21, 21];
const RATIOS_15_5 = [31, 11];

export default class ScoringLayout extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        score: PT.object.isRequired,
        onScoreConfirm: PT.func.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    handleConfirm = () => {
        this.props.onScoreConfirm(this.props.score.id);
    };

    checkCanConfirm() {
        return Object.values(this.props.score.data).every(x => x != null);
    }

    renderSelector(part, max = 10) {
        const { readOnly, score, onScoreUpdate } = this.props;
        return (
            <ScoringSection
                max={max}
                part={part}
                readOnly={readOnly}
                score={score}
                onScoreUpdate={onScoreUpdate}
            />
        );
    }
    render() {
        const { number, name, sportsmen } = this.props.score.run.participant;
        const header = _(
            "global.phrases.participant_n",
            number,
            name,
            sportsmen.length,
        );
        return (
            <div>
                <div className="participant-header">
                    <div className="title">{header}</div>
                    <ConfirmationButton
                        canConfirm={this.checkCanConfirm()}
                        confirmed={this.props.score.confirmed}
                        onConfirm={this.handleConfirm}
                    />
                </div>
                <SeveralColumns ratios={RATIOS_EQ}>
                    {this.renderSelector("cheer_block")}
                    {this.renderSelector("acrobatics")}
                </SeveralColumns>
                {this.renderSelector("stunts", 25)}
                {this.renderSelector("pyramids", 25)}
                <SeveralColumns ratios={RATIOS_15_5}>
                    {this.renderSelector("tosses", 15)}
                    {this.renderSelector("continuity", 5)}
                </SeveralColumns>
                <SeveralColumns ratios={RATIOS_EQ}>
                    {this.renderSelector("impression")}
                    <div />
                </SeveralColumns>
            </div>
        );
    }
}
