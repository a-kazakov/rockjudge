class TourAdminScoreInput extends React.Component {
    constructor(props) {
        super(props);
    }
    renderDanceJudgeInput() {
        return <form onSubmit={ this.onSubmit.bind(this) } className="form-score-input">
            <table>
                <tr><th>FW:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.fw_woman }
                        onChange={ this.onChange.bind(this, "fw_woman") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td>
                <th>FM:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.fw_man }
                        onChange={ this.onChange.bind(this, "fw_man") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td></tr>
                <tr><th>DF:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.dance_figs }
                        onChange={ this.onChange.bind(this, "dance_figs") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td>
                <th>C:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.composition }
                        onChange={ this.onChange.bind(this, "composition") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td></tr>
                <tr><th>SM:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.small_mistakes }
                        onChange={ this.onChange.bind(this, "small_mistakes") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td>
                <th>BM:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.big_mistakes }
                        onChange={ this.onChange.bind(this, "big_mistakes") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td></tr>
            </table>
            <button className="btn btn-primary" type="submit">{ _("global.buttons.submit") }</button>&nbsp;
            <button className="btn btn-primary" type="button" onClick={ this.props.stopEditing }>{ _("global.buttons.discard") }</button>
        </form>;
    }
    renderAcroJudgeInput() {
        var fields = this.props.score.deductions.map(function(value, idx) {
            return [<th key={ "H" + idx }>A{idx + 1}:</th>, <td key={ "V" + idx }>
                <input
                    type="text"
                    value={ this.props.score.deductions[idx] }
                    onChange={ this.onChange.bind(this, ["deductions", idx]) }
                    onKeyUp={ this.onKeyUp.bind(this) } />
            </td>]
        }.bind(this));
        fields.push([<th>FD:</th>, <td>
            <input
                type="text"
                value={ this.props.score.mistakes }
                onChange={ this.onChange.bind(this, "mistakes") }
                onKeyUp={ this.onKeyUp.bind(this) } />
        </td>])
        var rows = []
        for (var idx = 0; idx < fields.length; idx += 2) {
            rows.push(<tr>{ fields.slice(idx, idx + 2) }</tr>);
        }
        return <form onSubmit={ this.onSubmit.bind(this) } className="form-score-input">
            <table>
                { rows }
            </table>
            <button className="btn btn-primary" type="submit">{ _("global.buttons.submit") }</button>&nbsp;
            <button className="btn btn-primary" type="button" onClick={ this.props.stopEditing }>{ _("global.buttons.discard") }</button>
        </form>;
    }
    renderFormationJudgeInput() {
        return <form onSubmit={ this.onSubmit.bind(this) } className="form-score-input">
            <table>
                <tr><th></th><td></td>
                <th>DT:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.dance_tech }
                        onChange={ this.onChange.bind(this, "dance_tech") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td>
                <th></th><td>
                </td></tr>
                <tr><th>DF:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.dance_figs }
                        onChange={ this.onChange.bind(this, "dance_figs") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td>
                <th>I:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.impression }
                        onChange={ this.onChange.bind(this, "impression") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td></tr>
                <tr><th>SM:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.small_mistakes }
                        onChange={ this.onChange.bind(this, "small_mistakes") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td>
                <th>BM:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.big_mistakes }
                        onChange={ this.onChange.bind(this, "big_mistakes") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td></tr>
            </table>
            <button className="btn btn-primary" type="submit">{ _("global.buttons.submit") }</button>&nbsp;
            <button className="btn btn-primary" type="button" onClick={ this.props.stopEditing }>{ _("global.buttons.discard") }</button>
        </form>;
    }
    renderHeadJudgeInput() {
        return <form onSubmit={ this.onSubmit.bind(this) } className="form-score-input">
            <table>
                <tr><th>P:</th><td>
                    <input
                        type="text"
                        value={ this.props.score.penalty }
                        onChange={ this.onChange.bind(this, "penalty") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td><th>NT:</th><td>
                    <input
                        type="checkbox"
                        checked={ this.props.score.nexttour }
                        onChange={ this.onChange.bind(this, "nexttour") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td></tr>
            </table>
            <button className="btn btn-primary" type="submit">{ _("global.buttons.submit") }</button>
            <button className="btn btn-primary" type="button" onClick={ this.props.stopEditing }>{ _("global.buttons.discard") }</button>
        </form>
    }
    render() {
        switch (this.props.discipline_judge.role) {
        case "acro_judge":
            if (this.props.scoring_system_name == "rosfarr.formation") {
                return this.renderFormationJudgeInput();
            }
            return this.props.scoring_system_name == "rosfarr.no_acro"
                ? this.renderDanceJudgeInput()
                : this.renderAcroJudgeInput()
        case "dance_judge":
            if (this.props.scoring_system_name == "rosfarr.formation") {
                return this.renderFormationJudgeInput();
            }
            return this.renderDanceJudgeInput();
        case "head_judge":
            return this.renderHeadJudgeInput();
        default:
            console.log("Unknown judge role", this.props.discipline_judge.role);
            return null;
        }
    }
    onChange(key, event) {
        if (typeof(key) != "object") {
            key = [key];
        }
        let score = this.serializeScore();
        let score_inner = score;
        for (let idx = 0; idx < key.length - 1; ++idx) {
            score_inner = score_inner[key[idx]];
        }
        score_inner[key[key.length - 1]] = event.target.type == "checkbox" ? event.target.checked : event.target.value;
        this.props.updateValue(score);
    }
    componentDidMount() {
        React.findDOMNode(this).querySelectorAll("input")[0].select();
    }
    onKeyUp(event) {
        if (event.keyCode == 27) { // Esc
            this.props.stopEditing();
        }
    }
    isEmpty(value) {
        return value === "" || value === null;
    }
    serializeAcroScore() {
        return {
            deductions: this.props.score.deductions.map(function(deduction) {
                return deduction ? parseInt(deduction) || 0 : null;
            }),
            mistakes: parseInt(this.props.score.mistakes) || 0,
        }
    }
    serializeDanceScore() {
        if (this.props.scoring_system_name == "rosfarr.formation") {
            return {
                dance_tech: !this.isEmpty(this.props.score.dance_tech) ? parseFloat(this.props.score.dance_tech) || 0 : null,
                dance_figs: !this.isEmpty(this.props.score.dance_figs) ? parseFloat(this.props.score.dance_figs) || 0 : null,
                impression: !this.isEmpty(this.props.score.impression) ? parseFloat(this.props.score.impression) || 0 : null,
                small_mistakes: !this.isEmpty(this.props.score.small_mistakes) ? parseInt(this.props.score.small_mistakes) || 0 : null,
                big_mistakes: !this.isEmpty(this.props.score.big_mistakes) ? parseInt(this.props.score.big_mistakes) || 0 : null,
            }
        }
        return {
            fw_man: !this.isEmpty(this.props.score.fw_man) ? parseInt(this.props.score.fw_man) || 0 : null,
            fw_woman: !this.isEmpty(this.props.score.fw_woman) ? parseInt(this.props.score.fw_woman) || 0 : null,
            dance_figs: !this.isEmpty(this.props.score.dance_figs) ? parseInt(this.props.score.dance_figs) || 0 : null,
            composition: !this.isEmpty(this.props.score.composition) ? parseInt(this.props.score.composition) || 0 : null,
            small_mistakes: !this.isEmpty(this.props.score.small_mistakes) ? parseInt(this.props.score.small_mistakes) || 0 : null,
            big_mistakes: !this.isEmpty(this.props.score.big_mistakes) ? parseInt(this.props.score.big_mistakes) || 0 : null,
        }
    }
    serializeHeadScore() {
        return {
            penalty: parseInt(this.props.score.penalty) || 0,
            nexttour: this.props.score.nexttour,
        }
    }
    serializeScore() {
        switch (this.props.discipline_judge.role) {
        case "acro_judge":
            return this.serializeDanceScore()
        case "dance_judge":
            return this.serializeDanceScore();
        case "head_judge":
            return this.serializeHeadScore();
        default:
            console.log("Unknown judge role", this.props.discipline_judge.role);
            return null;
        }
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.submitValue(this.serializeScore());
    }
}

class TourAdminScoreCell extends React.Component {
    render() {
        console.log(this.props);
        if (!this.props.editing) {
            if (this.props.discipline_judge.role == "head_judge" && this.props.value.raw_data.nexttour) {
                return <div onClick={ this.props.startEditing }>[{ this.props.value.total_score.toFixed(1) }]</div>
            }
            return <div onClick={ this.props.startEditing }>{ this.props.value.total_score.toFixed(1) }</div>
        } else {
            return <TourAdminScoreInput
                score={ this.props.value.raw_data }
                discipline_judge={ this.props.discipline_judge }
                scoring_system_name={ this.props.scoring_system_name }
                stopEditing={ this.props.stopEditing }
                updateValue={ this.props.updateValue }
                submitValue={ this.props.submitValue } />
        }
    }
}
