import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";
import SeveralColumns from "JudgeTablet/SeveralColumns";
import ConfirmationButton from "JudgeTablet/ConfirmationButton";
import ScoringSection from "JudgeTablet/ScoringSection";

const RATIOS = [21, 21];

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

    renderSelector(part, group = null) {
        const { readOnly, score, onScoreUpdate } = this.props;
        return (
            <ScoringSection
                group={group}
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
                <SeveralColumns ratios={RATIOS}>
                    <div className="parts-block">
                        {this.renderSelector("tech_fulfillment", "tech")}
                        {this.renderSelector("tech_control")}
                        {this.renderSelector("tech_power")}
                        {this.renderSelector("tech_stretching")}
                    </div>
                    <div className="parts-block">
                        {this.renderSelector("choreography_musicality", "choreography")}
                        {this.renderSelector("choreography_complexity")}
                        {this.renderSelector("choreography_style")}
                        {this.renderSelector("choreography_performance")}
                    </div>
                </SeveralColumns>
                <SeveralColumns ratios={RATIOS}>
                    <div className="parts-block">
                        {this.renderSelector("group_sync", "group")}
                    </div>
                    <div className="parts-block">
                        {this.renderSelector("impression_art", "impression_art")}
                    </div>
                </SeveralColumns>
            </div>
        );
    }
}
