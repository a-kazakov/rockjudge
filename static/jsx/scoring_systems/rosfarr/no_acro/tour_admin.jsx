class BaseScoreInput extends React.Component {
    render() {
        return <form onSubmit={ this.onSubmit.bind(this) } className="form-score-input">
            { this.renderTable() }
            <button className="btn btn-primary" type="submit">{ _("global.buttons.submit") }</button>&nbsp;
            <button className="btn btn-primary" type="button" onClick={ this.props.stopEditing }>{ _("global.buttons.discard") }</button>
            <ConfirmationButton
                judge_role={ this.props.discipline_judge.role }
                confirmed={ this.props.confirmed }
                toggleConfirmation={ this.props.toggleConfirmation }
                onKeyUp={ this.onKeyUp.bind(this) } />
        </form>
    }
    componentDidMount() {
        ReactDOM.findDOMNode(this).querySelectorAll("input")[0].select();
        this.onMount(...arguments);
    }
    onMount() {}
    onChange(key, event) {
        if (typeof(key) != "object") {
            key = [key];
        }
        let score = this.serialize();
        let score_inner = score;
        for (let idx = 0; idx < key.length - 1; ++idx) {
            score_inner = score_inner[key[idx]];
        }
        score_inner[key[key.length - 1]] = event.target.type == "checkbox"
            ? (event.target.indeterminate ? null : event.target.checked)
            : event.target.value;
        this.props.updateValue(score);
    }
    onKeyUp(event) {
        if (event.keyCode == 27) { // Esc
            this.props.stopEditing();
        }
    }
    isEmpty(value) {
        return value === "" || value === null;
    }
    onSubmit(e) {
        e.preventDefault();
        this.props.submitValue(this.serialize());
    }
}

class DanceScoreInput extends BaseScoreInput {
    renderTable() {
        return <table><tbody>
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
        </tbody></table>
    }
    serialize() {
        return {
            fw_man: !this.isEmpty(this.props.score.fw_man) ? parseInt(this.props.score.fw_man) || 0 : null,
            fw_woman: !this.isEmpty(this.props.score.fw_woman) ? parseInt(this.props.score.fw_woman) || 0 : null,
            dance_figs: !this.isEmpty(this.props.score.dance_figs) ? parseInt(this.props.score.dance_figs) || 0 : null,
            composition: !this.isEmpty(this.props.score.composition) ? parseInt(this.props.score.composition) || 0 : null,
            small_mistakes: !this.isEmpty(this.props.score.small_mistakes) ? parseInt(this.props.score.small_mistakes) || 0 : null,
            big_mistakes: !this.isEmpty(this.props.score.big_mistakes) ? parseInt(this.props.score.big_mistakes) || 0 : null,
        };
    }
}

class AcroScoreInput extends BaseScoreInput {
    renderTable() {
        var fields = this.props.score.reductions.map(function(value, idx) {
            return [<th key={ "H" + idx }>A{idx + 1}:</th>, <td key={ "V" + idx }>
                <input
                    type="text"
                    value={ this.props.score.reductions[idx] }
                    onChange={ this.onChange.bind(this, ["reductions", idx]) }
                    onKeyUp={ this.onKeyUp.bind(this) } />
            </td>]
        }.bind(this));
        fields.push([<th key="HFD">FD:</th>, <td key="VFD">
            <input
                type="text"
                value={ this.props.score.mistakes }
                onChange={ this.onChange.bind(this, "mistakes") }
                onKeyUp={ this.onKeyUp.bind(this) } />
        </td>])
        var rows = []
        for (var idx = 0; idx < fields.length; idx += 2) {
            rows.push(<tr key={ "R" + idx }>{ fields.slice(idx, idx + 2) }</tr>);
        }
        return <table><tbody>
            { rows }
        </tbody></table>
    }
    serialize() {
        return {
            reductions: this.props.score.reductions.map(function(reduction) {
                return !this.isEmpty(reduction) ? parseInt(reduction) || 0 : null;
            }.bind(this)),
            mistakes: parseInt(this.props.score.mistakes) || 0,
        }
    }
}

