class TourAdminScoreInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <form onSubmit={ this.onSubmit.bind(this) } className="form-score-input">
            <table>
                <tr><th>FW:</th><td>
                    <input
                        type="text"
                        ref="inp_fw_woman"
                        value={this.props.score.fw_woman}
                        onChange={ this.onChange.bind(this, "fw_woman") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td>
                <th>FM:</th><td>
                    <input
                        type="text"
                        ref="inp_fw_man"
                        value={this.props.score.fw_man}
                        onChange={ this.onChange.bind(this, "fw_man") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td></tr>
                <tr><th>DF:</th><td>
                    <input
                        type="text"
                        ref="inp_dance_figs"
                        value={this.props.score.dance_figs}
                        onChange={ this.onChange.bind(this, "dance_figs") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td>
                <th>C:</th><td>
                    <input
                        type="text"
                        ref="inp_composition"
                        value={this.props.score.composition}
                        onChange={ this.onChange.bind(this, "composition") }
                        onKeyUp={ this.onKeyUp.bind(this) } />
                </td></tr>
            </table>
            <button type="submit">Submit</button>
            <button type="button" onClick={ this.props.stopEditing }>Discard</button>
        </form>
    }
    onChange(key, event) {
        var score = this.serializeScore();
        score[key] = event.target.value;
        this.props.updateValue(score);
    }
    componentDidMount() {
        React.findDOMNode(this).querySelectorAll("input")[0].select();
    }
    onKeyUp(event) {
        if (event.keyCode == 13) { // Enter
            this.props.submitValue(this.serializeScore());
        } else if (event.keyCode == 27) { // Esc
            this.props.stopEditing();
        }
    }
    serializeScore() {
        return {
            fw_man: parseInt(this.props.score.fw_man) || 0,
            fw_woman: parseInt(this.props.score.fw_woman) || 0,
            dance_figs: parseInt(this.props.score.dance_figs) || 0,
            composition: parseInt(this.props.score.composition) || 0,
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
                stopEditing={ this.props.stopEditing }
                updateValue={ this.props.updateValue }
                submitValue={ this.props.submitValue } />
        }
    }
}
