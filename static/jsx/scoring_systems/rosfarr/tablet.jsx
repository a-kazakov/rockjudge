function __() {
    let args = [];
    for (let idx = 1; idx < arguments.length; ++idx) {
        args.push(arguments[idx]);
    }
    return _("scoring_systems.rosfarr." + arguments[0], ...args);
}

// Head judge

class HeadJudgeActobaticOverrides extends React.Component {
    getAcrobaticOverrides() {
        return this.props.acrobatics
            .map((acro, idx) => ({ idx: idx + 1, acrobatic: acro }))
            .filter((acro) => acro.acrobatic.original_score != acro.acrobatic.score);
    }
    render() {
        let acrobatic_overrides = this.getAcrobaticOverrides();
        if (acrobatic_overrides.length == 0) {
            return null;
        }
        return <div>
            <div className="spacer"></div>
            <h3>{ __("tablet.head_judge.acrobatic_overrides") }</h3>
            <table className="full-width"><tbody>
                { acrobatic_overrides.map((acro) =>
                    <tr key={ acro.idx }>
                        <td className="w-5">{ acro.idx }</td>
                        <td>{ acro.acrobatic.description }</td>
                        <td className="w-10 text-right">{ acro.acrobatic.original_score.toFixed(1) }</td>
                        <td className="w-5 text-center">→</td>
                        <td className="w-10 text-left">{ acro.acrobatic.score.toFixed(1) }</td>
                    </tr>
                ) }
            </tbody></table>
        </div>
    }
}

class HeadJudgePreviousPenlties extends React.Component {
    render() {
        if (!this.props.penalties || this.props.penalties.length == 0) {
            return null;
        }
        return <div>
            <div className="spacer"></div>
            <h3>{ __("tablet.head_judge.previous_penalties") }</h3>
            <table className="full-width"><tbody> {
                this.props.penalties.map((d, idx) =>
                    <tr key={ idx }>
                        <td className="w-10 text-center"><strong>{ d.penalty }</strong></td>
                        <td>{ d.tour }</td>
                    </tr>
                ) }
            </tbody></table>
        </div>
    }
}

class HeadJudgeTechJudgeScore extends React.Component {
    getTimingData() {
        let tv_raw_value = this.props.score.data.raw_data.timing_violation;
        if (tv_raw_value === null) {
            return ["-", ""];
        } else if (tv_raw_value) {
            return ["X", " fail"];
        } else {
            return ["OK", " ok"];
        }
    }
    render() {
        let timing_data = this.getTimingData();
        return <div>
            <h3 className={ this.props.score.confirmed ? "confirmed" : "" }>{ this.props.discipline_judge.judge.name }</h3>
            <table className="tech-judge-info"><tbody><tr>
                <td className="title">
                    { __("tablet.tech_judge.jump_steps") }
                </td>
                <td className="value">
                    <div className="inner">
                        { this.props.score.data.raw_data.jump_steps }
                    </div>
                </td>
                <td className="title">
                    { __("tablet.tech_judge.timing") }
                </td>
                <td className="value">
                    <div className={ "inner" + timing_data[1] }>
                        { timing_data[0] }
                    </div>
                </td>
            </tr></tbody></table>
        </div>
    }
}

class HeadJudgeTechJudgesScores extends React.Component {
    getTechDisciplineJudges() {
        return this.props.all_discipline_judges.filter((dj) => dj.role == "tech_judge");
    }
    renderContent() {
        return this.getTechDisciplineJudges().map((tech_judge) =>
            <HeadJudgeTechJudgeScore
                key={ tech_judge.id }
                discipline_judge={ tech_judge }
                score={ this.props.all_scores[tech_judge.id] } />
        );
    }
    render() {
        return <div>
            <div className="spacer"></div>
            { this.renderContent() }
        </div>
    }
}

class HeadJudgeDanceJudgeScore extends React.Component {
    render() {
        return <td className={ this.props.score.confirmed ? "confirmed" : "" }>
            { this.props.score.data.total_score.toFixed(2) }
        </td>
    }
}

