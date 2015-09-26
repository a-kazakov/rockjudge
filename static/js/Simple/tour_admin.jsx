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
            <td>{ this.props.heat }</td>
            { scores }
        <td>{ this.props.total_score.toFixed(2) }</td>
        </tr>;
    }
}

class TourAdminScoresTable extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            runs: props.runs,
            current_editing: null,
        };
        window.message_dispatcher.subscribe("tour_status_update", this.dispatchTourStatusUpdate.bind(this));
        window.message_dispatcher.subscribe("score_update", this.dispatchScoreUpdate.bind(this));
    }
    getRunById(run_id) {
        console.log(this.state.runs);
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
                startEditingScore={ this.startEditingScore.bind(this) } />
        }.bind(this));
        var judges_header = this.props.judges.map(function(judge) {
            return <th>{ judge.name }</th>;
        }.bind(this));
        return <div>
            <table>
                <tr>
                    <th>Participant</th>
                    <th>Heat</th>
                    { judges_header }
                    <th>Total</th>
                </tr>
                { rows }
            </table>
            { this.getScoreEditor() }
        </div>;
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
        if (data["tour_id"] == this.props.tour_id) {
            window.location.href = window.location.href;
        }
    }
}
