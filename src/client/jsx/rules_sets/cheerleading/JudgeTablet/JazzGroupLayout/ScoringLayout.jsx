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
                        {this.renderSelector("tech_execution", "tech")}
                        {this.renderSelector("tech_control_stretching")}
                        {this.renderSelector("tech_style_power")}
                    </div>
                    <div className="parts-block">
                        {this.renderSelector("group_sync", "group")}
                        {this.renderSelector("group_similarity")}
                        {this.renderSelector("group_position")}
                    </div>
                </SeveralColumns>
                <SeveralColumns ratios={RATIOS}>
                    <div className="parts-block">
                        {this.renderSelector("choreography_art", "choreography")}
                        {this.renderSelector("choreography_performance_effects")}
                        {this.renderSelector("choreography_complexity")}
                    </div>
                    <>
                        <div className="parts-block">
                            {this.renderSelector("impression_art", "impression_art")}
                        </div>
                        <br />
                    </>
                </SeveralColumns>
            </div>
        );
    }
}