class HeadJudgeDanceJudgesScores extends React.Component {
    getDanceDisciplineJudges() {
        return this.props.all_discipline_judges.filter((dj) => dj.role == "dance_judge" || dj.role == "acro_judge");
    }
    renderContent() {
        return this.getDanceDisciplineJudges().map((judge) =>
            <HeadJudgeDanceJudgeScore
                key={ judge.id }
                discipline_judge={ judge }
                score={ this.props.all_scores[judge.id] } />
        );
    }
    render() {
        return <div>
            <h3>{ __("tablet.head_judge.dance_judge_scores") }</h3>
            <table className="dance-judge-scores"><tbody><tr>
                { this.renderContent() }
            </tr></tbody></table>
        </div>
    }
}

class HeadJudgeNotPerformedSwitch extends React.Component {
    markNotPerformed() {
        Api("run.mark_not_performed", { run_id: this.props.run_id }).send();
    }
    markPerformed() {
        Api("run.mark_performed", { run_id: this.props.run_id }).send();
    }
    renderButton() {
        if (this.props.performed) {
            return <button type="button" className="btn btn-sm btn-danger" onClick={ this.markNotPerformed.bind(this) }>
                { _("tablet.buttons.not_performed") }
            </button>
        } else {
            return <button type="button" className="btn btn-sm btn-success" onClick={ this.markPerformed.bind(this) }>
                { _("tablet.buttons.performed") }
            </button>
        }
    }
    render() {
        return <div className="not-performed-control">
            { this.renderButton() }
        </div>
    }
}

class HeadJudgeScoreInput extends React.Component {
    getPenaltyCoices() {
        return [
            [0,    __("tablet.head_judge.ok")],
            [-3,   __("tablet.head_judge.yellow_card")],
            [-30,  __("tablet.head_judge.red_card")],
            [-100, __("tablet.head_judge.black_card")]
        ];
    }
    genOnPenaltyUpdate() {
        return (new_value) => this.props.onScoreUpdate("penalty", new_value);
    }
    render() {
        if (!this.props.run.performed) {
            return <HeadJudgeNotPerformedSwitch
                run_id={ this.props.run.id }
                performed={ this.props.run.performed } />

        }
        return <div>
            <h3>{ __("tablet.head_judge.penalty_type") }</h3>
            <TabletSelectorInput
                choices={ this.getPenaltyCoices() }
                active={ this.props.score.data.raw_data.penalty }
                onValueUpdate={ this.genOnPenaltyUpdate() } />
            <HeadJudgeTechJudgesScores
                all_discipline_judges={ this.props.all_discipline_judges }
                all_scores={ this.props.all_scores } />
            <HeadJudgeDanceJudgesScores
                all_discipline_judges={ this.props.all_discipline_judges }
                all_scores={ this.props.all_scores } />
            <HeadJudgeActobaticOverrides
                acrobatics={ this.props.run.acrobatics } />
            <HeadJudgePreviousPenlties
                penalties={ this.props.run.inherited_data.penalties } />
            <HeadJudgeNotPerformedSwitch
                run_id={ this.props.run.id }
                performed={ this.props.run.performed } />
        </div>
    }
}

// Tech Judge

class TechJudgeAcrobaticOverride extends React.Component {
    render() {
        return <div className="tech-judge-acro">
            <div className="controls pull-right">
                <div className="setter">
                    <TabletPoint5Input
                        value={ this.props.acro.score }
                        onValueUpdate={ this.props.onAcroOverride } />
                </div>
            </div>
            <h3>
                { this.props.acro.description } (={ this.props.acro.original_score })
            </h3>
            <div className="clearfix"></div>
        </div>
    }
}

class TechJudgeAcroScoreInput extends React.Component {
    genOnAcroOverride(acro_idx) {
        return (new_value) => this.props.onAcroOverride(acro_idx, new_value);
    }
    renderContent() {
        return this.props.acrobatics.map((acro, idx) =>
            <TechJudgeAcrobaticOverride
                key={ idx }
                acro={ acro }
                onAcroOverride={ this.genOnAcroOverride(idx) } />
        );
    }
    render() {
        return <div>
            { this.renderContent() }
        </div>
    }
}

