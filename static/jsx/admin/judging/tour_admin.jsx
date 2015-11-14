var current_editing_cell = null;

class TourAdminHeatValue extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            current_value: null,
        }
    }
    render() {
        if (this.state.editing) {
            return <td className="heat"><input
                className="input-heat"
                type="text"
                value={ this.state.current_value || "" }
                onChange={ this.onChange.bind(this) }
                onKeyDown={ this.onKeyUp.bind(this) } /></td>
        } else {
            return <td className="heat" onClick={ this.startEditing.bind(this) }>
                { this.props.value }
            </td>
        }
    }
    onKeyUp(event) {
        if (event.keyCode == 13) { // Enter
            this.submitValue();
        } else if (event.keyCode == 27) { // Esc
            this.stopEditing();
        }
    }
    componentDidUpdate (prevProps, prevState) {
        if (!prevState.editing && this.state.editing) {
            ReactDOM.findDOMNode(this).querySelector("input").select();
        }
    }
    startEditing() {
        if (current_editing_cell !== null) {
            current_editing_cell.stopEditing();
        }
        current_editing_cell = this;
        this.setState({
            editing: true,
            current_value: this.props.value,
        });
    }
    stopEditing() {
        current_editing_cell = null;
        this.setState({
            editing: false,
        });
    }
    submitValue() {
        Api("run.set", {run_id: this.props.run_id, data: {heat: this.state.current_value}}).onSuccess(function() {
            this.stopEditing();
        }.bind(this)).send();
    }
    onChange(event) {
        var value = parseInt(event.target.value.replace(/\D/g,''));
        if (isNaN(value)) {
            value = 0;
        }
        this.setState({
            current_value: value,
        });
    }
}

class TourAdminButtons extends React.Component {
    signal(message) {
        return (() => this.props.onSignal(message)).bind(this);
    }
    render() {
        let result = [];
        if (!this.props.tour.active) {
            result = result.concat([
                <button className="btn btn-primary" onClick={ this.signal("init_tour") } key="btn-init-tour">
                    { _("judging.buttons.init_tour") }
                </button>,
                <button className="btn btn-primary" onClick={ this.signal("finalize_tour") } key="btn-finalize-tour">
                    { _("judging.buttons.finalize_tour") }
                </button>,
                <button className="btn btn-primary" onClick={ this.signal("shuffle_heats") } key="btn-shuffle-heats">
                    { _("judging.buttons.shuffle_heats") }
                </button>,
            ])
        }
        result.push(<TourAdminStartStopTourButton
            tour={ this.props.tour }
            onStart={ this.signal("start_tour") }
            onStop={ this.signal("stop_tour") }
            key="btn-start-stop" />);
        return <div>{ result }</div>;
    }
}

class TourAdminScoreCellWrapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
            current_value: this.props.value,
        };
    }
    render() {
        if (typeof this.props.value === "undefined") {
            return <td className="no-score">&nbsp;</td>
        }
        let classes = ["judge"]
            .concat(this.state.editing ? ["editing"] : [])
            .concat(this.props.confirmed ? ["confirmed-score"] : [])
        return <td className={ classes.join(" ") } >
            <TourAdminScoreCell
                discipline_judge={ this.props.discipline_judge }
                scoring_system_name={ this.props.scoring_system_name }
                startEditing={ this.startEditing.bind(this) }
                stopEditing={ this.stopEditing.bind(this) }
                updateValue={ this.updateValue.bind(this) }
                submitValue={ this.submitValue.bind(this) }
                toggleConfirmation={ this.toggleConfirmation.bind(this) }
                editing={ this.state.editing }
                value={ this.state.editing ? this.state.current_value : this.props.value }
                confirmed={ this.props.confirmed } />
        </td>
    }
    startEditing() {
        if (current_editing_cell !== null) {
            current_editing_cell.stopEditing();
        }
        current_editing_cell = this;
        this.setState({
            editing: true,
            current_value: $.extend({}, this.props.value),
        });
    }
    stopEditing() {
        this.setState({
            editing: false,
        });
        current_editing_cell = null;
    }
    updateValue(new_value) {
        var value = this.state.current_value;
        value.raw_data = new_value;
        this.setState({
            current_value: value,
        });
    }
    submitValue(new_value) {
        let request = {
            score_data: new_value,
            force: true,
        }
        Api("score.set", {score_id: this.props.score_id, data: request})
            .onSuccess(this.stopEditing.bind(this))
            .send();
    }
    toggleConfirmation() {
        if (this.props.confirmed) {
            Api("score.unconfirm", { score_id: this.props.score_id }).send();
        } else {
            Api("score.confirm", { score_id: this.props.score_id }).send();
        }
    }
}

