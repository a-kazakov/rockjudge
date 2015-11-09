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
        this.props.scores.forEach(function(score_data) {
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
        return <tr className={ this.props.heat % 2 ? "odd-heat" : ""}>
            <TourAdminHeatValue
                run_id={ this.props.run_id }
                value={ this.props.heat }
                updateValue={ this.updateHeat.bind(this) } />
            <td className="number">{ this.props.participant.number }</td>
            <td className="name">{ this.props.participant.name }</td>
            <td className="club">{ this.props.participant.club.name }</td>
            <td className="total">{ this.props.total_score }</td>
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
                    club: {},
                }
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
                        club: {},
                    }
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

    renderAcrobaticOverrides() {
        let overrides = this.getAcrobaticOverrides()
        if (overrides.length == 0) {
            return null;
        }
        return <div>
            <h4>{ _("judging.headers.acrobatic_overrides") }</h4>
            <table className="bordered-table acrobatic-overrides"><tbody>
                <tr>
                    <th className="heat">{ _("judging.labels.heat") }</th>
                    <th className="number">{ _("judging.labels.number") }</th>
                    <th className="name">{ _("judging.labels.participant_name") }</th>
                    <th className="old-score">{ _("judging.labels.old_score") }</th>
                    <th className="new-score">{ _("judging.labels.new_score") }</th>
                    <th className="acro-idx">{ _("judging.labels.acro_idx") }</th>
                    <th className="acro-description">{ _("judging.labels.acro_description") }</th>
                </tr>
                { overrides.map((o) =>
                    <tr key={ o.run.participant.id + "/" + o.acro_idx }>
                        <td className="heat">{ o.run.heat }</td>
                        <td className="number">{ o.run.participant.number }</td>
                        <td className="name">{ o.run.participant.name }</td>
                        <td className="old-score">{ o.original_score }</td>
                        <td className="new-score">{ o.score }</td>
                        <td className="acro-idx">{ o.acro_idx }</td>
                        <td className="acro-description">{ o.acro_description }</td>
                    </tr>
                ) }
            </tbody></table>
        </div>
    }
    render() {
        if (this.state.name === null) {
            return <span>Loading...</span>;
        }
        let discipline_judges = this.state.discipline.discipline_judges;
        let rows = this.state.runs.map(function(run) {
            return <TourAdminScoresRow
                key={ run.id }
                run_id={ run.id }
                heat={ run.heat }
                participant={ run.participant }
                scores={ run.scores }
                scoring_system_name={ this.state.scoring_system_name }
                total_score={ run.total_score }
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
                        <th className="heat"><p>{ _("judging.labels.heat") }</p></th>
                        <th className="number"><p>{ _("judging.labels.number") }</p></th>
                        <th className="name"><p>{ _("judging.labels.participant_name") }</p></th>
                        <th className="club"><p>{ _("judging.labels.club") }</p></th>
                        <th className="total"><p>{ _("judging.labels.total_score") }</p></th>
                        { judges_header }
                    </tr>
                    { rows }
                </tbody>
            </table>
            { this.renderAcrobaticOverrides() }
        </div>
    }
}