class TechJudgeDanceScoreInput extends React.Component {
    genOnScoreUpdate(score_part) {
        return (new_value) => this.props.onScoreUpdate(score_part, new_value);
    }
    render() {
        let score = this.props.score.data;
        return <div>
            <h3>{ __("tablet.tech_judge.jump_steps") }</h3>
            <TabletIntegerInput
                value={ score.raw_data.jump_steps }
                onValueUpdate={ this.genOnScoreUpdate("jump_steps") } />
            <div className="spacer"></div>
            <h3>{ __("tablet.tech_judge.timing") }</h3>
            <StopWatch />
            <TabletSelectorInput
                choices={ [[true, "X"], [null, "-"], [false, "OK"]] }
                active={ score.raw_data.timing_violation }
                onValueUpdate={ this.genOnScoreUpdate("timing_violation") } />
        </div>
    }
}

class TechJudgeScoreInput extends React.Component {
    render() {
        if (this.props.page == "acro") {
            return <TechJudgeAcroScoreInput
                acrobatics={ this.props.run.acrobatics }
                onAcroOverride={ this.props.onAcroOverride } />
        } else {
            return <TechJudgeDanceScoreInput
                score={ this.props.score }
                onScoreUpdate={ this.props.onScoreUpdate } />
        }
    }
}

// Dance judge

class DanceJudgeScorePartInput extends React.Component {
    genOnScoreUpdate() {
        return (new_value) => this.props.onScoreUpdate(this.props.part, new_value);
    }
    renderHeader() {
        if (this.props.skip_header) {
            return null;
        }
        return <h3>{ __("tablet.dance_judge." + this.props.part) }</h3>
    }
    render() {
        return <div>
            { this.renderHeader() }
            <ScorePartScale
                scale={ this.props.scale }
                active={ this.props.score.data.raw_data[this.props.part] }
                onValueUpdate={ this.genOnScoreUpdate() }
                {...this.props.scale_props} />
        </div>
    }
}

class DanceJudgeScoreMistakes extends React.Component {
    genOnScoreUpdate(score_part) {
        return (new_value) => this.props.onScoreUpdate(score_part, new_value);
    }
    render() {
        let score_data = this.props.score.data.raw_data;
        return <table className="mistakes full-width"><tbody><tr>
            <td>
                <h3>{ __("tablet.dance_judge.small_mistakes") }</h3>
                <TabletIntegerInput
                    value={ score_data.small_mistakes }
                    onValueUpdate={ this.genOnScoreUpdate("small_mistakes") } />
            </td><td>
                <h3>{ __("tablet.dance_judge.big_mistakes") }</h3>
                <TabletIntegerInput
                    value={ score_data.big_mistakes }
                    onValueUpdate={ this.genOnScoreUpdate("big_mistakes") } />
            </td>
        </tr></tbody></table>
    }
}

class DanceJudgeFinalDanceScoreInput extends React.Component {
    render() {
        return <div>
            <DanceJudgeScorePartInput
                part="fw_woman"
                scale="reduction"
                {...this.props} />
            <DanceJudgeScorePartInput
                part="fw_man"
                scale="reduction"
                {...this.props} />
            <DanceJudgeScorePartInput
                part="dance_figs"
                scale="point5"
                scale_props={{
                    min: 0,
                    max: 12.5,
                }}
                {...this.props} />
            <DanceJudgeScorePartInput
                part="composition"
                scale="point5"
                scale_props={{
                    min: 0,
                    max: 10,
                }}
                {...this.props} />
            <DanceJudgeScoreMistakes
                {...this.props} />
        </div>
    }
}

class DanceJudgeDanceScoreInput extends React.Component {
    render() {
        return <div>
            <DanceJudgeScorePartInput
                part="fw_woman"
                scale="reduction"
                {...this.props} />
            <DanceJudgeScorePartInput
                part="fw_man"
                scale="reduction"
                {...this.props} />
            <DanceJudgeScorePartInput
                part="dance_figs"
                scale="integer"
                scale_props={{
                    min: 0,
                    max: 25,
                }}
                {...this.props} />
            <DanceJudgeScorePartInput
                part="composition"
                scale="integer"
                scale_props={{
                    min: 0,
                    max: 20,
                }}
                {...this.props} />
            <DanceJudgeScoreMistakes
                {...this.props} />
        </div>
    }
}

