class TabletScoreInput extends React.Component {
    updateScores(type, value) {
        let new_score = {};
        new_score[type] = value;
        this.props.onScoreUpdate(new_score);
    }
    updateAcroDeduction(idx, value) {
        let score = this.props.scores[this.props.judge_id].data;
        let deductions = score.map(() => null);
        deductions[idx] = value;
        let new_score = {
            deductions: deductions,
        }
        this.props.onScoreUpdate(new_score);
    }
    overrideAcroScore(acro_id, value) {
        Api("tournaments.acrobatic_override.set", {
            run_id: this.props.run_id,
            acrobatic_id: acro_id,
            score: value,
        }).send();
    }
    getCurrentJudge() {
        for (var idx in this.props.judges) if (this.props.judges.hasOwnProperty(idx)) {
            if (this.props.judges[idx].id === this.props.judge_id) {
                return this.props.judges[idx];
            }
        }
    }
    renderHeadJudgeInput() {
        var tech_judges = this.props.judges.filter(function(judge) {
            return judge.role == "tech_judge";
        }).map(function(judge) {
            var timing_data = (this.props.scores[judge.id].data.raw_data.timing_violation === null)
                ? ["-", ""]
                : (this.props.scores[judge.id].data.raw_data.timing_violation ? ["X", " fail"] : ["OK", " ok"])
            return <div>
                <h3>{ judge.name }:</h3>
                <div className="tech-judge-info">
                    <div className="title">
                        Jump steps:
                    </div>
                    <div className="value">
                        { this.props.scores[judge.id].data.raw_data.jump_steps }
                    </div>
                </div>
                <div className="tech-judge-info">
                    <div className="title">
                        Timing:
                    </div>
                    <div className={ "value" + timing_data[1] }>
                        { timing_data[0] }
                    </div>
                </div>
            </div>
        }.bind(this));
        var score = this.props.scores[this.props.judge_id].data;
        return <div>
            <h3>Penalty type:</h3>
            <TabletSelectorInput
                choices={ [[0, "OK"], [-5, "Yellow card"], [-30, "Red card"], [-100, "-100"]] }
                active={ score.raw_data.penalty }
                onValueUpdate={ this.updateScores.bind(this, "penalty") } />
            <div className="spacer"></div>
            { tech_judges }
        </div>
    }
    renderTechJudgeInputAcro() {
        var acrobatics = this.props.acrobatics.map(function(acro) {
            return <div className="tech-judge-acro" key={ acro.id }>
                <h3>
                    { acro.description }
                </h3>
                <div className="controls">
                    <button className="tbtn btn-reset" onClick={ this.overrideAcroScore.bind(this, acro.id, null) }>
                        Reset to { acro.original_score }
                    </button>
                    <div className="setter">
                        <TabletIntegerInput
                            value={ acro.score }
                            onValueUpdate={ this.overrideAcroScore.bind(this, acro.id) } />
                    </div>
                </div>
                <div className="clearfix"></div>
            </div>;
        }.bind(this));
        return <div>{ acrobatics }</div>;
    }
    renderTechJudgeInputDance() {
        var score = this.props.scores[this.props.judge_id].data;
        return <div>
            <h3>Jump steps count:</h3>
            <TabletIntegerInput
                value={ score.raw_data.jump_steps }
                onValueUpdate={ this.updateScores.bind(this, "jump_steps") } />
            <div className="spacer"></div>
            <h3>Dancing time:</h3>
            <StopWatch />
            <TabletSelectorInput
                choices={ [[true, "X"], [null, "-"], [false, "OK"]] }
                active={ score.raw_data.timing_violation }
                onValueUpdate={ this.updateScores.bind(this, "timing_violation") } />
        </div>;
    }
    renderTechJudgeInput() {
        var content;
        if (this.props.page == "acro") {
            return this.renderTechJudgeInputAcro();
        } else {
            return this.renderTechJudgeInputDance();
        }
    }
    renderDanceJudgeInput() {
        var score = this.props.scores[this.props.judge_id].data;
        return <div>
            <h3>Footwork, woman (% reduction):</h3>
            <TabletSelectorInput
                choices={ [[100, "X"], [75, "75%"], [50, "50%"], [25, "25%"], [10, "10%"], [5, "5%"], [0, "OK"]] }
                active={ score.raw_data.fw_woman }
                onValueUpdate={ this.updateScores.bind(this, "fw_woman") } />
            <h3>Footwork, man (% reduction):</h3>
            <TabletSelectorInput
                choices={ [[100, "X"], [75, "75%"], [50, "50%"], [25, "25%"], [10, "10%"], [5, "5%"], [0, "OK"]] }
                active={ score.raw_data.fw_man }
                onValueUpdate={ this.updateScores.bind(this, "fw_man") } />
            <h3>Dance figures:</h3>
            <TabletIntegerSelectInput
                min={ 0 }
                max={ 25 }
                active={ score.raw_data.dance_figs }
                onValueUpdate={ this.updateScores.bind(this, "dance_figs") } />
            <h3>Composition:</h3>
            <TabletIntegerSelectInput
                min={ 0 }
                max={ 20 }
                active={ score.raw_data.composition }
                onValueUpdate={ this.updateScores.bind(this, "composition") } />
            <table className="mistakes full-width"><tbody><tr>
                <td>
                    <h3>Small mistakes (-5):</h3>
                    <TabletIntegerInput
                        value={ score.raw_data.small_mistakes }
                        onValueUpdate={ this.updateScores.bind(this, "small_mistakes") } />
                </td><td>
                    <h3>Big mistakes (-30):</h3>
                    <TabletIntegerInput
                        value={ score.raw_data.big_mistakes }
                        onValueUpdate={ this.updateScores.bind(this, "big_mistakes") } />
                </td>
            </tr></tbody></table>
            <div className="total-score">Total score: { score.total_score }</div>
        </div>
    }
    renderAcroJudgeInput() {
        var score = this.props.scores[this.props.judge_id].data;
        var inputs = this.props.acrobatics.map(function(acro, idx) {
            return <div>
                <h3>{ acro.description }</h3>
                <TabletSelectorInput
                    choices={ [[100, "X"], [75, "75%"], [50, "50%"], [25, "25%"], [10, "10%"], [5, "5%"], [0, "OK"]] }
                    active={ score.raw_data.deductions[idx] }
                    onValueUpdate={ this.updateAcroDeduction.bind(this, idx) } />
            </div>
        }.bind(this));
        return <div>
            { inputs }
            <div className="mistakes">
                <h3>Fall down (-30):</h3>
                <TabletIntegerInput
                    value={ score.raw_data.mistakes }
                    onValueUpdate={ this.updateScores.bind(this, "mistakes") } />
            </div>
            <div className="total-score">Total score: { score.total_score }</div>
        </div>
    }
    render() {
        switch (this.getCurrentJudge().role) {
        case "acro_judge":
            return this.props.scoring_system == "rosfarr.no_acro"
                ? this.renderDanceJudgeInput()
                : this.renderAcroJudgeInput()
        case "dance_judge":
            return this.renderDanceJudgeInput();
        case "head_judge":
            return this.renderHeadJudgeInput();
        case "tech_judge":
            return this.renderTechJudgeInput();
        default:
            console.log("Unknown judge role", this.props.judges[this.props.judge_id].role);
            return null;
        }
    }
}
