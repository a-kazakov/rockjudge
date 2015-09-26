class AdminScoreInput extends React.Component {
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
            <button onClick={ this.props.discardEditing }>Discard </button>
        </form>
    }
    onChange(key, event) {
        this.props.onChange(key, event.target.value);
    }
    serializeScores() {
        return {
            fw_man: parseInt(this.props.score.fw_man),
            fw_woman: parseInt(this.props.score.fw_woman),
            dance_figs: parseInt(this.props.score.dance_figs),
            composition: parseInt(this.props.score.composition),
        }
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.onFinishEditing(this.serializeScores());
    }
}