class DanceJudgeFormationScoreInput extends React.Component {
    render() {
        return <div>
            <DanceJudgeScorePartInput
                part="dance_tech"
                scale="point5"
                scale_props={{
                    min: 0,
                    max: 10,
                }}
                {...this.props} />
            <DanceJudgeScorePartInput
                part="dance_figs"
                scale="point5"
                scale_props={{
                    min: 0,
                    max: 10,
                }}
                {...this.props} />
            <DanceJudgeScorePartInput
                part="impression"
                scale="point5"
                scale_props={{
                    min: 0,
                    max: 10,
                }}
                {...this.props} />
            <DanceJudgeScoreMistakes
                {...this.props} />
        </div>
    }
}

class DanceJudgeSimplifiedScoreInput extends React.Component {
    render() {
        return <div>
            <DanceJudgeScorePartInput
                part="points"
                scale="grid"
                skip_header={ true }
                scale_props={{
                    min: 1,
                    max: 40,
                    row_size: 10,
                }}
                {...this.props} />
        </div>
    }
}

class DanceJudgeScoreInput extends React.Component {
    render() {
        let props = {
            score: this.props.score,
            onScoreUpdate: this.props.onScoreUpdate,
        };
        switch (this.props.scoring_system_name) {
        case "rosfarr.acro":
        case "rosfarr.no_acro":
            return <DanceJudgeDanceScoreInput {...props} />
        case "rosfarr.am_final_fw":
        case "rosfarr.am_final_acro":
            return <DanceJudgeFinalDanceScoreInput {...props} />
        case "rosfarr.formation":
            return <DanceJudgeFormationScoreInput {...props} />
        case "rosfarr.simplified":
            return <DanceJudgeSimplifiedScoreInput {...props} />
        default:
            return null;
        }
    }
}

// Acro judge

class AcroJudgeAcrobaticInput extends React.Component {
    render() {
        return <div>
            <h3>{ _("tablet.headers.acro_n", this.props.acro_idx) }</h3>
            <ScorePartScale
                scale="reduction"
                active={ this.props.reduction }
                onValueUpdate={ this.props.onAcroReductionUpdate } />
        </div>
    }
}

class AcroJudgeScoreMistakes extends React.Component {
    render() {
        return <div className="mistakes">
            <h3>{ __("tablet.acro_judge.fall_down") }</h3>
            <TabletIntegerInput
                value={ this.props.mistakes }
                onValueUpdate={ this.props.onScoreUpdate } />
        </div>
    }
}

class AcroJudgeInput extends React.Component {
    genOnAcroReductionUpdate(acro_idx) {
        return (new_value) => this.props.onAcroReductionUpdate(acro_idx, new_value);
    }
    genOnMistakesUpdate() {
        return (new_value) => this.props.onScoreUpdate("mistakes", new_value);
    }
    render() {
        let score_data = this.props.score.data.raw_data;
        return <div>
            { score_data.reductions.map((reduction, acro_idx) =>
                <AcroJudgeAcrobaticInput
                    key={ acro_idx }
                    reduction={ reduction }
                    acro_idx={ acro_idx }
                    onAcroReductionUpdate={ this.genOnAcroReductionUpdate(acro_idx) } />
            ) }
            <AcroJudgeScoreMistakes
                mistakes={ score_data.mistakes }
                onScoreUpdate={ this.genOnMistakesUpdate() } />
        </div>
    }
}

// Common

class NotPerformingMessage extends React.Component {
    render() {
        return <div className="not-performing">
            { _("tablet.messages.not_performing") }
        </div>
    }
}

class ScorePartScale extends React.Component {
    genPossibleReductions() {
        return [
            [100, "X"],
            [75,  "-75%"],
            [50,  "-50%"],
            [25,  "-25%"],
            [10,  "-10%"],
            [5,   "-5%"],
            [0,   "OK"],
        ]
    }
    render() {
        switch (this.props.scale) {
        case "point5":
            return <TabletPointFiveSelectInput style="two-lines" {...this.props} />
        case "integer":
            return <TabletIntegerSelectInput style="two-lines" {...this.props} />
        case "grid":
            return <TabletIntegerSelectInput style="grid" {...this.props} />
        case "reduction":
            return <TabletSelectorInput
                style="one-line"
                choices={ this.genPossibleReductions() }
                {...this.props} />
        }
    }
}

