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
            return <td><input
                type="text"
                value={ this.state.current_value || "" }
                onChange={ this.onChange.bind(this) }
                onKeyDown={ this.onKeyUp.bind(this) } /></td>
        } else {
            return <td onClick={ this.startEditing.bind(this) }>
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
    startEditing () {
        this.setState({
            editing: true,
            current_value: this.props.value,
        });
    }
    stopEditing() {
        this.setState({
            editing: false,
        });
    }
    submitValue() {
        Api.set_run_heat(this.props.run_id, this.state.current_value, function() {
            this.stopEditing();
        }.bind(this));
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
        return <td>
            <TourAdminScoreCell
                startEditing={ this.startEditing.bind(this) }
                stopEditing={ this.stopEditing.bind(this) }
                updateValue={ this.updateValue.bind(this) }
                submitValue={ this.submitValue.bind(this) }
                editing={ this.state.editing }
                value={ this.state.editing ? this.state.current_value : this.props.value } />
        </td>
    }
    startEditing() {
        this.setState({
            editing: true,
            current_value: this.props.value,
        });
    }
    stopEditing() {
        this.setState({
            editing: false,
        });
    }
    updateValue(new_value) {
        var value = this.state.current_value;
        value.raw_data = new_value;
        this.setState({
            current_value: value,
        });
    }
    submitValue(new_value) {
        Api.set_judge_score(this.props.run_id, this.props.judge_id, new_value, function() {
            this.stopEditing();
        }.bind(this));
    }
}

class TourAdminScoresRow extends React.Component {
    render() {
        var scores = this.props.judges_order.map(function(judge_id) {
            return <TourAdminScoreCellWrapper
                value={ this.props.scores[judge_id] }
                run_id={ this.props.run_id }
                judge_id={ judge_id } />
        }.bind(this));
        return <tr>
            <td>{ this.props.participant.name }</td>
            <TourAdminHeatValue
                run_id={ this.props.run_id }
                value={ this.props.heat }
                updateValue={ this.updateHeat.bind(this) } />
            { scores }
            <td>{ this.props.total_score.toFixed(2) }</td>
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
            id: 0,
            name: "",
            runs: [],
            judges: [],
            active: false,
            current_heat: null,
            current_editing: null,
        };
        window.message_dispatcher.subscribe("tour_update", this.dispatchTourUpdate.bind(this));
        window.message_dispatcher.subscribe("run_update", this.dispatchRunUpdate.bind(this));
        window.message_dispatcher.subscribe("score_update", this.dispatchScoreUpdate.bind(this));
        window.message_dispatcher.subscribe("current_heat_update", this.dispatchCurrentHeatUpdate.bind(this));
        this.loadData();
    }
    loadData() {
        Api.get_tour(this.props.tour_id, function(tour) {
            if (tour.finalized) {
                window.location.reload(true);
            }
            this.setState(tour);
        }.bind(this));
    }

    // Dispatchers

    dispatchTourUpdate(tour_id, tour) {
        if (tour_id != this.props.tour_id) {
            return;
        }
        if (tour.finalized) {
            window.location.reload(true);
        }
        this.setState(tour);
    }
    dispatchRunUpdate(run_id, new_run) {
        var new_runs = this.state.runs.map(function(local_run) {
            return (local_run.id == run_id) ? new_run : local_run;
        });
        this.setState({
            runs: new_runs,
        });
    }
    dispatchScoreUpdate(run_id, judge_id, score) {
        new_runs = this.state.runs.map(function(local_run) {
            if (local_run.id == run_id) {
                new_run = $.extend({}, local_run);
                new_run.score = score;
                return new_run;
            }
            return local_run;
        });
        this.setState({
            runs: new_runs,
        });
    }
    dispatchCurrentHeatUpdate(data) {
        if (data.tour_id == null || data.tour_id != this.props.tour_id) {
            this.setState({
                active: false,
            });
            return;
        }
         this.setState({
            active: true,
            current_heat: data.current_heat,
        });
    }

    // Helpers

    getRunById(run_id) {
        var filtered = this.state.runs.filter(function(run) {
            return run_id == run.run_id;
        });
        return filtered[0];
    }

    // Rendering

    getActiveTourControls() {
        if (!this.state.active) {
            return <button onClick={ Api.start_tour.bind(null, this.props.tour_id) }>Start tour</button>
        } else {
            return <div>
                Current heat: { this.state.current_heat }<br />
                <button onClick={ Api.next_heat }>To next heat</button>
                <button onClick={ Api.stop_tour.bind(null, this.props.tour_id) }>Stop tour</button>
            </div>
        }
    }
    render() {
        var judges_order = this.state.judges.map(function(judge) {
            return judge.id;
        });
        var rows = this.state.runs.map(function(run) {
            return <TourAdminScoresRow
                key={ run.id }
                run_id={ run.id }
                heat={ run.heat }
                participant={ run.participant }
                scores={ run.scores }
                total_score={ run.total_score }
                judges_order={ judges_order } />
        }.bind(this));
        rows.sort(function(a, b) {
            return (a.props.heat - b.props.heat) ||
                (a.props.participant > b.props.participant ? 1 : -1);
        });
        var judges_header = this.state.judges.map(function(judge) {
            return <th>Judge { judge.number }</th>;
        }.bind(this));
        return <div>
            <h1>{ this.state.name }</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Participant</th>
                        <th>Heat</th>
                        { judges_header }
                        <th>Total</th>
                    </tr>
                    { rows }
                </tbody>
            </table>
            <button onClick={ Api.init_tour.bind(null, this.props.tour_id) }>Init</button>
            <button onClick={ Api.finalize_tour.bind(null, this.props.tour_id) }>Finalize</button>
            { this.getActiveTourControls() }
        </div>;
    }
}
