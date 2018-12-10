import {React} from "HostModules";

import PT from "prop-types";
import _ from "l10n";

import IntegerInput from "tablet_ui/IntegerInput";

import StopWatch from "common/StopWatch";

import CardInput from "JudgeTablet/components/CardInput";
import PreviousCards from "JudgeTablet/components/PreviousCards";
import checkSS from "common/checkSS";

export default class ScoringLayoutDance extends React.Component {
    static propTypes = {
        score: PT.object.isRequired,
        onScoreUpdate: PT.func.isRequired,
    };

    static canConfirm() {
        return true;
    }

    handleCardChange = (value) => {
        this.props.onScoreUpdate(null, value);
    };
    handleTimeChange = (value, force_submit=false) => {
        this.props.onScoreUpdate("time", value, force_submit);
    };
    handleJumpStepsChange = (value) => {
        this.props.onScoreUpdate("jump_steps", value);
    };
    handleUndercountChange = (value) => {
        this.props.onScoreUpdate("undercount", value);
    };

    renderFormationUndercountInput() {
        if (!checkSS(this.props.score.run.tour.scoring_system_name, "formation")) {
            return null;
        }
        return (
            <div className="undercount mistakes">
                <h3>{ _("tablet.tech_judge.undercount") }</h3>
                <IntegerInput
                    jumbo
                    readOnly={ this.props.score.confirmed }
                    value={ this.props.score.data.undercount }
                    onChange={ this.handleUndercountChange }
                />
            </div>
        );
    }
    render() {
        return (
            <div className="dance-part">
                <div className="side-part">
                    <h3>{ _("tablet.tech_judge.jump_steps") }</h3>
                    <IntegerInput
                        jumbo
                        readOnly={ this.props.score.confirmed }
                        value={ this.props.score.data.jump_steps }
                        onChange={ this.handleJumpStepsChange }
                    />
                </div>
                <div className="main-part">
                    <h3>
                        { _("tablet.tech_judge.stopwatch") }
                    </h3>
                    <StopWatch
                        readOnly={ this.props.score.confirmed }
                        stopwatchId={ this.props.score.id }
                        value={ this.props.score.data.time }
                        onChange={ this.handleTimeChange }
                    />
                    { this.renderFormationUndercountInput() }
                    <PreviousCards
                        run={ this.props.score.run }
                        tourResults={ this.props.score.run.tour.results }
                    />
                    <CardInput
                        readOnly={ this.props.score.confirmed }
                        score={ this.props.score }
                        onChange={ this.handleCardChange }
                    />
                </div>
            </div>
        );
    }
}