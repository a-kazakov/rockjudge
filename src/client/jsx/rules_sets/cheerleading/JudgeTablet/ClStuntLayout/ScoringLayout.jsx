import { React } from "HostModules";

import PT from "prop-types";
import _ from "l10n";
import ConfirmationButton from "JudgeTablet/ConfirmationButton";
import ScoringSection from "JudgeTablet/ScoringSection";

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
                <div className="parts-block">
                    <h3>{_("score_parts.groups.long.stunt")}</h3>
                    {this.renderSelector("stunt_tech", 30)}
                    {this.renderSelector("stunt_complexity", 25)}
                    {this.renderSelector("stunt_shape", 20)}
                </div>
                <div className="parts-block">
                    <h3>{_("score_parts.groups.long.presentation")}</h3>
                    {this.renderSelector("presentation_transitions", 15)}
                    {this.renderSelector("presentation_complexity", 10)}
                </div>
            </div>
        );
    }
}