class TourAdminScoresRow extends React.Component {
    render() {
        let scores_map = {}
        this.props.run.scores.forEach(function(score_data) {
            scores_map[score_data.discipline_judge_id] = score_data;
        });
        let scores = this.props.discipline_judges.map(function(discipline_judge, idx) {
            let score = scores_map[discipline_judge.id];
            return <TourAdminScoreCellWrapper
                key={ (score && score.id) ||  ("I" + idx)}
                discipline_judge={ discipline_judge }
                scoring_system_name={ this.props.scoring_system_name }
                score_id={ score && score.id }
                value={ score && score.data }
                confirmed={ score && score.confirmed} />
        }.bind(this));
        return <tr className={ this.props.run.heat % 2 ? "odd-heat" : ""}>
            <TourAdminHeatValue
                run_id={ this.props.run.id }
                value={ this.props.run.heat }
                updateValue={ this.updateHeat.bind(this) } />
            <td className="number">{ this.props.run.participant.number }</td>
            <td className="name">{ this.props.run.participant.name }</td>
            <TourAdminAcrobaticsCell
                run_id={ this.props.run.id }
                program_name={ this.props.run.program_name }
                acrobatics={ this.props.run.acrobatics }
                programs={ this.props.run.participant.programs } />
            <TourAdminPerformedCell
                run={ this.props.run } />
            <td className="total">{ this.props.run.total_score }</td>
            { scores }
        </tr>;
    }
    updateHeat(new_value) {
        this.props.updateHeatValue(new_value);
    }
}

class TourAdminStartStopTourButton extends React.Component {
    render() {
        if (this.props.tour.active) {
            return <button className="btn btn-danger" onClick={ this.props.onStop }>
                { _("judging.buttons.stop_tour") }
            </button>
        } else {
            return <button className="btn btn-success" onClick={ this.props.onStart }>
                { _("judging.buttons.start_tour") }
            </button>
        }
    }
}

class TourAdminAcrobaticEditorRow extends React.Component {
    onPlus() {
        let value = Math.round(2 * this.props.acrobatic.score + 1) / 2;
        Api("acrobatic_override.set", {
            run_id: this.props.run_id,
            acrobatic_idx: this.props.acro_idx,
            score: value,
        }).send();
    }
    onMinus() {
        let value = Math.max(0, Math.round(2 * this.props.acrobatic.score - 1) / 2);
        Api("acrobatic_override.set", {
            run_id: this.props.run_id,
            acrobatic_idx: this.props.acro_idx,
            score: value,
        }).send();
    }
    onReset() {
        Api("acrobatic_override.set", {
            run_id: this.props.run_id,
            acrobatic_idx: this.props.acro_idx,
            score: null,
        }).send();
    }
    render() {
        return <tr>
            <td className="description">{ this.props.acrobatic.description }</td>
            <td className="old-score">
                { this.props.acrobatic.original_score.toFixed(1) }
            </td>
            <td className="new-score">
                { this.props.acrobatic.has_override
                    ? this.props.acrobatic.score.toFixed(1)
                    : null }
            </td>
            <td className="controls">
                { this.props.acrobatic.has_override
                    ? <button className="btn btn-default btn-sm" onClick={ this.onReset.bind(this) }>
                        { _("judging.buttons.reset_acrobatic_override") }
                    </button>
                    : null }
                <button className="btn btn-default btn-sm" onClick={ this.onMinus.bind(this) }>&minus;</button>
                <button className="btn btn-default btn-sm" onClick={ this.onPlus.bind(this) }>+</button>
            </td>
        </tr>
    }
}

