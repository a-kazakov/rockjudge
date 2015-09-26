class TourAdminHeatInput extends React.Component {
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
                onKeyDown={ this.onKeyDown.bind(this) } /></td>
        } else {
            return <td onClick={ this.startEditing.bind(this) }>
                { this.props.value }
            </td>
        }
    }
    onKeyDown(event) {
        if (event.keyCode == 13) {
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
        this.props.updateValue(this.state.current_value);
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

class TourAdminScoresRow extends React.Component {
    startEditingScore(judge_id) {
        this.props.startEditingScore(this.props.run_id, judge_id)
    }
    render() {
        var scores = this.props.judges_order.map(function(judge) {
            return <td
                    onClick={ this.startEditingScore.bind(this, judge) }>
                { this.props.scores[judge].total_score.toFixed(2) }
            </td>
        }.bind(this));
        return <tr>
            <td>{ this.props.participant }</td>
            <TourAdminHeatInput
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
    constructor(props) {
        super(props);
        this.state = {
            runs: props.runs,
            current_editing: null,
        };
        window.message_dispatcher.subscribe("status_update", this.dispatchTourStatusUpdate.bind(this));
        window.message_dispatcher.subscribe("score_update", this.dispatchScoreUpdate.bind(this));
    }
    getRunById(run_id) {
        var filtered = this.state.runs.filter(function(run) {
            return run_id == run.run_id;
        });
        return filtered[0];
    }
    getScoreEditor() {
        var ce = this.state.current_editing;
        if (ce == null) {
            return <span></span>
        }
        return <AdminScoreInput
            score={ ce.current_input }
            onChange={ this.updateCurrentInput.bind(this) }
            onFinishEditing={ this.updateScore.bind(this) }
            discardEditing={ this.stopEditingScore.bind(this) } />
    }
    render() {
        var judges_order = this.props.judges.map(function(judge) {
            return judge.id;
        });
        var rows = this.state.runs.map(function(row) {
            return <TourAdminScoresRow
                key={ row.run_id }
                run_id={ row.run_id }
                heat={ row.heat }
                participant={ row.participant }
                scores={ row.scores }
                total_score={ row.total_score }
                judges_order={ judges_order }
                startEditingScore={ this.startEditingScore.bind(this) }
                updateHeatValue={ this.updateHeatValue.bind(this, row.run_id) } />
        }.bind(this));
        rows.sort(function(a, b) {
            return (a.props.heat - b.props.heat) ||
                (a.props.participant > b.props.participant ? 1 : -1);
        });
        var judges_header = this.props.judges.map(function(judge) {
            return <th>{ judge.name }</th>;
        }.bind(this));
        return <div>
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
            { this.getScoreEditor() }
        </div>;
    }
    updateHeatValue(run_id, new_value) {
        $.ajax({
            url: "/api",
            method: "POST",
            data: {request: JSON.stringify({
                method: "update_run_heat",
                data: {
                    run: run_id,
                    heat: new_value,
                }
            })},
            error: function(xhr, status, err) {
                alert("ERROR!");
                console.error(xhr, status, err.toString());
            }.bind(this),
        });
    }
    startEditingScore(run_id, judge_id) {
        var run = this.getRunById(run_id);
        this.setState({
            current_editing: {
                run_id: run_id,
                judge_id: judge_id,
                current_input: $.extend(true, {}, run.scores[judge_id].raw_data),
            }
        });
    }
    stopEditingScore() {
        this.setState({
            current_editing: null,
        })
    }
    updateCurrentInput(key, value) {
        var ce = this.state.current_editing;
        ce.current_input[key] = value;
        this.setState({
            current_editing: ce,
        });
    }
    updateScore(new_score) {
        $.ajax({
            url: "/api",
            method: "POST",
            data: {request: JSON.stringify({
                method: "set_judge_score",
                data: {
                    judge: parseInt(this.state.current_editing.judge_id),
                    run: this.state.current_editing.run_id,
                    score: new_score,
                }
            })},
            success: function() {
                this.stopEditingScore();
            }.bind(this),
            error: function(xhr, status, err) {
                alert("ERROR!");
                console.error(xhr, status, err.toString());
            }.bind(this),
        });
    }
    dispatchScoreUpdate(message) {
        var new_runs = $.extend(true, [], this.state.runs);
        new_runs.forEach(function(el, idx, arr) {
            if (el.run_id == message.run_id) {
                arr[idx].scores[message.judge_id.toString()] = message.score;
            }
        }.bind(this));
        this.setState({
            runs: new_runs,
        });
    }
    dispatchTourStatusUpdate(message) {
        if (message["tour_id"] == this.props.tour_id) {
            window.location.href = window.location.href;
        }
    }
}
