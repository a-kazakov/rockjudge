import _ from "l10n";

import IntegerInput from "tablet_ui/IntegerInput";

import StopWatch from "common/StopWatch";

import CardInput from "JudgeTablet/components/CardInput";
import PreviousCards from "JudgeTablet/components/PreviousCards";
import checkSS from "common/checkSS";

export default class ScoringLayoutDance extends React.PureComponent {
    static get propTypes() {
        const PT = React.PropTypes;
        return {
            readOnly: PT.bool.isRequired,
            tour: PT.shape({
                scoring_system_name: PT.string.isRequired,
            }).isRequired,
            run: PT.object.isRequired,
            score: PT.object.isRequired,
            scoreData: PT.object.isRequired,
            onScoreUpdate: PT.func.isRequired,
        };
    }

    static canConfirm() {
        return true;
    }

    handleCardChange = (value) => {
        this.props.onScoreUpdate(null, value);
    };
    handleTimeChange = (value) => {
        this.props.onScoreUpdate("time", value);
    };
    handleJumpStepsChange = (value) => {
        this.props.onScoreUpdate("jump_steps", value);
    };
    handleUndercountChange = (value) => {
        this.props.onScoreUpdate("undercount", value);
    };

    renderFormationUndercountInput() {
        if (!checkSS(this.props.tour.scoring_system_name, "formation")) {
            return null;
        }
        return (
            <div className="undercount mistakes">
                <h3>{ _("tablet.tech_judge.undercount") }</h3>
                <IntegerInput
                    jumbo
                    sendDeltas
                    readOnly={ this.props.score.confirmed }
                    value={ this.props.scoreData.jump_steps }
                    onChange={ this.handleUndercountChange }
                />
            </div>
        );
    }
    render() {
        return (
            <div className="dance-part">
                <div className="jump-steps-timing">
                    <div className="timing">
                        <h3>
                            { _("tablet.tech_judge.stopwatch") }
                        </h3>
                        <StopWatch
                            readOnly={ this.props.readOnly }
                            stopwatchId={ this.props.score.id }
                            value={ this.props.scoreData.time }
                            onChange={ this.handleTimeChange }
                        />
                    </div>
                    <div className="jump-steps">
                        <h3>{ _("tablet.tech_judge.jump_steps") }</h3>
                        <IntegerInput
                            jumbo
                            sendDeltas
                            readOnly={ this.props.score.confirmed }
                            value={ this.props.scoreData.jump_steps }
                            onChange={ this.handleJumpStepsChange }
                        />
                        <div className="spacer" />
                    </div>
                </div>
                { this.renderFormationUndercountInput() }
                <PreviousCards
                    run={ this.props.run }
                />
                <CardInput
                    readOnly={ this.props.readOnly }
                    scoreData={ this.props.scoreData }
                    tour={ this.props.tour }
                    onChange={ this.handleCardChange }
                />
            </div>
        );
    }
}
