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
            React.findDOMNode(this).querySelector("input").select();
        }
    }
    startEditing () {
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
        console.log("TOGGLE ", this.props.confirmed);
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

class TourAdminScoresTable extends React.Component {

    // Intiialization

    constructor(props) {
        super(props);
        this.state = {
            name: null,
        };
        message_dispatcher.addListener("db_update", this.reloadFromStorage.bind(this));
        message_dispatcher.addListener("reload_data", this.loadData.bind(this));
        this.loadData();
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
        let serialized = storage.get("Tour")
            .by_id(this.props.tour_id)
            .serialize(SCHEMA);
        if (serialized.finalized) {
            window.location.reload(true);
        }
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
        .updateDB("Tour", this.props.tour_id)
        .onSuccess(this.reloadFromStorage.bind(this))
        .send();
    }

    // Listeners

    onInitButtonClick() {
        if (confirm(_("judging.confirms.init_tour"))) {
            Api("tour.init", {tour_id: this.props.tour_id}).send();
        }
    }
    onFinalizeButtonClick() {
        if (confirm(_("judging.confirms.finalize_tour"))) {
            Api("tour.finalize", {tour_id: this.props.tour_id}).send();
        }
    }
    onShuffleHeatsButtonClick() {
        if (confirm(_("judging.confirms.shuffle_heats"))) {
            Api("tour.shuffle_heats", {tour_id: this.props.tour_id}).send();
        }
    }
    onStartTourButtonClick() {
        Api("tour.start", {tour_id: this.props.tour_id}).send();
    }
    onStopTourButtonClick() {
        Api("tour.stop", {tour_id: this.props.tour_id}).send();
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

    renderActiveTourControls() {
        if (!this.state.active) {
            return <button className="btn btn-success" onClick={ this.onStartTourButtonClick.bind(this) }>{ _("judging.buttons.start_tour") }</button>
        } else {
            return <span>
                <button className="btn btn-danger" onClick={ this.onStopTourButtonClick.bind(this) }>{ _("judging.buttons.stop_tour") }</button><br />
            </span>
        }
    }
    renderHeatHeader(prev_row, next_row) {
        let need_render = (typeof prev_row == "undefined") || (prev_row.heat != next_row.heat)
        if (!need_render) {
            return null;
        }
        return <tr key={ "H" + next_row.heat }><th className="heat-number" colSpan="3">
            <p>{ _("global.phrases.heat_n", next_row.heat) }</p>
        </th></tr>;

    }
    renderHeatRow(row) {
        return <tr key={ "R" + row.id }>
            <td className="w-8"><p className="text-center">{ row.participant.number }</p></td>
            <td className="w-50"><p>{ row.participant.name }</p></td>
            <td className="w-42"><p>{ row.participant.club.name }</p></td>
        </tr>;
    }
    renderHeatRows() {
        let result = [];
        let runs = this.state.runs;
        for (let i = 0; i < runs.length; ++i) {
            let header = this.renderHeatHeader(runs[i - 1], runs[i]);
            header && result.push(header);
            result.push(this.renderHeatRow(runs[i]));
        }
        return result;
    }
    renderPrintableHeats() {
        return <div className="print-only" ref="printable_heats">
            <table className="bordered-table"><thead>
                <tr>
                    <th className="w-8"><p>{ _("judging.labels.number") }</p></th>
                    <th className="w-46"><p>{ _("judging.labels.participant_name") }</p></th>
                    <th className="w-46"><p>{ _("judging.labels.club") }</p></th>
                </tr>
            </thead><tbody>
                { this.renderHeatRows() }
            </tbody></table>
        </div>
    }
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
                    <tr>
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
            <header>
                <div className="controls">
                    { this.state.active ? null : <button className="btn btn-primary" onClick={ this.onInitButtonClick.bind(this) }>{ _("judging.buttons.init_tour") }</button> }
                    { this.state.active ? null : <button className="btn btn-primary" onClick={ this.onFinalizeButtonClick.bind(this) }>{ _("judging.buttons.finalize_tour") }</button> }
                    { this.state.active ? null : <button className="btn btn-primary" onClick={ this.onShuffleHeatsButtonClick.bind(this) }>{ _("judging.buttons.shuffle_heats") }</button> }
                    <button className="btn btn-primary" onClick={ this.createDocx.bind(this) }>DOCX</button>
                    { this.renderActiveTourControls() }
                </div>
                <h1>{ this.state.discipline.name }</h1>
                <h2>{ this.state.name }</h2>
            </header>
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
            { this.renderPrintableHeats() }
        </div>;
    }
    createDocx() {
        Docx("tour-heats")
            .setHeader(this.state.discipline.competition.name + ", " + this.state.discipline.competition.date)
            .setTitle1(_("admin.headers.tour_heats"))
            .setTitle2(this.state.discipline.name)
            .setTitle3(this.state.name)
            .setBody(React.findDOMNode(this.refs.printable_heats).innerHTML)
            .addStyle(".heat-number", "background", "#ccc")
            .addStyle(".heat-number", "text-align", "left")
            .addStyle("td, th", "font-size", "12pt")
            .save();
    }
}