class TourAdminAcrobaticLoader extends React.Component {
    onSubmit() {
        let value = this.refs.selector.value;
        if (value === "null") {
            value = null;
        }
        if (confirm(_("judging.confirms.load_program"))) {
            this.props.onLoad(value);
        }
    }
    renderSelector() {
        return <select defaultValue="null" ref="selector">
            <option value="null">-</option>
            { this.props.programs.map( program =>
                <option value={ program.id } key={ program.id }>{ program.name }</option>
            ) }
        </select>
    }
    render() {
        return <form onSubmit={ this.onSubmit.bind(this) } className="acro-loader pull-left">
            { this.renderSelector() }
            <button className="btn btn-primary btn-sm">{ _("global.buttons.load") }</button>
        </form>
    }
}

class TourAdminAcrobaticEditor extends React.Component {
    loadAcrobatics(program_id) {
        Api("run.load_program", { program_id: program_id, run_id: this.props.run_id }).send();
    }
    renderBody() {
        return <div>
            <h4>{ this.props.program_name }</h4>
            <table className="acrobatics"><tbody>
                <tr>
                    <th className="description">{ _("judging.labels.acro_description") }</th>
                    <th className="old-score">{ _("judging.labels.old_score") }</th>
                    <th className="new-score">{ _("judging.labels.new_score") }</th>
                    <th className="controls"></th>
                </tr>
                { this.props.acrobatics.map((acro, idx) =>
                    <TourAdminAcrobaticEditorRow
                        acrobatic={ acro }
                        acro_idx={ idx }
                        run_id={ this.props.run_id }
                        key={ idx } />
                ) }
            </tbody></table>
        </div>
    }
    renderMock() {
        return <div className="no-program text-center">No program loaded</div>
    }
    render() {
        return <div className="form-acro-input">
            { this.props.program_name === null ? this.renderMock() : this.renderBody() }
            <TourAdminAcrobaticLoader
                onLoad={ this.loadAcrobatics.bind(this) }
                programs={ this.props.programs } />
            <button className="btn btn-primary btn-sm pull-right" onClick={ this.props.stopEditing }>
                { _("global.buttons.close") }
            </button>
            <div className="clearfix"></div>
        </div>
    }
}

class TourAdminAcrobaticsCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        };
    }
    startEditing() {
        if (current_editing_cell !== null) {
            current_editing_cell.stopEditing();
        }
        current_editing_cell = this;
        this.setState({
            editing: true,
        });
    }
    stopEditing() {
        this.setState({
            editing: false,
        });
        current_editing_cell = null;
    }
    render() {
        if (this.state.editing) {
            return <td className="acrobatics editing">
                <TourAdminAcrobaticEditor
                    stopEditing={ this.stopEditing.bind(this) }
                    {...this.props} />
            </td>
        }
        if (this.props.program_name === null) {
        return <td className="acrobatics" onClick={ this.startEditing.bind(this) }>
            &mdash;
        </td>
        }
        let has_overrides = false;
        let original_score = 0;
        let score = 0;
        this.props.acrobatics.forEach((acro) => {
            original_score += acro.original_score;
            score += acro.score;
            has_overrides = has_overrides || acro.score != acro.original_score;
        });
        return <td className="acrobatics" onClick={ this.startEditing.bind(this) }>
            { has_overrides ? original_score.toFixed(1) + " → " + score.toFixed(1) : score.toFixed(1) }
        </td>
    }
}

class TourAdminPerformedCell extends React.Component {
    toggleState() {
        let method = this.props.run.performed
            ? "run.mark_not_performed"
            : "run.mark_performed";
        Api(method, { run_id: this.props.run.id }).send();
    }
    render() {
        return <td className="performed">
            <input
                type="checkbox"
                checked={ this.props.run.performed }
                onClick={ this.toggleState.bind(this) } />
        </td>
    }
}