class TabletScoreTotalScore extends React.Component {
    render() {
        let role = this.props.discipline_judge.role;
        if (this.props.scoring_system_name === "rosfarr.simplified") {
            return null;
        }
        if (role === "head_judge" || role === "tech_judge") {
            return null;
        }
        return <div className="total-score">
            { __("tablet.global.total_score") }: { this.props.score.data.total_score }
        </div>
    }
}

class TabletScoreConfirmationButton extends React.Component {
    needConfirmation() {
        return this.props.discipline_judge.role !== "head_judge";
    }
    readyToConfirm() {
        let score_data = this.props.score.data.raw_data;
        let keys = Object.getOwnPropertyNames(score_data);
        if (this.props.discipline_judge.role !== "tech_judge") {
            for (let idx in keys) {
                if (score_data[keys[idx]] === null) {
                    return false;
                }
                if (typeof score_data[keys[idx]] == "object") {
                    let arr = score_data[keys[idx]];
                    for (let j in Object.keys(arr)) {
                        if (arr[j] === null) {
                            return false;
                        }
                    }
                }
            }
        }
        return true;
    }
    render() {
        if (!this.needConfirmation()) {
            return null;
        }
        if (!this.readyToConfirm()) {
            return <div className="confirm"></div>;
        }
        return <div className="confirm">
            <Slider
                onActivate={ this.props.onScoreConfirm }
                done={ this.props.score.confirmed }
                slideText={ _("judging.buttons.confirm_score") }
                doneText={ _("judging.labels.confirmed") } />
        </div>;
    }
}

class TabletScoreInput extends React.Component {
    updateScores(type, value) {
        if (this.props.readOnly) {
            return;
        }
        let new_score = {};
        new_score[type] = value;
        this.props.onScoreUpdate(new_score);
    }
    updateAcroReduction(idx, value) {
        let reductions = this.props.score.data.raw_data.reductions.map(() => null);
        reductions[idx] = value;
        let new_score = {
            reductions: reductions,
        }
        this.props.onScoreUpdate(new_score);
    }
    overrideAcroScore(acro_idx, value) {
        if (this.props.readOnly) {
            return;
        }
        Api("acrobatic_override.set", {
            run_id: this.props.run.id,
            acrobatic_idx: acro_idx,
            score: value,
        }).send();
    }
    renderScoresInput() {
        switch (getScoringType(this.props.discipline_judge, this.props.scoring_system_name)) {
        case "acro":
            return <AcroJudgeInput
                score={ this.props.score }
                onAcroReductionUpdate={ this.updateAcroReduction.bind(this) }
                onScoreUpdate={ this.updateScores.bind(this) } />
        case "dance":
        case "formation":
        case "simplified":
            return <DanceJudgeScoreInput
                score={ this.props.score }
                scoring_system_name={ this.props.scoring_system_name }
                onScoreUpdate={ this.updateScores.bind(this) } />
        case "head":
            return <HeadJudgeScoreInput
                run={ this.props.run }
                score={ this.props.score }
                all_discipline_judges={ this.props.all_discipline_judges }
                all_scores={ this.props.all_scores }
                onScoreUpdate={ this.updateScores.bind(this) } />
        case "tech":
            return <TechJudgeScoreInput
                page={ this.props.page }
                run={ this.props.run }
                score={ this.props.score }
                onAcroOverride={ this.overrideAcroScore.bind(this) }
                onScoreUpdate={ this.updateScores.bind(this) } />
        default:
            console.log("Unknown judge role", this.props.discipline_judge.role);
            return null;
        }
    }
    render() {
        if (!this.props.run.performed && this.props.discipline_judge.role !== "head_judge") {
            return <NotPerformingMessage />
        }
        return <div className={ this.props.readOnly ? "read-only" : "" }>
            { this.renderScoresInput() }
            <TabletScoreTotalScore
                scoring_system_name={ this.props.scoring_system_name }
                discipline_judge={ this.props.discipline_judge }
                score={ this.props.score } />
            <TabletScoreConfirmationButton
                discipline_judge={ this.props.discipline_judge }
                score={ this.props.score }
                onScoreConfirm={ this.props.onScoreConfirm } />
        </div>
    }
}
