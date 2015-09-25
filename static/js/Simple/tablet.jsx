class ScoringUI extends React.Component {
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
        $.ajax({
            url: "/api",
            method: "POST",
            data: {
                method: "set_judge_score",
                judge: this.props.judge_id,
                run: this.props.run.id,
                score: new_score,
            },
            success: function(data) {
                this.setState({
                    score: new_score,
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
                this.setState({
                    score: "ERROR",
                });
            }.bind(this),
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
            return <span>No active round</span>;
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
}
