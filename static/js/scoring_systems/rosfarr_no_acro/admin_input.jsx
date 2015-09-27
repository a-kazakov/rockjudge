class TourAdminScoreInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <form onSubmit={ this.onSubmit.bind(this) }>
            <table border="1">
                <tr><th>Footwork man:</th><td>
                    <input
                        type="text"
                        ref="inp_fw_man"
                        value={this.props.score.fw_man}
                        onChange={ this.onChange.bind(this, "fw_man") } />
                </td></tr>
                <tr><th>Footwork woman:</th><td>
                    <input
                        type="text"
                        ref="inp_fw_woman"
                        value={this.props.score.fw_woman}
                        onChange={ this.onChange.bind(this, "fw_woman") } />
                </td></tr>
                <tr><th>Dance figures:</th><td>
                    <input
                        type="text"
                        ref="inp_dance_figs"
                        value={this.props.score.dance_figs}
                        onChange={ this.onChange.bind(this, "dance_figs") } />
                </td></tr>
                <tr><th>Composition:</th><td>
                    <input
                        type="text"
                        ref="inp_composition"
                        value={this.props.score.composition}
                        onChange={ this.onChange.bind(this, "composition") } />
                </td></tr>
            </table>
            <input type="submit" />
            <button type="button" onClick={ this.props.stopEditing }>Discard</button>
        </form>
    }
    onChange(key, event) {
        var score = this.serializeScore();
        score[key] = event.target.value;
        this.props.updateValue(score);
    }
    serializeScore() {
        return {
            fw_man: parseInt(this.props.score.fw_man),
            fw_woman: parseInt(this.props.score.fw_woman),
            dance_figs: parseInt(this.props.score.dance_figs),
            composition: parseInt(this.props.score.composition),
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