class FormationScoreInput extends BaseScoreInput {
    renderTable() {
        return <table><tbody>
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
        </tbody></table>
    }
    serialize() {
        return {
            dance_tech: !this.isEmpty(this.props.score.dance_tech) ? parseFloat(this.props.score.dance_tech) || 0 : null,
            dance_figs: !this.isEmpty(this.props.score.dance_figs) ? parseFloat(this.props.score.dance_figs) || 0 : null,
            impression: !this.isEmpty(this.props.score.impression) ? parseFloat(this.props.score.impression) || 0 : null,
            small_mistakes: !this.isEmpty(this.props.score.small_mistakes) ? parseInt(this.props.score.small_mistakes) || 0 : null,
            big_mistakes: !this.isEmpty(this.props.score.big_mistakes) ? parseInt(this.props.score.big_mistakes) || 0 : null,
        }
    }
}

class HeadScoreInput extends BaseScoreInput {
    renderTable() {
        return <table><tbody>
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
        </tbody></table>
    }
    serialize() {
        return {
            penalty: parseInt(this.props.score.penalty) || 0,
            nexttour: this.props.score.nexttour,
        }
    }
}

class TechScoreInput extends BaseScoreInput {
    renderTable() {
        return <table><tbody>
            <tr><th>JS:</th><td>
                <input
                    type="text"
                    value={ this.props.score.jump_steps }
                    onChange={ this.onChange.bind(this, "jump_steps") }
                    onKeyUp={ this.onKeyUp.bind(this) } />
            </td><th>TV:</th><td>
                <input
                    type="checkbox"
                    ref="cb"
                    checked={ !!this.props.score.timing_violation }
                    onChange={ this.onChange.bind(this, "timing_violation") }
                    onKeyUp={ this.onKeyUp.bind(this) }
                    onClick={ function(event) {
                        let cb = event.target;
                        if (cb.readOnly) {
                            cb.checked = cb.readOnly = false;
                        } else if (!cb.checked) {
                            cb.readOnly = cb.indeterminate = true;
                        }
                    }} />
            </td></tr>
        </tbody></table>
    }
    onMount() {
        let node = this.refs.cb;
        node.readOnly = this.props.score.timing_violation === null;
        node.indeterminate = this.props.score.timing_violation === null;
    }
    serialize() {
        return {
            jump_steps: parseInt(this.props.score.jump_steps) || 0,
            timing_violation: this.props.score.timing_violation,
        }
    }
}

class ConfirmationButton extends React.Component {
    render() {
        if (this.props.judge_role == "head_judge") {
            return null;
        }
        return <button
                className={ "btn btn-sm btn-confirmation" + (this.props.confirmed ? " btn-danger" : " btn-success") }
                type="button"
                onClick={ this.props.toggleConfirmation }
                onKeyUp={ this.props.onKeyUp } >
            { this.props.confirmed ? _("admin.buttons.unconfirm_score") : _("admin.buttons.confirm_score") }
        </button>
    }
}

class TourAdminScoreInput extends React.Component {
    render() {
        switch (this.props.discipline_judge.role) {
        case "acro_judge":
            return <AcroScoreInput {...this.props} />
        case "dance_judge":
            if (this.props.scoring_system_name == "rosfarr.formation") {
                return <FormationScoreInput {...this.props} />
            }
            return <DanceScoreInput {...this.props} />
        case "head_judge":
            return <HeadScoreInput {...this.props} />
        case "tech_judge":
            return <TechScoreInput {...this.props} />
        default:
            console.log("Unknown judge role", this.props.discipline_judge.role);
            return null;
        }
    }
}

class TourAdminScoreCell extends React.Component {
    render() {
        if (!this.props.editing) {
            if (this.props.discipline_judge.role == "head_judge" && this.props.value.raw_data.nexttour) {
                return <div onClick={ this.props.startEditing }>[{ this.props.value.total_score.toFixed(1) }]</div>
            }
            if (this.props.discipline_judge.role == "tech_judge") {
                let tv_str = this.props.value.raw_data.timing_violation === null ? " ?" : (
                    this.props.value.raw_data.timing_violation ? " ✗" : " ✓"
                )
                return <div onClick={ this.props.startEditing }>{ this.props.value.raw_data.jump_steps + tv_str }</div>
            }
            return <div onClick={ this.props.startEditing }>{ this.props.value.total_score.toFixed(1) }</div>
        } else {
            return <TourAdminScoreInput
                score={ this.props.value.raw_data }
                confirmed={ this.props.confirmed }
                discipline_judge={ this.props.discipline_judge }
                scoring_system_name={ this.props.scoring_system_name }
                stopEditing={ this.props.stopEditing }
                updateValue={ this.props.updateValue }
                submitValue={ this.props.submitValue }
                toggleConfirmation={ this.props.toggleConfirmation } />
        }
    }
}
