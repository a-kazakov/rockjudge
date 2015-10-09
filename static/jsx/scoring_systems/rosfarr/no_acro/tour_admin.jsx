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
            <button className="btn btn-primary" type="submit">Submit</button>&nbsp;
            <button className="btn btn-primary" type="button" onClick={ this.props.stopEditing }>Discard</button>
        </form>;
    }
    renderAcroJudgeInput() {
        var fields = this.props.score.deductions.map(function(value, idx) {
            return [<th>A{idx + 1}:</th>, <td>
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
            <button className="btn btn-primary" type="submit">Submit</button>&nbsp;
            <button className="btn btn-primary" type="button" onClick={ this.props.stopEditing }>Discard</button>
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
                </td></tr>
            </table>
            <button className="btn btn-primary" type="submit">Submit</button>
            <button className="btn btn-primary" type="button" onClick={ this.props.stopEditing }>Discard</button>
        </form>
    }
    render() {
        switch (this.props.judge.role) {
        case "acro_judge":
            return this.props.scoring_system == "rosfarr.no_acro"
                ? this.renderDanceJudgeInput()
                : this.renderAcroJudgeInput()
        case "dance_judge":
            return this.renderDanceJudgeInput();
        case "head_judge":
            return this.renderHeadJudgeInput();
        default:
            console.log("Unknown judge role", this.props.judges[this.props.judge_id].role);
            return null;
        }
    }
    onChange(key, event) {
        if (typeof(key) != "object") {
            key = [key]
        }
        var score = this.serializeScore();
        var score_inner = score;
        for (var idx = 0; idx < key.length - 1; ++idx) {
            score_inner = score_inner[key[idx]];
        }
        score_inner[key[key.length - 1]] = event.target.value;
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
    serializeAcroScore() {
        return {
            deductions: this.props.score.deductions.map(function(deduction) {
                return parseInt(deduction) || 0;
            }),
            mistakes: parseInt(this.props.score.mistakes) || 0,
        }
    }
    serializeDanceScore() {
        return {
            fw_man: parseInt(this.props.score.fw_man) || 0,
            fw_woman: parseInt(this.props.score.fw_woman) || 0,
            dance_figs: parseInt(this.props.score.dance_figs) || 0,
            composition: parseInt(this.props.score.composition) || 0,
            small_mistakes: parseInt(this.props.score.small_mistakes) || 0,
            big_mistakes: parseInt(this.props.score.big_mistakes) || 0,
        }
    }
    serializeHeadScore() {
        return {
            penalty: parseInt(this.props.score.penalty) || 0,
        }
    }
    serializeScore() {
        switch (this.props.judge.role) {
        case "acro_judge":
            return this.props.scoring_system == "rosfarr.no_acro"
                ? this.serializeDanceScore()
                : this.serializeAcroScore()
        case "dance_judge":
            return this.serializeDanceScore();
        case "head_judge":
            return this.serializeHeadScore();
        default:
            console.log("Unknown judge role", this.props.judges[this.props.judge_id].role);
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
        if (!this.props.editing) {
            return <div onClick={ this.props.startEditing }>{ this.props.value.total_score.toFixed(1) }</div>
        } else {
            return <TourAdminScoreInput
                score={ this.props.value.raw_data }
                judge={ this.props.judge }
                scoring_system={ this.props.scoring_system }
                stopEditing={ this.props.stopEditing }
                updateValue={ this.props.updateValue }
                submitValue={ this.props.submitValue } />
        }
    }
}
