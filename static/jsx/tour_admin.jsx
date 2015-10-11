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
        Api("tournaments.run.set", {run_id: this.props.run_id, data: {heat: this.state.current_value}}).onSuccess(function() {
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
        return <td className={ "judge" + (this.state.editing ? " editing" : "") } >
            <TourAdminScoreCell
                judge={ this.props.judge }
                scoring_system={ this.props.scoring_system }
                startEditing={ this.startEditing.bind(this) }
                stopEditing={ this.stopEditing.bind(this) }
                updateValue={ this.updateValue.bind(this) }
                submitValue={ this.submitValue.bind(this) }
                editing={ this.state.editing }
                value={ this.state.editing ? this.state.current_value : this.props.value } />
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
        Api("tournaments.score.set", {score_id: this.props.score_id, data: new_value}).onSuccess(function() {
            this.stopEditing();
        }.bind(this)).send();
    }
}

class TourAdminScoresRow extends React.Component {
    render() {
        let scores_map = {}
        this.props.scores.forEach(function(score_data) {
            scores_map[score_data.judge_id] = score_data;
        });
        let scores = this.props.judges.map(function(judge) {
            return <TourAdminScoreCellWrapper
                judge={ judge }
                scoring_system={ this.props.scoring_system }
                score_id={ scores_map[judge.id] && scores_map[judge.id].id}
                value={ scores_map[judge.id] && scores_map[judge.id].data } />
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
        let serialized = storage.get("Tour")
            .by_id(this.props.tour_id)
            .serialize();
        if (serialized.finalized) {
            window.location.reload(true);
        }
        this.setState(serialized);
    }
    loadData() {
        Api("tournaments.tour.get", {
            tour_id: this.props.tour_id,
            children: {
                inner_competition: {
                    competition: {
                        judges: {},
                    }
                },
                runs: {
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

    // Helpers

    getRunIdx(run_id) {
        var result = null;
        this.state.runs.forEach(function(run, run_idx) {
            if (run.id == run_id) {
                result = run_idx;
            }
        });
        return result;
    }
    getScoreIdPath(score_id) {
        var result = null;
        this.state.runs.forEach(function(run, run_idx) {
            for (var score_idx in run.scores.scores) if (run.scores.scores.hasOwnProperty(score_idx)) {
                if (run.scores.scores[score_idx].id == score_id) {
                    result = [run_idx, score_idx];
                }
            }
        });
        return result;
    }

    // Listeners

    onInitButtonClick() {
        if (confirm("Are you sure want to recreate participants list for this tour?")) {
            Api("tournaments.tour.init", {tour_id: this.props.tour_id}).send();
        }
    }
    onFinalizeButtonClick() {
        if (confirm("Are you sure want to finalize this tour?")) {
            Api("tournaments.tour.finalize", {tour_id: this.props.tour_id}).send();
        }
    }
    onShuffleHeatsButtonClick() {
        if (confirm("Are you sure want to shuffle heats?")) {
            Api("tournaments.tour.shuffle_heats", {tour_id: this.props.tour_id}).send();
        }
    }
    onStartTourButtonClick() {
        Api("tournaments.tour.start", {tour_id: this.props.tour_id}).send();
    }
    onStopTourButtonClick() {
        Api("tournaments.tour.stop", {tour_id: this.props.tour_id}).send();
    }

    // Rendering

    renderActiveTourControls() {
        if (!this.state.active) {
            return <button className="btn btn-success" onClick={ this.onStartTourButtonClick.bind(this) }>Start tour</button>
        } else {
            return <span>
                <button className="btn btn-danger" onClick={ this.onStopTourButtonClick.bind(this) }>Stop tour</button><br />
            </span>
        }
    }
    render() {
        if (this.state.name === null) {
            return <span>Loading...</span>;
        }
        let judges = this.state.inner_competition.competition.judges;
        let  active_judges = judges.filter(function(judge) {
            return !judge.hide_from_results;
        })
        let rows = this.state.runs.map(function(run) {
            return <TourAdminScoresRow
                key={ run.id }
                run_id={ run.id }
                heat={ run.heat }
                participant={ run.participant }
                scores={ run.scores }
                scoring_system={ this.state.scoring_system }
                total_score={ run.total_score }
                judges={ active_judges } />
        }.bind(this));
        let judges_header = active_judges.map(function(judge) {
            return <th className="judge">{ judge.number }</th>;
        }.bind(this));
        return <div className="tour-admin">
            <header>
                <div className="controls">
                    { this.state.active ? null : <button className="btn btn-primary" onClick={ this.onInitButtonClick.bind(this) }>Recreate list</button> }
                    { this.state.active ? null : <button className="btn btn-primary" onClick={ this.onFinalizeButtonClick.bind(this) }>Finalize</button> }
                    { this.state.active ? null : <button className="btn btn-primary" onClick={ this.onShuffleHeatsButtonClick.bind(this) }>Shuffle heats</button> }
                    { this.renderActiveTourControls() }
                </div>
                <h1>{ this.state.inner_competition.name }</h1>
                <h2>{ this.state.name }</h2>
            </header>
            <table className="scores-table">
                <tbody>
                    <tr>
                        <th className="heat">Heat</th>
                        <th className="number">#</th>
                        <th className="name">Name</th>
                        <th className="club">Club</th>
                        <th className="total">Total</th>
                        { judges_header }
                    </tr>
                    { rows }
                </tbody>
            </table>
        </div>;
    }
}
