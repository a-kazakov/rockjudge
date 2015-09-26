/*class ScoringUI extends React.Component {
    constructor(props) {
        super(props);
        window.message_dispatcher.subscribe("score_update", this.dispatchScoreUpdate.bind(this));
        this.state = {
            score: props.run.score,
        };
    }
    dispatchScoreUpdate(data) {
        if (data["run_id"] == this.props.run.id && data["judge_id"] == this.props.judge_id) {
            this.setState({
                score: data["score"],
            });
        }
    }
    render() {
        return <div>
            <b>Participant:</b> { this.props.run.participant }<br />
            <b>Score:</b> { this.state.score }
                <button onClick={ this.updateScore.bind(this) }>Update score</button>
        </div>
    }
    updateScore() {
        var new_score = prompt("Enter new value");
        this.setState({
            score: "...",
        });
    }
}

class TabletUI extends React.Component {
    constructor(props) {
        super(props);
        window.message_dispatcher.subscribe("status_update", this.dispatchStatusUpdate.bind(this));
        this.state = props.initialState;
        this.state.next_state = null;
    }
    dispatchStatusUpdate() {
        $.ajax({
            url: "/api",
            method: "POST",
            dataType: "json",
            data: {
                method: "get_tablet_state",
                judge: this.props.judge_id,
            },
            success: function(data) {
                if (this.state.status == "HOLD" || this.state.runs.length == 0) {
                    this.setState(data);
                } else {
                    this.setState({
                        next_state: data,
                    });
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this),
        })
    }
    getScoringLayout() {
        switch (this.state.status) {
        case "HOLD":
            return <span>No active tour</span>;
        case "ACTIVE":
            return this.state.runs.map(function(run) {
                return <ScoringUI
                    key={ run.id }
                    run={ run }
                    judge_id={ this.props.judge_id } />;
            }.bind(this));
        }
    }
    toNextState() {
        var new_state = this.state.next_state;
        new_state.next_state = null;
        this.setState(new_state);
    }
    getSubmitButton() {
        if (this.state.next_state !== null) {
            return <button onClick={ this.toNextState.bind(this) }>To next heat ...</button>
        }
    }
    render() {
        return <div>
            { this.getScoringLayout() }
            { this.getSubmitButton() }
        </div>
    }
}*/

class JudgeTablet extends React.Component {
    constructor(props) {
        super(props);
        this.state = props.initialState;
        this.state.next_state = null;
        window.message_dispatcher.subscribe("score_update", this.dispatchScoreUpdate.bind(this));
        window.message_dispatcher.subscribe("status_update", this.dispatchStatusUpdate.bind(this));
    }
    getScoringLayout() {
        console.log(this.state);
        switch (this.state.status) {
        case "HOLD":
            return <span>No active tour</span>;
        case "ACTIVE":
            return this.state.runs.map(function(run) {
                return <div>
                    <h2>{ run.participant }</h2>
                    <TabletScoreInput
                        key={ run.id }
                        score={ run.score }
                        onScoreUpdate={ this.onScoreUpdate.bind(this, run.id) } />
                </div>
            }.bind(this));
        }
    }
    toNextState() {
        var new_state = this.state.next_state;
        new_state.next_state = null;
        this.setState(new_state);
    }
    getSubmitButton() {
        if (this.state.next_state !== null) {
            return <button onClick={ this.toNextState.bind(this) }>To next heat ...</button>
        }
    }
    render() {
        return <div>
            { this.getScoringLayout() }
            { this.getSubmitButton() }
        </div>
    }
    onScoreUpdate(run_id, new_score) {
        $.ajax({
            url: "/api",
            method: "POST",
            data: {request: JSON.stringify({
                method: "set_judge_score",
                data: {
                    judge: this.props.judge_id,
                    run: run_id,
                    score: new_score,
                }
            })},
            error: function(xhr, status, err) {
                alert("ERROR!");
                console.error(this.props.url, status, err.toString());
            }.bind(this),
        });
    }
    dispatchScoreUpdate(data) {
        var new_runs = this.state.runs.map(function(run) {
            if (data["run_id"] != run.id) {
                return run;
            }
            var new_run = $.extend({}, run);
            new_run.score = data["score"];
            return new_run;
        });
        this.setState({
            runs: new_runs,
        });
    }
    dispatchStatusUpdate() {
        $.ajax({
            url: "/api",
            method: "POST",
            dataType: "json",
            data: {request: JSON.stringify({
                method: "get_tablet_state",
                data: {
                    judge: this.props.judge_id,
                }
            })},
            success: function(data) {
                if (this.state.status == "HOLD" || this.state.runs.length == 0) {
                    this.setState(data);
                    console.log("123", data)
                } else {
                    this.setState({
                        next_state: data,
                    });
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this),
        })
    }
}