class TourAdminBody extends React.Component {

    // Intiialization

    constructor(props) {
        super(props);
        this.state = {
            name: null,
        };
    }
    componentWillMount() {
        this.storage = storage.getDomain("judging_" + this.props.tour_id);
        this.reload_listener = message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.db_update_listener = message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        this.loadData();
    }
    componentWillUnmount() {
        message_dispatcher.removeListener(this.reload_listener);
        message_dispatcher.removeListener(this.db_update_listener);
        storage.delDomain("judging_" + this.props.tour_id);
    }
    reloadFromStorage() {
        var SCHEMA = {
            discipline: {
                competition: {},
                discipline_judges: {
                    judge: {},
                }
            },
            runs: {
                scores: {},
                participant: {
                    programs: {},
                },
            },
        }
        let serialized = this.storage.get("Tour")
            .by_id(this.props.tour_id)
            .serialize(SCHEMA);
        this.setState(serialized);
    }
    loadData() {
        Api("tour.get", {
            tour_id: this.props.tour_id,
            children: {
                discipline: {
                    competition: {},
                    discipline_judges: {
                        judge: {},
                    }
                },
                runs: {
                    acrobatics: {},
                    scores: {},
                    participant: {
                        programs: {},
                    },
                },
            }
        })
        .addToDB("Tour", this.props.tour_id, this.storage)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }

    // Listeners

    onSignal(message) {
        switch (message) {
        case "init_tour":
            if (confirm(_("judging.confirms.init_tour"))) {
                Api("tour.init", {tour_id: this.props.tour_id}).send();
            }
            break;
        case "finalize_tour":
            if (confirm(_("judging.confirms.finalize_tour"))) {
                Api("tour.finalize", {tour_id: this.props.tour_id}).send();
            }
            break;
        case "shuffle_heats":
            if (confirm(_("judging.confirms.shuffle_heats"))) {
                Api("tour.shuffle_heats", {tour_id: this.props.tour_id}).send();
            }
            break;
        case "start_tour":
            Api("tour.start", {tour_id: this.props.tour_id}).send();
            break;
        case "stop_tour":
            Api("tour.stop", {tour_id: this.props.tour_id}).send();
            break;
        default:
            console.error("Unknown signal received:", message);
        }
    }

    // Helpers

    getAcrobaticOverrides() {
        let result = [];
        this.state.runs.forEach(function(run) {
            run.acrobatics.forEach(function(acro, idx) {
                if (acro.original_score != acro.score) {
                    result.push({
                        run: run,
                        acro_idx: idx + 1,
                        acro_description: acro.description,
                        score: acro.score,
                        original_score: acro.original_score,
                    })
                }
            })
        });
        return result;
    }

    // Rendering

    render() {
        if (this.state.name === null) {
            return <span>Loading...</span>;
        }
        let discipline_judges = this.state.discipline.discipline_judges;
        let rows = this.state.runs.map(function(run) {
            return <TourAdminScoresRow
                key={ run.id }
                run={ run }
                scoring_system_name={ this.state.scoring_system_name }
                discipline_judges={ discipline_judges } />
        }.bind(this));
        let judges_header = discipline_judges.map(function(discipline_judge) {
            // TODO: move role staff to scoring system logic
            return <th className="judge" key={ discipline_judge.id }>
                { discipline_judge.judge.number + (discipline_judge.role == "acro_judge" ? "*" : "") }
            </th>;
        }.bind(this));
        return <div className="tour-admin">
            <table className="bordered-table">
                <tbody>
                    <tr>
                        <th className="heat">{ _("judging.labels.heat") }</th>
                        <th className="number">{ _("judging.labels.number") }</th>
                        <th className="name">{ _("judging.labels.participant_name") }</th>
                        <th className="acrobatics">{ _("judging.labels.acrobatics") }</th>
                        <th className="performed">{ _("judging.labels.performed") }</th>
                        <th className="total">{ _("judging.labels.total_score") }</th>
                        { judges_header }
                    </tr>
                    { rows }
                </tbody>
            </table>
        </div>
    }
}
