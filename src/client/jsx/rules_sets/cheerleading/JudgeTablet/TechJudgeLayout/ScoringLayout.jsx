import { React } from "HostModules";
import PT from "prop-types";
import _ from "l10n";
import ConfirmationButton from "JudgeTablet/ConfirmationButton";
import SeveralColumns from "JudgeTablet/SeveralColumns";
import StopWatch from "common/StopWatch";
import SelectorInput from "tablet_ui/SelectorInput";
import CheckboxInput from "tablet_ui/CheckboxInput";
import IntegerInput from "tablet_ui/IntegerInput";

const RATIOS = [20, 20, 20];
const TIME_PENALTY_CHOICES = [
    [0, _("tablet.tech_judge.time_penalty_0")],
    [-1, _("tablet.tech_judge.time_penalty_1")],
    [-3, _("tablet.tech_judge.time_penalty_3")],
];

export default class ScoringLayout extends React.Component {
    static propTypes = {
        readOnly: PT.bool.isRequired,
        score: PT.object.isRequired,
        onScoreConfirm: PT.func.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    _changers_cache = new Map();

    handleConfirm = () => {
        this.props.onScoreConfirm(this.props.score.id);
    };

    getChangeHandler(key) {
        let result = this._changers_cache.get(key);
        if (result == null) {
            result = value => this.props.onScoreUpdate(key, value);
            this._changers_cache.set(key, result);
        }
        return result;
    }

    renderCheckbox(key) {
        const { score } = this.props;
        return (
            <div style={{ marginTop: "10px", marginBottom: "5px" }}>
                <CheckboxInput
                    label={_(`score_parts.components.long.${key}`)}
                    readOnly={score.confirmed}
                    value={score.data[key]}
                    onChange={this.getChangeHandler(key)}
                />
            </div>
        );
    }
    renderInteger(key, multiplier) {
        const { score } = this.props;
        const value = score.data[key];
        return (
            <div className="penalty-integer">
                <h3>{_(`score_parts.components.long.${key}`)}</h3>
                <IntegerInput
                    jumbo
                    displayText={(value * multiplier).toString()}
                    value={value}
                    onChange={this.getChangeHandler(key)}
                />
            </div>
        );
    }
    render() {
        const { score } = this.props;
        const { number, name, sportsmen } = score.run.participant;
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
                </div>
                <SeveralColumns ratios={RATIOS}>
                    <div>
                        <h3>{_("tablet.tech_judge.stopwatch")}</h3>
                        <StopWatch
                            readOnly={score.confirmed}
                            stopwatchId={score.id}
                            onChange={this.getChangeHandler("time")}
                        />
                        <h3>{_("score_parts.components.long.time_penalty")}</h3>
                        <SelectorInput
                            jumbo
                            choices={TIME_PENALTY_CHOICES}
                            readOnly={score.confirmed}
                            value={score.data.time_penalty}
                            onChange={this.getChangeHandler("time_penalty")}
                        />
                    </div>
                    <div>
                        <h3>{_("tablet.tech_judge.penalties")}</h3>
                        {this.renderCheckbox("music_violated")}
                        {this.renderCheckbox("entry_exit_violated")}
                        {this.renderCheckbox("dress_violated")}
                        {this.renderCheckbox("cheer_block_violated")}
                        {this.renderCheckbox("accessories_violated")}
                    </div>
                    <div>
                        {this.renderInteger("complexity_violations", -5)}
                        {this.renderInteger("other_penalties", -1)}
                    </div>
                </SeveralColumns>
                <div style={{ textAlign: "center", marginTop: "15px" }}>
                    <ConfirmationButton
                        confirmed={score.confirmed}
                        onConfirm={this.handleConfirm}
                    />
                </div>
            </div>
        );
    }
}
